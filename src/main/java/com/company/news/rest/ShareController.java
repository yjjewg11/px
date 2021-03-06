package com.company.news.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.common.HttpRequestUtils;
import com.company.news.ProjectProperties;
import com.company.news.ResponseMessageConstants;
import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.cache.PxRedisCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.FPPhotoUtil;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.Announcements;
import com.company.news.entity.BaseDataList;
import com.company.news.entity.ClassNews;
import com.company.news.entity.Cookbook;
import com.company.news.entity.CookbookPlan;
import com.company.news.entity.Group;
import com.company.news.entity.Group4Q;
import com.company.news.entity.KDMovie;
import com.company.news.entity.PxCourse;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.service.AnnouncementsService;
import com.company.news.service.ClassNewsService;
import com.company.news.service.CountService;
import com.company.news.service.KDPhotoItemService;
import com.company.news.vo.ResponseMessage;

/**
 * 公开类,用于分享数据显示.
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/share")
public class ShareController extends AbstractRESTController {

	 @Autowired
	  @Qualifier("NSimpleHibernateDao")
	  protected NSimpleHibernateDao nSimpleHibernateDao;
	 @Autowired
     private CountService countService ;

	 

		/**
		 * 获取表情列表(url)
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/getEmot", method = RequestMethod.GET)
		public String getEmot(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			try {
				List<BaseDataList> list= (List<BaseDataList>) this.nSimpleHibernateDao
						.getHibernateTemplate().find(
								"from BaseDataList where typeuuid='emot' and enable=1 order by datakey asc");
				this.nSimpleHibernateDao
				.getHibernateTemplate().clear();
				String share_url_getEmot=ProjectProperties.getProperty("share_url_getEmot", "http://120.25.248.31/px-rest/w/xheditor/xheditor_emot/default/");
				for(BaseDataList o:list){
					//o.getDescription()=laugh.gif
					o.setDescription(share_url_getEmot+o.getDescription());
				}
				
				model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
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
		 * 获取所有幼儿园列表
		 * 
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/allKDGroupList", method = RequestMethod.GET)
		public String allKDGroupList(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			PaginationData pData = this.getPaginationDataByRequest(request);
			String uuid_not_in=SystemConstants.Group_uuid_wjd+",group_wj1,group_wj2";
			String hql = "from Group4Q where type=1 and uuid not in("+DBUtil.stringsToWhereInValue(uuid_not_in)+")";
			hql += " order by create_time asc";
			PageQueryResult pageQueryResult = this.nSimpleHibernateDao
					.findByPaginationToHql(hql, pData);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		}
		@Autowired
	     private AnnouncementsService announcementsService ;
		 
		/**
		 * 获取精品文章列表
		 * 
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/articleList", method = RequestMethod.GET)
		public String articleList(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			PaginationData pData = this.getPaginationDataByRequest(request);
			
			String type=request.getParameter("type");
			if(!StringUtils.isNumeric(type)){
				type=SystemConstants.common_type_jingpinwenzhang+"";
			}
			String hql = "from Announcements4Q where status=0 and type="+type;
			hql += " order by create_time desc";
			PageQueryResult pageQueryResult = this.nSimpleHibernateDao
					.findByPaginationToHqlNoTotal(hql, pData);
			
			announcementsService.warpVoList(pageQueryResult.getData(),null);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "";
		}
		/**
		 * 获取精品文章详细
		 * 
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/getArticleJSON", method = RequestMethod.GET)
		public String getArticleJSON(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			String uuid=request.getParameter("uuid");
			Announcements a;
			try {
				a = (Announcements)nSimpleHibernateDao.getObject(Announcements.class,uuid);
				if(a==null){
					responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
					responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
					return "";
				}
				
				model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_jingpinwenzhang));
				model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getArticleByUuid(uuid));

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
		 * 获取精品文章详细
		 * 
		 * @param model
		 * @param request
		 * @return
		 */
		@RequestMapping(value = "/getArticle", method = RequestMethod.GET)
		public String getArticle(ModelMap model, HttpServletRequest request) {
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);
			String uuid=request.getParameter("uuid");
			try {
//				a = (Announcements)nSimpleHibernateDao.getObject(Announcements.class,uuid);
//				if(a==null){
//					responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//					responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
//					return "/404";
//				}
				
				String sql=" SELECT t1.uuid,t1.title,t1.create_time,t1.create_user,t1.status,t1.message";
				sql+=" FROM px_announcements t1 ";
				sql+=" where  t1.uuid='"+DbUtils.safeToWhereString(uuid)+"'";
				
				Session session=this.nSimpleHibernateDao.getSession();
				Query  query =session.createSQLQuery(sql);
				query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
				List<Map> list=query.list();
				if(list==null||list.size()==0){
					responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
					responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
					return "/404";
				}
				Map dbOjb=list.get(0);
				
				if(SystemConstants.Check_status_disable.toString().equals(dbOjb.get("status")+"")){
					responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
					responseMessage.setMessage(ResponseMessageConstants.Check_status_disable);
					return "/404";
				}
				//model.put("group",CommonsCache.get(a.getGroupuuid(), Group.class));
				model.put("show_time", TimeUtils.getDateString((Date)dbOjb.get("create_time")));
				model.addAttribute(RestConstants.Return_G_entity,dbOjb);
				
				model.put(RestConstants.Return_ResponseMessage_share_url,PxStringUtil.getArticleByUuid(uuid));
				model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_jingpinwenzhang));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "/404";
			}
		
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			return "/getArticle";
		}
	/**
	 * 全校公告
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAnn", method = RequestMethod.GET)
	public String getAnn(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		try {
			
			String sql=" SELECT t1.uuid,t1.title,t1.create_time,t1.create_user,t1.status,t1.message,t1.groupuuid";
			sql+=" FROM px_announcements t1 ";
			sql+=" where  t1.uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			
			Session session=this.nSimpleHibernateDao.getSession();
			Query  query =session.createSQLQuery(sql);
			query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
			List<Map> list=query.list();
			if(list==null||list.size()==0){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}
			Map dbOjb=list.get(0);
			
			if(SystemConstants.Check_status_disable.toString().equals(dbOjb.get("status")+"")){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Check_status_disable);
				return "/404";
			}
			//model.put("group",CommonsCache.get(a.getGroupuuid(), Group.class));
			model.put("show_time", TimeUtils.getDateString((Date)dbOjb.get("create_time")));
			model.put("group",CommonsCache.get((String)dbOjb.get("groupuuid"), Group4Q.class));
			
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_gonggao));
			model.addAttribute(RestConstants.Return_G_entity,dbOjb);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "/404";
		}
	
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getAnn";
	}
	
	@Autowired
	private ClassNewsService classNewsService;
	/**
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getClassNews", method = RequestMethod.GET)
	public String getClassNews(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		ClassNews a;
		try {
			a = (ClassNews)nSimpleHibernateDao.getObject(ClassNews.class,uuid);
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}
			classNewsService.warpVo(a, null,false);
//			PClass pClass=(PClass)CommonsCache.get(a.getClassuuid(), PClass.class);
//			model.put("group",CommonsCache.get(pClass.getGroupuuid(), Group.class));
//			model.put("pclass",CommonsCache.get(a.getClassuuid(), PClass.class));

//			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_hudong));
			
			if(StringUtils.isNotBlank(a.getUrl())){
				model.addAttribute("url",a.getUrl());
			}else{
				model.addAttribute("url",null);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "/404";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getClassNews";
	}

	/**
	 * 全校公告
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getCookbookPlan", method = RequestMethod.GET)
	public String getCookbookPlan(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		CookbookPlan a;
		try {
			a = (CookbookPlan)nSimpleHibernateDao.getObject(CookbookPlan.class,uuid);
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}
			
			

			a.setList_time_1(this.getCookbookList(a.getTime_1()));
			a.setList_time_2(this.getCookbookList(a.getTime_2()));
			a.setList_time_3(this.getCookbookList(a.getTime_3()));
			a.setList_time_4(this.getCookbookList(a.getTime_4()));
			a.setList_time_5(this.getCookbookList(a.getTime_5()));
			
			String G_imgPath=ProjectProperties.getProperty("img_down_url_pre", "http://localhost:8080/px-moblie/rest/uploadFile/getImgFile.json?uuid={uuid}");
			model.put("G_imgPath",G_imgPath.replace("{uuid}", ""));
			model.put("group",CommonsCache.get(a.getGroupuuid(), Group.class));
			model.put("plandate",TimeUtils.getDateString(a.getPlandate()));
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_shipu));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "/404";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getCookbookPlan";
	}
	

	/**
	 * 
	 * @param uuids
	 * @return
	 * 食材uuid$图片uuid$食材名字
	 */
	private List getCookbookList(String uuids) {
		List list=new ArrayList();
		if (StringUtils.isNotBlank(uuids)) {
			String[] uuid = uuids.split(",");
			for (String s : uuid) {
				Cookbook cb = (Cookbook) CommonsCache.get(s,Cookbook.class);
				list.add(cb);

			}
		}
		return list;

	}
	

	/**
	 * 获取幼儿园介绍
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getKDInfo", method = RequestMethod.GET)
	public String getKDInfo(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		Group a=null;
		try {
			a = (Group)nSimpleHibernateDao.getObject(Group.class,uuid);
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}

			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_Kindergarten_introduction));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "/404";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getKDInfo";
	}
	

	/**
	 * 获取幼儿园介绍
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getGroupContent", method = RequestMethod.GET)
	public String getGroupContent(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		Group a=null;
		try {
			a = (Group)nSimpleHibernateDao.getObject(Group.class,uuid);
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}

//			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_Kindergarten_introduction));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "/404";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getGroupContent";
	}

	/**
	 * 获取招生计划,只查询最新的一篇
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getRecruitBygroupuuid", method = RequestMethod.GET)
	public String getRecruit(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		Announcements a=null;
		try {
			String hql = "from Announcements where status=0 and  type= "+SystemConstants.common_type_zhaoshengjihua;
			if (StringUtils.isNotBlank(uuid)){
				hql += " and  groupuuid in("+DBUtil.stringsToWhereInValue(uuid)+")";
			}
			hql+=" order by create_time desc";
			List list= nSimpleHibernateDao.getHibernateTemplate().find(hql);
			if(list==null||list.size()==0){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}
			a=(Announcements)list.get(0);
			if(SystemConstants.Check_status_disable.equals(a.getStatus())){
					return "/404";
			}
			model.put("group",CommonsCache.get(a.getGroupuuid(), Group4Q.class));
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(a.getUuid(), SystemConstants.common_type_zhaoshengjihua));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "/404";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getRecruitBygroupuuid";
	}
	
	private static String _KDWebUrl=null;
	
	
	/**
	 * 获取老师web登录地址.
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getKDWebUrl", method = RequestMethod.GET)
	public String getWebUrl(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			
			if(_KDWebUrl==null){
					List list=this.nSimpleHibernateDao
							.getHibernateTemplate().find(
									"select description from BaseDataList where typeuuid='KDWebUrl' and datakey=1");
						String url="http://kd.wenjienet.com/px-rest/kd/index.html?v1";
						if(list!=null&&list.size()>0){
							_KDWebUrl=list.get(0)+"";
						}else{
							_KDWebUrl="http://kd.wenjienet.com/px-rest/kd/index.html?v1";
						}
			}
			
			model.put("url",_KDWebUrl);
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
	
	
	private static String _KDWebUrlIOS=null;
	
	private static String shareImgUrlIOS=null;
	/**
	 * 获取老师web登录地址. ios https 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getConfigOfIOS", method = RequestMethod.GET)
	public String getConfigOfIOS(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			 
			if(_KDWebUrlIOS==null){
					List list=this.nSimpleHibernateDao
							.getHibernateTemplate().find(
									"select description from BaseDataList where typeuuid='KDWebUrlIOS' and datakey=1");
					
						if(list!=null&&list.size()>0){
							_KDWebUrlIOS=list.get(0)+"";
						}else{
							_KDWebUrlIOS="https://www.wenjienet.com/px-rest/kd/index1.html?v1";
						}
			}
			
			
			if(shareImgUrlIOS==null){
				List list=this.nSimpleHibernateDao
						.getHibernateTemplate().find(
								"select description from BaseDataList where typeuuid='shareImgUrlIOS' and datakey=1");
					
					if(list!=null&&list.size()>0){
						shareImgUrlIOS=list.get(0)+"";
					}else{
						shareImgUrlIOS="https://www.wenjienet.com/px-rest/i/share_logo.png";
					}
		}
		
			model.put("url",_KDWebUrlIOS);
			model.put("shareImgUrl",shareImgUrlIOS);
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
	 * 获取培训发布课程流程
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getPxCourse", method = RequestMethod.GET)
	public String getPxCourse(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		PxCourse a=null;
		try {
			
			 a = (PxCourse) this.nSimpleHibernateDao.getObjectById(
					PxCourse.class, uuid);
		
			
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}
			
			
			if(SystemConstants.PxCourse_status_weifabu.equals(a.getStatus())){
				return "/404";
			}
			model.put("group",CommonsCache.get(a.getGroupuuid(), Group4Q.class));
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_pxcourse));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "/404";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getPxCourse";
	}
	

	/**
	 * 获取培训发布课程流程
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getPxCourseContent", method = RequestMethod.GET)
	public String getPxCourseContent(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		PxCourse a=null;
		try {
			
			 a = (PxCourse) this.nSimpleHibernateDao.getObjectById(
					PxCourse.class, uuid);
		
			
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}
			
			
//			if(SystemConstants.PxCourse_status_weifabu.equals(a.getStatus())){
//				return "/404";
//			}
//			model.put("group",CommonsCache.get(a.getGroupuuid(), Group4Q.class));
//			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_pxcourse));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "/404";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getPxCourse";
	}
	

	/**
	 * 获取表情列表(url)
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getHtmlTitle", method = RequestMethod.GET)
	public String getHtmlTitle(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String url=request.getParameter("url");
		try {

			String title=HttpRequestUtils.httpGetHtmlTitle(url);
			if(title==null)title="";
			title="[链接]"+title;
			model.addAttribute(RestConstants.Return_G_entity,title);
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
	 * 分享地址-获取话题内容
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getSnsTopic", method = RequestMethod.GET)
	public String getSnsTopic(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		try {
			
			String sql=" SELECT t1.uuid,t1.title,t1.create_time,t1.create_user,t1.yes_count,t1.no_count,t1.reply_count,t1.status,t1.content";
			sql+=" FROM sns_topic t1 ";
			sql+=" where  t1.uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			
			Session session=this.nSimpleHibernateDao.getSession();
			Query  query =session.createSQLQuery(sql);
			query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
			List<Map> list=query.list();
			if(list==null||list.size()==0){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Data_deleted);
				return "/404";
			}
			Map dbOjb=list.get(0);
			
			if(SystemConstants.Check_status_disable.toString().equals(dbOjb.get("status")+"")){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(ResponseMessageConstants.Check_status_disable);
				return "/404";
			}
			//修复分享话题,点击次数不准确bug.
			Long cacheCount=PxRedisCache.getIncrSnsTopicCountByExt_uuid(uuid);
			if(cacheCount==null||cacheCount<=1){
				try {
					Long tmp_count=Long.valueOf(dbOjb.get("click_count")+"");
					if(tmp_count==null)tmp_count=0l;
					cacheCount=tmp_count+1;
				} catch (Exception e) {
					//e.printStackTrace();
				}
				PxRedisCache.setSnsTopicByExt_uuid(uuid, cacheCount);
			}
			dbOjb.put("click_count", cacheCount);
			
			model.put("show_time", TimeUtils.getDateString((Date)dbOjb.get("create_time")));
			model.addAttribute(RestConstants.Return_G_entity,dbOjb);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "/404";
		}
	
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "/getSnsTopic";
	}
	
	@Autowired
	private KDPhotoItemService kDPhotoItemService;
	
		@RequestMapping("/getKDMovie")  
	    public void getKDMovie(ModelMap model, HttpServletRequest request,HttpServletResponse response,PaginationData pData) {  
	       try {  
	    	   model.clear();
	    	   ResponseMessage responseMessage = RestUtil
	   				.addResponseMessageForModelMap(model);
	    	   
	    	  // String jsonpCallback = request.getParameter("jsonpCallback");//客户端请求参数  
	    	   String movie_uuid = request.getParameter("kdmovie_uuid");//客户端请求参数  
		    	  
	    	   
	    	   KDMovie fPMovie= (KDMovie)this.nSimpleHibernateDao.getObject(KDMovie.class, movie_uuid);
	    	   if(fPMovie==null){
	    		   responseMessage.setMessage("动态相册不存在！");
	    		   HttpRequestUtils.responseJSONP(model, response, "getFPMovie");
	    		   return;
	    	   }
	    	   
	    	   
	    	   this.nSimpleHibernateDao.getHibernateTemplate().evict(fPMovie);
	    	   pData.setPageSize(1000);
	    	   PageQueryResult pageQueryResult=  kDPhotoItemService.queryForMoviePhoto_uuids(fPMovie.getPhoto_uuids(), pData, model);
	    	   fPMovie.setPhoto_uuids(null);
	    	   fPMovie.setHerald(FPPhotoUtil.imgUrlByUuid_sub(fPMovie.getHerald()));
	    	   model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
	    	   model.addAttribute(RestConstants.Return_G_entity,fPMovie);
	    	   
	    	   
	    	   responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
	    	 HttpRequestUtils.responseJSONP(model, response, "getFPMovie");
	      } catch (IOException e) {  
	       e.printStackTrace();  
	      }  
	    }  
}
