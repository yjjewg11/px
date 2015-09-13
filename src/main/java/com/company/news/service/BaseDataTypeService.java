package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.entity.BaseDataType;
import com.company.news.entity.Right;
import com.company.news.jsonform.BaseDataTypeJsonform;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class BaseDataTypeService extends AbstractService {
	private static final String model_name = "基础数据类型模块";
	/**
	 * 新增权限
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public BaseDataType add(BaseDataTypeJsonform baseDataTypeJsonform,
			ResponseMessage responseMessage) throws IllegalAccessException, InvocationTargetException {
		if (StringUtils.isBlank(baseDataTypeJsonform.getName()) || baseDataTypeJsonform.getName().length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(baseDataTypeJsonform.getDescription()) || baseDataTypeJsonform.getDescription().length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (isExitSameRightByname(baseDataTypeJsonform.getName(),null)) {
			responseMessage.setMessage("存在相同的权限名，");
			return null;
		}

		BaseDataType baseDataType = new BaseDataType();
		BeanUtils.copyProperties(baseDataType, baseDataTypeJsonform);
		

		this.nSimpleHibernateDao.getHibernateTemplate().save(baseDataType);
		return baseDataType;

	}

	/**
	 * 更新权限
	 * 
	 * @param uuid
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public BaseDataType update(BaseDataTypeJsonform baseDataTypeJsonform,
			ResponseMessage responseMessage) throws IllegalAccessException, InvocationTargetException {
		if (StringUtils.isBlank(baseDataTypeJsonform.getName()) || baseDataTypeJsonform.getName().length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(baseDataTypeJsonform.getDescription()) || baseDataTypeJsonform.getDescription().length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(baseDataTypeJsonform.getUuid())) {
			responseMessage.setMessage("ID不能为空！");
			return null;
		}

		if (isExitSameRightByname(baseDataTypeJsonform.getName(),baseDataTypeJsonform.getUuid())) {
			responseMessage.setMessage("存在相同的权限名，");
			return null;
		}

		BaseDataType baseDataType = (BaseDataType) this.nSimpleHibernateDao.getObject(BaseDataType.class,
				baseDataTypeJsonform.getUuid());
		if (baseDataType != null) {
			if(!baseDataType.getName().equals(baseDataTypeJsonform.getName())){
				this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
						"update  BaseDataList set typeuuid=?  where typeuuid=?", baseDataTypeJsonform.getName(),baseDataType.getName());
			}
			
			BeanUtils.copyProperties(baseDataType, baseDataTypeJsonform);

			this.nSimpleHibernateDao.getHibernateTemplate().update(baseDataType);
		}else{
			responseMessage.setMessage("更新对象不存在，");
		}

		return baseDataType;

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
					"delete from BaseDataType where uuid in(?)", uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from BaseDataList where typeuuid in(?)", uuid);
		}
		else
		{
			this.nSimpleHibernateDao.deleteObjectById(BaseDataType.class, uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from BaseDataList where typeuuid =?", uuid);			
		}

		return true;
	}

	/**
	 * 查询所有权限
	 * 
	 * @return
	 */
	public List<BaseDataType> query() {
		return (List<BaseDataType>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from BaseDataType order by name", null);

	}

	/**
	 * 权限名是否存在
	 * 
	 * @param company_name
	 * @return
	 */
	private boolean isExitSameRightByname(String name,String uuid) {
		String attribute = "name";
		BaseDataType baseDataType = (BaseDataType) nSimpleHibernateDao.getObjectByAttribute(BaseDataType.class,
				attribute, name);

		if (baseDataType != null)// 已被占用
		{
			// 判断的是自身
			if (StringUtils.isNotEmpty(uuid) && baseDataType.getUuid().equals(uuid))
				return false;
			else
				return true;
			
		}
		else
			return false;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return BaseDataTypeService.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
