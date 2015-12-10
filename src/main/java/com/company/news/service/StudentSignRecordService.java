package com.company.news.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.entity.DoorRecord;
import com.company.news.entity.StatMonthAttendance;
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
public class StudentSignRecordService extends AbstractService {

	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}

	public PageQueryResult query(String student_uuid, PaginationData pData) {
		String hql = "from StudentSignRecord where ";
		//if (StringUtils.isNotBlank(student_uuid)){
			hql += "  studentuuid in("+DBUtil.stringsToWhereInValue(student_uuid)+")";
		//}
		pData.setOrderType("desc");
		pData.setOrderFiled("sign_time");
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHqlNoTotal(hql, pData);
				List<DoorRecord> list=pageQueryResult.getData();

		return pageQueryResult;
	}

	/**
	 * 统计学生签到次数.
	 * @param classuuid
	 * @param groupuuid
	 * @param studentuuid
	 * @return
	 */
	public List<Object[]> queryTodayCountByClassuuid(String classuuid, String groupuuid,
			String studentuuid) {
		
		
		Date today=TimeUtils.getCurrentTimestamp();
		Date startDate=TimeUtils.getDate00(today);
		Date endDate=TimeUtils.getDate23(today);
		String startDatestr=TimeUtils.getDateTimeString(startDate);
		String endDatestr=TimeUtils.getDateTimeString(endDate);
		
		
		//startDatestr="2015-09-17 00:00:00";
	Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		String sql = "select studentuuid,count(*) ";
		sql+=" from px_studentsignrecord s1 left join px_student b2 on  b2.uuid=s1.studentuuid   " ;
		sql+=" where sign_time>"+DBUtil.stringToDateByDBType(startDatestr)+" and sign_time<"+DBUtil.stringToDateByDBType(endDatestr);
		if (StringUtils.isNotBlank(groupuuid))
			sql += " and   s1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  b2.classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		if (StringUtils.isNotBlank(studentuuid))
			sql += " and  s1.uuid in(" + DBUtil.stringsToWhereInValue(studentuuid) + ")";
		
		sql += " group by studentuuid ";
		
		//student_uuid,cardid,userid,student_name
		List<Object[]> list = s.createSQLQuery(sql).list();
		
		return list;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 生成(学生考勤)月度报表,存入数据库
	 * @param yyyy_mm
	 * @param groupuuid
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public List updateStatMonthByTeacher(String yyyy_mm, String groupuuid,ResponseMessage responseMessage) throws Exception {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		
		//1.获取学校有门禁卡的所有用户.
		//startDatestr="2015-09-17 00:00:00";
		
		String sql = "select DISTINCT s1.uuid,s1.name ";
		sql+=" from px_user s1 inner join px_studentbind b2 on  b2.studentuuid=s1.uuid   " ;
		sql+=" where b2.cardid is not null and b2.groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"'";
		sql+="order by CONVERT( s1.name USING gbk)";
		
		//student_uuid,cardid,userid,student_name
		Query q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> userlist=q.list();
		
		
		//2.获取 一个学校,一个月的,每天最小打卡时间,最大打卡时间.
		
		 sql = "select studentuuid,DATE_FORMAT(sign_time,'%d') as dd";
		sql+=" ,CONCAT(DATE_FORMAT(min(sign_time),'%H:%i'),'-',DATE_FORMAT(max(sign_time),'%H:%i')) as sign_time2 " ;
		
		sql+=" from  px_studentsignrecord where studentuuid is not null ";
		sql+=" and groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' and DATE_FORMAT(sign_time,'%Y-%m')='"+yyyy_mm+"'";
		sql+="GROUP BY  studentuuid, DATE_FORMAT(sign_time,'%Y-%m-%d')  ORDER BY studentuuid; ";
		
		
	
		
		//student_uuid,cardid,userid,student_name
		 q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> list=q.list();
		
		Map<String,JSONObject>  jsonmap=new HashMap();
		//3.生成1个月的报表.
		//3.1.生成一个用户的一月数据
		for(Map signrecordMap:list){
			String studentuuid=(String)signrecordMap.get("studentuuid");
			
			JSONObject json=jsonmap.get(studentuuid);
			if(json==null){
				json=new JSONObject();
				jsonmap.put(studentuuid, json);
			}
			// jsonstr;//jsonstr.格式.{"d_01":"13:56-16:56","d_02":"13:56-16:56"}
			String dd=(String)signrecordMap.get("dd");
			json.put("d_"+dd, signrecordMap.get("sign_time2"));
		}
		
		
		
		////3.2如果刷卡记录还未清除,则清空这月报表数据重新生成否则不重新生成.
		
		//不是当月则,生成数据保存到数据库.
		boolean isSaveStatMonth=isSaveStatMonth(groupuuid,yyyy_mm);
				
		if(list.size()==0){
			responseMessage.setMessage(yyyy_mm+"月没有刷卡记录.");
			return null;
		}
		else if(!isSaveStatMonth){
			 sql = "delete from px_stat_month_attendance where type="+SystemConstants.StatMonthAttendance_type_1;
			sql+=" and groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' and yyyy_mm='"+yyyy_mm+"'" ;
			s.createSQLQuery(sql).executeUpdate();
		}
		
		
		List resultList=new ArrayList();
		
		//3.3 保存一个用户的一月数据
		for(Map userMap:userlist){
			String studentuuid=(String)userMap.get("uuid");
			String name=(String)userMap.get("name");
			JSONObject json=jsonmap.get(studentuuid);
			String jsonstr=null;
			if(json!=null){
				 jsonstr=json.toString();
			}
			StatMonthAttendance statData=new StatMonthAttendance();
			statData.setType(SystemConstants.StatMonthAttendance_type_1);
			statData.setGroupuuid("groupuuid");
			statData.setUseruuid(studentuuid);
			statData.setUsername(name);
			statData.setYyyy_mm(yyyy_mm);
			statData.setJsonstr(jsonstr);
			resultList.add(statData);
			if(isSaveStatMonth){
				this.nSimpleHibernateDao.save(statData);
			}
		}
		
		
		return resultList;
	}
	
	/**
	 * 
	 * 
	 * 月报表生成,如果是当月则不存数据库,直接返回前台显示.(下次天数会变)
	 * 以前月份则存数据库保存.
	 * @param yyyy_mm
	 * @param classuuid
	 * @param responseMessage
	 * @return
	 * @throws Exception 
	 */
	public List updateStatMonthByStudent(String yyyy_mm, String classuuid,
			ResponseMessage responseMessage) throws Exception {
Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		
		//1.获取班级有门禁卡的所有用户.
		//startDatestr="2015-09-17 00:00:00";
		
		String sql = "select DISTINCT s1.uuid,s1.name ";
		sql+=" from px_student s1    " ;
		sql+=" where classuuid='"+DbUtils.safeToWhereString(classuuid)+"'";
		sql+=" order by CONVERT( s1.name USING gbk)";
		//student_uuid,cardid,userid,student_name
		Query q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> userlist=q.list();
		
		if(userlist.size()==0){
			 responseMessage.setMessage("选择班级没有学生!");
				return null;
		}
		
		//1.1 验证班级是否存在
		 sql = "SELECT groupuuid from px_class" ;
			sql+=" where uuid='"+DbUtils.safeToWhereString(classuuid)+"'";
			 List<Object[]> group_list = s.createSQLQuery(sql).list();
			String groupuuid=null;
			 if(group_list.size()==0){
				 responseMessage.setMessage("选择班级不存在!");
				 return null;
			 }
			 groupuuid=group_list.get(0)+"";
			 
		//2.获取 一个学校,一个月的,每天最小打卡时间,最大打卡时间.
		
		 sql = "select t1.studentuuid,DATE_FORMAT(t1.sign_time,'%d') as dd";
		sql+=" ,CONCAT(DATE_FORMAT(min(t1.sign_time),'%H:%i'),'-',DATE_FORMAT(max(t1.sign_time),'%H:%i')) as sign_time2" ;
		
		sql+=" from  px_studentsignrecord t1 LEFT JOIN px_student t2 on t1.studentuuid=t2.uuid where t1.studentuuid is not null";
		sql+=" and t2.classuuid='"+DbUtils.safeToWhereString(classuuid)+"' and DATE_FORMAT(t1.sign_time,'%Y-%m')='"+yyyy_mm+"'";
		sql+="GROUP BY  studentuuid, DATE_FORMAT(sign_time,'%Y-%m-%d')  ORDER BY studentuuid ";
		
		//student_uuid,cardid,userid,student_name
		 q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> list=q.list();
		
		Map<String,JSONObject>  jsonmap=new HashMap();
		//3.生成1个月的报表.
		//3.1.生成一个用户的一月数据
		for(Map signrecordMap:list){
			String studentuuid=(String)signrecordMap.get("studentuuid");
			
			JSONObject json=jsonmap.get(studentuuid);
			if(json==null){
				json=new JSONObject();
				jsonmap.put(studentuuid, json);
			}
			// jsonstr;//jsonstr.格式.{"d_01":"13:56-16:56","d_02":"13:56-16:56"}
			String dd=(String)signrecordMap.get("dd");
			json.put("d_"+dd, signrecordMap.get("sign_time2"));
		}
		
		//不是当月则,生成数据保存到数据库.
				boolean isSaveStatMonth=isSaveStatMonth(groupuuid,yyyy_mm);
				
		
		////3.2如果刷卡记录还未清除,则清空这月报表数据重新生成否则不重新生成.
		if(list.size()==0){
			responseMessage.setMessage(yyyy_mm+"月没有刷卡记录.");
			return null;
		}
		else if(isSaveStatMonth){
			 sql = "delete from px_stat_month_attendance where type="+SystemConstants.StatMonthAttendance_type_0;
			sql+=" and classuuid='"+DbUtils.safeToWhereString(classuuid)+"' and yyyy_mm='"+DbUtils.safeToWhereString(yyyy_mm)+"'" ;
			s.createSQLQuery(sql).executeUpdate();
		}
		
		
		
		List resultList=new ArrayList();
		
		//3.3 保存一个用户的一月数据
		for(Map userMap:userlist){
			String studentuuid=(String)userMap.get("uuid");
			String name=(String)userMap.get("name");
			JSONObject json=jsonmap.get(studentuuid);
			String jsonstr=null;
			if(json!=null){
				 jsonstr=json.toString();
			}
			StatMonthAttendance statData=new StatMonthAttendance();
			statData.setType(SystemConstants.StatMonthAttendance_type_0);
			statData.setGroupuuid(groupuuid);
			statData.setClassuuid(classuuid);
			statData.setUseruuid(studentuuid);
			statData.setUsername(name);
			statData.setYyyy_mm(yyyy_mm);
			statData.setJsonstr(jsonstr);
			
			
			resultList.add(statData);
			if(isSaveStatMonth){
				this.nSimpleHibernateDao.save(statData);
			}
		}
		return resultList;
	}
	/**
	 * 查询(老师考勤)月度报表,没有则创建
	 * 生成(老师考勤)月度报表,存入数据库
	 * @param model
	 * @param request
	 * @return
	 */
	public List listStatMonthByTeacher(String yyyy_mm, String groupuuid,
			ResponseMessage responseMessage) {
		List list= (List) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from StatMonthAttendance where type=1 and groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' and yyyy_mm='"+DbUtils.safeToWhereString(yyyy_mm)+"'");
		return  list;
	}
	/**
	 * 查询(Student考勤)月度报表,没有则创建
	 * 生成(Student考勤)月度报表,存入数据库
	 * @param model
	 * @param request
	 * @return
	 */
	public List listStatMonthByStudent(String yyyy_mm, String classuuid,
			ResponseMessage responseMessage) {
		List list= (List) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from StatMonthAttendance where type=0 and  classuuid='"+DbUtils.safeToWhereString(classuuid)+"' and yyyy_mm='"+DbUtils.safeToWhereString(yyyy_mm)+"'" );
		return  list;
	}
	
	/**
	 * 是否生成报表保存到数据库
	 * @param groupuuid
	 * @param yyyy_mm
	 * @param responseMessage
	 * @return
	 */
	public boolean isSaveStatMonth(String groupuuid,String yyyy_mm) {
		
		//当月不生成报表.
		boolean isCurrentMonth=TimeUtils.getCurrentTime("yyyy-MM").equals(yyyy_mm);
		if(isCurrentMonth)return false;
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="select updatetime from px_group_heartbeat where group_uuid='"+DbUtils.safeToWhereString(groupuuid)+"'";
		List list=s.createSQLQuery(sql).list();
		//没有门禁同步心跳,不生成报表.
		if(list.size()==0){
			return false;
		}
		
		
		try {
			Date hearbeatDate=(Date)list.get(0);
			SimpleDateFormat sdf = new SimpleDateFormat(TimeUtils.YYYY_MM_DD_FORMAT);
			//同步心跳大于yyyy_mm,才生成报表.
			return TimeUtils.getFirstDayOfMonth(hearbeatDate).after(sdf.parse(yyyy_mm+"-02"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	
}
