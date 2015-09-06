package com.company.news.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.aop.operate.OperateMeta;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.Role;
import com.company.news.entity.RoleUserRelation;
import com.company.news.entity.User;
import com.company.news.entity.User4Q;
import com.company.news.entity.UserForJsCache;
import com.company.news.entity.UserGroupRelation;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.TeacherPhone;
import com.company.plugin.security.LoginLimit;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class UserinfoService extends AbstractServcice {
	private static final String model_name = "用户模块";
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
	 * 给用户添加默认学校
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean addDefaultKDGroup(String user_uuid,
			ResponseMessage responseMessage) throws Exception {
		// 保存用户机构关联表
		UserGroupRelation userGroupRelation = new UserGroupRelation();
		userGroupRelation.setUseruuid(user_uuid);
		userGroupRelation.setGroupuuid(SystemConstants.Group_uuid_wjd);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(userGroupRelation);
		
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
		// 用户名是否存在.移动到controller判断
//		if (isExitSameUserByLoginName(userRegJsonform.getTel())) {
//			responseMessage.setMessage("电话号码已被注册！");
//			return false;
//		}
		
		if(!smsService.VerifySmsCode(responseMessage, userRegJsonform.getTel(), userRegJsonform.getSmscode())){
			return false;
		}
		
		// 注册机构情况下,当前用户设置为管理员角色.需要验证码

		User user = new User();

		BeanUtils.copyProperties(user, userRegJsonform);
		user.setLoginname(userRegJsonform.getTel());
		user.setCreate_time(TimeUtils.getCurrentTimestamp());
		user.setDisable(USER_disable_default);
		user.setLogin_time(TimeUtils.getCurrentTimestamp());
		user.setTel_verify(USER_tel_verify_default);
		user.setSex(SystemConstants.User_sex_female);//默认女
		user.setOffice("老师");

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
	 * 管理员添加用户
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage,String mygroup) throws Exception {
		// name昵称验证
		if (StringUtils.isBlank(mygroup)) {
			responseMessage.setMessage("当前用户没有关联学校,无权限操作");
			return false;
		}
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
		// TEL格式验证
		if (!CommonsValidate.checkCellphone(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码格式不正确！");
			return false;
		}
		String attribute = "";
		User user = (User)nSimpleHibernateDao.getObjectByAttribute(User.class,
				"loginname", userRegJsonform.getTel());
		
		if (user==null) {//不存在,则新加用户并绑定关心.
			 user = new User();

				BeanUtils.copyProperties(user, userRegJsonform);
				user.setLoginname(userRegJsonform.getTel());
				user.setCreate_time(TimeUtils.getCurrentTimestamp());
				user.setDisable(USER_disable_default);
				//user.setLogin_time(TimeUtils.getCurrentTimestamp());
				user.setTel_verify(USER_tel_verify_default);
				//user.setSex(0);
				this.nSimpleHibernateDao.getHibernateTemplate().save(user);
				responseMessage.setMessage("用户添加成功!");
		}else{
			responseMessage.setMessage("用户已存在绑定成功!");
			//只能删除我关联学校的用户的关联关心
			int tmpCout = this.nSimpleHibernateDao.getHibernateTemplate()
					.bulkUpdate(
							"delete from UserGroupRelation where  groupuuid in("+DBUtil.stringsToWhereInValue(mygroup)+") and  useruuid =? and groupuuid!=?", user.getUuid(),SystemConstants.Group_uuid_wjd);
			this.logger.info("delete from UserGroupRelation count=" + tmpCout);
		}
		
		String[] groupStrArr=userRegJsonform.getGroup_uuid().split(",");
		for(int i=0;i<groupStrArr.length;i++){
			
			UserGroupRelation userGroupRelation = new UserGroupRelation();
			userGroupRelation.setUseruuid(user.getUuid());
			userGroupRelation.setGroupuuid(groupStrArr[i]);
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().save(userGroupRelation);
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
		
		boolean needUpdateCreateImg=false;
		//头像有变化,更新相应的表.
		if(userRegJsonform.getImg()!=null&&!userRegJsonform.getImg().equals(user.getImg())){
			needUpdateCreateImg=true;
		}
		//名字有变化更新相应的表.
		else if(!userRegJsonform.getName().equals(user.getName())){
			needUpdateCreateImg=true;
		}

		user.setName(userRegJsonform.getName());
		user.setSex(userRegJsonform.getSex());
		user.setEmail(userRegJsonform.getEmail());
		user.setOffice(userRegJsonform.getOffice());
		user.setImg(PxStringUtil.imgUrlToUuid(userRegJsonform.getImg()));
		

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().update(user);
		
		if(needUpdateCreateImg)this.nSimpleHibernateDao.relUpdate_updateSessionUserInfoInterface(user);
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
			ResponseMessage responseMessage,String mygroup) throws Exception {

		// name昵称验证
				if (StringUtils.isBlank(mygroup)) {
					responseMessage.setMessage("当前用户没有关联学校,无权限操作");
					return null;
				}
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
		//只能删除我关联学校的用户的关联关心
		int tmpCout = this.nSimpleHibernateDao.getHibernateTemplate()
				.bulkUpdate(
						"delete from UserGroupRelation where  groupuuid in("+DBUtil.stringsToWhereInValue(mygroup)+") and  useruuid =? and groupuuid!=?", user.getUuid(),SystemConstants.Group_uuid_wjd);
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
	@OperateMeta(description="用户登陆")
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
		if(user.getDisable()!=null&&SystemConstants.USER_disable_true==user.getDisable().intValue()){
			responseMessage.setMessage("帐号被禁用,请联系互动家园");
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
		String sql="update px_user set count=count+1,last_login_time=login_time,login_time=now() where uuid='"+user.getUuid()+"'";
		this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
//		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
//				"update User set  login_time=?,last_login_time=? where uuid=?",
//				count,TimeUtils.getCurrentTimestamp(), user.getLogin_time(),
//				user.getUuid());
//		if (true) {
//			RoleUserRelation r = new RoleUserRelation();
//			r.setRoleuuid(RightConstants.Role_AD_admini);
//			r.setUseruuid(user.getUuid());
//			r.setGroupuuid(SystemConstants.Group_uuid_wjkj);
//			this.nSimpleHibernateDao.getHibernateTemplate().save(r);
//
//	}

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
	
	/**
	 * 根据手机号码获取
	 * 
	 * @param loginname
	 * @return
	 */
	public User4Q getUserBytel(String loginname) {
		String attribute = "loginname";
		return (User4Q)nSimpleHibernateDao.getObjectByAttribute(User4Q.class,
				attribute, loginname);
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
	public List<User4Q> getUserTelsByGroupuuid(String group_uuid,String name) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select DISTINCT {t1.*} from px_usergrouprelation t0,px_user {t1} where t0.useruuid={t1}.uuid ";
		sql+=" and t0.groupuuid !='"+SystemConstants.Group_uuid_wjd+"'";
		if(StringUtils.isNotBlank(group_uuid)){
			sql+=" and t0.groupuuid in("+DBUtil.stringsToWhereInValue(group_uuid)+")";
		}
		if(StringUtils.isNotBlank(name)){
			sql+=" and {t1}.name like '%"+name+"%'";
		}
		Query q = s
				.createSQLQuery(sql).addEntity("t1", User4Q.class);

		return q.list();
	}
	/**
	 * 查询指定机构的用户列表
	 * 
	 * @return
	 */
	public List<User4Q> getUserByGroupuuid(String group_uuid,String name) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select DISTINCT {t1.*} from px_usergrouprelation t0,px_user {t1} where t0.useruuid={t1}.uuid";
		if(StringUtils.isNotBlank(group_uuid)){
			sql+=" and t0.groupuuid in("+DBUtil.stringsToWhereInValue(group_uuid)+")";
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
			responseMessage.setMessage("请选择用户！");
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
	public List<RoleUserRelation> getRoleuuid(String groupuuid,String useruuid) {
		if (StringUtils.isBlank(groupuuid)||StringUtils.isBlank(useruuid))
			return null;

		return (List<RoleUserRelation>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from RoleUserRelation where groupuuid=? and useruuid=?",groupuuid, useruuid);

	}

	/**
	 * 
	 * @param roleuuid
	 * @param rightuuids
	 */
	public boolean updateRoleRightRelation(String roleuuids, String useruuid,String groupuuid,
			String type, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(useruuid)) {
			responseMessage.setMessage("用户不能为空");
			return false;
		}
		if (StringUtils.isBlank(groupuuid)) {
			responseMessage.setMessage("学校不能为空");
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
						"delete from RoleUserRelation where groupuuid=? and useruuid =? "
								+ whereType,groupuuid, useruuid);
		this.logger.info("delete from RoleUserRelation count=" + tmpCout);
		if (StringUtils.isNotBlank(roleuuids)) {
			String[] str = PxStringUtil.StringDecComma(roleuuids).split(",");
			for (String s : str) {
				RoleUserRelation r = new RoleUserRelation();
				r.setRoleuuid(s);
				r.setUseruuid(useruuid);
				r.setGroupuuid(groupuuid);
				this.nSimpleHibernateDao.getHibernateTemplate().save(r);
			}
		}

		return true;
	}
	
	/**
	 * 更新用户权限
	 * @param roleuuid
	 * @param useruuids
	 * @param groupuuid
	 * @param type
	 * @param responseMessage
	 * @param request
	 * @return
	 */
	public boolean updateRoleByUsers(String roleuuid, String useruuids,
			String groupuuid,  ResponseMessage responseMessage,HttpServletRequest request) {
		
		
		if (StringUtils.isBlank(roleuuid)) {
			responseMessage.setMessage("权限角色不能为空");
			return false;
		}
		if (StringUtils.isBlank(groupuuid)) {
			responseMessage.setMessage("学校不能为空");
			return false;
		}
		
		//如果是修改管理员权限,必须要有一个管理员有该角色
		if(RightConstants.Role_AD_admini.equals(roleuuid)||RightConstants.Role_KD_admini.equals(roleuuid)){
			if (StringUtils.isBlank(useruuids)) {
				responseMessage.setMessage("管理员权限,必须要有一个管理员有该角色");
				return false;
			}
		}
		
		Role role=(Role)this.nSimpleHibernateDao.getObject(Role.class, roleuuid);
		if(role==null){
			responseMessage.setMessage("没有该角色,roleuuid="+roleuuid);
			return false;
		}
		
		if(RightConstants.Role_Type_AD.equals(role.getType())){
			if(RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_role_m, request)){
				responseMessage.setMessage("非法授权,平台管理员才可设置.");
				return false;
			}
		}
		
		
		// 删除原有角色权限
				int tmpCout = this.nSimpleHibernateDao.getHibernateTemplate()
						.bulkUpdate(
								"delete from RoleUserRelation where groupuuid=? and roleuuid =? ",groupuuid, roleuuid);
				this.logger.info("delete from RoleUserRelation count=" + tmpCout);
				 User user = SessionListener.getUserInfoBySession(request);
				if (StringUtils.isNotBlank(useruuids)) {
					String[] str = PxStringUtil.StringDecComma(useruuids).split(",");
					for (String s : str) {
						RoleUserRelation r = new RoleUserRelation();
						r.setRoleuuid(roleuuid);
						r.setUseruuid(s);
						r.setGroupuuid(groupuuid);
						r.setCreate_time(TimeUtils.getCurrentTimestamp());
						r.setCreate_user(user.getName());
						r.setCreate_useruuid(user.getUuid());
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
			responseMessage.setMessage("旧密码不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getPassword())) {
			responseMessage.setMessage("密码不能为空！");
			return false;
		}

		User user = (User) this.nSimpleHibernateDao.getObject(User.class,
				userRegJsonform.getUuid());
		if (user == null) {
			responseMessage.setMessage("用户不存在！");
			return false;
		}

		if (!user.getPassword().equals(userRegJsonform.getOldpassword())) {
			responseMessage.setMessage("2次密码不匹配！");
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
			responseMessage.setMessage("手机号码不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getSmscode())) {
			responseMessage.setMessage("验证码不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getPassword())) {
			responseMessage.setMessage("密码不能为空！");
			return false;
		}
		
		

		if(!smsService.VerifySmsCode(responseMessage, userRegJsonform.getTel(), userRegJsonform.getSmscode())){
			return false;
		}

		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update User set password=? where loginname =?",
				userRegJsonform.getPassword(), userRegJsonform.getTel());
		return true;

	}
	
	/**
	 * 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public User4Q get(String uuid) throws Exception {
		return (User4Q) this.nSimpleHibernateDao
				.getObjectById(User4Q.class, uuid);

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
	public boolean delete(String uuid, ResponseMessage responseMessage,
			HttpServletRequest request) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}
		User4Q obj=(User4Q) this.nSimpleHibernateDao.getObject(User4Q.class, uuid);
		if(obj==null){
			responseMessage.setMessage("没有该数据!");
			return false;
		}
		if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_user_del,request)){
			responseMessage.setMessage(RightConstants.Return_msg);
			return false;
		}
		
		int tmpCout = this.nSimpleHibernateDao.getHibernateTemplate()
				.bulkUpdate(
						"delete from UserGroupRelation where  useruuid =? ", obj.getUuid());
		this.logger.info("delete from UserGroupRelation count=" + tmpCout);
		
		
		 this.nSimpleHibernateDao.delete(obj);
//		if (uuid.indexOf(",") != -1)// 多ID
//		{
//			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
//					"delete from Announcements where uuid in(?)", uuid);
////			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
////					"delete from AnnouncementsTo where announcementsuuid in(?)", uuid);
//		} else {
//			this.nSimpleHibernateDao
//					.deleteObjectById(Announcements.class, uuid);
////			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
////					"delete from AnnouncementsTo where announcementsuuid =?", uuid);
//		}

		return true;
	}
	public UserForJsCache getUserForJsCache(String uuid) {
		return (UserForJsCache) this.nSimpleHibernateDao
				.getObjectById(UserForJsCache.class, uuid);
	}
	
	/**
	 * 查询指定机构的用户列表
	 * 
	 * @return
	 */
	public List<UserForJsCache> listJsCache(String group_uuid,String name) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select DISTINCT {t1.*} from px_usergrouprelation t0,px_user {t1} where t0.useruuid={t1}.uuid ";
		if(StringUtils.isNotBlank(group_uuid)){
			sql+="and t0.groupuuid='"+ group_uuid + "'";
		}
		if(StringUtils.isNotBlank(name)){
			sql+=" and {t1}.name like '%"+name+"%'";
		}
		Query q = s
				.createSQLQuery(sql).addEntity("t1", UserForJsCache.class);

		return q.list();
	}
	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
