package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.CheckService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/check")
public class CheckController extends AbstractRESTController {

	@Autowired
	private CheckService checkService;
	/**
	 * 禁用发布.type有效值:99,3,0.参考模块类型
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/disableByWjkj", method = RequestMethod.POST)
	public String disableByWjkj(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		if(RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_checkSns_m,request)){
			//有任意权限可以禁止
		}else{
			responseMessage.setMessage(RightConstants.Return_msg);
			return "";
		}
		String typeStr = request.getParameter("type");
		String uuid = request.getParameter("uuid");
		
		if(!StringUtils.isNumeric(typeStr)){
			responseMessage.setMessage("参数:type 不是有效数据");
			return "";
		}
		if(StringUtils.isBlank(uuid)){
			responseMessage.setMessage("参数:uuid 不能为空");
			return "";
		}
		try {
			boolean flag;
			flag = checkService.updateDisable(Integer.valueOf(typeStr), uuid, responseMessage,request);
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
		responseMessage.setMessage("操作成功");
		return "";
	}
	
	/**
	 * 禁用发布.type有效值:99,3,0.参考模块类型
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/disable", method = RequestMethod.POST)
	public String disable(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		if(RightUtils.hasRightAnyGroup(RightConstants.KD_announce_m,request)||RightUtils.hasRightAnyGroup(RightConstants.PX_announce_m,request)){
			//有任意权限可以禁止
		}else{
			responseMessage.setMessage(RightConstants.Return_msg);
			return "";
		}
		String typeStr = request.getParameter("type");
		String uuid = request.getParameter("uuid");
		
		if(!StringUtils.isNumeric(typeStr)){
			responseMessage.setMessage("参数:type 不是有效数据");
			return "";
		}
		if(StringUtils.isBlank(uuid)){
			responseMessage.setMessage("参数:uuid 不能为空");
			return "";
		}
		try {
			boolean flag;
			flag = checkService.updateDisable(Integer.valueOf(typeStr), uuid, responseMessage,request);
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
		responseMessage.setMessage("操作成功");
		return "";
	}
	

	/**
	 * 不合法举报.type有效值:99,3,0.参考模块类型
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/illegal", method = RequestMethod.POST)
	public String illegal(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		String typeStr = request.getParameter("type");
		String uuid = request.getParameter("uuid");
		
		if(!StringUtils.isNumeric(typeStr)){
			responseMessage.setMessage("参数:type 不是有效数据");
			return "";
		}
		if(StringUtils.isBlank(uuid)){
			responseMessage.setMessage("参数:uuid 不能为空");
			return "";
		}
		try {
			boolean flag;
			flag = checkService.updateIllegal(Integer.valueOf(typeStr), uuid, responseMessage);
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
		responseMessage.setMessage("操作成功");
		return "";
	}

	
//	/**
//	 * 获取我的机构信息
//	 * 
//	 * @param model
//	 * @param request
//	 * @return AD_group_m 查询所有后台信息
//	 */
//	@RequestMapping(value = "/checkGroup", method = RequestMethod.GET)
//	public String checkGroup(ModelMap model, HttpServletRequest request) {
//		ResponseMessage responseMessage = RestUtil
//				.addResponseMessageForModelMap(model);
//		
//		
////		String right=RightConstants.KD_group_m;
////		if(SessionListener.isPXLogin(request)){
////			right=RightConstants.PX_group_m;
////		}
//		
//		String groupList=RightUtils.getRightGroups(request);
//		
//		if(StringUtils.isBlank(groupList)){
//			responseMessage.setMessage(RightConstants.Return_msg);
//			return "";
//		}
//		List list = groupService.getGroupCheckuuids(groupList);
//		
//		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
//		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
//		return "";
//	}	
	
	
	
	
	
	

}
