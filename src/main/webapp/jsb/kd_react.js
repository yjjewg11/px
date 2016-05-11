//
var AMR_Table=AMUIReact.Table;
var AMR_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMR_Button=AMUIReact.Button;
var AMR_Sticky=AMUIReact.Sticky;
var AMR_Panel=AMUIReact.Panel;
var AMR_Gallery=AMUIReact.Gallery;
var AMR_Input=AMUIReact.Input;
var Grid=AMUIReact.Grid;
var Col=AMUIReact.Col;
var PxInput=AMUIReact.Input;
var AMR_Span=AMUIReact.span;


/**
* ajax_teachingplan_edit
*/

var Teachingplan_EventRow = React.createClass({displayName: "Teachingplan_EventRow", 
render: function() {
var event = this.props.event;
if(G_week.getWeekStr(event.plandate)==G_week.getWeekStr(new Date())){
	event.highlight=true;
}
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  React.createElement("tr", {className: className}, 
    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: btn_click_teachingplan.bind( this, "edit",event.uuid)}, G_week.getWeekStr(event.plandate))), 
    React.createElement("td", null, event.morning), 
    React.createElement("td", null, event.afternoon)
  ) 
);
}
}); 







//加载封的方法<div id="baidu_dup_1110291"></div>百度广告页面
var Div_body_index = React.createClass({displayName: "Div_body_index", 
	componentDidMount:function(){
		//(BAIDU_DUP=window.BAIDU_DUP||[]).push(['fillAsync','1110291','baidu_dup_1110291']);
		//<div id="baidu_dup_1110291"></div>
	},
	render: function() {
	return (
		React.createElement("div", null, 
		React.createElement(AMUIReact.Gallery, React.__spread({},   this.props))
		
		)
		
	);
	}
}); 


//--——————————————————————————帮助文档<绘制>——————————————————————————
/*
 * 我-帮助文档绘制
 * 
 * */
var Help_txt =React.createClass({displayName: "Help_txt",	 
	render: function() {
		  return (
		    React.createElement("div", null, 
		    React.createElement("article", {className: "am-article"}, 
		    React.createElement("div", {className: "am-article-hd"}, 
		      React.createElement("h1", {className: "am-article-title"}, "帮助文档")
		    ), 

		    React.createElement("div", {className: "am-article-bd"}, 
		      React.createElement("p", {className: "am-article-lead"}, "Web登录地址：http://www.wenjienet.com"), 
		      React.createElement("p", {className: "am-article-lead"}, "遇到问题，请联系问界互动家园技术部，电话：028-85027422"), 
		      React.createElement("p", {className: "am-article-lead"}, "或者反馈到微信公众号:wenjiehudong")
		    )
		  )
    	        ) 		 
		      );
		   }})	
//±±±±±±±±±±±±±±±±±±±±±±±±±±±
		   
		   
		   
		 //   <form id="editCourseForm" method="post" className="am-form">
		   
//——————————————————————————查看即时消息<绘制>——————————————————————————   
/* <查看即时消息>信息详情界面绘制；
 * @send_user：信息者名字；"即时消息"
 * */


var Message_queryMyTimely_myList =React.createClass({displayName: "Message_queryMyTimely_myList",
handleClick: function(event) {
	                 $("#"+event.uuid).removeClass("am-text-danger");
                     ajax_State_style(event.type,event.rel_uuid,event.group_uuid,1);
 if(event.isread==0){ 
 	 var url = hostUrl + "rest/pushMessage/read.json";
 			$.ajax({
 				type : "POST",
 				url : url,
                data : {uuid:event.uuid},
 				dataType : "json",
 				success : function(data) {
 				}
 			});	 
        }
	  },
	render: function() {
		  var thit=this;
		  var msg_classNmae;
		  return (
		    React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		      React.createElement("div", {className: "am-list-news-bd"}, 

		    	React.createElement("ul", {className: "am-list"}, 
				  this.props.formdata.data.map(function(event) {
						if(event.isread==0){
						 msg_classNmae="am-list-item-text am-text-danger ";
						 }else{
						 msg_classNmae="am-list-item-text ";
						  }
					  return(	
						  
			    React.createElement("li", {className: "am-g am-list-item-dated"}, 
			  React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: thit.handleClick.bind(this,event)}, 
			    event.title, "： ", event.message, 			 			 	
			    React.createElement("div", {id: event.uuid, className: msg_classNmae}, 
			  	   React.createElement("time", null, "消息发送于 ", event.create_time)
			  		  )
					 )	
			  		     ))})
    			    )
    			  )
    	        ) 		 
		      );
		   }})	
//±±±±±±±±±±±±±±±±±±±±±±±±±±±


//event.sex=="0"?"男":"女"






//——————————————————————————班级互动<绘制>——————————————————————————
/* 
 * <班级互动>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @btn_click_announce:点击按钮事件跳转kd_servise方法;
 * */
var Classnews_Div_list = React.createClass({displayName: "Classnews_Div_list", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	type:null,
	getDefaultProps: function() {
	 var data = [
	            {value: "1", label: '我的班级'},
	            {value: "2", label: '我的学校'},
	            {value: "3", label: '所有学校'}
	          ];
	    return {
	      btn_list: data
	    };
	  },
	//同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  this.type=nextProps.type;
			this.load_more_data();
		},
	componentDidMount:function(){
		this.load_more_data();
	},
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		var that=this;
		var callback=function(re_data){
			if(!re_data)return;
			if(re_data.data.length<re_data.pageSize){
				$("#"+that.load_more_btn_id).hide();
			}else{
				$("#"+that.load_more_btn_id).show();
			}
			that.pageNo++;
		}
		ajax_classs_Mygoodlist(this.classnewsreply_list_div+this.pageNo,this.pageNo,hd_type,callback);
	},

	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
//		this.forceUpdate();
		this.pageNo=1;
		try{G_clear_pureview();}catch(e){};
		
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
	selectclass_uuid_val:null,
	handleClick: function(m,val) {
		if(m=="add"){
			 btn_click_classnews(m,{classuuid:this.selectclass_uuid_val});
			 return;
		 }else{
			 hd_type=val;
			 this.pageNo=1;
			 this.refresh_data();
			 
			 
		 }
	  },
render: function() {
	if(!this.type)this.type=this.props.type;
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
	      React.createElement(AMR_Panel, null, 
		  React.createElement(AMUIReact.ButtonToolbar, null, 
		    React.createElement(AMUIReact.Button, {amStyle: "secondary", onClick: this.handleClick.bind(this,"add")}, "发布互动"), 
		    React.createElement(AMUIReact.Button, {amStyle: "secondary", onClick: this.refresh_data.bind(this)}, "刷新"), 
		    React.createElement(G_help_popo, {msg: G_tip.Classnews})
		    )
            ), 
	  	     React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
          	 React.createElement(AMUIReact.Selected, {btnStyle: "secondary", id: "selectclass_uuid", name: "groupuuid", onChange: this.handleClick.bind(this,"oth"), btnWidth: "200", value: hd_type, multiple: false, data: this.props.btn_list})
     	     ), 
		    React.createElement(Div_MyClassnewStatistics, null), 
		  React.createElement("hr", null), 	  
		    
		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-news-bd"}		   		    
		  ), 
		  
		  React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		  )
		  
		  
		  
		)
		  
			
  );
}
});
//显示我的班级互动统计数据
var Div_MyClassnewStatistics = React.createClass({displayName: "Div_MyClassnewStatistics", 
	
	getInitialState: function() {
		var o={
				disabled:true,
				title:"加载中..."
		}
		return o;
	  },
	  
	componentDidMount:function(){
		this.ajax_list();
	},
	  ajax_callback:function(data){
		  this.state.title=data.data;
		  this.state.disabled=false;
		  this.setState(this.state);
	  },
	 ajax_list:function(){
		 var that=this;
		  this.state.disabled=true;
		  this.setState(this.state);
		var url = hostUrl + "rest/classnews/getMyClassnewStatistics.json";
		$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			success : function(data) {
				if (data.ResMsg.status == "success") {
					that.ajax_callback(data);
				} else {
					that.state.disabled=false;
					that.setState(that.state);
					G_resMsg_filter(data.ResMsg);
				}
			},
			error : function(){
				that.state.disabled=false;
				that.setState(that.state);
			}
		});
		
	},
	render: function() {
		if(this.state.disabled)this.state.title="加载中...";
		return (
		 React.createElement(AMR_Button, {className: "am-margin-top-xs", amStyle: "success", amSize: "sm", block: true, disabled: this.state.disabled, onClick: this.ajax_list.bind(this)}, this.state.title)
	);
	}
}); 
/*
* <班级互动>;
* @Classnews_EventRow:绘制列表详情;
* */
var Classnews_EventsTable = React.createClass({displayName: "Classnews_EventsTable",	  
render: function() {
	var that=this;
return (
React.createElement("div", null, 
  this.props.events.data.map(function(event) {
    return (React.createElement(Classnews_show, {event: event}));
  })
)
);
}
});
/*
* <班级互动>MAp详情绘制
* var o = this.props.formdata;
*/
var Classnews_show = React.createClass({displayName: "Classnews_show", 
	handleClick_pinglun:function(val){
		  this.selectclass_uuid_val=val;
		  ajax_classnews_list(this.selectclass_uuid_val);
	  },	  
	  componentDidMount:function(){
		  $('.am-gallery').pureview();
		},
		ajax_btn_delete:function(event){
		if(!confirm("确定删除该互动吗?")){
			return;
		}	
		$.AMUI.progress.start();
		var url = hostUrl + "rest/classnews/delete.json";
		$.ajax({
			type : "POST",
			url : url,
			data:{uuid:event.uuid},
			dataType : "json",
			async: true,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					 G_msg_pop("互动删除成功");
				$('#ClassNews_hudong_'+event.uuid).remove();
				} else {
					alert(data.ResMsg.message);
				}
			},
			error : G_ajax_error_fn
		});
	},
	render: function() {		  
		  var  o = this.props.event;
		  var myuuid=Store.getUserinfo().uuid;
		  var delete_btn_className;
		  if(!o.imgsList)o.imgsList=[];
		  if(!o.create_img)o.create_img=G_def_headImgPath;		
		  
		  	if(myuuid== o.create_useruuid){
					delete_btn_className="G_Edit_show";
				   }else{
					delete_btn_className="G_Edit_hide";
				  }	
		   
			  var contentDiv=( React.createElement("div", {dangerouslySetInnerHTML: {__html:o.content}}));

			  if(o.url){
					 contentDiv=(  React.createElement("a", {href: "javascript:void(0);", onClick: common_classnews_url.bind(this,o.url)}, React.createElement("div", {className: "classnews_url", dangerouslySetInnerHTML: {__html:o.content}}), "  "));
			  }

	  return (
			  React.createElement("div", {id: "ClassNews_hudong_"+o.uuid}, 
			  React.createElement("article", {className: "am-comment am-margin-xs"}, 
			  React.createElement("a", {href: "javascript:void(0);"}, 
			    React.createElement("img", {src: o.create_img, className: "am-comment-avatar", width: "48", height: "48"})
			  ), 
			  React.createElement("div", {className: "am-comment-main"}, 
			    React.createElement("header", {className: "am-comment-hd"}, 
			      React.createElement("div", {className: "am-comment-meta"}, 
			         React.createElement("a", {href: "javascript:void(0);", className: "am-comment-author"}, o.class_name, "|", o.create_user, "|", o.group_name)
				)
			    ), 
		      
			    React.createElement("div", {className: "am-comment-bd"}, 
					contentDiv, 
			   React.createElement(Common_mg_big_fn, {imgsList: o.imgsList})


			    ), 
			    	React.createElement("footer", {className: "am-comment-footer"}, 
			    	React.createElement("div", {className: "am-comment-actions"}, 
			    	GTimeShow.showByTime(o.create_time), 

				

     			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"}), "点赞"), 
     			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"}), "评论"), 
								 "|阅读"+o.count, 

							React.createElement(G_check_disable_div_byRight, {type: 99, uuid: o.uuid, status: o.status, groupuuid: o.groupuuid, add_class: "am-fr"}), 
     			    	React.createElement("a", {href: "javascript:void(0);", className: "am-fr", onClick: common_check_illegal.bind(this,99,o.uuid)}, "举报"), 
     			    React.createElement("button", {className: "am-btn-sm am-btn-danger "+delete_btn_className, onClick: this.ajax_btn_delete.bind(this,o)}, "删除互动")




			    	)
			    	), 
			    	React.createElement(Common_Dianzan_show_noAction, {dianzan: o.dianzan, uuid: o.uuid, type: 99, btn_dianzan: "btn_dianzan_"+o.uuid}), 
			    	React.createElement("ul", {className: "am-comments-list"}, 
					  React.createElement(Classnews_reply_list, {replyPage: o.replyPage, uuid: o.uuid, type: 99, btn_reply: "btn_reply_"+o.uuid, groupuuid: o.groupuuid})
			    	)
			     )
			)
			 
			    )		   
	  );
	}
	}); 



/*
* 1.1互动里面单独的评论模板
* 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
* 把评论模板插入空Div里面
* 
* */
var Classnews_reply_list = React.createClass({displayName: "Classnews_reply_list", 
	getInitialState: function() {
		var o={
			replyPage:null
		}
		if(this.props.replyPage) o.replyPage=this.props.replyPage;
		return o;
	  },
   componentWillReceiveProps: function(nextProps) {
		var o={
				replyPage:commons_ajax_dianzan_getByNewsuuid(nextProps.uuid)
			}
	   this.setState(o);
	},
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"classnewsreply_list_div",
	
	
	componentDidMount:function(){
		var that=this;
		$("#"+this.props.btn_reply).bind("click",that.btn_reply_show.bind(that));
		this.load_more_data();
	},
	loadByFirst:function(list_div){
		React.render(React.createElement(Classnews_reply_list_listshow, {
			events: this.state.replyPage,
			newsuuid:this.props.uuid,
			 groupuuid:this.props.groupuuid,
			responsive: true, bordered: true, striped :true,hover:true,striped:true
			}), document.getElementById(list_div));
	},
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		var re_data=this.state.replyPage;
		if(re_data&& this.pageNo==1){
			this.loadByFirst(this.classnewsreply_list_div+this.pageNo);
		}else{
			re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow,this.props.groupuuid);
			
		}
		if(!re_data)return;
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}
		  
		  this.pageNo++;
	},
	refreshReplyList:function(){
		this.setState({replyPage:null});
		$("#"+this.classnewsreply_list_div).html("");
		this.pageNo=1;
		this.load_more_data();
		
		$("#"+this.div_reply_save_id).html("");
	},
	btn_reply_show:function(){
		React.render(React.createElement(Classnews_reply_save,
				{uuid:this.props.uuid,
			parentThis:this,
			type:this.props.type
			}), document.getElementById(this.div_reply_save_id));
	},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
	this.div_reply_save_id="btn_reply_save"+this.props.uuid;
	this.classnewsreply_list_div="classnewsreply_list_div"+this.props.uuid;
	var parentThis=this;
return (
		React.createElement("small", null, 
		  React.createElement("div", {className: "px_reply_comment_bd"}, 
		  React.createElement("div", {id: this.div_reply_save_id}, "   "), 
		    React.createElement("div", {id: this.classnewsreply_list_div}), 
		    React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多")		
			
			)	
			)
		   
);
}
}); 


/*
* 1.2互动里面单独的评论模板-item
* 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
* 把评论模板插入空Div里面
* 
* */
var Classnews_reply_list_listshow = React.createClass({displayName: "Classnews_reply_list_listshow",
		ajax_btn_delete:function(event){
		if(!confirm("确定删除该评论吗?")){
			return;
		}	
		$.AMUI.progress.start();
		var url = hostUrl + "rest/reply/delete.json";
		$.ajax({
			type : "POST",
			url : url,
			data:{uuid:event.uuid},
			dataType : "json",
			async: true,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					 G_msg_pop("评论删除成功");
				$('#ClassNews_pinglun_'+event.uuid).remove();
				} else {
					alert(data.ResMsg.message);
				}
			},
			error : G_ajax_error_fn
		});
	},
render: function() {
	var groupuuid=this.props.groupuuid;
	var myuuid=Store.getUserinfo().uuid;
	var that=this;

return (
		  React.createElement("div", null, 
		  this.props.events.data.map(function(event) {
	          var delete_btn_className;
				if(myuuid==event.create_useruuid){
					delete_btn_className="G_Edit_show";
				   }else{
					delete_btn_className="G_Edit_hide";
				  }	 
		      return (
		    		  React.createElement("li", {id: "ClassNews_pinglun_"+event.uuid, className: "am-cf"}, 
		    		  React.createElement("span", {className: "am-comment-author am-fl"}, event.create_user+":"), 
				        React.createElement("span", {className: "am-fl", dangerouslySetInnerHTML: {__html:event.content}}), 
				  React.createElement(G_check_disable_div_byRight, {type: 98, uuid: event.uuid, status: event.status, groupuuid: groupuuid}	), 
					  React.createElement("button", {className: "am-btn-sm am-btn-danger "+delete_btn_className, onClick: that.ajax_btn_delete.bind(this,event)}, "删除")

		    		  )
		    		  )
		  })
		
		    )		   
);
}
}); 

/*
* 绘制评论模板
* @componentDidMount:添加表情
* */
var Classnews_reply_save = React.createClass({displayName: "Classnews_reply_save", 
	classnewsreply_list_div:"classnewsreply_list_div",
	form_id:"editClassnewsreplyForm",
	reply_save_btn_click:function(){
		var that=this.props.parentThis;
		common_ajax_reply_save(function(){
			that.refreshReplyList();		
		},this.form_id);
	
	},
	componentDidMount:function(){
		 $("#"+this.classnews_content).xheditor(xhEditor_upImgOption_emot);
	},
render: function() {
	this.classnews_content="classnews_content_replay"+this.props.uuid;
	this.form_id="editClassnewsreplyForm"+this.props.uuid;
return (
		   React.createElement("form", {id: this.form_id, method: "post", className: "am-form"}, 
			React.createElement("input", {type: "hidden", name: "newsuuid", value: this.props.uuid}), 
			React.createElement("input", {type: "hidden", name: "uuid"}), 
			React.createElement("input", {type: "hidden", name: "type", value: this.props.type}), 						
			React.createElement(AMR_Input, {id: this.classnews_content, type: "textarea", rows: "3", label: "我要回复", placeholder: "填写内容", name: "content"}), 
			React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this), className: "am-btn am-btn-primary"}, "提交")		      
		    )	   
);
}
}); 

/*
* <班级互动>添加与编辑按钮中可删除图片显示.
*/
var ClassNews_Img_canDel = React.createClass({displayName: "ClassNews_Img_canDel",
		deleteImg:function(divid){
			$("#"+divid).remove();
		},			
	  render: function() {
		 return (
          		React.createElement("div", {className: "G_cookplan_Img"}, 
	 	       			React.createElement("img", {className: "G_cookplan_Img_img", src: this.props.url, alt: "图片不存在"}), 
	 	       			React.createElement("div", {className: "G_cookplan_Img_close", onClick: this.deleteImg.bind(this,this.props.parentDivId)}, React.createElement("img", {src: hostUrlCDN+"i/close.png", border: "0"}))
	 	       		)		
          	)
	  }
	});


/*
* <班级互动>添加与编辑详情绘制;（公用方法和大图标班级互动）
* @整个班级互动逻辑思维 首先要调用公用模板内的数组转换方法，把我们的数组转换成Selected需要的数据模型
* 然后Selected的onChange自带value 直接可以传进handleChange_selectclass_uuid方法内 
* 我们把值添加到 #editClassnewsForm 表单内 这样保存服务器请求就可以传最新的 classuuid了;
* @ w_img_upload_nocut.bind_onchange 图片截取方法绘制在新的Div里面
* @ajax_classnews_save:提交按钮在Kd_service;
* */
var Classnews_edit = React.createClass({displayName: "Classnews_edit", 
	selectclass_uuid_val:null,
	 getInitialState: function() {

		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editClassnewsForm').serializeJson());
	  },
	  handleChange_selectclass_uuid:function(val){
//		  this.selectclass_uuid_val=val;
//		  this.props.formdata.classuuid=val
			// $('#classuuid').val(val);
			    this.setState($('#editClassnewsForm').serializeJson());
	  },	  
	  imgDivNum:0,
	  getNewImgDiv:function(){
		  this.imgDivNum++;
		return "Classnews_edit_"+this.imgDivNum;  
	  },	  
	  addShowImg:function(url){
		  var divid=this.getNewImgDiv();
		  $("#show_imgList").append("<div id='"+divid+"'>加载中...</div>");		 	
		  React.render(React.createElement(ClassNews_Img_canDel, {
				url: url,parentDivId:divid
				}), document.getElementById(divid));  
	  },
	  componentDidMount:function(){
		 var editor=$('#classnews_content').xheditor(xhEditor_classnews_emot);
		 this.editor=editor;
	
		
		// w_img_upload_nocut.bind_onchange("#file_img_upload",function(imgurl){
		 var that=this;		 
		 //已经有的图片,显示出来.		 
		  w_img_upload_nocut.bind_onchange("#file_img_upload",function(imgurl,uuid){
			  ////data.data.uuid,data.imgUrl
			 that.addShowImg(imgurl);
			// $('#show_imgList').append('<img  width="198" height="198" src="'+imgurl+'"/>');			
		  });		
		//已经有的图片,显示出来.
		 if(!$('#imgs').val())return;
		 var imgArr=$('#imgs').val().split(",");
		 for(var i=0;i<imgArr.length;i++){
			 this.addShowImg(imgArr[i]);
		 }		
	},
handleChange_url_cb:function(url_content){
 this.editor.pasteText(url_content);

  },
handleChange_url:function(){
    var tmp=$('#editClassnewsForm').serializeJson();
	this.setState(tmp);
	var thit=this;		 
   G_getHtmlTitle(tmp.url,function(url_content){thit.handleChange_url_cb(url_content)});
},
bg_Class_fn:function(){
	var that=this;
	var callback=function(imgArr){
		 for(var i=0;i<imgArr.length;i++){
			 that.addShowImg(imgArr[i].src);
		 }		
	}

		var groupuuid=Store.getGroupBymyclassList(this.state.classuuid);
	    KDClassNewPhotoItem.queryForSelect(groupuuid,this.state.classuuid,1,callback);

  },
	
render: function() {
	  var o = this.state;
	  if(this.props.mycalsslist.length>0){
		 if(!o.classuuid) o.classuuid=this.props.mycalsslist[0].value;
	  }
//var url= "http://localhost:8080/px-rest/rest/uploadFile/getImgFile?uuid=60eb14b1-4fd5-41df-aa8a-03144a161334"
   		var that=this;
return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 	      
		  React.createElement("form", {id: "editClassnewsForm", method: "post", className: "am-form"}, 
	      React.createElement("div", {className: "am-form-group"}, 
		  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "classuuid", onChange: this.handleChange_selectclass_uuid, btnWidth: "300", data: this.props.mycalsslist, btnStyle: "primary", value: o.classuuid})	      
			), 
		  React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
			React.createElement("input", {type: "hidden", name: "imgs", id: "imgs", value: o.imgs}), 
		      React.createElement(AMR_Input, {id: "classnews_content", type: "textarea", rows: "8", label: "内容:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange}), 
		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
		      React.createElement("div", {className: "cls"}), 
		       React.createElement("label", null, "班级相册图片："), 
	            React.createElement(AMR_ButtonToolbar, null, 
	     		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.bg_Class_fn.bind(this)}, "浏览...")
                ), 
			  G_get_upload_img_Div(), 
			  React.createElement("label", {htmlFor: "name"}, "分享链接(链接和内容选填一个):"), 
  		         React.createElement("input", {type: "text", name: "url", id: "url", value: o.url, onChange: this.handleChange_url, maxLength: "256", placeholder: "可直接使用外部内容的链接地址显示"}), 
		      React.createElement("button", {type: "button", onClick: ajax_classnews_save, className: "am-btn am-btn-primary"}, "提交")
		    )
	     )
	   )
	   
	   )
);
}
}); 
//±±±±±±±±±±±±±±±±±±±±±±±±±±±

















//——————————————————————————（首页）公告<绘制>——————————————————————————  
/* 
 * 公告中的<信息>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @Parent_message_save我要保存模板；
 * */
var Announcements_Div_list = React.createClass({displayName: "Announcements_Div_list", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps:function(){
		this.load_more_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
   		var that=this;
   		var callback=function(re_data){
    			if(!re_data)return;
    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
      var re_data=ajax_announce_Mylist(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
	//绘制不变的信息
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		  React.createElement("div", {className: "am-list-news-hd am-cf"}
		   
		  ), 
		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-news-bd"}
		   
		    
		  ), 
		  React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		  )
		)
		  
			
  );
}
});
/*
 *公告功能表格内容绘制
 * 在kd_react；
 * */
var Announcements_mylist_div = React.createClass({displayName: "Announcements_mylist_div", 
	  render: function() {
	    var event = this.props.events;
	    var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
     React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
     React.createElement("div", {className: "am-list-news-bd"}, 
     React.createElement("ul", {className: "am-list"}, 
		  this.props.events.data.map(function(event) {
		      return (
		    		React.createElement("li", {className: "am-g am-list-item-dated"}, 
		  		    React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd ", onClick: react_ajax_announce_show.bind(this,event.uuid)}, 
		  		  event.title
		  		  ), 		
		  		  React.createElement("div", {className: "am-list-item-text"}, 
		  		  Vo.announce_type(event.type), "| ", Store.getGroupNameByUuid(event.groupuuid), "|", event.create_time
		  		  )
		  		    )
		    		  )
		         })	
		  )
		  )
    )  		  
  );
}
}); 
 /*
  *公告点赞、评论、加载更多等详情绘制模板；
  *增加编辑与删除功能
  *setShareContent(title,content,pathurl,httpurl)
  * */
var Announcements_show = React.createClass({displayName: "Announcements_show",
		getInitialState: function() {
		this.props.data.isFavor=this.props.isFavor;
		if(this.props.data)return this.props.data;
	  },
//收藏按钮方法;
	  favorites_push: function(obj) {
		  if(obj.isFavor==false)return;
		  var url=obj.url;
		   obj.isFavor=false;
		  this.setState(obj);
		commons_ajax_favorites_push(obj.title,obj.type,obj.uuid,url)
	  },
//公告编辑、删除点击按钮事件跳转kd_servise方法;
 handleClick: function(m,groupuuid,uuid) {
   btnclick_announce(m,groupuuid,uuid);
  }, 
render: function() {
	 var obj=this.state;
	  var edit_btn_className="G_Edit_hide";
	  if(this.props.canEdit){
		  edit_btn_className="G_Edit_show";
	  }
return (
		  React.createElement("div", {className: "px_margin_div"}, 
            React.createElement("div", {className: "am-margin-left-sm"}, 
		 
            React.createElement(AMUIReact.Article, {
		    title: obj.title, 
		    meta: Vo.announce_type(obj.type)+" | "+Store.getGroupNameByUuid(obj.groupuuid)+" | "+obj.create_time+ "|阅读"+ this.props.count+"次"}, 
			React.createElement("div", {dangerouslySetInnerHTML: {__html: obj.message}})
		      ), 		     
		     React.createElement(AMR_ButtonToolbar, null, 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick.bind(this, "edit",obj.groupuuid,obj.uuid)}, "编辑"), 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "danger", onClick: this.handleClick.bind(this, "del",obj.groupuuid,obj.uuid)}, "删除")
		     )		     
		     ), 
		    	React.createElement("footer", {className: "am-comment-footer"}, 
		    	React.createElement("div", {className: "am-comment-actions"}, 
		    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+obj.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
				React.createElement("a", {href: "javascript:void(0);", onClick: this.favorites_push.bind(this,obj)}, React.createElement("i", {className: obj.isFavor?"am-icon-heart px_font_size_click":"am-icon-heart px-icon-hasdianzan px_font_size_click"}), obj.isFavor?"收藏":"已收藏"), 	
		    	React.createElement("a", {href: "javascript:void(0);", onClick: G_CallPhoneFN.setShareContent.bind(this,obj.title,obj.title,null,this.props.share_url)}, React.createElement("i", {className: G_CallPhoneFN.canShareUrl()?"am-icon-share-alt px_font_size_click":"am-hide"}))
			    )
		    	), 
		    	React.createElement(Common_Dianzan_show_noAction, {uuid: obj.uuid, type: obj.type, btn_dianzan: "btn_dianzan_"+obj.uuid}), 
			  React.createElement(Common_reply_list, {uuid: obj.uuid, type: obj.type, groupuuid: obj.groupuuid})			 
		   )
);
}
}); 

/*
 * (公告)创建与编辑界面绘制；
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * */    
var Announcements_edit = React.createClass({displayName: "Announcements_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editAnnouncementsForm').serializeJson());
	  },
	  componentDidMount:function(){
	   var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
	     this.editor=editor;
          w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
          });
	  },
		   preview_fn:function(){
          G_html_preview("t_iframe", this.state.url,this.editor.getSource(),this.state.title);
       }, 
render: function() {
	 var o = this.state;
	  var type_div;
	  if (announce_types==2) {
		  type_div= 
			   React.createElement("div", {className: "am-form-group", id: "div_classuuids"}, 
		  		React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
		  		React.createElement("label", {htmlFor: "tel"}, "班级通知:"), 
		  		React.createElement("input", {type: "text", name: "classuuids", id: "classuuids", value: o.classuuids, onChange: this.handleChange, placeholder: "班级通知，才填写"})
  		     );
	  } else {
		  type_div =
		  React.createElement("input", {type: "hidden", name: "type", value: o.type})
	  }
  return (
  		React.createElement("div", null, 
  		React.createElement("div", {className: "header"}, 
  		  React.createElement("hr", null)
  		), 
  		React.createElement("div", {className: "am-g"}, 
  		  React.createElement("div", {className: "am-u-lg-6 am-u-sm-12"}, 
  		  React.createElement("form", {id: "editAnnouncementsForm", method: "post", className: "am-form"}, 
  		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
  		React.createElement("input", {type: "hidden", name: "isimportant", value: o.isimportant}), 		
  		React.createElement("div", {className: "am-form-group"}, 
  	  React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid})		          
        ), 
  		type_div, 
  		  React.createElement("label", {htmlFor: "name"}, "标题:"), 
  		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxLength: "45", placeholder: "不超过45字"}), 
  		  React.createElement("br", null), 
  		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
 		G_get_upload_img_Div(), 
  		  React.createElement("button", {type: "button", onClick: ajax_announce_save, className: "am-btn am-btn-primary"}, "提交"), 
			  React.createElement("button", {type: "button", onClick: this.preview_fn.bind(this), className: "am-btn am-btn-primary"}, "预览")


  		  )
  	     ), 
			    React.createElement("div", {className: "am-u-lg-6 am-u-sm-12"}, 
               React.createElement(G_phone_iframe, null)
             )


  	   )	   
  	  )
  );
}
}); 
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————（老版首页）课程表<绘制>——————————————————————————  
/*
 * 课程表班级内详情 课程表
 */
var Teachingplan_showByOneDay = React.createClass({displayName: "Teachingplan_showByOneDay", 
	handleClick: function(m,classuuid) {
		if(m=="pre"){
			ajax_teachingplan_dayShow(--g_teachingplan_listToShow_point,{uuid:classuuid,name:Store.getClassNameByUuid(classuuid)});
			 return;
		 }else if(m=="next"){
			 ajax_teachingplan_dayShow(++g_teachingplan_listToShow_point,{uuid:classuuid,name:Store.getClassNameByUuid(classuuid)});
			 return;
		 }
	},
	handleChange_selectgroup_uuid: function(val) {
		 ajax_teachingplan_dayShow(g_teachingplan_listToShow_point,{uuid:val,name:Store.getClassNameByUuid(val)});  
    },
	handleClick_class: function(m,classuuid,ch_day) {
			 btn_click_teachingplan(m,null,classuuid,ch_day);
			 return;

 },
	componentDidMount: function() {
//		if(!this.props.formdata){
//			  $("#div_detail").html("今日没有发布教学计划");
//		  }	    
	  },
	render: function() {
	  var o = this.props.formdata;
	  if(!o){
		  o={};
	  }	
	  var div_detail_inhtml=null;
	  var edit_btn_className="G_Edit_hide";
	  if(this.props.formdata){
		  div_detail_inhtml=(
				  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
					 React.createElement("label", null, "早上:"), 
					 React.createElement("div", {className: "g_teachingplan"}, 
						React.createElement("div", {dangerouslySetInnerHTML: {__html:G_textToHTML(o.morning)}})
					 ), 
					 React.createElement("label", null, "下午:"), 
					 React.createElement("div", {className: "g_teachingplan"}, 
						React.createElement("div", {dangerouslySetInnerHTML: {__html:G_textToHTML(o.afternoon)}})
					 ), 
				    	React.createElement("footer", {className: "am-comment-footer"}, 
				    	React.createElement("div", {className: "am-comment-actions"}, 
				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"}))
				    	)
				    	), 
				    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 7, btn_dianzan: "btn_dianzan_"+o.uuid}), 
					  React.createElement(Common_reply_list, {uuid: o.uuid, type: 7})
					) 
		  )
	  }else{
		  edit_btn_className="G_Edit_show";
	  }
	  return (
		React.createElement("div", null, 
		 React.createElement("div", {className: "am-g"}, 	
		  React.createElement("button", {className: "am-btn am-btn-secondary", onClick: this.handleClick.bind(this, "pre",this.props.ch_class.uuid)}, 
		  React.createElement("i", {className: "am-icon-angle-left"})
		), 
		  React.createElement("button", {className: "am-btn am-btn-secondary", onClick: this.handleClick.bind(this, "next",this.props.ch_class.uuid)}, 
		  React.createElement("i", {className: "am-icon-angle-right"})
		), 
		React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid.bind(this), btnWidth: "200", data:  this.props.classList, btnStyle: "primary", value: this.props.ch_class.uuid}), 
		 React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick_class.bind( this ,"add",this.props.ch_class.uuid,this.props.ch_day)}, "新增课程")
		), 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		  "课程安排-", this.props.ch_day
		
		  ), 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g", id: "div_detail"}, 
		
			div_detail_inhtml
		
		)
	   
	   )
);
}
});
/*
 *<课程表>班级详情添加与编辑内容绘制;
 * @add:添加班级课程；
 * @pre:上周；
 * @next:下一周；
 * */
var Teachingplan_edit = React.createClass({displayName: "Teachingplan_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editTeachingplanForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		  React.createElement("form", {id: "editTeachingplanForm", method: "post", className: "am-form"}, 
		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		React.createElement("input", {type: "hidden", name: "classuuid", value: o.classuuid}), 
		 React.createElement("label", {htmlFor: "name"}, "日期:"), 
		 React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", name: "plandateStr", id: "plandateStr", dateTime: o.plandate, onChange: this.handleChange}), 
		      React.createElement("br", null), 
	    React.createElement(AMR_Input, {id: "morning", name: "morning", type: "textarea", rows: "2", label: "早上:", placeholder: "填写内容", value: o.morning, onChange: this.handleChange}), 
		React.createElement(AMR_Input, {id: "afternoon", name: "afternoon", type: "textarea", rows: "2", label: "下午:", placeholder: "填写内容", value: o.afternoon, onChange: this.handleChange}), 
		      React.createElement("button", {type: "button", onClick: ajax_teachingplan_save, className: "am-btn am-btn-primary"}, "提交")
	 )
	     )
	   )
	   
	   )
);
}
});
//——————————————————————————（新版首页->课程表）<绘制>——————————————————————————  
/*
 * 
 * 课程表1周显示
 * <Teachingplan_showByMy  classuuid={classuuid} classlist={classlist} />
 */
var Teachingplan_show7Day = React.createClass({displayName: "Teachingplan_show7Day", 
	getInitialState: function() {
		
		var obj= {
		    	classuuid:this.props.classuuid,
		    	classlist:this.props.classlist,
		    	pageNo:0,
		    	list: this.props.list
		    };
		obj=this.ajax_list(obj);
	    return obj;
	   
	  },
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var obj= {
				  classuuid:nextProps.classuuid,
				  classlist:nextProps.classlist,
			    	pageNo:nextProps.pageNo,
			    	type:nextProps.type,
			    	list: nextProps.list
			    };
				
			obj=this.ajax_list(obj);
		  this.setState(obj);
		},
	 ajax_list:function(obj){
		 var now=new Date();
		  	now=G_week.getDate(now,obj.pageNo*7);
		 var begDateStr=G_week.getWeek0(now,obj.pageNo);
		var endDateStr=G_week.getWeek6(now,obj.pageNo);;
			//记录老师选择的班级.
			G_myCurClassuuid=obj.classuuid;
		$.AMUI.progress.start();
		var url = hostUrl + "rest/teachingplan/list.json";
		$.ajax({
			type : "GET",
			url : url,
		//	data : {type:obj.type,groupuuid:obj.groupuuid,pageNo:obj.pageNo},
			data : {classuuid:obj.classuuid,begDateStr:begDateStr,endDateStr:endDateStr},
			dataType : "json",
			async: false,//必须同步执行
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					obj.list=data.list;
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			},
			error : G_ajax_error_fn
		});
		return obj;
		
	},
	pageClick: function(m) {
		 var obj=this.state;
		 if(m=="pre"){
			 obj.pageNo=obj.pageNo-1;
			 this.setState(this.ajax_list(obj));
			 return;
		 }else if(m=="next"){
			 obj.pageNo=obj.pageNo+1;
			 this.setState(this.ajax_list(obj));
			 return;
		 }
	},

	handleChange_selectclass_uuid: function(val) {
		 var obj=this.state;
		 obj.classuuid=val;
		 this.setState(this.ajax_list(obj));
    },
	componentDidMount: function() {
//		if(!this.props.formdata){
//			  $("#div_detail").html("今日没有发布教学计划");
//		  }	    
	  },
	render: function() {
	  var o = this.state;
	  var now=new Date();
	  	now=G_week.getDate(now,o.pageNo*7);
	  return (
		React.createElement("div", null, 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement(AMR_Panel, null, 
		 React.createElement(AMR_ButtonToolbar, null, 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "pre")}, "上周")
           ), 

         React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "next")}, "下周")	
         )
	    )
		), 
			         
		 React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "group_uuid", onChange: this.handleChange_selectclass_uuid.bind(this), btnWidth: "200", data:  this.state.classlist, btnStyle: "primary", value: this.state.classuuid})
		)
	    
		 ), 
		React.createElement("hr", null), 
		React.createElement("div", {className: "am-g", id: "div_detail"}, 
		
		React.createElement(G_Teachingplan_7day, {classuuid: this.state.classuuid, startDate: now, list: this.state.list})
		
		)
	   
	   )
);
}
}); 


