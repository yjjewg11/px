package com.company.news.rest;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.query.UserRelationTrainingCourseSearchContion;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.UserRelationTrainingCourseService;
import com.company.news.springMVC.beans.propertyeditors.CustomTimestampEditor;
import com.company.news.vo.ResponseMessage;

@Controller
public class UserRelationTrainingCourseController {

  @InitBinder  
  public void initBinder(WebDataBinder binder) {   
      // 忽略字段绑定异常   
      // binder.setIgnoreInvalidFields(true);   

      DateFormat format = new SimpleDateFormat(RestConstants.SimpleDateFormat);   
      format.setLenient(true);   
      binder.registerCustomEditor(Date.class, new CustomDateEditor(format, true));    

      DateFormat formatTime = new SimpleDateFormat(RestConstants.SimpleTimestampFormat);   
      binder.registerCustomEditor(Timestamp.class, new CustomTimestampEditor(formatTime, true));    
  }   

  @Autowired
  private UserRelationTrainingCourseService userRelationTrainingCourseService;
  /**
   * 保存（创建或更新）
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/userRelationTrainingCourse/save", method = RequestMethod.POST)
  public String save( ModelMap model, HttpServletRequest request) {
    String bodyJson=RestUtil.getJsonStringByRequest(request);
      try {
        userRelationTrainingCourseService.save(bodyJson, model, request);
      } catch (Exception e) {
        e.printStackTrace();
        ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage(e.getMessage());
      }
      return "";
  }
  
  @RequestMapping(value = "/userRelationTrainingCourse/{uuid}", method = RequestMethod.GET)
  public String get(@PathVariable("uuid") String uuid, ModelMap model,HttpServletRequest request) {
    try {
      userRelationTrainingCourseService.get(uuid, model,request);
    } catch (Exception e) {
      e.printStackTrace();
      ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage(e.getMessage());
    }
    
    return "";
  }
  
  
  /**
   * 根据课程查询销售数据
   * @param sc
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/userRelationTrainingCourse/query/byCourse", method = RequestMethod.GET)
   public String query(UserRelationTrainingCourseSearchContion sc, ModelMap model,HttpServletRequest request) {
    model.clear();
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    if (sc.getCourse_id()==null) {
    responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
    responseMessage.setMessage("查询条件 course_id 不能未空");
    return "";
  }
//  if (sc.getTime_schedule_id()==null) {
//    responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//    responseMessage.setMessage("查询条件 time_schedule_id 不能未空");
//    return "";
//  }
    userRelationTrainingCourseService.index(sc, model,request);
    return "";
  }
  
  
  /**
   * 查询我预订的课程
   * @param sc
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/userRelationTrainingCourse/query/subscribe/my", method = RequestMethod.GET)
  public String querySubscribeMy(UserRelationTrainingCourseSearchContion sc, ModelMap model,HttpServletRequest request) {
    sc.setType("subscribe_my");
   userRelationTrainingCourseService.index(sc, model,request);
   return "";
 }
  
  /**
   * 查询我的课程销售数据
   * @param sc
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/userRelationTrainingCourse/query/myCourse/sales", method = RequestMethod.GET)
  public String queryMyCourseSales(UserRelationTrainingCourseSearchContion sc, ModelMap model,HttpServletRequest request) {
    sc.setType("myCourse_sales");
   userRelationTrainingCourseService.index(sc, model,request);
   return "";
 }
  
  
  @RequestMapping(value = "/userRelationTrainingCourse/my/{ids}", method = RequestMethod.DELETE)
  public String delete(@PathVariable("ids") String ids,HttpServletRequest request, ModelMap model) {
    // TODO Auto-generated method stub
    userRelationTrainingCourseService.delete(ids, request,model);  
    return "";
  }
}
