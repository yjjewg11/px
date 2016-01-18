package com.company.news.service;

import java.sql.Timestamp;
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

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.core.iservice.NewMsgNumberIservice;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.Announcements;
import com.company.news.entity.Announcements4Q;
import com.company.news.entity.User;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.AnnouncementsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.vo.AnnouncementsVo;
import com.company.news.vo.DianzanListVO;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class AnnouncementsService extends AbstractService {
	private static final String model_name = "文章模块";
	@Autowired
	public PushMsgIservice pushMsgIservice;
	@Autowired
	private NewMsgNumberIservice newMsgNumberIservice;
	
	/**
	 * 验证基本form表单信息
	 * @param announcementsJsonform
	 * @param responseMessage
	 * @return
	 */
	public boolean valiateForm(AnnouncementsJsonform announcementsJsonform,ResponseMessage responseMessage){
		if (announcementsJsonform.getType()==null) {
			responseMessage.setMessage("type 不能为空.");
			return false;
		}
		
		if (StringUtils.isBlank(announcementsJsonform.getTitle())
				|| announcementsJsonform.getTitle().length() > 128) {
			responseMessage.setMessage("Title不能为空！，且长度不能超过128位！");
			return false;
		}

		if (StringUtils.isBlank(announcementsJsonform.getMessage())
				&&StringUtils.isBlank(announcementsJsonform.getUrl())) {
			responseMessage.setMessage("内容或分享地址需要填写一个");
			return false;
		}

		if (StringUtils.isBlank(announcementsJsonform.getGroupuuid())) {
			responseMessage.setMessage("必须选择一个学校");
			return false;
		}
		
		return true;
	}
	
	/**
	 * 增加
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(AnnouncementsJsonform announcementsJsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		
		if(SystemConstants.common_type_KDHelp==announcementsJsonform.getType().intValue()
				||SystemConstants.common_type_PDHelp==announcementsJsonform.getType().intValue()){
			announcementsJsonform.setGroupuuid(SystemConstants.Group_uuid_wjkj);
			
			if(!RightUtils.hasRight(announcementsJsonform.getGroupuuid(),RightConstants.AD_announce_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return false;
			}
		
		}else{
			
			//精品文章都可以新加
			if(SystemConstants.common_type_jingpinwenzhang!=announcementsJsonform.getType().intValue()){
				
				String right=RightConstants.KD_announce_m;
				if(SessionListener.isPXLogin(request)){
					right=RightConstants.PX_announce_m;
				}
				
				if(!RightUtils.hasRight(announcementsJsonform.getGroupuuid(),right,request)){
					responseMessage.setMessage(RightConstants.Return_msg);
					return false;
				}
			}
			
		}
		if(!valiateForm(announcementsJsonform,responseMessage))return false;
		
		Announcements announcements = new Announcements();

		BeanUtils.copyProperties(announcements, announcementsJsonform);
		if(StringUtils.isNotBlank(announcementsJsonform.getStart_timeStr())){
			announcements.setStart_time(TimeUtils.string2Timestamp(null,
				announcementsJsonform.getStart_timeStr()));
		}
		
		if(StringUtils.isNotBlank(announcementsJsonform.getEnd_timeStr())){
			announcements.setEnd_time(TimeUtils.string2Timestamp(null,
				announcementsJsonform.getEnd_timeStr()));
		}

		
		announcements.setCreate_time(TimeUtils.getCurrentTimestamp());
		announcements.setStatus(SystemConstants.Check_status_fabu);
		announcements.setIllegal(0l);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(announcements);
		// 如果类型是班级通知
		
		if(SystemConstants.Check_status_fabu.equals(announcements.getStatus())){
			
			if (announcements.getType().intValue() == SystemConstants.common_type_gonggao ) {//全校公告
				pushMsgIservice.pushMsgToAll_to_teacher(announcements.getType().intValue(),announcements.getUuid(),announcements.getGroupuuid(),announcements.getTitle());
				pushMsgIservice.pushMsgToAll_to_parent(announcements.getType().intValue(),announcements.getUuid(),announcements.getGroupuuid(),announcements.getTitle());
			}else if (announcements.getType().intValue() == SystemConstants.common_type_neibutongzhi ) {//老师公告
				pushMsgIservice.pushMsgToAll_to_teacher(announcements.getType().intValue(),announcements.getUuid(),announcements.getGroupuuid(),announcements.getTitle());
			}
			
			
			//优惠活动计数
			if(SystemConstants.common_type_pxbenefit==announcementsJsonform.getType().intValue()){
				newMsgNumberIservice.today_pxbenefit_incrCountOfNewMsgNumber();
			}
			//精品文章计数//修复精品文章添加计数失败bug.
			else if(SystemConstants.common_type_jingpinwenzhang==announcementsJsonform.getType().intValue()){
				newMsgNumberIservice.today_goodArticle_incrCountOfNewMsgNumber();
			}

			
			
		}
	
//		// 如果类型是班级通知
//		if (announcements.getType().intValue() == SystemConstants.common_type_banjitongzhi) {
//			if (StringUtils.isBlank(announcementsJsonform.getClassuuids())) {
//				responseMessage.setMessage("Classuuids不能为空！");
//				return false;
//			}
//
//			String[] classuuid = announcementsJsonform.getClassuuids().split(
//					",");
//			for (String s : classuuid) {
//				// 保存用户机构关联表
//				AnnouncementsTo announcementsTo = new AnnouncementsTo();
//				announcementsTo.setClassuuid(s);
//				announcementsTo.setAnnouncementsuuid(announcements.getUuid());
//				// 有事务管理，统一在Controller调用时处理异常
//				this.nSimpleHibernateDao.getHibernateTemplate().save(
//						announcementsTo);
//			}
//		}
		
		
		return true;
	}

	/**
	 * 增加机构,
	 * 12-17修复,只有url没内容保存不成功bug.
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(AnnouncementsJsonform announcementsJsonform,
			ResponseMessage responseMessage,HttpServletRequest request) throws Exception {
		
		if(!valiateForm(announcementsJsonform,responseMessage))return false;
		
		boolean isRight=false;
		if(SystemConstants.common_type_KDHelp==announcementsJsonform.getType().intValue()
				||SystemConstants.common_type_PDHelp==announcementsJsonform.getType().intValue()){
			announcementsJsonform.setGroupuuid(SystemConstants.Group_uuid_wjkj);
			
			if(!RightUtils.hasRight(announcementsJsonform.getGroupuuid(),RightConstants.AD_announce_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return false;
			}
			isRight=true;
		
		}
		Announcements announcements = (Announcements) this.nSimpleHibernateDao
				.getObjectById(Announcements.class,
						announcementsJsonform.getUuid());
		
		if(!isRight){
			//精品文章都可以新加
			if(SystemConstants.common_type_jingpinwenzhang!=announcementsJsonform.getType().intValue()){
				String right=RightConstants.KD_announce_m;
				if(SessionListener.isPXLogin(request)){
					right=RightConstants.PX_announce_m;
				}
				
				if(!RightUtils.hasRight(announcementsJsonform.getGroupuuid(),right,request)){
					responseMessage.setMessage(RightConstants.Return_msg);
					return false;
				}
			}else{//精品文章作者可以修改.
				if(!announcements.getCreate_useruuid().equals(announcementsJsonform.getCreate_useruuid())){
					responseMessage.setMessage("精品文章,不是作者不能修改.");
					return false;
				}
			}
		}
		
	
				
		announcements.setIsimportant(announcementsJsonform.getIsimportant());
		announcements.setMessage(announcementsJsonform.getMessage());
		announcements.setTitle(announcementsJsonform.getTitle());
		announcements.setType(announcementsJsonform.getType());
		announcements.setGroupuuid(announcementsJsonform.getGroupuuid());
		announcements.setUrl(announcementsJsonform.getUrl());

		Timestamp start_time = TimeUtils.string2Timestamp(null,
				announcementsJsonform.getStart_timeStr());
		Timestamp end_time = TimeUtils.string2Timestamp(null,
				announcementsJsonform.getEnd_timeStr());

		announcements.setStart_time(start_time);
		announcements.setEnd_time(end_time);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().update(announcements);

		//修改通告时,不在发送推送消息,防止多次修改,多次推送消息.用户体验不好.
//		if(SystemConstants.Check_status_fabu.equals(announcements.getStatus())){
//			
//			if (announcements.getType().intValue() == SystemConstants.common_type_gonggao ) {//全校公告
//				pushMsgIservice.pushMsgToAll_to_teacher(announcements.getType().intValue(),announcements.getUuid(),announcements.getGroupuuid(),announcements.getTitle());
//				pushMsgIservice.pushMsgToAll_to_parent(announcements.getType().intValue(),announcements.getUuid(),announcements.getGroupuuid(),announcements.getTitle());
//			}else if (announcements.getType().intValue() == SystemConstants.common_type_neibutongzhi ) {//老师公告
//				pushMsgIservice.pushMsgToAll_to_teacher(announcements.getType().intValue(),announcements.getUuid(),announcements.getGroupuuid(),announcements.getTitle());
//			}
//		}

		return true;
	}

	
	/**
	 * 查询我公告
	 * 
	 * @return
	 */
	public PageQueryResult queryMy(SessionUserInfoInterface user,String groupuuid, PaginationData pData) {
		String hql = "from Announcements4Q where (type=0 or type=1) and status=0 ";
		if (StringUtils.isNotBlank(groupuuid)){
			hql += " and  groupuuid in("+DBUtil.stringsToWhereInValue(groupuuid)+")";
		}else{
			hql += " and  groupuuid in(select groupuuid from UserGroupRelation where useruuid='"+user.getUuid()+"')";
		}
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHqlNoTotal(hql, pData);
		return pageQueryResult;

	}
	/**
	 *后台admin查询信息管理
	 * 
	 * @return
	 */
	public PageQueryResult listByWjkjPage(String type, String enddate, PaginationData pData) {

		
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.title,t1.create_time,t1.create_user,t1.create_useruuid,t1.isimportant,t1.groupuuid,t1.status,t1.url,t1.start_time,t1.end_time,t1.type";
		sql+=" FROM px_announcements t1 ";
//		sql+=" LEFT JOIN  px_count t2 on t1.uuid=t2.ext_uuid ";
		sql+=" where  1=1";
		if (StringUtils.isNotBlank(type))
			sql += " and t1.type=" + type;
		if (StringUtils.isNotBlank(enddate)){
			enddate+=" 23:59:59";
			sql += " and t1.create_time<=" + DBUtil.stringToDateByDBType(enddate);
		}
		sql += " order by t1.create_time desc";
		
		
		
		String countsql="SELECT count(*) from px_announcements t1";

		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForQueryTotal(query, countsql, pData);
		this.warpMapList(pageQueryResult.getData());
		return pageQueryResult;
	}
	
	/**
	 * 查询所有通知
	 * 
	 * @return
	 */
	public PageQueryResult listByRight(String type, String groupuuid, PaginationData pData) {
		if (StringUtils.isBlank(groupuuid))
			return null;

		
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.title,t1.create_time,t1.create_user,t1.create_useruuid,t1.isimportant,t1.groupuuid,t1.status,t1.url,t1.start_time,t1.end_time,t1.type";
		sql+=" FROM px_announcements t1 ";
		//sql+=" LEFT JOIN  px_count t2 on t1.uuid=t2.ext_uuid ";
		sql+=" where   t1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(type))
			sql += " and t1.type=" + type;
		sql += " order by t1.create_time desc";
		
		
		
		String countsql="SELECT count(*) from px_announcements t1";
		countsql+=" where   t1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";

		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForQueryTotal(query, countsql, pData);
		
		this.warpMapList(pageQueryResult.getData());
		
//		
//		String hql = "from Announcements4Q where  groupuuid in("+DBUtil.stringsToWhereInValue(groupuuid)+")";
//		if (StringUtils.isNotBlank(type))
//			hql += " and type=" + type;
//		pData.setOrderFiled("create_time");
//		pData.setOrderType("desc");
//		
//		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
//				.findByPaginationToHql(hql, pData);
//		§warpVoList(pageQueryResult.getData(),null);
		return pageQueryResult;
	}
	
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List warpMapList(List<Map> list) {
		
		String uuids="";
		for(Map o:list){
			uuids+=o.get("uuid")+",";
		}
		try {
			Map countMap=countService.getCountByExt_uuids(uuids);
			for(Map o:list){
				o.put("count", countMap.get(o.get("uuid")));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
	@Autowired
	private CountService countService;

	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private Announcements4Q warpVo(Announcements4Q o,String cur_user_uuid){
		try {
			this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
			o.setCount(countService.get(o.getUuid(), o.getType()));
			if(StringUtils.isBlank(o.getUrl())){
				o.setUrl(PxStringUtil.getArticleByUuid(o.getUuid()));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return o;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public List<Announcements4Q> warpVoList(List<Announcements4Q> list,String cur_user_uuid){
		for(Announcements4Q o:list){
			warpVo(o,cur_user_uuid);
		}
		return list;
	}

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean delete(String uuid, ResponseMessage responseMessage, HttpServletRequest request) {
		if (StringUtils.isBlank(uuid)) {
			responseMessage.setMessage("ID不能为空！");
			return false;
		}
		Announcements obj=(Announcements) this.nSimpleHibernateDao.getObject(Announcements.class, uuid);
		if(obj==null){
			responseMessage.setMessage("没有该数据!");
			return false;
		}
		
		
		if(SystemConstants.common_type_KDHelp==obj.getType().intValue()
				||SystemConstants.common_type_PDHelp==obj.getType().intValue()){
			
			if(!RightUtils.hasRight(obj.getGroupuuid(),RightConstants.AD_announce_m,request)){
				responseMessage.setMessage(RightConstants.Return_msg);
				return false;
			}
		
		}else{

			String right=RightConstants.KD_announce_m;
			if(SessionListener.isPXLogin(request)){
				right=RightConstants.PX_announce_m;
			}
			
			
			else if(!RightUtils.hasRight(obj.getGroupuuid(),right,request)){
				
				
				if(SystemConstants.common_type_jingpinwenzhang!=obj.getType().intValue()){
					responseMessage.setMessage(RightConstants.Return_msg);
					return false;
					
				}
				//精品文章创建者可以删除
				if(SystemConstants.common_type_jingpinwenzhang==obj.getType().intValue()){
					
					SessionUserInfoInterface user = SessionListener.getUserInfoBySession(request);
					if(!user.getUuid().equals(obj.getCreate_useruuid())){
						responseMessage.setMessage(RightConstants.Return_msg);
						return false;
					}
				}
			
			}
		}
		
		
		String desc="uuid="+uuid+"|title="+obj.getTitle();
		this.addLog("announcements.delete","删除信息", desc, request);
		
		 this.nSimpleHibernateDao.delete(obj);
//		if (uuid.indexOf(",") != -1)// 多ID
//		{
//			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
//					"delete from Announcements where uuid in(?)", uuid);
////			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
////					"delete from AnnouncementsTo where announcementsuuid in(?)", uuid);
//		} else {
//			this.nSimpleHibernateDao
//					.deleteObjectById(Announcements.class, uuid);
////			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
////					"delete from AnnouncementsTo where announcementsuuid =?", uuid);
//		}

		return true;
	}
	
	/**
	 * 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public AnnouncementsVo get(String uuid) throws Exception {
		Announcements announcements = (Announcements) this.nSimpleHibernateDao
				.getObjectById(Announcements.class, uuid);

		if(announcements==null)return null;
		AnnouncementsVo a = new AnnouncementsVo();
		BeanUtils.copyProperties(a, announcements);
		
		return a;
	}

	
	/**
	 * 根据机构UUID,获取班级热门互动top
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getAnnCountsByTeacher(String groupuuid,String begDateStr, String endDateStr,Integer type) {
		endDateStr+=" 23:59:59";
		//user_name,news_count,dianzan_count,replay_count,read_sum_count
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="SELECT t0.name as user_name,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" (select px_announcements.uuid,px_user.uuid as user_uuid,px_user.name from px_announcements   inner join px_user on px_announcements.create_useruuid=px_user.uuid";
			sql+="  where px_announcements.type="+type+" and  px_announcements.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
			sql+=" and ( px_announcements.create_time<="+DBUtil.stringToDateByDBType(endDateStr)+" and px_announcements.create_time>="+DBUtil.stringToDateByDBType(begDateStr)+")";		
			sql+=") t0 LEFT JOIN px_classnewsdianzan t1 on t0.uuid=t1.newsuuid";
		sql+=" LEFT JOIN px_classnewsreply t2 on t0.uuid =t2.newsuuid";
		sql+=" LEFT JOIN px_count t3 on t0.uuid =t3.ext_uuid";
		sql+=" GROUP BY t0.user_uuid order by news_count desc";
		

		Query q = s.createSQLQuery(sql);

//		q.setMaxResults(10);
		return q.list();
	}
	
	
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

	public PushMsgIservice getPushMsgIservice() {
		return pushMsgIservice;
	}

	public void setPushMsgIservice(PushMsgIservice pushMsgIservice) {
		this.pushMsgIservice = pushMsgIservice;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
