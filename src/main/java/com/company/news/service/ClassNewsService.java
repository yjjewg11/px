package com.company.news.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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

import com.company.mq.JobDetails;
import com.company.mq.MQUtils;
import com.company.news.SystemConstants;
import com.company.news.cache.redis.UserRedisCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.AbstractClass;
import com.company.news.entity.ClassNews;
import com.company.news.entity.ClassNewsReply;
import com.company.news.entity.PClass;
import com.company.news.entity.PxClass;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.ClassNewsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.vo.DianzanListVO;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.statistics.PieSeriesDataVo;
import com.company.news.vo.statistics.PieStatisticsVo;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class ClassNewsService extends AbstractService {
	public static final int USER_type_default = 0;// 0:老师
	private static final String model_name = "互动模块";
	@Autowired
	private CountService countService;
	@Autowired
	private ClassNewsReplyService classNewsReplyService;
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(SessionUserInfoInterface user,ClassNewsJsonform classNewsJsonform,
			ResponseMessage responseMessage,HttpServletRequest request) throws Exception {
//		if (StringUtils.isBlank(classNewsJsonform.getTitle())
//				|| classNewsJsonform.getTitle().length() > 128) {
//			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
//			return false;
//		}

		if (StringUtils.isBlank(classNewsJsonform.getClassuuid())) {
			responseMessage.setMessage("必须选择一个班级");
			return false;
		}
	
		if (StringUtils.isNotBlank(classNewsJsonform.getUrl())) {
			classNewsJsonform.setUrl(PxStringUtil.getURLInString(classNewsJsonform.getUrl()));
			
			
			if(classNewsJsonform.getUrl()==null){
				responseMessage.setMessage("分享连接不正确,需要包含:http://");
				return false;
			}
			
		}
	
		String []  classuuidArray=classNewsJsonform.getClassuuid().split(",");
		
		for(String classuuid:classuuidArray){
			AbstractClass pClass=null;
			if(SessionListener.isPXLogin(request)){
				 pClass=(AbstractClass)this.nSimpleHibernateDao.getObject(PxClass.class, classuuid);
			}else{
				 pClass=(AbstractClass)this.nSimpleHibernateDao.getObject(PClass.class, classuuid);
			}
			
			if(pClass==null){
				responseMessage.setMessage("选择的班级不存在");
				
				  //关联管理员账号注册失败，回滚之前操作
				throw new RuntimeException(responseMessage.getMessage());
//				return false;
			}
			
			ClassNews cn = new ClassNews();

			BeanUtils.copyProperties(cn, classNewsJsonform);
			cn.setClassuuid(classuuid);
			cn.setGroupuuid(pClass.getGroupuuid());
			cn.setGroup_name(nSimpleHibernateDao.getGroupName(pClass.getGroupuuid()));
			cn.setClass_name(pClass.getName());
			cn.setCreate_time(TimeUtils.getCurrentTimestamp());
			cn.setUrl(StringUtils.trim(cn.getUrl()));
//			cn.setUpdate_time(TimeUtils.getCurrentTimestamp());
//			cn.setReply_time(TimeUtils.getCurrentTimestamp());
			cn.setUsertype(USER_type_default);
			cn.setStatus(SystemConstants.Check_status_fabu);
			cn.setIllegal(0l);
			
			// 有事务管理，统一在Controller调用时处理异常
			PxStringUtil.addCreateUser(user, cn);
			this.nSimpleHibernateDao.getHibernateTemplate().save(cn);
			//初始话计数
					countService.add(cn.getUuid(), SystemConstants.common_type_hudong);
					String hasImg="";
					if(StringUtils.isNotBlank(cn.getImgs())){
						hasImg="[有图]";
					}
					//某某说:[有图]哈哈
					String msg=cn.getContent();
					if(StringUtils.isBlank(msg)){
						msg=user.getName()+"说:"+hasImg+"班级互动";
					}else{
						msg=user.getName()+"说:"+hasImg+msg;
					}
					
					

					
					Map map=new HashMap();
			    	map.put("uuid", cn.getUuid());
			    	map.put("classuuid",cn.getClassuuid());
			    	map.put("title",msg);
					
					
					if(SessionListener.isPXLogin(request)){
						JobDetails job=new JobDetails("classNewsService","sendPushMessagePxClass",map);
						MQUtils.publish(job);
					}else{
						JobDetails job=new JobDetails("classNewsService","sendPushMessage",map);
						MQUtils.publish(job);
					}
					
		}
		
		
		
		return true;
	}
	@Autowired
	public PushMsgIservice pushMsgIservice;

	public void sendPushMessagePxClass(Map<String,String> map) throws Exception{
		String uuid=map.get("uuid");
		String classuuid=map.get("classuuid");
		String title=map.get("title");
		pushMsgIservice.pushMsgToParentByPxClass(SystemConstants.common_type_hudong,uuid,classuuid,title);
	}
	

	public void sendPushMessage(Map<String,String> map) throws Exception{
		String uuid=map.get("uuid");
		String classuuid=map.get("classuuid");
		String title=map.get("title");
		pushMsgIservice.pushMsgToParentByClass(SystemConstants.common_type_hudong,uuid,classuuid,title);
	}
	
	/**
	 * 更新班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(SessionUserInfoInterface user,ClassNewsJsonform classNewsJsonform,
			ResponseMessage responseMessage,HttpServletRequest reques) throws Exception {
		
//		if (StringUtils.isBlank(classNewsJsonform.getTitle())
//				|| classNewsJsonform.getTitle().length() > 128) {
//			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
//			return false;
//		}

		ClassNews cn = (ClassNews) this.nSimpleHibernateDao.getObjectById(
				ClassNews.class, classNewsJsonform.getUuid());

		if (cn != null) {
			cn.setImgs(classNewsJsonform.getImgs());
			cn.setContent(classNewsJsonform.getContent());
//			cn.setTitle(classNewsJsonform.getTitle());
//			cn.setUpdate_time(TimeUtils.getCurrentTimestamp());

			this.nSimpleHibernateDao.getHibernateTemplate().update(cn);
		} else {
			responseMessage.setMessage("对象不存在");
			return true;
		}

		return true;
	}



	
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List warpMapList(List<Map> list,SessionUserInfoInterface user ,boolean isQueryAllStatus) {
		
		String uuids="";
		for(Map o:list){
			warpMap(o,user,isQueryAllStatus);
			uuids+=o.get("uuid")+",";
		}
		UserRedisCache.warpListMapByUserCache(list, "create_useruuid", "create_user", "create_img");
		
		try {
			Map countMap=countService.getCountByExt_uuids(uuids);
			Map dianZanMap=classNewsReplyService.getDianzanDianzanMap(uuids, user);
			for(Map o:list){
				o.put("count", countMap.get(o.get("uuid")));
				Object vo= (Object)dianZanMap.get(o.get("uuid"));
				if(vo==null)vo= new DianzanListVO();
				o.put("dianzan",vo);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
//	private List warpMapList(List<Map> list, String cur_user_uuid) {
//		for(Map o:list){
//			warpMap(o,cur_user_uuid);
//		}
//		return list;
//		
//	}

	private void warpMap(Map o, SessionUserInfoInterface user,boolean isQueryAllStatus) {
		try {
			//网页版本需要转为html显示.
			o.put("content", MyUbbUtils.myUbbTohtml((String)o.get("content")));
			o.put("imgsList", PxStringUtil.uuids_to_imgMiddleurlList((String)o.get("imgs")));
			o.put("share_url", PxStringUtil.getClassNewsByUuid((String)o.get("uuid")));
			
			
			String cur_user_uuid="";
			if(user!=null)cur_user_uuid=user.getUuid();
			PaginationData pData=new PaginationData();
			pData.setPageSize(5);
			o.put("replyPage", this.classNewsReplyService.query((String)o.get("uuid"), pData, isQueryAllStatus));
			
			o.put("create_img", PxStringUtil.imgSmallUrlByUuid((String)o.get("create_img")));
			if(o.get("count")==null)o.put("count","0");
			
//			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
//			o.setImgsList(PxStringUtil.uuids_to_imgMiddleurlList(o.getImgs()));
//			o.setShare_url(PxStringUtil.getClassNewsByUuid(o.getUuid()));
			//o.setCount(countService.count(o.getUuid(), SystemConstants.common_type_hudong));
//			o.setDianzan(classNewsReplyService.getDianzanDianzanListVO(o.getUuid(), cur_user_uuid));
//			o.setReplyPage(this.getReplyPageList(o.getUuid()));
//			o.setCreate_img(PxStringUtil.imgSmallUrlByUuid(o.getCreate_img()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}



	
	/**
	 * 根据机构UUID,获取班级互动
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCollectionByGroup(String groupuuid,String begDateStr, String endDateStr) {
		Date begDate = TimeUtils.string2Timestamp(null, begDateStr);
		Date endDate = TimeUtils.string2Timestamp(null, endDateStr);
		endDate.setHours(23);
		endDate.setMinutes(59);
		endDate.setSeconds(59);
		
		
		 String hql = "select count(uuid),classuuid from ClassNews  where create_time<=:endDate and create_time >=:begDate  " ;
		 //hql+=" and classuuid in(select uuid from PClass where isdisable=0 and groupuuid=:groupuuid ) group by classuuid)";
		 hql+=" and classuuid in(select uuid from PClass where  groupuuid=:groupuuid ) group by classuuid)";
		    List list = this.nSimpleHibernateDao.getSession().createQuery(hql)
		    		.setTimestamp("begDate", begDate)
		    		.setTimestamp("endDate", endDate)
		    		.setString( "groupuuid" , groupuuid).list();

		    
		return list;
	}
	

	/**
	 * 根据机构UUID,获取班级互动
	 * 
	 * 
	 * 
	 * select t4.classuuid, sum(t1.count) as count_total,t4.dianzan_count,t4.reply_count from(
select  t0.classuuid,count(t0.uuid),count(DISTINCT t2.uuid) as dianzan_count,count(DISTINCT t3.uuid) as reply_count
from (select * from px_classnews t4 LEFT JOIN px_count t1 on t4.uuid=t1.ext_uuid) t0 
LEFT JOIN px_classnewsdianzan t2 on t0.uuid=t2.newsuuid
LEFT JOIN px_classnewsreply t3 on t0.uuid=t3.newsuuid


GROUP BY t0.classuuid
) t4
LEFT JOIN px_count t1 on t4.uuid=t1.ext_uuid


	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCollectionByPxGroup(String groupuuid,String begDateStr, String endDateStr) {
		Date begDate = TimeUtils.string2Timestamp(null, begDateStr);
		Date endDate = TimeUtils.string2Timestamp(null, endDateStr);
		endDate.setHours(23);
		endDate.setMinutes(59);
		endDate.setSeconds(59);

		 String hql = "select count(uuid),classuuid from ClassNews  where create_time<=:endDate and create_time >=:begDate " ;
		 hql+=" and classuuid in(select uuid from PxClass where isdisable=0 and groupuuid=:groupuuid ) group by classuuid)";
		 
		 
		    List list = this.nSimpleHibernateDao.getSession().createQuery(hql)
		    		.setTimestamp("begDate", begDate)
		    		.setTimestamp("endDate", endDate)
		    		.setString( "groupuuid" , groupuuid).list();

		    
		return list;
	}
	
	/**
	 * 根据机构UUID,获取班级热门互动top
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCountsByClass(String groupuuid,String begDateStr, String endDateStr,Integer isdisable) {
		endDateStr+=" 23:59:59";
		//class_name,news_count,dianzan_count,replay_count,read_sum_count
		Session s = this.nSimpleHibernateDao.getSession();
		String sql="SELECT t0.name as class_name,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" (select px_classnews.uuid,px_class.uuid as classuuid,px_class.name from px_class as px_class  left join " ;
		sql+=	"(select uuid,classuuid from px_classnews";
				sql+=	"	where  groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' " ;
						sql+=" and   px_classnews.create_time<= "+DBUtil.stringToDateByDBType(endDateStr);
						sql+=" and px_classnews.create_time>="+DBUtil.stringToDateByDBType(begDateStr) ;
						sql+=	") as px_classnews on px_classnews.classuuid=px_class.uuid";
			sql+="  where px_class.isdisable="+isdisable+" and  px_class.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
			sql+=") t0 LEFT JOIN px_classnewsdianzan t1 on t0.uuid=t1.newsuuid";
		sql+=" LEFT JOIN px_classnewsreply t2 on t0.uuid =t2.newsuuid";
		sql+=" LEFT JOIN px_count t3 on t0.uuid =t3.ext_uuid";
		sql+=" GROUP BY t0.classuuid";
		

		Query q = s.createSQLQuery(sql);

//		q.setMaxResults(10);
		return q.list();
	}
	

	/**
	 * 根据机构UUID,获取班级热门互动top()
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCountsByClass_graduation(String groupuuid,String begDateStr, String endDateStr,Integer year) {
		
		Date startDate=TimeUtils.getFirstDayOfYear(year);
		Date endDate=TimeUtils.getFirstDayOfYear(year+1);
	
		
		endDateStr+=" 23:59:59";
		//class_name,news_count,dianzan_count,replay_count,read_sum_count
		Session s = this.nSimpleHibernateDao.getSession();
		String sql="SELECT t0.name as class_name,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" (select px_classnews.uuid,px_class.uuid as classuuid,px_class.name from px_class as px_class  left join " ;
		sql+=	"(select uuid,classuuid from px_classnews";
				sql+=	"	where  groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' " ;
						sql+=" and   px_classnews.create_time<= "+DBUtil.stringToDateByDBType(endDateStr);
						sql+=" and px_classnews.create_time>="+DBUtil.stringToDateByDBType(begDateStr) ;
						sql+=	") as px_classnews on px_classnews.classuuid=px_class.uuid";
			sql+="  where px_class.isdisable=1 and  px_class.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
			sql+= " and ( px_class.disable_time<"+DBUtil.stringToDateByDBType(TimeUtils.getDateTimeString(endDate))+" and px_class.disable_time>="+DBUtil.stringToDateByDBType(TimeUtils.getDateTimeString(startDate))+")";	
			
			
			
			sql+=") t0 LEFT JOIN px_classnewsdianzan t1 on t0.uuid=t1.newsuuid";
		sql+=" LEFT JOIN px_classnewsreply t2 on t0.uuid =t2.newsuuid";
		sql+=" LEFT JOIN px_count t3 on t0.uuid =t3.ext_uuid";
		sql+=" GROUP BY t0.classuuid";
		

		Query q = s.createSQLQuery(sql);

//		q.setMaxResults(10);
		return q.list();
	}
	/**
	 * 根据机构UUID,获取班级热门互动top
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCountsByTeacher(String groupuuid,String begDateStr, String endDateStr) {
		endDateStr+=" 23:59:59";
		//user_name,news_count,dianzan_count,replay_count,read_sum_count
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="SELECT t0.name as user_name,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" (select px_classnews.uuid,px_user.uuid as user_uuid,px_user.name from px_classnews   inner join px_user on px_classnews.create_useruuid=px_user.uuid";
			sql+="  where   px_classnews.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
			sql+=" and ( px_classnews.create_time<="+DBUtil.stringToDateByDBType(endDateStr)+" and px_classnews.create_time>="+DBUtil.stringToDateByDBType(begDateStr)+")";		
			sql+=") t0 LEFT JOIN px_classnewsdianzan t1 on t0.uuid=t1.newsuuid";
		sql+=" LEFT JOIN px_classnewsreply t2 on t0.uuid =t2.newsuuid";
		sql+=" LEFT JOIN px_count t3 on t0.uuid =t3.ext_uuid";
		sql+=" GROUP BY t0.user_uuid order by news_count desc";
		

		Query q = s.createSQLQuery(sql);

//		q.setMaxResults(10);
		return q.list();
	}
	

	/**
	 * 根据机构UUID,培训机构的发布的班级互动.
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCountsByPxClass(String groupuuid,String begDateStr, String endDateStr,Integer isdisable) {
		endDateStr+=" 23:59:59";
		//class_name,news_count,dianzan_count,replay_count,read_sum_count
		Session s = this.nSimpleHibernateDao.getSession();
		String sql="SELECT t0.name as class_name,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" (select px_classnews.uuid,px_class.uuid as classuuid,px_class.name from px_pxclass as px_class  left join " ;
		sql+=	"(select uuid,classuuid from px_classnews";
				sql+=	"	where  groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' " ;
						sql+=" and   px_classnews.create_time<= "+DBUtil.stringToDateByDBType(endDateStr);
						sql+=" and px_classnews.create_time>="+DBUtil.stringToDateByDBType(begDateStr) ;
						sql+=	") as px_classnews on px_classnews.classuuid=px_class.uuid";
			sql+="  where px_class.isdisable="+isdisable+" and  px_class.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
			sql+=") t0 LEFT JOIN px_classnewsdianzan t1 on t0.uuid=t1.newsuuid";
		sql+=" LEFT JOIN px_classnewsreply t2 on t0.uuid =t2.newsuuid";
		sql+=" LEFT JOIN px_count t3 on t0.uuid =t3.ext_uuid";
		sql+=" GROUP BY t0.classuuid";
		

		Query q = s.createSQLQuery(sql);

//		q.setMaxResults(10);
		return q.list();
	}
	
	
	/**
	 * 根据机构UUID,获取班级热门互动top
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCountByGroup(String groupuuid,String begDateStr, String endDateStr) {
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="";
		Query q = s.createSQLQuery("SELECT c.count,cn.title,cn.create_user FROM pxdb.px_count c left join px_classnews cn on c.ext_uuid=cn.uuid "
				+ "where ext_uuid in (select uuid from px_classnews where create_time<="+DBUtil.stringToDateByDBType(endDateStr)+" and create_time>="+DBUtil.stringToDateByDBType(begDateStr)+" and classuuid in "
				+ "(select uuid from px_class where groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"'))"
				+ "order by count desc ");

		q.setMaxResults(10);
		return q.list();
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
		ClassNews obj=(ClassNews)this.nSimpleHibernateDao.getObject(ClassNews.class, uuid);
		if(obj==null){
			responseMessage.setMessage("对象不存在！");
			return false;
		}

		this.nSimpleHibernateDao.delete(obj);

		return true;
	}

	public ClassNewsJsonform get(String uuid) throws Exception {
		ClassNews cn = (ClassNews) this.nSimpleHibernateDao.getObjectById(
				ClassNews.class, uuid);
		ClassNewsJsonform cnjf = new ClassNewsJsonform();
		BeanUtils.copyProperties(cnjf, cn);

		cnjf.setContent(MyUbbUtils.myUbbTohtml(cnjf.getContent()));
		cnjf.setImgs(PxStringUtil.imgUrlByUuid(cn.getImgs()));
//		// 计数
//		cnjf.setCount(countService.count(uuid,
//				SystemConstants.common_type_hudong));

		return cnjf;

	}



	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return ClassNews.class;
	}

	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public ClassNews warpVo(ClassNews o,String cur_user_uuid,boolean isQueryAllStatus){
		try {
			this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
			//网页版本需要转为html显示.
			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
			o.setImgsList(PxStringUtil.uuids_to_imgMiddleurlList(o.getImgs()));
			o.setShare_url(PxStringUtil.getClassNewsByUuid(o.getUuid()));
			//o.setCount(countService.count(o.getUuid(), SystemConstants.common_type_hudong));
			o.setDianzan(classNewsReplyService.getDianzanDianzanListVO(o.getUuid(), cur_user_uuid));
			PaginationData pData=new PaginationData();
			pData.setPageSize(5);
			o.setReplyPage(this.classNewsReplyService.query(o.getUuid(), pData, isQueryAllStatus));
			o.setCreate_img(PxStringUtil.imgSmallUrlByUuid(o.getCreate_img()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return o;
	}
	
	  /**
		 * 查询回复列表分页
		 * 
		 * @return
		 */
	@Deprecated
		private PageQueryResult getReplyPageList(String newsuuid,String cur_user_uuid,boolean isQueryAllStatus) {
			if (StringUtils.isBlank(newsuuid)) {
				return new PageQueryResult();
			}
			
			if (StringUtils.isBlank(newsuuid)) {
				return new PageQueryResult();
			}
			
			
			PaginationData pData=new PaginationData();
			pData.setPageSize(5);
			String hql=null;
			if(isQueryAllStatus){
				hql="from ClassNewsReply where    newsuuid='"+DbUtils.safeToWhereString(newsuuid)+"'";
				
			}else{
				hql="from ClassNewsReply where   ( create_useruuid='"+cur_user_uuid+"' or status ="+SystemConstants.Check_status_fabu+")  and  newsuuid='"+DbUtils.safeToWhereString(newsuuid)+"'";
				
			}
			
			pData.setOrderFiled("create_time");
			pData.setOrderType("desc");
			
			PageQueryResult pageQueryResult= this.nSimpleHibernateDao.findByPaginationToHqlNoTotal(hql, pData);
			List<ClassNewsReply> list=pageQueryResult.getData();
			
			for(ClassNewsReply o:list){
				this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
				o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
				o.setCreate_img(PxStringUtil.imgSmallUrlByUuid(o.getCreate_img()));
				
				
			}
			
			
			return pageQueryResult;
					
		}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List<ClassNews> warpVoList(List<ClassNews> list,String cur_user_uuid,boolean isQueryAllStatus){
		
		
		for(ClassNews o:list){
			warpVo(o,cur_user_uuid,isQueryAllStatus);
		}
		return list;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}




	


	
	public PieStatisticsVo getMyClassnewStatistics(ResponseMessage responseMessage,
			SessionUserInfoInterface user) {
		PieStatisticsVo pvo=new PieStatisticsVo();
		List<PieSeriesDataVo> list=new ArrayList();
		
		String str=null;
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		//统计自己发布的互动总数
		String sql="select count(*) from px_classnews where create_useruuid ='"+user.getUuid()+"'";
		Object count = s.createSQLQuery(sql).uniqueResult();
//		 PieSeriesDataVo vo=new PieSeriesDataVo();
//		 vo.setName("我发布互动");
//		 vo.setValue(Integer.valueOf(count.toString()));
//		 list.add(vo);
		 str="我发布总数:"+count;
		 
		//统计自己发布的互动收到点赞的总数
			sql="select count(*) from px_classnewsdianzan t1,px_classnews t2 where t1.newsuuid=t2.uuid and t2.create_useruuid ='"+user.getUuid()+"'";
			 count = s.createSQLQuery(sql).uniqueResult();
//			  vo=new PieSeriesDataVo();
//				 vo.setName("点赞");
//				 vo.setValue(Integer.valueOf(count.toString()));
//				 list.add(vo);
				 str+=",点赞:"+	count; 
		//统计自己发布的互动收到回复的总数
		sql="select count(*) from px_classnewsreply t1,px_classnews t2 where t1.newsuuid=t2.uuid and t2.create_useruuid ='"+user.getUuid()+"'";
		 count = s.createSQLQuery(sql).uniqueResult();
//		  vo=new PieSeriesDataVo();
//		 vo.setName("评论");
//		 vo.setValue(Integer.valueOf(count.toString()));
//		 list.add(vo);
		 str+=",评论:"+	count; 
		pvo.setSeries_data(list);
		pvo.setTitle_text(str);
		return pvo;
	}
	
	/**OK
	 * 查询我班级相关的班级数据.
	 * 
	 * @return
	 * @throws Exception 
	 */
	public PageQueryResult getAllClassNews(SessionUserInfoInterface user ,String type,String classuuid, PaginationData pData,HttpServletRequest request) throws Exception {
		
		String sqlwhere =" where t1.status=0  ";	
		if (StringUtils.isNotBlank(classuuid))
			sqlwhere += " and  t1.classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		
		
		sqlwhere += " order by t1.create_time desc";

		return listPageBySql(user,sqlwhere, pData,request);
	}
	
	/**OK
	 * 查询所有班级
	 * 
	 * @return
	 */
	public PageQueryResult query(SessionUserInfoInterface user ,String type,String classuuid, PaginationData pData,HttpServletRequest request) {
		
		

		String sqlwhere =" where t1.status=0  ";	
		if (StringUtils.isNotBlank(classuuid))
			sqlwhere += " and  t1.classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		if("myByTeacher".equals(type)){
			sqlwhere += " and  t1.classuuid in (select classuuid from px_userclassrelation where useruuid='"+ user.getUuid() + "')";
		}
		
		sqlwhere += " order by t1.create_time desc";
	    return listPageBySql(user,sqlwhere, pData,request);

	}	
	/**OK
	 */
	public PageQueryResult listClassNewsByAdmin(String groups,SessionUserInfoInterface user,
			PaginationData pData,HttpServletRequest request) {
		//有权限,则查询所有的状态
		String sqlwhere =" where t1.groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
			
		sqlwhere += " order by t1.create_time desc";    
	    return listPageBySql(user,sqlwhere, pData,request);
	}	
	public PageQueryResult listClassNewsByMygroup(String groups, SessionUserInfoInterface user,
			PaginationData pData,HttpServletRequest request) {
		String sqlwhere=null;
		if(RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_classnew_m,request)||RightUtils.hasRightAnyGroup(RightConstants.KD_announce_m,request)||RightUtils.hasRightAnyGroup(RightConstants.PX_announce_m,request)){
			//有权限,则查询所有的状态
			if (StringUtils.isNotBlank(groups))
					sqlwhere = " where  t1.groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
			
		}else{
			 sqlwhere =" where t1.status=0  ";	
				if (StringUtils.isNotBlank(groups))
					sqlwhere += " and  t1.groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
		}
		
		
		
		
		sqlwhere += " order by t1.create_time desc";
	    return listPageBySql(user,sqlwhere, pData,request);
	}	
	
	public PageQueryResult listClassNewsByAllgroup(SessionUserInfoInterface user,
		String uuid,	PaginationData pData,HttpServletRequest request) {

		String sqlwhere=" where t1.status=0   ";	
		if (StringUtils.isNotBlank(uuid))
			sqlwhere += " and  t1.uuid in("+DBUtil.stringsToWhereInValue(uuid)+")";
		else{
			sqlwhere += " and  t1.groupuuid not in ('group_wj1','group_wj2','group_px1')";
		}
		sqlwhere += " order by t1.create_time desc";
	    return listPageBySql(user,sqlwhere, pData,request);
	}	
	
	
	
	
	
	
	
	
	
	
	
	
	public PageQueryResult getAllClassNewsByWJ( SessionUserInfoInterface user,
			PaginationData pData,HttpServletRequest request) {


		String sqlwhere =" LEFT JOIN  px_count t3 on t1.uuid=t3.ext_uuid ";

		sqlwhere += " order by t1.create_time desc";
	    return listPageBySql(user,sqlwhere, pData,request);
	}	





	/**OK
	 * 查询我班级相关的班级数据.
	 * 
	 * @return
	 * @throws Exception 
	 */
	public PageQueryResult getClassNewsByMy(SessionUserInfoInterface user ,String type,String classuuid, PaginationData pData,HttpServletRequest request) throws Exception {
		String sqlwhere =" where t1.status=0  ";	
		if (StringUtils.isNotBlank(classuuid))
			sqlwhere += " and  t1.classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		else if("all".equals(type)) {//查询所有数据
			
		}else  {
			sqlwhere += " and  t1.classuuid in (select classuuid from px_userclassrelation where useruuid='"+ user.getUuid() + "')";
		}
		
		sqlwhere += " order by t1.create_time desc";
		return listPageBySql(user,sqlwhere, pData,request);
	}	
	

	
/*
 * 抽离的公用查询
 * */
	private PageQueryResult listPageBySql(SessionUserInfoInterface user,String sqlwhere,PaginationData pData,HttpServletRequest request
) {
    	String selectSql="SELECT t1.url,t1.uuid,t1.classuuid,t1.create_user,t1.create_useruuid,t1.create_img,t1.create_time,t1.title,t1.content,t1.imgs,t1.groupuuid,t1.illegal,t1.illegal_time,t1.reply_time,t1.status,t1.update_time,t1.usertype,t1.group_name,t1.class_name";
		selectSql+=" FROM px_classnews t1 ";
		String sql=selectSql+sqlwhere;
		
		
		
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		List<Map> list=pageQueryResult.getData();	
		

		boolean isQueryAllStatus=false;
		if(RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_classnew_m,request)||RightUtils.hasRightAnyGroup(RightConstants.KD_announce_m,request)||RightUtils.hasRightAnyGroup(RightConstants.PX_announce_m,request)){
			isQueryAllStatus=true;
		}
		
		this.warpMapList(list, user,isQueryAllStatus);
		return pageQueryResult;
	}	
	
	
}
