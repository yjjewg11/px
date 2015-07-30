package com.company.news.service;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.common.SerializableUtil;
import com.company.news.entity.DoorRecord;
import com.company.news.entity.Group;
import com.company.news.entity.Student;
import com.company.news.jsonform.DoorRecordJsonform;
import com.company.news.jsonform.DoorUserJsonform;
import com.company.news.jsonform.StudentBindJsonform;
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
	@Autowired
	private StudentService studentService;
	@Autowired
	private StudentBindService studentBindService;

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

	/**
	 * 自动扫描门禁信息时，通过电话号进行绑定请求
	 * 
	 * @param doorRecordJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public boolean autobind(DoorUserJsonform doorUserJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(doorUserJsonform.getGroupuuid())) {
			responseMessage.setMessage("Groupuuid不能为空！");
			return false;
		}

		if (StringUtils.isBlank(doorUserJsonform.getCardid())) {
			responseMessage.setMessage("Cardid不能为空！");
			return false;
		}

		if (StringUtils.isBlank(doorUserJsonform.getIdNo())) {
			responseMessage.setMessage("IdNo不能为空！");
			return false;
		}

		if (StringUtils.isBlank(doorUserJsonform.getUserName())) {
			responseMessage.setMessage("UserName不能为空！");
			return false;
		}

		Group group = groupService.get(doorUserJsonform.getGroupuuid());
		if (group == null) {
			responseMessage.setMessage("GROUP不存在！");
			return false;
		}

		if (!group.getPrivate_key().equals(doorUserJsonform.getPrivate_key())) {
			responseMessage.setMessage("Private_key密钥不匹配！");
			return false;
		}

		Student s = studentService.getStudentByIdNoAndGroup(
				doorUserJsonform.getIdNo(), doorUserJsonform.getGroupuuid());
		if (s == null) {
			responseMessage.setMessage("idno:" + doorUserJsonform.getIdNo()
					+ ",未匹配到对应的账号！");
			return false;
		}

		StudentBindJsonform studentBindJsonform = new StudentBindJsonform();
		studentBindJsonform.setCardid(doorUserJsonform.getCardid());
		studentBindJsonform.setCreate_user("system");// 系统自动绑定
		studentBindJsonform.setCreate_useruuid("system");// 系统自动绑定
		studentBindJsonform.setName(doorUserJsonform.getUserName());
		studentBindJsonform.setStudentuuid(s.getUuid());

		//调用绑定服务
		if (studentBindService.add(studentBindJsonform, responseMessage)) {
			return true;
		} else

			return false;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return DoorRecord.class;
	}

}
