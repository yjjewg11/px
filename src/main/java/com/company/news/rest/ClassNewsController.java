package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.ClassNews;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.User;
import com.company.news.jsonform.ClassNewsJsonform;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.ClassNewsService;
import com.company.news.service.ClassService;
import com.company.news.service.GroupService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/classnews")
public class ClassNewsController extends AbstractRESTController {

	@Autowired
	private ClassNewsService classNewsService;

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
		ClassNewsJsonform classNewsJsonform;
		try {
			classNewsJsonform = (ClassNewsJsonform) this.bodyJsonToFormObject(
					bodyJson, ClassNewsJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		//设置当前用户
		User user=this.getUserInfoBySession(request);
		classNewsJsonform.setCreate_user(user.getName());
		classNewsJsonform.setCreate_useruuid(user.getUuid());
		
		try {
			boolean flag;
			if(StringUtils.isEmpty(classNewsJsonform.getUuid()))
			    flag = classNewsService.add(classNewsJsonform, responseMessage);
			else
				flag = classNewsService.update(classNewsJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}


	/**
	 * 获取班级信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getClassNewsByClassuuid", method = RequestMethod.GET)
	public String getClassNewsByClassuuid(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PaginationData pData=this.getPaginationDataByRequest(request);
		
		PageQueryResult pageQueryResult = classNewsService.query(request.getParameter("classuuid"), pData);
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

		try {
			boolean flag = classNewsService.delete(request.getParameter("uuid"),
					responseMessage);
			if (!flag)
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
		ClassNews c;
		try {
			c = classNewsService.get(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,c);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
