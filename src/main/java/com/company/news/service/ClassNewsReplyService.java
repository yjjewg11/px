package com.company.news.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.ClassNews;
import com.company.news.entity.ClassNewsReply;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.ClassNewsReplyJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.DianzanListVO;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class ClassNewsReplyService extends AbstractService {
	private static final String model_name = "回复模块";
	public static final int USER_type_default = 0;// 0:老师
	@Autowired
	public PushMsgIservice pushMsgIservice;
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(SessionUserInfoInterface user, ClassNewsReplyJsonform classNewsReplyJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(classNewsReplyJsonform.getContent())) {
			responseMessage.setMessage("内容不能为空！");
			return false;
		}

		if (StringUtils.isBlank(classNewsReplyJsonform.getNewsuuid())) {
			responseMessage.setMessage("Newsuuid不能为空！");
			return false;
		}

		ClassNewsReply cn = new ClassNewsReply();
		BeanUtils.copyProperties(cn, classNewsReplyJsonform);
		PxStringUtil.addCreateUser(user, cn);

		cn.setCreate_time(TimeUtils.getCurrentTimestamp());
//		cn.setUpdate_time(TimeUtils.getCurrentTimestamp());
		cn.setUsertype(USER_type_default);
		cn.setStatus(SystemConstants.Check_status_fabu);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(cn);
		//暂时屏蔽.

		if(cn.getType()!=null){
			if(SystemConstants.common_type_hudong==cn.getType().intValue()){
				pushMsgIservice.pushMsg_replay_to_classNews_to_teacherOrParent(cn.getNewsuuid(), user.getName()+":"+cn.getContent());
			}
		}
		
		return true;
	}

	/**
	 * 更新班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(SessionUserInfoInterface user, ClassNewsReplyJsonform classNewsReplyJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(classNewsReplyJsonform.getContent())) {
			responseMessage.setMessage("content不能为空！");
			return false;
		}

		ClassNewsReply cn = (ClassNewsReply) this.nSimpleHibernateDao.getObjectById(ClassNewsReply.class,
				classNewsReplyJsonform.getUuid());

		if (cn != null) {
			cn.setContent(classNewsReplyJsonform.getContent());
//			cn.setUpdate_time(TimeUtils.getCurrentTimestamp());

			this.nSimpleHibernateDao.getHibernateTemplate().update(cn);
		} else {
			responseMessage.setMessage("对象不存在");
			return true;
		}

		return true;
	}

	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public PageQueryResult query(String newsuuid, PaginationData pData,boolean isQueryAllStatus) {
		String hql=null;
		if(isQueryAllStatus){
			 hql = "from ClassNewsReply ";
			if (StringUtils.isNotBlank(newsuuid))
				hql += " where  newsuuid='" + DbUtils.safeToWhereString(newsuuid) + "'";
		}else{
			 hql = "from ClassNewsReply where  status =" + SystemConstants.Check_status_fabu;
				if (StringUtils.isNotBlank(newsuuid))
					hql += " and  newsuuid='" + DbUtils.safeToWhereString(newsuuid) + "'";
		}

		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");
		
		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHqlNoTotal(hql, pData);
		List<ClassNewsReply> list = pageQueryResult.getData();

		return pageQueryResult;

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

		if (uuid.indexOf(",") != -1) // 多ID
		{
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate("delete from ClassNewsReply where uuid in(?)",
					uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(ClassNewsReply.class, uuid);
		}

		return true;
	}

	public ClassNewsReply get(String uuid) throws Exception {
		return (ClassNewsReply) this.nSimpleHibernateDao.getObjectById(ClassNewsReply.class, uuid);
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return ClassNews.class;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	private ClassNewsReply warpVo(ClassNewsReply o) {
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		try {
//			o.setDianzan(this.getDianzanDianzanListVO(o.getUuid(), cur_user_uuid));
			o.setCreate_img(PxStringUtil.imgSmallUrlByUuid(o.getCreate_img()));
			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return o;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	public List<ClassNewsReply> warpVoList(List<ClassNewsReply> list,SessionUserInfoInterface user) {
		
		
		String uuids="";
		for(ClassNewsReply o:list){
			uuids+=o.getUuid()+",";
		}
		
		try {
			Map dianZanMap=this.getDianzanDianzanMap(uuids, user);
			
			
			for (ClassNewsReply o : list) {
				warpVo(o);
				o.setDianzan((DianzanListVO)dianZanMap.get(o.getUuid()));
			}
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 查询回复列表分页(每个回复带点赞数据)
	 * 
	 * @return
	 * @throws Exception
	 */
	public PageQueryResult getReplyPageListAndRelyDianzan(String newsuuid, String cur_user_uuid) throws Exception {
		if (StringUtils.isBlank(newsuuid)) {
			return new PageQueryResult();
		}

		PaginationData pData = new PaginationData();
		String hql = "from ClassNewsReply where  status =" + SystemConstants.Check_status_fabu + " and  newsuuid='"
				+ DbUtils.safeToWhereString(newsuuid) + "'";
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHqlNoTotal(hql, pData);
		List<ClassNewsReply> list = pageQueryResult.getData();
		this.nSimpleHibernateDao.getHibernateTemplate().clear();
		for (ClassNewsReply o : list) {
			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
			o.setDianzan(this.getDianzanDianzanListVO(o.getUuid(), cur_user_uuid));
		}
		return pageQueryResult;

	}

	
	/**
	 * 获取点赞列表信息
	 * 
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public Map<String,DianzanListVO> getDianzanDianzanMap(String reluuids, SessionUserInfoInterface user) throws Exception {
		Map<String,DianzanListVO> returnmap =new HashMap();
		if (StringUtils.isBlank(reluuids)) {
			return returnmap;
		}
		String useruuid="";
		
		if(user!=null)useruuid=user.getUuid();
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql="select t1.newsuuid  ,group_concat( t1.create_user) as user_names,count(1) as allcount,sum(case t1.create_useruuid when '"+DbUtils.safeToWhereString(useruuid)+"' then 1 else 0 end) as curuser_sum  from px_classnewsdianzan  t1 ";
		sql+=" where t1.newsuuid in("+DBUtil.stringsToWhereInValue(reluuids)+")";
		sql+=" GROUP BY t1.newsuuid  ";
		Query q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> list=q.list();
		
		for(Map map:list){
			DianzanListVO vo = new DianzanListVO();
			
			//统计当前用户点赞数量,0表示没点赞,可以点赞.
			vo.setCanDianzan("0".equals(map.get("curuser_sum")+""));
			vo.setCount(Integer.valueOf(map.get("allcount")+""));
			vo.setNames(map.get("user_names")+"");
			
			returnmap.put(map.get("newsuuid")+"", vo);
			
		}
		return returnmap;
	}

	/**
	 * 获取点赞列表信息
	 * 
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public DianzanListVO getDianzanDianzanListVO(String newsuuid, String cur_user_uuid) throws Exception {
		if (StringUtils.isBlank(newsuuid)) {
			return null;
		}
		DianzanListVO vo = new DianzanListVO();
		List list = this.nSimpleHibernateDao.getHibernateTemplate()
				.find("select create_user from ClassNewsDianzanOfShow where newsuuid=?", newsuuid);

		Boolean canDianzan = true;
		if (list.size() > 0 && StringUtils.isNotBlank(cur_user_uuid)) {
			canDianzan = this.canDianzan(newsuuid, cur_user_uuid);
		}
		vo.setCanDianzan(canDianzan);
		vo.setNames(StringUtils.join(list, ","));
		vo.setCount(list.size());
		return vo;
	}

	/**
	 * 判断是否能点赞
	 * 
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	private boolean canDianzan(String newsuuid, String create_useruuid) throws Exception {

		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(
				"select newsuuid from ClassNewsDianzan where newsuuid=? and create_useruuid=?", newsuuid,
				create_useruuid);
		if (list != null && list.size() > 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
