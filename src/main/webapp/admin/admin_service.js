
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
//老师管理
function menu_userinfo_list_fn() {
	Queue.push(menu_userinfo_list_fn);
	ajax_uesrinfo_listByGroup(Store.getCurGroup().uuid);
};

//老师查询，条件groupuuid
//
function ajax_uesrinfo_listByGroup(groupuuid) {
	var group=Store.getGroup();
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
					group_list:group,
					events: data.list,
					handleClick:ajax_userinfo_button_handleClick,
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


function ajax_userinfo_button_handleClick(m,groupuuid,useruuid){
	if(m=="add_userinfo"){
		ajax_userinfo_edit({},"add");
	}else if(m=="add_disable"){
		ajax_userinfo_updateDisable(groupuuid,useruuid,1);
	}else if(m=="add_enable"){
		ajax_userinfo_updateDisable(groupuuid,useruuid,0);
	}
};

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_userinfo_edit(formdata,operate){
	
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
				React.render(React.createElement(Userinfo_edit,{operate:operate,formdata:formdata,group_uuid_data:data.list}), document.getElementById('div_body'));
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

function ajax_userinfo_updateDisable(groupuuid,useruuid,disable){
	if(!groupuuid){
		alert("ajax_userinfo_updateDisable:groupuuid is null!");
		return;
	}
	$.AMUI.progress.start();
	      var url = hostUrl + "rest/userinfo/updateDisable.json";
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