package com.company.news.cache;

import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.company.common.SpringContextHolder;
import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.User;
import com.company.news.service.AbstractServcice;


public class CommonsCache{
	private static Logger logger = Logger.getLogger("CommonsCache");
	private static Cache dbDataCache = (Cache) SpringContextHolder
			.getBean("dbDataCache");
    private static NSimpleHibernateDao nSimpleHibernateDao=SpringContextHolder.getBean("NSimpleHibernateDao");

	
	// 获取自动保存内容
	public static User getUser(String uuid) {
		logger.info("getUser:uuid-->" + uuid);
		Element user = dbDataCache.get(uuid);

		if (user != null)
			return (User) user.getObjectValue();
		else {
			User object =(User) nSimpleHibernateDao.getObject(User.class, uuid);
			if (object != null)
				putUser(uuid, object);
			return object;
		}
	}

	// 存入自动保存内容
	public static void putUser(String uuid, User user) {
		logger.info("putUser:uuid-->" + uuid);
		Element e = new Element(uuid, user);
		dbDataCache.put(e);
	}


}
