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
import com.company.news.rest.util.RestUtil;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/userinfo")
public class UserinfoController extends AbstractRESTController{

	@Autowired
	private UserinfoService userinfoService;
	
	public UserinfoService getUserinfoService() {
		return userinfoService;
	}

	public void setUserinfoService(UserinfoService userinfoService) {
		this.userinfoService = userinfoService;
	}
//

//
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	 @ResponseBody
	public ModelMap login(UserLoginForm userLoginForm, ModelMap model, HttpServletRequest request) {

		// 清除原输入参数MAP
		model.clear();
		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);

		 try {
		   userinfoService.login(userLoginForm, model, request, responseMessage);
	        } catch (Exception e) {
	          e.printStackTrace();
	           responseMessage = RestUtil.addResponseMessageForModelMap(model);
	          responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
	          responseMessage.setMessage(e.getMessage());
	        }
	
		return model;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
    public String reg( ModelMap model, HttpServletRequest request) {
        try {
          String bodyJson=RestUtil.getJsonStringByRequest(request);
          userinfoService.reg(bodyJson, model, request);
        } catch (Exception e) {
          e.printStackTrace();
          ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
          responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
          responseMessage.setMessage(e.getMessage());
        }
        return "";
    }

	   @RequestMapping(value = "/modify", method = RequestMethod.POST)
	    public String modify( ModelMap model, HttpServletRequest request) {
	        try {
	          String bodyJson=RestUtil.getJsonStringByRequest(request);
	          userinfoService.modify(bodyJson, model, request);
	        } catch (Exception e) {
	          e.printStackTrace();
	          ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
	          responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
	          responseMessage.setMessage(e.getMessage());
	        }
	        return "";
	    }
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public String logout(ModelMap model, HttpServletRequest request) {
		// 创建session
		HttpSession session = SessionListener.getSession(request);
		if (session != null) {
			// UserInfo
			// userInfo=(UserInfo)session.getAttribute(RestConstants.Session_UserInfo);
			session.invalidate();
		}

		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		// responseMessage.setMessage(new Message("失败消息!", "Failure message"));
		return "";
	}


    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout1(ModelMap model, HttpServletRequest request) {
        // 创建session
        HttpSession session = SessionListener.getSession(request);
        if (session != null) {
            // UserInfo
            // userInfo=(UserInfo)session.getAttribute(RestConstants.Session_UserInfo);
            session.invalidate();
        }

        ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
        // responseMessage.setMessage(new Message("失败消息!", "Failure message"));
        return "";
    }

    /**
     * 获取用户信息
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/getUserinfo", method = RequestMethod.GET)
    public String getUserinfo( ModelMap model, HttpServletRequest request) {
        model.clear();
        RestUtil.addResponseMessageForModelMap(model);
        HttpSession session = SessionListener.getSession(request);
        // 返回用户信息
        this.userinfoService.putUserInfoReturnToModel(model, request);
        model.put(RestConstants.Return_JSESSIONID, session.getId());
        //model.put(RestConstants.Return_UserInfo, userInfoReturn);
        return "";
    }
}
