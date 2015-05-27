package com.company.news.exception;

public class BusinessException extends Exception {

  public BusinessException(Throwable throwable) {
    super(throwable);
  }
  
  public BusinessException(String throwable) {
    super(throwable);
  }
}
