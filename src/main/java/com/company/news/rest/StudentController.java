package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.entity.Group4Q;
import com.company.news.entity.Group4QBaseInfo;
import com.company.news.entity.PClass;
import com.company.news.entity.Student;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.StudentJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.PxClassService;
import com.company.news.service.StudentService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/student")
public class StudentController extends AbstractRESTController {
	@Autowired
	private StudentService studentService;
	@Autowired
	private PxClassService pxClassService;

	/**
	 * 学生改变班级 student/changeClass.json?classuuid=&studentuuid
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/changeClass", method = RequestMethod.POST)
	public String changeClass(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String classuuid = request.getParameter("classuuid");
		if (DBUtil.isSqlInjection(classuuid, responseMessage)) {
			return "";
		}
		String studentuuid = request.getParameter("studentuuid");
		if (DBUtil.isSqlInjection(studentuuid, responseMessage)) {
			return "";
		}

		boolean f = false;
		try {
			f = studentService.updateChangeClass(studentuuid, classuuid,
					responseMessage, request);
			if (!f)
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("学生切换班级成功");
		return "";
	}

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
			if (StringUtils.isBlank(studentJsonform.getUuid())) {

				flag = studentService.add(studentJsonform, responseMessage,
						request);
			} else
				flag = studentService.update(studentJsonform, responseMessage,
						request);
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
	 * 获取班级内学生
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

		try {
			String groupuuid = request.getParameter("groupuuid");
			if (DBUtil.isSqlInjection(groupuuid, responseMessage)) {
				return "";
			}
			String classuuid = request.getParameter("classuuid");
			if (DBUtil.isSqlInjection(classuuid, responseMessage)) {
				return "";
			}

			List<Student> list = studentService.query(classuuid, groupuuid);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		return "";
	}

	/**
	 * 
	 * 我关联班级所有学生查询服务器
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/querybyTeacher", method = RequestMethod.GET)
	public String querybyTeacher(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);

			String classuuid = request.getParameter("classuuid");
			String name = request.getParameter("name");

			if (DBUtil.isSqlInjection(name, responseMessage)) {
				return "";
			}
			if (DBUtil.isSqlInjection(classuuid, responseMessage)) {
				return "";
			}

			if (StringUtils.isBlank(classuuid)) {
				responseMessage.setMessage("请选择班级");
				return "";
			}
			PageQueryResult pageQueryResult = studentService.queryByPage(null,
					classuuid, name, pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list,
					pageQueryResult);
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		return "";
	}

	/**
	 * 
	 * 我关联学校所有学生查询服务器
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/querybyRight", method = RequestMethod.GET)
	public String querybyRight(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {

			PaginationData pData = this.getPaginationDataByRequest(request);
			pData.setPageSize(50);
			String groupuuid = request.getParameter("groupuuid");
			if (DBUtil.isSqlInjection(groupuuid, responseMessage)) {
				return "";
			}
			String classuuid = request.getParameter("classuuid");
			if (DBUtil.isSqlInjection(classuuid, responseMessage)) {
				return "";
			}
			String status = request.getParameter("status");
			if (DBUtil.isSqlInjection(status, responseMessage)) {
				return "";
			}
			String name = request.getParameter("name");
			String right = RightConstants.KD_student_allquery;
			if (SessionListener.isPXLogin(request)) {
				right = RightConstants.PX_student_allquery;
			}

			if (StringUtils.isBlank(groupuuid)) {
				groupuuid = RightUtils.getRightGroups(right, request);
			} else {
				String groupUuids = RightUtils.getRightGroups(right, request);
				if (groupUuids == null || !groupUuids.contains(groupuuid)) {
					responseMessage.setMessage("非法参数,没有该幼儿园的学校查看权限:group_uuid"
							+ groupuuid);
					return "";
				}
			}

			PageQueryResult pageQueryResult = studentService.queryByPage(
					groupuuid, classuuid, name, status, pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list,
					pageQueryResult);
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
			return "";
		}
	}

//	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
//	public String get(@PathVariable String uuid, ModelMap model,
//			HttpServletRequest request) {
//		ResponseMessage responseMessage = RestUtil
//				.addResponseMessageForModelMap(model);
//		Student s;
//		try {
//			
//			if (DBUtil.isSqlInjection(uuid, responseMessage)) {
//				return "";
//			}
//			
//			s = studentService.get(uuid);
//			if (s == null) {
//				responseMessage.setMessage("学生资料不存在.uuid=" + uuid);
//				return "";
//			}
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			responseMessage
//					.setStatus(RestConstants.Return_ResponseMessage_failed);
//			responseMessage.setMessage("服务器异常:" + e.getMessage());
//			return "";
//		}
//		model.addAttribute(RestConstants.Return_G_entity, s);
//		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
//		return "";
//	}
//	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public String get2( ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Student s;
		try {
			String uuid = request.getParameter("uuid");
			if (DBUtil.isSqlInjection(uuid, responseMessage)) {
				return "";
			}
			
			s = studentService.get(uuid);
			if (s == null) {
				responseMessage.setMessage("学生资料不存在.uuid=" + uuid);
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
	 * 
	 *         exportStudentExcel 导出学生相关Excel格式报表 var data = [ {value: 'one' ,
	 *         label: '学生基本表 ' }, {value: 'huaMingCe' , label: '幼儿花名册' },
	 *         {value: 'yiLiaoBaoXian' , label: '医疗保险银行代扣批量导入表' }, {value:
	 *         'doorrecord' , label: '导出接送卡表' } ]; var
	 *         data=G_selected_dataModelArray_byArray
	 *         (Vo.getTypeList("exportStudentExcel"),"desc","val");
	 */
	@RequestMapping(value = "/exportStudentExcel", method = RequestMethod.POST)
	public String exportStudentExcel(ModelMap model,
			HttpServletRequest request, HttpServletResponse response) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		try {

			String groupuuid = request.getParameter("groupuuid");
			String classuuid = request.getParameter("classuuid");
			String uuid = request.getParameter("uuid");
			// 导出的格式
			String xlsname = request.getParameter("xlsname");
			
			
			if (DBUtil.isSqlInjection(groupuuid, responseMessage)) {
				return "";
			}
			
			
			if (DBUtil.isSqlInjection(classuuid, responseMessage)) {
				return "";
			}
			
			
			if (DBUtil.isSqlInjection(uuid, responseMessage)) {
				return "";
			}
			
			
			if (DBUtil.isSqlInjection(xlsname, responseMessage)) {
				return "";
			}
			

			if (StringUtils.isBlank(groupuuid)) {
				groupuuid = this.getMyGroupUuidsBySession(request);
			} else {
				String groupUuids = this.getMyGroupUuidsBySession(request);
				if (groupUuids == null || !groupUuids.contains(groupuuid)) {
					responseMessage.setMessage("非法参数,不是该幼儿园的老师:group_uuid"
							+ groupuuid);
					return "";
				}
			}
			if (StringUtils.isBlank(groupuuid)) {
				responseMessage.setMessage("幼儿园必选/The kindergarten required");
				return "";
			}

			// 门禁批量制卡用
			if ("doorrecord".equals(xlsname)) {
				SessionUserInfoInterface user = this
						.getUserInfoBySession(request);
				List<Object[]> list = studentService
						.update_and_queryFor_doorrecord_OutExcel(classuuid,
								groupuuid, uuid, null, user);
				ExcelUtil.outXLS_doorrecord(response, "幼儿园接送卡表", list);
				return null;
			} else if ("doorrecord_apply".equals(xlsname)) {
				SessionUserInfoInterface user = this
						.getUserInfoBySession(request);
				
				//自动生成
				 studentService
					.update_doorrecord_userid_Of_Student(classuuid,
							groupuuid, uuid, xlsname, user);
			
				List<Object[]> list = studentService
						.queryFor_doorrecord_apply_OutExcel(classuuid,
								groupuuid, uuid, xlsname, user);
				ExcelUtil.outXLS_doorrecord(response, "接送卡申请表", list);
				return null;
			} else if ("doorrecord_teacher".equals(xlsname)) {
				SessionUserInfoInterface user = this
						.getUserInfoBySession(request);
				
				List<Object[]> list = studentService
						.update_and_queryFor_doorrecord_teacher_OutExcel(
								classuuid, groupuuid, uuid, null, user);
				ExcelUtil.outXLS_doorrecord(response, "老师门禁卡表", list);
				return null;
			} else if ("doorrecord_apply_teacher".equals(xlsname)) {
				SessionUserInfoInterface user = this
						.getUserInfoBySession(request);
				
				//自动生成
				 studentService
					.update_doorrecord_userid_Of_teacher(classuuid,
							groupuuid, uuid, xlsname, user);
			
				 
				List<Object[]> list = studentService
						.queryFor_doorrecord_apply_teacher_OutExcel(classuuid,
								groupuuid, uuid, xlsname, user);
				ExcelUtil.outXLS_doorrecord(response, "老师门禁卡申请表", list);
				return null;
			} else if ("doorrecord_all".equals(xlsname)) {
				SessionUserInfoInterface user = this
						.getUserInfoBySession(request);
				List<Object[]> list = studentService
						.queryFor_doorrecord_apply_OutExcel(classuuid,
								groupuuid, uuid, xlsname, user);
				ExcelUtil.outXLS_doorrecord(response, "接送卡申请表", list);
				return null;
			} else if ("students_age".equals(xlsname)) {
				SessionUserInfoInterface user = this
						.getUserInfoBySession(request);
				List<Map> list = studentService.queryFor_students_age_OutExcel(
						classuuid, groupuuid, uuid, xlsname, user);
				ExcelUtil.outXLS_students_age(response, "幼儿园、幼儿班分年龄幼儿数", list);
				return null;
			}

			List<Student> list = studentService.queryForOutExcel(classuuid,
					groupuuid);

			List<PClass> listClass = studentService
					.queryClassNameForOutExcel(classuuid);

			if ("huaMingCe".equals(xlsname)) {
				ExcelUtil.outXLS_huaMingce(response, "幼儿园花名册", list, listClass);
				return null;
			} else if ("yiLiaoBaoXian".equals(xlsname)) {
				ExcelUtil.outXLS_yiliaobaoxian(response, "幼儿园花名册", list,
						listClass);
				return null;
			} else {

				ExcelUtil.outputPrintWriterStream(response, "幼儿园基本情况登记表", list);
			}

		} catch (Exception e) {
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
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
	public String parentContactByMyStudent(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String student_name = request.getParameter("student_name");
			String class_uuid = request.getParameter("class_uuid");


			if (DBUtil.isSqlInjection(student_name, responseMessage)) {
				return "";
			}

			if (DBUtil.isSqlInjection(class_uuid, responseMessage)) {
				return "";
			}
			SessionUserInfoInterface user = this.getUserInfoBySession(request);
			List listClassuuids = null;
			if (StringUtils.isBlank(class_uuid)) {
				listClassuuids = pxClassService.getTeacherRelClassUuids(user
						.getUuid());
			} else {
				listClassuuids = new ArrayList();
				listClassuuids.add(class_uuid);
			}

			List list = studentService.parentContactByMyStudent(listClassuuids,
					student_name);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
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
	public String inviteParents(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		String tels = request.getParameter("tels");

		responseMessage.setMessage("暂不开放,IOS家长客户端审核通过后,开放.");
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

}
