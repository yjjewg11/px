package com.company.news.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.company.news.cache.redis.SynPxRedisToDbInterface;
import com.company.news.dao.NSimpleHibernateDao;


/**
 * redis同步数据到数据库接口
 * @author liumingquan
 *
 */
@Service
public class SynPxRedisToDbImplService implements  SynPxRedisToDbInterface{
	
	protected final static Logger logger = Logger.getLogger(CountRedisSynDbService.class);
	@Autowired
	@Qualifier("NSimpleHibernateDao")
	protected NSimpleHibernateDao nSimpleHibernateDao;
	/**
	 * 批量更新计数,提供效率.用于redis 同步到数据库
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update_synCountRedisToDb(final String[] keys, final List<String> values) throws Exception {
//		if (StringUtils.isBlank(ext_uuids)) {
//			return ;
//		}
		Session session=this.nSimpleHibernateDao.getSession();
       
        try{
             session.beginTransaction();
             session.doWork(
                     new Work() {
                         public void execute(Connection connection) throws SQLException {
                        	  String sql = "update px_count set count=?,update_time=now() where ext_uuid =?";
                        	 	//经由过程JDBC API执行SQL语句
                             PreparedStatement ps = connection.prepareStatement(sql);

                             for (int i = 0; i <keys.length; i++) {
                            	 String valueStr=values.get(i);
                            	 String key=keys[i];
                            	 if(valueStr!=null&&key!=null){
                            		 ps.setLong(1, Long.valueOf(valueStr));
                                	 ps.setString(2, key);
                                     ps.addBatch();
                            	 }else{
                            		 logger.error("key="+key+",val="+valueStr);
                            	 }
                            	
                             }

                             ps.executeBatch();
                         }
                     }
             );
             session.getTransaction().commit();
             //session.close();
        }catch(Exception ex){
        	  session.getTransaction().rollback();
        }
		
        return true;
	}
}
