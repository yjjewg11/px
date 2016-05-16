package com.company.news.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.company.news.cache.CommonsCache;
import com.company.news.cache.redis.UserRedisCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.AbstractStudent;
import com.company.news.entity.TeacherJudge;
import com.company.news.entity.User4Q;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class TeachingJudgeService extends AbstractService {
	private static final String model_name = "教师评价模块";
	private static Logger logger = Logger.getLogger(TeachingJudgeService.class);

	/**
	 * 查询指定机构的教师评价
	 * 
	 * @return
	 */
	
	public PageQueryResult query(String groupuuid, String type,
			String date_start, String date_end, PaginationData pData) {

		if (StringUtils.isBlank(date_start)) {
			logger.error("date_start can't null");
			return null;
		}

		if (StringUtils.isBlank(date_end)) {
			logger.error("date_end can't null");
			return null;
		}


		
		String sql = "select t0.teacheruuid,t0.type,t0.content,t0.create_user,t0.create_time from px_teacherjudge t0,px_usergrouprelation t1 where t0.teacheruuid=t1.useruuid";
		
		if (StringUtils.isNotBlank(groupuuid))
			sql += " and t1.groupuuid='" + DBUtil.safeToWhereString(groupuuid) + "'";
		if (StringUtils.isNotBlank(date_start))
			sql += " and t0.create_time>="+DBUtil.stringToDateYMDByDBType(date_start);
		if (StringUtils.isNotBlank(date_end))
			sql += " and t0.create_time<="+DBUtil.stringToDateYMD23_59_59ByDBType(date_end);
		

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findMapByPageForSqlNoTotal(sql, pData);
		this.warpMapList(pageQueryResult.getData());

		return pageQueryResult;

	}

	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List warpMapList(List<Map> list) {
		UserRedisCache.warpListMapByUserCache(list, "teacheruuid", "teacher_name", null);
		return list;
	}
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return TeacherJudge.class;
	}

//	/**
//	 * vo输出转换
//	 * 
//	 * @param list
//	 * @return
//	 */
//	public TeacherJudge warpVo(TeacherJudge o) {
//		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
//		User4Q user = (User4Q) CommonsCache.get(o.getTeacheruuid(),
//				User4Q.class);
//		if (user != null)
//			o.setTeacher_name(user.getName());
//		return o;
//	}

	/**
	 * 教师评价统计
	 * 
	 * @return
	 */
	public List<Object[]> getTeachingJudgeCountByGroup(String groupuuid,
			String begDateStr, String endDateStr) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		Query q = s
				.createSQLQuery("SELECT ug.useruuid,tj.type,count(tj.type) FROM pxdb.px_usergrouprelation ug "
						+ "left join px_teacherjudge tj on ug.useruuid=tj.teacheruuid where ug.groupuuid='"
						+ DbUtils.safeToWhereString(groupuuid)
						+ "' and create_time<="
						+ DBUtil.stringToDateByDBType(endDateStr)
						+ " and create_time>="
						+ DBUtil.stringToDateByDBType(begDateStr)
						+ " group by tj.teacheruuid,tj.type");

		return q.list();
	}

//	/**
//	 * vo输出转换
//	 * 
//	 * @param list
//	 * @return
//	 */
//	public List<TeacherJudge> warpVoList(List<TeacherJudge> list) {
//		for (TeacherJudge o : list) {
//			warpVo(o);
//		}
//		return list;
//	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
