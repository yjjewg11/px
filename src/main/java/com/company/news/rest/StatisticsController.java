package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.StatisticsService;
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

		try {
			
			String groupuuid=request. getParameter("groupuuid");
			String begDateStr=request. getParameter("begDateStr");
			String endDateStr=request. getParameter("endDateStr");
			
			groupuuid=DBUtil.safeToWhereString(groupuuid);
			begDateStr=DBUtil.safeToWhereString(begDateStr);
			endDateStr=DBUtil.safeToWhereString(endDateStr);
			SessionUserInfoInterface user = this.getUserInfoBySession(request);

			if (type.toLowerCase().equals("uss"))// 用户性别统计
			{
				PieStatisticsVo vo = statisticsService.getUssBygroup(
						responseMessage, groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			} else if (type.toLowerCase().equals("uls"))// 用户登陆统计
			{
				PieStatisticsVo vo = statisticsService.getUlsBygroup(
						responseMessage, groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			} else if (type.toLowerCase().equals("sss"))// 学生性别统计
			{
				PieStatisticsVo vo = statisticsService.getSssBygroup(
						responseMessage, groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			}else if (type.toLowerCase().equals("css"))// 学生班级统计
			{
				PieStatisticsVo vo = statisticsService.getCssBygroup(
						responseMessage, groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			}else if (type.toLowerCase().equals("cns"))// 班级互动统计
			{
				PieStatisticsVo vo = statisticsService.getCnsBygroup(
						responseMessage, begDateStr,endDateStr,groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			}else if (type.toLowerCase().equals("cnts"))// 班级互动TOP
			{
				PieStatisticsVo vo = statisticsService.getCntsBygroup(
						responseMessage, begDateStr,endDateStr,groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			}else if (type.toLowerCase().equals("tjs"))// 教师评价统计
			{
				PieStatisticsVo vo = statisticsService.getTjsBygroup(
						responseMessage, begDateStr,endDateStr,groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			}else if (type.toLowerCase().equals("pie_studentParentType"))// 学生家长注册类型比例统计
			{
				PieStatisticsVo vo = statisticsService.pie_studentParentType(
						responseMessage, groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 
	 * 
	 * 年龄段统计(按机构)
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getStudentAgeCountBygroup_bar", method = RequestMethod.GET)
	public String getStudentAgeCountBygroup_bar( ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		try {
			String groupuuid=request. getParameter("groupuuid");
			String begDateStr=request. getParameter("begDateStr");
			String endDateStr=request. getParameter("endDateStr");
			
			groupuuid=DBUtil.safeToWhereString(groupuuid);
			begDateStr=DBUtil.safeToWhereString(begDateStr);
			endDateStr=DBUtil.safeToWhereString(endDateStr);
			
			SessionUserInfoInterface user = this.getUserInfoBySession(request);

				PieStatisticsVo vo = statisticsService.getStudentAgeCountBygroup(
						responseMessage, groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	

	/**
	 * 
	 * 
	 * 年龄段统计(按机构)
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAccountPerMonthOfYear_bar", method = RequestMethod.GET)
	public String getAccountPerMonthOfYear_bar( ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		try {
			String groupuuid=request. getParameter("groupuuid");
			String begDateStr=request. getParameter("begDateStr");
			String endDateStr=request. getParameter("endDateStr");
			
			groupuuid=DBUtil.safeToWhereString(groupuuid);
			begDateStr=DBUtil.safeToWhereString(begDateStr);
			endDateStr=DBUtil.safeToWhereString(endDateStr);
				PieStatisticsVo vo = statisticsService.getAccountPerMonthOfYear_bar(responseMessage, begDateStr, endDateStr, groupuuid);

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器错误:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
