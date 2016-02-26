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
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.ClassService;
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
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(ModelMap model, HttpServletRequest request) {
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
		//权限判断
		if(StringUtils.isBlank(classRegJsonform.getHeadTeacher())){
			responseMessage.setMessage("班主任老师必填.");
			return "";
		}
		SessionUserInfoInterface user=this.getUserInfoBySession(request);
		//设置当前用户
		classRegJsonform.setCreate_user(user.getName());
		classRegJsonform.setCreate_useruuid(user.getUuid());
		
		try {
			boolean flag;
			if(StringUtils.isEmpty(classRegJsonform.getUuid()))
			    flag = classService.add(classRegJsonform, responseMessage);
			else
				flag = classService.update(classRegJsonform, responseMessage,user,request);
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
		
		
		String groupuuid=request.getParameter("groupuuid");
		if(StringUtils.isBlank(groupuuid)){//查询全部班级时,只有管理员可以.
			if(!RightUtils.isAdmin(request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
		}
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
					responseMessage,request);
			if (!flag)
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
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
		List list = classService.queryClassByUseruuid(this.getUserInfoBySession(request).getUuid());

		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PClass c;
		try {
			c = classService.get(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,c);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public String get2(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PClass c;
		try {
			
					String uuid = request.getParameter("uuid");
					if (DBUtil.isSqlInjection(uuid, responseMessage)) {
						return "";
					}
			c = classService.get(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,c);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	
	/**
	 * 结业
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/disable", method = RequestMethod.POST)
	public String disable(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String uuid=request.getParameter("uuid");

		try {
			if(DBUtil.isSqlInjection(uuid, responseMessage)){
				return "";
			}
			boolean flag = classService.updateDisable(uuid, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}
}
