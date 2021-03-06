
//sessionTimeout公用方法,话题特殊处理，独立模式，弹出登录窗口。老师模式跳转登录窗口
function G_resMsg_Timeout_sns(ResMsg){
	if(ResMsg.status=="sessionTimeout"){
		G_resMsg_Timeout();
	}else{
		alert(ResMsg.message);		
	}
}


var PxSnsService=(function(){
//——————————————————————————(大图标)话题—————————————————————————— 
/* 
 * <话题>分页栏总入口
 * */	
function sns_Tabs_div(){
	React.render(React.createElement(TabsSelect), G_get_div_body()); 	
}	
/*
 * <话题>获取列表数据服务器请求;
 * */
function sns_snsTopic_list(list_div,pageNo,snsKey,callback){
	var KeyUrl;
	if(snsKey==1){
		KeyUrl="rest/snsTopic/listPage.json";
	}else if(snsKey==2){
		KeyUrl="rest/snsTopic/hotListPage.json";
	}else{
		KeyUrl="rest/snsTopic/topListPage.json";
	}
	$.AMUI.progress.start();
	var url = hostUrl + KeyUrl;
	$.ajax({
		type : "GET",
		url : url,
  		data :{pageNo:pageNo},
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(sns_list_snsTopic_rect, {
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
function btnclick_sns_snsTopic(m,uuid){
  	if(m=="add"){
  		Queue.push(function(){btnclick_sns_snsTopic(m,uuid);},"创建话题");
  		sns_ajax_snsTopic_add_edit(null);
  	}else if(m=="edit"){
  		Queue.push(function(){btnclick_sns_snsTopic(m,uuid);},"编辑话题");
  		sns_ajax_snsTopic_add_edit(uuid);
  	}else if(m=="del"){
  		sns_ajax_snsTopic_delete(uuid);
  	}		   
}

  /*
   *<话题>创建与编辑服务请求；
   * @if(!uuid):创建；
   * @uuid不是则:编辑；
   * */ 	
function sns_ajax_snsTopic_add_edit(uuid){
  //创建话题
  	if(!uuid){	  		
  		React.render(React.createElement(Sns_snsTopic_add_edit,{
  			formdata:{section_id:"1"}
  			}), G_get_div_body());
  		return;
  	}
 //编辑话题
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
		 	React.render(React.createElement(Sns_snsTopic_add_edit,{
		 		formdata:data.data,
		 		itemList:data.itemList
		 		}),G_get_div_body());
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
function ajax_sns_snsTopic_save(){
	
	var itemList=SnsitemListObj.getData();
	
	 var  formObject = $('#snsAnnouncementsForm').serializeJson();
	 formObject.itemList=itemList;
	 
     var opt={
    		 jsonString:JSON.stringify(formObject),
             formName: "snsAnnouncementsForm",
         url:hostUrl + "rest/snsTopic/save.json",
    	 success: function(data) {
 			$.AMUI.progress.done();
 			// 登陆成功直接进入主页
 			if (data.ResMsg.status == "success") { 				
 				 G_msg_pop(data.ResMsg.message); 	
 				 Queue.doBackFN();
 			}else{
				G_resMsg_Timeout_sns(data.ResMsg)
			}
 	}
             };
 G_ajax_abs_save(opt);	
		   
}
/*
*<话题>删除按钮服务请求；
* */  	
function sns_ajax_snsTopic_delete(uuid){
  	if(!confirm("确定要删除吗?")){
  		return;
  	  }
  $.AMUI.progress.start();
 var url = hostUrl + "rest/snsTopic/delete.json?uuid="+uuid;
  	$.ajax({
  		type : "POST",
  		url : url,
  		dataType : "json",
  		 async: true,
  		success : function(data) {
  			$.AMUI.progress.done();
  			if (data.ResMsg.status == "success") {
  				Queue.doBackFN();
  			}else{
				G_resMsg_Timeout_sns(data.ResMsg)
			}
  		},
  		error :G_ajax_error_fn
  	});			   
}			
/*
 *<话题>单条服务器请求；
 * @Announcements_show:详情绘制
 * */	
function ajax_sns_snsTopic_show(uuid){
	$.AMUI.progress.start();
    var url = hostUrl + "rest/snsTopic/"+uuid+".json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				//如果相等为True不等为false用于判断编辑与删除是否
				var canEdit=data.data.create_useruuid==Store.getUserinfo().uuid;
				    React.render(React.createElement(sns_snsTopicshow,{
				    dianZan:data.dianZan,	
					canEdit:canEdit,
					data:data.data,
					isFavor:data.isFavor,
					itemList:data.itemList,
					voteItem_uuid:data.voteItem_uuid,
					share_url:data.share_url,
					count:data.count
					}),G_get_div_second());
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});		   
}	

/*
 * <话题>评论内容获取服务请求;
 * 绘制评论内容列表
 * */	
function ajax_sns_reply_list(uuid,list_div,pageNo,type,key,callback){
	var url;
	var sort;
    if(key==1){
    	sort="recent";
    }else if(key==2){
    	sort="hot";
    }else{
    	sort="oldest";
    }
	 if(!pageNo)pageNo=1;
	if(type==71){
		 url = hostUrl + "rest/snsReply/listPageByTopic.json?topic_uuid="+uuid+"&pageNo="+pageNo+"&sort="+sort;
	 }else{
		 url = hostUrl + "rest/snsReply/listPageByReply.json?reply_uuid="+uuid+"&pageNo="+pageNo;		
	 }
	$.AMUI.progress.start();
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(type==71){
					React.render(React.createElement(Sns_reply_list_show,{
						snskey:key,
						topic_uuid:uuid,
						events: data.list,
						responsive: true, bordered: true, striped :true,hover:true,striped:true
					 }), document.getElementById(list_div));
				 }else{
						React.render(React.createElement(Sns_pinglun_list,{
							snskey:key,
							events: data.list,
							responsive: true, bordered: true, striped :true,hover:true,striped:true
						 }), document.getElementById(list_div));	
				 }
 				if(typeof callback=='function'){
					callback(data.list);
				}
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});			   
}

/*
 * <话题>我要评论保存操作;
 * */		
function ajax_sns_reply_save(callback,formid){
	if(!formid)formid="snsClassnewsreplyForm";
	var opt={
	 formName:formid,
	 url:hostUrl + "rest/snsReply/save.json",
	 success: function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				 G_msg_pop(data.ResMsg.message);
				 if(callback)callback();
				
			}else{
				G_resMsg_Timeout_sns(data.ResMsg)
			}
	}
	};
	 G_ajax_abs_save(opt);					   
}	
/*
 * 同意与不同意按钮服务请求公用方法;
 */	
function ajax_sns_dianzan(url,uuid,dianzansave_callback){
	var that=this;
	$.AMUI.progress.start();           	
		$.ajax({
			type : "GET",
			url : url,
			data : {uuid:uuid},
			dataType : "json",
			success : function(data) {
				$.AMUI.progress.done();
				// 登陆成功直接进入主页
				if (data.ResMsg.status == "success") {
					if(typeof dianzansave_callback=='function')dianzansave_callback(data);
				}else{
					G_resMsg_Timeout_sns(data.ResMsg)
				}
			},
			error : G_ajax_error_fn
		});
			   
}		



	//  listPageByReply
	return {
		sns_snsTopic_list:sns_snsTopic_list,
		btnclick_sns_snsTopic:btnclick_sns_snsTopic,
		ajax_sns_snsTopic_save:ajax_sns_snsTopic_save,
		ajax_sns_snsTopic_show:ajax_sns_snsTopic_show,
		ajax_sns_reply_list:ajax_sns_reply_list,
		ajax_sns_reply_save:ajax_sns_reply_save,
		sns_Tabs_div:sns_Tabs_div,
		ajax_sns_dianzan:ajax_sns_dianzan

	};//end return
})();//end PxLazyM=(function(){return {}})();
  