/**
 * 全局模版-没有内容时显示
 * <G_Teachingplan_7day classuuid={this.state.classuuid} startDate={startDate} list={list} />
 */
var G_Teachingplan_7day= React.createClass({displayName: "G_Teachingplan_7day", 
	getInitialState: function() {
		var obj= {
				classuuid:this.props.classuuid,
				startDate:this.props.startDate,
		    	size:7,
		    	list: this.props.list
		    };
	    return obj;
	   
	  },
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var obj= {
					startDate:nextProps.startDate,
					classuuid:nextProps.classuuid,
			    	size:7,
			    	list: nextProps.list
			    };
		  this.setState(obj);
		},
		/**
		 * 根据日期生成课程表,如何返回数据中没有,则创建空的.
		 */
		getOneDayData:function(d1,list){
			for(var i=0;i<list.length;i++){
				var tmp=list[i];
				if(tmp.plandate.indexOf(d1)>-1){
					return tmp;
				}
			}
			return {classuuid:this.state.classuuid,plandate:d1,morning:"",afternoon:"",uuid:null};
		},
		/**
		 * 获取7天的课程表数据
		 */
		getListByStartDate:function(d1,size,list){ 
			var ar=[];
			var t=G_week.getWeekDayByDate(d1);
			if(t==0)t=-6;
			else t=1-t;
			for(var i=0;i<size;i++){
				var tmp=G_week.getDateStr(d1,t);
				t++;
				ar.push(this.getOneDayData(tmp,list));
			}
			return ar;
		},
	  render: function() {
		 var ar=this.getListByStartDate(this.state.startDate,this.state.size,this.state.list);
	    return (
	    		React.createElement("div", null, 
	    		 ar.map(function(event) {
					  return(							  										  
						React.createElement(G_Teachingplan_1day, {data: event})
					  )})
	    		 )
	    );
	  }
	  }); 
var G_Teachingplan_1day= React.createClass({displayName: "G_Teachingplan_1day", 
	getInitialState: function() {
		var obj= {
				 isEdit:false,
				data:this.props.data
		    };
	    return obj;
	  },
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var obj= {
				  isEdit:false,
				  data:nextProps.data
			    };
		  this.setState(obj);
		},
	   edit:function(o){
		   var obj= {
				   	isEdit:true,
					  data:o
				    };
		   this.setState(obj);
	   },
	   save_callback:function(data){
		  	G_msg_pop(data.ResMsg.message);
		   var obj= {
				   isEdit:false,
					  data:data.data
				    };
		   this.setState(obj);
     
       },
	  render: function() {
		  var o=this.state.data;
		  if(this.state.isEdit){
			  return (React.createElement(Teachingplan_edit_inner, {data: o, callback: this.save_callback.bind(this)}));
		  }
		  var dianzan=(React.createElement("div", null));
		  if(o.uuid){
			  if(!o.count)o.count=0;
			  dianzan=(
					  React.createElement("div", null, 
					  React.createElement("footer", {className: "am-comment-footer"}, 
				    	React.createElement("div", {className: "am-comment-actions"}, 
				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"})), 
						React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", null, "阅读"+o.count))
						
				    	)
				    	), 
				    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 7, btn_dianzan: "btn_dianzan_"+o.uuid}), 
				    	React.createElement("ul", {className: "am-comments-list"}, 
						  React.createElement(Classnews_reply_list, {uuid: o.uuid, type: 7, btn_reply: "btn_reply_"+o.uuid})
				    	)
				  ));
		  }
		  var divCs1="am-u-sm-4 am-u-md-2 am-u-lg-1";
		  var divCs2="am-u-sm-8 am-u-md-10 am-u-lg-11";
		  var cs="am-panel am-panel-secondary";
		 
		  if(o.plandate.indexOf( G_week.getDateStr(new Date(),0))>-1){
			  cs="am-panel am-panel-warning";
		  }
		 
			return (
					
					React.createElement("div", {className: cs}, 
					  React.createElement("div", {className: "am-panel-hd"}, 
					  React.createElement("h3", {className: "am-panel-title am-g"}, 
						  React.createElement("div", {className: divCs1}, G_week.getWeekStr(o.plandate)), 
			    		  React.createElement("div", {className: divCs2}, o.plandate.split(" ")[0], 
			    		   React.createElement(AMR_Button, {className: "am-margin-left", amStyle: o.uuid?"default":"secondary", onClick:  this.edit.bind( this ,o)}, o.uuid?"修改":"创建")
			    		  )
					  )
					  ), 
					  React.createElement("div", {className: "am-panel-bd"}, 
							  React.createElement("div", {className: "am-g"}, 
				    		  React.createElement("div", {className: divCs1}, "上午"), 
				    		  React.createElement("div", {className: divCs2, dangerouslySetInnerHTML: {__html:G_textToHTML(o.morning)}}
				    		  )
				    		), 
				    		React.createElement("div", {className: "am-g"}, 
				    		  React.createElement("div", {className: divCs1}, "下午"), 
				    		  React.createElement("div", {className: divCs2, dangerouslySetInnerHTML: {__html:G_textToHTML(o.afternoon)}}
				    		  )
				    		), 
				    		React.createElement("div", {className: "am-g"}, 
				    		dianzan						 
				    		)
					  )
					 
					)
	    		
	    		
	    );
	  }
	  });  


/*
 *<课程表>班级编辑-内嵌在显示1周页面
 *<Teachingplan_edit_inner data={data} callback={callback} />
 * */
var Teachingplan_edit_inner = React.createClass({displayName: "Teachingplan_edit_inner", 
	formid:null,
	 getInitialState: function() {
		    return this.props.data
	},
		//同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  this.setState(nextProps.data);
		},
	 handleChange: function(event) {
		    this.setState($('#'+this.formid).serializeJson());
	  },
	  ajax_teachingplan_save:function(){
		  var callback=this.props.callback;
		    var opt={
		            formName: this.formid,
		            url:hostUrl + "rest/teachingplan/save.json",
		            cbFN:callback
		            };
		G_ajax_abs_save(opt);
	  },
	
render: function() {
	  var o = this.state;
	  o.plandate=o.plandate.split(" ")[0];
	  this.formid="editTeachingplanForm"+o.plandate;
	  ////onChange={this.handleChange.bind(this) 焦点每次输入后,到最后bug.
	  if(!o.morning)o.morning=G_tip.teachingplan_morning;
	  if(!o.afternoon)o.afternoon=G_tip.teachingplan_afternoon;
	
return (
		
		 React.createElement("form", {id: this.formid, method: "post", className: "am-form"}, 
		 React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
			React.createElement("input", {type: "hidden", name: "classuuid", value: o.classuuid}), 
		React.createElement("div", {className: "am-container"}, 
		React.createElement("div", {className: "am-g am-success am-article-title"}, 
		  React.createElement("div", {className: "am-u-sm-4"}, G_week.getWeekStr(o.plandate)), 
		  React.createElement("div", {className: "am-u-sm-8"}, 
		  o.plandate, 
		  React.createElement("input", {type: "hidden", name: "plandateStr", value: o.plandate})
		 
		  )
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-sm-4"}, "上午"), 
		  React.createElement("div", {className: "am-u-sm-8"}, 
		  React.createElement(AMR_Input, {id: "morning", name: "morning", type: "textarea", defaultValue: o.morning, rows: "12", label: "早上:", placeholder: "填写内容"})

		  )
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-sm-4"}, "下午"), 
		  React.createElement("div", {className: "am-u-sm-8"}, 
		  React.createElement(AMR_Input, {id: "afternoon", name: "afternoon", type: "textarea", defaultValue: o.afternoon, rows: "7", label: "下午:", placeholder: "填写内容"})
		  )
		), 
		 React.createElement(AMR_Button, {amStyle: "primary", onClick:  this.ajax_teachingplan_save.bind( this)}, "保存")
	)
	
	 )
	
);
}
});
/*
 *<课程表>班级详情添加与编辑内容绘制;
 * @add:添加班级课程；
 * @pre:上周；
 * @next:下一周；
 * */
var Teachingplan_edit = React.createClass({displayName: "Teachingplan_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editTeachingplanForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		  React.createElement("form", {id: "editTeachingplanForm", method: "post", className: "am-form"}, 
		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		React.createElement("input", {type: "hidden", name: "classuuid", value: o.classuuid}), 
		 React.createElement("label", {htmlFor: "name"}, "日期:"), 
		 React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", name: "plandateStr", id: "plandateStr", dateTime: o.plandate, onChange: this.handleChange}), 
		      React.createElement("br", null), 
	    React.createElement(AMR_Input, {id: "morning", name: "morning", type: "textarea", rows: "2", label: "早上:", placeholder: "填写内容", value: o.morning, onChange: this.handleChange}), 
		React.createElement(AMR_Input, {id: "afternoon", name: "afternoon", type: "textarea", rows: "2", label: "下午:", placeholder: "填写内容", value: o.afternoon, onChange: this.handleChange}), 
		      React.createElement("button", {type: "button", onClick: ajax_teachingplan_save, className: "am-btn am-btn-primary"}, "提交")
	 )
	     )
	   )
	   
	   )
);
}
});
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————（首页）今日食谱<绘制>——————————————————————————  
/*
 * 今日食谱绘制;
 * 
 */
var CookbookPlan_showByOneDay = React.createClass({displayName: "CookbookPlan_showByOneDay", 
	group_uuid:null,
	handleClick: function(m,groupuuid) {
		if(m=="pre"){
			group_uuid=groupuuid;
			ajax_cookbookPlan_dayShow(--g_cookbookPlan_listToShow_point,group_uuid);
			 return;
		 }else if(m=="next"){
			 group_uuid=groupuuid;
			 ajax_cookbookPlan_dayShow(++g_cookbookPlan_listToShow_point,group_uuid);
			 return;
		 }
	},
	  handleChange_selectgroup_uuid:function(val){
		  group_uuid=val;
		  ajax_cookbookPlan_dayShow(g_cookbookPlan_listToShow_point,val);
	  },
	render: function() {
	  var o = this.props.formdata;
	  var dataShowDiv=null;
	  if(!o){
		  dataShowDiv=(React.createElement("div", {className: "am-g", id: "div_detail"}, "今日没有发布食谱"))
	  }else{
		  dataShowDiv=(	
	React.createElement("div", {className: "am-g", id: "div_detail"}, 
		React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
				 React.createElement("label", null, "早餐:"), 
				 React.createElement(CookbookPlanShow_EventRow, {uuids: o.list_time_1, type: "time_1"}), 
		         React.createElement("div", {className: "cls"}), 
				 React.createElement("br", null), 
				 React.createElement("label", null, "早上加餐:"), 
				 React.createElement(CookbookPlanShow_EventRow, {uuids: o.list_time_2, type: "time_2"}), 
				 React.createElement("div", {className: "cls"}), 
				 React.createElement("br", null), 
				 React.createElement("label", null, "午餐:"), 
				 React.createElement(CookbookPlanShow_EventRow, {uuids: o.list_time_3, type: "time_3"}), 
				 React.createElement("div", {className: "cls"}), 
				 React.createElement("br", null), 
				 React.createElement("label", null, "下午加餐:"), 
				 React.createElement(CookbookPlanShow_EventRow, {uuids: o.list_time_4, type: "time_4"}), 
				 React.createElement("div", {className: "cls"}), 
				 React.createElement("br", null), 
				 React.createElement("label", null, "晚餐:"), 
				 React.createElement(CookbookPlanShow_EventRow, {uuids: o.list_time_5, type: "time_5"}), 
				 React.createElement("div", {className: "cls"}), 
				 React.createElement("br", null), 
				 React.createElement("label", null, "营养分析:"), 
				 React.createElement("div", {className: "g_analysis"}, 
				 React.createElement("div", {dangerouslySetInnerHTML: {__html:G_textToHTML(o.analysis)}})
				 ), 
			    	React.createElement("footer", {className: "am-comment-footer"}, 
			    	React.createElement("div", {className: "am-comment-actions"}, 
			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"}))
			    	)
			    	), 
			    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 6, btn_dianzan: "btn_dianzan_"+o.uuid}), 
				     
			    	React.createElement(Common_reply_list, {uuid: o.uuid, type: 6, groupuuid: o.groupuuid})
				)
			)
		  )
	  }	
	  return (
		React.createElement("div", null, 
		  React.createElement(AMR_Panel, null, 
		  React.createElement(AMR_ButtonToolbar, null, 

		   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	          React.createElement(AMR_Button, {amStyle: "default", onClick: this.handleClick.bind(this, "pre",this.props.groupuuid)}, "昨天")
		   ), 

		   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	          React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, this.props.ch_day)
		   ), 

		   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	          React.createElement(AMR_Button, {amStyle: "default", onClick: this.handleClick.bind(this, "next",this.props.groupuuid)}, "明天")	
		   )

          )
          ), 
           React.createElement(AMR_ButtonToolbar, null, 
			  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
        	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "group_uuid", btnWidth: "200", onChange: this.handleChange_selectgroup_uuid.bind(this), data: this.props.ch_group, btnStyle: "primary", value:  this.props.groupuuid})
              )
           ), 
		dataShowDiv
	   )
	  );
}
}); 
/*
 * 今日食谱绘制;
 * 介绍页面查询的那一天食谱绘制
 */
var CookbookPlanShow_EventRow = React.createClass({displayName: "CookbookPlanShow_EventRow",
	//第而.//使用list<cookbook>
		componentWillReceiveProps: function(nextProps) {
			 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
			  this.setState({
				  items: lists
			  });
			},
	 getInitialState: function() {
		 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
		    return {
	            items: lists
	        };
		  },
		  //list
	  cookbookPlan_timeStr_to_list:function(cooks){
		  if(!cooks)cooks=[];
		  return cooks;		  
	  },	  
	  render: function() {
	    return (
	    		  React.createElement("div", {id: "div_cookPlan_"+this.props.type}, 
	    		  
	    			  this.state.items.map(function(event) {
	    				  var t_uuid=event.uuid;
	    				  var t_imguuid=event.img;
	    				  var t_name=event.name;
	    					 return (
	     	 	            		React.createElement("div", {id: "div_cookPlan_Item_"+t_uuid, title: t_uuid, className: "G_cookplan_Img"}, 
	    		    	 	       			React.createElement("img", {className: "G_cookplan_Img_img", id: "divCookItem_img_"+t_uuid, src: G_imgPath+t_imguuid, alt: "图片不存在", title: t_name}), 
	    		    	 	       			React.createElement("span", null, t_name)
	    		    	 	       		)		
	     	 	            	);
	    				
	    			 })
	    		  
	    		)		
	   )
	  }
	});
//±±±±±±±±±±±±±±±±±±±±±±±±±±±




//——————————————————————————家长通讯录<绘制>—————————————————————————— 
/*
 * 通讯录学生家长联系详情绘制；
 * @{this.props.formdata.map(function(event)：
 * 封装好的一个MAP方法只对数组起作用，其内部自己For循环;
 * @event:Map方法用event.XX调用数组内 数据；
 * @amStyle:按钮颜色；
 * @parent_uuid:老师给每个用户的ID发message时需要的参数;
 * web页面一键电话功能<a href={"tel:"+event.tel}></a>;
 * @ajax_parentContact_tels:邀请家长服务器请求 在kd_service;
 * */
var Class_student_tel =React.createClass({displayName: "Class_student_tel",
	      handleChange:function(type){
	    	  ajax_parentContactByMyStudent(type);
		  },
	getInitialState: function() {
		return {class_uuid:this.props.class_uuid};
	  },
	  handleChange_selectgroup_uuid:function(){
		  	this.setState({class_uuid:$("input[name='class_uuid']").val()});
		  ajax_parentContactByMyStudent($('#sutdent_name').val(),$("input[name='class_uuid']").val());
	  },
	  handleChange_class_uuid:function(val){
		    	this.setState({class_uuid:val});
		  ajax_parentContactByMyStudent(null,val);
	  },
		render: function() {
	     var o =this.state;	
	     var ListItem;
//	     if(this.props.type==1){
//	    	 ListItem=(				   
//
//	  	     )
//	     }else{
//	    	 ListItem=(				   
//	  	  	       <AMUIReact.List static>
//	  	  			{this.props.invite.map(function(event) {
//	  	  		        return (<AMUIReact.ListItem>{event.student_name}的{event.typename}:{event.tel}
//	  	  		        <AMR_ButtonToolbar>
//	  	  		        <a href={"tel:"+event.tel}><AMUIReact.Button amStyle="disable">电话</AMUIReact.Button>	</a>
//	  	  		        <AMUIReact.Button  onClick={ajax_parentContact_tels.bind(this,event.tel)} amStyle="success">邀请家长</AMUIReact.Button>	  		        
//	  	  		        </AMR_ButtonToolbar>
//	  	  		        </AMUIReact.ListItem>);
//	  	  		      })}		      			      
//	  	  		      </AMUIReact.List>
//	  	     )  <div className="am-margin-left-sm">
//	     }  	    		 
	   	this.props.class_list.unshift({value:"",label:"所有"});
		 return (
		 		React.createElement("div", null, 
			      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
			          React.createElement(AMR_Panel, null, 
	  			  	  React.createElement(AMR_ButtonToolbar, null, 
			    	  React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
			    	  React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "输入孩子姓名"})
			    	  ), 
			    	  React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
			    	  React.createElement("button", {type: "button", onClick: this.handleChange_selectgroup_uuid, className: "am-btn am-btn-secondary"}, "搜索")
			    	  )			    	  			    	 		  
				      )
                      ), 

                    React.createElement(AMR_ButtonToolbar, null, 
 	  			  	 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
			    	  React.createElement(AMUIReact.Selected, {name: "class_uuid", placeholder: "班级选择", onChange: this.handleChange_class_uuid, btnWidth: "200", multiple: false, data: this.props.class_list, btnStyle: "primary", value: this.state.class_uuid})
			    	  )
				    )
						
				), 		        
	  	  	       React.createElement("ul", {className: "am-list am-list-static am-list-border"}, 
	  	  			this.props.formdata.map(function(event) {
	  	  				var ListItem=null;
	  	  				var showName=event.student_name+"的"+event.typename;
	  	  				if(event.isreg==1){
	  	  				ListItem=(
	  	  				React.createElement(AMUIReact.Button, {onClick: ajax_parentContactByMyStudent_message_list.bind(this,event.parent_uuid,showName), amStyle: "success"}, "发信件")	
	  	  					);
	  	  				}else if(event.isreg==0){
	  	  					//<AMR_Button amStyle="success" onClick={ajax_parentContact_tels.bind(this,event.tel)} >邀请家长</AMR_Button>	
		  	  				ListItem=(
		  	  						React.createElement(AMR_Button, {amStyle: "revise"}, "未注册")	
			  	  				);
	  	  				}else if(event.isreg==3){
		  	  				ListItem=(
			  	  					React.createElement(AMR_Button, {amStyle: "revise"}, "邀请中")		
			  	  				);
	  	  				}
	  	  				
	  	  				
	  	  		        return (
	  	  		       React.createElement("li", null, 
	  	  		        showName, ":", event.tel, 
	  	  		        React.createElement(AMR_ButtonToolbar, null, 
	  	  		         React.createElement("a", {href: "tel:"+event.tel}, React.createElement(AMUIReact.Button, {amStyle: "secondary"}, "电话"), " "), 
	  	  		           ListItem
	  	  		          )
	  	  		       ));})		      			      
	  	  		     )	
				  
		 	     ) 
		     );
	        }
		 });
/* 
 * 家长通讯录中的<信息>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @Parent_message_save我要保存模板；
 * */
var ParentContactByMyStudent_message_list = React.createClass({displayName: "ParentContactByMyStudent_message_list", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"classnewsreply_list_div",
	componentWillReceiveProps:function(){
		this.load_more_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");

   		var that=this;
   		var callback=function(re_data){
    			if(!re_data)return;
    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
		var re_data=ajax_message_queryByParent(this.classnewsreply_list_div+this.pageNo,this.props.parent_uuid,this.pageNo,callback);
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (
		  React.createElement("div", null, 
		  React.createElement(Parent_message_save, {parent_React: this, uuid: this.props.parent_uuid}), 
		   React.createElement("div", {id: this.classnewsreply_list_div}		   
		   ), 
			React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多")			
			)

			
  );
}
}); 

/*
 * 我要发信息模块；(家长通讯录发信息)
 * */
var Parent_message_save = React.createClass({displayName: "Parent_message_save", 
	classnewsreply_list_div:"classnewsreply_list_div",
	componentDidMount:function(){
		 var editor=$( '#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);

	},
	reply_save_btn_click:function(){		
		ajax_parent_message_save(this.props.parent_React);
		$("#classnews_content_replay").val("");
	},
render: function() {
  return (
		   React.createElement("form", {id: "editForm", method: "post", className: "am-form"}, 
			React.createElement("input", {type: "hidden", name: "revice_useruuid", value: this.props.uuid}), 			
			  React.createElement(AMR_Input, {id: "classnews_content_replay", type: "textarea", rows: "4", label: "信息发送", placeholder: "填写内容", name: "message"}), 
		      React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this), className: "am-btn am-btn-primary"}, "发送")		      
		    )	   
  );
}
}); 
/* 家长通讯录功能2级发信息界面功能
 * @ 绘制 信息 <div dangerouslySetInnerHTML={{ __html: o.message}} ></div >
 * */
var Message_queryByParent_listpage =React.createClass({displayName: "Message_queryByParent_listpage",	 
	render: function() {
		var parent_uuid=this.props.parent_uuid;
	  return (		  			  
			  React.createElement("ul", {className: "am-comments-list "}, 
			  this.props.events.data.map(function(event) {
				  var class1="am-comment am-comment-flip am-comment-secondary";
				  if(parent_uuid==event.send_useruuid){
					  class1="am-comment";
				  }
			      return (
			    		  React.createElement("li", {className: class1}, 
			    		  	React.createElement("a", {href: "javascript:void(0);"}, 
			    		  	 React.createElement("img", {src: G_getHeadImg(event.send_userimg), alt: "", className: "am-comment-avatar", width: "48", height: "48"})
			    		  		), 
			    		  		 React.createElement("div", {className: "am-comment-main"}, 
			    		  		 React.createElement("header", {className: "am-comment-hd"}, 
			    		  	      React.createElement("div", {className: "am-comment-meta"}, 
			    		  	        React.createElement("a", {href: "#link-to-user", className: "am-comment-author"}, event.send_user), 
			    		  	        "发送于 ", React.createElement("time", null, event.create_time)
			    		  	      )
			    		  	    ), 
			    		  	  React.createElement("div", {className: "am-comment-bd"}, 
			    		  	 React.createElement("div", {dangerouslySetInnerHTML: {__html:event.message}})
			    		  	 )
			    		  	    )
						  )
						  )
			  })			  
			)			 
	  );
	}
})
//±±±±±±±±±±±±±±±±±±±±±±±±±±±


//			      <div dangerouslySetInnerHTML={{ __html: event.send_user}} ></div >
//			      :
//			      <div dangerouslySetInnerHTML={{ __html: event.message}} ></div >





//——————————————————————————精品文章<绘制>—————————————————————  

/* 
 * <精品文章>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @btn_click_announce:点击按钮事件跳转kd_servise方法;
 * */
var Announcements_good_Div_list = React.createClass({displayName: "Announcements_good_Div_list", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps:function(){
		this.load_more_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
   		var that=this;
   		var callback=function(re_data){
    			if(!re_data)return;
    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
	var re_data=ajax_announce_Mygoodlist(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
	//创建精品文章点击按钮事件跳转kd_servise方法;
  	handleClick: function(m,groupuuid) {
		  btnclick_good_announce(m,Store.getCurGroup().uuid);
},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 

		   React.createElement(AMR_ButtonToolbar, null, 
		    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "add",this.props.groupuuid)}, "创建精品文章")
		    ), 
		    
		    
		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-news-bd"}		   		    
		  ), 
		  
		  React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		  )
		  
		  
		  
		)
		  
			
  );
}
});



  
  
/*
 *<精品文章>表格内容绘制
 * 在kd_react；
 * */
var Announcements_mygoodlist_div = React.createClass({displayName: "Announcements_mygoodlist_div", 
	  render: function() {
	    var events = this.props.events;
	    var className = events.highlight ? 'am-active' :
    events.disabled ? 'am-disabled' : '';
				//如果相等为True不等为false用于判断编辑与删除是否
				for(var i=0;i<events.data.length;i++){
					if(events.data[i].create_useruuid==Store.getUserinfo().uuid){
						events.data[i].canEdit=true;
					}else{
                      events.data[i].canEdit=false;
					}
				} 
	    return (
	    	     React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
	    	     React.createElement("div", {className: "am-list-news-bd"}, 
	    	     React.createElement("ul", {className: "am-list"}, 
	    			  this.props.events.data.map(function(event) {
	    			      return (
	    			    		React.createElement("li", {className: "am-g am-list-item-dated"}, 
	    			  		    React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: react_ajax_announce_good_show.bind(this,event.uuid,event.title)}, 
	    			  		  event.title
	    			  		  ), 	
								   React.createElement(AMR_ButtonToolbar, null, 
							  React.createElement(AMR_Button, {className: event.canEdit==true?"G_Edit_show":"G_Edit_hide", amStyle: "primary", onClick: btnclick_good_announce.bind(this, "edit",event.groupuuid,event.uuid)}, "编辑"), 
		                      React.createElement(AMR_Button, {className: event.canEdit==true?"G_Edit_show":"G_Edit_hide", amStyle: "danger", onClick: btnclick_good_announce.bind(this, "del",event.groupuuid,event.uuid)}, "删除")
           		              ), 
	    			  		  React.createElement("div", {className: "am-list-item-text"}, 
	    			  		  Store.getGroupNameByUuid(event.groupuuid), "|", event.create_user, "|", event.create_time
	    			  		  )
	    			  		    )
	    			    		  )
	    			         })	
	    			  )
	    			  )
	    	    )  		  
	    	  );
}
}); 



/*
*公告点赞、评论、加载更多等详情绘制模板；
* */
var Announcements_goodshow = React.createClass({displayName: "Announcements_goodshow", 
	getInitialState: function() {
		this.props.data.isFavor=this.props.isFavor;
		if(this.props.data)return this.props.data;
	  },
	//创建精品文章点击按钮事件跳转kd_servise方法;
  	handleClick: function(m,groupuuid,uuid) {
		  btnclick_good_announce(m,groupuuid,uuid);
}, 
//收藏按钮方法;
	  favorites_push: function(obj) {
		  if(obj.isFavor==false)return;
		  var url=obj.url;
		   obj.isFavor=false;
		  this.setState(obj);
		commons_ajax_favorites_push(obj.title,obj.type,obj.uuid,url)
	  },
render: function() {
	  var obj=this.state;


	  var edit_btn_className="G_Edit_hide";
	  if(this.props.canEdit){
		  edit_btn_className="G_Edit_show";
	  }
      var iframe=null;
	     if(obj.url){
	       iframe=(React.createElement("iframe", {id: "t_iframe", onLoad: G_iFrameHeight.bind(this,'t_iframe'), frameborder: "0", scrolling: "auto", marginheight: "0", marginwidth: "0", width: "100%", height: "600px", src: obj.url}))	   
	        }else{
	     iframe=(       
			React.createElement(AMUIReact.Article, {
			title: obj.title, 
			meta: Vo.announce_type(obj.type)+" | "+Store.getGroupNameByUuid(obj.groupuuid)+" | "+obj.create_time+ "|阅读"+ this.props.count+"次"}, 
			React.createElement("div", {dangerouslySetInnerHTML: {__html: obj.message}})
			))
	     }

return ( 
		  React.createElement("div", {className: "px_margin_div"}, 
            iframe, 
		     React.createElement(AMR_ButtonToolbar, null, 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick.bind(this, "edit",obj.groupuuid,obj.uuid)}, "编辑"), 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "danger", onClick: this.handleClick.bind(this, "del",obj.groupuuid,obj.uuid)}, "删除")
		     ), 	
		    	React.createElement("footer", {className: "am-comment-footer"}, 
		    	React.createElement("div", {className: "am-comment-actions"}, 
		    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+obj.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
				React.createElement("a", {href: "javascript:void(0);", onClick: this.favorites_push.bind(this,obj)}, React.createElement("i", {className: obj.isFavor?"am-icon-heart px_font_size_click":"am-icon-heart px-icon-hasdianzan px_font_size_click"}), obj.isFavor?"收藏":"已收藏"), 	  
				React.createElement("a", {href: "javascript:void(0);", onClick: G_CallPhoneFN.setShareContent.bind(this,obj.title,obj.title,null,this.props.share_url)}, React.createElement("i", {className: G_CallPhoneFN.canShareUrl()?"am-icon-share-alt px_font_size_click":"am-hide"})), 
		    	React.createElement(G_check_disable_div_byRight, {type: obj.type, uuid: obj.uuid, status: obj.status, groupuuid: obj.groupuuid, add_class: "am-fr"}), 
			 React.createElement("a", {href: "javascript:void(0);", className: "am-fr", onClick: common_check_illegal.bind(this,obj.type,obj.uuid)}, React.createElement("i", {className: "am-icon-exclamation-circle px_font_size_click"}), "举报")
				
			 )
		    	), 
		    	React.createElement(Common_Dianzan_show_noAction, {uuid: obj.uuid, type: obj.type, btn_dianzan: "btn_dianzan_"+obj.uuid}), 
			  React.createElement(Common_reply_list, {uuid: obj.uuid, type: obj.type, groupuuid: obj.groupuuid})			 
		   )
);
}
}); 


 /*
 * (精品文章)创建与编辑界面绘制；
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * */    
var Announcements_goodedit = React.createClass({displayName: "Announcements_goodedit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },

	 handleChange_url_cb:function(url_title){
			this.state.title=url_title;
			this.setState(this.state);
	  },
	handleChange_url:function(){
	    var tmp=$('#editAnnouncementsForm').serializeJson();
		    this.setState(tmp);
		var thit=this;		 
	   G_getHtmlTitle(tmp.url,function(url_title){thit.handleChange_url_cb(url_title)});
		
	},
	 handleChange: function(event) {
			
		    this.setState($('#editAnnouncementsForm').serializeJson());
	  },
	  componentDidMount:function(){
	   var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
	     this.editor=editor;
          w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
          });
	  },
		   preview_fn:function(){
          G_html_preview("t_iframe", this.state.url,this.editor.getSource(),this.state.title);
       }, 
bg_Class_fn:function(){
     var that=this;
     var editor=this.editor;
     var callback=function(imgArr){
		 
          for(var i=0;i<imgArr.length;i++){
           editor.pasteHTML( '<img width="100%"   src="'+imgArr[i].src+'"/>')
          }          
     }
         KDClassNewPhotoItem.queryForSelect(this.state.groupuuid,null,1,callback);

  },
render: function() {
	 var o = this.state;
	
  return (
  		React.createElement("div", null, 
  		React.createElement("div", {className: "header"}, 
  		  React.createElement("hr", null)
  		), 
  		React.createElement("div", {className: "am-g"}, 
  		  React.createElement("div", {className: "am-u-lg-6 am-u-sm-12"}, 
  		  React.createElement("form", {id: "editAnnouncementsForm", method: "post", className: "am-form"}, 
  		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
  		React.createElement("input", {type: "hidden", name: "isimportant", value: o.isimportant}), 
	    React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
  		React.createElement("div", {className: "am-form-group"}, 
  	  React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid})		          
        ), 
  
  		  React.createElement("label", {htmlFor: "name"}, "标题:"), 
  		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxLength: "128", placeholder: "不超过128字"}), 
  		  React.createElement("br", null), 
  		  React.createElement("label", {htmlFor: "name"}, "分享链接(链接和内容选填一个):"), 
  		  React.createElement("input", {type: "text", name: "url", id: "url", value: o.url, onChange: this.handleChange_url, maxLength: "256", placeholder: "可直接使用外部内容的链接地址显示"}), 
  		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
 	        React.createElement("label", null, "班级相册图片："), 
            React.createElement(AMR_ButtonToolbar, null, 
            React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.bg_Class_fn.bind(this)}, "浏览...")
            ), 
		  G_get_upload_img_Div(), 
  		  React.createElement("button", {type: "button", onClick: ajax_good_save, className: "am-btn am-btn-primary"}, "提交"), 
			    React.createElement("button", {type: "button", onClick: this.preview_fn.bind(this), className: "am-btn am-btn-primary"}, "预览")
  		  )
  	     ), 

		React.createElement("div", {className: "am-u-lg-6 am-u-sm-12 "}, 
               React.createElement(G_phone_iframe, null)
             )
  	   )	   
  	  )
  );
}
}); 
//±±±±±±±±±±±±±±±±±±±±±±±±±±±



//——————————————————————————我的班级<绘制>—————————————————————————— 
/*
* 我的班级 show绘制2级界面班级选择绘制；
* @show老师查看状态进入查看学生详情;
* @Class_students_show（kd_service中服务器请求时调用）;
* */
var Class_students_show= React.createClass({displayName: "Class_students_show",
	 getDefaultProps: function() {
	 var data = [
	            {value: 'addclass', label: '添加班级 '},
	            {value: 'edit_class', label: '编辑班级'},
	            {value: 'delete', label: '删除空班级'}
	          ];
	 var data2=G_selected_dataModelArray_byArray(Vo.getTypeList("exportStudentExcel"),"desc","val");
	    return {
	       down_list: data,
           down_list2: data2
	    };
	  },
	 componentDidMount:function(){
			 G_img_down404();
	  },
	  handleChange_selectgroup_uuid:function(val){
		  react_ajax_class_students_manage(val,"show");
	  },
	  handleClick:function(m,groupuuid,uuid){
		  btn_click_class_list(m,groupuuid,uuid); 			
	  },
      handleClick_down:function(groupuuid,uuid,val){
		  //更多操作按钮处理方法
		  btn_click_class_list(val,groupuuid,uuid);
	  },
      handleClick_download: function(xlsname) {
		  var class_uuid=$("input[name='class_uuid']").val();
		  ajax_flowername_download_byRight("",class_uuid,xlsname);
      },
	  showTeachingplanClick:function(classuuid){
		  G_myCurClassuuid=classuuid;
		  menu_teachingplan_dayShow_fn();
	  },
	render: function() {
		var o=this.props.formdata;
		if(!o)o="";
		var stutent_num=this.props.stutent_num;
		if(!this.props.students)this.props.students=[];
	  return (
           
	  React.createElement("div", null, 
       React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list24}), 

	     React.createElement(AMR_Panel, null, 
		  React.createElement(AMR_ButtonToolbar, null, 
		  	  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.showTeachingplanClick.bind(this,o.uuid,o.name)}, "查看课程"), 
		  	  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,"addstudent",o.groupuuid,o.uuid)}, "添加学生")
             )
            ), 
		  
		 React.createElement(AMR_ButtonToolbar, null, 
	  		 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
		  	 React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "class_uuid", onChange: this.handleChange_selectgroup_uuid.bind(this), btnWidth: "200", data: this.props.classList, btnStyle: "primary", value: o.uuid})
		  	 ), 
		    
		     React.createElement("div", {className: "am-fl am-hide-sm am-margin-bottom-sm am-margin-left-xs"}, 
     	     React.createElement(AMUIReact.Selected, {btnStyle: "secondary", placeholder: "请在电脑上导出", onChange: this.handleClick_download, btnWidth: "200", multiple: false, data: this.props.down_list2})
     	     ), 
		  	
			 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
	  	     React.createElement(AMUIReact.Selected, {btnStyle: "secondary", placeholder: "更多操作", onChange: this.handleClick_down.bind(this,o.groupuuid,o.uuid), btnWidth: "200", multiple: false, data: this.props.down_list})
		  	 )		 
          ), 
  		  
			React.createElement(AMR_Panel, null, 
  			  React.createElement(AMR_Grid, {className: "doc-g"}, 
  			  React.createElement(AMR_Col, {className: "am-hide-sm", sm: 6, md: 3}, " 学校:", Store.getGroupNameByUuid(o.groupuuid)), 
			    React.createElement(AMR_Col, {className: "am-hide-sm", sm: 6, md: 3}, " 班级:", o.name), 
			    React.createElement(AMR_Col, {sm: 5, md: 2}, "班主任:", o.headTeacher_name), 
			    React.createElement(AMR_Col, {sm: 4, md: 2}, "老师:", o.teacher_name), 
			    React.createElement(AMR_Col, {sm: 3, md: 2}, "人数:", this.props.students.length)
  			  )
  		  ), 

		  
		 React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
			  React.createElement("th", null, "头像"), 
              React.createElement("th", null, "姓名"), 
              React.createElement("th", null, "性别"), 
              React.createElement("th", null, "出生日期"), 
			  React.createElement("th", null, "身份证"), 
              React.createElement("th", null, "妈妈电话"), 
              React.createElement("th", null, "爸爸电话")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.students.map(function(event) {
              return (React.createElement(Query_class_Students_EventRow, {key: event.id, event: event}));
            })
          )
        )
	  )
	  );
	}
	});

 /*  	
   * 我的班级-学生列表在表单上绘制详细内容;
   * @点击后直接调用学生详情方法
   * 调用ajax_class_students_edit_byRight
   * */
  var Query_class_Students_EventRow = React.createClass({displayName: "Query_class_Students_EventRow", 
  	  render: function() {
  	    var event = this.props.event;
	  var header_img=event.headimg;
	  if(!header_img)header_img=G_def_noImgPath;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';
  	    return (
  	      React.createElement("tr", {className: className}, 
			React.createElement("td", null, " ", React.createElement(AMUIReact.Image, {id: "img_head_image", width: "28", height: "28", src: header_img})), 
			React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: G_class_students_look_info.bind(this,event.uuid,1,2)}, event.name)), 			
  	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
  	        React.createElement("td", null, event.birthday), 
  	        React.createElement("td", null, event.idcard), 
		     React.createElement("td", null, React.createElement("a", {className: event.ma_tel?"":"am-hide", href: "tel:"+event.ma_tel}, event.ma_tel)), 
            React.createElement("td", null, React.createElement("a", {className: event.ba_tel?"":"am-hide", href: "tel:"+event.ba_tel}, event.ba_tel))
  	      ) 
  	    );
  	  }
  	});  

