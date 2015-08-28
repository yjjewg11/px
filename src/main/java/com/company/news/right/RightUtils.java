package com.company.news.right;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.company.news.rest.RestConstants;
import com.company.news.service.RightService;
import com.company.web.listener.SessionListener;

public class RightUtils {
	private static Logger logger = Logger.getLogger(RightUtils.class);
	/**
	 * 判断当前用户是否有某个权限
	 * @param rightName
	 * @param request
	 * @return
	 */
	public static boolean hasRight(String groupuuid,String rightName,HttpServletRequest request){
		
		HttpSession session =SessionListener.getSession(request);
		List rights=(List)session.getAttribute(RestConstants.Session_UserInfo_rights);
		try {
			for(int i=0;i<rights.size();i++){
				Object[] sa=(Object[])rights.get(i);
				if(groupuuid.equals(sa[0])&&rightName.equals(sa[1])){
					return true;
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		 if(rights.contains(rightName)){
//			 return true;
//		 }
		 return false;
	}
	/**
	 * 判断当前用户是否有某个权限,用户任意一个学校有这个权限即可
	 * @param rightName
	 * @param request
	 * @return
	 */
	public static boolean hasRightAnyGroup(String rightName,HttpServletRequest request){
		
		HttpSession session =SessionListener.getSession(request);
		List rights=(List)session.getAttribute(RestConstants.Session_UserInfo_rights);
		try {
			for(int i=0;i<rights.size();i++){
				Object[] sa=(Object[])rights.get(i);
				if(rightName.equals(sa[1])){
					return true;
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		 if(rights.contains(rightName)){
//			 return true;
//		 }
		 return false;
	}
	
	/**
	 * 判断当前用户是否是管理员登录
	 * @param rightName
	 * @param request
	 * @return
	 */
	public static boolean isAdmin(HttpServletRequest request){
		HttpSession session =SessionListener.getSession(request);
		Boolean isAdmin=(Boolean)session.getAttribute(RestConstants.Session_isAdmin);
		 if(isAdmin==null){
			 return false;
		 }
		 return isAdmin;
	}

}
