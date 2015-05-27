package com.company.news.service;

import java.util.Collection;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.commons.util.DbUtils;
import com.company.news.entity.TimeScheduleRelation;
import com.company.news.entity.User;
import com.company.news.jsonform.TimeScheduleRelationJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.query.TimeScheduleRelationSearchContion;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.RestUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 用户的时段设置。 用法一：关联课程。课程1对多个时段 用法二：教练可授课时间段
 * 
 */
@Service
public class TimeScheduleRelationService extends AbstractServcice {


  /**
   * 保存
   * 
   * @param bodyJson
   * @param model
   * @param request
   * @return
   * @throws Exception
   */
  public ModelMap save(String bodyJson, ModelMap model, HttpServletRequest request)
      throws Exception {

    User userInfo = SessionListener.getUserInfoBySession(request);
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);

    Collection<TimeScheduleRelationJsonform> scheduleRelateion =
        this.bodyJsonToObjectCollection(bodyJson, TimeScheduleRelationJsonform.class);
    for (TimeScheduleRelationJsonform form : scheduleRelateion) {
      // form =
      // (TimeScheduleRelationJsonform) this.bodyJsonToFormObject(bodyJson,
      // TimeScheduleRelationJsonform.class);
      // 验证
      if (form.getRelation_id() == null) {
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("属性 relation_id 不能为空");
        return model;

      }
      if (form.getType() == null) {
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("属性 type 不能为空");
        return model;
      }
      if (StringUtils.isBlank(form.getStart_time())) {
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("属性 Start_time 不能为空");
        return model;

      }
      if (StringUtils.isBlank(form.getEnd_time())) {
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage("属性 End_time 不能为空");
        return model;

      }
      // 保存
      TimeScheduleRelation dbobj = (TimeScheduleRelation) this.getEntityClass().newInstance();
      // Properties properties = (Properties) this.bodyJsonToProperties(bodyJson);
      // RestUtil.copyNotEmptyValueToobj(properties, form, dbobj);
      BeanUtils.copyProperties(form, dbobj);
      if (Long.valueOf(0).equals(dbobj.getId())) {
        dbobj.setId(null);
      }
      if (dbobj.getId() == null) {// 新建
        dbobj.setCreate_time(TimeUtils.getCurrentTimestamp());
        dbobj.setCreate_userid(userInfo.getId());
        this.nSimpleHibernateDao.save(dbobj);
      } else {
        TimeScheduleRelation entityDB =
            (TimeScheduleRelation) this.nSimpleHibernateDao.getObject(this.getEntityClass(), dbobj
                .getId());
        if (entityDB == null) {
          responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
          responseMessage.setMessage("数据不存在！");
          return model;
        }

        if (!userInfo.getId().equals(entityDB.getCreate_userid())) {
          responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
          responseMessage.setMessage("不是创建人，没有修改权限！");
          return model;
        }
        // this.nSimpleHibernateDao.getHibernateTemplate().evict(entityDB);
        BeanUtils.copyProperties(form, entityDB);
        // RestUtil.copyNotEmptyValueToobj(properties, form, entityDB);

        this.nSimpleHibernateDao.getHibernateTemplate().update(entityDB);
      }
    }
    return model;
  }

  /**
   * 保存
   * 
   * @param uuid
   * @param model
   * @param request
   * @return
   * @throws Exception
   */
  public ModelMap get(String uuid, ModelMap model, HttpServletRequest request) throws Exception {
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    if (StringUtils.isBlank(uuid)) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("uuid参数不合法");
      return model;
    }
    Object o = this.nSimpleHibernateDao.getObject(this.getEntityClass(), Long.valueOf(uuid));
    if (o == null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("数据不存在！");
      return model;
    }
    model.addAttribute(RestConstants.Return_G_entity, o);
    return model;
  }



  public ModelMap index(TimeScheduleRelationSearchContion sc, ModelMap model,
      HttpServletRequest request) {
    model.clear();
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);

    if (StringUtils.isEmpty(sc.getType())) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("查询条件 type 不能未空");
      return model;
    }
    if (sc.getRelation_id() == null) {
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage("查询条件 Relation_id 不能未空");
      return model;
    }
    User userInfo = SessionListener.getUserInfoBySession(request);
    // String hql="from " + this.getEntityClass().getName() +
    // " where  create_userid =  "+userInfo.getId();
    String hql = "from " + this.getEntityClass().getName();

    StringBuffer sb = new StringBuffer();
    if (StringUtils.isNotEmpty(sc.getStartTime())) {
      sb.append(" and create_time >= ").append(DbUtils.stringToDateByDBType(sc.getStartTime()));
    }

    if (StringUtils.isNotEmpty(sc.getType())) {
      sb.append(" and type = ").append(sc.getType());
    }
    if (sc.getRelation_id() != null) {
      sb.append(" and relation_id = ").append(sc.getRelation_id());
    }


    //
    // if ("my".equals(sc.getType())) {// 查询我的
    // sb.append(" and create_userid = ").append(userInfo.getId());
    // } else if ("queryPublish".equals(sc.getType())) {// 查询发布的
    // sb.append(" and status = 1");
    // }

    PaginationData pData = sc.getPsoData();
    pData.setOrderFiled("start_time");
    pData.setOrderType("asc");

    if (sb.length() > 0) {
      // 去掉第一个的“ and”共4个字符。
      hql += " where " + sb.toString().substring(4);
    }
    pData.setPageSize(9999);
    PageQueryResult pageQueryResult = nSimpleHibernateDao.findByPaginationToHql(hql, pData);


    model.addAttribute(RestConstants.Return_PAGENO, pageQueryResult.getPageNo());
    model.addAttribute(RestConstants.Return_PAGESIZE, pageQueryResult.getPageSize());
    model.addAttribute(RestConstants.Return_TotalCount, pageQueryResult.getTotalCount());
    model.addAttribute(RestConstants.Return_G_entity, pageQueryResult.getData());



    return model;
  }



  @Override
  public Class getEntityClass() {
    // TODO Auto-generated method stub
    return TimeScheduleRelation.class;
  }



  /**
   * 
   * 
   * @param ids
   * @param request
   * @param model
   * @return
   */
  public ModelMap delete(String ids, HttpServletRequest request, ModelMap model) {
    // TODO Auto-generated method stub
    String[] _idstrs = ids.split(ID_SPLIT_MARK);
    ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
    User userInfo = SessionListener.getUserInfoBySession(request);
    for (String idstr : _idstrs) {
      if (!"".equals(idstr) && null != idstr) {
        TimeScheduleRelation entityDB =
            (TimeScheduleRelation) this.nSimpleHibernateDao.getObjectById(getEntityClass(), Long
                .valueOf(idstr));
        if (entityDB != null) {
          responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
          responseMessage.setMessage("数据不存在！");
          return model;
        }
        if (entityDB != null) {
          if (!userInfo.getId().equals(entityDB.getCreate_userid())) {
            responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
            responseMessage.setMessage("不是创建人，不能删除！");
            return model;
          }

          this.nSimpleHibernateDao.delete(entityDB);
        }
      }
    }

    return model;
  }

}
