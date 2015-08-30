/**
 * 公用模板
 *1我的头像,2:菜谱
* w_uploadImg.open(callbackFN,type);
* w_uploadImg.base64='data:image/png;base64,iVBORw0KG...'

 * 保存通用方法
 * 
 * 表单格式
var opt={
	 formName:"editClassnewsForm",
	 formObject:null,
	 url:hostUrl + "rest/classnewsreply/save.json",
	 cbFN:null,
	 }
	 G_ajax_abs_save(opt);
	 对象格式
	 var opt={
	 jsonString:'{"key":"val"}',
	 url:hostUrl + "rest/classnewsreply/save.json",
	 cbFN:null,
	 }
	 G_ajax_abs_save(opt);
	 
	 opt.jsonString等于空的时候执行一次opt.jsonString=JSON.stringify(formObject);我们自己去取一次formName表单;
 */
function G_ajax_abs_save(opt){
$.AMUI.progress.start();
	  if(!opt.jsonString){
		  formObject = $('#'+opt.formName).serializeJson();
		  opt.jsonString=JSON.stringify(formObject);
	  }		 
	  var async=true;
	  if(opt.async===false){
		  async=opt.async;
	  }
	$.ajax({
		type : "POST",
		url : opt.url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		data:opt.jsonString,
		dataType : "json",
		contentType : false, 
		async:async,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				if(opt.cbFN){
					opt.cbFN(data);
				}else{
					G_msg_pop(data.ResMsg.message);
					Queue.doBackFN();
				}
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			 alert(opt.url+",error:"+textStatus);
			 console.log(opt.url+',error：', obj);
			 console.log(opt.url+',error：', textStatus);
			 console.log(opt.url+',error：', errorThrown);
		}
	});
}




//收藏按钮单独处理方法不返回;
function G_ajax_shouc_save(opt){
	$.AMUI.progress.start();
		  if(!opt.jsonString){
			  formObject = $('#'+opt.formName).serializeJson();
			  opt.jsonString=JSON.stringify(formObject);
		  }		 
		  var async=true;
		  if(opt.async===false){
			  async=opt.async;
		  }
		$.ajax({
			type : "POST",
			url : opt.url,
			processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
			data:opt.jsonString,
			dataType : "json",
			contentType : false, 
			async:async,
			success : function(data) {
				$.AMUI.progress.done();
				// 登陆成功直接进入主页
				if (data.ResMsg.status == "success") {
					if(opt.cbFN){
						opt.cbFN(data);
					}else{
						G_msg_pop(data.ResMsg.message);
						//Queue.doBackFN();
					}
					
				} else {
					alert(data.ResMsg.message);
				}
			},
			error : function( obj, textStatus, errorThrown ){
				$.AMUI.progress.done();
				 alert(opt.url+",error:"+textStatus);
				 console.log(opt.url+',error：', obj);
				 console.log(opt.url+',error：', textStatus);
				 console.log(opt.url+',error：', errorThrown);
			}
		});
	}

/*
 * 将幼儿园列表转换成select要求的数据模型
 * @arrlist  数组
 * @id {Array} 需要转换数组中哪一个属性名
 * @name       需要转换数组中哪一个属性名
 */
function G_selected_dataModelArray_byArray(arrlist,id,name){
	var arr=[];
	if(!arrlist)return arr;
	for(var i=0;i<arrlist.length;i++){
		var tmp=arrlist[i];
		arr.push( {value: tmp[id]+"", label:tmp[name]});
	}
	return arr;
}


/**
 * 上传不用裁剪的图片,只是压缩上传
 */
