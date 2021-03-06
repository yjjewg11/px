package com.company.news.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.cache.UserCache;
import com.company.news.cache.redis.UserRedisCache;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.Message;
import com.company.news.entity.User;
import com.company.news.jsonform.MessageJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class MessageService extends AbstractService {
	private static final String model_name = "消息模块";
	public static final int announcements_isread_yes = 1;// 已读
	public static final int announcements_isread_no = 0;// 未读
	public static final int announcements_isdelete_yes = 1;// 已读
	public static final int announcements_isdelete_no = 0;// 未读
	@Autowired
	public PushMsgIservice pushMsgIservice;
	/**
	 * 增加
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(MessageJsonform messageJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(messageJsonform.getMessage())) {
			responseMessage.setMessage("内容不能为空!");
			return false;
		}

		if (StringUtils.isBlank(messageJsonform.getRevice_useruuid())) {
			responseMessage.setMessage("Revice_useruuid不能为空！");
			return false;
		}

//		Parent user = (Parent) CommonsCache.get(messageJsonform.getRevice_useruuid(),Parent.class);
		UserCache user=UserRedisCache.getUserCache(messageJsonform.getRevice_useruuid());
		
		if (user == null) {
			responseMessage.setMessage("user 不存在！");
			return false;
		}
		
		Message message = new Message();

		BeanUtils.copyProperties(message, messageJsonform);
		if(SystemConstants.Group_uuid_wjd.equals(messageJsonform.getSend_useruuid())){
			messageJsonform.setSend_user("问界科技");
		}
		
		message.setRevice_user(user.getN());
		message.setCreate_time(TimeUtils.getCurrentTimestamp());
		message.setIsread(announcements_isread_no);
		message.setIsdelete(announcements_isdelete_no);
		message.setSend_userimg(user.getI());
		
		
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(message);
		String msg_title=message.getSend_user()+"说:"+message.getMessage();
		if(SystemConstants.Message_type_1.equals(message.getType())){
			pushMsgIservice.pushMsg_to_parent(SystemConstants.common_type_messageTeaher, message.getSend_useruuid(), message.getRevice_useruuid(), msg_title);
		}else{
			pushMsgIservice.pushMsg_to_parent(SystemConstants.common_type_messageKD, message.getSend_useruuid(),  message.getRevice_useruuid(),msg_title);
			
		}
		
		return true;
	}
	
	static final String  SelectSql=" SELECT t1.uuid,t1.create_time,t1.send_useruuid,t1.title,t1.type,t1.isread,t1.message,t1.group_uuid,t1.revice_useruuid,t1.revice_user,t1.send_user,t1.send_userimg ";
	/**
	 * 查询所有通知
	 * 
	 * @return
	 */
	public PageQueryResult query(String type, String useruuid,PaginationData pData) {

		String hql = SelectSql+" from px_message t1 where isdelete=" + announcements_isdelete_no;
		if (StringUtils.isNotBlank(type))
			hql += " and type=" + type;
		if (StringUtils.isNotBlank(useruuid))
			hql += " and revice_useruuid='" +useruuid + "'";
		hql += " order by create_time desc" ;
		
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findMapByPageForSqlNoTotal(hql, pData);
		warpMapList(pageQueryResult.getData());
		return pageQueryResult;
	}
	/**
	 * 查询我(家长)和老师所有信件
	 * 
	 * @return
	 */
	public PageQueryResult queryMessageByTeacher(String useruuid,String parentuuid,PaginationData pData) {
		
		
		String hql = SelectSql+" from px_message t1 where isdelete=" + announcements_isdelete_no;
			hql += " and type=1" ;
			hql += " and (" ;
				hql += "  (revice_useruuid='" + useruuid + "' and send_useruuid='" + parentuuid + "')";//家长发给我的.
				hql += " or (send_useruuid='" + useruuid + "' and revice_useruuid='" + parentuuid + "')";//我发给家长的.
			hql += "  )" ;
			hql += " order by create_time desc" ;
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findMapByPageForSqlNoTotal(hql, pData);
		
		warpMapList(pageQueryResult.getData());
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

		if (uuid.indexOf(",") != -1)// 多ID
		{
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"update Message set isdelete=? where uuid in(?)",
					announcements_isdelete_yes, uuid);
		} else {
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"update Message set isdelete=? where uuid =?",
					announcements_isdelete_yes, uuid);
		}

		return true;
	}

	/**
	 * 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public Message get(String uuid) throws Exception {
		Message message = (Message) this.nSimpleHibernateDao.getObjectById(
				Message.class, uuid);
		warpVo(message);
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
					"update Message set isread=? where uuid in(?)",
					announcements_isread_yes, uuid);
		} else {
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"update Message set isread=? where uuid =?",
					announcements_isread_yes, uuid);
		}

		return true;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}
	public PageQueryResult queryByParentAndLeader(String group_uuid,
			String parent_uuid, PaginationData pData) {
		String hql = SelectSql+" from px_message t1 where isdelete=" + announcements_isdelete_no;
		hql += " and type=2" ;
		hql += " and (" ;
			hql += "  (revice_useruuid='" + group_uuid + "' and send_useruuid='" + parent_uuid + "')";//家长发给我的.
			hql += " or (send_useruuid='" + group_uuid + "' and revice_useruuid='" + parent_uuid + "')";//我发给家长的.
		hql += "  )" ;
		hql += " order by create_time desc" ;
	PageQueryResult pageQueryResult = this.nSimpleHibernateDao
			.findMapByPageForSqlNoTotal(hql, pData);
	this.warpMapList(pageQueryResult.getData());
	return pageQueryResult;
	}
	
	
	/**
	 * 获取家长写信给幼儿园的统计数据.
	 * @param group_uuid
	 * @param parent_uuid
	 * @param pData
	 * @return
	 */
	public List queryCountMsgByParents(String useruuid,
			 PaginationData pData) {
		String sql="select revice_useruuid,send_useruuid,revice_user,send_user,send_userimg,count(revice_useruuid) as count,max(create_time) as last_time from px_message where type= "+SystemConstants.Message_type_1;
		sql += " and (" ;
		sql += "  revice_useruuid ='" +useruuid + "'";//家长发给我的.
		sql += "  )" ;
		sql+="GROUP BY revice_useruuid,send_useruuid";
		sql += " order by last_time desc";
		
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		Query  query =session.createSQLQuery(sql);
		
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		
		List<Map> list=query.list();
		UserRedisCache.warpListMapByUserCache(list, "send_useruuid", "send_user", null);
		UserRedisCache.warpListMapByUserCache(list, "revice_useruuid", "revice_user", null);
		
		
//		List relList=new ArrayList();
//		for(Object[] o:list){
//			GourpLeaderMsgVO vo=new GourpLeaderMsgVO();
//			vo.setRevice_useruuid(o[0]+"");
//			vo.setRevice_user(o[1]+"");
//			vo.setSend_useruuid(o[2]+"");
//			vo.setSend_user(o[3]+"");
//			vo.setCount(o[4]+"");
//			vo.setLast_time(TimeUtils.getDateTimeString((Date)o[5]));
//			relList.add(vo);
//		}
		
		
	return list;
	}
	
	/**
	 * 获取家长写信给幼儿园的统计数据.
	 * @param group_uuid
	 * @param parent_uuid
	 * @param pData
	 * @return
	 */
	public PageQueryResult queryCountLeaderMsgByParents(String group_uuids,
			 PaginationData pData) {
		String sql="select revice_useruuid,send_useruuid,revice_user,send_user,send_userimg,count(revice_useruuid) as count,max(create_time) as last_time from px_message where type="+SystemConstants.Message_type_2;
		sql += " and (" ;
		sql += "  revice_useruuid in(" + DBUtil.stringsToWhereInValue(group_uuids) + ")";//家长发给我的.
//		sql += " or send_useruuid in (" + DBUtil.stringsToWhereInValue(group_uuids) + " )";//我发给家长的.
		sql += "  )" ;
		sql+="GROUP BY revice_useruuid,send_useruuid";
		sql += " order by last_time desc";
//		List<Object[]> list=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession().createSQLQuery(sql).list();
//		List relList=new ArrayList();
//		for(Object[] o:list){
//			GourpLeaderMsgVO vo=new GourpLeaderMsgVO();
//			vo.setRevice_useruuid(o[0]+"");
//			vo.setRevice_user(o[1]+"");
//			vo.setSend_useruuid(o[2]+"");
//			vo.setSend_user(o[3]+"");
//			vo.setCount(o[4]+"");
//			vo.setLast_time(TimeUtils.getDateTimeString((Date)o[5]));
//			relList.add(vo);
//		}
//		
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		Query  query =session.createSQLQuery(sql);
		
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		warpMapList(pageQueryResult.getData());
		return pageQueryResult;
	}
	
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public Map warpVo(Map o){
		
		o.put("send_userimg",(PxStringUtil.imgSmallUrlByUuid((String)o.get("send_userimg"))));
		o.put("message",(MyUbbUtils.myUbbTohtml((String)o.get("message"))));
		return o;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public List<Map> warpMapList(List<Map> list){
		if(list.size()>0){
			Map o=list.get(0);
			if(SystemConstants.Message_type_1.toString().equals(o.get("type")+"")){
				UserRedisCache.warpListMapByUserCache(list, "send_useruuid", "send_user", "send_userimg");
				UserRedisCache.warpListMapByUserCache(list, "revice_useruuid", "revice_user", null);
			}
		}
		
		
		for(Map o:list){
			warpVo(o);
		}
		return list;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public Message warpVo(Message o){
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		o.setSend_userimg(PxStringUtil.imgSmallUrlByUuid(o.getSend_userimg()));
		o.setMessage(MyUbbUtils.myUbbTohtml(o.getMessage()));
		return o;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public List<Message> warpVoList(List<Message> list){
		for(Message o:list){
			warpVo(o);
		}
		return list;
	}
	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
