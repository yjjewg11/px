package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 训练计划(普通用户发起）
 * @author Administrator
 *
 */
@Entity
@Table(name="run_training_plan") 
public class TrainingPlan implements DBEntityInterface {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @Column(name = "id", unique = true, nullable = false)
  private Long id;//主键
  @Column
  private Long create_userid;//创建用户id
  @Column
  private Integer exercise_mode;//[必填]锻炼方式.枚举值：1.普通跑步(默认)。2.马拉松
  @Column
  private String context;//其他要求，自由填写
  @Column
  private Timestamp start_time;// [必填]开始日期时间    最近7天
  @Column
  private Timestamp end_time;// [必填]结束日期时间  最近7天
  @Column
  private String place;// [必填]地点
  @Column
  private String map_coordinates;//地点坐标,(比如:116.307629,40.058359)
  @Column
  private Integer runKM;//[ 马拉松模式下必填]距离（单位KM），计划跑多少公里   1~100
  @Column
  private Integer run_times;//计划跑多少公里时间要求   1~48
  @Column
  private Double price;//[必填]发布价格 1~9999
  @Column
  private Integer status;//订单状态：0：未发布，1：发布，2：待支付（已接单），3支付完成，4：训练完成,5:关闭
  @Column
  private Timestamp receiving_order_time;//接单时间
  @Column
  private Timestamp pay_time;//支付时间
  @Column
  private Timestamp complete_time;//关闭时间
  @Column
  private Timestamp create_time;//创建时间
  @Column
  private Long  trainer_id;//教练用户id
  @Column
  private Long  appraise_level;//评价级别。必填。1-5星。默认5星。
  @Column
  private Long  appraise_context;//评价内容。[最大300字数]可以不填写。
  @Column
  private Timestamp  appraise_time;//时间。

  
  
  @Override
  public Long getId() {
    // TODO Auto-generated method stub
    return id;
  }


  public Long getCreate_userid() {
    return create_userid;
  }


  public void setCreate_userid(Long create_userid) {
    this.create_userid = create_userid;
  }


  public Integer getExercise_mode() {
    return exercise_mode;
  }


  public void setExercise_mode(Integer exercise_mode) {
    this.exercise_mode = exercise_mode;
  }


  public String getContext() {
    return context;
  }


  public void setContext(String context) {
    this.context = context;
  }


  public Timestamp getStart_time() {
    return start_time;
  }


  public void setStart_time(Timestamp start_time) {
    this.start_time = start_time;
  }


  public Timestamp getEnd_time() {
    return end_time;
  }


  public void setEnd_time(Timestamp end_time) {
    this.end_time = end_time;
  }


  public String getPlace() {
    return place;
  }


  public void setPlace(String place) {
    this.place = place;
  }


  public String getMap_coordinates() {
    return map_coordinates;
  }


  public void setMap_coordinates(String map_coordinates) {
    this.map_coordinates = map_coordinates;
  }


  public Integer getRunKM() {
    return runKM;
  }


  public void setRunKM(Integer runKM) {
    this.runKM = runKM;
  }


  public Integer getRun_times() {
    return run_times;
  }


  public void setRun_times(Integer run_times) {
    this.run_times = run_times;
  }


  public Double getPrice() {
    return price;
  }


  public void setPrice(Double price) {
    this.price = price;
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


  public Timestamp getCreate_time() {
    return create_time;
  }


  public void setCreate_time(Timestamp create_time) {
    this.create_time = create_time;
  }


  public Long getTrainer_id() {
    return trainer_id;
  }


  public void setTrainer_id(Long trainer_id) {
    this.trainer_id = trainer_id;
  }


  public Long getAppraise_level() {
    return appraise_level;
  }


  public void setAppraise_level(Long appraise_level) {
    this.appraise_level = appraise_level;
  }


  public Long getAppraise_context() {
    return appraise_context;
  }


  public void setAppraise_context(Long appraise_context) {
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

}
