package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.User;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.ClassService;
import com.company.news.service.GroupService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/class")
public class ClassController extends AbstractRESTController {

	@Autowired
	private ClassService classService;

	/**
	 * 组织注册
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		ClassRegJsonform classRegJsonform;
		try {
			classRegJsonform = (ClassRegJsonform) this.bodyJsonToFormObject(
					bodyJson, ClassRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		//设置当前用户
		User user=this.getUserInfoBySession(request);
		classRegJsonform.setCreateUser(user.getName());
		classRegJsonform.setCreateUseruuid(user.getUuid());
		
		try {
			
			
			boolean flag = classService.add(classRegJsonform, responseMessage);
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
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		List<PClass> list = classService.query(request.getParameter("groupuuid"));
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
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
			boolean flag = classService.delete(request.getParameter("uuid"),
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
	
	
	/**
	 * 获取班级信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryClassByUseruuid", method = RequestMethod.GET)
	public String queryClassByUseruuid(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		List<PClass> list = classService.queryClassByUseruuid(request.getParameter("useruuid"));
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
