if(typeof window.ajax_getUserinfo!='function'){
	window.location.href="index.html"+"?a="+Math.random();
}


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

				setCookie("bs_grouptype", data.S_type);
				PxLazyM.loadJS_for( getCookie("bs_grouptype"));
				G_msg_pop(data.ResMsg.message);
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


/*
 * 声请学生接送卡
 * */
 function ajax_studentbind_apply(uuid,callback){
		if(!confirm("确定要申请接送卡吗?")){
			return;
		}
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/studentbind/apply.json?studentuuid="+uuid;
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
 				if(typeof callback=='function')callback();
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
 		error :G_ajax_error_fn
 	});
 };

 /*
  * 声请学生接送卡
  * */
  function ajax_studentbind_cancelApply(studentuuid,userid,callback){
 		if(!confirm("确定要申请接送卡吗?")){
 			return;
 		}
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/studentbind/cancelApply.json";
  	$.ajax({
  		type : "POST",
  		url : url,
  		data:{studentuuid:studentuuid,userid:userid},
  		dataType : "json",
  		 async: true,
  		success : function(data) {
  			$.AMUI.progress.done();
  			// 登陆成功直接进入主页
  			if (data.ResMsg.status == "success") {
  				G_msg_pop(data.ResMsg.message);
  				if(typeof callback=='function')callback();
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
  		error :G_ajax_error_fn
  	});
  };











  /*
   * 声请老师接送卡
   * */
   function ajax_teacher_apply(uuid,groupuuid,callback){
  		if(!confirm("确定要申请接送卡吗?")){
  			return;
  		}
   	$.AMUI.progress.start();
       var url = hostUrl + "rest/studentbind/applyTeacher.json";
   	$.ajax({
   		type : "POST",
   		url : url,
   		data:{uuid:uuid,groupuuid:groupuuid},
   		dataType : "json",
   		 async: true,
   		success : function(data) {
   			$.AMUI.progress.done();
   			// 登陆成功直接进入主页
   			if (data.ResMsg.status == "success") {
   				G_msg_pop(data.ResMsg.message);
   				if(typeof callback=='function')callback();
   			} else {
   				alert("加载数据失败："+data.ResMsg.message);
   			}
   		},
   		error :G_ajax_error_fn
   	});
   };

   /*
    * 声请老师接送卡
    * */
    function ajax_teacher_cancelApply(uuid,userid,callback){
   		if(!confirm("确定要申请接送卡吗?")){
   			return;
   		}
    	$.AMUI.progress.start();
        var url = hostUrl + "rest/studentbind/cancelApply.json";
    	$.ajax({
    		type : "POST",
    		url : url,
    		data:{studentuuid:uuid,userid:userid},
    		dataType : "json",
    		 async: true,
    		success : function(data) {
    			$.AMUI.progress.done();
    			// 登陆成功直接进入主页
    			if (data.ResMsg.status == "success") {
    				G_msg_pop(data.ResMsg.message);
    				if(typeof callback=='function')callback();
    			} else {
    				alert("加载数据失败："+data.ResMsg.message);
    			}
    		},
    		error :G_ajax_error_fn
    	});
    };








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
		        React.render(React.createElement(Message_queryMyTimely_myList,{formdata:data.list}), G_get_div_body());
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
    	menu_teachingplan_dayShow_fn();
    	 //  ajax_teachingplan_dayShow(null,{uuid:reluuid,nmae:""});  //(课程表);
	       break;
	case 6:
		if(num==1){
			   ajax_cookbookPlan_dayShow(null,reluuid);  //(食谱);
		}else{
			ajax_cookbookPlan_listByGroup_byRight(group_uuid);	 //(每日任务食谱发布)
		}

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

		menu_queryLeaderMsgByParents_message_fn_byRight();
//		ajax_boss_message_list_byRight(group_uuid,reluuid); //园长信箱(未验证功能);
//	 	@revice_useruuid:收件人ID------group_uuid;
//	 	@send_useruuid:发送者ID--------reluuid;
	       break;
	case 13:
		menu_class_sign_today_fn();         //签到记录(未验证功能);
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



//———————————————————————————————我的班级—————————————————————————

/*
* <我的班级> show服务器请求
* @show老师查看状态进入查看学生详情;
* @Class_students_show:绘制班级方法；
* @绘制3级界面学生列表页面；
* @3级界面绘制完成后绑定事件点击ajax_class_students_look_info
*   跳转学生详情绘制界面；
* */
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
			if (data.ResMsg.status == "success") {
				formdata=data.data;
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
	//var students=null;
	var
	url=hostUrl + "rest/student/getStudentByClassuuid.json?classuuid="+uuid;
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
		students:students}), G_get_div_body());
	return ;
};

/*
 * <我的班级>添加班级和添加学生按钮处理事件
 * */
