package com.company.news.iservice;

import java.util.List;

import net.sf.json.JSONObject;

import org.hibernate.Query;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.baidu.yun.core.log.YunLogEvent;
import com.baidu.yun.core.log.YunLogHandler;
import com.baidu.yun.push.auth.PushKeyPair;
import com.baidu.yun.push.client.BaiduPushClient;
import com.baidu.yun.push.constants.BaiduPushConstants;
import com.baidu.yun.push.exception.PushClientException;
import com.baidu.yun.push.exception.PushServerException;
import com.baidu.yun.push.model.PushMsgToAllRequest;
import com.baidu.yun.push.model.PushMsgToAllResponse;
import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.commons.util.IOSPushUtils;
import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.PushMessage;
import com.company.news.rest.util.TimeUtils;
import com.company.pushmsg.PushMsgAndoridInterface;
import com.company.pushmsg.PushMsgBaiduAndoridImpl;
import com.company.pushmsg.PushMsgUmengAndoridImpl;


@Service
public class PushMsgIservice {
	
	public static final String andoridPushMsg_type = ProjectProperties.getProperty(
			"andoridPushMsg_type", "umeng");
	
	private static PushMsgAndoridInterface pushMsgAndoridInterface;
	static {
		if (andoridPushMsg_type.equals("baidu"))
			pushMsgAndoridInterface = new PushMsgBaiduAndoridImpl();
		else{
			
			pushMsgAndoridInterface = new PushMsgUmengAndoridImpl();
		}
	}
	  protected static Logger logger = LoggerFactory.getLogger(PushMsgIservice.class);
	  @Autowired
	  @Qualifier("NSimpleHibernateDao")
	  protected NSimpleHibernateDao nSimpleHibernateDao;
  public void androidPushMsgToSingleDevice_to_parentByChannelId(String title,String msg,String channelId)throws Exception{
	  	pushMsgAndoridInterface.androidPushMsgToSingleDevice_to_parentByChannelId(title, msg, channelId);
	  }
	  /**
	   * 广播所有android消息_给老师
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToSingleDevice_to_TeacherByChannelId(String title,String msg,String channelId)throws Exception{
		  pushMsgAndoridInterface.androidPushMsgToSingleDevice_to_TeacherByChannelId(title, msg, channelId);
	  }
	  
	  /**
	   * 获取设备id用于推送.
	   * @param device_type
	   * @param type
	   * @param group_uuid
	   * @return
	   */
	  public List getChannelIdBy(String device_type,Integer type,String group_uuid){
		  String hql = "select distinct device_id from PushMsgDevice where status=0 and device_type='" + device_type+"'";
			hql += " and type="+type;
			hql += " and group_uuid=?";
			
			return this.nSimpleHibernateDao.getHibernateTemplate().find(hql,group_uuid);
		  
	  }
	  
	  /**
	   * 广播所有android消息_给所有老师
	   * @param msg
	   * @return
	   */
	  public void pushMsgToAll_to_teacher(int type,String type_uuid,String group_uuid,String msg) throws Exception{
		  String title="消息";
		  if(type==SystemConstants.common_type_gonggao){
			  title="全校公告";
		  }else if(type==SystemConstants.common_type_neibutongzhi){
			  title="老师公告";
		  }
		  
		  List<String> list=(List<String>)this.nSimpleHibernateDao.getHibernateTemplate().find("select useruuid from UserGroupRelation where groupuuid=?", group_uuid);
		  
		  for(String o:list){
			  PushMessage pushMessage=new PushMessage();
			  pushMessage.setGroup_uuid(group_uuid);
			  pushMessage.setRevice_useruuid(o);
			  pushMessage.setType(type);
			  pushMessage.setRel_uuid(type_uuid);
			  pushMessage.setTitle(title);
			  pushMessage.setMessage(msg);
			  pushMessage.setCreate_time(TimeUtils.getCurrentTimestamp());
			  pushMessage.setIsread(0);
			  
			  this.nSimpleHibernateDao.save(pushMessage);
		  }
		  this.logger.info("pushMsgToAll_to_teacher count="+list.size());
		  this.androidPushMsgToAll_to_teacher(group_uuid,title,msg);
	  }

