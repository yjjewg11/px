 

var PxSnsConfig={
	div_body:'div_body',
//	div_get_div:G_get_div_second,
	 getBodyDiv:function(){
		 
		return document.getElementById(this.div_body);
	}
//    getdiv_second:function(){
//    	
//	return this.div_get_div;
//    }
	
}
var PxSnsService=(function(){
	//——————————————————————————(大图标)话题——————————————————————————  	
	/*
	 * <话题>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
	 * */
	function sns_list_div(){
		React.render(React.createElement(Sns_good_Div_list),PxSnsConfig.getBodyDiv());  	
	}
	/*
	 * <话题>获取列表数据服务器请求;
	 * */
	function sns_announce_Mygoodlist(list_div,pageNo,callback){
		$.AMUI.progress.start();
		var url = hostUrl + "rest/snsTopic/listPage.json";
		$.ajax({
			type : "GET",
			url : url,
	  		data :{pageNo:pageNo},
			dataType : "json",
			async: false,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					React.render(React.createElement(sns_mygoodlist_div, {
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
		   
}
	/*
	 *<话题>添加等按钮绑定事件
	 * @add:创建；
	 * @edit:编辑；
	 * @del:删除；
	 * */ 
	function btnclick_sns_announce(m,uuid){
	  	if(m=="add"){
	  		sns_ajax_announce_good_edit(null);
	  	}else if(m=="edit"){
	  		sns_ajax_announce_good_edit(uuid);
	  	}else if(m=="del"){
	  		//react_ajax_announce_good_delete(groupuuid,uuid);
	  	}
		   
}	
  /*
   *<话题>创建与编辑服务请求；
   * @if(!uuid):创建；
   * @uuid不是则:编辑；
   * */ 	
	function sns_ajax_announce_good_edit(uuid){
	  	if(!uuid){
	  		Queue.push(function(){sns_ajax_announce_good_edit(uuid);},"创建话题");
	  		React.render(React.createElement(Announcements_snsedit,{
	  			formdata:{section_id:1}
	  			}), PxSnsConfig.getBodyDiv());
	  		return;
	  	}
	  	Queue.push(function(){sns_ajax_announce_good_edit(uuid);},"编辑话题");	
	  	$.AMUI.progress.start();
	      var url = hostUrl + "rest/snsTopic/"+uuid+".json";
	  	$.ajax({
	  		type : "GET",
	  		url : url,
	  		dataType : "json",
	  		 async: true,
	  		success : function(data) {
	  			$.AMUI.progress.done();
	  			if (data.ResMsg.status == "success") {
	  				React.render(React.createElement(Announcements_snsedit,{
	  					formdata:data.data,
	  					group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
	  					}),PxSnsConfig.getBodyDiv());
	  			} else {
	  				alert("加载数据失败："+data.ResMsg.message);
	  			}
	  		},
			error :G_ajax_error_fn
	  	});  
		   
}	
	/*
	 *<话题>创建与编辑提交按钮方法
	 *@OPT：我们把内容用Form表单提交到Opt我们封装的
	 *一个方法内直接传给服务器，服务器从表单取出需要的参数
	 * */  	
	function ajax_sns_save(){
	     var opt={
	             formName: "snsAnnouncementsForm",
	         url:hostUrl + "rest/snsTopic/save.json",
	             cbFN:null
	             };
	 G_ajax_abs_save(opt);	
		   
}
	
	function sns_edit_topic_div(){
				   React.render(React.createElement(Sns_Div_list,{
					type:2
					}), PxSnsConfig.getBodyDiv());  	
				   
	}
	return {
		ajax_sns_save:ajax_sns_save,
		btnclick_sns_announce:btnclick_sns_announce,
		sns_announce_Mygoodlist:sns_announce_Mygoodlist,
		sns_edit_topic_div:sns_edit_topic_div,
		sns_list_div:sns_list_div
	};//end return
})();//end PxLazyM=(function(){return {}})();


/*
 *(精品文章)创建与编辑提交按钮方法
 *@OPT：我们把内容用Form表单提交到Opt我们封装的
 *一个方法内直接传给服务器，服务器从表单取出需要的参数
 * */    
// function ajax_good_save(){
//     var opt={
//             formName: "editAnnouncementsForm",
//         url:hostUrl + "rest/announcements/save.json",
//             cbFN:null
//             };
// G_ajax_abs_save(opt);
// }







//————————————————————————————精品文章————————————————————————— 
/*
 *<精品文章>详情服务器请求；
* @Announcements_show:详情绘制
 * 在kd_rect;
 * */
//function react_ajax_announce_good_show(uuid,title){
//	$.AMUI.progress.start();
//    var url = hostUrl + "rest/announcements/"+uuid+".json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		dataType : "json",
//		 async: true,
//		success : function(data) {
//			$.AMUI.progress.done();
//			// 登陆成功直接进入主页
//			if (data.ResMsg.status == "success") {
//				var o=data.data;
//				  if(o.url){
//						var flag=G_CallPhoneFN.openNewWindowUrl(o.title,o.title,null,data.share_url);
//						if(flag)return;
//				  }
//
//				//如果相等为True不等为false用于判断编辑与删除是否
//				var canEdit=data.data.create_useruuid==Store.getUserinfo().uuid;
//				React.render(React.createElement(Announcements_goodshow,{
//					canEdit:canEdit,
//					data:data.data,
//					share_url:data.share_url,
//					count:data.count
//					}), G_get_div_second());
//			} else {
//				alert("加载数据失败："+data.ResMsg.message);
//			}
//		},
//		error :G_ajax_error_fn
//	});
//};

  /*
   *(精品文章)删除按钮服务请求；
   *@ajax_announce_listByGroup：删除成功后调用发布消息方法刷新;
   * */  	  
//  function react_ajax_announce_good_delete(groupuuid,uuid){	 
//  	if(!confirm("确定要删除吗?")){
//  		return;
//  	}
//    	$.AMUI.progress.start();
//        var url = hostUrl + "rest/announcements/delete.json?uuid="+uuid;
//  	$.ajax({
//  		type : "POST",
//  		url : url,
//  		dataType : "json",
//  		 async: true,
//  		success : function(data) {
//  			$.AMUI.progress.done();
//  			// 登陆成功直接进入主页
//  			if (data.ResMsg.status == "success") {
//  				Queue.doBackFN();
//  			} else {
//  				alert(data.ResMsg.message);
//  			}
//  		},
//  		error :G_ajax_error_fn
//  	});
//  };  	  	  