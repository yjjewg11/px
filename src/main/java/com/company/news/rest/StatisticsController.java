package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.commons.util.ExcelUtil;
import com.company.news.entity.Student;
import com.company.news.entity.User;
import com.company.news.jsonform.StudentJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.StatisticsService;
import com.company.news.service.StudentService;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.statistics.PieStatisticsVo;

@Controller
@RequestMapping(value = "/statistics")
public class StatisticsController extends AbstractRESTController {
	@Autowired
	private StatisticsService statisticsService;

	/**
	 * 
	 * 我关联学校所有学生查询服务器
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{type}", method = RequestMethod.GET)
	public String query(@PathVariable String type, ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		User user = this.getUserInfoBySession(request);

		if (type.toLowerCase().equals("uss"))// 用户性别统计
		{
			PieStatisticsVo vo = statisticsService.getUssBygroup(
					responseMessage, request.getParameter("groupuuid"));

			if (vo != null)
				model.addAttribute(RestConstants.Return_G_entity, vo);
			else
				return "";
		} else if (type.toLowerCase().equals("uls"))// 用户登陆统计
		{
			PieStatisticsVo vo = statisticsService.getUlsBygroup(
					responseMessage, request.getParameter("groupuuid"));

			if (vo != null)
				model.addAttribute(RestConstants.Return_G_entity, vo);
			else
				return "";
		} else if (type.toLowerCase().equals("sss"))// 学生性别统计
		{
			PieStatisticsVo vo = statisticsService.getSssBygroup(
					responseMessage, request.getParameter("groupuuid"));

			if (vo != null)
				model.addAttribute(RestConstants.Return_G_entity, vo);
			else
				return "";
		}else if (type.toLowerCase().equals("css"))// 学生班级统计
		{
			PieStatisticsVo vo = statisticsService.getCssBygroup(
					responseMessage, request.getParameter("groupuuid"));

			if (vo != null)
				model.addAttribute(RestConstants.Return_G_entity, vo);
			else
				return "";
		}else if (type.toLowerCase().equals("cns"))// 班级互动统计
		{
			PieStatisticsVo vo = statisticsService.getCnsBygroup(
					responseMessage, request.getParameter("begDateStr"),request.getParameter("endDateStr"),request.getParameter("groupuuid"));

			if (vo != null)
				model.addAttribute(RestConstants.Return_G_entity, vo);
			else
				return "";
		}else if (type.toLowerCase().equals("cnts"))// 班级互动TOP
		{
			PieStatisticsVo vo = statisticsService.getCntsBygroup(
					responseMessage, request.getParameter("begDateStr"),request.getParameter("endDateStr"),request.getParameter("groupuuid"));

			if (vo != null)
				model.addAttribute(RestConstants.Return_G_entity, vo);
			else
				return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

}
