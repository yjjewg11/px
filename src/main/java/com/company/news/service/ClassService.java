package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
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
public class ClassService extends AbstractServcice {
	// 20150610 去掉对用户表的TYPE定义，默认都为0
	public static final int class_usertype_head = 1;// 班主任
	public static final int class_usertype_teacher = 0;// 老师类型

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
			responseMessage.setMessage("groupuuid不能为空！");
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
				u.setType(class_usertype_head);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		if (StringUtils.isNotBlank(classRegJsonform.getTeacher())) {
			String[] teachers = classRegJsonform.getTeacher().split(",");
			for (String s : teachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(pClass.getUuid());
				u.setUseruuid(s);
				u.setType(class_usertype_teacher);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		return true;
	}
	/*
	 * 
	 * 判断是否是班级的班主任老师
	 */
	public boolean isheadteacher(String user_uuids,String classuuid){
		String hql="select uuid from UserClassRelation where type=? and classuuid=? and useruuid in("+DBUtil.stringsToWhereInValue(user_uuids)+")";
		List list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql, class_usertype_head,classuuid);
		if(list.size()>0)return true;
		return false;
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
			ResponseMessage responseMessage,User user, HttpServletRequest request) throws Exception {
		if (StringUtils.isBlank(classRegJsonform.getName())
				|| classRegJsonform.getName().length() > 45) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}
		
		PClass obj = (PClass)nSimpleHibernateDao.getObject(PClass.class,classRegJsonform.getUuid());
		//班级所在学校切换是,代理云,只能切换到其他学校一次
		if(obj.getGroupuuid()!=null&&!obj.getGroupuuid().equals(classRegJsonform.getGroupuuid())){
			//不允许重其他学校切换到代理平台
			if(SystemConstants.Group_uuid_wjd.equals(classRegJsonform.getGroupuuid())){
				responseMessage.setMessage("不能修改,不能从其他幼儿园切换到云代理幼儿园!");
				return false;
			}
		}
		//如果 是更新,只有班主任和管理员可以进行修改,
			boolean b1=this.isheadteacher(user.getUuid(), classRegJsonform.getUuid());
			if(!b1){
				
				if(!b1&&RightUtils.hasRight(RightConstants.AD_class_m,request)){
					responseMessage.setMessage("不能修改,不是班主任或者管理员");
					return false;
				}
				responseMessage.setMessage("不能修改,不是班主任或者管理员");
				return false;
			}

			obj.setName(classRegJsonform.getName());
			obj.setGroupuuid(classRegJsonform.getGroupuuid());
			this.nSimpleHibernateDao.save(obj);
			//更新学生学校.
			if(obj.getGroupuuid()!=null&&!obj.getGroupuuid().equals(classRegJsonform.getGroupuuid())){
				this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update Student set  groupuuid=? where classuuid=?",
				classRegJsonform.getGroupuuid(),classRegJsonform.getUuid());
				
				this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
						"update StudentContactRealation set  groupuuid=? where class_uuid=?",
						classRegJsonform.getGroupuuid(),classRegJsonform.getUuid());
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
				u.setType(class_usertype_head);
				this.nSimpleHibernateDao.getHibernateTemplate().save(u);
			}
		}

		if (StringUtils.isNotBlank(classRegJsonform.getTeacher())) {
			String[] teachers = classRegJsonform.getTeacher().split(",");
			for (String s : teachers) {
				UserClassRelation u = new UserClassRelation();
				u.setClassuuid(classRegJsonform.getUuid());
				u.setUseruuid(s);
				u.setType(class_usertype_teacher);
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
		if (StringUtils.isBlank(groupuuid))
			return (List<PClass>) this.nSimpleHibernateDao
					.getHibernateTemplate().find("from PClass", null);
		else
			return (List<PClass>) this.nSimpleHibernateDao
					.getHibernateTemplate().find(
							"from PClass where groupuuid=? ", groupuuid);
	}

	/**
	 * 查询指定用户相关的班级
	 * 
	 * @return
	 */
	public List queryClassByUseruuid(String useruuid) {
		
		return (List<PClass>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from PClass where uuid in (select classuuid from UserClassRelation where   useruuid=?) order by create_time desc", useruuid);
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
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from PClass where uuid in(?)", uuid);
			this.nSimpleHibernateDao
					.getHibernateTemplate()
					.bulkUpdate(
							"delete from UserClassRelation where classuuid in(?)",
							uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(PClass.class, uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from UserClassRelation where classuuid =?", uuid);
		}

		return true;
	}

	public ClassRegJsonform get(String uuid) throws Exception {
		ClassRegJsonform c = new ClassRegJsonform();
		PClass pclass = (PClass) this.nSimpleHibernateDao.getObjectById(
				PClass.class, uuid);
		if (pclass == null)
			return c;

		BeanUtils.copyProperties(c, pclass);

		List<UserClassRelation> l = (List<UserClassRelation>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from UserClassRelation where classuuid=?", uuid);

		String headTeacher = "";
		String teacher = "";
		String headTeacher_name = "";
		String teacher_name = "";
		for (UserClassRelation u : l) {
			User user = (User) CommonsCache.get(u.getUseruuid(),User.class);
			if (user != null) {
				if (u.getType().intValue() == class_usertype_head) {

					headTeacher += (u.getUseruuid() + ",");
					headTeacher_name += (((User) CommonsCache.get(u.getUseruuid(),User.class))
							.getName() + ",");

				} else {
					teacher += (u.getUseruuid() + ",");
					teacher_name += (((User)CommonsCache.get(u.getUseruuid(),User.class))
							.getName() + ",");
				}
			}
		}

		c.setHeadTeacher(PxStringUtil.StringDecComma(headTeacher));
		c.setTeacher(PxStringUtil.StringDecComma(teacher));
		c.setHeadTeacher_name(PxStringUtil.StringDecComma(headTeacher_name));
		c.setTeacher_name(PxStringUtil.StringDecComma(teacher_name));
		return c;
	}
	
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private PClass warpVo(PClass o,String cur_user_uuid){
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		try {

			List<UserClassRelation> l = (List<UserClassRelation>) this.nSimpleHibernateDao
					.getHibernateTemplate().find(
							"from UserClassRelation where classuuid=?", o.getUuid());

			String headTeacher_name = "";
			String teacher_name = "";
			for (UserClassRelation u : l) {
				User user = (User) CommonsCache.get(u.getUseruuid(),User.class);
				if (user != null) {
					if (u.getType().intValue() == class_usertype_head) {
						headTeacher_name += (((User) CommonsCache.get(u.getUseruuid(),User.class))
								.getName() + ",");
					} else {
						teacher_name += (((User)CommonsCache.get(u.getUseruuid(),User.class))
								.getName() + ",");
					}
				}
			}
			o.setHeadTeacher_name(PxStringUtil.StringDecComma(headTeacher_name));
			o.setTeacher_name(PxStringUtil.StringDecComma(teacher_name));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return o;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	public List<PClass> warpVoList(List<PClass> list,String cur_user_uuid){
		for(PClass o:list){
			warpVo(o,cur_user_uuid);
		}
		return list;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

}
