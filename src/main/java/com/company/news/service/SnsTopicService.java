package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.entity.SnsTopic;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.SnsTopicJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.TimeUtils;
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
	/**
	 * 新增权限
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public SnsTopic add(SnsTopicJsonform jsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws IllegalAccessException, InvocationTargetException {
		if (this.validateRequireAndLengthByRegJsonform(jsonform.getTitle(), 32, "标题", responseMessage)) {
			return null;
		}
		if (this.validateRequireByRegJsonformObject(jsonform.getSection_id(), "话题板块", responseMessage)) {
			return null;
		}
		if (this.validateRequireByRegJsonform(jsonform.getContent(), "内容", responseMessage)) {
			return null;
		}
		SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
		if(user==null){
			return null;
		}
		SnsTopic newEntity = new SnsTopic();
		BeanUtils.copyProperties(newEntity, jsonform);
		newEntity.setCreate_time(TimeUtils.getCurrentTimestamp());
		newEntity.setCreate_useruuid(user.getUuid());
		newEntity.setReply_count(0L);
		newEntity.setYes_count(0L);
		newEntity.setNo_count(0L);
		newEntity.setStatus(0);
		newEntity.setLevel(0);
		newEntity.setIllegal(0l);
		this.nSimpleHibernateDao.getHibernateTemplate().save(newEntity);
		return newEntity;

	}
	public SnsTopic update(SnsTopicJsonform jsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws IllegalAccessException, InvocationTargetException {
		if (this.validateRequireAndLengthByRegJsonform(jsonform.getTitle(), 32, "标题", responseMessage)) {
			return null;
		}
		if (this.validateRequireByRegJsonformObject(jsonform.getSection_id(), "话题板块", responseMessage)) {
			return null;
		}
		if (this.validateRequireByRegJsonform(jsonform.getContent(), "内容", responseMessage)) {
			return null;
		}

		SnsTopic newEntity = (SnsTopic) this.nSimpleHibernateDao
				.getObjectById(SnsTopic.class,
						jsonform.getUuid());
		
		
		BeanUtils.copyProperties(newEntity, jsonform);

		this.nSimpleHibernateDao.getHibernateTemplate().save(newEntity);
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
	public PageQueryResult listPage(PaginationData pData,String section_id,
			HttpServletRequest request) {

		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.title,t1.create_time,t1.create_useruuid,t1.reply_count,t1.yes_count,t1.status,t1.no_count,t1.level";
		sql+=" FROM sns_topic t1 ";
		sql+=" where t1.status=0 ";
		if(StringUtils.isNotBlank(section_id)){
			sql+=" and t1.section_id= "+section_id;
		}
		sql += " order by t1.create_time desc";

		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		
		
		
		
		return pageQueryResult;
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
		public boolean delete(String uuid, ResponseMessage responseMessage) {
			if (StringUtils.isBlank(uuid)) {

				responseMessage.setMessage("ID不能为空！");
				return false;
			}

			if (uuid.indexOf(",") != -1) // 多ID
			{
				this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate("delete from SnsTopic where uuid in(?)",
						uuid);
			} else {
				this.nSimpleHibernateDao.deleteObjectById(SnsTopic.class, uuid);
			}

			return true;
		}
	

}
