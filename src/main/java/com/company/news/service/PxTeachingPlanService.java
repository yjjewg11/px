package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Cookbook;
import com.company.news.entity.CookbookPlan;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.PxClass;
import com.company.news.entity.PxTeachingplan;
import com.company.news.entity.Right;
import com.company.news.entity.Teachingplan;
import com.company.news.entity.User;
import com.company.news.entity.UserClassRelation;
import com.company.news.entity.UserGroupRelation;
import com.company.news.jsonform.ClassRegJsonform;
import com.company.news.jsonform.CookbookPlanJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.jsonform.PxClassRegJsonform;
import com.company.news.jsonform.PxTeachingPlanJsonform;
import com.company.news.jsonform.TeachingPlanJsonform;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class PxTeachingPlanService extends AbstractService {
	private static final String model_name = "培训结构教学计划模块";
	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(PxTeachingPlanJsonform pxTeachingPlanJsonform,
			ResponseMessage responseMessage) throws Exception {
		if(this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getPlandateStr(), "教学时间", responseMessage)
				||this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getClassuuid(), "班级", responseMessage)||
				this.validateRequireAndLengthByRegJsonform(pxTeachingPlanJsonform.getName(), 45, "教学课程名称", responseMessage))
		return false;
		
		Date plandate = TimeUtils.string2Timestamp(null,pxTeachingPlanJsonform.getPlandateStr());

		if (plandate == null) {
			responseMessage.setMessage("Plandate格式不正确");
			return false;
		}

		PxTeachingplan pxTeachingplan = new PxTeachingplan();
		BeanUtils.copyProperties(pxTeachingplan, pxTeachingPlanJsonform);
		
		pxTeachingplan.setPlandate(plandate);
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(pxTeachingplan);

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
	public boolean update(PxTeachingPlanJsonform pxTeachingPlanJsonform,
			ResponseMessage responseMessage) throws Exception {
		if(this.validateRequireByRegJsonform(pxTeachingPlanJsonform.getPlandateStr(), "教学时间", responseMessage)||
				this.validateRequireAndLengthByRegJsonform(pxTeachingPlanJsonform.getName(), 45, "教学课程名称", responseMessage))
		return false;
		
		Date plandate = TimeUtils.string2Timestamp(null,pxTeachingPlanJsonform.getPlandateStr());

		if (plandate == null) {
			responseMessage.setMessage("Plandate格式不正确");
			return false;
		}
		
		PxTeachingplan pxTeachingplan=(PxTeachingplan) this.nSimpleHibernateDao.getObject(PxTeachingplan.class, pxTeachingPlanJsonform.getUuid());
		pxTeachingplan.setPlandate(plandate);
		pxTeachingplan.setName(pxTeachingPlanJsonform.getName());
		pxTeachingplan.setContext(pxTeachingPlanJsonform.getContext());
		pxTeachingplan.setDuration(pxTeachingPlanJsonform.getDuration());
		pxTeachingplan.setReadyfor(pxTeachingPlanJsonform.getReadyfor());
		
		this.nSimpleHibernateDao.getHibernateTemplate().update(pxTeachingplan);
		return true;
	}


	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public List<PxTeachingplan> query(String begDateStr, String endDateStr,
			String classuuid) {
		if (StringUtils.isBlank(classuuid)) {
			return null;
		}

		if (StringUtils.isBlank(begDateStr)) {
			return null;
		}

		if (StringUtils.isBlank(endDateStr)) {
			return null;
		}

		Date begDate = TimeUtils.string2Timestamp(null, begDateStr);

		Date endDate = TimeUtils.string2Timestamp(null, endDateStr);

		return (List<PxTeachingplan>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from PxTeachingplan where classuuid=? and plandate<=? and plandate >=?  order by plandate asc",
						classuuid, endDate, begDate);
	}

	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public PxTeachingplan get(String uuid) {
		PxTeachingplan t = (PxTeachingplan) this.nSimpleHibernateDao.getObjectById(
				PxTeachingplan.class, uuid);
		
		return t;

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
					"delete from PxTeachingplan where uuid in(?)", uuid);

		} else {
			this.nSimpleHibernateDao.deleteObjectById(PxTeachingplan.class, uuid);

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
		return null;
	}

}