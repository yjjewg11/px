package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.entity.PClass;
import com.company.news.entity.Parent;
import com.company.news.entity.ParentStudentRelation;
import com.company.news.entity.Student;
import com.company.news.entity.StudentContactRealation;
import com.company.news.entity.TelSmsCode;
import com.company.news.entity.User;
import com.company.news.jsonform.StudentJsonform;
import com.company.news.rest.util.TimeUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class StudentService extends AbstractServcice {

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(StudentJsonform studentJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (StringUtils.isBlank(studentJsonform.getName())) {
			responseMessage.setMessage("name不能为空！");
			return false;
		}

		// name昵称验证
		if (StringUtils.isBlank(studentJsonform.getClassuuid())) {
			responseMessage.setMessage("Classuuid不能为空");
			return false;
		}
		
		PClass pClass=(PClass) this.nSimpleHibernateDao.getObjectById(PClass.class, studentJsonform.getClassuuid());
		//班级不存在
		if(pClass==null){
			responseMessage.setMessage("班级不存在");
			return false;
		}


		Student student = new Student();

		BeanUtils.copyProperties(student, studentJsonform);
		student.setCreate_time(TimeUtils.getCurrentTimestamp());
		student.setGroupuuid(pClass.getGroupuuid());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(student);

		//添加学生关联联系人表
		this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_ba, student.getBa_tel());
		this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_ma, student.getMa_tel());
		this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_ye, student.getYe_tel());
		this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_nai, student.getNai_tel());
		this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_waigong, student.getWaigong_tel());
		this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_waipo, student.getWaipo_tel());
		this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_other, student.getOther_tel());
		
		return true;
	}

	/**
	 * 修改
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(StudentJsonform studentJsonform,
			ResponseMessage responseMessage) throws Exception {

		Student student = (Student) this.nSimpleHibernateDao.getObjectById(
				Student.class, studentJsonform.getUuid());
		
		Student old_student=new Student();
		ConvertUtils.register(new DateConverter(null), java.util.Date.class); 
		BeanUtils.copyProperties(old_student, student);
		
		if (student != null) {
			BeanUtils.copyProperties(student, studentJsonform);
			//设置不能被修改的字段
			student.setUuid(old_student.getUuid());
//			student.setName(old_student.getName());
//			student.setClassuuid(old_student.getClassuuid());
//			student.setGroupuuid(old_student.getGroupuuid());
			student.setCreate_time(old_student.getCreate_time());

			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().update(student);

			
			this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_ba, student.getBa_tel());
			this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_ma, student.getMa_tel());
			this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_ye, student.getYe_tel());
			this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_nai, student.getNai_tel());
			this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_waigong, student.getWaigong_tel());
			this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_waipo, student.getWaipo_tel());
			this.updateStudentContactRealation(student.getUuid(), SystemConstants.USER_type_other, student.getOther_tel());
			
			
			return true;
		} else {
			responseMessage.setMessage("更新记录不存在");
			return false;

		}
	}
	
	/**
	 * 保存学生资料时,更新学生关联家长的手机表
		 * 1.根据注册手机,绑定和学生的关联关心.
		 * 2.更新孩子数据时,也会自动绑定学生和家长的数据.
	 * @param tel
	 * @param type
	 * @return
	 */
	public StudentContactRealation updateStudentContactRealation(String student_uuid,Integer type,String tel)  throws Exception {
		if(!CommonsValidate.checkCellphone(tel)){
			return null;
		}
		StudentContactRealation studentContactRealation= this.getStudentContactRealationBy(student_uuid, type);
		if(studentContactRealation==null){//不存在,则新建.
			if(!CommonsValidate.checkCellphone(tel))return null;
			studentContactRealation=new StudentContactRealation();
			studentContactRealation.setStudent_uuid(student_uuid);
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_0);
			studentContactRealation.setTel(tel);
			studentContactRealation.setType(type);
			studentContactRealation.setUpdate_time(TimeUtils.getCurrentTimestamp());
			
			
		}else{
			//验证失败则,表示删除关联关系.
			if(!CommonsValidate.checkCellphone(tel)){
				nSimpleHibernateDao.delete(studentContactRealation);
				return null;
			}
			//一样则表示不变,直接返回.
			if(tel.equals(studentContactRealation.getTel())){
				return studentContactRealation;
			}else{
				// 删除原来
				this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
						"delete from ParentStudentRelation where studentuuid=? and type=?",
						student_uuid, type);
			}
			
			studentContactRealation.setTel(tel);
		}
		
		Parent parent=(Parent)nSimpleHibernateDao.getObjectByAttribute(Parent.class,"loginname", tel);
		//判断电话,是否已经注册,来设置状态.
		if(parent!=null){
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_1);
			{
				// 保存家长-学生关联表
				ParentStudentRelation parentStudentRelation = new ParentStudentRelation();
				parentStudentRelation.setParentuuid(parent.getUuid());
				parentStudentRelation.setStudentuuid(student_uuid);
				parentStudentRelation.setType(type);
				// 有事务管理，统一在Controller调用时处理异常
				this.nSimpleHibernateDao.getHibernateTemplate().save(
						parentStudentRelation);
			}
			
		}else{
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_0);
		}
		
		nSimpleHibernateDao.save(studentContactRealation);
		return studentContactRealation;
	}
	/**
	 * 获取
	 * @param tel
	 * @param type
	 * @return
	 */
	public StudentContactRealation getStudentContactRealationBy(String student_uuid,Integer type) {
		List<StudentContactRealation> list=(List<StudentContactRealation>) this.nSimpleHibernateDao.getHibernateTemplate().
				find("from StudentContactRealation where student_uuid=? and type=?", student_uuid,type);
		if(list.size()>0){
			return (StudentContactRealation)list.get(0);
		}
		return null;
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
	public List<Student> query(String classuuid,String groupuuid) {
		String hql="from Student where 1=1";
		
		// Group_uuid昵称验证
		if (StringUtils.isNotBlank(classuuid)) {
			hql+=" and classuuid='"+classuuid+"'";
		}
		
		if (StringUtils.isNotBlank(groupuuid)) {
			hql+=" and groupuuid='"+groupuuid+"'";
		}		
		
		return (List<Student>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);
	}
	
	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public Student get(String uuid)throws Exception{
		return (Student) this.nSimpleHibernateDao.getObjectById(Student.class, uuid);
	}

}
