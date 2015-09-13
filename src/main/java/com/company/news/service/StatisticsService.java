package com.company.news.service;

import java.util.ArrayList;
import java.util.Date;
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
import com.company.news.entity.Group;
import com.company.news.entity.PClass;
import com.company.news.entity.Student;
import com.company.news.entity.User4Q;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.statistics.PieSeriesDataVo;
import com.company.news.vo.statistics.PieStatisticsVo;

@Service
public class StatisticsService extends AbstractService {
	private static final String model_name = "静态统计模块";
	
	private static Logger logger = Logger.getLogger(StatisticsService.class);
	private final static long threeDay = 3 * 24 * 60 * 60 * 1000;// 3天
	private final static long oneWeek = 7 * 24 * 60 * 60 * 1000;// 一周

	@Autowired
	private UserinfoService userinfoService;
	@Autowired
	private StudentService studentService;
	@Autowired
	private ClassService classService;
	@Autowired
	private ClassNewsService classNewsService;
	/**
	 * 获取用户性别统计 user sex Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getUssBygroup(ResponseMessage responseMessage,
			String group_uuid) {
		// 验证group合法性
		if (!validateGroup(group_uuid, responseMessage))
			return null;

		logger.debug("begain 用户性别统计");

		List<User4Q> list = userinfoService
				.getUserByGroupuuid(group_uuid, null);
		logger.debug("getUserByGroupuuid 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
		vo.setTitle_text(g.getCompany_name() + " 教师统计（按性别）");
		vo.setTitle_subtext("总计 " + list.size() + " 人");
		List legend_data=new ArrayList();
		legend_data.add("男");
		legend_data.add("女");
		vo.setLegend_data(legend_data);
//		vo.setLegend_data("['男','女']");
		int sex_male = 0;
		int sex_female = 0;

		for (User4Q u : list) {
			if (u.getSex().intValue() == SystemConstants.User_sex_male
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
	 * 获取用户登陆时间统计 user logintime Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getUlsBygroup(ResponseMessage responseMessage,
			String group_uuid) {
		// 验证group合法性
		if (!validateGroup(group_uuid, responseMessage))
			return null;

		logger.debug("begain 用户登陆时间统计");

		List<User4Q> list = userinfoService
				.getUserByGroupuuid(group_uuid, null);
		logger.debug("getUserByGroupuuid 查询结束");

		Map<String, Integer> map = partitionLoginTime(list);
		logger.debug("partitionLoginTime 结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		int count = list.size();
		int lessthreeDay = (map.get("lessthreeDay") * 100) / count;
		int lessOneWeek = (map.get("lessOneWeek") * 100) / count;
		int greaterOneWeek = (map.get("greaterOneWeek") * 100) / count;
		// 需要获取机构名
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
		vo.setTitle_text(g.getCompany_name() + " 教师统计（按登陆时间）");
		vo.setTitle_subtext("总计 " + count + " 人");
		List legend_data=new ArrayList();
		legend_data.add(lessthreeDay + "%的用户在3天内登陆过");
		legend_data.add(lessOneWeek + "%的用户在1周内登陆过");
		legend_data.add(greaterOneWeek + "%的用户在更早前");
		vo.setLegend_data(legend_data);
//		
//		vo.setLegend_data("['" + lessthreeDay + "%的用户在3天内登陆过'" + ",'"
//				+ lessOneWeek + "%的用户在1周内登陆过','" + greaterOneWeek
//				+ "%的用户在更早前']");

		PieSeriesDataVo lessthreeDayVo = new PieSeriesDataVo();
		lessthreeDayVo.setName(lessthreeDay + "%的用户在3天内登陆过");
		lessthreeDayVo.setValue(lessthreeDay);

		PieSeriesDataVo lessOneWeekVo = new PieSeriesDataVo();
		lessOneWeekVo.setName(lessOneWeek + "%的用户在1周内登陆过");
		lessOneWeekVo.setValue(lessOneWeek);

		PieSeriesDataVo greaterOneWeekVo = new PieSeriesDataVo();
		greaterOneWeekVo.setName(greaterOneWeek + "%的用户在更早前");
		greaterOneWeekVo.setValue(greaterOneWeek);

		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		plist.add(lessthreeDayVo);
		plist.add(lessOneWeekVo);
		plist.add(greaterOneWeekVo);
		vo.setSeries_data(plist);
		logger.debug("end 用户登陆时间统计");
		return vo;

	}

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
		List legend_data=new ArrayList();
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
	 * 获取班级学生人数统计 class student Statistics
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
		vo.setTitle_text(g.getCompany_name() + " 班级学生人数统计");
		vo.setTitle_subtext("总计 " + list.size() + " 班");
		List legend_data=new ArrayList();
		legend_data.add("班级人数");
		vo.setLegend_data(legend_data);
		String axis_data = "";
		for (PClass p : list) {
			axis_data += ("'" + p.getName() + "',");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		// 根据机构ID获取班级人数
		List<Object[]> slist = studentService
				.getStudentCountByGroup(group_uuid);
		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		if (slist != null && slist.size() > 0) {
			Map m = new HashMap<String, Integer>();
			for (Object[] o : slist) {
				m.put(o[1], o[0]);
			}

			String ps_data = "";
			for (PClass p : list) {
				ps_data += ("'"
						+ (m.get(p.getUuid()) == null ? 0 : m.get(p.getUuid())) + "',");
			}
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("班级人数");
			sdvo.setData("[" + PxStringUtils.StringDecComma(ps_data) + "]");

			plist.add(sdvo);

		}

		vo.setSeries_data(plist);
		logger.debug("end 用户性别统计");
		return vo;

	}

	/**
	 * 获取班级互动活跃度（按时间） class news Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getCnsBygroup(ResponseMessage responseMessage,String begDateStr, String endDateStr,String group_uuid) {
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
		vo.setTitle_text(g.getCompany_name() + " 班级互动发帖数统计");
		vo.setTitle_subtext("总计 " + list.size() + " 班");
//		vo.setLegend_data("['互动发帖数']");
		List legend_data=new ArrayList();
		legend_data.add("互动发帖数");
		vo.setLegend_data(legend_data);
		String axis_data = "";
		for (PClass p : list) {
			axis_data += ("'" + p.getName() + "',");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		// 根据机构ID获取班级人数
		List<Object[]> slist = classNewsService.getClassNewsCollectionByGroup(group_uuid, begDateStr, endDateStr);
		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		if (slist != null && slist.size() > 0) {
			Map m = new HashMap<String, Integer>();
			for (Object[] o : slist) {
				m.put(o[1], o[0]);
			}

			String ps_data = "";
			for (PClass p : list) {
				ps_data += ("'"
						+ (m.get(p.getUuid()) == null ? 0 : m.get(p.getUuid())) + "',");
			}
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("互动发帖数");
			sdvo.setData("[" + PxStringUtils.StringDecComma(ps_data) + "]");

			plist.add(sdvo);

		}

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
	public PieStatisticsVo getCntsBygroup(ResponseMessage responseMessage,String begDateStr, String endDateStr,String group_uuid) {
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

		List<Object[]> list = classNewsService.getClassNewsCountByGroup(group_uuid, begDateStr, endDateStr);
		logger.debug("classService.query 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group g = (Group) CommonsCache.get(group_uuid, Group.class);
		vo.setTitle_text(g.getCompany_name() + " 班级互动热门TOP10");
		vo.setTitle_subtext("总计 " + list.size() + " 条");
//		vo.setLegend_data("['班级互动热门TOP10']");
		List legend_data=new ArrayList();
		legend_data.add("班级互动热门TOP10");
		vo.setLegend_data(legend_data);
		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		if (list != null && list.size() > 0) {
			for(Object[] o:list)
			{
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

	/**
	 * 提供验证group的合法性
	 * 
	 * @param group_uuid
	 * @return
	 */
	private boolean validateGroup(String group_uuid,
			ResponseMessage responseMessage) {
		// TEL格式验证
		if (StringUtils.isBlank(group_uuid)) {
			responseMessage.setMessage("group_uuid不能为空！");
			return false;
		}

		Group g = (Group) CommonsCache.get(group_uuid, Group.class);

		// TEL格式验证
		if (g == null) {
			responseMessage.setMessage("group不存在");
			return false;
		}

		return true;
	}

	/**
	 * 根据不同时间段划分
	 * 
	 * @return
	 */
	private Map<String, Integer> partitionLoginTime(List<User4Q> l) {
		Map<String, Integer> map = new HashMap<String, Integer>();

		int lessthreeDay = 0;// 3天内
		int lessOneWeek = 0;// 3天到一周
		int greaterOneWeek = 0;// 大于一周

		for (User4Q u : l) {
			// 登陆时间
			long time = u.getLogin_time().getTime();
			long diff = new Date().getTime() - time;
			if (diff <= threeDay)
				lessthreeDay++;
			else if (diff <= oneWeek)
				lessOneWeek++;
			else
				greaterOneWeek++;

		}
		map.put("lessthreeDay", lessthreeDay);
		map.put("lessOneWeek", lessOneWeek);
		map.put("greaterOneWeek", greaterOneWeek);

		return map;
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
