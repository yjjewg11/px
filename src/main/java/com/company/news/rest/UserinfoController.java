package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.RoleUserRelation;
import com.company.news.entity.User;
import com.company.news.entity.User4Q;
import com.company.news.entity.User4QBaseInfo;
import com.company.news.entity.UserForJsCache;
import com.company.news.form.UserLoginForm;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.GroupService;
import com.company.news.service.RightService;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.UserInfoReturn;
import com.company.web.listener.SessionListener;
import com.company.web.session.UserOfSession;

@Controller
@RequestMapping(value = "/userinfo")
public class UserinfoController extends AbstractRESTController {
	private static Logger logger = Logger.getLogger(UserinfoController.class);
	@Autowired
	private UserinfoService userinfoService;
	@Autowired
	private GroupService groupService;
	@Autowired
	private RightService rightService;
	

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(UserLoginForm userLoginForm, ModelMap model,
			HttpServletRequest request,HttpServletResponse response) {
		model.clear();
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		//话题模块登录.
		if(SystemConstants.Group_type_3.toString().equals(userLoginForm.getGrouptype())){
			SessionUserInfoInterface user = userinfoService.loginBySns(userLoginForm, model, request,
					responseMessage);
			if(user==null)return "";
			this.putUserInfoReturnToModel(user,model, request);
			
			return "";
		}
		
		//登录验证.验证失败则返回.
		try {
			User user;
			try {
				user = userinfoService.login(userLoginForm, model, request,
						responseMessage);
				if (user==null)// 请求服务返回失败标示
					return "";
				
				
				String str=userinfoService.getGroupTypes(user.getUuid());
				//c1.如果用户有关联的机构类型,这根据类型判断.
				if(StringUtils.isNotBlank(str)){
					//c1.1 如果选择登录的类型不在 关联的机构类型,则自动登录为关联类型的机构.
					if(!str.contains(userLoginForm.getGrouptype())){
						////如果是选择的是教育机构登录,则判断有幼儿园类型则设置为1.否则还是培训机构登录..
						if(SystemConstants.Group_type_2.toString().equals(userLoginForm.getGrouptype())){
							if(str.contains(SystemConstants.Group_type_1.toString())){
								userLoginForm.setGrouptype(SystemConstants.Group_type_1.toString());
							}
						}
					////如果是选择的是幼儿园登录,则判断有教育机构类型则设置为2.否则还是幼儿园登录..
						else if(SystemConstants.Group_type_1.toString().equals(userLoginForm.getGrouptype())){
							if(str.contains(SystemConstants.Group_type_2.toString())){
								userLoginForm.setGrouptype(SystemConstants.Group_type_2.toString());
							}
						}
					}
				}else{
					//没有幼儿园,则增加代理云.
					if(SystemConstants.Group_type_1.toString().equals(userLoginForm.getGrouptype())){
							
						List listGroupuuids = groupService.getGroupuuidsByUseruuid(
								user.getUuid(), userLoginForm.getGrouptype());
						if(listGroupuuids.size()==0)
							userinfoService.addDefaultKDGroup(user.getUuid(), null);
					}
				}
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setMessage("服务器异常:"+e.getMessage());
				return "";
			}
			
			
			
			
			//培训机构登录走培训流程.
			if(SystemConstants.Group_type_2.toString().equals(userLoginForm.getGrouptype())){
				 pxlogin( user,userLoginForm, model,request);
				 return "";
			}
			
			// 创建session
			HttpSession session = SessionListener
					.getSession((HttpServletRequest) request);

			
			boolean isCurUser=false;
			//判断是否是当前登录用户.
			if (session != null) {
				SessionUserInfoInterface userInfo = (SessionUserInfoInterface) session
						.getAttribute(RestConstants.Session_UserInfo);
				if (userInfo != null && userLoginForm.getLoginname().equals(userInfo.getLoginname())) {
					isCurUser=true;
				}
			}
			if(isCurUser){	// 当前用户,在线直接返回当前用户.
					this.logger.info("userInfo is online,loginName=" + userLoginForm.getLoginname());
					// 返回用户信息
					UserInfoReturn userInfoReturn = new UserInfoReturn();
					try {
						BeanUtils.copyProperties(userInfoReturn, user);
					} catch (Exception e) {
						e.printStackTrace();
					}
				model.put(RestConstants.Return_UserInfo, userInfoReturn);	
			}else{

				session = request.getSession(true);
				SessionListener.putSessionByJSESSIONID(session);
				
				// 返回客户端用户信息放入Map
				// putUserInfoReturnToModel(model, request);
	
				//取相关权限
			
				 //List<groupuuid,rightname>
				
				//String rights_str=StringOperationUtil.specialFormateUsercode(StringUtils.join(rightList, ","));
				//取相关机构
				
			}
			
			UserOfSession userOfSession = new UserOfSession();
			try {
				BeanUtils.copyProperties(userOfSession, user);
			} catch (Exception e) {
				e.printStackTrace();
			}
			//设置session数据
			userinfoService.putSession(userLoginForm.getGrouptype(), session, userOfSession, request);
			// 返回用户信息
			this.putUserInfoReturnToModel(user,model, request);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("登陆成功");
		return "";
	}
	
	//培训机构登录
	public String pxlogin(User user,UserLoginForm userLoginForm, ModelMap model,
			HttpServletRequest request) {
		//model.clear();
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
//			User user;
//			try {
//				user = userinfoService.login(userLoginForm, model, request,
//						responseMessage);
//				if (user==null)// 请求服务返回失败标示
//					return "";
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//				responseMessage.setMessage("服务器异常:"+e.getMessage());
//				return "";
//			}
			// 创建session
			HttpSession session = SessionListener
					.getSession((HttpServletRequest) request);

			
			boolean isCurUser=false;
			//判断是否是当前登录用户.
			if (session != null) {
				SessionUserInfoInterface userInfo = (SessionUserInfoInterface) session
						.getAttribute(RestConstants.Session_UserInfo);
				if (userInfo != null && userLoginForm.getLoginname().equals(userInfo.getLoginname())) {
					isCurUser=true;
				}
			}
			if(isCurUser){
				// 当前用户,在线直接返回当前用户.
					this.logger.info("userInfo is online,loginName=" + userLoginForm.getLoginname());
					// 返回用户信息
					UserInfoReturn userInfoReturn = new UserInfoReturn();
					try {
						BeanUtils.copyProperties(userInfoReturn, user);
					} catch (Exception e) {
						e.printStackTrace();
					}
				model.put(RestConstants.Return_UserInfo, userInfoReturn);	
			}else{

				session = request.getSession(true);
				// this.nSimpleHibernateDao.getHibernateTemplate().evict(user);
				SessionListener.putSessionByJSESSIONID(session);
				// 返回客户端用户信息放入Map
				// putUserInfoReturnToModel(model, request);
	
				//取相关权限
				model.put(RestConstants.Return_JSESSIONID, session.getId());
				 //List<groupuuid,rightname>
				List rightList=rightService.getRightListByUser(user,userLoginForm.getGrouptype());
				//String rights_str=StringOperationUtil.specialFormateUsercode(StringUtils.join(rightList, ","));
				//取相关机构
				List listGroupuuids=groupService.getGroupuuidsByUseruuid(user.getUuid());
				//老数据兼容,如果没有关联默认学校,则关联.
//				if(listGroupuuids==null||!listGroupuuids.contains(SystemConstants.Group_uuid_wjd)){
//					if(!userinfoService.addDefaultKDGroup(user.getUuid(), responseMessage)){
//						responseMessage.setMessage("绑定云代理失败");
//						return "";
//					}
//					listGroupuuids.add(SystemConstants.Group_uuid_wjd);
//				}
				
			}
			model.put(RestConstants.Return_JSESSIONID, session.getId());
			//设置当前用户是否管理员
//			boolean isAdmin=userinfoService.isAdmin(userLoginForm, this.getUserInfoBySession(request), responseMessage);
//			session.setAttribute(RestConstants.Session_isAdmin, isAdmin);
			UserOfSession userOfSession = new UserOfSession();
			try {
				BeanUtils.copyProperties(userOfSession, user);
			} catch (Exception e) {
				e.printStackTrace();
			}
			//设置session数据
			userinfoService.putSession(userLoginForm.getGrouptype(), session, userOfSession, request);
			
			// 返回用户信息
			this.putUserInfoReturnToModel(user,model, request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("登陆成功");
		return "";
	}

	/**
	 * 教师注册
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public String reg(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform) this.bodyJsonToFormObject(
					bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		if (userinfoService.isExitSameUserByLoginName(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码已被注册！");
			return "";
		}
		// 默认注册未普通用户类型
		userRegJsonform.setType(UserinfoService.USER_type_teacher);
		userRegJsonform.setGroup_uuid(SystemConstants.Group_uuid_wjd);
		try {
			boolean flag = userinfoService
					.reg(userRegJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("注册成功");
		return "";
	}

	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public String logout(ModelMap model, HttpServletRequest request) {
		// 创建session
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			HttpSession session = SessionListener.getSession(request);
			if (session != null) {
				// UserInfo
				// userInfo=(UserInfo)session.getAttribute(RestConstants.Session_UserInfo);
				session.invalidate();
			}

			
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}
		// responseMessage.setMessage(new Message("失败消息!", "Failure message"));
		return "";
	}

	/**
	 * 获取用户信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getUserinfo", method = RequestMethod.GET)
	public String getUserinfo(ModelMap model, HttpServletRequest request) {
		try {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			SessionUserInfoInterface sessionUser=this.getUserInfoBySession(request);
			//修复null指针.
			if(sessionUser==null){
				RestUtil.addNoSessionForResponseMessage(responseMessage);
				return "";
			}
			SessionUserInfoInterface user=this.userinfoService.getUser(sessionUser.getUuid());
			if(user!=null){
				String grouptype = request.getParameter("grouptype");
				
				if(StringUtils.isNotBlank(grouptype)){
					String loginType=SessionListener.getLoginTypeBySession(request);
					if(!grouptype.equals(loginType)){//不等,表示切换 到其他模块.重新家长session的属性.
						userinfoService.putSession(grouptype, SessionListener.getSession(request), this.getUserInfoBySession(request), request);
					}
				}
				
			}else{
				String grouptype = request.getParameter("grouptype");
				user=this.userinfoService.getParent(this.getUserInfoBySession(request).getUuid());
				userinfoService.putSessionForSns(grouptype, SessionListener.getSession(request), user, SystemConstants.Session_User_Login_Type_Parent, request);
			}
			
			// 返回用户信息
			this.putUserInfoReturnToModel(user,model, request);
			
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			responseMessage.setMessage("登陆成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 添加用户
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform) this.bodyJsonToFormObject(
					bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		// type 添加用户时需要指定用户类型
//		if (userRegJsonform.getType() == null) {
//			responseMessage.setMessage("用户类型不能为空！");
//			return "";
//		}
		// 默认添加普通用户类型,管理员只有一个.
		userRegJsonform.setType(UserinfoService.USER_type_teacher);
		String mygroup=this.getMyGroupUuidsBySession(request);
		try {
			boolean flag = userinfoService
					.add(userRegJsonform, responseMessage,mygroup);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("增加成功");
		return "";
	}

	/**
	 * 获取用户信息用于通讯录.去掉 wjd的学校.
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@Deprecated
	@RequestMapping(value = "/listForTel", method = RequestMethod.GET)
	public String listForTel(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			List<User4Q> list;
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
					groupuuid=this.getMyGroupUuidsBySession(request);
					if (StringUtils.isEmpty(groupuuid)){
						responseMessage.setMessage("非法用户,没有关联的学校!");
						return "";
					}
				}
			
			}
			list = userinfoService.getUserTelsByGroupuuid(groupuuid,name);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}
		return "";
	}
	
	/**
	 * 获取用户信息用于通讯录.去掉 wjd的学校.
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listForTelByPage", method = RequestMethod.GET)
	public String listForTelByPage(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			pData.setPageSize(50);
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
					groupuuid=this.getMyGroupUuidsBySession(request);
					if (StringUtils.isEmpty(groupuuid)){
						responseMessage.setMessage("非法用户,没有关联的学校!");
						return "";
					}
				}
			
			}
			PageQueryResult list = userinfoService.getUserTelsByGroupuuidByPage(groupuuid,name,pData);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}
		return "";
	}
	/**
	 * 获取用户信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@Deprecated
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			List<User4Q> list;
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
					groupuuid=this.getMyGroupUuidsBySession(request);
					if (StringUtils.isEmpty(groupuuid)){
						responseMessage.setMessage("非法用户,没有关联的学校!");
						return "";
					}
				}
			
			}
			list = userinfoService.getUserByGroupuuid(groupuuid,name);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}
		return "";
	}
	/**
	 * 获取用户信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listByPage", method = RequestMethod.GET)
	public String listByPage(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			pData.setPageSize(50);
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
					groupuuid=this.getMyGroupUuidsBySession(request);
					if (StringUtils.isEmpty(groupuuid)){
						responseMessage.setMessage("非法用户,没有关联的学校!");
						return "";
					}
				}
			
			}
			PageQueryResult list = userinfoService.getUserByGroupuuidByPage(groupuuid,name,pData);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}
		return "";
	}
	
	
	
	/**
	 * 查询所有老师用户信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/alllistByPagewjkj", method = RequestMethod.GET)
	public String alllistByPagewjkj(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			pData.setPageSize(50);
//			String groupuuid = request.getParameter("groupuuid");
//			String name = request.getParameter("name");
//			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
//				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
//					groupuuid=this.getMyGroupUuidsBySession(request);
//					if (StringUtils.isEmpty(groupuuid)){
//						responseMessage.setMessage("非法用户,没有关联的学校!");
//						return "";
//					}
//				}
//			
//			}
			PageQueryResult list = userinfoService.getUserByByPagewjkj(pData);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}
		return "";
	}	
	/**
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updateDisable", method = RequestMethod.POST)
	public String updateDisable(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		boolean flag = userinfoService.updateDisable(
				request.getParameter("disable"), request.getParameter("useruuids"),
				responseMessage);
		if (!flag)// 请求服务返回失败标示
			return "";

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("操作成功");
		return "";
	}
	
	
	
	
	/**
	 * 获取指定用户的角色
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getRole", method = RequestMethod.GET)
	public String getRole(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String groupuuid=request
				.getParameter("groupuuid");
		String useruuid=request
				.getParameter("userUuid");
		List<RoleUserRelation> list = userinfoService.getRoleuuid(groupuuid, useruuid);
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 更新用户权限
	 * @param model
	 * @param request
	 * @return
	 */
	@Deprecated
	@RequestMapping(value = "/updateRole", method = RequestMethod.POST)
	public String updateRole(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		boolean noRight=true;
		try {
			String groupuuid=request.getParameter("groupuuid");
			String roleuuids=request.getParameter("roleuuids");
			String useruuid=request.getParameter("useruuid");
			String type=request.getParameter("type");
			//平台管理员所有都可以修改.
			if(noRight){
				if(RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_role_m, request))noRight=false;
			}
			//该幼儿园管理员才可以修改.
			if(noRight){
				String right=RightConstants.KD_role_m;
				if(SessionListener.isPXLogin(request)){
					right=RightConstants.PX_role_m;
				}
				if(RightUtils.hasRight(groupuuid, right, request))noRight=false;
			}
			
			boolean flag = userinfoService.updateRoleRightRelation(
					roleuuids,
					useruuid,
					groupuuid,
					type,responseMessage);
			if (!flag)
				return "";
			
			String desc="type="+type+"roleuuids="+roleuuids+"|groupuuid="+groupuuid+"|useruuid="+useruuid;
			userinfoService.addLog("updateRoleByUsers","更新用户权限", desc, request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("更新成功");
		return "";
	}
	
	/**
	 * 更新用户权限
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updateRoleByUsers", method = RequestMethod.POST)
	public String updateRoleByUsers(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		boolean noRight=true;
		
		
		try {
		
			String roleuuid=request.getParameter("roleuuid");
			String useruuids=request.getParameter("useruuids");
			String groupuuid=request.getParameter("groupuuid");
			//平台管理员所有都可以修改.
			if(noRight){
				if(RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_role_m, request))noRight=false;
			}
			//该幼儿园管理员才可以修改.
			if(noRight){
				
				String right=RightConstants.KD_teacher_m;
				if(SessionListener.isPXLogin(request)){
					right=RightConstants.PX_teacher_m;
				}
				
				if(RightUtils.hasRight(groupuuid, right, request))noRight=false;
			}
			if(noRight){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			
			boolean flag = userinfoService.updateRoleByUsers(
					roleuuid,
					useruuids,
					groupuuid,responseMessage,request);
			if (!flag)
				return "";
			String desc="roleuuid="+roleuuid+"|groupuuid="+groupuuid+"|useruuids="+useruuids;
			userinfoService.addLog("updateRoleByUsers","更新用户权限", desc, request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("更新成功");
		return "";
	}
	
	
	/**
	 * 修改
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String update(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform) this.bodyJsonToFormObject(
					bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		// 默认注册未普通用户类型
		userRegJsonform.setUuid(this.getUserInfoBySession(request).getUuid());

		try {
			User user = userinfoService
					.update(userRegJsonform, responseMessage);
			if (user==null)// 请求服务返回失败标示
				return "";
			
			//更新session中用户信息
			HttpSession session=SessionListener.getSession(request);
			UserOfSession userOfSession = new UserOfSession();
			try {
				BeanUtils.copyProperties(userOfSession, user);
			} catch (Exception e) {
				e.printStackTrace();
			}
			session.setAttribute(RestConstants.Session_UserInfo, userOfSession);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}


		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}
	
	/**
	   * 返回客户端用户信息放入Map
	   * @param request
	   * @return
	   */
	  protected void putUserInfoReturnToModel( SessionUserInfoInterface  user,ModelMap model,HttpServletRequest request){
	    // 返回用户信息
	    UserInfoReturn userInfoReturn = new UserInfoReturn();
	    try {
	      BeanUtils.copyProperties(userInfoReturn, user);
	      userInfoReturn.setImg(PxStringUtil.imgUrlByUuid(userInfoReturn.getImg()));
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    model.addAttribute(RestConstants.Return_UserInfo,userInfoReturn);
	    HttpSession session =SessionListener.getSession(request);
		model.put(RestConstants.Return_JSESSIONID, session.getId());
	    // //List<groupuuid,rightname>
	    model.addAttribute(RestConstants.Session_UserInfo_rights,session.getAttribute(RestConstants.Session_UserInfo_rights));
	    //返回真正的登录类型.
	    model.addAttribute(RestConstants.LOGIN_TYPE,session.getAttribute(RestConstants.LOGIN_TYPE));
	 // 4.session添加-用户登录类型.
	    model.addAttribute(RestConstants.User_TYPE,session.getAttribute(RestConstants.User_TYPE));
	  }
	
	/**
	 * 修改
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updatepassword", method = RequestMethod.POST)
	public String updatepassword(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform) this.bodyJsonToFormObject(
					bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		// 默认注册未普通用户类型
		userRegJsonform.setUuid(this.getUserInfoBySession(request).getUuid());

		try {
			boolean flag = userinfoService
					.updatePassword(userRegJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}
	
	
	/**
	 * 修改
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updatePasswordBySms", method = RequestMethod.POST)
	public String updatePasswordBySms(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform) this.bodyJsonToFormObject(
					bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		try {
			boolean flag = userinfoService
					.updatePasswordBySms(userRegJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}
	
	
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		User4Q a=null;
		try {
			a = userinfoService.get(uuid);
			if(a==null){
				responseMessage.setMessage("数据不存在!");
				return "";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		
		String mygroup_uuids="";
		try {
			String myRightGroup=this.getMyGroupUuidsBySession(request);
			List list = groupService.getGroupuuidsByUseruuidAndCurUserRight(a.getUuid(),myRightGroup);
			mygroup_uuids=StringUtils.join(list, ",");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
		}
		model.addAttribute("mygroup_uuids",mygroup_uuids);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 组织注册
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveByAdmin", method = RequestMethod.POST)
	public String saveByAdmin(ModelMap model, HttpServletRequest request) {
		
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform) this.bodyJsonToFormObject(
					bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		
		
		try {
			
			// type 添加用户时需要指定用户类型
			if (userRegJsonform.getType() == null) {
				responseMessage.setMessage("用户类型不能为空！");
				return "";
			}
			
//			if (StringUtils.isBlank(userRegJsonform.getGroup_uuid())) {
//				responseMessage.setMessage("关联机构不能为空！");
//				return "";
//			}
			//设置当前用户
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			
			boolean noRight=true;
			String myRightgroup=null;
			
			//平台管理员所有都可以修改.
			if(noRight){
				if(RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_role_m, request))noRight=false;
			}
			//该幼儿园管理员才可以修改.
			if(noRight){
				
				String right=RightConstants.KD_teacher_m;
				if(SessionListener.isPXLogin(request)){
					right=RightConstants.PX_teacher_m;
				}
				myRightgroup=RightUtils.getRightGroups(right, request);
				
				if(StringUtils.isBlank(myRightgroup)){
		            responseMessage.setMessage( RightConstants.Return_msg );
		            return "";
				}
				
				String[] groupStrArr=userRegJsonform.getGroup_uuid().split(",");
				for(int i=0;i<groupStrArr.length;i++){
					
					if(!RightUtils.hasRight(groupStrArr[i], right, request)){
							responseMessage.setMessage("非法操作,没有该幼儿园老师管理权限.");
					}
				}
				
			}
			
			if(StringUtils.isEmpty(userRegJsonform.getUuid())){
				boolean flag = userinfoService
						.add(userRegJsonform, responseMessage,myRightgroup);
				if (!flag)// 请求服务返回失败标示
					return "";
			}
			else{
				User user1 = userinfoService.updateByAdmin(userRegJsonform, responseMessage,myRightgroup,request);
				if (user1==null)// 请求服务返回失败标示
					return "";
				responseMessage.setMessage("修改成功");
			}
			String desc=bodyJson;
			userinfoService.addLog("saveByAdmin","添加用户", desc, request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		
		return "";
	}
	
	/**
	 * 班级删除
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deleteByAdmin", method = RequestMethod.POST)
	public String delete(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_user_del, request)){
			responseMessage.setMessage("没有删除权限");
			return "";
		}
		try {
			
			boolean flag = userinfoService.delete(request.getParameter("uuid"),
					responseMessage,request);
			if (!flag)
				return "";
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("删除成功");
		return "";
	}
	

	/**
	 * 用于客户端缓存
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getUserForJsCache", method = RequestMethod.GET)
	public String getUserForJsCache(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		String uuid=request.getParameter("uuid");
		UserForJsCache a=null;
		try {
			a = userinfoService.getUserForJsCache(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 获取用户基本信息,用于其他用户查看.
	 * @param uuid
	 * @return
	 */
	@RequestMapping(value = "/getBaseInfo", method = RequestMethod.GET)
	public String getBaseInfo(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		String uuid=request.getParameter("uuid");
		User4QBaseInfo a=null;
		try {
		
			a = userinfoService.getUser4QBaseInfo(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	

	/**
	 * 添加用户时,调用接口判断是否已经创建了该电话,并且返回关联学校
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getUserBytel", method = RequestMethod.GET)
	public String getUserBytel(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		String tel=request.getParameter("tel");
		User4Q a=null;
		String mygroup_uuids="";
		try {
			a = userinfoService.getUserBytel(tel);
			if(a!=null){
				List list = groupService.getGroupuuidsByUseruuid(a.getUuid(),SessionListener.getLoginTypeBySession(request));
				mygroup_uuids=StringUtils.join(list, ",");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
		}
		model.addAttribute("mygroup_uuids",mygroup_uuids);
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 获取机构信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listJsCache", method = RequestMethod.GET)
	public String listJsCache(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			List<UserForJsCache> list;
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
					groupuuid=this.getMyGroupUuidsBySession(request);
					if (StringUtils.isEmpty(groupuuid)){
						responseMessage.setMessage("非法用户,没有关联的学校!");
						return "";
					}
				}
			
			}
			list = userinfoService.listJsCache(groupuuid,name);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}
		return "";
	}
	
	
	/**
	 * 问界科技用户管理,添加用户.
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveByAdminWjkj", method = RequestMethod.POST)
	public String saveByAdminWjkj(ModelMap model, HttpServletRequest request) {
		
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform) this.bodyJsonToFormObject(
					bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		
		
		try {
			
			// type 添加用户时需要指定用户类型
			if (userRegJsonform.getType() == null) {
				responseMessage.setMessage("用户类型不能为空！");
				return "";
			}
			//设置当前用户
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			
			String myRightgroup=SystemConstants.Group_uuid_wjkj;
			
			//平台管理员所有都可以修改.
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_role_m, request)){
				responseMessage.setMessage("非法操作,没有管理权限.");
				return "";
			}
			
			if(StringUtils.isEmpty(userRegJsonform.getUuid())){
				boolean flag = userinfoService
						.add(userRegJsonform, responseMessage,myRightgroup);
				if (!flag)// 请求服务返回失败标示
					return "";
			}
			else{
				User user1 = userinfoService.updateByAdmin(userRegJsonform, responseMessage,myRightgroup,request);
				if (user1==null)// 请求服务返回失败标示
					return "";
				responseMessage.setMessage("修改成功");
			}
			String desc=bodyJson;
			userinfoService.addLog("saveByAdmin","添加用户", desc, request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		
		return "";
	}
	
}
