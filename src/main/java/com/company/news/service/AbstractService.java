package com.company.news.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.AbstractStudent;
import com.company.news.entity.Logs;
import com.company.news.entity.Operate;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

public abstract class AbstractService {
	public static final String ID_SPLIT_MARK = ",";
	protected static Logger logger = Logger.getLogger(AbstractService.class);
	@Autowired
	@Qualifier("NSimpleHibernateDao")
	protected NSimpleHibernateDao nSimpleHibernateDao;

	/**
	 * 数据库实体
	 * 
	 * @return
	 */
	public abstract Class getEntityClass();

	/**
	 * 模块名，中文，用于进行日志记录
	 * 
	 * @return
	 */
	public abstract String getEntityModelName();

	/**
	 * 重要的操作记录到 日志.
	 * 
	 * @param doorRecord
	 * @throws Exception
	 */
	public void addLog(String model, String target, String context, HttpServletRequest request) {
		try {

			Logs logs = new Logs();
			logs.setCreate_time(TimeUtils.getCurrentTimestamp());
			logs.setModelname(model);
			logs.setTarget(target);
			logs.setContext(context);
			SessionUserInfoInterface user = SessionListener.getUserInfoBySession(request);
			if (user != null) {
				logs.setCreate_user(user.getName());
				logs.setCreate_useruuid(user.getUuid());
			}

			this.nSimpleHibernateDao.save(logs);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	/**
	 * 重要的操作记录到 日志.
	 * 
	 * @param doorRecord
	 * @throws Exception
	 */
	public void addStudentOperate(String groupuuid,String studentuuid,String message, String note, HttpServletRequest request) {
		try {
			Operate operate = new Operate();
			operate.setCreate_time(TimeUtils.getCurrentTimestamp());

			
			operate.setGroupuuid(groupuuid);
			operate.setStudentuuid(studentuuid);
			SessionUserInfoInterface user = SessionListener.getUserInfoBySession(request);
			if (user != null) {
				operate.setCreate_user(user.getName());
				operate.setCreate_useruuid(user.getUuid());
			}
			operate.setMessage(message);
			operate.setNote(note);
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().save(operate);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	/**
	 * 
	 * @param s 检验的字符串
	 * @param length 允许的最大长度
	 * @param columnname 错误时提示的字段名
	 * @return
	 */
	protected boolean validateRequireAndLengthByRegJsonform(String s,int length,String columnname,ResponseMessage responseMessage){
		if (StringUtils.isBlank(s) || s.length() > length) {
			responseMessage.setMessage(columnname+"不能为空！且长度不能超过"+length+"位！");
			return true;
		}
		return false;
	}
	
	/**
	 * 
	 * @param s 检验的字符串
	 * @param length 允许的最大长度
	 * @param columnname 错误时提示的字段名
	 * @return
	 */
	protected boolean validateRequireByRegJsonform(String s,String columnname,ResponseMessage responseMessage){
		if (StringUtils.isBlank(s)) {
			responseMessage.setMessage(columnname+"不能为空！");
			return true;
		}
		return false;
	}
	/**
	 * 
	 * @param s 检验的字符串
	 * @param length 允许的最大长度
	 * @param columnname 错误时提示的字段名
	 * @return
	 */
	protected boolean validateRequireByRegJsonformObject(Object s,String columnname,ResponseMessage responseMessage){
		if (s==null) {
			responseMessage.setMessage(columnname+"不能为空！");
			return true;
		}
		return false;
	}


	/**
	 * 是否可以收藏
	 * 
	 * @param loginname
	 * @return
	 */
	public boolean isFavorites(String user_uuid,String reluuid) {
		if(StringUtils.isBlank(reluuid)||StringUtils.isBlank(user_uuid))return false;
		List list = nSimpleHibernateDao.getHibernateTemplate().find("select reluuid from Favorites where reluuid=? and user_uuid=?", reluuid,user_uuid);

		if (list != null&&list.size()>0)// 已被占用
			return false;
		else
			return true;

	}
	
	/**
	 * 是否可以收藏
	 * 
	 * @param loginname
	 * @return
	 */
	public boolean isFavorites(SessionUserInfoInterface user,String reluuid) {
		if(StringUtils.isBlank(reluuid)||user==null)return false;
		List list = nSimpleHibernateDao.getHibernateTemplate().find("select reluuid from Favorites where reluuid=? and user_uuid=?", reluuid,user.getUuid());

		if (list != null&&list.size()>0)// 已被占用
			return false;
		else
			return true;

	}
	public SessionUserInfoInterface getSessionUser(HttpServletRequest request,
			ResponseMessage responseMessage) {
		SessionUserInfoInterface user=SessionListener.getUserInfoBySession(request);
		if(user==null){
			responseMessage.setMessage("请先登录后在操作!");
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_sessionTimeout);
		}
		return user;
	}

}
