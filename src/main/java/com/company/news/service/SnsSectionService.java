package com.company.news.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import com.company.common.PxStringUtils;
import com.company.news.ProjectProperties;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.BaseDataType;
import com.company.news.entity.SnsSection;
import com.company.news.jsonform.BaseDataTypeJsonform;
import com.company.news.jsonform.SnsSectionJsonform;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class SnsSectionService extends AbstractService {
	private static final String model_name = "基础数据类型模块";
	/**
	 * 新增权限
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public SnsSection add(SnsSectionJsonform jsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws IllegalAccessException, InvocationTargetException {
		if (this.validateRequireAndLengthByRegJsonform(jsonform.getTitle(), 32, "title", responseMessage)) {
			return null;
		}
		if (this.validateRequireByRegJsonformObject(jsonform.getId(), "id", responseMessage)) {
			return null;
		}

		SnsSection newEntity = new SnsSection();
		BeanUtils.copyProperties(newEntity, jsonform);
		newEntity.setCreate_time(TimeUtils.getCurrentTimestamp());
		newEntity.setTopic_count(0l);
		newEntity.setImg(PxStringUtil.imgUrlByUuid(newEntity.getImg()));
		if(newEntity.getInd()==null)newEntity.setInd(0);
		this.nSimpleHibernateDao.getHibernateTemplate().save(newEntity);
		return newEntity;

	}
	public SnsSection update(SnsSectionJsonform jsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws IllegalAccessException, InvocationTargetException {
		if (this.validateRequireAndLengthByRegJsonform(jsonform.getTitle(), 32, "title", responseMessage)) {
			return null;
		}
		if (this.validateRequireByRegJsonformObject(jsonform.getId(), "id", responseMessage)) {
			return null;
		}

		SnsSection newEntity = new SnsSection();
		BeanUtils.copyProperties(newEntity, jsonform);
		newEntity.setImg(PxStringUtil.imgUrlByUuid(newEntity.getImg()));
//		newEntity.setCreate_time(TimeUtils.getCurrentTimestamp());
//		newEntity.setTopic_count(0l);
//		if(newEntity.getInd()==null)newEntity.setInd(0);
		this.nSimpleHibernateDao.getHibernateTemplate().save(newEntity);
		return newEntity;
	}
	
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return SnsSectionService.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}
	public List list() {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		//description ios 的关键词,不使用.
		String sql=" SELECT id ,title,img,topic_count";
		sql+=" from sns_section  order by ind asc ";
		
		Query q = s.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map> list= q.list();
		
		String share_url_course_type=ProjectProperties.getProperty("share_url_sns_section_img", "http://img.wenjienet.com/i/sns_section_img/");
		for(Map o:list){
			//o.getDescription()=laugh.gif
			o.put("img", share_url_course_type+o.get("img"));
		}
		
		return list;
	}

}
