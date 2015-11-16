package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.PxStatisticsService;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.statistics.PieStatisticsVo;


/**
 * getStudentAgeCountBygroup_cnts
 * _cnts:标识柱状图.
 * _css:圆形图
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/pxstatistics")
public class PxStatisticsController extends AbstractRESTController {
	@Autowired
	private PxStatisticsService pxStatisticsService;

	
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
			SessionUserInfoInterface user = this.getUserInfoBySession(request);

			if (type.toLowerCase().equals("uss"))// 用户性别统计
			{
				PieStatisticsVo vo = pxStatisticsService.getUssBygroup(
						responseMessage, request.getParameter("groupuuid"));

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			} else if (type.toLowerCase().equals("uls"))// 用户登陆统计
			{
				PieStatisticsVo vo = pxStatisticsService.getUlsBygroup(
						responseMessage, request.getParameter("groupuuid"));

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			} else if (type.toLowerCase().equals("sss"))// 学生性别统计
			{
				PieStatisticsVo vo = pxStatisticsService.getSssBygroup(
						responseMessage, request.getParameter("groupuuid"));

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			}else if (type.toLowerCase().equals("css"))// 学生班级统计
			{
				PieStatisticsVo vo = pxStatisticsService.getCssBygroup(
						responseMessage, request.getParameter("groupuuid"));

				if (vo != null)
					model.addAttribute(RestConstants.Return_G_entity, vo);
				else
					return "";
			}else if (type.toLowerCase().equals("cns"))// 班级互动统计
			{
				PieStatisticsVo vo = pxStatisticsService.getCnsBygroup(
						responseMessage, request.getParameter("begDateStr"),request.getParameter("endDateStr"),request.getParameter("groupuuid"));

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
			SessionUserInfoInterface user = this.getUserInfoBySession(request);

				PieStatisticsVo vo = pxStatisticsService.getStudentAgeCountBygroup(
						responseMessage, request.getParameter("groupuuid"));

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
