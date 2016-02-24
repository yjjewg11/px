package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.entity.Group;
import com.company.news.entity.Group4Q;
import com.company.news.entity.Group4QBaseInfo;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.CountService;
import com.company.news.service.GroupService;
import com.company.news.service.UserinfoService;
import com.company.news.session.UserOfSession;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/group")
public class GroupController extends AbstractRESTController {
	 @Autowired
     private CountService countService ;
		@Autowired
		private UserinfoService userinfoService;
	@Autowired
	private GroupService groupService;

	/**
	 * 组织注册
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
		GroupRegJsonform groupRegJsonform;
		try {
			groupRegJsonform = (GroupRegJsonform) this.bodyJsonToFormObject(
					bodyJson, GroupRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			boolean flag = groupService.reg(groupRegJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("注册成功");
		return "";
	}

	/**
	 * 组织增加
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(ModelMap model, HttpServletRequest request) {
		
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String right=RightConstants.KD_group_m;
		if(SessionListener.isPXLogin(request)){
			right=RightConstants.PX_group_m;
		}
		if(!RightUtils.hasRightAnyGroup(right,request)){
            responseMessage.setMessage( RightConstants.Return_msg );
            return "";
		}

		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		GroupRegJsonform groupRegJsonform;
		try {
			groupRegJsonform = (GroupRegJsonform) this.bodyJsonToFormObject(
					bodyJson, GroupRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		try {
			boolean flag;
			if (StringUtils.isEmpty(groupRegJsonform.getUuid())){
				flag = groupService.add(groupRegJsonform, responseMessage, this
						.getUserInfoBySession(request).getUuid());
				String grouptype=groupRegJsonform.getType()+"";
				if(StringUtils.isBlank(grouptype))grouptype="1";
				userinfoService.putSession(grouptype, SessionListener.getSession(request), (UserOfSession)this.getUserInfoBySession(request), request);
			}

			else

				flag = groupService.update(groupRegJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("操作成功");
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
			List<Group4Q> list = groupService.query();
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		return "";
	}
	

	
	
	/**
	 *
	 * 获取所有机构查询服务器
	 * @param model
	 * @param request
	 * @return
	 */

	@RequestMapping(value = "/allListByRightwjkj", method = RequestMethod.GET)
	public String allListByRightwjkj(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
			
			PaginationData pData = this.getPaginationDataByRequest(request);
			
			
			String right=RightConstants.AD_group_m;
			String type=request.getParameter("type");
			
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, right, request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}		
			
			// queryByPage 
			PageQueryResult pageQueryResult = this.groupService.queryByPage(type,pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
	}	
	
	
	
	/**
	 * 获取我的机构信息
	 * 
	 * @param model
	 * @param request
	 * @return AD_group_m 查询所有后台信息
	 */
	@RequestMapping(value = "/myListByRight", method = RequestMethod.GET)
	public String myListByRight(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		
		String right=RightConstants.KD_group_m;
		if(SessionListener.isPXLogin(request)){
			right=RightConstants.PX_group_m;
		}
		
		String groupList=RightUtils.getRightGroups(right, request);
		
		if(StringUtils.isBlank(groupList)){
			responseMessage.setMessage(RightConstants.Return_msg);
			return "";
		}
		List list = groupService.getGroupByuuids(groupList);
		
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 获取我的机构信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/myList", method = RequestMethod.GET)
	public String myList(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		List list=null;
		if(SessionListener.isPXLogin(request)){
			 list = groupService.getPXGroupByUseruuid(this.getUserInfoBySession(
					request).getUuid());
		}else{
			 list = groupService.getGroupByUseruuid(this.getUserInfoBySession(
					request).getUuid());
		}

		
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	

	@RequestMapping(value = "/getBaseInfo", method = RequestMethod.GET)
	public String getBaseInfo(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Group4QBaseInfo c;
		try {
			String uuid=request.getParameter("uuid");
			c = groupService.getGroup4QBaseInfo(uuid);
			
			
			model.put(RestConstants.Return_ResponseMessage_count, countService.get(uuid, SystemConstants.common_type_Kindergarten_introduction));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,c);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	

	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Group c;
		try {
			c = groupService.get(uuid);
			
			
			model.put(RestConstants.Return_ResponseMessage_count, countService.get(uuid, SystemConstants.common_type_Kindergarten_introduction));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,c);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