/*
* <我的班级>班级添加详情绘制
* @ajax_class_save：提交按钮在Kd_service;
* */	
var AMR_Grid=AMUIReact.Grid;
var AMR_Col=AMUIReact.Col;
  var Class_edit = React.createClass({displayName: "Class_edit", 
  	 getInitialState: function() {
  		    return this.props.formdata;
  		  },
  	 handleChange: function(event) {
  		 
  		 if(event==G_group_wjd){
  			 $('#help1_span').show();
  		 }else{
  			 $('#help1_span').hide();
  		 }
  		    this.setState($('#editClassForm').serializeJson());
  	  },
  render: function() {
  	  var o = this.state;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  React.createElement("form", {id: "editClassForm", method: "post", className: "am-form"}, 
    		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
    		    React.createElement("div", {className: "am-form-group"}, 
		       React.createElement(AMR_ButtonToolbar, null, 
    		  React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid}), 
	          React.createElement(G_help_popo, {msg: G_tip.class_edit})
		       ), 
    		  React.createElement("br", null), 
    		  React.createElement("span", {id: "help1_span"}, G_tip.class_edit_groupwjd)
    		  ), 		    
    		      React.createElement("label", {htmlFor: "name"}, "班级:"), 
    		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过45字！"}), 
    		      React.createElement("br", null), 		   
  		      React.createElement("label", {htmlFor: "name"}, "班主任:"), 
  	  		    React.createElement("input", {type: "hidden", name: "headTeacher", id: "headTeacher", value: o.headTeacher, onChange: this.handleChange}), 
  			      React.createElement("input", {type: "text", id: "headTeacher_name", value: o.headTeacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"headTeacher","headTeacher_name",o.groupuuid), placeholder: ""}), 
  			      React.createElement("br", null), 
  			      React.createElement("label", {htmlFor: "name"}, "老师:"), 
  		  		    React.createElement("input", {type: "hidden", name: "teacher", id: "teacher", value: o.teacher, onChange: this.handleChange}), 
  				      React.createElement("input", {type: "text", id: "teacher_name", value: o.teacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"teacher","teacher_name",o.groupuuid), placeholder: ""}), 
  				      React.createElement("br", null), 
    		      React.createElement("button", {type: "button", onClick: ajax_class_save, className: "am-btn am-btn-primary"}, "提交")
    		    )
    	     )
    	   )	    	   
    	   )
    );
  }
 }); 


//一键拨号公用是否显示组件
var Class_student_Tel_ListItem =React.createClass({displayName: "Class_student_Tel_ListItem",
	 getDefaultProps: function() {
		    return {
		      name: "",
		      tel:""
		    };
		  },
		render: function() {
	    
		 return (
				 React.createElement(AMUIReact.ListItem, null, this.props.name, ":", this.props.tel, React.createElement("a", {className: this.props.tel?"":"am-hide", href: "tel:"+this.props.tel}, React.createElement(AMUIReact.Button, {amStyle: "success"}, "电话")))
		     );
	        }
		 });


/*
 * <我的班级>添加学生详情界面
 * */
  var Mycalss_student_edit = React.createClass({displayName: "Mycalss_student_edit", 
  	 getInitialState: function() {
  		    return this.props.formdata;
  		  },
  	 handleChange: function(event) {
  		    this.setState($('#editClassStudentForm').serializeJson());
  	  },
  	  componentDidMount:function(){
  		  var imgGuid=this.state.headimg;
  		  
  		  
  		 if(imgGuid){
  			 $("#img_head_image").attr("src",G_imgPath+imgGuid); 
  			 G_img_down404("#img_head_image");
  		 }
  	  },
  	/*
  	 * （标头）<我的班级>图片上传功能
  	 * */
  	 btn_class_student_uploadHeadere:function(){
  		w_uploadImg.open(function(guid){
  			$("#headimg").val(guid);
  			 $("#img_head_image").attr("src",G_imgPath+guid); 
  			 G_img_down404("#img_head_image");
  		});	
  	},
  render: function() {
  	  var o = this.state;

	  var calss_btn_className="G_Edit_show am-btn am-btn-secondary";
	  if(!o.uuid){
		  calss_btn_className="G_Edit_hide";
	  }

  	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
  	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
	  if(!o.status)o.status=0;
   return (
		   React.createElement("form", {id: "editClassStudentForm", method: "post", className: "am-form"}, 
	    React.createElement(AMR_ButtonToolbar, null, 
				   React.createElement("button", {type: "button", className: calss_btn_className, onClick: btn_ajax_student_changeClass_byRight.bind(this,o.groupuuid,o.uuid)}, "换班级")
			 	
			 ), 

		   React.createElement(PxInput, {type: "hidden", name: "headimg", id: "headimg", value: o.headimg, onChange: this.handleChange}), 
			React.createElement(PxInput, {type: "hidden", name: "uuid", value: o.uuid}), 
		     React.createElement(PxInput, {type: "hidden", name: "classuuid", value: o.classuuid}), 
		   React.createElement("div", {className: "am-form-group"}, 
			
		    React.createElement("hr", null), 
             React.createElement("div", null, 
  		     React.createElement(AMUIReact.Image, {id: "img_head_image", src: G_def_headImgPath, className: "G_img_header"}), 
  		      React.createElement("button", {type: "button", onClick: this.btn_class_student_uploadHeadere, className: "am-btn am-btn-secondary"}, "上传头像")	      
   		     ), 
 	       React.createElement("label", {className: one_classDiv}, "姓名"), 
   		     React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {icon: "user", type: "text", name: "name", id: "name", maxLength: "20", value: o.name, onChange: this.handleChange})
		        ), 
		       React.createElement("label", {className: one_classDiv}, "昵称"), 
	   		  React.createElement("div", {className: two_classDiv}, 
   		     React.createElement(PxInput, {icon: "user-secret", type: "text", maxLength: "20", name: "nickname", id: "nickname", value: o.nickname, onChange: this.handleChange})
   		    ), 
                React.createElement("label", {className: one_classDiv}, "单选:"), 
		        React.createElement("div", {className: two_classDiv}, 
		        React.createElement(AMUIReact.FormGroup, null, 
 	            React.createElement(PxInput, {type: "radio", name: "sex", value: "0", label: Vo.get("sex_0"), inline: true, onChange: this.handleChange, checked: o.sex==0?"checked":""}), 
 	            React.createElement(PxInput, {type: "radio", name: "sex", value: "1", label: Vo.get("sex_1"), inline: true, onChange: this.handleChange, checked: o.sex==1?"checked":""})
		        )
		        ), 
   		     React.createElement("label", {className: one_classDiv}, "出生日期"), 
  		      React.createElement("div", {className: two_classDiv}, 
  		       React.createElement(PxInput, {icon: "birthday-cake", type: "text", maxLength: "10", placeholder: "YYYY-MM-DD", name: "birthday", id: "birthday", value: o.birthday, onChange: this.handleChange})
		        ), 
		       React.createElement("label", {className: one_classDiv}, "身份证"), 
			  React.createElement("div", {className: two_classDiv}, 
			 React.createElement(PxInput, {type: "text", name: "idcard", id: "idcard", value: o.idcard, onChange: this.handleChange, placeholder: ""})
		    ), 
			React.createElement(AMUIReact.Selected, {name: "status", onChange: this.handleChange, btnWidth: "200", data: G_status().data_list, btnStyle: "primary", value: o.status+""}), 	
		    React.createElement("fieldset", null, 
		    React.createElement("legend", null, "爸爸妈妈信息"), 
	        React.createElement("label", {className: one_classDiv}, "妈妈姓名"), 
	         React.createElement("div", {className: two_classDiv}, 
	          React.createElement(PxInput, {icon: "user", type: "text", name: "ma_name", id: "ma_name", size: "10", maxLength: "45", value: o.ma_name, onChange: this.handleChange})
	           ), 
	          React.createElement("label", {className: one_classDiv}, "妈妈电话"), 
		     React.createElement("div", {className: two_classDiv}, 
		    React.createElement(PxInput, {icon: "mobile", type: "text", name: "ma_tel", id: "ma_tel", value: o.ma_tel, onChange: this.handleChange})
	       ), 
	        React.createElement("label", {className: one_classDiv}, "妈妈工作"), 
	         React.createElement("div", {className: two_classDiv}, 
		      React.createElement(PxInput, {type: "text", name: "ma_work", id: "ma_work", value: o.ma_work, onChange: this.handleChange})
	           ), 
	          React.createElement("label", {className: one_classDiv}, "爸爸姓名"), 
		     React.createElement("div", {className: two_classDiv}, 
		    React.createElement(PxInput, {icon: "user", type: "text", name: "ba_name", id: "ba_name", size: "10", maxLength: "45", value: o.ba_name, onChange: this.handleChange})
	       ), 
	        React.createElement("label", {className: one_classDiv}, "爸爸电话"), 
	         React.createElement("div", {className: two_classDiv}, 
		      React.createElement(PxInput, {icon: "mobile", type: "text", name: "ba_tel", id: "ba_tel", value: o.ba_tel, onChange: this.handleChange, placeholder: ""})
	           ), 
	          React.createElement("label", {className: one_classDiv}, "爸爸工作"), 
		     React.createElement("div", {className: two_classDiv}, 
		    React.createElement(PxInput, {type: "text", name: "ba_work", id: "ba_work", value: o.ba_work, onChange: this.handleChange, placeholder: ""})
	       ), 
	        React.createElement("label", {className: one_classDiv}, "家庭住址"), 
	         React.createElement("div", {className: two_classDiv}, 
		      React.createElement(PxInput, {icon: "home", type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: ""})
	           )		    
		      ), 		    		      


      React.createElement("div", {className: "am-panel am-panel-default"}, 
        React.createElement("div", {className: "am-panel-hd"}, 
        React.createElement("h4", {className: "am-panel-title", "data-am-collapse": "{parent: '#accordion', target: '#do-not-say-"+o.uuid+"'}"}, 
           "填写更多信息"
          )
        ), 
        React.createElement("div", {id: "do-not-say-"+o.uuid, className: "am-panel-collapse am-collapse"}, 
          React.createElement("div", {className: "am-panel-bd"}, 

		        React.createElement("label", {className: one_classDiv}, "奶奶电话"), 
		         React.createElement("div", {className: two_classDiv}, 
			      React.createElement(PxInput, {icon: "mobile", type: "text", name: "nai_tel", id: "nai_tel", value: o.nai_tel, onChange: this.handleChange, placeholder: ""})
		           ), 
		          React.createElement("label", {className: one_classDiv}, "爷爷电话"), 
			     React.createElement("div", {className: two_classDiv}, 
			    React.createElement(PxInput, {icon: "mobile", type: "text", name: "ye_tel", id: "ye_tel", value: o.ye_tel, onChange: this.handleChange, placeholder: ""})
		       ), 
		        React.createElement("label", {className: one_classDiv}, "外婆电话"), 
		         React.createElement("div", {className: two_classDiv}, 
			      React.createElement(PxInput, {icon: "mobile", type: "text", name: "waipo_tel", id: "waipo_tel", value: o.waipo_tel, onChange: this.handleChange, placeholder: ""})
		           ), 
		          React.createElement("label", {className: one_classDiv}, "外公电话"), 
			     React.createElement("div", {className: two_classDiv}, 
			    React.createElement(PxInput, {icon: "mobile", type: "text", name: "waigong_tel", id: "waigong_tel", value: o.waigong_tel, onChange: this.handleChange, placeholder: ""})
		       ), 
		        React.createElement("label", {className: one_classDiv}, "其他电话"), 
		         React.createElement("div", {className: two_classDiv}, 
			      React.createElement(PxInput, {icon: "phone", type: "text", name: "other_tel", id: "other_tel", value: o.other_tel, onChange: this.handleChange, placeholder: ""})
		           ), 
		 		   React.createElement(AMUIReact.Input, {type: "textarea", 
			 	 	      label: "说明", 
			 	 	    	 name: "note", 
			 	 	      labelClassName: "am-u-sm-2", 
			 	 	      placeholder: "备注", 
			 	 	      wrapperClassName: "am-u-sm-10", 
			 	 	      amSize: "lg"})

                        
						  )
						)
					  ), 

 

				      React.createElement("button", {type: "button", onClick: btn_ajax_myclass_student_save, className: "am-btn am-btn-primary"}, "提交")		      
   		           )
   		          ) 	   		          
               );
               }
  });
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//老师通讯录无分页废弃代码
//var Teacher_info_tel = React.createClass({
//  handleChange_selectgroup_uuid:function(val){
//	  ajax_Teacher_listByGroup($("input[name='group_uuid']").val(),$('#sutdent_name').val());
//  },
//render: function() {
//return (
//<div>   
//  <div className="am-form-group">
//  <hr/>
//    </div>
//      <form id="editGroupForm" method="post" className="am-form">
//      <AMR_ButtonToolbar className="am-cf am-margin-bottom-sm am-margin-left-xs">
//      <div className="am-fl am-margin-bottom-sm">
//	  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />
//	  </div>
//	  <div className="am-fl am-margin-bottom-sm am-margin-left-xs">
//	  <input type="text" name="sutdent_name" id="sutdent_name" placeholder="输入老师姓名"/>
//	  </div>
//	  <div className="am-fl am-margin-bottom-sm am-margin-left-xs">
//	  <button type="button"  onClick={this.handleChange_selectgroup_uuid}  className="am-btn am-btn-primary">搜索</button>		  		  
//	  </div>
//	  </AMR_ButtonToolbar>
//	  </form>      
//
//  
//  <AMR_Table {...this.props}>  
//    <thead> 
//      <tr>
//        <th>姓名</th>
//        <th>电话</th>
//        <th>职位</th>
//        <th>邮箱</th>
//        <th>性别</th>
//        <th>状态</th>
//      </tr> 
//    </thead>
//    <tbody>
//      {this.props.events.map(function(event) {
//        return (<Teacherinfo_EventRow key={event.id} event={event} />);
//      })}
//    </tbody>
//  </AMR_Table>
//  </div>
//);
//}
//});
///*
//* 老师通讯录表单详情内容绘制;
//* 一键拨号
//* 暂时添加点击事件 后续还未开发； 
//* */
//var Teacherinfo_EventRow = React.createClass({ 
//  render: function() {
//    var event = this.props.event;
//    var className = event.highlight ? 'am-active' :
//      event.disabled ? 'am-disabled' : '';
//
//    return (
//      <tr className={className} >
//        <td><a href="javascript:void(0);" onClick={""}>{event.name}</a></td>
//        <td>{event.tel} <a href={"tel:"+event.tel}><AMUIReact.Button amStyle="success">电话</AMUIReact.Button></a></td>
//        <td>{event.office}</td>
//        <td>{event.email}</td>
//        <td>{event.sex=="0"?"男":"女"}</td>
//        <td  className={"px_disable_"+event.disable}>{Vo.get("disable_"+event.disable)}</td>
//        </tr> 
//    );
//  }
//}); 
//——————————————————————————老师通讯录<绘制>——————————————————————————  
  
/*
*老师通讯录绘制舞台再请求数据方法；
* @</select>下拉多选框;
* */
var Announcements_Teacher_tel_div = React.createClass({displayName: "Announcements_Teacher_tel_div", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps:function(){
		this.load_more_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo   list_div,groupuuid,name,pageNo
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){ 
		this.setState({groupuuid:$("input[name='group_uuid']").val()});
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");

   		var that=this;
   		var callback=function(re_data){
    			if(!re_data)return;
    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
		var re_data=ajax_Teacher_tel_list(this.classnewsreply_list_div+this.pageNo,$("input[name='group_uuid']").val(),$('#sutdent_name').val(),this.pageNo,callback);
	},
		 getInitialState: function() {
		return {groupuuid:this.props.groupuuid};
	  },
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
	//	this.forceUpdate();
			
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 

	      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
          React.createElement(AMR_Panel, null, 
	      React.createElement(AMR_ButtonToolbar, null, 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "输入老师姓名"})
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("button", {type: "button", onClick: this.refresh_data.bind(this), className: "am-btn am-btn-secondary"}, "搜索")		  		  
		  )
		  )
          )
		  ), 
		  
		  React.createElement(AMR_ButtonToolbar, null, 
		   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		   React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.refresh_data.bind(this), btnWidth: "200", data: this.props.group_list, btnStyle: "primary", value: this.state.groupuuid})
		   )
		  ), 

		 
		    React.createElement("div", {id: this.classnewsreply_list_div}
			  ), 
	
		  
		  React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		  )		  
		)
		
			
  );
}
});

/*
* 老师通讯录表单详情内容绘制;
* 一键拨号
* */
var Teacher_info_tel = React.createClass({displayName: "Teacher_info_tel", 
	  render: function() {
	    var event = this.props.events;
	    var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';
	    return (
	    		  React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 		   	
		          React.createElement("tr", null, 
		            React.createElement("th", null, "姓名"), 
		            React.createElement("th", null, "电话"), 
		            React.createElement("th", null, "职位"), 
		            React.createElement("th", null, "邮箱"), 
		            React.createElement("th", null, "性别"), 
		            React.createElement("th", null, "状态")
		          ), 			 
	    			  this.props.events.map(function(event) {
	    			      return (
	    					      React.createElement("tr", {className: className}, 
	    					        React.createElement("td", null, event.name), 
	    					        React.createElement("td", null, event.tel, " ", React.createElement("a", {href: "tel:"+event.tel}, React.createElement(AMUIReact.Button, {amStyle: "secondary"}, "电话"))), 
	    					        React.createElement("td", null, event.office), 
	    					        React.createElement("td", null, event.email), 
	    					        React.createElement("td", null, Vo.get("sex_"+event.sex)), 
	    					        React.createElement("td", {className: "px_disable_"+event.disable}, Vo.get("disable_"+event.disable))
	    					        ) 
	    			    		  )
	    			         })	
	    			  )		  
	    	  );
}
}); 
//±±±±±±±±±±±±±±±±±±±±±±±±±±±






//——————————————————————————我的收藏<绘制>—————————————————————  

/* 
 * <我的收藏>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @btn_click_announce:点击按钮事件跳转kd_servise方法;
 * */
var rect_favorites_Div_list = React.createClass({displayName: "rect_favorites_Div_list", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps:function(){
		this.load_more_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
   		var that=this;
   		var callback=function(re_data){
    			if(!re_data)return;
    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
      var re_data=ajax_favorites_list(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 

		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-news-bd"}		   		    
		  ), 
		  React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		  )
		)
		  
			
  );
}
});

/*
 *<我的收藏>表格内容绘制
 * 在kd_react；
 * */
var favorites_list_div = React.createClass({displayName: "favorites_list_div", 
	  render: function() {
	    var event = this.props.events;
	    var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
     React.createElement("ul", {className: "am-list"}, 
		  this.props.events.data.map(function(event) {
		      return (
		    		React.createElement("li", {className: "am-g am-list-item-desced"}, 
		  		      React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: react_ajax_favorites_show.bind(this,event.type,event.reluuid)}, Vo.announce_type(event.type)), 		  		        
		  		      React.createElement("div", {className: "am-list-item-text"}, event.title), 
		  		      React.createElement("div", {className: "am-list-date"}, event.createtime, 
		  		      React.createElement("br", null), 
		  		      event.show_name
		  		      )
		  		      )
		    		  )
		         })		
    )  		  
  );
}
}); 

//±±±±±±±±±±±±±±±±±±±±±±±±±±±




//——————————————————————————我的信箱<绘制>——————————————————————————        
/*
 * <我的信箱>一层界面绘制;
 * @send_user:家长名字；
 * @revice_useruuid:收件人ID；
 * @send_useruuid:发送者ID；
 * @ajax_boss_message_list绑定事件然后开始绘制舞台；
 * */
var My_student_tel =React.createClass({displayName: "My_student_tel",
		render: function() {
	     var o =this.state;	
		 return (
		 		React.createElement("div", null, 
			    React.createElement(AMUIReact.List, {static: true}, 
		    	this.props.formdata.map(function(event) {
		            return (
		            		
		            		React.createElement(AMUIReact.ListItem, null, 
		            React.createElement("span", {className: "am-comment-author"}, event.send_user, " "), "家长来信", event.count, "条,最后来信时间:", event.last_time, 
		            React.createElement(AMR_ButtonToolbar, null, 		            
		            React.createElement(AMUIReact.Button, {onClick: ajax_parentContactByMyStudent_message_list.bind(this,event.send_useruuid,"我的信箱"), amStyle: "success"}, "@回复")
		            )	        
		            ));
		          })		      			      
			      )
		 	     ) 
		     );
	        }
		 });

/*
* <我的信箱>如果没有数据则绘制文字提示用户
* */
var My_student_tel2 =React.createClass({displayName: "My_student_tel2",
	render: function() {
	 return (
			 React.createElement("div", {className: "am-g"}, 
			  React.createElement("h1", null, "您的信箱暂无信件！")
			  )
	     );
        }
	 });




//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————每日任务<绘制>——————————————————————————  
/*
 * <每日任务>服务器请求后绘制处理方法；
 * 
 * */
var rect_teacherDailyTask = React.createClass({displayName: "rect_teacherDailyTask",
render: function() {
    return (
    React.createElement("div", null, 
	  React.createElement("hr", null), 
	  React.createElement(G_help_popo, {msg: G_tip.teacherDailyTask}), 
      React.createElement(AMR_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "每日任务"), 
            React.createElement("th", null, "任务类型"), 
            React.createElement("th", null, "任务状态")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Query_teacherDailyTask, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});
    
/*  	
 * <每日任务>在表单上绘制详细内容;
 * @点击后调用即时消息(舞台跳转)
 * */
var Query_teacherDailyTask = React.createClass({displayName: "Query_teacherDailyTask", 
	btn_students_list_click:function(type,group_uuid){
		ajax_State_style(type,null,group_uuid,2);
	},
	  render: function() {
	    var event = this.props.event;
	    return (
	      React.createElement("tr", {className: common_teacherDailyTask_status(event.status).className}, 
	        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: this.btn_students_list_click.bind(this,event.type,event.group_uuid)}, event.title)), 

	        React.createElement("td", null, common_teacherDailyTask_type(event.type)), 
	        React.createElement("td", null, common_teacherDailyTask_status(event.status).status)
	      ) 
	    );
	  }
	}); 
//±±±±±±±±±±±±±±±±±±±±±±±±±±±










//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$管理区域$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//——————————————————————————校务管理<校园列表绘制>—————————————————————   
/*
 *(校务管理)<校园列表>列表框绘制 ;
 *@handleClick:绑定的事件根据M来区分点击事件并做处理；
 *@add:添加分校;
 *@edit:编辑分校;
 *@btn_click_group ：在kd_service
 *@取消校园介绍；增加预览按钮
 * */
var Group_EventsTable_byRight = React.createClass({displayName: "Group_EventsTable_byRight",
	handleClick: function(m) {
			btn_click_group_byRight(m,{type:"1"});

	  },
  render: function() {
    return (
    React.createElement("div", null, 
    React.createElement(G_px_help_List, {data: G_kd_help_msg.Group_help_list}), 
    React.createElement(AMR_ButtonToolbar, null, 
	    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "add")}, "添加分校")
	  ), 
	  React.createElement("hr", null), 
      React.createElement(AMR_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "品牌名"), 
            React.createElement("th", null, "预览"), 
            React.createElement("th", null, "机构全称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "学校地址"), 
            React.createElement("th", null, "创建时间")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Group_EventRow_byRight, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});

/*
 *(校务管理)<校园列表>学校内容绘制 ;
 *@handleClick:绑定的事件根据M来区分点击事件并做处理；
 *@btn_click_group ：在kd_service；
 * */
var Group_EventRow_byRight = React.createClass({displayName: "Group_EventRow_byRight", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';
    return (
      React.createElement("tr", {className: className}, 
      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: btn_click_group_byRight.bind(this,"edit", event)}, event.brand_name)), 
         React.createElement("td", null, 
    	React.createElement(AMR_Button, {amStyle: "secondary", onClick: btn_click_group_byRight.bind(this,"show",event)}, "预览")
        ), 
          React.createElement("td", null, event.company_name), 
        React.createElement("td", null, " ", event.link_tel), 
        React.createElement("td", null, event.address), 
        React.createElement("td", null, event.create_time)
      ) 
    );
  }
}); 

/*
 *(校务管理)<预览按钮>绘制 ;
 * */
  var Group_show_byRight = React.createClass({displayName: "Group_show_byRight", 
  render: function() {
  	  var o = this.props.formdata;
    return (
  		  React.createElement(AMUIReact.Article, {
  		    title: o.brand_name, 
  		    meta: o.company_name+" | "+o.link_tel+" | "+o.address+" | 阅读"+this.props.count+"次"}, 
  			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.description}})
  		   )	
  		   
  		   
    );
  }
  }); 
  
/*
 *(校务管理)<校园列表>添加分校和编辑详情绘制界面；
 *@componentDidMount：图片处理方法 
 *@ajax_group_save:提交按钮详情在kd_service
 * */    
var Group_edit_byRight = React.createClass({displayName: "Group_edit_byRight", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editGroupForm').serializeJson());
	  },
	  componentDidMount:function(){
			  var editor=$('#description').xheditor(xhEditor_upImgOption_mfull);
			  
			  if(!this.state.uuid){
			  this.setProvCity();
			  }
          w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                editor.pasteHTML( '<img   src="'+imgurl+'"/>')
          });
	},
	   /*
	    * (校务管理)<校园列表>内上传LOGO图片
	    * */
    btn_class_group_uploadHeadere :function(){      
        w_uploadImg.open(function (guid){
             $ ("#img").val(guid);
              $("#img_head_image").attr("src",G_imgPath+ guid);
              G_img_down404("#img_head_image");
	         });   
	   },
setProvCity:function(){  
		   var thit=this;
		   var url="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js";
		 loadJS(url,function(){
			 if(remote_ip_info){
					thit.state.prov=remote_ip_info.province;
                    thit.state.city=remote_ip_info.city;
					  thit.setState(thit.state);
			 }
		 });
	   },
  render: function() {
	  var o = this.state;
	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
	    var header_img=G_imgPath+o.img;
	    if(!o.img)header_img=G_def_noImgPath;
    return (
    		React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
  		     React.createElement("hr", null), 
    		  React.createElement(PxInput, {type: "hidden", name: "uuid", value: o.uuid}), 
    	       React.createElement(PxInput, {type: "hidden", name: "type", value: o.type}), 
    		    React.createElement(PxInput, {type: "hidden", id: "img", name: "img", value: o.img, onChange: this.handleChange}), 		   
              React.createElement(AMUIReact.Image, {id: "img_head_image", src: header_img, className: "G_img_header"}), 
             React.createElement("button", {type: "button", onClick: this.btn_class_group_uploadHeadere, className: "am-btn am-btn-secondary"}, "上传LOGO"), 
            React.createElement("div", {className: "am-form-group"}, 
    		 React.createElement("label", {className: one_classDiv }, "品牌名:"), 
    		  React.createElement("div", {className: two_classDiv }, 
    	       React.createElement(PxInput, {type: "text", name: "brand_name", id: "brand_name", value: o.brand_name, onChange: this.handleChange, placeholder: "不超过45字"})
    	        ), 		
    	       React.createElement("label", {className: one_classDiv }, "机构全称:"), 
    		  React.createElement("div", {className: two_classDiv }, 
    	     React.createElement(PxInput, {type: "text", name: "company_name", id: "company_name", value: o.company_name, onChange: this.handleChange, placeholder: "不超过45字"})
    	    ), 
			 React.createElement("div", null, 
		    React.createElement("button", {type: "button", onClick: this.setProvCity.bind(this), className: "am-btn am-btn-primary"}, "获取当前省市")
		     ), 
	  		    React.createElement("label", {className: one_classDiv }, "省:"), 
    		 React.createElement("div", {className: two_classDiv }, 
    	      React.createElement(PxInput, {type: "text", name: "prov", id: "prov", value: o.prov, onChange: this.handleChange, placeholder: ""})
    	       ), 		
		    React.createElement("label", {className: one_classDiv }, "市:"), 
    		 React.createElement("div", {className: two_classDiv }, 
    	      React.createElement(PxInput, {type: "text", name: "city", id: "city", value: o.city, onChange: this.handleChange, placeholder: ""})
    	       ), 	
    	     React.createElement("label", {className: one_classDiv }, "学校地址:"), 
    		  React.createElement("div", {className: two_classDiv }, 
    	       React.createElement(PxInput, {icon: "university", type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: "不超过64字"})
     	        ), 	      
    	       React.createElement("label", {className: one_classDiv }, "地址坐标:"), 
    		  React.createElement("div", {className: two_classDiv }, 
    	     React.createElement(PxInput, {type: "text", name: "map_point", id: "map_point", value: o.map_point, onChange: this.handleChange, placeholder: "拾取坐标后，复制到这里。格式：1.1,1.1"}), 
    	    React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取")
    	   ), 
    	    React.createElement("label", {className: one_classDiv }, "学校电话:"), 
    		 React.createElement("div", {className: two_classDiv }, 
    	      React.createElement(PxInput, {icon: "phone", type: "text", name: "link_tel", id: "link_tel", value: o.link_tel, onChange: this.handleChange, placeholder: ""})
    	       ), 
		   React.createElement("p", {className: "am-text-warning"}, "注意:多个电话请用英文逗号分隔"), 
		   React.createElement("label", {className: one_classDiv }, "获奖称号:"), 
    		 React.createElement("div", {className: two_classDiv }, 
    	      React.createElement(PxInput, {type: "text", name: "summary", id: "summary", value: o.summary, onChange: this.handleChange, maxlength: "100", placeholder: "多个逗号分割,推荐3个,最多100字.多的放到内容区"})
    	       ), 		
		   
    	      React.createElement(AMR_Input, {id: "description", type: "textarea", rows: "50", label: "校园介绍:", placeholder: "校园介绍", name: "description", value: o.description, onChange: this.handleChange}), 
  		  	  G_get_upload_img_Div(), 
  	          React.createElement("button", {type: "button", onClick: ajax_group_save_byRight, className: "am-btn am-btn-primary"}, "提交")
	    	 )
    		)   	   
    );
  }
});
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————信息管理<绘制>—————————————————————  
/*
*(信息管理)<校园公告><老师公告><精品文章><招生计划>表单框绘制
*@btn_click_announce_byRight:点击按钮事件跳转kd_servise方法;
* */  
var Announcements_EventsTable_byRight = React.createClass({displayName: "Announcements_EventsTable_byRight",
	getInitialState: function() {
		var obj= {
		    	groupuuid:this.props.groupuuid,
		    	pageNo:this.props.pageNo,
		    	type:this.props.type,
		    	list: []
		    };
			
		//obj=this.ajax_list(obj);
	    return obj;
	   
	  },
		componentDidMount: function() {
			this.ajax_list(this.state); 
		  },
	  ajax_callback:function(list){
		     if (list== null )list= [];
		  this.state.list=list;
		  this.setState(this.state);
	  },
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var obj= {
			    	groupuuid:nextProps.groupuuid,
			    	pageNo:nextProps.pageNo,
			    	type:nextProps.type,
			    	list: []
			    };
				
			this.ajax_list(obj);
		  //this.setState(obj);
		},
	 ajax_list:function(obj){
		$.AMUI.progress.start();
		var that=this;
		g_message_groupuuid=obj.groupuuid;
		var url = hostUrl + "rest/announcements/list.json";
		$.ajax({
			type : "GET",
			url : url,
			data : {type:announce_types,groupuuid:obj.groupuuid,pageNo:obj.pageNo},
			dataType : "json",
			//async: false,//必须同步执行
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					obj.list=data.list.data;
					obj.pageSize=data.list.pageSize;
				    that.ajax_callback( data.list.data );     
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			},
			error : G_ajax_error_fn
		});
		return obj;
		
	},
	pageClick: function(m) {
		 var obj=this.state;
		 if(m=="pre"){
			
			 if(obj.pageNo<2){
				 G_msg_pop("第一页了");
				 return;
			 }
			 obj.pageNo=obj.pageNo-1;
			 this.ajax_list(obj);
			 return;
		 }else if(m=="next"){
			 if(!obj.list||obj.list.length<obj.pageSize){
				 G_msg_pop("最后一页了");
				 return ;
			 }
			 obj.pageNo=obj.pageNo+1;
			
			 this.ajax_list(obj);
			 return;
		 }
	},
	handleClick: function(m,Titlename) {
		btn_click_announce_byRight(m,this.state.groupuuid,null);
},
handleChange_selectgroup_uuid:function(val){
	 var obj=this.state;
	 obj.groupuuid=val;
	 this.ajax_list(obj);
},

render: function() {
	var obj=this.state;
	var help=(React.createElement("div", null))
	if(!this.state.list)this.state.list=[];
	if(announce_types==0){
	 help=(React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list1})); 
	  }else if(announce_types==1){
	  help=(React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list2})); 
	  }else if(announce_types==3){
	  help=(React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list3})); 
	  }else if(announce_types==4){
	  help=(React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list4})); 
	  }
  return (
  React.createElement("div", null, 
	help, 
	 
     React.createElement(AMR_Panel, null, 
    React.createElement(AMR_ButtonToolbar, null, 
	React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上一页"), 
	  React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", obj.pageNo, "页"), 
	React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下一页"), 	
	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this,"add")}, "创建")
  )
   ), 
React.createElement("div", {className: "am-form-group"}, 
React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", data: this.props.group_list, btnStyle: "primary", value: obj.groupuuid})
  ), 	  
    React.createElement(AMR_Table, React.__spread({},  this.props), 
   React.createElement("thead", null, 
    React.createElement("tr", null, 
      React.createElement("th", null, "标题"), 
	  React.createElement("th", null, "编辑与删除操作"), 
      React.createElement("th", null, "状态"), 
      React.createElement("th", null, "浏览次数"), 
      React.createElement("th", null, "创建时间"), 
      React.createElement("th", null, "创建人")
    )
  ), 
  React.createElement("tbody", null, 
    this.state.list.map(function(event) {
      return (React.createElement(Announcements_EventRow_byRight, {key: event.uuid, event: event}));
        })
      )
    )
    )
  );
}
});
  
//信息管理绘制详情内容Map;   
var Announcements_EventRow_byRight = React.createClass({displayName: "Announcements_EventRow_byRight", 
	render: function() {
	  var event = this.props.event;
	  var className = event.highlight ? 'am-active' :
	    event.disabled ? 'am-disabled' : '';
        var txtclasssName;
		 if(event.status==0){
           txtclasssName="am-text-success";
		  }else{
           txtclasssName="am-text-danger";
		   }
	  return (
	    React.createElement("tr", {className: className}, 
	      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: react_ajax_announce_show_byRight.bind(this,event.uuid,Vo.announce_type(event.type))}, event.title)), 
          React.createElement("th", null, " ", React.createElement(AMR_ButtonToolbar, null, 
	     React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "primary", onClick: btn_click_announce_byRight.bind(this, "edit",event.groupuuid,event.uuid)}, "编辑"), 
	     React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "danger", onClick: btn_click_announce_byRight.bind(this, "del",event.groupuuid,event.uuid)}, "删除")
	     )), 

	      React.createElement("td", {className: txtclasssName}, Vo.get("announce_status_"+event.status)), 
	      React.createElement("td", null, event.count), 
	      React.createElement("td", null, event.create_time), 
	      React.createElement("td", null, event.create_user)
	    ) 
	  );
	}
	});    
    

/*
* (信息管理)<校园公告><老师公告><精品文章><招生计划>创建与编辑界面绘制；
* @w_img_upload_nocut:上传图片后发的请求刷新;
* */    
var Announcements_edit_byRight = React.createClass({displayName: "Announcements_edit_byRight", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editAnnouncementsForm').serializeJson());
	  },
	 handleChange_url_cb:function(url_title){
			this.state.title=url_title;
			this.setState(this.state);
	  },
	handleChange_url:function(){
	    var tmp=$('#editAnnouncementsForm').serializeJson();
		    this.setState(tmp);
		var thit=this;		 
	   G_getHtmlTitle(tmp.url,function(url_title){thit.handleChange_url_cb(url_title)});
		
	},
	  componentDidMount:function(){
	   var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
	     this.editor=editor;
        w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
              editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
        });
	  },
		   preview_fn:function(){
          G_html_preview("t_iframe", this.state.url,this.editor.getSource(),this.state.title);
       }, 
bg_Class_fn:function(){
	var that=this;
	var editor=this.editor;
     var callback=function(imgArr){
          for(var i=0;i<imgArr.length;i++){
           editor.pasteHTML( '<img width="100%"   src="'+imgArr[i].src+'"/>')
          }          
     }
         KDClassNewPhotoItem.queryForSelect(this.state.groupuuid,null,1,callback);

  },
render: function() {
	 var o = this.state;
	  var type_div;
	   var url=(React.createElement("div", null));
	  var ylBtn=(React.createElement("div", null));
	   if(announce_types==3){
	   url=(
		React.createElement("div", null, 
		  React.createElement("label", {htmlFor: "name"}, "分享链接(链接和内容选填一个):"), 
		  React.createElement("input", {type: "text", name: "url", id: "url", value: o.url, onChange: this.handleChange_url, maxlength: "256", placeholder: "可直接使用外部内容的链接地址显示"})		
		)
		)
	  } 
return (
		React.createElement("div", null, 		
		React.createElement("div", {className: "header"}, 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-sm-12 "}, 
		  React.createElement("form", {id: "editAnnouncementsForm", method: "post", className: "am-form"}, 
		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		React.createElement("input", {type: "hidden", name: "isimportant", value: o.isimportant}), 	
	React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
		React.createElement("div", {className: "am-form-group"}, 
	  React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid})		          
      ), 
		
		  React.createElement("label", {htmlFor: "name"}, "标题:"), 
		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxlength: "128", placeholder: "不超过128字"}), 
		  React.createElement("br", null), 
            url, 
		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
		      React.createElement("label", null, "班级相册图片："), 
                 React.createElement(AMR_ButtonToolbar, null, 
                    React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.bg_Class_fn.bind(this)}, "浏览...")
                ), 
		  G_get_upload_img_Div(), 
		  React.createElement("button", {type: "button", onClick: ajax_announcements_save_byRight, className: "am-btn am-btn-primary"}, "提交"), 
			    React.createElement("button", {type: "button", onClick: this.preview_fn.bind(this), className: "am-btn am-btn-primary"}, "预览")
		  )
	     ), 
			    React.createElement("div", {className: "am-u-lg-6 am-u-sm-12 "}, 
               React.createElement(G_phone_iframe, null)
             )
	   )	   
	  )
);
}
}); 


//
/*
 *<信息管理>公告点赞、添加、删除、禁用、评论、加载更多等详情绘制模板；
 *增加编辑与删除功能
 * */
