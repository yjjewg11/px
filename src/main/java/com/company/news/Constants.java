package com.company.news;
/**
 * 存手机特有的常量
 * @author Administrator
 *
 */
public class Constants {    
  static public String DBtype="oracle";//db2,oracle
  static public boolean Debug=true;//是否调试模式,调试模式允许使用假数据调试.
  //请求返回状态-无权限
  static public String Charset="UTF-8";
  

  public static final String COLUMNTYPE_COLUMNDOCQUERY = "ColumnDocQuery";//文稿栏目查询权限
  public static final String COLUMNTYPE_COLUMNDOC= "ColumnBroadCast";//文稿栏目维护权限
  
  public static final String COLUMNTYPE_COLUMNDOCListQUERY = "ColumnQuery";//串联单栏目查询权限

  public static final String COLUMNTYPE_COLUMNDOCList = "ColumnMaintain";//串联单栏目维护权限
  public static final String PROFIX_OF_CLASSID = "#C";
  
  public static final Integer IN_TRASHBOX_FLAG = Integer.valueOf(1);
  public static final Integer NOTIN_TRASHBOX_FLAG = Integer.valueOf(0);

  
  public static String APP_Mytask_listplan_queryImUncheck="listplan_queryImUncheck";
  public static String APP_Mytask_listplan_queryUncheck="listplan_queryUncheck";
  public static String APP_Mytask_seriesreport_queryUncheck="seriesreport_queryUncheck";
  public static String APP_Mytask_stagekey_queryUncheck="stagekey_queryUncheck";
  public static String APP_Mytask_coverplan_queryMy="coverplan_queryMy";
  public static String APP_Mytask_listplan_queryUnclaim="listplan_queryUnclaim";
  public static String APP_Mytask_coverplan_queryListplan="coverplan_queryListplan";
  
  public static String APP_Mytask_listplan_queryMy="listplan_queryMy";
  public static String APP_Mytask_pubdoc_queryMy="pubdoc_queryMy";
  public static String APP_Mytask_coldoc_queryMy="coldoc_queryMy";
  
  public static String APP_Mytask_pubdoc_queryUncheck="pubdoc_queryUncheck";
  public static String APP_Mytask_pubdoc_queryUncheckVideo="pubdoc_queryUncheckVideo";
  public static String APP_Mytask_coldoc_queryUncheck="coldoc_queryUncheck";
  public static String APP_Mytask_coldoc_queryUncheckVideo="coldoc_queryUncheckVideo";

}
