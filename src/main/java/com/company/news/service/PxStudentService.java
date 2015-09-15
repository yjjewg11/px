package com.company.news.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.PClass;
import com.company.news.entity.PXClass;
import com.company.news.entity.PXStudent;
import com.company.news.entity.PXStudentPXClassRelation;
import com.company.news.entity.Student;
import com.company.news.jsonform.PxStudentJsonform;
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
public class PxStudentService extends AbstractStudentService {
	private static final String model_name = "培训结构学生模块";
	@Autowired
	private UserinfoService userinfoService;

	/**
	 * @throws Exception 
	 * 
	 */
	private void addStudentClassRelation(String student_uuid,String class_uuid) throws Exception{
		PXStudentPXClassRelation pp=new PXStudentPXClassRelation();
		pp.setClass_uuid(class_uuid);
		pp.setStudent_uuid(student_uuid);
		this.nSimpleHibernateDao.save(pp);		
	}
	
	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(PxStudentJsonform pxstudentJsonform, ResponseMessage responseMessage) throws Exception {

		if(this.validateRequireAndLengthByRegJsonform(pxstudentJsonform.getName(), 32, "姓名", responseMessage)
				||this.validateRequireByRegJsonform(pxstudentJsonform.getClassuuid(), "班级", responseMessage))
			return false;

		PXClass pXClass = (PXClass) this.nSimpleHibernateDao.getObjectById(PXClass.class, pxstudentJsonform.getClassuuid());
		// 班级不存在
		if (pXClass == null) {
			responseMessage.setMessage("班级不存在");
			return false;
		}

		pxstudentJsonform.setHeadimg(PxStringUtil.imgUrlToUuid(pxstudentJsonform.getHeadimg()));
		PXStudent pxStudent = new PXStudent();

		BeanUtils.copyProperties(pxStudent, pxstudentJsonform);

		// 格式纠正
		pxStudent.setBirthday(TimeUtils.getDateFormatString(pxStudent.getBirthday()));

		pxStudent.setCreate_time(TimeUtils.getCurrentTimestamp());
		pxStudent.setGroupuuid(pXClass.getGroupuuid());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(pxStudent);
		
		//保存关联班级
		this.addStudentClassRelation(pxStudent.getUuid(), pXClass.getUuid());

        this.updateAllStudentContactRealationByStudent(pxStudent);
		
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
	public boolean update(PxStudentJsonform pxstudentJsonform, ResponseMessage responseMessage) throws Exception {

		PXStudent pxStudent = (PXStudent) this.nSimpleHibernateDao.getObjectById(PXStudent.class, pxstudentJsonform.getUuid());

		PXStudent old_student = new PXStudent();
		ConvertUtils.register(new DateConverter(null), java.util.Date.class);
		BeanUtils.copyProperties(old_student, pxStudent);
		pxstudentJsonform.setHeadimg(PxStringUtil.imgUrlToUuid(pxstudentJsonform.getHeadimg()));
		if (pxStudent != null) {
			BeanUtils.copyProperties(pxStudent, pxstudentJsonform);
			// 设置不能被修改的字段
			pxStudent.setUuid(old_student.getUuid());
			// student.setName(old_student.getName());
			//pxStudent.setClassuuid(old_student.getClassuuid());
			pxStudent.setGroupuuid(old_student.getGroupuuid());
			pxStudent.setCreate_time(old_student.getCreate_time());
			// 格式纠正
			pxStudent.setBirthday(TimeUtils.getDateFormatString(pxStudent.getBirthday()));

			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().update(pxStudent);

			this.updateAllStudentContactRealationByStudent(pxStudent);
			return true;
		} else {
			responseMessage.setMessage("更新记录不存在");
			return false;

		}
	}




	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return Student.class;
	}

	/**
	 * 查询所有机构列表
	 * 
	 * @return
	 */
	public List<PXStudent> query(String classuuid, String groupuuid) {
		String hql = "from PXStudent where 1=1";

		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  uuid in (select student_uuid from PXStudentPXClassRelation where class_uuid in("+DBUtil.stringsToWhereInValue(classuuid)+"))";

		hql += " order by classuuid, convert(name, 'gbk') ";
		List list = (List<PXStudent>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);

		warpVoList(list);

		return list;
	}




	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public PXStudent get(String uuid) throws Exception {
		PXStudent o = (PXStudent) this.nSimpleHibernateDao.getObjectById(PXStudent.class, uuid);
		if (o == null)
			return null;
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		warpVo(o);
		return o;
	}