var Announcements_show_byRight = React.createClass({displayName: "Announcements_show_byRight", 
		getInitialState: function() {
		this.props.data.isFavor=this.props.isFavor;
		if(this.props.data)return this.props.data;
	  },
	//创建信息管理点击按钮事件跳转kd_servise方法;
 	handleClick: function(m,groupuuid,uuid) {
 		btn_click_announce_byRight(m,groupuuid,uuid);
    }, 
//收藏按钮方法;
	  favorites_push: function(obj) {
		  if(obj.isFavor==false)return;
		  var url=obj.url;
		   obj.isFavor=false;
		  this.setState(obj);
		commons_ajax_favorites_push(obj.title,obj.type,obj.uuid,url)
	  },
render: function() {
	  var obj=this.state;
      var iframe=(React.createElement("div", null));
	     if(obj.url){
	       iframe=(React.createElement("iframe", {id: "t_iframe", onLoad: G_iFrameHeight.bind(this,'t_iframe'), frameborder: "0", scrolling: "auto", marginheight: "0", marginwidth: "0", width: "100%", height: "600px", src: obj.url}))	   
	        }else{
	     iframe=(       
			React.createElement(AMUIReact.Article, {
			title: obj.title, 
			meta: Vo.announce_type(obj.type)+" | "+Store.getGroupNameByUuid(obj.groupuuid)+" | "+obj.create_time+ "|阅读"+ this.props.count+"次"}, 
			React.createElement("div", {dangerouslySetInnerHTML: {__html: obj.message}})
			))
	     }
return (
	  React.createElement("div", {className: "px_margin_div"}, 
       React.createElement("div", {className: "am-margin-left-sm"}, 
	 
         iframe, 
	     
	     React.createElement(AMR_ButtonToolbar, null, 
	     React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "primary", onClick: this.handleClick.bind(this, "edit",obj.groupuuid,obj.uuid)}, "编辑"), 
	     React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "danger", onClick: this.handleClick.bind(this, "del",obj.groupuuid,obj.uuid)}, "删除"), 
	     React.createElement(G_check_disable_div_byRight, {type: obj.type, uuid: obj.uuid, status: obj.status, groupuuid: obj.groupuuid})
	     )
	     
	     ), 
	    	React.createElement("footer", {className: "am-comment-footer"}, 
	    	React.createElement("div", {className: "am-comment-actions"}, 
	    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+obj.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
	    	React.createElement("a", {href: "javascript:void(0);", onClick: this.favorites_push.bind(this,obj)}, React.createElement("i", {className: obj.isFavor?"am-icon-heart px_font_size_click":"am-icon-heart px-icon-hasdianzan px_font_size_click"}), obj.isFavor?"收藏":"已收藏"), 	  
			 React.createElement("a", {href: "javascript:void(0);", onClick: G_CallPhoneFN.setShareContent.bind(this,obj.title,obj.title,null,this.props.share_url)}, React.createElement("i", {className: G_CallPhoneFN.canShareUrl()?"am-icon-share-alt px_font_size_click":"am-hide"})), 	
			React.createElement(G_check_disable_div_byRight, {type: obj.type, uuid: obj.uuid, status: obj.status, groupuuid: obj.groupuuid, add_class: "am-fr"}), 	
		 React.createElement("a", {href: "javascript:void(0);", className: "am-fr", onClick: common_check_illegal.bind(this,obj.type,obj.uuid)}, React.createElement("i", {className: "am-icon-exclamation-circle px_font_size_click"}), "举报")
	       
		 )
	    	), 
	    	React.createElement(Common_Dianzan_show_noAction, {uuid: obj.uuid, type: obj.type, btn_dianzan: "btn_dianzan_"+obj.uuid}), 
		  React.createElement(Common_reply_list, {uuid: obj.uuid, type: obj.type, groupuuid: obj.groupuuid})			 
	   )
);
}
}); 

//±±±±±±±±±±±±±±±±±±±±±±±±±±±















//——————————————————————————食谱管理<绘制>—————————————————————  
/*
 *(食谱管理)按钮及表单框绘制
 *@add:添加
 *@edit:编辑
 *@pre:上周
 *@next:下周
 *@btn_click_announce:点击按钮事件跳转kd_servise方法;
 * */  
var CookbookPlan_EventsTable_byRight = React.createClass({displayName: "CookbookPlan_EventsTable_byRight",
	handleClick: function(m) {		
		if(m=="add"){
			btn_click_cookbookPlan_byRight(m,{groupuuid:this.props.group_uuid});
			 return;
		 }if(m=="edit"){
			  btn_click_cookbookPlan_byRight(m,{uuid:uuids});
			  return;
		 } else if(m=="pre"){
			 menu_cookbookPlan_list_fn_byRight(this.props.group_uuid,--g_cookbookPlan_week_point)
			 return;
		 }else if(m=="next"){
			 menu_cookbookPlan_list_fn_byRight(this.props.group_uuid,++g_cookbookPlan_week_point)
			 return;
		 }
	},
	handleChange_selectgroup_uuid:function(val){
		menu_cookbookPlan_list_fn_byRight(val,g_cookbookPlan_week_point)
	},
	render: function() {
	return (
	React.createElement("div", null, 
    React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list9}), 
    React.createElement(AMR_Panel, null, 
	React.createElement(AMR_ButtonToolbar, null, 
	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "pre")}, "上周"), 
	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "next")}, "下周"), 	
	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "add",null,this.props.group_uuid)}, "添加")
	)
    ), 

    React.createElement(AMR_ButtonToolbar, null, 
	React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid})
	)		
	), 
		
	React.createElement("div", {className: "header"}, 
	  React.createElement("h1", null, "[", this.props.begDateStr, " 到 ", this.props.endDateStr, "]")
	), 
	React.createElement("hr", null), 
  
	  React.createElement(AMR_Table, React.__spread({},  this.props), 
	    React.createElement("thead", null, 
	      React.createElement("tr", null, 
	        React.createElement("th", null, "一周"), 
		    React.createElement("th", null, "复制食谱"), 
	        React.createElement("th", null, "早餐"), 
	        React.createElement("th", null, "早上加餐"), 
	        React.createElement("th", null, "午餐"), 
	        React.createElement("th", null, "下午加餐"), 
	        React.createElement("th", null, "晚餐"), 
	        React.createElement("th", null, "营养分析")
	      )
	    ), 
	    React.createElement("tbody", null, 
	      this.props.events.map(function(event) {
	        return (React.createElement(CookbookPlan_EventRow_byRight, {event: event}));
	      })
	    )
	  )
	  )
	);
	}
});


/*
 *(食谱管理)内容绘制
 *@btn_click_cookbookPlan:点击按钮事件跳转kd_servise方法;
 * */ 
var CookbookPlan_EventRow_byRight = React.createClass({displayName: "CookbookPlan_EventRow_byRight", 
	parseTimes:function(s){
		var rs=null;
		if(!s)return "";
		var arr=s;
		for(var i=0;i<arr.length;i++){
			var t_arr=arr[i];
			if(rs==null)rs=t_arr.name;
			else rs+=","+t_arr.name;
		}  
		return rs;
	},
	handleChange_button:function(uuid){

		$.AMUI.progress.start();
		var url = hostUrl + "rest/cookbookplan/"+uuid+".json";
		$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
				  data.data.uuid=null;
	              data.data.plandate=null;
				 btn_click_cookbookPlan_byRight("add",data.data);
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			}
		});	

	},
render: function() { 
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  React.createElement("tr", {className: className}, 
    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: btn_click_cookbookPlan_byRight.bind( this, 'edit',event)}, G_week.getWeekStr(event.plandate))), 
	React.createElement("td", null, React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleChange_button.bind(this,event.uuid)}, "复制食谱")), 
    React.createElement("td", null, this.parseTimes(event.list_time_1)), 
    React.createElement("td", null, this.parseTimes(event.list_time_2)), 
    React.createElement("td", null, this.parseTimes(event.list_time_3)), 
    React.createElement("td", null, this.parseTimes(event.list_time_4)), 
    React.createElement("td", null, this.parseTimes(event.list_time_5)), 
    React.createElement("td", null, event.analysis)
  ) 
);
}
});
/*
 *(食谱管理)添加与编辑详情界面绘制
 *@ajax_cookbookPlan_save:点击按钮事件跳转kd_servise方法;
 * */ 
var CookbookPlan_edit_byRight = React.createClass({displayName: "CookbookPlan_edit_byRight", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editCookbookPlanForm').serializeJson());
	  },
	 
render: function() {
	  var o = this.state;
	  
	  var plandateStr_div;
	  if (o.uuid) {//只读
		//2015-07-04 00:00:00=>2015-07-04
		  o.plandate=o.plandate.split(" ")[0];
		  plandateStr_div = React.createElement(PxInput, {icon: "calendar", type: "text", name: "plandateStr", id: "plandateStr", value: o.plandate})
	  } else {
		  plandateStr_div = React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", name: "plandateStr", id: "plandateStr", dateTime: o.plandate, showTimePicker: false, onChange: this.handleChange})
	  }
			//选择食谱,根据幼儿园uuid过滤.
		  w_ch_cook.groupuuid=o.groupuuid;
	  return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		  React.createElement("form", {id: "editCookbookPlanForm", method: "post", className: "am-form"}, 
		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		React.createElement("input", {type: "hidden", name: "groupuuid", value: o.groupuuid}), 
		React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
		        React.createElement("label", {htmlFor: "name"}, "日期:"), 
				 plandateStr_div, 
				 React.createElement("br", null), 
		      React.createElement("label", null, "早餐:"), 
		      React.createElement(CookbookPlan_edit_EventRow, {uuids: o.list_time_1, type: "time_1"}), 
		      React.createElement("div", {className: "cls"}), 
		      React.createElement("br", null), 
		      React.createElement("label", null, "早上加餐:"), 
		      React.createElement(CookbookPlan_edit_EventRow, {uuids: o.list_time_2, type: "time_2"}), 
		      React.createElement("div", {className: "cls"}), 
		      React.createElement("br", null), 
		      React.createElement("label", null, "午餐:"), 
		      React.createElement(CookbookPlan_edit_EventRow, {uuids: o.list_time_3, type: "time_3"}), 
		      React.createElement("div", {className: "cls"}), 
		      React.createElement("br", null), 
		      React.createElement("label", null, "下午加餐:"), 
		      React.createElement(CookbookPlan_edit_EventRow, {uuids: o.list_time_4, type: "time_4"}), 
		      React.createElement("div", {className: "cls"}), 
		      React.createElement("br", null), 
		      React.createElement("label", null, "晚餐:"), 
		      React.createElement(CookbookPlan_edit_EventRow, {uuids: o.list_time_5, type: "time_5"}), 
		      React.createElement("div", {className: "cls"}), 
		      React.createElement("br", null), 
		      React.createElement(AMR_Input, {name: "analysis", type: "textarea", rows: "2", label: "营养分析:", placeholder: "填写内容", value: o.analysis, onChange: this.handleChange}), 				
		      React.createElement("button", {type: "button", onClick: ajax_cookbookPlan_save_byRight, className: "am-btn am-btn-primary"}, "提交")
		    )

	     )
	   )
	   
	   )
);
}
}); 

var CookbookPlan_edit_EventRow = React.createClass({displayName: "CookbookPlan_edit_EventRow",
	
	 getInitialState: function() {
		 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
		    return {
	            items: lists
	        };
		  },
	
	  //uuids=rs += (cb.getUuid() + "$" + cb.getName() + ",");
		//使用list<cookbook>
	  cookbookPlan_timeStr_to_list:function(cooks){
		  if(!cooks) cooks=[];
		  return cooks;
		//  if(cooks==null)return [];
		 // return cooks.split(",");
	  },
	  
		deleteImg:function(divid){
			$("#"+divid).hide();
		},
		 btn_addCookplan: function(divid) {
			 var that=this;
			  var checkeduuids =null;
			  $("#"+divid+" > .G_cookplan_Img").each(function(){
				  		if($(this).is(":hidden")){
				  			return;
				  		}
						 if(checkeduuids==null)checkeduuids=this.title;
						 else
						 checkeduuids+=','+this.title ;    //遍历被选中CheckBox元素的集合 得到Value值
					});
			w_ch_cook.open(function(cooks){
				  that.setState({
			            items: that.cookbookPlan_timeStr_to_list(cooks)
			        });
				  $(".G_cookplan_Img").show();
				  
			  },checkeduuids);
		  },
	  render: function() {
		var that=this;
	    return (
	    		  React.createElement("div", {id: "div_cookPlan_"+this.props.type}, 
	    		  
	    		  
	    			  this.state.items.map(function(event) {
	    				  //rs += (cb.getUuid() + "$" + cb.getName() + ",");
	    				//  var arr=event.split("$");
	    				  //if(arr.length!=3)return;
	    				  //使用list<cookbook>
	    				  if(!event)return;
	    				  var t_uuid=event.uuid;
	    				  var t_imguuid=event.img;
	    				  var t_name=event.name;
 	    					 return (
 	     	 	            		React.createElement("div", {id: "div_cookPlan_Item_"+t_uuid, title: t_uuid, className: "G_cookplan_Img"}, 
 	    		    	 	       			React.createElement("img", {className: "G_cookplan_Img_img", id: "divCookItem_img_"+t_uuid, src: t_imguuid, alt: "图片不存在", title: t_name}), 
 	    		    	 	       			React.createElement("div", {className: "G_cookplan_Img_close", onClick: that.deleteImg.bind(this,"div_cookPlan_Item_"+t_uuid)}, React.createElement("img", {src: hostUrlCDN+"i/close.png", border: "0"})), 
 	    		    	 	       			React.createElement("span", null, t_name)
 	    		    	 	       		)		
 	     	 	            	);
 	     	 	          
 	    				
 	    			 }), //end map
	    		  
	    		  React.createElement("button", {type: "button", onClick: that.btn_addCookplan.bind(this,"div_cookPlan_"+that.props.type), className: "am-btn am-btn-secondary"}, "添加")
 	    		)
		
	  )
	  }
	});


//±±±±±±±±±±±±±±±±±±±±±±±±±±±


//——————————————————————————<新版>课程安排<管理绘制>——————————————————————————  
/*
 * 
 * 课程安排1周显示
 * <Teachingplan_showByMy  classuuid={classuuid} classlist={classlist} />
 */
var Teachingplan_show7Day_byRight = React.createClass({displayName: "Teachingplan_show7Day_byRight", 
	getInitialState: function() {
		var classList=Store.getChooseClass(this.props.groupuuid);
		var class_uuid =null;
		if(!this.props.classuuid){
				if(classList&&classList.length>0){
			classuuid=classList[0].uuid;
		  }		
		}else{
		   
		classuuid=this.props.classuuid;
		  }

		var obj= {
				groupuuid:this.props.groupuuid,
		    	classuuid:classuuid,
		    	classlist:G_selected_dataModelArray_byArray(classList,"uuid","name"),
		    	pageNo:0,
		    	list: this.props.list
		    };
		obj=this.ajax_list(obj);
	    return obj;
	   
	  },
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var obj= {
				  groupuuid:nextProps.groupuuid,
				  classuuid:nextProps.classuuid,
				  classlist:nextProps.classlist,
			    	pageNo:nextProps.pageNo,
			    	type:nextProps.type,
			    	list: nextProps.list
			    };
				
			obj=this.ajax_list(obj);
		  this.setState(obj);
		},
	 ajax_list:function(obj){
		 var now=new Date();
		  	now=G_week.getDate(now,obj.pageNo*7);
		 var begDateStr=G_week.getWeek0(now,obj.pageNo);
		var endDateStr=G_week.getWeek6(now,obj.pageNo);;
			//记录老师选择的班级.
			G_myCurClassuuid=obj.classuuid;
		$.AMUI.progress.start();
		var url = hostUrl + "rest/teachingplan/list.json";
		$.ajax({
			type : "GET",
			url : url,
		//	data : {type:obj.type,groupuuid:obj.groupuuid,pageNo:obj.pageNo},
			data : {classuuid:obj.classuuid,begDateStr:begDateStr,endDateStr:endDateStr},
			dataType : "json",
			async: false,//必须同步执行
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					obj.list=data.list;
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			},
			error : G_ajax_error_fn
		});
		return obj;
		
	},
	pageClick: function(m) {
		 var obj=this.state;
		 if(m=="pre"){
			 obj.pageNo=obj.pageNo-1;
			 this.setState(this.ajax_list(obj));
			 return;
		 }else if(m=="next"){
			 obj.pageNo=obj.pageNo+1;
			 this.setState(this.ajax_list(obj));
			 return;
		 }
	},

	
	handleChange_selectclass_uuid: function(val) {
		 var obj=this.state;
		 obj.classuuid=val;
		 this.setState(this.ajax_list(obj));
    },
	handleChange_selectgroup: function(val) {
	this.state.groupuuid=val;
	var classlist=Store.getChooseClass(this.state.groupuuid);
	var classuuid =null;
	if(classlist&&classlist.length>0){
		classuuid=classlist[0].uuid;
	}
	this.state.classlist=G_selected_dataModelArray_byArray(classlist,"uuid","name");
	 this.state.classuuid=classuuid;
	 this.state=this.ajax_list(this.state); 
	 this.setState(this.state);
},
	componentDidMount: function() {
//		if(!this.props.formdata){
//			  $("#div_detail").html("今日没有发布教学计划");
//		  }	    
	  },
	render: function() {
	  var o = this.state;
	  var now=new Date();
	  	now=G_week.getDate(now,o.pageNo*7);
	  return (
		React.createElement("div", null, 
		  React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list10}), 
		React.createElement("div", {className: "am-g"}, 
         React.createElement(AMR_Panel, null, 
		 React.createElement(AMR_ButtonToolbar, null, 

		  	React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "pre")}, "上周")
		    ), 

		  	React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "next")}, "下周")	
		    )

	    )
	    ), 
			        	
		   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	       React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup.bind(this), btnWidth: "200", data: this.props.groupList, btnStyle: "primary", value: this.state.groupuuid})
		   ), 
	     	
		   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	       React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "class_uuid", onChange: this.handleChange_selectclass_uuid.bind(this), btnWidth: "200", data:  this.state.classlist, btnStyle: "primary", value: this.state.classuuid})
		   )

	    ), 
		React.createElement("hr", null), 
		React.createElement("div", {className: "am-g", id: "div_detail"}, 
		
		React.createElement(G_Teachingplan_7day_byRight, {classuuid: this.state.classuuid, startDate: now, list: this.state.list})
		
		)
	   
	   )
);
}
}); 


/**
 * 全局模版-没有内容时显示
 * <G_Teachingplan_7day classuuid={this.state.classuuid} startDate={startDate} list={list} />
 */
var G_Teachingplan_7day_byRight= React.createClass({displayName: "G_Teachingplan_7day_byRight", 
	getInitialState: function() {
		var obj= {
				classuuid:this.props.classuuid,
				startDate:this.props.startDate,
		    	size:7,
		    	list: this.props.list
		    };
	    return obj;
	   
	  },
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var obj= {
					startDate:nextProps.startDate,
					classuuid:nextProps.classuuid,
			    	size:7,
			    	list: nextProps.list
			    };
		  this.setState(obj);
		},
		/**
		 * 根据日期生成课程表,如何返回数据中没有,则创建空的.
		 */
		getOneDayData:function(d1,list){
			for(var i=0;i<list.length;i++){
				var tmp=list[i];
				if(tmp.plandate.indexOf(d1)>-1){
					return tmp;
				}
			}
			return {classuuid:this.state.classuuid,plandate:d1,morning:"",afternoon:"",uuid:null};
		},
		/**
		 * 获取7天的课程表数据
		 */
		getListByStartDate:function(d1,size,list){ 
			var ar=[];
			var t=G_week.getWeekDayByDate(d1);
			if(t==0)t=-6;
			else t=1-t;
			for(var i=0;i<size;i++){
				var tmp=G_week.getDateStr(d1,t);
				t++;
				ar.push(this.getOneDayData(tmp,list));
			}
			return ar;
		},
	  render: function() {
		 var ar=this.getListByStartDate(this.state.startDate,this.state.size,this.state.list);
	    return (
	    		React.createElement("div", null, 
	    		 ar.map(function(event) {
					  return(							  										  
						React.createElement(G_Teachingplan_1day_byRight, {data: event})
					  )})
	    		 )
	    );
	  }
	  }); 
var G_Teachingplan_1day_byRight= React.createClass({displayName: "G_Teachingplan_1day_byRight", 
	getInitialState: function() {
		var obj= {
				 isEdit:false,
				data:this.props.data
		    };
	    return obj;
	  },
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var obj= {
				  isEdit:false,
				  data:nextProps.data
			    };
		  this.setState(obj);
		},
	   save_callback:function(data){
		  	G_msg_pop(data.ResMsg.message);
		   var obj= {
				   isEdit:false,
					  data:data.data
				    };
		   this.setState(obj);
     
       },
	  render: function() {
		  var o=this.state.data;
//		  if(this.state.isEdit){
//			  return (<Teachingplan_edit_inner data={o} callback={this.save_callback.bind(this)} />);
//		  }
		  var dianzan=(React.createElement("div", null));
		  if(o.uuid){
			    if(!o.count)o.count=0;
			  dianzan=(
					  React.createElement("div", null, 
					  React.createElement("footer", {className: "am-comment-footer"}, 
				    	React.createElement("div", {className: "am-comment-actions"}, 
				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"})), 
				  	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", null, "阅读"+o.count))
					
				    	)
				    	), 
				    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 7, btn_dianzan: "btn_dianzan_"+o.uuid}), 
				    	React.createElement("ul", {className: "am-comments-list"}, 
						  React.createElement(Classnews_reply_list, {uuid: o.uuid, type: 7, btn_reply: "btn_reply_"+o.uuid})
				    	)
				  ));
		  }
		  var divCs1="am-u-sm-4 am-u-md-2 am-u-lg-1";
		  var divCs2="am-u-sm-8 am-u-md-10 am-u-lg-11";
		  var cs="am-panel am-panel-secondary";
		 
		  if(o.plandate.indexOf( G_week.getDateStr(new Date(),0))>-1){
			  cs="am-panel am-panel-warning";
		  }
		 
			return (
					
					React.createElement("div", {className: cs}, 
					  React.createElement("div", {className: "am-panel-hd"}, 
					  React.createElement("h3", {className: "am-panel-title am-g"}, 
						  React.createElement("div", {className: divCs1}, G_week.getWeekStr(o.plandate)), 
			    		  React.createElement("div", {className: divCs2}, o.plandate.split(" ")[0]
			    		  )
					  )
					  ), 
					  React.createElement("div", {className: "am-panel-bd"}, 
							  React.createElement("div", {className: "am-g"}, 
				    		  React.createElement("div", {className: divCs1}, "上午"), 
				    		  React.createElement("div", {className: divCs2, dangerouslySetInnerHTML: {__html:G_textToHTML(o.morning)}}
				    		  )
				    		), 
				    		React.createElement("div", {className: "am-g"}, 
				    		  React.createElement("div", {className: divCs1}, "下午"), 
				    		  React.createElement("div", {className: divCs2, dangerouslySetInnerHTML: {__html:G_textToHTML(o.afternoon)}}
				    		  )
				    		), 
				    		React.createElement("div", {className: "am-g"}, 
				    		dianzan
						
				    		)
					  )
					 
					)
	    		
	    		
	    );
	  }
	  }); 


/*
 *<课程安排>班级编辑-内嵌在显示1周页面
 *<Teachingplan_edit_inner data={data} callback={callback} />
 * */
//var Teachingplan_edit_inner = React.createClass({ 
//	formid:null,
//	 getInitialState: function() {
//		    return this.props.data
//	},
//		//同一模版,被其他调用是,Props参数有变化,必须实现该方法.
//	  componentWillReceiveProps: function(nextProps) {
//		  this.setState(nextProps.data);
//		},
//	 handleChange: function(event) {
//		    this.setState($('#'+this.formid).serializeJson());
//	  },
//	  ajax_teachingplan_save:function(){
//		  var callback=this.props.callback;
//		    var opt={
//		            formName: this.formid,
//		            url:hostUrl + "rest/teachingplan/save.json",
//		            cbFN:callback
//		            };
//		G_ajax_abs_save(opt);
//	  },
//	
//render: function() {
//	  var o = this.state;
//	  o.plandate=o.plandate.split(" ")[0];
//	  this.formid="editTeachingplanForm"+o.plandate;
//	  ////onChange={this.handleChange.bind(this) 焦点每次输入后,到最后bug.
//	  if(!o.morning)o.morning=G_tip.teachingplan_morning;
//	  if(!o.afternoon)o.afternoon=G_tip.teachingplan_afternoon;
//	
//return (
//		
//		 <form id={this.formid} method="post" className="am-form">
//		 <input type="hidden" name="uuid"  value={o.uuid}/>
//			<input type="hidden" name="classuuid"  value={o.classuuid}/>
//		<div className="am-container">
//		<div className="am-g am-success am-article-title">
//		  <div className="am-u-sm-4">{G_week.getWeekStr(o.plandate)}</div>
//		  <div className="am-u-sm-8">
//		  {o.plandate}
//		  <input type="hidden" name="plandateStr"  value={o.plandate}/>
//		 
//		  </div>
//		</div>
//		<div className="am-g">
//		  <div className="am-u-sm-4">上午</div>
//		  <div className="am-u-sm-8" >  
//		  <AMR_Input id="morning"  name="morning" type="textarea" defaultValue={o.morning} rows="12" label="早上:" placeholder="填写内容" />
//
//		  </div>
//		</div>
//		<div className="am-g">
//		  <div className="am-u-sm-4">下午</div>
//		  <div className="am-u-sm-8">
//		  <AMR_Input id="afternoon"  name="afternoon" type="textarea"  defaultValue={o.afternoon} rows="7" label="下午:" placeholder="填写内容"  />
//		  </div>
//		</div>
//		 < AMR_Button  amStyle ="primary" onClick={ this.ajax_teachingplan_save.bind( this )}  >保存</AMR_Button >
//	</div>
//	
//	 </form>
//	
//);
//}
//});
//±±±±±±±±±±±±±±±±±±±±±±±±±±±




//——————————————————————————园长信箱<绘制>——————————————————————————        
/*
 * <园长信箱>一层界面绘制;
 * @send_user:家长名字；
 * @revice_useruuid:收件人ID；
 * @send_useruuid:发送者ID；
 * @ajax_boss_message_list绑定事件然后开始绘制舞台；
 * */
var Message_boss_Div_list = React.createClass({displayName: "Message_boss_Div_list", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps:function(){
		this.refresh_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		     var that=this;
             var callback=function(re_data){
 			if(!re_data)return;
 			if(re_data.data.length<re_data.pageSize){
 				$("#"+that.load_more_btn_id).hide();
 			}else{
 				$("#"+that.load_more_btn_id).show();
 			}
 			that.pageNo++;
 		}
        var re_data=ajax_queryLeaderMsgByParents_message_byRight(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);	
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
	//绘制不变的信息
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
	  	    React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list11}), 
		  React.createElement("div", {className: "am-list-news-hd am-cf"}
		   
		  ), 
		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-news-bd"}
		   
		    
		  ), 
		  React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		  )
		)
		  
			
  );
}
});




var Boss_student_tel_byRight =React.createClass({displayName: "Boss_student_tel_byRight",
	render: function() {
	    var event = this.props.events;
	    var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';
	 return (
	 	React.createElement("div", null, 
	 	    React.createElement("ul", {className: "am-list am-list-static am-list-border"}, 
	    	     this.props.events.map(function(event) {
	              return (
	              React.createElement("li", {className: "am-comment"}, 	
	      	       React.createElement("a", {href: "javascript:void(0);"}, 
	   	          React.createElement("img", {src: G_getHeadImg(event.send_userimg), alt: "", className: "am-comment-avatar", width: "48", height: "48"})
	      	     ), 
	      	   event.revice_user, "收到", React.createElement("span", {className: "am-comment-author"}, event.send_user, " "), "家长来信", event.count, "条,最后来信时间:", event.last_time, 
	           React.createElement(AMR_ButtonToolbar, null, 		            
	         React.createElement(AMUIReact.Button, {onClick: ajax_my_boss_stage_byRight.bind(this,event.send_useruuid,event.revice_useruuid,event.send_user), amStyle: "success"}, "@查看信息")
	        )
	       ));})		      			      
		 )
	 	) 		 
	     );
        }
	 });


/*
* <园长信箱>如果没有数据则绘制文字提示用户
* */
var Boss_student_tel2_byRight =React.createClass({displayName: "Boss_student_tel2_byRight",
	render: function() {
	 return (
			 React.createElement("div", {className: "am-g"}, 
			  React.createElement("h1", null, "园长信箱暂无信件！")
			  )
	     );
        }
	 });


/* 
* <园长信箱>绘制舞台
* @ajax_message_queryByParent：园长信箱2层详情界面服务器请求‘
* @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
* @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
* @revice_useruuid:收件人ID；
* @send_useruuid:发送者ID；
* @Boss_message_save我要保存模板
* this.forceUpdate()强制刷新页面；
* this.props.parentReact.forceUpdate();
* */
var Boss_message_stage_byRight = React.createClass({displayName: "Boss_message_stage_byRight", 
load_more_btn_id:"load_more_boss_",
pageNo:1,
classnewsreply_list_div:"classnewsreply_message_list_div",
componentWillReceiveProps:function(){
	this.refresh_data();
},
componentDidMount:function(){
	this.load_more_data();
},
load_more_data:function(){
	$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");

   		var that=this;
   		var callback=function(re_data){
    			if(!re_data)return;
    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
	var re_data=ajax_boss_message_list_byRight(this.props.send_useruuid,this.props.revice_useruuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
},
refresh_data:function(){
//	classnewsreply_list_div 清除；
//  load_more_data	重新绘制DIV；
	this.forceUpdate();
	this.pageNo=1;
	$("#"+this.classnewsreply_list_div).html("");
	this.load_more_data();
	
},
render: function() {
var parentThis=this;
this.load_more_btn_id="load_more_boss_"+this.props.uuid;
return (
	  React.createElement("div", null, 
	   React.createElement("div", {id: this.classnewsreply_list_div}
	   
	   ), 
		React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多"), 
		React.createElement(Boss_message_save_byRight, {parentThis: parentThis, send_useruuid: this.props.send_useruuid, revice_useruuid: this.props.revice_useruuid})
		)
		
);
}
}); 

/*
*<园长信箱>发送信息模板
*@ajax_boss_message_save：发送信息服务器请求；
* @revice_useruuid:收件人ID；
* @send_useruuid:发送者ID；
* 此处因园长回信息所以参数ID相反；
* */
var Boss_message_save_byRight = React.createClass({displayName: "Boss_message_save_byRight", 
classnewsreply_list_div:"classnewsreply_list_div",
componentDidMount:function(){
	$('#Boss_content_replay').xheditor(xhEditor_upImgOption_emot);
},
	reply_boss_save_btn_click:function(){
		var that=this.props.parentThis;
		ajax_boss_message_save_byRight(function(){
			$("#Boss_content_replay").val("");
			that.refresh_data();		
		})
	},
render: function() {
return (
	   React.createElement("form", {id: "BosseditForm", method: "post", className: "am-form"}, 
	   React.createElement("input", {type: "hidden", name: "revice_useruuid", value: this.props.send_useruuid}), 
		React.createElement("input", {type: "hidden", name: "send_useruuid", value: this.props.revice_useruuid}), 			
		React.createElement(AMR_Input, {id: "Boss_content_replay", type: "textarea", rows: "10", label: "信息发送", placeholder: "填写内容", name: "message"}), 
	      React.createElement("button", {type: "button", onClick: this.reply_boss_save_btn_click.bind(this), className: "am-btn am-btn-primary"}, "发送")		      
	    )	   
);
}
}); 


/* <园长信箱>2层发信息详情界面绘制；
* @send_user：信息者名字；
* @message：信息内容；
* @am-comment-flip:默认头像 加了靠右边 不加靠左;
* */
var Message_queryLeaderMsgByParents_listpage_byRight =React.createClass({displayName: "Message_queryLeaderMsgByParents_listpage_byRight",	 
	render: function() {
			var revice_useruuid=this.props.revice_useruuid;
		  return (				  
				  React.createElement("ul", {className: "am-comments-list "}, 
				  this.props.events.data.map(function(event) {
					  var class1="am-comment am-comment-flip am-comment-secondary";
					  if(revice_useruuid==event.send_useruuid){
						  class1="am-comment";
					  }
				      return (
				    		  React.createElement("li", {className: class1}, 
				    		  	React.createElement("a", {href: "javascript:void(0);"}, 
				    		  	 React.createElement("img", {src: G_getHeadImg(event.send_userimg), alt: "", className: "am-comment-avatar", width: "48", height: "48"})
				    		  		), 
				    		  		 React.createElement("div", {className: "am-comment-main"}, 
				    		  		 React.createElement("header", {className: "am-comment-hd"}, 
				    		  	      React.createElement("div", {className: "am-comment-meta"}, 
				    		  	        React.createElement("a", {href: "#link-to-user", className: "am-comment-author"}, event.send_user), 
				    		  	        "发送于 ", React.createElement("time", null, event.create_time)
				    		  	      )
				    		  	    ), 
				    		  	  React.createElement("div", {className: "am-comment-bd"}, 
				    		  	 React.createElement("div", {dangerouslySetInnerHTML: {__html:event.message}})
				    		  	 )
				    		  	    )
							  )
							  )
				  })				  
				)
				 
		  );
		}
})
//±±±±±±±±±±±±±±±±±±±±±±±±±±±










//——————————————————————————班级管理<绘制>—————————————————————————— 
/*
 * <班级管理>一层界面绘制;
 * @add_class:添加班级；
 * @edit_class:编辑；
 * @graduate_class:毕业；
 * @flower_name:下载花名册；
 * @handleClick:事件处理在kd_service;
 * @uuids:点击框后班级的ID；编辑按钮需要；
 * */
var Class_EventsTable_byRight = React.createClass({displayName: "Class_EventsTable_byRight",
	 addClass_handleClick: function(m,groupuuid,uuid) {		 
  		btn_click_class_list_byRight(m,groupuuid,uuid);
	 },
  	handleClick: function(m) {	
		 	var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				
				 if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					 uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				 }
				});
			  if(!uuids){
				  alert("至少选择一个班级");
				  return;
			  }
	   var group_uuid=$("input[name='group_uuid']").val();
		btn_click_class_list_byRight(m,group_uuid,uuids);
  		
	 },
	 handleClick_download: function(xlsname) {
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				
				 if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					 uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				 }
				});
			  if(!uuids){
				  alert("至少选择一个班级");
				  return;
			  }
			  var group_uuid=$("input[name='group_uuid']").val();
			 ajax_flowername_download_byRight(group_uuid,uuids,xlsname);
	 },
 handleChange_checkbox_all:function(){
	  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
 },
 handleChange_selectgroup_uuid:function(val){
	  ajax_class_listByGroup_byRight(val);
 },
 getDefaultProps: function() {
	 var data = [
	            {value: 'one', label: '学生基本表 '},
	            {value: 'huaMingCe', label: '幼儿花名册'},
	            {value: 'yiLiaoBaoXian', label: '医疗保险银行代扣批量导入表'},
	            {value: 'doorrecord', label: '导出接送卡表'}
	          ];
	var data=G_selected_dataModelArray_byArray(Vo.getTypeList("exportStudentExcel"),"desc","val");
	    return {
	      down_list: data
	    };
	  },
render: function() {
  return (
  React.createElement("div", null, 
  React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list12}), 
   React.createElement(AMR_Panel, null, 
      React.createElement(AMR_ButtonToolbar, null, 
	  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.addClass_handleClick.bind(this,"add_class",this.props.group_uuid)}, "创建班级"), 
	  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,"edit_class")}, "编辑班级")
	  )
	), 
	  React.createElement(AMR_ButtonToolbar, null, 
      
      React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid})
	  ), 
	  
	  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	  React.createElement(AMUIReact.Selected, {className: "am-hide-sm", btnStyle: "secondary", placeholder: "下载表格到电脑", onChange: this.handleClick_download, btnWidth: "200", multiple: false, data: this.props.down_list})
	  )

	  ), 
	  React.createElement("div", null, "班级总数:"+this.props.events.length), 	
    React.createElement(AMR_Table, React.__spread({},  this.props), 
      React.createElement("thead", null, 
        React.createElement("tr", null, 
        	React.createElement("th", null, 
          React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
          ), 
          React.createElement("th", null, "班级"), 
          React.createElement("th", null, "班主任"), 
          React.createElement("th", null, "老师"), 
          React.createElement("th", null, "学校"), 
	      React.createElement("th", null, "状态"), 
	      React.createElement("th", null, "毕业时间"), 
          React.createElement("th", null, "创建时间")
        )
      ), 
      React.createElement("tbody", null, 
        this.props.events.map(function(event) {
          return (React.createElement(Class_EventRow_byRight, {key: event.id, event: event}));
        })
      )
    )
    )
  );
}
});
  /*
   * <班级管理>列表详细内容绘制;
   * @react_ajax_class_students_manage:调用在（我的班级）公共方法 编辑与添加
   * */
  var Class_EventRow_byRight = React.createClass({displayName: "Class_EventRow_byRight", 
	  render: function() {
	    var event = this.props.event;
	    var className = event.highlight ? 'am-active' :
	      event.disabled ? 'am-disabled' : '';
			if(event.isdisable==1){
				disable=React.createElement("td", null, React.createElement(AMR_Button, {amStyle: "success", disabled: "false"}, "已毕业"))
			}else{
				disable=React.createElement("td", null, React.createElement(AMR_Button, {onClick: ajax_class_disable_byRight.bind(this,event.groupuuid,event.uuid), amStyle: "success"}, "毕业"))
			};
	    return (
	      React.createElement("tr", {className: className}, 
	      React.createElement("td", null, 
	      React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
	      ), 
	        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: react_ajax_class_students_manage_byRight.bind(this, event.uuid)}, event.name)), 
	        React.createElement("td", null, event.headTeacher_name), 
	        React.createElement("td", null, event.teacher_name), 
	        React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 
		    disable, 
            React.createElement("td", null, event.disable_time), 
	        React.createElement("td", null, event.create_time)
	      ) 
	    );
	   }
	  });  
  
