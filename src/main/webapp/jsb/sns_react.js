

//——————————————————————————话题<绘制>—————————————————————  
/* 
 * <话题>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * */
var Sns_Div = React.createClass({displayName: "Sns_Div", 
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
	var re_data=PxSnsService.sns_snsTopic_list(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
	},
	refresh_data:function(){
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");//		classnewsreply_list_div 清除；
		this.load_more_data();//      load_more_data	重新绘制DIV；
		
	},
	//创建话题点击按钮事件跳转sns_servise方法;
  	handleClick: function(m) {
  		PxSnsService.btnclick_sns_snsTopic(m);
},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		    React.createElement(AMR_ButtonToolbar, null, 
		     React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "add")}, "创建话题")
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
 *<话题>列表舞台建立后根据请求数据绘制列表内容
 * */
var sns_list_snsTopic_rect = React.createClass({displayName: "sns_list_snsTopic_rect", 
	  render: function() {
	    var events = this.props.events;
	    var className = events.highlight ? 'am-active' :
    events.disabled ? 'am-disabled' : '';
    return (
     React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
      React.createElement("div", {className: "am-list-news-bd"}, 
       React.createElement("ul", {className: "am-list"}, 
		  this.props.events.data.map(function(event) {
		      return (
		       React.createElement("li", {className: "am-g am-list-item-dated"}, 
		  		   React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: PxSnsService.ajax_sns_snsTopic_show.bind(this,event.uuid)}, 
		  		    event.title
		  		   ), 	
		  		   
		  		   React.createElement("div", {className: "am-list-item-text"}, 
		  		    "有", event.reply_count, "人回复|", event.create_time, "-", PxSnsService.img_data_list(event.level)
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
 * <话题>创建与编辑界面绘制；
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * */    
var Sns_snsTopic_add_edit = React.createClass({displayName: "Sns_snsTopic_add_edit", 
 getInitialState: function() {
	    return this.props.formdata;
	  },
 handleChange: function(event) {			
	    this.setState($('#snsAnnouncementsForm').serializeJson());
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
  return (
   React.createElement("div", null, 
    React.createElement("div", {className: "header"}, 
     React.createElement("hr", null)
    ), 
    
  	React.createElement("div", {className: "am-g"}, 
  	 React.createElement("div", {className: "am-u-lg-6 am-u-sm-12"}, 
  	  React.createElement("form", {id: "snsAnnouncementsForm", method: "post", className: "am-form"}, 
  		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
	    React.createElement("input", {type: "hidden", name: "section_id", value: o.section_id}), 
	    React.createElement("label", {htmlFor: "name"}, "标题:"), 
	    React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxLength: "128", placeholder: "不超过128位"}), 
	    React.createElement("br", null), 
	    React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange}), 
	    G_get_upload_img_Div(), 
	    React.createElement("button", {type: "button", onClick: PxSnsService.ajax_sns_snsTopic_save, className: "am-btn am-btn-primary"}, "提交"), 
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
/*
*<话题>Show详情绘制（内含:点赞、举报、回复等）
* */
var sns_snsTopicshow = React.createClass({displayName: "sns_snsTopicshow", 
//收藏按钮方法;
  favorites_push: function(title,type,reluuid,url) {
	commons_ajax_favorites_push(title,type,reluuid,url)
  },
	//创建精品文章点击按钮事件跳转kd_servise方法;
  handleClick: function(m,uuid) {
   PxSnsService.btnclick_sns_snsTopic(m,uuid);
   }, 
render: function() {
  var o = this.props.data;
  var data={uuid:o.uuid,status:this.props.dianZan,yes_count:o.yes_count,no_count:o.no_count};
  var edit_btn_className="G_Edit_hide";
  if(this.props.canEdit)edit_btn_className="G_Edit_show";
  var iframe=null;
 if(o.url){
     iframe=(React.createElement("iframe", {id: "t_iframe", onLoad: G_iFrameHeight.bind(this,'t_iframe'), frameborder: "0", scrolling: "auto", marginheight: "0", marginwidth: "0", width: "100%", height: "600px", src: o.url}))	   
    }else{
     iframe=(       
		React.createElement(AMUIReact.Article, {
		 title: o.title, 
		 meta: Vo.announce_type(o.type)+" | "+o.create_time+ "|赞成"+ this.props.data.yes_count+"人"+"|反对"+ this.props.data.no_count+"人"}, 
		 React.createElement("div", {dangerouslySetInnerHTML: {__html: o.content}})
		))
     }
return (
  React.createElement("div", null, 
    iframe, 
      React.createElement(AMR_ButtonToolbar, null, 
       React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.uuid)}, "编辑"), 
       React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.uuid)}, "删除"), 
	     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid)}, "收藏"), 
       React.createElement(AMR_Button, {className:  G_CallPhoneFN.canShareUrl()?"":"am-hide", amStyle: "primary", onClick: G_CallPhoneFN.setShareContent.bind(this,o.title,o.title,null,this.props.share_url)}, "分享")
      ), 	
   React.createElement(Sns_comment_actions, {data: data}), 
    	 React.createElement(Sns_reply_list, {uuid: o.uuid, type: 0})	
   )
  );
 }
}); 
/*
 * 话题同意和不同意抽离方法
 * 功能：实现动态点击和双灰功能
 * removeClass("am-text-danger");
 * */
var Sns_comment_actions = React.createClass({displayName: "Sns_comment_actions", 
	getInitialState: function() {
		if(this.props.data)return this.props.data;
	  },
	 callback_yes:function(o){
		 var obj=this.state;
		 if(obj.status==1){
			 obj.yes_count-=1;
			 obj.status=null;
		 }else{
			 obj.yes_count+=1;
			 obj.status=1;
		 }
		 this.setState(obj);
	 },
	 yes_click:function(o){	
		if(o.status==2)return;
		 var url=hostUrl +"rest/snsTopic/yes.json";
		 if(o.status==1){
			 url=hostUrl +"rest/snsTopic/cancelDianzan.json";
		 }
		 var that=this;
		 PxSnsService.ajax_sns_dianzan(url,o.uuid,that.callback_yes);
		
	 },
	 callback_no:function(){
		 var obj=this.state;
		 if(obj.status==2){
			 obj.no_count-=1;
			 obj.status=null;
		 }else{
			 obj.no_count+=1;
			 obj.status=2;
		 }
		 this.setState(obj);
	 },
	 no_click:function(o){
		 if(o.status==1)return;
		 var url=hostUrl +"rest/snsTopic/no.json";
		 if(o.status==2){
			 url=hostUrl +"rest/snsTopic/cancelDianzan.json";
		 }
		 var that=this;
		 PxSnsService.ajax_sns_dianzan(url,o.uuid,that.callback_no);
		
	 },
render: function() {	
	var obj=this.state;
	var yesClick="",noClick="";
	if(obj.status==1){
		yesClick="px-icon-hasdianzan";
		noClick="";
	}else if(obj.status==2){
		noClick="px-icon-hasdianzan";
		 yesClick="";
	}	
  return (
		  React.createElement("footer", {className: "am-comment-footer"}, 
	    	React.createElement("div", {className: "am-comment-actions"}, 
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.yes_click.bind(this,obj)}, React.createElement("i", {className: "am-icon-thumbs-up px_font_size_click "+yesClick})), " ", obj.yes_count, 		    	
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.no_click.bind(this,obj)}, React.createElement("i", {className: "am-icon-thumbs-down px_font_size_click "+noClick})), "  ", obj.no_count, 	
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: common_check_illegal.bind(this,71,obj.uuid)}, "举报")
	    	)
	    )
  );
}
}); 


