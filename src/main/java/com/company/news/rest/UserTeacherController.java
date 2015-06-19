package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.company.news.entity.Group;
import com.company.news.entity.User;
import com.company.news.entity.UserTeacher;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.jsonform.UserTeacherJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.GroupService;
import com.company.news.service.UserTeacherService;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/userteacher")
public class UserTeacherController extends AbstractRESTController {

	@Autowired
	private UserTeacherService userTeacherService;


	/**
	 * 教师注册
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
		UserTeacherJsonform userTeacherJsonform;
		try {
			userTeacherJsonform = (UserTeacherJsonform) this.bodyJsonToFormObject(
					bodyJson, UserTeacherJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		// 默认注册未普通用户类型
		userTeacherJsonform.setUseruuid(this.getUserInfoBySession(request).getUuid());

		try {
			boolean flag = userTeacherService
					.save(userTeacherJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("注册成功");
		return "";
	}


	/**
	 * 获取用户信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public String get(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		UserTeacher ut= userTeacherService.get(this.getUserInfoBySession(request).getUuid());
		model.addAttribute(RestConstants.Return_G_entity, ut);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}


}
