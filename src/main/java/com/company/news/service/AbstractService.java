package com.company.news.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.company.news.SystemConstants;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.ClassNewsReply;
import com.company.news.entity.Logs;
import com.company.news.entity.User;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.DianzanListVO;
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
			User user = SessionListener.getUserInfoBySession(request);
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
	 * 
	 * @param s 检验的字符串
	 * @param length 允许的最大长度
	 * @param columnname 错误时提示的字段名
	 * @return
	 */
	protected boolean validateRequireAndLengthByRegJsonform(String s,int length,String columnname,ResponseMessage responseMessage){
		if (StringUtils.isBlank(s) || s.length() > length) {
			responseMessage.setMessage(columnname+"不能为空！，且长度不能超过"+length+"位！");
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
	
	

}
