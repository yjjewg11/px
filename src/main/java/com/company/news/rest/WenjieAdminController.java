package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.cache.redis.PxRedisCacheImpl;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.CountService;
import com.company.news.service.EZCameraService;
import com.company.news.service.SynPxRedisToDbImplService;
import com.company.news.service.WenjieAdminService;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;

/**
 * 公开类,用于分享数据显示.
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/wenjieAdmin")
public class WenjieAdminController extends AbstractRESTController {
	@Autowired
	private SynPxRedisToDbImplService synPxRedisToDbImplService;
	 @Autowired
	  protected WenjieAdminService wenjieAdminService;
	
		/**
		 * 刷新学生与家长关系表
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/dataRefresh", method = RequestMethod.GET)
		public String dataRefresh(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.isAdmin(request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("dataRefresh is not admin!");
				return "";
			}
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_role_m, request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("dataRefresh is not authorization!");
				return "";
			}
			try {
				// 修复数据时使用.
				//wenjieAdminService.updateDataRefresh_Group(responseMessage);
//				wenjieAdminService.updateDataRefresh(responseMessage);
//				wenjieAdminService.updateDataRefreshStudentContactRealationByStudent(responseMessage);
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
		@Autowired
		private CountService countService;

		/**
		 * 同步昨天以前的数据到数据库
		 * @param model
		 * @param request
		 * @return
		 */
		@Deprecated
		@RequestMapping(value = "/redisToDb", method = RequestMethod.GET)
		public String redisToDb(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.isAdmin(request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("redisToDb is not admin!");
				return "";
			}
			try {
//				new PxRedisCacheImpl().synCountRedisToDb(synPxRedisToDbImplService);
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
		
		/**
		 * 刷新当天数据
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/redisTodayToDb", method = RequestMethod.GET)
		@Deprecated
		public String redisTodayToDb(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.isAdmin(request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("redisToDb is not admin!");
				return "";
			}
			try {
//				new PxRedisCacheImpl().synAllCountRedisToDb(synPxRedisToDbImplService);
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
		
		
		/**
		 * 同步昨天以前的数据到数据库
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/redisToDbBy2DayBefore", method = RequestMethod.GET)
		public String redisToDbBy2DayBefore(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.isAdmin(request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("redisToDb is not admin!");
				return "";
			}
			try {
//				PxRedisCacheImpl dd=new PxRedisCacheImpl();
//				dd.getPx_count().synCountRedisToDb();
//				dd.getSns_topic().synCountRedisToDb();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
		
		/**
		 * 刷新当天数据
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/redisTodayToDbByAll", method = RequestMethod.GET)
		public String redisTodayToDbByAll(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.isAdmin(request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("redisToDb is not admin!");
				return "";
			}
			try {
				
//				PxRedisCacheImpl dd=new PxRedisCacheImpl();
//				dd.getPx_count().synAllCountRedisToDb();
//				dd.getSns_topic().synAllCountRedisToDb();
//				
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
		
		
		/**
		 * 刷新所有用户信息到redis
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/readAllUserToRedis", method = RequestMethod.GET)
		public String readAllUserToRedis(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.isAdmin(request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("redisToDb is not admin!");
				return "";
			}
			try {
				
				wenjieAdminService.readAllParentToRedis(responseMessage);
				wenjieAdminService.readAllUserToRedis(responseMessage);
//				PxRedisCacheImpl dd=new PxRedisCacheImpl();
//				dd.getPx_count().synAllCountRedisToDb();
//				dd.getSns_topic().synAllCountRedisToDb();
//				
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
		
		
		/**
		 * 同步昨天以前的数据到数据库
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/parentReg", method = RequestMethod.POST)
		public String parentReg(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_user_m, request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("parentReg is not admin!");
				return "";
			}
			try {
				
				String tel=request.getParameter("tel");
				String password=request.getParameter("password");
				if (!CommonsValidate.checkCellphone(tel)) {
					responseMessage.setMessage("电话号码格式不正确！");
					return "";
				}
				if (StringUtils.isBlank(password)) {
					responseMessage.setMessage("密码不能为空");
					return "";
				}
				
				String code=wenjieAdminService.update_parentRegSmsdb(tel, password, responseMessage);
				if(StringUtils.isBlank(code)){
					responseMessage.setMessage("验证码不能为空");
					return "";
				}
				boolean flag=wenjieAdminService.update_parentReg(tel, password, code, responseMessage);
				if(!flag){
					return "";
				}
//				new PxRedisCacheImpl().synCountRedisToDb(synPxRedisToDbImplService);
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
		

		@Autowired
		private EZCameraService eZCameraService;

		/**
		 * 同步监控设备到数据库
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/cameraListToDB", method = RequestMethod.POST)
		public String update_cameraListToDB(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			
			if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj, RightConstants.AD_user_m, request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("cameraListToDB is not admin!");
				return "";
			}
			try {
				
			
				boolean flag=eZCameraService.update_cameraListToDB(model, request, responseMessage);
				if(!flag){
					return "";
				}
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}
		}
}