	  /**
	   * 广播所有android消息_给所有家长
	   * @param msg
	   * @return
	   */
	  public void pushMsgToAll_to_parent(int type,String type_uuid,String group_uuid,String msg) throws Exception{
		  String title="消息";
		  if(type==SystemConstants.common_type_gonggao){
			  title="全校公告";
		  }else if(type==SystemConstants.common_type_neibutongzhi){
			  title="老师公告";
		  }
		  
  Session s = this.nSimpleHibernateDao.getHibernateTemplate()
			.getSessionFactory().openSession();
	String sql = "";
	Query q = s
			.createSQLQuery(
					"select parent_uuid from px_studentcontactrealation  where groupuuid='"
							+ group_uuid + "'");
	List<String> list=q.list();
		  for(String o:list){
			  PushMessage pushMessage=new PushMessage();
			  pushMessage.setGroup_uuid(group_uuid);
			  pushMessage.setRevice_useruuid(o);
			  pushMessage.setType(type);
			  pushMessage.setRel_uuid(type_uuid);
			  pushMessage.setTitle(title);
			  pushMessage.setMessage(msg);
			  pushMessage.setCreate_time(TimeUtils.getCurrentTimestamp());
			  pushMessage.setIsread(0);
			  
			  this.nSimpleHibernateDao.save(pushMessage);
		  }
		  
		  this.logger.info("pushMsgToAll_to_parent count="+list.size());
		  this.androidPushMsgToAll_to_parent(group_uuid,title,msg);
		  
		 
	  }

	  
	  /**
	   * 广播所有android消息_给所有老师
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToAll_to_teacher(final String group_uuid,final String title,final String msg) throws Exception{
		  
//		  String apiKey = ProjectProperties.getProperty("baidu_apiKey_teacher", "El4au0Glwr7Xt8sPgZFg2UP7");
//		  String secretKey = ProjectProperties.getProperty("baidu_secretKey_teacher", "4rtqyA96S6GDNVcgB8D1Cqh0Wm4Vohq8");
//		  this.androidPushMsgToAll(msg, apiKey, secretKey);
		   final List<String> anroidlist=getChannelIdBy(SystemConstants.PushMsgDevice_device_type_android,SystemConstants.PushMsgDevice_type_1,group_uuid);
		  //1.发布
		   final List<String> iosList=getChannelIdBy(SystemConstants.PushMsgDevice_device_type_ios,SystemConstants.PushMsgDevice_type_1,group_uuid);
		   final PushMsgIservice that=this;
	        new Thread(new Runnable(){
	            public void run() {
	                        try {
	                        	 for(String o :anroidlist){
	                        		 that.androidPushMsgToSingleDevice_to_TeacherByChannelId(title,msg, o);
	                   		  }
	                        } catch (Exception e) {
	                            e.printStackTrace();
	                        }
	                        try {

	                        	that.iosPushMsgToSingleDevice_to_TeacherByChannelId(title, msg, iosList);
	                        } catch (Exception e) {
	                            e.printStackTrace();
	                        }
	                    }
	        }).start();
		 
		  
		  
	  }

	 

	  /**
	   * 广播所有android消息_给所有家长
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToAll_to_parent(final String group_uuid,final String title,final String msg)throws Exception{
		  
//		  String apiKey = ProjectProperties.getProperty("baidu_apiKey_parent", "p9DUFwCzoUaKenaB5ovHch0G");
//		  String secretKey = ProjectProperties.getProperty("baidu_secretKey_parent", "GUHR0mniN15LvML8OWnm3GzMdXsVEGbD");
//		  this.androidPushMsgToAll(msg, apiKey, secretKey);
		  
		   final List<String> anroidlist=getChannelIdBy(SystemConstants.PushMsgDevice_device_type_android,SystemConstants.PushMsgDevice_type_0,group_uuid);
			  //1.发布
			   final List<String> iosList=getChannelIdBy(SystemConstants.PushMsgDevice_device_type_ios,SystemConstants.PushMsgDevice_type_0,group_uuid);
			   final PushMsgIservice that=this;
		        new Thread(new Runnable(){
		            public void run() {
		                        try {
		                        	 for(String o :anroidlist){
		                        		 that.androidPushMsgToSingleDevice_to_TeacherByChannelId(title,msg, o);
		                   		  }
		                        } catch (Exception e) {
		                            e.printStackTrace();
		                        }
		                        try {

		                        	that.iosPushMsgToSingleDevice_to_TeacherByChannelId(title, msg, iosList);
		                        } catch (Exception e) {
		                            e.printStackTrace();
		                        }
		                    }
		        }).start();
	  }
	  
	  
	  /**
	   * 广播所有ios消息_给所有家长
	   * @param msg
	   * @return
	   */
	  public void iosPushMsgToSingleDevice_to_parentByChannelId(String title,String msg,List deviceTokenList)throws Exception{
		  
		  String p12FileName = ProjectProperties.getProperty("iosCert_parent", "wenjie_jiazhangtong_push_aps_dev.p12");
		  String p12Pass = ProjectProperties.getProperty("iosCert_pwd_parent", "wenjie_123456");
		 IOSPushUtils.pushIosMsgByToken(p12FileName, p12Pass, msg, deviceTokenList);
	  }
	  

