package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.KDMovieTemplateService;
import com.company.news.vo.ResponseMessage;
/**
 * 家庭相册模板查询
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/fPMovieTemplate")
public class KDMovieTemplateController extends AbstractRESTController {

	@Autowired
	private KDMovieTemplateService kPMovieTemplateService;


	
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String query(ModelMap model, HttpServletRequest request,PaginationData pData) {
		model.clear();
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		//设置当前用户
		SessionUserInfoInterface user=this.getUserInfoBySession(request);
		
		try {
			
//			String family_uuid=request.getParameter("family_uuid");
//			if(StringUtils.isBlank(family_uuid)){
//				responseMessage.setMessage("family_uuid 不能为空");
//				return "";
//			}
//			if(DBUtil.isSqlInjection(family_uuid, responseMessage))return "";
			
			PageQueryResult pageQueryResult= kPMovieTemplateService.query(pData,model);
			model.addAttribute(RestConstants.Return_ResponseMessage_list, pageQueryResult);
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
