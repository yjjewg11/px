

function menu_group_change_fn(o){
	Store.setCurGroup(o);
	login_affter_init();
}


/*
 * 每5分钟消息是否有新消息服务请求
 * @data.count:0没新消息   大于0有新消息;
 * @MessageTimer.start:入口每次5分钟;
 * @update_create_time：点击即时消息时截取时间5分钟另外一条线程把时间发到服务器做最新信息截取时间;
 * @注意图片 名字 勿轻易更改
 * */
var MessageTimer={
		create_time:null,
		init:false,
	start:function(){
		if(G_CallPhoneFN.isPhoneApp())return;
		if(this.init)return;
		this.init=true;
		MessageTimer.do_loop();
	},
	do_loop:function(){
		MessageTimer.pxMessageTimer();
	},
	update_create_time:function(){
		MessageTimer.create_time=new Date().format('yyyy-MM-dd h:m:s');
		MessageTimer.upate_img_status_read();
	},
	upate_img_status_read:function(){
   	  $("[src$='i/icon-msg-you.png']").attr("src",hostUrlCDN+"i/icon-msg-wu.png");
	},
	/**
	 * 
	 */
	 pxMessageTimer:function (){
		  setTimeout(MessageTimer.do_loop,5*60*1000);
	    var url = hostUrl + "rest/pushMessage/queryMsgCount.json";
		$.ajax({
			type : "GET",
			url : url,
			data:{create_time:MessageTimer.create_time},
			dataType : "json",
			 async: false,
			success : function(data) {
				if (data.ResMsg.status == "success") {					
	              if(data.count=0){
	            	  MessageTimer.upate_img_status_read();
	              }else{
	            	 // div_header_props.div_header_props.data.right.title="新消息";
	            	 // alert( $("[src$='i/icon-msg-wu.png']").attr("src"));
	            	  $("[src$='i/icon-msg-wu.png']").attr("src",hostUrlCDN+"i/icon-msg-you.png");
	              }				
				}
			},
			error : function( obj, textStatus, errorThrown ){}			
		});
	}
};









//±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±
//————————————————————————————即时消息—————————————————————————    
/*
 * （首页）即时消息(服务请求)；
 * @跳转d_react绘制 
 * */
