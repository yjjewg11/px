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
		PxSns.list_init();
		
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
		menu_body_fn();
	}
	function addTopic() {
		PxSnsService.btnclick_sns_snsTopic('add');
	}
	function init() {
		Queue.homePageFn=menu_dohome;
		menu_body_fn();
		ajax_getUserinfo(true);
		title_info_init();
	}
	//SnsIndexPage.init();
	return {
		menu_dohome:menu_dohome,
		addTopic:addTopic,
		init:init
	};//end return
})();//end PxLazyM=(function(){return {}})();


SnsIndexPage.init();