function btn_click_class_list(m,groupuuid,classuuid){
	if(m=="addstudent"){
		if(!classuuid){
			G_msg_pop("请先创建班级!");
			return;
		}
		Queue.push(function(){btn_click_class_list(m,groupuuid,classuuid);},"新增学生");
		add_studentsByData({classuuid:classuuid,sex:0});
	}else if(m=="edit_class"){
		if(!classuuid){
			G_msg_pop("请先创建班级!");
			return;
		}
		if(classuuid.indexOf(",")>-1){
			alert("只能选择一个班级进行编辑！");
			return;
		}
		Queue.push(function(){btn_click_class_list(m,groupuuid,classuuid);},"编辑班级");
		react_ajax_class_edit_get({groupuuid:groupuuid},classuuid);
	}else if(m=="delete"){
		if(!classuuid){
			G_msg_pop("请先创建班级!");
			return;
		}
		if(classuuid.indexOf(",")>-1){
			alert("只能选择一个班级进行删除！");
			return;
		}
		ajax_class_delete_byRight(classuuid);
	}else{

		if(!groupuuid){
			var tmp_list=Store.getGroup();
			if(!tmp_list||tmp_list.length==0){
				G_msg_pop("没有所属学校,不能创建班级!");
				return;
			}
			groupuuid=tmp_list[0].uuid;
		}
		Queue.push(function(){btn_click_class_list(m,groupuuid,classuuid);},"新增班级");

		react_ajax_class_edit_get({groupuuid:groupuuid},null);
	}
};

/*
 *删除空班级.(管理员和普通老师共用)
 * */
function ajax_class_delete_byRight(uuid){


	if(!confirm("确定要删除吗?")){
		return;
	}
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/class/delete.json?uuid="+uuid;
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
				Queue.doBackFN();
			} else {
				alert(data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};
/*
* <我的班级>添加学生详情绘制入口
* */
function add_studentsByData(formdata){
	React.render(React.createElement(Mycalss_student_edit,{formdata:formdata}), G_get_div_body());
	return;
};

/*
 * <我的班级>添加学生 提交按钮 服务器请求
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
            url:hostUrl + "rest/student/save.json",
            cbFN:function(data){
            	G_msg_pop(data.ResMsg.message);
            	Store.setClassStudentsList(data.uuid,null);
            	react_ajax_class_students_manage(objectForm.classuuid);
            }
            };
G_ajax_abs_save(opt);
}


/*
 * <我的班级>添加班级按钮详情绘制入口
 * */
function react_ajax_class_edit_get(formdata,uuid){
	if(!uuid){
		var userinfo=Store.getUserinfo();
		formdata.headTeacher=userinfo.uuid;
		formdata.headTeacher_name=userinfo.name;
		React.render(React.createElement(Class_edit,{
			formdata:formdata,
			group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
			}), G_get_div_body());
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
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Class_edit,{
					formdata:data.data,
					group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
					}), G_get_div_body());
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
};
/*
 * <我的班级>添加班级提交保存按钮服务请求
 * 直接把Form表单发给服务器，服务器自己取参数;
 * */
function ajax_class_save(){
    var opt={
            formName: "editClassForm",
            url:hostUrl + "rest/class/save.json",
            cbFN:function(data){
            	G_msg_pop(data.ResMsg.message);
				Store.setMyClassList(null);
				Store.clearChooseClass(null);
				menu_class_students_fn();
            }
            };
G_ajax_abs_save(opt);
}
/*  方法已抽公用 代码屏蔽
// * （主页）我的班级学生详情服务器请求
// * @服务器请求:POST rest/student/{uuid}.json;
// * uuid:用户ID;
// * @根据数据在 Kd_react做绘制处理
// * */
//function ajax_class_students_look_info(uuid,title){
//	Queue.push(function(){ajax_class_students_look_info(uuid,title);},"学生详情");
//	$.AMUI.progress.start();
//    var url = hostUrl + "rest/student/"+uuid+".json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		dataType : "json",
//		 async: true,
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				React.render(React.createElement( Class_student_look_info,{formdata:data.data}), G_get_div_body());
//			} else {
//				alert("加载数据失败："+data.ResMsg.message);
//			}
//		},
//		error : G_ajax_error_fn
//	});
//};

/*
 * 我的班级修改学生详情按钮服务器请求
 * */
 function ajax_myclass_students_edit(uuid){
 	Queue.push(function(){ajax_myclass_students_edit(uuid);},"编辑学生");
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/student/get.json?uuid="+uuid;
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
					parentList:data.parentList,
 					formdata:data.data
 					}), G_get_div_body());
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
 		error :G_ajax_error_fn
 	});
 };

/**
 * 换班级
 * @param groupuuid
 * @param studentuuid
 */
 function btn_ajax_student_changeClass_byRight(groupuuid,studentuuid) {
	  var callbackFN=function(classuuid){
		  ajax_student_changeClass(classuuid,studentuuid);
	  }
		w_ch_class.open(callbackFN,groupuuid);
}
//——————————————————————————(大图标)班级互动——————————————————————————
/*
 * <班级互动>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * @type：Type：1自己相关的互动 Type:2 所有人的互动;
 * */
