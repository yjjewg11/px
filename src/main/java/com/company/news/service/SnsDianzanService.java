package com.company.news.service;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.vo.ResponseMessage;

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
		int flag=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).executeUpdate();

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
	 * 判断是否能点赞
	 * @param snsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public boolean canDianzan(String rel_uuid,String user_uuid) throws Exception {
		if (StringUtils.isBlank(rel_uuid)) {
			return true;
		}
		if (StringUtils.isBlank(user_uuid)) {
			return true;
		}
		String insertsql="select count(*) from sns_dianzan where rel_uuid='"+rel_uuid+"' and user_uuid='"+user_uuid+"'";
		Object count=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).uniqueResult();
		
		if("0".equals(count.toString())){
			return true;
		}
		return false;
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


}
