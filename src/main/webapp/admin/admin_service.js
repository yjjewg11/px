

function ajax_getUserinfo(isInit) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getUserinfo.json";
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
				menu_body_fn();
			} else {
				if(!isInit)alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
			
		},
		error : G_ajax_error_fn
	});
}


function menu_userinfo_login_fn(){
	Queue.push(menu_userinfo_login_fn);
	var loginname = getCookie("bs_loginname");
	var password = getCookie("bs_password");
	var pw_checked = getCookie("pw_checked");
	
	React.render(React.createElement(Div_login,{loginname:loginname,password:password,pw_checked:pw_checked})
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
}
//用户登陆
function ajax_userinfo_login() {
	
	 var $btn = $("#btn_login");
	  $btn.button('loading');
	$.AMUI.progress.start();

	var loginname = $("#loginname").val();
	var password = $("#password").val();
	if(password.length!=32){
		 password=$.md5(password); 
	}
	
	var url = hostUrl + "rest/userinfo/login.json?grouptype=0&loginname=" + loginname + "&password="
			+ password;
	$.ajax({
		type : "POST",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			 $btn.button('reset');
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				G_msg_pop(data.ResMsg.message);
				Store.clear();
				//判断是否保存密码，如果保存则放入cookie，否则清除cookie
				setCookie("bs_loginname", loginname);
				if($("#pw_checked")[0].checked){
					setCookie("bs_password", password);
					setCookie("pw_checked", "checked");
				} else {
					setCookie("bs_password", ""); 
					setCookie("pw_checked", "");
				}
				Store.setUserinfo(data.userinfo);
				Store.setGroup(data.list);
				menu_body_fn();
				
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			 $btn.button('reset');
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}



//userinfo

function menu_userinfo_logout_fn(){
	ajax_userinfo_logout();
}
function ajax_userinfo_logout(){
	Queue.clear();
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/logout.json";
	$.ajax({
		type : "POST",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			menu_userinfo_login_fn();
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
			 window.location = hostUrl + "login.html";
		}
	});
}

//userinfo end


//user manage
function menu_userinfo_list_fn_byRight() { 
	Queue.push(menu_userinfo_list_fn_byRight);
	ajax_uesrinfo_listByGroup_div_admin(cur_group_ad_uuid);
};

/*     
*
* <用户管理>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
* 基本框 等
* */
function ajax_uesrinfo_listByGroup_div_admin(groupuuid){
//	var list=Store.getGroupByRight('KD_teacher_m');
	React.render(React.createElement(Userinfo_EventsTable_div,{
		group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name"),
		handleClick:btn_click_userinfo,
		groupuuid:groupuuid
	}), document.getElementById('div_body'));  	
};


//老师查询，条件groupuuid
//
function ajax_uesrinfo_listByAllGroup_admin(list_div,groupuuid,name,pageNo) {
	var re_data=null;
	  if(!name)name="";
  	 if(!pageNo)pageNo=1;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/listByPage.json";
	$.ajax({
		type : "GET",
		url : url,
 		data :{groupuuid:groupuuid,name:name,pageNo:pageNo},
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Userinfo_EventRow_admin, {
					groupuuid:groupuuid,
					events: data.list.data,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
				re_data=data.list;
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
	return re_data;
};
//无分页用户管理废弃代码
////老师查询，条件groupuuid
////
//function ajax_uesrinfo_listByAllGroup(groupuuid) {
//	$.AMUI.progress.start();
//	var url = hostUrl + "rest/userinfo/listByPage.json?groupuuid="+groupuuid;
//	$.ajax({
//		type : "GET",
//		url : url,
//		data : "",
//		dataType : "json",
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				React.render(React.createElement(AD_Userinfo_EventsTable, {
//					group_uuid:groupuuid,
//					group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name"),
//					events: data.list.data,
//					handleClick:btn_click_userinfo,
//					handleChange_selectgroup_uuid:ajax_uesrinfo_listByAllGroup,
//					responsive: true, bordered: true, striped :true,hover:true,striped:true
//					}), document.getElementById('div_body'));
//				
//			} else {
//				alert(data.ResMsg.message);
//				G_resMsg_filter(data.ResMsg);
//			}
//		},
//		error : function( obj, textStatus, errorThrown ){
//			$.AMUI.progress.done();
//			alert(url+","+textStatus+"="+errorThrown);
//			 console.log(url+',error：', obj);
//			 console.log(url+',error：', textStatus);
//			 console.log(url+',error：', errorThrown);
//		}
//	});
//};

/*
 * <老师管理>Button事件 添加、启用、禁用、分配、修改;
 * @ajax_userinfo_getRole:在common_react;
 * */  
function btn_click_userinfo(m,obj,usernames,sex){
	if(m=="add"){
	Queue.push(function(){btn_click_userinfo(m,obj,usernames);},"新增老师");
		obj.sex=1;
		ajax_userinfo_edit(obj,"add",sex);
	}else if(m=="disable"){
		ajax_userinfo_updateDisable(obj,1);		
	}else if(m=="enable"){
		ajax_userinfo_updateDisable(obj,0);
	}else if(m=="del"){
		ajax_userinfo_delete(obj);
	}else if(m=="getRole"){
		Queue.push(function(){btn_click_userinfo(m,obj,usernames);},"老师权限-"+usernames);
		ajax_userinfo_getRole(obj,usernames, Store.getRoleList(),sex);
	}else if(m=="edit"){
		  Queue.push(function(){btn_click_userinfo(m,obj,usernames);},"老师修改");
		ajax_userinfo_edit({uuid:obj},"edit",sex);
	   	};
 };
 /*
  * 老师管理Button事件(启用和禁用按钮功能)；
  * @useruuids:选中的老师对象；
  * @disable：是启用还是禁用功能；1-启用  0-禁用；
  * @ajax_uesrinfo_listByGroup：服务器请求处理结束后调回最初方法做数据更新；
  * */
 function ajax_userinfo_updateDisable(useruuids,disable){
 	var groupuuid=$('#selectgroup_uuid').val();
 	$.AMUI.progress.start();
 	      var url = hostUrl + "rest/userinfo/updateDisable.json";
 		$.ajax({
 			type : "POST",
 			url : url,
 			data : {useruuids:useruuids,disable:disable},
 			dataType : "json",
 			success : function(data) {
 				$.AMUI.progress.done();
 				// 登陆成功直接进入主页
 				if (data.ResMsg.status == "success") {
 					G_msg_pop(data.ResMsg.message);
 					//ajax_uesrinfo_listByGroup_div_admin(groupuuid);
 				} else {
 					alert(data.ResMsg.message);
 					G_resMsg_filter(data.ResMsg);
 				}
 			},
 			error : function( obj, textStatus, errorThrown ){
 				$.AMUI.progress.done();
 				alert(url+",error:"+textStatus);
 				 console.log(url+',error：', obj);
 				 console.log(url+',error：', textStatus);
 				 console.log(url+',error：', errorThrown);
 			}
 		});
 	}

 /*
  * 删除权限,仅管理员
  * */
 function ajax_userinfo_delete(useruuids){
 	var groupuuid=$('#selectgroup_uuid').val();
 	$.AMUI.progress.start();
 	      var url = hostUrl + "rest/userinfo/deleteByAdmin.json";
 		$.ajax({
 			type : "POST",
 			url : url,
 			data : {uuid:useruuids},
 			dataType : "json",
 			success : function(data) {
 				$.AMUI.progress.done();
 				// 登陆成功直接进入主页
 				if (data.ResMsg.status == "success") {
 					G_msg_pop(data.ResMsg.message);
 					ajax_uesrinfo_listByAllGroup(groupuuid);
 				} else {
 					alert(data.ResMsg.message);
 					G_resMsg_filter(data.ResMsg);
 				}
 			},
 			error : function( obj, textStatus, errorThrown ){
 				$.AMUI.progress.done();
 				alert(url+",error:"+textStatus);
 				 console.log(url+',error：', obj);
 				 console.log(url+',error：', textStatus);
 				 console.log(url+',error：', errorThrown);
 			}
 		});
 	}
 /*
 * <老师管理>提交Button事件
 * */
 function ajax_userinfo_saveByAdmin(){
 	if($("#password")[0])$("#password").val($.md5($("#password").val()));
     var opt={
             formName: "editUserinfoForm",
             url:hostUrl + "rest/userinfo/saveByAdmin.json",
             cbFN:null
             };
 G_ajax_abs_save(opt);
 }  	  
/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
 /*
  * <老师管理>Button事件(添加和修改按钮功能)；
  * @formdata:选中的老师对象；
  * @m：是启用还是禁用功能；"add"-添加  "edit"-修改；
  * @逻辑：如果是"add"添加功能则直接执行Userinfo_edit方法，
  * 不是则继续执行服务器请求修改功能取得数据后执行Userinfo_edit；
  * */
 function ajax_userinfo_edit(formdata,m,sex){
 	if(m=="add"){
 		React.render(React.createElement(Userinfo_edit,{
 			formdata:formdata,
 			select_group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name"),
 			sex:formdata.sex
 			}), document.getElementById('div_body'));
 		return;
 	
 	}
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/userinfo/"+formdata.uuid+".json";
 	$.ajax({
 		type : "GET",
 		url : url,
 		dataType : "json",
 		 async: true,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				React.render(React.createElement(Userinfo_edit,{mygroup_uuids:data.mygroup_uuids,formdata:data.data,select_group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name"),sex:data.data.sex}), document.getElementById('div_body'));
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
 		error : function( obj, textStatus, errorThrown ){
 			$.AMUI.progress.done();
 			alert(url+",error:"+textStatus);
 		}
 	});
 	
 };


function btn_ajax_updateRole(useruuid,groupuuid){
	 var uuids=null;
	 $("input[name='table_checkbox']").each(function(){
		if(this.checked){
			 if(uuids==null)uuids=this.value;
			 else uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
		}
		});
	  if(!uuids){
		  G_msg_pop("请勾选复选框！");
		  return;
	  }
	  
	$.AMUI.progress.start();
      var url = hostUrl + "rest/userinfo/updateRole.json";
      var opt={
    			type : "POST",
    			url : url,
    			processData: true, 
    			dataType : "json",
    			data:{useruuid:useruuid,groupuuid:groupuuid,roleuuids:uuids},
    			//contentType : false,  
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
    			error : function( obj, textStatus, errorThrown ){
    				$.AMUI.progress.done();
    				alert(url+",error:"+textStatus);
    				 console.log(url+',error：', obj);
    				 console.log(url+',error：', textStatus);
    				 console.log(url+',error：', errorThrown);
    			}
    		};
	$.ajax(opt);
}

//end user manage

//right

function ajax_right_button_handleClick(m,formdata){
	
	Queue.push(function(){ajax_right_button_handleClick(m,formdata)});
	if(m=="add_right"){
		formdata={type:formdata};
	}
	ajax_right_edit(formdata);
};

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_right_edit(formdata,operate){
	
	if(typeof(formdata)=='string')formdata=$.parseJSON(formdata);
	React.render(React.createElement(Right_edit,{formdata:formdata}), document.getElementById('div_body'));
};

function ajax_right_save(){
$.AMUI.progress.start();
	
	  var objectForm = $('#editRightForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/right/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		data:jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				G_msg_pop(data.ResMsg.message);
				ADStore.setRightList(objectForm.type,null);
				
				Queue.doBackFN();
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}

//right end


//role
function menu_role_list_fn() {
	Queue.push(menu_role_list_fn);
	ajax_role_list();
};

var role_list_type=null;
function ajax_role_list(type) {
	Queue.push(function(){ajax_role_list(type)});
	if(type)role_list_type=type;
	else type=role_list_type;
	if(!type)type="0";
	$.AMUI.progress.start();
	var url = hostUrl + "rest/role/list.json?type="+type;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Role_EventsTable, {
					type:type,
					events: data.list,
					handleClick:ajax_role_button_handleClick,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
};


function ajax_role_button_handleClick(m,type,uuids){
	if(m=="add_role"){
		ajax_role_edit({type:type},"add");
	}
};

function btn_ajax_updateRight(roleuuid){
	 var uuids=null;
	 $("input[name='table_checkbox']").each(function(){
		if(this.checked){
			 if(uuids==null)uuids=this.value;
			 else uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
		}
		});
	  if(!uuids){
		  G_msg_pop("请勾选复选框！");
		  return;
	  }
	  
	$.AMUI.progress.start();
      var url = hostUrl + "rest/role/updateRight.json";
      var opt={
    			type : "POST",
    			url : url,
    			processData: true, //设置 processData 选项为 false，防止自动转换数据格式。
    			dataType : "json",
    			data:{roleuuid:roleuuid,rightuuid:uuids},
    			//contentType : false,  
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
    			error : function( obj, textStatus, errorThrown ){
    				$.AMUI.progress.done();
    				alert(url+",error:"+textStatus);
    				 console.log(url+',error：', obj);
    				 console.log(url+',error：', textStatus);
    				 console.log(url+',error：', errorThrown);
    			}
    		};
	$.ajax(opt);
}

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_role_edit(formdata,operate){
	React.render(React.createElement(Role_edit,{formdata:formdata}), document.getElementById('div_body'));
};
/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_role_bind_right(formdata){
	Queue.push(function(){ajax_role_bind_right(formdata)});
	$.AMUI.progress.start();
	var url = hostUrl + "rest/role/getRight.json?uuid="+formdata.uuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				
				React.render(React.createElement(Role_bind_right, {
					formdata:formdata,
					type:formdata.type,
					events: ADStore.getRightList(formdata.type),
					chooselist: JSON.stringify(data.list),
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
	
};

function ajax_role_save(){
	
	$.AMUI.progress.start();
	  var objectForm = $('#editRoleForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/role/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		dataType : "json",
		data:jsonString,
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				G_msg_pop(data.ResMsg.message);
				ajax_role_list();
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}

//role end



//basedatatype
function menu_basedatatype_list_fn() {
	Queue.push(menu_basedatatype_list_fn);
	ajax_basedatatype_list();
};

function ajax_basedatatype_list() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/basedatatype/list.json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Basedatatype_EventsTable, {
					events: data.list,
					handleClick:ajax_basedatatype_button_handleClick,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
};


function ajax_basedatatype_button_handleClick(m,formdata){
	Queue.push(function(){ajax_basedatatype_button_handleClick(m,formdata)});
	if(m=="detail"){
		ajax_basedatatype_bind_basedatalist(JSON.stringify(formdata));
		return;
	}
	if(m=="add_basedatatype"){
		formdata={};
	}
	ajax_basedatatype_edit(formdata,m);
};
/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_basedatatype_edit(formdata,operate){
	React.render(React.createElement(Basedatatype_edit,{formdata:formdata}), document.getElementById('div_body'));
};

function ajax_basedatatype_save(){
	
	  var opt={
	          formName: "editBasedatatypeForm",
	          url:hostUrl + "rest/basedatatype/save.json",
	          cbFN:null
	          };
	G_ajax_abs_save(opt);
}

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_basedatatype_bind_basedatalist(formdata){
	if(typeof(formdata)=='string')formdata=$.parseJSON(formdata);
	$.AMUI.progress.start();
	var url = hostUrl + "rest/basedatalist/getBaseDataListByTypeuuid.json?typeuuid="+formdata.name;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Basedatatype_bind_basedatalist, {
					formdata:formdata,
					events: data.list,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
	
};
//basedatatype end

//basedatatypelist

function btn_click_basedatatypelist(m,formdata){
	Queue.push(function(){btn_click_basedatatypelist(m,formdata)});
	if(typeof(formdata)=='string')formdata=$.parseJSON(formdata);
	ajax_basedatatypelist_edit(m,formdata);
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_basedatatypelist_edit(m,formdata){
		React.render(React.createElement(Basedatatypelist_edit,{formdata:formdata}), document.getElementById('div_body'));
		return;
	
	
};

function ajax_basedatatypelist_save(){
	var opt={
	 formName:"editBasedatatypelistForm",
	 url:hostUrl + "rest/basedatalist/save.json",
	 cbFN:null,
	 };
	G_ajax_abs_save(opt);
}
//basedatatypelist end

//accounts 
function menu_accounts_list_fn() {
	Queue.push(menu_accounts_list_fn);
	ajax_accounts_listByGroup(Store.getCurGroup().uuid);
};

//
function ajax_accounts_listByGroup(groupuuid) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/accounts/list.json?groupuuid="+groupuuid;
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Accounts_EventsTable, {
					group_uuid:groupuuid,
					group_list:Store.getAllGroup(),
					events: data.list,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
};

function btn_click_accounts(m,formdata){
	Queue.push(function(){btn_click_accounts(m,formdata)});
	ajax_accounts_edit(m,formdata);
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_accounts_edit(m,formdata){
		React.render(React.createElement(Accounts_edit,{type_list: Vo.getTypeList("AD_Accounts_type"),	group_list:Store.getGroup(),formdata:formdata}), document.getElementById('div_body'));
};

function ajax_accounts_save(){
  var opt={
          formName: "editAccountsForm",
          url:hostUrl + "rest/accounts/save.json",
          cbFN:null
          };
G_ajax_abs_save(opt);
}
function ajax_accounts_saveAndAdd(){
  var opt={
          formName: "editAccountsForm",
          url:hostUrl + "rest/accounts/save.json",
          cbFN:function(data){
          	G_msg_pop("保存成功!继续添加.");
          	 var objectForm = $('#editAccountsForm').serializeJson();
          	$('#editAccountsForm [name=title]').val("");
         	$('#editAccountsForm [name=num]').val("");
         	$('#editAccountsForm [name=description]').val("");
          }
          };
G_ajax_abs_save(opt);
}
//accounts end


function ajax_wenjieAdmin_dataRefresh(){
	Queue.clear();
	$.AMUI.progress.start();
	var url = hostUrl + "rest/wenjieAdmin/dataRefresh.json";
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			alert(data.ResMsg.message);
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
			 window.location = hostUrl + "login.html";
		}
	});
}


//平台用户授权
function menu_ad_roleUser_list_fn() {
	Queue.push(menu_ad_roleUser_list_fn,"平台用户授权");
	var group_list=[];
	group_list.push(ADStore.getCurGroup());
	var opt={
			groupuuid:ADStore.getCurGroup().uuid,
			group_list:G_selected_dataModelArray_byArray(group_list,"uuid","brand_name"),
			role_list:Store.getRoleList(0)
		};
	React.render(React.createElement(G_Role_User_EventsTable,opt), document.getElementById('div_body'));

};
//幼儿园用户授权
function menu_kd_roleUser_list_fn() {
	Queue.push(menu_kd_roleUser_list_fn,"幼儿园用户授权");
	var opt={
			groupuuid:ADStore.getCurGroup().uuid,
			group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name"),
			role_list:Store.getRoleList(1)
		};
	React.render(React.createElement(G_Role_User_EventsTable,opt), document.getElementById('div_body'));

};