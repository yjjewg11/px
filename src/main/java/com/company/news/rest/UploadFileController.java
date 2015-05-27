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
import com.company.news.form.UploadFileForm;
import com.company.news.service.UploadFileService;

@Controller
public class UploadFileController {
  @Autowired
  private UploadFileService uploadFileService;
  
  
  /**
   * 根据guid返回图片下载流
   * @param model
   * @param request
   * @return
   * @throws Exception 
   */
  @RequestMapping(value = "/uploadFile/getImgFile", method = RequestMethod.GET)
  public String getImg(@RequestParam("guid") String guid, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
      uploadFileService.down(guid,response,ContentTypeConstants.Image_gif);
      return "";
  }
  /**
   * 上传我的头像
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/uploadFile/uploadMyheadImg", method = RequestMethod.POST)
  public String uploadMyheadImg(UploadFileForm upladFile,@RequestParam("file") CommonsMultipartFile file,ModelMap model, HttpServletRequest request) {
    upladFile.setType(SystemConstants.UploadFile_type_myhead);
    upladFile.setDeleteOldFile(1);
    uploadFileService.uploadImg(upladFile,file,model, request);
      return "";
  }
  /**
   * 上传我身份证
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/uploadFile/uploadIdentityCardImg", method = RequestMethod.POST)
  public String uploadIdentityCardImg(UploadFileForm upladFile,@RequestParam("file") CommonsMultipartFile file,ModelMap model, HttpServletRequest request) {
    upladFile.setType(SystemConstants.UploadFile_type_identity_card);
    upladFile.setDeleteOldFile(1);
    uploadFileService.uploadImg(upladFile,file,model, request);
      return "";
  }
  /**
   * 上传我马拉松认证
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/uploadFile/uploadMarathonImg", method = RequestMethod.POST)
  public String uploadMarathonImg(UploadFileForm upladFile,@RequestParam("file") CommonsMultipartFile file,ModelMap model, HttpServletRequest request) {
    upladFile.setType(SystemConstants.UploadFile_type_marathon);
    upladFile.setDeleteOldFile(1);
    uploadFileService.uploadImg(upladFile,file,model, request);
      return "";
  }

  @RequestMapping(value = "/uploadFile/delete/{uuid}", method = RequestMethod.DELETE)
  public String delete(@PathVariable("uuid") String uuid, HttpServletRequest request, ModelMap model) {
    uploadFileService.delete(uuid, request, model);
      return "";
  }
}
