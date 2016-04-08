package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.DbUtils;
import com.company.news.entity.Student;
import com.company.news.entity.StudentBind;
import com.company.news.entity.User;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.json.JSONUtils;
import com.company.news.jsonform.DoorUserJsonform;
import com.company.news.jsonform.StudentBindJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class StudentBindService extends AbstractService {
	private static final String model_name = "学生信息绑定模块";
	
	@Autowired
	private StudentService studentService;
	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(StudentBindJsonform studentBindJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (StringUtils.isBlank(studentBindJsonform.getName())) {
			responseMessage.setMessage("name不能为空！");
			return false;
		}

		// name昵称验证
		if (StringUtils.isBlank(studentBindJsonform.getCardid())) {
			responseMessage.setMessage("Cardid不能为空");
			return false;
		}
		
		// Studentuuid昵称验证
		if (StringUtils.isBlank(studentBindJsonform.getStudentuuid())) {
			responseMessage.setMessage("Studentuuid不能为空");
			return false;
		}
		
//		if(this.isBind(studentBindJsonform.getCardid(),studentBindJsonform.get)){
//			responseMessage.setMessage("Cardid已被绑定");
//			return false;
//		}

		Student student=(Student)this.nSimpleHibernateDao.getObject(Student.class,studentBindJsonform.getStudentuuid() );
		
		if(student==null){
			responseMessage.setMessage("学生不存在!");
			this.logger.warn("学生不存在!uuid="+studentBindJsonform.getStudentuuid());
			return false;
		}
		StudentBind studentBind = new StudentBind();
		

		BeanUtils.copyProperties(studentBind, studentBindJsonform);
		studentBind.setGroupuuid(student.getGroupuuid());
		studentBind.setCreatetime(TimeUtils.getCurrentTimestamp());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(studentBind);

		return true;
	}
	
	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean addByAutoDrinput(DoorUserJsonform doorUserJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证

		// name昵称验证
		if (StringUtils.isBlank(doorUserJsonform.getCardid())) {
			responseMessage.setMessage("Cardid不能为空");
			return false;
		}
//		Transaction  transaction =this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession().beginTransaction();
		//carid允许修改为绑定其他用户,则个设置以前的cardid=null
		String updateDelHql="update StudentBind set cardid=null where groupuuid=? and cardid=? and userid!=?";
		Integer relcount=this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(updateDelHql, doorUserJsonform.getGroupuuid(),doorUserJsonform.getCardid(),doorUserJsonform.getUserid());
		if(relcount>0){
			this.logger.warn(relcount+ ": remove studentBind cardid=null, "+JSONUtils.getJsonString(doorUserJsonform));
		}
		
		//绑定卡号
		String updateHql="update StudentBind set cardid=? where groupuuid=? and userid=?";
		relcount=this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(updateHql,doorUserJsonform.getCardid(), doorUserJsonform.getGroupuuid(),doorUserJsonform.getUserid());
//		this.logger.error("updateHql,relcount:"+relcount);
//		transaction.commit();
		if(relcount>0){
			return true;
		}
		//如果没找到根据身份证id更新.
		// Studentuuid昵称验证
		StudentBind studentBind =null;
		//根据uuid查询,有数据则只需要绑定卡id即可.
//		if (StringUtils.isNotBlank(doorUserJsonform.getUserid())) {
//				studentBind=(StudentBind)this.getStudentBindByUseridAndGroup(doorUserJsonform.getUserid(),doorUserJsonform.getGroupuuid());
//				if(studentBind!=null){
//					studentBind.setCardid(doorUserJsonform.getCardid());
//					this.nSimpleHibernateDao.save(studentBind);
//					return true;
//				}
//		}
//		
//		if(studentBind==null){
//			responseMessage.setMessage("用户id没有找到="+doorUserJsonform.getUserid());
//			return false;
//		}
//		
		//如何修改卡号.
		if(StringUtils.isBlank(doorUserJsonform.getIdNo())){
			responseMessage.setMessage("匹配失败!");
			return false;
		}
		Student s = this.studentService.getStudentByIdNoAndGroup(
				doorUserJsonform.getIdNo(), doorUserJsonform.getGroupuuid());
		
		if (s == null) {
			responseMessage.setMessage("idno:" + doorUserJsonform.getIdNo()
					+ ",未匹配到对应的账号,不需要绑定！");
		}else{
			studentBind=new StudentBind();
			if (StringUtils.isNotBlank(doorUserJsonform.getUserid())) {
				studentBind.setUserid(doorUserJsonform.getUserid());
			}else{
				
				 Object maxUserid= this.getMax_userid(doorUserJsonform.getGroupuuid());
				 //this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession().createSQLQuery("select max(userid) from  px_studentbind where groupuuid in(" + DBUtil.stringsToWhereInValue(doorUserJsonform.getGroupuuid()) + ")").uniqueResult();
				 Long startUserid=0l;
				 try {
					 startUserid=Long.valueOf(maxUserid+"");
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				studentBind.setUserid(startUserid+"");
			}
			
			studentBind.setCardid(doorUserJsonform.getCardid());
			studentBind.setCreate_user("system");// 系统自动绑定
			studentBind.setCreate_useruuid("system");// 系统自动绑定
			studentBind.setName(doorUserJsonform.getUserName());
			studentBind.setStudentuuid(s.getUuid());
			studentBind.setGroupuuid(doorUserJsonform.getGroupuuid());
			studentBind.setCreatetime(TimeUtils.getCurrentTimestamp());
			this.nSimpleHibernateDao.save(studentBind);
		responseMessage.setMessage("idno:" + doorUserJsonform.getIdNo()
				+ ",绑定成功！");
		}
		return true;
	}
	
	
	/**
	 * 根据用户标识和学校uuid.
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public StudentBind getStudentBindBycardidAndGroup(String cardid, String groupuuid) {

		List<StudentBind> list = (List<StudentBind>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from StudentBind  where cardid=? and groupuuid=?)", cardid, groupuuid);
		if (list != null && list.size() > 0)
		{
			return list.get(0);
		}
		else
			return null;
	}
	/**
	 * 根据用户标识和学校uuid.
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public StudentBind getStudentBindByUseridAndGroup(String userid, String groupuuid) {

		List<StudentBind> list = (List<StudentBind>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from StudentBind  where userid=? and groupuuid=?)", userid, groupuuid);
		if (list != null && list.size() > 0)
		{
			return list.get(0);
		}
		else
			return null;
	}

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(StudentBindJsonform studentBindJsonform,
			ResponseMessage responseMessage) throws Exception {
		// TEL格式验证
		if (StringUtils.isBlank(studentBindJsonform.getName())) {
			responseMessage.setMessage("name不能为空！");
			return false;
		}
				
		StudentBind studentBind = (StudentBind) this.nSimpleHibernateDao.getObjectById(
				StudentBind.class, studentBindJsonform.getUuid());
		
		
		if (studentBind != null) {
			studentBind.setName(studentBindJsonform.getName());
			studentBind.setNote(studentBindJsonform.getNote());

			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().update(studentBind);

			return true;
		} else {
			responseMessage.setMessage("更新记录不存在");
			return false;

		}
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

	/**
	 * 查询所有机构列表
	 * 
	 * @return
	 */
	public List<StudentBind> query(String studentuuid) {
		String hql="from StudentBind where 1=1";
		
		// Group_uuid昵称验证
		if (StringUtils.isNotBlank(studentuuid)) {
			hql+=" and studentuuid='"+DbUtils.safeToWhereString(studentuuid)+"'";
		}
		
		hql+=" order by createtime";
		
		return (List<StudentBind>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);
	}
	

	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public StudentBind get(String uuid)throws Exception{
		return (StudentBind) this.nSimpleHibernateDao.getObjectById(StudentBind.class, uuid);
	}
	

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean delete(String uuid, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}

		if (uuid.indexOf(",") != -1)// 多ID
		{
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from StudentBind where uuid in(?)", uuid);

		} else {
			this.nSimpleHibernateDao.deleteObjectById(StudentBind.class, uuid);

		}

		return true;
	}
	
	
	/**
	 * 根据用户编码
	 * @param uuid
	 * @param responseMessage
	 * @return
	 */
	private StudentBind getStudentBindBy(String cardid, String groupuuid) {

			List<StudentBind> list = (List<StudentBind>) this.nSimpleHibernateDao.getHibernateTemplate()
					.find("from StudentBind  where cardid=? and groupuuid=? order by createtime desc )", cardid, groupuuid);
			if (list != null && list.size() > 0)
			{
				 return list.get(0);
			}
			else
				return null;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

	
	/**
	 * 查询学生绑定卡号信息.
	 * @param classuuid
	 * @param groupuuid
	 * @param uuid
	 * @return
	 */
	public PageQueryResult queryForStudents(String classuuid, String groupuuid,String uuid,String cardid,String otherWhere,PaginationData pData) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String select_sql="select b2.studentuuid,b2.cardid,b2.userid,s1.name,b2.create_user,b2.createtime,s1.classuuid ";
		String sql = "";
		sql+=" from px_student s1  left join px_studentbind b2 on  s1.uuid=b2.studentuuid  ";
	//	sql+=" where b2.cardid is not null ";
		sql+=" where  s1.status=0 and b2.userid is not null and   b2.type="+SystemConstants.StudentBind_type_1;
		if (StringUtils.isNotBlank(groupuuid))
			sql += " and   s1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  s1.classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		if (StringUtils.isNotBlank(uuid))
			sql += " and  s1.uuid in(" + DBUtil.stringsToWhereInValue(uuid) + ")";
		if (StringUtils.isNotBlank(cardid)){
			if(StringUtils.isNumeric(cardid)){
				sql += " and  b2.cardid like '%"+cardid+"%'";
			}else{
				sql += " and  s1.name like '%"+DbUtils.safeToWhereString(cardid)+"%'";
			}
			
		}
		
		if ("cardid_is_null".equals(otherWhere))
			sql += " and  b2.cardid is null ";
		else if ("cardid_is_not_null".equals(otherWhere))
			sql += " and  b2.cardid is not null ";
		
		sql += "order by s1.classuuid, CONVERT( s1.name USING gbk)";
		PageQueryResult pageQueryResult=this.nSimpleHibernateDao.findByPageForSqlTotal(select_sql,sql, pData);
		
		return pageQueryResult;
	}

	/**
	 * 查询学生绑定卡号信息.
	 * @param classuuid
	 * @param groupuuid
	 * @param uuid
	 * @return
	 */
	public PageQueryResult queryForTeacher(String groupuuid,String uuid,String cardid,String otherWhere,PaginationData pData) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		String select_sql="select b2.studentuuid,b2.cardid,b2.userid,b2.name,b2.create_user,b2.createtime,s1.tel ";
		String sql = "";
		sql+=" from px_studentbind b2 left join  px_user s1  on  s1.uuid=b2.studentuuid  ";
		sql+=" where  b2.userid is not null and   b2.type="+SystemConstants.StudentBind_type_0;
		if (StringUtils.isNotBlank(groupuuid))
			sql += " and   b2.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		
		if (StringUtils.isNotBlank(uuid))
			sql += " and  s1.uuid in(" + DBUtil.stringsToWhereInValue(uuid) + ")";
		if (StringUtils.isNotBlank(cardid)){
			if(StringUtils.isNumeric(cardid)){
				sql += " and  b2.cardid like '%"+cardid+"%'";
			}else{
				sql += " and  b2.name like '%"+DbUtils.safeToWhereString(cardid)+"%'";
			}
			
		}
		
		if ("cardid_is_null".equals(otherWhere))
			sql += " and  b2.cardid is null ";
		else if ("cardid_is_not_null".equals(otherWhere))
			sql += " and  b2.cardid is not null ";
		
		sql += "order by CONVERT( b2.name USING gbk)";
		PageQueryResult pageQueryResult=this.nSimpleHibernateDao.findByPageForSqlTotal(select_sql,sql, pData);
		
		return pageQueryResult;
	}

	/**
	 * 查询学生绑定卡号信息.
	 * @param classuuid
	 * @param groupuuid
	 * @param uuid
	 * @return
	 */
	public List<Object[]> queryByClass(String classuuid, String groupuuid,String uuid) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		String sql = "select b2.studentuuid,b2.cardid,b2.userid,s1.name ";
		sql+=" from px_student s1  left join px_studentbind b2 on  s1.uuid=b2.studentuuid  ";
	//	sql+=" where b2.cardid is not null ";
		sql+=" where userid is not null ";
		if (StringUtils.isNotBlank(groupuuid))
			sql += " and   s1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  s1.classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		if (StringUtils.isNotBlank(uuid))
			sql += " and  s1.uuid in(" + DBUtil.stringsToWhereInValue(uuid) + ")";
		
		sql += "order by s1.classuuid";
		
		//student_uuid,cardid,userid,student_name
		List<Object[]> list = s.createSQLQuery(sql).list();
		
		return list;
	}

	
	/**
	 * 生成学生接送卡的唯一用户标识(userid在每个学校唯一)
	 * @param studentuuid
	 * @return
	 */
	public Long getMax_userid(String groupuuid) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		// max(  CONVERT(userid,SIGNED )) 修复字符串超过1000,max 不正确bug.
		 Object maxUserid= s.createSQLQuery("select  max(  CONVERT(userid,SIGNED ))  from  px_studentbind where groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")").uniqueResult();
			//从100开始.防止100内,留自定义
		 Long startUserid=100l;
		 try {
			 startUserid=Long.valueOf(maxUserid+"");
		} catch (Exception e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
		}
			 
			 return startUserid;
	}
	/**
	 * 声请学生接送卡
	 * @param studentuuid
	 * @return
	 * @throws Exception 
	 */
	public StudentBind update_apply(String studentuuid, ResponseMessage responseMessage,SessionUserInfoInterface user) throws Exception {
		
		Student student = (Student) this.nSimpleHibernateDao.getObjectById(Student.class, studentuuid);
		if (student == null){
			responseMessage.setMessage("没有该学生 ,uuid="+studentuuid);
			return null;
		}
		StudentBind b2=new StudentBind();
		
		b2.setStudentuuid(studentuuid);
		if(StringUtils.isBlank(b2.getStudentuuid())){
			throw new Exception("学生uuid不能为空");
		}
		Long startUserid=this.getMax_userid(student.getGroupuuid());
		b2.setUserid((++startUserid)+"");
		b2.setCard_factory(null);
		b2.setCreate_user(user.getName());
		b2.setCreate_useruuid(user.getUuid());
		b2.setGroupuuid(student.getGroupuuid());
		b2.setName(student.getName());
		b2.setCreatetime(TimeUtils.getCurrentTimestamp());
		b2.setType(1);//学生卡
		try {
			this.nSimpleHibernateDao.save(b2);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage("申请用户编号:"+startUserid+"冲突,请再次申请.");
			return null;
		}
		return b2;
	}
	
	
	/**
	 * 声请学生接送卡
	 * @param studentuuid
	 * @return
	 * @throws Exception 
	 */
	public boolean cancel_apply(String studentuuid,String userid, ResponseMessage responseMessage,SessionUserInfoInterface user) throws Exception {
		
		//只允许删除没有绑定卡号的.
		String hql="delete StudentBind where cardid is  null and studentuuid=? and userid=?";
		Integer count= this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(hql, studentuuid,userid);
		if (count==0){
			responseMessage.setMessage("操作失败,没有该记录.");
			return false;
		}
		
		return true;
	}
}