	  /**
	   * 广播所有ios消息_给所有家长
	   * @param msg
	   * @return
	   */
	  public void iosPushMsgToSingleDevice_to_TeacherByChannelId(String title,String msg,List deviceTokenList)throws Exception{
		  
		  String p12FileName = ProjectProperties.getProperty("iosCert_teacher", "wenjie_jiazhangtong_push_aps_dev.p12");
		  String p12Pass = ProjectProperties.getProperty("iosCert_pwd_teacher", "wenjie_123456");
		 IOSPushUtils.pushIosMsgByToken(p12FileName, p12Pass, msg, deviceTokenList);
	  }
	 
	  	

	  /**
	   * 广播所有android消息
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToAll(String msg,String apiKey,String secretKey)throws Exception{
		// 1. get apiKey and secretKey from developer console
//			String apiKey = "xxxxxxxxxxxxxxxxxxxx";
//			String secretKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
			PushKeyPair pair = new PushKeyPair(apiKey, secretKey);

			// 2. build a BaidupushClient object to access released interfaces
			BaiduPushClient pushClient = new BaiduPushClient(pair,
					BaiduPushConstants.CHANNEL_REST_URL);

			// 3. register a YunLogHandler to get detail interacting information
			// in this request.
			pushClient.setChannelLogHandler(new YunLogHandler() {
				@Override
				public void onHandle(YunLogEvent event) {
					System.out.println(event.getMessage());
				}
			});

			try {
				// 4. specify request arguments
				
				JSONObject notification = new JSONObject();
				notification.put("title", "问界互动家园");
				notification.put("description",msg);
				PushMsgToAllRequest request = new PushMsgToAllRequest()
						.addMsgExpires(new Integer(3600)).addMessageType(1)//1：通知,0:透传消息. 默认为0 注：IOS只有通知.
						.addMessage(notification.toString()) //添加透传消息
						.addSendTime(System.currentTimeMillis() / 1000 + 120) // 设置定时推送时间，必需超过当前时间一分钟，单位秒.实例2分钟后推送
						.addDeviceType(3);
				// 5. http request
				PushMsgToAllResponse response = pushClient.pushMsgToAll(request);
				// Http请求结果解析打印
				this.logger.info("msgId: " + response.getMsgId() + ",sendTime: "
						+ response.getSendTime() + ",timerId: "
						+ response.getTimerId());
			} catch (PushClientException e) {
				if (BaiduPushConstants.ERROROPTTYPE) {
					throw e;
				} else {
					e.printStackTrace();
				}
			} catch (PushServerException e) {
				if (BaiduPushConstants.ERROROPTTYPE) {
					throw e;
				} else {
					System.out.println(String.format(
							"requestId: %d, errorCode: %d, errorMessage: %s",
							e.getRequestId(), e.getErrorCode(), e.getErrorMsg()));
				}
			}
			
			
	  }
	 
	  
}
