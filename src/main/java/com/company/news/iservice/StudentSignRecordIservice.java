package com.company.news.iservice;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.company.mq.JobDetails;
import com.company.mq.MQUtils;
import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.core.iservice.PushMsgIservice;
import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.DoorRecord;
import com.company.news.entity.Group;
import com.company.news.entity.Group4QBaseInfo;
import com.company.news.entity.StudentBind;
import com.company.news.entity.StudentSignRecord;
import com.company.news.rest.util.TimeUtils;
import com.company.news.service.StudentBindService;


@Service
public class StudentSignRecordIservice {
	  protected static Logger logger = LoggerFactory.getLogger(StudentSignRecordIservice.class);
	  @Autowired
	  @Qualifier("NSimpleHibernateDao")
	  protected NSimpleHibernateDao nSimpleHibernateDao;
	  

		@Autowired
		private StudentBindService studentBindService;
	  
	 /**
	  * 根据打卡数据,添加学生的签到记录
	  * @param doorRecord
	  * @throws Exception
	  */
	  public void add(DoorRecord doorRecord) throws Exception{
		  if(doorRecord.getCardid()!=null&&doorRecord.getGroupuuid()!=null){
			  StudentBind studentBind=(StudentBind) studentBindService.getStudentBindBycardidAndGroup(doorRecord.getCardid(), doorRecord.getGroupuuid());
			  if(studentBind!=null){
				  StudentSignRecord obj=new StudentSignRecord();
				  obj.setCardid(doorRecord.getCardid());
				  obj.setGroupuuid(doorRecord.getGroupuuid());
				  
				  if(doorRecord.getGroupuuid()!=null){
					  Group4QBaseInfo group=(Group4QBaseInfo)CommonsCache.get(doorRecord.getGroupuuid(),Group4QBaseInfo.class );
					  if(group!=null)obj.setGroupname(group.getBrand_name());
				  }
				  obj.setType(SystemConstants.StudentSignRecord_type_1);
				  obj.setSign_time(doorRecord.getDt());
			 
				  obj.setStudentuuid(studentBind.getStudentuuid());
				  obj.setSign_name(studentBind.getName());
				  this.nSimpleHibernateDao.save(obj);
				  
				  //只有当天的数据才发送推送
				  if(TimeUtils.getDateString(obj.getSign_time(),TimeUtils.YYYY_MM_DD_FORMAT).equals(TimeUtils.getCurrentTime(TimeUtils.YYYY_MM_DD_FORMAT))){
					  String msg=obj.getSign_name()+"-"+obj.getGroupname()+"-"+TimeUtils.getDateString(obj.getSign_time(),TimeUtils.HH_mm_ss_FORMAT);
						
						Map map=new HashMap();
				    	map.put("uuid", obj.getUuid());
				    	map.put("groupuuid",obj.getGroupuuid());
				    	map.put("title",msg);
						JobDetails job=new JobDetails("studentSignRecordIservice","sendPushMessage",map);
						MQUtils.publish(job);
				  }
				
					
					
			  }
		  }
		  
	  }
	  @Autowired
		public PushMsgIservice pushMsgIservice;

		public void sendPushMessage(Map<String,String> map) throws Exception{
			String uuid=map.get("uuid");
			String groupuuid=map.get("groupuuid");
			String title=map.get("title");
			pushMsgIservice.pushMsgToParentByStudent(SystemConstants.common_type_signrecord, uuid, groupuuid, title);
			
		}

	  
	  
	  
}
