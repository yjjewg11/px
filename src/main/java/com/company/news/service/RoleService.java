package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Right;
import com.company.news.entity.Role;
import com.company.news.entity.RoleRightRelation;
import com.company.news.jsonform.RoleJsonform;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class RoleService extends AbstractServcice {
	/**
	 * 新增角色
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public Role add(RoleJsonform roleJsonform,
			ResponseMessage responseMessage) throws IllegalAccessException, InvocationTargetException {
		if (StringUtils.isBlank(roleJsonform.getName()) || roleJsonform.getName().length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(roleJsonform.getDescription()) || roleJsonform.getDescription().length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (isExitSameRoleByname(roleJsonform.getName(),null)) {
			responseMessage.setMessage("存在相同的角色名，");
			return null;
		}
		
		if (roleJsonform.getType()==null) {
			responseMessage.setMessage("type不能为空！");
			return null;
		}

		Role role = new Role();
		BeanUtils.copyProperties(role, roleJsonform);
		role.setCreate_time(TimeUtils.getCurrentTimestamp());
		

		this.nSimpleHibernateDao.getHibernateTemplate().save(role);
		return role;

	}

	/**
	 * 更新角色
	 * 
	 * @param uuid
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public Role update(RoleJsonform roleJsonform,
			ResponseMessage responseMessage) throws IllegalAccessException, InvocationTargetException {
		if (StringUtils.isBlank(roleJsonform.getName()) || roleJsonform.getName().length() > 45) {
			responseMessage.setMessage("角色名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(roleJsonform.getDescription()) || roleJsonform.getDescription().length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}


		if (isExitSameRoleByname(roleJsonform.getName(),roleJsonform.getUuid())) {
			responseMessage.setMessage("存在相同的角色名，");
			return null;
		}
		
		if (roleJsonform.getType()==null) {
			responseMessage.setMessage("type不能为空！");
			return null;
		}

		Role role = (Role) this.nSimpleHibernateDao.getObject(Role.class, roleJsonform.getUuid());
		if (role != null) {
			BeanUtils.copyProperties(role, roleJsonform);
			this.nSimpleHibernateDao.getHibernateTemplate().update(role);
		}else{
			responseMessage.setMessage("更新对象不存在，");
		}

		return role;

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
					"delete from Role where uuid in(?)", uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from RoleRightRelation where roleuuid in(?)", uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(Role.class, uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from RoleRightRelation where roleuuid =?", uuid);
		}

		return true;
	}

	/**
	 * 查询所有权限
	 * 
	 * @return
	 */
	public List<Role> query(String type) {
		String hql="from Role";
		if(StringUtils.isNotBlank(type))
			hql+=" where type="+type;
		
		return (List<Role>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find(hql, null);

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return RoleService.class;
	}

	/**
	 * 角色名是否存在
	 * 
	 * @param company_name
	 * @return
	 */
	private boolean isExitSameRoleByname(String name, String uuid) {
		String attribute = "name";
		Role role = (Role) nSimpleHibernateDao.getObjectByAttribute(Role.class,
				attribute, name);

		if (role != null)// 已被占用
		{
			// 判断的是自身
			if (StringUtils.isNotEmpty(uuid) && role.getUuid().equals(uuid))
				return false;
			else
				return true;

		} else
			return false;

	}

	/**
	 * 根据角色ID取权限列表
	 * 
	 * @param uuid
	 */
	public List<RoleRightRelation> getRightByRoleuuid(String uuid) {
		if (StringUtils.isBlank(uuid))
			return null;

		return (List<RoleRightRelation>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from RoleRightRelation where roleuuid=?", uuid);

	}

	/**
	 * 
	 * @param roleuuid
	 * @param rightuuids
	 */
	public boolean updateRoleRightRelation(String roleuuid, String rightuuids,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(roleuuid)) {
			responseMessage.setMessage("roleuuid不能为空");
			return false;
		}

		// 删除原有角色权限
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from RoleRightRelation where roleuuid =?", roleuuid);

		if (StringUtils.isNotBlank(rightuuids)) {
			String[] str = PxStringUtil.StringDecComma(rightuuids).split(",");
			for (String s : str) {
				RoleRightRelation r = new RoleRightRelation();
				Right right=(Right) CommonsCache.get(s,Right.class);
				if(right!=null)
				{
				r.setRightname(right.getName());
				r.setRightuuid(s);
				r.setRoleuuid(roleuuid);
				this.nSimpleHibernateDao.getHibernateTemplate().save(r);
				}
			}

		}
		return true;
	}

}
