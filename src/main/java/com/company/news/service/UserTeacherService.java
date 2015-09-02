package com.company.news.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.ProjectProperties;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Group;
import com.company.news.entity.User;
import com.company.news.entity.UserGroupRelation;
import com.company.news.entity.UserTeacher;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.jsonform.UserTeacherJsonform;
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
public class UserTeacherService extends AbstractServcice {
	private static final String model_name = "教师模块";
	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean save(UserTeacherJsonform userTeacherJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (StringUtils.isBlank(userTeacherJsonform.getUseruuid())) {
			responseMessage.setMessage("Useruuid不能为空！");
			return false;
		}

		UserTeacher ut = (UserTeacher) this.nSimpleHibernateDao.getObjectByAttribute(
				UserTeacher.class, "useruuid",
				userTeacherJsonform.getUseruuid());
		
		if(ut==null)
			ut = new UserTeacher();

		BeanUtils.copyProperties(ut, userTeacherJsonform);

		try {
			if (StringUtils.isNotBlank(userTeacherJsonform.getBirthdayStr()))
				ut.setBirthday(TimeUtils.string2Timestamp(null,
						userTeacherJsonform.getBirthdayStr()));
		} catch (Exception e) {
			e.printStackTrace();
		}

		this.nSimpleHibernateDao.getHibernateTemplate().saveOrUpdate(ut);

		return true;
	}



	/**
	 * 查询指定机构的用户列表
	 * 
	 * @return
	 */
	public UserTeacher get(String useruuid) {
		return (UserTeacher) this.nSimpleHibernateDao.getObjectByAttribute(
				UserTeacher.class, "useruuid",useruuid);
	}



	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}



}
