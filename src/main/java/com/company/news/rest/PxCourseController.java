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

import com.company.news.entity.PxCourse;
import com.company.news.entity.User;
import com.company.news.jsonform.PxCourseJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightUtils;
import com.company.news.service.PxCourseService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/pxCourse")
public class PxCourseController extends AbstractRESTController {

	@Autowired
	private PxCourseService pxCourseService;

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
		PxCourseJsonform pxCourseJsonform;
		try {
			pxCourseJsonform = (PxCourseJsonform) this
					.bodyJsonToFormObject(bodyJson,
							PxCourseJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		
		try {

			User user = this.getUserInfoBySession(request);
			

			boolean flag;
			if (StringUtils.isEmpty(pxCourseJsonform.getUuid()))
				flag = pxCourseService.add(pxCourseJsonform,
						responseMessage,user);
			else
				flag = pxCourseService.update(pxCourseJsonform,
						responseMessage,user);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("保存成功");
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
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			pData.setPageSize(50);
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
					groupuuid=this.getMyGroupUuidsBySession(request);
					if (StringUtils.isEmpty(groupuuid)){
						responseMessage.setMessage("非法用户,没有关联的学校!");
						return "";
					}
				}
			
			}
			PageQueryResult list = pxCourseService.queryByPage(groupuuid,pData);

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
			String groupuuid = request.getParameter("groupuuid");
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
				responseMessage.setMessage("必须选择学校");
				return "";
			}
			List list = pxCourseService.listForCache(groupuuid);

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
			boolean flag = pxCourseService.delete(
					request.getParameter("uuid"), responseMessage);
			if (!flag)
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("删除成功");
		return "";
	}

	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid, ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PxCourse t = pxCourseService.get(uuid);

			model.addAttribute(RestConstants.Return_G_entity, t);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
			.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		return "";
	}

}