var hd_type="";
function ajax_classnews_list_div(type){
	  Queue.push (function(){ajax_classnews_list_div(type);},"班级互动") ;
	  hd_type=type;
	   React.render(React.createElement(Classnews_Div_list,{
		type:hd_type
		}), G_get_div_body());
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
			}), G_get_div_body());
	}
};
// function ajax_help_px_list(list_div,pageNo,callback) {
//	 	$.AMUI.progress.start();
//	 	var url = hostUrl + "rest/share/articleList.json";
//	 	$.ajax({
//	 		type : "GET",
//	 		url : url,
//	   		data : {type:91,pageNo:pageNo},
//	 		dataType : "json",
//	 		async: false,
//	 		success : function(data) {
//	 			$.AMUI.progress.done();
//	 			if (data.ResMsg.status == "success") {
//	 				React.render(React.createElement(Px_helplist_div, {
//	 					events: data.list,
//	 					responsive: true, bordered: true, striped :true,hover:true,striped:true
//	 					}), document.getElementById(list_div));
//	 				if(typeof callback=='function'){
//						callback(data.list);
//					}
//	 			} else {
//	 				alert(data.ResMsg.message);
//	 				G_resMsg_filter(data.ResMsg);
//	 			}
//	 		},
//	 		error :G_ajax_error_fn
//	 	});
//	 };
/*
 * <班级互动>添加与编辑提交按钮服务器请求
 * @Form表单发给服务器，服务器自己取需要的参数；
 * */
function ajax_classnews_save(){
	  var imgs="";
	  $(".G_cookplan_Img_img").each(function(){
		  imgs+=$(this).attr("src")+",";
		});
	  imgs=imgs.substring(0,imgs.length-1)
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
function react_ajax_announce_show(uuid){
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
					}),G_get_div_second());
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
	  		Queue.push(function(){btnclick_announce(m,groupuuid,uuid);},"编辑话题");
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
   *(公告)<校园公告><老师公告><精品文章><招生计划>删除按钮服务请求；
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






//——————————————————————————(老版大图标)课程表——————————————————————————

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
	var url = hostUrl + "rest/teachingplan/list.json";
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
					}), G_get_div_body());

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
		React.render(React.createElement(Teachingplan_edit,{formdata:formdata}), G_get_div_body());
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
				React.render(React.createElement(Teachingplan_edit,{
					formdata:data.data
					}), G_get_div_body());
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
            url:hostUrl + "rest/teachingplan/save.json",
            cbFN:null
            };
G_ajax_abs_save(opt);
}


//——————————————————————————(大图标)今日食谱——————————————————————————
/*
 * <今日食谱> 服务器请求
 * @老师查询，条件groupuuid
 * @num:0.表示当前.-1上,1下.2下下
 * @g_cookbookPlan_listToShow_point:记录当前翻页的周数
 * @formdata有食谱的判断;
 * */
var g_cookbookPlan_listToShow_point=0;
function ajax_cookbookPlan_dayShow(num,groupuuid) {
	var now=new Date();
	if(!num){
		num=0;
		g_cookbookPlan_listToShow_point=0;
	}
	var list=Store.getGroupNoGroup_wjd();
	if(!list||list.length==0){
		G_msg_pop("您没有加入学校,没有食谱数据.");
		return;
	}
	if(!groupuuid)groupuuid=list[0].uuid;

	var begDateStr=G_week.getDateStr(now,num);
	var endDateStr=begDateStr;
	Queue.push(function(){ajax_cookbookPlan_dayShow(num,groupuuid);},"今日食谱");
	$.AMUI.progress.start();
	var url = hostUrl + "rest/cookbookplan/list.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {groupuuid:groupuuid,begDateStr:begDateStr,endDateStr:endDateStr},
		cooklist:G_selected_dataModelArray_byArray(list,"uuid" ,"brand_name"),
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.list==null)data.list=[];
				var formdata=data.list[0];
				React.render(React.createElement(CookbookPlan_showByOneDay,{
					groupuuid:groupuuid,
					ch_group:G_selected_dataModelArray_byArray(list,"uuid" ,"brand_name"),
					ch_day:begDateStr,
					formdata:formdata
					}), G_get_div_body());

			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
};




//————————————————————————————精品文章—————————————————————————

/*
 * <精品文章>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * 基本框 等
 * */
