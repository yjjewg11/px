package com.company.news.service;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.ClassNews;
import com.company.news.entity.SnsReply;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.SnsReplyJsonform;
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
public class SnsReplyService extends AbstractService {
	private static final String model_name = "回复模块";
	public static final int USER_type_default = 0;// 0:老师
	@Autowired
	public PushMsgIservice pushMsgIservice;
	
	@Autowired
	private SnsDianzanService snsDianzanService;
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(SessionUserInfoInterface user, SnsReplyJsonform snsReplyJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(snsReplyJsonform.getContent())) {
			responseMessage.setMessage("content不能为空！");
			return false;
		}

		if (StringUtils.isBlank(snsReplyJsonform.getTopic_uuid())) {
			responseMessage.setMessage("话题uuid不能为空！");
			return false;
		}

		if (StringUtils.isBlank(snsReplyJsonform.getReply_uuid())) {
			snsReplyJsonform.setReply_uuid(SystemConstants.DB_String_unrelated_Value);
		}

		SnsReply cn = new SnsReply();
		BeanUtils.copyProperties(cn, snsReplyJsonform);

		
		cn.setCreate_time(TimeUtils.getCurrentTimestamp());
		cn.setCreate_useruuid(user.getUuid());
		cn.setReply_count(0L);
		cn.setYes_count(0L);
		cn.setNo_count(0L);
		cn.setStatus(0);
		cn.setIllegal(0l);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(cn);
		
		
		String sql=null;
		if(SystemConstants.DB_String_unrelated_Value.equals(snsReplyJsonform.getReply_uuid())){
			sql="update sns_topic set reply_count=reply_count+1 where uuid='"+snsReplyJsonform.getTopic_uuid()+"'";
		}else{
			sql="update sns_reply set reply_count=reply_count+1 where uuid='"+snsReplyJsonform.getReply_uuid()+"'";
		}
		this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
		
		//暂时屏蔽.
		
		return true;
	}

	/**
	 * 更新班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(SessionUserInfoInterface user, SnsReplyJsonform snsReplyJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(snsReplyJsonform.getContent())) {
			responseMessage.setMessage("content不能为空！");
			return false;
		}

		SnsReply cn = (SnsReply) this.nSimpleHibernateDao.getObjectById(SnsReply.class,
				snsReplyJsonform.getUuid());

		if (cn != null) {
			cn.setContent(snsReplyJsonform.getContent());
//			cn.setUpdate_time(TimeUtils.getCurrentTimestamp());

			this.nSimpleHibernateDao.getHibernateTemplate().update(cn);
		} else {
			responseMessage.setMessage("对象不存在");
			return true;
		}

		return true;
	}
	public PageQueryResult listPage(PaginationData pData,String topic_uuid,String reply_uuid,
			HttpServletRequest request) {

		if(StringUtils.isBlank(reply_uuid)&&StringUtils.isBlank(topic_uuid)){
			return new PageQueryResult();
		}
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.content,t1.create_time,t1.create_useruuid,t1.reply_count,t1.yes_count,t1.no_count,t1.status";
		sql+=" FROM sns_reply t1 ";
		sql+=" where t1.status=0 ";
		if(StringUtils.isNotBlank(reply_uuid)){
			sql+="and t1.reply_uuid= '"+DbUtils.safeToWhereString(reply_uuid)+"'";
		}else 
		if(StringUtils.isNotBlank(topic_uuid)){
			sql+=" and reply_uuid='0' and t1.topic_uuid= '"+DbUtils.safeToWhereString(topic_uuid)+"'";
		}
		sql += " order by t1.create_time desc";

		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		
		//当前用户点赞情况.
		snsDianzanService.warpReluuidsMapList(pageQueryResult.getData(), request);

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

		if (uuid.indexOf(",") != -1) // 多ID
		{
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate("delete from SnsReply where uuid in(?)",
					uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(SnsReply.class, uuid);
		}

		return true;
	}

	public SnsReply get(String uuid) throws Exception {
		return (SnsReply) this.nSimpleHibernateDao.getObjectById(SnsReply.class, uuid);
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return ClassNews.class;
	}
//
//	/**
//	 * vo输出转换
//	 * 
//	 * @param list
//	 * @return
//	 */
//	private SnsReply warpVo(SnsReply o, String cur_user_uuid) {
//		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
//		try {
//			o.setDianzan(this.getDianzanDianzanListVO(o.getUuid(), cur_user_uuid));
//			o.setCreate_img(PxStringUtil.imgSmallUrlByUuid(o.getCreate_img()));
//			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return o;
//	}
//
//	/**
//	 * vo输出转换
//	 * 
//	 * @param list
//	 * @return
//	 */
//	public List<SnsReply> warpVoList(List<SnsReply> list, String cur_user_uuid) {
//		for (SnsReply o : list) {
//			warpVo(o, cur_user_uuid);
//		}
//		return list;
//	}

	public boolean updateDianzan(SessionUserInfoInterface user,String uuid,
			Integer snsdianzanStatusYes,ResponseMessage responseMessage) {
			
			String sql=null;
			if(SystemConstants.SnsDianzan_status_yes.equals(snsdianzanStatusYes)){
				sql="update sns_reply set yes_count=yes_count+1 where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
			}else{
				sql="update sns_reply set no_count=no_count+1 where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
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
			sql="update sns_reply set yes_count=yes_count-1 where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
		}else{
			sql="update sns_reply set no_count=no_count-1 where uuid='"+DbUtils.safeToWhereString(uuid)+"'";
		}
		Integer rel=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
		if(rel==0){
			responseMessage.setMessage("未找到对应数据");
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