function ajax_queryMyTimely_myList() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/pushMessage/queryMy.json";
	$.ajax({
		type : "GET",
		url : url,
		data : null,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				MessageTimer.update_create_time(); 
		        React.render(React.createElement(Message_queryMyTimely_myList,{
		        	formdata:data.list
		        	}), document.getElementById('div_body'));
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};


/*
 * （首页））即时消息(舞台跳转)；
 * @thpe:0:公告,1:内部通知（教师可见）,3:精品文章.4:招生计划 7:课程表 6:食谱,5:精品课程,99:班级互动.
 * 10:html类型直接去url地址,调用浏览器显示;,11:家长通讯录信息 12：园长信箱 13：签到记录
 * @reluuid:与type配合确定某个模块的详细的uuid.用于跳转到该模块的详细显示;
 * Type取值0时:rel_uuid为公告的uuid.点击显示公告详细页面.
 * Type取值11时:rel_uuid为关联老师的uuid.点击显示与老师的写信列表页面.
 * Type取值12时:rel_uuid为关联幼儿园的uuid.点击显示与幼儿园园长的写信列表页面.
 * Type取值13时:rel_uuid为关联孩子的uuid.点击显示与孩子的签到记录页面..
 * */    
function ajax_State_style(type,reluuid,group_uuid,num){
	 switch (type)   
	   {
    case 0:                                 
 	       react_ajax_announce_show(reluuid,"公告信息");   //(公告);   
        break;      
    case 1:                                 
	       react_ajax_announce_show(reluuid,"老师公告");   //(老师公告);   
        break;   
    case 3:                                          
 	       react_ajax_announce_show(reluuid,"精品文章");   //(精品文章);
        break;
	case 4:                                          
		   react_ajax_announce_show(reluuid,"招生计划");   //(招生计划);  
	       break;
    case 7:   
    	px_ajax_teachingplan_fn();
    	 //  ajax_teachingplan_dayShow(null,{uuid:reluuid,nmae:""});  //(课程表);
	       break;
	case 5:                                          
		   Console.WriteLine("Case 7");             //(精品课程);
        break;
	case 99:     
		 ajax_msg_div(reluuid);
		   //ajax_classnews_list(reluuid);        //(班级互动;
	       break;
	case 11:                                          
		   ajax_parentContactByMyStudent_message_list(reluuid,"家长通讯");   //家长通讯录信息(未验证功能);
	       break;
	case 12:  
		ajax_boss_message_list_byRight(group_uuid,reluuid); //园长信箱(未验证功能);
//	 	@revice_useruuid:收件人ID------group_uuid;
//	 	@send_useruuid:发送者ID--------reluuid;
	       break;
	case 13:                                          
	           Console.WriteLine("Case 13");         //签到记录(未验证功能);
	       break;
	case 10:                                          
	           Console.WriteLine("Case 10");         //(未验证功能);
	       break;
	   default:            
	       Styte.out.println("此信息为非法信息，请联系管理员！");
	       break;
	   }
	   
} 

/*
 *  <即时消息>班级互动单独接口处理
 * */
function ajax_msg_div(uuid){
	$.AMUI.progress.start();
	var classnews_class_list=Store.getMyClassList();
    var url = hostUrl + "rest/classnews/getAllGroupNews.json";
	$.ajax({
		type : "GET",
		data : {uuid:uuid},
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement( Classnews_EventsTable,{
					events: data.list,
					class_list:G_selected_dataModelArray_byArray(classnews_class_list,"uuid","name"),
					handleClick:btn_click_classnews
					}),G_get_div_second());
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};	



	  
	  
////———————————————————————————————我的班级<老版代码暂时屏蔽>—————————————————————————     	  	  	  
//  
///*
//* <我的班级> show服务器请求
//* @show老师查看状态进入查看学生详情;
//* @Class_students_show:绘制班级方法；
//* @绘制3级界面学生列表页面；
//* @3级界面绘制完成后绑定事件点击ajax_class_students_look_info
//*   跳转学生详情绘制界面；
//* */
//function react_ajax_class_students_manage(uuid){
//	$.AMUI.progress.start();	
//	var formdata=null;
//    var url = hostUrl + "rest/pxclass/"+uuid+".json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		dataType : "json",
//		 async: false,
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				formdata=data.data;
//			} else {
//				alert("加载数据失败："+data.ResMsg.message);
//			}
//		},
//		error : G_ajax_error_fn
//	});
//	var students=null;
//	var 
//	url=hostUrl + "rest/pxstudent/getStudentByClassuuid.json?classuuid="+uuid;
//	$.ajax({
//		type : "GET",
//		url : url,
//		dataType : "json",
//		 async: false,
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				students=data.list;
//				stutent_num=data.list.length;
//			} else {
//				alert("加载数据失败："+data.ResMsg.message);
//			}
//		},
//		error :G_ajax_error_fn
//	});
//	Queue.push(function(){react_ajax_class_students_manage(uuid);},"我的班级");
//	if(students){
//		for(var i=0;i<students.length;i++){
//			var tmp=students[i];
//			tmp.img=G_def_headImgPath;
//			if(tmp.headimg)tmp.img=G_imgPath+tmp.headimg;
//			tmp.title=tmp.name;
//			tmp.link= "javascript:ajax_class_students_look_info('"+tmp.uuid+"','"+tmp.title+"')";
//		}
//	}
//	React.render(React.createElement(Class_students_show,{
//		formdata:formdata,
//		classList:G_selected_dataModelArray_byArray(Store.getMyClassList(),"uuid" ,"name"),
//		classuuid:uuid,
//		stutent_num:stutent_num,
//		students:students}), document.getElementById('div_body'));
//	return ;
//};
//
///*
// * <我的班级>添加班级和添加学生按钮处理事件
// * */	  
//function btn_click_class_list(m,groupuuid,classuuid){
//	if(m=="addstudent"){
//		if(!classuuid){
//			G_msg_pop("请先创建班级!");
//			return;
//		}
//		Queue.push(function(){btn_click_class_list(m,groupuuid,classuuid);},"新增学生");
//		add_studentsByData({classuuid:classuuid,sex:0});
//	}else if(m=="edit_class"){
//		if(!classuuid){
//			G_msg_pop("请先创建班级!");
//			return;
//		}
//		if(classuuid.indexOf(",")>-1){
//			alert("只能选择一个班级进行编辑！");
//			return;
//		}
//		Queue.push(function(){btn_click_class_list(m,groupuuid,classuuid);},"编辑班级");
//		react_ajax_class_edit_get({groupuuid:groupuuid},classuuid);
//	}else if(m=="delete"){
//		if(!classuuid){
//			G_msg_pop("请先创建班级!");
//			return;
//		}
//		if(classuuid.indexOf(",")>-1){
//			alert("只能选择一个班级进行删除！");
//			return;
//		}
//		ajax_class_delete_byRight(classuuid);
//	}else{
//		
//		if(!groupuuid){
//			var tmp_list=Store.getGroup();
//			if(!tmp_list||tmp_list.length==0){
//				G_msg_pop("没有所属学校,不能创建班级!");
//				return;
//			}
//			groupuuid=tmp_list[0].uuid;
//		}
//		Queue.push(function(){btn_click_class_list(m,groupuuid,classuuid);},"新增班级");
//		
//		react_ajax_class_edit_get({groupuuid:groupuuid},null);
//	}		
//};
//
///*
// *删除空班级.(管理员和普通老师共用)
// * */  	  
//function ajax_class_delete_byRight(uuid){	  	
//	
//	
//	if(!confirm("确定要删除吗?")){
//		return;
//	}
//  	$.AMUI.progress.start();
//      var url = hostUrl + "rest/pxclass/delete.json?uuid="+uuid;
//	$.ajax({
//		type : "POST",
//		url : url,
//		dataType : "json",
//		 async: true,
//		success : function(data) {
//			$.AMUI.progress.done();
//			// 登陆成功直接进入主页
//			if (data.ResMsg.status == "success") {
//				G_msg_pop(data.ResMsg.message);
//				Store.clearChooseClass();
//				Store.setMyClassList(null);
//				Queue.doBackFN();
//			} else {
//				alert(data.ResMsg.message);
//			}
//		},
//		error :G_ajax_error_fn
//	});
//};  
///*
//* <我的班级>添加学生详情绘制入口
//* */
//function add_studentsByData(formdata){
//	React.render(React.createElement(Mycalss_student_edit,{formdata:formdata}), document.getElementById('div_body'));
//	return;
//};
//
///*
// * <我的班级>添加学生 提交按钮 服务器请求
// * */
//function btn_ajax_myclass_student_save(){
//	var objectForm = $('#editClassStudentForm').serializeJson();
//	
//	objectForm.birthday=G_Check.formateDate(objectForm.birthday);
//	if(objectForm.birthday&&!G_Check.date1(objectForm.birthday)){
//		G_msg_pop("出生日期格式不正确,格式为:YYYY-MM-DD");
//		$("input[name='birthday']").focus()
//		return;
//	}
//	
//	$("input[name='birthday']").val(objectForm.birthday);
//    var opt={
//            formName: "editClassStudentForm",
//            url:hostUrl + "rest/pxstudent/save.json",
//            cbFN:function(data){
//            	G_msg_pop(data.ResMsg.message);
//            	Store.setClassStudentsList(data.uuid,null);
//            	react_ajax_class_students_manage(objectForm.classuuid);
//            }
//            };
//G_ajax_abs_save(opt);
//}
//
//
///*
// * <我的班级>添加班级按钮详情绘制入口
// * */	 
//function react_ajax_class_edit_get(formdata,uuid){	
//	if(!uuid){
//		var userinfo=Store.getUserinfo();
//		formdata.headTeacher=userinfo.uuid;
//		formdata.headTeacher_name=userinfo.name;
//		React.render(React.createElement(Class_edit,{
//			formdata:formdata,
//			group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
//			}), document.getElementById('div_body'));
//		return;
//	}
//	$.AMUI.progress.start();
//    var url = hostUrl + "rest/pxclass/"+uuid+".json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		dataType : "json",
//		 async: true,
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				React.render(React.createElement(Class_edit,{
//					formdata:data.data,
//					group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
//					}), document.getElementById('div_body'));
//			} else {
//				alert("加载数据失败："+data.ResMsg.message);
//			}
//		},
//		error :G_ajax_error_fn
//	});
//};
///*
// * <我的班级>添加班级提交保存按钮服务请求
// * 直接把Form表单发给服务器，服务器自己取参数;
// * */
//function ajax_class_save(){
//    var opt={
//            formName: "editClassForm",
//            url:hostUrl + "rest/pxclass/save.json",
//            cbFN:function(data){
//            	G_msg_pop(data.ResMsg.message);
//				Store.setMyClassList(null);
//				Store.clearChooseClass(null);
//				menu_class_students_fn();
//            }
//            };
//G_ajax_abs_save(opt);
//}	
///*
// * （主页）我的班级学生详情服务器请求
// * @服务器请求:POST rest/pxstudent/{uuid}.json;
// * uuid:用户ID;
// * @根据数据在 Kd_react做绘制处理 
// * */
//function ajax_class_students_look_info(uuid,title){
//	Queue.push(function(){ajax_class_students_look_info(uuid,title);},"学生详情");
//	$.AMUI.progress.start();
//    var url = hostUrl + "rest/pxstudent/"+uuid+".json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		dataType : "json",
//		 async: true,
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				React.render(React.createElement( Class_student_look_info,{formdata:data.data}), document.getElementById('div_body'));
//			} else {
//				alert("加载数据失败："+data.ResMsg.message);
//			}
//		},
//		error : G_ajax_error_fn
//	});
//};
//
///*
// * 我的班级修改学生详情按钮服务器请求
// * */
// function ajax_myclass_students_edit(uuid){
// 	Queue.push(function(){ajax_myclass_students_edit(uuid);},"编辑学生");
// 	$.AMUI.progress.start();
//     var url = hostUrl + "rest/pxstudent/"+uuid+".json";
// 	$.ajax({
// 		type : "GET",
// 		url : url,
// 		dataType : "json",
// 		 async: true,
// 		success : function(data) {
// 			$.AMUI.progress.done();
// 			// 登陆成功直接进入主页
// 			if (data.ResMsg.status == "success") {
// 				React.render(React.createElement(Mycalss_student_edit,{
// 					formdata:data.data
// 					}), document.getElementById('div_body'));
// 			} else {
// 				alert("加载数据失败："+data.ResMsg.message);
// 			}
// 		},
// 		error :G_ajax_error_fn
// 	});
// };
//


//——————————————————————————(大图标)班级互动——————————————————————————   
/*
 * <班级互动>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * @type：Type：1自己相关的互动 Type:2 所有人的互动;
 * */
window.hd_type="";
window.g_checkflag="";
function ajax_classnews_list_div(type){
	  Queue.push (function(){ajax_classnews_list_div(type);},"班级互动") ;
	  hd_type=type;
	React.render(React.createElement(Classnews_Div_list,{
		type:hd_type
		}), document.getElementById('div_body'));  	
};
/*
 * <班级互动>服务器请求（首页大图标也调用此请求）
 * @请求数据成功后执行Classnews_EventsTable方法绘制
 * 在kd_react
 * */
var g_classnews_pageNo_point=1;
function ajax_classs_Mygoodlist(list_div,pageNo,type,callback) {
	var url;
	if(!pageNo)pageNo=1;
	g_classnews_pageNo_point=pageNo;
	var classnews_class_list=Store.getMyClassList();
	$.AMUI.progress.start();
	  	if(type==1){
			url =hostUrl + "rest/classnews/getClassNewsByMy.json";
	  	}else if(type==2){
	  		url =hostUrl + "rest/classnews/getAllClassNews.json";
	  	}else{
	  		url =hostUrl + "rest/classnews/getAllGroupNews.json";
	  	}
	$.ajax({
		type : "GET",
		url : url,
  		data : {pageNo:pageNo},
		dataType : "json",
		//async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Classnews_EventsTable, {
					events: data.list,
					class_list:G_selected_dataModelArray_byArray(classnews_class_list,"uuid","name"),
					handleClick:btn_click_classnews,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
				if(typeof callback=='function'){
					callback(data.list);
				}
				//re_data=data.list;
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
function btn_click_classnews(m,formdata){
	Queue.push(function(){btn_click_classnews(m,formdata);},"发布互动");
	ajax_classnews_edit(m,formdata);
};	  
/*
 * <班级互动>添加与编辑按钮服务器请求（公共方法大图标班级活动也请求此方法）
 * @请求数据成功后执行Classnews_edit方法绘制;
 * @Classnews_show:大图标班级互动跳转绘制和列表名字点击按钮详情绘制;
 * 在kd_react
 * */
function ajax_classnews_edit(m,formdata){
	var myclasslist=Store.getMyClassList();
	if(!myclasslist||myclasslist.length==0){
		  G_msg_pop("你没有所属班级,不能发布班级互动.");
		return;
	}
	if(m=="add"){
		React.render(React.createElement(Classnews_edit,{
			formdata:formdata,
			mycalsslist:G_selected_dataModelArray_byArray(myclasslist,"uuid","name")
			}), document.getElementById('div_body'));
	}
};
/*
 * <班级互动>添加与编辑提交按钮服务器请求
 * @Form表单发给服务器，服务器自己取需要的参数；
 * */
function ajax_classnews_save(){	
	  var imgs="";
	  $(".G_cookplan_Img_img").each(function(){
		  imgs+=","+$(this).attr("src");
		});	  
	  $('#imgs').val(imgs);
	  
	  
	  var obj = $('#editClassnewsForm').serializeJson();
	  if(!obj.imgs&&!obj.content){
		  G_msg_pop("图片或内容至少填写一项.");
		  return;
		  
	  }
	var opt={
			 formName:"editClassnewsForm",
			 url:hostUrl + "rest/classnews/save.json",
			 cbFN:null
			 };
	g_checkflag=false;
	G_ajax_abs_save(opt);
}

//—————————————————————————————————(我)<注销用户>—————————————————————————	  
/*
 * <注销用户>服务器请求
 * @menu_userinfo_login_fn：重新登录;
 * */
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
		error :G_ajax_error_fn
	});
}	  




	
	  

	

//——————————————————————————(大图标)公告—————————————————————————— 

/*
 * <公告>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * */
function ajax_announce_div(){
	React.render(React.createElement(Announcements_Div_list),G_get_div_body());
   	
};
/*
 * <公告>取出数组服务器请求后
 * 开始绘制动态数据内容
 * */
function ajax_announce_Mylist(list_div,pageNo,callback) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/announcements/queryMy.json?pageNo="+pageNo;
	$.ajax({
		type : "GET",
		url : url,
		data : null,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Announcements_mylist_div, {
					events: data.list,
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
 * <公告>二级绑定事件服务器请求；
 * @Announcements_show:详情绘制
 * 在kd_rect;
 * */
function react_ajax_announce_show(uuid,Titlenmae){
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

				var o=data.data;
				  if(o.url){
						var flag=G_CallPhoneFN.openNewWindowUrl(o.title,o.title,null,data.share_url);
						if(flag)return;
				  }

				var canEdit=data.data.create_useruuid==Store.getUserinfo().uuid;
				React.render(React.createElement(Announcements_show,{
					data:data.data,
					count:data.count,
					isFavor:data.isFavor,
					share_url:data.share_url,
					canEdit:canEdit
					}), G_get_div_second());
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};
/*
 *(公告)添加等按钮绑定事件
 * @add:创建；
 * @edit:编辑；
 * @del:删除；
 * */  
 function btnclick_announce(m,groupuuid,uuid){
	  	if(m=="add"){
			Queue.push(function(){btnclick_announce(m,groupuuid,uuid);},"创建文章");
	  		react_ajax_announce_edit({groupuuid:groupuuid,type:3},null);
	  	}else if(m=="edit"){
			Queue.push(function(){btnclick_announce(m,groupuuid,uuid);},"编辑文章");
	  		react_ajax_announce_edit(null,uuid);
	  	}else if(m=="del"){
	  		react_ajax_announce_delete(groupuuid,uuid);
	  	}
	 }; 
  /*
   *(公告)创建与编辑服务请求；
   * @if(!uuid):创建；
   * @uuid不是则:编辑；
   * */  	  
  function react_ajax_announce_edit(formdata,uuid){
	  	if(!uuid){
	  		React.render(React.createElement(Announcements_edit,{
	  			formdata:formdata,
	  			group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
	  			}), G_get_div_body());
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
	  				React.render(React.createElement(Announcements_edit,{
	  					formdata:data.data,
	  					group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
	  					}),G_get_div_body());
	  			} else {
	  				alert("加载数据失败："+data.ResMsg.message);
	  			}
	  		},
			error :G_ajax_error_fn
	  	});
	  };
  /*
   *(公告)删除按钮服务请求；
   *@ajax_announce_listByGroup：删除成功后调用发布消息方法刷新;
   * */  	  
  function react_ajax_announce_delete(groupuuid,uuid){	 
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
  				Queue.doBackFN();
  			} else {
  				alert(data.ResMsg.message);
  			}
  		},
  		error :G_ajax_error_fn
  	});
  };  
	  
	  
	  
	  
  /*
  *(公告)创建与编辑提交按钮方法
  *@OPT：我们把内容用Form表单提交到Opt我们封装的
  *一个方法内直接传给服务器，服务器从表单取出需要的参数
  * */    
  function ajax_announce_save(){
      var opt={
              formName: "editAnnouncementsForm",
          url:hostUrl + "rest/announcements/save.json",
              cbFN:null
              };
  G_ajax_abs_save(opt);
  }


//——————————————————————————<培训机构新版>课程表<列表版>—————————————————————————— 
/*
 * <课程表>（获取用户列表服务器请求）；
 * */
var g_begDateStr_pageNo_point=0;	
 function px_ajax_teachingplan_fn(classuuid,pageNo){ 
	var now=new Date();
	if(!pageNo)pageNo=0;
	g_begDateStr_pageNo_point=pageNo;
	  	now=G_week.getDate(now,pageNo*7);
	var begDateStr=G_week.getWeek0(now,pageNo);
	var endDateStr=G_week.getWeek6(now,pageNo);
		Queue.push(function(){px_ajax_teachingplan_fn(classuuid,pageNo);},"课程表");
	   	$.AMUI.progress.start();
	       var url = hostUrl + "rest/pxteachingplan/list.json";
	   	$.ajax({
	   		type : "GET",
	   		url : url,
	   		data : {classuuid:classuuid,begDateStr:begDateStr,endDateStr:endDateStr},
	   		dataType : "json",
	   		 async: false,
	   		success : function(data) {
	   			$.AMUI.progress.done();
	   			if (data.ResMsg.status == "success") {	   				
					React.render(React.createElement(px_rect_teachingplan_fn, {
						classuuid:classuuid,
						classlist:G_myClassList,
						pageNo:pageNo,
						events: data.list,
						responsive: true, bordered: true, striped :true,hover:true,striped:true						
					}), document.getElementById('div_body'));
					
	   			} else {
	   				alert("加载数据失败："+data.ResMsg.message);
	   			}
	   		},
			error :G_ajax_error_fn
	   	});
	   };
///*  
//* <课程表>添加与修改
//* */
//   function Px_class_students_manage_onClick_fn(m,formdata){
//	   var name;
//	   if(m=="add"){
//		   name="新建课程";
//	   }else{
//		   name="编辑课程";
//	   }
//	   Queue.push(function(){Px_class_students_manage_onClick_fn(formdata);},name);
//		React.render(React.createElement(Px_Teachingplan_edit,{
// 			formdata:formdata,
// 			}), document.getElementById('div_body'));
//
//   };
// /*(课程表)
// * 班级详情内添加编辑提交按钮服务器请求
// * 直接把Form表单发送给服务器
// * */ 
//function ajax_teachingplan_save_byRight(){
//    var opt={
//            formName: "editTeachingplanForm",
//            url:hostUrl + "rest/pxteachingplan/save.json",
//            cbFN:null
//            };
//G_ajax_abs_save(opt);
//}





//——————————————————————————(幼儿园老版大图标)课程表——————————————————————————
/*
 * 上一层绘制在idget中w_ch_class.open 执行; 
 * <课程表> 教学计划班级内详情服务器请求
 * @老师查询，条件groupuuid
 * @num:0.表示当前.-1上,
 * */
//记录当前翻页的周数
var g_teachingplan_listToShow_point=0;
function ajax_teachingplan_dayShow(num,myclazz) {
	Queue.push(function(){ajax_teachingplan_dayShow(num,myclazz);},"查看课程");
	
	var now=new Date();
	if(!num){
		num=0;
		g_teachingplan_listToShow_point=0;
	}
	g_classnews_class_list=Store.getMyClassList();
	var begDateStr=G_week.getDateStr(now,num);
	var endDateStr=begDateStr;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/pxteachingplan/list.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {classuuid:myclazz.uuid,begDateStr:begDateStr,endDateStr:endDateStr},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.list==null)data.list=[];
				var formdata=data.list[0];
				React.render(React.createElement(Teachingplan_showByOneDay,{
					ch_class:myclazz,
					ch_group:Store.getCurGroup(),
					ch_day:begDateStr,					
					classList:G_selected_dataModelArray_byArray (Store.getMyClassList(),"uuid" ,"name"),
					formdata:formdata
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
};

/*(课程表)
 * 班级详情内添加编辑课程等按钮方法判断;
 * */ 
function btn_click_teachingplan(m,uuid,classuuid,ch_day){
	if(m=="add"){
		react_ajax_teachingplan_edit({classuuid:classuuid,plandate:ch_day},null,"新增课程");
	}
//	else if(m=="edit"){
//		react_ajax_teachingplan_edit(null,uuid,"课程编辑");
//	}else if(m=="del"){
//		//react_ajax_teachingplan_delete(groupuuid,uuid);
//	}
};

/*(课程表)
 * 班级详情内添加编辑按钮服务器请求
 * 
 * */ 
function react_ajax_teachingplan_edit(formdata,uuid,nmae){
  	Queue.push(function(){react_ajax_teachingplan_edit(formdata,uuid,nmae);},nmae);
	if(!uuid){
		if(!formdata.classuuid){
			G_msg_pop("新建课程，班级id必填");
			return;
		}
		React.render(React.createElement(Teachingplan_edit,{formdata:formdata}), document.getElementById('div_body'));
		return;
	}
	$.AMUI.progress.start();
  var url = hostUrl + "rest/pxteachingplan/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Teachingplan_edit,{
					formdata:data.data
					}), document.getElementById('div_body'));
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};
/*(课程表)
 * 班级详情内添加编辑提交按钮服务器请求
 * 直接把Form表单发送给服务器
 * */ 
function ajax_teachingplan_save(){
    var opt={
            formName: "editTeachingplanForm",
            url:hostUrl + "rest/pxteachingplan/save.json",
            cbFN:null
            };
G_ajax_abs_save(opt);
}






//————————————————————————————精品文章————————————————————————— 

/*
 * <精品文章>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * */
