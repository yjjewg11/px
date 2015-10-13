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
import org.springframework.web.bind.annotation.RequestParam;

import com.company.news.entity.Accounts;
import com.company.news.entity.User;
import com.company.news.jsonform.AccountsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.AccountsService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/accounts")
public class AccountsController extends AbstractRESTController {
	
	@Autowired
	private AccountsService accountsService;

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
		AccountsJsonform accountsJsonform;
		try {
			accountsJsonform = (AccountsJsonform) this.bodyJsonToFormObject(
					bodyJson, AccountsJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		try {
			if (StringUtils.isBlank(accountsJsonform.getGroupuuid())) {
				responseMessage.setMessage("必须选择一个学校");
				return "";
			}
			
			if(!RightUtils.hasRight(accountsJsonform.getGroupuuid(),RightConstants.KD_accounts_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			//设置当前用户
			User user=this.getUserInfoBySession(request);
			accountsJsonform.setCreate_user(user.getName());
			accountsJsonform.setCreate_useruuid(user.getUuid());
		
			boolean flag;
			if(StringUtils.isEmpty(accountsJsonform.getUuid()))
			    flag = accountsService.add(accountsJsonform, responseMessage);
			else
				flag = accountsService.update(accountsJsonform, responseMessage);

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


	/**
	 * 根据分类获取所有，管理员用
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@Deprecated
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
		
			String groupuuid= request.getParameter("groupuuid");
			
			if (StringUtils.isBlank(groupuuid)) {
				responseMessage.setMessage("必须选择一个学校");
				return "";
			}
			
			if(!RightUtils.hasRight(groupuuid,RightConstants.KD_accounts_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			List list = accountsService.query(request.getParameter("begDateStr"),request.getParameter("endDateStr"),
					request.getParameter("type"),groupuuid,request.getParameter("classuuid"));
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 根据分类获取所有，管理员用
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listByPage", method = RequestMethod.GET)
	public String listByPage(ModelMap model, HttpServletRequest request, AccountsJsonform accountsJsonform) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PaginationData pData = this.getPaginationDataByRequest(request);
		
		try {
		
			if (StringUtils.isBlank(accountsJsonform.getGroupuuid())) {
				responseMessage.setMessage("必须选择一个学校");
				return "";
			}
			
			if(!RightUtils.hasRight(accountsJsonform.getGroupuuid(),RightConstants.KD_accounts_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			
			String begDateStr=request.getParameter("begDateStr");
			String endDateStr=request.getParameter("endDateStr");
//			String type=request.getParameter("type");
//			String classuuid=request.getParameter("classuuid");
			
			PageQueryResult pageQueryResult = accountsService.listByPage(pData,begDateStr,endDateStr, accountsJsonform);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
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
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public String delete(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
//		if(!RightUtils.hasRight(RightConstants.KD_accounts_m,request)){
//			responseMessage.setMessage(RightConstants.Return_msg);
//			return "";
//		}
		try {
//			boolean flag = accountsService.delete(request.getParameter("uuid"),
//					responseMessage);
//			if (!flag)
//				return "";
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
		Accounts a;
		try {
			a = accountsService.get(uuid);
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
