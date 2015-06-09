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
public class RightService extends AbstractServcice {

	/**
	 * 新增权限
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 */
	public Right add(String name, String description,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(name) || name.length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(description) || description.length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (isExitSameRightByname(name)) {
			responseMessage.setMessage("存在相同的权限名，");
			return null;
		}

		Right right = new Right();
		right.setDescription(description);
		right.setName(name);

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
	public Right update(String uuid, String name, String description,
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

		if (isExitSameRightByname(name)) {
			responseMessage.setMessage("存在相同的权限名，");
			return null;
		}

		Right right = (Right) this.nSimpleHibernateDao.getObject(Right.class,
				uuid);
		if (right != null) {
			right.setDescription(description);
			right.setName(name);

			this.nSimpleHibernateDao.getHibernateTemplate().update(right);
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
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from Right where uuid in(?)", uuid);
		else
			this.nSimpleHibernateDao.deleteObjectById(Right.class, uuid);

		return true;
	}

	/**
	 * 查询所有权限
	 * 
	 * @return
	 */
	public List<Right> query() {
		return (List<Right>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from Right", null);

	}

	/**
	 * 权限名是否存在
	 * 
	 * @param company_name
	 * @return
	 */
	private boolean isExitSameRightByname(String name) {
		String attribute = "name";
		Object right = nSimpleHibernateDao.getObjectByAttribute(Right.class,
				attribute, name);

		if (right != null)// 已被占用
			return true;
		else
			return false;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return RightService.class;
	}

}
