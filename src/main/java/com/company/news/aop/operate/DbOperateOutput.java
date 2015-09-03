package com.company.news.aop.operate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.Logs;

@Component
public class DbOperateOutput implements OperateOutput {
	@Autowired
	@Qualifier("NSimpleHibernateDao")
	protected NSimpleHibernateDao nSimpleHibernateDao;

	@Override
	public void output(Logs logs) {
		// TODO Auto-generated method stub
		try {
			nSimpleHibernateDao.getHibernateTemplate().save(logs);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
