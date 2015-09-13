package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.export.util.ExcelUtil;
import com.company.news.entity.PClass;
import com.company.news.entity.Student;
import com.company.news.entity.UserTeacher;
import com.company.news.jsonform.UserTeacherJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightUtils;
import com.company.news.service.UserTeacherService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/userteacher")
public class UserTeacherController extends AbstractRESTController {

	@Autowired
	private UserTeacherService userTeacherService;


	/**
	 * 教师注册
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		UserTeacherJsonform userTeacherJsonform;
		try {
			userTeacherJsonform = (UserTeacherJsonform) this.bodyJsonToFormObject(
					bodyJson, UserTeacherJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		// 默认注册未普通用户类型
		userTeacherJsonform.setUseruuid(this.getUserInfoBySession(request).getUuid());

		try {
			boolean flag = userTeacherService
					.save(userTeacherJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("注册成功");
		return "";
	}


	/**
	 * 获取用户信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public String get(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		UserTeacher ut= userTeacherService.get(this.getUserInfoBySession(request).getUuid());
		model.addAttribute(RestConstants.Return_G_entity, ut);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	

	/**
	 * 查询教师资料
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
			pData.setPageSize(50);
			String groupuuid = request.getParameter("groupuuid");
			String name = request.getParameter("name");
			if (StringUtils.isEmpty(groupuuid)){// 查询所有用户
				if(!RightUtils.isAdmin(request)){//不是管理员,只能查询当前用户的学校.
					groupuuid=this.getMyGroupUuidsBySession(request);
					if (StringUtils.isEmpty(groupuuid)){
						responseMessage.setMessage("非法用户,没有关联的学校!");
						return "";
					}
				}
			
			}
			PageQueryResult list = userTeacherService.listByPage(groupuuid,name,pData);

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
	 * 获取机构信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
	public String exportStudentExcel(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		try {
		
		String groupuuid=request.getParameter("groupuuid");
		//导出的格式
		String xlsname=request.getParameter("xlsname");
		  
		if(StringUtils.isBlank(groupuuid)){ 
			groupuuid=this.getMyGroupUuidsBySession(request);
		}else{
			String groupUuids=this.getMyGroupUuidsBySession(request);
			if(groupUuids==null||!groupUuids.contains(groupuuid)){
				responseMessage.setMessage("非法参数,不是该幼儿园的老师:group_uuid"+groupuuid);
				return "";
			}
		}
		if(StringUtils.isBlank(groupuuid)){ 
			responseMessage.setMessage("幼儿园必选/The kindergarten required");
			return "";
		}
		List<UserTeacher> list = userTeacherService.queryForOutExcel(
				groupuuid);
		if("huaMingCe".equals(xlsname)){
			ExcelUtil.outXLS_TeacherhuaMingce(response, "教师花名册",list);
			return null;
		}else{
			ExcelUtil.outXLS_yiliaobaoxian(response, "教师基本情况登记表",list);
			return null;
		}
		
		} catch (Exception e) {
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}
}