/*
* <班级管理>班级添加与编辑模式详情绘制
* @ajax_class_save：提交按钮在Kd_service;
* */	    
  var Class_edit_byRight = React.createClass({displayName: "Class_edit_byRight", 
  	 getInitialState: function() {
  		    return this.props.formdata;
  		  },
  	 handleChange: function(event) {
  		    this.setState($('#editClassForm').serializeJson());
  	  },
  render: function() {
  	  var o = this.state;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  React.createElement("form", {id: "editClassForm", method: "post", className: "am-form"}, 
    		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
    		    React.createElement("div", {className: "am-form-group"}, 		    
    		  React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid})
    		    ), 		    
    		      React.createElement("label", {htmlFor: "name"}, "班级:"), 
    		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过45字！"}), 
    		      React.createElement("br", null), 		   
  		      React.createElement("label", {htmlFor: "name"}, "班主任:"), 
  	  		    React.createElement("input", {type: "hidden", name: "headTeacher", id: "headTeacher", value: o.headTeacher, onChange: this.handleChange}), 
  			      React.createElement("input", {type: "text", id: "headTeacher_name", value: o.headTeacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"headTeacher","headTeacher_name",o.groupuuid), placeholder: ""}), 
  			      React.createElement("br", null), 
  			      React.createElement("label", {htmlFor: "name"}, "老师:"), 
  		  		    React.createElement("input", {type: "hidden", name: "teacher", id: "teacher", value: o.teacher, onChange: this.handleChange}), 
  				      React.createElement("input", {type: "text", id: "teacher_name", value: o.teacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"teacher","teacher_name",o.groupuuid), placeholder: ""}), 
  				      React.createElement("br", null), 
    		      React.createElement("button", {type: "button", onClick: ajax_class_save_byRight, className: "am-btn am-btn-primary"}, "提交")
    		    )

    	     )
    	   )	    	   
    	   )
    );
  }
 }); 
  /*
   *<班级管理>班级学生头像列表界面绘制 
   * @class_students_manage_onClick 添加学生按钮的方法
   * @add：添加学生
   * @class：查看课程;
   *   		    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this,"graduate_class",o.groupuuid,o.uuid)} >毕业</AMR_Button>
   * */
  var AMR_Grid=AMUIReact.Grid;
  var AMR_Col=AMUIReact.Col;
  var Class_students_manage_byRight = React.createClass({displayName: "Class_students_manage_byRight",

	 componentWillReceiveProps: function(nextProps) {    
             this.setState(this.getStateByPropes(nextProps));
     },
	getInitialState: function() {         
		 return this.getStateByPropes(this.props);
	 },
	getStateByPropes:function(nextProps){
		
        var classList=Store.getChooseClass(nextProps.groupuuid);
		
               var queryForm={
				
					classuuid:nextProps.classuuid,
                    groupuuid:nextProps.groupuuid
               };
               var obj= {
				   	 classList:G_selected_dataModelArray_byArray(classList,"uuid" ,"name"),
				     formdata:{},
                    queryForm:queryForm,
                    list: []
               };
               return obj;
     },
	getDefaultProps: function() {
	 var data = [
	            {value: 'edit_class', label: '编辑班级'},
	            {value: 'delete', label: '删除空班级'}
	          ];

	 
	    return {
			 groupList:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_class_m"),"uuid","brand_name"),			
			  down_list: data
			};
	  },
  	 componentDidMount:function(){
  			 G_img_down404();
			   this.ajax_list();
  	  },
	 ajax_callback:function(list,formdata){
		  if (list== null ) this.state.list=[];
		   else
			this.state.list=list;

			this.state.formdata=formdata;
			this.setState(this.state);
	   },
     ajax_list:function(){
               var queryForm=this.state.queryForm;            
	if(!queryForm.classuuid){
		alert("请选择班级");
	return;
		}
			 var formdata={};
     var url = hostUrl + "rest/class/get.json";
 	$.ajax({
 		type : "GET",
 		url : url,
		data :{uuid:queryForm.classuuid},
 		dataType : "json",
 		 async: false,
 		success : function(data) {
 			$.AMUI.progress.done();
 			if (data.ResMsg.status == "success") {
 				formdata=data.data;
 			} else {
 				alert("加载数据失败："+data.ResMsg.message);
 			}
 		},
		error :G_ajax_error_fn
 	});
 	url=hostUrl + "rest/student/getStudentByClassuuid.json?classuuid="+queryForm.classuuid;
		$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			 async: false,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					students=data.list;
					students_number=data.list.length;
				} else {
					alert("加载数据失败："+data.ResMsg.message);
				}
			},
			error :G_ajax_error_fn
		});
 	this.ajax_callback(students,formdata);
    },
	handleChange: function(v) {
		   var queryForm=$('#queryForm').serializeJson();
		   this.state.queryForm=queryForm;
		this.ajax_list();
   },
  	handleClick: function(m,groupuuid,uuid) {		 
  		btn_click_class_list_byRight(m,groupuuid,uuid);
	 },
	 handleChange_selectgroup: function(val) {
		 var classList=Store.getChooseClass(val);
		 var class_uuid;
		 if(classList.length>0){
			 class_uuid=classList[0].uuid; 
		 }else{
			 class_uuid="";
		 }
		 var queryForm=$('#queryForm').serializeJson();
		   this.state.queryForm=queryForm;

		 this.state.classList=G_selected_dataModelArray_byArray(classList,"uuid" ,"name");
		 this.state.queryForm.classuuid=class_uuid;
		this.ajax_list();
		},		 
      handleClick_download: function(groupuuid,uuid,val) {
         btn_click_class_list_byRight(val,groupuuid,uuid);
      },
	
  	render: function() {
		 var queryForm=this.state.queryForm;
  		var o=this.state.formdata;
  		if(!this.state.list)this.state.list=[];
  	  return (
  	  React.createElement("div", null, 
       React.createElement(AMR_Panel, null, 
  	  React.createElement(AMR_ButtonToolbar, null, 
	      React.createElement(AMR_Button, {amStyle: "secondary", onClick: class_students_manage_onClick_byRight.bind(this, "add",o.uuid)}, "添加学生"), 
		    React.createElement(AMR_Button, {amStyle: "secondary", onClick: menu_teachingplan_list_fn_byRight.bind(this,o.uuid)}, "查看课程")
  		  )
  		 ), 
		    React.createElement(AMUIReact.Form, {id: "queryForm", inline: true}, 
		  React.createElement(AMR_ButtonToolbar, null, 
		  
		   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
  		  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "groupuuid", onChange: this.handleChange_selectgroup.bind(this), btnWidth: "200", data: this.props.groupList, btnStyle: "primary", value: queryForm.groupuuid})
  		  ), 
	      React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid2", name: "classuuid", onChange: this.handleChange.bind(this), btnWidth: "200", data: this.state.classList, btnStyle: "primary", value: queryForm.classuuid})
  		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
     	  React.createElement(AMUIReact.Selected, {btnStyle: "secondary", placeholder: "更多操作", onChange: this.handleClick_download.bind(this,o.groupuuid,o.uuid), btnWidth: "200", multiple: false, data: this.props.down_list})
     	  )
		  )
		          ), 
  		  React.createElement(AMR_Panel, null, 
  			  React.createElement(AMR_Grid, {className: "doc-g"}, 
  			  React.createElement(AMR_Col, {className: "am-hide-sm", sm: 6, md: 3}, " 学校:", Store.getGroupNameByUuid(o.groupuuid)), 
			    React.createElement(AMR_Col, {className: "am-hide-sm", sm: 6, md: 3}, " 班级:", o.name), 
			    React.createElement(AMR_Col, {sm: 5, md: 2}, "班主任:", o.headTeacher_name), 
			    React.createElement(AMR_Col, {sm: 4, md: 2}, "老师:", o.teacher_name), 
			    React.createElement(AMR_Col, {sm: 3, md: 2}, "人数:", this.state.list.length)
  			  )
  		  ), 
  		 		React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
			  React.createElement("th", null, "头像"), 
              React.createElement("th", null, "姓名"), 
              React.createElement("th", null, "性别"), 
		      React.createElement("th", null, "状态"), 
              React.createElement("th", null, "出生日期"), 
			  React.createElement("th", null, "身份证"), 
              React.createElement("th", null, "妈妈电话"), 
              React.createElement("th", null, "爸爸电话")
            )
          ), 
          React.createElement("tbody", null, 
            this.state.list.map(function(event) {
              return (React.createElement(Query_class_Students_EventRow_byRight, {key: event.id, event: event}));
            })
          )
        )
  	    )
  	  );
  	}
  	});

 /*  	
   * 班级管理-学生列表在表单上绘制详细内容;
   * @点击后直接调用学生详情方法
   * 调用ajax_class_students_edit_byRight
   * */
  var Query_class_Students_EventRow_byRight = React.createClass({displayName: "Query_class_Students_EventRow_byRight", 
  	  render: function() {
  	    var event = this.props.event;
	  var header_img=event.headimg;
	  if(!header_img)header_img=G_def_noImgPath;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';
		if(!event.status)event.status=0;
  	    return (
  	      React.createElement("tr", {className: className}, 
			React.createElement("td", null, " ", React.createElement(AMUIReact.Image, {id: "img_head_image", width: "28", height: "28", src: header_img})), 
			React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: G_class_students_look_info.bind(this,event.uuid,1,2)}, event.name)), 			
  	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
			React.createElement("td", null, Vo.get("student_status_"+event.status)), 
  	        React.createElement("td", null, event.birthday), 
  	        React.createElement("td", null, event.idcard), 
		  React.createElement("td", null, React.createElement("a", {className: event.ma_tel?"":"am-hide", href: "tel:"+event.ma_tel}, event.ma_tel)), 
            React.createElement("td", null, React.createElement("a", {className: event.ba_tel?"":"am-hide", href: "tel:"+event.ba_tel}, event.ba_tel))
			) 
  	    );
  	  }
  	});   
/*
 * <班级管理>详情界面
 * 添加学生与编辑绘制
 * */
  var Class_student_edit_byRight = React.createClass({displayName: "Class_student_edit_byRight", 
	  	
	
  	 getInitialState: function() {
  		    return this.props.formdata;
  		  },
  	  componentDidMount:function(){
  		  var imgGuid=this.state.headimg; 		    		  
  		 if(imgGuid){
  			 $("#img_head_image").attr("src",G_imgPath+imgGuid); 
  			 G_img_down404("#img_head_image");
  		 }
  	  },
  	/*
  	 * （标头）<班级管理>图片上传功能
  	 * */
  	 btn_class_student_uploadHeadere:function(){
  		w_uploadImg.open(function(guid){
  			$("#headimg").val(guid);
  			 $("#img_head_image").attr("src",G_imgPath+guid); 
  			 G_img_down404("#img_head_image");
  		});	
  	},
		 handleChange: function(event) {
  		    this.setState($('#editClassStudentForm').serializeJson());
  	  },
  render: function() {
  	  var o = this.state;
	  var calss_btn_className="G_Edit_show am-btn am-btn-secondary";
	  if(!o.uuid){
		  calss_btn_className="G_Edit_hide";
	  }
	  if(!o.status)o.status=0;
  	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
  	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
   return (
		   
		   React.createElement("div", null, 
			     React.createElement(AMR_ButtonToolbar, null, 
				   React.createElement("button", {type: "button", className: calss_btn_className, onClick: btn_ajax_student_changeClass_byRight.bind(this,o.groupuuid,o.uuid)}, "换班级")
			 	
			 	  ), 
		   React.createElement("div", {className: "am-cf am-margin-top-sm"}
		 
		   ), 
		   React.createElement("form", {id: "editClassStudentForm", method: "post", className: "am-form"}, 
		     React.createElement(PxInput, {type: "hidden", name: "headimg", id: "headimg", value: o.headimg, onChange: this.handleChange}), 
			React.createElement(PxInput, {type: "hidden", name: "uuid", value: o.uuid}), 
		     React.createElement(PxInput, {type: "hidden", name: "classuuid", value: o.classuuid}), 
		   React.createElement("div", {className: "am-form-group"}, 
		    React.createElement("hr", null), 
			   React.createElement("div", null, 
  		     React.createElement(AMUIReact.Image, {id: "img_head_image", src: G_def_headImgPath, className: "G_img_header"}), 		      
  		      React.createElement("button", {type: "button", onClick: this.btn_class_student_uploadHeadere, className: "am-btn am-btn-secondary"}, "上传头像")		      		      
    		  ), 
 	       React.createElement("label", {className: one_classDiv}, "姓名"), 
   		     React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {icon: "user", type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange})
		        ), 
		       React.createElement("label", {className: one_classDiv}, "昵称"), 
	   		  React.createElement("div", {className: two_classDiv}, 
   		     React.createElement(PxInput, {icon: "user-secret", type: "text", name: "nickname", id: "nickname", value: o.nickname, onChange: this.handleChange})
   		    ), 
			   React.createElement("label", {className: one_classDiv}, "单选"), 
		        React.createElement("div", {className: two_classDiv}, 
		        React.createElement(AMUIReact.FormGroup, null, 
 				React.createElement(PxInput, {type: "radio", name: "sex", value: "0", label: Vo.get( "sex_0"), inline: true, onChange: this.handleChange, checked: o.sex==0?"checked":""}), 
 				React.createElement(PxInput, {type: "radio", name: "sex", value: "1", label: Vo.get( "sex_1"), inline: true, onChange: this.handleChange, checked: o.sex==1?"checked":""})
		        )
		        ), 
   		     React.createElement("label", {className: one_classDiv}, "出生日期"), 
 		      React.createElement("div", {className: two_classDiv}, 
 		       React.createElement(PxInput, {icon: "birthday-cake", type: "text", maxLength: "10", placeholder: "YYYY-MM-DD", name: "birthday", id: "birthday", value: o.birthday, onChange: this.handleChange})
		        ), 
		       React.createElement("label", {className: one_classDiv}, "身份证"), 
			  React.createElement("div", {className: two_classDiv}, 
			 React.createElement(PxInput, {type: "text", name: "idcard", id: "idcard", value: o.idcard, onChange: this.handleChange, placeholder: ""})
		    ), 
			   React.createElement(AMUIReact.Selected, {name: "status", onChange: this.handleChange, btnWidth: "200", data: G_status().data_list, btnStyle: "primary", value: o.status+""}), 
		    React.createElement("fieldset", null, 
		    React.createElement("legend", null, "爸爸妈妈信息"), 
	        React.createElement("label", {className: one_classDiv}, "妈妈姓名"), 
	         React.createElement("div", {className: two_classDiv}, 
	          React.createElement(PxInput, {icon: "user", type: "text", name: "ma_name", id: "ma_name", size: "10", maxLength: "45", value: o.ma_name, onChange: this.handleChange})
	           ), 
	          React.createElement("label", {className: one_classDiv}, "妈妈电话"), 
		     React.createElement("div", {className: two_classDiv}, 
		    React.createElement(PxInput, {icon: "mobile", type: "text", name: "ma_tel", id: "ma_tel", value: o.ma_tel, onChange: this.handleChange})
	       ), 
	        React.createElement("label", {className: one_classDiv}, "妈妈工作"), 
	         React.createElement("div", {className: two_classDiv}, 
		      React.createElement(PxInput, {type: "text", name: "ma_work", id: "ma_work", value: o.ma_work, onChange: this.handleChange})
	           ), 
	          React.createElement("label", {className: one_classDiv}, "爸爸姓名"), 
		     React.createElement("div", {className: two_classDiv}, 
		    React.createElement(PxInput, {icon: "user", type: "text", name: "ba_name", id: "ba_name", size: "10", maxLength: "45", value: o.ba_name, onChange: this.handleChange})
	       ), 
	        React.createElement("label", {className: one_classDiv}, "爸爸电话"), 
	         React.createElement("div", {className: two_classDiv}, 
		      React.createElement(PxInput, {icon: "mobile", type: "text", name: "ba_tel", id: "ba_tel", value: o.ba_tel, onChange: this.handleChange, placeholder: ""})
	           ), 
	          React.createElement("label", {className: one_classDiv}, "爸爸工作"), 
		     React.createElement("div", {className: two_classDiv}, 
		    React.createElement(PxInput, {type: "text", name: "ba_work", id: "ba_work", value: o.ba_work, onChange: this.handleChange, placeholder: ""})
	       ), 
	        React.createElement("label", {className: one_classDiv}, "家庭住址"), 
	         React.createElement("div", {className: two_classDiv}, 
		      React.createElement(PxInput, {icon: "home", type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: ""})
	           )		    
		      ), 		    		      

      React.createElement("div", {className: "am-panel am-panel-default"}, 
        React.createElement("div", {className: "am-panel-hd"}, 
        React.createElement("h4", {className: "am-panel-title", "data-am-collapse": "{parent: '#accordion', target: '#do-not-say-"+o.uuid+"'}"}, 
           "填写更多信息"
          )
        ), 
        React.createElement("div", {id: "do-not-say-"+o.uuid, className: "am-panel-collapse am-collapse"}, 
          React.createElement("div", {className: "am-panel-bd"}, 

		        React.createElement("label", {className: one_classDiv}, "奶奶电话"), 
		         React.createElement("div", {className: two_classDiv}, 
			      React.createElement(PxInput, {icon: "mobile", type: "text", name: "nai_tel", id: "nai_tel", value: o.nai_tel, onChange: this.handleChange, placeholder: ""})
		           ), 
		          React.createElement("label", {className: one_classDiv}, "爷爷电话"), 
			     React.createElement("div", {className: two_classDiv}, 
			    React.createElement(PxInput, {icon: "mobile", type: "text", name: "ye_tel", id: "ye_tel", value: o.ye_tel, onChange: this.handleChange, placeholder: ""})
		       ), 
		        React.createElement("label", {className: one_classDiv}, "外婆电话"), 
		         React.createElement("div", {className: two_classDiv}, 
			      React.createElement(PxInput, {icon: "mobile", type: "text", name: "waipo_tel", id: "waipo_tel", value: o.waipo_tel, onChange: this.handleChange, placeholder: ""})
		           ), 
		          React.createElement("label", {className: one_classDiv}, "外公电话"), 
			     React.createElement("div", {className: two_classDiv}, 
			    React.createElement(PxInput, {icon: "mobile", type: "text", name: "waigong_tel", id: "waigong_tel", value: o.waigong_tel, onChange: this.handleChange, placeholder: ""})
		       ), 
		        React.createElement("label", {className: one_classDiv}, "其他电话"), 
		         React.createElement("div", {className: two_classDiv}, 
			      React.createElement(PxInput, {icon: "phone", type: "text", name: "other_tel", id: "other_tel", value: o.other_tel, onChange: this.handleChange, placeholder: ""})
		           ), 
		             React.createElement(AMUIReact.Input, {type: "textarea", 
			 	 	      label: "说明", 
			 	 	    	 name: "note", 
			 	 	      labelClassName: "am-u-sm-2", 
			 	 	      placeholder: "备注", 
			 	 	      wrapperClassName: "am-u-sm-10", 
			 	 	      amSize: "lg"})

				
						  )
						)
					  ), 

				      React.createElement("button", {type: "button", onClick: btn_ajax_class_student_save_byRight, className: "am-btn am-btn-primary"}, "提交")		      
   		           )
   		          )
   		       )
   );
  }
  });
//±±±±±±±±±±±±±±±±±±±±±±±±±±±
	
	 
	  
//	  
//		
//		
//		
//		<div>
//		<div className="header">
//		  <hr />
//		</div>
//		<div className="am-g">
//		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
//		  <form id="editClassStudentForm" method="post" className="am-form">
//		<input type="hidden" name="uuid"  value={o.uuid}/>
//		     <input type="hidden" name="classuuid"  value={o.classuuid}/>
//		
//		
//		<input type="hidden" name="headimg" id="headimg" value={o.headimg} onChange={this.handleChange}/>
//		      
//		

		      
		      		      


//
//	     </div> 
//	   </div>
//	   
//	   </div>  
		  
		 	 
  
  
//——————————————————————————收支记录<绘制>——————————————————————————
  /*
  * <收支记录>
  * @请求数据成功后执行Accounts_EventsTable方法绘制
  * 在kd_react
  **/
    var Accounts_EventsTable_byRight = React.createClass({displayName: "Accounts_EventsTable_byRight",		
		getStateByPropes:function(nextProps){

			var begDateStr= new Date().format("yyyy-MM")+"-01"; 
			var endDateStr= new Date().format("yyyy-MM-dd"); 
				
			var queryForm={
				begDateStr:begDateStr,
				endDateStr:endDateStr,
				groupuuid:nextProps.groupuuid
			};
			 var obj= {
				queryForm:queryForm,
				pageNo:1,
				type:nextProps.type,
				list: []
			};
			return obj;
		},
		data_type_list:[],
		getInitialState: function() {
			this.data_type_list=G_selected_dataModelArray_byArray(Vo.getTypeList("KD_Accounts_type"),"key","val");

			this.data_type_list.unshift({value:"",label:"所有"});
    	    return this.getStateByPropes(this.props);
    	  },
		handleChange: function(v) {
		 	var queryForm=$('#queryForm').serializeJson();
			this.state.queryForm=queryForm;
		    this.setState(this.state);
	  },
	   componentWillReceiveProps: function(nextProps) {	
		   this.setState(this.getStateByPropes(nextProps));
	},

	  componentDidMount: function() {
		this.ajax_list(); 
	  },
		ajax_callback:function(list,sum_num){
    		 if (list== null ) this.state.list=[];
			 else
    		  this.state.list=list.data;
			this.state.sum_num=sum_num;
			if(this.state.pageNo=="1")this.state.totalCount=list.totalCount;
    		  this.setState(this.state);
    	  },
		ajax_list:function(){
			var queryForm=this.state.queryForm;
			queryForm.pageNo=this.state.pageNo;

    		$.AMUI.progress.start();
    		var that=this;
    		var url = hostUrl + "rest/accounts/listByPage.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data :queryForm,
    			dataType : "json",
    			//async: false,//必须同步执行
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    				    that.ajax_callback( data.list,data.sum_num );     
    				} else {
    					alert(data.ResMsg.message);
    					G_resMsg_filter(data.ResMsg);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		
    	},
    	pageClick: function(m) {
    		 var obj=this.state;
    		 if(m=="pre"){
    			
    			 if(obj.pageNo<2){
    				 G_msg_pop("第一页了");
    				 return;
    			 }
    			 obj.pageNo=obj.pageNo-1;
    			 this.ajax_list(obj);
    			 return;
    		 }else if(m=="next"){
    			 if(!obj.list||obj.list.length==0){
    				 G_msg_pop("最后一页了");
    				 return ;
    			 }
    			 obj.pageNo=obj.pageNo+1;
    			
    			 this.ajax_list(obj);
    			 return;
    		 }
    	},
    	handleClick_query: function(m) {
			this.handleChange();
    		this.state.pageNo=1;
			
			 this.ajax_list();
    	  },
    	  handleChange_selectgroup_uuid: function(val){
    		  ajax_accounts_listByGroup_byRight(val);
        },
		handleClick: function(m) {
    		if(m=="add"){
    			btn_click_accounts_byRight(m,{groupuuid:this.props.group_uuid});
			}
		},
		handle_onKeyDown: function(e){
          if(G_isKeyDown_enter(e)){
               this.handleClick_query();
               return false;
		 }
     },
    render: function() {
			var queryForm=this.state.queryForm;
			 if(!this.state.totalCount)this.state.totalCount=0;
			 if(!this.state.sum_num)this.state.sum_num=0;
      return (
      React.createElement("div", null, 
		 React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list22}), 
		  React.createElement(AMUIReact.Form, {id: "queryForm", inline: true, onKeyDown: this.handle_onKeyDown}, 
           React.createElement(AMR_Panel, null, 
		    React.createElement(AMR_ButtonToolbar, null, 
		   
	      React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    	  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上一页")
          ), 	
		  
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
          React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", this.state.pageNo, "页")
          ), 	
		
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    	  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下一页")
          ), 
			  
   		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    	  React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "add")}, "添加")
		  ), 	
		  
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
			   React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, maxLength: "10", icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", dateTime: queryForm.begDateStr, onChange: this.handleChange})
	    		
	 	   ), 
			  
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
			   React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, maxLength: "10", icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", dateTime: queryForm.endDateStr, onChange: this.handleChange})
	    		
		   )
		 )
        ), 
		 React.createElement(AMR_ButtonToolbar, null, 
			   
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMUIReact.Selected, {name: "groupuuid", value: queryForm.groupuuid, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary"})	  
    	  ), 
			   
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    	  React.createElement(AMUIReact.Selected, {name: "type", value: queryForm.type, data: this.data_type_list, onChange: this.handleChange, placeholder: "所有", btnWidth: "200", multiple: false, btnStyle: "primary"})	 
    	  ), 
         
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	      React.createElement(PxInput, {type: "text", name: "title", value: queryForm.invoice_num, onChange: this.handleChange, placeholder: "内容、学生名、单据号、填写人"})
          ), 
	    
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick_query.bind(this)}, "查询")
          )
    	   )
		    ), 
    	
		  React.createElement("h6", null, "总金额:"+this.state.sum_num+"元.总条数:"+this.state.totalCount), 
         React.createElement(Accounts_EventsTable2_byRight, React.__spread({}, this.props, {events: this.state.list}))
        )
      );
    }
    });

	//——————————————————————————收支记录<绘制>——————————————————————————
  /*
  * <收支记录>
  * @请求数据成功后执行Accounts_EventsTable方法绘制
  * 在kd_react
  **/
    var Accounts_EventsTable2_byRight = React.createClass({displayName: "Accounts_EventsTable2_byRight",
	 getDefaultProps: function() {
		    return {
		     responsive: true, bordered: true, striped :true,hover:true,striped:true
		    };
		  },
    	render: function() {
      return (
      React.createElement("div", null, 
       React.createElement(AMR_Table, React.__spread({},  this.props, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}), 
          React.createElement("thead", null, 
              React.createElement("tr", null, 
              React.createElement("th", null, "类型"), 
              React.createElement("th", null, "内容"), 
              React.createElement("th", null, "金额"), 
              React.createElement("th", null, "收费日期"), 
              React.createElement("th", null, "学生"), 
              React.createElement("th", null, "班级"), 
			  React.createElement("th", null, "单据号"), 
			  React.createElement("th", null, "备注"), 
              React.createElement("th", null, "学校"), 
              React.createElement("th", null, "填写人"), 
              React.createElement("th", null, "填写时间")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.events.map(function(event) {
              return ( 
				  React.createElement("tr", {key: "_"+event.uuid}, 
  	     React.createElement("td", null, " ", Vo.get("KD_Accounts_type_"+event.type)), 
  	     React.createElement("td", null, event.title), 
  	     React.createElement("td", null, " ", event.num), 
  	     React.createElement("td", null, G_getDateYMD(event.accounts_time)), 	     
  	     React.createElement("td", null, " ", event.studentname), 
  	     React.createElement("td", null, " ", Store.getClassByUuid(event.classuuid).name), 
		 React.createElement("td", null, " ", event.invoice_num), 
		 React.createElement("td", null, " ", event.description), 
  	     React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 	      
  	     React.createElement("td", null, event.create_user), 
  	     React.createElement("td", null, event.create_time)
  	    ) )
            })
          )
        )
        )
      );
    }
    });
 
  /*
   * <收支记录>添加按钮详情绘制;
   * @ajax_accounts_save：保存按钮调用
   * @ajax_accounts_save：保存继续按钮
   * 都在kd_service；
   * */ 
  var Accounts_edit_byRight = React.createClass({displayName: "Accounts_edit_byRight", 
  	 getInitialState: function() {

		  var o = this.props.formdata;	  
  		if(!o.type){			
  			o.type="3";
  		};
		if(!o.accounts_timeStr){
			o.accounts_timeStr= new Date().format("yyyy-MM-dd"); 
		}
		this.auto_addValue(o);
  		   return this.loadData(this.props.formdata);
  		},
  	  handleChange_groupuuid: function(v) {
  		 	var formdata=$('#editAccountsForm').serializeJson();
  		 	formdata.groupuuid=v;
  		 	formdata.classuuid="";
  		 	formdata.studentuuid="";		 	
  		    this.setState(this.loadData(formdata));
  	  },
  	handleChange: function(v) {
		 	var formdata=$('#editAccountsForm').serializeJson();
		    this.setState(this.loadData(formdata));
	  },
		auto_addValue:function(formdata){
			formdata.title=Vo.get("KD_Accounts_type_"+formdata.type);
			if(formdata.accounts_timeStr){
				var tmpArr=formdata.accounts_timeStr.split("-");
				if(tmpArr.length>1){
					formdata.title+=tmpArr[0]+"年"+tmpArr[1]+"月";
				}
			}
	  },
  	  handleChange_type: function(v) {
  		 	var formdata=$('#editAccountsForm').serializeJson();
  		 	formdata.type=v;
			this.auto_addValue(formdata);
  		    this.setState(this.loadData(formdata));
  	  },
  	  handleChange_classuuid: function(v) {
  		 	var formdata=$('#editAccountsForm').serializeJson();
  		 	formdata.classuuid=v;
  		 	formdata.studentuuid="";
  		    this.setState(this.loadData(formdata));
  	  },
  	  handleChange_studentuuid: function(v) {
  		 	var formdata=$('#editAccountsForm').serializeJson();
  		 	formdata.studentuuid=v;
  		    this.setState(this.loadData(formdata));
  	  },
  	  loadData:function(formdata){
			 this.canSave=true;
		   if(!formdata.groupuuid){
  			  formdata.groupuuid=this.props.group_list[0].value;
  		  }
  		  formdata.tmp_classList=G_selected_dataModelArray_byArray(Store.getChooseClass(formdata.groupuuid),"uuid","name");
  		  if(formdata.classuuid){
  			  formdata.tmp_studentList=	G_selected_dataModelArray_byArray(Store.getClassStudentsList(formdata.classuuid),"uuid","name")
  		  }else{
  			  formdata.tmp_studentList=[];
  		  }
		  if(this.state)formdata.list=this.state.list;

  		  return formdata;
  	  },	  

		  	ajax_callback:function(list){
    		 if (list== null ) this.state.list=[];
			 else
    		  this.state.list=list.data;
			
    		  this.setState(this.state);
    	  },
		ajax_list:function(){
			var formdata=$('#editAccountsForm').serializeJson();
  		 	
    		$.AMUI.progress.start();
    		var that=this;
    		var url = hostUrl + "rest/accounts/listByPage.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data :{create_useruuid:Store.getUserinfo().uuid,groupuuid:formdata.groupuuid},
    			dataType : "json",
    			//async: false,//必须同步执行
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    				    that.ajax_callback( data.list );     
    				} else {
    					alert(data.ResMsg.message);
    					G_resMsg_filter(data.ResMsg);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		
    	},
		componentDidMount: function() {
		this.ajax_list(); 
	  },
		 canSave:true,//没有变化的数据不允许保存。防止重复保存。
		ajax_accounts_saveAndAdd_byRight:function(){
			var that=this;
			if(!that.canSave){
				G_msg_pop("数据重复，已保存。请修改内容后保存。");
			}
				var opt={
				 formName: "editAccountsForm",
				 url:hostUrl + "rest/accounts/save.json",
				 cbFN:function(data){
					G_msg_pop("保存成功!");
					that.canSave=false;
					that.ajax_list();
				 }
		    };
			G_ajax_abs_save(opt);
		},
  render: function() {
  	  var o = this.state;	  
  		if(!o.type){			
  			o.type="3";
  		};
		if(!o.accounts_timeStr){
			o.accounts_timeStr= new Date().format("yyyy-MM-dd"); 
		}
		if(!this.state.list)this.state.list=[];
  		var one_classDiv= "am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
  		var two_classDiv= "am-u-lg-10 am-u-md-10 am-u-sm-8";
   return (
   		React.createElement("div", null, 
   		 React.createElement("div", {className: "header"}, 
   		  React.createElement("hr", null)
   		   ), 
   		    React.createElement("form", {id: "editAccountsForm", method: "post", className: "am-form"}, 
   	         React.createElement("div", {className: "am-form-group"}, 	   
 	          React.createElement(AMR_ButtonToolbar, null, 
 	         React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
  		    React.createElement(AMUIReact.Selected, {name: "groupuuid", onChange: this.handleChange_groupuuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid+""})	 			          
  		   ), 
  		    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    		 React.createElement(AMUIReact.Selected, {name: "type", onChange: this.handleChange_type, btnWidth: "200", multiple: false, data: this.props.type_list, btnStyle: "primary", value: o.type+""})	 
    		  ), 
    		 React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    		React.createElement(AMUIReact.Selected, {name: "classuuid", placeholder: "班级选择", onChange: this.handleChange_classuuid, btnWidth: "200", multiple: false, data: o.tmp_classList, btnStyle: "primary", value: o.classuuid+""})	 
    	   ), 
    		React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    		 React.createElement(AMUIReact.Selected, {name: "studentuuid", placeholder: "学生选择", onChange: this.handleChange_studentuuid, btnWidth: "200", multiple: false, data: o.tmp_studentList, btnStyle: "primary", value: o.studentuuid+""})	 
    		  )
             ), 
		    React.createElement("label", {className: one_classDiv}, "收费日期:"), 
		   React.createElement("div", {className: two_classDiv}, 
	 	    React.createElement(PxInput, {icon: "calendar", type: "text", maxLength: "10", placeholder: "YYYY-MM-DD", name: "accounts_timeStr", value: o.accounts_timeStr, onChange: this.handleChange})		   		
	 		 ), 	
		    React.createElement("label", {className: one_classDiv}, "内容:"), 
		   React.createElement("div", {className: two_classDiv}, 
   	      React.createElement(PxInput, {type: "text", name: "title", id: "title", maxLength: "64", value: o.title, onChange: this.handleChange, placeholder: "不超过64字"})
 		 ), 	
		  React.createElement("label", {className: one_classDiv}, "金额:"), 
	       React.createElement("div", {className: two_classDiv}, 
	   	    React.createElement(PxInput, {type: "number", name: "num", id: "num", value: o.num, onChange: this.handleChange, placeholder: ""})
	 		 ), 	
	   React.createElement("label", {className: one_classDiv}, "单据号:"), 
	       React.createElement("div", {className: two_classDiv}, 
	   	    React.createElement(PxInput, {type: "text", name: "invoice_num", id: "invoice_num", maxLength: "45", value: o.invoice_num, onChange: this.handleChange, placeholder: ""})
	 		 ), 	
			React.createElement("label", {className: one_classDiv}, "备注:"), 
		   React.createElement("div", {className: two_classDiv}, 
	  	  React.createElement(PxInput, {type: "text", name: "description", id: "description", maxLength: "100", value: o.description, onChange: this.handleChange, placeholder: "不超过100字"})
		 ), 
		 React.createElement("button", {type: "button", onClick: this.ajax_accounts_saveAndAdd_byRight.bind(this), className: "am-btn am-btn-primary"}, "提交")
 	      
   	       )
   		    ), 
 React.createElement(Accounts_EventsTable2_byRight, {events: this.state.list})
   	         )
   );
  }
  });






  
//——————————————————————————收支记录<绘制>——————————————————————————
  /*
  * <收支记录>
  * @请求数据成功后执行Accounts_EventsTable方法绘制
  * 在kd_react
  **/
    var Accounts_listForYear_byRight = React.createClass({displayName: "Accounts_listForYear_byRight",	
		 add_month:14,
		add_monthArr:[],
		getStateByPropes:function(nextProps){
			
			
			var begDateStr= new Date().format("yyyy"); 
			if(!nextProps.type)nextProps.type="3";

			var classlist=Store.getChooseClass(nextProps.groupuuid);
			var classuuid =null;
			if(classlist&&classlist.length>0){
				classuuid=classlist[0].uuid;
			}

			var queryForm={
				begDateStr:begDateStr,
				type:nextProps.type,
				classuuid:classuuid,
				groupuuid:nextProps.groupuuid
			};

			
			 var obj= {
				queryForm:queryForm,
				type:nextProps.type,
				
					classlist:G_selected_dataModelArray_byArray(classlist,"uuid","name"),
				list: []
			};
			return obj;
		},
		data_type_list:[],
		getInitialState: function() {
			 this.add_monthArr=[];
			 for(var i=1;i<=this.add_month;i++){
				 if(i>12){
					 tmp=i-12;
					this.add_monthArr.push(i);
				 }else{
					this.add_monthArr.push(i);
				 }
				
			 }

			this.data_type_list=G_selected_dataModelArray_byArray(Vo.getTypeList("KD_Accounts_type"),"key","val");

    	    return this.getStateByPropes(this.props);
    	  },
		pageClick: function(m) {
		 var yyyy_mm=this.state.queryForm.begDateStr;
		 var num=1;
		 if(m=="pre"){
			num=-1;
		 }
		try{
			var year=parseInt(yyyy_mm,10);
			if(!year){
				G_msg_pop("输入格式不正确!");
				return;
			}
			 this.state.queryForm.begDateStr=year+num; 
			 this.setState(this.state); 
			  this.ajax_list();
			}catch(e){
				
			}
		
		

	},
		handleChange: function(v) {
		 	var queryForm=$('#queryForm').serializeJson();
			this.state.queryForm=queryForm;
		    this.setState(this.state);
	  },
	   componentWillReceiveProps: function(nextProps) {	
		   this.setState(this.getStateByPropes(nextProps));
	},

	
		ajax_callback:function(list){
    		 if (list== null ) this.state.list=[];
			 else
    		  this.state.list=list;
			
    		  this.setState(this.state);
    	  },
	
		ajax_list:function(){
			var queryForm=this.state.queryForm;
			queryForm.add_month=this.add_month;
    		$.AMUI.progress.start();
    		var that=this;
    		var url = hostUrl + "rest/accounts/listForYear.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data :queryForm,
    			dataType : "json",
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    				    that.ajax_callback( data.list );     
    				} else {
    					alert(data.ResMsg.message);
    					G_resMsg_filter(data.ResMsg);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		
    	},
    	handleChange_selectgroup_uuid: function(val){
    		  ajax_accounts_listByGroup_byRight(val);
        },
		handleClick: function(m) {
    		if(m=="add"){
    			btn_click_accounts_byRight(m,{groupuuid:this.props.group_uuid});
			}
		},
		handle_onKeyDown: function(e){
          if(G_isKeyDown_enter(e)){
               this.handleClick_query();
               return false;
		 }
     },
	handleChange_selectgroup: function(val) {
		this.state.queryForm.groupuuid=val;
		var classlist=Store.getChooseClass(val);
		var classuuid =null;
		if(classlist&&classlist.length>0){
			classuuid=classlist[0].uuid;
		}
		this.state.classlist=G_selected_dataModelArray_byArray(classlist,"uuid","name");
		this.state.queryForm.classuuid=classuuid;
		this.setState(this.state); 
		 
	},
	
    render: function() {
			var queryForm=this.state.queryForm;
		var that=this;
			var year=parseInt(queryForm.begDateStr,10);
			if(!year){
				year=1;
			}
      return (

       React.createElement("div", null, 
	    React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list23}), 
 		 React.createElement(AMUIReact.Form, {id: "queryForm", inline: true, onKeyDown: this.handle_onKeyDown}, 
		  React.createElement(AMR_Panel, null, 
		   React.createElement(AMR_ButtonToolbar, null, 
          		   
	          React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
			  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上年")	  
			  ), 
	    
			  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	 		  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下年")	  
              ), 
	  		       
			  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	          React.createElement(PxInput, {icon: "calendar", type: "text", maxLength: "74", size: "4", placeholder: "YYYY", name: "begDateStr", value: queryForm.begDateStr, onChange: this.handleChange})	
		      ), 
	  	     
			  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
			  React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.ajax_list.bind(this)}, "查询")
		      )	  
	         )
		    ), 

		  React.createElement(AMR_ButtonToolbar, null, 
		    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
			React.createElement(AMUIReact.Selected, {name: "groupuuid", value: queryForm.groupuuid, onChange: this.handleChange_selectgroup, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary"})	  
		    ), 	
	      
		    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
			React.createElement(AMUIReact.Selected, {name: "classuuid", value: queryForm.classuuid, onChange: this.handleChange, btnWidth: "200", data:  this.state.classlist, btnStyle: "primary"})
            ), 	
             
			React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    		React.createElement(AMUIReact.Selected, {name: "type", value: queryForm.type, data: this.data_type_list, onChange: this.handleChange, placeholder: "所有", btnWidth: "200", multiple: false, btnStyle: "primary"})	 
    	 	)	

    	     )
   		    ), 

    	      React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
              React.createElement("thead", null, 
              React.createElement("tr", null, 
              React.createElement("th", null, "学生名"), 
			  this.add_monthArr.map(function(event_add,index) {
					var yearShow=year;
					var monthShow=event_add;
					if(index>=12){
						yearShow=year+1;
						monthShow=event_add-12;
					}
					var showAll=yearShow+"-"+monthShow;
					 return (  React.createElement("th", null, showAll) )
				
			 })
            
            )
          ), 
          React.createElement("tbody", null, 
            this.state.list.map(function(event) {
			    return ( 
				  React.createElement("tr", {key: "_"+event.uuid}, 
  				 React.createElement("td", null, event.name), 
				   that.add_monthArr.map(function(event_add,index) {

					var yearShow=year;
					var monthShow=event_add;
					if(index>=12){
						yearShow=year+1;
						monthShow=event_add-12;
					}
					var day=1;// new Date().format("dd");
					var showAll=yearShow+"-"+monthShow+"-"+day;

						var formData={
							accounts_timeStr:showAll,
							title:"",
							num:event["month"+index],
							groupuuid:queryForm.groupuuid,
							classuuid:queryForm.classuuid,
							studentuuid:event.uuid,
							studentname:event.name,
							type:queryForm.type,
							invoice_num:""
						};
					  return (  React.createElement("td", null, React.createElement(Account_edit_inner, {formData: formData})) )
				 })
  			  ) )
            })
          )
        ), 

