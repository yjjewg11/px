package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
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
import com.company.news.entity.Group4Q;
import com.company.news.entity.RoleUserRelation;
import com.company.news.entity.User;
import com.company.news.entity.User4Q;
import com.company.news.entity.UserForJsCache;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.StringOperationUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.GroupService;
import com.company.news.service.RightService;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.UserInfoReturn;
import com.company.web.listener.SessionListener;

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
			HttpServletRequest request) {
		model.clear();
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			User user;
			try {
				user = userinfoService.login(userLoginForm, model, request,
						responseMessage);
				if (user==null)// 请求服务返回失败标示
					return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setMessage("服务器异常:"+e.getMessage());
				return "";
			}
			
			
			// 创建session
			HttpSession session = SessionListener
					.getSession((HttpServletRequest) request);

			if (session != null) {
				User userInfo = (User) session
						.getAttribute(RestConstants.Session_UserInfo);
				if (userInfo != null && userLoginForm.getLoginname().equals(userInfo.getLoginname())) {
					// 当前用户,在线直接返回当前用户.
					this.logger.info("userInfo is online,loginName=" + userLoginForm.getLoginname());
					// 返回用户信息
					UserInfoReturn userInfoReturn = new UserInfoReturn();
					try {
						BeanUtils.copyProperties(userInfoReturn, user);
					} catch (Exception e) {
						e.printStackTrace();
					}
					model.put(RestConstants.Return_JSESSIONID, session.getId());
					model.put(RestConstants.Return_UserInfo, userInfoReturn);			
				}
			}else{

			session = request.getSession(true);
			// this.nSimpleHibernateDao.getHibernateTemplate().evict(user);
			SessionListener.putSessionByJSESSIONID(session);
			session.setAttribute(RestConstants.Session_UserInfo, user);
			// 返回客户端用户信息放入Map
			// putUserInfoReturnToModel(model, request);

			//取相关权限
			model.put(RestConstants.Return_JSESSIONID, session.getId());
			 //List<groupuuid,rightname>
			List rightList=rightService.getRightListByUser(user);
			//String rights_str=StringOperationUtil.specialFormateUsercode(StringUtils.join(rightList, ","));
			//取相关机构
			List listGroupuuids=groupService.getGroupuuidsByUseruuid(user.getUuid());
			//老数据兼容,如果没有关联默认学校,则关联.
			if(listGroupuuids==null||!listGroupuuids.contains(SystemConstants.Group_uuid_wjd)){
				if(!userinfoService.addDefaultKDGroup(user.getUuid(), responseMessage)){
					responseMessage.setMessage("绑定云代理失败");
					return "";
				}
				listGroupuuids.add(SystemConstants.Group_uuid_wjd);
			}
			session.setAttribute(RestConstants.Session_UserInfo_rights, rightList);
			session.setAttribute(RestConstants.Session_MygroupUuids, StringUtils.join(listGroupuuids, ","));
			}
			
			//设置当前用户是否管理员
			boolean isAdmin=userinfoService.isAdmin(userLoginForm, this.getUserInfoBySession(request), responseMessage);
			session.setAttribute(RestConstants.Session_isAdmin, isAdmin);

			
			// 返回用户信息
			this.putUserInfoReturnToModel(model, request);
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

			// 返回用户信息
			this.putUserInfoReturnToModel(model, request);
			
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
	 * 获取机构信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
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
				if(RightUtils.hasRight(groupuuid, RightConstants.KD_role_m, request))noRight=false;
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
				if(RightUtils.hasRight(groupuuid, RightConstants.KD_role_m, request))noRight=false;
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
			session.setAttribute(RestConstants.Session_UserInfo, user);
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
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		
		
		List<Group4Q> list = new ArrayList();
		String mygroup_uuids="";
		try {
			list = groupService.getGroupByUseruuid(a.getUuid());
			for(Group4Q o:list){
				mygroup_uuids+=o.getUuid()+",";
			}
			mygroup_uuids=StringOperationUtil.trimSeparatorChars(mygroup_uuids);
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
			
			if (StringUtils.isBlank(userRegJsonform.getGroup_uuid())) {
				responseMessage.setMessage("关联机构不能为空！");
				return "";
			}
			//设置当前用户
			User user=this.getUserInfoBySession(request);
			
			boolean noRight=true;
			String mygroup=this.getMyGroupUuidsBySession(request);
			
			//平台管理员所有都可以修改.
			if(noRight){
				if(RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_role_m, request))noRight=false;
			}
			//该幼儿园管理员才可以修改.
			if(noRight){
				mygroup=RightUtils.getRightGroups(RightConstants. KD_teacher_m, request);
				
				if(StringUtils.isBlank(mygroup)){
		            responseMessage.setMessage( RightConstants.Return_msg );
		            return "";
				}
				
				String[] groupStrArr=userRegJsonform.getGroup_uuid().split(",");
				for(int i=0;i<groupStrArr.length;i++){
					if(!RightUtils.hasRight(groupStrArr[i], RightConstants.KD_role_m, request)){
							responseMessage.setMessage("非法操作,没有该幼儿园老师管理权限.");
					}
				}
				
			}
			
			if(StringUtils.isEmpty(userRegJsonform.getUuid())){
				boolean flag = userinfoService
						.add(userRegJsonform, responseMessage,mygroup);
				if (!flag)// 请求服务返回失败标示
					return "";
			}
			else{
				User user1 = userinfoService.updateByAdmin(userRegJsonform, responseMessage,mygroup);
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
		
		try {
			
			boolean flag = userinfoService.delete(request.getParameter("uuid"),
					responseMessage,request);
			if (!flag)
				return "";
			
			String desc="uuid="+request.getParameter("uuid");
			userinfoService.addLog("deleteByAdmin","删除用户", desc, request);
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
	
}
