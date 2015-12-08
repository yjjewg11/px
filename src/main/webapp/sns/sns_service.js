 
var PxSnsConfigsecond={
	div_get_div:G_get_div_second(),
    getdiv_second:function(){   	
	return this.div_get_div;
    }
	
}
var PxSnsConfig={
	div_body:'div_body',
	 getBodyDiv:function(){
		 
		return document.getElementById(this.div_body);
	}
	
}
var PxSnsService=(function(){
//——————————————————————————(大图标)话题——————————————————————————  	
/*
 * <话题>先绘制舞台div搭建加载更多按钮功能模板 以及静态数据
 * */
function sns_list_div(){
	React.render(React.createElement(Sns_Div),PxSnsConfig.getBodyDiv());  	
}
/*
 * <话题>获取列表数据服务器请求;
 * */
function sns_snsTopic_list(list_div,pageNo,callback){
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
  			formdata:{section_id:1}
  			}), PxSnsConfig.getBodyDiv());
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
		 		formdata:data.data
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
function ajax_sns_snsTopic_save(){
     var opt={
             formName: "snsAnnouncementsForm",
         url:hostUrl + "rest/snsTopic/save.json",
             cbFN:null
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
  			} else {
  				alert(data.ResMsg.message);
  			}
  		},
  		error :G_ajax_error_fn
  	});			   
}			
/*
 *<话题>详情服务器请求；
 * @Announcements_show:详情绘制
 * */	
function ajax_sns_snsTopic_show(uuid){
	Queue.push(function(){ajax_sns_snsTopic_show(uuid);},"话题详情");
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
					share_url:data.share_url,
					count:data.count
					}),PxSnsConfig.getBodyDiv());
			} else {
				alert("加载数据失败："+data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});		   
}	

/*
 * <话题>评论回复内容获取服务请求;
 * 绘制评论内容列表
 * */	
function ajax_sns_reply_list(topic_uuid,list_div,pageNo,tempateClazz){
	if(!tempateClazz)tempateClazz=Common_Classnewsreply_listshow;
	var re_data=null;
	 if(!pageNo)pageNo=1;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/snsReply/listPageByTopic.json?topic_uuid="+topic_uuid+"&pageNo="+pageNo;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Sns_reply_list_show,{
					events: data.list,
					topic_uuid:topic_uuid,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
				 }), document.getElementById(list_div));
				re_data=data.list;
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
	return re_data;					   
}

/*
 * <话题>我要评论保存操作;
 * */		
function ajax_sns_reply_save(callback,formid){
	if(!formid)formid="snsClassnewsreplyForm";
	var opt={
	 formName:formid,
	 url:hostUrl + "rest/snsReply/save.json",
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
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			},
			error : G_ajax_error_fn
		});
			   
}		
	
//--------------------------------------------------------------//	
/*
 * 评论回复模板
 * YES同意观点服务器请求
 * @that.forceUpdate():点赞或取消点赞在数据返回后强制刷新当前页面的方法;
 */	
function ajax_sns_snsReply_yes_save(uuid,canDianzan,dianzansave_callback){
	var that=this;
	$.AMUI.progress.start();
	var url =hostUrl +(canDianzan?"rest/snsReply/yes.json":"rest/snsReply/cancelDianzan.json");
		$.ajax({
			type : "GET",
			url : url,
			data : {uuid:uuid},
			dataType : "json",
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
			error : G_ajax_error_fn
		});
			   
}	

/*
 * 评论回复模板
 * NO不同意观点服务器请求
 * @that.forceUpdate():点赞或取消点赞在数据返回后强制刷新当前页面的方法;
 */	
function ajax_sns_snsReply_No_save(uuid,canDianzan,dianzansave_callback){
	var that=this;
	$.AMUI.progress.start();           
	var url =hostUrl +(canDianzan?"rest/snsReply/no.json":"rest/snsReply/cancelDianzan.json");
		$.ajax({
			type : "GET",
			url : url,
			data : {uuid:uuid},
			dataType : "json",
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
			error : G_ajax_error_fn
		});
			   
}	
	
	
function img_data_list(level){
    var img;
    if(level==0){
 	   img="普通贴"
    }else if(level==1){
 	   img="热帖贴"
    }else{
 	   img="精华贴"
    }
    return img;	
			   
}	
	return {
		sns_list_div:sns_list_div,
		sns_snsTopic_list:sns_snsTopic_list,
		btnclick_sns_snsTopic:btnclick_sns_snsTopic,
		ajax_sns_snsTopic_save:ajax_sns_snsTopic_save,
		ajax_sns_snsTopic_show:ajax_sns_snsTopic_show,
		ajax_sns_reply_list:ajax_sns_reply_list,
		ajax_sns_reply_save:ajax_sns_reply_save,

		ajax_sns_snsReply_yes_save:ajax_sns_snsReply_yes_save,
		ajax_sns_snsReply_No_save:ajax_sns_snsReply_No_save,
		
		ajax_sns_dianzan:ajax_sns_dianzan,
		img_data_list:img_data_list		
	};//end return
})();//end PxLazyM=(function(){return {}})();
  


