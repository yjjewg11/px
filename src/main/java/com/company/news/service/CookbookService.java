package com.company.news.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Cookbook;
import com.company.news.entity.User;
import com.company.news.jsonform.CookbookJsonform;
import com.company.news.rest.util.DBUtil;
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
		cb.setStatus(0);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(cb);

		return true;
	}

	/**
	 * 查询.根据名称排序.
	 * 
	 * @return
	 */
	public List<Map> query(Integer type,String groupuuid) {
		if (type==null)
			return null;
		String wheregroup="";
		if(StringUtils.isNotBlank(groupuuid))
			wheregroup+=" and groupuuid in("+DBUtil.stringsToWhereInValue(groupuuid)+")";
//		List<Cookbook> list= (List<Cookbook>) this.nSimpleHibernateDao
//					.getHibernateTemplate().find("from Cookbook where status=0 and type=? "+hql+" order by convert(name, 'gbk')",
//							type);
		String sql="SELECT uuid,name,img from px_cookbook where status=0 and type= "+type+wheregroup+" order by CONVERT( name USING gbk)";
		List<Map> list=this.nSimpleHibernateDao.queryListMapBySql(sql);
		warpMapList(list);
		
		return list;
	}
	
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List<Map> warpMapList(List<Map> list){
		for(Map o:list){
			o.put("img", PxStringUtil.imgSmallUrlByUuid((String)o.get("img")));
		}
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
	public boolean delete(String uuid,String groups, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}

		//rel_uuid,create_useruuid
		String insertsql="update px_cookbook set  status=9  where uuid in("+DBUtil.stringsToWhereInValue(uuid)+") and groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
		int count=this.nSimpleHibernateDao.createSqlQuery(insertsql).executeUpdate();
		
		
		
		if(count>0)
			return true;
		responseMessage.setMessage("无权删除");

		return false;
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
