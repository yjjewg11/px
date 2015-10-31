package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.SystemConstants;
import com.company.news.entity.GroupHabits;
import com.company.news.jsonform.GroupHabitsJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.service.GroupHabitsService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/groupHabits")
public class GroupHabitsController extends AbstractRESTController {

	@Autowired
	private GroupHabitsService groupHabitsService;


	

	
	
	/**
	 * 增加
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		if(!RightUtils.hasRight(SystemConstants.Group_uuid_wjkj,RightConstants.AD_basedata_m,request)){
			responseMessage.setMessage(RightConstants.Return_msg);
			return "";
		}
		// 请求消息体
		String bodyJson = RestUtil.getJsonStringByRequest(request);
		GroupHabitsJsonform groupHabitsJsonform;
		try {
			groupHabitsJsonform = (GroupHabitsJsonform) this.bodyJsonToFormObject(bodyJson,
					GroupHabitsJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}

//		
//		try {
//			GroupHabits baseDatalist;
//			String uuid=groupHabitsJsonform.getUuid();
//			if(StringUtils.isEmpty(uuid))
//				baseDatalist = groupHabitsService.add(groupHabitsJsonform,responseMessage);
//				else
//			baseDatalist = groupHabitsService.update(groupHabitsJsonform,responseMessage);
//			if(baseDatalist!=null)
//			model.addAttribute(baseDatalist);
//			else
//				return "";
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
//			responseMessage.setMessage(e.getMessage());
//			return "";
//		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("增加成功");
		responseMessage.setMessage("接口未开发");
		return "";
	}

    /**
     * 获取机构信息,Typeuuid保存typename
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/getByKey", method = RequestMethod.GET)
    public String getByKey( ModelMap model, HttpServletRequest request) {
    	ResponseMessage responseMessage =RestUtil.addResponseMessageForModelMap(model);
        try {
        	
        	String groupuuid=request.getParameter("groupuuid");
        	
        	String key=request.getParameter("key");
        	GroupHabits list=groupHabitsService.getByKey(groupuuid,key,responseMessage);
			model.addAttribute(RestConstants.Return_G_entity,list);
			
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
