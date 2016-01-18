package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.commons.util.DbUtils;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.StatisticsService;
import com.company.news.service.TeachingPlanService;
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
				PieStatisticsVo vo = statisticsService.getClassnewsByClass(
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
			String type=request. getParameter("type");
			
			if(DbUtils.isSqlInjection(groupuuid, responseMessage))return "";
			if(DbUtils.isSqlInjection(begDateStr, responseMessage))return "";
			if(DbUtils.isSqlInjection(endDateStr, responseMessage))return "";
			if(DbUtils.isSqlInjection(type, responseMessage))return "";
			
			
			Integer  typeInt=Integer.valueOf(type);
				PieStatisticsVo vo = statisticsService.getAccountPerMonthOfYearOfType_bar(responseMessage, begDateStr, endDateStr, groupuuid, typeInt);

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
	 * 班级互动数量统计(按机构老师)
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getClassnewsByTeacher_bar", method = RequestMethod.GET)
	public String getClassnewsByTeacher_bar( ModelMap model,
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

			
			PieStatisticsVo vo = statisticsService.getClassnewsByTeacher_bar(
					responseMessage, begDateStr,endDateStr,groupuuid);

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
	 * 精品文章数量统计(按机构老师)
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getJingpinwenzhangByTeacher_bar", method = RequestMethod.GET)
	public String getJingpinwenzhangByTeacher_bar( ModelMap model,
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

			
			PieStatisticsVo vo = statisticsService.getJingpinwenzhangByTeacher_bar(
					responseMessage, begDateStr,endDateStr,groupuuid);

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
	 * 精品文章数量统计(按机构老师)
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getTeachingplanByClass_bar", method = RequestMethod.GET)
	public String getTeachingplanByClass_bar( ModelMap model,
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

			
			PieStatisticsVo vo = statisticsService.getTeachingplanByClass_bar(
					responseMessage, begDateStr,endDateStr,groupuuid);

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
	 * 食谱统计(按机构老师)
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getCookbookPlanByMonth_bar", method = RequestMethod.GET)
	public String getCookbookPlanByMonth_bar( ModelMap model,
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

			
			PieStatisticsVo vo = statisticsService.getCookbookPlanByMonth_bar(
					responseMessage, begDateStr,endDateStr,groupuuid);

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
