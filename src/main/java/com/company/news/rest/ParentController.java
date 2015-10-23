package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.ParentService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/parent")
public class ParentController extends AbstractRESTController {
	private static Logger logger = Logger.getLogger(ParentController.class);
	@Autowired
	private ParentService parentService;
	


	/**
	 * 获取用户信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listByPageWjkj", method = RequestMethod.GET)
	public String listByPageWjkj(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_parent_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			
//			pData.setPageSize(20);
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list =null;
			if(StringUtils.isBlank(groupuuid)){
				list = parentService.listByPage(name,pData); 
			}else{
				list = parentService.listByPage(name,groupuuid,pData);
			}
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
	/**
	 * 获取用户信息(幼儿园权限)
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
			
			
			
//			pData.setPageSize(20);
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
					
				responseMessage.setMessage("请选择学校");
				return "";
			}
			if(!RightUtils.hasRight(groupuuid,RightConstants.KD_student_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = parentService.listByPage(name,groupuuid,pData);
			
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
	
}
