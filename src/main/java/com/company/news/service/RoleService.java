package com.company.news.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.ProjectProperties;
import com.company.news.entity.Group;
import com.company.news.entity.Right;
import com.company.news.entity.Role;
import com.company.news.entity.User;
import com.company.news.entity.UserGroupRelation;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.TimeUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.UserInfoReturn;
import com.company.plugin.security.LoginLimit;
import com.company.web.listener.SessionListener;

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
	 */
	public Role add(String name, String description,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(name) || name.length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(description) || description.length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (isExitSameRoleByname(name)) {
			responseMessage.setMessage("存在相同的角色名，");
			return null;
		}

		Role role = new Role();
		role.setDescription(description);
		role.setName(name);
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
	 */
	public Role update(String uuid, String name, String description,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(name) || name.length() > 45) {
			responseMessage.setMessage("角色名不能为空！，且长度不能超过45位！");
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

		if (isExitSameRoleByname(name)) {
			responseMessage.setMessage("存在相同的角色名，");
			return null;
		}

		Role role = (Role) this.nSimpleHibernateDao.getObject(Role.class, uuid);
		if (role != null) {
			role.setDescription(description);
			role.setName(name);

			this.nSimpleHibernateDao.getHibernateTemplate().update(role);
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
					"delete from Right where uuid in(?)", uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from RoleRightRelation where roleuuid in(?)", uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(Right.class, uuid);
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
	public List<Right> query() {
		return (List<Right>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from role", null);

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
	private boolean isExitSameRoleByname(String name) {
		String attribute = "name";
		Object role = nSimpleHibernateDao.getObjectByAttribute(Role.class,
				attribute, name);

		if (role != null)// 已被占用
			return true;
		else
			return false;

	}
}
