package com.company.news.iservice;

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
import com.baidu.yun.push.model.PushMsgToSingleDeviceRequest;
import com.baidu.yun.push.model.PushMsgToSingleDeviceResponse;
import com.company.news.ProjectProperties;
import com.company.news.dao.NSimpleHibernateDao;


@Service
public class PushMsgIservice {
	  protected static Logger logger = LoggerFactory.getLogger(PushMsgIservice.class);
	  @Autowired
	  @Qualifier("NSimpleHibernateDao")
	  protected NSimpleHibernateDao nSimpleHibernateDao;
	  
	  
	  /**
	   * 广播所有android消息_给所有老师
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToAll_to_teacher(String msg) throws Exception{
		  
		  String apiKey = ProjectProperties.getProperty("baidu_apiKey_teacher", "El4au0Glwr7Xt8sPgZFg2UP7");
		  String secretKey = ProjectProperties.getProperty("baidu_apiKey_teacher", "4rtqyA96S6GDNVcgB8D1Cqh0Wm4Vohq8");
		  this.androidPushMsgToAll(msg, apiKey, secretKey);
	  }

	 

	  /**
	   * 广播所有android消息_给所有家长
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToAll_to_parent(String msg)throws Exception{
		  
		  String apiKey = ProjectProperties.getProperty("baidu_apiKey_parent", "El4au0Glwr7Xt8sPgZFg2UP7");
		  String secretKey = ProjectProperties.getProperty("baidu_apiKey_parent", "4rtqyA96S6GDNVcgB8D1Cqh0Wm4Vohq8");
		  this.androidPushMsgToAll(msg, apiKey, secretKey);
	  }
	  /**
	   * 广播所有android消息_给所有家长
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToSingleDevice_to_parentByChannelId(String msg,String channelId)throws Exception{
		  
		  String apiKey = ProjectProperties.getProperty("baidu_apiKey_parent", "El4au0Glwr7Xt8sPgZFg2UP7");
		  String secretKey = ProjectProperties.getProperty("baidu_apiKey_parent", "4rtqyA96S6GDNVcgB8D1Cqh0Wm4Vohq8");
		  this.androidPushMsgToSingleDevice(msg, channelId, apiKey, secretKey);
	  }
	  

	  /**
	   * 广播所有android消息_给所有家长
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToSingleDevice_to_TeacherByChannelId(String msg,String channelId)throws Exception{
		  
		  String apiKey = ProjectProperties.getProperty("baidu_apiKey_teacher", "El4au0Glwr7Xt8sPgZFg2UP7");
		  String secretKey = ProjectProperties.getProperty("baidu_apiKey_teacher", "4rtqyA96S6GDNVcgB8D1Cqh0Wm4Vohq8");
		  this.androidPushMsgToSingleDevice(msg, channelId, apiKey, secretKey);
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
				PushMsgToAllRequest request = new PushMsgToAllRequest()
						.addMsgExpires(new Integer(3600)).addMessageType(0)//1：通知,0:透传消息. 默认为0 注：IOS只有通知.
						.addMessage(msg) //添加透传消息
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
	  
	  
	  /**
	   * 广播所有android消息
	   * @param msg
	   * @return
	   */
	  public void androidPushMsgToSingleDevice(String msg,String channelId,String apiKey,String secretKey)throws Exception{
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
				PushMsgToSingleDeviceRequest request = new PushMsgToSingleDeviceRequest()
				.addChannelId(channelId)
						.addMsgExpires(new Integer(3600)).addMessageType(0)
						.addMessage(msg) //添加透传消息
						.addDeviceType(3);
				// 5. http request
				PushMsgToSingleDeviceResponse response = pushClient
						.pushMsgToSingleDevice(request);
				// Http请求结果解析打印
				System.out.println("msgId: " + response.getMsgId() + ",sendTime: "
						+ response.getSendTime());
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
