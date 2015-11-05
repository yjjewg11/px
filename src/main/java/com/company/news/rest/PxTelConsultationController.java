package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.PxTelConsultationService;
import com.company.news.vo.ResponseMessage;

/**
 * 咨询记录表查询.
 * @author liumingquan
 *
 */
@Controller
@RequestMapping(value = "/pxTelConsultation")
public class PxTelConsultationController extends AbstractRESTController {

	@Autowired
	private PxTelConsultationService pxTelConsultationService;

	@RequestMapping(value = "/queryByPage", method = RequestMethod.GET)
	public String queryByPage(ModelMap model, HttpServletRequest request) {
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);

		try {
			String groupuuid=request.getParameter("groupuuid");
			if(StringUtils.isBlank(groupuuid)){//查询全部班级时,只有管理员可以.
					responseMessage.setMessage("必须选择一个学校");
					return "";
			}
			PaginationData pData = this.getPaginationDataByRequest(request);
			PageQueryResult list = pxTelConsultationService.queryByPage(groupuuid, pData);

			model.addAttribute(RestConstants.Return_ResponseMessage_list, list);
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_success);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage
					.setStatus(RestConstants.Return_ResponseMessage_failed);
			responseMessage.setMessage("服务器异常:" + e.getMessage());
		}
		return "";
	}

}
