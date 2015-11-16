package com.company.news.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.common.PxStringUtils;
import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.entity.Group4QBaseInfo;
import com.company.news.entity.PClass;
import com.company.news.entity.PxClass;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.statistics.PieSeriesDataVo;
import com.company.news.vo.statistics.PieStatisticsVo;

@Service
public class PxStatisticsService extends AbstractStatisticsService {
	private static final String model_name = "培训机构静态统计模块";

	private static Logger logger = Logger.getLogger(PxStatisticsService.class);
	@Autowired
	private UserinfoService userinfoService;
	@Autowired
	private PxStudentService pxStudentService;
	@Autowired
	private ParentService parentService;
	@Autowired
	private PxClassService pxClassService;

	@Autowired
	private ClassNewsService classNewsService;



	/**
	 * 获取学生性别统计 student sex Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getSssBygroup(ResponseMessage responseMessage,
			String group_uuid) {
		// 验证group合法性
		if (!validateGroup(group_uuid, responseMessage))
			return null;

		logger.debug("begain 用户性别统计");

//		List<PxStudent> list = pxStudentService.getStudentByGroup(group_uuid);
		
		List<Object[]> list = pxStudentService.getStudentSexCountByGroup(group_uuid);
		logger.debug("getUserByGroupuuid 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		
		int sex_male = 0;
		int sex_female = 0;
		
		for (Object[] s : list) {
			if(s[0]==null)continue;
			if (SystemConstants.User_sex_male.toString().equals(s[0].toString()))
				sex_male=Integer.valueOf(s[1].toString());
			else
				sex_female=Integer.valueOf(s[1].toString());
		}
		int total_num=sex_male+sex_female;
		
		// 需要获取机构名
		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
		vo.setTitle_text(g.getBrand_name() + " 学生统计（按性别）");
		vo.setTitle_subtext("总计 " + total_num+ " 人");
				
				
		PieSeriesDataVo male_sdvo = new PieSeriesDataVo();
		male_sdvo.setName("男("+sex_male+")");
		male_sdvo.setValue(sex_male);

		PieSeriesDataVo female_sdvo = new PieSeriesDataVo();
		female_sdvo.setName("女("+sex_female+")");
		female_sdvo.setValue(sex_female);

		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		plist.add(male_sdvo);
		plist.add(female_sdvo);
		vo.setSeries_data(plist);
		
		
		List legend_data = new ArrayList();
		legend_data.add("男("+sex_male+")");
		legend_data.add("女("+sex_female+")");
		vo.setLegend_data(legend_data);
		
		logger.debug("end 用户性别统计");
		return vo;

	}

	/**
	 * 获取班级学生人数统计 class student Statistics 以及 家长人数
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getCssBygroup(ResponseMessage responseMessage,
			String group_uuid) {
		// 验证group合法性
		if (!validateGroup(group_uuid, responseMessage))
			return null;

		logger.debug("begain 班级学生人数统计");

		List<PxClass> list = pxClassService.query(group_uuid);
		logger.debug("classService.query 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
		
		String axis_data = "";
		for (PxClass p : list) {
			axis_data += ("\"" + p.getName() + "\",");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		// 根据机构ID获取班级人数
		List<Object[]> slist = pxStudentService
				.getStudentCountByGroup(group_uuid);
		// 根据机构ID获取家长人数
		List<Object[]> plist = parentService.getPxParentCountByGroup(group_uuid);
		List<PieSeriesDataVo> psdvlist = new ArrayList<PieSeriesDataVo>();
		
		
		int parentCount=0;
		int studentCount=0;
		if (slist != null && slist.size() > 0) {
			// 学生人数
			Map m = new HashMap<String, Integer>();
			for (Object[] o : slist) {
				m.put(o[1], o[0]);
				studentCount+=Integer.valueOf(o[0].toString());
			}
			// 家长人数
			Map pm = new HashMap<String, Integer>();
			for (Object[] o : plist) {
				pm.put(o[1], o[0]);
				parentCount+=Integer.valueOf(o[0].toString());
			}

			String ps_p_data = "";
			String ps_data = "";
			for (PxClass p : list) {
				ps_data += ((m.get(p.getUuid()) == null ? 0 : m
						.get(p.getUuid())) + ",");
				ps_p_data += ((pm.get(p.getUuid()) == null ? 0 : pm.get(p
						.getUuid())) + ",");
			}

			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("班级人数");
			sdvo.setData("[" + PxStringUtils.StringDecComma(ps_data) + "]");

			psdvlist.add(sdvo);

			PieSeriesDataVo sdvo_p = new PieSeriesDataVo();
			sdvo_p.setName("家长人数");
			sdvo_p.setData("[" + PxStringUtils.StringDecComma(ps_p_data) + "]");

			psdvlist.add(sdvo_p);

		}
		vo.setTitle_text(g.getBrand_name() + " 班级学生人数统计");
		vo.setTitle_subtext("总计 " + list.size() + " 班,总学生数"+studentCount+"人,总家长数"+parentCount+"人");
		List legend_data = new ArrayList();
		legend_data.add("学生人数("+studentCount+")");
		legend_data.add("家长人数("+parentCount+")");

		vo.setLegend_data(legend_data);
		
		vo.setSeries_data(psdvlist);
		logger.debug("end 用户性别统计");
		return vo;

	}

	/**
	 * 获取学生年龄段统计 student sex Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getStudentAgeCountBygroup(ResponseMessage responseMessage,
			String group_uuid) {
		// 验证group合法性
//		if (!validateGroup(group_uuid, responseMessage))
//			return null;

		logger.debug("begain 用户年龄段统计");

//		List<PxStudent> list = pxStudentService.getStudentByGroup(group_uuid);
		//age,sum(sex=0),sum(sex=1)
		List<Object[]> list = pxStudentService.getStudentAgeCountByGroup(group_uuid);
		logger.debug("getUserByGroupuuid 查询结束");
		
		
		String axis_data = "";
		
		String sex_male_data = "";
		String sex_female_data = "";
		
		int total_num=0;

		int sex_male = 0;
		int sex_female = 0;
		DecimalFormat decimalFormat=new DecimalFormat("0"); 
		
		
		for(int i=0;i<list.size();i++){
			Object[] p=list.get(i);
			String ages=null;
			Object ageInt=p[0];
			if(p[0]==null){
				ages="未填";
			}else{
				ages=decimalFormat.format(p[0])+"岁";
			}
			axis_data += ("\"" +ages + "\",");
			
			
			sex_male_data +="\"" +p[1] + "\",";
			sex_female_data += "\"" +p[2] + "\",";
			
			sex_male+=Integer.valueOf(p[1].toString());
			sex_female+=Integer.valueOf(p[2].toString());
			
		}
//		for (Object[] p : list) {
//			String ages=null;
//			if(p[0]==null){
//				ages="未填";
//			}else{
//				ages=decimalFormat.format(p[0])+"岁";
//			}
//			if (SystemConstants.User_sex_male.toString().equals(p[1].toString())){
//				
//				ages+="(男)";
//			}
//			else ages+="(女)";
//				
//			axis_data += ("\"" +ages + "\",");
//			sex_male_data += "\"" +p[2] + "\",";
//			if (SystemConstants.User_sex_male.toString().equals(p[1].toString())){
//			
//				sex_male+=Integer.valueOf(p[2].toString());
//			}
//				
//			else{
//				sex_female+=Integer.valueOf(p[2].toString());
//			}
//		}
		total_num+=sex_male+sex_female;
		
		PieStatisticsVo vo = new PieStatisticsVo();
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		
		List<PieSeriesDataVo> psdvlist = new ArrayList<PieSeriesDataVo>();
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("男");
			sdvo.setData("[" + PxStringUtils.StringDecComma(sex_male_data) + "]");

			psdvlist.add(sdvo);

			PieSeriesDataVo sdvo_p = new PieSeriesDataVo();
			sdvo_p.setName("女");
			sdvo_p.setData("[" + PxStringUtils.StringDecComma(sex_female_data) + "]");
			psdvlist.add(sdvo_p);

			vo.setSeries_data(psdvlist);
			
			Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
			
			
		vo.setTitle_text(g.getBrand_name() + " 班级学生人数统计");
		vo.setTitle_subtext("总计 " + total_num + " 人,男"+sex_male+"人,女"+sex_female+"人");
		List legend_data = new ArrayList();
		legend_data.add("男");
		legend_data.add("女");

		vo.setLegend_data(legend_data);
		
		vo.setSeries_data(psdvlist);
		logger.debug("end 用户年龄统计");
		return vo;

	}
	/**
	 * 获取班级互动活跃度（按时间） class news Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getCnsBygroup(ResponseMessage responseMessage,
			String begDateStr, String endDateStr, String group_uuid) {
//		// 验证group合法性
//		if (!validateGroup(group_uuid, responseMessage))
//			return null;

		if (StringUtils.isBlank(begDateStr)) {
			return null;
		}

		if (StringUtils.isBlank(endDateStr)) {
			return null;
		}

		logger.debug("begain 班级互动发帖数统计");

		//uuid,name
		List<Object[]> list = pxClassService.queryForCount(group_uuid,SystemConstants.Class_isdisable_0);
		logger.debug("classService.query 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
	
		String axis_data = "";
		for (Object[] p : list) {
			axis_data += ("\"" + p[1] + "\",");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		// count(uuid),classuuid
		List<Object[]> slist = classNewsService.getClassNewsCollectionByPxGroup(
				group_uuid, begDateStr, endDateStr);
		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		Map m = new HashMap<String, Integer>();
		int totalCount=0;
		if (slist != null && slist.size() > 0) {
			for (Object[] o : slist) {
				m.put(o[1], o[0]);
				totalCount+=Integer.valueOf(o[0].toString());
			}
		}

		String ps_data = "";
		for (Object[] p : list) {
			ps_data += ("\""
					+ m.get(p[0])+ "\",");
		}
		
		vo.setTitle_text(g.getBrand_name() + " 班级互动发帖数统计");
		vo.setTitle_subtext("总计 " + list.size() + " 班,总数量"+totalCount);
		// vo.setLegend_data("[\"互动发帖数\"]");
		List legend_data = new ArrayList();
		legend_data.add("互动发帖数");
		vo.setLegend_data(legend_data);
		
		
		PieSeriesDataVo sdvo = new PieSeriesDataVo();
		sdvo.setName("互动发帖数");
		sdvo.setData("[" + PxStringUtils.StringDecComma(ps_data) + "]");

		plist.add(sdvo);

		vo.setSeries_data(plist);
		logger.debug("end 互动发帖数统计");
		return vo;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return PxStatisticsService.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
