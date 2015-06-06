package com.company.news.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 训练课程表(教练用户发起，1对多）
 * @author Administrator
 *
 */
@Entity
@Table(name="px_training_course") 
public class TrainingCourse implements DBEntityInterface {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @Column(name = "id", unique = true, nullable = false)
  private Long id;//主键
  @Column
  private Long create_userid;//创建用户id
  @Column
  private Timestamp create_time;//创建时间
  @Column
  private Timestamp modify_time;//修改时间
  @Column
  private Integer exercise_mode;//[必填]锻炼方式.枚举值：1.普通跑步(默认)。2.马拉松
  @Column
  private String title;//课程名称【必填】，20字符
  @Column
  private Integer time_length;//课程时长【必填】，单位分钟
  @Column
  private Integer difficulty_degree;//课程难度。1-5星。
  @Column
  private Integer max_students;//授课人数限制。默认1.
  @Column
  private String context;//授课内容，自由填写。不限字数
  @Column
  private String place;//授课地点。40字符
  @Column
  private Integer status;//状态。1：发布。0：关闭。
  @Column
  private Double price;//[必填]发布价格 1~9999
  @Column
  private Long read_count;//被人阅读次数统计
  
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


  public Timestamp getCreate_time() {
    return create_time;
  }


  public void setCreate_time(Timestamp create_time) {
    this.create_time = create_time;
  }


  public Timestamp getModify_time() {
    return modify_time;
  }


  public void setModify_time(Timestamp modify_time) {
    this.modify_time = modify_time;
  }


  public Integer getExercise_mode() {
    return exercise_mode;
  }


  public void setExercise_mode(Integer exercise_mode) {
    this.exercise_mode = exercise_mode;
  }


  public String getTitle() {
    return title;
  }


  public void setTitle(String title) {
    this.title = title;
  }


  public Integer getTime_length() {
    return time_length;
  }


  public void setTime_length(Integer time_length) {
    this.time_length = time_length;
  }


  public Integer getDifficulty_degree() {
    return difficulty_degree;
  }


  public void setDifficulty_degree(Integer difficulty_degree) {
    this.difficulty_degree = difficulty_degree;
  }


  public Integer getMax_students() {
    return max_students;
  }


  public void setMax_students(Integer max_students) {
    this.max_students = max_students;
  }


  public String getContext() {
    return context;
  }


  public void setContext(String context) {
    this.context = context;
  }


  public Double getPrice() {
    return price;
  }


  public void setPrice(Double price) {
    this.price = price;
  }

  public void setId(Long id) {
    this.id = id;
  }


  public String getPlace() {
    return place;
  }


  public void setPlace(String place) {
    this.place = place;
  }


  public Integer getStatus() {
    return status;
  }


  public void setStatus(Integer status) {
    this.status = status;
  }


  public Long getRead_count() {
    return read_count;
  }


  public void setRead_count(Long read_count) {
    this.read_count = read_count;
  }

}
