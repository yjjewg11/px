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
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.User;
import com.company.news.jsonform.AnnouncementsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.AnnouncementsService;
import com.company.news.service.CountService;
import com.company.news.vo.AnnouncementsVo;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/announcements")
public class AnnouncementsController extends AbstractRESTController {

	@Autowired
	private AnnouncementsService announcementsService;

	/**
	 * 组织注册
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
		AnnouncementsJsonform announcementsJsonform;
		try {
			announcementsJsonform = (AnnouncementsJsonform) this.bodyJsonToFormObject(
					bodyJson, AnnouncementsJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			
			if (StringUtils.isBlank(announcementsJsonform.getGroupuuid())) {
				responseMessage.setMessage("Groupuuid不能为空！");
				return "";
			}

			if(!RightUtils.hasRight(announcementsJsonform.getGroupuuid(),RightConstants.KD_announce_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			//设置当前用户
			User user=this.getUserInfoBySession(request);
			announcementsJsonform.setCreate_user(user.getName());
			announcementsJsonform.setCreate_useruuid(user.getUuid());
			
	
			boolean flag;
			if(StringUtils.isEmpty(announcementsJsonform.getUuid()))
			    flag = announcementsService.add(announcementsJsonform, responseMessage);
			else
				flag = announcementsService.update(announcementsJsonform, responseMessage);

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
		responseMessage.setMessage("保存成功");
		return "";
	}


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
			String groupuuid=request.getParameter("groupuuid");
			if(StringUtils.isBlank(groupuuid)){
				groupuuid=RightUtils.getRightGroups(RightConstants.KD_announce_m, request);
				if(StringUtils.isBlank(groupuuid)){
					responseMessage.setStatus(RightConstants.Return_msg);
					return "";
				}
			}else{
				//判断是否有权限
				if(!RightUtils.hasRight(groupuuid,RightConstants.KD_announce_m, request)){
					responseMessage.setMessage(RightConstants.Return_msg);
					return "";
				}
			}
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = announcementsService.listByRight(request.getParameter("type"),groupuuid,pData);
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
			
			boolean flag = announcementsService.delete(request.getParameter("uuid"),
					responseMessage,request);
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
	 * 获取我的孩子学校相关的公告
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryMy", method = RequestMethod.GET)
	public String queryMy(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			String groupuuids=request.getParameter("groupuuids");
			if(StringUtils.isBlank(groupuuids)){
				groupuuids=this.getMyGroupUuidsBySession(request);
			}
			PageQueryResult pageQueryResult = announcementsService.query(groupuuids,pData);
			model.addAttribute(RestConstants.Return_ResponseMessage_list,
					pageQueryResult);
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
	
//	/**
//	 * 获取我的通知
//	 * 
//	 * @param model
//	 * @param request
//	 * @return
//	 */
//	@RequestMapping(value = "/queryMyAnnouncements", method = RequestMethod.GET)
//	public String queryMyAnnouncements(ModelMap model, HttpServletRequest request) {
//		ResponseMessage responseMessage = RestUtil
//				.addResponseMessageForModelMap(model);
//		try {
//			User user = this.getUserInfoBySession(request);
//			List list = announcementsService.queryMyAnnouncements(user,request.getParameter("type"),request.getParameter("groupuuid"),request.getParameter("classuuid"));
//			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//			responseMessage.setMessage("服务器异常:"+e.getMessage());
//			return "";
//		}
//		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
//		return "";
//	}
	@Autowired
	private CountService countService;
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		AnnouncementsVo a;
		try {
			a = announcementsService.get(uuid);
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("数据不存在.");
				return "";
			}
			if(SystemConstants.Check_status_disable.equals(a.getStatus())){
				responseMessage.setMessage("数据已被禁止浏览!");
				return "";
			}
			model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getAnnByUuid(uuid));
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid,a.getType()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
