//——————————————————————————话题<绘制>—————————————————————  

/* 
 * <精品文章>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @btn_click_announce:点击按钮事件跳转kd_servise方法;
 * */
var Sns_good_Div_list = React.createClass({displayName: "Sns_good_Div_list", 
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
	var re_data=PxSnsService.sns_announce_Mygoodlist(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
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
		//  btnclick_good_announce(m,Store.getCurGroup().uuid);
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
var sns_mygoodlist_div = React.createClass({displayName: "sns_mygoodlist_div", 
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
	//创建精品文章点击按钮事件跳转kd_servise方法;
  	handleClick: function(m,groupuuid,uuid) {
		  btnclick_good_announce(m,groupuuid,uuid);
}, 
//收藏按钮方法;
favorites_push: function(title,type,reluuid,url) {
	commons_ajax_favorites_push(title,type,reluuid,url)
}, 
render: function() {
	  var o = this.props.data;
	  var edit_btn_className="G_Edit_hide";
	  if(this.props.canEdit){
		  edit_btn_className="G_Edit_show";
	  }
      var iframe=null;
	     if(o.url){
	       iframe=(React.createElement("iframe", {id: "t_iframe", onLoad: G_iFrameHeight.bind(this,'t_iframe'), frameborder: "0", scrolling: "auto", marginheight: "0", marginwidth: "0", width: "100%", height: "600px", src: o.url}))	   
	        }else{
	     iframe=(       
			React.createElement(AMUIReact.Article, {
			title: o.title, 
			meta: Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}, 
			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.message}})
			))
	     }

return (
		  React.createElement("div", null, 
            iframe, 
		     React.createElement(AMR_ButtonToolbar, null, 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)}, "编辑"), 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.groupuuid,o.uuid)}, "删除"), 
		     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid)}, "收藏"), 
		     React.createElement(AMR_Button, {className:  G_CallPhoneFN.canShareUrl()?"":"am-hide", amStyle: "primary", onClick: G_CallPhoneFN.setShareContent.bind(this,o.title,o.title,null,this.props.share_url)}, "分享")
		     ), 	
		    	React.createElement("footer", {className: "am-comment-footer"}, 
		    	React.createElement("div", {className: "am-comment-actions"}, 
		    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
		    	React.createElement("a", {href: "javascript:void(0);", onClick: common_check_illegal.bind(this,3,o.uuid)}, "举报")
		    	)
		    	), 
		    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 0, btn_dianzan: "btn_dianzan_"+o.uuid}), 
			  React.createElement(Common_reply_list, {uuid: o.uuid, type: 0})			 
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
  		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxLength: "128", placeholder: "不超过128位"}), 
  		  React.createElement("br", null), 
  		  React.createElement("label", {htmlFor: "name"}, "分享链接(链接和内容选填一个):"), 
  		  React.createElement("input", {type: "text", name: "url", id: "url", value: o.url, onChange: this.handleChange_url, maxLength: "256", placeholder: "可直接使用外部内容的链接地址显示"}), 
  		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
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