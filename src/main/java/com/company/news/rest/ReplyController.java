package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.commons.util.MyUbbUtils;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.ClassNewsReplyJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.ClassNewsReplyService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/reply")
public class ReplyController extends AbstractRESTController {

	@Autowired
	private ClassNewsReplyService classNewsReplyService;

	/**
	 * 组织注册
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
		ClassNewsReplyJsonform classNewsReplyJsonform;
		try {
			classNewsReplyJsonform = (ClassNewsReplyJsonform) this.bodyJsonToFormObject(
					bodyJson, ClassNewsReplyJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		//设置当前用户
		SessionUserInfoInterface user=this.getSessionUser(request, responseMessage);
			
		classNewsReplyJsonform.setContent(MyUbbUtils.htmlToMyUbb(classNewsReplyJsonform.getContent()));
		try {
			boolean flag;
			if(StringUtils.isEmpty(classNewsReplyJsonform.getUuid()))
			    flag = classNewsReplyService.add(user,classNewsReplyJsonform, responseMessage);
			else
				flag = classNewsReplyService.update(user,classNewsReplyJsonform, responseMessage);
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
	 * 获取班级信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getReplyByNewsuuid", method = RequestMethod.GET)
	public String getReplyByNewsuuid(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			PaginationData pData=this.getPaginationDataByRequest(request);
			pData.setPageSize(5);
			
			
			boolean isQueryAllStatus=false;
			if(RightUtils.hasRightAnyGroup(RightConstants.KD_announce_m,request)||RightUtils.hasRightAnyGroup(RightConstants.PX_announce_m,request)){
				isQueryAllStatus=true;
			}
			
			
			PageQueryResult pageQueryResult = classNewsReplyService.query(request.getParameter("newsuuid"), pData,isQueryAllStatus);
		
			
			
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
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
			
			String uuid=request.getParameter("uuid");
			if(DBUtil.isSqlInjection(uuid, responseMessage))return "";
			SessionUserInfoInterface parent=this.getUserInfoBySession(request);
			
			boolean flag = classNewsReplyService.delete(parent,request.getParameter("uuid"),
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
	

}
