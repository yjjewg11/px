package com.company.news.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.PClass;
import com.company.news.entity.PxClass;
import com.company.news.entity.UserClassRelation;
import com.company.news.entity.UserForJsCache;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.PxClassRegJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator 培训机构班级 px_pxclass
 */
@Service
public class PxClassService extends AbstractClassService {
	private static final String model_name = "培训机构班级模块";

	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(PxClassRegJsonform pxclassRegJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (this.validateRequireAndLengthByRegJsonform(
				pxclassRegJsonform.getName(), 45, "班级名", responseMessage)
				|| this.validateRequireByRegJsonform(
						pxclassRegJsonform.getGroupuuid(), "机构名称",
						responseMessage)
				|| this.validateRequireByRegJsonform(
						pxclassRegJsonform.getCourseuuid(), "关联课程",
						responseMessage)) {
			return false;
		}

		PxClass pxClass = new PxClass();

		BeanUtils.copyProperties(pxClass, pxclassRegJsonform);
		pxClass.setCreate_time(TimeUtils.getCurrentTimestamp());
		pxClass.setIsdisable(SystemConstants.Class_isdisable_0);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(pxClass);

		if (StringUtils.isNotBlank(pxclassRegJsonform.getHeadTeacher())) {
			String[] headTeachers = pxclassRegJsonform.getHeadTeacher().split(
					",");
			for (String s : headTeachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(pxClass.getUuid());
				u.setUseruuid(s);
				u.setType(SystemConstants.class_usertype_head);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		if (StringUtils.isNotBlank(pxclassRegJsonform.getTeacher())) {
			String[] teachers = pxclassRegJsonform.getTeacher().split(",");
			for (String s : teachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(pxClass.getUuid());
				u.setUseruuid(s);
				u.setType(SystemConstants.class_usertype_teacher);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
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
	public boolean update(PxClassRegJsonform pxclassRegJsonform,
			ResponseMessage responseMessage, SessionUserInfoInterface user,
			HttpServletRequest request) throws Exception {
		if (this.validateRequireAndLengthByRegJsonform(
				pxclassRegJsonform.getName(), 45, "班级名", responseMessage)) {
			return false;
		}

		PxClass obj = (PxClass) nSimpleHibernateDao.getObject(PxClass.class,
				pxclassRegJsonform.getUuid());
		// 班级所在学校切换是,代理云,只能切换到其他学校一次
		boolean isChangeGroupuuid = false;
		String oldGroupuuid = obj.getGroupuuid();
//		if(SystemConstants.Class_isdisable_1.equals(obj.getIsdisable())){
//			responseMessage.setMessage("结业班级,不允许修改.");
//			return false;
//		}
		if (obj.getGroupuuid() != null
				&& !obj.getGroupuuid()
						.equals(pxclassRegJsonform.getGroupuuid())) {
			// 不允许重其他学校切换到代理平台
			if (SystemConstants.Group_uuid_wjd.equals(pxclassRegJsonform
					.getGroupuuid())) {
				responseMessage.setMessage("不能修改,不能从其他幼儿园切换到云代理幼儿园!");
				return false;
			}
			isChangeGroupuuid = true;
		}
		boolean flag = false;
		// 如果 是更新,只有班主任和管理员可以进行修改,
		flag = RightUtils.hasRight(obj.getGroupuuid(),
				RightConstants.PX_class_m, request);
		if (!flag) {
			flag = this.isheadteacher(user.getUuid(),
					pxclassRegJsonform.getUuid());
		}
		if (!flag) {
			responseMessage.setMessage("不能修改,不是班主任或者管理员");
			return false;
		}
		obj.setName(pxclassRegJsonform.getName());
		obj.setGroupuuid(pxclassRegJsonform.getGroupuuid());
		obj.setCourseuuid(pxclassRegJsonform.getCourseuuid());
		
		if(obj.getIsdisable()==null){
			obj.setIsdisable(SystemConstants.Class_isdisable_0);
		}
		this.nSimpleHibernateDao.save(obj);
		// 更新学生学校.
		if (isChangeGroupuuid) {
			// 根据班级的学校uuid
			this.relUpdate_classChangeGroup(obj, oldGroupuuid);
		}
		// 先删除原来数据
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from UserClassRelation where classuuid =?",
				pxclassRegJsonform.getUuid());

		if (StringUtils.isNotBlank(pxclassRegJsonform.getHeadTeacher())) {
			String[] headTeachers = pxclassRegJsonform.getHeadTeacher().split(
					",");
			for (String s : headTeachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(pxclassRegJsonform.getUuid());
				u.setUseruuid(s);
				u.setType(SystemConstants.class_usertype_head);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		if (StringUtils.isNotBlank(pxclassRegJsonform.getTeacher())) {
			String[] teachers = pxclassRegJsonform.getTeacher().split(",");
			for (String s : teachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(pxclassRegJsonform.getUuid());
				u.setUseruuid(s);
				u.setType(SystemConstants.class_usertype_teacher);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		return true;
	}

	/**
	 * 班级切换学校时
	 * 
	 * @param uuid
	 * @param name
	 * @param img
	 */
	private void relUpdate_classChangeGroup(PxClass obj, String oldGroupuuid) {
		this.logger
				.info("relUpdate_classChangeGroup,obj uuid=" + obj.getUuid());
		// 根据班级的学校uuid
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update PxStudent set  groupuuid=? where groupuuid=?",
				obj.getGroupuuid(), oldGroupuuid);
		// 更新班级互动学校uuid
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update ClassNews set  groupuuid=? where classuuid=?",
				obj.getGroupuuid(), obj.getUuid());
		// 更新家长学生联系吧
		this.nSimpleHibernateDao
				.getHibernateTemplate()
				.bulkUpdate(
						"update StudentContactRealation set  groupuuid=? where class_uuid=?",
						obj.getGroupuuid(), obj.getUuid());

	}

	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public List<PxClass> query(String groupuuid) {
		List l = new ArrayList<PxClass>();
		if (StringUtils.isBlank(groupuuid))
			l = (List<PxClass>) this.nSimpleHibernateDao.getHibernateTemplate()
					.find("from PxClass", null);
		else
			l = (List<PxClass>) this.nSimpleHibernateDao
					.getHibernateTemplate()
					.find("from PxClass where groupuuid=? order by  convert(name, 'gbk') ",
							groupuuid);

		warpVoList(l);
		return l;
	}
	
	/**
	 * 获取班级信息(包含学生统计,教学计划统计)
	 * 
	 * @return
	 */
	public PageQueryResult listStat(String groupuuid,String isdisable,String courseuuid,PaginationData pData) {
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		//学生数量.教学计划数量,课程名,(班级信息)
		String sql = "SELECT count( distinct t3.uuid) as student_count,count( distinct t1.uuid) as teachingplan,t2.title as course_title,t0.* from   (select * from px_pxclass ";
				
				sql+= " where groupuuid ='"+groupuuid+"'";
				if(StringUtils.isNotBlank(isdisable)){
					sql+= " and isdisable ="+isdisable;
				}
				if(StringUtils.isNotBlank(courseuuid)){
					sql+= " and courseuuid ="+courseuuid;
				}
				sql+= " limit "+pData.getStartIndex()+","+pData.getPageSize();
				sql+= " )  t0 LEFT JOIN px_pxteachingplan t1 on t0.uuid=t1.classuuid ";
				sql+= " left join px_pxcourse t2 on t0.courseuuid=t2.uuid  ";
				sql+= " LEFT JOIN px_pxstudentpxclassrelation t3 on t0.uuid=t3.class_uuid  GROUP BY t0.uuid";
				Query q = s.createSQLQuery(sql);
				q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
				
				PageQueryResult pageQueryResult =new PageQueryResult(pData.getPageSize(), pData.getPageNo(),  q.list(), 99999);
				
				List<Map> list=pageQueryResult.getData();
						
				 if(pData.getPageNo()==1){//效率优化,只有第一页查询时,返回总数,其他的时候不在查询总数
				      if (list.size() < pData.getPageSize()) {// 小于当前页,就不用单独计算总数.
				    	  pageQueryResult.setTotalCount(list.size());
				      }else{
				    	  String sql_count = "SELECT count(*) from px_pxclass ";
				    	  sql_count+= " where groupuuid ='"+groupuuid+"'";
				    	  if(StringUtils.isBlank(isdisable))		
				    		  	sql_count+= " and isdisable ="+isdisable;
				    	  
				    	  pageQueryResult.setTotalCount(Long.valueOf(s.createSQLQuery(sql_count).uniqueResult()
				    	            .toString()));
				      }
				 }
				for (Map o : list) {
					warpMap(o);
				}
				
		return pageQueryResult;
	}
	
	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	protected Map warpMap(Map o) {
		try {

			List<UserClassRelation> l = (List<UserClassRelation>) this.nSimpleHibernateDao
					.getHibernateTemplate().find(
							"from UserClassRelation where classuuid=?",
							o.get("uuid"));

			String headTeacher_name = "";
			String teacher_name = "";
			for (UserClassRelation u : l) {
				if (u.getType().intValue() == SystemConstants.class_usertype_head) {
					headTeacher_name += (((UserForJsCache) CommonsCache.get(
							u.getUseruuid(), UserForJsCache.class)).getName() + ",");
				} else {
					teacher_name += (((UserForJsCache) CommonsCache.get(
							u.getUseruuid(), UserForJsCache.class)).getName() + ",");
				}
			}
			o.put("headTeacher_name", PxStringUtil.StringDecComma(headTeacher_name));
			o.put("teacher_name", PxStringUtil.StringDecComma(teacher_name));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return o;
	}

	/**
	 * 查询指定用户相关的班级
	 * 
	 * @return
	 */
	public List queryClassByUseruuid(String useruuid) {

		List l = (List<PClass>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from PxClass where uuid in (select classuuid from UserClassRelation where useruuid=?) order by create_time desc",
						useruuid);
		warpVoList(l);
		return l;
	}

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean delete(String uuid, ResponseMessage responseMessage,
			HttpServletRequest request) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}

		PxClass obj = (PxClass) this.nSimpleHibernateDao.getObject(
				PxClass.class, uuid);
		if (obj == null) {
			responseMessage.setMessage("没有该数据!");
			return false;
		}
		if (!RightUtils.hasRight(obj.getGroupuuid(), RightConstants.PX_class_m,
				request)) {
			responseMessage.setMessage(RightConstants.Return_msg);
			return false;
		}
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		Object o = s.createSQLQuery(
				"select count(*) from px_pxstudentpxclassrelation where class_uuid='"
						+ uuid + "'").uniqueResult();
		if (Long.valueOf(o.toString()) > 0) {
			responseMessage.setMessage("该班级有学生不能删除.");
			return false;
		}
		this.nSimpleHibernateDao.delete(obj);
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from UserClassRelation where classuuid =?", uuid);

		return true;
	}
	public List listForCache(String courseuuid) {
		String hql = "select uuid,name from px_pxclass where  courseuuid in(" + DBUtil.stringsToWhereInValue(courseuuid) + ")";
		hql += " order by CONVERT( name USING gbk)  ";
		Query  query =this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession().createSQLQuery(hql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		return query.list();
	}
	/**
	 * 获取班级
	 * 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public PxClass get(String uuid) throws Exception {
		PxClass pclass = (PxClass) this.nSimpleHibernateDao.getObjectById(
				PxClass.class, uuid);
		if (pclass == null)
			return null;

		warpVo(pclass);
		return pclass;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return PxClass.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
