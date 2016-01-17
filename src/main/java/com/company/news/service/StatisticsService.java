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
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.BaseDataList;
import com.company.news.entity.Group4QBaseInfo;
import com.company.news.entity.PClass;
import com.company.news.entity.Student;
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
	
	@Autowired
	private AccountsService accountsService;



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

//		List<Student> list = studentService.getStudentByGroup(group_uuid);
		
		List<Object[]> list = studentService.getStudentSexCountByGroup(group_uuid);
		logger.debug("getUserByGroupuuid 查询结束");

//		
//		List list = (List) this.nSimpleHibernateDao.getHibernateTemplate()
//				.find("select count(uuid),classuuid from Student  where groupuuid=? group by classuuid)", groupuuid);
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
		
		List legend_data = new ArrayList();
		legend_data.add("男("+sex_male+")");
		legend_data.add("女("+sex_female+")");
		vo.setLegend_data(legend_data);
				
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
		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
		
		String axis_data = "";
		for (PClass p : list) {
			axis_data += ("\"" + p.getName() + "\",");
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
			sdvo.setName("学生人数");
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
		legend_data.add("学生人数");
		legend_data.add("家长人数");

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
		List<Object[]> list = classNewsService.getClassNewsCountsByClass(
				group_uuid, begDateStr, endDateStr,SystemConstants.Class_isdisable_0);
		logger.debug("classService.query 查询结束");

		// 返回
		PieStatisticsVo vo = new PieStatisticsVo();
		// 需要获取机构名
		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
	
		String axis_data = "";
		String axis_data_news_count = "";
		String axis_data_dianzan_count = "";
		String axis_data_replay_count = "";
		String axis_data_read_sum_count = "";
		//class_name,news_count,dianzan_count,replay_count,read_sum_count
		Integer total_news_count=0;
		Integer total_dianzan_count=0;
		Integer total_replay_count=0;
		Integer total_read_sum_count=0;
		for (Object[] p : list) {
			if(p[4]==null)p[4]=0;
			
		
			
			
			total_news_count+=Integer.valueOf(p[1].toString());
			total_dianzan_count+=Integer.valueOf(p[2].toString());
			total_replay_count+=Integer.valueOf(p[3].toString());
			total_read_sum_count+=Integer.valueOf(p[4].toString());
			
			axis_data += ("\"" + p[0] + "\",");
			axis_data_news_count += ("\"" + p[1] + "\",");
			axis_data_dianzan_count += ("\"" + p[2] + "\",");
			axis_data_replay_count += ("\"" + p[3] + "\",");
			axis_data_read_sum_count += ("\"" + p[4] + "\",");
		}
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		vo.setTitle_text(g.getBrand_name() + " 互动发帖数统计("+list.size()+"班)");
		vo.setTitle_subtext("总计 :" + list.size() + " 班,"+total_news_count+"互动,"+total_dianzan_count+"点赞,"+total_replay_count+"回复,"+total_read_sum_count+"阅读.");
		// vo.setLegend_data("[\"互动发帖数\"]");
		List legend_data = new ArrayList();
		legend_data.add("互动量");
		legend_data.add("点赞量");
		legend_data.add("回复量");
		legend_data.add("阅读量");
		vo.setLegend_data(legend_data);
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		List<PieSeriesDataVo> plist = new ArrayList<PieSeriesDataVo>();
		{
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("互动量");
			sdvo.setData("[" + PxStringUtils.StringDecComma(axis_data_news_count) + "]");
			plist.add(sdvo);
		}
		{
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("点赞量");
			sdvo.setData("[" + PxStringUtils.StringDecComma(axis_data_dianzan_count) + "]");
			plist.add(sdvo);
		}
		{
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("回复量");
			sdvo.setData("[" + PxStringUtils.StringDecComma(axis_data_replay_count) + "]");
			plist.add(sdvo);
		}
		{
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("阅读量");
			sdvo.setData("[" + PxStringUtils.StringDecComma(axis_data_read_sum_count) + "]");
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
		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
		vo.setTitle_text(g.getBrand_name() + " 班级互动热门TOP10");
		vo.setTitle_subtext("总计 " + list.size() + " 条");
		// vo.setLegend_data("[\"班级互动热门TOP10\"]");
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
		Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
		vo.setTitle_text(g.getBrand_name() + " 教师评价统计");
		vo.setTitle_subtext("总计 " + list.size() + " 条");
		// vo.setLegend_data("[\"班级互动热门TOP10\"]");
		List legend_data = new ArrayList();
		legend_data.add("非常满意");
		legend_data.add("满意");
		legend_data.add("一般");
		vo.setLegend_data(legend_data);

		String axis_data = "";
		for (User4Q u : userlist) {
			axis_data += ("\"" + u.getName() + "\",");
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

	public PieStatisticsVo pie_studentParentType(
			ResponseMessage responseMessage, String group_uuid) {
		// 验证group合法性
				if (!validateGroup(group_uuid, responseMessage))
					return null;


				List<Student> list = studentService.getStudentByGroup(group_uuid);

				// 返回
				PieStatisticsVo vo = new PieStatisticsVo();
				
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
				
				
				// 需要获取机构名
						Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(group_uuid, Group4QBaseInfo.class);
						vo.setTitle_text(g.getBrand_name() + " 学生统计（按性别）");
						vo.setTitle_subtext("总计 " + list.size() + " 人");
						List legend_data = new ArrayList();
						legend_data.add("男("+sex_male+")");
						legend_data.add("女("+sex_female+")");
						vo.setLegend_data(legend_data);
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

		logger.debug("begain 用户年龄统计");

//		List<PxStudent> list = pxStudentService.getStudentByGroup(group_uuid);
		//age,sum(sex=0),sum(sex=1)
		List<Object[]> list = studentService.getStudentAgeCountByGroup(group_uuid);
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
			
			
		vo.setTitle_text(g.getBrand_name() + " 学生年龄统计");
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
	 * 获取学生年龄段统计 student sex Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getAccountPerMonthOfYear_bar(ResponseMessage responseMessage,
			String begDateStr, String endDateStr, String groupuuid) {
		// 验证group合法性
//		if (!validateGroup(group_uuid, responseMessage))
//			return null;

		logger.debug("begain 收费记录统计");

//		List<PxStudent> list = pxStudentService.getStudentByGroup(group_uuid);
		//age,sum(sex=0),sum(sex=1)
		List<Object[]> datalist =accountsService.getAccountPerMonthOfYear(groupuuid, begDateStr, endDateStr);
		logger.debug("getUserByGroupuuid 查询结束");
		
		
		String axis_data = "";
		
		String sex_male_data = "";
		String sex_female_data = "";
		
		int total_num=0;

		int sex_male = 0;
		int sex_female = 0;
		DecimalFormat decimalFormat=new DecimalFormat("0"); 
		 List<BaseDataList> accounts_type=CommonsCache.getBaseDataListByTypeuuid("KD_Accounts_type");
		 Map<String,List> type_map=new HashMap();
		 Map<String,Integer> type_map_sum=new HashMap();
		 
			List legend_data = new ArrayList();
		//Y轴 数组 
		for(int i=0;i<accounts_type.size();i++){
			BaseDataList baseDataList=accounts_type.get(i);
			
			legend_data.add(baseDataList.getDatavalue());
			
			type_map_sum.put("type_count"+baseDataList.getDatakey(), 0);
			type_map_sum.put("type_sum"+baseDataList.getDatakey(), 0);
			List axis_data_count_List=new ArrayList(12);
			List axis_data_sum_List=new ArrayList(12);
			for(int j=1;j<=12;j++){
				if(i==0)axis_data += ("\"" +j + "月\",");
				axis_data_count_List.add(0);
				axis_data_sum_List.add(0);
				
			}
			//初始话,每月分类数据计数 设置为0.
			type_map.put("type_count"+baseDataList.getDatakey(), axis_data_count_List);
			//初始话,每月分类数据总数和 设置为0.
			type_map.put("type_sum"+baseDataList.getDatakey(), axis_data_sum_List);
		}
		
		//type,DATE_FORMAT(t1.accounts_time,'%m') as m,COUNT(1) as count_num,SUM(num) as sum_num
		//0,1,2,3
		for(int i=0;i<datalist.size();i++){
			Object[] p=datalist.get(i);
			//获取分类list
			List type_count_list=type_map.get("type_count"+p[0]);
			//第几月,设置数量.
			type_count_list.set(Integer.valueOf(p[1]+"",10)-1, p[2]);
			
			//加总数
			String type_count_key="type_count"+p[0];
			Integer sum1=type_map_sum.get(type_count_key)+Integer.valueOf(p[2]+"");
			type_map_sum.put(type_count_key, sum1);
			
			
			//获取分类list
			List type_sum_list=type_map.get("type_sum"+p[0]);
			//第几月,设置数量.
			type_sum_list.set(Integer.valueOf(p[1]+"",10)-1, p[3]);
			
			//加总数
			String type_sum_key="type_sum"+p[0];
			Integer type_sum_sum1=type_map_sum.get(type_sum_key)+Integer.valueOf(p[3]+"");
			type_map_sum.put(type_sum_key,  type_sum_sum1);
			
		}
		
		total_num+=sex_male+sex_female;
		
		//Y轴 数组 12月
		List<PieSeriesDataVo> psdvlist = new ArrayList<PieSeriesDataVo>(12);
			
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName("男");
			sdvo.setData("[" + PxStringUtils.StringDecComma(sex_male_data) + "]");

			psdvlist.add(sdvo);

			PieSeriesDataVo sdvo_p = new PieSeriesDataVo();
			sdvo_p.setName("女");
			sdvo_p.setData("[" + PxStringUtils.StringDecComma(sex_female_data) + "]");
			psdvlist.add(sdvo_p);
			
			

			Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(groupuuid, Group4QBaseInfo.class);
			
		
		//组装数据
		PieStatisticsVo vo = new PieStatisticsVo();
		//Y轴 数组
		vo.setyAxis_data("[" + PxStringUtils.StringDecComma(axis_data) + "]");

		vo.setTitle_text(g.getBrand_name() + " 学生年龄统计");
		vo.setTitle_subtext("总计 " + total_num + " 人,男"+sex_male+"人,女"+sex_female+"人");
	
		//Y轴每组分类数据
		vo.setLegend_data(legend_data);
		//X轴具体数据
		vo.setSeries_data(psdvlist);
		logger.debug("end 收费记录统计");
		return vo;

	}
	
	

	
	/**
	 * 获取学生年龄段统计 student sex Statistics
	 * 
	 * @param responseMessage
	 * @return
	 */
	public PieStatisticsVo getAccountPerMonthOfYearOfType_bar(ResponseMessage responseMessage,
			String begDateStr, String endDateStr, String groupuuid,Integer type) {
		// 验证group合法性
//		if (!validateGroup(group_uuid, responseMessage))
//			return null;

		logger.debug("begain 收费记录统计");

//		List<PxStudent> list = pxStudentService.getStudentByGroup(group_uuid);
		
		//Y-m,count_num,sum_num
		List<Object[]> datalist =accountsService.getAccountPerMonthOfYearOfType(groupuuid,type, begDateStr, endDateStr);
		logger.debug("getUserByGroupuuid 查询结束");
		
		
		String y_data_axis = "";
		
		String x_data_count_num = "";
		String x_data_sum_num = "";
		
		
		int total_count_num=0;
		Double total_sum_num=0d;
		
		
		//Y-m,count_num,sum_num
		for(int i=0;i<datalist.size();i++){
			Object[] p=datalist.get(i);
			
			y_data_axis += ("\"" +p[0] + "\",");
			
			x_data_count_num +="\"" +p[1] + "\",";
			x_data_sum_num +="\"" +p[2] + "\",";
			
			total_count_num+=Integer.valueOf(p[1].toString());
			total_sum_num+=Double.valueOf(p[2].toString());
			
			
		}
		
		//每月
		String x_data_count_num_name="月笔数";
		String x_data_sum_num_name="月金额";
		List legend_data = new ArrayList();
		legend_data.add(x_data_count_num_name);
		legend_data.add(x_data_sum_num_name);
		
		//Y轴 数组 12月
		List<PieSeriesDataVo> psdvlist = new ArrayList<PieSeriesDataVo>();
			
			PieSeriesDataVo sdvo = new PieSeriesDataVo();
			sdvo.setName(x_data_count_num_name);
			sdvo.setData("[" + PxStringUtil.StringDecComma(x_data_count_num) + "]");

			psdvlist.add(sdvo);

			PieSeriesDataVo sdvo_p = new PieSeriesDataVo();
			sdvo_p.setName(x_data_sum_num_name);
			sdvo_p.setData("[" + PxStringUtil.StringDecComma(x_data_sum_num) + "]");
			psdvlist.add(sdvo_p);

			Group4QBaseInfo g = (Group4QBaseInfo) CommonsCache.get(groupuuid, Group4QBaseInfo.class);
			
			 List<BaseDataList> accounts_type=CommonsCache.getBaseDataListByTypeuuid("KD_Accounts_type");
			 String typename=CommonsCache.getBaseDatavalue(type, accounts_type);
		//组装数据
		PieStatisticsVo vo = new PieStatisticsVo();
		//Y轴 数组
		vo.setyAxis_data("[" + PxStringUtil.StringDecComma(y_data_axis) + "]");

		vo.setTitle_text(g.getBrand_name() +"-"+ typename);
		
		vo.setTitle_subtext("总笔数(笔):" + total_count_num + ",总金额(元):"+total_sum_num);
		
		//Y轴每组分类数据
		vo.setLegend_data(legend_data);
		//X轴具体数据
		vo.setSeries_data(psdvlist);
		logger.debug("end 收费记录统计");
		return vo;

	}

}
