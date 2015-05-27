package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 学员关联课程和课程时段表
 * @author Administrator
 *
 */
@Entity
@Table(name="run_user_relation_training_course") 
public class UserRelationTrainingCourse implements DBEntityInterface {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @Column(name = "id", unique = true, nullable = false)
  private Long id;//主键
  @Column
  private Long user_id;//关联普通用户id
  @Column
  private Long course_id;//关联课程id
  @Column
  private Long time_schedule_id;//关联课程时段id
  @Column
  private Timestamp create_time;//关联时间
  @Column
  private Integer status;//订单状态：2：已接单，3：待支付，4支付完成，4：课程完成,5:关闭。
  @Column
  private Timestamp receiving_order_time;//接单时间
  @Column
  private Timestamp pay_time;//支付时间
  @Column
  private Timestamp complete_time;//关闭时间
  @Column
  private Integer  appraise_level;//评价级别。必填。1-5星。默认5星。
  @Column
  private String  appraise_context;//评价内容。[最大300字数]可以不填写。
  @Column
  private Timestamp  appraise_time;//时间。
  
  
  @Override
  public Long getId() {
    // TODO Auto-generated method stub
    return id;
  }


  public Long getUser_id() {
    return user_id;
  }


  public void setUser_id(Long user_id) {
    this.user_id = user_id;
  }


  public Long getCourse_id() {
    return course_id;
  }


  public void setCourse_id(Long course_id) {
    this.course_id = course_id;
  }


  public Timestamp getCreate_time() {
    return create_time;
  }


  public void setCreate_time(Timestamp create_time) {
    this.create_time = create_time;
  }


  public Integer getStatus() {
    return status;
  }


  public void setStatus(Integer status) {
    this.status = status;
  }


  public Timestamp getReceiving_order_time() {
    return receiving_order_time;
  }


  public void setReceiving_order_time(Timestamp receiving_order_time) {
    this.receiving_order_time = receiving_order_time;
  }


  public Timestamp getPay_time() {
    return pay_time;
  }


  public void setPay_time(Timestamp pay_time) {
    this.pay_time = pay_time;
  }


  public Timestamp getComplete_time() {
    return complete_time;
  }


  public void setComplete_time(Timestamp complete_time) {
    this.complete_time = complete_time;
  }


  public Integer getAppraise_level() {
    return appraise_level;
  }


  public void setAppraise_level(Integer appraise_level) {
    this.appraise_level = appraise_level;
  }


  public String getAppraise_context() {
    return appraise_context;
  }


  public void setAppraise_context(String appraise_context) {
    this.appraise_context = appraise_context;
  }


  public Timestamp getAppraise_time() {
    return appraise_time;
  }


  public void setAppraise_time(Timestamp appraise_time) {
    this.appraise_time = appraise_time;
  }


  public void setId(Long id) {
    this.id = id;
  }


  public Long getTime_schedule_id() {
    return time_schedule_id;
  }


  public void setTime_schedule_id(Long time_schedule_id) {
    this.time_schedule_id = time_schedule_id;
  }

}