/*
 * <话题>评论回复模板
 * 绘制舞台方法
 * */
var Sns_reply_list = React.createClass({displayName: "Sns_reply_list", 
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
		var re_data=PxSnsService.ajax_sns_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}		  
		  this.pageNo++;
	},
	refreshReplyList:function(){
		$("#"+this.classnewsreply_list_div).html("");
		this.pageNo=1;
		this.load_more_data();
	},

render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
	this.classnewsreply_list_div="classnewsreply_list_div"+this.props.uuid;
	var parentThis=this;
  return (
      React.createElement("div", null, 
       React.createElement("div", {id: this.classnewsreply_list_div}), 
       React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多"), 
	   React.createElement(Sns_ajax_reply_save, {uuid: this.props.uuid, type: this.props.type, parentThis: parentThis})						 
	  )
  );
}
});
/*
 *<话题>评论信息列表绘制
 * 
 * */
var Sns_reply_list_show = React.createClass({displayName: "Sns_reply_list_show", 	
	render: function() {
	  return (
   React.createElement("div", null, 
     this.props.events.data.map(function(event) {
	   if(!event.create_img)event.create_img=G_def_headImgPath;
        return (
		  React.createElement("article", {className: "am-comment am-comment-flip am-comment-success am-margin-xs"}, 
		   React.createElement("a", {href: "javascript:void(0);"}, 
		    React.createElement("img", {src: event.create_img, className: "am-comment-avatar", width: "48", height: "48"})
		   ), 
		 React.createElement("div", {className: "am-comment-main am-comment-flip"}, 
		 
		    React.createElement("header", {className: "am-comment-hd"}, 
		      React.createElement("div", {className: "am-comment-meta"}, 
		      React.createElement("a", {href: "#link-to-user", className: "am-comment-author"}, event.create_user), "|", 
		      React.createElement("time", null, event.create_time), "|"			 
		      )
		    ), 
		     React.createElement("div", {className: "am-comment-bd am-comment-flip am-inline"}, 
		      React.createElement("div", {dangerouslySetInnerHTML: {__html:event.content}})
  		     ), 
	    	React.createElement("footer", {className: "am-comment-footer"}, 
	    	  React.createElement("div", {className: "am-comment-actions"}, 
	    	  React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+event.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 		    	
	    	  React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan2_"+event.uuid, className: "am-icon-thumbs-down px_font_size_click"}))
	    	  )
	    	), 
	    	React.createElement(Sns_snsReply_Yes, {uuid: event.uuid, type: 71, btn_dianzan: "btn_dianzan_"+event.uuid}), 			 		 
	        React.createElement(Sns_snsReply_No, {uuid: event.uuid, type: 71, btn_dianzan: "btn_dianzan2_"+event.uuid})
		
	      )
		 )			    		
 	      )
       })		
  )		   
	  );
	 }
	}); 
