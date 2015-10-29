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
import com.company.news.entity.Student;
import com.company.news.entity.User;
import com.company.news.entity.User4Q;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.statistics.PieSeriesDataVo;
import com.company.news.vo.statistics.PieStatisticsVo;

@Service
public class StatisticsService extends AbstractStatisticsService {
	private static final String model_name = "静态统计模块";

	private static Logger logger = Logger.getLogger(StatisticsService.class);


	@Autowired
	private UserinfoService userinfoService;
	@Autowired
	private StudentService studentService;
	@Autowired
	private ParentService parentService;
	@Autowired
	private ClassService classService;
	@Autowired
	private ClassNewsService classNewsService;
	@Autowired
	private TeachingJudgeService teachingJudgeService;



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

		List<Student> list = studentService.getStudentByGroup(group_uuid);
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

		for (Student s : list) {
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

		List<PClass> list = classService.query(group_uuid);
		logger.debug("classService.query 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
		
		String axis_data = "";
		for (PClass p : list) {
			axis_data += ("'" + p.getName() + "',");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		// 根据机构ID获取班级人数
		List<Object[]> slist = studentService
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
			for (PClass p : list) {
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

	/**
	 * 获取班级互动活跃度（按时间） class news Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getCnsBygroup(ResponseMessage responseMessage,
			String begDateStr, String endDateStr, String group_uuid) {
		// 验证group合法性
		if (!validateGroup(group_uuid, responseMessage))
			return null;

		if (StringUtils.isBlank(begDateStr)) {
			return null;
		}

		if (StringUtils.isBlank(endDateStr)) {
			return null;
		}

		logger.debug("begain 班级互动发帖数统计");

		List<PClass> list = classService.query(group_uuid);
		logger.debug("classService.query 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
	
		String axis_data = "";
		for (PClass p : list) {
			axis_data += ("'" + p.getName() + "',");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		// 根据机构ID获取班级人数
		List<Object[]> slist = classNewsService.getClassNewsCollectionByGroup(
				group_uuid, begDateStr, endDateStr);
		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		Map m = new HashMap<String, Integer>();
		int parentCount=0;
		if (slist != null && slist.size() > 0) {
			for (Object[] o : slist) {
				m.put(o[1], o[0]);
				parentCount+=Integer.valueOf(o[0].toString());
			}
		}

		String ps_data = "";
		for (PClass p : list) {
			ps_data += ("'"
					+ (m.get(p.getUuid()) == null ? 0 : m.get(p.getUuid())) + "',");
		}
		
		vo.setTitle_text(g.getCompany_name() + " 班级互动发帖数统计");
		vo.setTitle_subtext("总计 " + list.size() + " 班,总数量"+parentCount);
		// vo.setLegend_data("['互动发帖数']");
		List legend_data = new ArrayList();
		legend_data.add("互动发帖数("+parentCount+")");
		vo.setLegend_data(legend_data);
		
		
		PieSeriesDataVo sdvo = new PieSeriesDataVo();
		sdvo.setName("互动发帖数");
		sdvo.setData("[" + PxStringUtils.StringDecComma(ps_data) + "]");

		plist.add(sdvo);

		vo.setSeries_data(plist);
		logger.debug("end 互动发帖数统计");
		return vo;

	}

	/**
	 * 获取班级互动点击排行（按时间） class news top Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getCntsBygroup(ResponseMessage responseMessage,
			String begDateStr, String endDateStr, String group_uuid) {
		// 验证group合法性
		if (!validateGroup(group_uuid, responseMessage))
			return null;

		if (StringUtils.isBlank(begDateStr)) {
			return null;
		}

		if (StringUtils.isBlank(endDateStr)) {
			return null;
		}

		logger.debug("begain 班级互动热门TOP10");

		List<Object[]> list = classNewsService.getClassNewsCountByGroup(
				group_uuid, begDateStr, endDateStr);
		logger.debug("classService.query 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
		vo.setTitle_text(g.getCompany_name() + " 班级互动热门TOP10");
		vo.setTitle_subtext("总计 " + list.size() + " 条");
		// vo.setLegend_data("['班级互动热门TOP10']");
		List legend_data = new ArrayList();
		legend_data.add("班级互动热门TOP10");
		vo.setLegend_data(legend_data);
		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		if (list != null && list.size() > 0) {
			for (Object[] o : list) {
				PieSeriesDataVo sdvo = new PieSeriesDataVo();
				sdvo.setName((String) o[2]);
				sdvo.setData((String) o[1]);
				sdvo.setValue((Integer) o[0]);

				plist.add(sdvo);
			}

		}

		vo.setSeries_data(plist);
		logger.debug("end 互动发帖数统计");
		return vo;

	}

	/**
	 * 获取教师评价统计
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getTjsBygroup(ResponseMessage responseMessage,
			String begDateStr, String endDateStr, String group_uuid) {
		// 验证group合法性
		if (!validateGroup(group_uuid, responseMessage))
			return null;

		if (StringUtils.isBlank(begDateStr)) {
			return null;
		}

		if (StringUtils.isBlank(endDateStr)) {
			return null;
		}

		logger.debug("begain 教师评价统计");
		// 获取机构的所有用户
		List<User4Q> userlist = userinfoService.getUserByGroupuuid(group_uuid,
				null);

		List<Object[]> list = teachingJudgeService
				.getTeachingJudgeCountByGroup(group_uuid, begDateStr,
						endDateStr);
		logger.debug("TeachingJudge.query 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
		vo.setTitle_text(g.getCompany_name() + " 教师评价统计");
		vo.setTitle_subtext("总计 " + list.size() + " 条");
		// vo.setLegend_data("['班级互动热门TOP10']");
		List legend_data = new ArrayList();
		legend_data.add("非常满意");
		legend_data.add("满意");
		legend_data.add("一般");
		vo.setLegend_data(legend_data);

		String axis_data = "";
		for (User4Q u : userlist) {
			axis_data += ("'" + u.getName() + "',");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		if (list != null && list.size() > 0) {
			Map type1 = new HashMap();
			Map type2 = new HashMap();
			Map type3 = new HashMap();

			for (Object[] o : list) {
				if (o[1] != null) {
					if (o[1].toString().equals("1"))
						type1.put(o[0], o[2]);
					else if (o[1].toString().equals("2"))
						type2.put(o[0], o[2]);
					else if (o[1].toString().equals("3"))
						type3.put(o[0], o[2]);
				}
			}

			String ps_1_data = "";
			String ps_2_data = "";
			String ps_3_data = "";
			for (User4Q u : userlist) {
				ps_1_data += ((type1.get(u.getUuid()) == null ? 0 : type1.get(u
						.getUuid())) + ",");
				ps_2_data += ((type2.get(u.getUuid()) == null ? 0 : type2.get(u
						.getUuid())) + ",");
				ps_3_data += ((type3.get(u.getUuid()) == null ? 0 : type3.get(u
						.getUuid())) + ",");
			}

			PieSeriesDataVo sdvo_1 = new PieSeriesDataVo();
			sdvo_1.setName("非常满意");
			sdvo_1.setData("[" + PxStringUtils.StringDecComma(ps_3_data) + "]");

			plist.add(sdvo_1);

			PieSeriesDataVo sdvo_2 = new PieSeriesDataVo();
			sdvo_2.setName("满意");
			sdvo_2.setData("[" + PxStringUtils.StringDecComma(ps_2_data) + "]");

			plist.add(sdvo_2);

			PieSeriesDataVo sdvo_3 = new PieSeriesDataVo();
			sdvo_3.setName("一般");
			sdvo_3.setData("[" + PxStringUtils.StringDecComma(ps_1_data) + "]");

			plist.add(sdvo_3);
		}

		vo.setSeries_data(plist);
		logger.debug("end 教师评价统计");
		return vo;

	}

	/**
	 * 获取精品文章活跃度（按时间） jpwz Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public boolean getJpwzsBygroup(ResponseMessage responseMessage) {
		return false;

	}

	/**
	 * 获取精品文章点击排行（按时间） class news top Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public boolean getJpwsBygroup(ResponseMessage responseMessage) {
		return false;

	}



	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return StatisticsService.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