	/**
	 * 
	 * @param groupuuid
	 * @param classuuid
	 * @param name
	 * @param pData
	 * @return
	 */
	public PageQueryResult queryByPage(String groupuuid, String classuuid, String name, PaginationData pData) {
		String hql = "from Student where 1=1";
		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  uuid in (select student_uuid from PXStudentPXClassRelation where class_uuid in("+DBUtil.stringsToWhereInValue(classuuid)+"))";
		if (StringUtils.isNotBlank(name))
			hql += " and  name  like '%" + name + "%' ";

		hql += " order by groupuuid,classuuid, convert(name, 'gbk') ";

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHql(hql, pData);
		this.warpVoList(pageQueryResult.getData());

		return pageQueryResult;
	}




	/**
	 * 更换学生班级.
	 * 
	 * @param studentuuid
	 * @param classuuid
	 * @param responseMessage
	 * @return
	 */
	public boolean updateChangeClass(String studentuuid, String classuuid, ResponseMessage responseMessage,
			HttpServletRequest request) {
		Student student = (Student) this.nSimpleHibernateDao.getObjectById(Student.class, studentuuid);
		if (student == null) {
			responseMessage.setMessage("异常数据,该学生不存在!");
			return false;
		}
		PClass cl = (PClass) this.nSimpleHibernateDao.getObjectById(PClass.class, classuuid);

		if (cl == null) {
			responseMessage.setMessage("异常数据,转到班级不存在!");
			return false;
		}
		student.setClassuuid(classuuid);
		student.setGroupuuid(cl.getGroupuuid());

		// 更新家长学生联系吧

		this.nSimpleHibernateDao.getHibernateTemplate().save(student);
		this.relUpdate_studentChangeClass(student);
		String msg = "姓名:" + student.getName() + ",uuid:" + student.getUuid() + ",转班到:" + cl.getName();
		this.addLog("updateChangeClass", "学生换班级", msg, request);
		return true;
	}


	/**
	 * 用户或老师资料修改时变更数据.
	 * 
	 * @param uuid
	 * @param name
	 * @param img
	 */
	private void relUpdate_studentChangeClass(Student student) {
		this.logger.info("relUpdate_studentChangeClass,student uuid=" + student.getUuid());
		// 更新家长学生联系表
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update StudentContactRealation set  groupuuid=?, class_uuid=? where student_uuid=?",
				student.getGroupuuid(), student.getClassuuid(), student.getUuid());

	}
	
	/**
	 * 查询所有机构列表
	 * 
	 * @return
	 */
	public List<Student> queryForOutExcel(String classuuid, String groupuuid) {
		String hql = "from PXStudent where 1=1";

		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  in (select student_uuid from PXStudentPXClassRelation where class_uuid in(='"+DBUtil.stringsToWhereInValue(classuuid)+"'))";
		hql += " order by classuuid, convert(name, 'gbk') ";
		List<Student> list = (List<Student>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);
		// warpVoList(list);
		return list;
	}

	/**
	 * 查询所有机构列表
	 * 
	 * @return
	 */
	public List<PClass> queryClassNameForOutExcel(String classuuid) {
		String hql = "from PXStudent where uuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		hql += " order by uuid";
		List<PClass> list = (List<PClass>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);
		return list;
	}
	
	/**
	 * 
	 * @return
	 */
	public List parentContactByMyStudent(List listClassuuids, String student_name) {
		if (listClassuuids.size() == 0)
			return new ArrayList();
		// student_uuid in(select uuid from Student classuuid
		// in("+StringOperationUtil.dateStr)+"))
		String where_student_name = "";
		if (StringUtils.isNotBlank(student_name)) {
			where_student_name = " and student_name like '%" + student_name + "%'";
		}
		String hql = "from StudentContactRealation  where student_uuid in"
				+ "(select student_uuid from PXStudentPXClassRelation where class_uuid in("
				+ DBUtil.stringsToWhereInValue(StringUtils.join(listClassuuids, ",")) + ") )" + where_student_name
				+ "  order by student_name,type";

		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(hql);
		warpStudentContactRealationVoList(list);
		return list;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}