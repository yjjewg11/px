package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Announcements;
import com.company.news.entity.ClassNews;
import com.company.news.entity.ClassNewsReply;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.Right;
import com.company.news.entity.User;
import com.company.news.entity.UserClassRelation;
import com.company.news.entity.UserGroupRelation;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.vo.ResponseMessage;

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
			ResponseMessage responseMessage, User user,
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
		flag = RightUtils.hasRight(obj.getGroupuuid(),
				RightConstants.KD_class_m, request);
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
		List l = new ArrayList<PClass>();

		if (StringUtils.isBlank(groupuuid))
			l = (List<PClass>) this.nSimpleHibernateDao.getHibernateTemplate()
					.find("from PClass", null);
		else
			l = (List<PClass>) this.nSimpleHibernateDao
					.getHibernateTemplate()
					.find("from PClass where groupuuid=? order by  convert(name, 'gbk') ",
							groupuuid);
		// 抓取教师信息
		warpVoList(l);
		return l;

	}

	/**
	 * 查询指定用户相关的班级
	 * 
	 * @return
	 */
	public List queryClassByUseruuid(String useruuid) {
		List l = (List<PClass>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from PClass where uuid in (select classuuid from UserClassRelation where   useruuid=?) order by create_time desc",
						useruuid);
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
		if (!RightUtils.hasRight(obj.getGroupuuid(), RightConstants.KD_class_m,
				request)) {
			responseMessage.setMessage(RightConstants.Return_msg);
			return false;
		}
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		Object o = s.createSQLQuery(
				"select count(*) from px_student where classuuid='" + uuid
						+ "'").uniqueResult();
		if (Long.valueOf(o.toString()) > 0) {
			responseMessage.setMessage("该班级有学生不能删除.");
			return false;
		}
		this.nSimpleHibernateDao.deleteObjectById(PClass.class, uuid);
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from UserClassRelation where classuuid =?", uuid);

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

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
