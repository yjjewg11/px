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

import com.company.news.entity.Teachingplan;
import com.company.news.entity.User;
import com.company.news.jsonform.TeachingPlanJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.TeachingPlanService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/teachingplan")
public class TeachingPlanController extends AbstractRESTController {

	@Autowired
	private TeachingPlanService teachingPlanService;

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
		
//		
//		if (!RightUtils.hasRight(RightConstants. KD_teachingplan_m ,request)){
//            responseMessage.setMessage( RightConstants.Return_msg );
//            return "";
//
//		}
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		TeachingPlanJsonform teachingPlanJsonform;
		try {
			teachingPlanJsonform = (TeachingPlanJsonform) this
					.bodyJsonToFormObject(bodyJson, TeachingPlanJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			
			if (StringUtils.isBlank(teachingPlanJsonform.getClassuuid())) {
				responseMessage.setMessage("classuuid不能为空！");
				return "";
			}
			User user=this.getUserInfoBySession(
					request);
			if(!teachingPlanService.isheadteacher(user.getUuid(), teachingPlanJsonform.getClassuuid())){
				responseMessage.setMessage("不是当前班级班主任不能修改课程表");
				return "";
			}
			teachingPlanJsonform.setCreate_useruuid(this.getUserInfoBySession(
					request).getUuid());

			boolean flag = teachingPlanService.add(teachingPlanJsonform,
					responseMessage);

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
		responseMessage.setMessage("新增成功");
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

		List<Teachingplan> list = teachingPlanService.query(
				request.getParameter("begDateStr"),
				request.getParameter("endDateStr"),
				request.getParameter("classuuid"));
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
			boolean flag = teachingPlanService.delete(
					request.getParameter("uuid"), responseMessage);
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

	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid, ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Teachingplan t = teachingPlanService.get(uuid);

		model.addAttribute(RestConstants.Return_G_entity, t);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

}
