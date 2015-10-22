package com.company.news.service;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.entity.Operate;
import com.company.news.jsonform.OperateJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class OperateService extends AbstractService {
	private static final String model_name = "操作记录模块";

	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(OperateJsonform operateJsonform,
			ResponseMessage responseMessage) throws Exception {

		Operate operate = new Operate();

		BeanUtils.copyProperties(operate, operateJsonform);

		operate.setCreate_time(TimeUtils.getCurrentTimestamp());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(operate);

		return true;
	}

	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public PageQueryResult query(String groupuuid, String studentuuid,
			PaginationData pData) {
		String hql = "from Operate where 1=1";
		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid ='"
					+ groupuuid + "'";
		if (StringUtils.isNotBlank(studentuuid))
			hql += " and  studentuuid ='"
					+ studentuuid + "'";
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);

		return pageQueryResult;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return Operate.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
