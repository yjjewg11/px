package com.company.news.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.PxCourse;
import com.company.news.entity.PxCourse4Q;
import com.company.news.entity.PxCourseForUpdate;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.PxCourseJsonform;
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
public class PxCourseService extends AbstractService {
	private static final String model_name = "培训机构对外发布";
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public PxCourse add(PxCourseJsonform pxCourseJsonform,
			ResponseMessage responseMessage,SessionUserInfoInterface user) throws Exception {
		if(this.validateRequireByRegJsonform(pxCourseJsonform.getTitle(),"课程标题", responseMessage))
		return null;
		if(this.validateRequireByRegJsonform(pxCourseJsonform.getGroupuuid(),"培训机构", responseMessage))
			return null;

		PxCourse pxCourse = new PxCourse();
		BeanUtils.copyProperties(pxCourse, pxCourseJsonform);
		
		if(Integer.valueOf(0).equals(pxCourse.getAge_min()))pxCourse.setAge_min(null);
		if(Integer.valueOf(0).equals(pxCourse.getAge_max()))pxCourse.setAge_max(null);
		
		
		pxCourse.setUpdatetime(TimeUtils.getCurrentTimestamp());
		
		pxCourse.setUpdate_useruuid(user.getUuid());
		pxCourse.setCt_stars(SystemConstants.Ct_stars_init);
		pxCourse.setCt_stars_count(0l);
		pxCourse.setCt_study_students(0l);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(pxCourse);

		return pxCourse;
	}
	
	
	/**
	 * 更新班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public PxCourseForUpdate update(PxCourseJsonform pxCourseJsonform,
			ResponseMessage responseMessage,SessionUserInfoInterface user) throws Exception {
		if(this.validateRequireByRegJsonform(pxCourseJsonform.getTitle(),"课程标题", responseMessage))
			return null;
		if(this.validateRequireByRegJsonform(pxCourseJsonform.getGroupuuid(),"培训机构", responseMessage))
			return null;
	
		
		PxCourseForUpdate pxCourse=(PxCourseForUpdate) this.nSimpleHibernateDao.getObject(PxCourseForUpdate.class, pxCourseJsonform.getUuid());
		
		BeanUtils.copyProperties(pxCourse, pxCourseJsonform);
		pxCourse.setUpdatetime(TimeUtils.getCurrentTimestamp());
		pxCourse.setUpdate_useruuid(user.getUuid());
		

		if(Integer.valueOf(0).equals(pxCourse.getAge_min()))pxCourse.setAge_min(null);
		if(Integer.valueOf(0).equals(pxCourse.getAge_max()))pxCourse.setAge_max(null);
		
		
		this.nSimpleHibernateDao.getHibernateTemplate().update(pxCourse);
		return pxCourse;
	}


	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public List<PxCourse> query(String begDateStr, String endDateStr,
			String classuuid) {
	

		Date begDate = TimeUtils.string2Timestamp(null, begDateStr);

		Date endDate = TimeUtils.string2Timestamp(null, endDateStr);

		return (List<PxCourse>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from PxCourse where classuuid=? and plandate<=? and plandate >=?  order by plandate asc",
						classuuid, endDate, begDate);
	}

	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public PxCourse get(String uuid) {
		PxCourse t = (PxCourse) this.nSimpleHibernateDao.getObjectById(
				PxCourse.class, uuid);
		warpVo(t);
		
		return t;

	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public List<Object> warpVoList(List<Object> list){
		for(Object o:list){
			if(o instanceof PxCourse4Q){
				warpVo((PxCourse4Q)o);
			}else if(o instanceof PxCourse){
				warpVo((PxCourse)o);
			}
		}
		return list;
	}
		public PxCourse4Q warpVo(PxCourse4Q o){
			this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
			o.setLogo(PxStringUtil.imgSmallUrlByUuid(o.getLogo()));
			return o;
		}
		
		public PxCourse warpVo(PxCourse o){
			this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
			o.setLogo(PxStringUtil.imgSmallUrlByUuid(o.getLogo()));
			return o;
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
			
			responseMessage.setMessage("只能删除一条课程");
			return false;
//			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
//					"delete from PxCourse where uuid in(?)", uuid);

		}
		
		String hql="select count(*) from PxClass where courseuuid='"+uuid+"'";
		String total= this.nSimpleHibernateDao.getHibernateTemplate().find(hql).get(0).toString();
		if(!"0".equals(total)){
			responseMessage.setMessage("有关联班级,不能删除.关联班级共"+total);
			return false;
		}
		this.nSimpleHibernateDao.deleteObjectById(PxCourse.class, uuid);

		return true;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return null;
	}


	public PageQueryResult queryByPage(String groupuuid, PaginationData pData) {
		
		Session session=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql=" SELECT t1.age_min,t1.age_max,t1.uuid,t1.type,t1.title,t1.address,t1.schedule,t1.fees,t1.discountfees,t1.status,t1.updatetime,t1.ct_stars,t1.ct_study_students,t2.count";
		sql+=" FROM px_pxcourse t1 ";
		sql+=" LEFT JOIN  px_count t2 on t1.uuid=t2.ext_uuid ";
		sql+=" where   t1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		sql += " order by CONVERT( t1.title USING gbk) ";
		
	
		
		String countsql="SELECT count(*) from px_pxcourse t1";
		countsql+=" where   t1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";

		Query  query =session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForQueryTotal(query, countsql, pData);
		
		
		sql="select courseuuid,count(uuid) from px_pxclass where groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		sql+=" group by courseuuid";
		List<Object[]> listCount=session.createSQLQuery(sql).list();
		Map tmpMap=new HashMap();
		for(Object[] obj:listCount ){
			tmpMap.put(obj[0], obj[1]);
		}
		List<Map> resultList=pageQueryResult.getData();
		for(Map map:resultList ){
			String uuid=(String)map.get("uuid");
			Object class_count=tmpMap.get(uuid);
			if(class_count==null)class_count="0";
			map.put("class_count", class_count);
		}
		
//		warpVoList(pageQueryResult.getData());
		return pageQueryResult;
	}
	
	public List listForCache(String groupuuid) {
		String sql = "select uuid,title from px_pxcourse where  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		sql += " order by CONVERT( title USING gbk) ";
		Query  query =this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession().createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		return query.list();
	}
	
	/**
	 * 减少培训课程计算
	 * @param courseuuid
	 */
	public void update_minusPxcourseStudentCount(String courseuuid) {
		String sql = "update px_pxcourse set ct_study_students=ct_study_students-1 where uuid='" + courseuuid + "'";
		this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory()
				.getCurrentSession().createSQLQuery(sql).executeUpdate();
	}
	
	/**
	 * 增加培训课程计算
	 * @param courseuuid
	 */
	public void addPxcourseStudentCount(String courseuuid) {
		String sql = "update px_pxcourse set ct_study_students=ct_study_students+1 where uuid='" + courseuuid + "'";
		this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory()
				.getCurrentSession().createSQLQuery(sql).executeUpdate();
	}

}
