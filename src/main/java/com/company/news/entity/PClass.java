package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="px_class") 
public class PClass extends IdEntity{
	
	  @Column
	  private Timestamp create_time;//创建时间
	  @Column
	  private String name;//品牌名称
	  @Column
	  private String groupuuid;//公司全称
	  @Column
	  private String createUser;//类型：2，培训机构，1:幼儿园
	  @Column
	  private String createUseruuid;//坐标
	  
	public Timestamp getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Timestamp create_time) {
		this.create_time = create_time;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGroupuuid() {
		return groupuuid;
	}
	public void setGroupuuid(String groupuuid) {
		this.groupuuid = groupuuid;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getCreateUseruuid() {
		return createUseruuid;
	}
	public void setCreateUseruuid(String createUseruuid) {
		this.createUseruuid = createUseruuid;
	}

	  



}
