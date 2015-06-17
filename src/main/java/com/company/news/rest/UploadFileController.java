package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.company.news.ContentTypeConstants;
import com.company.news.SystemConstants;
import com.company.news.entity.UploadFile;
import com.company.news.form.UploadFileForm;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.UploadFileService;
import com.company.news.vo.ResponseMessage;

@Controller
@RequestMapping(value = "/uploadFile")
public class UploadFileController extends AbstractRESTController {
	@Autowired
	private UploadFileService uploadFileService;

	/**
	 * 根据guid返回图片下载流
	 * 
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getImgFile", method = RequestMethod.GET)
	public String getImg(@RequestParam("guid") String guid, ModelMap model,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		uploadFileService.down(guid, response, ContentTypeConstants.Image_gif);
		return "";
	}

	

	/**
	 * 上传我的头像
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/uploadBase64", method = RequestMethod.POST)
	public String upload(@RequestParam("base64") String base64,@RequestParam("type") Integer type, ModelMap model,
			HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			UploadFile uploadFile = uploadFileService.uploadImg(base64,type,
					responseMessage, request,
					this.getUserInfoBySession(request));
			if (uploadFile==null)
				return "";
			
			model.addAttribute(RestConstants.Return_G_entity,uploadFile);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("上传成功");
		return "";
	}
	/**
	 * 上传我的头像
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String upload(@RequestParam("file") CommonsMultipartFile file, ModelMap model,
			HttpServletRequest request) {
		// 返回消息体
		ResponseMessage responseMessage = RestUtil
				.addResponseMessageForModelMap(model);
		try {
			UploadFile uploadFile = uploadFileService.uploadImg(request.getParameter("type"), file,
					responseMessage, request,
					this.getUserInfoBySession(request));
			if (uploadFile==null)
				return "";
			
			model.addAttribute(RestConstants.Return_G_entity,uploadFile);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("上传成功");
		return "";
	}

}
