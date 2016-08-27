
/**
 * 外部ajax[请求数据完成]
 * ->loadData(option)[传入数据]
 * ->initDiv[初始化div]
 * ->loading[初始化完成后加载数据]
 * 
 * 
 * PXECharts.loadData(option);
 * PXECharts.divid
 */
var PXECharts={
	isInit:false,
	divid:"main_ECharts",
	option:null,
	initDiv:function(){
		React.render(React.createElement(ECharts_Div, null), document.getElementById('div_body'));
	},

	echart_pie:function(data){
		option = {
			    title : {
			        text: data.title_text,
			        subtext: data.title_subtext,
			        x:'center'
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:data.legend_data
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            dataView : {show: true, readOnly: false},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    series : [
			        {
			            name:'访问来源',
			            type:'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:data.series_data
			        }
			    ]
			};
		
		
		 PXECharts.loadData(option);
	},
	
	echart_bar:function(data){
		option = {
			    title : {
			        text: data.title_text,
			        subtext: data.title_subtext
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:data.legend_data
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            dataView : {show: true, readOnly: false},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'value',
			            boundaryGap : [0, 0.01]
			        }
			    ],
			    yAxis : [
			        {
			            type : 'category',
			            data : eval("("+data.yAxis_data+")")
			        }
			    ],
			    series : []
			};
		
		//添加数据
		  for (var i=0,len=data.series_data.length; i<len; i++)
			 {
			  var serie_data=data.series_data[i];
			  var serie= {
			            name:serie_data.name,
			            type:'bar',
			            data:eval("("+serie_data.data+")")
			        };
			  option.series.push(serie);
			 
			 }
		
		 PXECharts.loadData(option);
		
	},
	loadData:function(option){
		this.option=option;
		  require.config({
	            paths: {
	                echarts: 'http://echarts.baidu.com/build/dist'
	            }
	        });
		require(
	            [
	                'echarts',
	                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
	                'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	            ],
	            function (ec) {
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = ec.init(document.getElementById(PXECharts.divid)); 
	                // 为echarts对象加载数据 
	                myChart.setOption(PXECharts.option); 
	            }
	           )
	}
};


/**
 * PXECharts_ajax.getStatisticsTypeList();
 * PXECharts_ajax.ajax(o);
 * 
 * ajax->ajax_uss(data);
 * 
 */
var PXECharts_ajax={
		
	/**
	 * 请求返回数据->图标显示.默认调用PXECharts_ajax.ajax_uss(data);
	 * @param data
	 */
	ajax_uls:function(data){
		PXECharts_ajax.ajax_uss(data);
	},
	/**
	 * 请求返回数据->图标显示.默认调用PXECharts_ajax.ajax_uss(data);
	 * @param data
	 */
	ajax_sss:function(data){
		PXECharts_ajax.ajax_uss(data);
	},
	/**
	 * 请求返回数据->图标显示.默认调用PXECharts_ajax.ajax_uss(data);
	 * @param data
	 */
	ajax_cns:function(data){
		PXECharts_ajax.ajax_css(data);
	},
	/**
	 * 请求返回数据->图标显示.默认调用PXECharts_ajax.ajax_uss(data);
	 *班级互动TOP10（按机构）
	 * @param data
	 */
	ajax_cnts:function(data){
		PXECharts_ajax.ajax_cnts(data);
	},
	/**
	 *  'css', label: '人数统计（按班级）'
	 */
	ajax_css:function(data){
		PXECharts_ajax.ajax_css(data);
	},	
	ajax_tjs:function(data){
		PXECharts_ajax.ajax_css(data);
	},
	
	/**
	 * 
	 * 饼图
	 * 请求返回数据->图标显示.默认调用PXECharts_ajax.ajax_uss(data);
	 * @param data
	 */
	ajax_uss:function(data){
		PXECharts.echart_pie(data);
		
	},
	/**
	 * 标志条形.
	 *  'css', label: '人数统计（按班级）'
	 */
	ajax_css:function(data){
		PXECharts.echart_bar(data);
		
	},ajax_cnts:function(data){

		alert(data.series_data);
		
		
	},
	
	/**
	 * 选择不同统计条件是,请求数据.
	 * @param data
	 */
	ajax:function(formdata){
		if(!formdata||!formdata.type||!formdata.groupuuid){
			return;
		}
		var re_data={};
		$.AMUI.progress.start();
		//var url = hostUrl + "rest/pxstatistics/"+formdata.type+".json";
		url=this.ajax_url.replace("{type}",formdata.type);
		$.ajax({
			type : "GET",
			url : url,
			data:formdata,
			dataType : "json",
			async: false,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					re_data=data.list;
					var arr=formdata.type.split("_");
					if(arr.length>1){
						PXECharts["echart_"+arr[1]](data.data);
					}else if(PXECharts_ajax["ajax_"+formdata.type]){//兼容老数据
						PXECharts_ajax["ajax_"+formdata.type](data.data);
					}
				} else {
					alert(data.ResMsg.message);
				}
			},
			error : G_ajax_error_fn
		});
	},
	ajax_url:hostUrl + "rest/statistics/{type}.json",
	/**
	 * 统计列表,返回用于select 显示
	 * @returns {Array}
	 */
	getStatisticsTypeList:function(){
		var data=[];
		data.push( {value: 'uss', label: '教师性别统计'});
		data.push( {value: 'uls', label: '教师活跃度统计'});
		data.push( {value: 'sss', label: '在校生性别统计'});
		data.push( {value: 'getStudentAgeCountBygroup_bar', label: '在校生年龄段统计(按机构)'});
		//data.push( {value: 'cnts', label: '班级互动TOP10（按机构）'});
		data.push( {value: 'css', label: '在校生人数统计（按班级）'});
		data.push( {value: 'getClassNewStudentNumber_bar', label: '新生统计（日期段）'});
		data.push( {value: 'getClassLeaveStudentNumber_bar', label: '中途离校人数统计（日期段）'});
		
		//data.push( {value: 'cps', label: '人数统计（按班级家长）'});		
		data.push( {value: 'cns', label: '班级互动（班级日期段）'});
		data.push( {value: 'getClassnewsByTeacher_bar', label: '班级互动（老师日期段）'});
		data.push( {value: 'tjs', label: '教师评价统计（日期段）'});
		data.push( {value: 'getJingpinwenzhangByTeacher_bar', label: '精品文章（老师日期段）'});
		data.push( {value: 'getTeachingplanByClass_bar', label: '课程表（班级日期段）'});
		data.push( {value: 'getCookbookPlanByMonth_bar', label: '食谱（日期段）'});
		return data;
	},
	
	/**
	 * 统计列表,返回用于select 显示
	 * @returns {Array}
	 */ 
	getStatisticsTypeList_graduation:function(){
		var data=[];
//		data.push( {value: 'uss', label: '教师性别统计（按机构）'});
//		data.push( {value: 'uls', label: '教师活跃度统计（按机构）'});
		data.push( {value: 'sss', label: '毕业生性别统计'});
//		data.push( {value: 'getStudentAgeCountBygroup_bar', label: '年龄段统计(按机构)'});
		//data.push( {value: 'cnts', label: '班级互动TOP10（按机构）'});
		data.push( {value: 'css', label: '毕业生人数统计（按班级）'});
//		data.push( {value: 'getClassNewStudentNumber_bar', label: '新生统计（日期段）'});
//		data.push( {value: 'getClassLeaveStudentNumber_bar', label: '毕业离校统计（日期段）'});
		
		//data.push( {value: 'cps', label: '人数统计（按班级家长）'});		
		data.push( {value: 'cns', label: '毕业班级互动（班级日期段）'});
//		data.push( {value: 'getClassnewsByTeacher_bar', label: '毕业班级互动（老师日期段）'});
//		data.push( {value: 'tjs', label: '教师评价统计（日期段）'});
//		data.push( {value: 'getJingpinwenzhangByTeacher_bar', label: '精品文章（老师日期段）'});
		data.push( {value: 'getTeachingplanByClass_bar', label: '课程表（班级日期段）'});
//		data.push( {value: 'getCookbookPlanByMonth_bar', label: '食谱（日期段）'});
		 
	
		return data;
	}
}