function ajax_good_announce_div(){
	React.render(React.createElement(Announcements_good_Div_list),G_get_div_body());
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

////大图标统一定义一个菜单;
//function menu_parentContactByMyStudent_fn() {
//	Queue.push(menu_parentContactByMyStudent_fn,"家长通讯录");
//	ajax_parentContactByMyStudent();
//};
/*
 * （首页）家长通讯录功能；服务器请求
 *@服务器请求：POST rest/student/parentContactByMyStudent.json
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
    var url = hostUrl + "rest/student/parentContactByMyStudent.json";
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
					//type:g_parentContact_listToShow_type,
					formdata:data.list,
  					class_list:G_selected_dataModelArray_byArray(Store.getMyClassList(),"uuid","name")
					}), G_get_div_body());
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
function ajax_parentContact_tels(tel,uuid){
	$.AMUI.progress.start();
    var url = hostUrl + "rest/student/inviteParents.json";
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
			data:{tel:tel,uuid:uuid},
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
//				}), G_get_div_body());
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
	}), G_get_div_body());
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
		   				React.render(React.createElement(My_student_tel,{formdata:data.list}), G_get_div_body());
	   				}else{
	   					G_msg_pop("您的信箱暂无数据!");
		   				React.render(React.createElement(My_student_tel2), G_get_div_body());
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

 					}), G_get_div_body());
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
  					}), G_get_div_body());
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
  	React.render(React.createElement(Group_edit_byRight,{formdata:formdata}), G_get_div_body());
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
     					React.render(React.createElement(Group_edit_byRight,{formdata:data.data}), G_get_div_body());
     				}else{
     					React.render(React.createElement(Group_show_byRight,{formdata:data.data,count:data.count}), G_get_div_second());
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
	var grouplist=Store.getGroupByRight("KD_announce_m");
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
		}), G_get_div_body());
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
				}), G_get_div_body());
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
  				React.render(React.createElement(Announcements_edit_byRight,{
  					formdata:data.data,
  					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_announce_m"),"uuid","brand_name")
  					}),G_get_div_body());
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
  		}), G_get_div_body());
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
  			}), G_get_div_body());
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
//     					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight('KD_teacher_m'),"uuid","brand_name"),
//     					events: data.list.data,
//     					handleClick:btn_click_userinfo,
//     					responsive: true, bordered: true, striped :true,hover:true,striped:true
//
//     				}), G_get_div_body());
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
 	var list=Store.getGroupByRight('KD_teacher_m');
 	React.render(React.createElement(Userinfo_EventsTable_div,{
 		group_list:G_selected_dataModelArray_byArray(list,"uuid","brand_name"),
	    handleClick:btn_click_userinfo,
 		groupuuid:groupuuid
 	}), G_get_div_body());
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
  function btn_click_userinfo(m,obj,usernames,group_uuid){
  	if(m=="add"){
  	Queue.push(function(){btn_click_userinfo(m,obj,usernames,group_uuid);},"新增老师");
  		obj.sex=1;
  		ajax_userinfo_edit(obj,"add");
  	}else if(m=="disable"){
  		ajax_userinfo_updateDisable(obj,1);
  	}else if(m=="enable"){
  		ajax_userinfo_updateDisable(obj,0);
  	}
		else if(m=="getRole"){
  		//Queue.push(function(){btn_click_userinfo(m,obj,usernames);},"老师权限-"+usernames);
  		//ajax_userinfo_getRole(obj,usernames, Store.getRoleList(),sex);
  	}else if(m=="edit"){
  		  Queue.push(function(){btn_click_userinfo(m,obj,usernames,group_uuid);},"老师修改");
  		ajax_userinfo_edit({uuid:obj},"edit");
  	   	};
  	   };
     /*
      * <老师管理>Button事件(添加和修改按钮功能)；
      * @formdata:选中的老师对象；
      * @m：是启用还是禁用功能；"add"-添加  "edit"-修改；
      * @逻辑：如果是"add"添加功能则直接执行Userinfo_edit方法，
      * 不是则继续执行服务器请求修改功能取得数据后执行Userinfo_edit；
      * */
     function ajax_userinfo_edit(formdata,m){
     	if(m=="add"){

				var groupName=Store.getGroupNameByUuid(formdata.group_uuid);

     		React.render(React.createElement(Userinfo_add,{
     			formdata:formdata,
					groupName:groupName
					}), G_get_div_body());
     		return;

     	}
     	$.AMUI.progress.start();
         var url = hostUrl + "rest/userinfo/get.json";
     	$.ajax({
     		type : "GET",
     		url : url,
     		data:{uuid:formdata.uuid},
     		dataType : "json",
     		 async: true,
     		success : function(data) {
     			$.AMUI.progress.done();
     			if (data.ResMsg.status == "success") {
     				React.render(React.createElement(Userinfo_edit,{
     					mygroup_uuids:data.mygroup_uuids,
     					formdata:data.data,
     					select_group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_teacher_m"),"uuid","brand_name")
     					}), G_get_div_body());
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
         			error :G_ajax_error_fn
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
	 *移除幼儿园老师
	 * */
	function ajax_user_deleteUserGroupRelation_byRight(groupuuid,useruuid){


		if(!confirm("确定要删除吗?")){
			return;
		}
	  	$.AMUI.progress.start();
	      var url = hostUrl + "rest/class/deleteUserGroupRelation.json?groupuuid="+groupuuid+"&useruuid="+useruuid;
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
					Queue.doBackFN();
				} else {
					alert(data.ResMsg.message);
				}
			},
			error :G_ajax_error_fn
		});
	};
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
     					select_group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_teacher_m"),"uuid","brand_name"),
     					sex:data.sex
     					}), G_get_div_body());
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
 	var url = hostUrl + "rest/student/exportStudentExcel.json";
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
 	}), G_get_div_body());
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




















