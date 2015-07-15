package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.ClassNews;
import com.company.news.entity.ClassNewsDianzan;
import com.company.news.entity.Cookbook;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.User;
import com.company.news.jsonform.ClassNewsDianzanJsonform;
import com.company.news.jsonform.ClassNewsJsonform;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.service.ClassNewsDianzanService;
import com.company.news.service.ClassNewsService;
import com.company.news.service.ClassService;
import com.company.news.service.GroupService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/classnews")
public class DianzanController extends AbstractRESTController {

	@Autowired
	private ClassNewsDianzanService classNewsDianzanService;

	@RequestMapping(value = "/dianzan", method = RequestMethod.POST)
	public String dianzan(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		ClassNewsDianzanJsonform classNewsJsonform;
		try {
			classNewsJsonform = (ClassNewsDianzanJsonform) this
					.bodyJsonToFormObject(bodyJson,
							ClassNewsDianzanJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		// 设置当前用户
		User user = this.getUserInfoBySession(request);
		classNewsJsonform.setCreate_user(user.getName());
		classNewsJsonform.setCreate_useruuid(user.getUuid());

		try {
			boolean flag;
			flag = classNewsDianzanService.dianzan(classNewsJsonform, responseMessage);
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

	@RequestMapping(value = "/getDianzanByNewsuuid", method = RequestMethod.GET)
	public String getDianzanByNewsuuid(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String newsuuid = request.getParameter("newsuuid");

		List list;
		try {
			list = classNewsDianzanService.getDianzanByNewsuuid(newsuuid);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	
	@RequestMapping(value = "/canceldianzan", method = RequestMethod.POST)
	public String cancelDianzan(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		ClassNewsDianzanJsonform classNewsJsonform;
		try {
			classNewsJsonform = (ClassNewsDianzanJsonform) this
					.bodyJsonToFormObject(bodyJson,
							ClassNewsDianzanJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		// 设置当前用户
		User user = this.getUserInfoBySession(request);
		classNewsJsonform.setCreate_user(user.getName());
		classNewsJsonform.setCreate_useruuid(user.getUuid());

		try {
			boolean flag;
			flag = classNewsDianzanService.cancelDianzan(classNewsJsonform, responseMessage);
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

}
