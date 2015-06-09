package com.company.news.rest;

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
import com.company.news.entity.Right;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.RightService;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/right")
public class RightController extends AbstractRESTController{

	@Autowired
	private RightService rightService;

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(ModelMap model, HttpServletRequest request) {
		//返回消息体
		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		try {
			Right right=rightService.add(request.getParameter("name"),request.getParameter("description"), responseMessage);		
			if(right!=null)
			model.addAttribute(right);
			else
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("添加成功");
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
		//返回消息体
		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		
		try {
			boolean flag=rightService.delete(request.getParameter("uuid"), responseMessage);
		    if(!flag)
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


	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String update(ModelMap model, HttpServletRequest request) {
		//返回消息体
		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		try {
			Right right=rightService.update(request.getParameter("uuid"),request.getParameter("name"),request.getParameter("description"), responseMessage);		
			if(right!=null)
				model.addAttribute(right);
				else
					return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("更新成功");
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
    	ResponseMessage responseMessage =RestUtil.addResponseMessageForModelMap(model);
        List<Right> list=rightService.query();
        model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
        return "";
    }
    
    
}
