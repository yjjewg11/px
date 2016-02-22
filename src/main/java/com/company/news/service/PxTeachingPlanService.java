package com.company.news.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.mq.JobDetails;
import com.company.mq.MQUtils;
import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.PxClass;
import com.company.news.entity.PxTeachingplan;
import com.company.news.entity.User;
import com.company.news.jsonform.PxTeachingPlanJsonform;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class PxTeachingPlanService extends AbstractService {
	private static final String model_name = "培训结构教学计划模块";
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(PxTeachingPlanJsonform pxTeachingPlanJsonform,
			ResponseMessage responseMessage) throws Exception {
		if(this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getPlandateStr(), "上课时间", responseMessage)
				||this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getClassuuid(), "班级", responseMessage)||
				this.validateRequireAndLengthByRegJsonform(pxTeachingPlanJsonform.getName(), 45, "教学课程名称", responseMessage))
		return false;
		
		Date plandate = TimeUtils.string2Timestamp(TimeUtils.YYYY_MM_DD_HH_mm_FORMAT,pxTeachingPlanJsonform.getPlandateStr());

		if (plandate == null) {
			responseMessage.setMessage("上课时间格式不正确，格式：2015-10-07 14:20");
			return false;
		}

		PxTeachingplan pxTeachingplan = new PxTeachingplan();
		BeanUtils.copyProperties(pxTeachingplan, pxTeachingPlanJsonform);
		
		pxTeachingplan.setPlandate(plandate);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(pxTeachingplan);

		PxClass obj = (PxClass) nSimpleHibernateDao.getObject(PxClass.class,
				pxTeachingplan.getClassuuid());
		if(obj!=null){
			 String msg=obj.getName()+" 课程更新:"+pxTeachingplan.getName()+" 时间:"+pxTeachingPlanJsonform.getPlandateStr();
			 if(StringUtils.isNotBlank(pxTeachingplan.getAddress())) msg +=" 地点:"+pxTeachingplan.getAddress();
				
				Map map=new HashMap();
				map.put("uuid", pxTeachingplan.getClassuuid());
		    	map.put("classuuid",pxTeachingplan.getClassuuid());
		    	map.put("title",msg);
				JobDetails job=new JobDetails("pxTeachingPlanService","sendPushMessage",map);
				MQUtils.publish(job);
		}
		 
		
		return true;
	}
	
	

	 @Autowired
		public PushMsgIservice pushMsgIservice;

		public void sendPushMessage(Map<String,String> map) throws Exception{
			String uuid=map.get("uuid");
			String classuuid=map.get("classuuid");
			String title=map.get("title");
			pushMsgIservice.pushMsgToParentByPxClass(SystemConstants.common_type_pxteachingPlan,uuid,classuuid,title);
			
		}
	/**
	 * 增加教学计划,根据周期行时间.
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean addByPre(PxTeachingPlanJsonform pxTeachingPlanJsonform,
			ResponseMessage responseMessage) throws Exception {
		if(this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getPer_start_date(), "开课日期", responseMessage)
				||this.validateRequireAndLengthByRegJsonform(pxTeachingPlanJsonform.getPer_num(),2, "上课次数", responseMessage)
				||this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getPer_week(), "上课周期", responseMessage)
				||this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getPer_time(), "上课时间", responseMessage)
				
				||this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getClassuuid(), "班级", responseMessage)
				||this.validateRequireAndLengthByRegJsonform(pxTeachingPlanJsonform.getName(), 45, "教学课程名称", responseMessage))
		return false;
		
		Date start_date = TimeUtils.string2Timestamp(TimeUtils.YYYY_MM_DD_FORMAT,pxTeachingPlanJsonform.getPer_start_date());

		if (start_date == null) {
			responseMessage.setMessage("开课日期，格式：2015-10-07");
			return false;
		}
		//上课次数
		if(!StringUtils.isNumeric(pxTeachingPlanJsonform.getPer_num())){
			responseMessage.setMessage("上课次数取值范围:[0-99]");
			return false;
		}
		
		int per_num=0;
		try {
			per_num=Integer.valueOf(pxTeachingPlanJsonform.getPer_num());
		} catch (Exception e) {
			responseMessage.setMessage("上课次数取值范围:[0-99]");
			return false;
		}
		if(per_num==0){
			responseMessage.setMessage("上课次数取值范围:[0-99]");
			return false;
		}
		
		//
		String[] per_timeArr=pxTeachingPlanJsonform.getPer_time().split(":");
		if(per_timeArr.length<2){
			responseMessage.setMessage("上课时间有效范围:[00:00-23:59]");
			return false;
		}
		//周
		String[] weeksArr=pxTeachingPlanJsonform.getPer_week().split(",");
		int step=weeksArr.length;
		
		Calendar aCalendar = Calendar.getInstance();
		//设置开始日期
        aCalendar.setTime(start_date);
        try {
			aCalendar.set(Calendar.HOUR_OF_DAY, Integer.valueOf(per_timeArr[0]));
			aCalendar.set(Calendar.MINUTE, Integer.valueOf(per_timeArr[1]));
		} catch (Exception e) {
			responseMessage.setMessage("上课时间有效范围:[00:00-23:59]");
			return false;
		}
//        aCalendar.setFirstDayOfWeek(Calendar.DAY_OF_WEEK);
        //举例,week=3
        int week = aCalendar.get(Calendar.DAY_OF_WEEK)-1;
        int i=0;
        int count=0;
		while(i<per_num){
			if(step<1)break;
			for(int k=0;k<step;k++){
				if(i>=per_num)break;
				i++;
				//tmp_week=4
				//tmp_week=2
				int  tmp_week=Integer.valueOf(weeksArr[k]);
				//4-3=1
				//2-3=-1
				int diff_week=tmp_week-week;
				//if(2-3=-1)   diff_week=7-1=6
				if(diff_week<=0)diff_week=7+diff_week;
				aCalendar.add(Calendar.DAY_OF_MONTH, diff_week);
				//日期变了,需要重新获取
				week = aCalendar.get(Calendar.DAY_OF_WEEK)-1;
				  
				PxTeachingplan pxTeachingplan = new PxTeachingplan();
				BeanUtils.copyProperties(pxTeachingplan, pxTeachingPlanJsonform);
				Date plandate =	aCalendar.getTime();
				pxTeachingplan.setPlandate(plandate);
				// 有事务管理，统一在Controller调用时处理异常
				this.nSimpleHibernateDao.getHibernateTemplate().save(pxTeachingplan);
				
				count++;
				
			}
		}
		
		
		

		PxClass obj = (PxClass) nSimpleHibernateDao.getObject(PxClass.class,
				pxTeachingPlanJsonform.getClassuuid());
		if(obj!=null){
			 String msg=obj.getName()+" 课程更新:"+pxTeachingPlanJsonform.getName();
			 if(StringUtils.isNotBlank(pxTeachingPlanJsonform.getAddress())) msg +=" 地点:"+pxTeachingPlanJsonform.getAddress();
				
				Map map=new HashMap();
				map.put("uuid", pxTeachingPlanJsonform.getClassuuid());
		    	map.put("classuuid",pxTeachingPlanJsonform.getClassuuid());
		    	map.put("title",msg);
				JobDetails job=new JobDetails("pxTeachingPlanService","sendPushMessage",map);
				MQUtils.publish(job);
		}
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
	public boolean update(PxTeachingPlanJsonform pxTeachingPlanJsonform,
			ResponseMessage responseMessage) throws Exception {
		if(this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getPlandateStr(), "教学时间", responseMessage)||
				this.validateRequireAndLengthByRegJsonform(pxTeachingPlanJsonform.getName(), 45, "教学课程名称", responseMessage))
		return false;
		
		Date plandate = TimeUtils.string2Timestamp(TimeUtils.YYYY_MM_DD_HH_mm_FORMAT,pxTeachingPlanJsonform.getPlandateStr());

		if (plandate == null) {
			responseMessage.setMessage("上课时间格式不正确，格式：2015-10-07 14:20");
			return false;
		}
		
		PxTeachingplan pxTeachingplan=(PxTeachingplan) this.nSimpleHibernateDao.getObject(PxTeachingplan.class, pxTeachingPlanJsonform.getUuid());
		
		BeanUtils.copyProperties(pxTeachingplan, pxTeachingPlanJsonform);
		pxTeachingplan.setPlandate(plandate);
//		pxTeachingplan.setName(pxTeachingPlanJsonform.getName());
//		pxTeachingplan.setContext(pxTeachingPlanJsonform.getContext());
//		pxTeachingplan.setDuration(pxTeachingPlanJsonform.getDuration());
//		pxTeachingplan.setReadyfor(pxTeachingPlanJsonform.getReadyfor());
		
		this.nSimpleHibernateDao.getHibernateTemplate().update(pxTeachingplan);
		return true;
	}


	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public List<PxTeachingplan> query(String begDateStr, String endDateStr,
			String classuuid) {
		if (StringUtils.isBlank(classuuid)) {
			return null;
		}
		

		return (List<PxTeachingplan>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from PxTeachingplan where classuuid=? order by plandate asc",
						classuuid);
//
//		if (StringUtils.isBlank(begDateStr)) {
//			return null;
//		}
//
//		if (StringUtils.isBlank(endDateStr)) {
//			return null;
//		}
//
//		Date begDate = TimeUtils.string2Timestamp(null, begDateStr);
//
//		Date endDate = TimeUtils.string2Timestamp(null, endDateStr);

//		return (List<PxTeachingplan>) this.nSimpleHibernateDao
//				.getHibernateTemplate()
//				.find("from PxTeachingplan where classuuid=? and plandate<=? and plandate >=?  order by plandate asc",
//						classuuid, endDate, begDate);
	}

	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public PxTeachingplan get(String uuid) {
		PxTeachingplan t = (PxTeachingplan) this.nSimpleHibernateDao.getObjectById(
				PxTeachingplan.class, uuid);
		
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
					"delete from PxTeachingplan where uuid in(?)", uuid);

		} else {
			this.nSimpleHibernateDao.deleteObjectById(PxTeachingplan.class, uuid);

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


	public boolean update_copybyclass(String from_classuuid, String to_classuuid,
			ResponseMessage responseMessage) throws Exception {
		List<PxTeachingplan> list=(List<PxTeachingplan>) this.nSimpleHibernateDao
		.getHibernateTemplate()
		.find("from PxTeachingplan where classuuid=? order by plandate asc",
				from_classuuid);
		
		
		for(PxTeachingplan obj:list){
			PxTeachingplan newObj=new PxTeachingplan();
			
			BeanUtils.copyProperties(newObj, obj);
			newObj.setUuid(null);
			newObj.setClassuuid(to_classuuid);
			
			this.nSimpleHibernateDao.save(newObj);
			
		}
		return true;
	}

	public boolean  update_deleteAll(String classuuid, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(classuuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}

			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from PxTeachingplan where classuuid ='"+DbUtils.safeToWhereString(classuuid)+"'");

		
		return true;
	}

}
