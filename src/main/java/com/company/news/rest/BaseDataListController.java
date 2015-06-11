package com.company.news.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.entity.BaseDataList;
import com.company.news.entity.BaseDataType;
import com.company.news.entity.Group;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.BaseDataListService;
import com.company.news.service.BaseDataTypeService;
import com.company.news.service.GroupService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/basedatalist")
public class BaseDataListController extends AbstractRESTController {

	@Autowired
	private BaseDataListService baseDataListService;


	
	
	/**
	 * 组织增加
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		
		try {
			BaseDataList baseDatalist = baseDataListService.add(request.getParameter("datavalue"),request.getParameter("description"),
					request.getParameter("datakey"),request.getParameter("typeuuid"),request.getParameter("enable"),responseMessage);
			if(baseDatalist!=null)
			model.addAttribute(baseDatalist);
			else
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("增加成功");
		return "";
	}
	
	
	
	/**
	 * 组织增加
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String update(ModelMap model, HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		
		try {
			BaseDataList baseDatalist = baseDataListService.update(request.getParameter("uuid"),request.getParameter("datavalue"),request.getParameter("description"),
					request.getParameter("datakey"),request.getParameter("typeuuid"),request.getParameter("enable"),responseMessage);
			if(baseDatalist!=null)
			model.addAttribute(baseDatalist);
			else
				return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}

		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("增加成功");
		return "";
	}

    /**
     * 获取机构信息
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/getBaseDataListByTypeuuid", method = RequestMethod.GET)
    public String getBaseDataListByTypeuuid( ModelMap model, HttpServletRequest request) {
    	ResponseMessage responseMessage =RestUtil.addResponseMessageForModelMap(model);
        List<BaseDataList> list=baseDataListService.getBaseDataListByTypeuuid(request.getParameter("typeuuid"));
        model.addAttribute(RestConstants.Return_ResponseMessage_list,list);
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
        return "";
    }
    
    
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String delete( ModelMap model,HttpServletRequest request) {
		//返回消息体
		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		
		try {
			boolean flag=baseDataListService.delete(request.getParameter("uuid"), responseMessage);
		    if(!flag)
		    	return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
        
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("删除成功");
        return "";
    }
    

}
