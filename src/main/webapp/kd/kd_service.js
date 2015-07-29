
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
				Store.setUserRights(data.S_User_rights);
				
				G_CallPhoneFN.jsessionToPhone(data.JSESSIONID);
				
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
				alert("加载数据失败："+data.ResMsg.message);
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
				G_msg_pop(data.ResMsg.message);
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



function menu_group_change_fn(o){
	Store.setCurGroup(o);
	login_affter_init();
}
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
			G_CallPhoneFN.jsessionToPhone("");
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
/*
 * 老师管理功能（获取用户列表服务器请求）；
 * @Userinfo_EventsTable
 * @btn_click_userinfo（绑定在对象上事件）；
 * 并且先在公共模板common_react的
 * @Userinfo_EventsTable方法中继续做下一步处理;
 * */
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
					group_uuid:groupuuid,
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

//老师管理Button事件 添加、启用、禁用、分配、修改;
function btn_click_userinfo(m,obj,usernames){
	Queue.push(function(){btn_click_userinfo(m,obj,usernames);});
	if(m=="add"){
		ajax_userinfo_edit(obj,"add");
	}else if(m=="disable"){
		ajax_userinfo_updateDisable(obj,1);		
	}else if(m=="enable"){
		ajax_userinfo_updateDisable(obj,0);
	}else if(m=="getRole"){
		ajax_userinfo_getRole(obj,usernames, Store.getRoleList());
	}else if(m=="edit"){
		ajax_userinfo_edit({uuid:obj},"edit");
	};
};
/*
 * 老师管理Button事件(添加和修改按钮功能)；
 * @formdata:选中的老师对象；
 * @m：是启用还是禁用功能；"add"-添加  "edit"-修改；
 * @逻辑：如果是"add"添加功能则直接执行Userinfo_edit方法，
 * 不是则继续执行服务器请求修改功能取得数据后执行Userinfo_edit；
 * */
function ajax_userinfo_edit(formdata,m){
	if(m=="add"){
		React.render(React.createElement(Userinfo_edit,{formdata:formdata,select_group_list:selected_dataModel_change_grouplist(Store.getGroup())}), document.getElementById('div_body'));
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
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Userinfo_edit,{mygroup_uuids:data.mygroup_uuids,formdata:data.data,select_group_list:selected_dataModel_change_grouplist(Store.getGroup())}), document.getElementById('div_body'));
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


