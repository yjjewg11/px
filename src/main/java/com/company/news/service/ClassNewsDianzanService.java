package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.entity.ClassNews;
import com.company.news.entity.ClassNewsDianzan;
import com.company.news.entity.User;
import com.company.news.jsonform.ClassNewsDianzanJsonform;
import com.company.news.jsonform.ClassNewsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class ClassNewsDianzanService extends AbstractServcice {
	public static final int USER_type_default = 0;// 0:老师
	@Autowired
	private CountService countService;


	/**
	 * 
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public boolean dianzan(ClassNewsDianzanJsonform classNewsDianzanJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(classNewsDianzanJsonform.getNewsuuid())) {
			responseMessage.setMessage("Newsuuid不能为空！");
			return false;
		}

		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(
				"from ClassNewsDianzan where newsuuid=? and create_useruuid=?",
				classNewsDianzanJsonform.getNewsuuid(),
				classNewsDianzanJsonform.getCreate_useruuid());
		if (list != null && list.size() > 0) {
			responseMessage.setMessage("不能重复点赞！");
			return false;
		} else {
			ClassNewsDianzan cndz = new ClassNewsDianzan();
			BeanUtils.copyProperties(cndz, classNewsDianzanJsonform);
			cndz.setCreate_time(TimeUtils.getCurrentTimestamp());
			cndz.setUsertype(USER_type_default);
			this.nSimpleHibernateDao.getHibernateTemplate().save(cndz);
		}

		return true;
	}

	/**
	 * 
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public List getDianzanByNewsuuid(String newsuuid) throws Exception {
		if (StringUtils.isBlank(newsuuid)) {
			return null;
		}

		return this.nSimpleHibernateDao.getHibernateTemplate().find(
				"from ClassNewsDianzanOfShow where newsuuid=?", newsuuid);
	}

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean cancelDianzan(
			ClassNewsDianzanJsonform classNewsDianzanJsonform,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(classNewsDianzanJsonform.getNewsuuid())) {

			responseMessage.setMessage("Newsuuid不能为空！");
			return false;
		}

		this.nSimpleHibernateDao
				.getHibernateTemplate()
				.bulkUpdate(
						"delete from ClassNewsDianzan where newsuuid=? and create_useruuid=?",
						classNewsDianzanJsonform.getNewsuuid(),
						classNewsDianzanJsonform.getCreate_useruuid());

		return true;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return ClassNewsDianzanService.class;
	}

}
