
//用户登陆
function reg() {
	$.AMUI.progress.start();
	
	// var data = $("#form1").serializeArray(); //自动将form表单封装成json
    //alert(JSON.stringify(data));
	  var objectForm = $('#regform').serializeJson();
	  
	  //alert(JSON.stringify(objectForm));
	  //return;
	  if(objectForm.password!=objectForm.password){
		  alert("2次输入密码不匹配");
	  }
	  objectForm.password=$.md5(objectForm.password); 
      var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/group/reg.json";
  			
	$.ajax({
		type : "POST",
		url : url,
		 processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		data : jsonString,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				
				window.location = rootPath + "/index_admin.jsp"
				
			} else {
				alert(data.ResponseMessage.message.zh_CN);
			}
		},
		error : function() {
			$.AMUI.progress.done();
			return "error";
		}
	});
}
