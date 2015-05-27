package com.ucpaas.restDemo;

import com.company.news.json.JSONUtils;

public class Gson1 {

  public String toJson(Object o) {
    // TODO Auto-generated method stub
    return JSONUtils.getJsonString(o);
  }
}
