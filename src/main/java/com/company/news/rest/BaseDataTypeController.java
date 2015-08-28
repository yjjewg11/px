package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.entity.BaseDataType;
import com.company.news.entity.Group;
import com.company.news.jsonform.BaseDataListJsonform;
import com.company.news.jsonform.BaseDataTypeJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.BaseDataTypeService;
import com.company.news.service.GroupService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/basedatatype")
public class BaseDataTypeController extends AbstractRESTController {

	@Autowired
	private BaseDataTypeService baseDataTypeService;

	/**
	 * 获取机构信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		List<BaseDataType> list = baseDataTypeService.query();
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	/**
	 * 组织增加
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
		
		if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_basedata_m,request)){
			responseMessage.setMessage(RightConstants.Return_msg);
			return "";
		}
		
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		BaseDataTypeJsonform baseDataTypeJsonform;
		try {
			baseDataTypeJsonform = (BaseDataTypeJsonform) this.bodyJsonToFormObject(bodyJson,
					BaseDataTypeJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			String uuid = baseDataTypeJsonform.getUuid();
			BaseDataType baseDataType;
			if (StringUtils.isEmpty(uuid))
				baseDataType = baseDataTypeService.add(baseDataTypeJsonform, responseMessage);
			else

				baseDataType = baseDataTypeService.update(baseDataTypeJsonform, responseMessage);
			if (baseDataType != null)
				model.addAttribute(baseDataType);
			else
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("更新成功");
		return "";
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public String delete(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		try {
			boolean flag = baseDataTypeService.delete(
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

}
