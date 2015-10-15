package com.company.news.service;

import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.springframework.stereotype.Service;

import com.company.news.entity.Accounts;
import com.company.news.entity.Student;
import com.company.news.jsonform.AccountsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class AccountsService extends AbstractService {
	public static final int accounts_type_general = 0;// 默认公开通知
	private static final String model_name = "账目模块";
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
			responseMessage.setMessage("内容不能为空！，且长度不能超过45位！");
			return false;
		}

		if (StringUtils.isBlank(accountsJsonform.getGroupuuid())) {
			responseMessage.setMessage("必须选择一个学校");
			return false;
		}
		
		
		accountsJsonform.setAccounts_timeStr(TimeUtils.getDateFormatString(accountsJsonform.getAccounts_timeStr()));
		Timestamp accounts_time = TimeUtils.string2Timestamp(null,
				accountsJsonform.getAccounts_timeStr());

		if (accounts_time == null) {
			responseMessage.setMessage("日期格式不正确.正确格式：2015-10-01");
			return false;
		}

		if (accountsJsonform.getNum()==null) {
			responseMessage.setMessage("金额不能为空！");
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
		if (StringUtils.isNotEmpty(accountsJsonform.getStudentuuid())&&!"0".equals(accountsJsonform.getStudentuuid())) {
			Student student=(Student)nSimpleHibernateDao.getObject(Student.class, accountsJsonform.getStudentuuid());
			if(student==null){
				responseMessage.setMessage("没有对应的学生数据,studentuuid="+accountsJsonform.getStudentuuid());
				return false;
			}
			accounts.setStudentname(student.getName());
		}
		if ("0".equals(accountsJsonform.getClassuuid())) {
			accounts.setClassuuid(null);
		}

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
			responseMessage.setMessage("必须选择一个学校");
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

		hql.append(" order by create_time desc");

		Query  q=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession().createQuery(hql.toString());
		q.setMaxResults(100);
		return (List) q.list();
	}

	/**
	 * 分页查询
	 * 
	 * @return
	 */
	public PageQueryResult listByPage(PaginationData pData,String begDateStr, String endDateStr,AccountsJsonform accountsJsonform) {
		StringBuffer hql=new StringBuffer("from Accounts where groupuuid='"+accountsJsonform.getGroupuuid()+"'");
		
		if(StringUtils.isNotBlank(begDateStr))
			hql.append(" and accounts_time>="+DBUtil.stringToDateByDBType(begDateStr));
		
		if(StringUtils.isNotBlank(endDateStr))
			hql.append(" and accounts_time<="+DBUtil.stringToDateByDBType(endDateStr));		
		
		if(accountsJsonform.getType()!=null)
			hql.append(" and type="+accountsJsonform.getType());		
		
		if(StringUtils.isNotBlank(accountsJsonform.getClassuuid()))
			hql.append(" and classuuid='"+accountsJsonform.getClassuuid()+"'");
		
		if(StringUtils.isNotBlank(accountsJsonform.getCreate_useruuid()))
			hql.append(" and create_useruuid='"+accountsJsonform.getCreate_useruuid()+"'");
		if(StringUtils.isNotBlank(accountsJsonform.getTitle())){
			String title=accountsJsonform.getTitle();
			//内容、学生名、单据号、填写人
			hql.append(" and ( title  like '%" + title + "%'  or studentname  like '%" + title + "%'   or invoice_num  like '%" + title + "%'  or create_user  like '%" + title + "%')"  );
		}
			

		hql.append(" order by create_time desc");
	

		return  this.nSimpleHibernateDao.findByPaginationToHql(hql.toString(), pData);
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

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
