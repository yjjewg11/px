package com.company.news.service;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.entity.BaseDataList;
import com.company.news.entity.BaseDataType;
import com.company.news.entity.Right;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class BaseDataListService extends AbstractServcice {
	public static final int enable_default = 1;// 可用

	/**
	 * 新增权限
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 */
	public BaseDataList add(String datavalue, String description, String datakey,
			String typeuuid, String enable, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(datavalue) || datavalue.length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(typeuuid)) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(datakey)) {
			responseMessage.setMessage("KEY不能为空");
			return null;
		}

		BaseDataList baseDataList = new BaseDataList();

		if (StringUtils.isBlank(enable)) {
			baseDataList.setEnable(1);
		} else
			baseDataList.setEnable(Integer.parseInt(enable));
		baseDataList.setDatakey(Integer.parseInt(datakey));

		baseDataList.setDescription(description);
		baseDataList.setTypeuuid(typeuuid);
		baseDataList.setDatavalue(datavalue);

		this.nSimpleHibernateDao.getHibernateTemplate().save(baseDataList);
		return baseDataList;

	}

	/**
	 * 
	 * @param uuid
	 * @param value
	 * @param description
	 * @param key
	 * @param typeuuid
	 * @param enable
	 * @param responseMessage
	 * @return
	 */
	public BaseDataList update(String uuid, String datavalue, String description,
			String datakey, String typeuuid, String enable,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(datavalue) || datavalue.length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(typeuuid)) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(datakey)) {
			responseMessage.setMessage("KEY不能为空");
			return null;
		}

		BaseDataList baseDataList = (BaseDataList) this.nSimpleHibernateDao
				.getObject(BaseDataList.class, uuid);
		if (baseDataList != null) {
			if (StringUtils.isBlank(enable)) {
				baseDataList.setEnable(enable_default);
			} else
				baseDataList.setEnable(Integer.parseInt(enable));
			baseDataList.setDatakey(Integer.parseInt(datakey));

			baseDataList.setDescription(description);
			baseDataList.setTypeuuid(typeuuid);
			baseDataList.setDatavalue(datavalue);
			this.nSimpleHibernateDao.getHibernateTemplate()
					.update(baseDataList);
		}else{
			responseMessage.setMessage("更新对象不存在，");
		}

		return baseDataList;

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
					"delete from BaseDataList where uuid in(?)", uuid);

		} else {
			this.nSimpleHibernateDao.deleteObjectById(BaseDataList.class, uuid);
		}

		return true;
	}

	/**
	 * 查询所有权限
	 * 
	 * @return
	 */
	public List<BaseDataList> getBaseDataListByTypeuuid(String typeuuid) {
		if(StringUtils.isEmpty(typeuuid))
			return null;
		
		return (List<BaseDataList>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from BaseDataList where typeuuid=?", typeuuid);

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return BaseDataListService.class;
	}

}
