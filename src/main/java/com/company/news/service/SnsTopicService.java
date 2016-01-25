package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.ezmorph.bean.MorphDynaBean;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.cache.PxRedisCache;
import com.company.news.commons.util.HTMLUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.core.iservice.NewMsgNumberIservice;
import com.company.news.entity.SnsTopic;
import com.company.news.entity.SnsTopicVoteItem;
import com.company.news.entity.SnsTopicVoteItemOfUpdate;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.SnsTopicJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class SnsTopicService extends AbstractService {
	private static final String model_name = "基础数据类型模块";
	
	@Autowired
	private SnsDianzanService snsDianzanService;
	
	@Autowired
	private NewMsgNumberIservice newMsgNumberIservice;
	@Autowired
	private SnsTopicVoteItemService snsTopicVoteItemService;
	
	
	/**
	 * 验证基本form表单信息
	 * @param announcementsJsonform
	 * @param responseMessage
	 * @return
	 */
	public boolean valiateForm(SnsTopicJsonform jsonform,ResponseMessage responseMessage){
		if (this.validateRequireAndLengthByRegJsonform(jsonform.getTitle(), 128, "标题", responseMessage)) {
			return false;
		}
		if (this.validateRequireByRegJsonformObject(jsonform.getSection_id(), "话题板块", responseMessage)) {
			return false;
		}
		if (this.validateRequireByRegJsonform(jsonform.getContent(), "内容", responseMessage)) {
			return false;
		}
		return true;
	}
		
	/**
	 * 新增权限
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws Exception 
	 */
	public SnsTopic add(SnsTopicJsonform jsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
		if(user==null){
			return null;
		}
		
		if(!valiateForm(jsonform,responseMessage))return null;
		
		if(SystemConstants.SnsTopic_section_id_Vote.equals(jsonform.getSection_id())){
			if(jsonform.getItemList()==null||jsonform.getItemList().size()==0){
				responseMessage.setMessage("投票类型,投票条目必填.");
				return null;
			}
			List<MorphDynaBean> tmpList=jsonform.getItemList();
			for(MorphDynaBean  m:tmpList){
				if(StringUtils.isBlank((String)m.get("title"))){
					responseMessage.setMessage("投票内容不能为空！");
					return null;
				}
				
			}
		}
		
		SnsTopic newEntity = new SnsTopic();
		BeanUtils.copyProperties(newEntity, jsonform);
		String[] strings=HTMLUtils.getSummaryAndImgByHTML(newEntity.getContent());
		newEntity.setSummary(strings[0]);
		newEntity.setImguuids(strings[1]);
		
		newEntity.setCreate_time(TimeUtils.getCurrentTimestamp());
		newEntity.setCreate_useruuid(user.getUuid());
		newEntity.setCreate_user(user.getName());
		newEntity.setCreate_img(user.getImg());
		
		
		
		newEntity.setReply_count(0L);
		newEntity.setYes_count(0L);
		newEntity.setNo_count(0L);
		newEntity.setStatus(0);
		newEntity.setLevel(0);
		newEntity.setIllegal(0l);
		newEntity.setClick_count(0l);
		this.nSimpleHibernateDao.getHibernateTemplate().save(newEntity);
		
		if(SystemConstants.SnsTopic_section_id_Vote.equals(newEntity.getSection_id())){
			snsTopicVoteItemService.update_SnsTopicVoteItem(newEntity.getUuid(), jsonform.getItemList());
		}
		
		
		newMsgNumberIservice.today_snsTopic_incrCountOfNewMsgNumber();
		
		PxRedisCache.setSnsTopicByExt_uuid(newEntity.getUuid(), 1l);
		return newEntity;

	}
	
	
	public SnsTopic update(SnsTopicJsonform jsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		
		SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
		if(user==null){
			return null;
		}
		
		if(!valiateForm(jsonform,responseMessage))return null;


		if(SystemConstants.SnsTopic_section_id_Vote.equals(jsonform.getSection_id())){
			if(jsonform.getItemList()==null||jsonform.getItemList().size()==0){
				responseMessage.setMessage("投票类型,投票条目必填.");
				return null;
			}
		}
		SnsTopic newEntity = (SnsTopic) this.nSimpleHibernateDao
				.getObjectById(SnsTopic.class,
						jsonform.getUuid());
		
		if(!user.getUuid().equals(newEntity.getCreate_useruuid())){
			responseMessage.setMessage("不是作者不能修改.");
			return null;
		}
		
		BeanUtils.copyProperties(newEntity, jsonform);
		String[] strings=HTMLUtils.getSummaryAndImgByHTML(newEntity.getContent());
		newEntity.setSummary(strings[0]);
		newEntity.setImguuids(strings[1]);
		this.nSimpleHibernateDao.getHibernateTemplate().save(newEntity);
		
		if(SystemConstants.SnsTopic_section_id_Vote.equals(newEntity.getSection_id())){
			snsTopicVoteItemService.update_SnsTopicVoteItem(newEntity.getUuid(), jsonform.getItemList());
		}
		
		return newEntity;
	}
	
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return SnsTopicService.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}
	public List list() {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		//description ios 的关键词,不使用.
		String sql=" SELECT id ,title,img,topic_count";
		sql+=" from sns_section  order by ind asc ";
		
		Query q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> list= q.list();
		
		String share_url_course_type=ProjectProperties.getProperty("share_url_sns_section_img", "http://img.wenjienet.com/i/sns_section_img/");
		for(Map o:list){
			//o.getDescription()=laugh.gif
			o.put("img", share_url_course_type+o.get("img"));
		}
		
		return list;
	}
	
	private PageQueryResult listPageBySql(String sqlwhere,PaginationData pData,
			HttpServletRequest request) {
		String selectSql=" SELECT t1.uuid,t1.title,t1.create_time,t1.create_useruuid,t1.create_user,t1.create_img,t1.reply_count,t1.yes_count,t1.status,t1.no_count,t1.level,t1.summary,t1.imguuids,t1.click_count ";
		selectSql+=" FROM sns_topic t1 ";
		String sql=selectSql+sqlwhere;
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();

		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		this.warpMapList(pageQueryResult.getData(), null);
		return pageQueryResult;
	}
	/**
	 * 最新话题
	 * @param pData
	 * @param section_id
	 * @param request
	 * @return
	 */
	public PageQueryResult listPage(PaginationData pData,String section_id,
			HttpServletRequest request) {

		String sqlwhere=" where t1.status= "+SystemConstants.Check_status_fabu;
		if(StringUtils.isNotBlank(section_id)){
			sqlwhere+=" and t1.section_id= "+section_id;
		}
		sqlwhere += " order by t1.create_time desc";
		return listPageBySql(sqlwhere, pData, request);
	}
	
	/**
	 * 最新话题,用于审查,根据举报时间排序
	 * @param pData
	 * @param section_id
	 * @param request
	 * @return
	 */
	public PageQueryResult listPageForCheck(PaginationData pData,String section_id,
			HttpServletRequest request) {

		String sqlwhere=" where t1.status= "+SystemConstants.Check_status_fabu ;
		sqlwhere+=" and t1.illegal>0 ";
		if(StringUtils.isNotBlank(section_id)){
			sqlwhere+=" and t1.section_id= "+section_id;
		}
		sqlwhere += " order by t1.illegal_time desc";
		
		
		
		
		String selectSql=" SELECT t1.uuid,t1.title,t1.create_time,t1.create_useruuid,t1.create_user,t1.create_img,t1.reply_count,t1.yes_count,t1.status,t1.no_count,t1.level,t1.summary,t1.imguuids,t1.illegal_time,t1.illegal,t1.click_count ";
		selectSql+=" FROM sns_topic t1 ";
		String sql=selectSql+sqlwhere;
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();

		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		this.warpMapList(pageQueryResult.getData(), null);
		return pageQueryResult;

	}
	/**
	 * 最新话题,平台查询,查询所有状态,包括屏蔽的.
	 * @param pData
	 * @param section_id
	 * @param request
	 * @return
	 */
	public PageQueryResult listPageByWjkj(PaginationData pData,String section_id,
			HttpServletRequest request) {

		String sqlwhere="  order by t1.create_time desc ";
//		if(StringUtils.isNotBlank(section_id)){
//			sqlwhere+=" and t1.section_id= "+section_id;
//		}
//		sqlwhere += " order by t1.create_time desc";
		return listPageBySql(sqlwhere, pData, request);
	}
	/**
	 * 精华话题
	 * @param pData
	 * @param section_id
	 * @param request
	 * @return
	 */
	public PageQueryResult topListPage(PaginationData pData,String section_id,
			HttpServletRequest request) {

		String sqlwhere=" where t1.status=0 and t1.level=9 ";
		if(StringUtils.isNotBlank(section_id)){
			sqlwhere+=" and t1.section_id= "+section_id;
		}
		sqlwhere += " order by t1.create_time desc";
		return listPageBySql(sqlwhere, pData, request);
	}
	
	/**
	 * 最新话题
	 * @param pData
	 * @param section_id
	 * @param request
	 * @return
	 */
	public PageQueryResult hotlistPage(PaginationData pData,String section_id,
			HttpServletRequest request) {

		String sqlwhere=" where t1.status=0 ";
		if(StringUtils.isNotBlank(section_id)){
			sqlwhere+=" and t1.section_id= "+section_id;
		}
		sqlwhere += " order by t1.reply_count desc";
		return listPageBySql(sqlwhere, pData, request);
	}

	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List warpMapList(List<Map> list,SessionUserInfoInterface user ) {
		
		for(Map o:list){
			warpMap(o);
		}
		
		return list;
	}
	private void warpMap(Map o) {
		o.put("imgList", PxStringUtil.uuids_to_imgSmallUrlurlList((String)o.get("imguuids")));
		o.put("create_img", PxStringUtil.imgSmallUrlByUuid((String)o.get("create_img")));
		
	}
	public boolean updateDianzan(SessionUserInfoInterface user,String uuid,
			Integer snsdianzanStatusYes,ResponseMessage responseMessage) {
			
			String sql=null;
			if(SystemConstants.SnsDianzan_status_yes.equals(snsdianzanStatusYes)){
				sql="update sns_topic set yes_count=yes_count+1 where uuid='"+uuid+"'";
			}else{
				sql="update sns_topic set no_count=no_count+1 where uuid='"+uuid+"'";
			}
			Integer rel=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
			if(rel==0){
				responseMessage.setMessage("未找到对应数据");
				return false;
			}
			
			return snsDianzanService.updateDianzan(uuid, user.getUuid(), snsdianzanStatusYes, responseMessage);
	}
	/**
	 * 取消点赞
	 * @param user
	 * @param uuid
	 * @param responseMessage
	 * @return
	 */
	public boolean cancelDianzan(SessionUserInfoInterface user, String uuid,
			ResponseMessage responseMessage) {
		Integer status=snsDianzanService.cancelDianzan(uuid, user.getUuid(),responseMessage);
		if(status==null){
			responseMessage.setMessage("未找到对应数据");
			return false;
		}
		String sql=null;
		if(SystemConstants.SnsDianzan_status_yes.equals(status)){
			sql="update sns_topic set yes_count=yes_count-1 where uuid='"+uuid+"'";
		}else{
			sql="update sns_topic set no_count=no_count-1 where uuid='"+uuid+"'";
		}
		Integer rel=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
		if(rel==0){
			responseMessage.setMessage("未找到对应数据");
			return false;
		}
		return true;
	}
		public SnsTopic get(String uuid) {
				SnsTopic announcements = (SnsTopic) this.nSimpleHibernateDao
						.getObjectById(SnsTopic.class, uuid);		
				return announcements;
		
			}
		public boolean delete(String uuid, ResponseMessage responseMessage,HttpServletRequest request) {
			if (StringUtils.isBlank(uuid)) {
				responseMessage.setMessage("ID不能为空！");
				return false;
			}
			
			SnsTopic newEntity = (SnsTopic) this.nSimpleHibernateDao
					.getObjectById(SnsTopic.class,
							uuid);
			SessionUserInfoInterface user = SessionListener.getUserInfoBySession(request);
			if(!user.getUuid().equals(newEntity.getCreate_useruuid())){
				responseMessage.setMessage(RightConstants.Return_msg);
				return false;
			}
			this.nSimpleHibernateDao.deleteObjectById(SnsTopic.class, uuid);

			return true;
		}
		public boolean updateLevel(SessionUserInfoInterface user,String uuid,
				String level,ResponseMessage responseMessage) {
				
			
			String sql="update sns_topic set level="+level+" where uuid='"+uuid+"'";
				Integer rel=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
				if(rel==0){
					responseMessage.setMessage("未找到对应数据");
					return false;
				}
				
				return true;
		}
		
		
		
		/**
		 * 设置发现,每日话题推荐1条.
		 * @return
		 */
		public boolean setMainTopicToRedis(String uuid,ResponseMessage responseMessage) {
			
			
			String sql=" SELECT t1.uuid,t1.title   FROM sns_topic t1  where t1.uuid='"+uuid+"'";
			List<Map> list=this.nSimpleHibernateDao.queryListMapBySql(sql);
			if(list!=null&&list.size()>0){
				Map map=list.get(0);
				return PxRedisCache.setObject(PxRedisCache.Key_Name_MainTopic, map);
			}
			return false;
			
		}

		/**
		 * 获取发现,每日话题推荐1条.
		 * @return
		 */
		public Map getMainTopic(ResponseMessage responseMessage) {
			
			
			//缓存有值优先处理
			Map  obj=PxRedisCache.getObject(PxRedisCache.Key_Name_MainTopic,Map.class);
			if(obj!=null){
				return obj;
			}
			
			return null;
		}

}
