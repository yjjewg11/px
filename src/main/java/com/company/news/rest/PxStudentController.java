package com.company.news.rest;

import java.util.ArrayList;
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

import com.company.export.util.ExcelUtil;
import com.company.news.entity.PClass;
import com.company.news.entity.PxStudent;
import com.company.news.entity.Student;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.PxStudentJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.PxClassService;
import com.company.news.service.PxStudentService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/pxstudent")
public class PxStudentController extends AbstractRESTController {
	@Autowired
	private PxStudentService pxStudentService;
	@Autowired
	private PxClassService pxClassService;
	

	/**
	 * 学生改变班级
	 * student/changeClass.json?classuuid=&studentuuid
	 * @param model
	 * @param request
	 * @return
	 */
/*	@RequestMapping(value = "/changeClass", method = RequestMethod.POST)
	public String changeClass(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String classuuid =request.getParameter("classuuid");
		String studentuuid=request.getParameter("studentuuid");
		boolean f=false;
		try {
			f = pxStudentService.updateChangeClass(studentuuid,classuuid,responseMessage,request);
			if(!f)return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("学生切换班级成功");
		return "";
	}*/
	
	/**
	 * 添加用户
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
		PxStudentJsonform pxStudentJsonform;
		try {
			pxStudentJsonform = (PxStudentJsonform) this.bodyJsonToFormObject(
					bodyJson, PxStudentJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		try {
			boolean flag;
			if (StringUtils.isBlank(pxStudentJsonform.getUuid()))
				flag = pxStudentService.add(pxStudentJsonform, responseMessage);
			else
				flag = pxStudentService.update(pxStudentJsonform, responseMessage);
			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("操作成功");
		return "";
	}

	/**
	 * 获取机构信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getStudentByClassuuid", method = RequestMethod.GET)
	public String getStudentByClassuuid(ModelMap model,
			HttpServletRequest request) {
		String classuuid=request.getParameter("classuuid");
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		if(StringUtils.isBlank(classuuid)){
			responseMessage
			.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("classuuid 不能为空!班级必选.");
			return "";
		}
		
		List<PxStudent> list = pxStudentService.query(
				classuuid);
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 *
	 * 我关联学校所有学生查询服务器
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/querybyRight", method = RequestMethod.GET)
	public String querybyRight(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PaginationData pData = this.getPaginationDataByRequest(request);
		
		
		String groupuuid=request.getParameter("groupuuid");
		String classuuid=request.getParameter("classuuid");
		String name=request.getParameter("name");
		
		  
		if(StringUtils.isBlank(groupuuid)){ 
			groupuuid=RightUtils.getRightGroups(RightConstants.PX_student_allquery, request);
		}else{
			String groupUuids=RightUtils.getRightGroups(RightConstants.PX_student_allquery, request);
			if(groupUuids==null||!groupUuids.contains(groupuuid)){
				responseMessage.setMessage("非法参数,没有该幼儿园的学校查看权限:group_uuid"+groupuuid);
				return "";
			}
		}
		
		
		PageQueryResult pageQueryResult = pxStudentService.queryByPage(groupuuid,classuuid,name,pData);
		model.addAttribute(RestConstants.Return_ResponseMessage_list,
				pageQueryResult);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	

	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid, ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PxStudent s;
		try {
			s = pxStudentService.get(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity, s);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	/**
	 * 获取机构信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/exportStudentExcel", method = RequestMethod.POST)
	public String exportStudentExcel(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		try {
		
		String groupuuid=request.getParameter("groupuuid");
		String classuuid=request.getParameter("classuuid");
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
		List<Student> list = pxStudentService.queryForOutExcel(
				classuuid,
				groupuuid);
		List<PClass> listClass = pxStudentService.queryClassNameForOutExcel(classuuid);
		if("huaMingCe".equals(xlsname)){
			ExcelUtil.outXLS_huaMingce(response, "幼儿园花名册",list,listClass);
			return null;
		}else if("yiLiaoBaoXian".equals(xlsname)){
			ExcelUtil.outXLS_yiliaobaoxian(response, "幼儿园花名册",list,listClass);
			return null;
		}else{
			
			ExcelUtil.outputPrintWriterStream(response, "幼儿园基本情况登记表",list);
		}
		
		} catch (Exception e) {
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		return null;
	}


	/**
	 * 查询我学生相关的家长通讯录.
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/parentContactByMyStudent", method = RequestMethod.GET)
	public String parentContactByMyStudent(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		try {
			String student_name=request.getParameter("student_name");
			String class_uuid=request.getParameter("class_uuid");
			
			SessionUserInfoInterface user =this.getUserInfoBySession(request);
			List listClassuuids=null;
			if(StringUtils.isBlank(class_uuid)){
				listClassuuids=pxClassService.getTeacherRelClassUuids(user.getUuid());
			}else
			{
				listClassuuids=new ArrayList();
				listClassuuids.add(class_uuid);
			}
		
			
			
			List list = pxStudentService.parentContactByMyStudent(listClassuuids,student_name);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
			.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		return "";
	}
	
	
	/**
	 * 邀请家长
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/inviteParents", method = RequestMethod.POST)
	public String inviteParents(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		String tels=request.getParameter("tels");
		
		
		responseMessage.setMessage("暂不开放,IOS家长客户端审核通过后,开放.");
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	
	/**
	 *
	 * 查询学生,根据学生全名或者班级
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryByNameOrTel", method = RequestMethod.GET)
	public String queryByNameOrTel(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PaginationData pData = this.getPaginationDataByRequest(request);
		
		
		String name=request.getParameter("name");
		
		  
		if(StringUtils.isBlank(name)){ 
			responseMessage.setMessage("必须填学生全名或家长手机号码!");
			return "";
		}
		
		PageQueryResult pageQueryResult = pxStudentService.queryByNameOrTel(name,pData);
		model.addAttribute(RestConstants.Return_ResponseMessage_list,
				pageQueryResult);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	/**
	 * 增加班级和学生关系
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/addStudentClass", method = RequestMethod.POST)
	public String addStudentClass(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		try {
			String student_uuid=request.getParameter("student_uuid");
			String class_uuid =request.getParameter("class_uuid");
			
			if(StringUtils.isBlank(student_uuid)||StringUtils.isBlank(class_uuid)){
				responseMessage.setMessage("student_uuid,class_uuid 必填");
				return "";
			}
			boolean flag=this.pxStudentService.addStudentClassRelation(student_uuid,class_uuid,responseMessage);
			if(!flag){
				return "";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		responseMessage.setMessage("添加成功!");
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	

	/**
	 * 删除班级和学生关系
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deleteStudentClass", method = RequestMethod.POST)
	public String deleteStudentClass(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			
			String student_uuid=request.getParameter("student_uuid");
			String class_uuid =request.getParameter("class_uuid");
			
			
			boolean flag = pxStudentService.update_deleteStudentClassRelation(student_uuid,class_uuid,
					responseMessage);
			if (!flag)
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("删除成功");
		return "";
	}
	
	
}
