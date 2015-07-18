package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.RoleUserRelation;
import com.company.news.entity.User;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.GroupService;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/userinfo")
public class UserinfoController extends AbstractRESTController {

	@Autowired
	private UserinfoService userinfoService;
	@Autowired
	private GroupService groupService;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(UserLoginForm userLoginForm, ModelMap model,
			HttpServletRequest request) {
		model.clear();
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		boolean flag;
		try {
			flag = userinfoService.login(userLoginForm, model, request,
					responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		
		flag = this.getUserAndGroup(model, request, responseMessage);
		if (!flag)// 请求服务返回失败标示
			return "";

		
		
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
		// 默认注册未普通用户类型
		userRegJsonform.setType(UserinfoService.USER_type_teacher);

		try {
			boolean flag = userinfoService
					.reg(userRegJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("注册成功");
		return "";
	}

	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public String logout(ModelMap model, HttpServletRequest request) {
		// 创建session
		HttpSession session = SessionListener.getSession(request);
		if (session != null) {
			// UserInfo
			// userInfo=(UserInfo)session.getAttribute(RestConstants.Session_UserInfo);
			session.invalidate();
		}

		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
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
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		boolean flag = this.getUserAndGroup(model, request, responseMessage);
		if (!flag)// 请求服务返回失败标示
			return "";
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
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
		if (userRegJsonform.getType() == null) {
			responseMessage.setMessage("用户类型不能为空！");
			return "";
		}

		try {
			boolean flag = userinfoService
					.reg(userRegJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
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
		String groupuuid = request.getParameter("groupuuid");
		List<User> list;
		if (StringUtils.isEmpty(groupuuid))// 查询所有用户
			list = userinfoService.query();
		else
			list = userinfoService.getUserByGroupuuid(groupuuid);

		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
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
	 * 获取登录用户和机构
	 * @param model
	 * @param request
	 * @param responseMessage
	 * @return
	 */
	private boolean getUserAndGroup(ModelMap model,
			HttpServletRequest request,ResponseMessage responseMessage){
		List list = new ArrayList();
		try {
			if(RightUtils.isAdmin(request)){
				list = groupService.getGroupByUseruuidByAdmin(this.getUserInfoBySession(
						request).getUuid());
			}else{
				list = groupService.getKDGroupByUseruuid(this.getUserInfoBySession(
						request).getUuid());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return false;
		}
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);

		
		HttpSession session = SessionListener.getSession(request);
		// 返回用户信息
		this.putUserInfoReturnToModel(model, request);
		model.put(RestConstants.Return_JSESSIONID, session.getId());
		
		return true;
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
		List<RoleUserRelation> list = userinfoService.getRoleuuid(request
				.getParameter("userUuid"));
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	@RequestMapping(value = "/updateRole", method = RequestMethod.POST)
	public String updateRole(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			boolean flag = userinfoService.updateRoleRightRelation(
					request.getParameter("roleuuids"),
					request.getParameter("useruuid"),
					request.getParameter("type"),responseMessage);
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
			responseMessage.setMessage(e.getMessage());
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
			responseMessage.setMessage(e.getMessage());
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
			responseMessage.setMessage(e.getMessage());
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
		User a;
		try {
			a = userinfoService.get(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		
		
		List list = new ArrayList();
		try {
			list = groupService.getGroupByUseruuid(a.getUuid());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
		}
		model.addAttribute("mygroup_uuids", StringUtils.join(list, ","));
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
		

		if(!RightUtils.hasRight(RightConstants. KD_teacher_m,request)){
            responseMessage.setMessage( RightConstants.Return_msg );
}

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
		if (userRegJsonform.getType() == null) {
			responseMessage.setMessage("用户类型不能为空！");
			return "";
		}
		
		//设置当前用户
		User user=this.getUserInfoBySession(request);
		try {
			if(StringUtils.isEmpty(userRegJsonform.getUuid())){
				boolean flag = userinfoService
						.reg(userRegJsonform, responseMessage);
				if (!flag)// 请求服务返回失败标示
					return "";
			}
			else{
				User user1 = userinfoService.update(userRegJsonform, responseMessage);
				if (user1==null)// 请求服务返回失败标示
					return "";
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}
}
