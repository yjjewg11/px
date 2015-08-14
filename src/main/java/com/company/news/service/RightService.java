package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.company.news.ProjectProperties;
import com.company.news.entity.Right;
import com.company.news.entity.User;
import com.company.news.jsonform.RightJsonform;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class RightService extends AbstractServcice {
	
	/**
	 * 
	 * @param user
	 * @return
	 */
	public List getRightListByUser(User user){
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().getCurrentSession();

		List rightList = s
				.createSQLQuery(
						"select t1.rightname from px_roleuserrelation t0,px_rolerightrelation t1 where  t0.roleuuid=t1.roleuuid and t0.useruuid='"
								+ user.getUuid() + "'").list();

		// 测试数据,拥有所有权限
		if ("true".equals(ProjectProperties.getProperty("Debug_All_role",
				"false"))) {
			this.logger.warn("调试模式下面,用户有所有角色权限.");
			rightList = s.createSQLQuery("select name from px_right").list();
		}

		return rightList;
	}

	/**
	 * 新增权限
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public Right add(RightJsonform rightJsonform,
			ResponseMessage responseMessage) throws IllegalAccessException, InvocationTargetException {
		if (StringUtils.isBlank(rightJsonform.getName()) || rightJsonform.getName().length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(rightJsonform.getDescription()) || rightJsonform.getDescription().length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (isExitSameRightByname(rightJsonform.getName(),null)) {
			responseMessage.setMessage("存在相同的权限名，");
			return null;
		}
		
		if (rightJsonform.getType()==null) {
			responseMessage.setMessage("type不能为空！");
			return null;
		}

		Right right = new Right();
		BeanUtils.copyProperties(right, rightJsonform);

		this.nSimpleHibernateDao.getHibernateTemplate().save(right);
		return right;

	}

	/**
	 * 更新权限
	 * 
	 * @param uuid
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public Right update(RightJsonform rightJsonform,
			ResponseMessage responseMessage) throws IllegalAccessException, InvocationTargetException {
		if (StringUtils.isBlank(rightJsonform.getName()) || rightJsonform.getName().length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(rightJsonform.getDescription()) || rightJsonform.getDescription().length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}


		if (isExitSameRightByname(rightJsonform.getName(),rightJsonform.getUuid())) {
			responseMessage.setMessage("存在相同的权限名，");
			return null;
		}
		
		if (rightJsonform.getType()==null) {
			responseMessage.setMessage("type不能为空！");
			return null;
		}

		Right right = (Right) this.nSimpleHibernateDao.getObject(Right.class,
				rightJsonform.getUuid());
		if (right != null) {
			BeanUtils.copyProperties(right, rightJsonform);

			this.nSimpleHibernateDao.getHibernateTemplate().update(right);
		}else{
			responseMessage.setMessage("更新对象不存在，");
		}

		return right;

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
					"delete from Right where uuid in(?)", uuid);
			this.nSimpleHibernateDao
					.getHibernateTemplate()
					.bulkUpdate(
							"delete from RoleRightRelation where rightuuid in(?)",
							uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(Right.class, uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from RoleRightRelation where rightuuid =?", uuid);
		}

		return true;
	}

	/**
	 * 查询所有权限
	 * 
	 * @return
	 */
	public List<Right> query(String type) {
		String hql="from Right";
		if(StringUtils.isNotBlank(type))
			hql+=" where type="+type;
		hql+=" order by name asc";
		return (List<Right>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find(hql, null);

	}

	/**
	 * 权限名是否存在
	 * 
	 * @param company_name
	 * @return
	 */
	private boolean isExitSameRightByname(String name, String uuid) {
		String attribute = "name";
		Right right = (Right) nSimpleHibernateDao.getObjectByAttribute(
				Right.class, attribute, name);

		if (right != null)// 已被占用
		{
			// 判断的是自身
			if (StringUtils.isNotEmpty(uuid) && right.getUuid().equals(uuid))
				return false;
			else
				return true;
		} else
			return false;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return RightService.class;
	}

}
