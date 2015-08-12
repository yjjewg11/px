
/**
 * 外部ajax[请求数据完成]
 * ->loadData(option)[传入数据]
 * ->initDiv[初始化div]
 * ->loading[初始化完成后加载数据]
 * 
 * 
 * PXECharts.loadData(option);
 */
var PXECharts={
	isInit:false,
	divid:"main_ECharts",
	option:null,
	loading:function(){
		this.isInit=true;
		if(!this.option){
			return;
		};
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
	},
	initDiv:function(){
		React.render(React.createElement(ECharts_Div, null), document.getElementById('div_body'));
		
	},
	loadData:function(option){
		
		   
		this.option=option;
		this.initDiv();
	}
}



function menu_statistics_uss_fn(){
	var option= {
            tooltip: {
                show: true
            },
            legend: {
                data:['销量']
            },
            xAxis : [
                {
                    type : 'category',
                    data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    "name":"销量",
                    "type":"bar",
                    "data":[5, 20, 40, 10, 10, 20]
                }
            ]
        };
	PXECharts.loadData(option);
}