package com.company.news.service;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.entity.Right;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class RightService extends AbstractServcice {

	/**
	 * 新增权限
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 */
	public Right add(String name, String description,String type,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(name) || name.length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(description) || description.length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (isExitSameRightByname(name,null)) {
			responseMessage.setMessage("存在相同的权限名，");
			return null;
		}
		
		if (StringUtils.isBlank(type)) {
			responseMessage.setMessage("type不能为空！");
			return null;
		}

		Right right = new Right();
		right.setDescription(description);
		right.setName(name);
		right.setType(Integer.parseInt(type));

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
	 */
	public Right update(String uuid, String name, String description,String type,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(name) || name.length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(description) || description.length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(uuid)) {
			responseMessage.setMessage("ID不能为空！");
			return null;
		}

		if (isExitSameRightByname(name,uuid)) {
			responseMessage.setMessage("存在相同的权限名，");
			return null;
		}
		
		if (StringUtils.isBlank(type)) {
			responseMessage.setMessage("type不能为空！");
			return null;
		}

		Right right = (Right) this.nSimpleHibernateDao.getObject(Right.class,
				uuid);
		if (right != null) {
			right.setDescription(description);
			right.setName(name);
			right.setType(Integer.parseInt(type));

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
		
		return (List<Right>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from Right", null);

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
