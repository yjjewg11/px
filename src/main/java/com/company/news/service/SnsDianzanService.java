package com.company.news.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hibernate.HibernateException;
import org.springframework.stereotype.Service;

import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.DBUtil;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class SnsDianzanService extends AbstractService {
	public static final int USER_type_default = 0;// 0:老师
	private static final String model_name = "点赞模块";

	/**
	 * 
	 * @param snsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public boolean updateDianzan(String rel_uuid,String user_uuid ,Integer status,ResponseMessage responseMessage) {
		if (StringUtils.isBlank(rel_uuid)) {
			responseMessage.setMessage("Rel_uuid不能为空！");
			return false;
		}
		if (StringUtils.isBlank(user_uuid)) {
			responseMessage.setMessage("user_uuid不能为空！");
			return false;
		}
		String insertsql="insert into sns_dianzan(rel_uuid,user_uuid,status,create_time) values('"+rel_uuid+"','"+user_uuid+"',"+status+",now())";
		try {
			int flag=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).executeUpdate();
		} catch (org.hibernate.exception.ConstraintViolationException e) {
			responseMessage.setMessage("你已过投票!");
			return false;
		}

		//		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(
//				"from SnsDianzan where rel_uuid=? and user_uuid=?",
//				snsDianzanJsonform.getRel_uuid(),
//				snsDianzanJsonform.getUser_uuid());
//		if (list != null && list.size() > 0) {
//			responseMessage.setMessage("不能重复点赞！");
//			return false;
//		} else {
//			ClassNewsDianzan cndz = new ClassNewsDianzan();
//			BeanUtils.copyProperties(cndz, snsDianzanJsonform);
//			cndz.setCreate_time(TimeUtils.getCurrentTimestamp());
//			cndz.setUsertype(USER_type_default);
//			this.nSimpleHibernateDao.getHibernateTemplate().save(cndz);
//		}

		return true;
	}

	

	/**
	 * 获取当前用户点赞状态.
	 * @param rel_uuid
	 * @param user_uuid
	 * @return
	 */
	public Integer cancelDianzan(String rel_uuid,String user_uuid ,ResponseMessage responseMessage) {
		
		
		if (StringUtils.isBlank(rel_uuid)) {
			responseMessage.setMessage("Rel_uuid不能为空！");
			return null;
		}
		if (StringUtils.isBlank(user_uuid)) {
			responseMessage.setMessage("user_uuid不能为空！");
			return null;
		}
		
		rel_uuid=DbUtils.safeToWhereString(rel_uuid);
		user_uuid=DbUtils.safeToWhereString(user_uuid);
		String sql="select status from sns_dianzan where rel_uuid='"+rel_uuid+"' and user_uuid='"+user_uuid+"' limit 0,1";
		Object status=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).uniqueResult();
		if(status==null)return null;

		
		String insertsql="delete from sns_dianzan where rel_uuid='"+rel_uuid+"' and user_uuid='"+user_uuid+"'";
		this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).executeUpdate();
		
		
		return Integer.valueOf(status.toString());
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return SnsDianzanService.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}
	
	
	/**
	 * 接口方法提供给关联对象判断是否可以点赞.
	 * @param list
	 * @param request
	 * @return
	 */
	public List warpReluuidsMapList(List<Map> list, HttpServletRequest request) {
		
		String uuids="";
		for(Map o:list){
			uuids+=o.get("uuid")+",";
			warpMap(o);
		}
		
		SessionUserInfoInterface user=SessionListener.getUserInfoBySession(request);
		if(user!=null){
			Map  dianzanMap=this.getMapCanDianzan(uuids,user);
			for(Map o:list){
				o.put(RestConstants.Return_ResponseMessage_dianZan, dianzanMap.get(o.get("uuid")));
			}
		}
		
		return list;
		
	}
	
	private void warpMap(Map o) {
		o.put("create_img", PxStringUtil.imgSmallUrlByUuid((String)o.get("create_img")));
		
	}
	
	/**
	 * 获取点赞状态数据.null,没点赞.1赞同,2不赞同.根据关联uuids,和当前用户id
	 * @param uuids
	 * @param cur_user_uuid
	 * @return
	 */
	public  Map getMapCanDianzan(String rel_uuids,SessionUserInfoInterface user) {
		Map map =new HashMap();
		if(user==null)return map;
		String sql="select rel_uuid,status from sns_dianzan where rel_uuid in("+DBUtil.stringsToWhereInValue(rel_uuids)+") and user_uuid='"+user.getUuid()+"'";
		List<Object[]> list=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).list();
		for(Object[] obj:list){
			map.put(obj[0], obj[1]);
		}
		return map;
	}

	
	/**
	 * 判断是否能点赞
	 * @param snsDianzanJsonform
	 * @param responseMessage
	 * @return null:没有点过,1:点赞.2:不赞同
	 * @throws Exception
	 */
	public Object getDianzanStatus(String rel_uuid,SessionUserInfoInterface user) throws Exception {
		if (StringUtils.isBlank(rel_uuid)) {
			return null;
		}
		if (user==null) {
			return null;
		}
		String insertsql="select status from sns_dianzan where rel_uuid='"+DbUtils.safeToWhereString(rel_uuid)+"' and user_uuid='"+user.getUuid()+"'";
		Object status=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).uniqueResult();
		return status;
	}

}
