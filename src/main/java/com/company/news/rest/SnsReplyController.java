package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.SnsReplyJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.SnsReplyService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/snsReply")
public class SnsReplyController extends AbstractRESTController {

	@Autowired
	private SnsReplyService snsReplyService;

	/**
	 * 组织注册（回复请求）
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
		SessionUserInfoInterface user=this.getSessionUser(request, responseMessage);
		if(user==null)return "";
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		SnsReplyJsonform snsReplyJsonform;
		try {
			snsReplyJsonform = (SnsReplyJsonform) this.bodyJsonToFormObject(
					bodyJson, SnsReplyJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		//设置当前用户
//		snsReplyJsonform.setContent(MyUbbUtils.htmlToMyUbb(snsReplyJsonform.getContent()));
		try {
			boolean flag;
			if(StringUtils.isEmpty(snsReplyJsonform.getUuid()))
			    flag = snsReplyService.add(user,snsReplyJsonform, responseMessage);
			else
				flag = snsReplyService.update(user,snsReplyJsonform, responseMessage);
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
	 * 获取列表回复列表
	 *	/share/getCourseType.json
	 * @param model
	 * @param request topic_uuid话题UUid
	 * @return
	 */
	@RequestMapping(value = "/listPageByTopic", method = RequestMethod.GET)
	public String listPageByTopic(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String topic_uuid=request.getParameter("topic_uuid");
			//String reply_uuid=null;
			
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = snsReplyService.listPage(pData,topic_uuid,null,request);
			
			model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}
	
	
	

	 /**
	 * 最新话题评论回复,用于管理员审查查询使用
	 *	listPage
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listPageForCheck", method = RequestMethod.GET)
	public String listPageForCheck(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = snsReplyService.listPageForCheck(pData,request);
			
			model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}
	
	 /**
		 * 获取列表单条回复再回复它的接口（参考微信朋友圈XX回复XXXXXTA的概念）
		 *	/share/getCourseType.json
		 * @param model
		 * @param request topic_uuid话题UUid
		 * @return
		 */
		@RequestMapping(value = "/listPageByReply", method = RequestMethod.GET)
		public String listPageByReply(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			try {
			//	String topic_uuid=request.getParameter("topic_uuid");
				String reply_uuid=request.getParameter("reply_uuid");
				
				PaginationData pData = this.getPaginationDataByRequest(request);
				PageQueryResult list = snsReplyService.listPage(pData,null,reply_uuid,request);
				
				model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("服务器异常:"+e.getMessage());
				return "";
			}
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

		try {
			boolean flag = snsReplyService.delete(request.getParameter("uuid"),
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
	 *同意观点
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/yes", method = RequestMethod.GET)
	public String yes(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
			if(user==null){
				return "";
			}
			String uuid=request.getParameter("uuid");
//			PaginationData pData = this.getPaginationDataByRequest(request);
			boolean flag = snsReplyService.updateDianzan(user,uuid,SystemConstants.SnsDianzan_status_yes, responseMessage);
			if(!flag)return "";
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}
	
	 /**
	 * 不同意观点
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/no", method = RequestMethod.GET)
	public String no(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
try {
			
			SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
			if(user==null){
				return "";
			}
			String uuid=request.getParameter("uuid");
//			PaginationData pData = this.getPaginationDataByRequest(request);
			boolean flag = snsReplyService.updateDianzan(user,uuid,SystemConstants.SnsDianzan_status_no, responseMessage);
			if(!flag)return "";
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}
	
	 /**
	 * 不同意观点
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cancelDianzan", method = RequestMethod.GET)
	public String cancelDianzan(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
			if(user==null){
				return "";
			}
			String uuid=request.getParameter("uuid");
//			PaginationData pData = this.getPaginationDataByRequest(request);
			boolean flag = snsReplyService.cancelDianzan(user,uuid, responseMessage);
			if(!flag)return "";
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}
}
