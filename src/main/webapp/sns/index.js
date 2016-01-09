function body_show(){
		$("#div_body").show();
		$("#div_widget_chooseUser").hide();
		$("#div_widget_chooseCook").hide();
	}
//用户登陆
function Sns_userinfo_login() {
	
	 var $btn = $("#btn_login");
	  $btn.button('loading');
	$.AMUI.progress.start();

	
	var formData=$('#login_form').serializeJson()
	
	if(formData.password.length!=32){
		formData.password=$.md5(formData.password); 
	}
	
	var url = hostUrl + "rest/userinfo/login.json";
	$.ajax({
		type : "POST",
		url : url,
		data : formData,
		dataType : "json",
		success : function(data) {
			 $btn.button('reset');
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				Store.clear();
				//判断是否保存密码，如果保存则放入cookie，否则清除cookie
				setCookie("bs_loginname", formData.loginname);
				setCookie("bs_grouptype", formData.grouptype);
				if($("#pw_checked")[0].checked){
					setCookie("bs_password", formData.password);
					setCookie("pw_checked", "checked");
				} else {
					setCookie("bs_password", ""); 
					setCookie("pw_checked", "");
				}
				Store.setUserinfo(data.userinfo);
				Store.setGroup(data.list);
				PxRight.setUserRights(data.S_User_rights);
				
				G_CallPhoneFN.jsessionToPhone(data.JSESSIONID);
				
				setCookie("bs_grouptype", data.S_type);
				PxLazyM.loadJS_for( getCookie("bs_grouptype"));
				G_msg_pop(data.ResMsg.message);
				//menu_body_fn();
				
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			 $btn.button('reset');
			$.AMUI.progress.done();
			if(obj.responseText&&obj.responseText.indexOf("G_key_no_connect_server")){
				alert("没连接上互联网.");
			}else{
				alert(obj.status+","+textStatus+"="+errorThrown);
			}
		}
	});
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
					//alert(data.userinfo.loginname);
				//	G_msg_pop(data.userinfo.name+"签到");
					SnsIndexPage.user=data.userinfo;
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
			if(!type)type="话题|"+SnsIndexPage.user.name;
			
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
	//SnsIndexPage.user.name
	return {
		user:{uuid:"",name:"游客"},
		menu_dohome:menu_dohome,
		addTopic:addTopic,
		init:init
	};//end return
})();//end PxLazyM=(function(){return {}})();


SnsIndexPage.init();

