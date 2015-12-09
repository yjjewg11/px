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
		//1.增加
		Long startTime = System.currentTimeMillis() ;
		try {
			new PxRedisCacheImpl().synCountRedisToDb(synPxRedisToDbImplService);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e);
		}
		//2.
		Long endTime = System.currentTimeMillis() - startTime;
		logger.warn("timer end-----------------------------count time(ms)="+endTime);
	}
}
