package com.company.news.rest;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.KDPhotoItem;
import com.company.news.form.KDPhotoItemForm;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.KDPhotoItemService;
import com.company.news.vo.ResponseMessage;
/**
 * 家庭照片o
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/kDPhotoItem")
public class KDPhotoItemController extends AbstractRESTController {

	@Autowired
	private KDPhotoItemService kDPhotoItemService;

	

	/**
	 * 上传我的头像
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String upload(@RequestParam("file") CommonsMultipartFile file,
			 KDPhotoItemForm form,ModelMap model,
			HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
//			String md5=request.getParameter("md5");
//			String photo_time=request.getParameter("photo_time");
//			String address=request.getParameter("address");
//			String note=request.getParameter("note");
			KDPhotoItem uploadFile = kDPhotoItemService.uploadImg(form, file,
					responseMessage, request);
			if (uploadFile == null)
				return "";

			model.addAttribute(RestConstants.Return_G_entity, uploadFile);
			model.addAttribute(RestConstants.Return_G_imgUrl,
					PxStringUtil.imgUrlByUuid(uploadFile.getUuid()));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("上传成功");
		return "";
	}
	

	/**
	 * 
	 * 查询我关联的所有家庭的相片.
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
			
			String class_uuid=request.getParameter("class_uuid");
		//	String photo_time=request.getParameter("photo_time");
			if(DBUtil.isSqlInjection(class_uuid, responseMessage))return "";
			PageQueryResult pageQueryResult= kDPhotoItemService.query(user,class_uuid,user.getUuid(),pData);
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
	 * 查询我关联的所有家庭的相片.
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryMyFavorites", method = RequestMethod.GET)
	public String queryMyFavorites(ModelMap model, HttpServletRequest request,PaginationData pData) {
		model.clear();
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		//设置当前用户
		SessionUserInfoInterface user=this.getUserInfoBySession(request);
		pData.setPageSize(50);
		try {
			
			PageQueryResult pageQueryResult= kDPhotoItemService.queryMyFavorites(user,pData);
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
	 * 添加收藏
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/addFavorites", method = RequestMethod.POST)
	public String addFavorites(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			String uuid=request.getParameter("uuid");
				if(DBUtil.isSqlInjection(uuid, responseMessage))return "";
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			
			boolean flag = kDPhotoItemService.addFavorites(user,uuid
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
	

	/**
	 * 删除收藏
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deleteFavorites", method = RequestMethod.POST)
	public String deleteFavorites(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			String uuid=request.getParameter("uuid");
			//	String photo_time=request.getParameter("photo_time");
				if(DBUtil.isSqlInjection(uuid, responseMessage))return "";
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			
			boolean flag = kDPhotoItemService.deleteFavorites(user,uuid
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
			
			SessionUserInfoInterface user=this.getUserInfoBySession(request);
			
			boolean flag = kDPhotoItemService.delete(request,request.getParameter("uuid")
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
	public String get2(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Map m=null;
		try {
			String uuid=request.getParameter("uuid");
			if(DBUtil.isSqlInjection(uuid, responseMessage)){
				return "";
			}
			
			if(StringUtils.isBlank(uuid)){
				responseMessage.setMessage("uuid 必填");
				return "";
			}
			m = kDPhotoItemService.get(uuid);
			if(m==null){
				responseMessage.setMessage("数据不存在！");
				return "";
			}
			
		  
			SessionUserInfoInterface user = this.getUserInfoBySession(request);
			String user_uuid=null;
			if(user!=null){
				user_uuid=user.getUuid();
			}
			model.put(RestConstants.Return_ResponseMessage_isFavorites,kDPhotoItemService.isFavorites( user_uuid,uuid));
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
	

	
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		Object m=null;
		try {
			
			if(DbUtils.isSqlInjection(uuid, responseMessage)){
				return "";
			}
			m = kDPhotoItemService.get(uuid);
			if(m==null){
				responseMessage.setMessage("数据不存在！");
				return "";
			}
			
			SessionUserInfoInterface user = this.getUserInfoBySession(request);
			String user_uuid=null;
			if(user!=null){
				user_uuid=user.getUuid();
			}
			model.put(RestConstants.Return_ResponseMessage_isFavorites,kDPhotoItemService.isFavorites( user_uuid,uuid));
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
	
	/**
	 * 获取关联额外属性，是否收藏，是否点占
	 * 
	 * @param uuid
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/extra", method = RequestMethod.GET)
	public String extra(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String uuid=request.getParameter("uuid");
			if(DbUtils.isSqlInjection(uuid, responseMessage)){
				return "";
			}
		
			
			SessionUserInfoInterface user = this.getUserInfoBySession(request);
			String user_uuid=null;
			if(user!=null){
				user_uuid=user.getUuid();
			}
			Map map=kDPhotoItemService.getStatus(uuid);
			if(map==null){
				responseMessage.setMessage("照片不存在!");
				return "";
			}
			model.put("status",map.get("status") );
			model.put(RestConstants.Return_ResponseMessage_isFavorites,kDPhotoItemService.isFavorites( user_uuid,uuid));
			
			PaginationData pData=new PaginationData();
			pData.setPageSize(50);
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
