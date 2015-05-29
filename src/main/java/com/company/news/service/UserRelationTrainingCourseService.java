package com.company.news.service;

import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.entity.TimeScheduleRelation;
import com.company.news.entity.TrainingCourse;
import com.company.news.entity.User;
import com.company.news.entity.UserRelationTrainingCourse;
import com.company.news.jsonform.UserRelationTrainingCourseJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.query.UserRelationTrainingCourseSearchContion;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 用户的时段设置。 用法一：关联课程。课程1对多个时段 用法二：教练可授课时间段
 * 
 */
@Service
public class UserRelationTrainingCourseService extends AbstractServcice {
  /**
   * 保存
   * 
   * @param bodyJson
   * @param model
   * @param request
   * @return
   * @throws Exception
   */
  public ModelMap save(String bodyJson, ModelMap model, HttpServletRequest request)
      throws Exception {

    User userInfo = SessionListener.getUserInfoBySession(request);
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    UserRelationTrainingCourseJsonform form =
        (UserRelationTrainingCourseJsonform) this.bodyJsonToFormObject(bodyJson,
            UserRelationTrainingCourseJsonform.class);
    // 验证
    if (form.getCourse_id()==null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("属性 course_id 不能为空");
      return model;

    }
    if (form.getTime_schedule_id() == null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("属性 Time_schedule_id 不能为空");
      return model;
    }
    if (form.getCourse_time() == null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("请填写预约时间！");
      return model;
    }
    
    
    TrainingCourse trainingCourse =
      (TrainingCourse) this.nSimpleHibernateDao.getObject(TrainingCourse.class,  form.getCourse_id());
    if(trainingCourse==null){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("课程已不在。Course_id="+form.getCourse_id());
      return model;
    }
    
    TimeScheduleRelation timeScheduleRelation =
      (TimeScheduleRelation) this.nSimpleHibernateDao.getObject(TimeScheduleRelation.class,  form.getTime_schedule_id());
    if(timeScheduleRelation==null){
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("课程对应时段已不在。Time_schedule_id="+form.getTime_schedule_id());
      return model;
    }
   
    // 保存
    UserRelationTrainingCourse dbobj = (UserRelationTrainingCourse) this.getEntityClass().newInstance();
    Properties properties = (Properties) this.bodyJsonToProperties(bodyJson);
    RestUtil.copyNotEmptyValueToobj(properties, form, dbobj);
    if(Long.valueOf(0).equals(dbobj.getId())){
      dbobj.setId(null);
    }
    if (dbobj.getId() == null) {// 新建
      dbobj.setCreate_time(TimeUtils.getCurrentTimestamp());
      dbobj.setCreate_userid(userInfo.getId());
      dbobj.setCourse_place(trainingCourse.getPlace());
      dbobj.setCourse_coach_id(trainingCourse.getCreate_userid());
      dbobj.setCourse_difficulty_degree(trainingCourse.getDifficulty_degree());
      dbobj.setCourse_price(trainingCourse.getPrice());
      dbobj.setCourse_time_length(trainingCourse.getTime_length());
      dbobj.setCourse_title(trainingCourse.getTitle());
      
      UserRelationTrainingCourse entityDB =
        (UserRelationTrainingCourse) this.nSimpleHibernateDao.getObject(this.getEntityClass(), dbobj
            .getId());
      
      
      this.nSimpleHibernateDao.save(dbobj);
    } else {
       dbobj =
          (UserRelationTrainingCourse) this.nSimpleHibernateDao.getObject(this.getEntityClass(), dbobj
              .getId());
      if (dbobj == null) {
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("数据不存在！");
        return model;
      }

      if (!userInfo.getId().equals(dbobj.getCreate_userid())) {
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("不是创建人，没有修改权限！");
        return model;
      }
      // this.nSimpleHibernateDao.getHibernateTemplate().evict(entityDB);
      RestUtil.copyNotEmptyValueToobj(properties, form, dbobj);

      this.nSimpleHibernateDao.getHibernateTemplate().update(dbobj);
    }

    model.addAttribute(RestConstants.Return_G_entity_id, dbobj.getId());
    
    model.addAttribute(RestConstants.Return_G_entity, dbobj);
    return model;
  }

  /**
   * 保存
   * 
   * @param uuid
   * @param model
   * @param request
   * @return
   * @throws Exception
   */
  public ModelMap get(String uuid, ModelMap model, HttpServletRequest request) throws Exception {
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    if (StringUtils.isBlank(uuid)) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("uuid参数不合法");
      return model;
    }
    Object o = this.nSimpleHibernateDao.getObject(this.getEntityClass(), Long.valueOf(uuid));
    if (o == null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("数据不存在！");
      return model;
    }
    model.addAttribute(RestConstants.Return_G_entity, o);
    return model;
  }



  public ModelMap index(UserRelationTrainingCourseSearchContion sc, ModelMap model, HttpServletRequest request) {
    model.clear();
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    
//    if (sc.getCourse_id()==null) {
//      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//      responseMessage.setMessage("查询条件 course_id 不能未空");
//      return model;
//    }
//    if (sc.getTime_schedule_id()==null) {
//      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//      responseMessage.setMessage("查询条件 time_schedule_id 不能未空");
//      return model;
//    }
    User userInfo = SessionListener.getUserInfoBySession(request);
    // String hql="from " + this.getEntityClass().getName() +
    // " where  create_userid =  "+userInfo.getId();
    String hql = "from " + this.getEntityClass().getName();

    StringBuffer sb = new StringBuffer();

    if("subscribe_my".equals(sc.getType())){//查询我预订的课程
      sb.append(" and create_userid = ").append(userInfo.getId());
    }else  if("myCourse_sales".equals(sc.getType())){//查询我的课程销售数据
      sb.append(" and course_coach_id = ").append(userInfo.getId());
    }
    
    if (sc.getUser_id()!=null) {
      sb.append(" and user_id = ").append(sc.getUser_id());
    }
    if (sc.getCoach_id()!=null) {
      sb.append(" and course_coach_id = ").append(sc.getCoach_id());
    }
    if (sc.getCourse_id()!=null) {
      sb.append(" and course_id = ").append(sc.getCourse_id());
    }
    if (sc.getTime_schedule_id()!=null) {
      sb.append(" and time_schedule_id = ").append(sc.getTime_schedule_id());
    }
    

    PaginationData pData = sc.getPsoData();
    pData.setOrderFiled("id");
    pData.setOrderType("asc");

    if (sb.length() > 0) {
      // 去掉第一个的“ and”共4个字符。
      hql += " where " + sb.toString().substring(4);
    }
    pData.setPageSize(9999);
    PageQueryResult pageQueryResult = nSimpleHibernateDao.findByPaginationToHql(hql, pData);

   
    model.addAttribute(RestConstants.Return_PAGENO, pageQueryResult.getPageNo());
    model.addAttribute(RestConstants.Return_PAGESIZE, pageQueryResult.getPageSize());
    model.addAttribute(RestConstants.Return_TotalCount, pageQueryResult.getTotalCount());
    model.addAttribute(RestConstants.Return_G_entity, pageQueryResult.getData());

   

    return model;
  }



  @Override
  public Class getEntityClass() {
    // TODO Auto-generated method stub
    return UserRelationTrainingCourse.class;
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
        UserRelationTrainingCourse entityDB =
            (UserRelationTrainingCourse) this.nSimpleHibernateDao.getObjectById(getEntityClass(), Long.valueOf(idstr));
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
