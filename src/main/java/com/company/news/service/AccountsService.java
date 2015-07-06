package com.company.news.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Accounts;
import com.company.news.entity.Announcements;
import com.company.news.entity.Announcements4Q;
import com.company.news.entity.AnnouncementsTo;
import com.company.news.entity.PClass;
import com.company.news.entity.User;
import com.company.news.jsonform.AccountsJsonform;
import com.company.news.jsonform.AnnouncementsJsonform;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.AnnouncementsVo;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class AccountsService extends AbstractServcice {
	public static final int accounts_type_general = 0;// 默认公开通知


	/**
	 * 增加
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(AccountsJsonform accountsJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(accountsJsonform.getTitle())
				|| accountsJsonform.getTitle().length() > 45) {
			responseMessage.setMessage("Title不能为空！，且长度不能超过45位！");
			return false;
		}

		if (StringUtils.isBlank(accountsJsonform.getGroupuuid())) {
			responseMessage.setMessage("Groupuuid不能为空！");
			return false;
		}
		
		Timestamp accounts_time = TimeUtils.string2Timestamp(null,
				accountsJsonform.getAccounts_timeStr());

		if (accounts_time == null) {
			responseMessage.setMessage("accounts_time格式不正确");
			return false;
		}

		if (accountsJsonform.getNum()==null) {
			responseMessage.setMessage("Num不能为空！");
			return false;
		}
		
		//默认type
		if (accountsJsonform.getType()==null) {
			accountsJsonform.setType(accounts_type_general);
		}

		Accounts accounts = new Accounts();

		BeanUtils.copyProperties(accounts, accountsJsonform);

		accounts.setCreate_time(TimeUtils.getCurrentTimestamp());
		accounts.setAccounts_time(accounts_time);

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(accounts);


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
	public boolean update(AccountsJsonform accountsJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(accountsJsonform.getTitle())
				|| accountsJsonform.getTitle().length() > 45) {
			responseMessage.setMessage("Title不能为空！，且长度不能超过45位！");
			return false;
		}

		if (StringUtils.isBlank(accountsJsonform.getGroupuuid())) {
			responseMessage.setMessage("Groupuuid不能为空！");
			return false;
		}
		
		Timestamp accounts_time = TimeUtils.string2Timestamp(null,
				accountsJsonform.getAccounts_timeStr());

		if (accounts_time == null) {
			responseMessage.setMessage("accounts_time格式不正确");
			return false;
		}

		if (accountsJsonform.getNum()!=null) {
			responseMessage.setMessage("Num不能为空！");
			return false;
		}
		
		//默认type
		if (accountsJsonform.getType()==null) {
			accountsJsonform.setType(accounts_type_general);
		}
		

		Accounts accounts = (Accounts) this.nSimpleHibernateDao
				.getObjectById(Accounts.class,
						accountsJsonform.getUuid());

		accounts.setAccounts_time(accounts_time);
		accounts.setTitle(accountsJsonform.getTitle());
		accounts.setNum(accountsJsonform.getNum());
		accounts.setDescription(accountsJsonform.getDescription());
		accounts.setCreate_user(accountsJsonform.getCreate_user());
		accounts.setCreate_useruuid(accountsJsonform.getCreate_useruuid());
		accounts.setType(accountsJsonform.getType());

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().update(accounts);


		return true;
	}

	/**
	 * 查询所有通知
	 * 
	 * @return
	 */
	public List<Accounts> query(String begDateStr, String endDateStr,String type, String groupuuid, String classuuid) {
		StringBuffer hql=new StringBuffer("from Accounts where 1=1");
		
		if(StringUtils.isNotBlank(begDateStr))
			hql.append(" and accounts_time>="+DBUtil.stringToDateByDBType(begDateStr));
		
		if(StringUtils.isNotBlank(endDateStr))
			hql.append(" and accounts_time<="+DBUtil.stringToDateByDBType(endDateStr));		
		
		if(StringUtils.isNotBlank(type))
			hql.append(" and type="+type);		
		
		if(StringUtils.isNotBlank(groupuuid))
			hql.append(" and groupuuid='"+groupuuid+"'");	
		
		if(StringUtils.isNotBlank(classuuid))
			hql.append(" and classuuid='"+classuuid+"'");

		hql.append(" order by accounts_time desc");

		return (List) this.nSimpleHibernateDao.getHibernateTemplate().find(hql.toString());
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
					"delete from Accounts where uuid in(?)", uuid);;
		} else {
			this.nSimpleHibernateDao
					.deleteObjectById(Accounts.class, uuid);
		}

		return true;
	}

	/**
	 * 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public Accounts get(String uuid) throws Exception {
		Accounts accounts = (Accounts) this.nSimpleHibernateDao
				.getObjectById(Accounts.class, uuid);

		return accounts;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return Accounts.class;
	}

}