//我要评论模块 输入框绘制;
//that.refreshReplyList();自己写的一个刷新方法 置空一切到初始状态然后绘制;
var Sns_ajax_reply_save = React.createClass({displayName: "Sns_ajax_reply_save", 
	classnewsreply_list_div:"classnewsreply_list_div",
	reply_save_btn_click:function(){
		var that=this.props.parentThis;
		PxSnsService.ajax_sns_reply_save(function(){
			that.refreshReplyList();		
		})
	},
	componentDidMount:function(){
		$( '#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);
	},
render: function() {
return (
 React.createElement("form", {id: "snsClassnewsreplyForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
	 React.createElement("input", {type: "hidden", name: "topic_uuid", value: this.props.uuid}), 
	 React.createElement("input", {type: "hidden", name: "uuid"}), 
	 React.createElement("input", {type: "hidden", name: "type", value: this.props.uuid}), 			
	 React.createElement(AMR_Input, {id: "classnews_content_replay", type: "textarea", rows: "4", label: "我要评论", placeholder: "填写内容", name: "content"}), 
	 React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this), className: "am-btn am-btn-primary"}, "提交")		      
 )	   
);
}
});


//±±±±±±±±±±±±±±±±±±±±±±±±±±±评论回复模板同意和不同意观点方法绘制±±±±±±±±±±±±±±±±±±±±±±±±±±±
/* 
 * 评论回复模板同意观点舞台绘制
 **/
