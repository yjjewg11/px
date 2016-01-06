package com.company.news.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.ezmorph.bean.MorphDynaBean;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.entity.SnsTopic;
import com.company.news.entity.SnsTopicVoteItem;
import com.company.news.entity.SnsTopicVoteItemOfUpdate;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.right.RightConstants;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * 投票模块
 * @author Administrator
 * 
 */
@Service
public class SnsTopicVoteItemService extends AbstractService {
	private static final String model_name = "基础数据类型模块";
	
	

	/**
	 * 更新条目(保存话题时,被调用).
	 * 删除单独调用接口.delete
	 * @param topic_uuid
	 * @param list
	 * @throws Exception
	 */
	public void update_SnsTopicVoteItem(String topic_uuid,List<MorphDynaBean> list) throws Exception{
		
		
		Integer index=0;
		for(MorphDynaBean  m:list){
			index++;
			String uuid=(String)m.get("uuid");
			if(StringUtils.isNotBlank(uuid)){
				SnsTopicVoteItemOfUpdate item=(SnsTopicVoteItemOfUpdate)this.nSimpleHibernateDao.getObject(SnsTopicVoteItemOfUpdate.class, uuid);
				if(item!=null){
					item.setTitle(m.get("title")+"");
					item.setTopic_uuid(topic_uuid);
					String ind=(String)m.get("ind");
				
					if(StringUtils.isNumeric(ind)){
						try {
							index=Integer.valueOf(ind);
						} catch (NumberFormatException e) {
						}
					}
					item.setInd(index);
					this.nSimpleHibernateDao.save(item);
					
					uuid=null;
					continue;
				}else{
					//如果数据库没找到,则认为新加
					uuid=null;
				}
			}
			
			if(StringUtils.isBlank(uuid)){
				SnsTopicVoteItem item=new SnsTopicVoteItem();
				item.setTitle(m.get("title")+"");
				item.setTopic_uuid(topic_uuid);
				String ind=(String)m.get("ind");
			
				if(StringUtils.isNumeric(ind)){
					try {
						index=Integer.valueOf(ind);
					} catch (NumberFormatException e) {
					}
				}
				item.setInd(index);
				this.nSimpleHibernateDao.save(item);
			}
		}
	}
	
	public boolean delete(String uuid, ResponseMessage responseMessage,HttpServletRequest request) {
		
		if (StringUtils.isBlank(uuid)) {
			responseMessage.setMessage("ID不能为空！");
			return false;
		}
		SnsTopicVoteItem item = (SnsTopicVoteItem) this.nSimpleHibernateDao
				.getObjectById(SnsTopicVoteItem.class,
						uuid);
		//判断话题是否是本人创建.
		SnsTopic newEntity = (SnsTopic) this.nSimpleHibernateDao
				.getObjectById(SnsTopic.class,
						item.getTopic_uuid());
		
		SessionUserInfoInterface user = SessionListener.getUserInfoBySession(request);
		if(!user.getUuid().equals(newEntity.getCreate_useruuid())){
			responseMessage.setMessage(RightConstants.Return_msg);
			return false;
		}
		
		this.nSimpleHibernateDao.deleteObjectById(SnsTopicVoteItem.class, uuid);

		//删除该条记录已经投票的数据关联用户,允许重新投票
		String insertsql="delete from sns_topic_voteitem_user where topic_uuid='"+item.getTopic_uuid()+"' and item_uuid='"+uuid+"'";
		 this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).executeUpdate();
		return true;
	}

	/**
	 * 用户条目投票操作
	 * @param snsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public boolean updateVote(String topic_uuid,String item_uuid,String user_uuid ,ResponseMessage responseMessage) {
		if (StringUtils.isBlank(topic_uuid)) {
			responseMessage.setMessage("话题(topic_uuid)不能为空！");
			return false;
		}
		if (StringUtils.isBlank(item_uuid)) {
			responseMessage.setMessage("话题投票条目(item_uuid)不能为空！");
			return false;
		}
		if (StringUtils.isBlank(user_uuid)) {
			responseMessage.setMessage("user_uuid不能为空！");
			return false;
		}
		topic_uuid=DbUtils.safeToWhereString(topic_uuid);
		item_uuid=DbUtils.safeToWhereString(item_uuid);
		user_uuid=DbUtils.safeToWhereString(user_uuid);
		
		String insertsql="insert into sns_topic_voteitem_user(topic_uuid,item_uuid,user_uuid) values('"+topic_uuid+"','"+item_uuid+"',"+user_uuid+")";
		try {
			int flag=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).executeUpdate();
			String sql="update sns_topic_vote_item set vote_count=vote_count+1 where uuid='"+item_uuid+"'";
			
			Integer rel=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
			if(rel==0){
				responseMessage.setMessage("异常数据,投票项不存在.item_uuid="+item_uuid);
				return false;
			}
		} catch (org.hibernate.exception.ConstraintViolationException e) {
			responseMessage.setMessage("你已过投票!");
			return false;
		}

		return true;
	}

	

	/**
	 * 取消
	 * @param rel_uuid
	 * @param user_uuid
	 * @return
	 */
	public Integer cancelVote(String topic_uuid,String user_uuid ,ResponseMessage responseMessage) {
		
		
		if (StringUtils.isBlank(topic_uuid)) {
			responseMessage.setMessage("topic_uuid不能为空！");
			return null;
		}
		if (StringUtils.isBlank(user_uuid)) {
			responseMessage.setMessage("user_uuid不能为空！");
			return null;
		}
		
		topic_uuid=DbUtils.safeToWhereString(topic_uuid);
		user_uuid=DbUtils.safeToWhereString(user_uuid);
		
		String insertsql="delete from sns_topic_voteitem_user where topic_uuid='"+topic_uuid+"' and user_uuid='"+user_uuid+"'";
		return this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).executeUpdate();
	}
	/**
	 * 获取投票的条目,null表示没投过.
	 * @param snsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public Object getVoteItemUuid(String topic_uuid,SessionUserInfoInterface user) throws Exception {
		if (StringUtils.isBlank(topic_uuid)) {
			return null;
		}
		if (user==null) {
			return null;
		}
		String insertsql="select item_uuid from sns_topic_voteitem_user where topic_uuid='"+DbUtils.safeToWhereString(topic_uuid)+"' and user_uuid='"+user.getUuid()+"'";
		Object status=this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertsql).uniqueResult();
		return status;
	}
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return null;
	}

}
