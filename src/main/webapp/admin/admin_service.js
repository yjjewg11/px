function G_ajax_getGroup_uuid_wjkj() {
	 var data = [
		            {uuid: 'wjkj',brand_name: '问界科技'}
		          ];
	    return {
		      group_list: data
		    };
}

function ajax_getUserinfo(isInit) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getUserinfo.json?grouptype=0";
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

/*
 * 家长管理
 * */
function menu_Parent_fn_byRight() { 
	Queue.push(menu_Parent_fn_byRight);
	ajax_Parent_div_admin();
};
/*     
*
* <家长管理>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
* 基本框 等
* */
function ajax_Parent_div_admin(){
//	var list=Store.getGroupByRight('KD_teacher_m');
	React.render(React.createElement(Parent_EventsTable_div), document.getElementById('div_body'));  	
};


//家长查询，条件groupuuid
//
function ajax_Parent_listByAllGroup_admin(list_div,name,pageNo,callback) {
	var re_data=null;
	  if(!name)name="";
  	 if(!pageNo)pageNo=1;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/parent/listByPageWjkj.json";
	$.ajax({
		type : "GET",
		url : url,
 		data :{name:name,pageNo:pageNo},
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Parent_EventRow_admin, {
					events: data.list.data,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
				if(typeof callback=='function'){
					callback(data.list);
				}
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
	return re_data;
};





















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
	var list=G_ajax_getGroup_uuid_wjkj().group_list;
	React.render(React.createElement(Userinfo_EventsTable_div,{
		group_list:G_selected_dataModelArray_byArray(list,"uuid","brand_name"),
		handleClick:btn_click_userinfo,
		groupuuid:"wjkj"
	}), document.getElementById('div_body'));  	
};


//老师查询，条件groupuuid
//
function ajax_uesrinfo_listByAllGroup_admin(list_div,groupuuid,name,pageNo,callback) {
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

 				if(typeof callback=='function'){
					callback(data.list);
				}
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
             url:hostUrl + "rest/userinfo/saveByAdminWjkj.json",
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
	 cbFN:null
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
	Queue.push(menu_ad_roleUser_list_fn,"问界平台授权");
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
	Queue.push(menu_kd_roleUser_list_fn,"幼儿园授权");
	var opt={
			groupuuid:ADStore.getCurGroup().uuid,
			group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name"),
			role_list:Store.getRoleList(1)
		};
	React.render(React.createElement(G_Role_User_EventsTable,opt), document.getElementById('div_body'));

};

//培训机构授权
function menu_px_roleUser_list_fn() {
	Queue.push(menu_px_roleUser_list_fn,"培训机构授权");
	var opt={
			groupuuid:ADStore.getCurGroup().uuid,
			group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name"),
			role_list:Store.getRoleList(2)
		};
	React.render(React.createElement(G_Role_User_EventsTable,opt), document.getElementById('div_body'));

};

//——————————————————————————班级互动<管理模块>—————————————————————————— 	  
/*
 * <班级互动>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * @type：Type：1自己相关的互动 Type:2 所有人的互动;
 * */
var hd_type_byRight="";
function ajax_classnews_list_div_byRight(type){
	  Queue.push (function(){ajax_classnews_list_div_byRight(type);},"班级互动") ;
	  hd_type_byRight=type;
	  React.render(React.createElement(Classnews_Div_list_byRight,{
		type:hd_type_byRight
		}), document.getElementById('div_body'));  	
};
/*
 * <班级互动>服务器请求
 * @请求数据成功后执行Classnews_EventsTable方法绘制
 * 在kd_react
 * */
var g_classnews_pageNo_point=1;
function ajax_classs_Mygoodlist_byRight(list_div,pageNo,type,callback) {
//	var re_data=null;
	var url;
	if(!pageNo)pageNo=1;
	g_classnews_pageNo_point=pageNo;
	$.AMUI.progress.start();
	url =hostUrl + "rest/classnews/getAllClassNewsByWJ.json";

	$.ajax({
		type : "GET",
		url : url,
  		data : {pageNo:pageNo},
		dataType : "json",
//		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Classnews_EventsTable_byRight, {
					events: data.list,
					handleClick:btn_click_classnews_byRight,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
				if(typeof callback=='function'){
					callback(data.list);
				}
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
};

/*
 * <班级互动>添加与编辑按钮事件和列表点击处理方法
 * @请求数据成功后执行ajax_classnews_edit方法绘制
 * 在kd_react
 * */
function btn_click_classnews_byRight(m,formdata){
	Queue.push(function(){btn_click_classnews_byRight(m,formdata);},"发布互动");
	ajax_classnews_edit(m,formdata);
};	  
/*
 * <班级互动>添加与编辑按钮服务器请求（公共方法大图标班级活动也请求此方法）
 * @请求数据成功后执行Classnews_edit方法绘制;
 * @Classnews_show:大图标班级互动跳转绘制和列表名字点击按钮详情绘制;
 * 在kd_react
 * */
function ajax_classnews_edit_byRight(m,formdata){
	  var myclasslist=G_selected_dataModelArray_byArray(mycalsslist,"uuid","name");
		if(myclasslist==null||myclasslist.length==0){
			G_msg_pop("你没有所属班级,不能发布班级互动.");
			return;
		}
	if(m=="add"){
		React.render(React.createElement(Classnews_edit_byRight,{
			formdata:formdata,
			mycalsslist:G_selected_dataModelArray_byArray(mycalsslist,"uuid","name")
			}), document.getElementById('div_body'));
	}
};
/*
 * <班级互动>添加与编辑提交按钮服务器请求
 * @Form表单发给服务器，服务器自己取需要的参数；
 * */
function ajax_classnews_save_byRight(){	
	  var imgs="";
	  $(".G_cookplan_Img_img").each(function(){
		  imgs+=","+$(this).attr("src");
		});	  
	  $('#imgs').val(imgs);	  
	var opt={
			 formName:"editClassnewsForm",
			 url:hostUrl + "rest/classnews/save.json",
			 cbFN:null
			 };
	G_ajax_abs_save(opt);
}

//————————————————————————————帮助管理<管理模块>—————————————————————————    
/*
*(帮助管理)<幼儿园帮助文档><培训机构帮助文档>服务器请求
* @types- 91:幼儿园帮助文档  92:培训机构帮助文档
* @group_list:根据下拉框需求的数据模型调用公用方法转换一次；
* */
function ajax_announce_Help_byRight(){
	
	React.render(React.createElement(Announcements_EventsTable_HelpbyRight, {
		pageNo:1,
		events: [],
		type:announce_Helptypes,
		responsive: true, bordered: true, striped :true,hover:true,striped:true
		}), document.getElementById('div_body'));
	return;
}; 
/*
* 帮助管理模块详情内容绘制
* @Announcements_show_Right:详情绘制
* 在kd_rect;
* */
function react_ajax_announce_help_byRight(uuid,Titlenmae){
	Queue.push(function(){react_ajax_announce_help_byRight(uuid,Titlenmae);},Titlenmae);
	$.AMUI.progress.start();
  var url = hostUrl + "rest/announcements/"+uuid+".json";
$.ajax({
	type : "GET",
	url : url,
	dataType : "json",
	 async: true,
	success : function(data) {
		$.AMUI.progress.done();
		if (data.ResMsg.status == "success") {
			React.render(React.createElement(Announcements_helpshow_byRight,{
				data:data.data,
				count:data.count
				}), document.getElementById('div_body'));
		} else {
			alert("加载数据失败："+data.ResMsg.message);
		}
	},
	error :G_ajax_error_fn
	});
}; 
/*
*(帮助管理)<幼儿园帮助文档><培训机构帮助文档>创建按钮、详情里面的删除、编辑按钮
* @add:创建；
* @edit:编辑；
* @del:删除；
* */  
function btn_click_announce_helpbyRight(m,groupuuid,uuid){
	if(m=="add"){
		Queue.push(function(){btn_click_announce_helpbyRight(m,groupuuid,uuid);},"创建信息");
		react_ajax_announce_edit_helpbyRight({groupuuid:groupuuid,type:announce_Helptypes},null);
	}else if(m=="edit"){
		Queue.push(function(){btn_click_announce_helpbyRight(m,groupuuid,uuid);},"编辑信息");
		react_ajax_announce_edit_helpbyRight(null,uuid);
	}else if(m=="del"){
		react_ajax_announce_delete_helpbyRight(groupuuid,uuid);
	}
}; 

/*
*(帮助管理)<幼儿园帮助文档><培训机构帮助文档>创建与编辑服务请求；
* @if(!uuid):创建；
* @uuid不是则:编辑；
* */  	  
function react_ajax_announce_edit_helpbyRight(formdata,uuid){
	if(!uuid){
		React.render(React.createElement(Announcements_edit_helpbyRight,{
			formdata:formdata,
			group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name")
			}), document.getElementById('div_body'));
		return;
	}
	$.AMUI.progress.start();
    var url = hostUrl + "rest/announcements/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Announcements_edit_helpbyRight,{
					formdata:data.data,
					group_list:G_selected_dataModelArray_byArray(Store.getAllGroup(),"uuid","brand_name")
					}),document.getElementById('div_body'));
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};


/*
*(帮助管理)<幼儿园帮助文档><培训机构帮助文档>删除按钮服务请求；
*@ajax_announce_listByGroup：删除成功后调用发布消息方法刷新;
* */  	  
function react_ajax_announce_delete_helpbyRight(groupuuid,uuid){	 
	if(!confirm("确定要删除吗?")){
		return;
	}
	$.AMUI.progress.start();
    var url = hostUrl + "rest/announcements/delete.json?uuid="+uuid;
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				ajax_announce_Help_byRight();
			} else {
				alert(data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};  
/*
*(帮助管理)<幼儿园帮助文档><培训机构帮助文档>创建与编辑提交按钮方法
*@OPT：我们把内容用Form表单提交到Opt我们封装的
*一个方法内直接传给服务器，服务器从表单取出需要的参数
* */    
function ajax_announcements_save_helpbyRight(){
    var opt={
            formName: "editAnnouncementsForm",
        url:hostUrl + "rest/announcements/save.json",
            cbFN:null
            };
G_ajax_abs_save(opt);
}  



//————————————————————————————信息管理<管理模块>—————————————————————————    
/*
*(信息管理)<校园公告><老师公告><精品文章><招生计划>服务器请求
* @types- 0:校园公告,1:老师公告 2:班级通知,3:"精品文章',4:"招生计划"
* @group_list:根据下拉框需求的数据模型调用公用方法转换一次；
* */

function admin_announce_listByGroup_wjkj(type){
	if(!type)type=0;
	React.render(React.createElement(admin_EventsTable_wjkj, {
		pageNo:1,
		events: [],
		typelisg:G_getMsgProps().msg_list,
		type:type,
		responsive: true, bordered: true, striped :true,hover:true,striped:true
		}), document.getElementById('div_body'));
	return;
}; 
/*
* 信息管理模块详情内容绘制
* @Announcements_show_Right:详情绘制
* 在kd_rect;
* */
function react_ajax_announce_show_byRight(uuid){
	$.AMUI.progress.start();
  var url = hostUrl + "rest/announcements/"+uuid+".json";
$.ajax({
	type : "GET",
	url : url,
	dataType : "json",
	 async: true,
	success : function(data) {
		$.AMUI.progress.done();
		if (data.ResMsg.status == "success") {
				var o=data.data;
				  if(o.url){
						var flag=G_CallPhoneFN.openNewWindowUrl(o.title,o.title,null,data.share_url);
						if(flag)return;
				  }
			React.render(React.createElement(Announcements_show_byRight,{
				share_url:data.share_url,
				data:data.data,
				count:data.count
				}), G_get_div_second());
		} else {
			alert("加载数据失败："+data.ResMsg.message);
		}
	},
	error :G_ajax_error_fn
	});
}; 






var g_student_query_point=1;
function ajax_student_query_byRight(groupuuid,classuuid,name,pageNo) {
	Queue.push(function(){ajax_student_query_byRight(groupuuid,classuuid,name,pageNo);},"学生列表");
	  if(!groupuuid)groupuuid="";
	  if(!classuuid)classuuid="";
	 if(!name)name="";
	  if(!pageNo)pageNo=1;
	 g_student_query_point=pageNo;
		$.AMUI.progress.start();
		var url = hostUrl + "rest/student/querybyRight.json?groupuuid="+groupuuid+"&classuuid="+classuuid+"&name="+name+"&pageNo="+pageNo;
		$.ajax({          
			type : "GET",  
			url : url,
			dataType : "json",
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
	  				React.render(React.createElement(Query_stutent_list_byRight, {
	  					group_uuid:groupuuid,
	  					class_uuid:classuuid,
	  					name:name,
	  					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_student_allquery"),"uuid","brand_name"),
	  					data:data,
	  					events: data.list.data,
	  					responsive: true, bordered: true, striped :true,hover:true,striped:true
	  					
	  				}), document.getElementById('div_body'));
					
				} else {
					alert(data.ResMsg.message);
				}
			},
			error :G_ajax_error_fn
		});
	};










