/**
 * 保存通用方法
var opt={
	 formName:"editClassnewsForm",
	 url:hostUrl + "rest/classnewsreply/save.json",
	 cbFN:null,
	 }
	 ajax_abs_save(opt);
 */
function ajax_abs_save(opt){
$.AMUI.progress.start();
	
	  var objectForm = $('#'+opt.formName).serializeJson();
	  var jsonString=JSON.stringify(objectForm);
	$.ajax({
		type : "POST",
		url : opt.url,
		processData: false, 
		data:jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				if(opt.cbFN){
					opt.cbFN(data);
				}else{
					Queue.doBackFN();
				}
				
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
	
	var url = hostUrl + "rest/userinfo/login.json?loginname=" + loginname + "&password="
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
function ajax_loaddata_group_list_for_userinfo_reg() {
	$.AMUI.progress.start();
    var url = hostUrl + "rest/group/list.json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: false,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Div_userinfo_reg,{group_list:data.list})
						, document.getElementById('div_login'));
				$("#div_seesion_body").hide();
				
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
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
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert("error:"+textStatus);
		}
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
				alert(data.ResMsg.message);
				menu_userinfo_login_fn();
				
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

//group


//获取我的
function ajax_group_myList() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/group/myList.json";
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setGroup(data.list);
				React.render(React.createElement(Group_EventsTable, {events: data.list,handleClick:btn_group_myList, responsive: true, bordered: true, striped :true,hover:true,striped:true}), document.getElementById('div_body'));
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

function menu_group_change_fn(o){
	Store.setCurGroup(o);
	login_affter_init();
}

function menu_group_description_fn(uuid){
	Queue.push(function(){menu_group_description_fn(uuid);});
	if(!uuid)uuid=Store.getCurGroup().uuid;
	ajax_group_edit("show",{uuid:uuid});
	

		
};

function btn_group_myList(m,formdata){
	Queue.push(function(){btn_group_myList(m)});
	if(m=="add_group"){
		ajax_group_edit({"type":1,"brand_name":""});
	}else if(m=="edit"){
		ajax_group_edit(formdata);
	}
};

function btn_click_group(m,formdata){
	Queue.push(function(){btn_click_group(m,formdata)});
	ajax_group_edit(m,formdata);
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_group_edit(m,formdata){
	if(m=="add"){
		formdata={type:"1"};
		React.render(React.createElement(Group_edit,{formdata:formdata}), document.getElementById('div_body'));
		return;
	
	}
	$.AMUI.progress.start();
    var url = hostUrl + "rest/group/"+formdata.uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				if(m=="edit"){
					React.render(React.createElement(Group_edit,{formdata:data.data}), document.getElementById('div_body'));
				}else{
					React.render(React.createElement(Group_show,{formdata:data.data}), document.getElementById('div_body'));
				}
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};


function ajax_group_save(){
$.AMUI.progress.start();
	
	  var objectForm = $('#editGroupForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/group/save.json";
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
				//alert(data.ResMsg.message);
				Queue.doBackFN();
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
//group end

//userinfo


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
//老师管理

//老师查询，条件groupuuid
function menu_userinfo_list_fn() {
	Queue.push(menu_userinfo_list_fn);
	ajax_uesrinfo_listByGroup(Store.getCurGroup().uuid);
};

//
function ajax_uesrinfo_listByGroup(groupuuid) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/list.json?groupuuid="+groupuuid;
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Userinfo_EventsTable, {
					groupuuid:groupuuid,
					group_list:Store.getGroup(),
					events: data.list,
					handleClick:btn_click_userinfo,
					handleChange_selectgroup_uuid:ajax_uesrinfo_listByGroup,
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


function btn_click_userinfo(m,obj,usernames){
	
	Queue.push(function(){btn_click_userinfo(m,obj,usernames)});
	if(m=="add"){
		ajax_userinfo_edit(obj,"add");
	}else if(m=="disable"){
		ajax_userinfo_updateDisable(obj,1);
	}else if(m=="enable"){
		ajax_userinfo_updateDisable(obj,0);
	}else if(m=="getRole"){
		ajax_userinfo_getRole(obj,usernames);
	}
};
function ajax_userinfo_getRole(useruuid,usernames){
	Queue.push(function(){ajax_userinfo_getRole(useruuid,usernames)});
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getRole.json?userUuid="+useruuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				
				React.render(React.createElement(Userinfo_getRole, {
					formdata:{useruuid:useruuid,username:usernames},
					events: Store.getRoleList(),
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


function btn_ajax_updateRole(useruuid){
	 var uuids=null;
	 $("input[name='table_checkbox_right']").each(function(){
		if(this.checked){
			 if(uuids==null)uuids=this.value;
			 else uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
		}
		});
	  if(!uuids){
		  alert("请勾选复选框！");
		  return;
	  }
	  
	$.AMUI.progress.start();
      var url = hostUrl + "rest/userinfo/updateRole.json";
      var opt={
    			type : "POST",
    			url : url,
    			processData: true, 
    			dataType : "json",
    			data:{useruuid:useruuid,roleuuids:uuids},
    			//contentType : false,  
    			success : function(data) {
    				$.AMUI.progress.done();
    				// 登陆成功直接进入主页
    				if (data.ResMsg.status == "success") {
    				
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
function ajax_userinfo_edit(formdata,operate){
	React.render(React.createElement(Userinfo_edit,{operate:operate,formdata:formdata,group_list:Store.getGroup()}), document.getElementById('div_body'));

	
};

function ajax_userinfo_save(){
$.AMUI.progress.start();
	
	  var objectForm = $('#editUserinfoForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/userinfo/add.json";
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
				//alert(data.ResMsg.message);
				Queue.doBackFN();
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
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}
function ajax_userinfo_updateDisable(useruuids,disable){
	
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
					alert(data.ResMsg.message);
					ajax_uesrinfo_listByGroup(groupuuid);
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
//userinfo end



//class


//班级查询，条件groupuuid
//
function ajax_class_listByGroup(groupuuid) {
	if(!groupuuid){
		alert("ajax_class_listByGroup groupuuid is null.");
		return;
	}
	$.AMUI.progress.start();
	var url = hostUrl + "rest/class/list.json?groupuuid="+groupuuid;
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Class_EventsTable, {
					groupuuid:groupuuid,
					group_list:Store.getGroup(),
					events: data.list,
					handleClick:btn_click_class_list,
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


function btn_click_class_list(m,groupuuid,uuids){
	Queue.push(function(){btn_click_class_list(m,groupuuid,uuids)});
	if(m=="add_class"){
		react_ajax_class_edit_get({groupuuid:groupuuid},null);
	}else if(m=="edit_class"){
		if(!uuids&&uuids.indexOf(",")>-1){
			alert("只能选择一个班级进行编辑！");
			return;
		}
		react_ajax_class_edit_get({groupuuid:groupuuid},uuids);
	}else if(m=="graduate_class"){
		//ajax_class_edit({groupuuid:groupuuid},"edit");
	}
		
};

function btn_click_class_list_name(uuid){
	Queue.push(function(){btn_click_class_list_name(uuid);});
	alert("btn_click_class_list_name="+uuid);
		
};
function class_students_manage_onClick(m,classuuid){
	if(m=="add"){
		ajax_class_students_edit({classuuid:classuuid,sex:0},null);
	}
};

function ajax_class_students_edit(formdata,uuid){
	if(!uuid){
		React.render(React.createElement(Class_student_edit,{formdata:formdata}), document.getElementById('div_body'));
		return;
	}
	$.AMUI.progress.start();
    var url = hostUrl + "rest/student/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Class_student_edit,{formdata:data.data}), document.getElementById('div_body'));
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};
function react_ajax_class_students_manage(uuid){
	
	
	$.AMUI.progress.start();
	
	var formdata=null;
    var url = hostUrl + "rest/class/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: false,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				formdata=data.data;
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
	
	//stud
	var students=null;
	url=hostUrl + "rest/student/getStudentByClassuuid.json?classuuid="+uuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: false,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				students=data.list;
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
	
//	var students=[ {
//	    "img": hostUrl+"i/header.png",
//	    "title": "刘小一"
//	  }, {
//  	    "img": hostUrl+"i/header.png",
//	    "title": "刘小二"
//	  }];
	if(students){
		for(var i=0;i<students.length;i++){
			var tmp=students[i];
			tmp.img=G_def_headImgPath;
			if(tmp.headimg)tmp.img=G_imgPath+tmp.headimg;
			tmp.title=tmp.name;
			tmp.link= "javascript:ajax_class_students_edit(null,'"+tmp.uuid+"')"
			
		}
	}
	
	React.render(React.createElement(Class_students_manage,{formdata:formdata,students:students}), document.getElementById('div_body'));
};

function btn_class_student_uploadHeadere(){
	
	w_uploadImg.open(function(guid){
		$("#headimg").val(guid);
		 $("#img_head_image").attr("src",G_imgPath+guid); 
		 G_img_down404("#img_head_image");
	})
	
	
}

function btn_ajax_class_student_save(){
	
	$.AMUI.progress.start();
	  var objectForm = $('#editClassStudentForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
    var url = hostUrl + "rest/student/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, 
		data : jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				react_ajax_class_students_manage(objectForm.classuuid);
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

function react_ajax_class_edit_get(formdata,uuid){
	if(!uuid){
		React.render(React.createElement(Class_edit,{formdata:formdata,group_list:Store.getGroup()}), document.getElementById('div_body'));
		return;
	}
	$.AMUI.progress.start();
    var url = hostUrl + "rest/class/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Class_edit,{formdata:data.data,group_list:Store.getGroup()}), document.getElementById('div_body'));
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_class_edit(formdata,operate){
	React.render(React.createElement(Class_edit,{operate:operate,formdata:formdata,group_list:Store.getGroup()}), document.getElementById('div_body'));
	
};

function ajax_class_save(){
	
$.AMUI.progress.start();
	  var objectForm = $('#editClassForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
    var url = hostUrl + "rest/class/save.json";
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
				//alert(data.ResMsg.message);
				
				Queue.doBackFN();
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

function ajax_class_updateDisable(groupuuid,useruuid,disable){
	if(!groupuuid){
		alert("ajax_class_updateDisable:groupuuid is null!");
		return;
	}
	$.AMUI.progress.start();
	      var url = hostUrl + "rest/class/updateDisable.json";
		$.ajax({
			type : "POST",
			url : url,
			data : {useruuid:useruuid,disable:disable},
			dataType : "json",
			success : function(data) {
				$.AMUI.progress.done();
				// 登陆成功直接进入主页
				if (data.ResMsg.status == "success") {
					alert(data.ResMsg.message);
					ajax_uesrinfo_listByGroup(groupuuid);
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
//class end





//announce


//老师查询，条件groupuuid
//
function ajax_announce_listByGroup(groupuuid) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/announcements/list.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {type:announce_types,groupuuid:groupuuid},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Announcements_EventsTable, {
					groupuuid:groupuuid,
					group_list:Store.getGroup(),
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


function btn_click_announce(m,groupuuid,uuid){
	Queue.push(function(){btn_click_announce(m,groupuuid,uuid)});
	if(m=="add"){
		react_ajax_announce_edit({group_uuid:groupuuid,type:announce_types},null);
	}else if(m=="edit"){
		react_ajax_announce_edit(null,uuid);
	}else if(m=="del"){
		react_ajax_announce_delete(groupuuid,uuid);
	}
};


function react_ajax_announce_delete(groupuuid,uuid){
	
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
				ajax_announce_listByGroup(groupuuid);
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};
function react_ajax_announce_show(uuid){
	Queue.push(function(){react_ajax_announce_show(uuid)});
	$.AMUI.progress.start();
    var url = hostUrl + "rest/announcements/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Announcements_show,{data:data.data}), document.getElementById('div_body'));
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};
function react_ajax_announce_edit(formdata,uuid){
	if(!uuid){
		React.render(React.createElement(Announcements_edit,{formdata:formdata,group_list:Store.getGroup()}), document.getElementById('div_body'));
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
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Announcements_edit,{formdata:data.data,group_list:Store.getGroup()}), document.getElementById('div_body'));
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};

function ajax_announcements_save(){
	$.AMUI.progress.start();
	  var objectForm = $('#editAnnouncementsForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
    var url = hostUrl + "rest/announcements/save.json";
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
				//alert(data.ResMsg.message);
				Queue.doBackFN();
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

//announce end







//teachingplan


//老师查询，条件groupuuid
//weeknum:0.表示当前周.-1上周,1下周.2下下周
//记录当前翻页的周数
var g_cookbookPlan_week_point=0;
var g_teachingplan_classuuid=null;
var g_teachingplan_classname=null;
function ajax_teachingplan_listByClass(classuuid,classname,weeknum) {
	if(classuuid)g_teachingplan_classuuid=classuuid;
	else classuuid=g_teachingplan_classuuid;
	if(classname)g_teachingplan_classname=classname;
	else classname=g_teachingplan_classname;
	
	var now=new Date();
	if(weeknum){
		now=G_week.getDate(now,weeknum*7);
	}else{
		g_cookbookPlan_week_point=0;
	}
	var begDateStr=G_week.getWeek0(now);
	var endDateStr=G_week.getWeek6(now);
	
	$.AMUI.progress.start();
	var url = hostUrl + "rest/teachingplan/list.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {classuuid:classuuid,begDateStr:begDateStr,endDateStr:endDateStr},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.list==null)data.list=[];
				React.render(React.createElement(Teachingplan_EventsTable, {
					classuuid:classuuid,
					classname:classname,
					events: data.list,
					begDateStr:begDateStr,
					endDateStr:endDateStr,
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


function btn_click_teachingplan(m,uuid,classuuid){
	Queue.push(function(){btn_click_teachingplan(m,uuid,classuuid)});
	if(m=="add"){
		react_ajax_teachingplan_edit({classuuid:classuuid},null);
	}else if(m=="edit"){
		react_ajax_teachingplan_edit(null,uuid);
	}else if(m=="del"){
		//react_ajax_teachingplan_delete(groupuuid,uuid);
	}
};


function react_ajax_teachingplan_delete(groupuuid,uuid){
	
	$.AMUI.progress.start();
  var url = hostUrl + "rest/teachingplan/delete.json?uuid="+uuid;
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				ajax_teachingplan_listByClass(groupuuid);
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};
function react_ajax_teachingplan_show(uuid){
	$.AMUI.progress.start();
  var url = hostUrl + "rest/teachingplan/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Teachingplanments_show,{data:data.data}), document.getElementById('div_body'));
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};
function react_ajax_teachingplan_edit(formdata,uuid){
	if(!uuid){
		if(!formdata.classuuid){
			alert("新建课程，班级id必填");
			return;
		}
		React.render(React.createElement(Teachingplan_edit,{formdata:formdata}), document.getElementById('div_body'));
		return;
	}
	$.AMUI.progress.start();
  var url = hostUrl + "rest/teachingplan/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Teachingplan_edit,{formdata:data.data}), document.getElementById('div_body'));
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};

function ajax_teachingplan_save(){
	$.AMUI.progress.start();
	  var objectForm = $('#editTeachingplanForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
  var url = hostUrl + "rest/teachingplan/save.json";
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
				//alert(data.ResMsg.message);
				Queue.doBackFN();
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

//teachingplan end



//cookbookPlan


//老师查询，条件groupuuid
//weeknum:0.表示当前周.-1上周,1下周.2下下周
//记录当前翻页的周数
var g_cookbookPlan_week_point=0;
function ajax_cookbookPlan_listByGroup(groupuuid,weeknum) {
	var now=new Date();
	if(weeknum){
		now=G_week.getDate(now,weeknum*7);
	}else{
		g_cookbookPlan_week_point=0;
	}
	var begDateStr=G_week.getWeek0(now);
	var endDateStr=G_week.getWeek6(now);
	$.AMUI.progress.start();
	var url = hostUrl + "rest/cookbookplan/list.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {groupuuid:groupuuid,begDateStr:begDateStr,endDateStr:endDateStr},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.list==null)data.list=[];
				React.render(React.createElement(CookbookPlan_EventsTable, {
					group_uuid:groupuuid,
					events: data.list,
					begDateStr:begDateStr,
					endDateStr:endDateStr,
					group_list:Store.getGroup(),
					handleClick:btn_click_cookbookPlan,
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



function btn_click_cookbookPlan(m,formdata){
	Queue.push(function(){btn_click_classnews(m,formdata)});
	react_ajax_cookbookPlan_edit(m,formdata);
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function react_ajax_cookbookPlan_edit(m,formdata){
	if(m=="add"){
		if(!formdata.groupuuid){
			alert("新建食谱，学校id必填");
			return;
		}
		React.render(React.createElement(CookbookPlan_edit,{group_list:Store.getGroup(),formdata:formdata}), document.getElementById('div_body'));
		return;
	
	}
	$.AMUI.progress.start();
    var url = hostUrl + "rest/cookbookplan/"+formdata.uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(CookbookPlan_edit,{group_list:Store.getGroup(),formdata:data.data}), document.getElementById('div_body'));

			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};

function react_ajax_cookbookPlan_delete(groupuuid,uuid){
	
	$.AMUI.progress.start();
var url = hostUrl + "rest/cookbookplan/delete.json?uuid="+uuid;
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				ajax_cookbookPlan_listByClass(groupuuid);
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};
function react_ajax_cookbookPlan_show(uuid){
	Queue.push(function(){react_ajax_cookbookPlan_show(uuid)});
	$.AMUI.progress.start();
var url = hostUrl + "rest/cookbookplan/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(CookbookPlanments_show,{data:data.data}), document.getElementById('div_body'));
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};

/**
 * 获取添加的食材图片id
 * divid:div_cookPlan_time_1
 */
function cookbookPlan_getTimeImgUuid(divid){
	  var checkeduuids =null;
	  $("#div_cookPlan_"+divid+" > .G_cookplan_Img").each(function(){
		  
		  		if($(this).is(":hidden")){
		  			return;
		  		}
				 if(checkeduuids==null)checkeduuids=this.title;
				 else
					 checkeduuids+=','+this.title ;    //遍历被选中CheckBox元素的集合 得到Value值
			});
	  return checkeduuids;
}

function ajax_cookbookPlan_save(){
	$.AMUI.progress.start();
	  var objectForm = $('#editCookbookPlanForm').serializeJson();
	  
	  objectForm.time_1=cookbookPlan_getTimeImgUuid("time_1");
	  objectForm.time_2=cookbookPlan_getTimeImgUuid("time_2");
	  objectForm.time_3=cookbookPlan_getTimeImgUuid("time_3");
	  objectForm.time_4=cookbookPlan_getTimeImgUuid("time_4");
	  objectForm.time_5=cookbookPlan_getTimeImgUuid("time_5");
	  var jsonString=JSON.stringify(objectForm);
var url = hostUrl + "rest/cookbookplan/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, 
		data :jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				//alert(data.ResMsg.message);
				Queue.doBackFN();
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

//cookbookPlan end




//classnews
function menu_classnews_list_fn() {
	Queue.push(menu_classnews_list_fn);
	ajax_classnews_list();
};
//记录当前翻页
var g_classnews_pageNo_point=1;
var g_classnews_classuuid=null;
function ajax_classnews_list(classuuid,pageNo) {
	if(!classuuid)classuuid=g_classnews_classuuid;
	else g_classnews_classuuid=classuuid;
	if(!pageNo)pageNo=1;
	g_classnews_pageNo_point=pageNo;
	
	$.AMUI.progress.start();
	var url = hostUrl + "rest/classnews/getClassNewsByClassuuid.json?uuid="+classuuid+"&pageNo="+pageNo;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Classnews_EventsTable, {
					events: data.list,
					class_list:Store.getChooseClass(Store.getCurGroup().uuid),
					handleClick:btn_click_classnews,
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

 function ajax_classnewsreply_list(newsuuid,list_div,pageNo){
	 if(!pageNo)pageNo=1;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/classnewsreply/getReplyByNewsuuid.json?newsuuid="+newsuuid+"&pageNo="+pageNo;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Classnewsreply_listshow, {
					events: data.list,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
				
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


function btn_click_classnews(m,formdata){
	Queue.push(function(){btn_click_classnews(m,formdata)});
	ajax_classnews_edit(m,formdata);
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_classnews_edit(m,formdata){
	if(m=="add"){
		React.render(React.createElement(Classnews_edit,{formdata:formdata}), document.getElementById('div_body'));
		return;
	
	}
	$.AMUI.progress.start();
    var url = hostUrl + "rest/classnews/"+formdata.uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				if(m=="edit"){
					React.render(React.createElement(Classnews_edit,{formdata:data.data}), document.getElementById('div_body'));
				}else{
					React.render(React.createElement(Classnews_show,{formdata:data.data}), document.getElementById('div_body'));
				}
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};


function ajax_classnewsreply_save(){
	var opt={
	 formName:"editClassnewsreplyForm",
	 url:hostUrl + "rest/classnewsreply/save.json",
	 cbFN:null,
	 };
	 ajax_abs_save(opt);
}


function ajax_classnews_dianzan(){
	$('#dianzan').html($('#dianzan').html()+","+Store.getUserinfo().name);
}

function ajax_classnews_save(){
$.AMUI.progress.start();
	
	  var objectForm = $('#editClassnewsForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
var url = hostUrl + "rest/classnews/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, 
		data:jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
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



//classnews end