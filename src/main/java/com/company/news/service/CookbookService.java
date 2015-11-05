package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Cookbook;
import com.company.news.entity.User;
import com.company.news.jsonform.CookbookJsonform;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class CookbookService extends AbstractService {
	private static final String model_name = "菜谱模块";
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(CookbookJsonform cookbook,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(cookbook.getName()) || cookbook.getName().length() > 45) {
			responseMessage.setMessage("食谱名不能为空！，且长度不能超过45位！");
			return false;
		}
		
		if (cookbook.getName().indexOf("$")>-1||cookbook.getName().indexOf(",")>-1) {
			responseMessage.setMessage("名字中不能包含以下字符:$,");
			return false;
		}

		if (cookbook.getType()==null) {
			responseMessage.setMessage("type不能为空！");
			return false;
		}
		
		//避免NULL存在
		if (StringUtils.isBlank(cookbook.getGroupuuid())) {
			cookbook.setGroupuuid("");
		}

		cookbook.setImg(PxStringUtil.imgUrlToUuid(cookbook.getImg()));
		
		
		Cookbook cb = new Cookbook();

		BeanUtils.copyProperties(cb, cookbook);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(cb);

		return true;
	}

	/**
	 * 查询.根据名称排序.
	 * 
	 * @return
	 */
	public List<Cookbook> query(Integer type,String groupuuid) {
		if (type==null)
			return null;
		String hql="";
		if(StringUtils.isNotBlank(groupuuid))
			hql+=" and (groupuuid='"+groupuuid+"' or groupuuid='')";
		List<Cookbook> list= (List<Cookbook>) this.nSimpleHibernateDao
					.getHibernateTemplate().find("from Cookbook where type=?"+hql+" order by convert(name, 'gbk')",
							type);
		warpVoList(list);
		
		return list;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private Cookbook warpVo(Cookbook o){
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
			o.setImg(PxStringUtil.imgSmallUrlByUuid(o.getImg()));
		return o;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List<Cookbook> warpVoList(List<Cookbook> list){
		for(Cookbook o:list){
			warpVo(o);
		}
		return list;
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

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
