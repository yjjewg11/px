package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Cookbook;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.Right;
import com.company.news.entity.User;
import com.company.news.entity.UserClassRelation;
import com.company.news.entity.UserGroupRelation;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class CookbookService extends AbstractServcice {

	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(String name, String img, String type,String groupuuid,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(name) || name.length() > 45) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}

		if (StringUtils.isBlank(type)) {
			responseMessage.setMessage("type不能为空！");
			return false;
		}
		
		if (StringUtils.isBlank(groupuuid)) {
			responseMessage.setMessage("groupuuid不能为空！");
			return false;
		}

		Cookbook cb = new Cookbook();

		cb.setName(name);
		cb.setImg(img);
		cb.setType(Integer.parseInt(type));
		cb.setGroupuuid(groupuuid);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(cb);

		return true;
	}

	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public List<Cookbook> query(Integer type,String groupuuid) {
		if (type==null)
			return null;
		if(StringUtils.isBlank(groupuuid))
			return null;
			return (List<Cookbook>) this.nSimpleHibernateDao
					.getHibernateTemplate().find("from Cookbook where type=?",
							type);
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
					"delete from Cookbook where uuid in(?)", uuid);

		} else {
			this.nSimpleHibernateDao.deleteObjectById(Cookbook.class, uuid);

		}

		return true;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

}
