package com.company.news.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
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
	public boolean updateStatMonthByTeacher(String yyyy_mm, String groupuuid,ResponseMessage responseMessage) throws Exception {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		
		//1.获取学校有门禁卡的所有用户.
		//startDatestr="2015-09-17 00:00:00";
		
		String sql = "select DISTINCT s1.uuid,s1.name ";
		sql+=" from px_user s1 inner join px_studentbind b2 on  b2.userid=s1.uuid   " ;
		sql+=" where b2.cardid is not null and b2.groupuuid='"+groupuuid+"'";
		sql+="order by CONVERT( s1.name USING gbk)";
		
		//student_uuid,cardid,userid,student_name
		Query q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> userlist=q.list();
		
		
		//2.获取 一个学校,一个月的,每天最小打卡时间,最大打卡时间.
		
		 sql = "select studentuuid,DATE_FORMAT(sign_time,'%d') as dd";
		sql+=" ,CONCAT(DATE_FORMAT(min(sign_time),'%H:%i'),'-',DATE_FORMAT(max(sign_time),'%H:%i')) as sign_time2 " ;
		
		sql+=" from  px_studentsignrecord where studentuuid is not null ";
		sql+=" and groupuuid='"+groupuuid+"' and DATE_FORMAT(sign_time,'%Y-%m')='"+yyyy_mm+"'";
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
		if(list.size()==0){
			responseMessage.setMessage(yyyy_mm+"月没有刷卡记录.");
			return false;
		}else{
			 sql = "delete from px_stat_month_attendance where type="+SystemConstants.StatMonthAttendance_type_1;
			sql+=" and groupuuid='"+groupuuid+"' and yyyy_mm='"+yyyy_mm+"'" ;
			s.createSQLQuery(sql).executeUpdate();
		}
		
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
			
			this.nSimpleHibernateDao.save(statData);
		}
		
		
		return true;
	}
	
	/**
	 * 
	 * @param yyyy_mm
	 * @param classuuid
	 * @param responseMessage
	 * @return
	 * @throws Exception 
	 */
	public boolean updateStatMonthByStudent(String yyyy_mm, String classuuid,
			ResponseMessage responseMessage) throws Exception {
Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		
		//1.获取班级有门禁卡的所有用户.
		//startDatestr="2015-09-17 00:00:00";
		
		String sql = "select DISTINCT s1.uuid,s1.name ";
		sql+=" from px_pxstudent s1    " ;
		sql+=" where classuuid='"+classuuid+"'";
		
		//student_uuid,cardid,userid,student_name
		Query q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> userlist=q.list();
		
		
		//1.1 验证班级是否存在
		 sql = "SELECT groupuuid from px_class" ;
			sql+=" where uuid='"+classuuid+"'";
			 List<Object[]> group_list = s.createSQLQuery(sql).list();
			String groupuuid=null;
			 if(group_list.size()==0){
				 responseMessage.setMessage("选择班级不存在!");
					return false;
			 }
			 groupuuid=(group_list.get(0)[0])+"";
			 
		//2.获取 一个学校,一个月的,每天最小打卡时间,最大打卡时间.
		
		 sql = "select t1.studentuuid,DATE_FORMAT(t1.sign_time,'%d') as dd";
		sql+=" ,CONCAT(DATE_FORMAT(min(t1.sign_time),'%H:%i'),'-',DATE_FORMAT(max(t1.sign_time),'%H:%i')) as sign_time2" ;
		
		sql+=" from  px_studentsignrecord t1 LEFT JOIN px_student t2 on t1.studentuuid=t2.uuid where t1.studentuuid is not null";
		sql+=" and t2.classuuid='"+classuuid+"' and DATE_FORMAT(t1.sign_time,'%Y-%m')='"+yyyy_mm+"'";
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
		
		
		
		////3.2如果刷卡记录还未清除,则清空这月报表数据重新生成否则不重新生成.
		if(list.size()==0){
			responseMessage.setMessage(yyyy_mm+"月没有刷卡记录.");
			return false;
		}else{
			 sql = "delete from px_stat_month_attendance where type="+SystemConstants.StatMonthAttendance_type_0;
			sql+=" and classuuid='"+classuuid+"' and yyyy_mm='"+yyyy_mm+"'" ;
			s.createSQLQuery(sql).executeUpdate();
		}
		
		
		
		
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
			statData.setClassuuid("classuuid");
			statData.setUseruuid(studentuuid);
			statData.setUsername(name);
			statData.setYyyy_mm(yyyy_mm);
			statData.setJsonstr(jsonstr);
			
			this.nSimpleHibernateDao.save(statData);
		}
		return true;
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
				.find("from StatMonthAttendance where type=1 and groupuuid='"+groupuuid+"' and yyyy_mm='"+yyyy_mm+"'");
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
				.find("from StatMonthAttendance where type=0 and  classuuid='"+classuuid+"' and yyyy_mm='"+yyyy_mm+"'" );
		return  list;
	}
}
