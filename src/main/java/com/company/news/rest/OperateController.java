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

import com.company.news.entity.PClass;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.OperateJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.ClassService;
import com.company.news.service.OperateService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/operate")
public class OperateController extends AbstractRESTController {

	@Autowired
	private OperateService operateService;

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
		OperateJsonform operateJsonform;
		try {
			operateJsonform = (OperateJsonform) this.bodyJsonToFormObject(
					bodyJson, OperateJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		SessionUserInfoInterface user = this.getUserInfoBySession(request);
		// 设置当前用户
		operateJsonform.setCreate_user(user.getName());
		operateJsonform.setCreate_useruuid(user.getUuid());

		try {
			boolean flag = operateService.add(operateJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}

	/**
	 * 获取我的相关班级信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String query(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String groupuuid = request.getParameter("groupuuid");
		String studentuuid = request.getParameter("studentuuid");
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			pData.setPageSize(5);
			PageQueryResult pageQueryResult = operateService.query(groupuuid,
					studentuuid, pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list,
					pageQueryResult);
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
			return "";
		}
		return "";
	}
}
