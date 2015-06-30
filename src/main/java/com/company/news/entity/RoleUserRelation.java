package com.company.news.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="px_roleuserrelation") 
public class RoleUserRelation extends IdEntity{
	

	  @Column
	  private String roleuuid;//角色ID
	  @Column
	  private String useruuid;//权限ID
	public String getRoleuuid() {
		return roleuuid;
	}
	public void setRoleuuid(String roleuuid) {
		this.roleuuid = roleuuid;
	}
	public String getUseruuid() {
		return useruuid;
	}
	public void setUseruuid(String useruuid) {
		this.useruuid = useruuid;
	}
	  



}
