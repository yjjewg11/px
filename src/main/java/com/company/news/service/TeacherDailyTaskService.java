package com.company.news.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.entity.Group4Q;
import com.company.news.entity.PClass;
import com.company.news.entity.TeacherDailyTask;
import com.company.news.entity.User;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class TeacherDailyTaskService extends AbstractServcice {
	
	/**
	 * 自动创建任务
	 * @param user
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public List addByAuto(User user,Timestamp date,HttpServletRequest request) throws Exception {
		List resultList=new ArrayList();
		addByAuto_sub_classNews(resultList,user,date);
		addByAuto_sub_Teachingplan(resultList,user,date);
			addByAuto_sub_CookbookPlan(resultList, user, date,request);
		return resultList;
	}
	
	/**
	 * 更新任务状态
	 * @param user
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public List updateTaskStatus(List<TeacherDailyTask> resultList,User user,Timestamp date) throws Exception {
		
		for(TeacherDailyTask task:resultList){
			if(task.getStatus()==null)continue;
			if(SystemConstants.TeacherDailyTask_status_0.equals(task.getStatus()))continue;
			if(SystemConstants.common_type_hudong==task.getType().intValue()){
				if(isFinishTask_ClassNews(task.getRel_uuid(), user.getUuid(), date)){
					task.setStatus(SystemConstants.TeacherDailyTask_status_0);
				}
			}else if(SystemConstants.common_type_jiaoxuejihua==task.getType().intValue()){
				if(isFinishTask_Teachingplan(task.getRel_uuid(), date)){
					task.setStatus(SystemConstants.TeacherDailyTask_status_0);
				}
			}else if(SystemConstants.common_type_shipu==task.getType().intValue()){
				if(isFinishTask_CookbookPlan(task.getRel_uuid(), date)){
					task.setStatus(SystemConstants.TeacherDailyTask_status_0);
				}
			}
		}
		return resultList;
	}
	
	/**
	 * 判断是否已经完成任务-课程表
	 * @param rel_uuid
	 * @param date
	 * @return
	 */
	boolean isFinishTask_Teachingplan(String rel_uuid,Timestamp date){
		String hql="select uuid from Teachingplan where  classuuid=? and  plandate>=? and plandate<=? ";
		Date firstdate=TimeUtils.getDate00(date);
		Date lastdate=TimeUtils.getDate23(date);
		List list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql, rel_uuid,firstdate,lastdate);
		if(list.size()>0){//已经完成任务
			return true;
		}
		
		return false;
	}
	

	/**
	 * 自动创建任务-班级互动任务
	 * @param user
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	 List addByAuto_sub_Teachingplan(List resultList,User user,Timestamp date) throws Exception {
		//班主任创建课程表
		String rhql="from PClass where uuid in (select classuuid from UserClassRelation where type=? and useruuid=?)";
		List<PClass> classNewsList=(List<PClass>)this.nSimpleHibernateDao.getHibernateTemplate().find(rhql,SystemConstants.class_usertype_head,user.getUuid());
		for(PClass obj:classNewsList){
			TeacherDailyTask task=new TeacherDailyTask();
			task.setUser_uuid(user.getUuid());
			task.setCreate_time(date);
			task.setGroup_uuid(obj.getGroupuuid());
			task.setType(SystemConstants.common_type_jiaoxuejihua);
			task.setRel_uuid(obj.getUuid());
			task.setTitle(obj.getName()+"-课程表发布");
			task.setStatus(SystemConstants.TeacherDailyTask_status_1);
			
			if(isFinishTask_Teachingplan(obj.getUuid(),date)){//已经完成任务
				task.setStatus(SystemConstants.TeacherDailyTask_status_0);
			}
			this.nSimpleHibernateDao.getHibernateTemplate().save(task);
			resultList.add(task);
		}
		
		return resultList;
	}
	/**
	 * 自动创建任务-班级互动任务
	 * @param user
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	 List addByAuto_sub_classNews(List resultList,User user,Timestamp date) throws Exception {
		//创建班级互动任务
		List<PClass> classNewsList=(List<PClass>)this.nSimpleHibernateDao.getHibernateTemplate().find("from PClass where uuid in (select classuuid from UserClassRelation where useruuid=?)",user.getUuid());
		for(PClass obj:classNewsList){
			TeacherDailyTask task=new TeacherDailyTask();
			task.setUser_uuid(user.getUuid());
			task.setCreate_time(date);
			task.setGroup_uuid(obj.getGroupuuid());
			task.setType(SystemConstants.common_type_hudong);
			task.setRel_uuid(obj.getUuid());
			task.setTitle(obj.getName()+"-发布一篇班级互动");
			task.setStatus(SystemConstants.TeacherDailyTask_status_1);
			
			if(isFinishTask_ClassNews(obj.getUuid(),user.getUuid(), date)){//已经完成任务
				task.setStatus(SystemConstants.TeacherDailyTask_status_0);
			}
			this.nSimpleHibernateDao.getHibernateTemplate().save(task);
			resultList.add(task);
		}
		
		return resultList;
	}
	/**
	 * 判断是否已经完成任务-班级互动
	 * @param rel_uuid
	 * @param user_uuid
	 * @param date
	 * @return
	 */
	boolean isFinishTask_ClassNews(String rel_uuid,String user_uuid,Timestamp date){

		String hql="select uuid from ClassNews4Q where classuuid=? and create_useruuid=? and create_time>=? and create_time<=?";
		Date firstdate=TimeUtils.getDate00(date);
		Date lastdate=TimeUtils.getDate23(date);
		List list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql, rel_uuid,user_uuid,firstdate,lastdate);
		if(list.size()>0){//已经完成任务
			return true;
		}
		
		return false;
	}
	
	/**
	 * 自动创建任务-班级互动任务
	 * @param user
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	 List addByAuto_sub_CookbookPlan(List resultList,User user,Timestamp date,HttpServletRequest request) throws Exception {
		//创建班级互动任务
		List<Group4Q> classNewsList=(List<Group4Q>)this.nSimpleHibernateDao.getHibernateTemplate().find("from Group4Q where uuid in (select groupuuid from UserGroupRelation where useruuid=?)",user.getUuid());
		for(Group4Q obj:classNewsList){
			if(!RightUtils.hasRight(obj.getUuid(),RightConstants.KD_cookbookplan_m, request)){
				continue;
			}
			TeacherDailyTask task=new TeacherDailyTask();
			task.setUser_uuid(user.getUuid());
			task.setCreate_time(date);
			task.setGroup_uuid(obj.getUuid());
			task.setType(SystemConstants.common_type_shipu);
			task.setRel_uuid(obj.getUuid());
			task.setTitle(obj.getBrand_name()+"-发布食谱");
			task.setStatus(SystemConstants.TeacherDailyTask_status_1);
			
			if(isFinishTask_CookbookPlan(obj.getUuid(), date)){//已经完成任务
				task.setStatus(SystemConstants.TeacherDailyTask_status_0);
			}
			this.nSimpleHibernateDao.getHibernateTemplate().save(task);
			resultList.add(task);
		}
		
		return resultList;
	}
	/**
	 * 判断是否已经完成任务-食谱
	 * @param rel_uuid
	 * @param user_uuid
	 * @param date
	 * @return
	 */
	boolean isFinishTask_CookbookPlan(String rel_uuid,Timestamp date){

		String hql="select uuid from CookbookPlan where groupuuid=? and plandate>=? and plandate<=?";
		Date firstdate=TimeUtils.getDate00(date);
		Date lastdate=TimeUtils.getDate23(date);
		List list=this.nSimpleHibernateDao.getHibernateTemplate().find(hql, rel_uuid,firstdate,lastdate);
		if(list.size()>0){//已经完成任务
			return true;
		}
		
		return false;
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
