package com.company.news.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.entity.TeacherJudge;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.TeachingJudgeService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/teachingjudge")
public class TeachingJudgeController extends AbstractRESTController {
	private static Logger logger = Logger.getLogger(TeachingJudgeController.class);

	@Autowired
	private TeachingJudgeService teachingJudgeService;


	/**
	 * 
	 * teachingjudge/query.json
	 * 需要改成分页查询.
	 * 老师评价
	 * pagesize=50
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String query(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		
		
		String groupuuid=request.getParameter("groupuuid");
		String type=request.getParameter("type");
		String begDateStr=request.getParameter("begDateStr");
		String endDateStr=request.getParameter("endDateStr");
		
		if(DBUtil.isSqlInjection(groupuuid, responseMessage))return "";
		if(DBUtil.isSqlInjection(type, responseMessage))return "";
		if(DBUtil.isSqlInjection(begDateStr, responseMessage))return "";
		if(DBUtil.isSqlInjection(endDateStr, responseMessage))return "";
		
		
		
		if (StringUtils.isBlank(groupuuid)) {
			responseMessage.setMessage( "groupuuid 不能为空");
			return "";
		}
		
		String right=RightConstants.KD_teachingjudge_q;
		if(SessionListener.isPXLogin(request)){
			right=RightConstants.PX_teachingjudge_q;
		}
			if(!RightUtils.hasRight(groupuuid,right, request)){
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_nopower);
				return "";
			}
		    List list= teachingJudgeService.query(groupuuid,type,
		    		begDateStr,endDateStr);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);

		return "";
	}


	
	
	
}