//————————————————————————————食谱管理<管理模块>—————————————————————————
  /*
   * (食谱管理)服务器请求
   * @weeknum:0.表示当前周.-1上周,1下周.2下下周
   * */
  //记录当前翻页的周数
  var g_cookbookPlan_week_point=0;
  function ajax_cookbookPlan_listByGroup_byRight(groupuuid,weeknum) {
	    Queue.push(function(){ajax_cookbookPlan_listByGroup_byRight(groupuuid,weeknum);},"食谱管理");
  	var now=new Date();
  	if(weeknum){
  		now=G_week.getDate(now,weeknum*7);
  	}else{
  		g_cookbookPlan_week_point=0;
  	}
  	if(!groupuuid)groupuuid=Store.getGroupByRight("KD_cookbookplan_m").uuid;
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
  				React.render(React.createElement(CookbookPlan_EventsTable_byRight, {
  					group_uuid:groupuuid,
  					events: data.list,
  					begDateStr:begDateStr,
  					endDateStr:endDateStr,
  					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_cookbookplan_m"),"uuid","brand_name"),
  					handleClick:btn_click_cookbookPlan_byRight,
  					responsive: true, bordered: true, striped :true,hover:true,striped:true
  					}), G_get_div_body());

  			} else {
  				alert(data.ResMsg.message);
  				G_resMsg_filter(data.ResMsg);
  			}
  		},
		error :G_ajax_error_fn
  	});
  };


  /*
   *(食谱管理)添加等按钮绑定事件
   *@react_ajax_cookbookPlan_edit：在kd_service
   * */
  function btn_click_cookbookPlan_byRight(m,formdata){
	//var name="【"+Store.getGroupNameByUuid(formdata.groupuuid)+"】-每日食谱-编辑";
  	react_ajax_cookbookPlan_edit_byRight(m,formdata);
  };

  /*
   *(食谱管理)公共方法服务器请求;
   *@CookbookPlan_edit：在kd_service
   * */
  function react_ajax_cookbookPlan_edit_byRight(m,formdata){
  	if(m=="add"){
	  	Queue.push(function(){react_ajax_cookbookPlan_edit_byRight(m,formdata);},"新增食谱");
  		if(!formdata.groupuuid){
  			G_msg_pop("新建食谱，学校id必填");
  			return;
  		}
  		React.render(React.createElement(CookbookPlan_edit_byRight,{
  			group_list:Store.getCurGroupByRight("KD_cookbookplan_m"),
  			formdata:formdata}
  		), G_get_div_body());
  		return;
  	}
  	Queue.push(function(){react_ajax_cookbookPlan_edit_byRight(m,formdata);},"食谱编辑");
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/cookbookplan/"+formdata.uuid+".json";
  	$.ajax({
  		type : "GET",
  		url : url,
  		dataType : "json",
  		 async: true,
  		success : function(data) {
  			$.AMUI.progress.done();
  			if (data.ResMsg.status == "success") {
  				React.render(React.createElement(CookbookPlan_edit_byRight,{
  					group_list:Store.getGroupByRight("KD_cookbookplan_m"),
  					formdata:data.data
  					}), G_get_div_body());
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
		error :G_ajax_error_fn
  	});
  };
  /*
   *(食谱管理)提交按钮服务器请求;
   *@cookbookPlan_getTimeImgUuid:获取添加的食材图片id方法
   * */
  function ajax_cookbookPlan_save_byRight(){
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
				if (data.ResMsg.status == "success") {
					G_msg_pop(data.ResMsg.message);
					Queue.doBackFN();
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			},
			error :G_ajax_error_fn
		});
	}
  /*
   * (食谱管理)获取添加的食材图片id
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





//————————————————————————————园长信箱—————————————————————————

  /*
   * <园长信箱>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
   * 基本框 等
   * */
  function ajax_message_boss_div(){
  	React.render(React.createElement(Message_boss_Div_list),G_get_div_body());

  };

