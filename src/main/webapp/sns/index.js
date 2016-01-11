function body_show(){
		$("#div_body").show();
		$("#div_widget_chooseUser").hide();
		$("#div_widget_chooseCook").hide();
	}


//sessionTimeout公用方法
function G_resMsg_Timeout(ResMsg){
	if(ResMsg.status=="sessionTimeout"){
		Modal_prompt.showLogin();
	}else{
		alert(ResMsg.message);
		G_resMsg_filter(ResMsg);	
	}
}

/**
Modal_prompt.show(React.createElement(sns_list_snsTopic_rect, {
					events: null
					},"title");
Modal_prompt.showLogin();

Modal_prompt.ajax_userinfo_login();
*/
var Modal_prompt={
	g_modal_prompt:"g_modal_prompt",
	g_modal_prompt_hd:"g_modal_prompt_hd",
	g_modal_prompt_bd:"g_modal_prompt_bd",
	modal1:null,
	//用户登陆
	 ajax_userinfo_login:function() {
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
					setCookie("bs_grouptype", data.S_type);
				SnsIndexPage.user=data.userinfo;
				SnsIndexPage.title_info_init();
			
				
				G_msg_pop(data.ResMsg.message);
					
					if(Modal_prompt.modal1)Modal_prompt.modal1.close();
					
					
					
					
					
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
	},
	showLogin:function(){
		var loginname = getCookie("bs_loginname");
		var password = getCookie("bs_password");
		var pw_checked = getCookie("pw_checked");
		var callback=function(){
			Modal_prompt.ajax_userinfo_login();
		
		};
		Modal_prompt.show(React.createElement(Common_load_pop,{loginname:loginname,password:password,pw_checked:pw_checked}),"用户登录",callback);
	},
/**

react_Element:React.createElement(sns_list_snsTopic_rect, {
					events: data.list,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}


	*/
	show:function(react_Element,title,callback){
		React.render(react_Element,  document.getElementById(Modal_prompt.g_modal_prompt_bd)); 	

		$("#"+Modal_prompt.g_modal_prompt).modal({
				  relatedTarget: document.body,
					  closeOnConfirm:false,
				  onConfirm: function(e) {
					  var model1=this;
					  Modal_prompt.modal1=this;
					
					if(typeof callback=='function'){
						callback(function(){model1.close()});
						return false;
					}else model1.close();
				  },
				  onCancel: function(e) {
					  
				  }
				});
	}
	

};

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
	//SnsIndexPage.user.uuid
	//SnsIndexPage.title_info_init();
	return {
		user:{uuid:"",name:"游客"},
		menu_dohome:menu_dohome,
		addTopic:addTopic,
		title_info_init:title_info_init,
		init:init
	};//end return
})();//end PxLazyM=(function(){return {}})();


SnsIndexPage.init();

