package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.Cookbook;
import com.company.news.entity.CookbookPlan;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.Right;
import com.company.news.entity.Teachingplan;
import com.company.news.entity.User;
import com.company.news.entity.UserClassRelation;
import com.company.news.entity.UserGroupRelation;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.CookbookPlanJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.jsonform.TeachingPlanJsonform;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.DianzanListVO;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class TeachingPlanService extends AbstractService {
	private static final String model_name = "教学计划模块";
	@Autowired
	private CountService countService;
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public Teachingplan add(TeachingPlanJsonform teachingPlanJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(teachingPlanJsonform.getPlandateStr())) {
			responseMessage.setMessage("plandateStr不能为空！");
			return null;
		}
		
		if (StringUtils.isBlank(teachingPlanJsonform.getClassuuid())) {
			responseMessage.setMessage("classuuid不能为空！");
			return null;
		}

		Date plandate = TimeUtils.string2Timestamp(null,teachingPlanJsonform.getPlandateStr());

		if (plandate == null) {
			responseMessage.setMessage("Plandate格式不正确");
			return null;
		}

		Teachingplan teachingplan = this.getByPlandateAndClassuuid(plandate,teachingPlanJsonform.getClassuuid());

		if (teachingplan == null)
			teachingplan = new Teachingplan();

		teachingplan.setAfternoon(teachingPlanJsonform.getAfternoon());
		teachingplan.setClassuuid(teachingPlanJsonform.getClassuuid());
		teachingplan.setPlandate(plandate);
		teachingplan.setMorning(teachingPlanJsonform.getMorning());
		teachingplan.setCreate_useruuid(teachingPlanJsonform.getCreate_useruuid());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().saveOrUpdate(
				teachingplan);

		
		
		  String msg=teachingPlanJsonform.getPlandateStr()+"课程表";
			
			Map map=new HashMap();
			map.put("uuid", teachingplan.getUuid());
	    	map.put("classuuid",teachingplan.getClassuuid());
	    	map.put("title",msg);
			JobDetails job=new JobDetails("teachingPlanService","sendPushMessage",map);
			MQUtils.publish(job);
			
		return teachingplan;
	}
	
	 @Autowired
		public PushMsgIservice pushMsgIservice;

		public void sendPushMessage(Map<String,String> map) throws Exception{
			String uuid=map.get("uuid");
			String classuuid=map.get("classuuid");
			String title=map.get("title");
			pushMsgIservice.pushMsgToParentByClass(SystemConstants.common_type_jiaoxuejihua,uuid,classuuid,title);
			
		}


	/**
	 * 
	 * @param plandate
	 * @param groupuuid
	 * @return
	 */
	private Teachingplan getByPlandateAndClassuuid(Date plandate,
			String classuuid) {
		List<Teachingplan> l = (List<Teachingplan>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from Teachingplan where plandate=? and classuuid=?",
						plandate, classuuid);
		if (l != null && l.size() > 0)
			return l.get(0);
		else
			return null;
	}

	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public List<Map> query(String begDateStr, String endDateStr,
			String classuuid) {
		if (StringUtils.isBlank(classuuid)) {
			return null;
		}

		if (StringUtils.isBlank(begDateStr)) {
			return null;
		}

		if (StringUtils.isBlank(endDateStr)) {
			return null;
		}
		String sql="select * from px_teachingplan where   classuuid ='"+classuuid+"'";
		sql+=" and  plandate<="+DbUtils.stringToDateYMDByDBType(endDateStr);
		sql+=" and   plandate >="+DbUtils.stringToDateYMDByDBType(begDateStr);
		sql+="  order by plandate asc";
		
		Query  query =this.nSimpleHibernateDao.createSqlQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);	
		List<Map> list=query.list();
		warpMapList(list);
		return list;
	}
	
	
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List warpMapList(List<Map> list) {
		
		String uuids="";
		for(Map o:list){
			warpMap(o);
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

	private void warpMap(Map o) {
	
		
	}
	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public Teachingplan get(String uuid) {
		Teachingplan t = (Teachingplan) this.nSimpleHibernateDao.getObjectById(
				Teachingplan.class, uuid);
		
		return t;

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
					"delete from Teachingplan where uuid in(?)", uuid);

		} else {
			this.nSimpleHibernateDao.deleteObjectById(Teachingplan.class, uuid);

		}

		return true;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Object[]> getTeachingplanCountsByClass(String groupuuid,
			String begDateStr, String endDateStr,Integer isdisable) {
		endDateStr+=" 23:59:59";
		//user_name,news_count,dianzan_count,replay_count,read_sum_count
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="SELECT t0.name as class_name,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" (select px_teachingplan.uuid,px_class.uuid as classuuid,px_class.name from  px_class  left join px_teachingplan on px_teachingplan.classuuid=px_class.uuid";
			sql+="  where px_class.isdisable="+isdisable+" and  px_class.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
			
			sql+=" and (  px_teachingplan.plandate is NULL ";
			sql+=" or( px_teachingplan.plandate<="+DBUtil.stringToDateByDBType(endDateStr)+" and px_teachingplan.plandate>="+DBUtil.stringToDateByDBType(begDateStr)+")";
			sql+=")";
			sql+=") t0 LEFT JOIN px_classnewsdianzan t1 on t0.uuid=t1.newsuuid";
		sql+=" LEFT JOIN px_classnewsreply t2 on t0.uuid =t2.newsuuid";
		sql+=" LEFT JOIN px_count t3 on t0.uuid =t3.ext_uuid";
		sql+=" GROUP BY t0.classuuid order by news_count desc";
		

		Query q = s.createSQLQuery(sql);

//		q.setMaxResults(10);
		return q.list();
	}

}
