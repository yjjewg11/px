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
import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.entity.Group;
import com.company.news.entity.Message;
import com.company.news.entity.User;
import com.company.news.jsonform.MessageJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.GroupService;
import com.company.news.service.MessageService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/message")
public class MessageController extends AbstractRESTController {

	@Autowired
	private MessageService messageService;
	@Autowired
	public GroupService groupService;
	/**
	 * 给老家长写信
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveToParent", method = RequestMethod.POST)
	public String saveToParent(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		MessageJsonform messageJsonform;
		try {
			messageJsonform = (MessageJsonform) this.bodyJsonToFormObject(
					bodyJson, MessageJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		//设置当前用户
		User user=this.getUserInfoBySession(request);
		messageJsonform.setSend_user(user.getName());
		messageJsonform.setSend_useruuid(user.getUuid());
		messageJsonform.setType(SystemConstants.Message_type_1);//
		messageJsonform.setTitle(SystemConstants.Message_title_xinxiang);
		messageJsonform.setMessage(MyUbbUtils.htmlToMyUbb(messageJsonform.getMessage()));
		try {
			boolean flag;
			    flag = messageService.add(messageJsonform, responseMessage);

			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}
//
//	/**
//	 * 保存(不用)
//	 * 
//	 * @param model
//	 * @param request
//	 * @return
//	 */
//	@RequestMapping(value = "/save", method = RequestMethod.POST)
//	public String save(ModelMap model, HttpServletRequest request) {
//		
//		
//		// 返回消息体
//		ResponseMessage responseMessage = RestUtil
//				.addResponseMessageForModelMap(model);
//		if(!RightUtils.hasRight(RightConstants.KD_announce_m,request)){
//			responseMessage.setMessage(RightConstants.Return_msg);
//			return "";
//		}
//		// 请求消息体
//		String bodyJson = RestUtil.getJsonStringByRequest(request);
//		MessageJsonform messageJsonform;
//		try {
//			messageJsonform = (MessageJsonform) this.bodyJsonToFormObject(
//					bodyJson, MessageJsonform.class);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			responseMessage.setMessage(error_bodyJsonToFormObject);
//			return "";
//		}
//		
//		//设置当前用户
//		User user=this.getUserInfoBySession(request);
//		messageJsonform.setSend_user(user.getName());
//		messageJsonform.setSend_useruuid(user.getUuid());
//		
//		try {
//			boolean flag;
//			    flag = messageService.add(messageJsonform, responseMessage);
//
//			if (!flag)// 请求服务返回失败标示
//				return "";
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//			responseMessage.setMessage(e.getMessage());
//			return "";
//		}
//
//		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
//		responseMessage.setMessage("修改成功");
//		return "";
//	}


	/**
	 * 根据分类获取所有，管理员用
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult pageQueryResult= messageService.query(request.getParameter("type"),request.getParameter("useruuid"),pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
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
	 * 
	 * 查询我的及时消息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryMyTimely", method = RequestMethod.GET)
	public String queryMessageByMy(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			//设置当前用户
			User user=this.getUserInfoBySession(request);
			
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult pageQueryResult= messageService.query(null,user.getUuid(),pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
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
	 * 查询我(老师)和家长的信件
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryByParent", method = RequestMethod.GET)
	public String queryByParent(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			//设置当前用户
			User user=this.getUserInfoBySession(request);
			String parent_uuid=request.getParameter("uuid");
			if(StringUtils.isBlank(parent_uuid)){
				responseMessage.setMessage("参数必填:uuid");
				return "";
			}
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult pageQueryResult= messageService.queryMessageByTeacher(user.getUuid(),parent_uuid,pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
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
	 * 查询我(家长)和园长的信件
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryByParentAndLeader", method = RequestMethod.GET)
	public String queryByLeader(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			//设置当前用户
			User user=this.getUserInfoBySession(request);
			String parent_uuid=request.getParameter("parent_uuid");
			if(StringUtils.isBlank(parent_uuid)){
				responseMessage.setMessage("参数必填:parent_uuid");
				return "";
			}
			String group_uuid=request.getParameter("group_uuid");
			if(StringUtils.isBlank(group_uuid)){
				responseMessage.setMessage("参数必填:group_uuid");
				return "";
			}
			String groupUuids=this.getMyGroupUuidsBySession(request);
			if(groupUuids==null||!groupUuids.contains(group_uuid)){
				responseMessage.setMessage("非法参数,不是该幼儿园的老师:group_uuid"+group_uuid);
				return "";
			}
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult pageQueryResult= messageService.queryByParentAndLeader(group_uuid,parent_uuid,pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
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
	 * 查询我(家长)和园长的信件
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryLeaderMsgByParents", method = RequestMethod.GET)
	public String queryLeaderMsgByParents(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			//设置当前用户
			User user=this.getUserInfoBySession(request);
			
//		String group_uuid=request.getParameter("group_uuid");
//		if(StringUtils.isBlank(group_uuid)){
//			responseMessage.setMessage("参数必填:group_uuid");
//			return "";
//		}
			PaginationData pData = this.getPaginationDataByRequest(request);
			List list= messageService.queryLeaderMsgByParents(this.getMyGroupUuidsBySession(request),pData);
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
	 * 园长写信给家长
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveLeaderToParent", method = RequestMethod.POST)
	public String saveLeaderToParent(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		MessageJsonform messageJsonform;
		try {
			messageJsonform = (MessageJsonform) this.bodyJsonToFormObject(
					bodyJson, MessageJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		
		if(StringUtils.isBlank(messageJsonform.getSend_useruuid())){
			responseMessage.setMessage("send_useruuid 不能为空,需要填写幼儿园uuid");
			return "";
		}
		//设置当前用户
		String groupUuids=this.getMyGroupUuidsBySession(request);
		if(groupUuids==null||!groupUuids.contains(messageJsonform.getSend_useruuid())){
			responseMessage.setMessage("非法参数,不是该幼儿园的老师:group_uuid"+messageJsonform.getSend_useruuid());
			return "";
		}
		
		Group group=(Group)CommonsCache.get(messageJsonform.getSend_useruuid(), Group.class);

		if(group==null){
			responseMessage.setMessage("send_useruuid无效.没有对应的幼儿园.:"+messageJsonform.getSend_useruuid());
			return "";
		}
		messageJsonform.setSend_user(group.getBrand_name()+"园长");
		messageJsonform.setSend_useruuid(group.getUuid());
		messageJsonform.setType(SystemConstants.Message_type_2);//
		messageJsonform.setTitle(SystemConstants.Message_title_xinxiang);
		
		messageJsonform.setMessage(MyUbbUtils.htmlToMyUbb(messageJsonform.getMessage()));
		try {
			boolean flag;
			    flag = messageService.add(messageJsonform, responseMessage);

			if (!flag)// 请求服务返回失败标示
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("修改成功");
		return "";
	}
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
		if(!RightUtils.hasRight(RightConstants.KD_announce_m,request)){
			responseMessage.setMessage(RightConstants.Return_msg);
			return "";
		}
		try {
			boolean flag = messageService.delete(request.getParameter("uuid"),
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
	
	
	/**
	 * 班级删除
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/read", method = RequestMethod.POST)
	public String read(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			boolean flag = messageService.read(request.getParameter("uuid"),
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
	
	

	
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Message m;
		try {
			m = messageService.get(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,m);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
