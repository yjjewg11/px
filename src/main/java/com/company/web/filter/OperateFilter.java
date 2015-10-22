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
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.company.common.Operate;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.web.listener.SessionListener;


public class OperateFilter implements Filter {
	private static final Logger LOGGER = Logger.getLogger(UserInfoFilter.class);
	private static final String operate_outline="\r\n";
	private String includeFilters = "";
	private FilterConfig config;
	private String CONFIG_LOCATION_DELIMITERS = ",; \t\n";
	private List<String> includeFiltersList = new ArrayList<String>();
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletRequest httpServletRequest = ((HttpServletRequest) request);
		String servletPath = httpServletRequest.getPathInfo().trim();
		
		if(includeFilters.contains(servletPath)){
		StringBuffer operate =new StringBuffer("请求IP："
				+ UserInfoFilter.getIpAddr(httpServletRequest)+operate_outline) ;
		operate.append("请求方法：" + httpServletRequest.getMethod()+operate_outline);
		operate.append("请求模块：" + httpServletRequest.getPathInfo() + "?"
				+ httpServletRequest.getQueryString()+operate_outline);
		
		SessionUserInfoInterface user = SessionListener
				.getUserInfoBySession((HttpServletRequest) request);
		if (user != null){
			operate.append("操作人：" + user.getName()+operate_outline);
			operate.append("uuid:" + user.getUuid()+operate_outline);
		}
		else
			operate.append("操作人：未知"+operate_outline);
		LOGGER.log(Operate.OPERATE, operate);
		}
		
		filterChain.doFilter(request, response);
	}

	public void init(FilterConfig config) throws ServletException {
		// TODO Auto-generated method stub
		this.config = config;

		String _includeFilters = this.config.getInitParameter("includeFilters");
		if (org.apache.commons.lang.StringUtils.isNotEmpty(_includeFilters)) {
			this.includeFilters = _includeFilters;
		}
		String[] includeFiltersArray = org.springframework.util.StringUtils
				.tokenizeToStringArray(_includeFilters,
						CONFIG_LOCATION_DELIMITERS);
		for (int i = 0, j = includeFiltersArray.length; i < j; i++) {
			includeFiltersList.add(includeFiltersArray[i]);
		}
	}


}