React.createElement("div", {className: "am-modal am-modal-prompt", tabindex: "-1", id: "account_edit_prompt"}, 
  React.createElement("div", {className: "am-modal-dialog"}, 
    React.createElement("div", {className: "am-modal-hd", id: "account_edit_prompt_hd"}), 
    React.createElement("div", {className: "am-modal-bd", id: "account_edit_prompt_bd"}, 
      "来来来，吐槽点啥吧"
    ), 
    React.createElement("div", {className: "am-modal-footer"}, 
      React.createElement("span", {className: "am-modal-btn", "data-am-modal-cancel": true}, "取消"), 
      React.createElement("span", {className: "am-modal-btn", "data-am-modal-confirm": true}, "提交")
    )
  )
)
	

        )
      );
    }
    });


 /*
   * <收支记录>添加按钮详情绘制;
   * @ajax_accounts_save：保存按钮调用
   * @ajax_accounts_save：保存继续按钮
   * 都在kd_service；
   * */ 
  var Accounts_edit_prompt = React.createClass({displayName: "Accounts_edit_prompt", 
  	 getInitialState: function() {

		  var o = this.props.formdata;	  
  		if(!o.type){			
  			o.type="3";
  		};
		if(!o.accounts_timeStr){
			o.accounts_timeStr= new Date().format("yyyy-MM-dd"); 
		}
		
			this.canSave=false;
			 setTimeout(function(){$("#num").focus();},500);
  		    return o;
  	 },
  	componentWillReceiveProps: function(nextProps) {
		  this.setState(nextProps.formdata);
		   setTimeout(function(){$("#num").focus();},500);
		},
	
  	handleChange: function(v) {
		this.canSave=false;
		 	var formdata=$('#editAccountsForm').serializeJson();
		    this.setState(formdata);
	  },
	
  	 
  render: function() {

	 
  	  var o = this.state;	  
  		
		if(!o.accounts_timeStr){
			o.accounts_timeStr= new Date().format("yyyy-MM-dd"); 
		}
	
  		var one_classDiv= "am-u-sm-5 am-form-label";
  		var two_classDiv= "am-u-sm-7";
   return (
   		React.createElement("div", null, 
   		 React.createElement("div", {className: "header"}, 
   		  React.createElement("hr", null)
   		   ), 
   		    React.createElement("form", {id: "editAccountsForm", method: "post", className: "am-form"}, 
	   React.createElement("input", {type: "hidden", name: "groupuuid", value: o.groupuuid}), 
	      React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
	      React.createElement("input", {type: "hidden", name: "classuuid", value: o.classuuid}), 
	    React.createElement("input", {type: "hidden", name: "studentuuid", value: o.studentuuid}), 
	    React.createElement("input", {type: "hidden", name: "classuuid", value: o.classuuid}), 
   	         React.createElement("div", {className: "am-form-group"}, 	   
 	        
		    React.createElement("label", {className: one_classDiv}, "收费日期:"), 
		   React.createElement("div", {className: two_classDiv}, 
			React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "accounts_timeStr", id: "accounts_timeStr", value: o.accounts_timeStr, dateTime: o.accounts_timeStr, onChange: this.handleChange})
	
	 		 ), 	
		    React.createElement("label", {className: one_classDiv}, "内容:"), 
		   React.createElement("div", {className: two_classDiv}, 
   	      React.createElement(PxInput, {type: "text", name: "title", id: "title", maxLength: "64", value: o.title, onChange: this.handleChange, placeholder: "不超过64字"})
 		 ), 	
		  React.createElement("label", {className: one_classDiv}, "金额:"), 
	       React.createElement("div", {className: two_classDiv}, 
	   	    React.createElement(PxInput, {type: "number", name: "num", id: "num", onChange: this.handleChange, placeholder: ""})
	 		 ), 	
	   React.createElement("label", {className: one_classDiv}, "单据号:"), 
	       React.createElement("div", {className: two_classDiv}, 
	   	    React.createElement(PxInput, {type: "text", name: "invoice_num", id: "invoice_num", maxLength: "45", value: o.invoice_num, onChange: this.handleChange, placeholder: ""})
	 		 ), 	
			React.createElement("label", {className: one_classDiv}, "备注:"), 
		   React.createElement("div", {className: two_classDiv}, 
	  	  React.createElement(PxInput, {type: "text", name: "description", id: "description", maxLength: "100", value: o.description, onChange: this.handleChange, placeholder: "不超过100字"})
		 )
		  
   	       )
   		    )
   	         )
   );
  }
  });
 var Account_edit_inner = React.createClass({displayName: "Account_edit_inner",
	 getInitialState: function() {
		return this.props.formData;
	  },
	 componentWillReceiveProps: function(nextProps) {
			this.setState(nextProps.formData);
	  },
	  auto_addValue:function(formdata){
		formdata.title=Vo.get("KD_Accounts_type_"+formdata.type);
		if(formdata.accounts_timeStr){
			var tmpArr=formdata.accounts_timeStr.split("-");
			if(tmpArr.length>1){
				formdata.title+=tmpArr[0]+"年"+tmpArr[1]+"月";
			}
		}
  },
	get_prompt_title:function(){
		var s=this.state.studentname;//学生姓名			
		s+=","+this.state.title;
		return s;
	  },
	 save_account: function(callback) {
		  var that=this;
		var opt={
				 formName: "editAccountsForm",
				 url:hostUrl + "rest/accounts/save.json",
				 cbFN:function(data){
					G_msg_pop("保存成功!");
					if(that.state.num){
						that.state.num+=";"+$("#num").val();
					}else{
						that.state.num=$("#num").val();
					}
				
					that.setState(that.state);
					if(callback)callback();
				 }
		    };
			G_ajax_abs_save(opt);
	  },

	add_account:function(){
		var that=this;
		this.auto_addValue(this.state);
		this.state.description="";
		$("#account_edit_prompt_hd").html(this.get_prompt_title());
		  React.render(React.createElement(Accounts_edit_prompt,{
		formdata:this.state
		}), document.getElementById('account_edit_prompt_bd'));
	
		//var callback=function(callback1){	that.save_account(callback1);

			  $('#account_edit_prompt').modal({
				  relatedTarget: this,
					  closeOnConfirm:false,
				  onConfirm: function(e) {
					  var model1=this;
					  this.relatedTarget.save_account(function(){model1.close()})
				//	callback(function(){model1.close()});
				  },
				  onCancel: function(e) {
					
				  }
				});
	  },
	 render: function() {
			if(this.state.num){
				return(
					React.createElement("span", null, this.state.num, " ", React.createElement(AMR_Button, {className: "am-icon-plus", onClick: this.add_account.bind(this)}))
				)
			}
      return (
			 React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.add_account.bind(this)}, "添加")
		  )
	 }

 });



 
  /*
  学费统计图表加载
   * */
  var Account_ECharts_Div_byRight = React.createClass({displayName: "Account_ECharts_Div_byRight", 
  	 getInitialState: function() {
			var o=this.props;
			if(!o.type)o.type="3";
  		    return o;
  		  },
			  

	/**
	 * 选择不同统计条件是,请求数据.
	 * @param data
	 */
	ajax:function(formdata){
		if(!formdata||!formdata.type||!formdata.groupuuid){
			return;
		}
		var re_data={};
		$.AMUI.progress.start();
		var url = hostUrl + "rest/statistics/getAccountPerMonthOfYear_bar.json";
		$.ajax({
			type : "GET",
			url : url,
			data:formdata,
			dataType : "json",
			async: false,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					re_data=data.list;
					var arr=formdata.type.split("_");
					PXECharts["echart_bar"](data.data);
				} else {
					alert(data.ResMsg.message);
				}
			},
			error : G_ajax_error_fn
		});
	},
  	componentDidMount:function(){
		  var that=this;
  		var tmp_fn=function(){
  			 var o=$('#editEchartForm').serializeJson();
		that.ajax(o);
	 };
	 if(typeof(require)=="undefined"){
		 var js="http://echarts.baidu.com/build/dist/echarts.js";
		 loadJS(js,tmp_fn)
	 }else{
		 tmp_fn();
	 }
	
  },
  handleChange: function(event) {
		 var o=$('#editEchartForm').serializeJson();
		   this.setState(o);
		 this.ajax(o);
		    //PXECharts.loading();
	  },
  render: function() {
	  var o = this.state;
    return (
      React.createElement("div", null, 
		   React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list18}), 
		  React.createElement("form", {id: "editEchartForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
           React.createElement(AMR_Panel, null, 
		    React.createElement(AMR_ButtonToolbar, null, 
		
		   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		   React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", id: "begDateStr", dateTime: o.begDateStr, onChange: this.handleChange})
	 	   ), 
			  
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", id: "endDateStr", dateTime: o.endDateStr, onChange: this.handleChange})
		  ), 

		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
    	  React.createElement("button", {type: "button", onClick: this.handleChange, className: "am-btn am-btn-secondary"}, "查询")
		  )
			  
		 )
        ), 
		 React.createElement(AMR_ButtonToolbar, null, 
			   
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	      React.createElement(AMUIReact.Selected, {inline: true, name: "groupuuid", value: o.groupuuid, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary"})
    	  ), 
			   
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	      React.createElement(AMUIReact.Selected, {inline: true, name: "type", value: o.type, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.statistics_type_list, btnStyle: "primary"})
    	  )
         

    	   )
		    ), 
    	
    		 React.createElement("div", {id: "main_ECharts", className: "ECharts"})
  	    		)
  	    );
  	  }
  	}); 
  //±±±±±±±±±±±±±±±±±±±±±±±±±±±  
//——————————————————————————学生列表<绘制>——————————————————————————  
  /*
   * 学生列表服务器请求后绘制处理方法；
   * @</select>下拉多选框;
   * @handleChange_stutent_Selected:学校查询；
   * @handleChange_class_Selected::班级查询；
   * @btn_query_click:名字查找；
   * */
  var Query_stutent_list_byRight = React.createClass({displayName: "Query_stutent_list_byRight",
		getInitialState: function() {
			return this.getStateByPropes(this.props); 
		  },
		getStateByPropes:function(nextProps){
			var classList=Store.getChooseClass(nextProps.group_uuid);
				classList=G_selected_dataModelArray_byArray(classList,"uuid","name");
			classList.unshift({value:"",label:"所有"});
			var status_list= G_selected_dataModelArray_byArray(Vo.getTypeList("student_status"),"key","val");
			status_list.unshift({value:"",label:"所有"});
			nextProps.status_list=status_list;
			nextProps.group_list.unshift({value:"",label:"所有"});
		   var queryForm={
				status:"",
				classuuid:"",
				name:"",
				groupuuid:nextProps.group_uuid
		   };
		   var obj= {
				queryForm:queryForm,
				pageNo:1,
				classList:classList,
				type:nextProps.type,
				list: []
		   };
		   return obj;
	  },
		
		
	   componentWillReceiveProps: function(nextProps) {
		 
		   this.setState(this.getStateByPropes(nextProps));
		},
	handleChange_selectgroup: function(val) {
	this.state.groupuuid=val;
	var classlist=Store.getChooseClass(val);
	
	this.state.classList=G_selected_dataModelArray_byArray(classlist,"uuid","name");
	this.state.classList.unshift({value:"",label:"所有"});
	this.handleChange();
},
  	handleChange: function() {

		   var queryForm=$('#queryForm').serializeJson();
               this.state.queryForm=queryForm;
              this.setState(this.state);

  	  }, 
  	 pageClick: function(m) {
              var obj=this.state;
              if(m=="pre"){
                   
                   if(obj.pageNo<2){
                        G_msg_pop("第一页了");
                        return;
                   }
                   obj.pageNo=obj.pageNo-1;
                   this.ajax_list(obj);
                   return;
              }else if(m=="next"){
                   if(!obj.list||obj.list.length==0){
                        G_msg_pop("最后一页了");
                        return ;
                   }
                   obj.pageNo=obj.pageNo+1;
                   
                   this.ajax_list(obj);
                   return;
              }
         },
         handleClick_query: function(m) {
              this.state.pageNo=1;
               this.ajax_list();
           },
		componentDidMount: function() {
          this.ajax_list(); 
       },
		ajax_list:function(){
               var queryForm=this.state.queryForm;
               queryForm.pageNo=this.state.pageNo;

              $.AMUI.progress.start();
              var that=this;
              var url = hostUrl + "rest/student/querybyRight.json";
              $.ajax({
                   type : "GET",
                   url : url,
                   data :queryForm,
                   dataType : "json",
                   //async: false,//必须同步执行
                   success : function(data) {
                        $.AMUI.progress.done();
                        if (data.ResMsg.status == "success") {
                            that.ajax_callback( data.list);     
                        } else {
                             alert(data.ResMsg.message);
                             G_resMsg_filter(data.ResMsg);
                        }
                   },
                   error : G_ajax_error_fn
              });
              
         },
		ajax_callback:function(list){
              if (list== null ) this.state.list=[];
               else
                this.state.list=list.data;

               if(this.state.pageNo=="1")this.state.totalCount=list.totalCount;
                this.setState(this.state);
           },
  		
  render: function() {
  

	   var queryForm=this.state.queryForm;
               if(!this.state.totalCount)this.state.totalCount=0;
               if(!this.state.sum_num)this.state.sum_num=0;

  	
      return (
        React.createElement("div", null, 
          React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list16}), 
  	     
          React.createElement(AMR_Panel, null, 
         React.createElement(AMR_ButtonToolbar, null, 
        
           React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
           React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上一页")
          ), 
            
            React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
				 React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "共", this.state.totalCount, "条,第", this.state.pageNo, "页")
   
          ), 
          
            React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
           React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下一页")
          )
	     )
	     ), 

 React.createElement("form", {id: "queryForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
   	 React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  	  React.createElement(AMUIReact.Selected, {className: "am-fl", name: "groupuuid", onChange: this.handleChange_selectgroup, btnWidth: "200", placeholder: "所有", multiple: false, data: this.props.group_list, btnStyle: "primary", value: queryForm.groupuuid})
  	   ), 	 
  	    React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  	   React.createElement(AMUIReact.Selected, {className: "am-fl", name: "classuuid", onChange: this.handleChange, btnWidth: "200", placeholder: "所有", multiple: false, data: this.state.classList, btnStyle: "primary", value: queryForm.classuuid})
  	  ), 
		   React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  	   React.createElement(AMUIReact.Selected, {className: "am-fl", name: "status", onChange: this.handleChange, btnWidth: "200", placeholder: "所有", multiple: false, data: this.props.status_list, btnStyle: "primary", value: queryForm.status})
  	  ), 
  	   React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  	    React.createElement("input", {type: "text", name: "name", value: queryForm.name, onChange: this.handleChange, placeholder: "学生姓名"})	  
  	     )
), 
  	    React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  	   React.createElement("button", {type: "button", onClick: this.handleClick_query, className: "am-btn am-btn-primary"}, "搜索")
  	  ), 	
  
        React.createElement(AMR_Table, React.__spread({},  this.props), 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "姓名"), 
              React.createElement("th", null, "昵称"), 
              React.createElement("th", null, "性别"), 
		      React.createElement("th", null, "状态"), 
              React.createElement("th", null, "出生日期"), 
              React.createElement("th", null, "班级"), 
              React.createElement("th", null, "身份证")
            )
          ), 
          React.createElement("tbody", null, 
            this.state.list.map(function(event) {
              return (React.createElement(Query_EventRow_byRight, {key: event.uuid, event: event}));
            })
          )
        )
        )
      );
    }
  });
      
  /*  	
   * 学生列表在表单上绘制详细内容;
   * @点击后直接调用学生详情方法
   * 调用ajax_class_students_look_info
   * 进入前btn_students_list_click按钮事件内添加Queue.push保证回退正常;
   * */
  var Query_EventRow_byRight = React.createClass({displayName: "Query_EventRow_byRight", 
  	btn_students_list_click:function(uuid,nmae){
  		G_class_students_look_info(uuid,1,1)
  	},
  	  render: function() {
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';
        if(!event.status)event.status=0;
  	    return (
  	      React.createElement("tr", {className: className}, 
  	        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: this.btn_students_list_click.bind(this,event.uuid,event.name)}, event.name)), 
  	        React.createElement("td", null, event.nickname), 
  	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
            React.createElement("td", null, Vo.get("student_status_"+event.status)), 
  	        React.createElement("td", null, event.birthday), 
  	        React.createElement("td", null, " ", Store.getClassByUuid(event.classuuid).name), 
  	        React.createElement("td", null, event.idcard)
  	      ) 
  	    );
  	  }
  	}); 



  //±±±±±±±±±±±±±±±±±±±±±±±±±±±  
  
  
  
  
  /*
  图表加载
   * */
  var ECharts_Div_byRight = React.createClass({displayName: "ECharts_Div_byRight", 
  	 getInitialState: function() {
  		    return this.props;
  		  },
  	componentDidMount:function(){
  		var tmp_fn=function(){
  			 var o=$('#editEchartForm').serializeJson();
		 PXECharts_ajax.ajax(o);
	 };
	 if(typeof(require)=="undefined"){
		 var js="http://echarts.baidu.com/build/dist/echarts.js";
		 loadJS(js,tmp_fn)
	 }else{
		 tmp_fn();
	 }
	
  },
  handleChange: function(event) {
		 var o=$('#editEchartForm').serializeJson();
		   this.setState(o);
		 PXECharts_ajax.ajax(o);
		    //PXECharts.loading();
	  },
  render: function() {
	  var o = this.state;
    return (
    		React.createElement("div", null, 
             React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list18}), 
    		 React.createElement("form", {id: "editEchartForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
    		 React.createElement("div", null, 
		          React.createElement(AMR_Panel, null, 
                  React.createElement(AMR_ButtonToolbar, null, 

				  React.createElement("div", {className: "am-margin-bottom-xs am-margin-left-xs  am-u-lg-3  am-u-sm-6"}, 
	    		 React.createElement(AMUIReact.Selected, {inline: true, name: "type", value: o.type, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.statistics_type_list, btnStyle: "primary"})
	    		 ), 
				 React.createElement("div", {className: "am-margin-bottom-xs am-margin-left-xs  am-u-lg-3  am-u-sm-6"}, 
							    		 
				React.createElement(AMUIReact.Selected, {inline: true, name: "groupuuid", value: o.groupuuid, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary"})
	    		 ), 

				 React.createElement("div", {className: "am-margin-bottom-xs am-margin-left-xs am-u-lg-2 am-u-sm-6"}, 					    		 
				 React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", id: "begDateStr", dateTime: o.begDateStr, onChange: this.handleChange})
	    		 ), 
				 React.createElement("div", {className: "am-margin-bottom-xs am-margin-left-xs  am-u-lg-2 am-u-sm-6"}, 
			    React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", id: "endDateStr", dateTime: o.endDateStr, onChange: this.handleChange})
	    		 
	    		 ), 
    		 	 React.createElement("div", {className: "am-margin-bottom-xs am-margin-left-xs  am-u-lg-2"}, 
  				  React.createElement("button", {type: "button", onClick: this.handleChange, className: "am-btn am-btn-secondary"}, "查询")	  				
  	  	         )




		         )
		          )


    		 ), 
    		 React.createElement("div", {className: "am-cf"})
    		 ), 
    		 
    		 React.createElement("div", {id: "main_ECharts", className: "ECharts"})
  	    		)

  	    );
  	  }
  	}); 
  //±±±±±±±±±±±±±±±±±±±±±±±±±±±  
  

  
  
  
//——————————————————————————评价老师<绘制>——————————————————————————  
  /*
   * 评价老师服务器请求后绘制处理方法；
   * @</select>下拉多选框;
   * @handleChange_stutent_Selected:学校查询；
   * @btn_query_click:名字查找；
   * */
  var Query_teachingjudge_list_byRight = React.createClass({displayName: "Query_teachingjudge_list_byRight",
    handleChange_group_Selected: function(val) {
  	  var begDateStr=$('#begDateStr').val();
  	  var endDateStr=$('#endDateStr').val();
  	  var teacher_name=$('#sutdent_name').val();
  	  var type=this.props.type;
  	  ajax_teachingjudge_query_byRight(begDateStr,endDateStr,val,teacher_name,type);
  	  }, 
    handleChange_type_Selected: function(val) {
  	  var begDateStr=$('#begDateStr').val();
  	  var endDateStr=$('#endDateStr').val();
  	  var teacher_name=$('#sutdent_name').val();
  	  var groupuuid=this.props.group_uuid;
  		  ajax_teachingjudge_query_byRight(begDateStr,endDateStr,groupuuid,teacher_name,val);
      },
    btn_teachingjudge_click:function(){
  	  var begDateStr=$('#begDateStr').val();
  	  var endDateStr=$('#endDateStr').val();
  	  var teacher_name=$('#sutdent_name').val();
  	  var groupuuid=this.props.group_uuid;
  	  var type=this.props.type;

   ajax_teachingjudge_query_byRight(begDateStr,endDateStr,groupuuid,teacher_name,type); 
     },
    handleChange: function(event) {
  		 var o=$('#editEchartForm').serializeJson();
  		   this.setState(o);
  	  },
  render: function() { 
      return (


      React.createElement("div", null, 
		  React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list21}), 
  	  React.createElement("hr", null), 	  
  	  React.createElement("div", {className: "am-form-group"}, 
  		React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 

          React.createElement(AMR_Panel, null, 
		  React.createElement(AMR_ButtonToolbar, null, 
              
		  React.createElement("div", {className: "am-f1 am-margin-bottom-xs am-margin-left-xs am-u-lg-3 am-u-sm-6"}, 	
  	  	  React.createElement(PxInput, {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "姓名"})
	      ), 

	      React.createElement("div", {className: "am-f1 am-margin-bottom-xs am-margin-left-xs am-u-lg-3 am-u-sm-6"}, 	
  		  React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", id: "begDateStr", dateTime: this.props.begDateStr, onChange: this.handleChange})
          ), 		
	 
		  React.createElement("div", {className: "am-f1 am-margin-bottom-xs am-margin-left-xs am-u-lg-3 am-u-sm-6"}, 		
          React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", id: "endDateStr", dateTime: this.props.endDateStr, onChange: this.handleChange})
  		  ), 	
	          
		  React.createElement("div", {className: "am-f1 am-margin-bottom-xs am-margin-left-xs"}, 
  		  React.createElement("button", {type: "button", className: "am-u-sm-2", onClick: this.btn_teachingjudge_click, className: "am-btn am-btn-secondary"}, "查询")	  				
  	  	  )
      )
  	 ), 


   	 React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  	  React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid1", name: "group_uuid", onChange: this.handleChange_group_Selected, btnWidth: "200", btnStyle: "primary", data: this.props.group_list, value: this.props.group_uuid})
  	   ), 	 
	 React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  	  React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid2", name: "type", onChange: this.handleChange_type_Selected, btnWidth: "200", btnStyle: "primary", data: this.props.teachingjudge_typelist, value: this.props.type})
  	   )

  	  )
  	  
  	  ), 	  
        React.createElement(AMR_Table, React.__spread({},  this.props), 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "老师姓名"), 
              React.createElement("th", null, "满意度"), 
              React.createElement("th", null, "评价详情"), 
              React.createElement("th", null, "评价人"), 
              React.createElement("th", null, "评价时间")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.events.map(function(event) {
              return (React.createElement(Query_teachingjudge_EventRow_byRight, {key: event.id, event: event}));
            })
          )
        )
        )
      );
    }
  });
      
  /*  	
   * 评价老师在表单上绘制详细内容;
   * @点击后直接调用学生详情方法
   * 调用ajax_class_students_look_info
   * 进入前btn_students_list_click按钮事件内添加Queue.push保证回退正常;
   * */
  var Query_teachingjudge_EventRow_byRight = React.createClass({displayName: "Query_teachingjudge_EventRow_byRight",
  	  render: function() {
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';

  	    return (
  	      React.createElement("tr", {className: className}, 
  	        React.createElement("td", null, event.teacher_name), 
  	        React.createElement("td", null, Vo.get("KD_Teachingjudge_type_"+event.type)), 
  	        React.createElement("td", null, event.content), 
  	        React.createElement("td", null, event.create_user), 
  	        React.createElement("td", null, event.create_time)
  	      ) 
  	    );
  	  }
  	}); 
  //±±±±±±±±±±±±±±±±±±±±±±±±±±±




  
//——————————————————————————老师资料管理——————————————————————————
  
  /*
  * 老师资料管理服务器请求后绘制处理方法；
  * @</select>下拉多选框;
  * */
  var UserTeacher_EventsTable_div = React.createClass({displayName: "UserTeacher_EventsTable_div",
  	load_more_btn_id:"load_more_",
  	pageNo:1,
  	classnewsreply_list_div:"am-list-news-bd",
  	componentWillReceiveProps:function(){
  		this.refresh_data();
  	},
  	componentDidMount:function(){
  		this.load_more_data();
  	},
		 getInitialState: function() {
		return {groupuuid:this.props.groupuuid};
	  },
  	//逻辑：首先创建一个“<div>” 然后把div和 pageNo   list_div,groupuuid,name,pageNo
  	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
  	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
  	load_more_data:function(){
	
  		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
  		var that=this;
  		var callback=function(re_data){
  			if(!re_data)return;
  			if(re_data.data.length<re_data.pageSize){
  				$("#"+that.load_more_btn_id).hide();
  			}else{
  				$("#"+that.load_more_btn_id).show();
  			}
  			if(that.pageNo==1){
  				$("#div_totalNumber").html("总人数:"+re_data.totalCount);
  			}
  			that.pageNo++;
  		}
  		
  		ajax_userTeacher_listByGroup(this.classnewsreply_list_div+this.pageNo,$("input[name='group_uuid']").val(),$('#sutdent_name').val(),this.pageNo,callback);
  	},
  	refresh_data:function(){
//  		classnewsreply_list_div 清除；
//        load_more_data	重新绘制DIV；
	this.setState({groupuuid:$("input[name='group_uuid']").val()});
  	//	this.forceUpdate();
  		this.pageNo=1;
  		$("#"+this.classnewsreply_list_div).html("");
  		this.load_more_data();
  		
  	},		
  	 getDefaultProps: function() {
		 var data = [
				{value: 'huaMingCe', label: '教师花名册'},
				{value: 'dengjibiao', label: '教师基本情况登记表'}
		          ];

		    return {
		      down_list: data
		    };
		  },
		  handleClick_download: function(xlsname) {
				 var uuids=null;
				  var groupuuid=$("input[name='group_uuid']").val();
				  if(!groupuuid){
					  G_msg_pop("请选择学校!");
					  return;
				  }
				  var inputs;
				 	var url = hostUrl + "rest/userteacher/exportExcel.json";
				 	   inputs+='<input type="hidden" name="groupuuid" value="'+groupuuid+'" />'; 
				 	 inputs+='<input type="hidden" name="xlsname" value="'+xlsname+'" />'; 
				        // request发送请求
				 	$('<form action="'+ url +'" method="post">'+inputs+'</form>')
				      .appendTo('body').submit().remove();
		 },
   render: function() {
  	 this.load_more_btn_id="load_more_"+this.props.uuid;
     return (
  		   React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 		   
  	       React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list8}), 
  		   React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 	
		   React.createElement(AMR_Panel, null, 	   
  		     React.createElement(AMR_ButtonToolbar, null, 

  				  React.createElement("div", {className: "am-fl  am-margin-bottom-xs am-margin-left-xs"}, 
  				  React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "姓名或手机号码"})	  
  				  ), 

  				  React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  				  React.createElement("button", {type: "button", onClick: this.refresh_data.bind(this), className: "am-btn am-btn-secondary"}, "搜索")
  				  )

  			)
		   )
  		  ), 
		 React.createElement(AMR_ButtonToolbar, null, 

		   	  React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  			  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.refresh_data.bind(this), btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.state.groupuuid})
  			  ), 
		   		
			  React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
  			  React.createElement(AMUIReact.Selected, {className: "am-hide-sm", btnStyle: "secondary", placeholder: "下载表格到电脑", onChange: this.handleClick_download, btnWidth: "200", multiple: false, data: this.props.down_list})
  			  )

		 ), 
  				  React.createElement("div", {id: "div_totalNumber"}, "总人数:"
  				  ), 	
  		    React.createElement("div", {id: this.classnewsreply_list_div}
  			  ), 		   
  		   		   
  			  React.createElement("div", {className: "am-list-news-ft"}, 
  			    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
  			  )		  
  			)		   		   
     );     
   }
  } 
     );
//1.本科,2.大专,3.中专,4.职高,5.硕士

     var UserTeacher_EventRow = React.createClass({displayName: "UserTeacher_EventRow",
  		  render: function() {
  			    var event = this.props.events;
  			    var className = event.highlight ? 'am-active' :
  		  event.disabled ? 'am-disabled' : '';
  			    return (		  		    
  			    		  React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
  				          React.createElement("tr", null, 
  				            React.createElement("th", null, "姓名"), 
  				            React.createElement("th", null, "电话"), 
  				            React.createElement("th", null, "性别"), 	
  				            React.createElement("th", null, "民族"), 
  				            React.createElement("th", null, "身份证号码"), 
  				            React.createElement("th", null, "出生年月"), 
  				            React.createElement("th", null, "职务"), 
  				            React.createElement("th", null, "学历"), 
  				            React.createElement("th", null, "学前教育专业学历"), 
  				            React.createElement("th", null, "幼教资格证"), 
  				            React.createElement("th", null, "毕业院校及专业"), 
  				            React.createElement("th", null, "所教学科"), 
  				            React.createElement("th", null, "技术职称"), 
  				            React.createElement("th", null, "教师资格证编号"), 
  				            React.createElement("th", null, " 工作类型"), 
  				            React.createElement("th", null, "家庭住址"), 
  				            React.createElement("th", null, "备注"), 
  				            React.createElement("th", null, "最后修改时间")
  				          ), 			 
  			    			  this.props.events.map(function(event) {
  			    			      return (
  			    			 React.createElement("tr", {className: className}, 			    				   	        
  			    				   	React.createElement("td", null, event.realname), 
  			    				   	React.createElement("td", null, event.tel), 
  			    				    React.createElement("td", null, Vo.get("sex_"+event.sex)), 
  			    				    React.createElement("td", null, event.nation), 
  			    				  React.createElement("td", null, event.idcard), 
  			    				React.createElement("td", null, event.birthday), 
  			    				React.createElement("td", null, event.zhiwu), 			    				
  			    				React.createElement("td", null, Vo.get("xueli_"+event.xueli)), 
  			    				 React.createElement("td", null, Vo.get("youOrWu_"+event.youxueqianjiaoyu)), 
  			    				 React.createElement("td", null, Vo.get("youOrWu_"+event.youjiaozige)), 
  			    				React.createElement("td", null, event.graduated), 
  			    				React.createElement("td", null, event.teaching_subject), 
  			    				React.createElement("td", null, event.professional_title), 
  			    				React.createElement("td", null, event.teacher_certificate_number), 			    				   	        
  			    				React.createElement("td", null, event.work_type), 
  			    				React.createElement("td", null, event.address), 
  			    				React.createElement("td", null, event.note), 
  			    				React.createElement("td", null, event.update_time)
  			    				   	        ) 
  			    			    		  )
  			    			         })	
  			    			  )		  
  			    	  );
  		}	     
     	});    
//±±±±±±±±±±±±±±±±±±±±±±±±±±±  


//——————————————————————————修改教师资料——————————————————————————
 /*
  * <修改教师资料>绘制
  *  1.本科,2.大专,3.中专,4.职高,5.硕士
  * */
     var Div_userteacher_update = React.createClass({displayName: "Div_userteacher_update", 
     	 getInitialState: function() {
     		    return this.props.formdata;
     		  },
     	 handleChange: function(event) {
     		    this.setState($('#commonform').serializeJson());
     	  },
     	render: function() {
     		var o = this.state;
     	     var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
     	     var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
     	return (
			 		React.createElement("div", null, 
			 	     React.createElement("div", {className: "am-form-group"}, 
			 	      React.createElement("hr", null), 
					   React.createElement("form", {id: "commonform", method: "post", className: "am-form", action: "javascript:void(0);"}, 		     		
		    		  React.createElement("label", {className: one_classDiv }, "电话号码:"), 
		    		 React.createElement("div", {className: two_classDiv }, 
		   		    React.createElement(PxInput, {type: "text", name: "tel", id: "tel", value: o.tel, onChange: this.handleChange, maxLength: "20", placeholder: "必填，不超过15字"})
		    	   ), 
						
					React.createElement("label", {className: one_classDiv}, "性别："), 
		            React.createElement("div", {className: two_classDiv}, 
		            React.createElement(AMUIReact.FormGroup, null, 
		      		React.createElement(PxInput, {type: "radio", name: "sex", value: "0", label: Vo.get( "sex_0"), inline: true, onChange: this.handleChange, checked: o.sex==0?"checked":""}), 
		      		React.createElement(PxInput, {type: "radio", name: "sex", value: "1", label: Vo.get( "sex_1"), inline: true, onChange: this.handleChange, checked: o.sex==1?"checked":""})
		            )
		            ), 
    		           React.createElement("label", {className: one_classDiv }, "真实姓名:"), 
    		          React.createElement("div", {className: two_classDiv }, 
      		         React.createElement(PxInput, {type: "text", name: "realname", id: "realname", maxLength: "20", value: o.realname, onChange: this.handleChange})
    		        ), 
     		         React.createElement("label", {className: one_classDiv }, "身份证号码:"), 
		              React.createElement("div", {className: two_classDiv }, 
   	                   React.createElement(PxInput, {type: "text", name: "idcard", id: "idcard", maxLength: "20", value: o.idcard, onChange: this.handleChange})
		                ), 	      
 		               React.createElement("label", {className: one_classDiv }, "职务:"), 
		              React.createElement("div", {className: two_classDiv }, 
   	                 React.createElement(PxInput, {type: "text", maxLength: "50", name: "zhiwu", id: "zhiwu", value: o.zhiwu, onChange: this.handleChange, placeholder: "教师"})
		            ), 		  
	 		         React.createElement("label", {className: one_classDiv }, "民族:"), 
			          React.createElement("div", {className: two_classDiv }, 
		   	           React.createElement(PxInput, {type: "text", maxLength: "50", name: "nation", id: "nation", value: o.nation, onChange: this.handleChange, placeholder: "汉"})
			            ), 		    
     	               React.createElement(AMUIReact.Selected, {id: "xueli1", name: "xueli", onChange: this.handleChange, btnWidth: "200", data: this.props.userteacherlist, btnStyle: "primary", value: o.xueli+""}), 
     	    	      React.createElement("hr", null), 

					React.createElement("label", {className: one_classDiv}, "学前教育专业学历："), 
		            React.createElement("div", {className: two_classDiv}, 
		            React.createElement(AMUIReact.FormGroup, null, 
				    React.createElement(PxInput, {type: "radio", name: "youxueqianjiaoyu", value: "0", label: Vo.get( "yesOrNo_0"), inline: true, onChange: this.handleChange, checked: o.youxueqianjiaoyu==0?"checked":""}), 
				    React.createElement(PxInput, {type: "radio", name: "youxueqianjiaoyu", value: "1", label: Vo.get( "yesOrNo_1"), inline: true, onChange: this.handleChange, checked: o.youxueqianjiaoyu==1?"checked":""})
		            )
		            ), 

					React.createElement("label", {className: one_classDiv}, "取得幼教资格证："), 
		            React.createElement("div", {className: two_classDiv}, 
		            React.createElement(AMUIReact.FormGroup, null, 
 	                React.createElement(PxInput, {type: "radio", name: "youjiaozige", value: "0", label: Vo.get( "yesOrNo_0"), inline: true, onChange: this.handleChange, checked: o.youjiaozige==0?"checked":""}), 
 	                React.createElement(PxInput, {type: "radio", name: "youjiaozige", value: "1", label: Vo.get( "yesOrNo_1"), inline: true, onChange: this.handleChange, checked: o.youjiaozige==1?"checked":""})
		            )
		            ), 
 
							 
 		 		       React.createElement("label", {className: one_classDiv }, "毕业院校及专业:"), 
 				        React.createElement("div", {className: two_classDiv }, 
 	     		         React.createElement(PxInput, {type: "text", name: "graduated", id: "graduated", maxLength: "50", value: o.graduated, onChange: this.handleChange, placeholder: "不超过50个字"})
 				          ), 
       		 		     React.createElement("label", {className: one_classDiv }, "所教学科:"), 
 				        React.createElement("div", {className: two_classDiv }, 
 	     			   React.createElement(PxInput, {type: "text", name: "teaching_subject", id: "teaching_subject", maxLength: "50", value: o.teaching_subject, onChange: this.handleChange, placeholder: "主题活动"})
 				      ), 				      
   		 		       React.createElement("label", {className: one_classDiv }, "专业技术职称:"), 
 				        React.createElement("div", {className: two_classDiv }, 
 	     	             React.createElement(PxInput, {type: "text", name: "professional_title", id: "professional_title", maxLength: "50", value: o.professional_title, onChange: this.handleChange, placeholder: "幼教职称等级"})
 				          ), 					
    		 		     React.createElement("label", {className: one_classDiv }, "教师资格证编号:"), 
     				    React.createElement("div", {className: two_classDiv }, 
     	     		   React.createElement(PxInput, {type: "text", name: "teacher_certificate_number", id: "teacher_certificate_number", maxLength: "20", value: o.teacher_certificate_number, onChange: this.handleChange, placeholder: ""})
     				  ), 				      
     		 		   React.createElement("label", {className: one_classDiv }, "工作类型:"), 
     				    React.createElement("div", {className: two_classDiv }, 
     	     			 React.createElement(PxInput, {type: "text", name: "work_type", id: "work_type", value: o.work_type, onChange: this.handleChange, maxLength: "20", placeholder: "专职或兼职"})
     				      ), 							      
      		 		     React.createElement("label", {className: one_classDiv }, "家庭住址:"), 
     				    React.createElement("div", {className: two_classDiv }, 
     	     		   React.createElement(PxInput, {type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, maxLength: "100", placeholder: "不超过100个字"})
     				  ), 					            
                       React.createElement(AMUIReact.Input, {type: "textarea", 
      	                 label: "备注", 
      	                 name: "note", 
      	    	         value: o.note, 
      	    	         onChange: this.handleChange, 
                       	 labelClassName: "am-u-sm-2", 
                       	 placeholder: "小学教师证等", 
                       	 wrapperClassName: "am-u-sm-10", 
      	                 amSize: "lg"}), 
                         React.createElement("br", null), 	
     	        React.createElement("button", {type: "button", onClick: ajax_userteacher_save, className: "am-btn am-btn-primary"}, "提交")	      
     	       )
     		  )
     	     )
     	);
     	}
     }); 
