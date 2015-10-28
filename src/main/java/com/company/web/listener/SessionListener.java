package com.company.web.listener;


import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.company.news.SystemConstants;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.rest.RestConstants;
import com.company.web.filter.UserInfoFilter;

public class SessionListener implements HttpSessionListener {
   

  //sessionMap<tokenid,session>
  static Map sessionMap=new ConcurrentHashMap ();
  //sessionMap<JSESSIONID,session>
  static Map sessionMapBySessionid=new ConcurrentHashMap ();
  
  public static void   putSessionByToken(Object key,HttpSession s ){
    sessionMap.put(key, s);
    SessionListener.putSessionByJSESSIONID(s);
  }
  public static void   putSessionByJSESSIONID(HttpSession s ){
    sessionMapBySessionid.put(s.getId(), s);
  }
  public static HttpSession   getSessionByToken(Object key ){
    
   
    return (HttpSession)sessionMap.get(key);
  }
  /**
   * 获取session统一使用该方法.策略:JSESSIONID 优先于token
   * @param request
   * @return
   */
  public static HttpSession   getSession(HttpServletRequest request){
    String token=request.getParameter(RestConstants.Return_access_token);
    String JSESSIONID=request.getParameter(RestConstants.Return_JSESSIONID);
    //1.优先根据默认关系取
    HttpSession session=request.getSession(false);;
    if(session!=null)return session;
    
    //2.根据JSESSIONID 参数获取
    if(StringUtils.isNotBlank(JSESSIONID)){//使用JSESSIONID
      session=(HttpSession)sessionMapBySessionid.get(JSESSIONID);
      if(session!=null)return session;
      String tmpsession=JSESSIONID.replaceAll(" ", "+");
      if(!JSESSIONID.equals(tmpsession)){
        logger.warn(session+",JSESSIONID Contains special characters,After the escape="+tmpsession);
      }
      session=(HttpSession)sessionMapBySessionid.get(tmpsession);
      if(session!=null){
        return session;
      }
      
   }
    //"http://120.25.127.141/runman-rest/rest/userinfo/modify.json?JSESSIONID=s6a3I+MMHVwIIq1-KAX4S0Iz.undefined";
    //sessionid 包含+号的情况
    // //3.根据token 参数获取
    if(StringUtils.isNotBlank(token)){//使用token
       return SessionListener.getSessionByToken(token);
    }
    
    //根据客户端cookie获取.解决session同步.根据数据库表user
	JSESSIONID=UserInfoFilter.getJSESSIONIDCookies(request);
	if(StringUtils.isNotBlank(JSESSIONID)){
		return (HttpSession)SessionListener.getSessionByToken(JSESSIONID);
	}
    
    return session;
  }
  
  /**
   * 获取session  中用户信息,统一使用该方法.
   * @param request
   * @return
   */
  public static SessionUserInfoInterface   getUserInfoBySession(HttpServletRequest request){
    HttpSession session =SessionListener.getSession(request);
    if(session==null)return null;
    return (SessionUserInfoInterface)session.getAttribute(RestConstants.Session_UserInfo);
  }
  

  /**
   * 是否是培训机构登陆
   * @param request
   * @return
   */
  public static boolean   isPXLogin(HttpServletRequest request){
	  if(SystemConstants.Group_type_2.toString().equals(SessionListener.getLoginTypeBySession(request))){
		  return true;
	  }
	  return false;
  }
  
  /**
   * 获取session  中用户信息,统一使用该方法.
   * @param request
   * @return
   */
  public static String   getLoginTypeBySession(HttpServletRequest request){
    HttpSession session =SessionListener.getSession(request);
    if(session==null)return null;
    return (String)session.getAttribute(RestConstants.LOGIN_TYPE);
  }
    /**
     * Logger for this class
     */
    private static final Logger logger = Logger
            .getLogger(SessionListener.class);

    private static int count = 0;
    public void sessionCreated(HttpSessionEvent se) {
        count++;
        logger.info("sessionCreated,Session count="+count);
    }

    /**
     * session invalid, unlock doc by user.
     */
    public void sessionDestroyed(HttpSessionEvent se) {
        if (logger.isDebugEnabled()) {
            logger.debug("sessionDestroyed(HttpSessionEvent) - start");
        }

        HttpSession session = se.getSession();
        //有token,则清除cache大小.
        Object token=session.getAttribute(RestConstants.Return_access_token);
        if(token!=null){
          sessionMap.remove(token);
        }
        sessionMapBySessionid.remove(session.getId());
        count--;
        logger.info("sessionDestroyed,Session count="+count);
        logger.debug("sessionDestroyed(HttpSessionEvent) - end");
    }
}