package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.UserInfoUpdateTraceService;
import com.company.news.vo.ResponseMessage;
@Controller
@RequestMapping(value = "/userInfoUpdateTrace")
public class UserInfoUpdateTraceController extends AbstractRESTController {

	@Autowired
	private UserInfoUpdateTraceService userInfoUpdateTraceService;


	


	/**
	 * 获取修改资料日志
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryMyinfo", method = RequestMethod.GET)
	public String queryMyinfo(ModelMap model, HttpServletRequest request,PaginationData pData) {
		model.clear();
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		//设置当前用户
		SessionUserInfoInterface user=this.getUserInfoBySession(request);
		
		try {
			PageQueryResult pageQueryResult= userInfoUpdateTraceService.queryInfo(user,pData,model);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
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
	 * 获取修改资料日志
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryMyPassword", method = RequestMethod.GET)
	public String queryMyPassword(ModelMap model, HttpServletRequest request,PaginationData pData) {
		model.clear();
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		//设置当前用户
		SessionUserInfoInterface user=this.getUserInfoBySession(request);
		
		try {
			PageQueryResult pageQueryResult= userInfoUpdateTraceService.queryPassword(user,pData,model);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
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
	
}