//±±±±±±±±±±±±±±±±±±±±±±±±±±± 
     
   //——————————————————————————刷卡记录——————————————————————————
     /*
      * <今日签到>绘制
      * */  
     var Teacher_class_sign_today = React.createClass({displayName: "Teacher_class_sign_today",	 
    	 ajaxdata:{},
    	 getInitialState: function() {
 			this.ajaxdata={
 					students:null,
 					cards:null,
 					signs:null,
 					classuuid:this.props.classuuid
 			}
 			return this.ajaxdata;
 		  },
 		 componentDidMount:function(){
 			  this.ajax_list(this.props.classuuid);
      	},
 		  handleChange_selectgroup_uuid:function(val){
 	    	   this.ajax_list(val);
 	    	  G_myclass_choose=val;
 	       },
 	       //2
 		 ajax_callback:function(obj){
 			 if(obj.students&&obj.cards&&obj.signs){
 				 this.setState(obj);
 			 }
     	},
     	//1
     	ajax_list:function(classuuid){
     		if(!classuuid){
     			G_msg_pop("无班级")
     			return;
     		}
     		this.ajaxdata={
     				students:null,
 					cards:null,
 					signs:null,
 					classuuid:classuuid};
     		//加载学生
     		 this.ajax_students(classuuid);
     		//加载学生绑定卡
     		 this.ajax_cards(classuuid);
     		//家长学生今天签到记录
     		 this.ajax_signs(classuuid);
     	},
     	 ajax_students:function(classuuid){
     		 var that=this;
     		$.AMUI.progress.start();	
     		var formdata=null;
     		//班级学生列表
     	    var url = hostUrl + "rest/student/getStudentByClassuuid.json";
     		$.ajax({
     			type : "GET",
     			url : url,
     			data:{classuuid:classuuid},
     			dataType : "json",
     			success : function(data) {
     				$.AMUI.progress.done();
     				if (data.ResMsg.status == "success") {
     					if(!data.list)data.list=[];
     					that.ajaxdata.students=data.list;
     					//that.setState(that.ajaxdata);
     					that.ajax_callback(that.ajaxdata);
     				} else {
     					alert("加载数据失败："+data.ResMsg.message);
     				}
     			},
     			error : G_ajax_error_fn
     		});
     		
     	},
     	ajax_cards:function(classuuid){
    		 var that=this;
    		$.AMUI.progress.start();	
    		var formdata=null;
    		//班级学生列表
    	    var url = hostUrl + "rest/studentbind/queryByClassuuid.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data:{classuuid:classuuid},
    			dataType : "json",
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    					if(!data.list)data.list=[];
    					that.ajaxdata.cards=data.list;
//    					that.setState(that.ajaxdata);
    					that.ajax_callback(that.ajaxdata);
    				} else {
    					alert("加载数据失败："+data.ResMsg.message);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		
    	},
    	 ajax_signs:function(classuuid){
    		 var that=this;
    		$.AMUI.progress.start();	
    		var formdata=null;
    		//班级学生列表
    	    var url = hostUrl + "rest/studentSignRecord/queryTodayCountByClassuuid.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data:{classuuid:classuuid},
    			dataType : "json",
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    					if(!data.list)data.list=[];
    					that.ajaxdata.signs=data.list;
    				//	that.setState(that.ajaxdata);
    					that.ajax_callback(that.ajaxdata);
    				} else {
    					alert("加载数据失败："+data.ResMsg.message);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		
    	},
    	 parse_ajaxdata:function(obj){
    		if(!obj||!obj.students)return obj;
    		var formdata=obj.students;
    		var cards=obj.cards;
    		var signs=obj.signs;
    		for(var i=0;i<formdata.length;i++){
    			//卡号 b2.studentuuid,b2.cardid,b2.userid,s1.name
      			if(cards){
      		       for(var s=0;s<cards.length;s++){
      		    	if(formdata[i].uuid==cards[s][0]){
      		    		if(formdata[i].cardID)formdata[i].cardID+=",";
      		    		else formdata[i].cardID="";
      		    		if(!cards[s][1])cards[s][1]="申请中("+cards[s][2]+")";
      		    		formdata[i].cardID+=cards[s][1];
      		    	}        	   
      		       }
      			}
    			//签到标志
    			if(signs){
    			       for(var s=0;s<signs.length;s++){
    			    	if(formdata[i].uuid==signs[s][0]){
    			    		formdata[i].qiandao=true;
    			    	}        	   
    			       }
    				}
    		}
    		return obj;
    	},
    	getDefaultProps: function() {

			 var data=G_selected_dataModelArray_byArray(Vo.getTypeList("exportStudentExcel"),"desc","val");
    	          return {
    	            down_list: data
    	          };
    	        },
    	        handleClick_download: function(xlsname) {
    				  var class_uuid=$("input[name='class_uuid']").val();
    				 ajax_flowername_download_byRight("",class_uuid,xlsname);
    		 },
     render: function() {
    	 var obj=this.parse_ajaxdata(this.state);
    	 
    	 if(!obj.students){
    		 obj.students=[];
    	 }
     return (
     React.createElement("div", null, 
		 
           React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
		   React.createElement(AMR_Panel, null, 
           React.createElement(AMR_ButtonToolbar, null, 
           React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
     	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "class_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.classList, btnStyle: "primary", value: obj.classuuid})
     	  ), 
     	  React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
     	  React.createElement(AMUIReact.Selected, {btnStyle: "secondary", placeholder: "请在电脑上导出", onChange: this.handleClick_download, btnWidth: "200", multiple: false, data: this.props.down_list})
     	  )
    	 
     	  )
     	  )
		  ), 
	   	      
       React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
         React.createElement("thead", null, 
           React.createElement("tr", null, 
             React.createElement("th", null, "姓名"), 
             React.createElement("th", null, "卡号"), 
             React.createElement("th", null, "今日签到")
           )
         ), 
         React.createElement("tbody", null, 
           obj.students.map(function(event) {
             return (React.createElement(ClassCard_EventRow, {key: event.id, event: event}));
           })
         )
       )
       )
     );
     }
     });
     /*
     * 刷卡记录详情内容绘制;am-table-bordered
     * */
     var ClassCard_EventRow = React.createClass({displayName: "ClassCard_EventRow", 
       render: function() {
         var event = this.props.event;
         var className = event.highlight ? 'am-active' :
           event.disabled ? 'am-disabled' : '';

         return (
           React.createElement("tr", {className: className}, 
           React.createElement("td", null, " ", React.createElement("a", {href: "javascript:void(0);", onClick: G_class_students_look_info.bind(this,event.uuid,1,2)}, event.name)), 
             React.createElement("td", null, event.cardID), 
			  React.createElement("td", {className: event.qiandao?"":"px_color_red"}, event.qiandao?"已签到":"无", React.createElement(AMUIReact.Button, {onClick: ajax_ClassCard_info_byRight.bind(this,event.uuid), amStyle: "secondary"}, "详情"))

             ) 
         );
       }
     });       
     
     
     
     
     //——————————————————————————班级互动<绘制>——————————————————————————
     /* 
      * <班级互动>绘制舞台
      * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
      * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
      * @btn_click_announce:点击按钮事件跳转kd_servise方法;
      * */
     var Classnews_Div_list_byRight = React.createClass({displayName: "Classnews_Div_list_byRight", 
     	load_more_btn_id:"load_more_",
     	pageNo:1,
     	classnewsreply_list_div:"am-list-news-bd",
     	type:null,
     	//同一模版,被其他调用是,Props参数有变化,必须实现该方法.
     	  componentWillReceiveProps: function(nextProps) {
     		  this.type=nextProps.type;
     			this.load_more_data();
     		},
     	componentDidMount:function(){
     		this.load_more_data();
     	},
     	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
     	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
     	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
     	load_more_data:function(){
     		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
     		var that=this;
     		var callback=function(re_data){
     			if(!re_data)return;
     			if(re_data.data.length<re_data.pageSize){
     				$("#"+that.load_more_btn_id).hide();
     			}else{
     				$("#"+that.load_more_btn_id).show();
     			}
     			that.pageNo++;
     		}
     	ajax_classs_Mygoodlist_byRight(this.classnewsreply_list_div+this.pageNo,this.pageNo,this.type,callback);
     		

     	},
     	refresh_data:function(){
//     		classnewsreply_list_div 清除；
//           load_more_data	重新绘制DIV；
     		try{G_clear_pureview();}catch(e){};
     		$("#"+this.classnewsreply_list_div).html("");
     		this.forceUpdate();
     		this.pageNo=1;
     		this.load_more_data();
     		
     	},
     	selectclass_uuid_val:null,
     	handleClick: function(m,num) {
     		if(m=="add"){
     			btn_click_classnews_byRight(m,{classuuid:this.selectclass_uuid_val});
     			 return;
     		 }else{
     			 ajax_classnews_list_div_byRight(num); 		
     		 }
     	  },
     render: function() {
     	this.type=this.props.type;
     	this.load_more_btn_id="load_more_"+this.props.uuid;
       return (			
     		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		   React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list5}), 
		        React.createElement(AMR_Panel, null, 
     		    React.createElement(AMUIReact.ButtonToolbar, null, 
     		    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.refresh_data.bind(this)}, "刷新"), 
     		    React.createElement(G_help_popo, {msg: G_tip.Classnews_admin})
     		    )
     		    ), 
	            React.createElement(Div_MyClassnewStatistics_byRight, null), 
     			React.createElement("hr", null), 	 
     		    
     		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-news-bd"}		   		    
     		  ), 
     		  
     		  React.createElement("div", {className: "am-list-news-ft"}, 
     		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
     		  )
     		  
     		  
     		  
     		)
     		  
     			
       );
     }
     });
     //显示我的班级互动统计数据
     var Div_MyClassnewStatistics_byRight = React.createClass({displayName: "Div_MyClassnewStatistics_byRight", 
     	
     	getInitialState: function() {
     		var o={
     				disabled:true,
     				title:"加载中..."
     		}
     		return o;
     	  },
     	  
     	componentDidMount:function(){
     		this.ajax_list();
     	},
     	  ajax_callback:function(data){
     		  this.state.title=data.data;
     		  this.state.disabled=false;
     		  this.setState(this.state);
     	  },
     	 ajax_list:function(){
     		 var that=this;
     		  this.state.disabled=true;
     		  this.setState(this.state);
     		var url = hostUrl + "rest/classnews/getMyClassnewStatistics.json";
     		$.ajax({
     			type : "GET",
     			url : url,
     			dataType : "json",
     			success : function(data) {
     				if (data.ResMsg.status == "success") {
     					that.ajax_callback(data);
     				} else {
     					that.state.disabled=false;
     					that.setState(that.state);
     					G_resMsg_filter(data.ResMsg);
     				}
     			},
     			error : function(){
     				that.state.disabled=false;
     				that.setState(that.state);
     			}
     		});
     		
     	},
     	render: function() {
     		if(this.state.disabled)this.state.title="加载中...";
     		return (
     		 React.createElement(AMR_Button, {className: "am-margin-top-xs", amStyle: "success", amSize: "sm", block: true, disabled: this.state.disabled, onClick: this.ajax_list.bind(this)}, this.state.title)
     	);
     	}
     }); 
     /*
     * <班级互动>;
     * @Classnews_EventRow:绘制列表详情;
     * */
     var Classnews_EventsTable_byRight = React.createClass({displayName: "Classnews_EventsTable_byRight",	  
     render: function() {
     	var that=this;
     return (
     React.createElement("div", null, 
       this.props.events.data.map(function(event) {
         return (React.createElement(Classnews_show_byRight, {event: event}));
       })
     )
     );
     }
     });
     /*
     * <班级互动>MAp详情绘制
     * var o = this.props.formdata;
     */
     var Classnews_show_byRight = React.createClass({displayName: "Classnews_show_byRight", 
     	handleClick_pinglun:function(val){
     		  this.selectclass_uuid_val=val;
     		  ajax_classnews_list_byRight(this.selectclass_uuid_val);
     	  },	  
     	  componentDidMount:function(){
     		  $('.am-gallery').pureview();
     		},
     	render: function() {		  
     		  var  o = this.props.event;
     		  if(!o.dianzanList)o.dianzanList=[];
     		  if(!o.imgsList)o.imgsList=[];
     		  if(!o.create_img)o.create_img=G_def_headImgPath;
     		  
			  var contentDiv=( React.createElement("div", {dangerouslySetInnerHTML: {__html:o.content}}));

			  if(o.url){
					 contentDiv=(  React.createElement("a", {href: "javascript:void(0);", onClick: common_classnews_url.bind(this,o.url)}, React.createElement("div", {className: "classnews_url", dangerouslySetInnerHTML: {__html:o.content}}), "  "));
			  }
     	  return (
     			  React.createElement("div", null, 
     			  React.createElement("article", {className: "am-comment am-margin-xs"}, 
     			  React.createElement("a", {href: "javascript:void(0);"}, 
     			    React.createElement("img", {src: o.create_img, className: "am-comment-avatar", width: "48", height: "48"})
     			  ), 

     			  React.createElement("div", {className: "am-comment-main"}, 
     			    React.createElement("header", {className: "am-comment-hd"}, 
     			      React.createElement("div", {className: "am-comment-meta"}, 
     			            React.createElement("a", {href: "javascript:void(0);", className: "am-comment-author"}, o.class_name, "|", o.create_user, "|", o.group_name)
					  )
     			    ), 
					 
     			    React.createElement("div", {className: "am-comment-bd"}, 
						contentDiv, 
     			    	React.createElement(Common_mg_big_fn, {imgsList: o.imgsList})
     			    ), 
     			    	React.createElement("footer", {className: "am-comment-footer"}, 
     			    	React.createElement("div", {className: "am-comment-actions"}, 
     			    	GTimeShow.showByTime(o.create_time), 
     			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"}), "点赞"), 
     			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"}), "评论"), 
								 "|阅读"+o.count, 
						React.createElement(G_check_disable_div_byRight, {type: 99, uuid: o.uuid, status: o.status, groupuuid: o.groupuuid, add_class: "am-fr"}), 
     			    	React.createElement("a", {href: "javascript:void(0);", className: "am-fr", onClick: common_check_illegal.bind(this,99,o.uuid)}, "举报")
     			    	
     			    	)
     			    	), 
     			    	
     			    	React.createElement(Common_Dianzan_show_noAction, {dianzan: o.dianzan, uuid: o.uuid, type: 99, btn_dianzan: "btn_dianzan_"+o.uuid}), 
     			    	React.createElement("ul", {className: "am-comments-list"}, 
     					  React.createElement(Classnews_reply_list_byRight, {replyPage: o.replyPage, uuid: o.uuid, type: 99, btn_reply: "btn_reply_"+o.uuid, groupuuid: o.groupuuid})
     			    	)
     			     )
     			)
     			 
     			    )		   
     	  );
     	}
     	}); 




     /*
     * 1.1互动里面单独的评论模板
     * 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
     * 把评论模板插入空Div里面
     * 
     * */
     var Classnews_reply_list_byRight = React.createClass({displayName: "Classnews_reply_list_byRight", 
     	getInitialState: function() {
     		var o={
     			replyPage:null
     		}
     		if(this.props.replyPage) o.replyPage=this.props.replyPage;
     		return o;
     	  },
        componentWillReceiveProps: function(nextProps) {
     		var o={
     				replyPage:commons_ajax_dianzan_getByNewsuuid(nextProps.uuid)
     			}
     	   this.setState(o);
     	},
     	
     	load_more_btn_id:"load_more_",
     	pageNo:1,
     	classnewsreply_list_div:"classnewsreply_list_div",
     	
     	
     	componentDidMount:function(){
     		var that=this;
     		$("#"+this.props.btn_reply).bind("click",that.btn_reply_show.bind(that));
     		this.load_more_data();
     	},
     	loadByFirst:function(list_div){
     		React.render(React.createElement(Classnews_reply_list_listshow_byRight, {
     			events: this.state.replyPage,
     			newsuuid:this.props.uuid,
				groupuuid:this.props.groupuuid,
     			responsive: true, bordered: true, striped :true,hover:true,striped:true
     			}), document.getElementById(list_div));
     	},
     	load_more_data:function(){
     		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
     		var re_data=this.state.replyPage;
     		if(re_data&& this.pageNo==1){
				this.loadByFirst(this.classnewsreply_list_div+this.pageNo);			
     		}else{
     			re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow_byRight,this.props.groupuuid);
     		}
     		if(!re_data)return;
     		if(re_data.data.length<re_data.pageSize){
     			$("#"+this.load_more_btn_id).hide();
     		}else{
     			$("#"+this.load_more_btn_id).show();
     		}
     		  
     		  this.pageNo++;
     	},
     	
     	refreshReplyList:function(){
     		this.setState({replyPage:null});
     		$("#"+this.classnewsreply_list_div).html("");
     		this.pageNo=1;
     		this.load_more_data();
     		
     		$("#"+this.div_reply_save_id).html("");
     	},
     	btn_reply_show:function(){
     		React.render(React.createElement(Classnews_reply_save_byRight,
     				{uuid:this.props.uuid,
     			parentThis:this,
     			type:this.props.type
     			}), document.getElementById(this.div_reply_save_id));
     	},
     render: function() {
     	this.load_more_btn_id="load_more_"+this.props.uuid;
     	this.div_reply_save_id="btn_reply_save"+this.props.uuid;
     	this.classnewsreply_list_div="classnewsreply_list_div"+this.props.uuid;
     	var parentThis=this;
     return (
     		  
     		  React.createElement("div", {className: "am-comment-bd am-comment-flip"}, 
     		  React.createElement("div", {id: this.div_reply_save_id}, "   "), 
     		    React.createElement("div", {id: this.classnewsreply_list_div}), 
     		    React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多")		
     			
     			)	
     		   
     );
     }
     }); 
     /*
     * 1.2互动里面单独的评论模板-item
     * 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
     * 把评论模板插入空Div里面
     * 
     * */
     var Classnews_reply_list_listshow_byRight = React.createClass({displayName: "Classnews_reply_list_listshow_byRight", 	
		 
     render: function() {
		 var groupuuid=this.props.groupuuid;
     return (
     		  React.createElement("div", null, 
     		  this.props.events.data.map(function(event) {
     		      return (
     		    		  React.createElement("li", {className: "am-cf"}, 
     		    		  React.createElement("span", {className: "am-comment-author am-fl"}, event.create_user+":"), 
     				        React.createElement("span", {className: "am-fl", dangerouslySetInnerHTML: {__html:event.content}}), React.createElement(G_check_disable_div_byRight, {type: 98, uuid: event.uuid, status: event.status, groupuuid: groupuuid})
     		    		  )
     		    		  )
     		  })
     		
     		    )		   
     );
     }
     }); 

     /*
     * 绘制评论模板
     * @componentDidMount:添加表情
     * */
     var Classnews_reply_save_byRight = React.createClass({displayName: "Classnews_reply_save_byRight", 
     	classnewsreply_list_div:"classnewsreply_list_div",
     	form_id:"editClassnewsreplyForm",
     	reply_save_btn_click:function(){
     		var that=this.props.parentThis;
     		common_ajax_reply_save(function(){
     			that.refreshReplyList();		
     		},this.form_id);
     	
     	},
     	componentDidMount:function(){
     		 $("#"+this.classnews_content).xheditor(xhEditor_upImgOption_emot);
     	},
     render: function() {
     	this.classnews_content="classnews_content_replay"+this.props.uuid;
     	this.form_id="editClassnewsreplyForm"+this.props.uuid;
     return (
     		   React.createElement("form", {id: this.form_id, method: "post", className: "am-form", action: "javascript:void(0);"}, 
     			React.createElement("input", {type: "hidden", name: "newsuuid", value: this.props.uuid}), 
     			React.createElement("input", {type: "hidden", name: "uuid"}), 
     			React.createElement("input", {type: "hidden", name: "type", value: this.props.type}), 						
     			React.createElement(AMR_Input, {id: this.classnews_content, type: "textarea", rows: "3", label: "我要回复", placeholder: "填写内容", name: "content"}), 
     			React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this), className: "am-btn am-btn-primary"}, "提交")		      
     		    )	   
     );
     }
     }); 

     /*
     * <班级互动>添加与编辑按钮中可删除图片显示.
     */
     var ClassNews_Img_canDel = React.createClass({displayName: "ClassNews_Img_canDel",
     		deleteImg:function(divid){
     			$("#"+divid).remove();
     		},			
     	  render: function() {
     		 return (
               		React.createElement("div", {className: "G_cookplan_Img"}, 
     	 	       			React.createElement("img", {className: "G_cookplan_Img_img", src: this.props.url, alt: "图片不存在"}), 
     	 	       			React.createElement("div", {className: "G_cookplan_Img_close", onClick: this.deleteImg.bind(this,this.props.parentDivId)}, React.createElement("img", {src: hostUrlCDN+"i/close.png", border: "0"}))
     	 	       		)		
               	)
     	  }
     	});


     /*
     * <班级互动>添加与编辑详情绘制;（公用方法和大图标班级互动）
     * @整个班级互动逻辑思维 首先要调用公用模板内的数组转换方法，把我们的数组转换成Selected需要的数据模型
     * 然后Selected的onChange自带value 直接可以传进handleChange_selectclass_uuid方法内 
     * 我们把值添加到 #editClassnewsForm 表单内 这样保存服务器请求就可以传最新的 classuuid了;
     * @ w_img_upload_nocut.bind_onchange 图片截取方法绘制在新的Div里面
     * @ajax_classnews_save_Right:提交按钮在Kd_service;
     * */
     var Classnews_edit_byRight = React.createClass({displayName: "Classnews_edit_byRight", 
     	selectclass_uuid_val:null,
     	 getInitialState: function() {
     		    return this.props.formdata;
     		  },
     	 handleChange: function(event) {
     		    this.setState($('#editClassnewsForm').serializeJson());
     	  },
     	  handleChange_selectclass_uuid:function(val){
//     		  this.selectclass_uuid_val=val;
//     		  this.props.formdata.classuuid=val
     			// $('#classuuid').val(val);
     			    this.setState($('#editClassnewsForm').serializeJson());
     	  },	  
     	  imgDivNum:0,
     	  getNewImgDiv:function(){
     		  this.imgDivNum++;
     		return "Classnews_edit_"+this.imgDivNum;  
     	  },	  
     	  addShowImg:function(url){
     		  var divid=this.getNewImgDiv();
     		  $("#show_imgList").append("<div id='"+divid+"'>加载中...</div>");		 	
     		  React.render(React.createElement(ClassNews_Img_canDel, {
     				url: url,parentDivId:divid
     				}), document.getElementById(divid));  
     	  },
     	  componentDidMount:function(){
     		 var editor=$('#classnews_content').xheditor(xhEditor_classnews_emot);
     		// w_img_upload_nocut.bind_onchange("#file_img_upload",function(imgurl){
     		 var that=this;		 
     		 //已经有的图片,显示出来.		 
     		  w_img_upload_nocut.bind_onchange("#file_img_upload",function(imgurl,uuid){
     			  ////data.data.uuid,data.imgUrl
     			 that.addShowImg(imgurl);
     			// $('#show_imgList').append('<img  width="198" height="198" src="'+imgurl+'"/>');			
     		  });		 
     		//已经有的图片,显示出来.
     		 if(!$('#imgs').val())return;
     		 var imgArr=$('#imgs').val().split(",");
     		 for(var i=0;i<imgArr.length;i++){
     			 this.addShowImg(imgArr[i]);
     		 }		
     	},
     render: function() {
     	  var o = this.state;
     	  if(this.props.mycalsslist.length>0){
     		 if(!o.classuuid) o.classuuid=this.props.mycalsslist[0].value;
     	  }
     return (
     		React.createElement("div", null, 
     		React.createElement("div", {className: "header"}, 
     		  React.createElement("hr", null)
     		), 
     		React.createElement("div", {className: "am-g"}, 
     		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 	      
     		  React.createElement("form", {id: "editClassnewsForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
     		  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "classuuid", onChange: this.handleChange_selectclass_uuid, btnWidth: "300", data: this.props.mycalsslist, btnStyle: "primary", value: o.classuuid}), 	      
     			
     		  React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
     			React.createElement("input", {type: "hidden", name: "imgs", id: "imgs", value: o.imgs}), 
     		      React.createElement(AMR_Input, {id: "classnews_content", type: "textarea", rows: "8", label: "内容:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange}), 
     		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
     		      React.createElement("div", {className: "cls"}), 
     			  G_get_upload_img_Div(), 
     		      React.createElement("button", {type: "button", onClick: ajax_classnews_save_Right, className: "am-btn am-btn-primary"}, "提交")
     		    )
     	     )
     	   )
     	   
     	   )
     );
     }
     }); 
     
     
//±±±±±±±±±±±±±±±±±±±±±±±±±±± 
 
 //——————————————————————————签到查询——————————————————————————
   /*
    * <今日签到>绘制
    * */  
   var Teacher_class_sign_today_byRight = React.createClass({displayName: "Teacher_class_sign_today_byRight",	 
  	 ajaxdata:{},
  	 getInitialState: function() {
		this.ajaxdata={
				students:null,
				cards:null,
				signs:null,
				groupuuid:this.props.groupuuid,
				classList:this.props.classList,
				classuuid:this.props.classuuid
		}
		return this.ajaxdata;
	  },
	 componentDidMount:function(){
		  this.ajax_list(this.props.classuuid);
    	},
	  handleChange_selectgroup_uuid:function(val){
			 $("input[name='class_uuid']").val("");
		  var classList=Store.getChooseClass(val);
		  this.ajaxdata.groupuuid=val;
		  this.ajaxdata.classList=G_selected_dataModelArray_byArray(classList,"uuid" ,"name"),
    	   this.ajax_list(classList[0].uuid);
    	   //G_mygroup_choose=classList[0].uuid;
       },
 	  handleChange_selectclass_uuid:function(val){
   	   this.ajax_list(val);
   	  G_myclass_choose=val;
      },
       //2
	 ajax_callback:function(obj){
		 if(obj.students&&obj.cards&&obj.signs){
			 this.setState(obj);
		 }
   	},
   	//1
   	ajax_list:function(classuuid){
   		if(!classuuid){
   			G_msg_pop("无班级")
   			return;
   		}
   		this.ajaxdata.students=null;
   		this.ajaxdata.cards=null;
   		this.ajaxdata.signs=null;
   		this.ajaxdata.classuuid=classuuid;
   		//加载学生
   		 this.ajax_students(classuuid);
   		//加载学生绑定卡
   		 this.ajax_cards(classuuid);
   		//家长学生今天签到记录
   		 this.ajax_signs(classuuid);
   	},
   	 ajax_students:function(classuuid){
   		 var that=this;
   		$.AMUI.progress.start();	
   		var formdata=null;
   		//班级学生列表
   	    var url = hostUrl + "rest/student/getStudentByClassuuid.json";
   		$.ajax({
   			type : "GET",
   			url : url,
   			data:{classuuid:classuuid},
   			dataType : "json",
   			success : function(data) {
   				$.AMUI.progress.done();
   				if (data.ResMsg.status == "success") {
   					if(!data.list)data.list=[];
   					that.ajaxdata.students=data.list;
   					//that.setState(that.ajaxdata);
   					that.ajax_callback(that.ajaxdata);
   				} else {
   					alert("加载数据失败："+data.ResMsg.message);
   				}
   			},
   			error : G_ajax_error_fn
   		});
   		
   	},
   	ajax_cards:function(classuuid){
  		 var that=this;
  		$.AMUI.progress.start();	
  		var formdata=null;
  		//班级学生列表
  	    var url = hostUrl + "rest/studentbind/queryByClassuuid.json";
  		$.ajax({
  			type : "GET",
  			url : url,
  			data:{classuuid:classuuid},
  			dataType : "json",
  			success : function(data) {
  				$.AMUI.progress.done();
  				if (data.ResMsg.status == "success") {
  					if(!data.list)data.list=[];
  					that.ajaxdata.cards=data.list;
//      					that.setState(that.ajaxdata);
  					that.ajax_callback(that.ajaxdata);
  				} else {
  					alert("加载数据失败："+data.ResMsg.message);
  				}
  			},
  			error : G_ajax_error_fn
  		});
  		
  	},
  	 ajax_signs:function(classuuid){
  		 var that=this;
  		$.AMUI.progress.start();	
  		var formdata=null;
  		//班级学生列表
  	    var url = hostUrl + "rest/studentSignRecord/queryTodayCountByClassuuid.json";
  		$.ajax({
  			type : "GET",
  			url : url,
  			data:{classuuid:classuuid},
  			dataType : "json",
  			success : function(data) {
  				$.AMUI.progress.done();
  				if (data.ResMsg.status == "success") {
  					if(!data.list)data.list=[];
  					that.ajaxdata.signs=data.list;
  				//	that.setState(that.ajaxdata);
  					that.ajax_callback(that.ajaxdata);
  				} else {
  					alert("加载数据失败："+data.ResMsg.message);
  				}
  			},
  			error : G_ajax_error_fn
  		});
  		
  	},
  	 parse_ajaxdata:function(obj){
  		if(!obj||!obj.students)return obj;
  		var formdata=obj.students;
  		var cards=obj.cards;
  		var signs=obj.signs;
  		for(var i=0;i<formdata.length;i++){
  			//卡号 b2.studentuuid,b2.cardid,b2.userid,s1.name
  			if(cards){
  		       for(var s=0;s<cards.length;s++){
  		    	if(formdata[i].uuid==cards[s][0]){
  		    		if(formdata[i].cardID)formdata[i].cardID+=",";
  		    		else formdata[i].cardID="";
  		    		if(!cards[s][1])cards[s][1]="申请中("+cards[s][2]+")";
  		    		formdata[i].cardID+=cards[s][1];
  		    	}        	   
  		       }
  			}
  			//签到标志
  			if(signs){
  			       for(var s=0;s<signs.length;s++){
  			    	if(formdata[i].uuid==signs[s][0]){
  			    		formdata[i].qiandao=true;
  			    	}        	   
  			       }
  				}
  		}
  		return obj;
  	},

  	        handleClick_download: function(xlsname) {
  				  var class_uuid=$("input[name='class_uuid']").val();
				  var group_uuid=$("input[name='group_uuid']").val();
  				 ajax_flowername_download_byRight(group_uuid,class_uuid,xlsname);
  		 },
   render: function() {
  	 var obj=this.parse_ajaxdata(this.state);
  	 
  	 if(!obj.students){
  		 obj.students=[];
  	 }
	
   return (
   React.createElement("div", null, 
	   React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list13}), 
     React.createElement("div", {className: "am-form-group"}, 
     React.createElement("hr", null)
       ), 
         React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
         React.createElement(AMR_Panel, null, 
         React.createElement(AMR_ButtonToolbar, null, 

	     React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
      	 React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid2", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.grouplist, btnStyle: "primary", value: this.state.groupuuid})
    	 ), 
         React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
         React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "class_uuid", onChange: this.handleChange_selectclass_uuid, btnWidth: "200", multiple: false, data: this.state.classList, btnStyle: "primary", value: this.state.classuuid})
         )
   	
  	 
   	  )
	  )
   	  ), 
   	      
     React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
       React.createElement("thead", null, 
         React.createElement("tr", null, 
           React.createElement("th", null, "姓名"), 
           React.createElement("th", null, "卡号"), 
           React.createElement("th", null, "今日签到")
         )
       ), 
       React.createElement("tbody", null, 
         obj.students.map(function(event) {
           return (React.createElement(ClassCard_EventRow_byRight, {key: event.id, event: event}));
         })
       )
     )
     )
   );
   }
   });
   /*
   * 刷卡记录详情内容绘制;am-table-bordered
   * */
   var ClassCard_EventRow_byRight = React.createClass({displayName: "ClassCard_EventRow_byRight", 
     render: function() {
       var event = this.props.event;
       var className = event.highlight ? 'am-active' :
         event.disabled ? 'am-disabled' : '';

       return ( 
         React.createElement("tr", {className: className}, 
           React.createElement("td", null, " ", React.createElement("a", {href: "javascript:void(0);", onClick: G_class_students_look_info.bind(this,event.uuid,1,2)}, event.name)), 
           React.createElement("td", null, event.cardID), 
           React.createElement("td", {className: event.qiandao?"":"px_color_red"}, event.qiandao?"已签到":"无", React.createElement(AMUIReact.Button, {onClick: ajax_ClassCard_info_byRight.bind(this,event.uuid), amStyle: "secondary"}, "详情"))
           ) 
       );
     }
   });       

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   /*
   *签到绘制舞台再请求数据方法；
   * @</select>下拉多选框;
   * */
   var Announcements_Div_ClassCard_info_byRight = React.createClass({displayName: "Announcements_Div_ClassCard_info_byRight", 
   	load_more_btn_id:"load_more_",
   	pageNo:1,
   	classnewsreply_list_div:"am-list-news-bd",
   	componentWillReceiveProps:function(){
   		this.load_more_data();
   	},
   	componentDidMount:function(){
   		this.load_more_data();
   	},
   	//逻辑：首先创建一个“<div>” 然后把div和 pageNo   list_div,groupuuid,name,pageNo
   	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
   	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
   	load_more_data:function(){
   		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
   		var that=this;
   		var callback=function(re_data){
    			if(!re_data)return;
    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
var re_data=ajax_announce_ClassCard_info(this.classnewsreply_list_div+this.pageNo,this.props.studentuuid,this.pageNo,callback);
   	},
   	refresh_data:function(){
//   		classnewsreply_list_div 清除；
//         load_more_data	重新绘制DIV；
   		this.forceUpdate();
   		this.pageNo=1;
   		$("#"+this.classnewsreply_list_div).html("");
   		this.load_more_data();
   		
   	},
   render: function() {
   	this.load_more_btn_id="load_more_"+this.props.uuid;
     return (			
   		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
   		    
   		    React.createElement("div", {id: this.classnewsreply_list_div}
   			  ), 
   	
   		  
   		  React.createElement("div", {className: "am-list-news-ft"}, 
   		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
   		  )		  
   		)
   		
   			
     );
   }
   });

   /*
   *签到表单详情内容绘制;
   * 一键拨号
   * */
   var Announcements_ClassCard_info_div = React.createClass({displayName: "Announcements_ClassCard_info_div", 
   	  render: function() {
   	    var event = this.props.events;
   	    var className = event.highlight ? 'am-active' :
     event.disabled ? 'am-disabled' : '';
   	    return (
   	    		  React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 		   	
   		          React.createElement("tr", null, 
   		            React.createElement("th", null, "姓名"), 
   		            React.createElement("th", null, "学校"), 
   		            React.createElement("th", null, "打卡时间")
   		          ), 			 
   	    			  this.props.events.map(function(event) {
   	    			      return (
   	    					      React.createElement("tr", {className: className}, 
   	    					        React.createElement("td", null, event.sign_name), 
   	    					        React.createElement("td", null, event.groupname), 
   	    					        React.createElement("td", null, event.sign_time)
   	    					        ) 
   	    			    		  )
   	    			         })	
   	    			  )		  
   	    	  );
   }
   });    
   
   
//±±±±±±±±±±±±±±±±±±±±±±±±±±±            




