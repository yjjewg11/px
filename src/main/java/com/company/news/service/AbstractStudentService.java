package com.company.news.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.AbstractStudent;
import com.company.news.entity.AbstractStudentContactRealation;
import com.company.news.entity.Parent;
import com.company.news.entity.PxStudent;
import com.company.news.entity.PxStudentContactRealation;
import com.company.news.entity.StudentContactRealation;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.right.RightUtils;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

public class AbstractStudentService extends AbstractService {
	@Autowired
	private UserinfoService userinfoService;

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
	
	public boolean isHasRightToDo(AbstractStudent student, ResponseMessage responseMessage, HttpServletRequest request){
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
	protected void updateAllStudentContactRealationByStudent(AbstractStudent student) throws Exception {
		// 添加学生关联联系人表
		this.updateStudentContactRealation(student,
				SystemConstants.USER_type_ba, student.getBa_tel());
		this.updateStudentContactRealation(student,
				SystemConstants.USER_type_ma, student.getMa_tel());
		this.updateStudentContactRealation(student,
				SystemConstants.USER_type_ye, student.getYe_tel());
		this.updateStudentContactRealation(student,
				SystemConstants.USER_type_nai, student.getNai_tel());
		this.updateStudentContactRealation(student,
				SystemConstants.USER_type_waigong, student.getWaigong_tel());
		this.updateStudentContactRealation(student,
				SystemConstants.USER_type_waipo, student.getWaipo_tel());
		this.updateStudentContactRealation(student,
				SystemConstants.USER_type_other, student.getOther_tel());

	}

	/**
	 * 保存学生资料时,更新学生关联家长的手机表 1.根据注册手机,绑定和学生的关联关心. 2.更新孩子数据时,也会自动绑定学生和家长的数据.
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	private AbstractStudentContactRealation updateStudentContactRealation(
			AbstractStudent student, Integer type, String tel) throws Exception {
		
		
		
		tel=PxStringUtil.repairCellphone(tel);
		
		List<AbstractStudentContactRealation> list= this
				.getStudentContactRealationListBy(student, type);
		
		AbstractStudentContactRealation studentContactRealation=null;
		if(list.size()>0){
			studentContactRealation=(AbstractStudentContactRealation)list.get(0);
			
			//删除多余关联关心
			for(int i=1;i<list.size();i++){
				nSimpleHibernateDao.delete(list.get(i));
			}
		}
		
//		AbstractStudentContactRealation studentContactRealation = this
//				.getStudentContactRealationBy(student, type);
		
		//默认需要更新关系表
		boolean isUpdateStudentContactRealation=true; 
		if (studentContactRealation == null) {// 不存在,则新建.
			if (!CommonsValidate.checkCellphone(tel))
				return null;
			
			if(student instanceof PxStudent){
				studentContactRealation = new PxStudentContactRealation();
			}else{
				studentContactRealation = new StudentContactRealation();
			}
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_0);
		} else {
			// 验证失败则,表示删除关联关系.
			if (!CommonsValidate.checkCellphone(tel)) {
				nSimpleHibernateDao.delete(studentContactRealation);
				return null;
			}
			// 一样则表示不变,直接返回.
			if (tel.equals(studentContactRealation.getTel())
					&&student.getClassuuid().equals(studentContactRealation.getClass_uuid())
					&& student.getName().equals(
							studentContactRealation.getStudent_name())) {
				isUpdateStudentContactRealation=false;
				
//				return studentContactRealation;
			}
		}
		
		if(isUpdateStudentContactRealation){
			studentContactRealation.setStudent_uuid(student.getUuid());
			studentContactRealation.setStudent_name(student.getName());
		
			studentContactRealation.setGroupuuid(student.getGroupuuid());

			studentContactRealation.setTel(tel);
			studentContactRealation.setType(type);
			studentContactRealation.setUpdate_time(TimeUtils.getCurrentTimestamp());

			studentContactRealation.setClass_uuid(student.getClassuuid());
			studentContactRealation.setStudent_img(student.getHeadimg());
			
			

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
			
			
			
		}
		

		Parent parent = (Parent) nSimpleHibernateDao.getObjectByAttribute(
				Parent.class, "loginname", tel);
		// 判断电话,是否已经注册,来设置状态.
		if (parent != null) {
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_1);
			studentContactRealation.setParent_uuid(parent.getUuid());
			isUpdateStudentContactRealation=true;
		} else {
			studentContactRealation.setIsreg(SystemConstants.USER_isreg_0);
			studentContactRealation.setParent_uuid(null);
		}


		// 更新家长姓名和头像.多个孩子已最后保存为准
		if (parent != null) {
			String newParentName = PxStringUtil
					.getParentNameByStudentContactRealation(studentContactRealation);
			boolean needUpdateParent=false;
			if (parent.getImg() == null
					|| !parent.getImg().equals(student.getHeadimg())) {
				needUpdateParent=true;
				parent.setImg(student.getHeadimg());
			}
			if (newParentName != null
					&& !newParentName.equals(parent.getName())) {
				parent.setName(newParentName);
				needUpdateParent=true;
				
			}
			//是否更新
			if(needUpdateParent){
				nSimpleHibernateDao.save(parent);
				userinfoService
				.relUpdate_updateSessionUserInfoInterface(parent);
			}
			
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
	private AbstractStudentContactRealation getStudentContactRealationBy(
			AbstractStudent student, Integer type) {
		String hqlTableName="StudentContactRealation";
		if(student instanceof PxStudent){
			hqlTableName="PxStudentContactRealation";
		}
		List<AbstractStudentContactRealation> list = (List<AbstractStudentContactRealation>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from "+hqlTableName+" where student_uuid=? and type=?",
						student.getUuid(), type);
		if (list.size() > 0) {
			return (AbstractStudentContactRealation) list.get(0);
		}
		return null;
	}
	/**
	 * 获取
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	private List<AbstractStudentContactRealation> getStudentContactRealationListBy(
			AbstractStudent student, Integer type) {
		String hqlTableName="StudentContactRealation";
		if(student instanceof PxStudent){
			hqlTableName="PxStudentContactRealation";
		}
		List<AbstractStudentContactRealation> list = (List<AbstractStudentContactRealation>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from "+hqlTableName+" where student_uuid=? and type=?",
						student.getUuid(), type);
	
		return list;
	}
	/**
	 * 获取
	 * 
	 * @param tel
	 * @param type
	 * @return
	 */
	private StudentContactRealation getStudentContactRealationBy(
			String student_uuid, Integer type) {
		List<StudentContactRealation> list = (List<StudentContactRealation>) this.nSimpleHibernateDao
				.getHibernateTemplate()
				.find("from StudentContactRealation where student_uuid=? and type=?",
						student_uuid, type);
		if (list.size() > 0) {
			return (StudentContactRealation) list.get(0);
		}
		return null;
	}

	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	protected AbstractStudent warpVo(AbstractStudent o) {
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
	protected List<AbstractStudent> warpVoList(List<AbstractStudent> list) {
		for (AbstractStudent o : list) {
			warpVo(o);
		}
		return list;
	}
	
	/**
	 * vo输出转换
	 * 
	 * @param list
	 * @return
	 */
	private AbstractStudentContactRealation warpStudentContactRealationVo(AbstractStudentContactRealation o) {
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
	protected List<AbstractStudentContactRealation> warpStudentContactRealationVoList(List<AbstractStudentContactRealation> list) {
		for (AbstractStudentContactRealation o : list) {
			warpStudentContactRealationVo(o);
		}
		return list;
	}
	
	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return AbstractStudentService.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return null;
	}

}