function ajax_good_announce_div(){
	React.render(React.createElement(Announcements_good_Div_list), G_get_div_body());  	
};
/*
*(精品文章)服务器请求share/articleList
* @types- 0:校园公告,1:老师公告 2:班级通知,3:"精品文章',4:"招生计划"
* 取出数组服务器请求后
* 开始绘制动态数据内容
* */
function ajax_announce_Mygoodlist(list_div,pageNo,callback) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/share/articleList.json";
	$.ajax({
		type : "GET",
		url : url,
  		data : {type:3,pageNo:pageNo},
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Announcements_mygoodlist_div, {
					events: data.list,
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
 *<精品文章>详情服务器请求；
* @Announcements_show:详情绘制
 * 在kd_rect;
 * */
function react_ajax_announce_good_show(uuid,title){
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
				var o=data.data;
				  if(o.url){
						var flag=G_CallPhoneFN.openNewWindowUrl(o.title,o.title,null,data.share_url);
						if(flag)return;
				  }
				//如果相等为True不等为false用于判断编辑与删除是否
				var canEdit=data.data.create_useruuid==Store.getUserinfo().uuid;
				React.render(React.createElement(Announcements_goodshow,{
					canEdit:canEdit,
					data:data.data,
					isFavor:data.isFavor,
					share_url:data.share_url,
					count:data.count
					}), G_get_div_second());
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};

/*
 *(精品文章)添加等按钮绑定事件
 * @add:创建；
 * @edit:编辑；
 * @del:删除；
 * */  
 function btnclick_good_announce(m,groupuuid,uuid){
	  	if(m=="add"){
	  		Queue.push(function(){btnclick_good_announce(m,groupuuid,uuid);},"创建文章");
	  		react_ajax_announce_good_edit({groupuuid:groupuuid,type:3},null);
	  	}else if(m=="edit"){
	  		Queue.push(function(){btnclick_good_announce(m,groupuuid,uuid);},"编辑文章");
	  		react_ajax_announce_good_edit(null,uuid);
	  	}else if(m=="del"){
	  		react_ajax_announce_good_delete(groupuuid,uuid);
	  	}
	 }; 
  /*
   *(精品文章)创建与编辑服务请求；
   * @if(!uuid):创建；
   * @uuid不是则:编辑；
   * */  	  
  function react_ajax_announce_good_edit(formdata,uuid){
	  	if(!uuid){
			
	  		React.render(React.createElement(Announcements_goodedit,{
	  			formdata:formdata,
	  			group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
	  			}),G_get_div_body());
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
	  				React.render(React.createElement(Announcements_goodedit,{
	  					formdata:data.data,
	  					group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
	  					}),G_get_div_body());
	  			} else {
	  				alert("加载数据失败："+data.ResMsg.message);
	  			}
	  		},
			error :G_ajax_error_fn
	  	});
	  };
  /*
   *(精品文章)删除按钮服务请求；
   *@ajax_announce_listByGroup：删除成功后调用发布消息方法刷新;
   * */  	  
  function react_ajax_announce_good_delete(groupuuid,uuid){	 
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
  				Queue.doBackFN();
  			} else {
  				alert(data.ResMsg.message);
  			}
  		},
  		error :G_ajax_error_fn
  	});
  };  
	 	  
  /*
  *(精品文章)创建与编辑提交按钮方法
  *@OPT：我们把内容用Form表单提交到Opt我们封装的
  *一个方法内直接传给服务器，服务器从表单取出需要的参数
  * */    
  function ajax_good_save(){
      var opt={
              formName: "editAnnouncementsForm",
          url:hostUrl + "rest/announcements/save.json",
              cbFN:null
              };
  G_ajax_abs_save(opt);
  }	  
  
  
//—————————————————————————————(大图标)家长通讯录—————————————————————————    
/*
 * （首页）家长通讯录功能；服务器请求
 *@服务器请求：POST rest/pxstudent/parentContactByMyStudent.json
 *@Class_student_tel:开始绘制方法;
 *@formdata:data.list:服务器取回的学生数组数据
 * @isreg:0为未注册  1为已注册用户
 * @queryList:已注册成功；
 * @queryArry：未注册成功;
 * @type识别绘制已经注册家长，还是绘制邀请家长
 * @!布尔值的0也会执行,所以再加一个判断;
 * */
function ajax_parentContactByMyStudent(student_name,class_uuid){
	if(!student_name)student_name="";
	if(!class_uuid)class_uuid="";
	Queue.push(function(){ajax_parentContactByMyStudent(student_name,class_uuid);},"家长通讯录");
	var queryList=[];
	var queryArry=[];
	$.AMUI.progress.start();
    var url = hostUrl + "rest/pxstudent/parentContactByMyStudent.json";
	$.ajax({
		type : "GET",
		data : {student_name:student_name,class_uuid:class_uuid},
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Class_student_tel,{
					class_uuid:class_uuid,
					formdata:data.list,
  					class_list:G_selected_dataModelArray_byArray(Store.getMyClassList(),"uuid","name")
					}), document.getElementById('div_body'));
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};

/* (首页)家长通讯录功能发信息界面功能<创建舞台>
 * 因有添加加载信息功能所以创建一个舞台然后把每一次添加的DIV添加到舞台上；
 * */
function ajax_parentContactByMyStudent_message_list(parent_uuid,name){
		React.render(React.createElement(ParentContactByMyStudent_message_list,{
			parent_uuid:parent_uuid
			}), G_get_div_second());
	   	
   };
/* （首页）家长通讯录功能发信息界面功能<绘制每一个DIV信息放置在舞台上>服务器请求
 *  @parent_uuid:每个用户的ID；
 *  
 * */
function ajax_message_queryByParent(list_div,parent_uuid,pageNo,callback){	
	   if(!pageNo)pageNo=1;
	$.AMUI.progress.start();
    var url = hostUrl + "rest/message/queryByParent.json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		data:{uuid:parent_uuid,pageNo:pageNo},
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
  				if(typeof callback=='function'){
					callback(data.list);
				}
				
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
   };
   
/*（主页）家长通讯录功 服务器请求
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
/*
 * （首页）家长通讯录功能；邀请家长服务器请求
 *@服务器请求：参数需要tels
 * */
function ajax_parentContact_tels(tels){
	$.AMUI.progress.start();
    var url = hostUrl + "rest/pxstudent/inviteParents.json?tels="+tels;
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				alert(data.ResMsg.message);
				ajax_parentContactByMyStudent();
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};




