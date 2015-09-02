package com.company.news.service;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class CheckService extends AbstractServcice {
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
			 sql="update px_classnews set status=2  where uuid='"+uuid+"'";
			break;
		case SystemConstants.common_type_gonggao:
			 sql="update px_announcements set status=2  where uuid='"+uuid+"'";
			break;
		case SystemConstants.common_type_neibutongzhi:
			 sql="update px_announcements set status=2  where uuid='"+uuid+"'";
			break;
		case SystemConstants.common_type_jingpinwenzhang:
			 sql="update px_announcements set status=2  where uuid='"+uuid+"'";
			break;
		case SystemConstants.common_type_zhaoshengjihua:
			 sql="update px_announcements set status=2  where uuid='"+uuid+"'";
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
	 */
	public boolean updateDisable(Integer type, String uuid,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(uuid)) {
			responseMessage.setMessage("Newsuuid不能为空！");
			return false;
		}
		String sql=null;
		Integer status=SystemConstants.Check_status_disable;
		switch (type) {
		case SystemConstants.common_type_hudong:
			 sql="update px_classnews set status="+status+" where uuid='"+uuid+"'";
			break;
		case SystemConstants.common_type_gonggao:
			 sql="update px_announcements set status="+status+"  where uuid='"+uuid+"'";
			break;
		case SystemConstants.common_type_neibutongzhi:
			 sql="update px_announcements set status="+status+"   where uuid='"+uuid+"'";
			break;
		case SystemConstants.common_type_jingpinwenzhang:
			 sql="update px_announcements set status="+status+"  where uuid='"+uuid+"'";
			break;
		case SystemConstants.common_type_zhaoshengjihua:
			 sql="update px_announcements set status="+status+"  where uuid='"+uuid+"'";
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
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