//———————————————————————————查询所有机构<管理模块>—————————————————————————  
/*
 *(查询所有机构)<校园列表>服务器请求 ;
 *@Group_EventsTable:kd_react开始绘制
 * */
var g_group_list_point=1;
var g_group_list_type;
function ajax_group_myList_wjkj(type,pageNo) {
	  if(!pageNo)pageNo=1;
   g_group_list_point=pageNo;
   g_group_list_type=type;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/group/allListByRightwjkj.json";
	$.ajax({
		type : "GET",
		url : url,
		data :{type:type,pageNo:pageNo},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
  				React.render(React.createElement(Group_EventsTable_wjkj_byRight, {
  					events: data.list.data,
  					data:data,
  					responsive: true, bordered: true, striped :true,hover:true,striped:true
  					
  				}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};

/*
*(查询所有机构)预览公共方法
*/
function ajax_group_edit_byRight_wjkj(formdata){
   	$.AMUI.progress.start();
       var url = hostUrl + "rest/group/"+formdata.uuid+".json";
   	$.ajax({
   		type : "GET",
   		url : url,
   		dataType : "json",
   		 async: true,
   		success : function(data) {
   			$.AMUI.progress.done();
   			if (data.ResMsg.status == "success") {
   				React.render(React.createElement(Group_show_byRight_wjkj,{formdata:data.data,count:data.count}), G_get_div_second());
   			} else {
   				alert("加载数据失败："+data.ResMsg.message);
   			}
   		},
  		error :G_ajax_error_fn
   	});
   }; 
   
   
   
   
 //———————————————————————————查询所有老师<管理模块>—————————————————————————    
   
   /*     
   * (查询功能)-查询所有老师
   * */
   var g_user_list_point=1;
  function ajax_uesrinfo_myList_wjkj(pageNo){
	  if(!pageNo)pageNo=1;
	  g_user_list_point=pageNo;
		$.AMUI.progress.start();
		var url = hostUrl + "rest/userinfo/alllistByPagewjkj.json";
		$.ajax({
			type : "GET",
			url : url,
			data :{pageNo:pageNo},
			dataType : "json",
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
	  				React.render(React.createElement(ajax_uesrinfo_listBy_wjkj, {
	  					events: data.list.data,
	  					data:data,
	  					responsive: true, bordered: true, striped :true,hover:true,striped:true
	  					
	  				}), document.getElementById('div_body'));
					
				} else {
					alert(data.ResMsg.message);
				}
			},
			error :G_ajax_error_fn
		});
  };
 
  
  
  
//————————————————————————————审核话题举报<审核>—————————————————————————    
  /*
  *(信息管理)<校园公告><老师公告><精品文章><招生计划>服务器请求
  * @types- 0:校园公告,1:老师公告 2:班级通知,3:"精品文章',4:"招生计划"
  * @group_list:根据下拉框需求的数据模型调用公用方法转换一次；
  * */
function admin_sns_checklist_byRight(){
	React.render(React.createElement(Admin_SnsTable_byRight, {
		pageNo:1,
		events: [],
		responsive: true, bordered: true, striped :true,hover:true,striped:true
		}), document.getElementById('div_body'));
	return;
}; 
/*
 * 信息管理模块详情内容绘制
 * @Announcements_show_Right:详情绘制
 * 在kd_rect;
 * */
function react_ajax_announce_show_byRight(uuid,Titlenmae){
	Queue.push(function(){react_ajax_announce_show_byRight(uuid,Titlenmae);},Titlenmae);
	$.AMUI.progress.start();
    var url = hostUrl + "rest/announcements/"+uuid+".json";
$.ajax({
	type : "GET",
	url : url,
	dataType : "json",
	 async: true,
	success : function(data) {
		$.AMUI.progress.done();
		if (data.ResMsg.status == "success") {
				var o=data.data;
				  if(o.url){
						var flag=G_CallPhoneFN.openNewWindowUrl(o.title,o.title,null,data.share_url);
						if(flag)return;
				  }
			React.render(React.createElement(Announcements_show_byRight,{
				share_url:data.share_url,
				data:data.data,
				count:data.count
				}), document.getElementById('div_body'));
		} else {
			alert("加载数据失败："+data.ResMsg.message);
		}
	},
	error :G_ajax_error_fn
	});
}; 
/*
*(信息管理)<校园公告><老师公告><精品文章><招生计划>创建按钮、详情里面的删除、编辑按钮
* @add:创建；
* @edit:编辑；
* @del:删除；
* */  
function btn_click_announce_byRight(m,groupuuid,uuid){
  	if(m=="add"){
		Queue.push(function(){btn_click_announce_byRight(m,groupuuid,uuid);},"创建信息");
  		react_ajax_announce_edit_byRight({groupuuid:groupuuid,type:announce_types},null);
  	}else if(m=="edit"){
  		Queue.push(function(){btn_click_announce_byRight(m,groupuuid,uuid);},"编辑信息");
  		react_ajax_announce_edit_byRight(null,uuid);
  	}else if(m=="del"){
  		react_ajax_announce_delete_byRight(groupuuid,uuid);
  	}
  }; 

/*
 *(信息管理)<校园公告><老师公告><精品文章><招生计划>创建与编辑服务请求；
 * @if(!uuid):创建；
 * @uuid不是则:编辑；
 * */  	  
function react_ajax_announce_edit_byRight(formdata,uuid){
  	if(!uuid){
  		React.render(React.createElement(Announcements_edit_byRight,{
  			formdata:formdata,
  			group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_announce_m"),"uuid","brand_name")
  			}), document.getElementById('div_body'));
  		return;
  	}
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/announcements/"+uuid+".json";
  	$.ajax({
  		type : "GET",
  		url : url,
  		dataType : "json",
  		 async: true,
  		success : function(data) {
  			$.AMUI.progress.done();
  			if (data.ResMsg.status == "success") {
  				React.render(React.createElement(Announcements_edit_byRight,{
  					formdata:data.data,
  					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_announce_m"),"uuid","brand_name")
  					}),document.getElementById('div_body'));
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
		error :G_ajax_error_fn
  	});
  };
  
  
/*
 *(信息管理)<校园公告><老师公告><精品文章><招生计划>删除按钮服务请求；
 *@ajax_announce_listByGroup：删除成功后调用发布消息方法刷新;
 * */  	  
function react_ajax_announce_delete_byRight(groupuuid,uuid){	 
	if(!confirm("确定要删除吗?")){
		return;
	}
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/announcements/delete.json?uuid="+uuid;
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				ajax_announce_listByGroup_byRight();
			} else {
				alert(data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};  
  /*
  *(信息管理)<校园公告><老师公告><精品文章><招生计划>创建与编辑提交按钮方法
  *@OPT：我们把内容用Form表单提交到Opt我们封装的
  *一个方法内直接传给服务器，服务器从表单取出需要的参数
  * */    
  function ajax_announcements_save_byRight(){
      var opt={
              formName: "editAnnouncementsForm",
          url:hostUrl + "rest/announcements/save.json",
              cbFN:null
              };
  G_ajax_abs_save(opt);
  }    