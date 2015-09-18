package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.Parent;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.service.StudentSignRecordService;
import com.company.news.vo.ResponseMessage;

/**
 * 学生签到记录
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/studentSignRecord")
public class StudentSignRecordController extends AbstractRESTController {

	@Autowired
	private StudentSignRecordService studentSignRecordService;


	
	/**
	 * 查询一个班级的孩子签到情况
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryTodayCountByClassuuid", method = RequestMethod.GET)
	public String queryByClassuuid(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		try {
			String classuuid =request.getParameter("classuuid");
			String groupuuid =request.getParameter("groupuuid");
			String studentuuid =request.getParameter("studentuuid");
			if(StringUtils.isBlank(classuuid)){
				responseMessage.setMessage("班级必须选择.");
				return "";
			}
			
			List<Object[]> list = studentSignRecordService.queryTodayCountByClassuuid(classuuid,groupuuid,studentuuid);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
			.setStatus(RestConstants.Return_ResponseMessage_failed);
	responseMessage.setMessage("服务器异常:"+e.getMessage());
	return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}


}
