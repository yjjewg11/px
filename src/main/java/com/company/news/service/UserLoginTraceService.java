package com.company.news.service;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.AbstractStudent;
import com.company.news.entity.IdEntity;
import com.company.news.entity.KDMovie;
import com.company.news.entity.Operate;
import com.company.news.entity.UserLoginTrace;
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
public class UserLoginTraceService extends AbstractService {
//	private static final String model_name = "操作记录模块";


	/**
	 * 增加登录信息 内部接口 UserinfoContriller 登录成功时调用在;
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public UserLoginTrace addUserLoginTrace(SessionUserInfoInterface user,String type,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {

		
	
			UserLoginTrace dbobj = new UserLoginTrace();
			
			dbobj.setUser_uuid(user.getUuid());
			dbobj.setCreate_time(TimeUtils.getCurrentTimestamp());
			
			HttpSession session = SessionListener
					.getSession((HttpServletRequest) request);
		
			dbobj.setSessionid(session.getId());
			dbobj.setIp(UserInfoFilter.getIpAddr(request));
//			dbobj.setAddress(user.getUuid());
			dbobj.setType(type);

			
			
			
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().save(dbobj);
			return dbobj;

	}

	
	String Selectsql=" SELECT t1.uuid,t1.user_uuid, date_format(t1.create_time,'%Y-%m-%d') as create_time,t1.sessionid,t1.ip,t1.type";
	String SqlFrom=" FROM px_user_login_trace t1 ";	

	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public PageQueryResult queryLongin(SessionUserInfoInterface user,
			PaginationData pData, ModelMap model) {
		String selectsql=Selectsql;
		String sqlFrom=SqlFrom;
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
