package com.company.news.service;

import java.util.ArrayList;
import java.util.List;

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

import com.company.news.cache.CommonsCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Group4Q;
import com.company.news.entity.PClass;
import com.company.news.entity.PxClass;
import com.company.news.entity.PxCourseCache;
import com.company.news.entity.PxStudent;
import com.company.news.entity.PxStudentPXClassRelation;
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
	private GroupService groupService;
	
	@Autowired
	private PxCourseService pxCourseService;

	/**
	 * @throws Exception 
	 * 
	 */
	public boolean addStudentClassRelation(String student_uuid,String class_uuid,ResponseMessage responseMessage,HttpServletRequest request) throws Exception{
	
		PxClass pxClass=(PxClass)this.nSimpleHibernateDao.getObject(PxClass.class, class_uuid);
		if(pxClass==null){
			responseMessage.setMessage("没找到对应班级!");
			return false;
		}
		String t_hql="select uuid from PxStudentPXClassRelation where student_uuid=:student_uuid and class_uuid=:class_uuid";
		Query query2 =this.nSimpleHibernateDao. getSession().createQuery(t_hql);
		query2.setParameter("student_uuid", student_uuid);
		query2.setParameter("class_uuid", class_uuid);
		List list=query2.list();
		if(list.size()>0){
			responseMessage.setMessage("该学生已经在该班级了，不用重复添加！");
			return false;
		}
		PxStudent pxStudent=(PxStudent)this.nSimpleHibernateDao.getObject(PxStudent.class, student_uuid);
		if(pxStudent==null){
			Student student=(Student)this.nSimpleHibernateDao.getObject(Student.class, student_uuid);
			if(student!=null){
				pxStudent=new PxStudent();
				BeanUtils.copyProperties(pxStudent, student);
				pxStudent.setGroupuuid(pxClass.getGroupuuid());
				pxStudent.setUuid(null);
				this.nSimpleHibernateDao.save(pxStudent);
				
//				this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate("update PxStudent set uuid=? where uuid=?",student.getUuid(), pxStudent.getUuid());
//				pxStudent.setUuid(student.getUuid());
//				this.nSimpleHibernateDao.save(pxStudent);
//				student_uuid=pxStudent.getUuid();
			}
			
		}
		PxStudentPXClassRelation pp=new PxStudentPXClassRelation();
		pp.setClass_uuid(class_uuid);
		pp.setStudent_uuid(pxStudent.getUuid());
		this.nSimpleHibernateDao.save(pp);	
		
		

		Group4Q group = (Group4Q) CommonsCache.get(pxClass.getGroupuuid(), Group4Q.class);
		PxCourseCache pxCourseCache = (PxCourseCache) CommonsCache.get(pxClass.getCourseuuid(),PxCourseCache.class);

		String msg=pxStudent.getName()+"|参加特长班|["+pxClass.getName()+"]|"+pxCourseCache.getTitle()+"|"+group.getBrand_name();
		this.addStudentOperate(pxClass.getGroupuuid(), pxStudent.getUuid(), msg, null, request);
	
		//增加课程已学人数.
		pxCourseService.addPxcourseStudentCount(pxClass.getCourseuuid());
		groupService.addGroupStudentCount(pxClass.getGroupuuid());
		return true;
	}
	

	/**
	 * @throws Exception 
	 * 
	 */
	public boolean update_deleteStudentClassRelation(String student_uuid,String class_uuid,ResponseMessage responseMessage,HttpServletRequest request) throws Exception{
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate("delete from PxStudentPXClassRelation where student_uuid=? and class_uuid=?", student_uuid,class_uuid);
		
		PxStudent pxStudent=(PxStudent)this.nSimpleHibernateDao.getObject(PxStudent.class, student_uuid);
		PxClass pxClass=(PxClass)this.nSimpleHibernateDao.getObject(PxClass.class, class_uuid);
		Group4Q group = (Group4Q) CommonsCache.get(pxClass.getGroupuuid(), Group4Q.class);
		
		String msg=pxStudent.getName()+"|离开特长班|["+pxClass.getName()+"]|"+group.getBrand_name();
		this.addStudentOperate(pxClass.getGroupuuid(), pxStudent.getUuid(), msg, null, request);
	
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
	public boolean add(PxStudentJsonform pxstudentJsonform, ResponseMessage responseMessage,HttpServletRequest request) throws Exception {

		if(this.validateRequireAndLengthByRegJsonform(pxstudentJsonform.getName(), 32, "姓名", responseMessage)
				//||this.validateRequireByRegJsonform(pxstudentJsonform.getClassuuid(), "班级", responseMessage)
				)
			return false;

		PxClass pXClass = (PxClass) this.nSimpleHibernateDao.getObjectById(PxClass.class, pxstudentJsonform.getClassuuid());
		// 班级不存在
		if (pXClass == null) {
			responseMessage.setMessage("班级不存在");
			return false;
		}

		pxstudentJsonform.setHeadimg(PxStringUtil.imgUrlToUuid(pxstudentJsonform.getHeadimg()));
		PxStudent pxStudent = new PxStudent();

		BeanUtils.copyProperties(pxStudent, pxstudentJsonform);

		// 格式纠正
		pxStudent.setBirthday(TimeUtils.getDateFormatString(pxStudent.getBirthday()));

		pxStudent.setCreate_time(TimeUtils.getCurrentTimestamp());
		pxStudent.setGroupuuid(pXClass.getGroupuuid());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(pxStudent);
		
		
		Group4Q group = (Group4Q) CommonsCache.get(pXClass.getGroupuuid(), Group4Q.class);
		
		String msg=pxStudent.getName()+"|老师增加学生资料|爸爸电话:"+pxStudent.getBa_tel()+"|妈妈电话:"+pxStudent.getMa_tel()+"|"+group.getBrand_name();
		this.addStudentOperate(pXClass.getGroupuuid(), pxStudent.getUuid(), msg, null, request);
	
		//保存关联班级
		this.addStudentClassRelation(pxStudent.getUuid(), pXClass.getUuid(),responseMessage,request);
		
		

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
	public boolean update(PxStudentJsonform pxstudentJsonform, ResponseMessage responseMessage,HttpServletRequest request) throws Exception {

		PxStudent pxStudent = (PxStudent) this.nSimpleHibernateDao.getObjectById(PxStudent.class, pxstudentJsonform.getUuid());

		PxStudent old_student = new PxStudent();
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
			
			
//			Group4Q group = (Group4Q) CommonsCache.get(pXClass.getGroupuuid(), Group4Q.class);
//			
//			String msg=pxStudent.getName()+"|老师修改学生资料|爸爸电话:"+pxStudent.getBa_tel()+"|妈妈电话:"+pxStudent.getMa_tel()+"|"+group.getBrand_name();
//			this.addStudentOperate(pXClass.getGroupuuid(), pxStudent.getUuid(), msg, null, request);
		
			
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
	public List<PxStudent> query(String classuuid) {
		
		String hql = "from PxStudent where  uuid in (select student_uuid from PxStudentPXClassRelation where class_uuid in("+DBUtil.stringsToWhereInValue(classuuid)+"))";
		hql += " order by classuuid, convert(name, 'gbk') ";
		List list = (List<PxStudent>) this.nSimpleHibernateDao.getHibernateTemplate().find(hql, null);
		warpVoList(list);
		return list;
	}




	/**
	 * 
	 * @param uuid
	 * @return
	 */
	public PxStudent get(String uuid) throws Exception {
		PxStudent o = (PxStudent) this.nSimpleHibernateDao.getObjectById(PxStudent.class, uuid);
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
	 * @param name,
	 * @param pData
	 * @return
	 */
	public PageQueryResult queryByPage(String groupuuid, String classuuid, String name, PaginationData pData) {
		
		
		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql_select="select  DISTINCT {t1.*} from px_pxstudent {t1}   left join px_pxstudentpxclassrelation t2 on {t1}.uuid=t2.student_uuid  ";
		String sql_count="select  count(DISTINCT t1.uuid) from px_pxstudent t1  left join px_pxstudentpxclassrelation t2 on t1.uuid=t2.student_uuid   ";
		
		String sql="";
		if(StringUtils.isBlank(classuuid)){//没班级uuid则不用查询groupuuid
			sql+=" left join px_pxclass t3 on t2.class_uuid=t3.uuid ";
		}
		sql+=" where  1=1";
		if(StringUtils.isNotBlank(classuuid)){
			sql+=" and t2.class_uuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
		}
		if(StringUtils.isBlank(classuuid)){//没班级uuid则不用查询groupuuid
			if(StringUtils.isNotBlank(groupuuid)){
				sql+=" and t3.groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
			}
			
		}
	
		
		String sql_ordery= " order by CONVERT( {t1}.name USING gbk)";
		Query q = s.createSQLQuery(sql_select+sql+sql_ordery).addEntity("t1", PxStudent.class);
		
		PageQueryResult pageQueryResult =this.nSimpleHibernateDao.findByPageForQueryTotal(q, sql_count+sql, pData);
		
		this.warpVoList(pageQueryResult.getData());

		return pageQueryResult;
	}

	

	/**
	 * 
	 * @param groupuuid
	 * @param classuuid
	 * @param name
	 * @param pData
	 * @return
	 */
	public PageQueryResult queryByNameOrTel( String name, PaginationData pData) {
		
		if (StringUtils.isBlank(name))
			return new PageQueryResult();
		//去掉多余用户
		String hql = "from PxStudent where ";
		if (StringUtils.isNumeric(name))
			hql += "  uuid in (select student_uuid from PxStudentContactRealation where tel ='"+name+"')";
		else
			hql += "   name  = '" + name + "' ";

		PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHql(hql, pData);
		
		//如果没找到对应的,就到幼儿园的数据表里面进行抓取.
		if(pageQueryResult.getData()==null||pageQueryResult.getData().size()==0){
			 hql = "from  Student where ";
			if (StringUtils.isNumeric(name))
				hql += "  uuid in (select student_uuid from StudentContactRealation where tel ='"+name+"')";
			else
				hql += "   name  = '" + name + "' ";

			 pageQueryResult = this.nSimpleHibernateDao.findByPaginationToHql(hql, pData);
		}
		this.warpVoList(pageQueryResult.getData());

		return pageQueryResult;
	}

	/**
	 * 根据机构UUID,获取绑定该学生
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	public List<PxStudent> getStudentByGroup(String groupuuid) {

		List<PxStudent> list = (List<PxStudent>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from PxStudent  where groupuuid=?)", groupuuid);

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
		String hql = "from PxStudent where 1=1";

		if (StringUtils.isNotBlank(groupuuid))
			hql += " and  groupuuid in(" + DBUtil.stringsToWhereInValue(groupuuid) + ")";
		if (StringUtils.isNotBlank(classuuid))
			hql += " and  in (select student_uuid from PxStudentPXClassRelation where class_uuid in(='"+DBUtil.stringsToWhereInValue(classuuid)+"'))";
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
		String hql = "from PxStudent where uuid in(" + DBUtil.stringsToWhereInValue(classuuid) + ")";
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
				+ "(select student_uuid from PxStudentPXClassRelation where class_uuid in("
				+ DBUtil.stringsToWhereInValue(StringUtils.join(listClassuuids, ",")) + ") )" + where_student_name
				+ "  order by student_name,type";

		List list = this.nSimpleHibernateDao.getHibernateTemplate().find(hql);
		warpStudentContactRealationVoList(list);
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

		
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		//学生数量.教学计划数量,课程名,(班级信息)
		String sql = "SELECT count(t2.student_uuid),t1.uuid from  px_pxclass  t1 left join px_pxstudentpxclassrelation t2 on t1.uuid=t2.class_uuid";
				sql+= " where t1.groupuuid ='"+groupuuid+"'";
				sql+=" group by t1.uuid";
				
				
				Query q = s.createSQLQuery(sql);
				List list =q.list();
//						
//		List list = (List) this.nSimpleHibernateDao.getHibernateTemplate()
//				.find("select count(uuid),classuuid from PxStudent  where groupuuid=? group by classuuid)", groupuuid);

		return list;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
