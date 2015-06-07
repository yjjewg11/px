package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sobey.tp.core.entity.IdEntity;

/**
 * 上传文件，头像，身份证，认证照片
 * @author Administrator
 *
 */
@Entity
@Table(name="px_upload") 
public class UploadFile extends IdEntity {

  @Column
  private String user_uuid;//创建用户id
  @Column
  private Timestamp create_time;//创建时间
  @Column
  private String type;//[必填,10字符]文件类型.head:头像,identity:身份证认证
  @Column
  private String file_path;// [必填]相对路径
  @Column
  private String content_type;// [必填]文件类型："image/jpg","image/jpeg","image/png","image/gif"
  @Column
  private Long file_size;// [必填]文件大小
  @Column
  private String out_uuid;// [必填]外部GUID，比如用户关联类型是必应用户UUID，组织营业执照类型是对应组织UUID 


public String getUser_uuid() {
	return user_uuid;
}
public void setUser_uuid(String userUuid) {
	user_uuid = userUuid;
}
public String getOut_uuid() {
	return out_uuid;
}
public void setOut_uuid(String outUuid) {
	out_uuid = outUuid;
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


}
