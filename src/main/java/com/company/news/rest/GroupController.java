package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.Group;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.GroupService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/group")
public class GroupController extends AbstractRESTController {

	@Autowired
	private GroupService groupService;

	/**
	 * 组织注册
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public String reg(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		GroupRegJsonform groupRegJsonform;
		try {
			groupRegJsonform = (GroupRegJsonform) this.bodyJsonToFormObject(
					bodyJson, GroupRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			boolean flag = groupService.reg(groupRegJsonform, responseMessage);
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
	 * 组织增加
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
		GroupRegJsonform groupRegJsonform;
		try {
			groupRegJsonform = (GroupRegJsonform) this.bodyJsonToFormObject(
					bodyJson, GroupRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		
		try {
			boolean flag = groupService.add(groupRegJsonform, responseMessage,this.getUserInfoBySession(request).getUuid());
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("增加成功");
		return "";
	}

    /**
     * 获取机构信息
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list( ModelMap model, HttpServletRequest request) {
    	ResponseMessage responseMessage =RestUtil.addResponseMessageForModelMap(model);
        List<Group> list=groupService.query();
        model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
        return "";
    }
    
    /**
     * 获取我的机构信息
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/myList", method = RequestMethod.GET)
    public String myList( ModelMap model, HttpServletRequest request) {
    	ResponseMessage responseMessage =RestUtil.addResponseMessageForModelMap(model);
        List list=new ArrayList();
		try {
			list = groupService.getGroupByUseruuid(this.getUserInfoBySession(request).getUuid());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
        model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
        return "";
    }
}
