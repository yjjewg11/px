package com.company.news.service;

import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.commons.util.DbUtils;
import com.company.news.entity.TrainingCourse;
import com.company.news.entity.User;
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
public class TrainingCourseService extends AbstractServcice {


  /**
   * 保存
   * @param bodyJson
   * @param model
   * @param request
   * @return
   * @throws Exception
   */
  public ModelMap save(String bodyJson, ModelMap model, HttpServletRequest request) throws Exception {
    
    User userInfo = SessionListener.getUserInfoBySession(request);
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    TrainingCourseJsonform form = (TrainingCourseJsonform)this.bodyJsonToFormObject(bodyJson, TrainingCourseJsonform.class);
    //验证
    
    //保存
    TrainingCourse dbobj = (TrainingCourse)this.getEntityClass().newInstance();
    Properties properties = (Properties) this.bodyJsonToProperties(bodyJson);
    RestUtil.copyNotEmptyValueToobj(properties, form, dbobj);
    if(Long.valueOf(0).equals(dbobj.getId())){
      dbobj.setId(null);
    }
    if(dbobj.getId()==null){//新建
      dbobj.setCreate_time(TimeUtils.getCurrentTimestamp());
      dbobj.setCreate_userid(userInfo.getId());
      dbobj.setModify_time(TimeUtils.getCurrentTimestamp());
      dbobj.setStatus(1);
      dbobj.setRead_count(0l);
      this.nSimpleHibernateDao.save(dbobj);
      
      model.addAttribute(RestConstants.Return_G_entity_id, dbobj.getId());
    }else{
      TrainingCourse entityDB =(TrainingCourse)this.nSimpleHibernateDao.getObject(this.getEntityClass(), dbobj.getId());
      if(entityDB==null){
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("数据不存在！");
        return model;
      }
     
      if(!userInfo.getId().equals(entityDB.getCreate_userid())){
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("不是创建人，没有修改权限！");
        return model;
      }
      //this.nSimpleHibernateDao.getHibernateTemplate().evict(entityDB);
      RestUtil.copyNotEmptyValueToobj(properties, form, entityDB);
      entityDB.setModify_time(TimeUtils.getCurrentTimestamp());
      
      this.nSimpleHibernateDao.getHibernateTemplate().update(entityDB);
      model.addAttribute(RestConstants.Return_G_entity_id, entityDB.getId());
    }
  
    
    return model;
  }
  
  /**
   * 保存
   * @param uuid
   * @param model
   * @param request
   * @return
   * @throws Exception
   */
  public ModelMap get(String uuid, ModelMap model, HttpServletRequest request) throws Exception {
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    if(StringUtils.isBlank(uuid)){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("uuid参数不合法");
      return model;
    }
    Object o=this.nSimpleHibernateDao.getObject(this.getEntityClass(), Long.valueOf(uuid));
    if(o==null){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("数据不存在！");
      return model;
    }
    String bkhql="update TrainingCourse set read_count=read_count+1 where id=?";
    this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(bkhql,  new Object[]{Long.valueOf(uuid)});
    model.addAttribute(RestConstants.Return_G_entity, o);
    return model;
  }




  public ModelMap index(NSearchContion sc, ModelMap model, HttpServletRequest request) {
    
    User userInfo = SessionListener.getUserInfoBySession(request);
//    String hql="from " + this.getEntityClass().getName() + " where  create_userid =  "+userInfo.getId();
    String hql="from " + this.getEntityClass().getName();
    
    StringBuffer sb = new StringBuffer();
    if (StringUtils.isNotEmpty(sc.getStartTime())) {
      sb.append(" and create_time >= ").append(DbUtils.stringToDateByDBType(sc.getStartTime()));
  }

  if (StringUtils.isNotEmpty(sc.getEndTime())) {
      sb.append(" and create_time <= ").append(DbUtils.stringToDateByDBType(sc.getEndTime()));
  }
  
  if("my".equals(sc.getType())){//查询我的
    sb.append(" and create_userid = ").append(userInfo.getId());
  }else  if("queryPublish".equals(sc.getType())){//查询发布的
    if (StringUtils.isNotEmpty(sc.getUserid())) {//指定用户
      sb.append(" and create_userid = ").append(sc.getUserid());
    }
    sb.append(" and status = 1");
  }
    
    PaginationData pData=sc.getPsoData();
    pData.setOrderFiled("create_time");
    pData.setOrderType("desc");
    
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
    return TrainingCourse.class;
  }



  /**
   *
   * 
   * @param ids
   * @param request
   * @param model
   * @return
   */
  public ModelMap delete(String ids, HttpServletRequest request, ModelMap model) {
    // TODO Auto-generated method stub
    String[] _idstrs = ids.split(ID_SPLIT_MARK);
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    for (String idstr : _idstrs) {
      if (!"".equals(idstr) && null != idstr) {
        TrainingCourse entityDB =
            (TrainingCourse) this.nSimpleHibernateDao.getObjectById(getEntityClass(), Long.valueOf(idstr));
        if(entityDB!=null){
          responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
          responseMessage.setMessage("数据不存在！");
          return model;
        }
         if(entityDB!=null){
           if (!userInfo.getId().equals(entityDB.getCreate_userid())) {
             responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
             responseMessage.setMessage("不是创建人，不能删除！");
             return model;
           }
           this.nSimpleHibernateDao.delete(entityDB);
         }
      }
    }
   
    return model;
  }

}
