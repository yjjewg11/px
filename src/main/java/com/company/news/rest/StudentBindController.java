package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.entity.StudentBind;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.StudentBindService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/studentbind")
public class StudentBindController extends AbstractRESTController {
	@Autowired
	private StudentBindService studentBindService;



	/**
	 * 班级删除
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public String delete(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		try {
			boolean flag = studentBindService.delete(request.getParameter("uuid"),
					responseMessage);
			if (!flag)
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("删除成功");
		return "";
	}

	

	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid, ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		StudentBind s;
		try {
			s = studentBindService.get(uuid);
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
	 * 查询一个班级的孩子所有卡数据
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String query(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		try {
			String classuuid =request.getParameter("classuuid");
			String groupuuid =request.getParameter("groupuuid");
			String studentuuid =request.getParameter("studentuuid");
			String otherWhere =request.getParameter("otherWhere");
			String cardid =request.getParameter("cardid");
			String type =request.getParameter("type");
			
			PaginationData pData = this.getPaginationDataByRequest(request);
			
			PageQueryResult list=null;
			if(SystemConstants.StudentBind_type_0.toString().equals(type)){
				list = studentBindService.queryForTeacher(groupuuid,studentuuid,cardid,otherWhere,pData);
			}else{
				list = studentBindService.queryForStudents(classuuid,groupuuid,studentuuid,cardid,otherWhere,pData);
			}
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
	responseMessage.setMessage("服务器异常:"+e.getMessage());
	return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

	/**
	 * 查询一个班级的孩子所有卡数据
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryByClassuuid", method = RequestMethod.GET)
	public String getStudentByClassuuid(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		try {
			String classuuid =request.getParameter("classuuid");
			String groupuuid =request.getParameter("groupuuid");
			String studentuuid =request.getParameter("studentuuid");
//			if(StringUtils.isBlank(classuuid)){
//				responseMessage.setMessage("班级必须选择.");
//				return "";
//			}
			List<Object[]> list = studentBindService.queryByClass(classuuid,groupuuid,studentuuid);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
			.setStatus(RestConstants.Return_ResponseMessage_failed);
	responseMessage.setMessage("服务器异常:"+e.getMessage());
	return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 声请学生接送卡
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/apply", method = RequestMethod.POST)
	public String apply(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		try {
			String studentuuid =request.getParameter("studentuuid");
			if(StringUtils.isBlank(studentuuid)){
				responseMessage.setMessage("请选择学生.");
				return "";
			}
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			StudentBind obj = studentBindService.update_apply(studentuuid,responseMessage,user);
			if(obj==null){
				
				return "";
			}
			responseMessage.setMessage("申请成功!申请号:"+obj.getUserid());
			model.addAttribute(RestConstants.Return_G_entity, obj);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	/**
	 * 删除申请学生接送卡
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cancelApply", method = RequestMethod.POST)
	public String cancelApply(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		String studentuuid =request.getParameter("studentuuid");
		String userid =request.getParameter("userid");

		try {
			if(StringUtils.isBlank(studentuuid)){
				responseMessage.setMessage("请选择学生.");
				return "";
			}
			if(StringUtils.isBlank(userid)){
				responseMessage.setMessage("请选择申请号.");
				return "";
			}
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			boolean obj = studentBindService.cancel_apply(studentuuid,userid,responseMessage,user);
			if(!obj){
				return "";
			}
			responseMessage.setMessage("操作成功!");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}

}
