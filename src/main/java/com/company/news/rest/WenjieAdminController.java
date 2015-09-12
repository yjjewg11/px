package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.entity.BaseDataList;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.WenjieAdminService;
import com.company.news.vo.ResponseMessage;

/**
 * 公开类,用于分享数据显示.
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/wenjieAdmin")
public class WenjieAdminController extends AbstractRESTController {

	 @Autowired
	  protected WenjieAdminService wenjieAdminService;
	
		/**
		 * 刷新学生与家长关系表
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/dataRefresh", method = RequestMethod.GET)
		public String dataRefresh(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.isAdmin(request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("dataRefresh is not admin!");
				return "";
			}
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_role_m, request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("dataRefresh is not authorization!");
				return "";
			}
			try {
				
				wenjieAdminService.updateDataRefresh(responseMessage);
				
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
		
		
}