var Sns_snsReply_Yes = React.createClass({displayName: "Sns_snsReply_Yes", 
	getInitialState: function() {
		if(this.props.dianzan)return this.props.dianzan;
		return commons_ajax_dianzan_getByNewsuuid(this.props.uuid);
	  },
   componentWillReceiveProps: function(nextProps) {
	   this.setState(commons_ajax_dianzan_getByNewsuuid(nextProps.uuid));
	},
	handleChange_selectgroup_uuid:function(groupuuid){
		  this.setState(this.load_role_bind_user(groupuuid));
	},
	obj:null,
	 componentDidMount:function(){
		 var that=this;
		 //根据绑定的点赞按钮,设置对应状态,和绑定点击事件.
		if(!that.obj.canDianzan)$("#"+this.props.btn_dianzan).addClass("px-icon-hasdianzan");
		$("#"+this.props.btn_dianzan).bind("click",function(){
			var canDianzan=$("#"+that.props.btn_dianzan).hasClass("px-icon-hasdianzan")==false;
			PxSnsService.ajax_sns_snsReply_yes_save(that.props.uuid,canDianzan,that.dianzansave_callback);
		});
	 },
	 dianzansave_callback:function(canDianzan){
		 if(canDianzan)$("#"+this.props.btn_dianzan).addClass("px-icon-hasdianzan");
		 else $("#"+this.props.btn_dianzan).removeClass("px-icon-hasdianzan");
		 this.setState(commons_ajax_dianzan_getByNewsuuid(this.props.uuid));
	 },
render: function() {	
	var dianzanObject=this.state;
	 this.obj=dianzanObject;
	 var showStr=  null;
	 if(!dianzanObject.names){
		 return null;
	 }
  return (
React.createElement("div", null)
  );
}
}); 

/* 
 * 评论回复模板不同意观点舞台绘制
 **/
var Sns_snsReply_No = React.createClass({displayName: "Sns_snsReply_No", 
	getInitialState: function() {
		if(this.props.dianzan)return this.props.dianzan;
		return commons_ajax_dianzan_getByNewsuuid(this.props.uuid);
	  },
   componentWillReceiveProps: function(nextProps) {
	   this.setState(commons_ajax_dianzan_getByNewsuuid(nextProps.uuid));
	},
	handleChange_selectgroup_uuid:function(groupuuid){
		  this.setState(this.load_role_bind_user(groupuuid));
	},
	obj:null,
	 componentDidMount:function(){
		 var that=this;
		 //根据绑定的点赞按钮,设置对应状态,和绑定点击事件.
		if(!that.obj.canDianzan)$("#"+this.props.btn_dianzan).addClass("px-icon-hasdianzan");
		$("#"+this.props.btn_dianzan).bind("click",function(){
			var canDianzan=$("#"+that.props.btn_dianzan).hasClass("px-icon-hasdianzan")==false;
			PxSnsService.ajax_sns_snsReply_No_save(that.props.uuid,canDianzan,that.dianzansave_callback);
		});
	 },
	 dianzansave_callback:function(canDianzan){
		 if(canDianzan)$("#"+this.props.btn_dianzan).addClass("px-icon-hasdianzan");
		 else $("#"+this.props.btn_dianzan).removeClass("px-icon-hasdianzan");
		 this.setState(commons_ajax_dianzan_getByNewsuuid(this.props.uuid));
	 },
render: function() {	
	var dianzanObject=this.state;
	 this.obj=dianzanObject;
	 var showStr=  null;
	 if(!dianzanObject.names){
		 return null;
	 }
  return (
React.createElement("div", null)
  );
}
});



//±±±±±±±±±±±±±±±±±±±±±±±±±±±
















 