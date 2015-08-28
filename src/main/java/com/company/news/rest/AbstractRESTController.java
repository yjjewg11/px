package com.company.news.rest;

import java.util.Collection;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.beanutils.converters.SqlTimestampConverter;
import org.apache.commons.lang.StringUtils;
import org.springframework.ui.ModelMap;

import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.User;
import com.company.news.json.NpmsDateMorpher;
import com.company.news.query.PaginationData;
import com.company.news.vo.UserInfoReturn;
import com.company.web.listener.SessionListener;



public class AbstractRESTController   {
	static{
		ConvertUtils.register(new DateConverter(null), java.util.Date.class); 
		ConvertUtils.register(new SqlTimestampConverter(), java.sql.Timestamp.class);
		ConvertUtils.register(new SqlTimestampConverter(null), java.sql.Timestamp.class);
	}
	protected static final String error_bodyJsonToFormObject="请求协议不匹配";//JSON对象解析失败
	  /**
	   * 返回客户端用户信息放入Map
	   * @param request
	   * @return
	   */
	  protected void putUserInfoReturnToModel( ModelMap model,HttpServletRequest request){
	    User user = SessionListener.getUserInfoBySession(request);
	    // 返回用户信息
	    UserInfoReturn userInfoReturn = new UserInfoReturn();
	    try {
	      BeanUtils.copyProperties(userInfoReturn, user);
	      userInfoReturn.setImg(PxStringUtil.imgUrlByUuid(userInfoReturn.getImg()));
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    model.addAttribute(RestConstants.Return_UserInfo,userInfoReturn);
	    HttpSession session =SessionListener.getSession(request);
	    // //List<groupuuid,rightname>
	    model.addAttribute(RestConstants.Session_UserInfo_rights,session.getAttribute(RestConstants.Session_UserInfo_rights));
	  }
	  
	  /**
	   * 
	   * @param request
	   */
	  protected PaginationData getPaginationDataByRequest(HttpServletRequest request){
		  PaginationData pd=new PaginationData();
		  if(StringUtils.isNotBlank(request.getParameter("pageNo")))
			  pd.setPageNo(Integer.parseInt(request.getParameter("pageNo")));
		  if(StringUtils.isNotBlank(request.getParameter("pageSize")))
			  pd.setPageSize(Integer.parseInt(request.getParameter("pageSize")));
		  
		  return pd;
	  }
	  
	  /**
	   * 
	   * @param request
	   * @return
	   */
	  protected User getUserInfoBySession(HttpServletRequest request){
		    User user = SessionListener.getUserInfoBySession(request);
		    // 返回用户信息
		    return user;
		  }
	  /**
	   * 获取我的幼儿园列表.
	   * uuid1,uuid2
	   * @param request
	   * @return uuid1,uuid2
	   */
	  protected String getMyGroupUuidsBySession(HttpServletRequest request){
		  HttpSession session =SessionListener.getSession(request);
		    return (String)session.getAttribute(RestConstants.Session_MygroupUuids);
		  }
	  /**
	   * 
	   * @param bodyJson
	   * @param clazz
	   * @param model
	   * @return
	   * @throws Exception
	   */
	  public static Collection bodyJsonToObjectCollection(String bodyJson,Class clazz) throws Exception{
	  

//	    return JSONUtils.jsonToObject(bodyJson, clazz);
	    JSONObject jsonObject = null;
//	    JsonConfig jsonConfig = new JsonConfig();
//	    jsonConfig.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor() );
//	    jsonConfig.registerJsonValueProcessor(Timestamp.class, new JsonDateValueProcessor() );
	//    
	//  //  jsonObject = JSONObject.fromObject(bodyJson, jsonConfig);
//	    JSONUtils.getMorpherRegistry().registerMorpher(
//	      new NpmsDateMorpher(new String[] {"yyyy-MM-dd HH:mm:ss" }));
	    JSONArray jSONArray = JSONArray.fromObject(bodyJson);
	    
	    return  JSONArray.toCollection(jSONArray, clazz);
//	    return JSONObject.toBean(jsonObject, clazz);
	  }
	  /**
	   * 
	   * @param bodyJson
	   * @param clazz
	   * @param model
	   * @return
	   * @throws Exception
	   */
	  public static Object bodyJsonToFormObject(String bodyJson,Class clazz) throws Exception{
	  

//	    return JSONUtils.jsonToObject(bodyJson, clazz);
	    JSONObject jsonObject = null;
//	    JsonConfig jsonConfig = new JsonConfig();
//	    jsonConfig.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor() );
//	    jsonConfig.registerJsonValueProcessor(Timestamp.class, new JsonDateValueProcessor() );
	//    
	//  //  jsonObject = JSONObject.fromObject(bodyJson, jsonConfig);
	    JSONUtils.getMorpherRegistry().registerMorpher(
	      new NpmsDateMorpher(new String[] {"yyyy-MM-dd HH:mm:ss" }));
	    jsonObject = JSONObject.fromObject(bodyJson);
	    return  JSONObject.toBean(jsonObject,clazz);
//	    return JSONObject.toBean(jsonObject, clazz);
	  }

	  public static Properties bodyJsonToProperties(String bodyJson) throws Exception{
//	    return (Properties)JSONUtils.jsonToObject(bodyJson, Properties.class);
	    JSONObject jsonObject = null;
	    JsonConfig jsonConfig = new JsonConfig();
//	    jsonConfig.registerDefaultValueProcessor(java.util.Date.class, new JsonDateValueProcessor() );
//	    jsonObject = JSONObject.toBean(bodyJson, jsonConfig);//fromObject(bodyJson);
	    jsonObject = JSONObject.fromObject(bodyJson);
	    return (Properties)JSONObject.toBean(jsonObject, Properties.class);
	  }

}
