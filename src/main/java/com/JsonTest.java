package com;

import com.company.news.json.JSONUtils;
import com.company.news.jsonform.TrainingPlanJsonform;
import com.company.news.jsonform.UserRegJsonform;
import com.sobey.tp.utils.TimeUtils;
import java.beans.PropertyDescriptor;

public class JsonTest {

  /**
   * @param args
   */
  public static void main(String[] args) {
    UserRegJsonform user=new UserRegJsonform();
   // user.setEmail("test1@163.com");
    user.setLoginname("13628037994");
    user.setPassword("1");
  //  user.setTel("13628037994");
    user.setSex(0);
    user.setTel_smscode("4567");
    System.out.println(JSONUtils.getJsonString(user));
    
    
    TrainingPlanJsonform form =new TrainingPlanJsonform();
    form.setExercise_mode(1);
    form.setEnd_time(TimeUtils.getCurrentTimestamp());
    form.setMap_coordinates("116.307629,40.058359");
    form.setPlace("东郊记忆");
    form.setRun_times(30);
    form.setPrice(50.2);
    form.setRunKM(20);
form.setStart_time(TimeUtils.getCurrentTimestamp());
    System.out.println(JSONUtils.getJsonString(form));

  }

}
