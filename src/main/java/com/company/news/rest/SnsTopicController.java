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
import com.company.news.cache.PxRedisCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.SnsTopic;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.SnsTopicJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.CountService;
import com.company.news.service.SnsDianzanService;
import com.company.news.service.SnsTopicService;
import com.company.news.service.SnsTopicVoteItemService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/snsTopic")
public class SnsTopicController extends AbstractRESTController {
	@Autowired
	private SnsTopicService snsTopicService;
	

	@Autowired
	private SnsDianzanService snsDianzanService;
	@Autowired
	private SnsTopicVoteItemService snsTopicVoteItemService;
	/**
	 * 保存
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
		SessionUserInfoInterface user=this.getSessionUser(request, responseMessage);
		if(user==null)return "";
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		SnsTopicJsonform jsonform;
		
		try {
			jsonform = (SnsTopicJsonform) this.bodyJsonToFormObject(
					bodyJson, SnsTopicJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			SnsTopic flag;
			if(StringUtils.isEmpty(jsonform.getUuid())){
				
				flag = snsTopicService.add(jsonform, responseMessage,request);
			}
			else{
				flag = snsTopicService.update(jsonform, responseMessage,request);
			}
			if (flag==null)// 请求服务返回失败标示
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
	 * 最新话题,用于管理员审查查询使用
	 *	listPage
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listPageForCheck", method = RequestMethod.GET)
	public String listPageForCheck(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String section_id=request.getParameter("section_id");
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = snsTopicService.listPageForCheck(pData,section_id,request);
			
			model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}
	 /**
	 * 最新话题
	 *	listPage
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listPageByWjkj", method = RequestMethod.GET)
	public String listPageByWjkj(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String section_id=request.getParameter("section_id");
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = snsTopicService.listPageByWjkj(pData,section_id,request);
			
			model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}

	 /**
	 * 最新话题
	 *	listPage
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listPage", method = RequestMethod.GET)
	public String listPage(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			String section_id=request.getParameter("section_id");
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = snsTopicService.listPage(pData,section_id,request);
			
			model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
	}
	 /**
		 * 热门话题
		 * /hotListPage
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/hotListPage", method = RequestMethod.GET)
		public String hotlistPage(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			try {
				String section_id=request.getParameter("section_id");
				PaginationData pData = this.getPaginationDataByRequest(request);
				PageQueryResult list = snsTopicService.hotlistPage(pData,section_id,request);
				
				model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("服务器异常:"+e.getMessage());
				return "";
			}
		}
		
		
		 /**
		 * 精华话题
		 *	/topListPage
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/topListPage", method = RequestMethod.GET)
		public String topListPage(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			try {
				String section_id=request.getParameter("section_id");
				PaginationData pData = this.getPaginationDataByRequest(request);
				PageQueryResult list = snsTopicService.topListPage(pData,section_id,request);
				
				model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("服务器异常:"+e.getMessage());
				return "";
			}
		}
		
	
	 /**
		 *同意观点
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/yes", method = RequestMethod.GET)
		public String yes(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			try {
				
				SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
				if(user==null){
					return "";
				}
				String uuid=request.getParameter("uuid");
//				PaginationData pData = this.getPaginationDataByRequest(request);
				boolean flag = snsTopicService.updateDianzan(user,uuid,SystemConstants.SnsDianzan_status_yes, responseMessage);
				if(!flag)return "";
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("服务器异常:"+e.getMessage());
				return "";
			}
		}
		
		 /**
		 * 不同意观点
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/no", method = RequestMethod.GET)
		public String no(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
try {
				
				SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
				if(user==null){
					return "";
				}
				String uuid=request.getParameter("uuid");
//				PaginationData pData = this.getPaginationDataByRequest(request);
				boolean flag = snsTopicService.updateDianzan(user,uuid,SystemConstants.SnsDianzan_status_no, responseMessage);
				if(!flag)return "";
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("服务器异常:"+e.getMessage());
				return "";
			}
		}
		
		 /**
		 * 不同意观点
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/cancelDianzan", method = RequestMethod.GET)
		public String cancelDianzan(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			try {
				
				SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
				if(user==null){
					return "";
				}
				String uuid=request.getParameter("uuid");
//				PaginationData pData = this.getPaginationDataByRequest(request);
				boolean flag = snsTopicService.cancelDianzan(user,uuid, responseMessage);
				if(!flag)return "";
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
				return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("服务器异常:"+e.getMessage());
				return "";
			}
		}
		
	
				@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
				public String get(@PathVariable String uuid,ModelMap model, HttpServletRequest request) {
					ResponseMessage responseMessage = RestUtil
							.addResponseMessageForModelMap(model);
					SnsTopic a;
					try {
						
						uuid=DBUtil.safeToWhereString(uuid);
						a = snsTopicService.get(uuid);
						if(a==null){
							responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
							responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
							return "";
						}
						if(SystemConstants.Check_status_disable.equals(a.getStatus())){
							responseMessage.setMessage(ResponseMessageConstants.Check_status_disable);
							return "";
						}
						
						Long cacheCount=PxRedisCache.getIncrSnsTopicCountByExt_uuid(uuid);
						if(cacheCount==null||cacheCount<=1){
							Long tmp_count=a.getClick_count();
							if(tmp_count==null)tmp_count=0l;
							cacheCount=tmp_count+1;
							PxRedisCache.setSnsTopicByExt_uuid(uuid, cacheCount);
						}
						
						SessionUserInfoInterface user=this.getUserInfoBySession(request);
						model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getSnsTopicByUuid(uuid));
						model.put(RestConstants.Return_ResponseMessage_count, cacheCount);
						model.put(RestConstants.Return_ResponseMessage_dianZan,snsDianzanService.getDianzanStatus(uuid, user));
						model.put(RestConstants.Return_ResponseMessage_isFavorites,snsTopicService.isFavorites( user,uuid));
						
						
						if(SystemConstants.SnsTopic_section_id_Vote.equals(a.getSection_id())){
							model.put("voteItem_uuid", snsTopicVoteItemService.getVoteItemUuid(uuid, user));
							//投票观点的列表.
							model.put("itemList", snsTopicVoteItemService.queryByTopic_uuid(uuid));
						}
						
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
						uuid=DBUtil.safeToWhereString(uuid);
						boolean flag = snsTopicService.delete(uuid,
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
				 *设置话题级别.
				 *snsTopic/updateLevel.json?uuid=aaa&leve=9
				 *level:0,表示正常,9:表示精华帖
				 * @param model
				 * @param request
				 * @return
				 */
				@RequestMapping(value = "/updateLevel", method = RequestMethod.GET)
				public String updateLevel(ModelMap model, HttpServletRequest request) {
					ResponseMessage responseMessage = RestUtil
							.addResponseMessageForModelMap(model);
					try {
						
						SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
						if(user==null){
							return "";
						}
						String uuid=request.getParameter("uuid");
						String level=request.getParameter("level");
						if(!StringUtils.isNumeric(level)){
							responseMessage.setMessage("level不是有效数字.");
							return "";
						}
						if(!"0".equals(level)&&
								!"9".equals(level)){
							responseMessage.setMessage("level不是有效数字.");
							return "";
						}
//						PaginationData pData = this.getPaginationDataByRequest(request);
						boolean flag = snsTopicService.updateLevel(user,uuid,level, responseMessage);
						if(!flag)return "";
						responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
						return "";
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
						responseMessage.setMessage("服务器异常:"+e.getMessage());
						return "";
					}
				}
				
		
}
