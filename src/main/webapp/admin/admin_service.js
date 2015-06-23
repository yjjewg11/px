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

//right
function menu_right_list_fn() {
	Queue.push(menu_right_list_fn);
	ajax_right_list();
};

var right_list_type=null;
function ajax_right_list(type) {
	if(type)right_list_type=type;
	else type=right_list_type;
	if(!type)type="0";
	$.AMUI.progress.start();
	var url = hostUrl + "rest/right/list.json?type="+type;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Right_EventsTable, {
					type:type,
					events: data.list,
					handleClick:ajax_right_button_handleClick,
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


function ajax_right_button_handleClick(m,type){
	if(m=="add_right"){
		ajax_right_edit({type:type},"add");
	}
};

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_right_edit(formdata,operate){
	React.render(React.createElement(Right_edit,{formdata:formdata}), document.getElementById('div_body'));
};

function ajax_right_save(){
$.AMUI.progress.start();
	
//	  var objectForm = $('#editRightForm').serializeJson();
//	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/right/save.json?"+$('#editRightForm').serialize();
	$.ajax({
		type : "POST",
		url : url,
		processData: true, //设置 processData 选项为 false，防止自动转换数据格式。
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				ajax_right_list();
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


function ajax_role_button_handleClick(m,type){
	if(m=="add_role"){
		ajax_role_edit({type:type},"add");
	}
};

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_role_edit(formdata,operate){
	React.render(React.createElement(Role_edit,{formdata:formdata}), document.getElementById('div_body'));
};

function ajax_role_save(){
$.AMUI.progress.start();
	
//	  var objectForm = $('#editRoleForm').serializeJson();
//	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/role/save.json?"+$('#editRoleForm').serialize();
	$.ajax({
		type : "POST",
		url : url,
		processData: true, //设置 processData 选项为 false，防止自动转换数据格式。
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
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


function ajax_basedatatype_button_handleClick(m){
	if(m=="add_basedatatype"){
		ajax_basedatatype_edit({},"add");
	}
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
$.AMUI.progress.start();
	
//	  var objectForm = $('#editBasedatatypeForm').serializeJson();
//	  var jsonString=JSON.stringify(objectForm);
    var url = hostUrl + "rest/basedatatype/save.json?"+$('#editBasedatatypeForm').serialize();
	$.ajax({
		type : "POST",
		url : url,
		processData: true, //设置 processData 选项为 false，防止自动转换数据格式。
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				ajax_basedatatype_list();
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

//basedatatype end