 
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
	  		Queue.push(function(){btnclick_sns_announce(m,uuid);},"创建话题");
	  		sns_ajax_announce_good_edit(null);
	  	}else if(m=="edit"){
	  		Queue.push(function(){btnclick_sns_announce(m,uuid);},"编辑话题");
	  		sns_ajax_announce_good_edit(uuid);
	  	}else if(m=="del"){
	  		sns_ajax_announce_good_delete(uuid);
	  	}
		   
}	
  /*
   *<话题>创建与编辑服务请求；
   * @if(!uuid):创建；
   * @uuid不是则:编辑；
   * */ 	
	function sns_ajax_announce_good_edit(uuid){
	  	if(!uuid){
	  		
	  		React.render(React.createElement(Announcements_snsedit,{
	  			formdata:{section_id:1}
	  			}), PxSnsConfig.getBodyDiv());
	  		return;
	  	}
	  	
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
	/*
	 *<话题>详情服务器请求；
	* @Announcements_show:详情绘制
	 * 在kd_rect;
	 * */	
	function sns_ajax_announce_good_show(uuid){
		Queue.push(function(){sns_ajax_announce_good_show(uuid);},"话题详情");
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
//					var o=data.data;
//					  if(o.url){
//							var flag=G_CallPhoneFN.openNewWindowUrl(o.title,o.title,null,data.share_url);
//							if(flag)return;
//					  }

					//如果相等为True不等为false用于判断编辑与删除是否
					var canEdit=data.data.create_useruuid==Store.getUserinfo().uuid;
					React.render(React.createElement(sns_Announcements_goodshow,{
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
	   *<话题>删除按钮服务请求；
	   *@ajax_announce_listByGroup：删除成功后调用发布消息方法刷新;
	   * */  	
	function sns_ajax_announce_good_delete(uuid){
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
	  			// 登陆成功直接进入主页
	  			if (data.ResMsg.status == "success") {
	  				Queue.doBackFN();
	  			} else {
	  				alert(data.ResMsg.message);
	  			}
	  		},
	  		error :G_ajax_error_fn
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
//	function type_data_list(status){
//	       var type;
//	       status=1
//	       if(status==0){
//	    	   type="发布中"
//	       }else if(status==1){
//	    	   type="未发布"
//	       }else{
//	    	   type="屏蔽"
//	       }
//	       return type;	
//				   
//	}
/*
 * <话题>评论回复内容获取服务请求;
 * 
 * */	
	function sns_ajax_reply_list(topic_uuid,list_div,pageNo,tempateClazz){
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
					React.render(React.createElement(Sns_Classnewsreply_listshow, {
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
	 * 
	 * */		
	function sns_common_ajax_reply_save(callback,formid){
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
	 * 点赞功YES能模板服务器请求
	 * @canDianzan：根据Data数据中的是否可以点赞判断进行请求 ;
	 * True表示可以点赞,false表示点赞过了.可以取消点赞;
	 * @newsuuid:哪篇文章的ID;
	 * @type:哪个模板的点赞功能;
	 * @that.forceUpdate():点赞或取消点赞在数据返回后强制刷新当前页面的方法;
	 */	
	function sns_ajax_dianzan_yes_save(uuid,canDianzan,dianzansave_callback){
		var that=this;
		var objectForm={uuid:uuid};
		var jsonString=JSON.stringify(objectForm);
		$.AMUI.progress.start();
		var url =hostUrl +(canDianzan?"rest/snsReply/yes.json":"rest/snsReply/cancelDianzan.json");
			$.ajax({
				type : "GET",
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
				error : G_ajax_error_fn
			});
				   
	}
	/*
	 * 点赞功No能模板服务器请求
	 * @canDianzan：根据Data数据中的是否可以点赞判断进行请求 ;
	 * True表示可以点赞,false表示点赞过了.可以取消点赞;
	 * @newsuuid:哪篇文章的ID;
	 * @type:哪个模板的点赞功能;
	 * @that.forceUpdate():点赞或取消点赞在数据返回后强制刷新当前页面的方法;
	 */	
	function sns_ajax_dianzan_No_save(uuid,canDianzan,dianzansave_callback){
		var that=this;
		var objectForm={uuid:uuid};
		var jsonString=JSON.stringify(objectForm);
		$.AMUI.progress.start();
		var url =hostUrl +(canDianzan?"rest/snsReply/no.json":"rest/snsReply/cancelDianzan.json");
			$.ajax({
				type : "GET",
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
				error : G_ajax_error_fn
			});
				   
	}
	return {
		sns_ajax_dianzan_No_save:sns_ajax_dianzan_No_save,
		sns_ajax_dianzan_yes_save:sns_ajax_dianzan_yes_save,
		sns_common_ajax_reply_save:sns_common_ajax_reply_save,
		sns_ajax_reply_list:sns_ajax_reply_list,
		sns_ajax_announce_good_show:sns_ajax_announce_good_show,
		//type_data_list:type_data_list,
		img_data_list:img_data_list,
		ajax_sns_save:ajax_sns_save,
		btnclick_sns_announce:btnclick_sns_announce,
		sns_announce_Mygoodlist:sns_announce_Mygoodlist,
		sns_list_div:sns_list_div
	};//end return
})();//end PxLazyM=(function(){return {}})();
  


