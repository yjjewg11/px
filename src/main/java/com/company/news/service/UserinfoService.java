package com.company.news.service;

import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.entity.TelSmsCode;
import com.company.news.entity.User;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserModifyJsonform;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.UserInfoReturn;
import com.company.plugin.security.LoginLimit;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class UserinfoService extends AbstractServcice {

  /**
   * 用户注册
   * 
   * @param entityStr
   * @param model
   * @param request
   * @return
   */
  public ModelMap reg(String bodyJson, ModelMap model, HttpServletRequest request) throws Exception {
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
   
    UserRegJsonform userRegJsonform = (UserRegJsonform)this.bodyJsonToFormObject(bodyJson, UserRegJsonform.class);
   


    String attribute = "loginname";
    User userDB =
        (User) this.nSimpleHibernateDao.getObjectByAttribute(User.class, attribute, userRegJsonform
            .getLoginname());
    if (userDB != null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("登录名已经被注册！");
      return model;
    }
    
    if(CommonsValidate.checkCellphone(userRegJsonform.getLoginname())){
      userRegJsonform.setTel(userRegJsonform.getLoginname());
    }
    attribute = "tel";
    
    
    userDB =
        (User) this.nSimpleHibernateDao.getObjectByAttribute(User.class, attribute, userRegJsonform.getTel());
    if (userDB != null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("电话号码已经被注册！");
      return model;
    }

    /**
     * 如果短信验证码不为空进行验证
     */
    if(StringUtils.isNotBlank(userRegJsonform.getTel_smscode())){
      TelSmsCode telSmsCode=(TelSmsCode)this.nSimpleHibernateDao.getObjectByAttribute(TelSmsCode.class,"tel", userRegJsonform.getTel());
      if(telSmsCode==null){
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("验证码不匹配！");
        return model;
      }
      if(userRegJsonform.getTel_smscode().equals(telSmsCode.getCode())){
        //验证成功后，清除验证码。
        this.nSimpleHibernateDao.delete(telSmsCode);
      }else{
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("验证码不匹配！");
        return model;
      }
      
    }
//    attribute = "email";
//    userDB =
//        (User) this.nSimpleHibernateDao
//            .getObjectByAttribute(User.class, attribute, user.getEmail());
//    if (userDB != null) {
//      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//      responseMessage.setMessage("Email已经被注册！");
//      return model;
//    }

    
    
    User user = new User();
    Properties properties = (Properties) this.bodyJsonToProperties(bodyJson);
    user = (User) RestUtil.copyNotEmptyValueToobj(properties, userRegJsonform, user);
    
    user.setCreatetime(TimeUtils.getCurrentTimestamp());
    user.setDisable(0);
    if(StringUtils.isNotBlank(userRegJsonform.getTel_smscode())){
      user.setTel_verify(1);
    }


    try {
      this.nSimpleHibernateDao.save(user);
    } catch (DataIntegrityViolationException e) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage(e.getMessage());

    }
    responseMessage.setMessage("注册成功！");
    return model;
  }
  /**
   * 用户修改资料
   * 
   * @param entityStr
   * @param model
   * @param request
   * @return
   */
  public ModelMap modify(String bodyJson, ModelMap model, HttpServletRequest request) throws Exception {
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    
    UserModifyJsonform form = (UserModifyJsonform)this.bodyJsonToFormObject(bodyJson, UserModifyJsonform.class);
    
    /**
     * 如果短信验证码不为空进行验证
     */
    if(StringUtils.isBlank(form.getName())){
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("昵称不能为空！");
        return model;
      }
      
    String attribute = "loginname";
    User userDB =
        (User) this.nSimpleHibernateDao.getObjectByAttribute(User.class, attribute, userInfo.getLoginname());
    if (userDB == null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("异常请求：修改资料失败，数据库没记录。");
      return model;
    }
    //保存
    Properties properties = (Properties) this.bodyJsonToProperties(bodyJson);
    RestUtil.copyNotEmptyValueToobj(properties, form, userDB);
    
    //增加教练认证和实名认证参数。
    String type=(String)request.getAttribute("verify");
    if("name".equals(type)){//实名认证
      userInfo.setReal_name_verify(SystemConstants.User_Verify_Apply);
      
    }else  if("marathon".equals(type)){//马拉松教练认证
      userInfo.setReal_name_verify(SystemConstants.User_Verify_Apply);
     // userInfo.setMarathon_verify(SystemConstants.User_Verify_Apply);
      //初始策略，默认通过
      userInfo.setMarathon_verify(SystemConstants.User_Verify_Pass);
    }
  
    try {
      this.nSimpleHibernateDao.save(userDB);
    } catch (DataIntegrityViolationException e) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage(e.getMessage());

    }
    
    SessionListener.getSession(request).setAttribute(RestConstants.Session_UserInfo, userDB);
    responseMessage.setMessage("修改成功！");
    putUserInfoReturnToModel(model,request);
    return model;
  }

  /**
   * 
   * @param loginName
   * @param password
   * @return
   * @throws Exception 
   */
  public ModelMap login(UserLoginForm userLoginForm, ModelMap model, HttpServletRequest request,
      ResponseMessage responseMessage) throws Exception {
    String loginname = userLoginForm.getLoginname();
    String password = userLoginForm.getPassword();
    if (password == null) password = "";
    if (StringUtils.isBlank(loginname)) {
      responseMessage.setMessage("用户登录名不能为空!");
      responseMessage.setStatus("failed");
      return model;
    }

    String attribute = "loginname";

    User user =
        (User) this.nSimpleHibernateDao.getObjectByAttribute(User.class, attribute, loginname);

    if (user == null) {
      responseMessage.setMessage("用户不存在或者密码错误!");
      responseMessage.setStatus("failed");
      return model;
    }

    boolean pwdIsTrue = false;
    {
      // 密码比较
      String smmPWD = user.getPassword();
      if (smmPWD == null) smmPWD = "";
      if (password.equals(smmPWD)) {
        pwdIsTrue = true;
      } else {
        pwdIsTrue = false;
      }

      //
      String project_loginLimit = ProjectProperties.getProperty("project.LoginLimit", "true");
      if ("true".equals(project_loginLimit)) {
        if (!LoginLimit.verifyCount(loginname, pwdIsTrue, responseMessage)) {// 密码错误次数验证
          return model;
        }
        if (!pwdIsTrue) {
          return model;
        }

      } else {
        if (!pwdIsTrue) {
          responseMessage.setMessage("用户登录名或者密码错误，请重试!");
          responseMessage.setStatus("failed");
          return model;
        }
      }

    }

    // 创建session
    HttpSession session = SessionListener.getSession((HttpServletRequest) request);

    if (session != null) {
      User userInfo = (User) session.getAttribute(RestConstants.Session_UserInfo);
      if (userInfo != null && loginname.equals(userInfo.getLoginname())) {
        // 当前用户,在线直接返回当前用户.
        this.logger.info("userInfo is online,loginName=" + loginname);
        // 返回用户信息
        UserInfoReturn userInfoReturn = new UserInfoReturn();
        try {
          BeanUtils.copyProperties(userInfoReturn, user);
        } catch (Exception e) {
          e.printStackTrace();
        }
        model.put(RestConstants.Return_JSESSIONID, session.getId());
        model.put(RestConstants.Return_UserInfo, userInfoReturn);
        return model;
      }
    }
    user.setLogintime(TimeUtils.getCurrentTimestamp());
    this.nSimpleHibernateDao.save(user);
    session = request.getSession(true);
    this.nSimpleHibernateDao.getHibernateTemplate().evict(user);
    SessionListener.putSessionByJSESSIONID(session);
    session.setAttribute(RestConstants.Session_UserInfo, user);
    // 返回客户端用户信息放入Map
   putUserInfoReturnToModel(model,request);
    
    model.put(RestConstants.Return_JSESSIONID, session.getId());
//    model.put(RestConstants.Return_UserInfo, userInfoReturn);

    return model;
  }

  

  @Override
  public Class getEntityClass() {
    // TODO Auto-generated method stub
    return User.class;
  }

}
