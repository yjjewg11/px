package com.company.news.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Parent;
import com.company.news.entity.Student;
import com.company.news.entity.StudentContactRealation;
import com.company.news.jsonform.StudentJsonform;
import com.company.news.rest.util.TimeUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.company.web.filter.UserInfoFilter;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class WenjieAdminService extends AbstractService {
	private static final Logger logger = Logger.getLogger(UserInfoFilter.class);

	private static final String model_name = "管理员模块";
	
	@Autowired
	private StudentService studentService;
	/**
	 * 刷新学生与家长关系表
	 * @param responseMessage
	 * @throws Exception
	 */
	public void updateDataRefresh(ResponseMessage responseMessage) throws Exception {
		
		
		

		List<Student> listStudent=(List<Student>)this.nSimpleHibernateDao.getHibernateTemplate().find(
				"from Student ");
		
//		修复学生初始格式bug.
//		Integer count =0;
//		for(Student student:listStudent){
//			
//			String dd=TimeUtils.getDateFormatString(student.getBirthday());
//			if(student.getBirthday()!=null&&student.getBirthday().contains("2015")){
//				logger.info(student.getBirthday()+"==>"+dd);
//				count++;
//				student.setBirthday("");
//				this.nSimpleHibernateDao.save(student);
//			}else if(!dd.equals(student.getBirthday())){
//				logger.info(student.getBirthday()+"==>"+dd);
//				student.setBirthday(dd);
//				this.nSimpleHibernateDao.save(student);
//				count++;
//			}
//			
//			
//		}
//		
//		logger.info("count ="+count);
//		if(true)return;
		//刷新学生和家长关系表.
		for(Student student:listStudent){
			
			
			student.setBa_tel(PxStringUtil.repairCellphone(student.getBa_tel()));
			student.setMa_tel(PxStringUtil.repairCellphone(student.getMa_tel()));
			student.setYe_tel(PxStringUtil.repairCellphone(student.getYe_tel()));
			student.setNai_tel(PxStringUtil.repairCellphone(student.getNai_tel()));
			student.setWaigong_tel(PxStringUtil.repairCellphone(student.getWaigong_tel()));
			student.setOther_tel(PxStringUtil.repairCellphone(student.getOther_tel()));
			student.setWaipo_tel(PxStringUtil.repairCellphone(student.getWaipo_tel()));
			
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().save(student);
			
			studentService.updateAllStudentContactRealationByStudent(student);
//			this.updateStudentContactRealation(student, SystemConstants.USER_type_ba, student.getBa_tel());
//			this.updateStudentContactRealation(student, SystemConstants.USER_type_ma, student.getMa_tel());
//			this.updateStudentContactRealation(student, SystemConstants.USER_type_ye, student.getYe_tel());
//			this.updateStudentContactRealation(student, SystemConstants.USER_type_nai, student.getNai_tel());
//			this.updateStudentContactRealation(student, SystemConstants.USER_type_waigong, student.getWaigong_tel());
//			this.updateStudentContactRealation(student, SystemConstants.USER_type_waipo, student.getWaipo_tel());
//			this.updateStudentContactRealation(student, SystemConstants.USER_type_other, student.getOther_tel());
		}
		
	}
	
	
	
	/**
	 * 获取
	 * @param tel
	 * @param type
	 * @return
	 */
	private StudentContactRealation getStudentContactRealationBy(String student_uuid,Integer type) {
		List<StudentContactRealation> list=(List<StudentContactRealation>) this.nSimpleHibernateDao.getHibernateTemplate().
				find("from StudentContactRealation where student_uuid=? and type=?", student_uuid,type);
		if(list.size()>0){
			return (StudentContactRealation)list.get(0);
		}
		return null;
	}
 
 /**
	 * 保存学生资料时,更新学生关联家长的手机表
		 * 1.根据注册手机,绑定和学生的关联关心.
		 * 2.更新孩子数据时,也会自动绑定学生和家长的数据.
	 * @param tel
	 * @param type
	 * @return
	 */
	private StudentContactRealation updateStudentContactRealation(Student student,Integer type,String tel)  throws Exception {
		if(!CommonsValidate.checkCellphone(tel)){
			return null;
		}
		String student_uuid=student.getUuid();
		StudentContactRealation studentContactRealation= this.getStudentContactRealationBy(student_uuid, type);
		if(studentContactRealation==null){//不存在,则新建.
			if(!CommonsValidate.checkCellphone(tel))return null;
			studentContactRealation=new StudentContactRealation();
		}else{
			//验证失败则,表示删除关联关系.
			if(!CommonsValidate.checkCellphone(tel)){
				nSimpleHibernateDao.delete(studentContactRealation);
				return null;
			}
//			//一样则表示不变,直接返回.
//			if(tel.equals(studentContactRealation.getTel())
//					&&student.getName().equals(studentContactRealation.getStudent_name())){
//				return studentContactRealation;
//			}
		}
		studentContactRealation.setStudent_uuid(student.getUuid());
		studentContactRealation.setStudent_name(student.getName());
		studentContactRealation.setIsreg(SystemConstants.USER_isreg_0);
		studentContactRealation.setGroupuuid(student.getGroupuuid());
		
		studentContactRealation.setTel(tel);
		studentContactRealation.setType(type);
		studentContactRealation.setUpdate_time(TimeUtils.getCurrentTimestamp());
		
		studentContactRealation.setClass_uuid(student.getClassuuid());
		studentContactRealation.setStudent_img(student.getHeadimg());
		
		Parent parent=(Parent)nSimpleHibernateDao.getObjectByAttribute(Parent.class,"loginname", tel);
		//判断电话,是否已经注册,来设置状态.
		if(parent!=null){
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_1);
			studentContactRealation.setParent_uuid(parent.getUuid());			
		}else{
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_0);
		}
		
		
		//1:妈妈,2:爸爸,3:爷爷,4:奶奶,5:外公,6:外婆,7:其他
		switch (type) {
		case 1:
			studentContactRealation.setTypename("妈妈");
			break;
		case 2:
			studentContactRealation.setTypename("爸爸");
			break;
		case 3:
			studentContactRealation.setTypename("爷爷");
			break;
		case 4:
			studentContactRealation.setTypename("奶奶");
			break;
		case 5:
			studentContactRealation.setTypename("外公");
			break;
		case 6:
			studentContactRealation.setTypename("外婆");
			break;
		case 7:
			studentContactRealation.setTypename("其他");
			break;
		default:
			break;
		}
		
		//更新家长姓名和头像.多个孩子已最后保存为准
		if(parent!=null){
			parent.setName(PxStringUtil.getParentNameByStudentContactRealation(studentContactRealation));
			parent.setImg(student.getHeadimg());
			nSimpleHibernateDao.save(parent);
		}
		
		nSimpleHibernateDao.save(studentContactRealation);
		return studentContactRealation;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}
}
