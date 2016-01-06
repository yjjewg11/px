package com.company.news.rest; 
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.ResponseMessageConstants;
import com.company.news.SystemConstants;
import com.company.news.cache.PxRedisCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.SnsTopic;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.SnsTopicJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.CountService;
import com.company.news.service.SnsDianzanService;
import com.company.news.service.SnsTopicService;
import com.company.news.service.SnsTopicVoteItemService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/snsTopicVoteItem")
/**
 * 条目
 * @author liumingquan
 *
 */
public class SnsTopicVoteItemController extends AbstractRESTController {
	@Autowired
	private SnsTopicVoteItemService snsTopicVoteItemService;
	
		@RequestMapping(value = "/delete", method = RequestMethod.POST)
		public String delete(ModelMap model, HttpServletRequest request) {
			// 返回消息体
			ResponseMessage responseMessage = RestUtil
					.addResponseMessageForModelMap(model);

			try {
				boolean flag = snsTopicVoteItemService.delete(request.getParameter("uuid"),
						responseMessage,request);
				if (!flag)
					return "";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
				responseMessage.setMessage(e.getMessage());
				return "";
			}

			responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
			responseMessage.setMessage("删除成功");
			return "";
		}
				
		
}
