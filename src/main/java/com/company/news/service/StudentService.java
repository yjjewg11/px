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

import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.PClass;
import com.company.news.entity.Parent;
import com.company.news.entity.Student;
import com.company.news.entity.StudentContactRealation;
import com.company.news.jsonform.StudentJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class StudentService extends AbstractService {
	private static final String model_name = "学生模块";
	@Autowired
	private UserinfoService userinfoService;

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(StudentJsonform studentJsonform, ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (StringUtils.isBlank(studentJsonform.getName())) {
			responseMessage.setMessage("姓名不能为空！");
			return false;
		}

		// name昵称验证
		if (StringUtils.isBlank(studentJsonform.getClassuuid())) {
			responseMessage.setMessage("班级不能为空");
			return false;
		}

		PClass pClass = (PClass) this.nSimpleHibernateDao.getObjectById(PClass.class, studentJsonform.getClassuuid());
		// 班级不存在
		if (pClass == null) {
			responseMessage.setMessage("班级不存在");
			return false;
		}

		studentJsonform.setHeadimg(PxStringUtil.imgUrlToUuid(studentJsonform.getHeadimg()));
		Student student = new Student();

		BeanUtils.copyProperties(student, studentJsonform);

		// 格式纠正
		student.setBirthday(TimeUtils.getDateFormatString(student.getBirthday()));

		student.setCreate_time(TimeUtils.getCurrentTimestamp());
		student.setGroupuuid(pClass.getGroupuuid());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(student);

		// 添加学生关联联系人表
		this.updateStudentContactRealation(student, SystemConstants.USER_type_ba, student.getBa_tel());
		this.updateStudentContactRealation(student, SystemConstants.USER_type_ma, student.getMa_tel());
		this.updateStudentContactRealation(student, SystemConstants.USER_type_ye, student.getYe_tel());
		this.updateStudentContactRealation(student, SystemConstants.USER_type_nai, student.getNai_tel());
		this.updateStudentContactRealation(student, SystemConstants.USER_type_waigong, student.getWaigong_tel());
		this.updateStudentContactRealation(student, SystemConstants.USER_type_waipo, student.getWaipo_tel());
		this.updateStudentContactRealation(student, SystemConstants.USER_type_other, student.getOther_tel());

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
	public boolean update(StudentJsonform studentJsonform, ResponseMessage responseMessage) throws Exception {

		Student student = (Student) this.nSimpleHibernateDao.getObjectById(Student.class, studentJsonform.getUuid());

		Student old_student = new Student();
		ConvertUtils.register(new DateConverter(null), java.util.Date.class);
		BeanUtils.copyProperties(old_student, student);
		studentJsonform.setHeadimg(PxStringUtil.imgUrlToUuid(studentJsonform.getHeadimg()));
		if (student != null) {
			BeanUtils.copyProperties(student, studentJsonform);
			// 设置不能被修改的字段
			student.setUuid(old_student.getUuid());
			// student.setName(old_student.getName());
			student.setClassuuid(old_student.getClassuuid());
			student.setGroupuuid(old_student.getGroupuuid());
			student.setCreate_time(old_student.getCreate_time());
			// 格式纠正
			student.setBirthday(TimeUtils.getDateFormatString(student.getBirthday()));

			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().update(student);

			this.updateStudentContactRealation(student, SystemConstants.USER_type_ba, student.getBa_tel());
			this.updateStudentContactRealation(student, SystemConstants.USER_type_ma, student.getMa_tel());
			this.updateStudentContactRealation(student, SystemConstants.USER_type_ye, student.getYe_tel());
			this.updateStudentContactRealation(student, SystemConstants.USER_type_nai, student.getNai_tel());
			this.updateStudentContactRealation(student, SystemConstants.USER_type_waigong, student.getWaigong_tel());
			this.updateStudentContactRealation(student, SystemConstants.USER_type_waipo, student.getWaipo_tel());
			this.updateStudentContactRealation(student, SystemConstants.USER_type_other, student.getOther_tel());

			return true;
		} else {
			responseMessage.setMessage("更新记录不存在");
			return false;

		}
	}

	/**
	 * 保存学生资料时,更新学生关联家长的手机表 1.根据注册手机,绑定和学生的关联关心. 2.更新孩子数据时,也会自动绑定学生和家长的数据.
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	private StudentContactRealation updateStudentContactRealation(Student student, Integer type, String tel)
			throws Exception {
		if (!CommonsValidate.checkCellphone(tel)) {
			return null;
		}
		String student_uuid = student.getUuid();
		StudentContactRealation studentContactRealation = this.getStudentContactRealationBy(student_uuid, type);
		if (studentContactRealation == null) {// 不存在,则新建.
			if (!CommonsValidate.checkCellphone(tel))
				return null;
			studentContactRealation = new StudentContactRealation();
		} else {
			// 验证失败则,表示删除关联关系.
			if (!CommonsValidate.checkCellphone(tel)) {
				nSimpleHibernateDao.delete(studentContactRealation);
				return null;
			}
			// 一样则表示不变,直接返回.
			if (tel.equals(studentContactRealation.getTel())
					&& student.getName().equals(studentContactRealation.getStudent_name())) {
				return studentContactRealation;
			}
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

		Parent parent = (Parent) nSimpleHibernateDao.getObjectByAttribute(Parent.class, "loginname", tel);
		// 判断电话,是否已经注册,来设置状态.
		if (parent != null) {
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_1);
			studentContactRealation.setParent_uuid(parent.getUuid());
		} else {
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_0);
		}

		// 1:妈妈,2:爸爸,3:爷爷,4:奶奶,5:外公,6:外婆,7:其他
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

		// 更新家长姓名和头像.多个孩子已最后保存为准
		if (parent != null) {
			String newParentName = PxStringUtil.getParentNameByStudentContactRealation(studentContactRealation);
			if (parent.getImg() == null || parent.getImg().equals(student.getHeadimg())) {
				parent.setImg(student.getHeadimg());
			}
			if (newParentName != null && !newParentName.equals(parent.getName())) {
				parent.setName(newParentName);
				userinfoService.relUpdate_updateSessionUserInfoInterface(parent);
			}
			nSimpleHibernateDao.save(parent);
		}
		nSimpleHibernateDao.save(studentContactRealation);
		return studentContactRealation;
	}

	/**
	 * 获取
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public StudentContactRealation getStudentContactRealationBy(String student_uuid, Integer type) {
		List<StudentContactRealation> list = (List<StudentContactRealation>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from StudentContactRealation where student_uuid=? and type=?", student_uuid, type);
		if (list.size() > 0) {
			return (StudentContactRealation) list.get(0);
		}
		return null;
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
	public List<Student> query(String classuuid, String groupuuid) {
		String hql = "from Student where 1=1";

		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";

		hql += " order by classuuid, convert(name, 'gbk') ";
		List<Student> list = (List<Student>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);

		warpVoList(list);

		return list;
	}

	/**
	 * 查询所有机构列表
	 * 
	 * @return
	 */
	public List<Student> queryForOutExcel(String classuuid, String groupuuid) {
		String hql = "from Student where 1=1";

		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
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
		String hql = "from PClass where uuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		hql += " order by uuid";
		List<PClass> list = (List<PClass>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);
		return list;
	}

	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public Student get(String uuid) throws Exception {
		Student o = (Student) this.nSimpleHibernateDao.getObjectById(Student.class, uuid);
		if (o == null)
			return null;
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		warpVo(o);
		return o;
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
			where_student_name = " and name like '%" + student_name + "%'";
		}
		String hql = "from StudentContactRealation  where student_uuid in"
				+ "(select uuid from Student where classuuid in("
				+ DBUtil.stringsToWhereInValue(StringUtils.join(listClassuuids, ",")) + ") " + where_student_name
				+ " ) order  by student_name,type";

		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(hql);
		warpStudentContactRealationVoList(list);
		return list;
	}

	/**
	 * 根据电话号码,机构UUID,获取绑定该学生
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public Student getStudentByIdNoAndGroup(String idNo, String groupuuid) {

		List<Student> list = (List<Student>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from Student  where idcard=? and groupuuid=?)", idNo, groupuuid);
		if (list != null && list.size() > 0)
			return warpVo(list.get(0));
		else
			return null;
	}

	/**
	 * 根据机构UUID,获取绑定该学生
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public List<Student> getStudentByGroup(String groupuuid) {

		List<Student> list = (List<Student>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from Student  where groupuuid=?)", groupuuid);

		return list;
	}

	/**
	 * 根据机构UUID,获取绑定该学生
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getStudentCountByGroup(String groupuuid) {

		List list = (List) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("select count(uuid),classuuid from Student  where groupuuid=? group by classuuid)", groupuuid);

		return list;
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
			hql += " and  classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		if (StringUtils.isNotBlank(name))
			hql += " and  name  like '%" + name + "%' ";

		hql += " order by groupuuid,classuuid, convert(name, 'gbk') ";

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHql(hql, pData);
		this.warpVoList(pageQueryResult.getData());

		return pageQueryResult;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	private StudentContactRealation warpStudentContactRealationVo(StudentContactRealation o) {
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		o.setStudent_img(PxStringUtil.imgUrlByUuid(o.getStudent_img()));
		return o;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	private List<StudentContactRealation> warpStudentContactRealationVoList(List<StudentContactRealation> list) {
		for (StudentContactRealation o : list) {
			warpStudentContactRealationVo(o);
		}
		return list;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	private Student warpVo(Student o) {
		this.nSimpleHibernateDao.getHibernateTemplate().evict(o);
		o.setHeadimg(PxStringUtil.imgUrlByUuid(o.getHeadimg()));
		return o;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	private List<Student> warpVoList(List<Student> list) {
		for (Student o : list) {
			warpVo(o);
		}
		return list;
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
	 * 获取老师相关班级的uuid
	 * 
	 * @param classNewsDianzanJsonform
	 * @param responseMessage
	 * @return
	 * @throws Exception
	 */
	public List getTeacherRelClassUuids(String user_uuid) throws Exception {
		this.logger.info("user_uuid=" + user_uuid);
		List list = this.nSimpleHibernateDao.getHibernateTemplate()
				.find("select classuuid from UserClassRelation where useruuid=?", user_uuid);
		return list;
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

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
