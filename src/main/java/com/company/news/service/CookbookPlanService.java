package com.company.news.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.mq.JobDetails;
import com.company.mq.MQUtils;
import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.Cookbook;
import com.company.news.entity.Cookbook4Q;
import com.company.news.entity.CookbookPlan;
import com.company.news.jsonform.CookbookPlanJsonform;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class CookbookPlanService extends AbstractService {
	private static final String model_name = "餐饮安排模块";
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(CookbookPlanJsonform cookbookPlanJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(cookbookPlanJsonform.getGroupuuid())) {
			responseMessage.setMessage("必须选择一个学校");
			return false;
		}

		if (StringUtils.isBlank(cookbookPlanJsonform.getPlandateStr())) {
			responseMessage.setMessage("Plandate不能为空！");
			return false;
		}

		Timestamp plandate = TimeUtils.string2Timestamp(null,
				cookbookPlanJsonform.getPlandateStr());

		if (plandate == null) {
			responseMessage.setMessage("Plandate格式不正确");
			return false;
		}

		CookbookPlan cookbookPlan = this.getByPlandateAndGroupuuid(plandate,
				cookbookPlanJsonform.getGroupuuid());
		String uuid=null;
		boolean isNew=false;
		if (cookbookPlan == null){
			isNew=true;
			cookbookPlan = new CookbookPlan();
		}else{
			isNew=false;
			uuid=cookbookPlan.getUuid();
		}
		BeanUtils.copyProperties(cookbookPlan, cookbookPlanJsonform);
		cookbookPlan.setUuid(uuid);
		cookbookPlan.setPlandate(plandate);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().saveOrUpdate(
				cookbookPlan);

		if(isNew){
			Map map=new HashMap();
	    	map.put("uuid", cookbookPlan.getUuid());
	    	map.put("groupuuid", cookbookPlan.getGroupuuid());
	    	map.put("title",cookbookPlanJsonform.getPlandateStr()+"食谱");
			JobDetails job=new JobDetails("cookbookPlanService","sendPushMessage",map);
			MQUtils.publish(job);
		}
		
		return true;
	}
	@Autowired
	public PushMsgIservice pushMsgIservice;
	
	public void sendPushMessage(Map<String,String> map) throws Exception{
		String uuid=map.get("uuid");
		String groupuuid=map.get("groupuuid");
		String title=map.get("title");
		pushMsgIservice.pushMsgToAll_to_parent(SystemConstants.common_type_shipu,uuid,groupuuid,title);

	}

	/**
	 * 
	 * @param plandate
	 * @param groupuuid
	 * @return
	 */
	private CookbookPlan getByPlandateAndGroupuuid(Date plandate,
			String groupuuid) {
		List<CookbookPlan> l = (List<CookbookPlan>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from CookbookPlan where plandate=? and groupuuid=?",
						plandate, groupuuid);
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
	public List<CookbookPlan> query(String begDateStr, String endDateStr,
			String groupuuid) {
		if (StringUtils.isBlank(groupuuid)) {
			return null;
		}

		if (StringUtils.isBlank(begDateStr)) {
			return null;
		}

		if (StringUtils.isBlank(endDateStr)) {
			return null;
		}

		Date begDate = TimeUtils.string2Timestamp(null, begDateStr);

		Date endDate = TimeUtils.string2Timestamp(null, endDateStr);
		
		List<CookbookPlan> list=(List<CookbookPlan>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from CookbookPlan where groupuuid=? and plandate<=? and plandate >=?  order by plandate asc",
						groupuuid, endDate, begDate);
		this.nSimpleHibernateDao.getHibernateTemplate().clear();
		for(CookbookPlan c:list){
//			c.setTime_1(this.makeCookbookName(c.getTime_1()));
//			c.setTime_2(this.makeCookbookName(c.getTime_2()));
//			c.setTime_3(this.makeCookbookName(c.getTime_3()));
//			c.setTime_4(this.makeCookbookName(c.getTime_4()));
//			c.setTime_5(this.makeCookbookName(c.getTime_5()));	
			
			c.setShare_url(PxStringUtil.getCookbookPlanByUuid(c.getUuid()));
			try {
				c.setCount(countService.count(c.getUuid(), SystemConstants.common_type_shipu));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
//
			c.setList_time_1(this.getCookbookList(c.getTime_1()));
			c.setList_time_2(this.getCookbookList(c.getTime_2()));
			c.setList_time_3(this.getCookbookList(c.getTime_3()));
			c.setList_time_4(this.getCookbookList(c.getTime_4()));
			c.setList_time_5(this.getCookbookList(c.getTime_5()));

		}
		
		return list;
	}
	 @Autowired
     private CountService countService ;

	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public CookbookPlan get(String uuid) {
		CookbookPlan c = (CookbookPlan) this.nSimpleHibernateDao.getObjectById(
				CookbookPlan.class, uuid);
		this.nSimpleHibernateDao.getHibernateTemplate().clear();
		if (c != null) {
//			c.setTime_1(this.makeCookbookName(c.getTime_1()));
//			c.setTime_2(this.makeCookbookName(c.getTime_2()));
//			c.setTime_3(this.makeCookbookName(c.getTime_3()));
//			c.setTime_4(this.makeCookbookName(c.getTime_4()));
//			c.setTime_5(this.makeCookbookName(c.getTime_5()));
//
			c.setList_time_1(this.getCookbookList(c.getTime_1()));
			c.setList_time_2(this.getCookbookList(c.getTime_2()));
			c.setList_time_3(this.getCookbookList(c.getTime_3()));
			c.setList_time_4(this.getCookbookList(c.getTime_4()));
			c.setList_time_5(this.getCookbookList(c.getTime_5()));

		}
		return c;

	}

	
	/**
	 * 
	 * @param uuids
	 * @return
	 * 
	 */
	private List getCookbookList(String uuids) {
		List list=new ArrayList();
		if (StringUtils.isNotBlank(uuids)) {
			String[] uuid = uuids.split(",");
			for (String s : uuid) {
				Cookbook4Q cb = (Cookbook4Q) CommonsCache.get(s,Cookbook4Q.class);
				if(cb!=null){
					cb.setImg(PxStringUtil.imgUrlByUuid(cb.getImg()));
					list.add(cb);
				}

			}
		}
		return list;

	}
	/**
	 * 
	 * @param uuids
	 * @return
	 * 食材uuid$图片uuid$食材名字
	 */
	private String makeCookbookName(String uuids) {
		String rs = "";
		if (StringUtils.isNotBlank(uuids)) {
			String[] uuid = uuids.split(",");
			for (String s : uuid) {
				Cookbook cb = (Cookbook) CommonsCache.get(s,Cookbook.class);
				if (cb != null)
					rs += (s+"$"+cb.getImg() + "$" + cb.getName() + ",");

			}

		}

		return PxStringUtil.StringDecComma(rs);

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
					"delete from CookbookPlan where uuid in(?)", uuid);

		} else {
			this.nSimpleHibernateDao.deleteObjectById(CookbookPlan.class, uuid);

		}

		return true;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return CookbookPlan.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

	public List<Object[]> getCookbookPlanByMonth_bar(String groupuuid,
			String begDateStr, String endDateStr) {
		endDateStr+=" 23:59:59";
		//user_name,news_count,dianzan_count,replay_count,read_sum_count
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="SELECT DATE_FORMAT(t0.plandate,'%Y-%m') as m,COUNT(DISTINCT t0.uuid) as news_count,COUNT(DISTINCT t1.uuid) as dianzan_count,COUNT(DISTINCT t2.uuid) as replay_count,SUM(DISTINCT t3.count) as read_sum_count from ";
		sql+=" px_cookbookplan t0 LEFT JOIN px_classnewsdianzan t1 on t0.uuid=t1.newsuuid";
		sql+=" LEFT JOIN px_classnewsreply t2 on t0.uuid =t2.newsuuid";
		sql+=" LEFT JOIN px_count t3 on t0.uuid =t3.ext_uuid";
		sql+="  where  t0.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' ";
		sql+=" and ( t0.plandate<="+DBUtil.stringToDateByDBType(endDateStr)+" and t0.plandate>="+DBUtil.stringToDateByDBType(begDateStr)+")";		
		sql+=" GROUP BY m order by m asc";
		

		Query q = s.createSQLQuery(sql);

//		q.setMaxResults(10);
		return q.list();
	}

}
