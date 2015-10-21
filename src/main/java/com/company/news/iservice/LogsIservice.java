package com.company.news.iservice;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.Logs;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.rest.util.TimeUtils;
import com.company.web.listener.SessionListener;


@Service
public class LogsIservice {
	  protected static Logger logger = LoggerFactory.getLogger(LogsIservice.class);
	  @Autowired
	  @Qualifier("NSimpleHibernateDao")
	  protected NSimpleHibernateDao nSimpleHibernateDao;
	  
	 /**
	  * 根据打卡数据,添加学生的签到记录
	  * @param doorRecord
	  * @throws Exception
	  */
	  public final void addLog(String model,String target,HttpServletRequest request){
		  try {
			Logs logs = new Logs();
				logs.setCreate_time(TimeUtils.getCurrentTimestamp());
				logs.setModelname(model);
				logs.setTarget(target);
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
	  
}
