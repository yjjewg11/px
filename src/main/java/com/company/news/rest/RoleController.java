package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.entity.Role;
import com.company.news.entity.RoleRightRelation;
import com.company.news.jsonform.RoleJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.RoleService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/role")
public class RoleController extends AbstractRESTController {

	@Autowired
	private RoleService roleService;

	/**
	 * 教师注册
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public String delete(ModelMap model, HttpServletRequest request) {
		
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		if (!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants. AD_role_del ,request)){
            responseMessage.setMessage( RightConstants.Return_msg );
            return "";

		}
		try {
			boolean flag = roleService.delete(request.getParameter("uuid"),
					responseMessage);
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

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		if (!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants. AD_role_m ,request)){
            responseMessage.setMessage( RightConstants.Return_msg );
            return "";

		}
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		RoleJsonform roleJsonform;
		try {
			roleJsonform = (RoleJsonform) this.bodyJsonToFormObject(bodyJson,
					RoleJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		try {
			String uuid = roleJsonform.getUuid();
			Role role;
			if (StringUtils.isEmpty(uuid))
				role = roleService.add(roleJsonform, responseMessage);
			else
				role = roleService.update(roleJsonform, responseMessage);
			if (role != null)
				model.addAttribute(role);
			else
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
	 * 获取所有角色
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String type=request.getParameter("type");
		if(StringUtils.isBlank(type)||SystemConstants.Group_type_0.toString().equals(type)){
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_role_m, request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
		}
		List<Role> list = roleService.query(type);
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	/**
	 * 获取指定角色的权限
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getRight", method = RequestMethod.GET)
	public String getRight(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		List<RoleRightRelation> list = roleService.getRightByRoleuuid(request
				.getParameter("uuid"));
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	@RequestMapping(value = "/updateRight", method = RequestMethod.POST)
	public String updateRight(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			boolean flag = roleService.updateRoleRightRelation(
					request.getParameter("roleuuid"),
					request.getParameter("rightuuid"), responseMessage);
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
	 * 获取角色Uuid和用户uuid的关系列表,根据groupuuid
	 * 获取一个幼儿园的所有用户角色关联信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getRoleUserBy", method = RequestMethod.GET)
	public String listby(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String groupuuid=request.getParameter("groupuuid");
			List list = roleService.getRoleUserRelationBy(groupuuid);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
			.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

}
