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