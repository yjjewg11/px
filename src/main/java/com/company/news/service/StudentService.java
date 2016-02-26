package com.company.news.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.DbUtils;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Group4Q;
import com.company.news.entity.PClass;
import com.company.news.entity.Student;
import com.company.news.entity.StudentBind;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.StudentJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class StudentService extends AbstractStudentService {
	private static final String model_name = "学生模块";
	@Autowired
	private StudentBindService studentBindService;
	
	
	@Autowired
	private PxStudentService pxStudentService;
	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(StudentJsonform studentJsonform, ResponseMessage responseMessage, HttpServletRequest request) throws Exception {

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

		PClass pClass = (PClass)CommonsCache.get( studentJsonform.getClassuuid(), PClass.class);
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
		
		student.setBa_tel(PxStringUtil.repairCellphone(student.getBa_tel()));
		student.setMa_tel(PxStringUtil.repairCellphone(student.getMa_tel()));
		student.setYe_tel(PxStringUtil.repairCellphone(student.getYe_tel()));
		student.setNai_tel(PxStringUtil.repairCellphone(student.getNai_tel()));
		student.setWaigong_tel(PxStringUtil.repairCellphone(student.getWaigong_tel()));
		student.setOther_tel(PxStringUtil.repairCellphone(student.getOther_tel()));
		student.setWaipo_tel(PxStringUtil.repairCellphone(student.getWaipo_tel()));
		
		student.setCreate_time(TimeUtils.getCurrentTimestamp());
		student.setGroupuuid(pClass.getGroupuuid());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(student);

		
		Group4Q group = (Group4Q) CommonsCache.get(pClass.getGroupuuid(), Group4Q.class);

		String msg=student.getName()+"|加入班级|["+ pClass.getName()+"]|爸爸电话:"+student.getBa_tel()+"|妈妈电话:"+student.getMa_tel()+"|"+group.getBrand_name();
		this.addStudentOperate(pClass.getGroupuuid(), student.getUuid(), msg, null, request);
		// 添加学生关联联系人表
		this.updateAllStudentContactRealationByStudent(student);
		
		//幼儿园更新学生资料时,同步更新培训机构的学生资料
		pxStudentService.updatePxStudentByKDstudent(student);
		
		return true;
	}

	
	/*
	 * 
	 * 判断是否是学生老师
	 */
	public boolean isStudentTeacher(String user_uuids, String classuuid) {
		String hql = "select uuid from UserClassRelation where  classuuid=? and useruuid in("
				+ DBUtil.stringsToWhereInValue(user_uuids) + ")";
		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(hql, classuuid);
		if (list.size() > 0)
			return true;
		return false;
	}
	/*
	 * 
	 * 判断是否是培训学生老师
	 */
	public boolean isStudentPxTeacher(String user_uuids, String classuuid) {
		String hql = "select uuid from UserPxCourseRelation where  classuuid=? and useruuid in("
				+ DBUtil.stringsToWhereInValue(user_uuids) + ")";
		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(hql, classuuid);
		if (list.size() > 0)
			return true;
		return false;
	}
	
	public boolean isHasRightToDo(Student student, ResponseMessage responseMessage, HttpServletRequest request){
		boolean flag = false;
		// 如果 是更新,只有班主任和管理员可以进行修改,
		String right=RightConstants.KD_student_m;
		if(SessionListener.isPXLogin(request)){
			right=RightConstants.PX_student_m;
		}
		
		SessionUserInfoInterface user=this.getSessionUser(request, responseMessage);
		

		flag = RightUtils.hasRight(student.getGroupuuid(),
				right, request);
		if(flag)return flag;
		
		if(SessionListener.isPXLogin(request)){
			flag = this.isStudentPxTeacher(user.getUuid(),
					student.getClassuuid());
		}else{
			flag = this.isStudentTeacher(user.getUuid(),
					student.getClassuuid());
		}
			
		
		return flag;
	}
	
	/**
	 * 修改
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(StudentJsonform studentJsonform, ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		Student student = (Student) this.nSimpleHibernateDao.getObjectById(Student.class, studentJsonform.getUuid());
	
		boolean flag = isHasRightToDo(student, responseMessage, request);
		// 如果 是更新,只有班主任和管理员可以进行修改,
		
		
		if(!flag){
			responseMessage.setMessage("没有学生管理权限,或者不是该学生的老师不能修改.");
			return false;
		}
	

//		Student old_student = new Student();
//		ConvertUtils.register(new DateConverter(null), java.util.Date.class);
//		BeanUtils.copyProperties(old_student, student);
		studentJsonform.setHeadimg(PxStringUtil.imgUrlToUuid(studentJsonform.getHeadimg()));
		if (student != null) {
			BeanUtils.copyProperties(student, studentJsonform);
			// 设置不能被修改的字段
//			student.setUuid(old_student.getUuid());
//			// student.setName(old_student.getName());
//			student.setClassuuid(old_student.getClassuuid());
//			student.setGroupuuid(old_student.getGroupuuid());
//			student.setCreate_time(old_student.getCreate_time());
			// 格式纠正
			student.setBirthday(TimeUtils.getDateFormatString(student.getBirthday()));
			student.setBa_tel(PxStringUtil.repairCellphone(student.getBa_tel()));
			student.setMa_tel(PxStringUtil.repairCellphone(student.getMa_tel()));
			student.setYe_tel(PxStringUtil.repairCellphone(student.getYe_tel()));
			student.setNai_tel(PxStringUtil.repairCellphone(student.getNai_tel()));
			student.setWaigong_tel(PxStringUtil.repairCellphone(student.getWaigong_tel()));
			student.setOther_tel(PxStringUtil.repairCellphone(student.getOther_tel()));
			student.setWaipo_tel(PxStringUtil.repairCellphone(student.getWaipo_tel()));
			
//			responseMessage.setMessage("操作成功");
			//关联班级的学生,离校  去掉关联班级
			if(!SystemConstants.DB_String_unrelated_Value.equals(student.getClassuuid())&&SystemConstants.Student_status_leaveSchool.equals(student.getStatus())){
				student.setClassuuid(SystemConstants.DB_String_unrelated_Value);
				student.setLeave_time(TimeUtils.getCurrentTimestamp());
//				responseMessage.setMessage("操作成功,该生离校已从班级移除.");
			}
			
			
			// 有事务管理，统一在Controller调用时处理异常
			this.nSimpleHibernateDao.getHibernateTemplate().update(student);

		
			this.updateAllStudentContactRealationByStudent(student);
			 List xueliList=CommonsCache.getBaseDataListByTypeuuid("student_status");
			String student_status= CommonsCache.getBaseDatavalue(student.getStatus(), xueliList);
			String msg=student.getName()+"|状态:"+student_status+"|老师修改学生资料|"+"]|爸爸电话:"+student.getBa_tel()+"|妈妈电话:"+student.getMa_tel();
			this.addStudentOperate(student.getGroupuuid(), student.getUuid(), msg, null, request);
		
			
			
			//幼儿园更新学生资料时,同步更新培训机构的学生资料
			pxStudentService.updatePxStudentByKDstudent(student);
			
			return true;
		} else {
			responseMessage.setMessage("更新记录不存在");
			return false;

		}
	}




	public StudentBindService getStudentBindService() {
		return studentBindService;
	}

	public void setStudentBindService(StudentBindService studentBindService) {
		this.studentBindService = studentBindService;
	}

	public PxStudentService getPxStudentService() {
		return pxStudentService;
	}

	public void setPxStudentService(PxStudentService pxStudentService) {
		this.pxStudentService = pxStudentService;
	}

	public static String getModelName() {
		return model_name;
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
		List list = (List<Student>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);

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
			where_student_name = " and name like '%" + DbUtils.safeToWhereString(student_name) + "%'";
		}
		String hql = "from StudentContactRealation  where student_uuid in"
				+ "(select uuid from Student where classuuid in("
				+ DBUtil.stringsToWhereInValue(StringUtils.join(listClassuuids, ",")) + ") " + where_student_name
				+ " ) order  by convert(student_name, 'gbk') ,type";

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
		{
			Student s=list.get(0);
			warpVo(s);
			return s;
		}
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
	 * 根据机构UUID,获取性别统计
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getStudentSexCountByGroup(String groupuuid) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		//学生数量.教学计划数量,课程名,(班级信息)
		String sql = "SELECT t0.sex, count( DISTINCT t0.uuid) from px_student t0 ";
				sql+= " where t0.groupuuid ='"+DbUtils.safeToWhereString(groupuuid)+"'";
				sql+=" group by t0.sex";
				Query q = s.createSQLQuery(sql);
				List list =q.list();

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
		return this.queryByPage(groupuuid, classuuid, name, null, pData);
	}

	

	/**
	 * 
	 * @param groupuuid
	 * @param classuuid
	 * @param name
	 * @param pData
	 * @return
	 */
	public PageQueryResult queryByPage(String groupuuid, String classuuid, String name,String status, PaginationData pData) {
		String hql = "from Student where 1=1";
		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		if (StringUtils.isNotBlank(name))
			hql += " and  name  like '%" + name + "%' ";
		
		if (StringUtils.isNotBlank(status))
			hql += " and  status  ="+status;
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

		boolean flag = isHasRightToDo(student, responseMessage, request);
		// 如果 是更新,只有班主任和管理员可以进行修改,
		
		
		if(!flag){
			responseMessage.setMessage("没有学生管理权限,或者不是该学生的老师不能修改.");
			return false;
		}
		
		PClass cl = (PClass) CommonsCache.get(classuuid, PClass.class);
		
		if (cl == null) {
			responseMessage.setMessage("异常数据,转到班级不存在!");
			return false;
		}
		Group4Q group = (Group4Q) CommonsCache.get(cl.getGroupuuid(), Group4Q.class);

		student.setClassuuid(classuuid);
		student.setGroupuuid(cl.getGroupuuid());
		student.setStatus(SystemConstants.Student_status_InSchool);
	
		this.nSimpleHibernateDao.getHibernateTemplate().save(student);
		this.relUpdate_studentChangeClass(student);
		String msg=student.getName()+"|换班级到|["+ cl.getName()+"]|"+group.getBrand_name();
		this.addStudentOperate(cl.getGroupuuid(), studentuuid, msg, null, request);
//		String msg = "姓名:" + student.getName() + ",uuid:" + student.getUuid() + ",转班到:" + cl.getName();
//		this.addLog("updateChangeClass", "学生换班级", msg, request);
	
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

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

	public synchronized List<Object[]>  update_and_queryFor_doorrecord_OutExcel(String classuuid,
			String groupuuid,String uuid,String otherWhere,SessionUserInfoInterface user) throws Exception {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		String sql = "select b2.card_factory,b2.cardid,b2.userid,s1.name,c3.name as class_name,s1.sex,s1.idcard,s1.birthday,s1.address,s1.uuid,s1.groupuuid,b2.uuid as binduuid ";
		sql+=" from px_student s1  left join px_class c3 on s1.classuuid=c3.uuid left join px_studentbind b2 on  s1.uuid=b2.studentuuid and b2.type="+SystemConstants.StudentBind_type_1;
		sql+=" where  s1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  s1.classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		if (StringUtils.isNotBlank(uuid))
			sql += " and  s1.uuid in(" + DBUtil.stringsToWhereInValue(uuid) + ")";
		if ("doorrecord_apply".equals(otherWhere))
			sql += " and  b2.cardid is null ";
		
		sql += "order by s1.classuuid,CONVERT( s1.name USING gbk)";
		
//原始卡号 	用户卡号	用户编号	用户名	部门名称	性别	身份证号	出生日期	家庭住址	[邮编	 联系电话	入学日期	有效期]固定空.
		List<Object[]> list = s.createSQLQuery(sql).list();
		
		 Long startUserid=studentBindService.getMax_userid(groupuuid);
		 for(Object[] obj:list){
			if(obj[2]==null){//用户编号 空,需要生成.
				StudentBind b2=null;
				if(obj[11]!=null){
					b2=(StudentBind)this.nSimpleHibernateDao.getObjectById(StudentBind.class, obj[11].toString());
				}
				if(b2==null){
					 b2=new StudentBind();
				}
				
				b2.setStudentuuid(obj[9]+"");
				if(StringUtils.isBlank(b2.getStudentuuid())){
					throw new Exception("学生uuid不能为空");
				}
				b2.setUserid((++startUserid)+"");
				b2.setCard_factory(null);
				b2.setCreate_user(user.getName());
				b2.setCreate_useruuid(user.getUuid());
				b2.setGroupuuid(obj[10]+"");
				b2.setName(obj[3]+"");
				b2.setCreatetime(TimeUtils.getCurrentTimestamp());
				b2.setType(1);//学生卡
				this.nSimpleHibernateDao.save(b2);
				
				//获取新新生成的userid
				obj[2]=b2.getUserid();
			}
		}
		return list;
	}
	
	public synchronized List<Object[]>  queryFor_doorrecord_apply_OutExcel(String classuuid,
			String groupuuid,String uuid,String otherWhere,SessionUserInfoInterface user) throws Exception {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		String sql = "select b2.card_factory,b2.cardid,b2.userid,s1.name,c3.name as class_name,s1.sex,s1.idcard,s1.birthday,s1.address,s1.uuid,s1.groupuuid,b2.uuid as binduuid ";
		sql+=" from px_student s1  left join px_class c3 on s1.classuuid=c3.uuid left join px_studentbind b2 on  s1.uuid=b2.studentuuid and b2.type="+SystemConstants.StudentBind_type_1;
		sql+=" where  b2.userid is not null and s1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  s1.classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		if (StringUtils.isNotBlank(uuid))
			sql += " and  s1.uuid in(" + DBUtil.stringsToWhereInValue(uuid) + ")";
		if ("doorrecord_apply".equals(otherWhere))
			sql += " and  b2.cardid is null ";
		
		
		sql += " order by s1.classuuid,CONVERT( s1.name USING gbk)";
		
//原始卡号 	用户卡号	用户编号	用户名	部门名称	性别	身份证号	出生日期	家庭住址	[邮编	 联系电话	入学日期	有效期]固定空.
		List<Object[]> list = s.createSQLQuery(sql).list();
		
		return list;
	}
	
	public synchronized List<Object[]>  update_and_queryFor_doorrecord_teacher_OutExcel(String classuuid,
			String groupuuid,String uuid,String otherWhere,SessionUserInfoInterface user) throws Exception {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		String sql = "select b2.card_factory,b2.cardid,b2.userid,s1.name,c3.brand_name as brand_name,s1.sex,'' as idcard,'' as birthday,'' as address,s1.uuid,p4.groupuuid,b2.uuid as binduuid ";
		sql+=" from px_user s1  left  join  px_studentbind b2   on  s1.uuid=b2.studentuuid and b2.type="+SystemConstants.StudentBind_type_0;
		
		sql+="  left  join  px_usergrouprelation p4   on  s1.uuid=p4.useruuid ";
		sql+="left join px_group c3  on  c3.uuid=p4.groupuuid ";
		
		sql+=" where p4.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
	
		if (StringUtils.isNotBlank(uuid))
			sql += "   s1.uuid in(" + DBUtil.stringsToWhereInValue(uuid) + ")";
		if ("doorrecord_apply".equals(otherWhere))
			sql += " and  b2.cardid is null ";
		
		sql += "order by CONVERT( b2.name USING gbk)";
		
//原始卡号 	用户卡号	用户编号	用户名	部门名称	性别	身份证号	出生日期	家庭住址	[邮编	 联系电话	入学日期	有效期]固定空.
		List<Object[]> list = s.createSQLQuery(sql).list();
		
		 Long startUserid=studentBindService.getMax_userid(groupuuid);
		 for(Object[] obj:list){
			if(obj[2]==null){//用户编号 空,需要生成.
				StudentBind b2=null;
				if(obj[11]!=null){
					b2=(StudentBind)this.nSimpleHibernateDao.getObjectById(StudentBind.class, obj[11].toString());
				}
				if(b2==null){
					 b2=new StudentBind();
				}
				
				b2.setStudentuuid(obj[9]+"");
				if(StringUtils.isBlank(b2.getStudentuuid())){
					continue;
				//	throw new Exception("学生uuid不能为空");
				}
				b2.setUserid((++startUserid)+"");
				b2.setCard_factory(null);
				b2.setCreate_user(user.getName());
				b2.setCreate_useruuid(user.getUuid());
				b2.setGroupuuid(obj[10]+"");
				b2.setName(obj[3]+"");
				b2.setCreatetime(TimeUtils.getCurrentTimestamp());
				b2.setType(0);//学生卡
				this.nSimpleHibernateDao.save(b2);
				
				//获取新新生成的userid
				obj[2]=b2.getUserid();
			}
		}
		return list;
	}
	
	public synchronized List<Object[]>  queryFor_doorrecord_apply_teacher_OutExcel(String classuuid,
			String groupuuid,String uuid,String otherWhere,SessionUserInfoInterface user) throws Exception {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		String sql = "select b2.card_factory,b2.cardid,b2.userid,b2.name,c3.brand_name as brand_name,s1.sex,'' as idcard,'' as birthday,'' as address,s1.uuid,b2.groupuuid,b2.uuid as binduuid ";
		
		sql+=" from px_studentbind b2  join px_user s1  on  s1.uuid=b2.studentuuid  and b2.type="+SystemConstants.StudentBind_type_0+" left join px_group c3  on  c3.uuid=b2.groupuuid ";
		sql+=" where   b2.userid is not null and b2.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		
		if (StringUtils.isNotBlank(uuid))
			sql += " and  s1.uuid in(" + DBUtil.stringsToWhereInValue(uuid) + ")";
		if ("doorrecord_apply_teacher".equals(otherWhere))
			sql += " and  b2.cardid is null ";
		
		
		sql += " order by CONVERT( s1.name USING gbk)";
		
//原始卡号 	用户卡号	用户编号	用户名	部门名称	性别	身份证号	出生日期	家庭住址	[邮编	 联系电话	入学日期	有效期]固定空.
		List<Object[]> list = s.createSQLQuery(sql).list();
		
		return list;
	}
	
	
	
	

	public synchronized List<Map>  queryFor_students_age_OutExcel(String classuuid,
			String groupuuid,String uuid,String otherWhere,SessionUserInfoInterface user) throws Exception {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().openSession();
		
		String sql = "select c3.name as class_name,s1.name,s1.sex,s1.birthday ";
		sql+=" from px_student s1  left join px_class c3 on s1.classuuid=c3.uuid ";
		sql+=" where s1.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			sql += " and  s1.classuuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		if (StringUtils.isNotBlank(uuid))
			sql += " and  s1.uuid in(" + DBUtil.stringsToWhereInValue(uuid) + ")";
		
		sql += " order by CONVERT( c3.name USING gbk)";
		
		
		Query q = s
				.createSQLQuery(sql);
		q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List list=q.list();
		
		return list;
	}
	
	
	/**
	 * 
	 * 
	 * 
	 * 幼儿园学生
	 * SELECT DATE_FORMAT(FROM_DAYS(TO_DAYS(NOW())-TO_DAYS(birthday)),'%Y') +0 AS age , sex,count(uuid) FROM px_student
	GROUP BY age,sex
	 * @param tel
	 * @param type
	 * @return
	 */
	public List getStudentAgeCountByGroup(String groupuuid) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		//性别,年龄,
		String sql = "SELECT DATE_FORMAT(FROM_DAYS(TO_DAYS(NOW())-TO_DAYS(birthday)),'%Y') +0 AS age , sum(sex=0) as male,sum(sex=1) as female FROM px_student";
				sql+= " where groupuuid ='"+DbUtils.safeToWhereString(groupuuid)+"'";
				sql+=" group by age";
				Query q = s.createSQLQuery(sql);
				List list =q.list();

		return list;
	}

}
