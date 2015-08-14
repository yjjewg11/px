package com.company.news.service;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.company.news.dao.NSimpleHibernateDao;

public abstract class AbstractServcice {
  public static final String ID_SPLIT_MARK = ",";
  protected static Logger logger = Logger.getLogger(AbstractServcice.class);
  @Autowired
  @Qualifier("NSimpleHibernateDao")
  protected NSimpleHibernateDao nSimpleHibernateDao;
  /**
   * 数据库实体
   * @return
   */
  public abstract Class getEntityClass();
  

}
