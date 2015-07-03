/**
 * 保存通用方法
var opt={
	 formName:"editClassnewsForm",
	 url:hostUrl + "rest/classnewsreply/save.json",
	 cbFN:null,
	 }
	 G_ajax_abs_save(opt);
 */
function G_ajax_abs_save(opt){
$.AMUI.progress.start();
	
	  var objectForm = $('#'+opt.formName).serializeJson();
	  var jsonString=JSON.stringify(objectForm);
	$.ajax({
		type : "POST",
		url : opt.url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
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
					G_msg_pop(data.ResMsg.message);
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


function menu_userinfo_updatepassword_fn(){
	Queue.push(menu_userinfo_updatepassword_fn);
	
	React.render(React.createElement(Div_userinfo_updatepassword,null)
			, document.getElementById('div_body'));
}

//用户登陆
function ajax_userinfo_updatepassword() {
	$.AMUI.progress.start();
	
	// var data = $("#form1").serializeArray(); //自动将form表单封装成json
//alert(JSON.stringify(data));
	  var objectForm = $('#commonform').serializeJson();
	  if(objectForm.password!=objectForm.password1){
		  alert("2次输入密码不匹配");
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



function menu_userinfo_update_fn(){
	Queue.push(menu_userinfo_update_fn);
	
	React.render(React.createElement(Div_userinfo_update,{formdata:Store.getUserinfo()})
			, document.getElementById('div_body'));
}

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