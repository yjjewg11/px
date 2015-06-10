function init(){
	loaddata_group_list();
}
init();
//用户登陆
function loaddata_group_list() {
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
				var sel=$("#group_uuid");
				sel.empty();
				sel.prepend("<option value='0'>请选择</option>"); 
				for(i=0;i<data.list.length;i++){
					sel.append("<option value='"+data.list[i].uuid+"'>"+data.list[i].company_name+"</option>");
				}
				
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
}


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
				alert("注册成功！");
				window.location = hostUrl + "/login.html"
				
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
