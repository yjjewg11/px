package com.company.news.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;

import com.company.news.cache.PxRedisCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Count;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class CountService extends AbstractService {
	private static final String model_name = "计数模块";

	/**
	 * 计数.(增加redis缓存机制)
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public Long count(String ext_uuid, Integer type) throws Exception {
		if (StringUtils.isBlank(ext_uuid)) {
			return 0l;
		}
		//缓存命中,直接返回.
		Long cacheCount=PxRedisCache.getAddCountByExt_uuid(ext_uuid);
		if(cacheCount!=null&&cacheCount>1)return cacheCount;
		
		if(cacheCount!=null){//缓存正常工作.
			//数据库获取数据.
			Object dbCount =nSimpleHibernateDao.getSession().createSQLQuery("select sum(count) from Count where ext_uuid='"+ext_uuid+"'").uniqueResult();
			Long count = 0l;
			if (dbCount != null){//已有数据.
				count=Long.valueOf(dbCount.toString());
				count++;
				PxRedisCache.setCountByExt_uuid(ext_uuid, count);
				return count;
			}else{//新添加数据
				Count c = new Count();
				c.setType(type);
				c.setUpdate_time(TimeUtils.getCurrentTimestamp());
				c.setExt_uuid(ext_uuid);
				if (c.getCount() != null)
					count = c.getCount();

				c.setCount(++count);
				// 有事务管理，统一在Controller调用时处理异常
				this.nSimpleHibernateDao.getHibernateTemplate().save(c);
			}
			return count;
		}
		
		//缓存失效情况.

		Count c = (Count) this.nSimpleHibernateDao.getObjectByAttribute(
				Count.class, "ext_uuid", ext_uuid);

		if (c == null)
			c = new Count();

		c.setType(type);
		c.setUpdate_time(TimeUtils.getCurrentTimestamp());
		c.setExt_uuid(ext_uuid);
		long count = 0;
		if (c.getCount() != null)
			count = c.getCount();

		c.setCount(++count);

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().saveOrUpdate(c);

		return count;
	}

	/**
	 * 更新班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public Long get(String ext_uuid, Integer type) throws Exception {
		if (StringUtils.isBlank(ext_uuid)) {
			return 0l;
		}

		Count c = (Count) this.nSimpleHibernateDao.getObjectByAttribute(
				Count.class, "ext_uuid", ext_uuid);
		Long count = 0l;
		if (c != null)
			count = c.getCount();

		return count;

	}

	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public void clear(String ext_uuid) {
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from Count where ext_uuid =?", ext_uuid);
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

	/**
	 * 初始话计算
	 * @param ext_uuid
	 * @param type
	 * @return
	 */
	public Count add(String ext_uuid, int type) {
		if (StringUtils.isBlank(ext_uuid)) {
			return null;
		}
			Count	c = new Count();
		c.setType(type);
		c.setUpdate_time(TimeUtils.getCurrentTimestamp());
		c.setExt_uuid(ext_uuid);
		c.setCount(0l);

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(c);

		//初始化为1
		PxRedisCache.setCountByExt_uuid(ext_uuid, 1L);
		return c;
		
	}
	
	/**
	 * 查询计数并且缓存.
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public Map listByExtUuidsForCache(String ext_uuids) throws Exception {
		Map map=new HashMap();
		if (StringUtils.isBlank(ext_uuids)) {
			return map;
		}
		ext_uuids=PxStringUtil.StringDecComma(ext_uuids);
		String[] ext_uuidsArr=ext_uuids.split(",");
		//1.优先在缓存中取数据
		 List<Object> list=PxRedisCache.getAddCountByExt_uuids(ext_uuidsArr);
		 
		 //2.构造数据.
		 //noCacheext_uuids 如果为"".表示缓存全部命中直接返回.否则取数据库.
		 String noCacheext_uuids="";
		 for(int i=0;i<ext_uuidsArr.length;i++){
			 Object value= list.get(i);
			 if(value!=null&&!"1".equals(value+"")){
				 map.put(ext_uuidsArr[i], value);
			 }else{
				 noCacheext_uuids+=ext_uuidsArr[i]+",";
			 }
		 }
		 //缓存全部命中直接返回
		 if(StringUtils.isBlank(noCacheext_uuids)){
			 return map;
		 }
		 //3.数据库中取数据
		String sql = "select ext_uuid, sum(count) from px_count where ext_uuid in("+DBUtil.stringsToWhereInValue(noCacheext_uuids)+") group by ext_uuid";
		List<Object[]> listNoCahe=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory()
				.getCurrentSession().createSQLQuery(sql).list();
		Map<String,String> mapToCache=new HashMap();
		for(Object[] ObjArr:listNoCahe){
			map.put(ObjArr[0], ObjArr[1]);
			mapToCache.put(ObjArr[0]+"", ObjArr[1]+"");
		}
		//4.有数据则,缓存起来.
		if(!mapToCache.isEmpty()){
			PxRedisCache.setCountByExt_uuids(mapToCache);
		}
		return map;
		
	}

	/**
	 * 批量更新计数,提供效率
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public void update_countBatch(String ext_uuids) throws Exception {
		if (StringUtils.isBlank(ext_uuids)) {
			return ;
		}
		String sql = "update px_count set count=count+1,update_time=now() where ext_uuid in("+DBUtil.stringsToWhereInValue(ext_uuids)+")";
		this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory()
				.getCurrentSession().createSQLQuery(sql).executeUpdate();

	}

	/**
	 * 批量更新计数,提供效率.用于redis 同步到数据库
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public void update_synCountRedisToDb(final String[] keys, final List<String> values) throws Exception {
//		if (StringUtils.isBlank(ext_uuids)) {
//			return ;
//		}
		Session session=this.nSimpleHibernateDao.getSession();
        final String sql = "update px_count set count=?,update_time=now() where ext_uuid =?";
        final Logger tmpLogger=  logger;
        try{
             session.beginTransaction();
             session.doWork(
                     new Work() {
                         public void execute(Connection connection) throws SQLException {
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
                            		 tmpLogger.error("key="+key+",val="+valueStr);
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
		

	}
}
