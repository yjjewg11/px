package com.company.news.rest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.DoorRecord;
import com.company.news.jsonform.DoorRecordJsonform;
import com.company.news.jsonform.DoorUserJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.DoorRecordService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/doorrecord")
public class DoorRecordController extends AbstractRESTController {

	@Autowired
	private DoorRecordService doorRecordService;

	/**
	 * 导入门禁记录
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public String insert(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		DoorRecordJsonform doorRecordJsonform;
		try {
			doorRecordJsonform = (DoorRecordJsonform) this
					.bodyJsonToFormObject(bodyJson, DoorRecordJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		try {
			boolean flag = doorRecordService.insert(doorRecordJsonform,
					responseMessage);
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
		responseMessage.setMessage("写入成功");
		return "";
	}
	
	
	/**
	 * 导入门禁用户进行自动绑定
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/autobind", method = RequestMethod.POST)
	public String autobind(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		DoorUserJsonform doorUserJsonform;
		try {
			doorUserJsonform = (DoorUserJsonform) this
					.bodyJsonToFormObject(bodyJson, DoorUserJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		try {
			boolean flag = doorRecordService.autobind(doorUserJsonform, responseMessage);
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
		//responseMessage.setMessage("写入成功");
		return "";
	}

}
