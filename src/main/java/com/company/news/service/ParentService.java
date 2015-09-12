package com.company.news.service;

import org.springframework.stereotype.Service;

import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class ParentService extends AbstractServcice {
	/**
	 * 查询指定机构的用户列表
	 * 
	 * @return
	 */
	public PageQueryResult listByPage(String name,PaginationData pData) {

		String hql = "from Parent where 1=1" ;
//		if (StringUtils.isNotBlank(type))
//			hql += " and type=" + type;
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);
		return pageQueryResult;
	}
	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return "ssss";
	}
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}

}