//——————————————————————————接送卡查询<绘制>—————————————————————  
/*]]
* */  
var Studentbind_EventsTable_byRight = React.createClass({displayName: "Studentbind_EventsTable_byRight",

  	        handleClick_download: function(xlsname) {
  				  var class_uuid=$("input[name='classuuid']").val();
				  var group_uuid=$("input[name='group_uuid']").val();
  				 ajax_flowername_download_byRight(group_uuid,class_uuid,xlsname);
  		 },
	
		getStateByPropes:function(nextProps){
		  
			var classList=Store.getChooseClass(nextProps.groupuuid);
			var classuuid ="";
		
			var down_list = [  	                  
  	                  {value: 'doorrecord' , label: '导出接送卡表' },
				     {value: 'doorrecord_apply' , label: '导出申请接送卡' }
  	                ];

			 var otherWherelist = [
  	                  {value: 'cardid_is_null' , label: '申请中' },
  	                  {value: 'cardid_is_not_null' , label: '门禁卡' }
  	                ];
			if(nextProps.type==0){
				down_list = [  	                  
  	                  {value: 'doorrecord_teacher' , label: '导出门禁卡表' },
				     {value: 'doorrecord_apply_teacher' , label: '导出申请门禁卡' }
  	                ];
			}
			
		  var obj= {
			    	groupuuid:nextProps.groupuuid,
			    	pageNo:1,
			    	type:nextProps.type,
					classList:G_selected_dataModelArray_byArray(classList,"uuid","name"),	
					classuuid:classuuid,
					totalCount:0,
					cardid:"",
					otherWherelist: otherWherelist,
					down_list:down_list,
					new_count:0,
			    	list: []
			    };
					obj.classList.unshift({value:"",label:"所有"});


		   if(window.G_studentbind_otherWhere){
					obj.otherWhere=window.G_studentbind_otherWhere;
			}
			if(window.G_myclass_choose){
					obj.classuuid=window.G_myclass_choose;
			}					
			return obj;
		},
	getInitialState: function() {		
	    return this.getStateByPropes(this.props);
	   
	  },
	  componentWillReceiveProps: function(nextProps) {		  
		  var obj= this.getStateByPropes(nextProps);
		    this.setState(obj);
			this.ajax_list(obj);
		},
		componentDidMount: function() {
			this.ajax_list(this.state); 
		  },
	  ajax_callback:function(list){
		     if (list== null )list= [];
		  this.state.list=list;
		  this.setState(this.state);
	  },
	 
	 ajax_list:function(obj){
			
		$.AMUI.progress.start();
		var that=this;
		G_myclass_choose=obj.classuuid;
		G_mygroup_choose=obj.groupuuid;
		G_studentbind_otherWhere=obj.otherWhere;
		var url = hostUrl + "rest/studentbind/query.json";
		$.ajax({
			type : "GET",
			url : url,
			data : {type:obj.type,groupuuid:obj.groupuuid,classuuid:obj.classuuid,cardid:obj.cardid,pageNo:obj.pageNo,otherWhere:obj.otherWhere},
			dataType : "json",
			//async: false,//必须同步执行
			success : function(data) {	
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					obj.list=data.list.data;
					if(!obj.pageNo||obj.pageNo==1){
						that.state.totalCount=data.list.totalCount;
						that.state.new_count=data.new_count;
					}
				    that.ajax_callback( data.list.data );     
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg); 
				}
			},
			error : G_ajax_error_fn
		});
		
	},
	pageClick: function(m) {
		 var obj=this.state;
		 if(m=="pre"){
			
			 if(obj.pageNo<2){
				 G_msg_pop("第一页了");
				 return;
			 }
			 obj.pageNo=obj.pageNo-1;
			 this.ajax_list(obj);
			 return;
		 }else if(m=="next"){
			 if(!obj.list||obj.list.length==0){
				 G_msg_pop("最后一页了");
				 return ;
			 }
			 obj.pageNo=obj.pageNo+1;
			
			 this.ajax_list(obj);
			 return;
		 }
	},
	
handleChange_selectgroup_uuid:function(val){
	 $("input[name='classuuid']").val("");
	 var obj=this.state;
	 obj.groupuuid=val;

		 var classList=Store.getChooseClass(val);
	var classuuid =null;
	if(classList&&classList.length>0){
		classuuid=classList[0].uuid;
	}
		obj.classList=G_selected_dataModelArray_byArray(classList,"uuid","name");
		 	obj.classList.unshift({value:"",label:"所有"});
			obj.classuuid=classuuid;
	
		 this.ajax_list(obj);
	},

handleChange_selectclass_uuid:function(val){
	 var obj=this.state;
		obj.classuuid=val;
		obj.pageNo=1;
   	   this.ajax_list(obj);
   	 
      },
 handleChange_selectotherWhere_uuid:function(val){
		 
   	  var obj=this.state;
		obj.otherWhere=val;
		G_studentbind_otherWhere=val;
		obj.pageNo=1;
   	   this.ajax_list(obj);
      },
	refresh_data:function(){
     this.state.cardid=$("input[name='cardid']").val();
     this.state.pageNo=1;
     	 this.ajax_list(this.state);
     		
     	},
		
render: function() {
			
	var obj=this.state;
	var help=(React.createElement("div", null))
	if(!this.state.list)this.state.list=[];
	var btnSearch = (React.createElement(AMUIReact.Button, {onClick: this.refresh_data.bind(this)}, React.createElement(AMUIReact.Icon, {icon: "search"})));
	var btnSearch_classuuid = null;
	var table_th0="电话";
	if(obj.type==1){
		btnSearch_classuuid = (React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "classuuid", onChange: this.handleChange_selectclass_uuid, btnWidth: "200", multiple: false, data: this.state.classList, btnStyle: "primary", value: this.state.classuuid}) );
		table_th0="班级";
	}
	if(obj.type==1){
	help=(React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list14}));
	  }else{
    help=(React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list15}));
	}
	var new_countDiv=null;
	if(this.state.new_count>0){
			new_countDiv=(React.createElement("h3", null, "新生自动申请门禁卡数量:"));
		}
  return (
  React.createElement("div", null, 
	help, 
	  React.createElement(AMR_Panel, null, 
React.createElement(AMR_ButtonToolbar, null, 
	 React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
	React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上一页")
	  ), 
	  React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
	  React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "共", obj.totalCount, "条,第", obj.pageNo, "页")
	  ), 
	  React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
	React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下一页")
	  ), 
      React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
	   React.createElement(AMUIReact.Input, {name: "cardid", placeholder: "姓名或卡号", btnAfter: btnSearch}	 )
	  )
  )
	  ), 
React.createElement("hr", null), 

React.createElement(AMR_ButtonToolbar, null, 
	React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
	 React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid2", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.grouplist, btnStyle: "primary", value: this.state.groupuuid})
	), 
	React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
    btnSearch_classuuid	
    ), 
    React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
	React.createElement(AMUIReact.Selected, {id: "selectotherWhere", name: "otherWhere", onChange: this.handleChange_selectotherWhere_uuid, btnWidth: "200", multiple: false, data: this.state.otherWherelist, btnStyle: "primary", value: this.state.otherWhere})
     ), 
    React.createElement("div", {className: "am-fl am-margin-bottom-xs  am-margin-left-xs"}, 
	React.createElement(AMUIReact.Selected, {btnStyle: "secondary", placeholder: "请在电脑上导出", onChange: this.handleClick_download, btnWidth: "200", multiple: false, data: this.state.down_list})
    )
), 	  

new_countDiv, 
	  
    React.createElement(AMR_Table, React.__spread({},  this.props), 
   React.createElement("thead", null, 
    React.createElement("tr", null, 
		    React.createElement("th", null, table_th0), 
      React.createElement("th", null, "姓名"), 
      React.createElement("th", null, "卡号"), 
      React.createElement("th", null, "申请号"), 
		React.createElement("th", null, "申请人"), 
      React.createElement("th", null, "申请时间")
      
    )
  ), 
  React.createElement("tbody", null, 
    this.state.list.map(function(event) {
      return (React.createElement(Studentbind_EventRow_byRight, {type: obj.type, key: event.uuid, event: event}));
        })
      )
    )
    )
  );
}
});
  
//接送卡绘制详情内容Map;   
var Studentbind_EventRow_byRight = React.createClass({displayName: "Studentbind_EventRow_byRight", 
	render: function() {
	  var event = this.props.event;
	  var className = event.highlight ? 'am-active' :
	    event.disabled ? 'am-disabled' : '';
	//b2.studentuuid,b2.cardid,b2.userid,s1.name,b2.create_user,b2.createtime 
	var table_th0=event[6];
	var table_th3;
	if(this.props.type==1){
		table_th0=Store.getClassByUuid(event[6]).name;
		table_th3=(React.createElement("a", {href: "javascript:void(0);", onClick: G_class_students_look_info.bind(this,event[0],1,2)}, event[3]));
	}else{
 	   table_th3=(React.createElement("a", {href: "javascript:void(0);", onClick: G_class_teacher_look_info.bind(this,event[0])}, event[3]));
	}
	
	  return (
	    React.createElement("tr", {className: className}, 
		     React.createElement("td", null, table_th0), 
   React.createElement("td", null, " ", table_th3), 
	      React.createElement("td", null, event[1]), 
	       React.createElement("td", null, event[2]), 
		    React.createElement("td", null, event[4]), 
		   React.createElement("td", null, event[5])
	    ) 
	  );
	}
	});   

//——————————————————————————<老版>课程安排<管理绘制>——————————————————————————        
/*
* <课程安排>班级详情界面按钮列表框等绘制;
* @add:添加班级课程；
* @pre:上周；
* @next:下一周；
* */
var Teachingplan_EventsTable_byRight = React.createClass({displayName: "Teachingplan_EventsTable_byRight",
	
getInitialState: function() {
		var classList=Store.getChooseClass(this.props.groupuuid);
		var classuuid =null;
		if(classList&&classList.length>0){
			classuuid=classList[0].uuid;
		}
		var obj= {
				groupuuid:this.props.groupuuid,
				classList:G_selected_dataModelArray_byArray(classList,"uuid","name"),
				classuuid:classuuid,
		    	pageNo:0,
		    	list: []
		    };
	//	this.ajax_list(obj);
	    return obj;
	   
	  },
	 
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var classList=Store.getChooseClass(this.props.groupuuid);
			var classuuid =null;
			if(classList&&classList.length>0){
				classuuid=classList[0].uuid;
			}
		  var obj= {
				  groupuuid:nextProps.groupuuid,
					classList:G_selected_dataModelArray_byArray(classList,"uuid","name"),
					classuuid:classuuid,
			    	pageNo:0,
			    	list: []
				 
			    };
				
			obj=this.ajax_list(obj);
		  this.setState(obj);
		},
		 ajax_callback:function(list){
			  this.state.list=list;
			  this.setState(this.state);
		  },
	 ajax_list:function(obj){
		 
		 var now=new Date();
		  	now=G_week.getDate(now,obj.pageNo*7);
		 var begDateStr=G_week.getWeek0(now,obj.pageNo);
		var endDateStr=G_week.getWeek6(now,obj.pageNo);;
		var that=this;
		 $.AMUI.progress.start();
			var url = hostUrl + "rest/teachingplan/list.json";
			$.ajax({
				type : "GET",
				url : url,
				data : {classuuid:obj.classuuid,begDateStr:begDateStr,endDateStr:endDateStr},
				dataType : "json",
				success : function(data) {
					$.AMUI.progress.done();
					if (data.ResMsg.status == "success") {
						if(data.list==null)data.list=[];
						that.ajax_callback(data.list);						
					} else {
						alert(data.ResMsg.message);
						G_resMsg_filter(data.ResMsg);
					}
				}
			});		
	},
	pageClick: function(m) {
		 var obj=this.state;
		 if(m=="pre"){
			 obj.pageNo=obj.pageNo-1;
			 this.ajax_list(obj);
			 return;
		 }else if(m=="next"){
			 obj.pageNo=obj.pageNo+1;
			 this.ajax_list(obj);
			 return;
		 }
	},

	handleChange_selectgroup: function(val) {
		this.state.groupuuid=val;
		var classList=Store.getChooseClass(this.state.groupuuid);
		var classuuid =null;
		if(classList&&classList.length>0){
			classuuid=classList[0].uuid;
		}
		this.state.classList=G_selected_dataModelArray_byArray(classList,"uuid","name");
		 this.state.classuuid=classuuid;
		 this.ajax_list(this.state); 
    },
    handleChange_selectclass: function(val) {
    	 this.state.classuuid=val;
		 this.ajax_list(this.state);   
    },
	componentDidMount: function() {
		this.ajax_list(this.state); 
	  },
	   
render: function() {
	var weeknum=this.state.pageNo;
	var now=new Date();
	if(weeknum){
		now=G_week.getDate(now,weeknum*7);
	}else{
		g_cookbookPlan_week_point=0;
	}
	var begDateStr=G_week.getWeek0(now);
	var endDateStr=G_week.getWeek6(now);
return (
React.createElement("div", null, 
React.createElement("div", {className: "header"}, 
	React.createElement("hr", null)
	), 
React.createElement(AMR_ButtonToolbar, null, 
React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "pre")}, "上周"), 
React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "next")}, "下周"), 
  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup.bind(this), btnWidth: "200", data: this.props.groupList, btnStyle: "primary", value: this.state.groupuuid}), 
  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "class_uuid", onChange: this.handleChange_selectclass.bind(this), btnWidth: "200", data: this.state.classList, btnStyle: "primary", value: this.state.classuuid})
), 
  React.createElement("h1", null, "[", begDateStr, " 到 ", endDateStr, "]"), 
	  React.createElement("hr", null), 
React.createElement(AMR_Table, React.__spread({},  this.props), 
  React.createElement("thead", null, 
    React.createElement("tr", null, 
    	React.createElement("th", null, "一周"), 
      React.createElement("th", null, "上午"), 
      React.createElement("th", null, "下午")
    )
  ), 
  React.createElement("tbody", null, 
    this.state.list.map(function(event) {
      return (React.createElement(Teachingplan_EventRow_byRight, {event: event}));
    })
  )
)
)
);
}
});
/*
*<课程安排>班级详情列表详情内容绘制;
* @add:添加班级课程；
* @pre:上周；
* @next:下一周；
* */
var Teachingplan_EventRow_byRight = React.createClass({displayName: "Teachingplan_EventRow_byRight", 
	render: function() {
	var event = this.props.event;
	if(G_week.getWeekStr(event.plandate)==G_week.getWeekStr(new Date())){
		event.highlight=true;
	}
	var className = event.highlight ? 'am-active' :
	  event.disabled ? 'am-disabled' : '';

	return (
	  React.createElement("tr", {className: className}, 
	    React.createElement("td", null, G_week.getWeekStr(event.plandate)), 
	    React.createElement("td", null, event.morning), 
	    React.createElement("td", null, event.afternoon)
	  ) 
	);
	}
	});

//±±±±±±±±±±±±±±±±±±±±±±±±±±±



//——————————————————————————学生列表<绘制>——————————————————————————  
  /*
   * 学生列表服务器请求后绘制处理方法；
   * @</select>下拉多选框;
   * @handleChange_stutent_Selected:学校查询；
   * @handleChange_class_Selected::班级查询；
   * @btn_query_click:名字查找；
   * */
   /*
  var Query_mystutent_list = React.createClass({

	  	getDefaultProps: function() {
		
			 var data=G_selected_dataModelArray_byArray(Vo.getTypeList("exportStudentExcel"),"desc","val");
    	          return {
    	            down_list: data
    	          };
    	        },
		getInitialState: function() {
			
			var o={
					class_uuid:this.props.class_uuid,
					name:this.props.name,
					maxPageNo:0
			}
			return o;
		  },
	   componentWillReceiveProps: function(nextProps) {
		   
			var o={
					class_uuid:nextProps.class_uuid,
					name:nextProps.name
			}
		   this.setState(o);
		},
		
  	handleChange_stutent_Selected: function() {
  	 		var class_uuid=$("input[name='class_uuid']").val();
		  if(class_uuid=="1"){
			  class_uuid="";
		  }
  		  ajax_mystudents_query(class_uuid,$('#sutdent_name').val());
  	  }, 
  	 
  		btn_query_click:function(){
  			this.handleChange_stutent_Selected();
  		},
  		handleClick: function(m,classuuid) {
  	  		
  	  		var class_uuid=$("input[name='class_uuid']").val();
  		  
  			if(m=="pre"){
  				ajax_mystudents_query(class_uuid,$('#sutdent_name').val(),--g_mystudent_query_point);
  				return;
  			 }else if(m=="next"){
  				ajax_mystudents_query(class_uuid,$('#sutdent_name').val(),++g_mystudent_query_point);
  				 return;
  			 }
  		},
  		maxPageNo:0,
  handleClick_download: function(xlsname) {
    				  var class_uuid=$("input[name='class_uuid']").val();
    				 ajax_flowername_download_byRight("",class_uuid,xlsname);
    		 },
  render: function() {
  	
  	var pre_disabled=g_mystudent_query_point<2;
  	var classList=G_selected_dataModelArray_byArray(Store.getMyClassList(),"uuid","name");
	
  	if(g_mystudent_query_point==1){
  		this.maxPageNo=Math.floor(this.props.data.list.totalCount/this.props.data.list.pageSize)+1;
  	}
  	var next_disabled=g_mystudent_query_point>=this.maxPageNo;
      return (
  		  
      <div> 
  	   <div className="am-form-group">
  	    <hr/>	 
  	     </div>
  	      <form id="editGroupForm" method="post" className="am-form" action="javascript:void(0);">
         <AMR_ButtonToolbar>
		   <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
          <AMR_Button amStyle="secondary" disabled={pre_disabled} onClick={this.handleClick.bind(this,"pre",this.state.class_uuid)} >&laquo; 上一页</AMR_Button>
		  </div>
		  <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
		  <AMR_Button amStyle="default" disabled="false" >{g_mystudent_query_point}\{this.maxPageNo}</AMR_Button>
          </div>
		  <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
	      <AMR_Button amStyle="secondary" disabled={next_disabled} onClick={this.handleClick.bind(this,"next",this.state.class_uuid)} >下一页 &raquo;</AMR_Button>
		   </div>


  	    <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
  	   <AMUIReact.Selected  className= "am-fl" id="selectgroup_uuid2" name="class_uuid" onChange={this.handleChange_stutent_Selected} btnWidth="200"   placeholder="所有"  multiple= {false} data={classList} btnStyle="primary" value={this.state.class_uuid} />      
  	    </div>  
	
  	      <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
     	  <AMUIReact.Selected  btnStyle="secondary" placeholder="请在电脑上导出" onChange={this.handleClick_download} btnWidth="200"  multiple= {false} data={this.props.down_list}/>   
     	  </div>
    	   <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
  	    <input type="text"  name="sutdent_name" id="sutdent_name"     placeholder="学生姓名"/>	  
  	     </div>  
  	    <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
  	   <button type="button"   onClick={this.btn_query_click}  className="am-btn am-btn-secondary">搜索2</button>
  	  </div>  
			   </AMR_ButtonToolbar>
  	 </form>
        <AMR_Table {...this.props}>  
          <thead> 
            <tr>
              <th>姓名</th>
              <th>昵称</th>
              <th>性别</th>
              <th>出生日期</th>
              <th>班级</th>
              <th>身份证</th>
            </tr> 
          </thead>
          <tbody>
            {this.props.events.map(function(event) {
              return (<EventRow_Query_mystutent_list key={event.id} event={event} />);
            })}
          </tbody>
        </AMR_Table>
        </div>
      );
    }
  });*/
      
  /*  	
   * 学生列表在表单上绘制详细内容;
   * @点击后直接调用学生详情方法
   * 调用ajax_class_students_look_info
   * 进入前btn_students_list_click按钮事件内添加Queue.push保证回退正常;
   * */
   /* 
  var EventRow_Query_mystutent_list = React.createClass({ 
  	btn_students_list_click:function(uuid,nmae){
  		ajax_class_students_look_info_byRight(uuid,nmae)
  	},
  	  render: function() {
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';

  	    return (
  	      <tr className={className} >
  	        <td><a href="javascript:void(0);" onClick={ajax_class_students_look_info.bind(this,event.uuid)}>{event.name}</a></td>
  	        <td>{event.nickname}</td>
  	        <td>{event.sex=="0"?"男":"女"}</td>
  	        <td>{event.birthday}</td>
  	        <td> {Store.getClassByUuid(event.classuuid).name}</td>
  	        <td>{event.idcard}</td>
  	      </tr> 
  	    );
  	  }
  	});
  //±±±±±±±±±±±±±±±±±±±±±±±±±±±   
  */



  //——————————————————————————帮助列表<绘制>—————————————————————  

  /* 
   * <帮助列表>绘制舞台
   * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
   * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
   * @btn_click_announce:点击按钮事件跳转kd_servise方法;
   * */
  var Announcements_px_Div_list = React.createClass({displayName: "Announcements_px_Div_list", 
  	load_more_btn_id:"load_more_",
  	pageNo:1,
  	classnewsreply_list_div:"am-list-news-bd",
  	componentWillReceiveProps:function(){
  		this.load_more_data();
  	},
  	componentDidMount:function(){
  		this.load_more_data();
  	},
  	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
  	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
  	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
  	load_more_data:function(){
  		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
   		var that=this;
   		var callback=function(re_data){
    			if(!re_data)return;
    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
		  var re_data=ajax_help_px_list(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
  	},
  	refresh_data:function(){
//  		classnewsreply_list_div 清除；
//        load_more_data	重新绘制DIV；
  		this.forceUpdate();
  		this.pageNo=1;
  		$("#"+this.classnewsreply_list_div).html("");
  		this.load_more_data();
  		
  	},
  render: function() {
  	this.load_more_btn_id="load_more_"+this.props.uuid;
    return (			
  		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 		    
  		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-news-bd"}		   		    
  		  ), 
  		  
  		  React.createElement("div", {className: "am-list-news-ft"}, 
  		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
  		  )		  
  		)   			
    );
  }
  });

    
  /*
   *<帮助列表>表格内容绘制
   * 在kd_react；
   * */
  var Px_helplist_div = React.createClass({displayName: "Px_helplist_div", 
  	  render: function() {
  	    var event = this.props.events;
  	    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';
  	    return (
  	    	     React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
  	    	     React.createElement("div", {className: "am-list-news-bd"}, 
  	    	     React.createElement("ul", {className: "am-list"}, 
  	    			  this.props.events.data.map(function(event) {
  	    			      return (
  	    			    		React.createElement("li", {className: "am-g am-list-item-dated"}, 
  	    			  		    React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: react_px_help_show.bind(this,event.uuid,event.title)}, 
  	    			  		  event.title
  	    			  		  ), 		
  	    			  		  React.createElement("div", {className: "am-list-item-text"}, 
  	    			  		  Store.getGroupNameByUuid(event.groupuuid), "|", event.create_time
  	    			  		  )
  	    			  		    )
  	    			    		  )
  	    			         })	
  	    			  )
  	    			  )
  	    	    )  		  
  	    	  );
  }
  }); 



  /*
  *公告点赞、评论、加载更多等详情绘制模板；
  * */
  var Announcements_helpshow = React.createClass({displayName: "Announcements_helpshow",
	getInitialState: function() {
	this.props.data.isFavor=this.props.isFavor;
	if(this.props.data)return this.props.data;
  },
//收藏按钮方法;
	  favorites_push: function(obj) {
		  if(obj.isFavor==false)return;
		  var url=obj.url;
		   obj.isFavor=false;
		  this.setState(obj);
		commons_ajax_favorites_push(obj.title,obj.type,obj.uuid,url)
	  },
  render: function() {
  	  var obj=this.state;
  return (
  		  React.createElement("div", {className: "px_margin_div"}, 
  		  React.createElement(AMUIReact.Article, {
  		    title: obj.title, 
  		    meta: Vo.announce_type(obj.type)+" | "+Store.getGroupNameByUuid(obj.groupuuid)+" | "+obj.create_time+ "|阅读"+ this.props.count+"次"}, 
  			React.createElement("div", {dangerouslySetInnerHTML: {__html: obj.message}})
  		     ), 
  		    	React.createElement("footer", {className: "am-comment-footer"}, 
  		    	React.createElement("div", {className: "am-comment-actions"}, 
				React.createElement("a", {href: "javascript:void(0);", onClick: this.favorites_push.bind(this,obj)}, React.createElement("i", {className: obj.isFavor?"am-icon-heart px_font_size_click":"am-icon-heart px-icon-hasdianzan px_font_size_click"}), obj.isFavor?"收藏":"已收藏"), 	  
				React.createElement("a", {href: "javascript:void(0);", onClick: G_CallPhoneFN.setShareContent.bind(this,obj.title,obj.title,null,this.props.share_url)}, React.createElement("i", {className: G_CallPhoneFN.canShareUrl()?"am-icon-share-alt px_font_size_click":"am-hide"})), 
				React.createElement(G_check_disable_div_byRight, {type: obj.type, uuid: obj.uuid, status: obj.status, groupuuid: obj.groupuuid, add_class: "am-fr"}), 
				React.createElement("a", {href: "javascript:void(0);", className: "am-fr", onClick: common_check_illegal.bind(this,obj.type,obj.uuid)}, React.createElement("i", {className: "am-icon-exclamation-circle px_font_size_click"}), "举报")
  		    	
			)
  		    	), 
  		    	React.createElement(Common_Dianzan_show_noAction, {uuid: obj.uuid, type: obj.type, btn_dianzan: "btn_dianzan_"+obj.uuid}), 
  			  React.createElement(Common_reply_list, {uuid: obj.uuid, type: obj.type, groupuuid: obj.groupuuid})			 
  		   )
  );
  }
  }); 
  //±±±±±±±±±±±±±±±±±±±±±±±±±±±     


  //
  

  
//——————————————————————————考勤,(签到统计)——————————————————————————

 /*
  * 月考勤表,老师
  **/
    var Attendance_listStatMonthByTeacher = React.createClass({displayName: "Attendance_listStatMonthByTeacher",	
		 add_day:31,
		add_dayArr:[],
		getStateByPropes:function(nextProps){			
			var yyyy_mm= new Date().format("yyyy-MM"); 
			
			
			var queryForm={
				yyyy_mm:yyyy_mm,
				groupuuid:nextProps.groupuuid
			};			

				//08:00-17:00
			var workTime=Store_ajax_groupHabits_getByKey(nextProps.groupuuid,"WorkTime");
			if(workTime){
				workTime=workTime.split("-");
				if(workTime.length==2){
					queryForm.morning=workTime[0];
					queryForm.afternoon=workTime[1];
				}
				
			}
			 var obj= {
				queryForm:queryForm,
				list: []
			};
			return obj;
		},
		getInitialState: function() {
			 this.add_dayArr=[];
			 for(var i=1;i<=this.add_day;i++){
				this.add_dayArr.push(i);
			 }
    	    return this.getStateByPropes(this.props);
    	  },
		 componentWillReceiveProps: function(nextProps) {	
		   this.setState(this.getStateByPropes(nextProps));
		},

		handleChange: function(v) {
		 	var queryForm=$('#queryForm').serializeJson();
			this.state.queryForm=queryForm;
		    this.setState(this.state);
			 //this.ajax_list();
	  },
	
		ajax_callback:function(list){
    		 if (list== null ) this.state.list=[];
			 else
    		  this.state.list=list;
			
    		  this.setState(this.state);
    	  },
	
		ajax_list:function(){
			var queryForm=this.state.queryForm;			
			if(queryForm.yyyy_mm.length!=7||queryForm.yyyy_mm.split("-").length!=2){				
					return;
			}
    		$.AMUI.progress.start();
    		var that=this;
    		var url = hostUrl + "rest/studentSignRecord/listStatMonthByTeacher.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data :queryForm,
    			dataType : "json",
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    				    that.ajax_callback( data.list );     
    				} else {
    					alert(data.ResMsg.message);
    					G_resMsg_filter(data.ResMsg);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		
    	},
    	
		handleClick_query: function(m) {
			if(!this.validate()){
				return;
			}
			 this.ajax_list();
    	  },
		handle_onKeyDown: function(e){
          if(G_isKeyDown_enter(e)){
               this.handleClick_query();
               return false;
		 }
     },
	handleChange_selectgroup: function(val){
		this.state.queryForm.groupuuid=val;		
		this.ajax_list();
		this.setState(this.state); 
	},
	pageClick: function(m) {
		 var yyyy_mm=this.state.queryForm.yyyy_mm;
		 var num=1;
		 if(m=="pre"){
			num=-1;
		 }
		if(!this.validate()){
			return;
		}
		 this.state.queryForm.yyyy_mm=G_addMonth(yyyy_mm,num); 
		this.setState(this.state); 
		this.ajax_list();

	},
	validate:function(){
		var queryForm=this.state.queryForm;
			if(queryForm.yyyy_mm.length!=7||queryForm.yyyy_mm.split("-").length!=2){
				G_msg_pop("年月格式不正确.正确格式:2015-01");
					return false;
			}
			return true;
	},
    render: function() {
			var queryForm=this.state.queryForm;
			if(!queryForm.morning)queryForm.morning='08:00';
			if(!queryForm.afternoon)queryForm.afternoon='17:15';
		var that=this;

		 if (this.state.list== null ) this.state.list=[];
      return (
      React.createElement("div", null, 
		 React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list20}), 
 		  React.createElement(AMUIReact.Form, {id: "queryForm", inline: true, onKeyDown: this.handle_onKeyDown}, 
		    React.createElement(AMR_Panel, null, 
		    React.createElement(AMR_ButtonToolbar, null, 

	          React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上月")	  
			  ), 
		      React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
	 		  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下月")	  
              ), 
				  		       React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
	          React.createElement(PxInput, {icon: "calendar", type: "text", maxLength: "7", size: "7", placeholder: "YYYY", name: "yyyy_mm", value: queryForm.yyyy_mm, onChange: this.handleChange})	
		      ), 
		      React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			 React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick_query.bind(this)}, "查询")
		      )
		     ), 
				  React.createElement(AMR_ButtonToolbar, null, 
				  React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
		     React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "上班时间:")
	              ), 
		    React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			React.createElement(PxInput, {type: "text", maxLength: "5", size: "5", placeholder: "08:00", name: "morning", value: queryForm.morning, onChange: this.handleChange})
		    ), 
		     React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			 React.createElement(PxInput, {type: "text", maxLength: "5", size: "5", placeholder: "17:15", name: "afternoon", value: queryForm.afternoon, onChange: this.handleChange})
		    )

			 )
		     )
		  ), 
             React.createElement(AMR_ButtonToolbar, null, 
			 React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			React.createElement(AMUIReact.Selected, {name: "groupuuid", value: queryForm.groupuuid, onChange: this.handleChange_selectgroup, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary"})	  
		     ), 
			 React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
    	    React.createElement(G_help_popo, {msg: G_tip.attendance_listStatMonth})
			 )
             ), 
		 React.createElement("h6", null, "持卡人数:"+this.state.list.length), 
    	React.createElement(Attendance_listStatMonth_table, {yyyy_mm: queryForm.yyyy_mm, list: this.state.list, morning: queryForm.morning, afternoon: queryForm.afternoon})
      

        )
      );
    }
    });
  /*
  * 月考勤表,学生
  **/
    var Attendance_listStatMonthByStudent = React.createClass({displayName: "Attendance_listStatMonthByStudent",	
		 add_day:31,
		add_dayArr:[],
		getStateByPropes:function(nextProps){			
			var yyyy_mm= new Date().format("yyyy-MM"); 
			var classlist=Store.getChooseClass(nextProps.groupuuid);
			var classuuid =null;
			if(classlist&&classlist.length>0){
				classuuid=classlist[0].uuid;
			}
			var queryForm={
				yyyy_mm:yyyy_mm,
				classuuid:classuuid,
				groupuuid:nextProps.groupuuid
			};			
			 var obj= {
				    queryForm:queryForm,		
					classlist:G_selected_dataModelArray_byArray(classlist,"uuid","name"),
				list: []
			};
			return obj;
		},
		getInitialState: function() {
			 this.add_dayArr=[];
			 for(var i=1;i<=this.add_day;i++){
				this.add_dayArr.push(i);
			 }
    	    return this.getStateByPropes(this.props);
    	  },
		 componentWillReceiveProps: function(nextProps) {	
		   this.setState(this.getStateByPropes(nextProps));
		},

		handleChange: function(v) {
		 	var queryForm=$('#queryForm').serializeJson();
			this.state.queryForm=queryForm;
		    this.setState(this.state);
			 this.ajax_list();
	  },
	
		ajax_callback:function(list){
    		 if (list== null ) this.state.list=[];
			 else
    		  this.state.list=list;
			
    		  this.setState(this.state);
    	  },
	
		ajax_list:function(){
			var queryForm=this.state.queryForm;			
			if(queryForm.yyyy_mm.length!=7||queryForm.yyyy_mm.split("-").length!=2){				
					return;
			}
    		$.AMUI.progress.start();
    		var that=this;
    		var url = hostUrl + "rest/studentSignRecord/listStatMonthByStudent.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data :queryForm,
    			dataType : "json",
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    				    that.ajax_callback( data.list );     
    				} else {
    					alert(data.ResMsg.message);
    					G_resMsg_filter(data.ResMsg);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		
    	},
    	
		handleClick_query: function(m) {
			if(!this.validate()){
				return;
			}
			 this.ajax_list();
    	  },
		handle_onKeyDown: function(e){
          if(G_isKeyDown_enter(e)){
               this.handleClick_query();
               return false;
		 }
     },
	handleChange_selectgroup: function(val){
	var classlist=Store.getChooseClass($("input[name='groupuuid']").val());
		this.state.queryForm.groupuuid=$("input[name='groupuuid']").val();
		this.state.queryForm.classuuid=$("input[name='classuuid']").val();
		this.state.classlist=G_selected_dataModelArray_byArray(classlist,"uuid","name");
		this.ajax_list();
		this.setState(this.state); 
	},
	pageClick: function(m) {
		 var yyyy_mm=this.state.queryForm.yyyy_mm;
		 var num=1;
		 if(m=="pre"){
			num=-1;
		 }
		if(!this.validate()){
			return;
		}
		 this.state.queryForm.yyyy_mm=G_addMonth(yyyy_mm,num); 
		this.setState(this.state); 
		this.ajax_list();

	},
	validate:function(){
		var queryForm=this.state.queryForm;
			if(queryForm.yyyy_mm.length!=7||queryForm.yyyy_mm.split("-").length!=2){
				G_msg_pop("年月格式不正确.正确格式:2015-01");
					return false;
			}
			return true;
	},
    render: function() {
			var queryForm=this.state.queryForm;
		var that=this;
		 if (this.state.list== null ) this.state.list=[];
      return (
      React.createElement("div", null, 
		  React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list19}), 
 		  React.createElement(AMUIReact.Form, {id: "queryForm", inline: true, onKeyDown: this.handle_onKeyDown}, 
		  React.createElement(AMR_Panel, null, 
		  React.createElement(AMR_ButtonToolbar, null, 
		     React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			 React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上月")	  
			 ), 
		     React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
	         React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下月")	  
             ), 
		  	 React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
	         React.createElement(PxInput, {icon: "calendar", type: "text", maxLength: "7", size: "7", placeholder: "YYYY", name: "yyyy_mm", value: queryForm.yyyy_mm, onChange: this.handleChange})		   		
	 		 ), 
		     React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			 React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick_query.bind(this)}, "查询")
		     )
        	)
		    )
		  ), 
		   React.createElement(AMR_ButtonToolbar, null, 
	      React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			React.createElement(AMUIReact.Selected, {name: "groupuuid", value: queryForm.groupuuid, onChange: this.handleChange_selectgroup, btnWidth: "200", data: this.props.group_list, btnStyle: "primary"})	  
		     ), 
		 React.createElement("div", {className: "am-fl am-margin-bottom-xs am-margin-left-xs"}, 
			React.createElement(AMUIReact.Selected, {name: "classuuid", value: queryForm.classuuid, onChange: this.handleChange_selectgroup, btnWidth: "200", data:  this.state.classlist, btnStyle: "primary"})
 	        )
		   ), 
		 React.createElement("h6", null, "持卡人数:"+this.state.list.length), 
    	React.createElement(Attendance_listStatMonth_table, {yyyy_mm: queryForm.yyyy_mm, list: this.state.list})
      

        )
      );
    }
    });

/**
老师学生考勤列表模块共用.
*/
var Attendance_listStatMonth_table = React.createClass({displayName: "Attendance_listStatMonth_table",	
		 add_day:31,
		add_dayArr:null,
    render: function() {
	   if(! this.add_dayArr){
		   this.add_dayArr=[];
			 for(var i=1;i<=this.add_day;i++){
				this.add_dayArr.push(i);
			 }
		}
		var t=this.props.yyyy_mm.split("-");
		var xingqi67Arr=[];
		if(t.length>1){
			xingqi67Arr=G_getMonthXinqi67(t[0],t[1]);
		}
		
		var class_xinqi67="am-warning";
		var that=this;
      return (
      React.createElement("div", null, 	
    	
        React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
          React.createElement("thead", null, 
              React.createElement("tr", null, 
              React.createElement("th", null, "姓名"), 
			  this.add_dayArr.map(function(event_add,index) {
					 return (  React.createElement("th", {className: $.inArray(event_add, xingqi67Arr)>-1?class_xinqi67:""}, event_add) )
				
			 })
            
            )
          ), 
          React.createElement("tbody", null, 
            this.props.list.map(function(event) {
				var jsonObj={};
				if(event.jsonstr){
					jsonObj=eval("("+event.jsonstr+")");
				}
				 
			    return ( 
				  React.createElement("tr", {key: "_"+event.useruuid}, 
  				 React.createElement("td", null, event.username), 
				   that.add_dayArr.map(function(event_add,index) {
					//jsonObj["d_01"]
						var str=null;
							if(event_add<10){
								str=jsonObj["d_0"+event_add];
							}else{
								str=jsonObj["d_"+event_add];
							}
							
							if(that.props.morning&&str){
								
								var className_morning_later="";
								className_afternoon_later="";
								var strA=str.split('-');
								if(that.props.morning<strA[0])className_morning_later="am-text-danger";
								if(that.props.afternoon>strA[1])className_afternoon_later="am-text-danger";

								str=(
									React.createElement("div", null, 
									React.createElement("font", {className: className_morning_later}, strA[0], " "), 
									"-", 
									React.createElement("font", {className: className_afternoon_later}, strA[1], " ")
									)
									)
							}
	

						 return (  React.createElement("th", {className: $.inArray(event_add, xingqi67Arr)>-1?class_xinqi67:""}, str) )
				 })
  			  ) )
            })
          )
        )


        )
      );
    }
    });
