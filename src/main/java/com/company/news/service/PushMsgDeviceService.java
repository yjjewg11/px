package com.company.news.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Service;

import com.company.news.commons.util.DbUtils;
import com.company.news.entity.PushMsgDevice;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.PushMsgDeviceJsonform;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class PushMsgDeviceService extends AbstractService {
	private static final String model_name = "PushMsgDeviceService模块";
	/**
	 * 增加
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean save(PushMsgDeviceJsonform jsonform,
			ResponseMessage responseMessage,HttpServletRequest request) throws Exception {
		SessionUserInfoInterface user=SessionListener.getUserInfoBySession(request);
		String hql = "from PushMsgDevice where device_type='" + DBUtil.safeToWhereString(jsonform.getDevice_type())+"'";
		hql += " and type="+jsonform.getType() ;
		hql += " and device_id='"+DbUtils.safeToWhereString(jsonform.getDevice_id())+"'";
		//hql += " and group_uuid='"+DbUtils.safeToWhereString(o)+"'";
		//查询出这个设备关联的所有学校推送.
		List<PushMsgDevice>  list= (List<PushMsgDevice>)this.nSimpleHibernateDao.getHibernateTemplate().find(hql);
		//没有则创建
		if(list.size()==0){
			PushMsgDevice message = new PushMsgDevice();
			BeanUtils.copyProperties(message, jsonform);
			message.setUuid(null);
			message.setUser_uuid(user.getUuid());
			this.nSimpleHibernateDao.getHibernateTemplate().save(message);
			return true;
		}
		//有则判断是否状态更新
		if(list.size()>0){
			PushMsgDevice message =list.get(0);
			message.setUser_uuid(user.getUuid());
			message.setStatus(jsonform.getStatus());
			this.nSimpleHibernateDao.getHibernateTemplate().save(message);
			return true;
		}
		
		//删除多余无效的.
		if(list.size()>1){
			for(int i=list.size()-1;i>0;i--){
				this.nSimpleHibernateDao.delete(list.get(i));
			}
		}
		

		return true;
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
