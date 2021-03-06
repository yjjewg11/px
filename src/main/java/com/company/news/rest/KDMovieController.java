package com.company.news.rest;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.KDMovie;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.KDMovieJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.BaseDianzanService;
import com.company.news.service.BaseReplyService;
import com.company.news.service.KDMovieService;
import com.company.news.vo.ResponseMessage;
/**
 * 家庭相册
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/kdMovie")
public class KDMovieController extends AbstractRESTController {
	@Autowired
	private BaseDianzanService baseDianzanService;
	@Autowired
	private KDMovieService kDMovieService;
	@Autowired
	private BaseReplyService baseReplyService;
	/**
	 * 修改保存相册基本资料
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
		KDMovieJsonform favoritesJsonform;
		try {
			favoritesJsonform = (KDMovieJsonform) this.bodyJsonToFormObject(
					bodyJson, KDMovieJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("服务器异常:"+error_bodyJsonToFormObject);
			return "";
		}
		
		//设置当前用户
		
		try {
			KDMovie flag;
			    flag = kDMovieService.save(favoritesJsonform, responseMessage, request);

			if (flag==null)// 请求服务返回失败标示
				return "";
			
			model.addAttribute(RestConstants.Return_G_entity_id,flag.getUuid());
			model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getFPMovieByUuid(flag.getUuid()));
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("操作成功");
		return "";
	}

	/**
	 * 
	 * 查询我关联的所有动态相册.
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryMy", method = RequestMethod.GET)
	public String queryMy(ModelMap model, HttpServletRequest request,PaginationData pData) {
		model.clear();
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		//设置当前用户
		SessionUserInfoInterface user=this.getUserInfoBySession(request);
		
		try {
			PageQueryResult pageQueryResult= kDMovieService.queryMy(user,pData,model);
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
	 * 查询所有动态相册.
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String query(ModelMap model, HttpServletRequest request,PaginationData pData) {
		model.clear();
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		//设置当前用户
		SessionUserInfoInterface user=this.getUserInfoBySession(request);
		
		try {
			PageQueryResult pageQueryResult= kDMovieService.query(user,pData,model);
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
			String uuid=request.getParameter("uuid");
			if(DBUtil.isSqlInjection(uuid, responseMessage)){
				return "";
			}
			if(StringUtils.isBlank(uuid)){
				responseMessage.setMessage("uuid 不能为空!");
				return "";
			}
			boolean flag = kDMovieService.delete(request,uuid
					,responseMessage);
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
		responseMessage.setMessage("操作成功");
		return "";
	}

	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public String get(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Map m;
		try {
			String uuid=request.getParameter("uuid");
			//防止sql注入.
			if(DBUtil.isSqlInjection(uuid,responseMessage))return "";
			
			m = kDMovieService.get(uuid);
			if(m==null){
				responseMessage.setMessage("查询对象不存在!");
				return "";
			}
			SessionUserInfoInterface user = this.getUserInfoBySession(request);
			String user_uuid=null;
			if(user!=null){
				user_uuid=user.getUuid();
			}
			
//			Boolean isReadOnly=true;
//			if(m.get("create_useruuid").equals(user_uuid)){
//				isReadOnly=false;
//			}
//			model.addAttribute(RestConstants.Return_ISREADONLY,isReadOnly);
//			
			model.put(RestConstants.Return_ResponseMessage_isFavorites,kDMovieService.isFavorites( user_uuid,uuid));
			model.put(RestConstants.Return_ResponseMessage_dianZan,baseDianzanService.query(uuid, SystemConstants.common_type_KDMovie, user_uuid));
			PaginationData pData=new PaginationData();
//			pData.setPageSize(50);
//			model.put(RestConstants.Return_ResponseMessage_dianZanNameList,baseDianzanService.queryNameByPage(uuid, SystemConstants.common_type_FPPhotoItem, user_uuid, pData));
//			
			model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getKDMovieByUuid(uuid));
			model.put(RestConstants.Return_ResponseMessage_reply_count,baseReplyService.queryCount(uuid, SystemConstants.common_type_KDMovie));
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,m);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
}
