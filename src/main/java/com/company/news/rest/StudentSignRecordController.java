package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.service.GroupHabitsService;
import com.company.news.service.StudentSignRecordService;
import com.company.news.vo.ResponseMessage;

/**
 * 学生签到记录
 * 
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
	public String queryByClassuuid(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		try {
			String classuuid = request.getParameter("classuuid");
			String groupuuid = request.getParameter("groupuuid");
			String studentuuid = request.getParameter("studentuuid");
			if (StringUtils.isBlank(classuuid)) {
				responseMessage.setMessage("班级必须选择.");
				return "";
			}

			List<Object[]> list = studentSignRecordService
					.queryTodayCountByClassuuid(classuuid, groupuuid,
							studentuuid);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	@RequestMapping(value = "/queryStudentuuid", method = RequestMethod.GET)
	public String queryStudentuuid(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			String student_uuid = request.getParameter("studentuuid");
			if (StringUtils.isBlank(student_uuid)) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("无数据");
				return "";
			}
			PageQueryResult pageQueryResult = studentSignRecordService.query(
					student_uuid, pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list,
					pageQueryResult);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	/**
	 * 生成(老师考勤)月度报表,存入数据库
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updateStatMonthByTeacher", method = RequestMethod.GET)
	public String updateStatMonth(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String yyyy_mm = request.getParameter("yyyy_mm");// 2015-09
			String groupuuid = request.getParameter("groupuuid");// 2015-09
			if (StringUtils.isBlank(yyyy_mm)||yyyy_mm.length()!=7) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("年月格式错误.格式:2015-09");
				return "";
			}
			if (StringUtils.isBlank(groupuuid)) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("学校必填");
				return "";
			}
			List list = studentSignRecordService.updateStatMonthByTeacher(
					yyyy_mm, groupuuid, responseMessage);
			if (list==null) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_failed);
				return "";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
			.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	

	@Autowired
	private GroupHabitsService groupHabitsService;


	/**
	 * 查询(老师考勤)月度报表,没有则创建
	 * 生成(老师考勤)月度报表,存入数据库
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listStatMonthByTeacher", method = RequestMethod.GET)
	public String listStatMonthByTeacher(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			String yyyy_mm = request.getParameter("yyyy_mm");// 2015-09
			String groupuuid = request.getParameter("groupuuid");// 2015-09
			String morning = request.getParameter("morning");// 08:00
			String afternoon = request.getParameter("afternoon");// 17:00
			if (StringUtils.isBlank(yyyy_mm)||yyyy_mm.length()!=7) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("年月格式错误.格式:2015-09");
				return "";
			}
			if (StringUtils.isBlank(groupuuid)) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("学校必填");
				return "";
			}
			List list=null;
			
			//记录上下班
			if(StringUtils.isNotBlank(morning)){
				groupHabitsService.save(groupuuid, SystemConstants.GroupHabits_key_WorkTime, morning+"-"+afternoon);
				
			}
			
			//不是当月则,生成数据保存到数据库.
			boolean isCurrentMonth=TimeUtils.getCurrentTime("yyyy-MM").equals(yyyy_mm);
			if(isCurrentMonth){
				 list= studentSignRecordService.updateStatMonthByTeacher(
							yyyy_mm, groupuuid, responseMessage);
			}else{
				list= studentSignRecordService.listStatMonthByTeacher(
						yyyy_mm, groupuuid, responseMessage);
				if(list.size()==0){// 如果上月没生成报表,则生成
					 list= studentSignRecordService.updateStatMonthByTeacher(
								yyyy_mm, groupuuid, responseMessage);
					if(list==null)list=new ArrayList();
				}
			}
			
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		return "";
	}
	
	/**
	 * 生成(学生考勤)月度报表,存入数据库.(按照班级生成)
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updateStatMonthByStudent", method = RequestMethod.GET)
	public String updateStatMonthByStudent(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String yyyy_mm = request.getParameter("yyyy_mm");// 2015-09
			String classuuid = request.getParameter("classuuid");// 2015-09
			if (StringUtils.isBlank(yyyy_mm)||yyyy_mm.length()!=7) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("年月格式错误.格式:2015-09");
				return "";
			}
			if (StringUtils.isBlank(classuuid)) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("班级必填");
				return "";
			}
			List list = studentSignRecordService.updateStatMonthByStudent(
					yyyy_mm, classuuid, responseMessage);
			if (list==null) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_failed);
				return "";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
			.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	/**
	 * 查询(Student考勤)月度报表,没有则创建
	 * 生成(Student考勤)月度报表,存入数据库
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listStatMonthByStudent", method = RequestMethod.GET)
	public String listStatMonthByStudent(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			String yyyy_mm = request.getParameter("yyyy_mm");// 2015-09
			String classuuid = request.getParameter("classuuid");// 2015-09
			if (StringUtils.isBlank(yyyy_mm)||yyyy_mm.length()!=7) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("年月格式错误.格式:2015-09");
				return "";
			}
			if (StringUtils.isBlank(classuuid)) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_success);
				responseMessage.setMessage("班级必填");
				return "";
			}
			List list=null;
			
			//不是当月则,生成数据保存到数据库.
			boolean isCurrentMonth=TimeUtils.getCurrentTime("yyyy-MM").equals(yyyy_mm);
			if(isCurrentMonth){
				 list=studentSignRecordService.updateStatMonthByStudent(yyyy_mm, classuuid, responseMessage);
			}else{
				list= studentSignRecordService.listStatMonthByStudent(
						yyyy_mm, classuuid, responseMessage);
				if(list.size()==0){// 如果上月没生成报表,则生成
					list=studentSignRecordService.updateStatMonthByStudent(yyyy_mm, classuuid, responseMessage);
					if(list==null)list=new ArrayList();
				}
			}
			//如果没有,则自动生成这个月报表.
			
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		return "";
	}
	

}
