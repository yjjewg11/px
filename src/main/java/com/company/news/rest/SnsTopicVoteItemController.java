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
import com.company.news.rest.util.DBUtil;
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
				
				String uuid=request.getParameter("uuid");
				if(DBUtil.isSqlInjection(uuid, responseMessage))return "";
				
				boolean flag = snsTopicVoteItemService.delete(uuid,
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
				
		 /**
			 * SHOW投票提交接口
			 * @param model
			 * @param request
			 * @return
			 */
			@RequestMapping(value = "/updateVote", method = RequestMethod.GET)
			public String updateVote(ModelMap model, HttpServletRequest request) {
				ResponseMessage responseMessage = RestUtil
						.addResponseMessageForModelMap(model);
				try {
					
					SessionUserInfoInterface user=this.getSessionUser(request,responseMessage);
					if(user==null){
						return "";
					}
					String topic_uuid=request.getParameter("topic_uuid");
					String item_uuid=request.getParameter("item_uuid");
					
					if(DBUtil.isSqlInjection(topic_uuid, responseMessage))return "";
					
					if(DBUtil.isSqlInjection(item_uuid, responseMessage))return "";
					
					
				boolean flag = snsTopicVoteItemService.updateVote(topic_uuid, item_uuid, user.getUuid(), responseMessage);
					if(!flag)return "";
					responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
					return "";
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
					responseMessage.setMessage("服务器异常:"+e.getMessage());
					return "";
				}
			}		
}

