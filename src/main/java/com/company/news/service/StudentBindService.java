package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.entity.Student;
import com.company.news.entity.StudentBind;
import com.company.news.entity.User;
import com.company.news.jsonform.DoorUserJsonform;
import com.company.news.jsonform.StudentBindJsonform;
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
		
		if(this.isBind(studentBindJsonform.getCardid())){
			responseMessage.setMessage("Cardid已被绑定");
			return false;
		}

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
		
		// Studentuuid昵称验证
		if(this.isBind(doorUserJsonform.getCardid())){
			responseMessage.setMessage("Cardid已被绑定");
			return false;
		}
		
		if(this.isBind(doorUserJsonform.getCardid())){
			responseMessage.setMessage("Cardid已被绑定");
			return false;
		}
		
		StudentBind studentBind =null;
		//根据uuid查询,有数据则只需要绑定卡id即可.
		if (StringUtils.isNotBlank(doorUserJsonform.getUserid())) {
				studentBind=(StudentBind)this.getStudentBindByUseridAndGroup(doorUserJsonform.getUserid(),doorUserJsonform.getGroupuuid());
				if(studentBind!=null){
					studentBind.setCardid(doorUserJsonform.getCardid());
					this.nSimpleHibernateDao.save(studentBind);
					return true;
				}
		}//如何修改卡号.
		
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
				
				 Object maxUserid= this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession().createSQLQuery("select max(userid) from  px_studentbind where groupuuid in(" + DBUtil.stringsToWhereInValue(doorUserJsonform.getGroupuuid()) + ")").uniqueResult();
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
			hql+=" and studentuuid='"+studentuuid+"'";
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
	 * 
	 * @param uuid
	 * @param responseMessage
	 * @return
	 */
	private boolean isBind(String cardid) {
		StudentBind studentBind=(StudentBind) this.nSimpleHibernateDao.getObjectByAttribute(StudentBind.class, "cardid", cardid);
		
		if(studentBind!=null)
			return true;
		
		return false;
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
	public List<Object[]> query(String classuuid, String groupuuid,String uuid) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		String sql = "select b2.studentuuid,b2.cardid,b2.userid,s1.name ";
		sql+=" from px_student s1  left join px_studentbind b2 on  s1.uuid=b2.studentuuid  ";
		sql+=" where b2.cardid is not null ";
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
}
