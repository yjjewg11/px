package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;




@Entity
@Table(name="px_telsmscode") 
public class TelSmsCode implements DBEntityInterface{

   public Object getId() {
    // TODO Auto-generated method stub
    return tel;
  }
   
   @Id
   @GenericGenerator(strategy = "assigned", name = "")
    @Column
  private String tel;//电话
  @Column
  private String code;//验证码
  @Column
  private Timestamp createtime;//创建时间

  public String getTel() {
    return tel;
  }

  public void setTel(String tel) {
    this.tel = tel;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public Timestamp getCreatetime() {
    return createtime;
  }

  public void setCreatetime(Timestamp createtime) {
    this.createtime = createtime;
  }
  
}
