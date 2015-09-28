package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.beanutils.converters.SqlTimestampConverter;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.User;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.ClassNewsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.ClassNewsService;
import com.company.news.service.CountService;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.statistics.PieStatisticsVo;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/classnews")
public class ClassNewsController extends AbstractRESTController {

	@Autowired
	private ClassNewsService classNewsService;

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
		ClassNewsJsonform classNewsJsonform;
		try {
			classNewsJsonform = (ClassNewsJsonform) this.bodyJsonToFormObject(
					bodyJson, ClassNewsJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

		// 设置当前用户
		User user = this.getUserInfoBySession(request);
		//转换特定格式.
		classNewsJsonform.setContent(MyUbbUtils.htmlToMyUbb(classNewsJsonform.getContent()));
		classNewsJsonform.setImgs(PxStringUtil.imgUrlToUuid(classNewsJsonform.getImgs()));
		try {
			boolean flag;
			if (StringUtils.isEmpty(classNewsJsonform.getUuid()))
				flag = classNewsService.add(user,classNewsJsonform, responseMessage,request);
			else
				flag = classNewsService.update(user,classNewsJsonform,responseMessage,request);
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
	 * 获取班级信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@Deprecated
	@RequestMapping(value = "/getClassNewsByClassuuid", method = RequestMethod.GET)
	public String getClassNewsByClassuuid(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			User user = this.getUserInfoBySession(request);
			PageQueryResult pageQueryResult = classNewsService.query(user,null,
					request.getParameter("classuuid"), pData);
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
	
	/**
	 * 获取我的相关班级信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getClassNewsByMy", method = RequestMethod.GET)
	public String getClassNewsByMy(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String type=request.getParameter("type");
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			User user = this.getUserInfoBySession(request);
			pData.setPageSize(5);
			PageQueryResult pageQueryResult = classNewsService.getClassNewsByMy(user,type,
					request.getParameter("classuuid"), pData);
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
	/**
	 * 管理员-查询我管理学校的互动
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listClassNewsByAdmin", method = RequestMethod.GET)
	public String listClassNewsByAdmin(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			String right=RightConstants.KD_announce_m;
			if(SessionListener.isPXLogin(request)){
				right=RightConstants.PX_announce_m;
			}
			
			
			PaginationData pData = this.getPaginationDataByRequest(request);
			User user = this.getUserInfoBySession(request);
			pData.setPageSize(5);
			String groups=RightUtils.getRightGroups(right, request);
			if(StringUtils.isBlank(groups)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			
			String groupuuid=request.getParameter("groupuuid");
			if(StringUtils.isNotBlank(groupuuid)&&!groups.contains(groupuuid)){
				responseMessage.setMessage("选择的幼儿园没有权限");
				return "";
			}
			if(StringUtils.isNotBlank(groupuuid)){
				groups=groupuuid;
			}
			PageQueryResult pageQueryResult = classNewsService.listClassNewsByAdmin(groups,user, pData);
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
	/**
	 * 平台方可以查看所有互动.
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllClassNewsByWJ", method = RequestMethod.GET)
	public String getAllClassNewsByWJ(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			// 请求消息体
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_classnew_m,request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			
			PaginationData pData = this.getPaginationDataByRequest(request);
			User user = this.getUserInfoBySession(request);
			pData.setPageSize(5);

			PageQueryResult pageQueryResult = classNewsService.getAllClassNewsByWJ(user, pData);
			
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
	/**
	 * 获取我的关联学校-的互动
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllClassNews", method = RequestMethod.GET)
	public String getAllClassNews(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String type=request.getParameter("type");
		try {
			
			PaginationData pData = this.getPaginationDataByRequest(request);
			User user = this.getUserInfoBySession(request);
			pData.setPageSize(5);
			String groups=this.getMyGroupUuidsBySession(request);
			if(StringUtils.isBlank(groups)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return "";
			}
			
			String groupuuid=request.getParameter("groupuuid");
			if(StringUtils.isNotBlank(groupuuid)&&!groups.contains(groupuuid)){
				responseMessage.setMessage("非法请求:选择的幼儿园没有权限");
				return "";
			}
			if(StringUtils.isNotBlank(groupuuid)){
				groups=groupuuid;
			}
			PageQueryResult pageQueryResult = classNewsService.listClassNewsByMygroup(groups,user, pData);
			
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
			boolean flag = classNewsService.delete(
					request.getParameter("uuid"), responseMessage);
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
	public String get(@PathVariable String uuid, ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		ClassNewsJsonform c;
		try {
			c = classNewsService.get(uuid);
			//定义接口,返回浏览总数.
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_hudong));
			model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getClassNewsByUuid(uuid));
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity, c);
		
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 统计我的发布的班级互动数量,收到点赞,和回复的总数.
	 * @param type
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getMyClassnewStatistics", method = RequestMethod.GET)
	public String getMyClassnewStatistics( ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

			try {
				User user = this.getUserInfoBySession(request);

				PieStatisticsVo vo = classNewsService.getMyClassnewStatistics(
					responseMessage, user);
				model.addAttribute(RestConstants.Return_G_entity, vo.getTitle_text());
			} catch (Exception e) {
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("服务器错误:"+e.getMessage());
				return "";
			}
		
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	@Autowired
	private CountService countService;

}
