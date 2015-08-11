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
import com.company.news.jsonform.StudentJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.StudentService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/student")
public class StudentController extends AbstractRESTController {
	@Autowired
	private StudentService studentService;

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
		StudentJsonform studentJsonform;
		try {
			studentJsonform = (StudentJsonform) this.bodyJsonToFormObject(
					bodyJson, StudentJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		try {
			boolean flag;
			if (StringUtils.isBlank(studentJsonform.getUuid()))
				flag = studentService.add(studentJsonform, responseMessage);
			else
				flag = studentService.update(studentJsonform, responseMessage);
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
		responseMessage.setMessage("增加成功");
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
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		List<Student> list = studentService.query(
				request.getParameter("classuuid"),
				request.getParameter("groupuuid"));
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
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String query(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		PaginationData pData = this.getPaginationDataByRequest(request);
		
		
		String groupuuid=request.getParameter("groupuuid");
		String classuuid=request.getParameter("classuuid");
		String name=request.getParameter("name");
		
		  
		if(StringUtils.isBlank(groupuuid)){ 
			groupuuid=this.getMyGroupUuidsBySession(request);
		}else{
			String groupUuids=this.getMyGroupUuidsBySession(request);
			if(groupUuids==null||!groupUuids.contains(groupuuid)){
				responseMessage.setMessage("非法参数,不是该幼儿园的老师:group_uuid"+groupuuid);
				return "";
			}
		}
		
		
		PageQueryResult pageQueryResult = studentService.queryByPage(groupuuid,classuuid,name,pData);
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
		Student s;
		try {
			s = studentService.get(uuid);
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
		  
		if(StringUtils.isBlank(groupuuid)){ 
			groupuuid=this.getMyGroupUuidsBySession(request);
		}else{
			String groupUuids=this.getMyGroupUuidsBySession(request);
			if(groupUuids==null||!groupUuids.contains(groupuuid)){
				responseMessage.setMessage("非法参数,不是该幼儿园的老师:group_uuid"+groupuuid);
				return "";
			}
		}
		
		List<Student> list = studentService.query(
				classuuid,
				groupuuid);

		
			ExcelUtil.outputPrintWriterStream(response, "幼儿园基本情况登记表",list);
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
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		List list = studentService.parentContactByMyStudent();
		
		model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
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
		
		
		
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
}
