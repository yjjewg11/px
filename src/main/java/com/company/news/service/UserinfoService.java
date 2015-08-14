package com.company.news.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.RoleUserRelation;
import com.company.news.entity.Student;
import com.company.news.entity.TelSmsCode;
import com.company.news.entity.User;
import com.company.news.entity.User4Q;
import com.company.news.entity.UserGroupRelation;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.StringOperationUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.TeacherPhone;
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
	public static final int USER_disable_default = 0;// 电话号码，验证。默认0，0:启用。1:禁用,
	public static final int USER_tel_verify_default = 0;// 是否被管理员封号。0：不封。1：封号，不允许登录。

	// 20150610 去掉对用户表的TYPE定义，默认都为0
	public static final int USER_type_group = 0;// 组织管理员
	public static final int USER_type_teacher = 0;// 老师类型

	// 用户状态
	public static final int USER_disable_true = 1;// 禁用
	// 用户状态
	public static final int USER_disable_0 = 0;// 启用
	// 用户状态
	public static final int USER_disable_2 = 2;//注册用户带审核.
	@Autowired
	private SmsService smsService;
	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean reg(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (!CommonsValidate.checkCellphone(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码格式不正确！");
			return false;
		}

		// name昵称验证
		if (StringUtils.isBlank(userRegJsonform.getName())
				|| userRegJsonform.getName().length() > 15) {
			responseMessage.setMessage("昵称不能为空，且长度不能超过15位！");
			return false;
		}

		// Group_uuid昵称验证
		if (StringUtils.isBlank(userRegJsonform.getGroup_uuid())) {
			responseMessage.setMessage("关联机构不能为空！");
			return false;
		}

		// 用户名是否存在
		if (isExitSameUserByLoginName(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码已被注册！");
			return false;
		}
		
		// TEL格式验证
				if (!CommonsValidate.checkCellphone(userRegJsonform.getTel())) {
					responseMessage.setMessage("电话号码格式不正确！");
					return false;
				}
				// 注册机构情况下,当前用户设置为管理员角色.需要验证码
				if (userRegJsonform instanceof GroupRegJsonform) {

					if(!smsService.VerifySmsCode(responseMessage, userRegJsonform.getTel(), userRegJsonform.getSmscode())){
						return false;
					}
				}
		

		User user = new User();

		BeanUtils.copyProperties(user, userRegJsonform);
		user.setLoginname(userRegJsonform.getTel());
		user.setCreate_time(TimeUtils.getCurrentTimestamp());
		user.setDisable(USER_disable_default);
		user.setLogin_time(TimeUtils.getCurrentTimestamp());
		user.setTel_verify(USER_tel_verify_default);
		user.setSex(SystemConstants.User_sex_male);//默认男

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(user);

		
		String[] groupStrArr=userRegJsonform.getGroup_uuid().split(",");
		for(int i=0;i<groupStrArr.length;i++){
			// 保存用户机构关联表
			UserGroupRelation userGroupRelation = new UserGroupRelation();
			userGroupRelation.setUseruuid(user.getUuid());
			userGroupRelation.setGroupuuid(groupStrArr[i]);
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().save(userGroupRelation);
		}

		// 注册机构情况下,当前用户设置为管理员角色
		if (userRegJsonform instanceof GroupRegJsonform) {
			GroupRegJsonform group = (GroupRegJsonform) userRegJsonform;
			if (SystemConstants.Group_type_1.equals(group.getType())) {
				RoleUserRelation r = new RoleUserRelation();
				r.setRoleuuid(RightConstants.Role_KD_admini);
				r.setUseruuid(user.getUuid());
				this.nSimpleHibernateDao.getHibernateTemplate().save(r);

			}
		}
		return true;
	}
	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (!CommonsValidate.checkCellphone(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码格式不正确！");
			return false;
		}

		// name昵称验证
		if (StringUtils.isBlank(userRegJsonform.getName())
				|| userRegJsonform.getName().length() > 15) {
			responseMessage.setMessage("昵称不能为空，且长度不能超过15位！");
			return false;
		}

		// Group_uuid昵称验证
		if (StringUtils.isBlank(userRegJsonform.getGroup_uuid())) {
			responseMessage.setMessage("关联机构不能为空！");
			return false;
		}

		// 用户名是否存在
		if (isExitSameUserByLoginName(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码已被注册！");
			return false;
		}
		
		// TEL格式验证
				if (!CommonsValidate.checkCellphone(userRegJsonform.getTel())) {
					responseMessage.setMessage("电话号码格式不正确！");
					return false;
				}

		

		User user = new User();

		BeanUtils.copyProperties(user, userRegJsonform);
		user.setLoginname(userRegJsonform.getTel());
		user.setCreate_time(TimeUtils.getCurrentTimestamp());
		user.setDisable(USER_disable_default);
		user.setLogin_time(TimeUtils.getCurrentTimestamp());
		user.setTel_verify(USER_tel_verify_default);
		user.setSex(0);

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(user);

		
		String[] groupStrArr=userRegJsonform.getGroup_uuid().split(",");
		for(int i=0;i<groupStrArr.length;i++){
			// 保存用户机构关联表
			UserGroupRelation userGroupRelation = new UserGroupRelation();
			userGroupRelation.setUseruuid(user.getUuid());
			userGroupRelation.setGroupuuid(groupStrArr[i]);
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().save(userGroupRelation);
		}

		// 注册机构情况下,当前用户设置为管理员角色
		if (userRegJsonform instanceof GroupRegJsonform) {
			GroupRegJsonform group = (GroupRegJsonform) userRegJsonform;
			if (SystemConstants.Group_type_1.equals(group.getType())) {
				RoleUserRelation r = new RoleUserRelation();
				r.setRoleuuid(RightConstants.Role_KD_admini);
				r.setUseruuid(user.getUuid());
				this.nSimpleHibernateDao.getHibernateTemplate().save(r);

			}
		}
		return true;
	}

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public User update(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) throws Exception {

		// name昵称验证
		if (StringUtils.isBlank(userRegJsonform.getName())
				|| userRegJsonform.getName().length() > 15) {
			responseMessage.setMessage("昵称不能为空，且长度不能超过15位！");
			return null;
		}

		User user = (User) this.nSimpleHibernateDao.getObject(User.class,
				userRegJsonform.getUuid());
		if (user == null) {
			responseMessage.setMessage("user不存在！");
			return null;
		}
		
		//头像有变化,更新相应的表.
		if(userRegJsonform.getImg()!=null&&!userRegJsonform.getImg().equals(user.getImg())){
			this.nSimpleHibernateDao.updateUserInfoToBusinessData(user.getUuid(), userRegJsonform.getName(), userRegJsonform.getImg());
		}
		//名字有变化更新相应的表.
		else if(!userRegJsonform.getName().equals(user.getName())){
			this.nSimpleHibernateDao.updateUserInfoToBusinessData(user.getUuid(), userRegJsonform.getName(), userRegJsonform.getImg());
		}

		user.setName(userRegJsonform.getName());
		//user.setSex(userRegJsonform.getSex());
		user.setEmail(userRegJsonform.getEmail());
		user.setOffice(userRegJsonform.getOffice());
		user.setImg(PxStringUtil.imgUrlToUuid(userRegJsonform.getImg()));

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().update(user);

		return user;
	}
	
	/**
	 * 管理员修改用户信息
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public User updateByAdmin(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) throws Exception {

		// name昵称验证
		if (StringUtils.isBlank(userRegJsonform.getName())
				|| userRegJsonform.getName().length() > 15) {
			responseMessage.setMessage("昵称不能为空，且长度不能超过15位！");
			return null;
		}
		User user = (User) this.nSimpleHibernateDao.getObject(User.class,
				userRegJsonform.getUuid());
		if (user == null) {
			responseMessage.setMessage("user不存在！");
			return null;
		}

		user.setName(userRegJsonform.getName());
		//user.setSex(userRegJsonform.getSex());
		user.setEmail(userRegJsonform.getEmail());
		user.setOffice(userRegJsonform.getOffice());
		if (StringUtils.isBlank(userRegJsonform.getGroup_uuid())) {
			responseMessage.setMessage("关联机构不能为空！");
			return null;
		}
		
		int tmpCout = this.nSimpleHibernateDao.getHibernateTemplate()
				.bulkUpdate(
						"delete from UserGroupRelation where useruuid =?", user.getUuid());
		this.logger.info("delete from UserGroupRelation count=" + tmpCout);
		
		String[] groupStrArr=userRegJsonform.getGroup_uuid().split(",");
		for(int i=0;i<groupStrArr.length;i++){
			// 保存用户机构关联表
			UserGroupRelation userGroupRelation = new UserGroupRelation();
			userGroupRelation.setUseruuid(user.getUuid());
			userGroupRelation.setGroupuuid(groupStrArr[i]);
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().save(userGroupRelation);
		}


		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().update(user);

		return user;
	}

	/**
	 * 
	 * @param loginName
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public User login(UserLoginForm userLoginForm, ModelMap model,
			HttpServletRequest request, ResponseMessage responseMessage)
			throws Exception {
		String loginname = userLoginForm.getLoginname();
		String password = userLoginForm.getPassword();

		if (StringUtils.isBlank(loginname)) {
			responseMessage.setMessage("用户登录名不能为空!");
			return null;
		}
		if (StringUtils.isBlank(password)) {
			responseMessage.setMessage("登陆密码不能为空!");
			return null;
		}

		String attribute = "loginname";

		User user = (User) this.nSimpleHibernateDao.getObjectByAttribute(
				User.class, attribute, loginname);

		if (user == null) {
			responseMessage.setMessage("用户名:" + loginname + ",不存在!");
			return null;
		}

		boolean pwdIsTrue = false;
		{
			// 密码比较
			String smmPWD = user.getPassword();

			if (password.equals(smmPWD)) {
				pwdIsTrue = true;
			} else {
				pwdIsTrue = false;
			}

			// 在限定次数内
			String project_loginLimit = ProjectProperties.getProperty(
					"project.LoginLimit", "true");
			if ("true".equals(project_loginLimit)) {
				if (!LoginLimit.verifyCount(loginname, pwdIsTrue,
						responseMessage)) {// 密码错误次数验证
					return null;
				}
				if (!pwdIsTrue) {
					responseMessage.setMessage("用户登录名或者密码错误，请重试!");
					return null;
				}

			} else {
				if (!pwdIsTrue) {
					responseMessage.setMessage("用户登录名或者密码错误，请重试!");
					return null;
				}
			}

		}
		
		// 更新登陆日期,最近一次登陆日期
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update User set login_time=?,last_login_time=? where uuid=?",
				TimeUtils.getCurrentTimestamp(), user.getLogin_time(),
				user.getUuid());


		return user;
	}
	
	/**
	 * 
	 * @param userLoginForm
	 * @param user
	 * @param responseMessage
	 * @return
	 */
	public boolean isAdmin(UserLoginForm userLoginForm,User user,ResponseMessage responseMessage){
		boolean isAdmin = false;
		// 后台管理员登录
		if (SystemConstants.Group_type_0.toString().equals(
				userLoginForm.getGrouptype())) {
			Session s = this.nSimpleHibernateDao.getHibernateTemplate()
					.getSessionFactory().getCurrentSession();
			List tmpList = s
					.createSQLQuery(
							"select {t1.*} from px_usergrouprelation t0,px_group {t1} where {t1}.type="
									+ SystemConstants.Group_type_0
									+ " and t0.groupuuid={t1}.uuid and t0.useruuid='"
									+ user.getUuid() + "'")
					.addEntity("t1", Group.class).list();
			if (tmpList.size() == 0) {
				responseMessage.setMessage("不是合法用户,不能登录云平台管理");
				return false;
			}

			isAdmin = true;

			
		}
		return isAdmin;
	}

	/**
	 * 是否用户名已被占用
	 * 
	 * @param loginname
	 * @return
	 */
	public boolean isExitSameUserByLoginName(String loginname) {
		String attribute = "loginname";
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

	/**
	 * 查询所有机构列表
	 * 
	 * @return
	 */
	public List<User4Q> query() {
		return (List<User4Q>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from User", null);
	}

	/**
	 * 查询指定机构的用户列表
	 * 
	 * @return
	 */
	public List<User4Q> getUserByGroupuuid(String group_uuid,String name) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select {t1.*} from px_usergrouprelation t0,px_user {t1} where t0.useruuid={t1}.uuid ";
		if(StringUtils.isNotBlank(group_uuid)){
			sql+="and t0.groupuuid='"+ group_uuid + "'";
		}
		if(StringUtils.isNotBlank(name)){
			sql+=" and {t1}.name like '%"+name+"%'";
		}
		Query q = s
				.createSQLQuery(sql).addEntity("t1", User4Q.class);

		return q.list();
	}
	
	/**
	 * 根据机构UUID,获取所有班级
	 * @param tel
	 * @param type
	 * @return
	 */
	public List<PClass> getClassByGroup(String groupuuid) {
		
		List<PClass> list= (List<PClass>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from PClass where groupuuid=?)",groupuuid);
		
		return list;
	}

	/**
	 * 
	 * @param disable
	 * @param useruuid
	 */
	public boolean updateDisable(String disable, String useruuids,
			ResponseMessage responseMessage) {
		// 更新用户状态
		// Group_uuid昵称验证
		if (StringUtils.isBlank(useruuids)) {
			responseMessage.setMessage("useruuid不能为空！");
			return false;
		}

		if (StringUtils.isBlank(disable)) {
			responseMessage.setMessage("disable不能为空！");
			return false;
		}

		int disable_i = USER_disable_default;
		try {
			disable_i = Integer.parseInt(disable);
			if (disable_i != USER_disable_true)// 不是禁用时，默认都是0
				disable_i = USER_disable_default;
		} catch (Exception e) {
			e.printStackTrace();
		}

		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update User set disable=? where uuid in(?)", disable_i,
				PxStringUtil.StringDecComma(useruuids));
		return true;
	}

	/**
	 * 根据角色ID取权限列表
	 * 
	 * @param uuid
	 */
	public List<RoleUserRelation> getRoleuuid(String uuid) {
		if (StringUtils.isBlank(uuid))
			return null;

		return (List<RoleUserRelation>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from RoleUserRelation where useruuid=?", uuid);

	}

	/**
	 * 
	 * @param roleuuid
	 * @param rightuuids
	 */
	public boolean updateRoleRightRelation(String roleuuids, String useruuid,
			String type, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(useruuid)) {
			responseMessage.setMessage("useruuids不能为空");
			return false;
		}
		String whereType = "";
		if (!StringUtils.isBlank(type)) {

			whereType = " and roleuuid in (select uuid from Role where type="
					+ type + " ) ";
		}
		// 删除原有角色权限
		int tmpCout = this.nSimpleHibernateDao.getHibernateTemplate()
				.bulkUpdate(
						"delete from RoleUserRelation where useruuid =? "
								+ whereType, useruuid);
		this.logger.info("delete from RoleUserRelation count=" + tmpCout);
		if (StringUtils.isNotBlank(roleuuids)) {
			String[] str = PxStringUtil.StringDecComma(roleuuids).split(",");
			for (String s : str) {
				RoleUserRelation r = new RoleUserRelation();
				r.setRoleuuid(s);
				r.setUseruuid(useruuid);
				this.nSimpleHibernateDao.getHibernateTemplate().save(r);
			}
		}

		return true;
	}

	/**
	 * 
	 * @param disable
	 * @param useruuid
	 */
	public boolean updatePassword(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) {
		// 更新用户状态
		// Group_uuid昵称验证
		if (StringUtils.isBlank(userRegJsonform.getUuid())) {
			responseMessage.setMessage("useruuid不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getOldpassword())) {
			responseMessage.setMessage("Oldpassword不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getPassword())) {
			responseMessage.setMessage("Password不能为空！");
			return false;
		}

		User user = (User) this.nSimpleHibernateDao.getObject(User.class,
				userRegJsonform.getUuid());
		if (user == null) {
			responseMessage.setMessage("user不存在！");
			return false;
		}

		if (!user.getPassword().equals(userRegJsonform.getOldpassword())) {
			responseMessage.setMessage("Oldpassword不匹配！");
			return false;
		}

		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update User set password=? where uuid =?",
				userRegJsonform.getPassword(), userRegJsonform.getUuid());
		return true;
	}

	/**
	 * 
	 * @param disable
	 * @param useruuid
	 */
	public boolean updatePasswordBySms(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) {
		// 更新用户状态
		// Group_uuid昵称验证
		if (StringUtils.isBlank(userRegJsonform.getTel())) {
			responseMessage.setMessage("Tel不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getSmscode())) {
			responseMessage.setMessage("Smscode不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getPassword())) {
			responseMessage.setMessage("Password不能为空！");
			return false;
		}

		List<TelSmsCode> list=(List<TelSmsCode>) this.nSimpleHibernateDao.getHibernateTemplate().find("from TelSmsCode where tel=? and type=? order by createtime desc", userRegJsonform.getTel(),SmsService.SMS_TYPE_USER);
		
		TelSmsCode smsdb;
		if(list!=null&&list.size()>0)
			smsdb=list.get(0);
		else
		{
			responseMessage.setMessage("请重发验证码!");
			return false;
		}
		
		 long timeInterval=TimeUtils.getCurrentTimestamp().getTime()-smsdb.getCreatetime().getTime();
	      if(timeInterval>SmsService.SMS_TIME_LIMIT){//防止暴力破解.
	        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
	        responseMessage.setMessage("验证码已经失效!");
	        return false;
	      }
		// 验证码成功
		if (smsdb != null
				&& smsdb.getCode().equals(userRegJsonform.getSmscode())) {
//			if (!this.isExitSameUserByLoginName(userRegJsonform.getTel())) {
//				responseMessage
//						.setStatus(RestConstants.Return_ResponseMessage_failed);
//				responseMessage.setMessage("电话号码不存在！");
//				return false;
//			}

			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"update User set password=? where loginname =?",
					userRegJsonform.getPassword(), userRegJsonform.getTel());
			//清除验证码,防止暴力破解.
			this.nSimpleHibernateDao.delete(smsdb);
			return true;

		}
		responseMessage.setMessage("短信验证码不正确！");
		return false;

	}
	
	/**
	 * 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public User get(String uuid) throws Exception {
		return (User) this.nSimpleHibernateDao
				.getObjectById(User.class, uuid);

	}
	/**
	 * 获取我关联幼儿园的所有用户的通信录
	 * @param uuid
	 * @return
	 */
	public List getAllTeacherPhoneListByUseruuid(String uuid) {
		String hql = "from User where uuid in (select useruuid from UserClassRelation where groupuuid in (select groupuuid from UserClassRelation where useruuid='"+uuid+"'))";
		List<User> userList=(List<User> )this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);
		List list=new ArrayList();
		for (User user : userList) {
			TeacherPhone teacherPhone=new TeacherPhone();
			teacherPhone.setType(SystemConstants.TeacherPhone_type_1);
			teacherPhone.setTeacher_uuid(user.getUuid());
			teacherPhone.setName(user.getName());
			teacherPhone.setTel(user.getTel());
			list.add(teacherPhone);
		}
		return list;
	}
}
