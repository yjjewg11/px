package com.company.news.rest;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.SnsTopic;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.SnsTopicJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.CountService;
import com.company.news.service.SnsTopicService;
import com.company.news.vo.AnnouncementsVo;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

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
				String section_id=request.getParameter("topic_uuid");
//				PaginationData pData = this.getPaginationDataByRequest(request);
//				PageQueryResult list = snsTopicService.listPage(pData,section_id,request);
//				
//				model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
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
				String section_id=request.getParameter("topic_uuid");
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
		
		
		
		
		private CountService countService;
		@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
		public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			SnsTopic a;
			try {
				

				
				
				a = snsTopicService.get(uuid);
				if(a==null){
					responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
					responseMessage.setMessage("数据不存在.");
					return "";
				}
				if(SystemConstants.Check_status_disable.equals(a.getStatus())){
					responseMessage.setMessage("数据已被禁止浏览!");
					return "";
					//判断是否有权限.有权限的人可以浏览.禁用的.
//					if(!RightUtils.hasRight(a.getGroupuuid(),right, request)){
//						
//						responseMessage.setMessage("数据已被禁止浏览!");
//						return "";
//					}
				}
				String share_url=null;
//				if(!PxStringUtil.isUrl(a.getUrl())){
//					share_url=PxStringUtil.getArticleByUuid(uuid);
//				}else{
//				//	model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_jingpinwenzhang));
//					share_url=a.getUrl();
//				}
				model.put(RestConstants.Return_ResponseMessage_share_url,share_url);
				
				SessionUserInfoInterface user=this.getUserInfoBySession(request);
//				model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getAnnByUuid(uuid));
//				model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid,a.getType()));
//				model.put(RestConstants.Return_ResponseMessage_isFavorites,announcementsService.isFavorites( user.getUuid(),uuid));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
			model.addAttribute(RestConstants.Return_G_entity,a);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		}
		
}
