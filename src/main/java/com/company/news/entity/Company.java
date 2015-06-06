package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Company {
	

	  @Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  @Column(name = "id", unique = true, nullable = false)
	   private Long id;//主键
	  @Column
	  private Timestamp createtime;//创建时间
	  @Column
	  private String brand_name;//品牌名称
	  @Column
	  private String company_name;//公司全称
	  @Column
	  private Integer state;//省
	  @Column
	  private Integer city;//市
	  @Column
	  private Integer Regin;//区域	  
	  @Column
	  private String company_address;//地址
	  @Column
	  private String company_pic;//执照
	  
	  @Column
	  private String tel;//电话号码
	  @Column
	  private String loginname;//登录名
	  @Column
	  private Long teacher_id;//注册老师id
	  

}