/*(园长信箱)（服务器请求）-取出所有家长和园长沟通讯息List；
 * 调用Boss_student_tel绘制一层界面；
 * */
 function ajax_queryLeaderMsgByParents_message_byRight(list_div,pageNo,callback){
	   	$.AMUI.progress.start();
	       var url = hostUrl + "rest/message/queryLeaderMsgByParents.json?pageNo="+pageNo;
	   	$.ajax({
	   		type : "GET",
	   		dara:null,
	   		url : url,
	   		dataType : "json",
	   		 async: false,
	   		success : function(data) {
	   			$.AMUI.progress.done();
	   			if (data.ResMsg.status == "success") {
	   				if(data.list.data.length!=0){
						React.render(React.createElement(Boss_student_tel_byRight, {
							events: data.list.data,
							responsive: true, bordered: true, striped :true,hover:true,striped:true
							}), document.getElementById(list_div));
	   				}else{
	   					G_msg_pop("暂无园长信箱数据!");
						React.render(React.createElement(Boss_student_tel2_byRight, {
							responsive: true, bordered: true, striped :true,hover:true,striped:true
							}), document.getElementById(list_div));
	   				}
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
//		React.render(React.createElement( My_message_stage,{send_useruuid:send_useruuid,revice_useruuid:revice_useruuid}), G_get_div_body());
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
	 		React.render(React.createElement( Boss_message_stage_byRight,{send_useruuid:send_useruuid,revice_useruuid:revice_useruuid}), G_get_div_second());
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
 function ajax_boss_message_save_byRight(callback,formid){
 	if(!formid)formid="BosseditForm";
 	var opt={
 	 formName:formid,
 	 url:hostUrl + "rest/message/saveLeaderToParent.json",
 	 cbFN:function(data){
 		 if (data.ResMsg.status == "success") {
 			 G_msg_pop(data.ResMsg.message);
 			 if(callback)callback();

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
  * <班级管理>服务器请求 Store.getGroupByRight("KD_class_m")
  * @请求数据成功后执行Class_EventsTable方法绘制
  * */
 function ajax_class_listByGroup_byRight(groupuuid) {
 	Queue.push(function(){ajax_class_listByGroup_byRight(groupuuid);},"班级管理");

 	var  grouplist=Store.getGroupByRight("KD_class_m");
 	if(!grouplist||grouplist.length==0){
 		alert("没有班级管理权限不能访问.");
 		return;
 	}
 	if(!groupuuid){
 		groupuuid=grouplist[0].uuid;

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
 			if (data.ResMsg.status == "success"){
 				React.render(React.createElement(Class_EventsTable_byRight, {
 					group_uuid:groupuuid,
 					group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name"),
 					events: data.list,
 					handleClick:btn_click_class_list_byRight,
 					responsive: true, bordered: true, striped :true,hover:true,striped:true
 					}), G_get_div_body());
 			}else{
 				alert(data.ResMsg.message);
 				G_resMsg_filter(data.ResMsg);
 			}
 		},
		error :G_ajax_error_fn
 	});
 };
 /*
  * <班级管理>按钮处理事件
  * @add_class:添加班级；
  * @edit_class:编辑；
  * @graduate_class:毕业；
  * uuids:点击框后班级的ID；
  * */
 function btn_click_class_list_byRight(m,groupuuid,uuids){
 	if(m=="add_class"){
 		Queue.push(function(){btn_click_class_list_byRight(m,groupuuid,uuids);},"新增班级");
 		react_ajax_class_edit_get_byRight({groupuuid:groupuuid},null);
 	}else if(m=="edit_class"){
 		if(!uuids&&uuids.indexOf(",")>-1){
 			G_msg_pop("只能选择一个班级进行编辑！");
 			return;
 		}
 		Queue.push(function(){btn_click_class_list_byRight(m,groupuuid,uuids);},"编辑班级");
 		react_ajax_class_edit_get_byRight({groupuuid:groupuuid},uuids);
 	}else if(m=="delete"){
		if(!uuids&&uuids.indexOf(",")>-1){
			alert("只能选择一个班级进行编辑！");
			return;
		}
		ajax_class_delete_byRight(uuids);
	}else if(m=="graduate_class"){
 		//ajax_class_edit({groupuuid:groupuuid},"edit");
 	}

 };
 /*
  * <班级管理>毕业按钮处理方法
  * */
 function ajax_class_edit_byRight(formdata,operate){
 	//React.render(React.createElement(Class_edit,{operate:operate,formdata:formdata,group_list:Store.getGroup()}), G_get_div_body());

 };
 /*
  * <班级管理>按钮服务请求
  * @uuid:根据uuid判断是添加还是编辑，
  * 添加直接就调用Class_edit，不发服务器请求
  * */
 function react_ajax_class_edit_get_byRight(formdata,uuid){
 	if(!uuid){
 		var userinfo=Store.getUserinfo();
 		formdata.headTeacher=userinfo.uuid;
 		formdata.headTeacher_name=userinfo.name;
 		React.render(React.createElement(Class_edit_byRight,{
 			formdata:formdata,
 			group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_class_m"),"uuid","brand_name")
 			}), G_get_div_body());
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
 			if (data.ResMsg.status == "success") {
 				React.render(React.createElement(Class_edit_byRight,{
 					formdata:data.data,
 					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_class_m"),"uuid","brand_name")
 					}), G_get_div_body());
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
		error :G_ajax_error_fn
 	});
 };
 /*
  * <班级管理>提交按钮服务请求
  * 直接把Form表单发给服务器，服务器自己取参数;
  * */
 function ajax_class_save_byRight(){
     var opt={
             formName: "editClassForm",
             url:hostUrl + "rest/class/save.json",
             cbFN:function(data){
             	G_msg_pop(data.ResMsg.message);
 				Store.setMyClassList(null);
 				Store.clearChooseClass(null);
 				Queue.doBackFN();

             }
             };
 G_ajax_abs_save(opt);
 }
 /*
 * 花名册下载
 * @param formdata
 * @param operate
 */
 function ajax_flowername_download_byRight (groupuuid,classuuid,xlsname){
 	var inputs;
 	var url = hostUrl + "rest/student/exportStudentExcel.json";
 	   inputs+='<input type="hidden" name="groupuuid" value="'+groupuuid+'" />';
 	  inputs+='<input type="hidden" name="classuuid" value="'+classuuid+'" />';
 	 inputs+='<input type="hidden" name="xlsname" value="'+xlsname+'" />';
        // request发送请求
 	$('<form action="'+ url +'" method="post">'+inputs+'</form>')
      .appendTo('body').submit().remove();
 };

/*
 * （主页）班级管理服务器请求;
 * @Class_students_show:绘制班级方法；
 * @绘制3级界面学生列表页面；
 * @3级界面绘制完成后绑定事件点击ajax_class_students_look_info
 *   跳转学生详情绘制界面；
 * */
 function react_ajax_class_students_manage_byRight(uuid){

 	Queue.push(function(){react_ajax_class_students_manage_byRight(uuid);},"班级详情");

 	var classObj=Store.getClassByUuid(uuid);
 	var groupuuid=window.G_mygroup_choose;
 	if(classObj)groupuuid=classObj.groupuuid;
 	React.render(React.createElement(Class_students_manage_byRight,{
 		groupuuid:groupuuid,
		classuuid:uuid}), G_get_div_body());
 };






 /*
  * （标头）<班级管理>界面添加学生按钮事件处理
  * @服务器请求:POST rest/student/{uuid}.json;
  * @ajax_teachingplan_dayShow 直接调用课程表的方法；
  * */
 function class_students_manage_onClick_byRight(m,classuuid,name){
 if(m=="add"){
 	ajax_class_students_edit_byRight({classuuid:classuuid,sex:0},null);
 }else{
 	ajax_teachingplan_dayShow(null,{uuid:classuuid,name:name});
 }
 };

 /*
 * （标头）<班级管理>模板中添加学生按钮服务器请求
 * */
 function ajax_class_students_edit_byRight(formdata,uuid){
 	if(!uuid){
 		Queue.push(function(){ajax_class_students_edit_byRight(formdata,uuid);},"新增学生");
 		React.render(React.createElement(Class_student_edit_byRight,{formdata:formdata}), G_get_div_body());
 		return;
 	}
 	Queue.push(function(){ajax_class_students_edit_byRight(formdata,uuid);},"编辑学生");
 	$.AMUI.progress.start();
     var url = hostUrl + "rest/student/get.json?uuid="+uuid;
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
					parentList:data.parentList,
 					formdata:data.data
 					}), G_get_div_body());
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
		error :G_ajax_error_fn
 	});
 };


 /*
  *(公告)<校园公告><老师公告><精品文章><招生计划>删除按钮服务请求；
  *@ajax_announce_listByGroup：删除成功后调用发布消息方法刷新;
  * */
 function ajax_student_delete(uuid){
 	if(!confirm("确定要删除该学生吗?")){
 		return;
 	}
   	$.AMUI.progress.start();
       var url = hostUrl + "rest/student/delete.json?uuid="+uuid;
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
  * （标头）<班级管理>添加与编辑学生 提交按钮 服务器请求
  * */
 function btn_ajax_class_student_save_byRight(){
 	var objectForm = $('#editClassStudentForm').serializeJson();
     var opt={
             formName: "editClassStudentForm",
             url:hostUrl + "rest/student/save.json",
             cbFN:function(data){
             	G_msg_pop(data.ResMsg.message);
             	Store.setClassStudentsList(data.uuid,null);
             	Queue.doBackFN();
 				//react_ajax_class_students_manage_byRight(objectForm.classuuid);
             }
             };
 G_ajax_abs_save(opt);
 }
 /*
  * 我的班级学生列表编辑改变班级服务器请求；
  * */
  function  ajax_student_changeClass(classuuid,studentuuid){
      var url = hostUrl + "rest/student/changeClass.json";
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
   * 班级管理结业服务器请求
   * */
    function ajax_class_disable_byRight(groupuuid,uuid) {
  		if(!confirm("确定该班级要结业嘛?")){
  			return;
  		}
  	 	$.AMUI.progress.start();
  	 	var url = hostUrl + "rest/class/disable.json";
  	 	$.ajax({
  	 		type : "POST",
  	 		url : url,
  	 		data : {uuid:uuid},
  	 		dataType : "json",
  	 		success : function(data) {
  	 			$.AMUI.progress.done();
  	 			if (data.ResMsg.status == "success"){
  	 				ajax_class_listByGroup_byRight(groupuuid);
  	 			}else{
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
 			group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_accounts_m"),"uuid","brand_name"),
 			formdata:formdata
 			}),
 			G_get_div_body());
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



 /*  方法已抽公用 代码屏蔽
//  *  <学生列表>界面下的二级界面学生详细信息
//  * @服务器请求:POST rest/student/{uuid}.json;
//  * uuid:用户ID;
//  * @根据数据在 Kd_react做绘制处理
//  * */
// function ajax_class_students_look_info_byRight(uuid,title){
// 	$.AMUI.progress.start();
//     var url = hostUrl + "rest/student/"+uuid+".json";
// 	$.ajax({
// 		type : "GET",
// 		url : url,
// 		dataType : "json",
// 		 async: true,
// 		success : function(data) {
// 			$.AMUI.progress.done();
// 			if (data.ResMsg.status == "success") {
// 				React.render(React.createElement( Class_student_look_info_byRight,{
// 					formdata:data.data
// 					}),G_get_div_second());
// 			} else {
// 				alert("加载数据失败："+data.ResMsg.message);
// 			}
// 		},
//		error :G_ajax_error_fn
// 	});
// };


//——————————————————————————评价老师——————————————————————————
 /*
  * <评价老师>（获取用户列表服务器请求）；
  * 各属性置空开始，方便后面的的机构、班级、名字搜索；
  * */
 var g_teachingjudge_point=0;
 function ajax_teachingjudge_query_byRight(begDateStr,endDateStr,groupuuid,teacher_name,type,pageNo) {
 	Queue.push(function(){ ajax_teachingjudge_query_byRight(begDateStr,endDateStr,groupuuid,teacher_name,type,pageNo);},"评价老师");
	var grouplist=Store.getGroupByRight("KD_teachingjudge_q");
	if(!grouplist||grouplist.length==0){
		alert("没有权限!");
		return "";
	}
	if(!groupuuid){
		groupuuid=grouplist[0].uuid;
	}
	if(!pageNo)pageNo=1;
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
 			data:{begDateStr:begDateStr,endDateStr:endDateStr,groupuuid:groupuuid,type:type,teacher_name:teacher_name,type:type,pageNo:pageNo},
 			dataType : "json",
 			success : function(data) {
 				$.AMUI.progress.done();
 				if (data.ResMsg.status == "success") {
 	  				React.render(React.createElement(Query_teachingjudge_list_byRight, {
 	  					begDateStr:begDateStr,
 	  					endDateStr:endDateStr,
 	  					group_uuid:groupuuid,
 	  					List:data.list,
 	  					group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name"),
 	  					teachingjudge_typelist:G_selected_dataModelArray_byArray(Vo.getTypeList("KD_Teachingjudge_type"),"key","val"),
 	  					events: data.list.data,
 	  					responsive: true, bordered: true, striped :true,hover:true,striped:true
 	  				}), G_get_div_body());
 				}
 			}
 		});
 	};





//幼儿园用户授权
function menu_kd_roleUser_list_fn() {
	var grouplist=Store.getGroupByRight("KD_announce_m");
	if(!grouplist||grouplist.length==0){
		alert("没有权限!");
		return "";
	}
	var groupuuid=grouplist[0].uuid;
	Queue.push(menu_kd_roleUser_list_fn,"授权");
	var opt={
			groupuuid:groupuuid,
			group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name"),
			role_list:Store.getRoleList(1)
		};
	React.render(React.createElement(G_Role_User_EventsTable,opt), G_get_div_body());
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
					}), G_get_div_body());

			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
};

//—————————————————————————签到查询（详情接口）—————————————————————————
/*签到查询（详情接口）-详情List；
*
 * */
// function ajax_ClassCard_info_byRight(uuid){
//	   Queue.push(function(){ajax_ClassCard_info_byRight(groupuuid,classuuid,uuid);},"签到详情");
//	   	$.AMUI.progress.start();
//	       var url = hostUrl + "rest/studentSignRecord/queryStudentuuid.json";
//	   	$.ajax({
//	   		type : "GET",
//	   		url : url,
//	   		data:{studentuuid:uuid},
//	   		dataType : "json",
//	   		 async: true,
//	   		success : function(data) {
//	   			$.AMUI.progress.done();
//	   			if (data.ResMsg.status == "success") {
//	   				if(data.list.length!=0){
//		   				//React.render(React.createElement( Boss_student_tel_byRight,{formdata:data.list}), G_get_div_body());
//	   				}else{
//	   					G_msg_pop("暂无刷卡数据!");
//		   				React.render(React.createElement( Boss_student_tel2_byRight), G_get_div_body());
//	   				}
//
//	   			} else {
//	   				alert("加载数据失败："+data.ResMsg.message);
//	   			}
//	   		},
//			error :G_ajax_error_fn
//	   	});
//	   };


   /*
* <签到>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
* 基本框 等
* */
   function ajax_ClassCard_info_byRight(uuid){
   	React.render(React.createElement(Announcements_Div_ClassCard_info_byRight,{
   		studentuuid:uuid
   	}), G_get_div_second());

   };
   /*
* <签到>取出数组服务器请求后
* 开始绘制动态数据内容
* */
   function ajax_announce_ClassCard_info(list_div,studentuuid,pageNo,callback) {
   	$.AMUI.progress.start();
   	if(!pageNo)pageNo=1;
    var url = hostUrl + "rest/studentSignRecord/queryStudentuuid.json";
$.ajax({
	type : "GET",
	url : url,
	data:{studentuuid:studentuuid,pageNo:pageNo},
	dataType : "json",
	async: false,
	success : function(data) {
		$.AMUI.progress.done();
		if (data.ResMsg.status == "success") {
   				React.render(React.createElement(Announcements_ClassCard_info_div, {
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

////——————————————————————————学生列表——————————————————————————
// /*
//  * <学生列表>（获取用户列表服务器请求）；
//  * 各属性置空开始，方便后面的的机构、班级、名字搜索；
//  * */
// var g_mystudent_query_point=1;
// function ajax_mystudents_query(classuuid,name,pageNo) {
// 	Queue.push(function(){ajax_mystudents_query(classuuid,name,pageNo);},"学生列表");
//
// 	  if(!classuuid){
//		  var myclasslist=Store.getMyClassList();
//		if(!myclasslist||myclasslist.length==0){
//			G_msg_pop("请先创建班级!");
//				return ;
//		}
//		 classuuid=myclasslist[0].uuid;
//	  }
//
// 	 if(!name)name="";
// 	  if(!pageNo)pageNo=1;
// 	 g_mystudent_query_point=pageNo;
// 		$.AMUI.progress.start();
// 		var url = hostUrl + "rest/student/querybyTeacher.json?classuuid="+classuuid+"&name="+name+"&pageNo="+pageNo;
// 		$.ajax({
// 			type : "GET",
// 			url : url,
// 			dataType : "json",
// 			success : function(data) {
// 				$.AMUI.progress.done();
// 				if (data.ResMsg.status == "success") {
// 	  				React.render(React.createElement(Query_mystutent_list, {
// 	  				class_uuid:classuuid,
// 	  					name:name,
// 	  					group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_student_allquery"),"uuid","brand_name"),
// 	  					data:data,
// 	  					events: data.list.data,
// 	  					responsive: true, bordered: true, striped :true,hover:true,striped:true
//
// 	  				}), G_get_div_body());
//
// 				} else {
// 					alert(data.ResMsg.message);
// 				}
// 			},
// 			error :G_ajax_error_fn
// 		});
// 	};

 	//————————————————————————————帮助列表—————————————————————————

 	 /*
 	  * <帮助列表>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 	  * 基本框 等
 	  * */
 	 function ajax_px_help_div(){
 	 	React.render(React.createElement(Announcements_px_Div_list), G_get_div_body());
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
 	   		data : {type:91,pageNo:pageNo},
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
