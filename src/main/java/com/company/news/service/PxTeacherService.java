package com.company.news.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.PxCourseCache;
import com.company.news.entity.PxTeacher;
import com.company.news.entity.PxTeacher4Q;
import com.company.news.entity.UserPxCourseRelation;
import com.company.news.jsonform.PxTeacherJsonform;
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
public class PxTeacherService extends AbstractService {
	private static final String model_name = "培训教师模块";

	public boolean save(PxTeacherJsonform userTeacherJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (StringUtils.isBlank(userTeacherJsonform.getUseruuid())) {
			responseMessage.setMessage("Useruuid不能为空！");
			return false;
		}
		
		if (userTeacherJsonform.getUseruuid().indexOf(",")>-1) {
			responseMessage.setMessage("只能选择一个老师");
			return false;
		}
		PxTeacher ut=null;
		if(StringUtils.isNotBlank(userTeacherJsonform.getUuid())){
			ut=(PxTeacher) this.nSimpleHibernateDao.getHibernateTemplate().get(PxTeacher.class, userTeacherJsonform.getUuid());
			if(ut==null){
				responseMessage.setMessage("更新记录不存在");
				return false;
			}
		}
		
		if(ut==null){
			ut = new PxTeacher();
			userTeacherJsonform.setUuid(null);
		}
		userTeacherJsonform.setImg(PxStringUtil.imgUrlToUuid(userTeacherJsonform.getImg()));
		BeanUtils.copyProperties(ut, userTeacherJsonform);
		ut.setUpdate_time(TimeUtils.getCurrentTimestamp());
		
		
		
		// 先删除原来数据
				this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
						"delete from UserPxCourseRelation where useruuid =? and groupuuid=?",
						userTeacherJsonform.getUseruuid(),userTeacherJsonform.getGroupuuid());

				if (StringUtils.isNotBlank(userTeacherJsonform.getCourseuuid())) {
					String[] courseArr = userTeacherJsonform.getCourseuuid().split(
							",");
					String course_title="";
					for (String s : courseArr) {
						UserPxCourseRelation u = new UserPxCourseRelation();
						u.setGroupuuid(userTeacherJsonform.getGroupuuid());
						u.setCourseuuid(s);
						u.setUseruuid(userTeacherJsonform.getUuid());
						this.nSimpleHibernateDao.getHibernateTemplate().save(u);
						
						PxCourseCache courseDB = (PxCourseCache) CommonsCache
								.get(u.getCourseuuid(), PxCourseCache.class);
						if (courseDB != null) {
								course_title += (courseDB.getTitle() + ",");
						}
						
					}
					course_title=PxStringUtil.StringDecComma(course_title);
					
					ut.setCourse_title(PxStringUtil.getSubString(course_title, 45));
				}
				
		this.nSimpleHibernateDao.getHibernateTemplate().saveOrUpdate(ut);

		return true;
	}


	/**
	 * 
	 * @param groupuuid
	 * @param classuuid
	 * @param name
	 * @param pData
	 * @return
	 */
	public PageQueryResult queryByPage(String groupuuid,String name, PaginationData pData) {
		String hql = "from PxTeacher4Q where 1=1";
		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(name))
			hql += " and  name  like '%" + name + "%' ";

		hql += " order by groupuuid, convert(name, 'gbk') ";

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHql(hql, pData);
		this.warpVoList(pageQueryResult.getData());

		return pageQueryResult;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	protected PxTeacher warpVo(PxTeacher o) {
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		o.setImg(PxStringUtil.imgUrlByUuid(o.getImg()));
		if(StringUtils.isNotBlank(o.getUseruuid())){
			
			Session s = this.nSimpleHibernateDao.getHibernateTemplate()
					.getSessionFactory().openSession();
			String sql=" select group_concat(t1.title) as course_title,group_concat(t1.uuid) as course_uuids from px_pxcourse  t1 ";
			sql+=" LEFT JOIN  px_userpxcourserelation t2 on t2.courseuuid=t1.uuid ";
			sql+=" where t2.useruuid='"+o.getUseruuid()+"'";
			Query q = s.createSQLQuery(sql);
			q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
			List<Map> list=q.list();
			
			if(list.size()>0){
				Map m=list.get(0);
				o.setCourse_title((String)m.get("course_title"));
				o.setCourse_uuids((String)m.get("course_uuids"));
			}
//			
//			List<UserPxCourseRelation> l = (List<UserPxCourseRelation>) this.nSimpleHibernateDao
//					.getHibernateTemplate().find(
//							"from UserPxCourseRelation where useruuid=?",
//							o.getUseruuid());
//
//			String tmp_uuids = "";
//			String tmp_names = "";
//			for (UserPxCourseRelation u : l) {
//				PxCourseCache courseDB = (PxCourseCache) CommonsCache
//						.get(u.getCourseuuid(), PxCourseCache.class);
//				if (courseDB != null) {
//						tmp_uuids += (u.getUseruuid() + ",");
//						tmp_names += (courseDB.getTitle() + ",");
//				}
//			}
//			o.setCourse_title(tmp_names);
//			o.setCourse_uuids(tmp_uuids);
		}
		
		return o;
	}
	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	protected PxTeacher4Q warpVo(PxTeacher4Q o) {
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		o.setImg(PxStringUtil.imgUrlByUuid(o.getImg()));
		return o;
	}

//	/**
//	 * vo输出转换
//	 * 
//	 * @param list
//	 * @return
//	 */
	protected List warpVoList(List list) {
		for (Object o : list) {
			if(o instanceof PxTeacher4Q)warpVo((PxTeacher4Q)o);
			else if(o instanceof PxTeacher)warpVo((PxTeacher)o);
			
		}
		return list;
	}
	/**
	 *获取用户-老师详细信息.
	 * 
	 * @return
	 */
	public PxTeacher get(String uuid) {
		
		PxTeacher o=(PxTeacher) this.nSimpleHibernateDao.getHibernateTemplate().get(PxTeacher.class, uuid);
		this.warpVo(o);
		return o;
	}



	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}




}
