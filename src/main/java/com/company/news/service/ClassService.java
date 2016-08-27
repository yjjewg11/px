package com.company.news.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.entity.PClass;
import com.company.news.entity.User;
import com.company.news.entity.User4Q;
import com.company.news.entity.UserClassRelation;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.json.JSONUtils;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class ClassService extends AbstractClassService {
	private static final String model_name = "幼儿园班级模块";

	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(ClassRegJsonform classRegJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(classRegJsonform.getName())
				|| classRegJsonform.getName().length() > 45) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}

		if (StringUtils.isBlank(classRegJsonform.getGroupuuid())) {
			responseMessage.setMessage("必须选择一个学校");
			return false;
		}

		PClass pClass = new PClass();

		BeanUtils.copyProperties(pClass, classRegJsonform);

		pClass.setCreate_time(TimeUtils.getCurrentTimestamp());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(pClass);

		if (StringUtils.isNotBlank(classRegJsonform.getHeadTeacher())) {
			String[] headTeachers = classRegJsonform.getHeadTeacher()
					.split(",");
			for (String s : headTeachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(pClass.getUuid());
				u.setUseruuid(s);
				u.setType(SystemConstants.class_usertype_head);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		if (StringUtils.isNotBlank(classRegJsonform.getTeacher())) {
			String[] teachers = classRegJsonform.getTeacher().split(",");
			for (String s : teachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(pClass.getUuid());
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
	public boolean update(ClassRegJsonform classRegJsonform,
			ResponseMessage responseMessage, SessionUserInfoInterface user,
			HttpServletRequest request) throws Exception {
		if (StringUtils.isBlank(classRegJsonform.getName())
				|| classRegJsonform.getName().length() > 45) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}

		PClass obj = (PClass) nSimpleHibernateDao.getObject(PClass.class,
				classRegJsonform.getUuid());
		// 班级所在学校切换是,代理云,只能切换到其他学校一次
		boolean isChangeGroupuuid = false;
		if (obj.getGroupuuid() != null
				&& !obj.getGroupuuid().equals(classRegJsonform.getGroupuuid())) {
			// 不允许重其他学校切换到代理平台
			if (SystemConstants.Group_uuid_wjd.equals(classRegJsonform
					.getGroupuuid())) {
				responseMessage.setMessage("不能修改,不能从其他幼儿园切换到云代理幼儿园!");
				return false;
			}
			isChangeGroupuuid = true;
		}
		boolean flag = false;
		// 如果 是更新,只有班主任和管理员可以进行修改,
		
		String right=RightConstants.KD_class_m;
		if(SessionListener.isPXLogin(request)){
			right=RightConstants.PX_class_m;
		}
		
		flag = RightUtils.hasRight(obj.getGroupuuid(),
				right, request);
		if (!flag) {
			flag = this.isheadteacher(user.getUuid(),
					classRegJsonform.getUuid());
		}
		if (!flag) {
			responseMessage.setMessage("不能修改,不是班主任或者管理员");
			return false;
		}
		obj.setName(classRegJsonform.getName());
		obj.setGroupuuid(classRegJsonform.getGroupuuid());
		this.nSimpleHibernateDao.save(obj);
		// 更新学生学校.
		if (isChangeGroupuuid) {
			// 根据班级的学校uuid
			this.relUpdate_classChangeGroup(obj);
		}
		// 先删除原来数据
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from UserClassRelation where classuuid =?",
				classRegJsonform.getUuid());

		if (StringUtils.isNotBlank(classRegJsonform.getHeadTeacher())) {
			String[] headTeachers = classRegJsonform.getHeadTeacher()
					.split(",");
			for (String s : headTeachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(classRegJsonform.getUuid());
				u.setUseruuid(s);
				u.setType(SystemConstants.class_usertype_head);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		if (StringUtils.isNotBlank(classRegJsonform.getTeacher())) {
			String[] teachers = classRegJsonform.getTeacher().split(",");
			for (String s : teachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(classRegJsonform.getUuid());
				u.setUseruuid(s);
				u.setType(SystemConstants.class_usertype_teacher);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		return true;
	}



	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public List<PClass> query(String groupuuid) {
		
		PaginationData pData=new PaginationData();
		pData.setPageSize(100);//防止大数据
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select DISTINCT {t1.*} from px_class {t1} ";
		if (StringUtils.isNotBlank(groupuuid)) {
			sql += " where {t1}.groupuuid in("
					+ DBUtil.stringsToWhereInValue(groupuuid) + ")";
			sql += " order by CONVERT( {t1}.name USING gbk)";
		}else{
			sql += " order by {t1}.groupuuid,{t1}.isdisable,CONVERT( {t1}.name USING gbk)";
		}
		
		SQLQuery q = s.createSQLQuery(sql).addEntity("t1", PClass.class);

		List l= this.nSimpleHibernateDao.findByPageForSqlNoTotal(q, pData).getData();
//		
//		String hql=null;
//		if (StringUtils.isBlank(groupuuid))
//			hql="from PClass  order by groupuuid, convert(name, 'gbk') ";
//		else
//			hql="from PClass where groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"' order by  convert(name, 'gbk') ";
//		
//		List l=this.nSimpleHibernateDao.findByPaginationToHqlNoTotal(hql, pData).getData();
		// 抓取教师信息
		warpVoList(l);
		return l;

	}
	
	

	/**
	 * 查询所有班级(未毕业)
	 * 
	 * @return
	 */
	public List<PClass> queryUnGraduationOfStatic(String groupuuid) {
		
		PaginationData pData=new PaginationData();
		pData.setPageSize(100);//防止大数据
		
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select DISTINCT {t1.*} from px_class {t1} ";
		sql+= " where {t1}.isdisable=0";
		
		if (StringUtils.isNotBlank(groupuuid)) {
			sql += " and {t1}.groupuuid in("
					+ DBUtil.stringsToWhereInValue(groupuuid) + ")";
		}
		sql += " order by {t1}.groupuuid,CONVERT( {t1}.name USING gbk)";
		
		SQLQuery q = s.createSQLQuery(sql).addEntity("t1", PClass.class);

		List l= this.nSimpleHibernateDao.findByPageForSqlNoTotal(q, pData).getData();
		// 抓取教师信息
//		warpVoList(l);
		return l;

	}
	/**
	 * 查询所有班级(已毕业)
	 * 
	 * @return
	 */
	public List<PClass> queryGraduationOfStatic(String groupuuid,Integer year) {
		
		PaginationData pData=new PaginationData();
		pData.setPageSize(100);//防止大数据
		
		Date startDate=TimeUtils.getFirstDayOfYear(year);
		Date endDate=TimeUtils.getFirstDayOfYear(year+1);
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select DISTINCT {t1.*} from px_class {t1} ";
		sql+= " where {t1}.isdisable=1";
		sql+= " and ( {t1}.disable_time<"+DBUtil.stringToDateByDBType(TimeUtils.getDateTimeString(endDate))+" and {t1}.disable_time>="+DBUtil.stringToDateByDBType(TimeUtils.getDateTimeString(startDate))+")";	
		
		if (StringUtils.isNotBlank(groupuuid)) {
			sql += " and {t1}.groupuuid in("
					+ DBUtil.stringsToWhereInValue(groupuuid) + ")";
		}
		sql += " order by {t1}.groupuuid,CONVERT( {t1}.name USING gbk)";
		
		SQLQuery q = s.createSQLQuery(sql).addEntity("t1", PClass.class);

		List l= this.nSimpleHibernateDao.findByPageForSqlNoTotal(q, pData).getData();
		// 抓取教师信息
//		warpVoList(l);
		return l;

	}

	/**
	 * 查询指定用户相关的班级
	 * 
	 * @return
	 */
	public List queryClassByUseruuid(String useruuid) {
		PaginationData pData=new PaginationData();
		pData.setPageSize(100);//防止大数据
		
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "select DISTINCT {t1.*} from px_class {t1} ";
		sql += " where {t1}.uuid in("
				+ "select classuuid from px_userclassrelation where   useruuid='"+DbUtils.safeToWhereString(useruuid)+ "')";
		sql += " order by {t1}.isdisable, CONVERT( {t1}.name USING gbk)";
		
		SQLQuery q = s.createSQLQuery(sql).addEntity("t1", PClass.class);

		List l= this.nSimpleHibernateDao.findByPageForSqlNoTotal(q, pData).getData();
//		
//		
//		String hql="from PClass where uuid in (select classuuid from UserClassRelation where   useruuid='"+DbUtils.safeToWhereString(useruuid)+"') order by convert(name, 'gbk')";
//		List l=this.nSimpleHibernateDao.findByPaginationToHqlNoTotal(hql, pData).getData();
		// 抓取教师信息
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

		PClass obj = (PClass) this.nSimpleHibernateDao.getObject(PClass.class,
				uuid);
		if (obj == null) {
			responseMessage.setMessage("没有该数据!");
			return false;
		}
		
		boolean flag = false;
		// 如果 是更新,只有班主任和管理员可以进行修改,
		String right=RightConstants.KD_class_m;
		if(SessionListener.isPXLogin(request)){
			right=RightConstants.PX_class_m;
		}
		
		flag = RightUtils.hasRight(obj.getGroupuuid(),
				right, request);
		SessionUserInfoInterface user = SessionListener.getUserInfoBySession(request);
		
		if (!flag) {
			flag = this.isheadteacher(user.getUuid(),
					obj.getUuid());
		}
		if (!flag) {
			responseMessage.setMessage("不能删除,不是班主任或者管理员");
			return false;
		}
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		Object o = s.createSQLQuery(
				"select count(*) from px_student where classuuid='" +DbUtils.safeToWhereString( uuid)
						+ "'").uniqueResult();
		
		
		if (Long.valueOf(o.toString()) > 0) {
			String rightdel=RightConstants.KD_class_del;
			if(SessionListener.isPXLogin(request)){
				rightdel=RightConstants.KD_class_del;
			}
			flag = RightUtils.hasRight(obj.getGroupuuid(),
					rightdel, request);
			if(!flag){
				responseMessage.setMessage("该班级有学生不能删除.");
				return false;
			}
			String desc = JSONUtils.getJsonString(obj);
			this.addLog("delete_class", obj.getName()+",student num="+o.toString(), desc, request);
		}
		this.nSimpleHibernateDao.deleteObjectById(PClass.class, uuid);
		
		//删除学生与家长关系表.
		Integer relsut=this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from StudentContactRealation where student_uuid in( select uuid from Student where  classuuid =?) ", uuid);
		this.addLog("delete_class", obj.getName()+",StudentContactRealation num="+relsut, relsut+"", request);
		relsut=this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from UserClassRelation where classuuid =?", uuid);
		this.addLog("delete_class", obj.getName()+",UserClassRelation num="+relsut, relsut+"", request);
		//删除学生.
		relsut=this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from Student where classuuid =?", uuid);
		this.addLog("delete_class", obj.getName()+",Student num="+relsut, relsut+"", request);

		return true;
	}

	public PClass get(String uuid) throws Exception {
		PClass pclass = (PClass) this.nSimpleHibernateDao.getObjectById(
				PClass.class, uuid);
		if (pclass == null)
			return null;

		warpVo(pclass);
		return pclass;
	}




	
	/**
	 * 班级切换学校时
	 * 
	 * @param uuid
	 * @param name
	 * @param img
	 */
	private void relUpdate_classChangeGroup(PClass obj) {
		this.logger
				.info("relUpdate_classChangeGroup,obj uuid=" + obj.getUuid());
		// 根据班级的学校uuid
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update Student set  groupuuid=? where classuuid=?",
				obj.getGroupuuid(), obj.getUuid());
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
	 * 结业
	 * 
	 * @param classuuid
	 * @param responseMessage
	 * @return
	 */
	@Override
	public boolean updateDisable(String classuuid, ResponseMessage responseMessage) {
		if (this.validateRequireByRegJsonform(classuuid, "classuuid",
				responseMessage))
			return false;
		
		PClass pClass=(PClass)this.nSimpleHibernateDao.getObject(getEntityClass(), classuuid);
		pClass.setDisable_time(TimeUtils.getCurrentTimestamp());
		pClass.setIsdisable(SystemConstants.Class_isdisable_1);
		pClass.setName(TimeUtils.getCurrentTime("yyyy")+"届"+pClass.getName());

		return true;
	}
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return PClass.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
