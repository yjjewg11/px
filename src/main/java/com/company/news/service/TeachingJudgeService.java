package com.company.news.service;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Message;
import com.company.news.entity.TeacherJudge;
import com.company.news.entity.User4Q;

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
	public List<TeacherJudge> query(String groupuuid, String type, String date_start,String date_end) {
		

		if (StringUtils.isBlank(date_start)) {
			logger.error("date_start can't null");
			return null;
		}
		
		if (StringUtils.isBlank(date_end)) {
			logger.error("date_end can't null");
			return null;
		}

/*		// 查询获取当前机构的所有教师
		List<User4Q> list = userinfoService.getUserByGroupuuid(groupuuid, null);
		if (list != null) {

			//返回的LIST
			List<TeachingJudgeVo> teachingJudgeVos=new LinkedList<TeachingJudgeVo>();*/
			
			List<TeacherJudge> tlist = this.queryTeacherJudgeByGroupuuid(
					groupuuid, date_start,date_end);
/*			Map<String, TeacherJudge> mappedTeacherJudge = new HashMap<String, TeacherJudge>();
			for (TeacherJudge teacherJudge : tlist) {
				mappedTeacherJudge.put(teacherJudge.getTeacheruuid(),
						teacherJudge);
			}

			// 组合返回VO
			for(User4Q user4Q:list){
				TeachingJudgeVo vo=new TeachingJudgeVo();
				vo.setUser4Q(user4Q);
				vo.setTeacherJudge(mappedTeacherJudge.get(user4Q.getUuid()));
				teachingJudgeVos.add(vo);
			}*/
			
			
			return tlist;


	}

	/**
	 * 查询指定机构的某月教师评价
	 * 
	 * @return
	 */
	private List<TeacherJudge> queryTeacherJudgeByGroupuuid(String groupuuid,
			String date_start,String date_end) {

		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select {t0.*} from px_teacherjudge {t0},px_usergrouprelation t1 where {t0}.teacheruuid=t1.useruuid ";
		sql += " and t1.groupuuid='" + groupuuid + "'";
		sql += " and {t0}.create_time between '"
				+ date_start + "' and '"
				+ date_end + "'";

		Query q = s.createSQLQuery(sql).addEntity("t0", TeacherJudge.class);
		return this.warpVoList(q.list());
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return TeacherJudge.class;
	}
	
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public TeacherJudge warpVo(TeacherJudge o){
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		User4Q user=(User4Q)CommonsCache.get(o.getTeacheruuid(), User4Q.class);
		if(user!=null)
		o.setTeacher_name(user.getName());
		return o;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public List<TeacherJudge> warpVoList(List<TeacherJudge> list){
		for(TeacherJudge o:list){
			warpVo(o);
		}
		return list;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
