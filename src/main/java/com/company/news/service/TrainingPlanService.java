package com.company.news.service;

import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.entity.TrainingPlan;
import com.company.news.entity.User;
import com.company.news.jsonform.TrainingPlanJsonform;
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
public class TrainingPlanService extends AbstractServcice {


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
    TrainingPlanJsonform form = (TrainingPlanJsonform)this.bodyJsonToFormObject(bodyJson, TrainingPlanJsonform.class);
    //验证
    
    
    //保存
    TrainingPlan dbobj = (TrainingPlan)this.getEntityClass().newInstance();
    Properties properties = (Properties) this.bodyJsonToProperties(bodyJson);
    RestUtil.copyNotEmptyValueToobj(properties, form, dbobj);
    if(Long.valueOf(0).equals(dbobj.getId())){
      dbobj.setId(null);
    }
    if(dbobj.getId()==null){//新建
      dbobj.setCreate_time(TimeUtils.getCurrentTimestamp());
      dbobj.setCreate_userid(userInfo.getId());
      dbobj.setStatus(1);
      
      this.nSimpleHibernateDao.save(dbobj);
      model.addAttribute(RestConstants.Return_G_entity_id, dbobj.getId());
    }else{
      TrainingPlan entityDB =(TrainingPlan)this.nSimpleHibernateDao.getObject(this.getEntityClass(), dbobj.getId());
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
    sb.append(" and status = 1");
  }else if("trainer_my".equals(sc.getType())){//教练查询我接的训练计划
    sb.append(" and trainer_id = ").append(userInfo.getId());
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
    return TrainingPlan.class;
  }



/**
 * 暂时屏蔽删除方式，等待权限加入启用
 * @param ids
 * @param request
 * @param model
 * @return
 */
  public ModelMap delete(String ids, HttpServletRequest request, ModelMap model) {
    // TODO Auto-generated method stub
    String[] _idstrs = ids.split(ID_SPLIT_MARK);
    
    for (String idstr : _idstrs) {
      if (!"".equals(idstr) && null != idstr) {
        Object dbobj = (Object) this.nSimpleHibernateDao.getObjectById(getEntityClass(),
          Long.valueOf(idstr));
//if(dbobj!=null)this.nSimpleHibernateDao.delete(dbobj);
      }
  }
  ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    return model;
  }

  /**
   * 教练接单
   * @param uuid
   * @param model
   * @param request
   * @return
   */
public ModelMap status_request(String uuid, ModelMap model, HttpServletRequest request) {
  ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
  User userInfo = SessionListener.getUserInfoBySession(request);
  if(StringUtils.isBlank(uuid)){
    responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
    responseMessage.setMessage("uuid参数不合法");
    return model;
  }
  TrainingPlan o=(TrainingPlan)this.nSimpleHibernateDao.getObject(this.getEntityClass(), Long.valueOf(uuid));
 
  if(o==null){
    responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
    responseMessage.setMessage("数据不存在！");
    return model;
  }
  if(!SystemConstants.TrainingPlan_status_1.equals(o.getStatus())){
    responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
    responseMessage.setMessage("只有发布状态，可以接单。");
    return model;
  }
  o.setStatus(SystemConstants.TrainingPlan_status_2);
  o.setTrainer_id(userInfo.getId());
  o.setReceiving_order_time(TimeUtils.getCurrentTimestamp());
  
  model.addAttribute(RestConstants.Return_G_entity, o);
  return model;
  
}

  public ModelMap status_pay(String uuid, ModelMap model, HttpServletRequest request) {
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    if(StringUtils.isBlank(uuid)){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("uuid参数不合法");
      return model;
    }
    TrainingPlan o=(TrainingPlan)this.nSimpleHibernateDao.getObject(this.getEntityClass(), Long.valueOf(uuid));
   
    if(o==null){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("数据不存在！");
      return model;
    }
    if(o.getTrainer_id()==null||Long.valueOf(0).equals(o.getTrainer_id())){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("没被教练接单，不能付款。！");
      return model;
    }
    o.setStatus(SystemConstants.TrainingPlan_status_3);
    o.setTrainer_id(userInfo.getId());
    o.setReceiving_order_time(TimeUtils.getCurrentTimestamp());
    
    model.addAttribute(RestConstants.Return_G_entity, o);
    return model;
    
  }
  

  public ModelMap status_complete(String uuid, ModelMap model, HttpServletRequest request) {
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    if(StringUtils.isBlank(uuid)){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("uuid参数不合法");
      return model;
    }
    TrainingPlan o=(TrainingPlan)this.nSimpleHibernateDao.getObject(this.getEntityClass(), Long.valueOf(uuid));
   
    if(o==null){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("数据不存在！");
      return model;
    }
    if(o.getTrainer_id()==null||Long.valueOf(0).equals(o.getTrainer_id())){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("没被教练接单，不能更改状态！");
      return model;
    }
    o.setStatus(SystemConstants.TrainingPlan_status_4);
    o.setTrainer_id(userInfo.getId());
    o.setReceiving_order_time(TimeUtils.getCurrentTimestamp());
    
    model.addAttribute(RestConstants.Return_G_entity, o);
    return model;
    
  }
  public ModelMap status_close(String uuid, ModelMap model, HttpServletRequest request) {
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    if(StringUtils.isBlank(uuid)){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("uuid参数不合法");
      return model;
    }
    TrainingPlan o=(TrainingPlan)this.nSimpleHibernateDao.getObject(this.getEntityClass(), Long.valueOf(uuid));
   
    if(o==null){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("数据不存在！");
      return model;
    }
   
    o.setStatus(SystemConstants.TrainingPlan_status_5);
    o.setTrainer_id(userInfo.getId());
    o.setReceiving_order_time(TimeUtils.getCurrentTimestamp());
    
    model.addAttribute(RestConstants.Return_G_entity, o);
    return model;
    
  }
}
