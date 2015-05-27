package com.company.news.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.commons.util.DbUtils;
import com.company.news.entity.TimeScheduleRelation;
import com.company.news.entity.TrainingCourse;
import com.company.news.entity.User;
import com.company.news.jsonform.TimeScheduleRelationJsonform;
import com.company.news.jsonform.TrainingCourseJsonform;
import com.company.news.query.NSearchContion;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class UserinfoBusinessCourseService extends AbstractServcice {


  public ModelMap index(NSearchContion sc, ModelMap model, HttpServletRequest request) {
    
    User userInfo = SessionListener.getUserInfoBySession(request);
//    String hql="from " + this.getEntityClass().getName() + " where  create_userid =  "+userInfo.getId();
    String hql="from " + this.getEntityClass().getName();
    
    StringBuffer sb = new StringBuffer();
//    if (StringUtils.isNotEmpty(sc.getStartTime())) {
//      sb.append(" and create_time >= ").append(DbUtils.stringToDateByDBType(sc.getStartTime()));
//  }
//
//  if (StringUtils.isNotEmpty(sc.getEndTime())) {
//      sb.append(" and create_time <= ").append(DbUtils.stringToDateByDBType(sc.getEndTime()));
//  }
//  
   if("coach".equals(sc.getType())){//查询发布的
   
    sb.append(" and type = 1");
  }
    
    PaginationData pData=sc.getPsoData();
//    pData.setOrderFiled("id");
//    pData.setOrderType("asc");
    
    if(sb.length()>0){
      //去掉第一个的“ and”共4个字符。
      hql+=" where "+sb.toString().substring(4);
    }
    PageQueryResult pageQueryResult = nSimpleHibernateDao.findByPaginationToHql(hql, pData);

    model.clear();
    model.addAttribute(RestConstants.Return_PAGENO, pageQueryResult.getPageNo());
    model.addAttribute(RestConstants.Return_PAGESIZE, pageQueryResult.getPageSize());
    model.addAttribute(RestConstants.Return_TotalCount, pageQueryResult.getTotalCount());
    model.addAttribute(RestConstants.Return_G_entity, pageQueryResult.getData());
    
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    
    return model;
  }


  @Override
  public Class getEntityClass() {
    // TODO Auto-generated method stub
    return User.class;
  }


}
