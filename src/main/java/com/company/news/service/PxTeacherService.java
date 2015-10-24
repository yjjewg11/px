package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.PxTeacher;
import com.company.news.entity.PxTeacher4Q;
import com.company.news.jsonform.PxTeacherJsonform;
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
public class PxTeacherService extends AbstractService {
	private static final String model_name = "培训教师模块";

	public boolean save(PxTeacherJsonform userTeacherJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (StringUtils.isBlank(userTeacherJsonform.getUseruuid())) {
			responseMessage.setMessage("Useruuid不能为空！");
			return false;
		}
		
		if (userTeacherJsonform.getUseruuid().indexOf(",")>-1) {
			responseMessage.setMessage("只能选择一个老师");
			return false;
		}
		PxTeacher ut=null;
		if(StringUtils.isNotBlank(userTeacherJsonform.getUuid())){
			ut=(PxTeacher) this.nSimpleHibernateDao.getHibernateTemplate().get(PxTeacher.class, userTeacherJsonform.getUuid());
			if(ut==null){
				responseMessage.setMessage("更新记录不存在");
				return false;
			}
		}
		
		if(ut==null){
			ut = new PxTeacher();
			userTeacherJsonform.setUuid(null);
		}
		userTeacherJsonform.setImg(PxStringUtil.imgUrlToUuid(userTeacherJsonform.getImg()));
		BeanUtils.copyProperties(ut, userTeacherJsonform);
		ut.setUpdate_time(TimeUtils.getCurrentTimestamp());
		this.nSimpleHibernateDao.getHibernateTemplate().saveOrUpdate(ut);

		return true;
	}


	/**
	 * 
	 * @param groupuuid
	 * @param classuuid
	 * @param name
	 * @param pData
	 * @return
	 */
	public PageQueryResult queryByPage(String groupuuid,String name, PaginationData pData) {
		String hql = "from PxTeacher4Q where 1=1";
		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(name))
			hql += " and  name  like '%" + name + "%' ";

		hql += " order by groupuuid, convert(name, 'gbk') ";

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHql(hql, pData);
		this.warpVoList(pageQueryResult.getData());

		return pageQueryResult;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	protected PxTeacher warpVo(PxTeacher o) {
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		o.setImg(PxStringUtil.imgUrlByUuid(o.getImg()));
		return o;
	}
	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	protected PxTeacher4Q warpVo(PxTeacher4Q o) {
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		o.setImg(PxStringUtil.imgUrlByUuid(o.getImg()));
		return o;
	}

//	/**
//	 * vo输出转换
//	 * 
//	 * @param list
//	 * @return
//	 */
	protected List warpVoList(List list) {
		for (Object o : list) {
			if(o instanceof PxTeacher4Q)warpVo((PxTeacher4Q)o);
			else if(o instanceof PxTeacher)warpVo((PxTeacher)o);
			
		}
		return list;
	}
	/**
	 *获取用户-老师详细信息.
	 * 
	 * @return
	 */
	public PxTeacher get(String uuid) {
		
		PxTeacher o=(PxTeacher) this.nSimpleHibernateDao.getHibernateTemplate().get(PxTeacher.class, uuid);
		this.warpVo(o);
		return o;
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
