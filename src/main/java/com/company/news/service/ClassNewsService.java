package com.company.news.service;

import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.ClassNews;
import com.company.news.entity.PClass;
import com.company.news.entity.User;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.ClassNewsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class ClassNewsService extends AbstractServcice {
	public static final int USER_type_default = 0;// 0:老师
	private static final String model_name = "互动模块";
	@Autowired
	private CountService countService;

	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(SessionUserInfoInterface user,ClassNewsJsonform classNewsJsonform,
			ResponseMessage responseMessage) throws Exception {
//		if (StringUtils.isBlank(classNewsJsonform.getTitle())
//				|| classNewsJsonform.getTitle().length() > 128) {
//			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
//			return false;
//		}

		if (StringUtils.isBlank(classNewsJsonform.getClassuuid())) {
			responseMessage.setMessage("必须选择一个班级");
			return false;
		}
		
		PClass pClass=(PClass)this.nSimpleHibernateDao.getObject(PClass.class, classNewsJsonform.getClassuuid());

		if(pClass==null){
			responseMessage.setMessage("选择的班级不存在");
			return false;
		}
		ClassNews cn = new ClassNews();

		BeanUtils.copyProperties(cn, classNewsJsonform);
		cn.setGroupuuid(pClass.getGroupuuid());
		cn.setCreate_time(TimeUtils.getCurrentTimestamp());
		cn.setUpdate_time(TimeUtils.getCurrentTimestamp());
		cn.setReply_time(TimeUtils.getCurrentTimestamp());
		cn.setUsertype(USER_type_default);
		cn.setStatus(SystemConstants.Check_status_fabu);
		cn.setIllegal(0l);
		
		// 有事务管理，统一在Controller调用时处理异常
		PxStringUtil.addCreateUser(user, cn);
		this.nSimpleHibernateDao.getHibernateTemplate().save(cn);

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
	public boolean update(SessionUserInfoInterface user,ClassNewsJsonform classNewsJsonform,
			ResponseMessage responseMessage) throws Exception {
		
//		if (StringUtils.isBlank(classNewsJsonform.getTitle())
//				|| classNewsJsonform.getTitle().length() > 128) {
//			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
//			return false;
//		}

		ClassNews cn = (ClassNews) this.nSimpleHibernateDao.getObjectById(
				ClassNews.class, classNewsJsonform.getUuid());

		if (cn != null) {
			cn.setImgs(classNewsJsonform.getImgs());
			cn.setContent(classNewsJsonform.getContent());
			cn.setTitle(classNewsJsonform.getTitle());
			cn.setUpdate_time(TimeUtils.getCurrentTimestamp());

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
	public PageQueryResult query(User user ,String type,String classuuid, PaginationData pData) {
		String hql = "from ClassNews where status=0";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		if("myByTeacher".equals(type)){
			hql += " and  classuuid in (select classuuid from UserClassRelation where useruuid='"+ user.getUuid() + "')";
		}
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);
		List<ClassNews> list=pageQueryResult.getData();
		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;

	}
	
	/**
	 * 查询我班级相关的班级数据.
	 * 
	 * @return
	 */
	public PageQueryResult getClassNewsByMy(User user ,String type,String classuuid, PaginationData pData) {
		String hql = "from ClassNews where status=0 ";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		else if("all".equals(type)) {//查询所有数据
			
		}else  {
			hql += " and  classuuid in (select classuuid from UserClassRelation where useruuid='"+ user.getUuid() + "')";
		}
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);
		List<ClassNews> list=pageQueryResult.getData();
		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;

	}

	/**
	 * 查询我班级相关的班级数据.
	 * 
	 * @return
	 */
	public PageQueryResult getAllClassNews(User user ,String type,String classuuid, PaginationData pData) {
		String hql = "from ClassNews where status=0 ";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  classuuid in("+DBUtil.stringsToWhereInValue(classuuid)+")";
		
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);
		List<ClassNews> list=pageQueryResult.getData();
		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;

	}

	
	/**
	 * 根据机构UUID,获取班级互动
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCollectionByGroup(String groupuuid,String begDateStr, String endDateStr) {
		Date begDate = TimeUtils.string2Timestamp(null, begDateStr);
		Date endDate = TimeUtils.string2Timestamp(null, endDateStr);
		List list= (List) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("select count(uuid),classuuid from ClassNews  where create_time<=? and create_time >=?  and classuuid in(select uuid from PClass where groupuuid=?) group by classuuid)",endDate,begDate,groupuuid);
		
		return list;
	}
	
	
	/**
	 * 根据机构UUID,获取班级热门互动top
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getClassNewsCountByGroup(String groupuuid,String begDateStr, String endDateStr) {
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String sql="";
		Query q = s.createSQLQuery("SELECT c.count,cn.title,cn.create_user FROM pxdb.px_count c left join px_classnews cn on c.ext_uuid=cn.uuid "
				+ "where ext_uuid in (select uuid from px_classnews where create_time<='"+endDateStr+"' and create_time>='"+begDateStr+"' and classuuid in "
				+ "(select uuid from px_class where groupuuid='"+groupuuid+"'))"
				+ "order by count desc;");

		
		return q.list();
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
					"delete from ClassNews where uuid in(?)", uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from ClassNewsReply where newsuuid in(?)", uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(ClassNews.class, uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from ClassNewsReply where newsuuid =?", uuid);
		}

		return true;
	}

	public ClassNewsJsonform get(String uuid) throws Exception {
		ClassNews cn = (ClassNews) this.nSimpleHibernateDao.getObjectById(
				ClassNews.class, uuid);
		ClassNewsJsonform cnjf = new ClassNewsJsonform();
		BeanUtils.copyProperties(cnjf, cn);

		cnjf.setContent(MyUbbUtils.myUbbTohtml(cnjf.getContent()));
		cnjf.setImgs(PxStringUtil.imgUrlByUuid(cn.getImgs()));
//		// 计数
//		cnjf.setCount(countService.count(uuid,
//				SystemConstants.common_type_hudong));

		return cnjf;

	}



	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return ClassNews.class;
	}

	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private ClassNews warpVo(ClassNews o,String cur_user_uuid){
		try {
			this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
			//网页版本需要转为html显示.
			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
			o.setImgsList(PxStringUtil.uuids_to_imgurlList(o.getImgs()));
			o.setShare_url(PxStringUtil.getClassNewsByUuid(o.getUuid()));
			o.setCount(countService.count(o.getUuid(), SystemConstants.common_type_hudong));
			o.setDianzan(this.getDianzanDianzanListVO(o.getUuid(), cur_user_uuid));
			o.setReplyPage(this.getReplyPageList(o.getUuid()));
			o.setCreate_img(PxStringUtil.imgSmallUrlByUuid(o.getCreate_img()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return o;
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List<ClassNews> warpVoList(List<ClassNews> list,String cur_user_uuid){
		for(ClassNews o:list){
			warpVo(o,cur_user_uuid);
		}
		return list;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

	public PageQueryResult listClassNewsByAdmin(String groups,User user,
			PaginationData pData) {
		String hql = "from ClassNews where status=0 ";
		if (StringUtils.isNotBlank(groups))
			hql += " and  groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
	
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);
		List<ClassNews> list=pageQueryResult.getData();
		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;
	}

	public PageQueryResult listClassNewsByMygroup(String groups, User user,
			PaginationData pData) {
		String hql = "from ClassNews where status=0 ";
		if (StringUtils.isNotBlank(groups))
			hql += " and  groupuuid in("+DBUtil.stringsToWhereInValue(groups)+")";
	
		pData.setOrderFiled("create_time");
		pData.setOrderType("desc");

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao
				.findByPaginationToHql(hql, pData);
		List<ClassNews> list=pageQueryResult.getData();
		this.warpVoList(list, user.getUuid());
		
		return pageQueryResult;
	}
}
