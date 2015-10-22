package com.company.news.service;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class ParentService extends AbstractService {
	/**
	 * 查询指定机构的用户列表
	 * 
	 * @return
	 */
	public PageQueryResult listByPage(String name,PaginationData pData) {

		String hql = "from Parent where 1=1" ;
		
		if (StringUtils.isNotBlank(name)){
			if(StringUtils.isNumeric(name)){
				hql+=" and tel like '%"+name+"%'";
			}else{				
				hql+=" and name like '%"+name+"%'";
			}
		}
		pData.setOrderFiled("login_time");
		pData.setOrderType("desc");
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);
		return pageQueryResult;
	}
	/**
	 * 查询指定机构的用户列表
	 * 
	 * @return
	 */
	public PageQueryResult listByPage(String name,String groupuuid,PaginationData pData) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql=" SELECT distinct t1.*";
		sql+=" FROM px_parent t1 ";
		sql+=" LEFT JOIN  px_studentcontactrealation t2 on t1.uuid=t2.parent_uuid ";
		sql+=" where t2.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		Query q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		
		String countsql="select count(*) from px_studentcontactrealation t2";
		countsql+=" where t2.parent_uuid is not null and t2.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		PageQueryResult pageQueryResult =this.nSimpleHibernateDao.findMapByPageForSqlTotal(sql,countsql, pData);
		return pageQueryResult;
	}
	
	/**
	 * 根据机构UUID,获取绑定该学生
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getParentCountByGroup(String groupuuid) {

		List list = (List) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("select count(parent_uuid),class_uuid from StudentContactRealation where groupuuid=? and parent_uuid is not null group by class_uuid)", groupuuid);

		return list;
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
