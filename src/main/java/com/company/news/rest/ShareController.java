package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.dao.NSimpleHibernateDao;
import com.company.news.entity.Announcements;
import com.company.news.entity.ClassNews;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.CountService;
import com.company.news.vo.ResponseMessage;

/**
 * 公开类,用于分享数据显示.
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/share")
public class ShareController extends AbstractRESTController {

	 @Autowired
	  @Qualifier("NSimpleHibernateDao")
	  protected NSimpleHibernateDao nSimpleHibernateDao;
	 @Autowired
     private CountService countService ;

	/**
	 * 全校公告
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAnn", method = RequestMethod.POST)
	public String getAnn(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		Announcements a;
		try {
			a = (Announcements)nSimpleHibernateDao.getObject(Announcements.class,uuid);
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("数据不存在.");
				return "";
			}
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_gonggao));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}
	
	/**
	 * 全校公告
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getClassNews", method = RequestMethod.POST)
	public String save(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		String uuid=request.getParameter("uuid");
		ClassNews a;
		try {
			a = (ClassNews)nSimpleHibernateDao.getObject(ClassNews.class,uuid);
			if(a==null){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage("数据不存在.");
				return "";
			}
			model.put(RestConstants.Return_ResponseMessage_count, countService.count(uuid, SystemConstants.common_type_hudong));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		model.addAttribute(RestConstants.Return_G_entity,a);
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		return "";
	}


}
