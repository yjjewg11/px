package com.company.web.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.ui.ModelMap;

import com.company.common.SpringContextHolder;
import com.company.http.PxHttpSession;
import com.company.news.commons.util.PxLogUtils;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

public class UserInfoFilter implements Filter {
	private static final Logger logger = Logger.getLogger(UserInfoFilter.class);

	private FilterConfig config;

	private String loginUri = "/userinfo/login.json";

	private String excludeFilters = "/login.do,/login.jsp";

	private String CONFIG_LOCATION_DELIMITERS = ",; \t\n";
	
	private UserinfoService userinfoService=SpringContextHolder.getBean("userinfoService");


	private List<String> excludeFiltersList = new ArrayList<String>();

	public UserInfoFilter() {
	}

	public void destroy() {

	}
	
	 public static String  getJSESSIONIDCookies(HttpServletRequest request) {  
	        Cookie[] getCookies = request.getCookies();  
	        if(getCookies==null)return null;
	        for (Cookie cook : getCookies) {  
	           	if(RestConstants.Return_JSESSIONID.equalsIgnoreCase(cook.getName())){
	           		return cook.getValue();
	           	}
	        }  
	        return null;
	    }  

	/**
	 * 获取真实ip
	 * 
	 * @param request
	 * @return
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip != null && ip.length() > 20) {
			System.out.println("ip.length()>20 trim:" + ip);
			ip = ip.substring(0, 20);
		}
		return ip;
	}
	
	private boolean isExcludeFilter(HttpServletRequest request){
		String servletPath = request.getPathInfo().trim();
		
		if (excludeFiltersList.contains(servletPath)){
			return true;
		}
		if ((servletPath.startsWith("/download/"))){
			return true;
		}
		if ((servletPath.startsWith("/share/"))){
			return true;
		}
		if ((servletPath.startsWith("/downloadTb/"))){
			return true;
		}
		if ((servletPath.startsWith("/sns"))){
			return true;
		}
		return false;
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
 		HttpServletRequest httpServletRequest = ((HttpServletRequest) request);
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;

		String token = httpServletRequest
				.getParameter(RestConstants.Return_access_token);
		long startTime = 0;
		long endTime = 0;
		try {
			HttpSession session = SessionListener
					.getSession((HttpServletRequest) request);
			if (session == null
					|| session.getAttribute(RestConstants.Session_UserInfo) == null) {
				// 如果是附件下载也不需要进行校验
				if (!isExcludeFilter(httpServletRequest)) {
					
					boolean isLogin=false;
					//根据传入的参数,从数据库获取用户信息.有则合法.自动登录.实现sessionid共享
					String jessionid=request.getParameter(RestConstants.Return_JSESSIONID);
					if(StringUtils.isNotBlank(jessionid)){
						isLogin=userinfoService.updateAndloginForJessionid(jessionid, (HttpServletRequest)request);
						
					}
					//从cookie中获取sessionid
					if(!isLogin){
							 String tmp=getJSESSIONIDCookies((HttpServletRequest)request);
							 if(StringUtils.isNotBlank(tmp)){
								 jessionid=tmp;
								 isLogin=userinfoService.updateAndloginForJessionid(jessionid, (HttpServletRequest)request);
							 }
					}
//					
					
					if(!isLogin){
						//增加自动登录日志记录.
						this.logger.warn("updateAndloginForJessionid failed!jessionid="+jessionid);
						String msg="client IP:"+UserInfoFilter.getIpAddr((HttpServletRequest) request)+","
			                    + httpServletRequest.getMethod() +"|"+httpServletRequest.getRequestURL()+ "?"
			                    + httpServletRequest.getQueryString();
						this.logger.warn(msg);
						ModelMap model = new ModelMap();
						ResponseMessage responseMessage = RestUtil
								.addResponseMessageForModelMap(model);
						if (StringUtils.isNotBlank(token)) {
							RestUtil.addNoTokenForResponseMessage(responseMessage);
						} else {
							RestUtil.addNoSessionForResponseMessage(responseMessage);
						}
						responseMessage
								.setStatus(RestConstants.Return_ResponseMessage_sessionTimeout);
						httpServletResponse
								.setContentType("application/json;charset=UTF-8");
						httpServletResponse.getWriter().print(
								JSONObject.fromObject(model).toString());
						httpServletResponse.flushBuffer();
						return;
					}
					
				}
			}
			
			
//			if(session instanceof PxHttpSession){//手动设置最后访问时间.
//				((PxHttpSession) session).setLastAccessedTime(System.currentTimeMillis());
//			}
			startTime = System.currentTimeMillis();
			filterChain.doFilter(request, response);
			endTime = System.currentTimeMillis() - startTime;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			String msg="client IP:"+UserInfoFilter.getIpAddr((HttpServletRequest) request)+","
                    + httpServletRequest.getMethod() +"|"+httpServletRequest.getRequestURL()+ "?"
                    + httpServletRequest.getQueryString();
			PxLogUtils.log(logger, endTime, msg);
		}
	}

	public void init(FilterConfig config) throws ServletException {
		this.config = config;
		this.loginUri = this.config.getInitParameter("loginUri");
		String _excludeFilters = this.config.getInitParameter("excludeFilters");
		if (org.apache.commons.lang.StringUtils.isNotEmpty(_excludeFilters)) {
			this.excludeFilters = _excludeFilters;
		}
		String[] excludeFiltersArray = org.springframework.util.StringUtils
				.tokenizeToStringArray(excludeFilters,
						CONFIG_LOCATION_DELIMITERS);
		for (int i = 0, j = excludeFiltersArray.length; i < j; i++) {
			excludeFiltersList.add(excludeFiltersArray[i]);
		}

	}
}