w_img_upload_nocut={
		div_id:"div_widget_chooseUser",
		div_body:"div_body",
		cropper:null,
		callbackFN:null,
		type:4,
		base64:null,
		bind_onchange:function(fileId,callbackFN){
			w_img_upload_nocut.callbackFN=callbackFN;
			if(G_CallPhoneFN.isPhoneApp()){
				$(fileId).bind("click", function(){
					//优先调用手机
	            	G_CallPhoneFN.selectImgPic();
				});
				return;
			}
			$(fileId).bind("change", function(){
				 lrz(this.files[0], {
			            before: function() {
			                console.log('压缩开始');
			            },
			            fail: function(err) {
			                console.error(err);
			            },
			            always: function() {
			                console.log('压缩结束');
			            },
			            done: function (results) {
			            // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
			            console.log(results);
			            /*
			            var data = {
			                    base64: results.base64,
			                    size: results.base64.length // 校验用，防止未完整接收
			                };*/
				            if(results&&results.base64){
				            	
				            	w_img_upload_nocut.ajax_uploadByphone(results.base64);
				            }
			            }
			            });//end done fn
			
				
				
			  });//end change
		},
		ajax_uploadByphone:function(base64){
			$.AMUI.progress.start();
		    var url = hostUrl + "rest/uploadFile/uploadBase64.json";
			$.ajax({
				type : "POST",
				url : url,
				timeout : 0, 
				dataType : "json",
				data:{type:w_img_upload_nocut.type,base64:base64},
				 async: true,
				success : function(data) {
					$.AMUI.progress.done();
					// 登陆成功直接进入主页
					if (data.ResMsg.status == "success") {
						if(w_img_upload_nocut.callbackFN){
							//data.data.uuid,data.imgUrl
							//w_img_upload_nocut.callbackFN(data);
							w_img_upload_nocut.callbackFN(data.imgUrl,data.data.uuid);
						}
					} else {
						alert(data.ResMsg.message);
					}
				},
				error : function( obj, textStatus, errorThrown ){
					$.AMUI.progress.done();
					alert(url+",error:"+textStatus);
				}
			});
			
		}
};
//uploadImg
/**1我的头像,2:菜谱
* w_uploadImg.open(callbackFN,type);
* w_uploadImg.base64='data:image/png;base64,iVBORw0KG...'
* 
* w_uploadImg.ajax_uploadByphone(base64);
*/
var w_uploadImg={
		div_id:"div_widget_chooseUser",
		div_body:"div_body",
		cropper:null,
		callbackFN:null,
		type:1,
		base64:null,
		ajax_uploadByphone:function(base64){
			$.AMUI.progress.start();
		    var url = hostUrl + "rest/uploadFile/uploadBase64.json";
			$.ajax({
				type : "POST",
				url : url,
				timeout : 0, 
				dataType : "json",
				data:{type:w_uploadImg.type,base64:base64},
				 async: true,
				success : function(data) {
					$.AMUI.progress.done();
					// 登陆成功直接进入主页
					if (data.ResMsg.status == "success") {
						if(w_uploadImg.callbackFN){
							w_uploadImg.callbackFN(data.imgUrl,data.data.uuid);
						}
						w_uploadImg.hide();
						
					} else {
						alert(data.ResMsg.message);
					}
				},
				error : function( obj, textStatus, errorThrown ){
					$.AMUI.progress.done();
					alert(url+",error:"+textStatus);
				}
			});
			
		},
		ajax_upload:function(){
			$.AMUI.progress.start();
		    var url = hostUrl + "rest/uploadFile/uploadBase64.json";
			$.ajax({
				type : "POST",
				url : url,
				timeout : 0, 
				dataType : "json",
				data:{type:w_uploadImg.type,base64:w_uploadImg.base64},
				 async: true,
				success : function(data) {
					$.AMUI.progress.done();
					// 登陆成功直接进入主页
					if (data.ResMsg.status == "success") {
						if(w_uploadImg.callbackFN){
							w_uploadImg.callbackFN(data.imgUrl,data.data.uuid);
						}
						w_uploadImg.hide();
						
					} else {
						alert(data.ResMsg.message);
					}
				},
				error : function( obj, textStatus, errorThrown ){
					$.AMUI.progress.done();
					alert(url+",error:"+textStatus);
				}
			});
			
		},
		handleClick: function(m) {
			if("cancel"==m){
				w_uploadImg.hide();
				return;
				
			} if("ok"==m){
				if(w_uploadImg.base64==null){
					alert("请先剪切图片，在提交。");
					return;
				}
				w_uploadImg.ajax_upload();
				
			}
			 
     	  },
		open:function(callbackFN,type){
			if(!type)type=1;
			w_uploadImg.type=type;
			w_uploadImg.base64=null;
			w_uploadImg.callbackFN=callbackFN;
			if(G_CallPhoneFN.selectHeadPic())return;
			w_uploadImg.show();
		},
		show:function(){
			
			React.render(React.createElement(Upload_headImg, {
				responsive: true, bordered: true, striped :true,hover:true,striped:true
				}), document.getElementById(w_ch_user.div_id));
			$("#"+this.div_body).hide();
			$("#"+this.div_id).show();
			
		},
		
		hide:function(callbackFN){
			$("#"+this.div_body).show();
			$("#"+this.div_id).html("");
		}	
};
//修改密码
function menu_userinfo_updatepassword_fn(){
	Queue.push(menu_userinfo_updatepassword_fn,"修改密码");	
	React.render(React.createElement(Div_userinfo_updatepassword,null)
			, document.getElementById('div_body'));
}

