package com.company.news.service;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.entity.Announcements4Q;
import com.company.news.entity.ClassNews;
import com.company.news.entity.ClassNewsReply;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class CheckService extends AbstractService {
	private static final String model_name = "check模块";

	/**
	 * 更新举报计数
	 * @param type
	 * @param uuid
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public boolean updateIllegal(Integer type,String uuid,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(uuid)) {
			responseMessage.setMessage("Newsuuid不能为空！");
			return false;
		}
		
		String sql=null;
		
		switch (type) {
		case SystemConstants.common_type_hudong:
			 sql="update px_classnews set illegal=illegal+1,illegal_time=now()  where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			break;
		case SystemConstants.common_type_gonggao:
			 sql="update px_announcements set illegal=illegal+1 ,illegal_time=now() where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			break;
		case SystemConstants.common_type_neibutongzhi:
			 sql="update px_announcements set illegal=illegal+1 ,illegal_time=now() where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			break;
		case SystemConstants.common_type_jingpinwenzhang:
			 sql="update px_announcements set illegal=illegal+1,illegal_time=now()  where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			break;
		case SystemConstants.common_type_zhaoshengjihua:
			 sql="update px_announcements set illegal=illegal+1 ,illegal_time=now() where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			break;
			
		case SystemConstants.common_type_SnsTopic:
			 sql="update sns_topic set illegal=illegal+1 ,illegal_time=now() where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			break;
			
		case SystemConstants.common_type_SnsReply:
			 sql="update sns_reply set illegal=illegal+1 ,illegal_time=now() where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			break;
		default:
			break;
		}
		
		if(sql==null)return false;
		
		Integer rel=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
		if(rel==0){
			responseMessage.setMessage("为找到对应数据");
			return false;
		}
		return true;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 禁用该文章发布
	 * @param type
	 * @param uuid
	 * @param responseMessage
	 * @return
	 * @throws Exception 
	 */
	public boolean updateDisable(Integer type, String uuid,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		if (StringUtils.isBlank(uuid)) {
			responseMessage.setMessage("Newsuuid不能为空！");
			return false;
		}
		responseMessage.setMessage("为找到对应数据");
		 String desc=null;
		 Announcements4Q announcements4Q=null;
		switch (type) {
		case SystemConstants.common_type_hudong:
			 ClassNews classNews=(ClassNews)this.nSimpleHibernateDao.getObjectById(ClassNews.class, uuid);
			 if(classNews==null){
				 return false;
			 }
			 classNews.setStatus(SystemConstants.Check_status_disable);
			 this.nSimpleHibernateDao.save(classNews);
			  desc="uuid="+uuid+"|context="+classNews.getContent();
				this.addLog("check.updateDisable.ClassNews","屏蔽互动", desc, request);
			break;
		case SystemConstants.common_type_gonggao:
			  announcements4Q=(Announcements4Q)this.nSimpleHibernateDao.getObjectById(Announcements4Q.class, uuid);
			 if(announcements4Q==null){
				 return false;
			 }
			 announcements4Q.setStatus(SystemConstants.Check_status_disable);
			 this.nSimpleHibernateDao.save(announcements4Q);
			  desc="uuid="+uuid+"|context="+announcements4Q.getTitle();
				this.addLog("check.updateDisable.Announcements4Q","屏蔽公告", desc, request);
			break;
		case SystemConstants.common_type_neibutongzhi:
			  announcements4Q=(Announcements4Q)this.nSimpleHibernateDao.getObjectById(Announcements4Q.class, uuid);
			 if(announcements4Q==null){
				 return false;
			 }
			 announcements4Q.setStatus(SystemConstants.Check_status_disable);
			 this.nSimpleHibernateDao.save(announcements4Q);
			  desc="uuid="+uuid+"|context="+announcements4Q.getTitle();
				this.addLog("check.updateDisable.Announcements4Q","屏蔽公告", desc, request);
			break;
		case SystemConstants.common_type_jingpinwenzhang:
			  announcements4Q=(Announcements4Q)this.nSimpleHibernateDao.getObjectById(Announcements4Q.class, uuid);
			 if(announcements4Q==null){
				 return false;
			 }
			 announcements4Q.setStatus(SystemConstants.Check_status_disable);
			 this.nSimpleHibernateDao.save(announcements4Q);
			  desc="uuid="+uuid+"|context="+announcements4Q.getTitle();
				this.addLog("check.updateDisable.Announcements4Q","屏蔽精品文章", desc, request);
			break;
		case SystemConstants.common_type_zhaoshengjihua:
			  announcements4Q=(Announcements4Q)this.nSimpleHibernateDao.getObjectById(Announcements4Q.class, uuid);
			 if(announcements4Q==null){
				 return false;
			 }
			 announcements4Q.setStatus(SystemConstants.Check_status_disable);
			 this.nSimpleHibernateDao.save(announcements4Q);
			  desc="uuid="+uuid+"|context="+announcements4Q.getTitle();
				this.addLog("check.updateDisable.Announcements4Q","屏蔽招生计划", desc, request);
			break;
		case SystemConstants.common_type_reply:
			ClassNewsReply classNewsReply=(ClassNewsReply)this.nSimpleHibernateDao.getObjectById(ClassNewsReply.class, uuid);
			 if(classNewsReply==null){
				 return false;
			 }
			 classNewsReply.setStatus(SystemConstants.Check_status_disable);
			 this.nSimpleHibernateDao.save(classNewsReply);
			  desc="uuid="+uuid+"|context="+classNewsReply.getContent();
				this.addLog("check.updateDisable.Announcements4Q","屏蔽评论", desc, request);
			break;
		default:
			break;
			
		}	
		responseMessage.setMessage("屏蔽成功");
		return true;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
