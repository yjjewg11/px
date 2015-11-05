package com.company.news.service;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.entity.PxTelConsultation;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class PxTelConsultationService extends AbstractService {

	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public PxTelConsultation get(String uuid) {
		PxTelConsultation t = (PxTelConsultation) this.nSimpleHibernateDao.getObjectById(
				PxTelConsultation.class, uuid);

		return t;

	}

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean delete(String uuid, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}

		if (uuid.indexOf(",") != -1)// 多ID
		{
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from PxTelConsultation where uuid in(?)", uuid);

		} else {
			this.nSimpleHibernateDao.deleteObjectById(PxTelConsultation.class, uuid);

		}

		return true;
	}

	/**
	 * 
	 * @param groupuuid
	 * @param pData
	 * @param point
	 * @return
	 */
	public PageQueryResult queryByPage(String group_uuid, PaginationData pData) {

		if (StringUtils.isBlank(group_uuid)) {
			return null;
		}
		String hql = "from PxTelConsultation where group_uuid='" + group_uuid
				+ "' order by create_time desc";

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);

		return pageQueryResult;
	}

	


	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return PxTelConsultation.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return null;
	}

}
