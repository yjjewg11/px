package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.TeacherJudge;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.TeachingJudgeService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/teachingjudge")
public class TeachingJudgeController extends AbstractRESTController {
	private static Logger logger = Logger.getLogger(TeachingJudgeController.class);

	@Autowired
	private TeachingJudgeService teachingJudgeService;


	/**
	 * 获取机构信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String query(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		    List<TeacherJudge> list= teachingJudgeService.query(request.getParameter("groupuuid"),request.getParameter("type"),
		    		request.getParameter("begDateStr"),request.getParameter("endDateStr"));

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);

		return "";
	}


	
	
	
}
