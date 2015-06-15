package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.Right;
import com.company.news.entity.User;
import com.company.news.entity.UserClassRelation;
import com.company.news.entity.UserGroupRelation;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.rest.util.TimeUtils;
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
	
	
	/**
	 * 更新班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(ClassRegJsonform classRegJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(classRegJsonform.getName())
				|| classRegJsonform.getName().length() > 45) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}

        //更新班级名字
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate("update PClass set name=? where uuid =?",classRegJsonform.getName(),classRegJsonform.getUuid());

	    //先删除原来数据
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate("delete from UserClassRelation where classuuid =?",classRegJsonform.getUuid());
		
		

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
							"from PClass where groupuuid=?", groupuuid);
	}
	
	
	/**
	 * 查询指定用户相关的班级
	 * 
	 * @return
	 */
	public List<PClass> queryClassByUseruuid(String useruuid) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="";
		Query q = s.createSQLQuery("select {t1.*} from px_userclassrelation t0,px_class {t1} where t0.classuuid={t1}.uuid and t0.useruuid='"+useruuid+"'")
				.addEntity("t1",PClass.class);
		
		return q.list();
			
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
	
	public ClassRegJsonform get(String uuid) throws Exception{
		ClassRegJsonform c=new ClassRegJsonform();
		PClass pclass=(PClass) this.nSimpleHibernateDao.getObjectById(PClass.class, uuid);
		if(pclass==null)
			return c;
		
		BeanUtils.copyProperties(c, pclass);
		
		List<UserClassRelation> l=(List<UserClassRelation>) this.nSimpleHibernateDao.getHibernateTemplate().find("from UserClassRelation where classuuid=?", uuid);
		
		String headTeacher="";
		String teacher="";
		for(UserClassRelation u:l)
		{
			if(u.getType().intValue()==class_usertype_head)
				headTeacher+=(u.getUseruuid()+",");
			else
				teacher+=(u.getUseruuid()+",");			
		}
		
		c.setHeadTeacher(PxStringUtil.StringDecComma(headTeacher) );
		c.setTeacher(PxStringUtil.StringDecComma(teacher));
		
		return c;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

}
