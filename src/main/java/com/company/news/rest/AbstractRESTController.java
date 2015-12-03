package com.company.news.rest;

import java.util.Collection;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.beanutils.converters.SqlTimestampConverter;
import org.apache.commons.lang.StringUtils;
import org.springframework.ui.ModelMap;

import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.User;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.query.PaginationData;
import com.company.news.vo.ResponseMessage;
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
	  protected SessionUserInfoInterface getUserInfoBySession(HttpServletRequest request){
		    // 返回用户信息
		    return SessionListener.getUserInfoBySession(request);
		  }
	  
	  public  SessionUserInfoInterface getSessionUser(HttpServletRequest request,
				ResponseMessage responseMessage) {
			SessionUserInfoInterface user=SessionListener.getUserInfoBySession(request);
			if(user==null){
				responseMessage.setMessage("请先登录后在操作!");
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_sessionTimeout);
			}
			return null;
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
	    //JSONUtils.getMorpherRegistry().registerMorpher(
	    //  new NpmsDateMorpher(new String[] {"yyyy-MM-dd HH:mm:ss" }));
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
