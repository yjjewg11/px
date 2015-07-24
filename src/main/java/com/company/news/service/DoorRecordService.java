package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.common.SerializableUtil;
import com.company.news.SystemConstants;
import com.company.news.entity.DoorRecord;
import com.company.news.entity.Group;
import com.company.news.entity.Group4Q;
import com.company.news.entity.User;
import com.company.news.entity.UserGroupRelation;
import com.company.news.jsonform.DoorRecordJsonform;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class DoorRecordService extends AbstractServcice {
	@Autowired
	private GroupService groupService;

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean insert(DoorRecordJsonform doorRecordJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(doorRecordJsonform.getGroupuuid())) {
			responseMessage.setMessage("Groupuuid不能为空！");
			return false;
		}

		Group group = groupService.get(doorRecordJsonform.getGroupuuid());
		if (group == null) {
			responseMessage.setMessage("GROUP不存在！");
			return false;
		}

		if (!group.getPrivate_key().equals(doorRecordJsonform.getPrivate_key())) {
			responseMessage.setMessage("Private_key密钥不匹配！");
			return false;
		}

		try {
			List<DoorRecord> list = (List<DoorRecord>) SerializableUtil
					.StringToObject(doorRecordJsonform.getRecordlist());

			if (list != null && list.size() > 0)
				for (DoorRecord d : list) {
					d.setGroupuuid(doorRecordJsonform.getGroupuuid());
					this.nSimpleHibernateDao.getHibernateTemplate().save(d);
				}

			return true;
		} catch (Exception e) {
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return false;
		}
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return DoorRecord.class;
	}

}
