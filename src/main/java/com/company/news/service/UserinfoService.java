package com.company.news.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.ProjectProperties;
import com.company.news.entity.User;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.TimeUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.UserInfoReturn;
import com.company.plugin.security.LoginLimit;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class UserinfoService extends AbstractServcice {
	public static final int USER_disable_default = 0;// 电话号码，验证。默认0，0:没验证。1:验证，2：提交验证
	public static final int USER_tel_verify_default = 0;// 是否被管理员封号。0：不封。1：封号，不允许登录。

	public static final int USER_type_group = 1;// 组织管理员
	public static final int USER_type_teacher = 0;// 老师类型

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean reg(int type, UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (!CommonsValidate.checkCellphone(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码格式不正确！");
			return false;
		}

		// name昵称验证
		if (StringUtils.isBlank(userRegJsonform.getName())||userRegJsonform.getName().length()>15) {
			responseMessage.setMessage("昵称不能为空，且长度不能超过15位！");
			return false;
		}

		// group_uuid
		if (StringUtils.isBlank(userRegJsonform.getGroup_uuid())) {
			responseMessage.setMessage("关联组织的UUID不能为空！");
			return false;
		}

		// 用户名是否存在
		if (isExitSameUserByLoginName(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码已被注册！");
			return false;
		}

		User user = new User();

		BeanUtils.copyProperties(user, userRegJsonform);
		user.setLoginname(userRegJsonform.getTel());
		user.setCreate_time(TimeUtils.getCurrentTimestamp());
		user.setDisable(USER_disable_default);
		user.setLogin_time(TimeUtils.getCurrentTimestamp());
		user.setTel_verify(USER_tel_verify_default);
		user.setType(type);
		user.setSex(0);

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.save(user);

		return true;
	}

	/**
	 * 
	 * @param loginName
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public ModelMap login(UserLoginForm userLoginForm, ModelMap model,
			HttpServletRequest request, ResponseMessage responseMessage)
			throws Exception {
		String loginname = userLoginForm.getLoginname();
		String password = userLoginForm.getPassword();
		if (password == null)
			password = "";
		if (StringUtils.isBlank(loginname)) {
			responseMessage.setMessage("用户登录名不能为空!");
			responseMessage.setStatus("failed");
			return model;
		}

		String attribute = "loginname";

		User user = (User) this.nSimpleHibernateDao.getObjectByAttribute(
				User.class, attribute, loginname);

		if (user == null) {
			responseMessage.setMessage("用户不存在或者密码错误!");
			responseMessage.setStatus("failed");
			return model;
		}

		boolean pwdIsTrue = false;
		{
			// 密码比较
			String smmPWD = user.getPassword();
			if (smmPWD == null)
				smmPWD = "";
			if (password.equals(smmPWD)) {
				pwdIsTrue = true;
			} else {
				pwdIsTrue = false;
			}

			//
			String project_loginLimit = ProjectProperties.getProperty(
					"project.LoginLimit", "true");
			if ("true".equals(project_loginLimit)) {
				if (!LoginLimit.verifyCount(loginname, pwdIsTrue,
						responseMessage)) {// 密码错误次数验证
					return model;
				}
				if (!pwdIsTrue) {
					return model;
				}

			} else {
				if (!pwdIsTrue) {
					responseMessage.setMessage("用户登录名或者密码错误，请重试!");
					responseMessage.setStatus("failed");
					return model;
				}
			}

		}

		// 创建session
		HttpSession session = SessionListener
				.getSession((HttpServletRequest) request);

		if (session != null) {
			User userInfo = (User) session
					.getAttribute(RestConstants.Session_UserInfo);
			if (userInfo != null && loginname.equals(userInfo.getLoginname())) {
				// 当前用户,在线直接返回当前用户.
				this.logger.info("userInfo is online,loginName=" + loginname);
				// 返回用户信息
				UserInfoReturn userInfoReturn = new UserInfoReturn();
				try {
					BeanUtils.copyProperties(userInfoReturn, user);
				} catch (Exception e) {
					e.printStackTrace();
				}
				model.put(RestConstants.Return_JSESSIONID, session.getId());
				model.put(RestConstants.Return_UserInfo, userInfoReturn);
				return model;
			}
		}
		user.setLogin_time(TimeUtils.getCurrentTimestamp());
		this.nSimpleHibernateDao.save(user);
		session = request.getSession(true);
		this.nSimpleHibernateDao.getHibernateTemplate().evict(user);
		SessionListener.putSessionByJSESSIONID(session);
		session.setAttribute(RestConstants.Session_UserInfo, user);
		// 返回客户端用户信息放入Map
		// putUserInfoReturnToModel(model, request);

		model.put(RestConstants.Return_JSESSIONID, session.getId());
		// model.put(RestConstants.Return_UserInfo, userInfoReturn);

		return model;
	}

	/**
	 * 是否用户名已被占用
	 * 
	 * @param loginname
	 * @return
	 */
	private boolean isExitSameUserByLoginName(String loginname) {
		String attribute = "tel";
		Object user = nSimpleHibernateDao.getObjectByAttribute(User.class,
				attribute, loginname);

		if (user != null)// 已被占用
			return true;
		else
			return false;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

}
