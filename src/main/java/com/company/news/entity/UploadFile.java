package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 上传文件，头像，身份证，认证照片
 * @author Administrator
 *
 */
@Entity
@Table(name="run_uploadFile") 
public class UploadFile implements DBEntityInterface {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @Column(name = "id", unique = true, nullable = false)
  private Long id;//主键
  @Column
  private String guid;// [必填唯一]请求图片时使用。防止漏洞获取所有图片。
  @Column
  private Long create_userid;//创建用户id
  @Column
  private Timestamp create_time;//创建时间
  @Column
  private String type;//[必填,10字符]文件类型.head:头像,identity:身份证认证,marathon:教练认证
  @Column
  private String file_path;// [必填]相对路径
  @Column
  private String content_type;// [必填]文件类型："image/jpg","image/jpeg","image/png","image/gif"
  
  @Column
  private Long file_size;// [必填]文件大小
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public Long getCreate_userid() {
    return create_userid;
  }
  public void setCreate_userid(Long create_userid) {
    this.create_userid = create_userid;
  }
  public Timestamp getCreate_time() {
    return create_time;
  }
  public void setCreate_time(Timestamp create_time) {
    this.create_time = create_time;
  }
  public String getType() {
    return type;
  }
  public void setType(String type) {
    this.type = type;
  }
  public String getFile_path() {
    return file_path;
  }
  public void setFile_path(String file_path) {
    this.file_path = file_path;
  }
  public Long getFile_size() {
    return file_size;
  }
  public void setFile_size(Long file_size) {
    this.file_size = file_size;
  }
  public String getContent_type() {
    return content_type;
  }
  public void setContent_type(String content_type) {
    this.content_type = content_type;
  }
  public String getGuid() {
    return guid;
  }
  public void setGuid(String guid) {
    this.guid = guid;
  }

}
