package com.company.news.service;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.company.news.entity.User4Q;
import com.company.news.entity.UserTeacher;
import com.company.news.jsonform.UserTeacherJsonform;
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
			if (StringUtils.isNotBlank(userTeacherJsonform.getBirthday()))
				ut.setBirthday(TimeUtils.string2Timestamp(null,
						userTeacherJsonform.getBirthday()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		ut.setUpdate_time(TimeUtils.getCurrentTimestamp());
		this.nSimpleHibernateDao.getHibernateTemplate().saveOrUpdate(ut);

		return true;
	}



	/**
	 *获取用户-老师详细信息.
	 * 
	 * @return
	 */
	public UserTeacher get(String useruuid) {
		
		UserTeacher userTeacher=(UserTeacher) this.nSimpleHibernateDao.getObjectByAttribute(
				UserTeacher.class, "useruuid",useruuid);
		if(userTeacher==null){
			userTeacher=new UserTeacher();
			User4Q user=(User4Q)this.nSimpleHibernateDao.getHibernateTemplate().get(User4Q.class, useruuid);
			userTeacher.setUseruuid(user.getUuid());
			userTeacher.setTel(user.getTel());
			userTeacher.setSex(user.getSex());
		}
		return userTeacher;
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



	public PageQueryResult listByPage(String group_uuid, String name,
			PaginationData pData) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		
		PageQueryResult 	res=null;
		{
		String sql = "select DISTINCT {t1.*} from px_usergrouprelation t0,px_userteacher {t1} where t0.useruuid={t1}.useruuid";
		if(StringUtils.isNotBlank(group_uuid)){
			sql+=" and t0.groupuuid in("+DBUtil.stringsToWhereInValue(group_uuid)+")";
		}
		if(StringUtils.isNotBlank(name)){
			if(StringUtils.isNumeric(name)){
				sql+=" and {t1}.tel like '%"+name+"%'";
			}else{				
				sql+=" and {t1}.realname like '%"+name+"%'";
			}
		}
		sql+="order by CONVERT( {t1}.realname USING gbk)";
		SQLQuery  q = s
				.createSQLQuery(sql).addEntity("t1", UserTeacher.class);

		 	res=	this.nSimpleHibernateDao.findByPageForSqlNoTotal(q, pData);
		
		
		}
		
		{
			String sql = "select count(*) from px_usergrouprelation t0,px_userteacher t1 where t0.useruuid=t1.useruuid";
		if(StringUtils.isNotBlank(group_uuid)){
			sql+=" and t0.groupuuid in("+DBUtil.stringsToWhereInValue(group_uuid)+")";
		}
		if(StringUtils.isNotBlank(name)){
			if(StringUtils.isNumeric(name)){
				sql+=" and t1.tel like '%"+name+"%'";
			}else{				
				sql+=" and t1.realname like '%"+name+"%'";
			}
		}
			Object count=s
					.createSQLQuery(sql).uniqueResult();
			
			res.setTotalCount(Long.valueOf(count.toString()));

		}
		return res;
	}



}
