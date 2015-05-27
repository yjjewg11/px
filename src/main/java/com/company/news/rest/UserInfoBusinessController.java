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

import com.company.news.query.NSearchContion;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.UserinfoBusinessCourseService;
import com.company.news.springMVC.beans.propertyeditors.CustomTimestampEditor;
import com.company.news.vo.ResponseMessage;

/**
 * 用户业务数据模块
 * @author Administrator
 *
 */
@Controller
public class UserInfoBusinessController {

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
  private UserinfoBusinessCourseService userinfoBusinessCourseService;
  
  /**
   * 查询发布状态
   * @param sc
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/coach/query", method = RequestMethod.GET)
  public String queryPublish(NSearchContion sc, ModelMap model,HttpServletRequest request) {
    sc.setType("coach");
    userinfoBusinessCourseService.index(sc, model,request);
   return "";
 }
  
}
