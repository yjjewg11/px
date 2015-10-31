package com.company.news.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.common.PxStringUtils;
import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.PxClass;
import com.company.news.entity.PxStudent;
import com.company.news.entity.Student;
import com.company.news.entity.User;
import com.company.news.entity.User4Q;
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

		List<PxStudent> list = pxStudentService.getStudentByGroup(group_uuid);
		logger.debug("getUserByGroupuuid 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
		vo.setTitle_text(g.getCompany_name() + " 学生统计（按性别）");
		vo.setTitle_subtext("总计 " + list.size() + " 人");
		List legend_data = new ArrayList();
		legend_data.add("男");
		legend_data.add("女");
		vo.setLegend_data(legend_data);
		int sex_male = 0;
		int sex_female = 0;

		for (PxStudent s : list) {
			if (s.getSex().intValue() == SystemConstants.User_sex_male
					.intValue())
				sex_male++;
			else
				sex_female++;
		}

		PieSeriesDataVo male_sdvo = new PieSeriesDataVo();
		male_sdvo.setName("男");
		male_sdvo.setValue(sex_male);

		PieSeriesDataVo female_sdvo = new PieSeriesDataVo();
		female_sdvo.setName("女");
		female_sdvo.setValue(sex_female);

		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		plist.add(male_sdvo);
		plist.add(female_sdvo);
		vo.setSeries_data(plist);
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
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
		
		String axis_data = "";
		for (PxClass p : list) {
			axis_data += ("'" + p.getName() + "',");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		// 根据机构ID获取班级人数
		List<Object[]> slist = pxStudentService
				.getStudentCountByGroup(group_uuid);
		// 根据机构ID获取家长人数
		List<Object[]> plist = parentService.getParentCountByGroup(group_uuid);
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
		vo.setTitle_text(g.getCompany_name() + " 班级学生人数统计");
		vo.setTitle_subtext("总计 " + list.size() + " 班,总学生数"+studentCount+"人,总家长数"+parentCount+"人");
		List legend_data = new ArrayList();
		legend_data.add("学生人数("+studentCount+")");
		legend_data.add("家长人数("+parentCount+")");

		vo.setLegend_data(legend_data);
		
		vo.setSeries_data(psdvlist);
		logger.debug("end 用户性别统计");
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