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
import com.company.news.entity.Message;
import com.company.news.entity.User;
import com.company.news.jsonform.AnnouncementsJsonform;
import com.company.news.jsonform.MessageJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.AnnouncementsService;
import com.company.news.service.MessageService;
import com.company.news.vo.AnnouncementsVo;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/message")
public class MessageController extends AbstractRESTController {

	@Autowired
	private MessageService messageService;

	
	/**
	 * 给老家长写信
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveToParent", method = RequestMethod.POST)
	public String saveToParent(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		MessageJsonform messageJsonform;
		try {
			messageJsonform = (MessageJsonform) this.bodyJsonToFormObject(
					bodyJson, MessageJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		//设置当前用户
		User user=this.getUserInfoBySession(request);
		messageJsonform.setSend_user(user.getName());
		messageJsonform.setSend_useruuid(user.getUuid());
		messageJsonform.setType(SystemConstants.Message_type_1);//
		
		try {
			boolean flag;
			    flag = messageService.add(messageJsonform, responseMessage);

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
		responseMessage.setMessage("修改成功");
		return "";
	}
//
//	/**
//	 * 保存(不用)
//	 * 
//	 * @param model
//	 * @param request
//	 * @return
//	 */
//	@RequestMapping(value = "/save", method = RequestMethod.POST)
//	public String save(ModelMap model, HttpServletRequest request) {
//		
//		
//		// 返回消息体
//		ResponseMessage responseMessage = RestUtil
//				.addResponseMessageForModelMap(model);
//		if(!RightUtils.hasRight(RightConstants.KD_announce_m,request)){
//			responseMessage.setMessage(RightConstants.Return_msg);
//			return "";
//		}
//		// 请求消息体
//		String bodyJson = RestUtil.getJsonStringByRequest(request);
//		MessageJsonform messageJsonform;
//		try {
//			messageJsonform = (MessageJsonform) this.bodyJsonToFormObject(
//					bodyJson, MessageJsonform.class);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			responseMessage.setMessage(error_bodyJsonToFormObject);
//			return "";
//		}
//		
//		//设置当前用户
//		User user=this.getUserInfoBySession(request);
//		messageJsonform.setSend_user(user.getName());
//		messageJsonform.setSend_useruuid(user.getUuid());
//		
//		try {
//			boolean flag;
//			    flag = messageService.add(messageJsonform, responseMessage);
//
//			if (!flag)// 请求服务返回失败标示
//				return "";
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//			responseMessage.setMessage(e.getMessage());
//			return "";
//		}
//
//		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
//		responseMessage.setMessage("修改成功");
//		return "";
//	}


	/**
	 * 根据分类获取所有，管理员用
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		PaginationData pData = this.getPaginationDataByRequest(request);
		PageQueryResult pageQueryResult= messageService.query(request.getParameter("type"),request.getParameter("useruuid"),pData);
	
		model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 查询我的及时消息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryMyTimely", method = RequestMethod.GET)
	public String queryMyTimely(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		//设置当前用户
		User user=this.getUserInfoBySession(request);
		
		PaginationData pData = this.getPaginationDataByRequest(request);
		PageQueryResult pageQueryResult= messageService.query(SystemConstants.Message_type_0.toString(),user.getUuid(),pData);
		model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
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
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public String delete(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		if(!RightUtils.hasRight(RightConstants.KD_announce_m,request)){
			responseMessage.setMessage(RightConstants.Return_msg);
			return "";
		}
		try {
			boolean flag = messageService.delete(request.getParameter("uuid"),
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
	
	
	/**
	 * 班级删除
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/read", method = RequestMethod.POST)
	public String read(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			boolean flag = messageService.read(request.getParameter("uuid"),
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
	
	

	
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Message m;
		try {
			m = messageService.get(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,m);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
