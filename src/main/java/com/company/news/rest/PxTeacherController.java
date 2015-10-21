package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.PxTeacher;
import com.company.news.jsonform.PxTeacherJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightUtils;
import com.company.news.service.PxTeacherService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/pxteacher")
public class PxTeacherController extends AbstractRESTController {

	@Autowired
	private PxTeacherService pxTeacherService;


	/**
	 * 对外公布授课老师介绍保存
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
		PxTeacherJsonform userTeacherJsonform;
		try {
			userTeacherJsonform = (PxTeacherJsonform) this.bodyJsonToFormObject(
					bodyJson, PxTeacherJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			boolean flag = pxTeacherService
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
		responseMessage.setMessage("保存成功");
		return "";
	}

	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid, ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PxTeacher s;
		try {
			s = pxTeacherService.get(uuid);
			if(s==null){
				responseMessage.setMessage("资料不存在.uuid="+uuid);
				return "";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity, s);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	

	/**
	 * 查询教师资料
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listByPage", method = RequestMethod.GET)
	public String listByPage(ModelMap model, HttpServletRequest request) {
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
			PageQueryResult list = pxTeacherService.queryByPage(groupuuid,name,pData);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}
		return "";
	}
	
//	
//	/**
//	 * 
//	 * @param model
//	 * @param request
//	 * @return
//	 */
//	@RequestMapping(value = "/updateStatus", method = RequestMethod.POST)
//	public String updateDisable(ModelMap model, HttpServletRequest request) {
//		// 返回消息体
//		ResponseMessage responseMessage = RestUtil
//				.addResponseMessageForModelMap(model);
//
//		boolean flag = pxTeacherService.updateStatus(
//				request.getParameter("disable"), request.getParameter("uuids"),
//				responseMessage);
//		if (!flag)// 请求服务返回失败标示
//			return "";
//
//		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
//		responseMessage.setMessage("操作成功");
//		return "";
//	}
	
}
