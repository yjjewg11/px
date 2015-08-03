package com.company.news.iservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.DoorRecord;
import com.company.news.entity.Group;
import com.company.news.entity.StudentBind;
import com.company.news.entity.StudentSignRecord;


@Service
public class StudentSignRecordIservice {
	  protected static Logger logger = LoggerFactory.getLogger(StudentSignRecordIservice.class);
	  @Autowired
	  @Qualifier("NSimpleHibernateDao")
	  protected NSimpleHibernateDao nSimpleHibernateDao;
	  
	 /**
	  * 根据打卡数据,添加学生的签到记录
	  * @param doorRecord
	  * @throws Exception
	  */
	  public void add(DoorRecord doorRecord) throws Exception{
		  StudentSignRecord obj=new StudentSignRecord();
		  obj.setCardid(doorRecord.getCardid());
		  obj.setGroupuuid(doorRecord.getGroupuuid());
		  if(doorRecord.getGroupuuid()!=null){
			  Group group=(Group)CommonsCache.get(doorRecord.getGroupuuid(),Group.class );
			  if(group!=null)obj.setGroupname(group.getBrand_name());
		  }
		  obj.setType(SystemConstants.StudentSignRecord_type_1);
		  obj.setSign_time(doorRecord.getDt());
		  if(doorRecord.getCardid()!=null){
			  StudentBind studentBind=(StudentBind) this.nSimpleHibernateDao.getObjectByAttribute(StudentBind.class, "cardid", doorRecord.getCardid());
			  if(studentBind!=null){
				  obj.setStudentuuid(studentBind.getStudentuuid());
				  obj.setSign_name(studentBind.getName());
//				  obj.setSign_uuid(studentBind.set)
			  }
		  }
		this.nSimpleHibernateDao.save(obj);
		  
	  }
	  
}