function btn_ajax_updateRole(useruuid){
	 var uuids=null;
	 $("input[name='table_checkbox']").each(function(){
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
    			data:{type:1,useruuid:useruuid,roleuuids:uuids},
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
 * 将幼儿园列表转换成select要求的数据模型
 * @param group_list
 * @returns {Array}
 */
function selected_dataModel_change_grouplist(group_list){
	var arr=[];
	if(!group_list)return arr;
	for(var i=0;i<group_list.length;i++){
		arr.push( {value: group_list[i].uuid, label:group_list[i].brand_name});
	}
	return arr;
}

function ajax_userinfo_saveByAdmin(){
    var opt={
            formName: "editUserinfoForm",
            url:hostUrl + "rest/userinfo/saveByAdmin.json",
            cbFN:null
            };
G_ajax_abs_save(opt);
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
				G_CallPhoneFN.jsessionToPhone(data.JSESSIONID);
				
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

//userinfo end

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_userinfo_reviseing(formdata,operate){
	React.render(React.createElement(Userinfo_edit,{operate:operate,formdata:formdata,group_list:Store.getGroup()}), document.getElementById('div_body'));

	
};


/*
 * 班级管理（编辑） edit服务器请求
 * @edit老师编辑状态进入可以编辑模式;
 * @请求数据成功后执行Class_EventsTable方法绘制
 * */
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
					group_uuid:groupuuid,
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
	Queue.push(function(){btn_click_class_list(m,groupuuid,uuids);});
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
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};
/*
* 我的班级（主页） show服务器请求；
* @show老师查看状态进入查看学生详情;
* @Class_students_show:绘制班级方法；
* @绘制3级界面学生列表页面；
* @3级界面绘制完成后绑定事件点击ajax_class_students_look_info
*   跳转学生详情绘制界面；
* */
function react_ajax_class_students_manage(uuid,m){
	Queue.push(function(){react_ajax_class_students_manage(uuid);});
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
				alert("加载数据失败："+data.ResMsg.message);
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
				alert("加载数据失败："+data.ResMsg.message);
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
//   根据班级Info信息绘制学生列表详情
	
	if(m=="show"){
		if(students){
			for(var i=0;i<students.length;i++){
				var tmp=students[i];
				tmp.img=G_def_headImgPath;
				if(tmp.headimg)tmp.img=G_imgPath+tmp.headimg;
				tmp.title=tmp.name;
				tmp.link= "javascript:ajax_class_students_look_info('"+tmp.uuid+"')";
			}
		}
		
		React.render(React.createElement(Class_students_show,{formdata:formdata,students:students}), document.getElementById('div_body'));

		return ;
	}
	
	if(students){
		for(var i=0;i<students.length;i++){
			var tmp=students[i];
			tmp.img=G_def_headImgPath;
			if(tmp.headimg)tmp.img=G_imgPath+tmp.headimg;
			tmp.title=tmp.name;
			tmp.link= "javascript:ajax_class_students_edit(null,'"+tmp.uuid+"')";
		}
	}
	
	React.render(React.createElement(Class_students_manage,{formdata:formdata,students:students}), document.getElementById('div_body'));
};



/*
 * 主页我的班级界面下的二级界面学生详细信息
 * @服务器请求:POST rest/student/{uuid}.json;
 * formdata:null（传空值做保护机制）；
 * uuid:用户ID;
 * @根据数据在 Kd_react做绘制处理 
 * */
function ajax_class_students_look_info(uuid){
	
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
				React.render(React.createElement( Class_student_look_info,{formdata:data.data}), document.getElementById('div_body'));
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

function btn_class_student_uploadHeadere(){
	
	w_uploadImg.open(function(guid){
		$("#headimg").val(guid);
		 $("#img_head_image").attr("src",G_imgPath+guid); 
		 G_img_down404("#img_head_image");
	});
	
	
}

function btn_ajax_class_student_save(){
	var objectForm = $('#editClassStudentForm').serializeJson();
    var opt={
            formName: "editClassStudentForm",
            url:hostUrl + "rest/student/save.json",
            cbFN:function(data){
            	G_msg_pop(data.ResMsg.message);
				react_ajax_class_students_manage(objectForm.classuuid);
            }
            };
G_ajax_abs_save(opt);
}

function react_ajax_class_edit_get(formdata,uuid){
	
	
	if(!uuid){
		var userinfo=Store.getUserinfo();
		formdata.headTeacher=userinfo.uuid;
		formdata.headTeacher_name=userinfo.name;
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
				alert("加载数据失败："+data.ResMsg.message);
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
    var opt={
            formName: "editClassForm",
            url:hostUrl + "rest/class/save.json",
            cbFN:null
            };
G_ajax_abs_save(opt);

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
					G_msg_pop(data.ResMsg.message);
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

/*
 * （首页）公告功能服务器请求
 * 
 * */
function ajax_announce_Mylist() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/announcements/queryMyAnnouncements.json";
	$.ajax({
		type : "GET",
		url : url,
		data : null,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Announcements_mylist_EventsTable, {
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
	Queue.push(function(){btn_click_announce(m,groupuuid,uuid);});
	if(m=="add"){
		react_ajax_announce_edit({groupuuid:groupuuid,type:announce_types},null);
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
//公告二级绑定事件 公告详情；
function react_ajax_announce_show(uuid){
	Queue.push(function(){react_ajax_announce_show(uuid);});
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
				React.render(React.createElement(Announcements_show,{data:data.data,count:data.count}), document.getElementById('div_body'));
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
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};

function ajax_announcements_save(){
    var opt={
            formName: "editAnnouncementsForm",
            url:hostUrl + "rest/announcements/save.json",
            cbFN:null
            };
G_ajax_abs_save(opt);
}

//announce end







/*
 * 课程安排功能服务器请求
 * @weeknum:0.表示当前周.-1上周,1下周.2下下周
 * */

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
	Queue.push(function(){btn_click_teachingplan(m,uuid,classuuid);});
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
				alert("加载数据失败："+data.ResMsg.message);
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
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
};

function ajax_teachingplan_save(){
    var opt={
            formName: "editTeachingplanForm",
            url:hostUrl + "rest/teachingplan/save.json",
            cbFN:null
            };
G_ajax_abs_save(opt);

}

function menu_teachingplan_dayShow_fn() {
	Queue.push(menu_teachingplan_dayShow_fn);
	//ajax_teachingplan_dayShow(null,Store.getCurMyClass());
	

	w_ch_class.open(function(uuid,name){ajax_teachingplan_dayShow(null,{uuid:uuid,name:name});});
};
//老师查询，条件groupuuid
//num:0.表示当前.-1上,1下.2下下
//记录当前翻页的周数
var g_teachingplan_listToShow_point=0;
var g_cur_myclass=null;
function ajax_teachingplan_dayShow(num,myclazz) {
	
	if(!myclazz)myclazz=g_cur_myclass;
	else g_cur_myclass=myclazz;
	
	var now=new Date();
	if(!num){
		num=0;
		g_teachingplan_listToShow_point=0;
	}
	g_classnews_class_list=Store.getMyClassList();
	var begDateStr=G_week.getDateStr(now,num);
	var endDateStr=begDateStr;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/teachingplan/list.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {classuuid:g_cur_myclass.uuid,begDateStr:begDateStr,endDateStr:endDateStr},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.list==null)data.list=[];
				var formdata=data.list[0];
				React.render(React.createElement(Teachingplan_showByOneDay,{ch_class:g_cur_myclass,ch_group:Store.getCurGroup(),ch_day:begDateStr,formdata:formdata}), document.getElementById('div_body'));
				
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


/*
 * 课程安排功能服务器请求
 * @weeknum:0.表示当前周.-1上周,1下周.2下下周
 * */

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
	Queue.push(function(){btn_click_cookbookPlan(m,formdata);});
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
				alert("加载数据失败："+data.ResMsg.message);
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
	Queue.push(function(){react_ajax_cookbookPlan_show(uuid);});
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
				alert("加载数据失败："+data.ResMsg.message);
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
				G_msg_pop(data.ResMsg.message);
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


function menu_cookbookPlan_dayShow_fn() {
	Queue.push(menu_classnewsbyMy_list_fn);
	ajax_cookbookPlan_dayShow(null);
};
//老师查询，条件groupuuid
//num:0.表示当前.-1上,1下.2下下
//记录当前翻页的周数
var g_cookbookPlan_listToShow_point=0;
function ajax_cookbookPlan_dayShow(num) {
	var now=new Date();
	if(!num){
		num=0;
		g_cookbookPlan_listToShow_point=0;
	}
	var begDateStr=G_week.getDateStr(now,num);
	var endDateStr=begDateStr;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/cookbookplan/list.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {groupuuid:Store.getCurGroup().uuid,begDateStr:begDateStr,endDateStr:endDateStr},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.list==null)data.list=[];
				var formdata=data.list[0];
				React.render(React.createElement(CookbookPlan_showByOneDay,{ch_group:Store.getCurGroup(),ch_day:begDateStr,formdata:formdata}), document.getElementById('div_body'));
				
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

//cookbookPlan end


function menu_classnewsbyMy_list_fn() {
	Queue.push(menu_classnewsbyMy_list_fn);
	g_classnews_url=hostUrl + "rest/classnews/getClassNewsByMy.json";
	g_classnews_class_list=Store.getMyClassList();
	ajax_classnews_list();
};

//classnews
function menu_classnews_list_fn() {
	Queue.push(menu_classnews_list_fn);
	g_classnews_url=hostUrl + "rest/classnews/getClassNewsByClassuuid.json";
	g_classnews_class_list=Store.getChooseClass(Store.getCurGroup().uuid);
	ajax_classnews_list();
};
//记录当前翻页
var g_classnews_pageNo_point=1;
var g_classnews_classuuid=null;
var g_classnews_url=null;
var g_classnews_class_list=null;
function ajax_classnews_list(classuuid,pageNo) {
	if(!classuuid)classuuid=g_classnews_classuuid;
	else g_classnews_classuuid=classuuid;
	if(!pageNo)pageNo=1;
	g_classnews_pageNo_point=pageNo;
	if(!g_classnews_url){
		alert("ajax_classnews_list 缺少参数:g_classnews_url");
		return;
	}
	$.AMUI.progress.start();
	var url = g_classnews_url+"?uuid="+classuuid+"&pageNo="+pageNo;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Classnews_EventsTable, {
					events: data.list,
					class_list:g_classnews_class_list,
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



function btn_click_classnews(m,formdata){
	Queue.push(function(){btn_click_classnews(m,formdata);});
	ajax_classnews_edit(m,formdata);
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_classnews_edit(m,formdata){
	if(m=="add"){
		if(!formdata.classuuid){
			alert("请选择班级!");
			return;
		}
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
					
					data.data.dianzanList=commons_ajax_dianzan_getByNewsuuid(formdata.uuid);
					React.render(React.createElement(Classnews_show,{formdata:data.data,count:data.count}), document.getElementById('div_body'));
				}
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




function ajax_classnews_save(){
	var opt={
			 formName:"editClassnewsForm",
			 url:hostUrl + "rest/classnews/save.json",
			 cbFN:null
			 };
	G_ajax_abs_save(opt);
}



//classnews end



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

function btn_click_accounts(m,formdata){
	Queue.push(function(){btn_click_accounts(m,formdata);});
	ajax_accounts_edit(m,formdata);
};

/*
* operate=add|edit
* @param formdata
* @param operate
* */
function ajax_accounts_edit(m,formdata){
		React.render(React.createElement(Accounts_edit,{
			type_list: Vo.getTypeList("KD_Accounts_type"),
			class_list:Store.getChooseClass(formdata.groupuuid),
			group_list:Store.getGroup(),formdata:formdata
			}),
			document.getElementById('div_body'));
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
            	// $("input[name=title]").val("");
            	 $("input[name=num]").val("");
            	// $("input[name=description]").val("");
            }
            };
G_ajax_abs_save(opt);
}

   /*
    *(校务管理)<校园列表>服务器 ;
    *@Group_EventsTable:kd_react开始绘制
    * */
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
   /*
    *(校务管理) return出来的按钮事件绑定公共方法；
    *@ajax_group_edit：点击事件后下一步服务器处理公共方法；
    * */
   function btn_click_group(m,formdata){
	   	Queue.push(function(){btn_click_group(m,formdata);});
	   	ajax_group_edit(m,formdata);
	   };
   /*
   * (校务管理)公共模板 服务器请求
   * @add：Group_edit-添加分校绘制界面；
   * @edit：修改；
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
   				alert("加载数据失败："+data.ResMsg.message);
   			}
   		},
   		error : function( obj, textStatus, errorThrown ){
   			$.AMUI.progress.done();
   			alert(url+",error:"+textStatus);
   		}
   	});
   };
   /*
    * （校务管理）校园介绍功能；
    * @ajax_group_edit
    * */
   function menu_group_description_fn(uuid){
   	Queue.push(function(){menu_group_description_fn(uuid);});
   	if(!uuid)uuid=Store.getCurGroup().uuid;
   	ajax_group_edit("show",{uuid:uuid});
   	

   		
   };

   function btn_group_myList(m,formdata){
   	Queue.push(function(){btn_group_myList(m);});
   	if(m=="add_group"){
   		ajax_group_edit({"type":1,"brand_name":""});
   	}else if(m=="edit"){
   		ajax_group_edit(formdata);
   	}
   };

   function ajax_group_save(){
   	
       var opt={
               formName: "editGroupForm",
               url:hostUrl + "rest/group/save.json",
               cbFN:null
               };
   G_ajax_abs_save(opt);
   }
   /*
    * （首页）查看我的消息服务请求；
    * 
    * */
   function ajax_queryMyTimely_myList() {
   	$.AMUI.progress.start();
   	var url = hostUrl + "rest/message/queryMyTimely.json";
   	$.ajax({
   		type : "GET",
   		url : url,
   		data : null,
   		dataType : "json",
   		success : function(data) {
   			$.AMUI.progress.done();
   			if (data.ResMsg.status == "success") {
   				alert("开发一半未完成");
   	//React.render(React.createElement( Class_student_tel,{formdata:data.list}), document.getElementById('div_body'));
   			} else {
   				alert("加载数据失败："+data.ResMsg.message);
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
   
 //———————————————————————————————————家长通讯录—————————————————————————    
   /*
    * （首页）家长通讯录功能；
    *@服务器请求：POST rest/student/parentContactByMyStudent.json
    *@Class_student_tel:开始绘制方法;
    *@formdata:data.list:服务器取回的学生数组数据
    *
    * */
   //大图标统一定义一个菜单;
   function menu_parentContactByMyStudent_fn() {
   	Queue.push(menu_parentContactByMyStudent_fn);
   	ajax_parentContactByMyStudent();
   };
   function ajax_parentContactByMyStudent(){
   	
   	$.AMUI.progress.start();
       var url = hostUrl + "rest/student/parentContactByMyStudent.json";
   	$.ajax({
   		type : "GET",
   		url : url,
   		dataType : "json",
   		 async: true,
   		success : function(data) {
   			$.AMUI.progress.done();
   			// 登陆成功直接进入主页
   			if (data.ResMsg.status == "success") {
   				React.render(React.createElement( Class_student_tel,{formdata:data.list}), document.getElementById('div_body'));
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
   /* (首页)家长通讯录功能发信息界面功能<创建舞台>
    * 因有添加加载信息功能所以创建一个舞台然后把每一次添加的DIV添加到舞台上；
    * */
   function ajax_parentContactByMyStudent_message_list(parent_uuid){
		React.render(React.createElement( ParentContactByMyStudent_message_list,{parent_uuid:parent_uuid}), document.getElementById('div_body'));
	   	
      };
   /* （首页）家长通讯录功能发信息界面功能<绘制每一个DIV信息放置在舞台上>服务器请求
    *  @parent_uuid:每个用户的ID；
    *  
    * */
   function ajax_message_queryByParent(parent_uuid,list_div,pageNo){
	   var re_data=null;
	   if(!pageNo)pageNo=1;
   	$.AMUI.progress.start();
   $.ajax({
   	success : function() {
   		$.AMUI.progress.done();
   	}
   });
   	$.AMUI.progress.start();
       var url = hostUrl + "rest/message/queryByParent.json?uuid="+parent_uuid+"&pageNo="+pageNo;
   	$.ajax({
   		type : "GET",
   		url : url,
   		dataType : "json",
   		 async: false,
   		success : function(data) {
   			$.AMUI.progress.done();
   			// 登陆成功直接进入主页
   			if (data.ResMsg.status == "success") {
   				React.render(React.createElement(Message_queryByParent_listpage, {
					events: data.list,
					parent_uuid:parent_uuid,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
				re_data=data.list;
				
   			} else {
   				alert("加载数据失败："+data.ResMsg.message);
   			}
   		},
   		error : function( obj, textStatus, errorThrown ){
   			$.AMUI.progress.done();
   			alert(url+",error:"+textStatus);
   		}
   	});
   	
   	return re_data;
      };
      
  /*首页家长通讯录功
   * 我要发信息保存操作
   * @opt：高级封装做处理 直接把表单和URL地址送进去
   * @formName:表单信息
   * @直接传给服务器，服务器根据自己需要的从form表单取参数；
   * */
  function ajax_parent_message_save(that){
  	var opt={
  	 formName:"editForm",
  	 url:hostUrl + "rest/message/saveToParent.json",
  	 cbFN:function(data){
			if (data.ResMsg.status == "success") {
				that.refresh_data();
		} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}		 		
  	  }
  	 };
  	 G_ajax_abs_save(opt);
  }
 
      
//———————————————————————————————————园长信箱—————————————————————————      
 /*(标头)<园长信箱>（服务器请求）-取出所有家长和园长沟通讯息List；
  * 调用Boss_student_tel绘制一层界面；
  * */ 
  function ajax_queryLeaderMsgByParents_message(){    	     	   	
	   	$.AMUI.progress.start();
	       var url = hostUrl + "rest/message/queryLeaderMsgByParents.json";
	   	$.ajax({
	   		type : "GET",
	   		url : url,
	   		dataType : "json",
	   		 async: true,
	   		success : function(data) {
	   			$.AMUI.progress.done();
	   			if (data.ResMsg.status == "success") {
	   				React.render(React.createElement( Boss_student_tel,{formdata:data.list}), document.getElementById('div_body'));
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
   /* (标头)<园长信箱>创建舞台
    * 因有加载更多功能，创建舞台，用于装载更多 message的Div放置在舞台上；
    *@Boss_message_list准备开始绘制舞台  
	* @revice_useruuid:收件人ID；
	* @send_useruuid:发送者ID；
    * */
   function ajax_boss_message_list(send_useruuid,revice_useruuid){
		React.render(React.createElement( Boss_message_stage,{send_useruuid:send_useruuid,revice_useruuid:revice_useruuid}), document.getElementById('div_body'));
	   };
		   
		   
   /* (标头)<园长信箱>(服务器请求)-绘制每一个Div信息放置在舞台上；
    * @revice_useruuid:收件人ID；
    * @send_useruuid:发送者ID；
    * */
   function ajax_boss_message(revice_useruuid,send_useruuid,list_div,pageNo){
	   var re_data=null;
	   if(!pageNo)pageNo=1;
   	$.AMUI.progress.start();
   $.ajax({
   	success : function() {
   		$.AMUI.progress.done();
   	}
   });
   	$.AMUI.progress.start();
       var url = hostUrl + "rest/message/queryByParentAndLeader.json?group_uuid="+send_useruuid+"&parent_uuid="+revice_useruuid;
   	$.ajax({
   		type : "GET",
   		url : url,
   		dataType : "json",
   		 async: false,
   		success : function(data) {
   			$.AMUI.progress.done();
   			// 登陆成功直接进入主页
   			if (data.ResMsg.status == "success") {
   				React.render(React.createElement(Message_queryLeaderMsgByParents_listpage, {
					events: data.list,
					send_useruuid:send_useruuid,
					revice_useruuid:revice_useruuid,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
				re_data=data.list;
				
   			} else {
   				alert("加载数据失败："+data.ResMsg.message);
   			}
   		},
   		error : function( obj, textStatus, errorThrown ){
   			$.AMUI.progress.done();
   			alert(url+",error:"+textStatus);
	   		}
	   	});
	   	
	   	return re_data;
	      };
  
  /*(标头)<园长信箱>(服务器请求)-我要发送信息
   * @opt：高级封装做处理 直接把表单和URL地址送进去
   * @formName:表单信息
   * @直接传给服务器，服务器根据自己需要的从form表单取参数；
   * */
  function ajax_boss_message_save(that){
  	var opt={
  	 formName:"editForm",
  	 url:hostUrl + "rest/message/saveLeaderToParent.json",
  	 cbFN:function(data){
			if (data.ResMsg.status == "success") {
				that.refresh_data();
		} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		
  		
  	  }
  	 };
  	 G_ajax_abs_save(opt);
  }    	   
