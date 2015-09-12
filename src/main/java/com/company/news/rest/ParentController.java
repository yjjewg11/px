package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
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
	@RequestMapping(value = "/listByPage", method = RequestMethod.GET)
	public String listByPage(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			pData.setPageSize(3);
//			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
//			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
//				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
//					groupuuid=this.getMyGroupUuidsBySession(request);
//					if (StringUtils.isEmpty(groupuuid)){
//						responseMessage.setMessage("非法用户,没有关联的学校!");
//						return "";
//					}
//				}
//			
//			}
			PageQueryResult list = parentService.listByPage(name,pData);

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
