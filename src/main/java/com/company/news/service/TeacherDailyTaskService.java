package com.company.news.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.PClass;
import com.company.news.entity.TeacherDailyTask;
import com.company.news.entity.User;
import com.company.news.rest.util.TimeUtils;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class TeacherDailyTaskService extends AbstractServcice {
	public static final int announcements_isread_yes = 1;// 已读
	public static final int announcements_isread_no = 0;// 未读
	public static final int announcements_isdelete_yes = 1;// 已读
	public static final int announcements_isdelete_no = 0;// 未读
	@Autowired
	public PushMsgIservice pushMsgIservice;
	
	/**
	 * 自动创建任务
	 * @param user
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public List addByAuto(User user,Timestamp date) throws Exception {
		List resultList=new ArrayList();
		//创建班级互动任务
		List<PClass> classNewsList=(List<PClass>)this.nSimpleHibernateDao.getHibernateTemplate().find("from PClass where uuid in (select classuuid from UserClassRelation where useruuid=?)",user.getUuid());
		for(PClass obj:classNewsList){
			TeacherDailyTask task=new TeacherDailyTask();
			task.setUser_uuid(user.getUuid());
			task.setCreate_time(date);
			task.setGroup_uuid(obj.getGroupuuid());
			task.setType(SystemConstants.common_type_hudong);
			task.setRel_uuid(obj.getUuid());
			task.setTitle("发布一篇["+obj.getName()+"]班级互动");
			task.setStatus(SystemConstants.TeacherDailyTask_status_1);
			
			String hql="select uuid from ClassNews4Q where classuuid=? and create_useruuid=? and create_time>=? and create_time<=?";
			Date firstdate=TimeUtils.getDate00(date);
			Date lastdate=TimeUtils.getDate23(date);
			List list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql, obj.getUuid(),user.getUuid(),firstdate,lastdate);
			if(list.size()>0){//已经完成任务
				task.setStatus(SystemConstants.TeacherDailyTask_status_0);
			}
			this.nSimpleHibernateDao.getHibernateTemplate().save(task);
			resultList.add(task);
		}
		
		return resultList;
	}
	
	/**
	 * 查询一天的任务
	 * @param user
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public List queryByDay(User user,Timestamp date) throws Exception {
		
		String hql="from TeacherDailyTask where  user_uuid=? and create_time>=? and create_time<=?";
		Date firstdate=TimeUtils.getDate00(date);
		Date lastdate=TimeUtils.getDate23(date);
		List list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql, user.getUuid(),firstdate,lastdate);
		this.nSimpleHibernateDao.getHibernateTemplate().clear();
		return list;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}
	

}
