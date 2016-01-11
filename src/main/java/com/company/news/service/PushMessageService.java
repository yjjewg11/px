package com.company.news.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.PushMessage;
import com.company.news.jsonform.PushMessageJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class PushMessageService extends AbstractService {
	private static final String model_name = "消息推动模块";
	public static final int announcements_isread_yes = 1;// 已读
	public static final int announcements_isread_no = 0;// 未读
	public static final int announcements_isdelete_yes = 1;// 已读
	public static final int announcements_isdelete_no = 0;// 未读

	

	/**
	 * 根据日期查询是否有新消息.
	 * 每次登录是,createdate传入null.点击过消息页面.后时间传入点击时的时间点.
	 * 
	 * @return
	 */
	public Long queryMsgCount(String type, String useruuid,Date createDate) {

		String hql = "select count(*) from PushMessage where revice_useruuid='" + DbUtils.safeToWhereString(useruuid) + "'";
		if (StringUtils.isNotBlank(type))
			hql += " and type=" + type;
		List list=null;
		if(createDate!=null){
			hql += " and create_time>?";
		 list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql, createDate);
		}else{
			 list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql );
				
		}
		if(list==null)return Long.valueOf(0);
		return Long.valueOf(list.get(0).toString());
	}
	
	/**
	 * 查询所有通知
	 * 
	 * @return
	 */
	public PageQueryResult query(String type, String useruuid,PaginationData pData) {

		String hql = "from PushMessage where revice_useruuid='" + DbUtils.safeToWhereString(useruuid) + "'";
		if (StringUtils.isNotBlank(type))
			hql += " and type=" + type;
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHqlNoTotal(hql, pData);
		return pageQueryResult;
	}

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean delete(String uuid, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}
//
//		if (uuid.indexOf(",") != -1)// 多ID
//		{
//			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
//					"update PushMessage set isdelete=? where uuid in(?)",
//					announcements_isdelete_yes, uuid);
//		} else {
//			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
//					"update PushMessage set isdelete=? where uuid =?",
//					announcements_isdelete_yes, uuid);
//		}

		return true;
	}

	/**
	 * 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public PushMessage get(String uuid) throws Exception {
		PushMessage message = (PushMessage) this.nSimpleHibernateDao.getObjectById(
				PushMessage.class, uuid);

		return message;
	}

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean read(String uuid, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}

		if (uuid.indexOf(",") != -1)// 多ID
		{
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"update PushMessage set isread=? where uuid in(?)",
					announcements_isread_yes, uuid);
		} else {
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"update PushMessage set isread=? where uuid =?",
					announcements_isread_yes, uuid);
		}

		return true;
	}
	
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}
	@Autowired
	public PushMsgIservice pushMsgIservice;
	
	public boolean updateIOSParentVersion(
			PushMessageJsonform pushMessageJsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		
		String hql = "select distinct user_uuid from PushMsgDevice where  device_type='ios'";
			hql += " and type="+SystemConstants.PushMsgDevice_type_0;
			
			List<String> list= (List<String>)this.nSimpleHibernateDao.getHibernateTemplate().find(hql);
		  for(String o:list){
			  PushMessage pushMessage=new PushMessage();
			  pushMessage.setGroup_uuid(null);
			  pushMessage.setRevice_useruuid(o);
			  pushMessage.setType(SystemConstants.common_type_html);
			  pushMessage.setRel_uuid(pushMessageJsonform.getRel_uuid());
			  pushMessage.setTitle(pushMessageJsonform.getTitle());
			  pushMessage.setMessage(pushMessageJsonform.getMessage());
			  pushMessage.setUrl(pushMessageJsonform.getUrl());
			  pushMessage.setCreate_time(TimeUtils.getCurrentTimestamp());
			  pushMessage.setIsread(0);
			  this.nSimpleHibernateDao.save(pushMessage);
		  }
		  
		  pushMsgIservice.pushMsg_to_all_ios_parent_app(pushMessageJsonform.getTitle(), pushMessageJsonform.getMessage());
		
		
		return true;
	}
	
	

	public boolean updateIOSTeacherVersion(
			PushMessageJsonform pushMessageJsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		
		String hql = "select distinct user_uuid from PushMsgDevice where  device_type='ios'";
			hql += " and type="+SystemConstants.PushMsgDevice_type_1;
			
			List<String> list= (List<String>)this.nSimpleHibernateDao.getHibernateTemplate().find(hql);
		  for(String o:list){
			  PushMessage pushMessage=new PushMessage();
			  pushMessage.setGroup_uuid(null);
			  pushMessage.setRevice_useruuid(o);
			  pushMessage.setType(SystemConstants.common_type_html);
			  pushMessage.setRel_uuid(pushMessageJsonform.getRel_uuid());
			  pushMessage.setTitle(pushMessageJsonform.getTitle());
			  pushMessage.setMessage(pushMessageJsonform.getMessage());
			  pushMessage.setUrl(pushMessageJsonform.getUrl());
			  pushMessage.setCreate_time(TimeUtils.getCurrentTimestamp());
			  pushMessage.setIsread(0);
			  this.nSimpleHibernateDao.save(pushMessage);
		  }
		  
		  pushMsgIservice.pushMsg_to_all_ios_teacher_app(pushMessageJsonform.getTitle(), pushMessageJsonform.getMessage());
		
		
		return true;
	}
}
