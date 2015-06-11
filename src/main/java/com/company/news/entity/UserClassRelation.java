package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


/**
 * 用户基本信息表
 * 
 * @author Administrator
 * 
 */
@Entity
@Table(name = "px_userclassrelation")
public class UserClassRelation extends IdEntity {

	@Column
	private String classuuid;//班级标示
	@Column
	private String useruuid;// 昵称

	public String getClassuuid() {
		return classuuid;
	}
	public void setClassuuid(String classuuid) {
		this.classuuid = classuuid;
	}
	public String getUseruuid() {
		return useruuid;
	}
	public void setUseruuid(String useruuid) {
		this.useruuid = useruuid;
	}
	



}
