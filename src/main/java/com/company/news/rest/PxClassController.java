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

import com.company.news.entity.PxClass;
import com.company.news.entity.User;
import com.company.news.jsonform.PxClassRegJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.PxClassService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/pxclass")
public class PxClassController extends AbstractRESTController {

	@Autowired
	private PxClassService pxClassService;

	/**
	 * 培训机构班级注册
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
		PxClassRegJsonform pxClassRegJsonform;
		try {
			pxClassRegJsonform = (PxClassRegJsonform) this.bodyJsonToFormObject(
					bodyJson, PxClassRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		//权限判断
		if(StringUtils.isBlank(pxClassRegJsonform.getHeadTeacher())){
			responseMessage.setMessage("班主任老师必填.");
			return "";
		}
		User user=this.getUserInfoBySession(request);
		//设置当前用户
		pxClassRegJsonform.setCreate_user(user.getName());
		pxClassRegJsonform.setCreate_useruuid(user.getUuid());
		
		try {
			boolean flag;
			if(StringUtils.isEmpty(pxClassRegJsonform.getUuid()))
			    flag = pxClassService.add(pxClassRegJsonform, responseMessage);
			else
				flag = pxClassService.update(pxClassRegJsonform, responseMessage,user,request);
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
		List<PxClass> list = pxClassService.query(request.getParameter("groupuuid"));

		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	

	/**
	 * 获取班级信息(包含学生统计,教学计划统计)
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listStat", method = RequestMethod.GET)
	public String listStat(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		
		String groupuuid=request.getParameter("groupuuid");
		if(StringUtils.isBlank(groupuuid)){//查询全部班级时,只有管理员可以.
				responseMessage.setMessage("必须选择一个培训机构");
				return "";
		}
		String isdisable=request.getParameter("isdisable");
		PaginationData pData = this.getPaginationDataByRequest(request);
		
		PageQueryResult list = pxClassService.listStat(groupuuid,isdisable,pData);

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
			boolean flag = pxClassService.delete(request.getParameter("uuid"),
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
		List list = pxClassService.queryClassByUseruuid(this.getUserInfoBySession(request).getUuid());

		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PxClass c;
		try {
			c = pxClassService.get(uuid);
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
			boolean flag = pxClassService.updateDisable(uuid, responseMessage);
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
	
	/**
	 * 获取对外发布课程,用于客户端缓存.
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listForCache", method = RequestMethod.GET)
	public String listForCache(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String courseuuid = request.getParameter("courseuuid");
			if (StringUtils.isEmpty(courseuuid)){// 查询所有用户
				responseMessage.setMessage("必须选择学校");
				return "";
			}
			List list = pxClassService.listForCache(courseuuid);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
