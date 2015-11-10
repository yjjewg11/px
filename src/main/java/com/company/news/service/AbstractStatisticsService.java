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

import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.entity.Group4QBaseInfo;
import com.company.news.entity.User4Q;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.statistics.PieSeriesDataVo;
import com.company.news.vo.statistics.PieStatisticsVo;

@Service
public class AbstractStatisticsService extends AbstractService {
	private static final String model_name = "静态统计模块";

	private static Logger logger = Logger.getLogger(AbstractStatisticsService.class);
	private final static long threeDay = 3 * 24 * 60 * 60 * 1000;// 3天
	private final static long oneWeek = 7 * 24 * 60 * 60 * 1000;// 一周

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
		
		// vo.setLegend_data("['男','女']");
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
		
		
		// 需要获取机构名
				Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
				vo.setTitle_text(g.getCompany_name() + " 教师统计（按性别）");
				vo.setTitle_subtext("总计 " + list.size() + " 人");
				List legend_data = new ArrayList();
				legend_data.add("男("+sex_male+")");
				legend_data.add("女("+sex_female+")");
				vo.setLegend_data(legend_data);
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
		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
		vo.setTitle_text(g.getCompany_name() + " 教师统计（按登陆时间）");
		vo.setTitle_subtext("总计 " + count + " 人");
		List legend_data = new ArrayList();
		legend_data.add(lessthreeDay + "%的用户在3天内登陆过");
		legend_data.add(lessOneWeek + "%的用户在1周内登陆过");
		legend_data.add(greaterOneWeek + "%的用户在更早前");
		vo.setLegend_data(legend_data);
		//
		// vo.setLegend_data("['" + lessthreeDay + "%的用户在3天内登陆过'" + ",'"
		// + lessOneWeek + "%的用户在1周内登陆过','" + greaterOneWeek
		// + "%的用户在更早前']");

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
	 * 提供验证group的合法性
	 * 
	 * @param group_uuid
	 * @return
	 */
	protected boolean validateGroup(String group_uuid,
			ResponseMessage responseMessage) {
		// TEL格式验证
		if (StringUtils.isBlank(group_uuid)) {
			responseMessage.setMessage("group_uuid不能为空！");
			return false;
		}

		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);

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
	protected Map<String, Integer> partitionLoginTime(List<User4Q> l) {
		Map<String, Integer> map = new HashMap<String, Integer>();

		int lessthreeDay = 0;// 3天内
		int lessOneWeek = 0;// 3天到一周
		int greaterOneWeek = 0;// 大于一周

		for (User4Q u : l) {
			// 登陆时间
			long time = 0l;
			if (u.getLogin_time() != null)
				time = u.getLogin_time().getTime();
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
		return AbstractStatisticsService.class;
	}

	@Override
	public String getEntityModelName() {
		// TODO Auto-generated method stub
		return this.model_name;
	}

}
