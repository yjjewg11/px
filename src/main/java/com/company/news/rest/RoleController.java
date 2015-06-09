package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
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
@RequestMapping(value = "/role")
public class RoleController extends AbstractRESTController{

	@Autowired
	private UserinfoService userinfoService;

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(UserLoginForm userLoginForm, ModelMap model, HttpServletRequest request) {

		return "";
	}
	
	/**
	 * 教师注册
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String delete( ModelMap model,HttpServletRequest request) {

        return "";
    }


	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String update(ModelMap model, HttpServletRequest request) {

		return "";
	}




    /**
     * 获取用户信息
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list( ModelMap model, HttpServletRequest request) {

        return "";
    }
    

	@RequestMapping(value = "/updateRight", method = RequestMethod.POST)
	public String updateRight(ModelMap model, HttpServletRequest request) {

		return "";
	}

    
    
}
