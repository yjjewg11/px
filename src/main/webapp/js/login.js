/**
 * 设置权限模块
 */
var PxRight={
		map:{},
		setUserRights:function(v){
			this.map["UserRights"]=v;
		},
		getUserRights:function(){
			var o= this.map["UserRights"];
			if(!o)o="";
			return o;
		}
}
//懒加载幼儿园模块,或者培训机构模块.
//PxLazyM=(function(){return {}})();
var PxLazyM=(function(){
	//懒加载回调
	function loadJS_for_kd_callback(){
		window.__loadJS_count--;
		//alert("loadJS_count="+__loadJS_count);
		if(window.__loadJS_count==0){
			$.AMUI.progress.done();
			menu_body_fn();
		}
	}
	
	//懒加载幼儿园或者培训模块
	function loadJS_for(type){			
		var callback=loadJS_for_kd_callback;
		var jsArr=null;
		if(type==2){
			jsArr=PxConfig.group_type_2;
		}else{
			jsArr=PxConfig.group_type_1;
		}
		
		

		//所有加载完成才执行回调.
		window.__loadJS_count=jsArr.length;
		$.AMUI.progress.start();
		for(var i=0;i<jsArr.length;i++){
			loadJS(jsArr[i]+"?1031",callback);
		}
		
	};

	return {
		//PxLazyM.loadJS_for(type);
		loadJS_for:loadJS_for
	};//end return
})();//end PxLazyM=(function(){return {}})();


//登录操作
function index_init(){
	G_CallPhoneFN.hideLoadingDialog();
	  if ($.AMUI.fullscreen.enabled) {
		    $.AMUI.fullscreen.request();
		}
	  ajax_getUserinfo(true);
	  
		//MessageTimer.start();
}

//登录操作
window.onload=function(){ 
	index_init();
}; 


//登录操作
function login_init(){
	G_CallPhoneFN.hideLoadingDialog();
	  if ($.AMUI.fullscreen.enabled) {
		    $.AMUI.fullscreen.request();
		}
	  ajax_getUserinfo(true);
	  
	//	MessageTimer.start();
}

//登录操作
window.onload=function(){ 
	login_init();
}; 
//登录服务器请求
/*
 * 1.1 判断是否登录
 * <登录服务器请求>
 * @如果成功则继续下一步并且Store.setUserRights(data.S_User_rights)添加设置权限
 * @G_resMsg_filter(data.ResMsg)：不成功则条到登录输入账号界面;
 * */
function ajax_getUserinfo(isInit) {
	$.AMUI.progress.start();
	var grouptype= getCookie("bs_grouptype");
	if(!grouptype){
		grouptype=1;
		setCookie("bs_grouptype", grouptype);
	}
	var url = hostUrl + "rest/userinfo/getUserinfo.json?grouptype="+grouptype;
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.userinfo)Store.setUserinfo(data.userinfo);
				if(data.list)Store.setGroup(data.list);
				PxRight.setUserRights(data.S_User_rights);
				G_CallPhoneFN.jsessionToPhone(data.JSESSIONID);			
				
				PxLazyM.loadJS_for( getCookie("bs_grouptype"));
				//menu_body_fn();
			} else {
				if(!isInit)alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
			
		},
		error : G_ajax_error_fn
	});
}




function ajax_kd_group_reg() {
	$.AMUI.progress.start();
	
	  var objectForm = $('#kd_group_reg_form').serializeJson();
	  
	  if(objectForm.password!=objectForm.password1){
		  alert("2次输入密码不匹配");
	  }
	  delete objectForm.password1;
	  objectForm.password=$.md5(objectForm.password); 
      var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/group/reg.json";
  			
	$.ajax({
		type : "POST",
		url : url,
		processData: false, 
		data : jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				G_msg_pop(data.ResMsg.message);
				menu_userinfo_login_fn();
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
}


/**
 * 发送验证码
 * @param inputid.去获取值的inputid
 * @param type.1:注册,2:找回密码
 */
function ajax_sms_sendCode(inputid,type){
	  var url = hostUrl + "rest/sms/sendCode.json";
		$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			data:{tel:$(inputid).val(),type:type},
			 async: true,
			success : function(data) {
				$.AMUI.progress.done();
				// 登陆成功直接进入主页
				if (data.ResMsg.status == "success") {
					 G_msg_pop(data.ResMsg.message);
				} else {
					alert("验证码发送失败："+data.ResMsg.message);
				}
			},
			error : G_ajax_error_fn
		});
}




function menu_kd_group_reg_fn(){
	Queue.push(menu_kd_group_reg_fn);
	React.render(React.createElement(Div_kd_group_reg,null)
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
};

function menu_userinfo_reg_fn(){	
	React.render(React.createElement(Div_userinfo_reg,null)
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
}


function menu_userinfo_updatePasswordBySms_fn(){
	Queue.push(menu_userinfo_updatePasswordBySms_fn);
	
	React.render(React.createElement(Div_userinfo_updatePasswordBySms,null)
			, document.getElementById('div_login'));
}



//用户登陆
function ajax_userinfo_updatePasswordBySms() {
	$.AMUI.progress.start();
	
	// var data = $("#form1").serializeArray(); //自动将form表单封装成json
//alert(JSON.stringify(data));
	  var objectForm = $('#commonform').serializeJson();
	  if(!objectForm.tel){
		  alert("请输入手机号码!");
		  return;
	  }
	  if(!objectForm.smscode){
		  alert("请输入短信验证码!");
		  return;
	  }
	  if(objectForm.password!=objectForm.password1){
		  alert("2次输入密码不匹配!");
		  return;
	  }
	  
	  delete objectForm.password1;
	  objectForm.password=$.md5(objectForm.password); 
var jsonString=JSON.stringify(objectForm);
var url = hostUrl + "rest/userinfo/updatePasswordBySms.json";
			
	$.ajax({
		type : "POST",
		url : url,
		processData: false, 
		data : jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				G_msg_pop(data.ResMsg.message);
				Queue.doBackFN();
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
}


function menu_userinfo_login_fn(){
	Queue.push(menu_userinfo_login_fn);
	var loginname = getCookie("bs_loginname");
	var password = getCookie("bs_password");
	var grouptype = getCookie("bs_grouptype");
	var pw_checked = getCookie("pw_checked");
	
	React.render(React.createElement(Div_login,{loginname:loginname,password:password,grouptype:grouptype,pw_checked:pw_checked})
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
}

//用户登陆
function ajax_userinfo_login() {
	
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
				PxLazyM.loadJS_for( getCookie("bs_grouptype"));
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
//用户登陆
function ajax_userinfo_reg() {
	$.AMUI.progress.start();
	
	// var data = $("#form1").serializeArray(); //自动将form表单封装成json
//alert(JSON.stringify(data));
	  var objectForm = $('#regform').serializeJson();
	  if(objectForm.password!=objectForm.password1){
		  alert("2次输入密码不匹配");
		  return;
	  }
	  delete objectForm.password1;
	  objectForm.password=$.md5(objectForm.password); 
  var jsonString=JSON.stringify(objectForm);
  var url = hostUrl + "rest/userinfo/reg.json";
			
	$.ajax({
		type : "POST",
		url : url,
		processData: false, 
		data : jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				alert("注册成功！");
				menu_userinfo_login_fn();
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
}