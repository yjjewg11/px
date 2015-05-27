package com.company.news.vo;

import com.company.news.rest.RestConstants;

public class ResponseMessage implements java.io.Serializable{

  private String status;
  public ResponseMessage() {
    status=RestConstants.Return_ResponseMessage_success;
  }
  private String message;
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }
  public String getMessage() {
    return message;
  }
  public void setMessage(String message) {
    this.message = message;
  }
}
