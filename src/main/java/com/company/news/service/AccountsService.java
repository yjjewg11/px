package com.company.news.service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.commons.util.DbUtils;
import com.company.news.entity.Accounts;
import com.company.news.entity.ClassNews;
import com.company.news.entity.Student;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.AccountsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

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
		if (Double.valueOf(0).equals(accountsJsonform.getNum())) {
			responseMessage.setMessage("金额不能为0");
			return false;
		}
		
		
		
		//默认type
		if (accountsJsonform.getType()==null) {
			responseMessage.setMessage("缴费类型必填写");
			return false;
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
			hql.append(" and groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"'");	
		
		if(StringUtils.isNotBlank(classuuid))
			hql.append(" and classuuid='"+DbUtils.safeToWhereString(classuuid)+"'");

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
	public PageQueryResult listByPage(PaginationData pData,String begDateStr, String endDateStr,AccountsJsonform accountsJsonform,ModelMap model) {
		StringBuffer hql=new StringBuffer("from Accounts where groupuuid='"+DbUtils.safeToWhereString(accountsJsonform.getGroupuuid())+"'");
		
		if(StringUtils.isNotBlank(begDateStr))
			hql.append(" and accounts_time>="+DBUtil.stringToDateByDBType(begDateStr));
		
		if(StringUtils.isNotBlank(endDateStr))
			hql.append(" and accounts_time<="+DBUtil.stringToDateByDBType(endDateStr));		
		
		if(accountsJsonform.getType()!=null)
			hql.append(" and type="+accountsJsonform.getType());		
		
		if(StringUtils.isNotBlank(accountsJsonform.getClassuuid()))
			hql.append(" and classuuid='"+DbUtils.safeToWhereString(accountsJsonform.getClassuuid())+"'");
		
		if(StringUtils.isNotBlank(accountsJsonform.getCreate_useruuid()))
			hql.append(" and create_useruuid='"+DbUtils.safeToWhereString(accountsJsonform.getCreate_useruuid())+"'");
		if(StringUtils.isNotBlank(accountsJsonform.getTitle())){
			String title=accountsJsonform.getTitle();
			title=DbUtils.safeToWhereString(title);
			//内容、学生名、单据号、填写人
			hql.append(" and ( title  like '%" + title + "%'  or studentname  like '%" + title + "%'   or invoice_num  like '%" + title + "%'  or create_user  like '%" + title + "%')"  );
		}
			

		hql.append(" order by create_time desc");
		
		Object sum=this.nSimpleHibernateDao.getSession().createQuery("select sum(num) "+hql).uniqueResult();
		model.addAttribute("sum_num", sum);
		return  this.nSimpleHibernateDao.findByPaginationToHql(hql.toString(), pData);
	}

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean delete(HttpServletRequest request,String uuid, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}
		
		
		Accounts obj=(Accounts)this.nSimpleHibernateDao.getObject(Accounts.class, uuid);
		if(obj==null){
			responseMessage.setMessage("对象不存在！");
			return false;
		}
		
		
		SessionUserInfoInterface user = SessionListener.getUserInfoBySession(request);
		
		if(!user.getUuid().equals(obj.getCreate_useruuid())){
			responseMessage.setMessage("只有创建人,才能删除");
			return false;
		}
		
		String createDate=TimeUtils.getDateString(obj.getCreate_time(), TimeUtils.YYYY_MM_DD_FORMAT);
		
		String curDate=TimeUtils.getDateString(TimeUtils.getCurrentTimestamp(), TimeUtils.YYYY_MM_DD_FORMAT);
		if(!curDate.equals(createDate)){
			responseMessage.setMessage("只能删除当天创建的数据。");
			return false;
		}

		this.nSimpleHibernateDao.delete(obj);
		
		


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

	/**
	 * 
	 * @param class_uuid
	 * @param type
	 * @param begDateStr
	 * @param parameter4
	 * @return
	 */
	public List listForYear(String class_uuid, String type,
			String begDateStr, Integer add_month) {
		
		begDateStr=begDateStr.split("-")[0]+"-01-01";
		
		Timestamp begDate = TimeUtils.string2Timestamp(null,begDateStr);
		if(begDate==null){
			
		}
		Calendar begCal= Calendar.getInstance();
		begCal.setTime(begDate);
		
		begCal.add(Calendar.MONTH, add_month);
		 String endDateStr=TimeUtils.getDateString(begCal.getTime());
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		

		String sql_studeng=" SELECT name,uuid  FROM   px_student where  classuuid in(" + DBUtil.stringsToWhereInValue(class_uuid) + ") ";
		sql_studeng+=" order by  CONVERT( name USING gbk)";
		
		Query q = s.createSQLQuery(sql_studeng);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		
		List<Map> student_list=q.list();
		Map map=new HashMap();
		for(Map m:student_list)
		{
			map.put(m.get("uuid"), m);
		}
		
		
		String sql=" SELECT t1.studentuuid,t1.num,t1.accounts_time ";
		sql+=" FROM   px_accounts t1 ";
		sql+=" where    t1.classuuid in(" + DBUtil.stringsToWhereInValue(class_uuid) + ")";
		
		if(StringUtils.isNotBlank(type)){
			sql+=" and t1.type ="+type;
		}
		
		if(StringUtils.isNotBlank(begDateStr))
			sql+=" and accounts_time>="+DBUtil.stringToDateByDBType(begDateStr);
		
		if(StringUtils.isNotBlank(endDateStr))
			sql+=" and accounts_time<="+DBUtil.stringToDateByDBType(endDateStr);
		
		Query q1 = s.createSQLQuery(sql);
		q1.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> accounts_list=q1.list();
		for(Map m:accounts_list)
		{
			String studentuuid=(String)m.get("studentuuid");
			Map obj=(Map)map.get(studentuuid);
			if(obj!=null){
				Date accounts_time=(Date)m.get("accounts_time");
				int d1=TimeUtils.getIntervalMonth(begDateStr, TimeUtils.getDateTimeString(accounts_time));
				String numStr=(String)obj.get("month"+d1);
				
				if(numStr!=null){
					numStr+=";"+m.get("num");
				}
				else{
					numStr=m.get("num")+"";
				}
				
				obj.put("month"+d1, numStr);
			}
		}
		
		return student_list;
	}
	
	
	
	/**
	 * 统计一年每月的数据(根据分类)
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getAccountPerMonthOfYear(String groupuuid,String begDateStr, String endDateStr) {
		endDateStr+=" 23:59:59";
		//class_name,news_count,dianzan_count,replay_count,read_sum_count
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		//type,Y-m,count_num,sum_num
		String sql = "SELECT type,DATE_FORMAT(t1.accounts_time,'%m') as m,COUNT(DISTINCT studentuuid) as count_num,SUM(num) as sum_num from px_accounts t1 ";
			sql+="  where groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"'" ;
			
			sql+="  and t1.accounts_time>="+DBUtil.stringToDateByDBType(begDateStr)+"  and t1.accounts_time<"+DBUtil.stringToDateByDBType(endDateStr);
			sql+=" GROUP BY  type,DATE_FORMAT(t1.accounts_time,'%m') ORDER BY type,m";
		Query q = s.createSQLQuery(sql);

		return q.list();
	}

	/**
	 * 统计一年每月的数据(根据分类)
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getAccountPerMonthOfYearOfType(String groupuuid,Integer type,String begDateStr, String endDateStr) {
		endDateStr+=" 23:59:59";
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		//Y-m,count_num,sum_num
		String sql = "SELECT DATE_FORMAT(t1.accounts_time,'%Y-%m') as m,COUNT(1) as count_num,SUM(num) as sum_num from px_accounts t1 ";
			sql+="  where  groupuuid='"+DbUtils.safeToWhereString(groupuuid)+"'" ;
			sql+="  and t1.type="+type;
			sql+="  and t1.accounts_time>="+DBUtil.stringToDateByDBType(begDateStr)+"  and t1.accounts_time<"+DBUtil.stringToDateByDBType(endDateStr);
			sql+=" GROUP BY  DATE_FORMAT(t1.accounts_time,'%Y-%m') ORDER BY m";
		Query q = s.createSQLQuery(sql);

		return q.list();
	}

}
