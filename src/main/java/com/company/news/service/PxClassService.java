package com.company.news.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.PClass;
import com.company.news.entity.PxClass;
import com.company.news.entity.User;
import com.company.news.entity.UserClassRelation;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.PxClassRegJsonform;
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
			ResponseMessage responseMessage, User user,
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
