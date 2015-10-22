package com.company.news.rest;

import java.sql.Timestamp;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.service.TeacherDailyTaskService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/teacherDailyTask")
public class TeacherDailyTaskController extends AbstractRESTController {

	@Autowired
	private TeacherDailyTaskService teacherDailyTaskService;
	/**
	 * 获取我的每日任务
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryByDay", method = RequestMethod.GET)
	public String getClassNewsByMy(ModelMap model,
			HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			PaginationData pData = this.getPaginationDataByRequest(request);
			SessionUserInfoInterface user = this.getUserInfoBySession(request);
			String dateStr=request.getParameter("dateStr");
			Timestamp date=null;
			if(StringUtils.isBlank(dateStr)){
				 date= TimeUtils.getCurrentTimestamp();

			}else{
				
				 date= TimeUtils.string2Timestamp(null, dateStr);;
			}
			List list = teacherDailyTaskService.queryByDay(user, date);
			
			if(list.size()==0){//表明需要自动创建任务
				list=teacherDailyTaskService.addByAuto(user,date,request);
			}else{
				teacherDailyTaskService.updateTaskStatus(list, user, date);
			}
			model.addAttribute(RestConstants.Return_ResponseMessage_list,
					list);
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:"+e.getMessage());
			return "";
		}
		return "";
	}


}
