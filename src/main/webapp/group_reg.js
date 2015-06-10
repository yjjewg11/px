
//用户登陆
function reg() {
	$.AMUI.progress.start();
	
	// var data = $("#form1").serializeArray(); //自动将form表单封装成json
    //alert(JSON.stringify(data));
	  var objectForm = $('#regform').serializeJson();
	  
	  //alert(JSON.stringify(objectForm));
	  //return;
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
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		data : jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				alert(data.ResMsg.message);
				window.location = hostUrl + "/login.html"
				
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
