package com.company.news.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.ProjectProperties;
import com.company.news.cache.redis.PxRedisCacheImpl;

/**
 * 定时任务执行
 * @author liumingquan
 *
 */
@Service 
public class CountRedisSynDbService {
	protected static Logger logger = Logger.getLogger(CountRedisSynDbService.class);
	@Autowired
	private SynPxRedisToDbImplService synPxRedisToDbImplService;
	
	public static final String PxRedisCache = ProjectProperties.getProperty(
			"PxRedisCache_synDB", "false");
	
	public void synCountRedisToDb(){
		logger.warn("timer start-----------------------------");
		
		//判断是否启用定时
		if(!"true".equals(PxRedisCache)){
			logger.warn("timer end:PxRedisCache_synDB="+PxRedisCache);
			return ;
		}
		//1.同步
		Long startTime = System.currentTimeMillis() ;
		logger.warn("synCountRedisToDb start-----------------------------");
		try {
			new PxRedisCacheImpl().synCountRedisToDb(synPxRedisToDbImplService);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e);
		}
		Long endTime = System.currentTimeMillis() - startTime;
		logger.warn("synCountRedisToDb start----------count time(ms)="+endTime);
		//2.
		startTime = System.currentTimeMillis() ;
		logger.warn("synAllCountRedisToDb start-----------------------------");
		try {
			new PxRedisCacheImpl().synAllCountRedisToDb(synPxRedisToDbImplService);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e);
		}
		 endTime = System.currentTimeMillis() - startTime;
		logger.warn("synAllCountRedisToDb start----------count time(ms)="+endTime);
		//2.
		
		
		
		
		logger.warn("timer end-----------------------------count time(ms)="+endTime);
	}
}
