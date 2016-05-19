package com.company.news.service;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.entity.Operate;
import com.company.news.entity.User;
import com.company.news.entity.UserInfoUpdateTrace;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.filter.UserInfoFilter;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class UserInfoUpdateTraceService extends AbstractService {

	/**
	 * 增加修改信息 内部接口 UserinfoContriller 修改成功时update调用在;
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public UserInfoUpdateTrace addUserinfoUpdate(User user,String type,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {

		
	
	UserInfoUpdateTrace dbobj = new UserInfoUpdateTrace();
	
		dbobj.setUser_uuid(user.getUuid());
		
		HttpSession session = SessionListener
				.getSession((HttpServletRequest) request);
		dbobj.setSessionid(session.getId());
		dbobj.setIp(UserInfoFilter.getIpAddr(request));		
		dbobj.setName(user.getName());
		dbobj.setNickname(user.getNickname());
		dbobj.setRealname(user.getRealname());		
		dbobj.setPassword(user.getPassword());		
		dbobj.setTel(user.getTel());
		dbobj.setTel_verify(user.getTel_verify());		
		dbobj.setSex(user.getSex());
		dbobj.setOffice(user.getOffice());		
		dbobj.setImg(user.getImg());
		dbobj.setEmail(user.getEmail());
		dbobj.setCreate_time(TimeUtils.getCurrentTimestamp());		
		dbobj.setType(type);
		
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(dbobj);
		return dbobj;

	}

	
	
	
	
/*
 * 修改密码时记录TYPE时间 UUID 等
 * */	
public UserInfoUpdateTrace addUsepassword(SessionUserInfoInterface user,String type,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
	
	UserInfoUpdateTrace dbobj = new UserInfoUpdateTrace();
	
		dbobj.setUser_uuid(user.getUuid());
		dbobj.setName(user.getName());
		dbobj.setType(type);
		dbobj.setCreate_time(TimeUtils.getCurrentTimestamp());
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().save(dbobj);
			return dbobj;

	}	


	String Selectsql=" SELECT t1.uuid,t1.user_uuid,t1.sessionid,t1.ip,t1.type,t1.name,t1.password,t1.tel,t1.tel_verify,t1.sex,t1.office,t1.img,t1.email,date_format(t1.create_time,'%Y-%m-%d') as create_time";
	String SqlFrom=" FROM px_user_info_update_trace t1 ";	

	/**
	 *查询修改资料信息日志;
	 * @return
	 */
	public PageQueryResult queryInfo(SessionUserInfoInterface user,
			PaginationData pData, ModelMap model) {
		String selectsql=Selectsql;
		String sqlFrom=SqlFrom;
		sqlFrom += " where   t1.type ='info'";
		//sqlFrom += " where   t1.uuid ='"+user.getUuid()+"'";
		String sql=sqlFrom;
		pData.setPageSize(10);
		
		  sql += " order by t1.create_time desc";
		 
		Query  query =this.nSimpleHibernateDao.createSqlQuery(selectsql+sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		//String countsql="select count(*) "+sql;
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
	  

		return pageQueryResult;
	}
	
	
	
	
	String Selectsql2=" SELECT t1.uuid,t1.user_uuid,t1.type,t1.name,date_format(t1.create_time,'%Y-%m-%d') as create_time";
	//String SqlFrom2=" FROM px_user_info_update_trace t2 ";	

	/**
	 * 查询修改密码信息日志
	 * 
	 * @return
	 */
	public PageQueryResult queryPassword(SessionUserInfoInterface user,
			PaginationData pData, ModelMap model) {
		String selectsql2=Selectsql2;
		String sqlFrom=SqlFrom;
		sqlFrom += " where   t1.type ='password'";
		String sql=sqlFrom;
		pData.setPageSize(10);
		
		  sql += " order by t1.create_time desc";
		 
		Query  query =this.nSimpleHibernateDao.createSqlQuery(selectsql2+sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		//String countsql="select count(*) "+sql;
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForSqlNoTotal(query, pData);
	  

		return pageQueryResult;
	}	
//	protected List<AbstractStudent> warpVoList(List<AbstractStudent> list) {
//		for (AbstractStudent o : list) {
//			warpVo(o);
//		}
//		return list;
//	}
//	/**
//	 * vo输出转换
//	 * 
//	 * @param list
//	 * @return
//	 */
//	protected AbstractStudent warpVo(AbstractStudent o) {
//		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
//		o.setHeadimg(PxStringUtil.imgUrlByUuid(o.getHeadimg()));
//		return o;
//	}
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return Operate.class;
	}


	@Override
	public String getEntityModelName() {
		// TODO 自动生成的方法存根
		return null;
	}


}
