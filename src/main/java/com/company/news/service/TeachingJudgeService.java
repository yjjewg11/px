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
	public List query(String groupuuid, String type,
			String date_start, String date_end) {

		if (StringUtils.isBlank(date_start)) {
			logger.error("date_start can't null");
			return null;
		}

		if (StringUtils.isBlank(date_end)) {
			logger.error("date_end can't null");
			return null;
		}

		/*
		 * // 查询获取当前机构的所有教师 List<User4Q> list =
		 * userinfoService.getUserByGroupuuid(groupuuid, null); if (list !=
		 * null) {
		 * 
		 * //返回的LIST List<TeachingJudgeVo> teachingJudgeVos=new
		 * LinkedList<TeachingJudgeVo>();
		 */

		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
//		String sql = "select {t0.*} from px_teacherjudge {t0},px_usergrouprelation t1 where {t0}.teacheruuid=t1.useruuid ";
//		sql += " and t1.groupuuid='" + DbUtils.safeToWhereString(groupuuid) + "'";
//		sql += " and {t0}.create_time between '" + DbUtils.safeToWhereString(date_start) + "' and '"
//				+ DbUtils.safeToWhereString(date_end) + "'";

		String sql = "select t0.* from px_teacherjudge t0,px_usergrouprelation t1 where t0.teacheruuid=t1.useruuid ";
		sql += " and t1.groupuuid='" + DBUtil.safeToWhereString(groupuuid) + "'";
		
		sql += " and t0.create_time>="+DBUtil.stringToDateYMDByDBType(date_start);
		sql += " and t0.create_time<="+DBUtil.stringToDateYMD23_59_59ByDBType(date_end);

		 PaginationData pData=new PaginationData();
		 pData.setPageSize(1000);
		 
		 PageQueryResult resutlt=this.nSimpleHibernateDao.findMapByPageForSqlNoTotal(sql, pData);
		List list= resutlt.getData();
//		return this.warpVoList(q.list());
		this.warpMapList(list);
		
		/*
		 * Map<String, TeacherJudge> mappedTeacherJudge = new HashMap<String,
		 * TeacherJudge>(); for (TeacherJudge teacherJudge : tlist) {
		 * mappedTeacherJudge.put(teacherJudge.getTeacheruuid(), teacherJudge);
		 * }
		 * 
		 * // 组合返回VO for(User4Q user4Q:list){ TeachingJudgeVo vo=new
		 * TeachingJudgeVo(); vo.setUser4Q(user4Q);
		 * vo.setTeacherJudge(mappedTeacherJudge.get(user4Q.getUuid()));
		 * teachingJudgeVos.add(vo); }
		 */

		return list;

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
