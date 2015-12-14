function body_show(){
		$("#div_body").show();
		$("#div_widget_chooseUser").hide();
		$("#div_widget_chooseCook").hide();
	}
var SnsIndexPage=(function(){
	/*
	 * (标头)注销用户
	 * @ ajax_userinfo_logout：注销；
	 * */
	function menu_userinfo_logout_fn(){
		ajax_userinfo_logout();
	}
	function menu_body_fn (){	
		$("#div_seesion_body").show();
		$("#div_login").html(null);
		body_show();
		if(!doInitUrlParam()){
			PxSns.list_init();
		}
	}

	//获取用户信息
	function ajax_getUserinfo(isInit) {
		$.AMUI.progress.start();
		var url = hostUrl + "rest/userinfo/getUserinfo.json?grouptype=3";
		$.ajax({
			type : "GET",
			url : url,
			async: false,
			dataType : "json",
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					alert(data.userinfo.loginname);
					//if(data.userinfo)Store.setUserinfo(data.userinfo);
					//if(data.list)Store.setGroup(data.list);
					//G_CallPhoneFN.jsessionToPhone(data.JSESSIONID);			
					//menu_body_fn();
				} else {
					//if(!isInit)alert(data.ResMsg.message);
					//G_resMsg_filter(data.ResMsg);
				}
				
			},
			error : G_ajax_error_fn
		});
	}

		//统一换标头方法
		function title_info_init(type){
			//主页顶部按钮；
			var header_right=null;
			if(!type)type="话题";
			var div_header_title_info = {
					  "title":type,
					  "link": "#title-link",
					  data: {
					    "left": [
					             {
					 		        "link": "javascript:Queue.doBackFN();",
					 		        "icon": "chevron-left"
					 		      }
					    ],
					    "right": [
						             {
							 		        "link": "javascript:SnsIndexPage.addTopic();",
							 		        "icon": "pencil-square-o"
							 		      }
							    ]
					  }
					};
			
			React.render(React.createElement(AMUIReact.Header,div_header_title_info), document.getElementById('div_header'));
		
		}
	
	function menu_dohome() {
		$("#div_seesion_body").show();
		$("#div_login").html(null);
		body_show();
		PxSns.list_init();
	}
	function addTopic() {
		PxSnsService.btnclick_sns_snsTopic('add');
	}
	/**
	 * 初始url是否带执行参数,有则优先执行
	 */
	function doInitUrlParam(){
		
		var topic_uuid=$.getUrlParam("topic_uuid");
		if(topic_uuid){
			PxSnsService.ajax_sns_snsTopic_show(topic_uuid);
			return true;
		}
		return false;
//		var fn=$.getUrlParam("fn");
//		if(fn){
//			try{
//				G_jsCallBack[fn]();
//			}catch(e){
//				alert("调用方法失败,参数fn="+fn);
//			    console.log('调用方法失败,参数fn=', e);
//			}
//			
//		}
	}
	function init() {
		Queue.homePageFn=menu_dohome;
		ajax_getUserinfo(true);
		title_info_init();
		menu_body_fn();
	
		
		
		
		
		
	}
	
	
	//SnsIndexPage.init();
	return {
		menu_dohome:menu_dohome,
		addTopic:addTopic,
		init:init
	};//end return
})();//end PxLazyM=(function(){return {}})();


SnsIndexPage.init();



