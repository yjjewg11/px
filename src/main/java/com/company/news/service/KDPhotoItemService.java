package com.company.news.service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import sun.misc.BASE64Decoder;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.cache.UserCache;
import com.company.news.cache.redis.UserRedisCache;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.commons.util.UUIDGenerator;
import com.company.news.commons.util.UploadFileUtils;
import com.company.news.commons.util.upload.DiskIUploadFile;
import com.company.news.commons.util.upload.IUploadFile;
import com.company.news.commons.util.upload.OssIUploadFile;
import com.company.news.entity.FPPhotoItemOfUpdate;
import com.company.news.entity.KDPhotoItem;
import com.company.news.entity.UploadFile;
import com.company.news.form.KDPhotoItemForm;
import com.company.news.interfaces.SessionUserInfoInterface;
import com.company.news.jsonform.FPPhotoItemJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.DBUtil;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class KDPhotoItemService extends AbstractService {
	private static IUploadFile iUploadFile;
	
	public static final String uploadfiletype = ProjectProperties.getProperty(
			"uploadfiletype", "oss");
	
	static {
		if (uploadfiletype.equals("oss"))
			iUploadFile = new OssIUploadFile();
		else
			iUploadFile = new DiskIUploadFile();
	}

	
	String Selectsql=" SELECT t1.uuid,t1.class_uuid,t1.label,t1.photo_time,t1.create_useruuid,t1.path,t1.address,t1.note,t1.phone_type,t1.create_time";
	String SqlFrom=" FROM kd_photo_item t1 ";


	/**
	 * 查询所有通知
	 * 
	 * @return
	 */
	public PageQueryResult query(SessionUserInfoInterface user ,String groupuuid,String class_uuid, String label,String user_uuid,PaginationData pData) {
		String selectsql=Selectsql;
		String sql=SqlFrom+" where 1=1 ";
		
		 if (StringUtils.isNotBlank(groupuuid)) {//根据学校uuid查询
			sql += " and   t1.group_uuid ='"+DBUtil.safeToWhereString(groupuuid)+"'";
		}
		
		 if (StringUtils.isNotBlank(class_uuid)) {//根据班级uuid查询
			sql += " and   t1.class_uuid ='"+DBUtil.safeToWhereString(class_uuid)+"'";
		}
		 
		 if (StringUtils.isNotBlank(label)) {//根据标签查询
			sql += " and   t1.label ='"+DBUtil.safeToWhereString(label)+"'";
		}
		////使用创建时间做分页显示,beforeTime 取 2016-01-15 13:13 之前的数据.按照创建时间排倒序
		 if(StringUtils.isNotBlank(pData.getMaxTime())){
				pData.setPageNo(1);
				sql += " and   t1.create_time <"+DBUtil.queryDateStringToDateByDBType(pData.getMaxTime());
				
				  sql += " order by t1.create_time asc";
		}else if(StringUtils.isNotBlank(pData.getMinTime())){
				pData.setPageNo(1);
				sql += " and   t1.create_time >"+DBUtil.queryDateStringToDateByDBType(pData.getMinTime());
				
				  sql += " order by t1.create_time desc";
		}else{//默认查询,当前时间倒叙
			  sql += " order by t1.create_time desc";
		}
		Query  query =this.nSimpleHibernateDao.createSQLQuery(selectsql+sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		String countsql="select count(*) "+sql;
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForQueryTotal(query,countsql, pData);
		List<Map> list=pageQueryResult.getData();
		this.warpMapList(list, user);
		return pageQueryResult;
	}
	

	/**
	 * 查询收藏的
	 * 
	 * @return
	 */
	public PageQueryResult queryMyFavorites(SessionUserInfoInterface user,PaginationData pData) {
		String selectsql=Selectsql;
		String sql=" FROM kd_photo_item t1  left join fp_photo_favorite f2 on  t1.uuid=f2.rel_uuid";
		sql += " where   f2.create_useruuid ='"+user.getUuid()+"'";
		 sql += " order by t1.create_time desc";
		Query  query =this.nSimpleHibernateDao.createSqlQuery(selectsql+sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		String countsql="select count(*) "+sql;
	    PageQueryResult pageQueryResult = this.nSimpleHibernateDao.findByPageForQueryTotal(query,sql, pData);
		List<Map> list=pageQueryResult.getData();
		this.warpMapList(list, user);
		return pageQueryResult;
	}

	/**
	 * 增加
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean addFavorites(SessionUserInfoInterface user,String uuid,
			ResponseMessage responseMessage) throws Exception {
		
		if (StringUtils.isBlank(uuid)) {
			responseMessage.setMessage("uuid必填");
			return false;
		}
		
		
		String insertsql="insert into fp_photo_favorite(rel_uuid,create_useruuid,create_time) values('"+uuid+"','"+user.getUuid()+"',now())";
		try {
			this.nSimpleHibernateDao.createSQLQuery(insertsql).executeUpdate();
		} catch (org.hibernate.exception.ConstraintViolationException e) {
			responseMessage.setMessage("你已收藏!");
			return false;
		}

		return true;
	}

	/**
	 * 是否可以收藏
	 * 
	 * @param loginname
	 * @return
	 */
	public boolean isFavorites(String user_uuid,String reluuid) {
		if(StringUtils.isBlank(reluuid)||StringUtils.isBlank(user_uuid))return false;
		List list = nSimpleHibernateDao.createSQLQuery("select rel_uuid from fp_photo_favorite where rel_uuid='"+reluuid+"' and create_useruuid='"+user_uuid+"'").list();

		if (list != null&&list.size()>0)// 已被占用
			return false;
		else
			return true;

	}
	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean deleteFavorites(SessionUserInfoInterface parent,String rel_uuid, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(rel_uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}
		
		//rel_uuid,create_useruuid
		String insertsql="delete from fp_photo_favorite where rel_uuid='"+rel_uuid+"' and create_useruuid='"+parent.getUuid()+"'";
		int count=this.nSimpleHibernateDao.createSqlQuery(insertsql).executeUpdate();
		
		
		
		if(count>0)
			return true;
		responseMessage.setMessage("无数据");
		return false;
	}

	
	private void warpMap(Map o, SessionUserInfoInterface user) {
		try {
			o.put("path", PxStringUtil.imgUrlByRelativePath_sub((String)o.get("path"),"108h"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * vo输出转换
	 * @param list
	 * @return
	 */
	private List warpMapList(List<Map> list,SessionUserInfoInterface user ) {
		
//		String uuids="";
		for(Map o:list){
			warpMap(o,user);
//			uuids+=o.get("uuid")+",";
		}
		UserRedisCache.warpListMapByUserCache(list, "create_useruuid", "create_user", null);
//		try {
//			countService.getIncrCountByExt_uuids(uuids);
//			Map dianZanMap=classNewsReplyService.getDianzanDianzanMap(uuids, user);
//			for(Map o:list){
////				o.put("count", countMap.get(o.get("uuid")));
//				Object vo= (Object)dianZanMap.get(o.get("uuid"));
//				if(vo==null)vo= new DianzanListVO();
//				o.put("dianzan",vo);
//			}
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		return list;
	}
	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 * @throws Exception 
	 */
	public boolean delete(HttpServletRequest request,String uuid, ResponseMessage responseMessage) throws Exception {
		
		
		SessionUserInfoInterface user = SessionListener.getUserInfoBySession(request);
		//防止sql注入.
		if(DBUtil.isSqlInjection(uuid,responseMessage))return false;
		
		KDPhotoItem dbobj = (KDPhotoItem) this.nSimpleHibernateDao.getObjectById(
				KDPhotoItem.class, uuid);
		
		if(!user.getUuid().equals(dbobj.getCreate_useruuid())){
			responseMessage.setMessage("只有创建人,才能删除");
			return false;
		}
		
		//需要删除相关表. 
		//need_code
		iUploadFile.deleteFile(dbobj.getPath());
		

		this.nSimpleHibernateDao.delete(dbobj);
		return true;
	}

	/**
	 * 获取状态
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public Map getStatus(String uuid) throws Exception {
		
		String sqlFrom="select t1.status "+SqlFrom;
		sqlFrom += " where   t1.uuid ='"+uuid+"'";
		
		List<Map>  list =nSimpleHibernateDao.queryMapBySql(sqlFrom);
		 Map  map=null;
		if(list.size()>0){
			   map=list.get(0);
		}
		return map;
	}
	/**
	 * 
	 * @param uuid
	 * @return
	 * @throws Exception
	 */
	public Map get(String uuid) throws Exception {
		
		String sqlFrom=Selectsql+" ,t1.status "+SqlFrom;
		sqlFrom += " where   t1.uuid ='"+uuid+"'";
		
		List<Map>  list =nSimpleHibernateDao.queryMapBySql(sqlFrom);
		 Map  map=null;
		if(list.size()>0){
			   map=list.get(0);
			 
			 warpMap(map, null);
			 UserCache user=UserRedisCache.getUserCache("create_useruuid");
			 if(user!=null)map.put("create_user", user.getN());
		}

		return map;
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 上载附件
	 * 
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 *             base64='data:image/png;base64,iVBORw0KG...'
	 */
	public KDPhotoItem uploadImg(KDPhotoItemForm form,String base64, 
			ResponseMessage responseMessage, HttpServletRequest request,
			SessionUserInfoInterface user) throws Exception {
		String contentType = null;
		if (StringUtils.isEmpty(base64)) {
			responseMessage.setMessage("上传内容是空的！");
			return null;
		}
		
		byte[] b = null;
		if (base64 != null) {
			try {
				String tmpbase64 = base64.substring(base64.indexOf(";base64,")
						+ ";base64,".length());
				contentType = base64.substring("data:".length(),
						base64.indexOf(";base64,"));
				// extension=contentType.substring("image/".length());
	
				BASE64Decoder decoder = new BASE64Decoder();
				
				b = decoder.decodeBuffer(tmpbase64);
			} catch (Exception e) {
				e.printStackTrace();
				responseMessage.setMessage("解析错误：" + e.getMessage());
				return null;
			}
		}

		// 过滤文件大小等
		if (!UploadFileUtils.fileFilter(responseMessage, b.length)) {
			return null;
		}


		KDPhotoItem uploadFile = new KDPhotoItem();

		
		BeanUtils.copyProperties(uploadFile, form);
		
		uploadFile.setFile_size(Long.valueOf(b.length));
		uploadFile.setCreate_useruuid(user.getUuid());
		uploadFile.setCreate_time(TimeUtils.getCurrentTimestamp());
		uploadFile.setUpdate_time(TimeUtils.getCurrentTimestamp());
		uploadFile.setPhoto_time(TimeUtils.string2Timestamp(TimeUtils.DEFAULTFORMAT, form.getPhoto_time()));

			
		if(uploadFile.getPhoto_time()==null){//如果上传拍照时间,不正确或为null,则设置为拍照时间.
			uploadFile.setPhoto_time(uploadFile.getCreate_time());
		}
		this.nSimpleHibernateDao.getHibernateTemplate().save(uploadFile);
		
		//2016/uuid.png
		
		String filePath ="fp/"+TimeUtils.getCurrentTime("yyyy")+"/"+uploadFile.getUuid()+".png";
		
		uploadFile.setPath(filePath);
		
		
		
		InputStream  imgInputStream=new ByteArrayInputStream(b);
		String groupuuid=request.getParameter("groupuuid");
		
	
		// 上传文件
		if (iUploadFile.uploadFile(imgInputStream, filePath, 0)) {
		
			return uploadFile;
		} else {
			responseMessage.setMessage("上传文件失败");
			return null;
		}
	}
	public KDPhotoItem uploadImg(KDPhotoItemForm form, CommonsMultipartFile file,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		SessionUserInfoInterface user=SessionListener.getUserInfoBySession(request);
		// 过滤文件大小等
		if (!UploadFileUtils.fileFilter(responseMessage, file.getSize())) {
			return null;
		}
		
		String extension=FilenameUtils.getExtension(file.getOriginalFilename());
		if(this.validateRequireByRegJsonform(form.getGroup_uuid(), "学校", responseMessage))
		{
			return null;
		}
	
		
		KDPhotoItem uploadFile = new KDPhotoItem();

		
		BeanUtils.copyProperties(uploadFile, form);
		
		uploadFile.setFile_size(Long.valueOf(file.getSize()));
		uploadFile.setCreate_useruuid(user.getUuid());
		uploadFile.setCreate_time(TimeUtils.getCurrentTimestamp());
		uploadFile.setUpdate_time(TimeUtils.getCurrentTimestamp());
		uploadFile.setPhoto_time(TimeUtils.string2Timestamp(TimeUtils.DEFAULTFORMAT, form.getPhoto_time()));
//		uploadFile.setAddress(form.getAddress());
//		uploadFile.setNote(form.getNote());
//		uploadFile.setFamily_uuid(form.getFamily_uuid());
//		uploadFile.setMd5(form.getMd5());
			
		if(uploadFile.getPhoto_time()==null){//如果上传拍照时间,不正确或为null,则设置为拍照时间.
			uploadFile.setPhoto_time(uploadFile.getCreate_time());
		}
		this.nSimpleHibernateDao.getHibernateTemplate().save(uploadFile);
		
		//2016/uuid.png
		
		String filePath ="fp/"+TimeUtils.getCurrentTime("yyyy")+"/"+uploadFile.getUuid()+"."+extension;
		
		uploadFile.setPath(filePath);

		// 上传文件
		if (iUploadFile.uploadFile(file.getInputStream(), filePath, null)) {
			return uploadFile;
		} else {
			responseMessage.setMessage("上传文件失败");
			return null;
		}
	}

	public boolean update(FPPhotoItemJsonform jsonform,
			ResponseMessage responseMessage, HttpServletRequest request) throws Exception {
		if (StringUtils.isBlank(jsonform.getUuid())) {
			responseMessage.setMessage("uuid 不能为空!");
			return false;
		}

		FPPhotoItemOfUpdate obj = (FPPhotoItemOfUpdate) nSimpleHibernateDao.getObject(FPPhotoItemOfUpdate.class,
				jsonform.getUuid());
		
		if(obj==null){
			responseMessage.setMessage("数据不存在.uuid ="+jsonform.getUuid());
			return false;
		}
		obj.setUpdate_time(TimeUtils.getCurrentTimestamp());
		obj.setNote(jsonform.getNote());
		obj.setAddress(jsonform.getAddress());
		obj.setStatus(SystemConstants.FPPhotoItem_Status_update);
		
		this.nSimpleHibernateDao.save(obj);
		return true;
	}
	

	/**
	 * 查询所有通知
	 * 
	 * @return
	 */
	public List queryLabel(SessionUserInfoInterface user ,String group_uuid,String class_uuid) {
		//String selectsql=Selectsql;
		String sql="SELECT DISTINCT label FROM kd_photo_item t1 where 1=1 ";
		
		 if (StringUtils.isNotBlank(group_uuid)) {//根据学校uuid查询
			sql += " and   t1.group_uuid ='"+DBUtil.safeToWhereString(group_uuid)+"'";
		}
		
		 if (StringUtils.isNotBlank(class_uuid)) {//根据班级uuid查询
			sql += " and   t1.class_uuid ='"+DBUtil.safeToWhereString(class_uuid)+"'";
		}
		 sql += " order by t1.label desc";

		Query  query =this.nSimpleHibernateDao.createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
            return query.list();
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
