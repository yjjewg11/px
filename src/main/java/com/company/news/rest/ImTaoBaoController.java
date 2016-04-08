package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.im.taobao.ImTaoBaoConstants;
import com.company.news.core.iservice.ImTaobaoIservice;
import com.company.news.entity.Group4QBaseInfo;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;
import com.taobao.api.domain.Userinfos;

@Controller
@RequestMapping(value = "/im")
public class ImTaoBaoController extends AbstractRESTController {
	
	@Autowired
	private ImTaobaoIservice imTaobaoIservice;
	  @Autowired
	  protected UserinfoService userinfoService;

	/**
	 * 获取我的登录用户
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getMyLoginUser", method = RequestMethod.GET)
	public String getMyLoginUser(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			;
			;
			List<Userinfos>  userinfos=imTaobaoIservice.getImUserByUser(SessionListener.getUserInfoBySession(request), responseMessage);

			
			model.addAttribute(ImTaoBaoConstants.Return_userinfos,userinfos);
			if(userinfos==null){
				return "";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	

	/**
	 * 获取我的登录用户
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/createTribe", method = RequestMethod.GET)
	public String createTribe(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {

			String groupuuid = request.getParameter("groupuuid");
			if(DBUtil.isSqlInjection(groupuuid, responseMessage))return "";
			if(StringUtils.isBlank(groupuuid)){
				responseMessage.setMessage("请选择一个学校");
				return "";
			}
			
			  Group4QBaseInfo group=(Group4QBaseInfo)imTaobaoIservice.getnSimpleHibernateDao().getObject(Group4QBaseInfo.class, groupuuid);
			  if(group==null){
				  responseMessage.setMessage("学校不存在!");
				  return "";
			  }
			  
			
//			if(!RightUtils.hasRight(groupuuid, RightConstants.KD_announce_m, request)){
//				responseMessage.setMessage("没有权限不能创建");
//				return "";
//			}
			  
			  PaginationData pData=new PaginationData();
			  pData.setPageSize(1000);
			  userinfoService.getUserTelsByGroupuuidByPage(groupuuid, "", pData);
			  
			  
////			Userinfos userinfo=imTaobaoIservice.createTribe(SessionListener.getUserInfoBySession(request),group, responseMessage);
//
//			
//			model.addAttribute(RestConstants.Return_G_entity,userinfo);
//			if(userinfo==null){
//				return "";
//			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
}
