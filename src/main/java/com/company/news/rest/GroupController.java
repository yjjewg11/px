package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/group")
public class GroupController extends AbstractRESTController{

	@Autowired
	private UserinfoService userinfoService;

	
	/**
	 * 组织注册
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
    public String reg( ModelMap model,HttpServletRequest request) {
		//返回消息体
		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		//请求消息体
		String bodyJson=RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform)this.bodyJsonToFormObject(bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			userinfoService.reg(UserinfoService.USER_type_teacher, userRegJsonform, responseMessage);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			responseMessage.setMessage(e.getMessage());
		}
        
        return "";
    }



}
