package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.beanutils.converters.SqlTimestampConverter;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.MyUbbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.ClassNews;
import com.company.news.entity.ClassNewsDianzan;
import com.company.news.entity.User;
import com.company.news.jsonform.ClassNewsDianzanJsonform;
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
	public boolean add(ClassNewsJsonform classNewsJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(classNewsJsonform.getTitle())
				|| classNewsJsonform.getTitle().length() > 128) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}

		if (StringUtils.isBlank(classNewsJsonform.getClassuuid())) {
			responseMessage.setMessage("groupuuid不能为空！");
			return false;
		}

		ClassNews cn = new ClassNews();

		BeanUtils.copyProperties(cn, classNewsJsonform);
		cn.setCreate_time(TimeUtils.getCurrentTimestamp());
		cn.setUpdate_time(TimeUtils.getCurrentTimestamp());
		cn.setReply_time(TimeUtils.getCurrentTimestamp());
		cn.setUsertype(USER_type_default);
		// 有事务管理，统一在Controller调用时处理异常
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
	public boolean update(ClassNewsJsonform classNewsJsonform,
			ResponseMessage responseMessage) throws Exception {
		
		if (StringUtils.isBlank(classNewsJsonform.getTitle())
				|| classNewsJsonform.getTitle().length() > 128) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}

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
		String hql = "from ClassNews where 1=1";
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
		this.nSimpleHibernateDao.getHibernateTemplate().clear();
		for(ClassNews o:list){
			o.setShare_url(PxStringUtil.getClassNewsByUuid(o.getUuid()));
			o.setContent(MyUbbUtils.myUbbTohtml(o.getContent()));
			try {
				o.setCount(countService.count(o.getUuid(), SystemConstants.common_type_hudong));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
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

}
