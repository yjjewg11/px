
//group
function ajax_group_myList_button_handleClick(m){
	if(m=="add_group"){
		ajax_group_edit({"type":1,"brand_name":""});
	}
};
//获取我的
function ajax_group_myList() {
	Queue.push(ajax_group_myList);
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
				React.render(React.createElement(Group_EventsTable, {events: data.list,handleClick:ajax_group_myList_button_handleClick, responsive: true, bordered: true, striped :true,hover:true,striped:true}), document.getElementById('div_body'));
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

function ajax_group_edit(data){
	Queue.push(function(){ajax_group_edit(data)});
	React.render(React.createElement(Group_edit,{formdata:data}), document.getElementById('div_body'));
};

function ajax_group_save(){
$.AMUI.progress.start();
	
	  var objectForm = $('#editGroupForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/group/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
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
//获取我的
function ajax_uesrinfo_listByMyGroup() {
	Queue.push(ajax_uesrinfo_listByMyGroup);
	React.render(React.createElement(Userinfo_EventsTable, {events: [],handleClick:ajax_userinfo_button_handleClick, responsive: true, bordered: true, striped :true,hover:true,striped:true}), document.getElementById('div_body'));
	return;
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
				React.render(React.createElement(Group_EventsTable, {events: data.list,handleClick:ajax_group_myList_button_handleClick, responsive: true, bordered: true, striped :true,hover:true,striped:true}), document.getElementById('div_body'));
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


function ajax_userinfo_button_handleClick(m){
	if(m=="add_userinfo"){
		ajax_userinfo_edit({});
	}else if(m=="add_disable"){
		//React.render(React.createElement(Group_edit,{formdata:{"type":1,"brand_name":""}}), document.getElementById('div_body'));
	}else if(m=="add_enable"){
		//React.render(React.createElement(Group_edit,{formdata:{"type":1,"brand_name":""}}), document.getElementById('div_body'));
	}
};

function ajax_userinfo_edit(formdata){
	
	$.AMUI.progress.start();
    var url = hostUrl + "rest/group/myList.json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Userinfo_edit,{formdata:formdata,group_uuid_data:data.list}), document.getElementById('div_body'));
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

function ajax_userinfo_save(){
$.AMUI.progress.start();
	
	  var objectForm = $('#editUserinfoForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/userinfo/add.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
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