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
public class GroupService extends AbstractServcice {
    public static final int Group_type_default = 0;//类型：1，培训机构，0:幼儿园
	@Autowired
	private UserinfoService userinfoService;

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean reg(GroupRegJsonform groupRegJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(groupRegJsonform.getBrand_name())||groupRegJsonform.getBrand_name().length()>45) {
			responseMessage.setMessage("品牌名不能为空！，且长度不能超过45位！");
			return false;
		}
		
		if (StringUtils.isBlank(groupRegJsonform.getCompany_name())||groupRegJsonform.getCompany_name().length()>45) {
			responseMessage.setMessage("机构名不能为空！，且长度不能超过45位！");
			return false;
		}
		
		if (StringUtils.isBlank(groupRegJsonform.getMap_point())) {
			responseMessage.setMessage("位置信息不能为空！");
			return false;
		}
		
		if (StringUtils.isBlank(groupRegJsonform.getAddress())||groupRegJsonform.getAddress().length()>64) {
			responseMessage.setMessage("联系地址不能为空！，且长度不能超过64位！");
			return false;
		}
		
		if (StringUtils.isBlank(groupRegJsonform.getLink_tel())) {
			responseMessage.setMessage("联系方式不能为空！");
			return false;
		}
		

		
		// 机构名是否存在
		if (isExitSameUserByCompany_name(groupRegJsonform.getCompany_name())) {
			responseMessage.setMessage("机构名已被注册！");
			return false;
		}
		
		Group group = new Group();

		BeanUtils.copyProperties(group, groupRegJsonform);
		group.setType(Group_type_default);
		group.setCreate_time(TimeUtils.getCurrentTimestamp());

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(group);
		
		//设置保存后的机构UUID
		groupRegJsonform.setGroup_uuid(group.getUuid());
		//注册对应的管理员用户
		groupRegJsonform.setType(userinfoService.USER_type_group);
		
		if(!userinfoService.reg(groupRegJsonform, responseMessage))
		{
          //关联管理员账号注册失败，回滚之前操作
			throw new RuntimeException(responseMessage.getMessage());
			//return false;
		}
		
		return true;
	}
	
	/**
	 * 增加机构
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(GroupRegJsonform groupRegJsonform,
			ResponseMessage responseMessage,String useruuid) throws Exception {
		if (StringUtils.isBlank(groupRegJsonform.getBrand_name())||groupRegJsonform.getBrand_name().length()>45) {
			responseMessage.setMessage("品牌名不能为空！，且长度不能超过45位！");
			return false;
		}
		
		if (StringUtils.isBlank(groupRegJsonform.getCompany_name())||groupRegJsonform.getCompany_name().length()>45) {
			responseMessage.setMessage("机构名不能为空！，且长度不能超过45位！");
			return false;
		}
		
		if (StringUtils.isBlank(groupRegJsonform.getMap_point())) {
			responseMessage.setMessage("位置信息不能为空！");
			return false;
		}
		
		if (StringUtils.isBlank(groupRegJsonform.getAddress())||groupRegJsonform.getAddress().length()>64) {
			responseMessage.setMessage("联系地址不能为空！，且长度不能超过64位！");
			return false;
		}
		
		if (StringUtils.isBlank(groupRegJsonform.getLink_tel())) {
			responseMessage.setMessage("联系方式不能为空！");
			return false;
		}
		

		
		// 机构名是否存在
		if (isExitSameUserByCompany_name(groupRegJsonform.getCompany_name())) {
			responseMessage.setMessage("机构名已被注册！");
			return false;
		}
		
		Group group = new Group();

		BeanUtils.copyProperties(group, groupRegJsonform);
		group.setType(Group_type_default);
		group.setCreate_time(TimeUtils.getCurrentTimestamp());

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(group);
		
		//设置保存后的机构UUID
		groupRegJsonform.setGroup_uuid(group.getUuid());
		//保存用户机构关联表
		UserGroupRelation userGroupRelation=new UserGroupRelation();
		userGroupRelation.setUseruuid(useruuid);
		userGroupRelation.setGroupuuid(groupRegJsonform.getGroup_uuid());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(userGroupRelation);
		
		return true;
	}
	
	
	/**
	 * 查询所有机构列表
	 * @return
	 */
	public List<Group> query(){
		return (List<Group>) this.nSimpleHibernateDao.getHibernateTemplate().find("from Group", null);
	}



	/**
	 * 品牌名是否存在
	 * 
	 * @param loginname
	 * @return
	 */
	private boolean isExitSameUserByBrand_name(String brand_name) {
		String attribute = "brand_name";
		Object group = nSimpleHibernateDao.getObjectByAttribute(Group.class,
				attribute, brand_name);

		if (group != null)// 已被占用
			return true;
		else
			return false;

	}
	
	/**
	 * 公司名是否存在
	 * @param company_name
	 * @return
	 */
	private boolean isExitSameUserByCompany_name(String company_name) {
		String attribute = "company_name";
		Object group = nSimpleHibernateDao.getObjectByAttribute(Group.class,
				attribute, company_name);

		if (group != null)// 已被占用
			return true;
		else
			return false;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

}
