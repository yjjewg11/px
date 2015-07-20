package com.company.news.service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.commons.util.RandomNumberGenerator;
import com.company.news.entity.TelSmsCode;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.ucpaas.restDemo.SysConfig;
import com.ucpaas.restDemo.client.JsonReqClient;

@Service
public class SmsService extends AbstractServcice {
	public static final int SMS_TYPE_USER = 0;//
	@Autowired
	private UserinfoService userinfoService;

	private static long MINUTE = 1000 * 60L;
	public static long SMS_TIME_LIMIT = MINUTE
			* Long.valueOf(ProjectProperties.getProperty(
					"project.SMS.TIME_LIMIT", "5"));
	// key:tel,value[验证码,时间]
	private static ConcurrentMap<String, Long[]> smscodeMap = new ConcurrentHashMap<String, Long[]>();

	/**
	 * 发送短信验证码
	 * 
	 * @param model
	 * @param request
	 * @param tel
	 * @return
	 */
	public ModelMap sendCode(ModelMap model, HttpServletRequest request,
			String tel, Integer type) {
		// TODO Auto-generated method stub
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		String accountSid = SysConfig.getInstance().getProperty("accountSid");
		String token = SysConfig.getInstance().getProperty("token");
		String appId = SysConfig.getInstance().getProperty("appId");
		String templateId = SysConfig.getInstance().getProperty("templateId");
		//

		if (!CommonsValidate.checkCellphone(tel)) {
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("电话号码不合法！");
			return model;
		}
		// 2种情况,注册或找回密码使用.
		// 2:表示重置密码
		if (SystemConstants.Sms_type_2.equals(type)) {
			if (!userinfoService.isExitSameUserByLoginName(tel)) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("电话号码未注册！");
				return model;
			}
		}

		TelSmsCode smsdb = (TelSmsCode) this.nSimpleHibernateDao
				.getObjectByAttribute(TelSmsCode.class, "tel", tel);
		if (smsdb == null) {
			smsdb = new TelSmsCode();
		} else {
			long timeInterval = TimeUtils.getCurrentTimestamp().getTime()
					- smsdb.getCreatetime().getTime();
			if (timeInterval < SMS_TIME_LIMIT) {
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("如果没有收到验证码，请在" + SMS_TIME_LIMIT
						+ "分钟后再次进行发送。");
				return model;
			}

		}
		smsdb.setTel(tel);
		smsdb.setCreatetime(TimeUtils.getCurrentTimestamp());
		smsdb.setType(SMS_TYPE_USER);
		// 4位随机数
		smsdb.setCode(RandomNumberGenerator.getRandomInt(4));
		String templateSms = "亲，你的短信验证码为：{1}，请于{2}分钟内正确输入验证码.【问界家园】";
		String parm = smsdb.getCode() + "," + SMS_TIME_LIMIT;

		// 亲，你的短信验证码为：{1}，请于{2}分钟内正确输入验证码
		try {
			String result = new JsonReqClient().templateSMS(accountSid, token,
					appId, templateId, smsdb.getTel(), parm);

			/**
			 * result返回2中情况：
			 * 
			 * 失败：{"resp":{"respCode":"105110"}}"
			 * 
			 * 
			 * { "resp" : { "respCode" : "000000", "failure" : 1, "templateSMS"
			 * : { "createDate" : 20140623185016, "smsId" :
			 * "f96f79240e372587e9284cd580d8f953" } } }
			 */
			this.logger.info("templateSMS Response content is: " + result);
			if (result == null || result.indexOf("\"000000\"") < 0) {
				// if(!"000000".equals(result)){
				responseMessage
						.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("短信验证发送短信服务器失败！code：" + result);
				return model;

			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		this.nSimpleHibernateDao.getHibernateTemplate().save(smsdb);
		// if(true){//测试保存
		// return model;
		// }
		return model;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return TelSmsCode.class;
	}

}