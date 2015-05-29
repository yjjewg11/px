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
    Collection<TimeScheduleRelationJsonform> scheduleRelateion =null;
 
    try {
      JSONObject jsonObject  = JSONObject.fromObject(bodyJson);
      String time_list=jsonObject.optString("time_list");
      jsonObject.remove("time_list");
      scheduleRelateion =
        this.bodyJsonToObjectCollection(time_list, TimeScheduleRelationJsonform.class);
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
 
    
    
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
      this.nSimpleHibernateDao.getHibernateTemplate().flush();
    }else{
      dbobj =(TrainingCourse)this.nSimpleHibernateDao.getObject(this.getEntityClass(), dbobj.getId());
      if(dbobj==null){
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("数据不存在！");
        return model;
      }
     
      if(!userInfo.getId().equals(dbobj.getCreate_userid())){
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("不是创建人，没有修改权限！");
        return model;
      }
      //this.nSimpleHibernateDao.getHibernateTemplate().evict(entityDB);
      RestUtil.copyNotEmptyValueToobj(properties, form, dbobj);
      dbobj.setModify_time(TimeUtils.getCurrentTimestamp());
      
      this.nSimpleHibernateDao.getHibernateTemplate().update(dbobj);
    }
    model.addAttribute(RestConstants.Return_G_entity_id, dbobj.getId());
  
    
    //根据传进来的id，判读没有表示已经删除。下处逻辑先删除已经被删除的数据。再增加或修改。
    List timeid=new ArrayList();
    for (TimeScheduleRelationJsonform formTime : scheduleRelateion) {
      if (Long.valueOf(0).equals(formTime.getId())) {
        formTime.setId(null);
        
      }
      if(formTime.getId()!=null) timeid.add(formTime.getId());
    }
    
    String noDeleteTimeid="";
    if(timeid.size()>0){
      noDeleteTimeid=" and id not in("+StringUtils.join(timeid,",")+")";
    }
    String deleteHql="delete from TimeScheduleRelation where type=1 and relation_id="+dbobj.getId()+noDeleteTimeid;
    
    
    int count=this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(deleteHql, null);
    this.logger.info("delete TimeScheduleRelation count="+count);
    for (TimeScheduleRelationJsonform formTime : scheduleRelateion) {
      /**
       * {"context":"基础训练","difficulty_degree":1,"exercise_mode":1,"id":4,"place":"东郊记忆","price":100.0,"time_length":50,"time_list":[{"create_time":"2015-05-27 20:07:38","create_userid":4,"days":"1,3,4,5","end_time":"16:00:00","id":4,"relation_id":4,"start_time":"14:00:00","time_period":1,"type":1},{"create_time":"2015-05-27 20:07:38","create_userid":4,"days":"1,3,5","end_time":"16:00:00","id":5,"relation_id":4,"start_time":"14:00:00","time_period":1,"type":1},{},{},{},{},{},{},{},{},{}],"title":"基础训练"}

       */
      if(formTime==null||formTime.getTime_period()==null)continue;
      formTime.setType(1);
      formTime.setRelation_id( dbobj.getId());
      // 保存
    
      if (Long.valueOf(0).equals(formTime.getId())) {
        formTime.setId(null);
      }
      if (formTime.getId() == null) {// 新建
        TimeScheduleRelation dbobjTime = new TimeScheduleRelation();
        // Properties properties = (Properties) this.bodyJsonToProperties(bodyJson);
        // RestUtil.copyNotEmptyValueToobj(properties, form, dbobjTime);
        BeanUtils.copyProperties(formTime, dbobjTime);
        dbobjTime.setCreate_time(TimeUtils.getCurrentTimestamp());
        dbobjTime.setCreate_userid(userInfo.getId());
        this.nSimpleHibernateDao.save(dbobjTime);
      } else {
       
        TimeScheduleRelation entityDB =
            (TimeScheduleRelation) this.nSimpleHibernateDao.getObject(TimeScheduleRelation.class, formTime
                .getId());
        if (entityDB == null) {
          responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
          responseMessage.setMessage("请刷新页面，重试。异常数据：TimeScheduleRelation数据不存在！id="+formTime
            .getId());
          return model;
        }
        // this.nSimpleHibernateDao.getHibernateTemplate().evict(entityDB);
        BeanUtils.copyProperties(formTime, entityDB);
        // RestUtil.copyNotEmptyValueToobj(properties, form, entityDB);

        this.nSimpleHibernateDao.getHibernateTemplate().update(entityDB);
      }
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
    
    String timeListhql="from TimeScheduleRelation where type=1 and relation_id="+uuid+" order by start_time asc";
    List timeList=this.nSimpleHibernateDao.getHibernateTemplate().find(timeListhql, null);
    model.addAttribute("time_list", timeList);
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
