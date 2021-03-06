package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.ResponseMessageConstants;
import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.interfaces.SessionUserInfoInterface;
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
import com.company.web.listener.SessionListener;

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
			
		

			//设置当前用户
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			announcementsJsonform.setCreate_user(user.getName());
			announcementsJsonform.setCreate_useruuid(user.getUuid());
			
	
			boolean flag;
			if(StringUtils.isEmpty(announcementsJsonform.getUuid())){
				
				flag = announcementsService.add(announcementsJsonform, responseMessage,request);
			}
			else{
				flag = announcementsService.update(announcementsJsonform, responseMessage,request);
			}
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
	@RequestMapping(value = "/listByWjkj", method = RequestMethod.GET)
	public String listByWjkj(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		String right=RightConstants.AD_announce_m;
		
		try {
			String type=request.getParameter("type");
			String enddate=request.getParameter("enddate");
			
			//判断是否有权限
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,right, request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = announcementsService.listByWjkjPage(type,enddate,pData);
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
	 * 根据分类获取所有，管理员用
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listPxbenefit", method = RequestMethod.GET)
	public String listPxbenefit(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		String right=RightConstants.KD_announce_m;
		if(SessionListener.isPXLogin(request)){
			right=RightConstants.PX_announce_m;
		}
		
		try {
			String groupuuid=request.getParameter("groupuuid");
			String type=request.getParameter("type");
			type=SystemConstants.common_type_pxbenefit+"";
			if(StringUtils.isBlank(groupuuid)){
				groupuuid=RightUtils.getRightGroups(right, request);
				if(StringUtils.isBlank(groupuuid)){
					responseMessage.setStatus(RightConstants.Return_msg);
					return "";
				}
			}else{
				//判断是否有权限
				if(!RightUtils.hasRight(groupuuid,right, request)){
					responseMessage.setMessage(RightConstants.Return_msg);
					return "";
				}
			}
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = announcementsService.listByRight(type,groupuuid,pData);
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
		
		String right=RightConstants.KD_announce_m;
		if(SessionListener.isPXLogin(request)){
			right=RightConstants.PX_announce_m;
		}
		
		try {
			String groupuuid=request.getParameter("groupuuid");
			String type=request.getParameter("type");
			//帮助文档指定groupuuid
			if(String.valueOf(SystemConstants.common_type_KDHelp).equals(type)){
				groupuuid=SystemConstants.Group_uuid_wjkj;
				right=RightConstants.AD_announce_m;
			}else if(String.valueOf(SystemConstants.common_type_PDHelp).equals(type)){
				groupuuid=SystemConstants.Group_uuid_wjkj;
				right=RightConstants.AD_announce_m;
			}
			
			if(StringUtils.isBlank(groupuuid)){
				groupuuid=RightUtils.getRightGroups(right, request);
				if(StringUtils.isBlank(groupuuid)){
					responseMessage.setStatus(RightConstants.Return_msg);
					return "";
				}
			}else{
				//判断是否有权限
				if(!RightUtils.hasRight(groupuuid,right, request)){
					responseMessage.setMessage(RightConstants.Return_msg);
					return "";
				}
			}
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = announcementsService.listByRight(type,groupuuid,pData);
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
//			if(StringUtils.isBlank(groupuuids)){
//				groupuuids=this.getMyGroupUuidsBySession(request);
//			}
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			PageQueryResult pageQueryResult = announcementsService.queryMy(user,groupuuids,pData);
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
			
			String right=RightConstants.KD_announce_m;
			if(SessionListener.isPXLogin(request)){
				right=RightConstants.PX_announce_m;
			}
			
			
			a = announcementsService.get(uuid);
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "";
			}
			if(SystemConstants.Check_status_disable.equals(a.getStatus())){
				
				//判断是否有权限.有权限的人可以浏览.禁用的.
				if(!RightUtils.hasRight(a.getGroupuuid(),right, request)){
					
					responseMessage.setMessage(ResponseMessageConstants.Check_status_disable);
					return "";
				}
			}
			String share_url=null;
			if(!PxStringUtil.isUrl(a.getUrl())){
				//如果是公告则显示公告分享地址
				if(SystemConstants.common_type_gonggao==a.getType().intValue()){
					share_url=PxStringUtil.getAnnByUuid(uuid);
				}else{
					share_url=PxStringUtil.getArticleByUuid(uuid);

				}
			}else{
			//	model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_jingpinwenzhang));
				share_url=a.getUrl();
			}
			model.put(RestConstants.Return_ResponseMessage_share_url,share_url);
			
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
//			model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getAnnByUuid(uuid));
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid,a.getType()));
			model.put(RestConstants.Return_ResponseMessage_isFavorites,announcementsService.isFavorites( user.getUuid(),uuid));
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