//老师通讯录废弃物分页代码
//function ajax_Teacher_listByGroup(groupuuid,name,pageNo) {
//		var list=Store.getGroupNoGroup_wjd();
//	  if(!name)name="";
//	  if(!groupuuid){
//		  if(list&&list.length>0){
//			  groupuuid=list[0].uuid;
//		  }
//	  }
//	  if(!pageNo)pageNo=1;
//	  //Queue.push:点击机构或班级搜索刷新后的界面保存，不会去其他界面再回来又初始状态;
//	  //Queue.push(function(){ajax_Teacher_listByGroup(groupuuid,name);});
//	$.AMUI.progress.start();
//	var url = hostUrl + "rest/userinfo/listForTelByPage.json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		data : {groupuuid:groupuuid,name:name,pageNo:pageNo},
//		dataType : "json",
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				React.render(React.createElement(Teacher_info_tel, {
//					group_uuid:groupuuid,
//					group_list:G_selected_dataModelArray_byArray(list,"uuid","brand_name"),
//					events: data.list.data,
//					responsive: true, bordered: true, striped :true,hover:true,striped:true
//				}), document.getElementById('div_body'));
//			} else {
//				alert(data.ResMsg.message);
//				G_resMsg_filter(data.ResMsg);
//			}
//		},
//		error :G_ajax_error_fn
//	});
//};
//
//
//



//—————————————————————————————(大图标)老师通讯录—————————————————————————  

/*
 * <老师通讯录>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * */
function ajax_Teacher_tel_div(groupuuid){
	var list=Store.getGroupNoGroup_wjd();
	React.render(React.createElement(Announcements_Teacher_tel_div,{
		group_list:G_selected_dataModelArray_byArray(list,"uuid","brand_name"),
		groupuuid:groupuuid
	}), document.getElementById('div_body'));  	
};

/*
 * 老师通讯录（获取用户列表服务器请求）；
 * @name:搜索功能 按中文名字;
 * @Teacher_info_tel:绘制;
 * */
function ajax_Teacher_tel_list(list_div,groupuuid,name,pageNo,callback){
	var list=Store.getGroupNoGroup_wjd();
	  if(!name)name="";
	  if(!pageNo)pageNo=1;
		  if(!groupuuid){
			  if(list&&list.length>0){
				  groupuuid=list[0].uuid;
			  }
		  }
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/listForTelByPage.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {groupuuid:groupuuid,name:name,pageNo:pageNo},
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Teacher_info_tel, {
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
}; 







//—————————————————————————————(大图标)我的收藏—————————————————————————
/*
 * <我的收藏>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * */
function ajax_favorites_div(){
	React.render(React.createElement(rect_favorites_Div_list), G_get_div_body());  	
};
/*
 * <我的收藏>（获取用户收藏列表服务器请求；
 * */
function ajax_favorites_list(list_div,pageNo,callback) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/favorites/query.json";
	$.ajax({
		type :"GET",
		url  :url,
		async: false,
		data :{pageNo:pageNo},
		dataType : "json",
		success  : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(favorites_list_div,{
					events: data.list,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
  				if(typeof callback=='function'){
					callback(data.list);
				}
			} else {
				alert(data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};
 

/*
 * <我的收藏>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * */
function react_ajax_favorites_show(type,reluuid){
	 switch (type)   
	   {
  case 0:                                 
	       react_ajax_announce_show(reluuid,"公告收藏");   //(公告);   
      break;      
  case 1:                                 
	       react_ajax_announce_show(reluuid,"老师公告");   //(老师公告);   
      break;   
  case 3:                                          
	       react_ajax_announce_good_show(reluuid,"我的收藏");   //(精品文章);
      break;
	case 4:                                          
		   react_ajax_announce_show(reluuid,"招生计划");   //(招生计划);  
	       break; 	
	case 91:                                          
		  react_px_help_show(reluuid,"帮助列表");   //(招生计划);  
	       break; 	       
	   default:            
	       Styte.out.println("此信息为非法信息，我的收藏！");
	       break;
	   }	   
};





//———————————————————————————————————我的信箱—————————————————————————      
/*(我的信箱)（服务器请求）-取出所有与我沟通讯息List；
 * 调用Boss_student_tel绘制一层界面；
 * */ 
 function ajax_queryCountMsgByParents_message(){ 
	   Queue.push(function(){ajax_queryCountMsgByParents_message();},"我的信箱");
	   	$.AMUI.progress.start();
	       var url = hostUrl + "rest/message/queryCountMsgByParents.json";
	   	$.ajax({
	   		type : "GET",
	   		url : url,
	   		dataType : "json",
	   		 async: true,
	   		success : function(data) {
	   			$.AMUI.progress.done();
	   			if (data.ResMsg.status == "success") {
	   				if(data.list.length!=0){
		   				React.render(React.createElement(My_student_tel,{formdata:data.list}), document.getElementById('div_body'));	
	   				}else{
	   					G_msg_pop("您的信箱暂无数据!");
		   				React.render(React.createElement(My_student_tel2), document.getElementById('div_body'));
	   				}

	   			} else {
	   				alert("加载数据失败："+data.ResMsg.message);
	   			}
	   		},
			error :G_ajax_error_fn
	   	});
	   };
	   	   
	   

 
//———————————————————————————————————每日任务—————————————————————————   
 /*
  * <每日任务>
  * 
  * */
  function ajax_teacherDailyTask(){ 
 	   	$.AMUI.progress.start();
 	       var url = hostUrl + "rest/teacherDailyTask/queryByDay.json";
 	   	$.ajax({
 	   		type : "GET",
 	   		url : url,
 	   		dataType : "json",
 	   		 async: true,
 	   		success : function(data) {
 	   			$.AMUI.progress.done();
 	   			if (data.ResMsg.status == "success") {
 					React.render(React.createElement(rect_teacherDailyTask, {
						events: data.list,
 						responsive: true, bordered: true, striped :true,hover:true,striped:true
 						
 					}), document.getElementById('div_body'));
 	   			} else {
 	   				alert("加载数据失败："+data.ResMsg.message);
 	   			}
 	   		},
 			error :G_ajax_error_fn
 	   	});
 	   };
 	   
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$管理区域$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//————————————————————————————校务管理<管理模块>—————————————————————————  
  /*
   *(校务管理)<校园列表>服务器请求 ;
   *@Group_EventsTable:kd_react开始绘制
   * */
  function ajax_group_myList_byRight() {
  	$.AMUI.progress.start();
  	var url = hostUrl + "rest/group/myListByRight.json";
  	$.ajax({
  		type : "GET",
  		url : url,
  		data : "",
  		dataType : "json",
  		success : function(data) {
  			$.AMUI.progress.done();
  			if (data.ResMsg.status == "success") {
  				Store.setGroup(data.list);
  				React.render(React.createElement(Group_EventsTable_byRight, {
  					events: data.list,
  					responsive: true, bordered: true, striped :true,hover:true,striped:true
  					}), document.getElementById('div_body'));
  			} else {
  				alert(data.ResMsg.message);
  				G_resMsg_filter(data.ResMsg);
  			}
  		},
		error :G_ajax_error_fn
  	});
  };
  /*
   *(校务管理)<校园列表>return出来的按钮事件方法；
   *@ajax_group_edit：点击事件后下一步服务器处理公共方法；
   * */
  function btn_click_group_byRight(m,formdata){
  	var Titlename;
  	if(m=="add"){
  		Titlename="添加分校";
  	}else if(m=="show"){
  		Titlename="预览分校";
  	}else{
  		Titlename="编辑分校";
  	}
     	Queue.push(function(){btn_click_group_byRight(m,formdata);},Titlename);
     	ajax_group_edit_byRight(m,formdata);
    };

  /*
  *(校务管理)添加、编辑、预览、公共方法
  *@add：<校园列表>-添加分校绘制界面；
  *@Group_edi：<校园列表>kd_react；
  *@Group_show<校园预览>kd_react；
  */
  function ajax_group_edit_byRight(m,formdata){
    if(m=="add"){
  	React.render(React.createElement(Group_edit_byRight,{formdata:formdata}), document.getElementById('div_body'));
  	return;
     }
    http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js
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
     				if(m=="edit"){
     					React.render(React.createElement(Group_edit_byRight,{
     						formdata:data.data
     						}), document.getElementById('div_body'));
     				}else{
     					React.render(React.createElement(Group_show_byRight,{
     						formdata:data.data,
     						count:data.count
     						}), G_get_div_second());
     				}
     			} else {
     				alert("加载数据失败："+data.ResMsg.message);
     			}
     		},
    		error :G_ajax_error_fn
     	});
     }; 	   
 	   
 /*
  *(校务管理)添加与编辑提交按钮方法
  *@OPT：我们把内容用Form表单提交到Opt我们封装的
  *一个方法内直接传给服务器，服务器从表单取出需要的参数
  * */  
  function ajax_group_save_byRight(){	   	
        var opt={
                formName: "editGroupForm",
                url:hostUrl + "rest/group/save.json",
                cbFN:function(data){
              	G_msg_pop(data.ResMsg.message);
  				Queue.doBackFN();
  				Store.setGroup(null);
  				ajax_getUserinfo();//重新加载权限
              }
                };
    G_ajax_abs_save(opt);
    }	   
 	    
  
  
  
  
  
//————————————————————————————信息管理<管理模块>—————————————————————————    
  /*
  *(信息管理)<校园公告><老师公告><精品文章><招生计划>服务器请求
  * @types- 0:校园公告,1:老师公告 2:班级通知,3:"精品文章',4:"招生计划"
  * @group_list:根据下拉框需求的数据模型调用公用方法转换一次；
  * */
var  g_message_groupuuid="";
function ajax_announce_listByGroup_byRight(){
	var grouplist=Store.getGroupByRight("PX_announce_m");
	if(!grouplist||grouplist.length==0){
		G_msg_pop("没有权限!");
		return "";
	}
	if(!g_message_groupuuid){
		g_message_groupuuid=grouplist[0].uuid;		
	}
	React.render(React.createElement(Announcements_EventsTable_byRight, {
		groupuuid:g_message_groupuuid,
		pageNo:1,
		group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name"),
		events: [],
		type:announce_types,
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
				isFavor:data.isFavor,
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
  			group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_announce_m"),"uuid","brand_name")
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
				var o=data.data;
				  if(o.url){
						var flag=G_CallPhoneFN.openNewWindowUrl(o.title,o.title,null,data.share_url);
						if(flag)return;
				  }
  				React.render(React.createElement(Announcements_edit_byRight,{
  					formdata:data.data,
  					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_announce_m"),"uuid","brand_name")
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
//  	var re_data=null;
  	var url;
  	if(!pageNo)pageNo=1;
  	g_classnews_pageNo_point=pageNo;
  	$.AMUI.progress.start();
  	url =hostUrl + "rest/classnews/getAllClassNews.json";

  	$.ajax({
  		type : "GET",
  		url : url,
    		data : {pageNo:pageNo},
  		dataType : "json",
//  		async: false,
  		success : function(data) {
  			$.AMUI.progress.done();
  			if (data.ResMsg.status == "success") {
  				React.render(React.createElement(Classnews_EventsTable_byRight, {
  					events: data.list,
  					handleClick:btn_click_classnews,
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
  

  
  
//———————————————————————————————————老师管理<管理模块>—————————————————————————   
  
//  /*暂时弃用
//  * <老师管理>（获取用户列表服务器请求）；
//  * @Userinfo_EventsTable
//  * @btn_click_userinfo（绑定在对象上事件）；
//  * 并且先在公共模板common_react的
//  * @Userinfo_EventsTable方法中继续做下一步处理;
//  * Queue.push@点击学校后进入下个页面返回后学校为最新点击后的学校;
//  * */
//     function ajax_uesrinfo_listByGroup(groupuuid,name) {
//     	  if(!name)name="";
//     	//Queue.push:点击机构或班级搜索刷新后的界面保存，不会去其他界面再回来又初始状态;
//     	Queue.push(function(){ajax_uesrinfo_listByGroup(groupuuid,name);},"老师管理");
//     	$.AMUI.progress.start();
//     	var url = hostUrl + "rest/userinfo/listByPage.json";
//     	$.ajax({
//     		type : "GET",
//     		url : url,
//     		data :{groupuuid:groupuuid,name:name},
//     		dataType : "json",
//     		success : function(data) {
//     			$.AMUI.progress.done();
//     			if (data.ResMsg.status == "success") {
//     				React.render(React.createElement(Userinfo_EventsTable, {
//     					group_uuid:groupuuid,
//     					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight('PX_teacher_m'),"uuid","brand_name"),
//     					events: data.list.data,
//     					handleClick:btn_click_userinfo,
//     					responsive: true, bordered: true, striped :true,hover:true,striped:true
//     					
//     				}), document.getElementById('div_body'));
//     			} else {
//     				alert(data.ResMsg.message);
//     				G_resMsg_filter(data.ResMsg);
//     			}
//     		},
//    		error :G_ajax_error_fn
//     	});
//     };

     

     
     
     
     
 /*     
  *
  * <老师管理>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
  * 基本框 等
  * */
 function ajax_uesrinfo_listByGroup_div(groupuuid){
 	var list=Store.getGroupByRight('PX_teacher_m');
 	React.render(React.createElement(Userinfo_EventsTable_div1,{
 		group_list:G_selected_dataModelArray_byArray(list,"uuid","brand_name"),
	    handleClick:btn_click_userinfo,
 		groupuuid:groupuuid
 	}), document.getElementById('div_body'));  	
 };
 /*
  * <老师管理>（获取用户列表服务器请求）；
  * @Userinfo_EventsTable
  * @btn_click_userinfo（绑定在对象上事件）；
  * 并且先在公共模板common_react的
  * @Userinfo_EventsTable方法中继续做下一步处理;
  * Queue.push@点击学校后进入下个页面返回后学校为最新点击后的学校;
  * */
     function ajax_uesrinfo_listByGroup(list_div,groupuuid,name,pageNo,callback) {    		
    	 var re_data=null;
     	  if(!name)name="";
     	 if(!pageNo)pageNo=1;
     	//Queue.push:点击机构或班级搜索刷新后的界面保存，不会去其他界面再回来又初始状态;
     	$.AMUI.progress.start();
     	var url = hostUrl + "rest/userinfo/listByPage.json";
     	$.ajax({
     		type : "GET",
     		url : url,
     		data :{groupuuid:groupuuid,name:name,pageNo:pageNo},
     		dataType : "json",
     	//	async: false,
     		success : function(data) {
     			$.AMUI.progress.done();
     			if (data.ResMsg.status == "success") {
     				React.render(React.createElement(Userinfo_EventRow, {
     					groupuuid:groupuuid,
     					events: data.list.data,
     					students_number:data.list.totalCount,
     					pageNo:data.list.pageNo,
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
  	}else if(m=="getRole"){
  		//Queue.push(function(){btn_click_userinfo(m,obj,usernames);},"老师权限-"+usernames);
  		//ajax_userinfo_getRole(obj,usernames, Store.getRoleList(),sex);
  	}else if(m=="edit"){
  		  Queue.push(function(){btn_click_userinfo(m,obj,usernames);},"老师修改");
  		ajax_userinfo_edit({uuid:obj},"edit",sex);
  	   	};
  	   };
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
     			select_group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_teacher_m"),"uuid","brand_name"),
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
     				React.render(React.createElement(Userinfo_edit,{
     					mygroup_uuids:data.mygroup_uuids,
     					formdata:data.data,
     					select_group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_teacher_m"),"uuid","brand_name"),
     					sex:data.data.sex
     					}), document.getElementById('div_body'));
     			} else {
     				alert("加载数据失败："+data.ResMsg.message);
     			}
     		},
    		error :G_ajax_error_fn
     	});
     	
     };
     /*
      * <老师管理>分配权限按钮服务请求
      * */

     function btn_ajax_updateRole(useruuid,groupuuid){
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
         			}
         		};
     	$.ajax(opt);
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
  
  /*
   * <老师管理>号码检查
   * */
   function ajax_tel_btn_info(tel,group_uuid){
     	$.AMUI.progress.start();
         var url = hostUrl + "rest/userinfo/getUserBytel.json";
     	$.ajax({
     		type : "GET",
     		url : url,
     		dataType : "json",
            data:{tel:tel},
            async: true,
     		success : function(data) {
     			$.AMUI.progress.done();
     			if (data.ResMsg.status == "success") {
     				React.render(React.createElement(Userinfo_edit,{
     					mygroup_uuids:group_uuid,
     					formdata:data,
     					select_group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_teacher_m"),"uuid","brand_name"),
     					sex:data.sex
     					}), document.getElementById('div_body'));
     			} else {
     				alert("加载数据失败："+data.ResMsg.message);
     			}
     		},
    		error :G_ajax_error_fn
     	});     	
     };
 

 /*
 * 老师花名册下载
 * @param formdata
 * @param operate uesrinfo
 */
 function ajax_flowername_download_byRight (groupuuid,classuuid,xlsname){
 	var inputs;
 	var url = hostUrl + "rest/pxstudent/exportStudentExcel.json";
 	   inputs+='<input type="hidden" name="groupuuid" value="'+groupuuid+'" />'; 
 	  inputs+='<input type="hidden" name="classuuid" value="'+classuuid+'" />'; 
 	 inputs+='<input type="hidden" name="xlsname" value="'+xlsname+'" />'; 
        // request发送请求
 	$('<form action="'+ url +'" method="post">'+inputs+'</form>')
      .appendTo('body').submit().remove();
 };  

 
 
//————————————————————————————老师资料管理<管理模块>—————————————————————————  
 
  /*     
  *
  * <老师资料管理>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
  * 基本框 等
  * */
 function userTeacher_div_byRight(groupuuid){
	var list=Store.getGroup();
 	React.render(React.createElement(UserTeacher_EventsTable_div,{
 		group_list:G_selected_dataModelArray_byArray(list,"uuid","brand_name"),
 		groupuuid:groupuuid
 	}), document.getElementById('div_body'));  	
 };
 /*
  * <老师资料管理>（获取用户列表服务器请求）；
  * */
     function ajax_userTeacher_listByGroup(list_div,groupuuid,name,pageNo,callback) {    		
    	 var re_data=null;
     	  if(!name)name="";
     	 if(!pageNo)pageNo=1;
     	//Queue.push:点击机构或班级搜索刷新后的界面保存，不会去其他界面再回来又初始状态;
     	$.AMUI.progress.start();
     	var url = hostUrl + "rest/userteacher/listByPage.json";
     	$.ajax({
     		type : "GET",
     		url : url,
     		data :{groupuuid:groupuuid,name:name,pageNo:pageNo},
     		dataType : "json",
     		//async: false,
     		success : function(data) {
     			$.AMUI.progress.done();
     			if (data.ResMsg.status == "success") {
     				React.render(React.createElement(UserTeacher_EventRow, {
     					events: data.list.data,
     					students_number:data.list.totalCount,
     					pageNo:data.list.pageNo,
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
 


//———————————————————————————————————园长信箱—————————————————————————      
/*(园长信箱)（服务器请求）-取出所有家长和园长沟通讯息List；
 * 调用Boss_student_tel绘制一层界面；
 * */ 
 function ajax_queryLeaderMsgByParents_message_byRight(){ 
	   Queue.push(function(){ajax_queryLeaderMsgByParents_message_byRight();},"园长信箱");
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
	   				if(data.list.length!=0){
		   				React.render(React.createElement( Boss_student_tel_byRight,{formdata:data.list}), document.getElementById('div_body'));	
	   				}else{
	   					G_msg_pop("暂无园长信箱数据!");
		   				React.render(React.createElement( Boss_student_tel2_byRight), document.getElementById('div_body'));
	   				}

	   			} else {
	   				alert("加载数据失败："+data.ResMsg.message);
	   			}
	   		},
			error :G_ajax_error_fn
	   	});
	   };
//  /* (家长信息)创建舞台
//   * 因有加载更多功能，创建舞台，用于装载更多 message的Div放置在舞台上；
//   *@Boss_message_list准备开始绘制舞台  
//	* @revice_useruuid:收件人ID；
//	* @send_useruuid:发送者ID；
//	* @send_user:发送者姓名
//   * */
//  function ajax_my_message_list(send_useruuid,revice_useruuid,send_user){
//  	var message_name="我的信箱222222222222";
//  	Queue.push(function(){ajax_my_message_list(send_useruuid,revice_useruuid,send_user);},message_name);
//		React.render(React.createElement( My_message_stage,{send_useruuid:send_useruuid,revice_useruuid:revice_useruuid}), document.getElementById('div_body'));
//	   };
//		   
		   
/* (园长信箱)创建舞台
* 因有加载更多功能，创建舞台，用于装载更多 message的Div放置在舞台上；
*@Boss_message_list准备开始绘制舞台  
* @revice_useruuid:收件人ID；
* @send_useruuid:发送者ID；
* @send_user:发送者姓名
* */
function ajax_my_boss_stage_byRight(send_useruuid,revice_useruuid,send_user){
	React.render(React.createElement( Boss_message_stage_byRight,{
		send_useruuid:send_useruuid,
		revice_useruuid:revice_useruuid
		}), G_get_div_second());
   };
	 		   
	   
	  
  /* (园长信箱)(服务器请求)-绘制每一个Div信息放置在舞台上；
   * @revice_useruuid:收件人ID；
   * @send_useruuid:发送者ID；
   * */
  function ajax_boss_message_list_byRight(revice_useruuid,send_useruuid,list_div,pageNo,callback){
	   if(!pageNo)pageNo=1;
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/message/queryByParentAndLeader.json";
  	$.ajax({
  		type : "GET",
  		url : url,
  		data : {group_uuid:send_useruuid,parent_uuid:revice_useruuid,pageNo:pageNo},
  		dataType : "json",
  		 async: false,
  		success : function(data) {
  			$.AMUI.progress.done();
  			// 登陆成功直接进入主页
  			if (data.ResMsg.status == "success") {
  				React.render(React.createElement(Message_queryLeaderMsgByParents_listpage_byRight, {
					events: data.list,
					send_useruuid:send_useruuid,
					revice_useruuid:revice_useruuid,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));

  				if(typeof callback=='function'){
					callback(data.list);
				}
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
		error :G_ajax_error_fn
	   	});
	      };
 
 /*(园长信箱)(服务器请求)-我要发送信息
  * @opt：高级封装做处理 直接把表单和URL地址送进去
  * @formName:表单信息
  * @直接传给服务器，服务器根据自己需要的从form表单取参数；
  * */
 function ajax_boss_message_save_byRight(that){
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

 

 
 
 
//———————————————————————————————班级管理—————————————————————————  	
 /*
  * <班级管理>建立Div舞台 
  *
  * */	

 function ajax_Class_div_byRight(groupuuid){
	 var  grouplist=Store.getGroupByRight("PX_class_m");
	 if(!grouplist||grouplist.length==0){
	 	alert("没有班级管理权限不能访问.");
	 	return;
	 }
		React.render(React.createElement(Announcements_Class_div,{
			group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name"),
			groupuuid:groupuuid
		}), document.getElementById('div_body'));  	
	};	
	
 /*
  * <班级管理>服务器请求 Store.getGroupByRight("PX_class_m")
  * @请求数据成功后执行Class_EventsTable方法绘制
  * */
 function ajax_class_listByGroup_byRight(list_div,data,pageNo,callback) {
 	if(!pageNo)pageNo=1;
 	data.pageNo=pageNo;
  	$.AMUI.progress.start();
 	var url = hostUrl + "rest/pxclass/listStat.json";
 	$.ajax({
 		type : "GET",
 		url : url,
 		data : data,
 		dataType : "json",
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success"){
 				React.render(React.createElement(Class_EventsTable_byRight, {
 					data_List:data.list,
 					events: data.list.data,
 					handleClick:btn_click_class_list_byRight,
 					responsive: true, bordered: true, striped :true,hover:true,striped:true
 					}), document.getElementById(list_div));	
  				if(typeof callback=='function'){
					callback(data.list);
				}
 			}else{
 				alert(data.ResMsg.message);
 				G_resMsg_filter(data.ResMsg);
 			}
 		},
		error :G_ajax_error_fn
 	});
 };	  

  
//*********************班级管理模块-教学计划相关代码********************* 
 /*
  * 班级管理结业服务器请求
  * */
   function ajax_class_disable_byRight(groupuuid,uuid) {	 
 		if(!confirm("确定该班级要结业嘛?")){
 			return;
 		}
 	 	$.AMUI.progress.start();
 	 	var url = hostUrl + "rest/pxclass/disable.json";
 	 	$.ajax({
 	 		type : "POST",
 	 		url : url,
 	 		data : {uuid:uuid},
 	 		dataType : "json",
 	 		success : function(data) {
 	 			$.AMUI.progress.done();
 	 			if (data.ResMsg.status == "success"){
 	 				ajax_Class_div_byRight(groupuuid);				
 	 			}else{
 	 				alert(data.ResMsg.message);
 	 				G_resMsg_filter(data.ResMsg);
 	 			}
 	 		},
 			error :G_ajax_error_fn
 	 	});
 	 };  
//****************************************************************
 	 
 	 
 	 
 	 
//************************班级管理模块-班级详情代码*********************
/*
 * （标头）班级管理-班级详情-服务器请求;
 * */
 function react_ajax_class_students_manage_byRight(uuid){
 	$.AMUI.progress.start();
 	var formdata={};
     var url = hostUrl + "rest/pxclass/"+uuid+".json";
 	$.ajax({
 		type : "GET",
 		url : url,
 		dataType : "json",
 		 async: false,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				formdata=data.data;
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
		error :G_ajax_error_fn
 	});
 	url=hostUrl + "rest/pxstudent/getStudentByClassuuid.json?classuuid="+uuid;
 	$.ajax({
 		type : "GET",
 		url : url,
 		dataType : "json",
 		 async: false,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				students=data.list;
 				students_number=data.list.length;
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
		error :G_ajax_error_fn
 	});
 	Queue.push(function(){react_ajax_class_students_manage_byRight(uuid);},"班级详情");
 	React.render(React.createElement(Class_students_manage_byRight,{
 		students:students,
 		formdata:formdata,
 		groupList:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_class_m"),"uuid","brand_name"),
		classList:G_selected_dataModelArray_byArray(Store.getChooseClass(formdata.groupuuid),"uuid","name"),
 		students:students}), document.getElementById('div_body'));
 };
 

 /*
  * <班级管理>编辑、删除空班级-学校、班级下拉框-按钮入口处理事件
  * @delete:删除空班级；
  * @edit_class:编辑班级；
  * @xiala：学校、班级下拉框选择后刷新方法;
  * uuids:点击框后班级的ID；
  * */	  
 function btn_click_class_list_byRight(m,groupuuid,uuids){
	if(m=="students"){
	Queue.push(function(){btn_click_class_list_byRight(m,groupuuid,uuids);},"管理学生");
	add_studentsByData_byRight({classuuid:uuids,groupuuid:groupuuid,sex:0});
	 }else if(m=="edit_class"){
 		Queue.push(function(){btn_click_class_list_byRight(m,groupuuid,uuids);},"编辑班级");
 		react_ajax_class_edit_get_byRight({groupuuid:groupuuid},uuids);
 	}else if(m=="delete"){
 		//删除空班级事件处理;
		px_class_delete_byRight(uuids);
	}else if(m=="xiala"){
		 //班级管理-班级详情-学校、班级下拉框选择后刷新方法
		react_ajax_class_students_manage_byRight(uuids);
	}else if(m=="add_class"){
 		Queue.push(function(){btn_click_class_list_byRight(m,groupuuid,uuids);},"新增班级");
 		react_ajax_class_edit_get_byRight({groupuuid:groupuuid},null);
	}		
 };
 
 
 /*
  *班级管理-班级详情-删除空班级
  * */  	  
 function px_class_delete_byRight(uuid){	  		
 	if(!confirm("确定要删除吗?")){
 		return;
 	}
   	$.AMUI.progress.start();
       var url = hostUrl + "rest/pxclass/delete.json?uuid="+uuid;
 	$.ajax({
 		type : "POST",
 		url : url,
 		dataType : "json",
 		 async: true,
 		success : function(data) {
 			$.AMUI.progress.done();
 			// 登陆成功直接进入主页
 			if (data.ResMsg.status == "success") {
 				G_msg_pop(data.ResMsg.message);
 				Store.clearChooseClass();
 				Store.setMyClassList(null);
 				Store.clearClassCourseList();
 				Store.setClassCourseList(null);
 				Queue.doBackFN();
 			} else {
 				alert(data.ResMsg.message);
 			}
 		},
 		error :G_ajax_error_fn
 	});
 }; 

 
//***************************************************************
 
 
 
 
 
 
 
 
 
//************************班级管理-班级详情-列表中学生名字按钮详情代码********************* 
 /*
  * （标头）班级管理-班级详情-列表学生名字
  * */
  function ajax_class_students_edit_byRight(formdata,uuid){
  	Queue.push(function(){ajax_class_students_edit_byRight(formdata,uuid);},"编辑学生");
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/pxstudent/"+uuid+".json";
  	$.ajax({
  		type : "GET",
  		url : url,
  		dataType : "json",
  		 async: true,
  		success : function(data) {
  			$.AMUI.progress.done();
  			// 登陆成功直接进入主页
  			if (data.ResMsg.status == "success") {
  				React.render(React.createElement(Class_student_edit_byRight,{
  					formdata:data.data
  					}), document.getElementById('div_body'));
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
 		error :G_ajax_error_fn
  	});
  };
  
  /*
   *（标头）班级管理-班级详情-列表学生详情编辑换班级按钮 服务器请求
   * */
   function  ajax_student_changeClass(classuuid,studentuuid){
       var url = hostUrl + "rest/pxstudent/changeClass.json";
   	$.ajax({
   		type : "POST",
   		data:{classuuid:classuuid,studentuuid:studentuuid},
   		url : url,
   		dataType : "json",
   		 async: true,
   		success : function(data) {
   			$.AMUI.progress.done();
   			if (data.ResMsg.status == "success") {
   				G_msg_pop(data.ResMsg.message);
   				//Queue.doBackFN();此方法没生效;
  				Queue.doBackFN();
   			} else {
   				alert("加载数据失败："+data.ResMsg.message);
   			}
   		},
 		error :G_ajax_error_fn
   	});
   };
   
  /*
   * （标头）班级管理-班级详情-列表学生详情编辑 提交按钮 服务器请求
   * */
  function btn_ajax_class_student_save_byRight(){
  	var objectForm = $('#editClassStudentForm').serializeJson();
      var opt={
              formName: "editClassStudentForm",
              url:hostUrl + "rest/pxstudent/save.json",
              cbFN:function(data){
              	G_msg_pop(data.ResMsg.message);
              	Store.setClassStudentsList(data.uuid,null);
  				react_ajax_class_students_manage_byRight(objectForm.classuuid);
              }
              };
  G_ajax_abs_save(opt);
  }

//**************************************************************************
 

//************************班级管理-班级详情-添加与编辑班级按钮详情代码*********************  
  /*
   * <班级管理>-班级详情-添加与编辑班级按钮服务请求
   * */	 
  function react_ajax_class_edit_get_byRight(formdata,uuid){
	 	if(!uuid){
	 		var userinfo=Store.getUserinfo();
	 		formdata.headTeacher=userinfo.uuid;
	 		formdata.headTeacher_name=userinfo.name;
	 		React.render(React.createElement(Class_edit_byRight,{
	 			formdata:formdata,
	 			group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_class_m"),"uuid","brand_name")
	 			}), document.getElementById('div_body'));
	 		return;
	 	}
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/pxclass/"+uuid+".json";
  	$.ajax({
  		type : "GET",
  		url : url,
  		dataType : "json",
  		 async: true,
  		success : function(data) {
  			$.AMUI.progress.done();
  			if (data.ResMsg.status == "success") {
  				React.render(React.createElement(Class_edit_byRight,{
  					formdata:data.data,
  					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_class_m"),"uuid","brand_name")
  					}), document.getElementById('div_body'));
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
 		error :G_ajax_error_fn
  	});
  };
  /*
   * <班级管理>添加与编辑班级提交按钮服务请求
   * 直接把Form表单发给服务器，服务器自己取参数;
   * */
  function ajax_class_save_byRight(){
      var opt={
              formName: "editClassForm",
              url:hostUrl + "rest/pxclass/save.json",
              cbFN:function(data){
              	G_msg_pop(data.ResMsg.message);
  				Store.setMyClassList(null);
  				Store.clearChooseClass(null);
  				Queue.doBackFN();

              }
              };
  G_ajax_abs_save(opt);
  }	
//**************************************************************************
 

//************************班级管理-班级详情-管理学生按钮详情代码*********************  	 
  /*
  * 班级管理-班级详情-管理学生按钮服务器请求
  * */
  var G_formdata=null;
  function add_studentsByData_byRight(formdata){
  	G_formdata=formdata;
  	//初始取出学生列表
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/pxstudent/getStudentByClassuuid.json";
  	$.ajax({
  		type : "GET",
  		url : url,
  		data:{classuuid:formdata.classuuid},
  		dataType : "json",
  		 async: true,
  		success : function(data) {
  			$.AMUI.progress.done();
  			if (data.ResMsg.status == "success") {
  				React.render(React.createElement(My_adminStudent_byRight,{
  					formdata:formdata,
  					events:data.list
  					}), document.getElementById('div_body'));
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
  		error :G_ajax_error_fn
  	});	
  };	 
  /*
  * 班级管理-班级详情-管理学生-搜索后-添加学生与班级关系按钮服务器请求
  * */
  function add_StudentClass_byRight(class_uuid,student_uuid){
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/pxstudent/addStudentClass.json";
  	$.ajax({
  		type : "POST",
  		url : url,
  		data:{class_uuid:class_uuid,student_uuid:student_uuid},
  		dataType : "json",
  		 async: true,
  		success : function(data) {
  			$.AMUI.progress.done();
  			if (data.ResMsg.status == "success") {
  				G_msg_pop(data.ResMsg.message);
  				add_studentsByData_byRight({classuuid:class_uuid});
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
  		error :G_ajax_error_fn
  	});	
  };
  /*
   * 班级管理-班级详情-管理学生-创建学生按钮-保存按钮服务器请求
   * */
  function btn_ajax_myclass_student_save_byRight(){
  	var objectForm = $('#editClassStudentForm').serializeJson();
  	
  	objectForm.birthday=G_Check.formateDate(objectForm.birthday);
  	if(objectForm.birthday&&!G_Check.date1(objectForm.birthday)){
  		G_msg_pop("出生日期格式不正确,格式为:YYYY-MM-DD");
  		$("input[name='birthday']").focus()
  		return;
  	}
  	
  	$("input[name='birthday']").val(objectForm.birthday);
      var opt={
              formName: "editClassStudentForm",
              url:hostUrl + "rest/pxstudent/save.json",
              cbFN:function(data){
              	G_msg_pop(data.ResMsg.message);
              	Store.setClassStudentsList(data.uuid,null);
              	react_ajax_class_students_manage_byRight(objectForm.classuuid);
              }
              };
  G_ajax_abs_save(opt);
  }	 
//**************************************************************************	 
	 
//±±±±±±±±±±±±±±±±±±±±±±±±±(班级管理)暂时屏蔽代码	 
 /*
  * 花名册下载
  * @param formdata
  * @param operate
  */
 // function ajax_flowername_download_byRight (groupuuid,classuuid,xlsname){
//	  	var inputs;
//	  	var url = hostUrl + "rest/pxstudent/exportStudentExcel.json";
//	  	   inputs+='<input type="hidden" name="groupuuid" value="'+groupuuid+'" />'; 
//	  	  inputs+='<input type="hidden" name="classuuid" value="'+classuuid+'" />'; 
//	  	 inputs+='<input type="hidden" name="xlsname" value="'+xlsname+'" />'; 
//	         // request发送请求
//	  	$('<form action="'+ url +'" method="post">'+inputs+'</form>')
//	       .appendTo('body').submit().remove();
	 // };
//±±±±±±±±±±±±±±±±±±±±±±±±±±±±
	 
	 
	 
//—————————————————————————————————收支记录—————————————————————————
 /*
  * <收支记录>服务器请求
  * @请求数据成功后执行Accounts_EventsTable方法绘制
  * 在kd_react
  * */
 function ajax_accounts_listByGroup_byRight(groupuuid) {
	var grouplist= Store.getGroupByRight("PX_accounts_m");
	if(!grouplist||grouplist.length==0){
		alert("没有权限!");
		return "";
	}
	if(!groupuuid){
		groupuuid=grouplist[0].uuid;
	}
 	Queue.push(function(){ajax_accounts_listByGroup_byRight(groupuuid);},"收支记录");
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
 				React.render(React.createElement(Accounts_EventsTable_byRight, {
 					group_uuid:groupuuid,
 					group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name"),
 					events: data.list,
 					responsive: true, bordered: true, striped :true,hover:true,striped:true
 					}), document.getElementById('div_body'));
 				
 			} else {
 				alert(data.ResMsg.message);
 				G_resMsg_filter(data.ResMsg);
 			}
 		},
		error :G_ajax_error_fn
 	});
 };	  
 /*
  * <收支记录>添加按钮事件处理
  * @调用ajax_accounts_edit
  * */
 function btn_click_accounts_byRight(m,formdata){
 	ajax_accounts_edit_byRight(m,formdata);
 };
 /*<收支记录>添加按钮详情绘制前数据准备		
 * @type_list:收费类型数组;
 * @group_list:机构数组;
 * @class_list:班级
 * 调用Accounts_edit
 * */
 function ajax_accounts_edit_byRight(m,formdata){
 	Queue.push(function(){ajax_accounts_edit_byRight(m,formdata);},"添加收支");
 	  if(!formdata.groupuuid)formdata.groupuuid="";
 	  if(!formdata.classuuid)formdata.classuuid="";
 	  if(!formdata.studentuuid)formdata.studentuuid="";
 	React.render(React.createElement(Accounts_edit_byRight,{
 			type_list:G_selected_dataModelArray_byArray(Vo.getTypeList("KD_Accounts_type"),"key","val"),
 			group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_accounts_m"),"uuid","brand_name"),
 			formdata:formdata
 			}),
 			document.getElementById('div_body'));
 };

 /*<收支记录>保存按钮服务器请求；	
 * */
 function ajax_accounts_save_byRight(){
     var opt={
             formName: "editAccountsForm",
             url:hostUrl + "rest/accounts/save.json",
             cbFN:null
             };
 G_ajax_abs_save(opt);
 }
 /*<收支记录>保存继续按钮服务器请求；		
 * */
 function ajax_accounts_saveAndAdd_byRight(){
     var opt={
             formName: "editAccountsForm",
             url:hostUrl + "rest/accounts/save.json",
             cbFN:function(data){
             	G_msg_pop("保存成功!继续添加.");
             	// var objectForm = $('#editAccountsForm').serializeJson();
             	 //$("input[name=num]").val("");
             }
             };
 G_ajax_abs_save(opt);
 }	  


//——————————————————————————学生列表—————————————————————————— 
 /*
  * <学生列表>（获取用户列表服务器请求）；
  * 各属性置空开始，方便后面的的机构、班级、名字搜索；
  * */
 var g_student_query_point=1;
 function ajax_student_query_byRight(groupuuid,classuuid,name,pageNo) {
 	Queue.push(function(){ajax_student_query_byRight(groupuuid,classuuid,name,pageNo);},"学生列表");
 	  if(!groupuuid)groupuuid="";
 	  if(!classuuid)classuuid="";
 	 if(!name)name="";
 	  if(!pageNo)pageNo=1;
 	 g_student_query_point=pageNo;
 		$.AMUI.progress.start();
 		var url = hostUrl + "rest/pxstudent/querybyRight.json?groupuuid="+groupuuid+"&classuuid="+classuuid+"&name="+name+"&pageNo="+pageNo;
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
 	  					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_student_allquery"),"uuid","brand_name"),
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

 /*
  *  <学生列表>界面下的二级界面学生详细信息
  * @服务器请求:POST rest/student/{uuid}.json;
  * uuid:用户ID;
  * @根据数据在 Kd_react做绘制处理 
  * */
 function ajax_class_students_look_info_byRight(uuid,title){
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/pxstudent/"+uuid+".json";
 	$.ajax({
 		type : "GET",
 		url : url,
 		dataType : "json",
 		 async: true,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				React.render(React.createElement( Class_student_look_info_byRight,{
 					formdata:data.data
 					}), G_get_div_second());
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
		error :G_ajax_error_fn
 	});
 };	


//——————————————————————————评价老师—————————————————————————— 
 /*
  * <评价老师>（获取用户列表服务器请求）；
  * 各属性置空开始，方便后面的的机构、班级、名字搜索；
  * */
 var g_teachingjudge_point=0;
 function ajax_teachingjudge_query_byRight(begDateStr,endDateStr,groupuuid,teacher_name,type) {
 	Queue.push(function(){ ajax_teachingjudge_query_byRight(begDateStr,endDateStr,groupuuid,teacher_name,type);},"评价老师");
	var grouplist=Store.getGroupByRight("PX_teachingjudge_q");  
	if(!grouplist||grouplist.length==0){
		alert("没有权限!");
		return "";
	}
	if(!groupuuid){
		groupuuid=grouplist[0].uuid;
	}
 	  if(!type)type="";
 	  if(!teacher_name)teacher_name="";	
 		var now=new Date();
 	  if(!begDateStr)begDateStr=G_week.getDateStr(now,0);
 	  if(!endDateStr)endDateStr=G_week.getDateStr(now,0);
 		$.AMUI.progress.start();
 		var url = hostUrl + "rest/teachingjudge/query.json";
 	
 		$.ajax({          
 			type : "GET",  
 			url : url,
 			data:{begDateStr:begDateStr,endDateStr:endDateStr,groupuuid:groupuuid,type:type,teacher_name:teacher_name,type:type},
 			dataType : "json",
 			success : function(data) {
 				$.AMUI.progress.done();
 				if (data.ResMsg.status == "success") {
 	  				React.render(React.createElement(Query_teachingjudge_list_byRight, {
 	  					begDateStr:begDateStr,
 	  					endDateStr:endDateStr,
 	  					group_uuid:groupuuid,
 	  					type:type,
 	  					group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name"),
 	  					teachingjudge_typelist:G_selected_dataModelArray_byArray(Vo.getTypeList("PX_Teachingjudge_type"),"key","val"),
 	  					events: data.list,
 	  					responsive: true, bordered: true, striped :true,hover:true,striped:true	  					
 	  				}), document.getElementById('div_body'));					
 				}
 			}
 		}); 
 	};
 		
	
 	


//幼儿园用户授权
function menu_kd_roleUser_list_fn() {
	var grouplist=Store.getGroupByRight("PX_announce_m");
	if(!grouplist||grouplist.length==0){
		alert("没有权限!");
		return "";
	}
	var groupuuid=grouplist[0].uuid;
	Queue.push(menu_kd_roleUser_list_fn,"授权");
	var opt={
			groupuuid:groupuuid,
			group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name"),
			role_list:Store.getRoleList(2)
		};
	React.render(React.createElement(G_Role_User_EventsTable2,opt), document.getElementById('div_body'));
};

//（我）<修改教师资料资料>
function menu_userteacher_fn(){
	Queue.push(function(){menu_userteacher_fn();},"修改教师资料");
	$.AMUI.progress.start();
//	 var userteacherlist = [
//		            {value: "0", label: "本科"},
//		            {value: "1", label: "大专"},
//		            {value: "2", label: "中专"},
//		            {value: "3", label: "职高"},
//		            {value: "4", label: "硕士"}
//		          ];
//	 
	 var userteacherlist=G_selected_dataModelArray_byArray(Vo.getTypeList("xueli"),"key","val");
	var url = hostUrl + "rest/userteacher/get.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {useruuid:Store.getUserinfo().uuid},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Div_userteacher_update,{
					formdata:data.data,
					userteacherlist:userteacherlist
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
};





//——————————————————————————<培训机构新版>教学计划<管理模块>—————————————————————————— 
/*
 * <教学计划>（获取用户列表服务器请求）；
 * */
//var g_begDateStr_pageNo_point=0;	
 function px_ajax_teachingplan_byRight(groupuuid,classuuid,courseuuid){ 
//	var now=new Date();
//	if(!pageNo)pageNo=0;
//	g_begDateStr_pageNo_point=pageNo;
//	  	now=G_week.getDate(now,pageNo*7);
//	var begDateStr=G_week.getWeek0(now,pageNo);
//	var endDateStr=G_week.getWeek6(now,pageNo);
		Queue.push(function(){px_ajax_teachingplan_byRight(groupuuid,classuuid,courseuuid);},"教学计划");
	   	$.AMUI.progress.start();
	       var url = hostUrl + "rest/pxteachingplan/list.json";
	   	$.ajax({
	   		type : "GET",
	   		url : url,
	   		data : {classuuid:classuuid},
	   		dataType : "json",
	   		 async: false,
	   		success : function(data) {
	   			$.AMUI.progress.done();
	   			if (data.ResMsg.status == "success") {	   				
					React.render(React.createElement(Px_rect_teachingplan_byRight, {
						classuuid:classuuid,
						groupuuid:groupuuid,	
						courseuuid:courseuuid,
						events: data.list,
						responsive: true, bordered: true, striped :true,hover:true,striped:true						
					}), document.getElementById('div_body'));
					
	   			} else {
	   				alert("加载数据失败："+data.ResMsg.message);
	   			}
	   		},
			error :G_ajax_error_fn
	   	});
	   };
/*  
* <教学计划>添加与修改
* */
   function teachingplan_edit_onClick_byRight(m,formdata){
	   var name;
	   if(m=="add"){
		   name="新建课程";
	   }else{
		   name="编辑课程";
	   }
	   Queue.push(function(){teachingplan_edit_onClick_byRight(formdata);},name);
		React.render(React.createElement(Px_Teachingplan_edit,{
 			formdata:formdata
 			}), document.getElementById('div_body'));

   };
 /*(教学计划)
 * 班级详情内添加编辑提交按钮服务器请求
 * 直接把Form表单发送给服务器
 * */ 
function ajax_teachingplan_save_byRight(){
	var objectForm = $('#editTeachingplanForm').serializeJson();
    var opt={
            formName: "editTeachingplanForm",
            url:hostUrl + "rest/pxteachingplan/save.json",
            cbFN:function(data){
            	G_msg_pop(data.ResMsg.message);
 //           	Store.setClassStudentsList(data.uuid,null);
            	px_ajax_teachingplan_byRight(G_mygroup_choose,objectForm.classuuid,G_course_choose);
            }
            };
G_ajax_abs_save(opt);
}
/*
*(教学计划)删除所有课程；
*@：删除成功后调用发布消息方法刷新;
* */  	  
 function react_all_teachingplan_delete(classuuid,courseuuid){
   	if(!confirm("确定要删除所有课程吗?")){
	return;
}
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/pxteachingplan/update_deleteAll.json?classuuid="+classuuid;
$.ajax({
	type : "POST",
	url : url,
	dataType : "json",
	 async: true,
	success : function(data) {
		$.AMUI.progress.done();
		if (data.ResMsg.status == "success") {
			px_ajax_teachingplan_byRight(G_mygroup_choose,classuuid,courseuuid);
   			 } else {
   				alert(data.ResMsg.message);
   			}
   		},
   		error :G_ajax_error_fn
   	});
   }; 
//(教学计划)删除单独课程按钮
function px_react_ajax_teachingplan_delete(obj){ 
	if(!confirm("确定要删除吗?")){
		return;
	}
	   	$.AMUI.progress.start();
	       var url = hostUrl + "rest/pxteachingplan/delete.json";
	   	$.ajax({
	   		type : "POST",
	   		url : url,
	   		data : {uuid:obj.uuid},
	   		dataType : "json",
	   		 async: false,
	   		success : function(data) {
	   			$.AMUI.progress.done();
	   			if (data.ResMsg.status == "success") {	   				
	   				px_ajax_teachingplan_byRight(G_mygroup_choose,obj.classuuid,G_course_choose);
	   			} else {
	   				alert("加载数据失败："+data.ResMsg.message);
	   			}
	   		},
			error :G_ajax_error_fn
	   	});
	   };
	 //复制课程按钮请求
	   function px_react_copy_buttn(from_classuuid,to_classuuid){ 
	   	   	$.AMUI.progress.start();
	   	       var url = hostUrl + "rest/pxteachingplan/copybyclass.json";
	   	   	$.ajax({
	   	   		type : "POST",
	   	   		url : url,
	   	   		data : {from_classuuid:from_classuuid,to_classuuid:to_classuuid},
	   	   		dataType : "json",
	   	   		 async: false,
	   	   		success : function(data) {
	   	   			$.AMUI.progress.done();
	   	   			if (data.ResMsg.status == "success") {	   				
	   	   				px_ajax_teachingplan_byRight(G_mygroup_choose,to_classuuid,G_course_choose);
	   	   			} else {
	   	   				alert("加载数据失败："+data.ResMsg.message);
	   	   			}
	   	   		},
	   			error :G_ajax_error_fn
	   	   	});
	   	   };   
/*  
* <教学计划>批量修改
* */
   function teachingplan_addClass_byRight(classuuid){
	   var formdata={classuuid:classuuid,uuid:null}
	   Queue.push(function(){teachingplan_edit_onClick_byRight(classuuid);},"批量修改");
		React.render(React.createElement(Px_Teachingplan_addClass,{
 			formdata:formdata
 			}), document.getElementById('div_body'));

   };   	   
 /*(教学计划)
* 班级详情内添加编辑提交按钮服务器请求
* 直接把Form表单发送给服务器
* */ 
   function addteachingplan_save_byRight(){
   	var objectForm = $('#addtTeachingplanForm').serializeJson();
   	var per_week=null;
	 $("input[name='per_week_check']").each(function(){
		if(this.checked){
			 if(per_week==null)per_week=this.value;
			 else per_week+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
		}
		});
	 
	  if(!per_week){
		  G_msg_pop("请勾选复选框！");
		  return;
	  }
   	
    $("input[name='per_week']").val(per_week);
   var opt={
           formName: "addtTeachingplanForm",
           url:hostUrl + "rest/pxteachingplan/save.json",
           cbFN:function(data){
           	G_msg_pop(data.ResMsg.message);
               	px_ajax_teachingplan_byRight(G_mygroup_choose,objectForm.classuuid,G_course_choose);
               }
               };
   G_ajax_abs_save(opt);
   }	   	   
//objectForm.birthday=G_Check.formateDate(objectForm.birthday);
//if(objectForm.birthday&&!G_Check.date1(objectForm.birthday)){
//	G_msg_pop("出生日期格式不正确,格式为:YYYY-MM-DD");
//	$("input[name='birthday']").focus()
//	return;
//}
//
//$("input[name='birthday']").val(objectForm.birthday);
//var opt={
//        formName: "editClassStudentForm",
//        url:hostUrl + "rest/pxstudent/save.json",
//        cbFN:function(data){
//        	G_msg_pop(data.ResMsg.message);
//        	Store.setClassStudentsList(data.uuid,null);
//        	react_ajax_class_students_manage(objectForm.classuuid);
//        }
//        };   
   
//废弃代码（老版课程管理模块index直接调用react中请求并且绘制）
////———————————————————————————————————<老版>教学计划<管理模块>—————————————————————————      
//  /*(教学计划)（服务器请求  
//   * Teachingplan_EventsTable在common_rect绘制；
//   * 初始进入都为默认第一位
//   * */ 
//var g_cookbookPlan_week_point=0;
//function ajax_teachingplan_listByClass_byRight(groupuuid,classuuid,weeknum){
//	if(!classuuid&&Store.getMyClassList().length>0)classuuid=Store.getMyClassList()[0].uuid;
//	var now=new Date();
//	if(weeknum){
//		now=G_week.getDate(now,weeknum*7);
//	}else{
//		g_cookbookPlan_week_point=0;
//	}
//	var begDateStr=G_week.getWeek0(now);
//	var endDateStr=G_week.getWeek6(now);
//  	Queue.push(function(){ajax_teachingplan_listByClass_byRight(groupuuid,classuuid,weeknum);},"教学计划");
//	$.AMUI.progress.start();
//	var url = hostUrl + "rest/teachingplan/list.json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		data : {classuuid:classuuid,begDateStr:begDateStr,endDateStr:endDateStr},
//		dataType : "json",
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				if(data.list==null)data.list=[];
//				React.render(React.createElement(Teachingplan_EventsTable_byRight, {
//					groupuuid:groupuuid,
//					classuuid:classuuid,
//					events: data.list,
//					weeknum:weeknum,
//					begDateStr:begDateStr,
//					endDateStr:endDateStr,
//					groupList:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_teachingplan_m"),"uuid","brand_name"),
//					classList:G_selected_dataModelArray_byArray(Store.getChooseClass(groupuuid),"uuid","name"),
//					responsive: true, bordered: true, striped :true,hover:true,striped:true
//					}), document.getElementById('div_body'));
//				
//			} else {
//				alert(data.ResMsg.message);
//				G_resMsg_filter(data.ResMsg);
//			}
//		}
//	});
//};
///*(教学计划)
// * 班级详情内添加编辑课程等按钮方法判断;
// * */ 
//function btn_click_teachingplan_byRight(m,uuid,groupuuid,classuuid,ch_day){
//   if(m=="edit"){
//		react_ajax_teachingplan_edit_byRight(null,uuid,"课程编辑");
//	}else if(m=="del"){
//		//react_ajax_teachingplan_delete(groupuuid,uuid);
//	}
//};
////删除按钮
//function react_ajax_teachingplan_delete(groupuuid,uuid){	
//	$.AMUI.progress.start();
//  var url = hostUrl + "rest/teachingplan/delete.json?uuid="+uuid;
//	$.ajax({
//		type : "POST",
//		url : url,
//		dataType : "json",
//		 async: true,
//		success : function(data) {
//			$.AMUI.progress.done();
//			// 登陆成功直接进入主页
//			if (data.ResMsg.status == "success") {
//				ajax_teachingplan_listByClass(groupuuid);
//			} else {
//				alert(data.ResMsg.message);
//			}
//		},
//		error : function( obj, textStatus, errorThrown ){
//			$.AMUI.progress.done();
//			alert(url+",error:"+textStatus);
//		}
//	});
//};
///*(教学计划)
// * 班级详情内添加编辑按钮服务器请求
// * 
// * */ 
//function react_ajax_teachingplan_edit_byRight(formdata,uuid,nmae){
//  	Queue.push(function(){react_ajax_teachingplan_edit_byRight(formdata,uuid,nmae);},nmae);
//	$.AMUI.progress.start();
//  var url = hostUrl + "rest/teachingplan/"+uuid+".json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		dataType : "json",
//		 async: true,
//		success : function(data) {
//			$.AMUI.progress.done();
//			// 登陆成功直接进入主页
//			if (data.ResMsg.status == "success") {
//				React.render(React.createElement(Teachingplan_edit_byRight,{
//					formdata:data.data
//					}), document.getElementById('div_body'));
//			} else {
//				alert("加载数据失败："+data.ResMsg.message);
//			}
//		},
//		error : function( obj, textStatus, errorThrown ){
//			$.AMUI.progress.done();
//			alert(url+",error:"+textStatus);
//		}
//	});
//};
///*(教学计划)
// * 班级详情内添加编辑提交按钮服务器请求
// * 直接把Form表单发送给服务器
// * */ 
//function ajax_teachingplan_save_byRight(){
//    var opt={
//            formName: "editTeachingplanForm",
//            url:hostUrl + "rest/teachingplan/save.json",
//            cbFN:null
//            };
//G_ajax_abs_save(opt);
//}  
 














//——————————————————————————<发布对外课程>发布课程<管理模块>—————————————————————————— 
/*
 * <发布课程>（获取用户列表服务器请求）；
 * */
//var g_begDateStr_pageNo_point=0;	
 function px_ajax_course_byRight(groupuuid){
//	var now=new Date();
//	if(!pageNo)pageNo=0;
//	g_begDateStr_pageNo_point=pageNo;
//	  	now=G_week.getDate(now,pageNo*7);
//	var begDateStr=G_week.getWeek0(now,pageNo);
//	var endDateStr=G_week.getWeek6(now,pageNo);

	 var groupList=Store.getGroup();
		if(!G_mygroup_choose)G_mygroup_choose=groupList[0].uuid
     if(!groupuuid)groupuuid=G_mygroup_choose;
     else G_mygroup_choose=groupuuid;
		Queue.push(function(){px_ajax_course_byRight(groupuuid);},"发布课程");
	   	$.AMUI.progress.start();
	       var url = hostUrl + "rest/pxCourse/list.json";
	   	$.ajax({
	   		type : "GET",
	   		url : url,
	   		data : {groupuuid:groupuuid},
	   		dataType : "json",
	   		 async: false,
	   		success : function(data) {
	   			$.AMUI.progress.done();
	   			if (data.ResMsg.status == "success") {	   				
					React.render(React.createElement(px_rect_course_byRight, {
						groupuuid:groupuuid,
						groupList:G_selected_dataModelArray_byArray(groupList,"uuid","brand_name"),
						events: data.list.data,
						responsive: true, bordered: true, striped :true,hover:true,striped:true						
					}), document.getElementById('div_body'));
					
	   			} else {
	   				alert("加载数据失败："+data.ResMsg.message);
	   			}
	   		},
			error :G_ajax_error_fn
	   	});
	   };
/*  
* <发布课程>添加与修改
* */
   function px_course_onClick_byRight(formdata){
	   var name;
	   var img;
	   if(!formdata.uuid){
		   name="新建课程";
			$.AMUI.progress.start();
			var url = hostUrl + "rest/group/getBaseInfo.json";
			$.ajax({
				type : "GET",
				url : url,
				data : {uuid:formdata.groupuuid},
				dataType : "json",
				async: false,
				success : function(data) {
					$.AMUI.progress.done();
					if (data.ResMsg.status == "success") {						
						 img=data.data.img;					
					} else {
						alert(data.ResMsg.message);
						G_resMsg_filter(data.ResMsg);
					}
				},
				error : G_ajax_error_fn
			});
		   Queue.push(function(){px_course_onClick_byRight(formdata);},name);
			React.render(React.createElement(Px_course_edit,{
				logo:img,
				groupList:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name"),
	 			formdata:formdata
	 			}), document.getElementById('div_body'));
			return;
	   }
		   name="编辑课程";
		   Queue.push(function(){px_course_onClick_byRight(formdata);},name);
		
		$.AMUI.progress.start();
	    var url = hostUrl + "rest/pxclass/"+formdata.uuid+".json";
		$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			 async: true,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					React.render(React.createElement(Px_course_edit,{
						groupList:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name"),
			 			formdata:formdata
			 			}), document.getElementById('div_body'));
				} else {
					alert("加载数据失败："+data.ResMsg.message);
				} 
			},
			error :G_ajax_error_fn
		});
   };
/*
*(发布课程)删除按钮服务请求；
*@：删除成功后调用发布消息方法刷新;
* */  	  
   function react_ajax_class_course_delete(groupuuid,uuid){	
   	if(!confirm("确定要删除该课程吗?")){
	return;
}
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/pxCourse/delete.json?uuid="+uuid;
$.ajax({
	type : "POST",
	url : url,
	dataType : "json",
	 async: true,
	success : function(data) {
		$.AMUI.progress.done();
		// 登陆成功直接进入主页
		if (data.ResMsg.status == "success") {
			px_ajax_course_byRight(groupuuid);
   			} else {
   				alert(data.ResMsg.message);
   			}
   		},
   		error :G_ajax_error_fn
   	});
   };  
 
/*(发布课程)查看课程详情方法按钮 
* */
   function px_ajax_class_course_look_info(uuid){
	   $.AMUI.progress.start();
		var url = hostUrl + "rest/pxCourse/"+uuid+".json";
		$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			 async: false,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					React.render(React.createElement(Class_course_look_info,{
			 			formdata:data.data
			 			}), G_get_div_second());
				} else {
					alert("加载数据失败："+data.ResMsg.message);
				} 
			},
			error :G_ajax_error_fn
		});	
		
   };  
   
   
   
   

 /*(发布课程)
 * 班级详情内添加编辑提交按钮服务器请求
 * 直接把Form表单发送给服务器
 * */ 
function ajax_course_save_byRight(){
    var opt={
            formName: "editCourseForm",
            url:hostUrl + "rest/pxCourse/save.json",
            cbFN:function(data){
            	Store.clearCourseList();
					G_msg_pop(data.ResMsg.message);
					Queue.doBackFN();
            }
            };
G_ajax_abs_save(opt);
}


//———————————————————————————————我的班级—————————————————————————     	  	  	  

/*
* <我的班级> 服务器请求
* */
function react_ajax_class_students_manage(uuid){
	$.AMUI.progress.start();	
	var formdata=null;
    var url = hostUrl + "rest/pxclass/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				formdata=data.data;
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
//	var students=null; 
	url=hostUrl + "rest/pxstudent/getStudentByClassuuid.json?classuuid="+uuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				students=data.list;
				stutent_num=data.list.length;
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
	Queue.push(function(){react_ajax_class_students_manage(uuid);},"我的班级");
//	if(students){
//		for(var i=0;i<students.length;i++){
//			var tmp=students[i];
//			tmp.img=G_def_headImgPath;
//			if(tmp.headimg)tmp.img=G_imgPath+tmp.headimg;
//			tmp.title=tmp.name;
//			tmp.link= "javascript:ajax_class_students_look_info('"+tmp.uuid+"','"+tmp.title+"')";
//		}
//	}
	React.render(React.createElement(Class_students_show,{
		students:students,
		formdata:formdata,
		classList:G_selected_dataModelArray_byArray(Store.getMyClassList(),"uuid" ,"name"),
		classuuid:uuid,
		stutent_num:stutent_num,
		students:students}), document.getElementById('div_body'));
	return ;
};

/*
 * <我的班级>管理学生按钮入口方法处理；
 * */	  
function btn_click_class_list(m,groupuuid,classuuid){
	if(!classuuid){
		G_msg_pop("请先创建班级!");
		return;
	}
	Queue.push(function(){btn_click_class_list(m,groupuuid,classuuid);},"管理学生");
	add_studentsByData({classuuid:classuuid,groupuuid:groupuuid,sex:0});		
};









//*********************我的班级模块-列表学生名字按钮相关代码********************* 
/*
 * （主页）我的班级-学生列表名字按钮详情服务器请求
 * @服务器请求:POST rest/pxstudent/{uuid}.json;
 * */
function ajax_class_students_look_info(uuid){
	Queue.push(function(){ajax_class_students_look_info(uuid);},"学生详情");
	$.AMUI.progress.start();
    var url = hostUrl + "rest/pxstudent/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement( Class_student_look_info,{formdata:data.data}), document.getElementById('div_body'));
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
};

/*
 * 我的班级-学生列表名字-修改学生按钮详情按钮服务器请求
 * */
 function ajax_myclass_students_edit(uuid){
 	Queue.push(function(){ajax_myclass_students_edit(uuid);},"编辑学生");
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/pxstudent/"+uuid+".json";
 	$.ajax({
 		type : "GET",
 		url : url,
 		dataType : "json",
 		 async: true,
 		success : function(data) {
 			$.AMUI.progress.done();
 			// 登陆成功直接进入主页
 			if (data.ResMsg.status == "success") {
 				React.render(React.createElement(Mycalss_student_edit,{
 					formdata:data.data
 					}), document.getElementById('div_body'));
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
 		error :G_ajax_error_fn
 	});
 };
 /*
  * <我的班级>-管理学生-创建学生/学生列表名字-修改学生（提交学生按钮服务器请求）
  * */
 function btn_ajax_myclass_student_save(){
 	var objectForm = $('#editClassStudentForm').serializeJson();
 	
 	objectForm.birthday=G_Check.formateDate(objectForm.birthday);
 	if(objectForm.birthday&&!G_Check.date1(objectForm.birthday)){
 		G_msg_pop("出生日期格式不正确,格式为:YYYY-MM-DD");
 		$("input[name='birthday']").focus()
 		return;
 	}
 	
 	$("input[name='birthday']").val(objectForm.birthday);
     var opt={
             formName: "editClassStudentForm",
             url:hostUrl + "rest/pxstudent/save.json",
             cbFN:function(data){
             	G_msg_pop(data.ResMsg.message);
             	Store.setClassStudentsList(data.uuid,null);
             	react_ajax_class_students_manage(objectForm.classuuid);
             }
             };
 G_ajax_abs_save(opt);
 }
//****************************************************************

 
 
//*********************我的班级模块-管理学生按钮相关代码********************* 
 /*
 * 我的班级-管理学生服务器请求
 * */
 var G_formdata=null;
 function add_studentsByData(formdata){
 	G_formdata=formdata;
 	//初始取出学生列表
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/pxstudent/getStudentByClassuuid.json";
 	$.ajax({
 		type : "GET",
 		url : url,
 		data:{classuuid:formdata.classuuid},
 		dataType : "json",
 		 async: true,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				React.render(React.createElement(My_adminStudent,{
 					formdata:formdata,
 					events:data.list
 					}), document.getElementById('div_body'));
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
 		error :G_ajax_error_fn
 	});	
 };
 /*
 * <我的班级>添加学生与班级关系
 * */
 function add_StudentClass(class_uuid,student_uuid){
 	//初始取出学生列表
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/pxstudent/addStudentClass.json";
 	$.ajax({
 		type : "POST",
 		url : url,
 		data:{class_uuid:class_uuid,student_uuid:student_uuid},
 		dataType : "json",
 		 async: true,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
				G_msg_pop(data.ResMsg.message);
 				add_studentsByData({classuuid:class_uuid});
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
 		error :G_ajax_error_fn
 	});	
 };


//****************************************************************









//————————————————————————————帮助列表————————————————————————— 

 /*
  * <帮助列表>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
  * 基本框 等
  * */
 function ajax_px_help_div(){
 	React.render(React.createElement(Announcements_px_Div_list), document.getElementById('div_body'));  	
 };
 /*
 *(帮助列表)服务器请求share/articleList
 * @types- 92
 * 取出数组服务器请求后
 * 开始绘制动态数据内容
 * */
 function ajax_help_px_list(list_div,pageNo,callback) {
 	$.AMUI.progress.start();
 	var url = hostUrl + "rest/share/articleList.json";
 	$.ajax({
 		type : "GET",
 		url : url,
   		data : {type:92,pageNo:pageNo},
 		dataType : "json",
 		async: false,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				React.render(React.createElement(Px_helplist_div, {
 					events: data.list,
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
  *<帮助列表>详情服务器请求；
 * @Announcements_show:详情绘制
  * 在kd_rect;
  * */
 function react_px_help_show(uuid,title){
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
				var o=data.data;
				  if(o.url){
						var flag=G_CallPhoneFN.openNewWindowUrl(o.title,o.title,null,data.share_url);
						if(flag)return;
				  }
 				React.render(React.createElement(Announcements_helpshow,{
 					data:data.data,
 					share_url:data.share_url,
 					isFavor:data.isFavor,
 					count:data.count
 					}),G_get_div_second());
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
 		error :G_ajax_error_fn
 	});
 };
 
 
 
 
 
//————————————————————————————咨询记录————————————————————————— 

 /*
  * <咨询记录>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
  * 基本框 等
  * */
 function ajax_zixun_div(){
 	React.render(React.createElement(zixun_px_Div_list,{
 		grouplist:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
 	}), document.getElementById('div_body'));  	
 };
 /*
 *(咨询记录)服务器请求share/articleList
 * @types- 92
 * 取出数组服务器请求后
 * 开始绘制动态数据内容
 * */
 function ajax_zixun_px_list(list_div,pageNo,callback) {
 	$.AMUI.progress.start();
 	var url = hostUrl + "rest/pxTelConsultation/queryByPage.json";
 	$.ajax({
 		type : "GET",
 		url : url,
   		data : {groupuuid:G_mygroup_choose,pageNo:pageNo},
 		dataType : "json",
 		async: false,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				React.render(React.createElement(Px_zixunlist_div, {
 					events: data.list,
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
 
 //————————————————————————————对外校务管理<管理模块>—————————————————————————  
 /*
  *(对外校务管理)<校园列表>服务器请求 ;
  *@Group_EventsTable:kd_react开始绘制
  * */
 function ajax_group_myList_byRight_px() {
 	$.AMUI.progress.start();
 	var url = hostUrl + "rest/group/myListByRight.json";
 	$.ajax({
 		type : "GET",
 		url : url,
 		data : "",
 		dataType : "json",
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				Store.setGroup(data.list);
 				React.render(React.createElement(Group_EventsTable_byRight_px, {
 					events: data.list,
 					responsive: true, bordered: true, striped :true,hover:true,striped:true
 					}), document.getElementById('div_body'));
 			} else {
 				alert(data.ResMsg.message);
 				G_resMsg_filter(data.ResMsg);
 			}
 		},
		error :G_ajax_error_fn
 	});
 };
 /*
  *(对外校务管理)<校园列表>return出来的按钮事件方法；
  *@ajax_group_edit：点击事件后下一步服务器处理公共方法；
  * */
 function btn_click_group_byRight_px(m,formdata){
 	var Titlename;
 	if(m=="add"){
 		Titlename="添加分校";
 	}else if(m=="show"){
 		Titlename="预览分校";
 	}else{
 		Titlename="编辑分校";
 	}
    	Queue.push(function(){btn_click_group_byRight_px(m,formdata);},Titlename);
    	ajax_group_edit_byRight_px(m,formdata);
   };

 /*
 *(对外校务管理)添加、编辑、预览、公共方法
 *@add：<校园列表>-添加分校绘制界面；
 *@Group_edi：<校园列表>kd_react；
 *@Group_show<校园预览>kd_react；
 */
 function ajax_group_edit_byRight_px(m,formdata){
   if(m=="add"){
 	React.render(React.createElement(Group_edit_byRight_px,{formdata:formdata}), document.getElementById('div_body'));
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
    			if (data.ResMsg.status == "success") {
    				if(m=="edit"){
    					React.render(React.createElement(Group_edit_byRight_px,{formdata:data.data}), document.getElementById('div_body'));
    				}else{
    					React.render(React.createElement(Group_show_byRight_px,{
    						formdata:data.data,
    						count:data.count}), G_get_div_second());
    				}
    			} else {
    				alert("加载数据失败："+data.ResMsg.message);
    			}
    		},
   		error :G_ajax_error_fn
    	});
    }; 	   
	   
/*
 *(对外校务管理)添加与编辑提交按钮方法
 *@OPT：我们把内容用Form表单提交到Opt我们封装的
 *一个方法内直接传给服务器，服务器从表单取出需要的参数
 * */  
 function ajax_group_save_byRight_px(){	   	
       var opt={
               formName: "editGroupForm",
               url:hostUrl + "rest/group/save.json",
               cbFN:function(data){
             	G_msg_pop(data.ResMsg.message);
 				Queue.doBackFN();
 				Store.setGroup(null);
             }
               };
   G_ajax_abs_save(opt);
   }	   
	    
 
 
 
//————————————————————————————对外发布-优惠活动————————————————————————— 

 /*
  * <优惠活动>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
  * 基本框 等
  * */
 function ajax_px_Preferential_div(groupuuid){
	var list=Store.getGroupByRight("PX_announce_m");
 	React.render(React.createElement(Preferential_px_Div_list,{
 	  groupuuid:groupuuid,	
 	  groupList:G_selected_dataModelArray_byArray(list,"uuid","brand_name")
 	}), document.getElementById('div_body'));  	
 };
 /*
 *(优惠活动)服务器请求share/articleList
 * @types- 85
 * 取出数组服务器请求后
 * 开始绘制动态数据内容
 * */
 function ajax_Preferential_px_list(list_div,pageNo,groupuuid,callback) {
 	$.AMUI.progress.start();
 	var url = hostUrl + "rest/announcements/listPxbenefit.json";
 	$.ajax({
 		type : "GET",
 		url : url,
   		data : {type:85,groupuuid:groupuuid,pageNo:pageNo},
 		dataType : "json",
 		async: false,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				React.render(React.createElement(Px_Preferentiallist_div, {
 					events: data.list,
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
  *<优惠活动>详情服务器请求；
 * @Announcements_show:详情绘制
  * 在kd_rect;
  * */
 function react_px_Preferential_show(uuid,title){
 	Queue.push(function(){react_px_Preferential_show(uuid,title);},"优惠活动");
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
 				React.render(React.createElement(Announcements_Preferentialshow,{
 					data:data.data,
 					share_url:data.share_url,
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
  *(优惠活动)添加等按钮绑定事件
  * @add:创建；
  * @edit:编辑；
  * @del:删除；
  * */  
  function btnclick_Preferential_announce(m,uuid,groupuuid){
 	  	if(m=="add"){
 	  		react_ajax_Preferential_edit({groupuuid:groupuuid,type:85},null);
 	  	}else if(m=="edit"){
 	  		react_ajax_Preferential_edit(null,uuid);
 	  	}else if(m=="del"){
 	  		react_ajax_Preferential_delete(uuid);
 	  	}
 	 };  
  /*
    *(优惠活动)创建与编辑服务请求；
    * @if(!uuid):创建；
    * @uuid不是则:编辑；
    * */  	  
   function react_ajax_Preferential_edit(formdata,uuid){
 	  	if(!uuid){
 			Queue.push(function(){react_ajax_Preferential_edit(formdata,uuid);},"创建活动");
 	 	     var now=new Date();
 	  		React.render(React.createElement(Preferential_edit,{
 	  			formdata:formdata,
 	  			start_time:G_week.getDateStr(now,0),
 	  			end_time:G_week.getDateStr(now,0),
 	  			group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
 	  			}), document.getElementById('div_body'));
 	  		return;
 	  	}
 		Queue.push(function(){react_ajax_Preferential_edit(formdata,uuid);},"编辑活动");
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
 	  				React.render(React.createElement(Preferential_edit,{
 	  					formdata:data.data,
 	  					start_time:data.data.start_time,
 	  					end_time:data.data.end_time,
 	  					group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
 	  					}),document.getElementById('div_body'));
 	  			} else {
 	  				alert("加载数据失败："+data.ResMsg.message);
 	  			}
 	  		},
 			error :G_ajax_error_fn
 	  	});
 	  };
 /*
   *(优惠活动)删除按钮服务请求；
   *@ajax_announce_listByGroup：删除成功后调用发布消息方法刷新;
   * */  	  
  function react_ajax_Preferential_delete(uuid){	 
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
  				ajax_px_Preferential_div(G_mygroup_choose);
  			} else {
  				alert(data.ResMsg.message);
  			}
  		},
  		error :G_ajax_error_fn
  	});
  };   	  
   /*
   *(优惠活动)创建与编辑提交按钮方法
   *@OPT：我们把内容用Form表单提交到Opt我们封装的
   *一个方法内直接传给服务器，服务器从表单取出需要的参数
   * */    
   function ajax_Preferential_save(){
       var opt={
               formName: "editAnnouncementsForm",
               url:hostUrl + "rest/announcements/save.json",
               cbFN:null
               };
   G_ajax_abs_save(opt);
   }	     
 
   
   
   
   
 //——————————————————————————<对外发布>老师资料<管理模块>—————————————————————————— 
   /*
	* <对外老师资料>建立Div舞台 
	*
	* */	
   function ajax_teacher_div_byRight(){
  	 	Queue.push(function(){ajax_teacher_div_byRight();},"老师资料");
	   	 var group_list=Store.getGroup();
			if(!G_mygroup_choose)G_mygroup_choose=group_list[0].uuid
	    React.render(React.createElement(Teacher_div,{
		grouplist:G_selected_dataModelArray_byArray(group_list,"uuid","brand_name")
	}), document.getElementById('div_body'));  	
};   
   
/*
 * <对外老师资料>服务器请求
 *
 * */
function ajax_teacher_listByGroup_byRight(list_div,pageNo,callback) {
	if(!pageNo)pageNo=1;
 	$.AMUI.progress.start();
	var url = hostUrl + "rest/pxteacher/listByPage.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {groupuuid:G_mygroup_choose,pageNo:pageNo},
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success"){
				React.render(React.createElement(Teacher_EventsTable_byRight, {
					events: data.list.data,
					handleClick:btn_click_class_list_byRight,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));	
 				if(typeof callback=='function'){
					callback(data.list);
				}
			}else{
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
};	   
/*  
 * <对外老师资料>添加与修改
 * */
    function px_teacher_onClick_byRight(m,formdata){
 	   var name;
 	   if(m=="add"){
 		   name="新增资料";
 	   }else{
 		   name="编辑资料";
 	   }
 	   Queue.push(function(){px_teacher_onClick_byRight(formdata);},name);
 		React.render(React.createElement(Px_teacher_edit,{
 			groupList:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name"),
  			formdata:formdata
  			}), document.getElementById('div_body'));

    };        
   
/*(对外老师资料)查看详情方法按钮 
* */
   function px_ajax_teacher_look_info(uuid){
	   $.AMUI.progress.start();
		var url = hostUrl + "rest/pxteacher/"+uuid+".json";
		$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			 async: false,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					React.render(React.createElement(Teacher_look_info,{
			 			formdata:data.data
			 			}), G_get_div_second());
				} else {
					alert("加载数据失败："+data.ResMsg.message);
				} 
			},
			error :G_ajax_error_fn
		});	
		
   };   
/*(对外老师资料)
 * 对外老师资料添加编辑提交按钮服务器请求
 * 直接把Form表单发送给服务器
 * */ 
function ajax_teacher_save_byRight(){
    var opt={
            formName: "editTeacherForm",
            url:hostUrl + "rest/pxteacher/save.json",
            cbFN:function(data){
            	Store.clearCourseList();
					G_msg_pop(data.ResMsg.message);
					Queue.doBackFN();
            }
            };
G_ajax_abs_save(opt);
}      

