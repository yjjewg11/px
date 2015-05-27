package com.company.news.cache;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class CommonsCache {
  static public String Key_getAllDept="Key_getAllDept";
  static public String Key_md5_getAllDept="Key_md5_getAllDept";
  //获取Map<部门code,部门级别>
  static public String Key_getAllDeptLevelMap="Key_getAllDeptLevelMap";
  //频道map
  static public Map Cache_Map=new ConcurrentHashMap();

}
