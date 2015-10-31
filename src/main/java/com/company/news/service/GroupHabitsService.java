package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import com.company.news.entity.BaseDataList;
import com.company.news.entity.GroupHabits;
import com.company.news.entity.GroupHeartBeat;
import com.company.news.jsonform.BaseDataListJsonform;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class GroupHabitsService extends AbstractService {
	private static final String model_name = "保存学校常用属性.上下班时间.";
	/**
	 * 
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public GroupHabits save(String groupuuid,String key,String value) throws IllegalAccessException, InvocationTargetException {
		if (StringUtils.isBlank(groupuuid)) {
//			responseMessage.setMessage("学校groupuuid不能为空");
			return null;
		}

		if (StringUtils.isBlank(key)) {
//			responseMessage.setMessage("key不能为空！");
			return null;
		}
		GroupHabits obj=null;
		List list=this.nSimpleHibernateDao.getHibernateTemplate().find("from GroupHabits where groupuuid=? and k=?", groupuuid,key);
		if(list.size()>0){
			obj=(GroupHabits)list.get(0);
		}else {
			obj=new GroupHabits();
			obj.setGroupuuid(groupuuid);
			obj.setK(key);
		}
		obj.setV(value);
		this.nSimpleHibernateDao.getHibernateTemplate().save(obj);
		return obj;

	}
	
	/**
	 * 
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public GroupHabits getByKey(String groupuuid,String key,ResponseMessage responseMessage) throws IllegalAccessException, InvocationTargetException {
		if (StringUtils.isBlank(groupuuid)) {
			responseMessage.setMessage("学校groupuuid不能为空");
			return null;
		}

		if (StringUtils.isBlank(key)) {
			responseMessage.setMessage("key不能为空！");
			return null;
		}
		GroupHabits obj=null;
		List list=this.nSimpleHibernateDao.getHibernateTemplate().find("from GroupHabits where groupuuid=? and k=?", groupuuid,key);
		if(list.size()>0){
			return (GroupHabits)list.get(0);
		}
		return null;

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

}
