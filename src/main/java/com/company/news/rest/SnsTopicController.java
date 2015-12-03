package com.company.news.rest; 
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.entity.SnsTopic;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.SnsTopicJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.SnsTopicService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/snsTopic")
public class SnsTopicController extends AbstractRESTController {

	@Autowired
	private SnsTopicService snsTopicService;

	/**
	 * 保存
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
		SnsTopicJsonform jsonform;
		try {
			jsonform = (SnsTopicJsonform) this.bodyJsonToFormObject(
					bodyJson, SnsTopicJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			SnsTopic flag;
			if(StringUtils.isEmpty(jsonform.getUuid())){
				
				flag = snsTopicService.add(jsonform, responseMessage,request);
			}
			else{
				flag = snsTopicService.update(jsonform, responseMessage,request);
			}
			if (flag==null)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("保存成功");
		return "";
	}



	 /**
	 * 获取列表
	 *	/share/getCourseType.json
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listPage", method = RequestMethod.GET)
	public String getCourseType(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String section_id=request.getParameter("section_id");
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = snsTopicService.listPage(pData,section_id,request);
			
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
//				PaginationData pData = this.getPaginationDataByRequest(request);
				boolean flag = snsTopicService.updateDianzan(user,uuid,SystemConstants.SnsDianzan_status_yes, responseMessage);
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
//				PaginationData pData = this.getPaginationDataByRequest(request);
				boolean flag = snsTopicService.updateDianzan(user,uuid,SystemConstants.SnsDianzan_status_no, responseMessage);
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
//				PaginationData pData = this.getPaginationDataByRequest(request);
				boolean flag = snsTopicService.cancelDianzan(user,uuid, responseMessage);
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