//用户登陆(修改密码也调用)
function ajax_userinfo_updatepassword() {
	$.AMUI.progress.start();
	  var objectForm = $('#commonform').serializeJson();
	  if(objectForm.password!=objectForm.password1){
		  alert("2次输入密码不匹配");
		  return;
	  }
	  delete objectForm.password1;
	  objectForm.oldpassword=$.md5(objectForm.oldpassword); 
	  objectForm.password=$.md5(objectForm.password); 
  var jsonString=JSON.stringify(objectForm);
  var url = hostUrl + "rest/userinfo/updatepassword.json";
			
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
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert("error:"+textStatus);
		}
	});
}
function ajax_userinfo_getRole(useruuid,usernames,groupuuid,roleList){
	Queue.push(function(){ajax_userinfo_getRole(useruuid,usernames,groupuuid,roleList);},"授权-"+usernames);
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getRole.json?userUuid="+useruuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		data:{groupuuid:groupuuid,userUuid:useruuid},
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				
				React.render(React.createElement(Userinfo_getRole, {
					formdata:{useruuid:useruuid,username:usernames},
					events: roleList,
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

//（我）<修改资料>
function menu_userinfo_update_fn(){
	Queue.push(menu_userinfo_update_fn,"修改资料");	
	React.render(React.createElement(Div_userinfo_update,{formdata:Store.getUserinfo()})
			, document.getElementById('div_body'));
}
//（我）<修改资料>保存按钮事件处理
function ajax_userinfo_update() {
	var opt={
			 formName:"commonform",
			 url:hostUrl + "rest/userinfo/update.json",
			 cbFN:function(data){
				 G_msg_pop(data.ResMsg.message);
				 store_ajax_getUserinfo();
				 menu_body_fn();
			 },
			 };
	G_ajax_abs_save(opt);
	
}


function menu_userinfo_updatePasswordBySms_fn(){
	Queue.push(menu_userinfo_updatePasswordBySms_fn);
	
	React.render(React.createElement(Div_userinfo_updatePasswordBySms,null)
			, document.getElementById('div_login'));
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
			error : function( obj, textStatus, errorThrown ){
				$.AMUI.progress.done();
				alert(url+",error:"+textStatus);
			}
		});
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
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert("error:"+textStatus);
		}
	});
}

//获取班级信息公用模板方法 return 出去做
//dianzan/getByNewsuuid
function commons_ajax_dianzan_getByNewsuuid(newsuuid){
	var reObj=[];
	$.AMUI.progress.start();
    var url = hostUrl + "rest/dianzan/getByNewsuuid.json?newsuuid="+newsuuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: false,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				reObj=data;
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
	
	return reObj;
};
/*
 * 点赞功能模板服务器请求
 * @canDianzan：根据Data数据中的是否可以点赞判断进行请求 ;
 * True表示可以点赞,false表示点赞过了.可以取消点赞;
 * @newsuuid:哪篇文章的ID;
 * @type:哪个模板的点赞功能;
 * @that.forceUpdate():点赞或取消点赞在数据返回后强制刷新当前页面的方法;
 */
