package com.company.news.service;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.entity.Count;
import com.company.news.rest.util.TimeUtils;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class CountService extends AbstractServcice {


	/**
	 * 增加班级
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

		Count c = (Count) this.nSimpleHibernateDao.getObjectByAttribute(
				Count.class, "ext_uuid", ext_uuid);

		if (c == null)
			c = new Count();

		c.setType(type);
		c.setUpdate_time(TimeUtils.getCurrentTimestamp());
		c.setExt_uuid(ext_uuid);
		Long count = 0l;
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

}
