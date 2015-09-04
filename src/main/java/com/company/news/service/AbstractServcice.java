package com.company.news.service;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.company.news.SystemConstants;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.ClassNewsReply;
import com.company.news.entity.Logs;
import com.company.news.entity.User;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.DianzanListVO;
import com.company.web.listener.SessionListener;

public abstract class AbstractServcice {
  public static final String ID_SPLIT_MARK = ",";
  protected static Logger logger = Logger.getLogger(AbstractServcice.class);
  @Autowired
  @Qualifier("NSimpleHibernateDao")
  protected NSimpleHibernateDao nSimpleHibernateDao;
  /**
   * 数据库实体
   * @return
   */
  public abstract Class getEntityClass();
  
  /**
   * 模块名，中文，用于进行日志记录
   * @return
   */
  public abstract String getEntityModelName();
  
	 /**
	  * 重要的操作记录到 日志.
	  * @param doorRecord
	  * @throws Exception
	  */
	  public  void addLog(String model,String target,String context,HttpServletRequest request){
		  try {
			  
			Logs logs = new Logs();
				logs.setCreate_time(TimeUtils.getCurrentTimestamp());
				logs.setModelname(model);
				logs.setTarget(target);
				logs.setContext(context);
				User user = SessionListener.getUserInfoBySession(request);
				if (user != null) {
					logs.setCreate_user(user.getName());
					logs.setCreate_useruuid(user.getUuid());
				}

			this.nSimpleHibernateDao.save(logs);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		  
	  }
  /*
	 * 
	 * 判断是否是班级的班主任老师
	 */
	public boolean isheadteacher(String user_uuids,String classuuid){
		String hql="select uuid from UserClassRelation where type=? and classuuid=? and useruuid in("+DBUtil.stringsToWhereInValue(user_uuids)+")";
		List list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql, SystemConstants.class_usertype_head,classuuid);
		if(list.size()>0)return true;
		return false;
	}
	/**
	 * 获取老师相关班级的uuid
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public List getTeacherRelClassUuids(String user_uuid) throws Exception {
		this.logger.info("user_uuid="+user_uuid);
		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(
				"select classuuid from UserClassRelation where useruuid=?",
				user_uuid);
		return list;
	}
  
  /**
	 * 查询回复列表分页
	 * 
	 * @return
	 */
	public PageQueryResult getReplyPageList(String newsuuid) {
		if (StringUtils.isBlank(newsuuid)) {
			return new PageQueryResult();
		}
		
		PaginationData pData=new PaginationData();
		pData.setPageSize(5);
		String hql="from ClassNewsReply where  status ="+SystemConstants.Check_status_fabu +" and  newsuuid='"+newsuuid+"'";
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");
		
		PageQueryResult pageQueryResult= this.nSimpleHibernateDao.findByPaginationToHqlNoTotal(hql, pData);
		List<ClassNewsReply> list=pageQueryResult.getData();
		
		for(ClassNewsReply o:list){
			this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
			o.setCreate_img(PxStringUtil.imgSmallUrlByUuid(o.getCreate_img()));
		}
		return pageQueryResult;
				
	}
	

	  /**
		 * 查询回复列表分页(每个回复带点赞数据)
		 * 
		 * @return
	 * @throws Exception 
		 */
		public PageQueryResult getReplyPageListAndRelyDianzan(String newsuuid,String cur_user_uuid) throws Exception {
			if (StringUtils.isBlank(newsuuid)) {
				return new PageQueryResult();
			}
			
			PaginationData pData=new PaginationData();
			String hql="from ClassNewsReply where  status ="+SystemConstants.Check_status_fabu +" and  newsuuid='"+newsuuid+"'";
			pData.setOrderFiled("create_time");
			pData.setOrderType("desc");
			
			PageQueryResult pageQueryResult= this.nSimpleHibernateDao.findByPaginationToHqlNoTotal(hql, pData);
			List<ClassNewsReply> list=pageQueryResult.getData();
			this.nSimpleHibernateDao.getHibernateTemplate().clear();
			for(ClassNewsReply o:list){
				o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
				o.setDianzan(this.getDianzanDianzanListVO(o.getUuid(), cur_user_uuid));
			}
			return pageQueryResult;
					
		}
  
  /**
	 * 获取点赞列表信息
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public DianzanListVO getDianzanDianzanListVO(String newsuuid,String cur_user_uuid) throws Exception {
		if (StringUtils.isBlank(newsuuid)) {
			return null;
		}
		DianzanListVO vo=new DianzanListVO();
		 List list=this.nSimpleHibernateDao.getHibernateTemplate().find(
				"select create_user from ClassNewsDianzanOfShow where newsuuid=?", newsuuid);
		
		
		Boolean canDianzan=true;
		if(list.size()>0&&StringUtils.isNotBlank(cur_user_uuid)){
			canDianzan=this.canDianzan(newsuuid,cur_user_uuid);
		}
		vo.setCanDianzan(canDianzan);
		vo.setNames(StringUtils.join(list,","));
		vo.setCount( list.size());
		return vo;
	}
	
	/**
	 * 判断是否能点赞
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public boolean canDianzan(String newsuuid,String create_useruuid) throws Exception {

		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(
				"select newsuuid from ClassNewsDianzan where newsuuid=? and create_useruuid=?",
				newsuuid,create_useruuid);
		if (list != null && list.size() > 0) {
			return false;
		}
		return true;
	}
	

	/**
	 * 是否可以收藏
	 * 
	 * @param loginname
	 * @return
	 */
	public boolean isFavorites(String user_uuid,String reluuid) {
		if(StringUtils.isBlank(reluuid)||StringUtils.isBlank(user_uuid))return false;
		List list = nSimpleHibernateDao.getHibernateTemplate().find("select reluuid from Favorites where reluuid=? and user_uuid=?", reluuid,user_uuid);

		if (list != null&&list.size()>0)// 已被占用
			return false;
		else
			return true;

	}
}