function common_ajax_dianzan_save(newsuuid,type,canDianzan,dianzansave_callback){
	var that=this;
	var objectForm={newsuuid:newsuuid,type:type};
	var jsonString=JSON.stringify(objectForm);
	$.AMUI.progress.start();
	var url =hostUrl +(canDianzan?"rest/dianzan/save.json":"rest/dianzan/delete.json");
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
					if(typeof dianzansave_callback=='function')dianzansave_callback(canDianzan);

					//$('#dianzan').html($('#dianzan').html()+', <a href="javascript:void(0);">'+Store.getUserinfo().name+'</a>');
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



function commons_ajax_reply_list(newsuuid,list_div,pageNo,tempateClazz){
	if(!tempateClazz)tempateClazz=Common_Classnewsreply_listshow;
	var re_data=null;
	 if(!pageNo)pageNo=1;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/reply/getReplyByNewsuuid.json?newsuuid="+newsuuid+"&pageNo="+pageNo;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(tempateClazz, {
					events: data.list,
					newsuuid:newsuuid,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById(list_div));
				re_data=data.list;
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
	return re_data;
};
//我要评论保存操作
function common_ajax_reply_save(callback,formid){
	if(!formid)formid="editClassnewsreplyForm";
	var opt={
	 formName:formid,
	 url:hostUrl + "rest/reply/save.json",
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

/*
 *收藏按钮公用服务器请求
 *@title：(String)标头
 *@type:(int类型)模块类型.0:公告,3:精品文章.4:招生计划. 99:班级互动.10:html类型,直接去url地址,调用浏览器显示.
 *@reluuid：(String)与type配合确定某个模块的详细的uuid.用于跳转到该模块的详细显示.
 *@url：(String)Type=10的时候,填写该URL;
 *@直接调用opt公共组件 对象处理服务器请求
 *formObject:这里直接转换成字符串格式,不然JSON转换会报错;
 * */
function commons_ajax_favorites_push(title,type,reluuid,url){
	var formObject={
			title:title+"",type:type+"",reluuid:reluuid+"",url:url+""	
	};	
	 var jsonString=JSON.stringify(formObject);
	 var opt={
			// formObject:formObject,
			 jsonString:jsonString,
			 url:hostUrl + "rest/favorites/save.json",
			 cbFN:null,
			 };
			 G_ajax_shouc_save(opt);
	
};








/*
 * 每日任务
 * 模块类型名字（公用方法模板）
 */
function common_teacherDailyTask_type(type){
	var teacherDailyTask_name;
	 switch (type)   
	   {
  case 0:     
	      teacherDailyTask_name="公告信息"; 
	       break; 
  case 1:    
	      teacherDailyTask_name="老师公告";  
           break;   
  case 3:   
	      teacherDailyTask_name="精品文章"; 
           break;
	case 4:  
	      teacherDailyTask_name="招生计划"; 
	       break;
  case 7:
	  	  teacherDailyTask_name="课程表"; 
	       break;
	case 6:  
	      teacherDailyTask_name="食谱"; 
	       break;
	case 5:
		  teacherDailyTask_name="精品课程"; 
           break;
	case 99:
		  teacherDailyTask_name="班级互动"; 
	       break;
	case 11:
		  teacherDailyTask_name="家长通讯录"; 
	       break;
	case 12: 
		  teacherDailyTask_name="园长信箱"; 
	       break;
	case 13:  
		  teacherDailyTask_name="签到记录"; 
	       break;
	case 10:
		  teacherDailyTask_name="Case 10"; 
	       break;
	   default:       
		   teacherDailyTask_name="此信息为非法信息，请联系管理员！";
	       Styte.out.println("此信息为非法信息，请联系管理员！");
	       break;
	   }
	 return teacherDailyTask_name; 	
}

/*
 * 每日任务
 * 任务完成状态和状态颜色（公用方法模板）
 */
function common_teacherDailyTask_status(status){
	var teacherDailyTask_status;
        if(status==0){
        	teacherDailyTask_status={status:"已完成",className:"am-success"};
        }else if(status==1){
        	teacherDailyTask_status={status:"待完成",className:"am-warning"};
        }else if(status==2){
        	teacherDailyTask_status={status:"已过期",className:"am-danger"};
        }else{
        	teacherDailyTask_status={status:"有问题的状态",className:""};
        } 
	
	 return teacherDailyTask_status; 	
}

/*/check/disable.json?type=99&uuid=1
 * 禁止发布公共组件方法
 * */
function common_check_disable(type,uuid){
	var url = hostUrl + "rest/check/disable.json";
	$.ajax({
		type : "POST",
		url : url,
		data:{type:type,uuid:uuid},
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				 G_msg_pop("屏蔽成功");
			} else {
				alert(data.ResMsg.message);
			}
		}
	});
}
/*/check/disable.json?type=99&uuid=1
 * 举报公共组件方法
 * */
function common_check_illegal(type,uuid){
	var url = hostUrl + "rest/check/illegal.json";
	$.ajax({
		type : "POST",
		url : url,
		data:{type:type,uuid:uuid},
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				 G_msg_pop("举报成功");
			} else {
				alert(data.ResMsg.message);
			}
		}
	});
}

/*
 * 举报公用服务器请求         /check/illegal.json?type=99&uuid=1

 * */
function common_illegal(type,uuid){
	var url = hostUrl + "rest/check/illegal.json?";
	$.ajax({
		type : "GET",
		url : url,
		data:{type:type,uuid:uuid},
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				 G_msg_pop("举报成功");
			} else {
				alert(data.ResMsg.message);
			}
		}
	});
}