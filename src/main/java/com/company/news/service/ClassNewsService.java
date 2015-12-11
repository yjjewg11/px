package com.company.news.service;

import java.util.ArrayList;
import java.util.Date;
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
import com.company.news.cache.PxRedisCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
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
	
		
		String []  classuuidArray=classNewsJsonform.getClassuuid().split(",");
		
		for(String classuuid:classuuidArray){
			System.out.println(classuuid); 

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
		}
//		System.out.println(classuuidArray); 
////		if(pClass==null){
////			responseMessage.setMessage("选择的班级不存在");
////			return false;
////		}
//		
//
//		
//		ClassNews cn = new ClassNews();
//
//		BeanUtils.copyProperties(cn, classNewsJsonform);
//		cn.setGroupuuid(pClass.getGroupuuid());
//		cn.setGroup_name(nSimpleHibernateDao.getGroupName(pClass.getGroupuuid()));
//		cn.setClass_name(pClass.getName());
//		cn.setCreate_time(TimeUtils.getCurrentTimestamp());
////		cn.setUpdate_time(TimeUtils.getCurrentTimestamp());
////		cn.setReply_time(TimeUtils.getCurrentTimestamp());
//		cn.setUsertype(USER_type_default);
//		cn.setStatus(SystemConstants.Check_status_fabu);
//		cn.setIllegal(0l);
//		
//		// 有事务管理，统一在Controller调用时处理异常
//		PxStringUtil.addCreateUser(user, cn);
//		this.nSimpleHibernateDao.getHibernateTemplate().save(cn);
//
//		
//		//初始话计数
//				countService.add(cn.getUuid(), SystemConstants.common_type_hudong);
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
	 * 查询所有班级
	 * 
	 * @return
	 */
	public PageQueryResult query(SessionUserInfoInterface user ,String type,String classuuid, PaginationData pData) {
		
		
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.classuuid,t1.create_user,t1.create_useruuid,t1.create_time,t1.title,t1.content,t1.imgs,t1.groupuuid,t1.illegal,t1.illegal_time,t1.reply_time,t1.status,t1.update_time,t1.usertype,t1.group_name,t1.class_name";
		sql+=" FROM px_classnews t1 ";
		//sql+=" LEFT JOIN  px_count t3 on t1.uuid=t3.ext_uuid ";
		sql+=" where t1.status=0  ";	
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  t1.classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		if("myByTeacher".equals(type)){
			sql += " and  t1.classuuid in (select classuuid from px_userclassrelation where useruuid='"+ user.getUuid() + "')";
		}
		
	    sql += " order by t1.create_time desc";
		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		List<Map> list=pageQueryResult.getData();
		
		this.warpMapList(list, user);
//		
//		String hql = "from ClassNews where status=0";
//		if (StringUtils.isNotBlank(classuuid))
//			hql += " and  classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
//		if("myByTeacher".equals(type)){
//			hql += " and  classuuid in (select classuuid from UserClassRelation where useruuid='"+ user.getUuid() + "')";
//		}
//		pData.setOrderFiled("create_time");
//		pData.setOrderType("desc");
//
//		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
//				.findByPaginationToHql(hql, pData);
//		List<ClassNews> list=pageQueryResult.getData();
	
		
		return pageQueryResult;

	}
	
	
	
	


	/**
	 * 查询我班级相关的班级数据.
	 * 
	 * @return
	 * @throws Exception 
	 */
	public PageQueryResult getClassNewsByMy(SessionUserInfoInterface user ,String type,String classuuid, PaginationData pData) throws Exception {
//		if (StringUtils.isBlank(classuuid))
//			return null; 
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.classuuid,t1.create_user,t1.create_useruuid,t1.create_time,t1.title,t1.content,t1.imgs,t1.groupuuid,t1.illegal,t1.illegal_time,t1.reply_time,t1.status,t1.update_time,t1.usertype,t1.group_name,t1.class_name";
		sql+=" FROM px_classnews t1 ";
		//sql+=" LEFT JOIN  px_count t3 on t1.uuid=t3.ext_uuid ";
		sql+=" where t1.status=0  ";	
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  t1.classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		else if("all".equals(type)) {//查询所有数据
			
		}else  {
			sql += " and  t1.classuuid in (select classuuid from px_userclassrelation where useruuid='"+ user.getUuid() + "')";
		}
		
	    sql += " order by t1.create_time desc";
		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		List<Map> list=pageQueryResult.getData();
		
		this.warpMapList(list, user);
		
		
		
//		String hql = "from ClassNews where status=0 ";
//		if (StringUtils.isNotBlank(classuuid))
//			hql += " and  classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
//		else if("all".equals(type)) {//查询所有数据
//			
//		}else  {
//			hql += " and  classuuid in (select classuuid from UserClassRelation where useruuid='"+ user.getUuid() + "')";
//		}
//		pData.setOrderFiled("create_time");
//		pData.setOrderType("desc");

//		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
//				.findByPaginationToHqlNoTotal(hql, pData);
//		List<ClassNews> list=pageQueryResult.getData();
//		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;

	}

	
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List warpMapList(List<Map> list,SessionUserInfoInterface user ) {
		
		String uuids="";
		for(Map o:list){
			warpMap(o,user);
			uuids+=o.get("uuid")+",";
		}
		
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

	private void warpMap(Map o, SessionUserInfoInterface user) {
		try {
			//网页版本需要转为html显示.
			o.put("content", MyUbbUtils.myUbbTohtml((String)o.get("content")));
			o.put("imgsList", PxStringUtil.uuids_to_imgMiddleurlList((String)o.get("imgs")));
			o.put("share_url", PxStringUtil.getClassNewsByUuid((String)o.get("uuid")));
			
			o.put("replyPage", this.getReplyPageList((String)o.get("uuid")));
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
	 * 查询我班级相关的班级数据.
	 * 
	 * @return
	 * @throws Exception 
	 */
	public PageQueryResult getAllClassNews(SessionUserInfoInterface user ,String type,String classuuid, PaginationData pData) throws Exception {
		

		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECTt1.uuid,t1.classuuid,t1.create_user,t1.create_useruuid,t1.create_time,t1.title,t1.content,t1.imgs,t1.groupuuid,t1.illegal,t1.illegal_time,t1.reply_time,t1.status,t1.update_time,t1.usertype,t1.group_name,t1.class_name";
		sql+=" FROM px_classnews t1 ";
		//sql+=" LEFT JOIN  px_count t3 on t1.uuid=t3.ext_uuid ";
		sql+=" where t1.status=0  ";	
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  t1.classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		
		
	    sql += " order by t1.create_time desc";
		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		List<Map> list=pageQueryResult.getData();
		this.warpMapList(list, user);
		
		
//		countService.update_countBatch(uuids);
//		
//		
//		String hql = "from ClassNews where status=0 ";
//		if (StringUtils.isNotBlank(classuuid))
//			hql += " and  classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
//		
//		pData.setOrderFiled("create_time");
//		pData.setOrderType("desc");
//
//		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
//				.findByPaginationToHqlNoTotal(hql, pData);
//		List<ClassNews> list=pageQueryResult.getData();
//		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;

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
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="SELECT t0.name as class_name,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" (select px_classnews.uuid,px_class.uuid as classuuid,px_class.name from  px_class  left join px_classnews on px_classnews.classuuid=px_class.uuid";
			sql+="  where px_class.isdisable="+isdisable+" and  px_class.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
			
			sql+=" and (  px_classnews.create_time is NULL ";
			sql+=" or( px_classnews.create_time<="+DBUtil.stringToDateByDBType(endDateStr)+" and px_classnews.create_time>="+DBUtil.stringToDateByDBType(begDateStr)+")";
			sql+=")";
			sql+=") t0 LEFT JOIN px_classnewsdianzan t1 on t0.uuid=t1.newsuuid";
		sql+=" LEFT JOIN px_classnewsreply t2 on t0.uuid =t2.newsuuid";
		sql+=" LEFT JOIN px_count t3 on t0.uuid =t3.ext_uuid";
		sql+=" GROUP BY t0.classuuid";
		

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
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="SELECT t0.name as class_name,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" (select px_classnews.uuid,px_class.uuid as classuuid,px_class.name from px_pxclass as px_class  left join px_classnews on px_classnews.classuuid=px_class.uuid";
			sql+="  where px_class.isdisable="+isdisable+" and  px_class.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
			
			sql+=" and (  px_classnews.create_time is NULL ";
			sql+=" or( px_classnews.create_time<="+DBUtil.stringToDateByDBType(endDateStr)+" and px_classnews.create_time>="+DBUtil.stringToDateByDBType(begDateStr)+")";
			sql+=")";
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

		if (uuid.indexOf(",") != -1)// 多ID
		{
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from ClassNews where uuid in(?)", uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from ClassNewsReply where newsuuid in(?)", uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(ClassNews.class, uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from ClassNewsReply where newsuuid =?", uuid);
		}

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
	public ClassNews warpVo(ClassNews o,String cur_user_uuid){
		try {
			this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
			//网页版本需要转为html显示.
			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
			o.setImgsList(PxStringUtil.uuids_to_imgMiddleurlList(o.getImgs()));
			o.setShare_url(PxStringUtil.getClassNewsByUuid(o.getUuid()));
			//o.setCount(countService.count(o.getUuid(), SystemConstants.common_type_hudong));
			o.setDianzan(classNewsReplyService.getDianzanDianzanListVO(o.getUuid(), cur_user_uuid));
			o.setReplyPage(this.getReplyPageList(o.getUuid()));
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
		private PageQueryResult getReplyPageList(String newsuuid) {
			if (StringUtils.isBlank(newsuuid)) {
				return new PageQueryResult();
			}
			
			PaginationData pData=new PaginationData();
			pData.setPageSize(5);
			String hql="from ClassNewsReply where  status ="+SystemConstants.Check_status_fabu +" and  newsuuid='"+DbUtils.safeToWhereString(newsuuid)+"'";
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
	private List<ClassNews> warpVoList(List<ClassNews> list,String cur_user_uuid){
		
		
		for(ClassNews o:list){
			warpVo(o,cur_user_uuid);
		}
		return list;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

	public PageQueryResult listClassNewsByAdmin(String groups,SessionUserInfoInterface user,
			PaginationData pData) {
		
		

		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.classuuid,t1.create_user,t1.create_useruuid,t1.create_time,t1.title,t1.content,t1.imgs,t1.groupuuid,t1.illegal,t1.illegal_time,t1.reply_time,t1.status,t1.update_time,t1.usertype,t1.group_name,t1.class_name";
		sql+=" FROM px_classnews t1 ";
	//	sql+=" LEFT JOIN  px_count t3 on t1.uuid=t3.ext_uuid ";
		sql+=" where t1.status=0  ";	
		if (StringUtils.isNotBlank(groups))
			sql += " and  t1.groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
	
		
	    sql += " order by t1.create_time desc";
		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		List<Map> list=pageQueryResult.getData();
		
		this.warpMapList(list, user);
		
		
//		String hql = "from ClassNews where status=0 ";
//		if (StringUtils.isNotBlank(groups))
//			hql += " and  groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
//	
//		pData.setOrderFiled("create_time");
//		pData.setOrderType("desc");
//
//		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
//				.findByPaginationToHqlNoTotal(hql, pData);
//		List<ClassNews> list=pageQueryResult.getData();
//		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;
	}

	public PageQueryResult listClassNewsByMygroup(String groups, SessionUserInfoInterface user,
			PaginationData pData) {
		

		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.classuuid,t1.create_user,t1.create_useruuid,t1.create_time,t1.title,t1.content,t1.imgs,t1.groupuuid,t1.illegal,t1.illegal_time,t1.reply_time,t1.status,t1.update_time,t1.usertype,t1.group_name,t1.class_name";
		sql+=" FROM px_classnews t1 ";
		//sql+=" LEFT JOIN  px_count t3 on t1.uuid=t3.ext_uuid ";
		sql+=" where t1.status=0  ";	
		if (StringUtils.isNotBlank(groups))
			sql += " and  t1.groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
	
		
	    sql += " order by t1.create_time desc";
		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		List<Map> list=pageQueryResult.getData();
		
		this.warpMapList(list, user);
		
//		
//		String hql = "from ClassNews where status=0 ";
//		if (StringUtils.isNotBlank(groups))
//			hql += " and  groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
//	
//		pData.setOrderFiled("create_time");
//		pData.setOrderType("desc");
//
//		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
//				.findByPaginationToHqlNoTotal(hql, pData);
//		List<ClassNews> list=pageQueryResult.getData();
//		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;
	}
	
	public PageQueryResult getAllClassNewsByWJ( SessionUserInfoInterface user,
			PaginationData pData) {

		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.classuuid,t1.create_user,t1.create_useruuid,t1.create_time,t1.title,t1.content,t1.imgs,t1.groupuuid,t1.illegal,t1.illegal_time,t1.reply_time,t1.status,t1.update_time,t1.usertype,t1.group_name,t1.class_name";
		sql+=" FROM px_classnews t1 ";
		sql+=" LEFT JOIN  px_count t3 on t1.uuid=t3.ext_uuid ";
//		sql+=" where t1.status=0  ";	
	    sql += " order by t1.create_time desc";
		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		List<Map> list=pageQueryResult.getData();
		
		this.warpMapList(list, user);
		
//		String hql = "from ClassNews where status=0 ";
//		pData.setOrderFiled("create_time");
//		pData.setOrderType("desc");
//
//		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
//				.findByPaginationToHqlNoTotal(hql, pData);
//		List<ClassNews> list=pageQueryResult.getData();
//		this.warpVoList(list, user.getUuid());
//		
		return pageQueryResult;
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
	
	
	
	
	
	
	
	public PageQueryResult listClassNewsByAllgroup(SessionUserInfoInterface user,
		String uuid,	PaginationData pData) {
		

		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.uuid,t1.classuuid,t1.create_user,t1.create_useruuid,t1.create_time,t1.title,t1.content,t1.imgs,t1.groupuuid,t1.illegal,t1.illegal_time,t1.reply_time,t1.status,t1.update_time,t1.usertype,t1.group_name,t1.class_name";
		sql+=" FROM px_classnews t1 ";
		//sql+=" LEFT JOIN  px_count t3 on t1.uuid=t3.ext_uuid ";
		sql+=" where t1.status=0   ";	
		if (StringUtils.isNotBlank(uuid))
			sql += " and  t1.uuid in("+DBUtil.stringsToWhereInValue(uuid)+")";
		else{
			sql += " and  t1.groupuuid not in ('group_wj1','group_wj2','group_px1')";
		}
		 // sql += " order by t1.create_time desc";
	    sql += " order by t1.create_time desc";
		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
		List<Map> list=pageQueryResult.getData();
		
		this.warpMapList(list, user);
		
		return pageQueryResult;
	}

	
	
}
