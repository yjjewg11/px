package com.company.news.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import com.company.news.ProjectProperties;
import com.company.news.cache.redis.PxRedisCacheImpl;

/**
 * 定时任务执行
 * @author liumingquan
 * applicationContext.xml
 *     <task:scheduled ref="countRedisSynDbService" method="synCountRedisToDb" cron="1 1 1 * * ?"/>  
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
		//运行线程,执行同步数据.
		new Thread(new Runnable() {				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					try {
						PxRedisCacheImpl dd=new PxRedisCacheImpl();
						//同步数据,清空2天前数据
						dd.getPx_count().synCountRedisToDb();
						//同步所有数据
						dd.getPx_count().synAllCountRedisToDb();
						
					} catch (Exception e) {
						// TODO Auto-generated catch block
						//e.printStackTrace();
					}
					
				}
			}).run();
			
		
		new Thread(new Runnable() {				
			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					PxRedisCacheImpl dd=new PxRedisCacheImpl();
					//同步数据,清空2天前数据
					dd.getSns_topic().synCountRedisToDb();
					//同步所有数据
					dd.getSns_topic().synAllCountRedisToDb();
					
				} catch (Exception e) {
					// TODO Auto-generated catch block
					//e.printStackTrace();
				}
				
			}
		}).run();
		
		
		logger.warn("timer end-----------------------------");
	}
}
