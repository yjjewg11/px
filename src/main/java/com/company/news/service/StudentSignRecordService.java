package com.company.news.service;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.company.news.entity.DoorRecord;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;

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


}
