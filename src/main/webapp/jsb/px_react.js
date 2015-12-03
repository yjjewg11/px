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
	    		  
	    		  React.createElement("button", {type: "button", onClick: that.btn_addCookplan.bind(this,"div_cookPlan_"+that.props.type), className: "am-btn am-btn-primary"}, "添加")
 	    		)
		
	  )
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
						 msg_classNmae="am-list-item-text";
						  }
					  return(							  										  
			    React.createElement("li", {className: "am-g am-list-item-dated"}, 
			  React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: thit.handleClick.bind(this,event)}, 
			    event.title, "： ", event.message
			  ), 		
			    React.createElement("div", {id: event.uuid, className: msg_classNmae}, 
			  	   React.createElement("time", null, "消息发送于 ", event.create_time)
			  		  )
			  		     ))})
    			    )
    			  )
    	        ) 		 
		      );
		   }})	
//±±±±±±±±±±±±±±±±±±±±±±±±±±±









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
		this.forceUpdate();
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
      
  	    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
     	React.createElement(AMUIReact.Selected, {btnStyle: "secondary", id: "selectclass_uuid", name: "groupuuid", onChange: this.handleClick.bind(this,"oth"), btnWidth: "200", value: hd_type, multiple: false, data: this.props.btn_list})
     	), 
		    React.createElement(AMUIReact.Button, {amStyle: "secondary", onClick: this.handleClick.bind(this,"add")}, "发布互动"), 

		 
		    React.createElement(AMUIReact.Button, {amStyle: "secondary", onClick: this.refresh_data.bind(this)}, "刷新"), 
		    React.createElement(G_help_popo, {msg: G_tip.Classnews})
		    )
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
	render: function() {		  
		  var  o = this.props.event;
		  if(!o.imgsList)o.imgsList=[];
		  if(!o.create_img)o.create_img=G_def_headImgPath;	
	  return (
			  React.createElement("div", null, 
			  React.createElement("article", {className: "am-comment am-margin-xs"}, 
			  React.createElement("a", {href: "javascript:void(0);"}, 
			    React.createElement("img", {src: o.create_img, className: "am-comment-avatar", width: "48", height: "48"})
			  ), 

			  React.createElement("div", {className: "am-comment-main"}, 
			    React.createElement("header", {className: "am-comment-hd "}, 
			      React.createElement("div", {className: "am-comment-meta"}, 
			         React.createElement("a", {href: "javascript:void(0);", className: "am-comment-author"}, o.class_name, "|", o.create_user, "|", o.group_name)
				  )
			    ), 
			    React.createElement("div", {className: "am-comment-bd"}, 
			    React.createElement("div", {dangerouslySetInnerHTML: {__html:o.content}}
			    ), 
			    	React.createElement(Common_mg_big_fn, {imgsList: o.imgsList})
			    ), 
			    	React.createElement("footer", {className: "am-comment-footer"}, 
			    	React.createElement("div", {className: "am-comment-actions"}, 
			    	GTimeShow.showByTime(o.create_time), 
					 
			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"})), 
						 "|阅读"+o.count, 
			    	React.createElement("a", {href: "javascript:void(0);", onClick: common_check_illegal.bind(this,99,o.uuid)}, "举报")
			    	)
			    	), 
			    	React.createElement(Common_Dianzan_show_noAction, {dianzan: o.dianzan, uuid: o.uuid, type: 99, btn_dianzan: "btn_dianzan_"+o.uuid}), 
			    	React.createElement("ul", {className: "am-comments-list"}, 
					  React.createElement(Classnews_reply_list, {replyPage: o.replyPage, uuid: o.uuid, type: 99, btn_reply: "btn_reply_"+o.uuid})
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
			responsive: true, bordered: true, striped :true,hover:true,striped:true
			}), document.getElementById(list_div));
	},
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		var re_data=this.state.replyPage;
		if(re_data&& this.pageNo==1){
			this.loadByFirst(this.classnewsreply_list_div+this.pageNo);		
		}else{
			re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow);
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
render: function() {
return (
		  React.createElement("div", null, 
		  this.props.events.data.map(function(event) {
		      return (
		    		  React.createElement("li", {className: "am-cf"}, 
		    		  React.createElement("span", {className: "am-comment-author am-fl"}, event.create_user+":"), 
				        React.createElement("span", {className: "am-fl", dangerouslySetInnerHTML: {__html:event.content}})
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
	//班级互动全部选中班级方法；
	handleClick_box_btn:function(event){
          var class_uuid=[];
		  var mycalsslist=this.props.mycalsslist;
		  var tmp=$('#editClassnewsForm').serializeJson();
				for(var i=0;i<mycalsslist.length;i++){
				  class_uuid.push(mycalsslist[i].value);
				  }    
            $($("input[name='pw_checked']")).each(function(){					
					 if(this.checked){
						 g_checkflag=true;
     	                 tmp.classuuid=class_uuid.join(",");	
					 }else{		
						 g_checkflag=false;
					     tmp.classuuid=class_uuid[0];					     
					 }
					});

                              this.setState(tmp);
		   
      },
	//班级互动下拉框联动方法；
	handleClick_selected:function(val){
          var class_uuid=[];
          var class_arry=[];
		  var mycalsslist=this.props.mycalsslist;
		  	 for(var i=0;i<mycalsslist.length;i++){
				  class_uuid.push(mycalsslist[i].value);
				  } 
		  var tmp=$('#editClassnewsForm').serializeJson();
              class_arry=tmp.classuuid.split(",");
			  if(!class_arry[0])class_arry[0]=class_uuid[0];//当只有个选项时点击安全机制处理;
			  if(class_arry.length==mycalsslist.length){
		             g_checkflag=true;
	            }else{
	                 g_checkflag=false;
	             }
			  if(!class_arry[0]){
				 tmp.classuuid=class_arry[0];	
			  }else{		  
			     tmp.classuuid=class_arry.join(",");	
			    }
				
               this.setState(tmp);
		   
      },
	 handleChange: function(event) {
			  var tmp=$('#editClassnewsForm').serializeJson();
		    this.setState(tmp);
				//根据学校uuid添加水印	
			var obj=Store.getClassByMyClassList(tmp.classuuid);
			if(obj){
				w_img_upload_nocut.groupuuid=obj.groupuuid;
			}else{
				w_img_upload_nocut.groupuuid=null;
			}

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
		  
		 	//根据学校uuid添加水印	
			var obj=Store.getClassByMyClassList( this.state.classuuid);
			if(obj){
				w_img_upload_nocut.groupuuid=obj.groupuuid;
			}else{
				w_img_upload_nocut.groupuuid=null
			}


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
		  React.createElement("form", {id: "editClassnewsForm", method: "post", className: "am-form"}, 
	      React.createElement("div", null, 
		  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "classuuid", inline: true, multiple: true, onChange: this.handleClick_selected, btnWidth: "300", data: this.props.mycalsslist, btnStyle: "primary", value: o.classuuid})	      
          ), 
	       React.createElement("div", null, 
  
          React.createElement("input", {id: " pw_checked", name: "pw_checked", type: "checkbox", checked: g_checkflag, onChange: this.handleClick_box_btn}), 
	 	  "选中全部班级"
	    
		  ), 
          React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
			React.createElement("input", {type: "hidden", name: "imgs", id: "imgs", value: o.imgs}), 			
		      React.createElement(AMR_Input, {id: "classnews_content", type: "textarea", rows: "8", label: "内容:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange}), 
		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
		      React.createElement("div", {className: "cls"}), 
			  G_get_upload_img_Div(), 
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
		  		    React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd ", onClick: react_ajax_announce_show.bind(this,event.uuid,Vo.announce_type(event.type))}, 
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
	//公告编辑与删除点击按钮事件跳转kd_servise方法;
  	handleClick: function(m,groupuuid,uuid) {
  		btnclick_announce(m,groupuuid,uuid);
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
return (
		  React.createElement("div", null, 
            React.createElement("div", {className: "am-margin-left-sm"}, 
		 
            React.createElement(AMUIReact.Article, {
		    title: o.title, 
		    meta: Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}, 
			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.message}})
		      ), 		     
		     React.createElement(AMR_ButtonToolbar, null, 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)}, "编辑"), 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.groupuuid,o.uuid)}, "删除"), 
		     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid)}, "收藏"), 
		     React.createElement(AMR_Button, {className: G_CallPhoneFN.canShareUrl()?"":"am-hide", amStyle: "primary", onClick: G_CallPhoneFN.setShareContent.bind(this,o.title,o.title,null,this.props.share_url)}, "分享")
		     )		     
		     ), 
		    	React.createElement("footer", {className: "am-comment-footer"}, 
		    	React.createElement("div", {className: "am-comment-actions"}, 
		    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"}))
		    	)
		    	), 
		    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 0, btn_dianzan: "btn_dianzan_"+o.uuid}), 
			  React.createElement(Common_reply_list, {uuid: o.uuid, type: 0})			 
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
			  var tmp=$('#editAnnouncementsForm').serializeJson();
		    this.setState(tmp);
			w_img_upload_nocut.groupuuid=tmp.groupuuid;
	  },
	  componentDidMount:function(){
	  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
	    this.editor=editor;
          w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
          });
			w_img_upload_nocut.groupuuid=this.state.groupuuid;
		
	  },
		editor:null,
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
 React.createElement("hr", null), 
 		
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
  		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxLength: "45", placeholder: "不超过45位"}), 
  		  React.createElement("br", null), 
  		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
 		G_get_upload_img_Div(), 
  		  React.createElement("button", {type: "button", onClick: ajax_announce_save, className: "am-btn am-btn-primary"}, "提交"), 
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



//——————————————————————————<培训机构新版>课程表<列表版>——————————————————————————  
/*
 * <培训机构新版><课程表>服务器请求后绘制处理方法；
 * 
 * */

var px_rect_teachingplan_fn = React.createClass({displayName: "px_rect_teachingplan_fn",
render: function() {
	 var o=this.props;
    return (
    React.createElement("div", null, 
    React.createElement(AMR_Panel, null, 
    React.createElement(AMR_ButtonToolbar, null, 
		this.props.classlist.map(function(event) {
			  return(
			  	 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
			  	  React.createElement(AMR_Button, {amSize: "xs", className: "am-hide-sm", amStyle: "secondary", onClick: px_ajax_teachingplan_fn.bind(this,event.uuid,o.pageNo)}, event.name)
			  	)  			  	  
			  )})
		 )
      ), 
     React.createElement("legend", null, Store.getClassByUuid(o.classuuid).name), 		 

     React.createElement("div", {className: "am-panel-group", id: "accordion"}, 
     
	 this.props.events.map(function(event) {
		  return(	
				  
			 React.createElement("div", {className: "am-panel am-panel-default"}, 
			  React.createElement("div", {className: "am-panel-hd"}, 
			   React.createElement("h4", {className: "am-panel-title", "data-am-collapse": "{parent: '#accordion', target: '#do-not-say-"+event.uuid+"'}"}, 
			      event.name, "—— 时间：", event.plandate
			     )
			    ), 
			   React.createElement("div", {id: "do-not-say-"+event.uuid, className: "am-panel-collapse am-collapse"}, 
			  React.createElement("div", {className: "am-panel-bd"}, 
			   React.createElement("div", null, 
			     "上课地点:", event.address
			   ), 
			   React.createElement("div", null, 
			     "需要工具:", event.readyfor
			   ), 
			   React.createElement("div", null, 
				 "课程时长:", event.duration
			   ), 
			   React.createElement("div", null, 
			     "课程详细内容:", event.context
			   )
			     )
			   )
			 )
		  )})
       )
      )
    );
  }
});
    
////培训机构新课程表添加与编辑绘制
//var Px_Teachingplan_edit = React.createClass({ 
//	 getInitialState: function() {
//		    return this.props.formdata;
//		  },
//	 handleChange: function(event) {
//		    this.setState($('#editTeachingplanForm').serializeJson());
//	  },
//render: function() {
//	  var o = this.state;
// 	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
// 	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
//return (
//		<form id="editTeachingplanForm" method="post" className="am-form">
//			<PxInput type="hidden" name="uuid"  value={o.uuid}/>
//		     <PxInput type="hidden" name="classuuid"  value={o.classuuid}/>
//		   <div className="am-form-group">
//			
//		       <label className={one_classDiv}>课程名：</label>
//			     <div className={two_classDiv}>
//			       <PxInput  type="text" name="name" id="name" maxLength="20" value={o.name} onChange={this.handleChange}/>
//			        </div>
//			       
//  		     <label className={one_classDiv}>日期:</label>
//		      <div className={two_classDiv}>
//				 <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="plandateStr" id="plandateStr" dateTime={o.plandate}  onChange={this.handleChange}/>
//		        </div>
//			 	
//			       <label className={one_classDiv}>课时长：</label>
//				     <div className={two_classDiv}>
//				       <PxInput  type="text" name="duration" id="duration" maxLength="20" value={o.duration} onChange={this.handleChange}/>
//				        </div>
//				 
//				       <label className={one_classDiv}>上课地点：</label>
//					     <div className={two_classDiv}>
//					       <PxInput  type="text" name="address" id="address" maxLength="20" value={o.address} onChange={this.handleChange}/>
//					        </div>
//					       
//	  		     <label className={one_classDiv}>准备工具:</label>
//			      <div className={two_classDiv}>
//			       <PxInput  type="text" placeholder="默认为无需准备工具" name="readyfor" id="readyfor" maxLength="20" value={o.readyfor} onChange={this.handleChange}/>
//			        </div>
//				      <button type="button"  onClick={ajax_teachingplan_save_byRight}  className="am-btn am-btn-primary">提交</button>		      				      
//				      </div>  
//		          </form> 	   		   				
//
//);
//}
//}); 
//±±±±±±±±±±±±±±±±±±±±±±±±±±± 





//暂时屏蔽，课程表-培训机构-新展示方式
///*
// * 培训机构创建框架显示一周
// * */
//var Px_Teachingplan_show7Day = React.createClass({ 
//	getInitialState: function() {
//		
//		var obj= {
//		    	classuuid:this.props.classuuid,
//		    	classlist:this.props.classlist,
//		    	pageNo:0,
//		    	list: this.props.list
//		    };
//		obj=this.ajax_list(obj);
//	    return obj;
//	   
//	  },
//	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
//	  componentWillReceiveProps: function(nextProps) {
//		  var obj= {
//				  classuuid:nextProps.classuuid,
//				  classlist:nextProps.classlist,
//			    	pageNo:nextProps.pageNo,
//			    	type:nextProps.type,
//			    	list: nextProps.list
//			    };
//				
//			obj=this.ajax_list(obj);
//		  this.setState(obj);
//		},
//	 ajax_list:function(obj){
//		 var now=new Date();
//		  	now=G_week.getDate(now,obj.pageNo*7);
//		 var begDateStr=G_week.getWeek0(now,obj.pageNo);
//		var endDateStr=G_week.getWeek6(now,obj.pageNo);;
//			//记录老师选择的班级.
//			G_myCurClassuuid=obj.classuuid;
//		$.AMUI.progress.start();
//		var url = hostUrl + "rest/pxteachingplan/list.json";
//		$.ajax({
//			type : "GET",
//			url : url,
//		//	data : {type:obj.type,groupuuid:obj.groupuuid,pageNo:obj.pageNo},
//			data : {classuuid:obj.classuuid,begDateStr:begDateStr,endDateStr:endDateStr},
//			dataType : "json",
//			async: false,//必须同步执行
//			success : function(data) {
//				$.AMUI.progress.done();
//				if (data.ResMsg.status == "success") {
//					obj.list=data.list;
//				} else {
//					alert(data.ResMsg.message);
//					G_resMsg_filter(data.ResMsg);
//				}
//			},
//			error : G_ajax_error_fn
//		});
//		return obj;
//		
//	},
//	pageClick: function(m) {
//		 var obj=this.state;
//		 if(m=="pre"){
//			 obj.pageNo=obj.pageNo-1;
//			 this.setState(this.ajax_list(obj));
//			 return;
//		 }else if(m=="next"){
//			 obj.pageNo=obj.pageNo+1;
//			 this.setState(this.ajax_list(obj));
//			 return;
//		 }
//	},
//
//	px_biaoqian_button: function(val) {
//		 var obj=this.state;
//		 obj.classuuid=val;
//		 this.setState(this.ajax_list(obj));
//    },
//	componentDidMount: function() {
////		if(!this.props.formdata){
////			  $("#div_detail").html("今日没有发布教学计划");
////		  }	    
//	  },	  
//	render: function() {
//	  var o = this.state;
//	  var thit=this;
//	  var now=new Date();
//	  	now=G_week.getDate(now,o.pageNo*7);
//	  return (
//		<div>
//		  <AMR_ButtonToolbar>
//		  <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		<AMR_Button amSize="xs" amStyle="secondary" onClick={this.pageClick.bind(this, "pre")}  >上周</AMR_Button>
//		</div> 
//		<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		<AMR_Button amSize="xs" amStyle="secondary" onClick={this.pageClick.bind(this, "next")} >下周</AMR_Button>	
//		</div> 
//		{this.state.classlist.map(function(event) {
//			  return(
//			  	 <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//			  	  <AMR_Button amSize="xs" className="am-hide-sm" amStyle="danger" onClick={thit.px_biaoqian_button.bind(this,event.value)} >{event.label}</AMR_Button>
//			  	</div>  			  	  
//			  )})}
//		  </AMR_ButtonToolbar>
//		<hr/>
//
//	    
//		<div className="am-g" id="div_detail">
//		<legend>{Store.getClassByUuid(o.classuuid).name}</legend> 
//		<Px_G_Teachingplan_7day classuuid={this.state.classuuid} startDate={now} list={this.state.list} />
//		
//		</div>
//	   
//	   </div>
//);
//}
//}); 
//
//
///**
// * 全局模版-没有内容时显示
// * <G_Teachingplan_7day classuuid={this.state.classuuid} startDate={startDate} list={list} />
// */
//var Px_G_Teachingplan_7day= React.createClass({ 
//	getInitialState: function() {
//		var obj= {
//				classuuid:this.props.classuuid,
//				startDate:this.props.startDate,
//		    	size:7,
//		    	list: this.props.list
//		    };
//	    return obj;
//	   
//	  },
//	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
//	  componentWillReceiveProps: function(nextProps) {
//		  var obj= {
//					startDate:nextProps.startDate,
//					classuuid:nextProps.classuuid,
//			    	size:7,
//			    	list: nextProps.list
//			    };
//		  this.setState(obj);
//		},
//		/**
//		 * 根据日期生成课程表,如何返回数据中没有,则创建空的.
//		 */
//		getOneDayData:function(d1,list){
//			for(var i=0;i<list.length;i++){
//				var tmp=list[i];
//				if(tmp.plandate.indexOf(d1)>-1){
//					return tmp;
//				}
//			}
//			return {classuuid:this.state.classuuid,plandate:d1,morning:"",afternoon:"",uuid:null};
//		},
//		/**
//		 * 获取7天的课程表数据
//		 */
//		getListByStartDate:function(d1,size,list){ 
//			var ar=[];
//			var t=G_week.getWeekDayByDate(d1);
//			if(t==0)t=-6;
//			else t=1-t;
//			for(var i=0;i<size;i++){
//				var tmp=G_week.getDateStr(d1,t);
//				t++;
//				ar.push(this.getOneDayData(tmp,list));
//			}
//			return ar;
//		},
//	  render: function() {
//		 var ar=this.getListByStartDate(this.state.startDate,this.state.size,this.state.list);
//	    return (
//	    		<div>
//	    		 {ar.map(function(event) {
//					  return(							  										  
//						<Px_G_Teachingplan_1day data={event} />
//					  )})}
//	    		 </div>
//	    );
//	  }
//	  }); 
//var Px_G_Teachingplan_1day= React.createClass({ 
//	getInitialState: function() {
//		var obj= {
//				 isEdit:false,
//				data:this.props.data
//		    };
//	    return obj;
//	  },
//	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
//	  componentWillReceiveProps: function(nextProps) {
//		  var obj= {
//				  isEdit:false,
//				  data:nextProps.data
//			    };
//		  this.setState(obj);
//		},
//	   edit:function(o){
//		   var obj= {
//				   	isEdit:true,
//					  data:o
//				    };
//		   this.setState(obj);
//	   },
//	   save_callback:function(data){
//		  	G_msg_pop(data.ResMsg.message);
//		   var obj= {
//				   isEdit:false,
//					  data:data.data
//				    };
//		   this.setState(obj);
//     
//       },
//	  render: function() {
//		  var o=this.state.data;
//		  var edit_btn_className="G_Edit_hide";
//		  if(this.state.isEdit){
//			  return (<Px_Teachingplan_edit formdata={o} callback={this.save_callback.bind(this)} />);
//		  }
//		  var dianzan=(<div></div>);
//		  if(o.uuid){
//			  edit_btn_className="G_Edit_show"
//			  dianzan=(
//					  <div>
//					  <footer className="am-comment-footer">
//				    	<div className="am-comment-actions">
//				    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
//				    	<a href="javascript:void(0);"><i id={"btn_reply_"+o.uuid} className="am-icon-reply px_font_size_click"></i></a>
//				    	</div>
//				    	</footer>
//				    	<Common_Dianzan_show_noAction uuid={o.uuid} type={7}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
//				    	<ul className="am-comments-list">
//						  <Classnews_reply_list uuid={o.uuid}  type={7} btn_reply={"btn_reply_"+o.uuid}/>
//				    	</ul>
//				  </div>);
//		  }
//		  var divCs1="am-u-sm-4 am-u-md-2 am-u-lg-1";
//		  var divCs2="am-u-sm-8 am-u-md-10 am-u-lg-11";
//		  var cs="am-panel am-panel-secondary";
//		 
//		  if(o.plandate.indexOf( G_week.getDateStr(new Date(),0))>-1){
//			  cs="am-panel am-panel-warning";			  
//		  }
//			return (
//					
//					<div className={cs}>
//					  <div className="am-panel-hd">
//					  <h3 className="am-panel-title am-g">
//						  <div className={divCs1}>{G_week.getWeekStr(o.plandate)}</div>
//			    		  <div className={divCs2}>{o.plandate.split(" ")[0]}
//			    		  < AMR_Button className="am-margin-left" amStyle ="warning" onClick={this.edit.bind(this,{afternoon:"",classuuid:o.classuuid,morning:"",plandate:o.plandate,uuid:null})}  >添加课程</AMR_Button >
//			    		  </div>
//					  </h3>
//					  </div>
//					  <div className="am-panel-bd">
//						<AMR_Button className={edit_btn_className} amSize="xs" amStyle="secondary" onClick={this.edit.bind(this,o)}  >{o.name}</AMR_Button>
//
//
//				    		<div className="am-g">
//				    		{dianzan}
//				    		</div>
//					  </div>
//					 
//					</div>
//	    		
//	    		
//	    );
//	  }
//	  });  
//
//
////培训机构新课程表添加与编辑绘制
//var Px_Teachingplan_edit = React.createClass({ 
//	 getInitialState: function() {
//		    return this.props.formdata;
//		  },
//	 handleChange: function(event) {
//		    this.setState($('#editTeachingplanForm').serializeJson());
//	  },
//render: function() {
//	  var o = this.state;
// 	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
// 	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
//return (
//		<form id="editTeachingplanForm" method="post" className="am-form">
//			<PxInput type="hidden" name="uuid"  value={o.uuid}/>
//		     <PxInput type="hidden" name="classuuid"  value={o.classuuid}/>
//		   <div className="am-form-group">
//			
//		       <label className={one_classDiv}>课程名：</label>
//			     <div className={two_classDiv}>
//			       <PxInput  type="text" name="name" id="name" maxLength="20" value={o.name} onChange={this.handleChange}/>
//			        </div>
//			       
//  		     <label className={one_classDiv}>日期:</label>
//		      <div className={two_classDiv}>
//				 <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="plandateStr" id="plandateStr" dateTime={o.plandate}  onChange={this.handleChange}/>
//		        </div>
//			 	
//			       <label className={one_classDiv}>课时长：</label>
//				     <div className={two_classDiv}>
//				       <PxInput  type="text" name="duration" id="duration" maxLength="20" value={o.duration} onChange={this.handleChange}/>
//				        </div>
//				 
//				       <label className={one_classDiv}>上课地点：</label>
//					     <div className={two_classDiv}>
//					       <PxInput  type="text" name="address" id="address" maxLength="20" value={o.address} onChange={this.handleChange}/>
//					        </div>
//					       
//	  		     <label className={one_classDiv}>准备工具:</label>
//			      <div className={two_classDiv}>
//			       <PxInput  type="text" placeholder="默认为无需准备工具" name="readyfor" id="readyfor" maxLength="20" value={o.readyfor} onChange={this.handleChange}/>
//			        </div>
//				      <button type="button"  onClick={ajax_teachingplan_save}  className="am-btn am-btn-primary">提交</button>		      				      
//				      </div>  
//		          </form> 	   		   				
//
//);
//}
//});




//——————————————————————————（幼儿园老版首页）课程表<绘制>——————————————————————————  
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
				    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 0, btn_dianzan: "btn_dianzan_"+o.uuid}), 
					  React.createElement(Common_reply_list, {uuid: o.uuid, type: 0})
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
		 React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick_class.bind( this,"add",this.props.ch_class.uuid,this.props.ch_day)}, "新增课程")
		), 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		  "课程表-", this.props.ch_day
		
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
		 React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", showTimePicker: false, name: "plandateStr", id: "plandateStr", dateTime: o.plandate, onChange: this.handleChange}), 
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
//——————————————————————————（幼儿园新版首页->课程表）<绘制>——————————————————————————  
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
		var url = hostUrl + "rest/pxteachingplan/list.json";
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
		React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "pre")}, "上周"), 
		React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "next")}, "下周"), 	
		React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "group_uuid", onChange: this.handleChange_selectclass_uuid.bind(this), btnWidth: "200", data:  this.state.classlist, btnStyle: "primary", value: this.state.classuuid})
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
			  dianzan=(
					  React.createElement("div", null, 
					  React.createElement("footer", {className: "am-comment-footer"}, 
				    	React.createElement("div", {className: "am-comment-actions"}, 
				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"}))
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
			    		   React.createElement(AMR_Button, {className: "am-margin-left", amStyle: o.uuid?"default":"warning", onClick:  this.edit.bind( this ,o)}, o.uuid?"修改":"创建")
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
		            url:hostUrl + "rest/pxteachingplan/save.json",
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
	  handleChange_selectgroup_uuid:function(){
		  ajax_parentContactByMyStudent($('#sutdent_name').val(),$("input[name='class_uuid']").val());
	  },
	  handleChange_class_uuid:function(val){
		  ajax_parentContactByMyStudent(null,val);
	  },
		  
		render: function() {
	     var o =this.state;	
	     var ListItem;
//	      		 
	   	this.props.class_list.unshift({value:"",label:"所有"});
		 return (
		 		React.createElement("div", null, 
			      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
			          React.createElement(AMR_Panel, null, 
	  			  	  React.createElement(AMR_ButtonToolbar, null, 
	  			  	  
		              React.createElement("div", {className: "am-fl"}, 
			    	  React.createElement(AMUIReact.Selected, {name: "class_uuid", placeholder: "班级选择", onChange: this.handleChange_class_uuid, btnWidth: "200", multiple: false, data: this.props.class_list, btnStyle: "primary", value: this.props.class_uuid})
			    	  ), 
			    	  React.createElement("div", {className: "am-fl am-margin-left-xs"}, 
			    	  React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "输入孩子姓名"})
			    	  ), 
			    	  React.createElement("div", {className: "am-fl am-margin-left-xs"}, 
			    	  React.createElement("button", {type: "button", onClick: this.handleChange_selectgroup_uuid, className: "am-btn am-btn-secondary"}, "搜索")
			    	  )			    	  
			    	 		  
				      )
                      )
 
				  ), 		        
	  	  	       React.createElement("ul", {className: "am-list am-list-static am-list-border"}, 
	  	  			this.props.formdata.map(function(event) {
	  	  				var ListItem=null;
	  	  				var showName=event.student_name+"的"+event.typename;
	  	  				if(event.isreg==1){
	  	  				ListItem=(
	  	  				React.createElement(AMUIReact.Button, {onClick: ajax_parentContactByMyStudent_message_list.bind(this,event.parent_uuid,showName), amStyle: "secondary"}, "发信件")	
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
	  	  		         React.createElement("a", {href: "tel:"+event.tel}, React.createElement(AMUIReact.Button, {amStyle: "disable"}, "电话"), " "), 
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
	},
render: function() {
  return (
		   React.createElement("form", {id: "editForm", method: "post", className: "am-form"}, 
			React.createElement("input", {type: "hidden", name: "revice_useruuid", value: this.props.uuid}), 			
			  React.createElement(AMR_Input, {id: "classnews_content_replay", type: "textarea", rows: "4", label: "信息发送", placeholder: "填写内容", name: "message"}), 
		      React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this), className: "am-btn am-btn-secondary"}, "发送")		      
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
	    			  events.data.map(function(event) {
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
*精品文章点赞、评论、加载更多等详情绘制模板；
* */
var Announcements_goodshow = React.createClass({displayName: "Announcements_goodshow", 
	//精品文章删除、编辑点击按钮事件跳转kd_servise方法;
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
		     React.createElement(AMR_Button, {className: G_CallPhoneFN.canShareUrl()?"":"am-hide", amStyle: "primary", onClick: G_CallPhoneFN.setShareContent.bind(this,o.title,o.title,null,this.props.share_url)}, "分享")
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
 * (精品文章)编辑界面绘制；
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
		   var thit=this;
	
			 var tmp=$('#editAnnouncementsForm').serializeJson();
		    this.setState(tmp);
			w_img_upload_nocut.groupuuid=tmp.groupuuid;
	  },
	  componentDidMount:function(){
	  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
	    this.editor=editor;
          w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
          });

		w_img_upload_nocut.groupuuid=this.state.groupuuid;
	  },
	 preview_fn:function(){
          G_html_preview("t_iframe", this.state.url,this.editor.getSource(),this.state.title);
       }, 


render: function() {
	 var o = this.state;
	
  return (
  		React.createElement("div", null, 
	   React.createElement("hr", null), 
  	
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
  		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "详细内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
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



////——————————————————————————我的班级<老版暂时屏蔽绘制>—————————————————————————— 
///*
//* 我的班级 show绘制2级界面班级选择绘制；
//* @show老师查看状态进入查看学生详情;
//* @Class_students_show（kd_service中服务器请求时调用）;
//* */
//var Class_students_show= React.createClass({
//	 componentDidMount:function(){
//			 G_img_down404();
//	  },
//	  handleChange_selectgroup_uuid:function(val){
//		  react_ajax_class_students_manage(val,"show");
//	  },
//	  handleClick:function(m,groupuuid,uuid){
//		  btn_click_class_list(m,groupuuid,uuid); 			
//	  },
//	  showTeachingplanClick:function(classuuid){
//		  G_myCurClassuuid=classuuid;
//		  menu_teachingplan_dayShow_fn();
//	  },
//	render: function() {
//		var o=this.props.formdata;
//		if(!o)o="";
//		var stutent_num=this.props.stutent_num;
//		if(!this.props.students)this.props.students=[];
//	  return (
//	  <div>	 
//		  <AMR_Panel>
//			  <AMR_Grid className="doc-g">
//		  	  <AMR_ButtonToolbar>
//		  	<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		  	  <AMUIReact.Selected id="selectgroup_uuid1" name="class_uuid" onChange={this.handleChange_selectgroup_uuid.bind(this)} btnWidth="200" data={this.props.classList} btnStyle="primary" value={o.uuid} />
//		  	</div>  
//		  	<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		  	  <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.showTeachingplanClick.bind(this,o.uuid,o.name)} >查看课程</AMR_Button>
//		  	</div>
//		  	<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		  	  <AMR_Button amSize="xs"  amStyle="warning" onClick={this.handleClick.bind(this,"addstudent",o.groupuuid,o.uuid)} >管理学生</AMR_Button>
//		  	</div>
//		  	  <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		  	  <AMR_Button amSize="xs"  onClick={this.handleClick.bind(this,"addclass",o.groupuuid,o.uuid)} >添加班级</AMR_Button>
//		  	</div> 
//		  	 <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		  	  <AMR_Button amSize="xs" amStyle="primary" onClick={this.handleClick.bind(this,"edit_class",o.groupuuid,o.uuid)} >班级编辑</AMR_Button>
//		  	</div>  
//		  	 <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		  	  <AMR_Button amSize="xs" className="am-hide-sm" amStyle="danger" onClick={this.handleClick.bind(this,"delete",o.groupuuid,o.uuid)} >删除空班级</AMR_Button>
//		  	</div>  
//		  	  
//		  	  </AMR_ButtonToolbar>
//	  		    
//	  		   <AMR_Col className="am-hide-sm" sm={6} md={3}> 学校:{Store.getGroupNameByUuid(o.groupuuid)}</AMR_Col>
//			    <AMR_Col className="am-hide-sm" sm={6} md={3} > 班级:{o.name}</AMR_Col>
//			    <AMR_Col sm={5} md={2} >管理员:{o.headTeacher_name}</AMR_Col>
//			    <AMR_Col sm={4} md={2}>上课老师:{o.teacher_name}</AMR_Col>
//			    <AMR_Col sm={3} md={2}>人数:{this.props.students.length}</AMR_Col>
//			  </AMR_Grid>
//		  </AMR_Panel>
//		  <AMR_Gallery data={this.props.students}  sm={5} md={8} lg={10} />
//	    </div>
//	  );
//	}
//	});
//
//
//
///*
//* <我的班级>班级添加详情绘制
//* @ajax_class_save：提交按钮在Kd_service;
//* */	
//var AMR_Grid=AMUIReact.Grid;
//var AMR_Col=AMUIReact.Col;
//  var Class_edit = React.createClass({ 
//  	 getInitialState: function() {
//  		    return this.props.formdata;
//  		  },
//  	 handleChange: function(event) {
//  		 
//  		 if(event==G_group_wjd){
//  			 $('#help1_span').show();
//  		 }else{
//  			 $('#help1_span').hide();
//  		 }
//  		    this.setState($('#editClassForm').serializeJson());
//  	  },
//  render: function() {
//  	  var o = this.state;
//	  var course_list=Store.getCourseList(o.groupuuid);
//
//	 course_list= G_selected_dataModelArray_byArray(Store.getCourseList(o.groupuuid),"uuid","title");
//	if(o.courseuuid==null&&course_list.length>0)o.courseuuid=course_list[0].value;
//    return (
//    		<div>
//    		<div className="header">
//    		  <hr />
//    		</div>
//    		<div className="am-g">
//    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
//    		  <form id="editClassForm" method="post" className="am-form">
//    		<input type="hidden" name="uuid"  value={o.uuid}/>
//    		     <input type="hidden" name="type"  value="1"/>
//    		    <div className="am-form-group"> 		    
//    		  <AMUIReact.Selected id="groupuuid" name="groupuuid" onChange={this.handleChange} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={o.groupuuid} />          
//    		  <G_help_popo  msg={G_tip.class_edit}/>  
//    		  <br/>
//		  <AMUIReact.Selected id="courseuuid" name="courseuuid" onChange={this.handleChange} btnWidth="200"  multiple= {false} data={course_list} btnStyle="primary" value={o.courseuuid} />          
//    		
//    		  </div> 		    
//    		      <label htmlFor="name">班级:</label>
//    		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过45位！"/>
//    		      <br/>   		   
//  		      <label htmlFor="name">管理员:</label>
//  	  		    <input type="hidden" name="headTeacher" id="headTeacher" value={o.headTeacher} onChange={this.handleChange}/>
//  			      <input type="text"  id="headTeacher_name" value={o.headTeacher_name} onChange={this.handleChange} onClick={w_ch_user.open.bind(this,"headTeacher","headTeacher_name",o.groupuuid)} placeholder=""/>
//  			      <br/>
//  			      <label htmlFor="name">上课老师:</label>
//  		  		    <input type="hidden" name="teacher" id="teacher" value={o.teacher} onChange={this.handleChange}/>
//  				      <input type="text"  id="teacher_name" value={o.teacher_name} onChange={this.handleChange}  onClick={w_ch_user.open.bind(this,"teacher","teacher_name",o.groupuuid)} placeholder=""/>
//  				      <br/>
//    		      <button type="button"  onClick={ajax_class_save}  className="am-btn am-btn-primary">提交</button>
//    		    </form>
//    	     </div> 
//    	   </div>	    	   
//    	   </div>
//    );
//  }
// }); 
//
///*我的班级中查看学生信息
// * Class_student_look_info@:此方法模板为单独查看每个学生详细信息但不能编辑；
// * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
// * <Common_mg_big_fn  imgsList={o.imgsList} />
// * */
//var Class_student_look_info =React.createClass({
//	 getInitialState: function() {
//		    return this.props.formdata;
//		  },
//	 handleChange: function(event) {
//		    this.setState($('#editClassStudentForm').serializeJson());
//	  },
////	  componentDidMount:function(){
////		  var imgGuid=this.state.headimg;
////		 if(imgGuid){
////			 $("#img_head_image").attr("src",G_imgPath+imgGuid); 
////			 G_img_down404("#img_head_image");
////		 }
////
////	  },
//	  componentDidMount:function(){
//
//		},
//		render: function() {
//	     var o =this.state;
//	     var imgGuid=o.headimg;
//	     var imglist=[imgGuid];
//		 return (
//		 		<div>
//		 		
//		 		 <AMR_ButtonToolbar>
//		 	    <AMR_Button amStyle="primary" onClick={ajax_myclass_students_edit.bind(this,o.uuid)} >修改学生</AMR_Button>
//		 	 <G_help_popo   msg={G_tip.studentbind_app} />
//		 	  </AMR_ButtonToolbar>
//			    <AMUIReact.List static border striped>
//			      <Common_mg_big_fn  imgsList={imglist} />				  
//				  <br/>
//			      <AMUIReact.ListItem icon="mobile">姓名:{o.name}</AMUIReact.ListItem>
//			      <AMUIReact.ListItem>昵称:{o.nickname}</AMUIReact.ListItem>
//			      <AMUIReact.ListItem>性别:{Vo.get("sex_"+o.sex)}</AMUIReact.ListItem>
//			      <AMUIReact.ListItem>出生日期:{o.birthday}</AMUIReact.ListItem>
//			      <AMUIReact.ListItem>妈妈姓名:{o.ma_name}</AMUIReact.ListItem>
//			      <Class_student_Tel_ListItem name={"妈妈电话"} tel={o.ma_tel}/>
//			      <AMUIReact.ListItem>妈妈的工作:{o.ma_work}</AMUIReact.ListItem>
//			      <AMUIReact.ListItem>爸爸姓名:{o.ba_name}</AMUIReact.ListItem>
//			      <AMUIReact.ListItem>爸爸的工作:{o.ba_work}</AMUIReact.ListItem>
//			      <Class_student_Tel_ListItem name={"爸爸电话"} tel={o.ba_tel}/>
//			      <AMUIReact.ListItem>家庭住址:{o.address}</AMUIReact.ListItem>
//			      <Class_student_Tel_ListItem name={"爷爷电话"} tel={o.ye_tel}/>
//			      <Class_student_Tel_ListItem name={"奶奶电话"} tel={o.nai_tel}/>
//			      <Class_student_Tel_ListItem name={"外公电话"} tel={o.waigong_tel}/>
//			      <Class_student_Tel_ListItem name={"外婆电话"} tel={o.waipo_tel}/>
//			      <Class_student_Tel_ListItem name={"其他电话"} tel={o.other_tel}/>
//			      <AMUIReact.ListItem>
//			      <div dangerouslySetInnerHTML={{__html:G_textToHTML("说明:"+o.note)}}></div>
//			      </AMUIReact.ListItem>			      
//			      
//			      </AMUIReact.List>
//		 	     </div> 
//		     );
//	        }
//		 });
//
////一键拨号公用是否显示组件
//var Class_student_Tel_ListItem =React.createClass({
//	 getDefaultProps: function() {
//		    return {
//		      name: "",
//		      tel:""
//		    };
//		  },
//		render: function() {
//	    
//		 return (
//				 <AMUIReact.ListItem>{this.props.name}:{this.props.tel}<a className={this.props.tel?"":"am-hide"} href={"tel:"+this.props.tel}><AMUIReact.Button amStyle="success">电话</AMUIReact.Button></a></AMUIReact.ListItem>
//			      
//			     
//		     );
//	        }
//		 });
//
//
///*
// * <我的班级>添加学生详情界面
// * */
//  var Mycalss_student_edit = React.createClass({ 
//  	 getInitialState: function() {
//  		    return this.props.formdata;
//  		  },
//  	 handleChange: function(event) {
//  		    this.setState($('#editClassStudentForm').serializeJson());
//  	  },
//  	  componentDidMount:function(){
//  		  var imgGuid=this.state.headimg;
//  		  
//  		  
//  		 if(imgGuid){
//  			 $("#img_head_image").attr("src",G_imgPath+imgGuid); 
//  			 G_img_down404("#img_head_image");
//  		 }
//  	  },
//  	/*
//  	 * （标头）<我的班级>图片上传功能
//  	 * */
//  	 btn_class_student_uploadHeadere:function(){
//  		w_uploadImg.open(function(guid){
//  			$("#headimg").val(guid);
//  			 $("#img_head_image").attr("src",G_imgPath+guid); 
//  			 G_img_down404("#img_head_image");
//  		});	
//  	},
//  render: function() {
//  	  var o = this.state;
//  	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
//  	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
//   return (
//		   <form id="editClassStudentForm" method="post" className="am-form">
//		   <G_help_popo  msg={G_tip.Stutent_edit} />
//		   <PxInput type="hidden" name="headimg" id="headimg"  value={o.headimg}  onChange={this.handleChange} />
//			<PxInput type="hidden" name="uuid"  value={o.uuid}/>
//		     <PxInput type="hidden" name="classuuid"  value={o.classuuid}/>
//		   <div className="am-form-group">
//			
//		    <hr />
//  		     <AMUIReact.Image id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>
//  		      <button type="button"  onClick={this.btn_class_student_uploadHeadere}  className="am-btn am-btn-primary">上传头像</button>	      
// 	         <AMUIReact.FormGroup>
// 	        <label>单选：</label>
// 	       <AMUIReact.Input type="radio" name="sex" value="0" label={Vo.get("sex_0")} inline onChange={this.handleChange} checked={o.sex==0?"checked":""}  />
// 	      <AMUIReact.Input type="radio" name="sex" value="1" label={Vo.get("sex_1")} inline onChange={this.handleChange} checked={o.sex==1?"checked":""}  />
// 	     </AMUIReact.FormGroup>     		    
// 	       <label className={one_classDiv}>姓名</label>
//   		     <div className={two_classDiv}>
//		       <PxInput icon="user" type="text" name="name" id="name" maxLength="20" value={o.name} onChange={this.handleChange}/>
//		        </div>
//		       <label className={one_classDiv}>昵称</label>
//	   		  <div className={two_classDiv}>  
//   		     <PxInput icon="user-secret" type="text" maxLength="20" name="nickname" id="nickname" value={o.nickname} onChange={this.handleChange}/>
//   		    </div>
//   		     <label className={one_classDiv}>出生日期</label>
//  		      <div className={two_classDiv}>
//  		       <PxInput icon="birthday-cake" type="text" maxLength="10" placeholder="YYYY-MM-DD" name="birthday" id="birthday" value={o.birthday} onChange={this.handleChange}/>
//		        </div>
//		       <label className={one_classDiv}>身份证</label>
//			  <div className={two_classDiv}>  
//			 <PxInput  type="text" name="idcard" id="idcard" value={o.idcard} onChange={this.handleChange} placeholder=""/>
//		    </div>  		     
//		    <fieldset>
//		    <legend>爸爸妈妈信息</legend> 
//	        <label className={one_classDiv}>妈妈姓名</label>
//	         <div className={two_classDiv}>
//	          <PxInput icon="user" type="text"  name="ma_name" id="ma_name" size="10" maxLength="45" value={o.ma_name} onChange={this.handleChange}/>
//	           </div>
//	          <label className={one_classDiv}>妈妈电话</label>
//		     <div className={two_classDiv}>  
//		    <PxInput  icon="mobile" type="text" name="ma_tel" id="ma_tel" value={o.ma_tel} onChange={this.handleChange}/>
//	       </div>
//	        <label className={one_classDiv}>妈妈工作</label>
//	         <div className={two_classDiv}>
//		      <PxInput type="text" name="ma_work" id="ma_work" value={o.ma_work} onChange={this.handleChange}/>
//	           </div>
//	          <label className={one_classDiv}>爸爸姓名</label>
//		     <div className={two_classDiv}>  
//		    <PxInput icon="user" type="text" name="ba_name" id="ba_name" size="10" maxLength="45"  value={o.ba_name} onChange={this.handleChange}/>
//	       </div>
//	        <label className={one_classDiv}>爸爸电话</label>
//	         <div className={two_classDiv}>
//		      <PxInput icon="mobile" type="text" name="ba_tel" id="ba_tel" value={o.ba_tel} onChange={this.handleChange} placeholder=""/>
//	           </div>
//	          <label className={one_classDiv}>爸爸工作</label>
//		     <div className={two_classDiv}>  
//		    <PxInput type="text" name="ba_work" id="ba_work" value={o.ba_work} onChange={this.handleChange} placeholder=""/>
//	       </div>
//	        <label className={one_classDiv}>家庭住址</label>
//	         <div className={two_classDiv}>
//		      <PxInput icon="home" type="text" name="address" id="address" value={o.address} onChange={this.handleChange} placeholder=""/>
//	           </div>		    
//		      </fieldset>  		    		      
//		      <fieldset>
//		      <legend>其他信息</legend>
//		        <label className={one_classDiv}>奶奶电话</label>
//		         <div className={two_classDiv}>
//			      <PxInput icon="mobile" type="text" name="nai_tel" id="nai_tel" value={o.nai_tel} onChange={this.handleChange} placeholder=""/>
//		           </div>
//		          <label className={one_classDiv}>爷爷电话</label>
//			     <div className={two_classDiv}>  
//			    <PxInput icon="mobile" type="text" name="ye_tel" id="ye_tel" value={o.ye_tel} onChange={this.handleChange} placeholder=""/>
//		       </div>
//		        <label className={one_classDiv}>外婆电话</label>
//		         <div className={two_classDiv}>
//			      <PxInput icon="mobile" type="text" name="waipo_tel" id="waipo_tel" value={o.waipo_tel} onChange={this.handleChange} placeholder=""/>
//		           </div>
//		          <label className={one_classDiv}>外公电话</label>
//			     <div className={two_classDiv}>  
//			    <PxInput icon="mobile" type="text" name="waigong_tel" id="waigong_tel" value={o.waigong_tel} onChange={this.handleChange} placeholder=""/>
//		       </div>
//		        <label className={one_classDiv}>其他电话</label>
//		         <div className={two_classDiv}>
//			      <PxInput icon="phone" type="text" name="other_tel" id="other_tel" value={o.other_tel} onChange={this.handleChange} placeholder=""/>
//		           </div>
//		 		   <AMUIReact.Input type="textarea"
//			 	 	      label="说明"
//			 	 	    	 name="note"
//			 	 	      labelClassName="am-u-sm-2"
//			 	 	      placeholder="备注"
//			 	 	      wrapperClassName="am-u-sm-10"
//			 	 	      amSize="lg" />
//		 		      <br/>
//		 		      </fieldset>
//				      <button type="button"  onClick={btn_ajax_myclass_student_save}  className="am-btn am-btn-primary">提交</button>		      
//   		           </div>  
//   		          </form> 	   		          
//               );
//               }
//  });
////±±±±±±±±±±±±±±±±±±±±±±±±±±±





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
    getInitialState: function() {
		return {groupuuid:this.props.groupuuid};
	  },
	componentWillReceiveProps:function(){
		this.refresh_data();
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

	      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
	      React.createElement(AMR_Panel, null, 
		  React.createElement(AMR_ButtonToolbar, null, 
	      React.createElement("div", {className: "am-fl am-margin-bottom-sm"}, 
		  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.refresh_data.bind(this), btnWidth: "200", data: this.props.group_list, btnStyle: "primary", value: this.state.groupuuid})
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "输入老师姓名"})
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("button", {type: "button", onClick: this.refresh_data.bind(this), className: "am-btn am-btn-secondary"}, "搜索")		  		  
		  )
		  )
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
	    					        React.createElement("td", null, event.tel, " ", React.createElement("a", {href: "tel:"+event.tel}, React.createElement(AMUIReact.Button, {amStyle: "success"}, "电话"))), 
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
		            React.createElement(AMUIReact.Button, {onClick: ajax_parentContactByMyStudent_message_list.bind(this,event.send_useruuid,"我的信箱"), amStyle: "secondary"}, "@回复")
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
			btn_click_group_byRight(m,{type:G_group_type});
	  },
  render: function() {
    return (
    React.createElement("div", null, 
	React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list1}), 
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
			  
			  
          w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
          });

		if(!this.state.uuid){
			this.setProvCity();
		}

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
    	       React.createElement(PxInput, {type: "text", name: "brand_name", id: "brand_name", value: o.brand_name, onChange: this.handleChange, placeholder: "不超过45位"})
    	        ), 
		    	       React.createElement("label", {className: one_classDiv }, "机构全称:"), 
    		  React.createElement("div", {className: two_classDiv }, 
    	     React.createElement(PxInput, {type: "text", name: "company_name", id: "company_name", value: o.company_name, onChange: this.handleChange, placeholder: "不超过45位"})
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
		   React.createElement("label", {className: one_classDiv }, "摘要:"), 
    		 React.createElement("div", {className: two_classDiv }, 
    	      React.createElement(PxInput, {type: "text", name: "summary", id: "summary", value: o.summary, onChange: this.handleChange, placeholder: ""})
    	       ), 		
  	      
    	     React.createElement("label", {className: one_classDiv }, "学校地址:"), 
    		  React.createElement("div", {className: two_classDiv }, 
    	       React.createElement(PxInput, {icon: "university", type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: "不超过64位"})
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
		    this.setState(obj);
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
			 if(!obj.list||obj.list.length==0){
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
	if(!this.state.list)this.state.list=[];
		var help=(React.createElement("div", null))
	if(!this.state.list)this.state.list=[];
	if(announce_types==0){
	 help=(React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list6})); 
	  }else if(announce_types==1){
	  help=(React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list7})); 
	  }else if(announce_types==3){
	  help=(React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list9})); 
	  }
  return (
  React.createElement("div", null, 
	  help, 
	     React.createElement(AMR_Panel, null, 
		 React.createElement(AMR_ButtonToolbar, null, 
	      React.createElement("div", {className: "am-fl  am-margin-left-xs"}, 
          React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", data: this.props.group_list, btnStyle: "primary", value: obj.groupuuid})
          ), 
		  React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this,"add")}, "创建")
		 )
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
    ), 
     React.createElement(AMR_ButtonToolbar, null, 
	  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上一页"), 	  
       React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", obj.pageNo, "页"), 
	  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下一页")	
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
	         React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "secondary", onClick: btn_click_announce_byRight.bind(this, "edit",event.groupuuid,event.uuid)}, "编辑"), 
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
		    var tmp=$('#editAnnouncementsForm').serializeJson();
		    this.setState(tmp);
			w_img_upload_nocut.groupuuid=tmp.groupuuid;
			
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
			  	w_img_upload_nocut.groupuuid=this.state.groupuuid;
	
	  },
		   preview_fn:function(){
          G_html_preview("t_iframe", this.state.url,this.editor.getSource(),this.state.title);
       }, 
render: function() {
	 var o = this.state;
	  var url=(React.createElement("div", null));
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
		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxlength: "128", placeholder: "不超过128位"}), 
		  React.createElement("br", null), 
		  url, 

		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "详细内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
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
	//创建信息管理点击按钮事件跳转kd_servise方法;
 	handleClick: function(m,groupuuid,uuid) {
 		btn_click_announce_byRight(m,groupuuid,uuid);
    }, 
	//收藏按钮方法;
	favorites_push: function(title,type,reluuid,url) {
		commons_ajax_favorites_push(title,type,reluuid,url);
	},
render: function() {
	  var o = this.props.data;

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
       React.createElement("div", {className: "am-margin-left-sm"}, 	 

          iframe, 

	     React.createElement(AMR_ButtonToolbar, null, 
	         React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "secondary", onClick: this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)}, "编辑"), 
	         React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid)}, "收藏"), 
			 React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.groupuuid,o.uuid)}, "删除"), 
	     React.createElement(G_check_disable_div_byRight, {type: o.type, uuid: o.uuid, pxadmin: 2})
	     )
	     
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


//±±±±±±±±±±±±±±±±±±±±±±±±±±±







//——————————————————————————园长信箱<绘制>——————————————————————————        
/*
 * <园长信箱>一层界面绘制;
 * @send_user:家长名字；
 * @revice_useruuid:收件人ID；
 * @send_useruuid:发送者ID；
 * @ajax_boss_message_list绑定事件然后开始绘制舞台；
 * */
var Boss_student_tel_byRight =React.createClass({displayName: "Boss_student_tel_byRight",
	render: function() {
     var o =this.state;	
	 return (
	 	React.createElement("div", null, 
		 React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list12}), 
	 	    React.createElement("ul", {className: "am-list am-list-static am-list-border"}, 
	    	     this.props.formdata.map(function(event) {
	              return (
	              React.createElement("li", {className: "am-comment"}, 	
	      	       React.createElement("a", {href: "javascript:void(0);"}, 
	   	          React.createElement("img", {src: G_getHeadImg(event.send_userimg), alt: "", className: "am-comment-avatar", width: "48", height: "48"})
	      	     ), 
	      	   React.createElement("span", {className: "am-comment-author"}, event.send_user, " "), "家长来信", event.count, "条,最后来信时间:", event.last_time, 
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
		 		 React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list12}), 
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
load_more_btn_id:"load_more_",
pageNo:1,
classnewsreply_list_div:"classnewsreply_list_div",
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
this.load_more_btn_id="load_more_"+this.props.uuid;
return (
	  React.createElement("div", null, 
	   React.createElement("div", {id: this.classnewsreply_list_div}
	   
	   ), 
		React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多"), 
		React.createElement(Boss_message_save_byRight, {parent_React: this, send_useruuid: this.props.send_useruuid, revice_useruuid: this.props.revice_useruuid})
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
	$('#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);
},
reply_boss_save_btn_click:function(){
	ajax_boss_message_save_byRight(this.props.parent_React);
},
render: function() {
return (
	   React.createElement("form", {id: "editForm", method: "post", className: "am-form"}, 
	   React.createElement("input", {type: "hidden", name: "revice_useruuid", value: this.props.send_useruuid}), 
		React.createElement("input", {type: "hidden", name: "send_useruuid", value: this.props.revice_useruuid}), 			
		React.createElement(AMR_Input, {id: "classnews_content_replay", type: "textarea", rows: "10", label: "信息发送", placeholder: "填写内容", name: "message"}), 
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
 * <班级管理>建立舞台;
 * @add_class:添加班级；
 * @edit_class:编辑；
 * @graduate_class:毕业；
 * @flower_name:下载花名册；
 * @handleClick:事件处理在kd_service;
 * @uuids:点击框后班级的ID；编辑按钮需要；
 * */
var Announcements_Class_div = React.createClass({displayName: "Announcements_Class_div", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
    getInitialState: function() {
		var obj= {groupuuid:this.props.groupuuid};
			if(!obj.groupuuid)obj.groupuuid=G_mygroup_choose;
				if(!obj.courseuuid)obj.courseuuid=G_course_choose;
		return obj;
	  },
	componentWillReceiveProps:function(){
		this.refresh_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo   list_div,groupuuid,name,pageNo
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){
		
		var queryForm=$('#queryForm').serializeJson();
		this.setState(queryForm);
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
  var re_data=ajax_class_listByGroup_byRight(this.classnewsreply_list_div+this.pageNo,queryForm,this.pageNo,callback);		  
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		if(G_mygroup_choose!=$("input[name='groupuuid']").val()){
				$("input[name='courseuuid']").val("");
			}
		G_mygroup_choose=$("input[name='groupuuid']").val();
		G_course_choose=$("input[name='courseuuid']").val();
		this.load_more_data();
		
	},
	 handleClick: function(m,groupuuid,uuid) {		 
  		btn_click_class_list_byRight(m,groupuuid,uuid);
	 },
render: function() {
		var o=this.state;
    course_list= G_selected_dataModelArray_byArray(Store.getCourseList(o.groupuuid),"uuid","title");
	course_list.unshift({value:"",label:"所有"});

	  var pxclass_isdisable_list=G_selected_dataModelArray_byArray(Vo.getTypeList("class_isdisable"),"key","val");
	pxclass_isdisable_list.unshift({value:"",label:"所有"});
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (	
	 
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
			  React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list13}), 
		    React.createElement(AMUIReact.Form, {id: "queryForm", inline: true}, 
	      React.createElement(AMR_Panel, null, 
		  React.createElement(AMR_ButtonToolbar, {className: "am-cf am-margin-left-xs"}, 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMUIReact.Selected, {name: "groupuuid", onChange: this.refresh_data.bind(this), placeholder: "学校", data: this.props.group_list, btnStyle: "primary", value: this.state.groupuuid})
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMUIReact.Selected, {name: "courseuuid", onChange: this.refresh_data.bind(this), placeholder: "课程", btnWidth: "200", multiple: false, data: course_list, btnStyle: "primary", value: o.courseuuid})
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMUIReact.Selected, {i: true, name: "isdisable", onChange: this.refresh_data.bind(this), placeholder: "状态", btnWidth: "200", multiple: false, data: pxclass_isdisable_list, btnStyle: "primary", value: o.isdisable})
		  ), 
	  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,"add_class",this.state.groupuuid)}, "创建班级")
		  )	
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
* <班级管理>班级列表内容绘制;
* */
var Class_EventsTable_byRight = React.createClass({displayName: "Class_EventsTable_byRight", 
	  render: function() {
	    var event = this.props.events;
		var data_List=this.props.data_List;
		var calss_number=(React.createElement("div", null));
	    var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';
		if(data_List.pageNo==1){
		  calss_number=(React.createElement("div", null, "班级总数:"+data_List.totalCount));
		}
	    return (
	    		  React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
		          calss_number, 
	    	    React.createElement("tr", null, 
	              React.createElement("th", null, "班级"), 
				  React.createElement("th", null, "(学生数)"), 
	              React.createElement("th", null, "管理员"), 
	              React.createElement("th", null, "上课老师"), 
	              React.createElement("th", null, "学校"), 
	              React.createElement("th", null, "关联课程"), 
				  React.createElement("th", null, "课程学时"), 
	              React.createElement("th", null, "教学计划(次数)"), 
	              React.createElement("th", null, "状态"), 
	              React.createElement("th", null, "结业时间"), 
	              React.createElement("th", null, "创建时间")
	            ), 			 
	    			  this.props.events.map(function(event) {
	    				    if(event.isdisable==1){
                                disable=React.createElement("td", null, React.createElement(AMR_Button, {amStyle: "success", disabled: "false"}, "已结业"))
	    				    }else{
	    				    	disable=React.createElement("td", null, React.createElement(AMR_Button, {onClick: ajax_class_disable_byRight.bind(this,event.groupuuid,event.uuid), amStyle: "success"}, "结业"))
	    				    };
	    			      return (
	    			    	      React.createElement("tr", {className: className}, 
	    			    	        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: react_ajax_class_students_manage_byRight.bind(this, event.uuid)}, event.name)), 
	    			    	        React.createElement("td", null, event.student_count), 
	    			    	        React.createElement("td", null, event.headTeacher_name), 
	    			    	        React.createElement("td", null, event.teacher_name), 
	    			    	        React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 	
	    			    	        React.createElement("td", null, event.course_title), 
									React.createElement("td", null, event.schedule), 
	    			    	        React.createElement("td", null, React.createElement(AMUIReact.Button, {onClick: px_ajax_teachingplan_byRight.bind(this,event.groupuuid,event.uuid,event.courseuuid), amStyle: "success"}, "管理", "("+event.teachingplan_count+")")), 
	    			                disable, 
	    			                React.createElement("td", null, event.disable_time), 
	    			                React.createElement("td", null, event.create_time)
	    			    	      ) 
	    			    		  )
	    			         })	
	    			  )		  
	    	  );
}
}); 


//*********************班级管理模块-班级详情代码*********************
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
	getDefaultProps: function() {
	 var data = [
	            {value: 'edit_class', label: '编辑班级'},
	            {value: 'delete', label: '删除空班级'}
	          ];
	    return {
	      down_list: data
	    };
	  },
  	 componentDidMount:function(){
  			 G_img_down404();
  	  },
  	handleClick: function(m,groupuuid,uuid) {		 
  		btn_click_class_list_byRight(m,groupuuid,uuid);
	 },
     handleClick_download: function(groupuuid,uuid,val) {
		 //更多操作
         btn_click_class_list_byRight(val,groupuuid,uuid);
      },
	 handleChange_selectgroup: function(val) {
		 var class_uuid;
		 if(Store.getChooseClass(val).length>0){
			 class_uuid=Store.getChooseClass(val)[0].uuid; 
		 }else{
			 class_uuid="";
		 }		 
		 btn_click_class_list_byRight("xiala",null,class_uuid);
	 },
	 handleChange_selectclass: function(val) {
			 btn_click_class_list_byRight("xiala",null,val);
	 },	 
  	render: function() {
  		var o=this.props.formdata;
  		if(!this.props.students)this.props.students=[];
  	  return (
  	  React.createElement("div", null, 
	     React.createElement(AMR_Panel, null, 
			  React.createElement(AMR_Grid, {className: "doc-g"}, 
  	  React.createElement(AMR_ButtonToolbar, null, 
  	   React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
  		React.createElement(AMUIReact.Selected, {amSize: "xs", id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup.bind(this), btnWidth: "200", data: this.props.groupList, btnStyle: "primary", value: o.groupuuid})
  		), 
  	   React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
  	  React.createElement(AMUIReact.Selected, {amSize: "xs", id: "selectclass_uuid2", name: "class_uuid", onChange: this.handleChange_selectclass.bind(this), btnWidth: "200", data: this.props.classList, btnStyle: "primary", value: o.uuid})
     ), 
  	    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
     	React.createElement(AMUIReact.Selected, {btnStyle: "secondary", placeholder: "更多操作", onChange: this.handleClick_download.bind(this,o.groupuuid,o.uuid), btnWidth: "200", multiple: false, data: this.props.down_list})
     	), 
  
	  React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
  	   React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,"students",o.groupuuid,o.uuid)}, "管理学生")
  	    ), 
  	   React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
       React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: menu_teachingplan_dayShow_fn.bind(this,o.uuid)}, "查看课程")
     )		    
	  )
		  )
		     ), 
  		     React.createElement(AMR_Panel, null, 
  			  React.createElement(AMR_Grid, {className: "doc-g"}, 
	  			    React.createElement(AMR_Col, {className: "am-hide-sm", sm: 6, md: 3}, " 学校:", Store.getGroupNameByUuid(o.groupuuid)), 
				    React.createElement(AMR_Col, {className: "am-hide-sm", sm: 6, md: 3}, " 班级:", o.name), 
				    React.createElement(AMR_Col, {sm: 5, md: 2}, "管理员:", o.headTeacher_name), 
				    React.createElement(AMR_Col, {sm: 4, md: 2}, "上课老师:", o.teacher_name), 
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
  	    return (
  	      React.createElement("tr", {className: className}, 
			React.createElement("td", null, " ", React.createElement(AMUIReact.Image, {id: "img_head_image", width: "28", height: "28", src: header_img})), 
			React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: ajax_class_students_edit_byRight.bind(this,null,event.uuid)}, event.name)), 			
  	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
  	        React.createElement("td", null, event.birthday), 
  	        React.createElement("td", null, event.idcard), 
		    React.createElement("td", null, React.createElement("a", {className: event.ma_tel?"":"am-hide", href: "tel:"+event.ma_tel}, event.ma_tel)), 
            React.createElement("td", null, React.createElement("a", {className: event.ba_tel?"":"am-hide", href: "tel:"+event.ba_tel}, event.ba_tel))
			) 
  	    );
  	  }
  	}); 
//**************************************************************************************







//*********************班级管理模块-班级详情-列表-学生名代码*********************
/*
 * <班级管理>详情界面
 * 添加学生与编辑绘制
 * */
  var Class_student_edit_byRight = React.createClass({displayName: "Class_student_edit_byRight", 
	  	
	  btn_ajax_classStudent_admin_byRight: function(groupuuid,studentuuid) {
		  var callbackFN=function(classuuid){
			  ajax_student_changeClass(classuuid,studentuuid);
		  }
		w_ch_class.open(callbackFN,groupuuid);
	  	  },
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
  	 * （标头）<班级管理>图片上传功能
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
  	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
  	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
   return (
		   
		   React.createElement("div", null, 
		   
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
                React.createElement("label", {className: one_classDiv}, "单选:"), 
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
		      React.createElement("fieldset", null, 
		      React.createElement("legend", null, "其他信息"), 
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
			 	 	      amSize: "lg"}), 
		 		      React.createElement("br", null)
		 		      ), 
				      React.createElement("button", {type: "button", onClick: btn_ajax_class_student_save_byRight, className: "am-btn am-btn-primary"}, "提交")		      
   		           )
   		          )
   		       )
   );
  }
  });


//**************************************************************************************


//************************班级管理-班级详情-编辑班级按钮详情代码*********************  
/* 
* 班级管理-班级详情-编辑班级绘制 
* @ajax_class_save_byRight：提交按钮在Kd_service;
* */	
    var Class_edit_byRight = React.createClass({displayName: "Class_edit_byRight", 
    	 getInitialState: function() {
    		    var obj= this.props.formdata;
				if(!obj.groupuuid)obj.groupuuid=G_mygroup_choose;
				if(!obj.courseuuid)obj.courseuuid=G_course_choose;
				 return obj;
    		  },
    	 handleChange: function(event) {
    		 	G_mygroup_choose=$("input[name='groupuuid']").val();
				G_course_choose=$("input[name='courseuuid']").val();
    		 if(event==G_group_wjd){
    			 $('#help1_span').show();
    		 }else{
    			 $('#help1_span').hide();
    		 }
    		    this.setState($('#editClassForm').serializeJson());
    	  },
    render: function() {
    	  var o = this.state;
  	  var course_list=Store.getCourseList(o.groupuuid);
  	 course_list= G_selected_dataModelArray_byArray(Store.getCourseList(o.groupuuid),"uuid","title");
  	if(o.courseuuid==null&&course_list.length>0)o.courseuuid=course_list[0].value;
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
		  React.createElement(AMR_ButtonToolbar, null, 
      		 React.createElement("div", {className: "am-fl"}, 	    
      		  React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid})
				), 
				React.createElement("div", {className: "am-fl  am-margin-left-xs"}, 
  		      React.createElement(AMUIReact.Selected, {id: "courseuuid", name: "courseuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: course_list, btnStyle: "primary", value: o.courseuuid})
       		  )
		  ), 
		  React.createElement("hr", null), 
      		      React.createElement("label", {htmlFor: "name"}, "班级:"), 
      		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过45位！"}), 
      		      React.createElement("br", null), 		   
    		      React.createElement("label", {htmlFor: "name"}, "管理员:"), 
    	  		    React.createElement("input", {type: "hidden", name: "headTeacher", id: "headTeacher", value: o.headTeacher, onChange: this.handleChange}), 
    			      React.createElement("input", {type: "text", id: "headTeacher_name", value: o.headTeacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"headTeacher","headTeacher_name",o.groupuuid), placeholder: ""}), 
    			      React.createElement("br", null), 
    			      React.createElement("label", {htmlFor: "name"}, "上课老师:"), 
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
//**************************************************************************************

//************************班级管理-班级详情-管理学生详情代码*********************  
/*
 * 班级管理-班级详情-管理学生
 * */
	var My_adminStudent_byRight = React.createClass({displayName: "My_adminStudent_byRight",  
	  isSousuoFlag:false,
	  isAddStudentFlag:false,
	  addStudent_btn:function(){
		   $("#editClassStudentForm").show();
		  this.isAddStudentFlag=true;
		  this.setState(this.state);
	  },
	  Sousuo_btn:function(){
		   $("#editClassStudentForm").hide();
		  this.isAddStudentFlag=false;
		  this.ajax_queryByNameOrTel();
	  },
	  ajax_queryByNameOrTel:function(){		 
		 
		  var classuuid=this.props.formdata.classuuid;
		//查询学生根据IDpxstudent_queryByNameOrTel_div绘制
			$.AMUI.progress.start();
		    var url = hostUrl + "rest/pxstudent/queryByNameOrTel.json";
			$.ajax({
				type : "GET",
				url : url,
				data:{name:$('#sutdent_name').val()},
				dataType : "json",
				 async: true,
				success : function(data) {
					$.AMUI.progress.done();
					if (data.ResMsg.status == "success") {						
						React.render(React.createElement(Px_adminStudent_list_byRight,{	
							classuuid:classuuid,
							events:data.list.data
							}), document.getElementById('pxstudent_queryByNameOrTel_div'));

					} else {
						alert("加载数据失败："+data.ResMsg.message);
					}
				},
				error :G_ajax_error_fn
			});		
	  },
	  ajax_deleteStudentClass:function(class_uuid,student_uuid){
			if(!confirm("确定要删除吗?")){
				return;
			}
				$.AMUI.progress.start();
			    var url = hostUrl + "rest/pxstudent/deleteStudentClass.json";
				$.ajax({
					type : "POST",
					url : url,
					data:{class_uuid:class_uuid,student_uuid:student_uuid},
					dataType : "json",
					 async: true,
					success : function(data) {
						$.AMUI.progress.done();
						if (data.ResMsg.status == "success") {						
							G_msg_pop(data.ResMsg.message);
							add_studentsByData_byRight({classuuid:class_uuid});
						} else {
							alert("加载数据失败："+data.ResMsg.message);
						}
					},
					error :G_ajax_error_fn
				});		
		  },
	render: function() {
		var thit=this;
		 var addStudent=(React.createElement("div", null));
		 var addText=(React.createElement("div", null));
		 if(this.props.events.length!=0){
			 addText=(   
			 React.createElement("legend", null, Store.getClassByUuid(this.props.formdata.classuuid).name) 
			 )
		 }else{
			 addText=(   
			 React.createElement("legend", null, Store.getClassByUuid(this.props.formdata.classuuid).name+"(该班级暂无学生请添加新生)")  
		     )
		 }
		 if(this.isAddStudentFlag){
			 addStudent=(
					 React.createElement(Mycalss_student_edit_byRight, {formdata: this.props.formdata})
				  );
		        }
		
	return (
	React.createElement("div", null, 
		  React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list17}), 
	      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
		  React.createElement(AMR_Panel, null, 
	      React.createElement(AMR_ButtonToolbar, null, 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "输入搜索姓名或号码"})
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("button", {type: "button", onClick: this.Sousuo_btn.bind(this), className: "am-btn am-btn-secondary"}, "搜索")		  		  
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("button", {type: "button", onClick: this.addStudent_btn.bind(this), className: "am-btn am-btn-secondary"}, "创建")		  		  
		  )
		  )
		  ), 
		  addText, 	
	      addStudent
		  ), 
		  
		  
		  React.createElement("div", {id: "pxstudent_queryByNameOrTel_div"}), 
			this.props.events.map(function(event) {
				  return(
				  	 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 				  	
				  	  React.createElement(AMR_Button, {amSize: "xs", className: "am-hide-sm", amStyle: "danger", onClick: thit.ajax_deleteStudentClass.bind(this,thit.props.formdata.classuuid,event.uuid)}, event.name)
				  	)  			  	  
				  )})

	  )
	);
	}
	});
 
 /*
   *班级管理-班级详情-管理学生-搜索按钮代码块
   * */
  var Px_adminStudent_list_byRight = React.createClass({displayName: "Px_adminStudent_list_byRight",
	
  render: function() {
	    var classuuid=this.props.classuuid;
      return ( 		  
      React.createElement("div", null, 
  	   React.createElement("div", {className: "am-form-group"}, 
  	    React.createElement("hr", null)	 
  	     ), 

        React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "姓名"), 
              React.createElement("th", null, "性别"), 
              React.createElement("th", null, "出生日期"), 
              React.createElement("th", null, "妈妈电话"), 
              React.createElement("th", null, "爸爸电话"), 
              React.createElement("th", null, "身份证")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.events.map(function(event) {
              return (React.createElement(Px_adminStudent_EventRow_byRight, {classuuid: classuuid, key: event.id, event: event}));
            })
          )
        )
        )
      );
    }
  });
      
  /*  	
   * 班级管理-班级详情-管理学生-搜索按钮列点击后出现的列表绘制详细内容代码块;
   * */
  var Px_adminStudent_EventRow_byRight = React.createClass({displayName: "Px_adminStudent_EventRow_byRight", 
  	btn_students_list_click:function(classuuid,uuid){
  		add_StudentClass_byRight(classuuid,uuid);
  	},
  	  render: function() {
		
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';
  	    return (
  	      React.createElement("tr", {className: className}, 
  	        React.createElement("td", null, event.name, " ", React.createElement(AMUIReact.Button, {onClick: this.btn_students_list_click.bind(this,this.props.classuuid,event.uuid), amStyle: "secondary"}, "添加")), 
  	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
  	        React.createElement("td", null, event.birthday), 
  	        React.createElement("td", null, event.ma_tel), 
  	        React.createElement("td", null, event.ba_tel), 
  	        React.createElement("td", null, event.idcard)
  	      ) 
  	    );
  	  }
  	}); 	
		
 /*
  * 班级管理-班级详情-管理学生-创建按钮绘制详细内容代码块;
  * */
   var Mycalss_student_edit_byRight = React.createClass({displayName: "Mycalss_student_edit_byRight", 
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
   	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
   	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
    return (
 		   React.createElement("form", {id: "editClassStudentForm", method: "post", className: "am-form"}, 
 		   React.createElement(G_help_popo, {msg: G_tip.Stutent_edit}), 
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

 		 	
 				      React.createElement("button", {type: "button", onClick: btn_ajax_myclass_student_save_byRight, className: "am-btn am-btn-primary"}, "提交")		      
    		           )
    		          ) 	   		          
                );
                }
   });
		  
//**************************************************************************************		 	 
  
  
//——————————————————————————收支记录<绘制>——————————————————————————
  /*
  * <收支记录>
  * @请求数据成功后执行Accounts_EventsTable方法绘制
  * 在kd_react
  **/
    var Accounts_EventsTable_byRight = React.createClass({displayName: "Accounts_EventsTable_byRight",
    	handleClick: function(m) {
    		if(m=="add"){
    			btn_click_accounts_byRight(m,{groupuuid:this.props.group_uuid});
    			 return;
    		 }
    	  },
    	  handleChange_selectgroup_uuid: function(val){
    		  ajax_accounts_listByGroup_byRight(val);
        },
    render: function() {
      return (
      React.createElement("div", null, 
      React.createElement("div", {className: "header"}, 
    	  React.createElement("hr", null)
    	), 
      React.createElement(AMR_ButtonToolbar, null, 
    	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add")}, "添加")
    	  ), 
    	  React.createElement("hr", null), 
    	  React.createElement("div", {className: "am-form-group"}, 
    	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid})	  
    	  ), 
        React.createElement(AMR_Table, React.__spread({},  this.props), 
          React.createElement("thead", null, 
              React.createElement("tr", null, 
              React.createElement("th", null, "类型"), 
              React.createElement("th", null, "内容"), 
              React.createElement("th", null, "金额"), 
              React.createElement("th", null, "收费时间"), 
              React.createElement("th", null, "学生"), 
              React.createElement("th", null, "班级"), 
              React.createElement("th", null, "学校"), 
              React.createElement("th", null, "备注"), 
              React.createElement("th", null, "创建人"), 
              React.createElement("th", null, "创建时间")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.events.map(function(event) {
              return (React.createElement(Accounts_EventRow_byRight, {key: event.id, event: event}));
            })
          )
        )
        )
      );
    }
    });
  /*
   * <收支记录>列表详细内容绘制;
   * */    
  var Accounts_EventRow_byRight = React.createClass({displayName: "Accounts_EventRow_byRight", 
  	render: function() {
  	  var event = this.props.event;
  	  var className = event.highlight ? 'am-active' :
  	    event.disabled ? 'am-disabled' : '';

  	  return (
  	    React.createElement("tr", {className: className}, 
  	    React.createElement("td", null, " ", Vo.get("KD_Accounts_type_"+event.type)), 
  	    React.createElement("td", null, event.title), 
  	    React.createElement("td", null, " ", event.num), 
  	      React.createElement("td", null, G_getDateYMD(event.accounts_time)), 	     
  	      React.createElement("td", null, " ", event.studentname), 
  	      React.createElement("td", null, " ", Store.getClassByUuid(event.classuuid).name), 
  	      React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 
  	      React.createElement("td", null, " ", event.description), 
  	      React.createElement("td", null, event.create_user), 
  	      React.createElement("td", null, event.create_time)
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
  	  handleChange_type: function(v) {
  		 	var formdata=$('#editAccountsForm').serializeJson();
  		 	formdata.type=v;
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
  		  formdata.tmp_classList=G_selected_dataModelArray_byArray(Store.getChooseClass(formdata.groupuuid),"uuid","name");
  		  if(formdata.classuuid){
  			  formdata.tmp_studentList=	G_selected_dataModelArray_byArray(Store.getClassStudentsList(formdata.classuuid),"uuid","name")
  		  }else{
  			  formdata.tmp_studentList=[];
  		  }
  		  return formdata;
  	  },	  
  render: function() {
  	  var o = this.state;	  
  		if(!o.type){			
  			o.type="0";
  		};
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
		    React.createElement("label", {className: one_classDiv}, "收支日期:"), 
		   React.createElement("div", {className: two_classDiv}, 
	 	    React.createElement(PxInput, {icon: "birthday-cake", type: "text", maxLength: "10", placeholder: "YYYY-MM-DD", name: "accounts_timeStr", id: "accounts_timeStr", value: o.accounts_time, onChange: this.handleChange})		   		
	 		 ), 	
		    React.createElement("label", {className: one_classDiv}, "内容:"), 
		   React.createElement("div", {className: two_classDiv}, 
   	      React.createElement(PxInput, {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, placeholder: "不超过64位"})
 		 ), 	
		  React.createElement("label", {className: one_classDiv}, "金额:"), 
	       React.createElement("div", {className: two_classDiv}, 
	   	    React.createElement(PxInput, {type: "number", name: "num", id: "num", value: o.num, onChange: this.handleChange, placeholder: ""})
	 		 ), 	
			React.createElement("label", {className: one_classDiv}, "备注:"), 
		   React.createElement("div", {className: two_classDiv}, 
	  	  React.createElement(PxInput, {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange, placeholder: "不超过100位"})
		 ), 
		 React.createElement("div", {className: "am-fl  am-margin-left-xs"}, 
 	      React.createElement("button", {type: "button", onClick: ajax_accounts_saveAndAdd_byRight, className: "am-btn am-btn-primary"}, "保存继续")
 	       ), 
 	      React.createElement("div", {className: "am-fl  am-margin-left-xs"}, 
 	     React.createElement("button", {type: "button", onClick: ajax_accounts_save_byRight, className: "am-btn am-btn-primary"}, "保存返回")	
   	      )
   	       )
   		    )
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
			var classList=Store.getChooseClass(this.props.group_uuid);
			var class_uuid =null;
			if(classList&&classList.length>0){
				classuuid=classList[0].uuid;
			}
			var o={
					group_uuid:this.props.group_uuid,
					class_uuid:class_uuid,
					maxPageNo:0,
					class_list:G_selected_dataModelArray_byArray(classList,"uuid","name")
			}
			return o;
		  },
	   componentWillReceiveProps: function(nextProps) {
		   var classList=Store.getChooseClass(nextProps.group_uuid);
			var class_uuid =nextProps.class_uuid;
			if(!class_uuid&&classList&&classList.length>0){
				classuuid=classList[0].uuid;
			}
			var o={
					group_uuid:nextProps.group_uuid,
					class_uuid:class_uuid,
					class_list:G_selected_dataModelArray_byArray(classList,"uuid","name")
			}
		   this.setState(o);
		},
		
  	handleChange_stutent_Selected: function() {
  		var group_uuid=$("input[name='group_uuid']").val();
  		  if(group_uuid=="0"){
  			  group_uuid="";
  		  }
	  		var class_uuid=$("input[name='class_uuid']").val();
		  if(class_uuid=="1"){
			  class_uuid="";
		  }
  		  ajax_student_query_byRight(group_uuid,class_uuid,$('#sutdent_name').val());
  	  }, 
  	 
  		btn_query_click:function(){
  			this.handleChange_stutent_Selected();
  		},
  		handleClick: function(m,groupuuid,classuuid) {
  	  		var group_uuid=$("input[name='group_uuid']").val();
    		  if(group_uuid=="0"){
    			  group_uuid="";
    		  }
  	  		var class_uuid=$("input[name='class_uuid']").val();
  		  if(class_uuid=="1"){
  			  class_uuid="";
  		  }
  			if(m=="pre"){
  				ajax_student_query_byRight(group_uuid,class_uuid,$('#sutdent_name').val(),--g_student_query_point);
  				return;
  			 }else if(m=="next"){
  				ajax_student_query_byRight(group_uuid,class_uuid,$('#sutdent_name').val(),++g_student_query_point);
  				 return;
  			 }
  		},
  		maxPageNo:0,
  render: function() {
  	this.props.group_list.unshift({value:"",label:"所有"});
  	this.state.class_list.unshift({value:"",label:"所有"});
  	if(this.state.group_uuid==""){			
  		this.state.group_uuid="0";
  	};
  	if(this.state.class_uuid==""){			
  		this.state.class_uuid="1";
  	};
  	var pre_disabled=g_student_query_point<2;
  	
  	if(g_student_query_point==1){
  		this.maxPageNo=Math.floor(this.props.data.list.totalCount/this.props.data.list.pageSize)+1;
  	}
  	var next_disabled=g_student_query_point>=this.maxPageNo;
      return (
  		  
      React.createElement("div", null, 
       React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list14}), 
  	   React.createElement("div", {className: "am-form-group"}, 
  	    React.createElement("hr", null)	 
  	     ), 
  	      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
          React.createElement(AMR_Panel, null, 
         React.createElement(AMR_ButtonToolbar, null, 
        React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
       React.createElement(AMR_Button, {amStyle: "secondary", disabled: pre_disabled, onClick: this.handleClick.bind(this,"pre",this.state.group_uuid,this.state.class_uuid)}, "« 上一页"), 
      React.createElement("label", null, g_student_query_point, "\\", this.maxPageNo), 
     React.createElement(AMR_Button, {amStyle: "secondary", disabled: next_disabled, onClick: this.handleClick.bind(this,"next",this.state.group_uuid,this.state.class_uuid)}, "下一页 »")
    ), 
   	 React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
  	  React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid1", name: "group_uuid", onChange: this.handleChange_stutent_Selected, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.state.group_uuid})
  	   ), 	 
  	    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
  	   React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid2", name: "class_uuid", onChange: this.handleChange_stutent_Selected, btnWidth: "200", multiple: false, data: this.state.class_list, btnStyle: "primary", value: this.state.class_uuid})
  	  ), 
  	   React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
  	    React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "学生姓名"})	  
  	     ), 
  	    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
  	   React.createElement("button", {type: "button", onClick: this.btn_query_click, className: "am-btn am-btn-secondary"}, "搜索")
  	  )	  	
  	)
     )
  	 ), 
        React.createElement(AMR_Table, React.__spread({},  this.props), 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "姓名"), 
              React.createElement("th", null, "昵称"), 
              React.createElement("th", null, "性别"), 
              React.createElement("th", null, "出生日期"), 
              React.createElement("th", null, "班级"), 
              React.createElement("th", null, "身份证")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.events.map(function(event) {
              return (React.createElement(Query_EventRow_byRight, {key: event.id, event: event}));
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
  		ajax_class_students_look_info_byRight(uuid,nmae)
  	},
  	  render: function() {
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';

  	    return (
  	      React.createElement("tr", {className: className}, 
  	        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: this.btn_students_list_click.bind(this,event.uuid,event.name)}, event.name)), 
  	        React.createElement("td", null, event.nickname), 
  	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
  	        React.createElement("td", null, event.birthday), 
  	        React.createElement("td", null, " ", Store.getClassByUuid(event.classuuid).name), 
  	        React.createElement("td", null, event.idcard)
  	      ) 
  	    );
  	  }
  	}); 




  /*学生列表中查看学生信息
   * Class_student_look_info@:此方法模板为单独查看每个学生详细信息但不能编辑；
   * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
   * 
   * */
  var Class_student_look_info_byRight =React.createClass({displayName: "Class_student_look_info_byRight",
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
  		render: function() {
  	     var o =this.state;
  		 return (
  		 		React.createElement("div", null, 
  			    React.createElement(AMUIReact.List, {static: true, border: true, striped: true}, 
  			      React.createElement(AMUIReact.ListItem, null, "头像:"), 
  				  React.createElement(AMUIReact.Image, {id: "img_head_image", src: G_def_headImgPath, className: "G_img_header"}), 
  				  React.createElement("br", null), 
  			      React.createElement(AMUIReact.ListItem, {icon: "mobile"}, "姓名:", o.name), 
  			      React.createElement(AMUIReact.ListItem, null, "昵称:", o.nickname), 
  			      React.createElement(AMUIReact.ListItem, null, "性别:", Vo.get("sex_"+o.sex)), 
  			      React.createElement(AMUIReact.ListItem, null, "出生日期:", o.birthday), 
  			      React.createElement(AMUIReact.ListItem, null, "妈妈姓名:", o.ma_name), 
  			      React.createElement(AMUIReact.ListItem, null, "妈妈电话:", o.ma_tel), 
  			      React.createElement(AMUIReact.ListItem, null, "妈妈的工作:", o.ma_work), 
  			      React.createElement(AMUIReact.ListItem, null, "爸爸姓名:", o.ba_name), 
  			      React.createElement(AMUIReact.ListItem, null, "爸爸的工作:", o.ba_work), 
  			      React.createElement(AMUIReact.ListItem, null, "爸爸电话:", o.ba_tel), 
  			      React.createElement(AMUIReact.ListItem, null, "家庭住址:", o.address), 
  			      React.createElement(AMUIReact.ListItem, null, "爷爷电话:", o.ye_tel), 
  			      React.createElement(AMUIReact.ListItem, null, "奶奶电话:", o.nai_tel), 
  			      React.createElement(AMUIReact.ListItem, null, "外公电话:", o.waigong_tel), 
  			      React.createElement(AMUIReact.ListItem, null, "外婆电话:", o.waipo_tel), 
  			      React.createElement(AMUIReact.ListItem, null, "其他电话:", o.other_tel), 			      
  			      React.createElement(AMUIReact.ListItem, null, 
  			      React.createElement("div", {dangerouslySetInnerHTML: {__html:G_textToHTML("说明:"+o.note)}})
  			      )			      
  			      
  			      )
  		 	     ) 
  		     );
  	        }
  		 });
  //±±±±±±±±±±±±±±±±±±±±±±±±±±±  
  
  
  
  
  /*
   *------------------------------------- 统计绘制-----------------------------------------
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
		React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list15}), 
    		 React.createElement("form", {id: "editEchartForm", method: "post", className: "am-form"}, 
    		 React.createElement("div", null, 
	    		 React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
	    		 React.createElement(AMUIReact.Selected, {inline: true, name: "type", value: o.type, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.statistics_type_list, btnStyle: "primary"})
	    		 
	    		 ), 
				React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
							    		 
				React.createElement(AMUIReact.Selected, {inline: true, name: "groupuuid", value: o.groupuuid, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary"})
	    		 ), 
				 React.createElement("div", {className: "am-u-lg-2 am-u-md-4 am-u-sm-6"}, 
					    		 
				 React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", id: "begDateStr", dateTime: o.begDateStr, onChange: this.handleChange})
	    		 ), 
				React.createElement("div", {className: "am-u-lg-2 am-u-md-4  am-u-sm-6"}, 
			    React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", id: "endDateStr", dateTime: o.endDateStr, onChange: this.handleChange})
	    		 
	    		 ), 
    		 	React.createElement("div", {className: "am-u-lg-2 am-u-md-4"}, 
  			  React.createElement("button", {type: "button", className: "am-u-sm-2", onClick: this.handleChange, className: "am-btn am-btn-secondary"}, "查询")	  				
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
  	  React.createElement("hr", null), 	  
  	  React.createElement("div", {className: "am-form-group"}, 
  		React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
  		React.createElement(AMR_ButtonToolbar, null, 
          React.createElement("div", {className: "am-f1 am-margin-bottom-sm am-margin-left-xs"}, 
  	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "group_uuid", onChange: this.handleChange_group_Selected, btnWidth: "200", data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid})
  	), 
  	React.createElement("div", {className: "am-f1 am-margin-bottom-sm am-margin-left-xs"}, 
  	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid2", name: "type", onChange: this.handleChange_type_Selected, btnWidth: "200", data: this.props.teachingjudge_typelist, btnStyle: "primary", value: this.props.type})
  	  )
  	), 
  	  React.createElement("div", {className: "am-form-group am-margin-top-xs"}, 
  	  	React.createElement("div", {className: "am-u-lg-3 am-u-sm-6"}, 
  	  		React.createElement(PxInput, {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "学生姓名"}), 
  			  React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", id: "begDateStr", dateTime: this.props.begDateStr, onChange: this.handleChange}), 
  			  React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", id: "endDateStr", dateTime: this.props.endDateStr, onChange: this.handleChange}), 
  			React.createElement("div", {className: "am-f1 am-margin-bottom-sm am-margin-left-xs"}, 
  			  React.createElement("button", {type: "button", className: "am-u-sm-2", onClick: this.btn_teachingjudge_click, className: "am-btn am-btn-primary"}, "查询")	  				
  	  	)
  	  )
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
		         React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list8}), 
     		     React.createElement(AMUIReact.ButtonToolbar, null, 
     		     React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.refresh_data.bind(this)}, "刷新")
     		     ), 
		        React.createElement("hr", null), 
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
     			    React.createElement("div", {dangerouslySetInnerHTML: {__html:o.content}}), 
     			    	React.createElement(Common_mg_big_fn, {imgsList: o.imgsList})
     			    ), 
     			    	React.createElement("footer", {className: "am-comment-footer"}, 
     			    	React.createElement("div", {className: "am-comment-actions"}, 
     			    	GTimeShow.showByTime(o.create_time), 
					    
     			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
     			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"})), 
							"|阅读"+o.count, 
     			    	React.createElement("a", {href: "javascript:void(0);", onClick: common_check_illegal.bind(this,99,o.uuid)}, "举报"), 
     			    	React.createElement(G_check_disable_div_byRight, {type: 99, uuid: o.uuid, pxadmin: 2})
     			    	)
     			    	), 
     			    	
     			    	React.createElement(Common_Dianzan_show_noAction, {dianzan: o.dianzan, uuid: o.uuid, type: 99, btn_dianzan: "btn_dianzan_"+o.uuid}), 
     			    	React.createElement("ul", {className: "am-comments-list"}, 
     					  React.createElement(Classnews_reply_list_byRight, {replyPage: o.replyPage, uuid: o.uuid, type: 99, btn_reply: "btn_reply_"+o.uuid})
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
     			responsive: true, bordered: true, striped :true,hover:true,striped:true
     			}), document.getElementById(list_div));
     	},
     	load_more_data:function(){
     		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
     		var re_data=this.state.replyPage;
     		if(re_data&& this.pageNo==1){
				this.loadByFirst(this.classnewsreply_list_div+this.pageNo);		
     		}else{
     			re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow_byRight);
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
     return (
     		  React.createElement("div", null, 
     		  this.props.events.data.map(function(event) {
     		      return (
     		    		  React.createElement("li", {className: "am-cf"}, 
     		    		  React.createElement("span", {className: "am-comment-author am-fl"}, event.create_user+":"), 
     				        React.createElement("span", {className: "am-fl", dangerouslySetInnerHTML: {__html:event.content}}), React.createElement(G_check_disable_div_byRight, {type: 98, uuid: event.uuid, pxadmin: 2})
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
     * @ajax_classnews_save_Right:提交按钮在Kd_service;
     * */
     var Classnews_edit_byRight = React.createClass({displayName: "Classnews_edit_byRight", 
     	selectclass_uuid_val:null,
     	 getInitialState: function() {
     		    return this.props.formdata;
     		  },
     	 handleChange: function(event) {
     		 	  var tmp=$('#editClassnewsForm').serializeJson();
		    this.setState(tmp);
				//根据学校uuid添加水印	
			var obj=Store.getClassByMyClassList(tmp.classuuid);
			if(obj){
				w_img_upload_nocut.groupuuid=obj.groupuuid;
			}else{
				w_img_upload_nocut.groupuuid=null;
			}
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
			//根据学校uuid添加水印	
			var obj=Store.getClassByMyClassList( this.state.classuuid);
			if(obj){
				w_img_upload_nocut.groupuuid=obj.groupuuid;
			}else{
				w_img_upload_nocut.groupuuid=null
			}

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
     		  React.createElement("form", {id: "editClassnewsForm", method: "post", className: "am-form"}, 
     		  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "classuuid", onChange: this.handleChange, btnWidth: "300", data: this.props.mycalsslist, btnStyle: "primary", value: o.classuuid}), 	      
     			
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
 
     
     

 
//——————————————————————————<培训机构新版>教学计划<管理模块绘制>——————————————————————————  
 /*
  * <培训机构新版><教学计划>服务器请求后绘制处理方法；
  * courseList  courseuuid   title  groupuuid
  * classList  classuuid
  * */
 var Px_rect_teachingplan_byRight = React.createClass({displayName: "Px_rect_teachingplan_byRight",
	 isAddteachingplanFlag:false,
	 class_nameFlag:true,
	 form_data:null,
		 getStateByPropes:function(nextProps){
	
		 	var courseList=Store.getCourseList(nextProps.groupuuid);
			if(!nextProps.courseuuid){
				if(courseList&&courseList.length>0){
 					nextProps.courseuuid=courseList[0].uuid;
 				}
			}

 	 		   var classList=Store.getClassCourseList(nextProps.courseuuid);
 	 			var classuuid =nextProps.classuuid;
 	 			if(!classuuid&&classList&&classList.length>0){
 	 				classuuid=classList[0].uuid;
 	 			}
				if(!nextProps.events)nextProps.events=[];
 	 			var o={
							events:nextProps.events,
 	 					courseuuid:nextProps.courseuuid,
 	 					classuuid:classuuid,
                        groupuuid:nextProps.groupuuid,
						courseList:G_selected_dataModelArray_byArray(courseList,"uuid","title"),
 	 					classList:G_selected_dataModelArray_byArray(classList,"uuid","name")
 	 			}
		return o;
		},
		getInitialState: function() {

 			return this.getStateByPropes(this.props);
 		  },
 		   componentWillReceiveProps: function(nextProps) {
 		 		 //同一界面数据变化更新作用方法;
 		 		 this.isAddteachingplanFlag=false;
 		 		this.class_nameFlag=true;
 	 			var o=this.getStateByPropes(nextProps);
 	 		   this.setState(o);
 	 		},
	  addteachingplan_btn:function(m,event){
		  $("html,body").animate({scrollTop:0},200);
		  //新增和修改按钮点击事件；更新form_data
		  if(m=="copy"){
		    event.uuid=null;
		    }
		  this.form_data=event;
 		  this.isAddteachingplanFlag=true;
 		  this.class_nameFlag=false;
 		  this.setState(this.state);  
 	  },
 	 delete_button: function(event){
 		 //删除课程按钮事件
 		px_react_ajax_teachingplan_delete(event);
	  }, 
	componentDidMount: function() {
		//启动复制课程下拉框
	   $('#doc-dropdown-js').dropdown({justify: '#doc-dropdown-justify-js'});   
	 },
	   	handleChange_courseuuid_Selected: function(v) {
	   		var courseuuid=v;

				  var classList=Store.getClassCourseList(courseuuid);
 	 			var classuuid =null;
 	 			if(classList&&classList.length>0){
 	 				classuuid=classList[0].uuid;
						px_ajax_teachingplan_byRight(G_mygroup_choose,classuuid,courseuuid);
 	 			}else{
					this.state.classList=[];
					this.setState(this.state);
					px_ajax_teachingplan_byRight(G_mygroup_choose,classuuid,courseuuid);
				}
            
	   	  }, 

	handleChange_stutent_Selected: function() {
	   		var courseuuid=$("input[name='courseuuid']").val();
	 	  	var classuuid=$("input[name='classuuid']").val();
	 	px_ajax_teachingplan_byRight(G_mygroup_choose,classuuid,courseuuid);
	   	  }, 
	add_classbtn: function() {
	 	    var classuuid=$("input[name='classuuid']").val();
              teachingplan_addClass_byRight(classuuid);
	   	  },
	Alldeletes_btn: function() {
	 	    var classuuid=$("input[name='classuuid']").val();
			var courseuuid=$("input[name='courseuuid']").val();
              react_all_teachingplan_delete(classuuid,courseuuid);
	   	  },
 render: function() {
	 var o=this.state;

	 	 G_mygroup_choose=o.groupuuid;
			G_course_choose=o.courseuuid;
	 var thit=this;
	 var classList=o.classList;
	 var copybyclassList=[];
		 var addStudent=(React.createElement("div", null));
		 var class_name=(React.createElement("div", null));
		 //新增与修改镶嵌div;
 		 if(this.isAddteachingplanFlag){
 			 addStudent=(
 					 React.createElement(Px_Teachingplan_edit, {formdata: this.form_data})
 				  );
 		        };	
 		 //班级名字头标Div（区分镶嵌的头标而设）;       
 		 if(this.class_nameFlag){
 			class_name=(
 				      React.createElement("legend", null, Store.getClassByUuid(o.classuuid).name) 
 				  );
 		        };
 		 //筛选出不是当前的班级数组       
		for(var i=0;i<o.classList.length;i++){
			if(o.classuuid!=classList[i].value){
				copybyclassList.push(classList[i]);
			}
		   }
     return (
     React.createElement("div", null, 
     React.createElement(AMR_Panel, null, 
     React.createElement(AMR_ButtonToolbar, null, 
	 React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	  React.createElement("a", {name: "top"}), 
  	  React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid1", name: "courseuuid", onChange: this.handleChange_courseuuid_Selected, data: o.courseList, btnStyle: "primary", value: o.courseuuid})
  	   ), 	 
  	    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
  	   React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid2", name: "classuuid", onChange: this.handleChange_stutent_Selected, data: o.classList, btnStyle: "primary", value: o.classuuid})
  	  )
	 )
     ), 
		   React.createElement(AMR_ButtonToolbar, null, 
		   React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.addteachingplan_btn.bind(this,"add",{classuuid:o.classuuid,uuid:null})}, "增加单条课程"), 	
           React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.add_classbtn.bind(this)}, "批量添加课程"), 	  	  
		   React.createElement(AMR_Button, {amSize: "xs", amStyle: "danger", onClick: this.Alldeletes_btn.bind(this)}, "删除所有课程")
	       ), 
	  class_name, 	 
      addStudent, 
     
      
      React.createElement("div", {id: "doc-dropdown-justify-js"}, 
      React.createElement("div", {className: "am-dropdown", id: "doc-dropdown-js"}, 
        React.createElement("button", {className: "am-btn am-btn-success am-dropdown-toggle am-fl am-margin-left-sm am-margin-bottom-xs"}, "将课程复制到", React.createElement("span", {className: "am-icon-caret-down"})), 
        React.createElement("div", {className: "am-dropdown-content"}, 
		copybyclassList.map(function(event) {
			  return(
					  React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);", onClick: px_react_copy_buttn.bind(this,o.classuuid,event.value)}, event.label))
			  	  
			  )})
        )
      )
    ), 
      
      
      React.createElement("div", {className: "am-panel-group", id: "accordion"}, 
      
		 o.events.map(function(event) {
			  return(	
					  
      React.createElement("div", {className: "am-panel am-panel-default"}, 
        React.createElement("div", {className: "am-panel-hd"}, 
        React.createElement("h4", {className: "am-panel-title", "data-am-collapse": "{parent: '#accordion', target: '#do-not-say-"+event.uuid+"'}"}, 
           event.name, "—— 时间：", event.plandate
          )
        ), 
        React.createElement("div", {id: "do-not-say-"+event.uuid, className: "am-panel-collapse am-collapse"}, 
          React.createElement("div", {className: "am-panel-bd"}, 
          React.createElement("div", null, 
          "上课地点:", event.address
          ), 
          React.createElement("div", null, 
          "需要工具:", event.readyfor
          ), 
          React.createElement("div", null, 
		  "课程时长:", event.duration
          ), 
          React.createElement("div", null, 
          "课程详细内容:", event.context
          ), 
          React.createElement(AMR_ButtonToolbar, null, 
          React.createElement("a", {href: "#top"}), 
		  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: thit.addteachingplan_btn.bind(this,"eit",event)}, "修改"), 
           React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: thit.addteachingplan_btn.bind(this,"copy",event)}, "复制"), 
		  React.createElement(AMR_Button, {amSize: "xs", amStyle: "danger", onClick: thit.delete_button.bind(this,event)}, "删除")
         )
          )
        )
      )
			  )})
   
    )
      
      
       )
     );
   }
 });
     
// /*  	
//  * <培训机构新版><教学计划>在表单上绘制详细内容;
//  * */
// var Query_teachingplan_byRight = React.createClass({ 
//	 handleChange_button: function(event) {
//		 teachingplan_edit_onClick_byRight("eit",event);
//	 	  },
//	 	 delete_button: function(event) {
//	 		px_react_ajax_teachingplan_delete(event);
//		 	  }, 	  
// 	  render: function() {
// 	    var event = this.props.event;
// 	 	var className = event.highlight ? 'am-active' :
// 	  	  event.disabled ? 'am-disabled' : '';
//
// 	  	return (
// 	  	  <tr className={className} >
// 	  	    <td>{event.name}<AMR_Button amSize="xs" amStyle="secondary" onClick={this.handleChange_button.bind(this,event)} >修改</AMR_Button><AMR_Button amSize="xs" amStyle="danger" onClick={this.delete_button.bind(this,event)} >删除</AMR_Button></td>
// 	  	    <td>{event.plandate}</td>
// 	  	    <td>{event.address}</td>
// 	  	    <td>{event.readyfor}</td>
// 	  	    <td>{event.duration}</td>
// 	  		<td>{event.context}</td>
// 	  	  </tr> 
// 	    );
// 	  }
// 	}); 
//培训机构新课程表添加与编辑绘制
 var Px_Teachingplan_edit = React.createClass({displayName: "Px_Teachingplan_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		 var o=$('#editTeachingplanForm').serializeJson();
		 o.plandate=o.plandateStr;
		    this.setState(o);
	  },
	  componentWillReceiveProps: function(nextProps) {
  		 this.setState(nextProps.formdata);
		},
 render: function() {
 	  var o = this.state;
  	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
  	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
  	  var class_name=(React.createElement("div", null));
  	  if(o.uuid){
  		class_name=(
		React.createElement("legend", null, Store.getClassByUuid(o.classuuid).name+"-"+o.name+"教学计划修改")   
  	    )
  	  }else{
  		class_name=(
  		React.createElement("legend", null, Store.getClassByUuid(o.classuuid).name+"-新增教学计划") 
  		)
  	  }
 return (
 		React.createElement("form", {id: "editTeachingplanForm", method: "post", className: "am-form"}, 
 			React.createElement(PxInput, {type: "hidden", name: "uuid", value: o.uuid}), 
 		     React.createElement(PxInput, {type: "hidden", name: "classuuid", value: o.classuuid}), 
 		   React.createElement("div", {className: "am-form-group"}, 
 			class_name, 
	       React.createElement("label", {className: one_classDiv}, "课程名："), 
		     React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {type: "text", name: "name", id: "name", maxLength: "20", value: o.name, onChange: this.handleChange})
		        ), 
 			 	
		       React.createElement("label", {className: one_classDiv}, "上课时间："), 
  		      React.createElement("div", {className: two_classDiv}, 
			React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD HH:mm", inline: true, name: "plandateStr", dateTime: o.plandate, onChange: this.handleChange})

  		    		    ), 	 
 				 
	       React.createElement("label", {className: one_classDiv}, "课时长："), 
		     React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {type: "text", name: "duration", id: "duration", maxLength: "20", value: o.duration, onChange: this.handleChange})
		        ), 
 				 
		       React.createElement("label", {className: one_classDiv}, "上课地点："), 
			  React.createElement("div", {className: two_classDiv}, 
			 React.createElement(PxInput, {type: "text", name: "address", id: "address", maxLength: "20", value: o.address, onChange: this.handleChange})
			), 
 					       
  		     React.createElement("label", {className: one_classDiv}, "准备工具:"), 
		      React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {type: "text", placeholder: "默认为无需准备工具", name: "readyfor", id: "readyfor", maxLength: "20", value: o.readyfor, onChange: this.handleChange})
		        ), 
 			       
			   React.createElement("label", {className: one_classDiv}, "课程详细内容："), 
			  React.createElement("div", {className: two_classDiv}, 
			 React.createElement(PxInput, {type: "text", name: "context", id: "context", maxLength: "20", value: o.context, onChange: this.handleChange})
			), 
 				      React.createElement("button", {type: "button", onClick: ajax_teachingplan_save_byRight, className: "am-btn am-btn-primary"}, "提交")		      				      
 				      ), 
 				     React.createElement("hr", null)
 		          ) 	   		   				

 );
 }
 }); 


 //培训机构批量添加课程表
 var Px_Teachingplan_addClass = React.createClass({displayName: "Px_Teachingplan_addClass", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		 var o=$('addtTeachingplanForm').serializeJson();
		 o.plandate=o.plandateStr;
		    this.setState(o);
	  },
	  componentWillReceiveProps: function(nextProps) {
  		 this.setState(nextProps.formdata);
		},
 render: function() {
 	  var o = this.state;
 	  
  	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
  	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
 return (
 		React.createElement("form", {id: "addtTeachingplanForm", method: "post", className: "am-form"}, 
 			React.createElement(PxInput, {type: "hidden", name: "uuid", value: o.uuid}), 
 		    React.createElement(PxInput, {type: "hidden", name: "classuuid", value: o.classuuid}), 
			React.createElement(PxInput, {type: "hidden", name: "per_week", value: o.per_week}), 

 		   React.createElement("div", {className: "am-form-group"}, 
		       React.createElement("label", {className: one_classDiv}, "开课日期："), 
  		      React.createElement("div", {className: two_classDiv}, 
				 React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "per_start_date", dateTime: o.per_start_date, onChange: this.handleChange})

		    ), 	 
 				 
				React.createElement(AMUIReact.FormGroup, null, 
				  React.createElement("label", null, "上课周期："), 
				  React.createElement(PxInput, {type: "checkbox", value: "1", name: "per_week_check", label: "周一", inline: true}), 
				  React.createElement(PxInput, {type: "checkbox", value: "2", name: "per_week_check", label: "周二", inline: true}), 
				  React.createElement(PxInput, {type: "checkbox", value: "3", name: "per_week_check", label: "周三", inline: true}), 
				  React.createElement(PxInput, {type: "checkbox", value: "4", name: "per_week_check", label: "周四", inline: true}), 
				  React.createElement(PxInput, {type: "checkbox", value: "5", name: "per_week_check", label: "周五", inline: true}), 
				  React.createElement(PxInput, {type: "checkbox", value: "6", name: "per_week_check", label: "周六", inline: true}), 
				  React.createElement(PxInput, {type: "checkbox", value: "7", name: "per_week_check", label: "周日", inline: true})
				), 

	       React.createElement("label", {className: one_classDiv}, "上课次数："), 
		     React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {type: "number", name: "per_num", maxLength: "5", value: o.per_num, placeholder: "必填,范围:[0-99]", onChange: this.handleChange})
		        ), 
			React.createElement("label", {className: one_classDiv}, "上课时间："), 
  		      React.createElement("div", {className: two_classDiv}, 
			     React.createElement(AMUIReact.DateTimeInput, {icon: "clock-o", maxLength: "5", name: "per_time", value: o.per_time, showDatePicker: false, format: "HH:mm", placeholder: "24H:mm", onChange: this.handleChange})
  		  
		    ), 	

	       React.createElement("label", {className: one_classDiv}, "课时长："), 
		     React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {type: "text", name: "duration", id: "duration", maxLength: "20", value: o.duration, onChange: this.handleChange})
		        ), 

				


		       

			 React.createElement("label", {className: one_classDiv}, "课程名:"), 
		      React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {type: "text", name: "name", id: "name", maxLength: "20", value: o.name, placeholder: "课程名必填", onChange: this.handleChange})
		        ), 

	         React.createElement("label", {className: one_classDiv}, "上课地点："), 
			  React.createElement("div", {className: two_classDiv}, 
			 React.createElement(PxInput, {type: "text", name: "address", id: "address", maxLength: "20", placeholder: "选填", value: o.address, onChange: this.handleChange})
			), 


  		     React.createElement("label", {className: one_classDiv}, "准备工具:"), 
		      React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {type: "text", placeholder: "选填", name: "readyfor", id: "readyfor", maxLength: "20", value: o.readyfor, onChange: this.handleChange})
		        ), 
 			       


			   React.createElement("label", {className: one_classDiv}, "课程详细："), 
			  React.createElement("div", {className: two_classDiv}, 
			 React.createElement(PxInput, {type: "text", name: "context", id: "context", maxLength: "20", placeholder: "选填", value: o.context, onChange: this.handleChange})
			), 
 				      
			   
			   
			   
			   React.createElement("button", {type: "button", onClick: addteachingplan_save_byRight, className: "am-btn am-btn-primary"}, "提交")		      				      
 			  ), 
 		     React.createElement("hr", null)
            ) 	   		   				

 );
 }
 }); 
 //±±±±±±±±±±±±±±±±±±±±±±±±±±± 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
//——————————————————————————<幼儿园新版>教学计划<管理模块绘制>——————————————————————————  
 /*
  * 
  * 教学计划1周显示
  * <Teachingplan_showByMy  classuuid={classuuid} classlist={classlist} />
  */
 var Teachingplan_show7Day_byRight = React.createClass({displayName: "Teachingplan_show7Day_byRight", 
 	getInitialState: function() {
 		var classList=Store.getChooseClass(this.props.groupuuid);
 		var class_uuid =null;
 		if(classList&&classList.length>0){
 			classuuid=classList[0].uuid;
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
 		var url = hostUrl + "rest/pxteachingplan/list.json";
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
// 		if(!this.props.formdata){
// 			  $("#div_detail").html("今日没有发布教学计划");
// 		  }	    
 	  },
 	render: function() {
 	  var o = this.state;
 	  var now=new Date();
 	  	now=G_week.getDate(now,o.pageNo*7);
 	  return (
 		React.createElement("div", null, 
 		React.createElement("div", {className: "am-g"}, 
 		React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "pre")}, "上周"), 
 		React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "next")}, "下周"), 	
 	    React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup.bind(this), btnWidth: "200", data: this.props.groupList, btnStyle: "primary", value: this.props.groupuuid}), 
 		React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "class_uuid", onChange: this.handleChange_selectclass_uuid.bind(this), btnWidth: "200", data: this.state.classlist, btnStyle: "primary", value: this.state.classuuid})
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
// 		  if(this.state.isEdit){
// 			  return (<Teachingplan_edit_inner data={o} callback={this.save_callback.bind(this)} />);
// 		  }
 		  var dianzan=(React.createElement("div", null));
 		  if(o.uuid){
 			  dianzan=(
 					  React.createElement("div", null, 
 					  React.createElement("footer", {className: "am-comment-footer"}, 
 				    	React.createElement("div", {className: "am-comment-actions"}, 
 				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
 				    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"}))
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
  *<教学计划>班级编辑-内嵌在显示1周页面
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
 		            url:hostUrl + "rest/pxteachingplan/save.json",
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
 //±±±±±±±±±±±±±±±±±±±±±±±±±±±
 
 
 
 
//——————————————————————————<幼儿园老版>教学计划<管理绘制>——————————————————————————        
 /*
 * <教学计划>班级详情界面按钮列表框等绘制;
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
 			var url = hostUrl + "rest/pxteachingplan/list.json";
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
 *<教学计划>班级详情列表详情内容绘制;
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
 
 
 
 
 
 
 
 
 
//——————————————————————————<发布对外课程>发布课程<管理模块绘制>——————————————————————————  
 /* 
  * <发布课程>服务器请求后绘制处理方法；
  * 
  * */
 var px_rect_course_byRight = React.createClass({displayName: "px_rect_course_byRight",
 	 handleChange_button: function(groupuuid) {
 		px_course_onClick_byRight({groupuuid:groupuuid,uuid:null});
 	  },
     handleChange_selectgroup_uuid: function(val) {
 		px_ajax_course_byRight(val);
 	  },
 handleClick: function(m) {
         var uuid="";
            $($("input[name='table_checkbox']")).each(function(){					
					 if(this.checked){
						 if(!uuid){
							 uuid=this.value;
						  }else{
							 uuid+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
						 }						
					 }
					});
				  if(!uuid){
					  alert("亲,请勾选一个课程！");
					  return;
				  }
		if(uuid.indexOf(",")>=0){
			alert("亲,只选择一个课程做操作");
			return;
		}

		 if(m=="addclass"||m=="eitclass"){			 	
			  $.AMUI.progress.start();
 			var url = hostUrl + "rest/pxCourse/"+uuid+".json";
 			$.ajax({
 				type : "GET",
 				url : url,
 				dataType : "json",
 				success : function(data) {
 					$.AMUI.progress.done();
 					if (data.ResMsg.status == "success") {
                       if(m=="addclass"){
					     data.data.uuid=null;
					     px_course_onClick_byRight(data.data);
					    }else{
					      px_course_onClick_byRight(data.data);
					  }

 					} else {
 						alert(data.ResMsg.message);
 						G_resMsg_filter(data.ResMsg);
 					}
 				}
 			});		
		   }else if(m=="delete"){
		     react_ajax_class_course_delete(this.props.groupuuid,uuid)
		     }
	 	  },
 handleChange_checkbox_all:function(){
	  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
 },
 render: function() {
	 var o=this.props;
     return (
     React.createElement("div", null, 
		 React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list3}), 
		 React.createElement(AMR_Panel, null, 
         React.createElement(AMR_ButtonToolbar, null, 
			 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
		     React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "class_uuid", onChange: this.handleChange_selectgroup_uuid.bind(this), btnWidth: "200", data: o.groupList, btnStyle: "primary", value: o.groupuuid})
			 ), 
		     React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
	         React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleChange_button.bind(this,o.groupuuid)}, "新增课程")	
			 ), 
			React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,"eitclass")}, "修改"), 
			React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,"addclass")}, "复制课程"), 
			React.createElement(AMR_Button, {amSize: "xs", amStyle: "danger", onClick: this.handleClick.bind(this,"delete")}, "删除")
		 )
		 ), 		 

       React.createElement(AMR_Table, React.__spread({},  this.props), 
         React.createElement("thead", null, 
           React.createElement("tr", null, 
		     React.createElement("th", null, 
             React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
             ), 
             React.createElement("th", null, "标题"), 		     
		     React.createElement("th", null, "发布状态"), 
		     React.createElement("th", null, "适应年龄"), 
             React.createElement("th", null, "课程类型"), 
             React.createElement("th", null, "上课地点"), 
             React.createElement("th", null, "课程学时"), 
             React.createElement("th", null, "收费价格"), 
             React.createElement("th", null, "优惠价格"), 
		     React.createElement("th", null, "班级数"), 
		     React.createElement("th", null, "星级"), 
		     React.createElement("th", null, "浏览次数"), 
             React.createElement("th", null, "更新时间")
           )
         ), 
         React.createElement("tbody", null, 
           this.props.events.map(function(event) {
             return (React.createElement(Query_course_byRight, {key: event.id, event: event, groupuuid: o.groupuuid}));
           })
         )
       )
       )
     );
   }
 });
 /*  	
  * <发布课程>在表单上绘制详细内容;
  * */
 var Query_course_byRight = React.createClass({displayName: "Query_course_byRight", 	
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
		  React.createElement("td", null, 
	      React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
	      ), 
 	  	    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: px_ajax_class_course_look_info.bind(this,event.uuid)}, event.title)), 
			  React.createElement("td", null

			 ), 
			React.createElement("td", {className: txtclasssName}, Vo.get("course_status_"+event.status)), 
		    React.createElement("td", null, event.age_min, "-", event.age_max), 
		    React.createElement("td", null, Vo.get("course_type_"+event.type)), 
 	  	    React.createElement("td", null, event.address), 
 	  	    React.createElement("td", null, event.schedule), 
 	  	    React.createElement("td", null, event.fees), 
 	  	    React.createElement("td", null, event.discountfees), 
			 React.createElement("td", null, event.class_count), 
            React.createElement(G_rect_stars, {ct_stars: event.ct_stars}), 
			React.createElement("td", null, event.count==null?0:event.count), 


            React.createElement("td", null, event.updatetime)
 	  	  ) 
 	    );
 	  }
 	}); 
 




 /*发布课程中查看课程详情
  * */
 var Class_course_look_info =React.createClass({displayName: "Class_course_look_info",
 	 getInitialState: function() {
 		    return this.props.formdata;
 		  },
 	 handleChange: function(event) {
 		    this.setState($('#editClassStudentForm').serializeJson());
 	  },
 	  componentDidMount:function(){

 		},
 		render: function() {
 	     var o =this.state;
 	     var imgGuid=o.logo;
		  if(!o.logo)imgGuid=G_def_noImgPath;
 	     var imglist=[imgGuid];
 		 return (
 		 		React.createElement("div", null, 
 		 		
 			    React.createElement(AMUIReact.List, {static: true, border: true, striped: true}, 
 			      React.createElement(Common_mg_big_fn, {imgsList: imglist}), 				  
 				  React.createElement("br", null), 	      
 			      
 			         React.createElement(AMUIReact.ListItem, null, "标题:", o.title), 
 			        React.createElement(AMUIReact.ListItem, null, "课程类型:", Vo.get("course_type_"+o.type)), 
				 React.createElement(AMUIReact.ListItem, null, "适应年龄:", o.age_min, "-", o.age_max), 
 			      React.createElement(AMUIReact.ListItem, null, "上课地点:", o.address), 
 			     React.createElement(AMUIReact.ListItem, null, "课程学时:", o.schedule), 
 			    React.createElement(AMUIReact.ListItem, null, "收费价格:", o.fees), 
 			   React.createElement(AMUIReact.ListItem, null, "优惠价格:", o.discountfees), 
 			  React.createElement(AMUIReact.ListItem, null, "更新时间:", o.updatetime), 
 			 React.createElement(AMUIReact.ListItem, null, "发布状态:", Vo.get("course_status_"+o.status)), 			      
 			 React.createElement(AMUIReact.ListItem, null, "课程详细内容:"
 	 			
 				)		 			       			      
 			 ), 	
					React.createElement("div", {dangerouslySetInnerHTML: {__html:o.context}})
 		    ) 
 		     );
 	        }
 		 }); 
 
 

//发布课程添加与编辑绘制
 var Px_course_edit = React.createClass({displayName: "Px_course_edit", 
	 getInitialState: function() {

		 this.props.formdata.logo=this.props.logo;
		 this.props.formdata.groupList=this.props.groupList;
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		   

			var tmp=$('#editCourseForm').serializeJson();
		    this.setState(tmp);
			w_img_upload_nocut.groupuuid=tmp.groupuuid;
			
	  },
	  componentDidMount:function(){

		  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
		    this.editor=editor;
	        w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
	              editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
	        });
			w_img_upload_nocut.groupuuid=this.state.groupuuid;

		
      },
	   /*
	    * (发布课程)内上传LOGO图片
	    * */
   btn_class_group_uploadHeadere :function(){      
       w_uploadImg.open(function (guid){
            $ ("#logo").val(guid);
            $("#img_head_image").attr("src",G_imgPath+ guid);
            G_img_down404("#img_head_image");
	         });   
	   },
	 handleChange_Selected: function(event) {
		   //根据选择学校刷新LOGO 如果有的话
	$.AMUI.progress.start();
	var url = hostUrl + "rest/group/getBaseInfo.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {uuid:event},
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				var img=data.data.img;
		  if(img){
            $ ("#logo").val(img);
            $("#img_head_image").attr("src",G_imgPath+ img);
            G_img_down404("#img_head_image");
				}			
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error : G_ajax_error_fn
	});
		    this.setState($('#editCourseForm').serializeJson());
	  },
		   preview_fn:function(){
          G_html_preview("t_iframe", null,this.editor.getSource(),this.state.title);
       }, 
 render: function() {
 	  var o = this.state;
	  var mygroupImg=Store.getMyGroupByUuid(o.groupuuid).img;
	  if(!o.logo)o.logo=mygroupImg;
	  if(!mygroupImg)o.logo=G_def_noImgPath;
	  var one_classDiv="am-u-lg-4 am-u-md-4 am-u-sm-12 am-form-label";
	  var two_classDiv="am-u-lg-8 am-u-md-8 am-u-sm-12";
	   var course_type_list=G_selected_dataModelArray_byArray(Vo.getTypeList("course_type"),"key","val");
	   var course_status_list=G_selected_dataModelArray_byArray(Vo.getTypeList("course_status"),"key","val");
	   if(o.type==null&&course_type_list.length>0)o.type=course_type_list[0].value;
	   if(o.status==null)o.status=1;
 return (
		 React.createElement("div", null, 

		  React.createElement("div", {className: " am-u-md-6 am-u-sm-12"}, 
		  React.createElement("form", {id: "editCourseForm", method: "post", className: "am-form"}, 
			React.createElement(PxInput, {type: "hidden", name: "uuid", value: o.uuid}), 
		     React.createElement(PxInput, {type: "hidden", name: "groupuuid", value: o.groupuuid}), 
			       React.createElement(PxInput, {type: "hidden", name: "logo", id: "logo", value: o.logo, onChange: this.handleChange}), 
			React.createElement("div", null, 
		      React.createElement(AMUIReact.Image, {id: "img_head_image", src: G_imgPath+o.logo, className: "G_img_header"}), 
               React.createElement("button", {type: "button", onClick: this.btn_class_group_uploadHeadere, className: "am-btn am-btn-secondary"}, "上传LOGO")
  

          ), 
          React.createElement("hr", null), 
		   React.createElement("div", {className: "am-form-group"}, 
             React.createElement("div", {className: "am-fl am-margin-bottom-sm "}, 
	 	  	  React.createElement(AMUIReact.Selected, {amSize: "xs", id: "groupuuid", name: "groupuuid", onChange: this.handleChange_Selected, multiple: false, data: o.groupList, btnStyle: "primary", value: o.groupuuid})		     
	 	       ), 
		      React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		     React.createElement(AMUIReact.Selected, {id: "type", name: "type", onChange: this.handleChange, data: course_type_list, btnStyle: "primary", value: o.type+""})		     
	 	    ), 
		     React.createElement(AMUIReact.Selected, {id: "status", name: "status", onChange: this.handleChange, data: course_status_list, btnStyle: "primary", value: o.status+""}), 		     

	 	  	  React.createElement("hr", null), 
		       React.createElement("label", {className: one_classDiv}, "标题:"), 
			     React.createElement("div", {className: two_classDiv}, 
			       React.createElement(PxInput, {type: "text", name: "title", id: "title", maxLength: "20", value: o.title, onChange: this.handleChange})
			        ), 
		 	    React.createElement("label", {className: one_classDiv}, "适应年龄(岁):"), 
			     React.createElement("div", {className: two_classDiv +" am-form-inline"}, 
				   React.createElement("div", {className: "am-form-group"}, 
			       React.createElement(PxInput, {type: "number", name: "age_min", id: "age_min", inline: true, maxLength: "2", placeholder: "最小岁(岁)", value: o.age_min, onChange: this.handleChange})
				   ), 
				    React.createElement("div", {className: "am-form-group"}, "- "), 

				   React.createElement("div", {className: "am-form-group"}, 
					React.createElement(PxInput, {type: "number", name: "age_max", id: "age_max", inline: true, maxLength: "3", placeholder: "最大岁(岁)", value: o.age_max, onChange: this.handleChange})
			             )
			  ), 
		  		  
				React.createElement("p", {className: "am-text-warning"}, "用于家长精确检索"), 
		 	 
			    React.createElement("label", {className: one_classDiv}, "上课地点:"), 
			     React.createElement("div", {className: two_classDiv}, 
			       React.createElement(PxInput, {placeholder: "非必填项", type: "text", name: "address", id: "address", maxLength: "50", value: o.address, onChange: this.handleChange})
			        ), 


			    React.createElement("label", {className: one_classDiv}, "课程学时:"), 
			     React.createElement("div", {className: two_classDiv}, 
			       React.createElement(PxInput, {placeholder: "非必填项", type: "text", name: "schedule", id: "schedule", maxLength: "20", value: o.schedule, onChange: this.handleChange})
			        ), 

			    React.createElement("label", {className: one_classDiv}, "收费价格:"), 
			     React.createElement("div", {className: two_classDiv}, 
			       React.createElement(PxInput, {placeholder: "非必填项", type: "number", name: "fees", id: "fees", maxLength: "20", value: o.fees, onChange: this.handleChange})
			        ), 

			    React.createElement("label", {className: one_classDiv}, "优惠价格:"), 
			     React.createElement("div", {className: two_classDiv}, 
			       React.createElement(PxInput, {placeholder: "非必填项", type: "number", name: "discountfees", id: "discountfees", maxLength: "20", value: o.discountfees, onChange: this.handleChange})
			        ), 
			       
			      React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "课程详细内容:", placeholder: "填写内容", name: "context", value: o.context, onChange: this.handleChange}), 
					G_get_upload_img_Div(), 
	  		  
				      React.createElement("button", {type: "button", onClick: ajax_course_save_byRight, className: "am-btn am-btn-primary"}, "提交"), 
						    React.createElement("button", {type: "button", onClick: this.preview_fn.bind(this), className: "am-btn am-btn-primary"}, "预览")
					   )
		          )
		       ), 	

		     React.createElement("div", {className: "am-u-lg-6 am-u-sm-12 "}, 
               React.createElement(G_phone_iframe, null)
             )
		)
 );
 }
 }); 
 //±±±±±±±±±±±±±±±±±±±±±±±±±±±  

 

 
 
 
 
//——————————————————————————我的班级<绘制>—————————————————————————— 
 /*
 * 我的班级-按钮、列表绘制
 * */
 var Class_students_show= React.createClass({displayName: "Class_students_show",
 	 componentDidMount:function(){
 			 G_img_down404();
 	  },
 	  handleChange_selectgroup_uuid:function(val){
 		  react_ajax_class_students_manage(val,"show");
 	  },
 	  handleClick:function(m,groupuuid,uuid){
 		  btn_click_class_list(m,groupuuid,uuid); 			
 	  },
 	render: function() {
 		var o=this.props.formdata;
 		if(!o)o="";
 		var stutent_num=this.props.stutent_num;
 		if(!this.props.students)this.props.students=[];
 	  return (
 	  React.createElement("div", null, 	 
 		  React.createElement(AMR_Panel, null, 
 		   React.createElement(AMR_Grid, {className: "doc-g"}, 
 		  	React.createElement(AMR_ButtonToolbar, null, 
 		  	  React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
 		  	   React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "class_uuid", onChange: this.handleChange_selectgroup_uuid.bind(this), btnWidth: "200", data: this.props.classList, btnStyle: "primary", value: o.uuid})
 		  	  ), 
 		  	  React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
 		  	   React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: menu_teachingplan_dayShow_fn.bind(this,o.uuid)}, "查看课程")
 		  	  ), 
 		  	  React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
 		  	   React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,"addstudent",o.groupuuid,o.uuid)}, "管理学生")
 		  	  )
 		  	  
 		  	 )
		    )
 		   ), 
		      React.createElement(AMR_Panel, null, 
			   React.createElement(AMR_Grid, {className: "doc-g"}, 
 	  		       React.createElement(AMR_Col, {className: "am-hide-sm", sm: 6, md: 3}, " 学校:", Store.getGroupNameByUuid(o.groupuuid)), 
 			       React.createElement(AMR_Col, {className: "am-hide-sm", sm: 6, md: 3}, " 班级:", o.name), 
 			       React.createElement(AMR_Col, {sm: 5, md: 2}, "管理员:", o.headTeacher_name), 
 			       React.createElement(AMR_Col, {sm: 4, md: 2}, "上课老师:", o.teacher_name), 
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
              return (React.createElement(Query_Students_EventRow_byRight, {key: event.id, event: event}));
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
   * 调用ajax_class_students_look_info
   * 进入前btn_students_list_click按钮事件内添加Queue.push保证回退正常;
   * */
  var Query_Students_EventRow_byRight = React.createClass({displayName: "Query_Students_EventRow_byRight", 
  	  render: function() {
  	    var event = this.props.event;
         var header_img=event.headimg;
	    if(!header_img)header_img=G_def_noImgPath;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';
  	    return (
  	      React.createElement("tr", {className: className}, 
			React.createElement("td", null, " ", React.createElement(AMUIReact.Image, {id: "img_head_image", width: "28", height: "28", src: header_img})), 
			React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: ajax_class_students_look_info.bind(this,event.uuid)}, event.name)), 			
  	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
  	        React.createElement("td", null, event.birthday), 
  	        React.createElement("td", null, event.idcard), 
		    React.createElement("td", null, React.createElement("a", {className: event.ma_tel?"":"am-hide", href: "tel:"+event.ma_tel}, event.ma_tel)), 
            React.createElement("td", null, React.createElement("a", {className: event.ba_tel?"":"am-hide", href: "tel:"+event.ba_tel}, event.ba_tel))
			 ) 
  	    );
  	  }
  	}); 	


//*********************我的班级模块-列表学生名字按钮详情绘制相关代码********************* 
 /*我的班级模块-列表学生名字-详细信息
  * Class_student_look_info@:此方法模板为单独查看每个学生详细信息但不能编辑；
  * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
  * <Common_mg_big_fn  imgsList={o.imgsList} />
  * */
 var Class_student_look_info =React.createClass({displayName: "Class_student_look_info",
 	 getInitialState: function() {
 		    return this.props.formdata;
 		  },
 	 handleChange: function(event) {
 		    this.setState($('#editClassStudentForm').serializeJson());
 	  },
 	  componentDidMount:function(){

 		},
 		render: function() {
 	     var o =this.state;
 	     var imgGuid=o.headimg;
		 if(!imgGuid)imgGuid=G_def_noImgPath;
 	     var imglist=[imgGuid];
 		 return (
 		 		React.createElement("div", null, 
 		 		
 		 		 React.createElement(AMR_ButtonToolbar, null, 
 		 	    React.createElement(AMR_Button, {amStyle: "secondary", onClick: ajax_myclass_students_edit.bind(this,o.uuid)}, "修改学生")
 		 	    ), 
 			    React.createElement(AMUIReact.List, {static: true, border: true, striped: true}, 
 			      React.createElement(Common_mg_big_fn, {imgsList: imglist}), 				  
 				  React.createElement("br", null), 
 			      React.createElement(AMUIReact.ListItem, {icon: "mobile"}, "姓名:", o.name), 
 			      React.createElement(AMUIReact.ListItem, null, "昵称:", o.nickname), 
 			      React.createElement(AMUIReact.ListItem, null, "性别:", Vo.get("sex_"+o.sex)), 
 			      React.createElement(AMUIReact.ListItem, null, "出生日期:", o.birthday), 
 			      React.createElement(AMUIReact.ListItem, null, "妈妈姓名:", o.ma_name), 
 			      React.createElement(Class_student_Tel_ListItem, {name: "妈妈电话", tel: o.ma_tel}), 
 			      React.createElement(AMUIReact.ListItem, null, "妈妈的工作:", o.ma_work), 
 			      React.createElement(AMUIReact.ListItem, null, "爸爸姓名:", o.ba_name), 
 			      React.createElement(AMUIReact.ListItem, null, "爸爸的工作:", o.ba_work), 
 			      React.createElement(Class_student_Tel_ListItem, {name: "爸爸电话", tel: o.ba_tel}), 
 			      React.createElement(AMUIReact.ListItem, null, "家庭住址:", o.address), 
 			      React.createElement(Class_student_Tel_ListItem, {name: "爷爷电话", tel: o.ye_tel}), 
 			      React.createElement(Class_student_Tel_ListItem, {name: "奶奶电话", tel: o.nai_tel}), 
 			      React.createElement(Class_student_Tel_ListItem, {name: "外公电话", tel: o.waigong_tel}), 
 			      React.createElement(Class_student_Tel_ListItem, {name: "外婆电话", tel: o.waipo_tel}), 
 			      React.createElement(Class_student_Tel_ListItem, {name: "其他电话", tel: o.other_tel}), 
 			      React.createElement(AMUIReact.ListItem, null, 
 			      React.createElement("div", {dangerouslySetInnerHTML: {__html:G_textToHTML("说明:"+o.note)}})
 			      )			      
 			      
 			      )
 		 	     ) 
 		     );
 	        }
 		 });

 //我的班级模块-列表学生名字-详细信息一键拨号公用是否显示组件
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
  * <我的班级>管理学生-创建学生/学生列表名字详情-修改学生（均在用此段代码块）
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
   	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
   	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
    return (
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
 		           )


					  )
					 )
					), 



 		 		   React.createElement(AMUIReact.Input, {type: "textarea", 
 			 	 	      label: "说明", 
 			 	 	    	 name: "note", 
 			 	 	      labelClassName: "am-u-sm-2", 
 			 	 	      placeholder: "备注", 
 			 	 	      wrapperClassName: "am-u-sm-10", 
 			 	 	      amSize: "lg"}), 
 		 		      
 				      React.createElement("button", {type: "button", onClick: btn_ajax_myclass_student_save, className: "am-btn am-btn-primary"}, "提交")		      
    		           )
    		          ) 	   		          
                );
                }
   });

//****************************************************************




//*********************我的班级模块-管理学生详情绘制相关代码********************* 
/*
 * 我的班级-管理学生
 * */
	var My_adminStudent = React.createClass({displayName: "My_adminStudent",  
	  isSousuoFlag:false,
	  isAddStudentFlag:false,
	  addStudent_btn:function(){
		  $("#editClassStudentForm").show();
		  this.isAddStudentFlag=true;
		  this.setState(this.state);
	  },
	  Sousuo_btn:function(){
		  $("#editClassStudentForm").hide();
		  this.ajax_queryByNameOrTel();
	  },
	  ajax_queryByNameOrTel:function(){
		  var classuuid=this.props.formdata.classuuid;
		//查询学生根据IDpxstudent_queryByNameOrTel_div绘制
			$.AMUI.progress.start();
		    var url = hostUrl + "rest/pxstudent/queryByNameOrTel.json";
			$.ajax({
				type : "GET",
				url : url,
				data:{name:$('#sutdent_name').val()},
				dataType : "json",
				 async: true,
				success : function(data) {
					$.AMUI.progress.done();
					if (data.ResMsg.status == "success") {						
						React.render(React.createElement(Query_adminStudent_list_byRight,{	
							classuuid:classuuid,
							events:data.list.data
							}), document.getElementById('pxstudent_queryByNameOrTel_div'));

					} else {
						alert("加载数据失败："+data.ResMsg.message);
					}
				},
				error :G_ajax_error_fn
			});		
	  },
	  ajax_deleteStudentClass:function(class_uuid,student_uuid){
			if(!confirm("确定要删除吗?")){
				return;
			}
				$.AMUI.progress.start();
			    var url = hostUrl + "rest/pxstudent/deleteStudentClass.json";
				$.ajax({
					type : "POST",
					url : url,
					data:{class_uuid:class_uuid,student_uuid:student_uuid},
					dataType : "json",
					 async: true,
					success : function(data) {
						$.AMUI.progress.done();
						if (data.ResMsg.status == "success") {						
							G_msg_pop(data.ResMsg.message);
							add_studentsByData({classuuid:class_uuid});
							//Store.clearChooseClass();
							//Store.setMyClassList(null);
							//Queue.doBackFN();
						} else {
							alert("加载数据失败："+data.ResMsg.message);
						}
					},
					error :G_ajax_error_fn
				});		
		  },
	render: function() {
		var thit=this;
		 var addStudent=(React.createElement("div", null));
		 var addText=(React.createElement("div", null));
		 if(this.props.events.length!=0){
			 addText=(   
			 React.createElement("legend", null, Store.getClassByUuid(this.props.formdata.classuuid).name) 
			 )
		 }else{
			 addText=(   
			 React.createElement("legend", null, Store.getClassByUuid(this.props.formdata.classuuid).name+"(该班级暂无学生请添加新生)")  
		     )
		 }
		 if(this.isAddStudentFlag){
			 addStudent=(
					 React.createElement(Mycalss_student_edit, {formdata: this.props.formdata})
				  );
		        }
		
	return (
	React.createElement("div", null, 
		React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list17}), 
	      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
	      React.createElement(AMR_Panel, null, 
	      React.createElement(AMR_ButtonToolbar, null, 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "输入搜索姓名或号码"})
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("button", {type: "button", onClick: this.Sousuo_btn.bind(this), className: "am-btn am-btn-secondary"}, "搜索")		  		  
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("button", {type: "button", onClick: this.addStudent_btn.bind(this), className: "am-btn am-btn-secondary"}, "创建")		  		  
		  )
		  )
		  ), 
		  addText, 	
	      addStudent
		  ), 
		  
		  
		  React.createElement("div", {id: "pxstudent_queryByNameOrTel_div"}), 
			this.props.events.map(function(event) {
				  return(
				  	 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 				  	
				  	  React.createElement(AMR_Button, {amSize: "xs", className: "am-hide-sm", amStyle: "danger", onClick: thit.ajax_deleteStudentClass.bind(this,thit.props.formdata.classuuid,event.uuid)}, event.name)
				  	)  			  	  
				  )})

	  )
	);
	}
	});
 
 /*
   *我的班级-管理学生- 搜索功能出来的学生列表服务器请求后绘制处理方法；
   * */
  var Query_adminStudent_list_byRight = React.createClass({displayName: "Query_adminStudent_list_byRight",
	
  render: function() {
	    var classuuid=this.props.classuuid;
      return ( 		  
      React.createElement("div", null, 
  	   React.createElement("div", {className: "am-form-group"}, 
  	    React.createElement("hr", null)	 
  	     ), 

        React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "姓名"), 
              React.createElement("th", null, "性别"), 
              React.createElement("th", null, "出生日期"), 
              React.createElement("th", null, "妈妈电话"), 
              React.createElement("th", null, "爸爸电话"), 
              React.createElement("th", null, "身份证")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.events.map(function(event) {
              return (React.createElement(Query_adminStudent_EventRow_byRight, {classuuid: classuuid, key: event.id, event: event}));
            })
          )
        )
        )
      );
    }
  });
      
  /*  	
   * 我的班级-管理学生-学生列表绘制详细内容;
   * @点击后直接调用学生详情方法
   * 调用ajax_class_students_look_info
   * 进入前btn_students_list_click按钮事件内添加Queue.push保证回退正常;
   * */
  var Query_adminStudent_EventRow_byRight = React.createClass({displayName: "Query_adminStudent_EventRow_byRight", 
  	btn_students_list_click:function(classuuid,uuid){
  		add_StudentClass(classuuid,uuid);
  	},
  	  render: function() {
		

  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';
  	    return (
  	      React.createElement("tr", {className: className}, 
  	        React.createElement("td", null, event.name, " ", React.createElement(AMUIReact.Button, {onClick: this.btn_students_list_click.bind(this,this.props.classuuid,event.uuid), amStyle: "secondary"}, "添加")), 
  	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
  	        React.createElement("td", null, event.birthday), 
  	        React.createElement("td", null, event.ma_tel), 
  	        React.createElement("td", null, event.ba_tel), 
  	        React.createElement("td", null, event.idcard)
  	      ) 
  	    );
  	  }
  	}); 
//****************************************************************

   
   
   

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
		  var re_data=ajax_help_px_list(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
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
   //收藏按钮方法;
   favorites_push: function(title,type,reluuid,url) {
   	commons_ajax_favorites_push(title,type,reluuid,url)
   }, 
   render: function() {
   	  var o = this.props.data;
   return (
   		  React.createElement("div", null, 
   		  React.createElement(AMUIReact.Article, {
   		    title: o.title, 
   		    meta: Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}, 
   			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.message}})
   		     ), 
   		     React.createElement(AMR_ButtonToolbar, null, 
   		     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid)}, "收藏"), 
   		     React.createElement(AMR_Button, {className: G_CallPhoneFN.canShareUrl()?"":"am-hide", amStyle: "primary", onClick: G_CallPhoneFN.setShareContent.bind(this,o.title,o.title,null,this.props.share_url)}, "分享")
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
   //±±±±±±±±±±±±±±±±±±±±±±±±±±±   

   
 //——————————————————————————咨询记录<绘制>—————————————————————  

   /* 
    * <咨询记录>绘制舞台
    * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
    * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
    * @btn_click_announce:点击按钮事件跳转kd_servise方法;
    * */
   var zixun_px_Div_list = React.createClass({displayName: "zixun_px_Div_list", 
   	load_more_btn_id:"load_more_",
   	pageNo:1,
   	classnewsreply_list_div:"am-list-news-bd",
     getInitialState: function() {
		return {groupuuid:this.props.groupuuid};
	  },
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
		G_mygroup_choose=$("input[name='group_uuid']").val();
		  var re_data=ajax_zixun_px_list(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);
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
		 React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list16}), 
		 React.createElement(AMR_ButtonToolbar, null, 
   		  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.refresh_data.bind(this), data: this.props.grouplist, btnStyle: "primary", value: G_mygroup_choose})
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
    *<咨询记录>表格内容绘制
    * */
   var Px_zixunlist_div = React.createClass({displayName: "Px_zixunlist_div", 
   	  render: function() {
   	    var event = this.props.events;
   	    var className = event.highlight ? 'am-active' :
       event.disabled ? 'am-disabled' : '';
		var totalCount_div=null;
		if( this.props.events.pageNo=="1"){
				totalCount_div=( React.createElement("h6", null, "总条数:"+this.props.events.totalCount));	
		}
   	    return (
			React.createElement("div", null, 
			
			totalCount_div, 
			 React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
			  React.createElement("th", null, "咨询对象"), 
              React.createElement("th", null, "姓名"), 
              React.createElement("th", null, "电话"), 
              React.createElement("th", null, "咨询时间")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.events.data.map(function(event) {
              return (
				  React.createElement("tr", null, 
					React.createElement("td", null, event.ext_context, " "), 
					React.createElement("td", null, " ", event.tel_name), 			
					React.createElement("td", null, "  ", React.createElement("a", {href: "tel:"+event.tel}, event.tel, " "), " "), 
					React.createElement("td", null, event.create_time)
					
				  ) 
			  );
            })
          )
        )
)

   	    	     		  
   	    	  );
   }
   }); 
   //±±±±±±±±±±±±±±±±±±±±±±±±±±± 
   

//——————————————————————————对外校务管理<校园列表绘制>—————————————————————   
/*
 *(对外校务管理)<校园列表>列表框绘制 ;
 *@handleClick:绑定的事件根据M来区分点击事件并做处理；
 *@add:添加分校;
 *@edit:编辑分校;
 *@btn_click_group ：在kd_service
 *@取消校园介绍；增加预览按钮
 * */
var Group_EventsTable_byRight_px = React.createClass({displayName: "Group_EventsTable_byRight_px",
	handleClick: function(m) {
			btn_click_group_byRight_px(m,{type:G_group_type});
	  },
  render: function() {
    return (
    React.createElement("div", null, 
     React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list2}), 
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
            return (React.createElement(Group_EventRow_byRight_px, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});

/*
 *(对外校务管理)<校园列表>学校内容绘制 ;
 *@handleClick:绑定的事件根据M来区分点击事件并做处理；
 *@btn_click_group ：在kd_service；
 * */
var Group_EventRow_byRight_px = React.createClass({displayName: "Group_EventRow_byRight_px", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';
    return (
      React.createElement("tr", {className: className}, 
      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: btn_click_group_byRight_px.bind(this,"edit", event)}, event.brand_name)), 
         React.createElement("td", null, 
    	React.createElement(AMR_Button, {amStyle: "secondary", onClick: btn_click_group_byRight_px.bind(this,"show",event)}, "预览")
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
 *(对外校务管理)<预览按钮>绘制 ;
 * */
  var Group_show_byRight_px = React.createClass({displayName: "Group_show_byRight_px", 
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
 *(对外校务管理)<校园列表>添加分校和编辑详情绘制界面；
 *@componentDidMount：图片处理方法 
 *@ajax_group_save:提交按钮详情在kd_service
 * */    
var Group_edit_byRight_px = React.createClass({displayName: "Group_edit_byRight_px", 
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
                editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
          });
	},
	   /*
	    * (对外校务管理)<校园列表>内上传LOGO图片
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
	  var one_classDiv="am-u-lg-4 am-u-md-4 am-u-sm-12 am-form-label";
	  var two_classDiv="am-u-lg-8 am-u-md-8 am-u-sm-12";
	  	  var header_img=G_imgPath+o.img;
	  if(!o.img)header_img=G_def_noImgPath;
    return (
React.createElement("div", null, 

  React.createElement("div", {className: " am-u-md-6 am-u-sm-12"}, 
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
    	       React.createElement(PxInput, {type: "text", name: "brand_name", id: "brand_name", value: o.brand_name, onChange: this.handleChange, placeholder: "不超过45位"})
    	        ), 		
    	       React.createElement("label", {className: one_classDiv }, "机构全称:"), 
    		  React.createElement("div", {className: two_classDiv }, 
    	     React.createElement(PxInput, {type: "text", name: "company_name", id: "company_name", value: o.company_name, onChange: this.handleChange, placeholder: "不超过45位"})
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
		   React.createElement("label", {className: one_classDiv }, "摘要:"), 
    		 React.createElement("div", {className: two_classDiv }, 
    	      React.createElement(PxInput, {type: "text", name: "summary", id: "summary", value: o.summary, onChange: this.handleChange, placeholder: ""})
    	       ), 	
    	     React.createElement("label", {className: one_classDiv }, "学校地址:"), 
    		  React.createElement("div", {className: two_classDiv }, 
    	       React.createElement(PxInput, {icon: "university", type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: "不超过64位"})
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
    	      React.createElement(AMR_Input, {id: "description", type: "textarea", rows: "50", label: "校园介绍:", placeholder: "校园介绍", name: "description", value: o.description, onChange: this.handleChange}), 
  		  	  G_get_upload_img_Div(), 
  	          React.createElement("button", {type: "button", onClick: ajax_group_save_byRight_px, className: "am-btn am-btn-primary"}, "提交")
	    	 )
    		)	   
       ), 	

   React.createElement("div", {className: " am-u-md-6 am-u-sm-12"}, 
	React.createElement(AMUIReact.Image, {id: "img_head_image2", src: hostUrlCDN+"i/dyjigou.png", className: "G_img_header2"})
   )

)
    		
    );
  }
});
//±±±±±±±±±±±±±±±±±±±±±±±±±±±


   
 //——————————————————————————优惠活动<绘制>—————————————————————  

   /* 
    * <优惠活动>绘制舞台
    * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
    * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
    * @btn_click_announce:点击按钮事件跳转kd_servise方法;
    * */
   var Preferential_px_Div_list = React.createClass({displayName: "Preferential_px_Div_list", 
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
		  var re_data=ajax_Preferential_px_list(this.classnewsreply_list_div+this.pageNo,this.pageNo,$("input[name='group_uuid']").val(),callback);
   	},
   	refresh_data:function(){
//   		classnewsreply_list_div 清除；
//         load_more_data	重新绘制DIV；
   		this.forceUpdate();
   		this.pageNo=1;
   		$("#"+this.classnewsreply_list_div).html("");
		G_mygroup_choose=$("input[name='group_uuid']").val();
   		this.load_more_data();
   		
   	},
	//创建优惠活动、编辑与删除、点击按钮事件跳转kd_servise方法;
	handleClick_box_btn:function(m){
		if(m=="add"){
		 btnclick_Preferential_announce(m,null,G_mygroup_choose);
		 return;
		};
     var uuid="";
            $($("input[name='table_checkbox']")).each(function(){					
					 if(this.checked){
						 if(!uuid){
							 uuid=this.value;
						  }else{
							 uuid+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
						 }						
					 }
					});
				  if(!uuid){
					  alert("亲,请勾选一个优惠活动！");
					  return;
				  }
		if(uuid.indexOf(",")>=0){
			alert("亲,只选择一个优惠活动做操作");
			return;
		};
		if(m=="edit"){
		 btnclick_Preferential_announce(m,uuid);
		}else if(m=="del"){
		 btnclick_Preferential_announce(m,uuid);
		};
 },
	 handleChange_checkbox_all:function(){
	  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
 },
   render: function() {
   	this.load_more_btn_id="load_more_"+this.props.uuid;
     return (			
   		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
   		  React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list4}), 
		   React.createElement(AMR_Panel, null, 
		   React.createElement(AMR_ButtonToolbar, null, 
		 	React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		    React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.refresh_data.bind(this), btnWidth: "200", data: this.props.groupList, btnStyle: "primary", value: G_mygroup_choose})
		    ), 
		    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick_box_btn.bind(this,"add")}, "创建优惠活动")
            ), 
		    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick_box_btn.bind(this,"edit")}, "编辑")
            ), 
		    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
   		    React.createElement(AMR_Button, {amStyle: "danger", onClick: this.handleClick_box_btn.bind(this,"del")}, "删除")
		    )
		    )
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
    *<优惠活动>表格内容绘制
    * 在kd_react；
    * */
   var Px_Preferentiallist_div = React.createClass({displayName: "Px_Preferentiallist_div", 
   	  render: function() {
   	   var events = this.props.events;
   	    var className = events.highlight ? 'am-active' :
       events.disabled ? 'am-disabled' : '';
   	    return (
   	    	   React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
		    	 React.createElement("tr", null, 			      
		         React.createElement("th", null, 
                 React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
                 ), 
	            
		          React.createElement("th", null, "标题"), 
				  React.createElement("th", null, "浏览次数"), 
		          React.createElement("th", null, "活动开始时间"), 
	              React.createElement("th", null, "活动结束时间"), 
				  React.createElement("th", null, "学校"), 
				  React.createElement("th", null, "创建时间"), 
				  React.createElement("th", null, "创建人")
	              ), 	
   	    			 events.data.map(function(event) {        
	    			      return (
	    			    	      React.createElement("tr", {className: className}, 
							        React.createElement("td", null, 
	                                React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
	                                ), 
							      
                                    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: react_px_Preferential_show.bind(this,event.uuid,event.title)}, 
   	    			  		        event.title
   	    			  		        )), 
										 React.createElement("td", null, event.count), 
	    			    	        React.createElement("td", null, event.start_time), 
	    			                React.createElement("td", null, event.end_time), 
									React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 
										  React.createElement("td", null, event.create_time), 
	      React.createElement("td", null, event.create_user)
	    			    	      ) 
	    			    		  )
	    			         })	
   	    	     )	  		  
   	    	  );
   }
   }); 



     




   /*
   *优惠活动点赞、评论、加载更多等详情绘制模板；
   * */
   var Announcements_Preferentialshow = React.createClass({displayName: "Announcements_Preferentialshow", 
   //收藏按钮方法;
   favorites_push: function(title,type,reluuid,url) {
   	commons_ajax_favorites_push(title,type,reluuid,url)
   }, 
  	//优惠活动、编辑与删除点击按钮事件跳转kd_servise方法;
	handleClick: function(m,groupuuid,uuid) {
		btnclick_Preferential_announce(m,groupuuid,uuid);
}, 
   render: function() {
   	  var o = this.props.data;

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
   		     React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)}, "编辑"), 
   		     React.createElement(AMR_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.groupuuid,o.uuid)}, "删除"), 
   		     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid)}, "收藏"), 
   		     React.createElement(AMR_Button, {className: G_CallPhoneFN.canShareUrl()?"":"am-hide", amStyle: "primary", onClick: G_CallPhoneFN.setShareContent.bind(this,o.title,o.title,null,this.props.share_url)}, "分享")
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
* (优惠活动)创建与编辑界面绘制；
* @w_img_upload_nocut:上传图片后发的请求刷新;
* */    
   var Preferential_edit = React.createClass({displayName: "Preferential_edit", 
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
		
		var o=$('#editAnnouncementsForm').serializeJson();
			   o.start_time=start_timeStr;
			   o.end_time=end_timeStr;
				 w_img_upload_nocut.groupuuid=o.groupuuid;
			    this.setState(o);
  },
  componentDidMount:function(){
  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
  this.editor=editor;
         w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
               editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
             });

	 w_img_upload_nocut.groupuuid=this.state.groupuuid;
   	  },
 preview_fn:function(){
          G_html_preview("t_iframe", this.state.url,this.editor.getSource(),this.state.title);
       }, 
   render: function() {
   	 var o = this.state;
	  var one_classDiv="am-u-lg-4 am-u-md-4 am-u-sm-12 am-form-label";
	  var two_classDiv="am-u-lg-8 am-u-md-8 am-u-sm-12";
 return (
	 
        React.createElement("div", null, 

		  React.createElement("div", {className: " am-u-md-6 am-u-sm-12"}, 

		React.createElement("form", {id: "editAnnouncementsForm", method: "post", className: "am-form"}, 
	 	 React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
	 	  React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
	 	   React.createElement("input", {type: "hidden", name: "isimportant", value: o.isimportant}), 	
            React.createElement("hr", null), 
	   
 		 React.createElement("div", {className: "am-form-group am-u-sm-12"}, 
 	       React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid})		          
            ), 

		  React.createElement("label", {className: one_classDiv}, "开始时间："), 
			   React.createElement("div", {className: two_classDiv}, 
				 React.createElement(AMUIReact.DateTimeInput, {format: "YYYY-MM-DD", inline: true, name: "start_timeStr", id: "start_timeStr", dateTime: this.state.start_time, onChange: this.handleChange})
  	       ), 

			React.createElement("label", {className: one_classDiv}, "结束时间："), 
			   React.createElement("div", {className: two_classDiv}, 
				  React.createElement(AMUIReact.DateTimeInput, {format: "YYYY-MM-DD", inline: true, name: "end_timeStr", id: "end_timeStr", dateTime: this.state.end_time, onChange: this.handleChange})
  			    ), 
		
			 React.createElement("label", {className: one_classDiv}, "标题:"), 
			   React.createElement("div", {className: two_classDiv}, 
				React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxLength: "128", placeholder: "不超过128位"})
			     ), 
	
		 	React.createElement("label", {className: one_classDiv}, "分享链接(链接和内容选填一个):"), 
			   React.createElement("div", {className: two_classDiv}, 
				React.createElement("input", {type: "text", name: "url", id: "url", value: o.url, onChange: this.handleChange_url, maxLength: "256", placeholder: "可直接使用外部内容的链接地址显示"})
			     ), 

			 React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "优惠活动详细内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
 		  
				G_get_upload_img_Div(), 
			 React.createElement("button", {type: "button", onClick: ajax_Preferential_save, className: "am-btn am-btn-primary"}, "提交"), 				      					  
		  React.createElement("button", {type: "button", onClick: this.preview_fn.bind(this), className: "am-btn am-btn-primary"}, "预览")
	  )	 
		   ), 	

  React.createElement("div", {className: "am-u-lg-6 am-u-sm-12 "}, 
               React.createElement(G_phone_iframe, null)
             )

		)
     );
   }
   });       
   //±±±±±±±±±±±±±±±±±±±±±±±±±±± 
   
   

   
   
   
   
   
 //——————————————————————————<发布对外老师资料>老师资料<管理模块绘制>——————————————————————————  
   
   /*
    * <老师资料>建立舞台;
    * */
   var Teacher_div = React.createClass({displayName: "Teacher_div", 
   	load_more_btn_id:"load_more_",
   	pageNo:1,
   	classnewsreply_list_div:"am-list-news-bd",
    getInitialState: function() {
		return {groupuuid:this.props.groupuuid};
	  },
   	componentWillReceiveProps:function(){
   		this.refresh_data();
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
			G_mygroup_choose=$("input[name='group_uuid']").val();
     var re_data=ajax_teacher_listByGroup_byRight(this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);		  
   	},
   	refresh_data:function(){
//   		classnewsreply_list_div 清除；
//         load_more_data	重新绘制DIV；
   		this.forceUpdate();
   		this.pageNo=1;
   		$("#"+this.classnewsreply_list_div).html("");
   		this.load_more_data();
   		
   	},
   	 handleChange_button: function(groupuuid) {
   		px_teacher_onClick_byRight("add",{groupuuid:groupuuid,uuid:null});
   	  },
  	 handleChange_box_btn: function() {
		  var uuid="";
            $($("input[name='table_checkbox']")).each(function(){					
					 if(this.checked){
						 if(!uuid){
							 uuid=this.value;
						  }else{
							 uuid+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
						 }						
					 }
					});
				  if(!uuid){
					  alert("亲,请勾选一个老师！");
					  return;
				  }
		if(uuid.indexOf(",")>=0){
			alert("亲,只选择一个老师做操作");
			return;
		}
		 $.AMUI.progress.start();
 			var url = hostUrl + "rest/pxteacher/"+uuid+".json";
 			$.ajax({
 				type : "GET",
 				url : url,
 				dataType : "json",
 				success : function(data) {
 					$.AMUI.progress.done();
 					if (data.ResMsg.status == "success") {
					 px_teacher_onClick_byRight("eit",data.data);
 					} else {
 						alert(data.ResMsg.message);
 						G_resMsg_filter(data.ResMsg);
 					}
 				}
 			});	 		
 	 	  },
 handleChange_checkbox_all:function(){
	  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
 },
   render: function() {
   	this.load_more_btn_id="load_more_"+this.props.uuid;
     return (			
   		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		 React.createElement(G_px_help_List, {data: G_px_help_msg.msg_px_help_list5}), 
   		  React.createElement(AMR_Panel, null, 
   		  React.createElement(AMR_ButtonToolbar, null, 
   		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
   		  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.refresh_data.bind(this), data: this.props.grouplist, btnStyle: "primary", value: G_mygroup_choose})
   		  ), 
   		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
          React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleChange_button.bind(this,$("input[name='group_uuid']").val())}, "新增资料")
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
          React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleChange_box_btn.bind(this)}, "修改")
		  )
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
* 老师资料表单详情内容绘制;
* */
var Teacher_EventsTable_byRight = React.createClass({displayName: "Teacher_EventsTable_byRight", 
	  render: function() {
	    var event = this.props.events;
	    var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';
	    return (
	    		  React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 
		    	 React.createElement("tr", null, 
				   React.createElement("th", null, 
                  React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
                  ), 
	              React.createElement("th", null, "姓名"), 
				  React.createElement("th", null, "发布状态"), 
	              React.createElement("th", null, "教授课程"), 
	              React.createElement("th", null, "星级"), 
	              React.createElement("th", null, "简介"), 
	              React.createElement("th", null, "更新时间")
	            ), 			 
	    			  this.props.events.map(function(event) {        
			                var txtclasssName;
						if(event.status==0){
						     txtclasssName="am-text-success";
						  }else{
						     txtclasssName="am-text-danger";
						   }
	    			      return (
	    			    	      React.createElement("tr", {className: className}, 
							        React.createElement("td", null, 
	                                React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
	                                ), 
	    			     	  	    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: px_ajax_teacher_look_info.bind(this,event.uuid)}, event.name)), 
							  	    React.createElement("td", {className: txtclasssName}, Vo.get("course_status_"+event.status)), 
									React.createElement("td", null, event.course_title), 
	    			    	        React.createElement("td", null, event.ct_stars), 
	    			    	        React.createElement("td", null, event.summary), 
	    			                React.createElement("td", null, event.update_time)
	    			    	      ) 
	    			    		  )
	    			         })	
	    			  )		  
	    	  );
}
}); 


/*发布对外资料查看老师详情
 * */
var Teacher_look_info =React.createClass({displayName: "Teacher_look_info",
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editClassStudentForm').serializeJson());
	  },
	  componentDidMount:function(){

		},
		render: function() {
	     var o =this.state;
	     var imgGuid=o.img;
		 if(!o.img)imgGuid=G_def_noImgPath;
	     var imglist=[imgGuid];
		 return (
		 		React.createElement("div", null, 
		 		
			    React.createElement(AMUIReact.List, {static: true, border: true, striped: true}, 
			      React.createElement(Common_mg_big_fn, {imgsList: imglist}), 				  
				  React.createElement("br", null), 	      
			      
			          React.createElement(AMUIReact.ListItem, null, "老师姓名:", o.name), 
			         React.createElement(AMUIReact.ListItem, null, "教授课程:", o.course_title), 
			        React.createElement(AMUIReact.ListItem, null, "星级:", o.ct_stars), 
			       React.createElement(AMUIReact.ListItem, null, "简介:", o.summary), 
			      React.createElement(AMUIReact.ListItem, null, "发布状态:", Vo.get("course_status_"+o.status)), 			      
			     React.createElement(AMUIReact.ListItem, null, "更新时间:", o.update_time), 
			    React.createElement(AMUIReact.ListItem, null, "老师介绍详细内容:", 
	 			React.createElement("div", {dangerouslySetInnerHTML: {__html:o.content}})
				)		 			       			      
			 )		
		    ) 
		     );
	        }
		 }); 






//发布对外资料添加与编辑绘制
var Px_teacher_edit = React.createClass({displayName: "Px_teacher_edit", 
	 getInitialState: function() {
		 this.props.formdata.groupList=this.props.groupList;
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		   
			var o=$('#editTeacherForm').serializeJson();
	
			w_img_upload_nocut.groupuuid=o.groupuuid;
			  
   		    this.setState(o);

	  },
	  componentDidMount:function(){
		  var editor = $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
		  this.editor=editor;
	        w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
	              editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
	        });
				w_img_upload_nocut.groupuuid=this.state.groupuuid;
				  
			 

     },
		  preview_fn:function(){
          G_html_preview("t_iframe", null,this.editor.getSource(),this.state.name);
       }, 
	   /*
	    * (发布资料)内上传LOGO图片
	    * */
  btn_class_group_uploadHeadere :function(){      
      w_uploadImg.open(function (guid){
           $ ("#img").val(guid);
            $("#img_head_image").attr("src",G_imgPath+ guid);
            G_img_down404("#img_head_image");
	         });   
		
	   },
  w_ch_user_open_callback :function(useruuids,usernames,groupuuid){
		 //寻找对象中的符号;
		var uuid_indexof=useruuids.indexOf(",");
		if(uuid_indexof>=0){
			G_msg_pop("只能选择一名老师，请重新选择");
			return;
		}
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getBaseInfo.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {uuid:useruuids}, 
		dataType : "json", 
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				var img=data.data.img; 
		  if(img){
			$ ("#img").val(img);
			$("#img_head_image").attr("src",G_imgPath+ img);
			G_img_down404("#img_head_image");
				}
			
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg); 
			}
		},
		error : G_ajax_error_fn
	});

	   },
render: function() {
	  var o = this.state;
	   var one_classDiv="am-u-lg-4 am-u-md-4 am-u-sm-12 am-form-label";
	   var two_classDiv="am-u-lg-8 am-u-md-8 am-u-sm-12";
	   var course_type_list=G_selected_dataModelArray_byArray(Vo.getTypeList("course_type"),"key","val");
	   var course_status_list=G_selected_dataModelArray_byArray(Vo.getTypeList("course_status"),"key","val");
	   if(o.type==null&&course_type_list.length>0)o.type=course_type_list[0].value;
	   if(o.status==null)o.status=1;

	   var course_list=Store.getCourseList(o.groupuuid);
 	       course_list= G_selected_dataModelArray_byArray(Store.getCourseList(o.groupuuid),"uuid","title");
 	if(o.courseuuid==null&&course_list.length>0)o.courseuuid=course_list[0].value;
	  var header_img=G_imgPath+o.img;
	  if(!o.img)header_img=G_def_noImgPath;
return (
React.createElement("div", null, 

	React.createElement("div", {className: " am-u-md-6 am-u-sm-12"}, 
           React.createElement("form", {id: "editTeacherForm", method: "post", className: "am-form"}, 
			React.createElement(PxInput, {type: "hidden", name: "uuid", value: o.uuid}), 
		    React.createElement(PxInput, {type: "hidden", id: "img", name: "img", value: o.img, onChange: this.handleChange}), 
           React.createElement("hr", null), 
		   React.createElement("div", {className: "am-form-group"}, 
		React.createElement(AMR_ButtonToolbar, null, 
		    React.createElement("div", {className: "am-fl am-margin-bottom-sm"}, 
	 	  	 React.createElement(AMUIReact.Selected, {amSize: "xs", id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: o.groupList, btnStyle: "primary", value: o.groupuuid})		     
	          ), 	
		    React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 	
	        React.createElement(AMUIReact.Selected, {id: "type", name: "type", onChange: this.handleChange, btnWidth: "200", data: course_type_list, btnStyle: "primary", value: o.type+""})		     
	        ), 
		      React.createElement("div", {className: "am-fl am-margin-bottom-sm"}, 
	        React.createElement(AMUIReact.Selected, {id: "courseuuid", name: "courseuuid", multiple: true, onChange: this.handleChange, btnWidth: "200", data: course_list, btnStyle: "primary", value: o.courseuuid+""})		     
	      ), 
	       React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 		 	
	       React.createElement(AMUIReact.Selected, {id: "status", name: "status", onChange: this.handleChange, btnWidth: "200", data: course_status_list, btnStyle: "primary", value: o.status+""})		     
            )
	 	  	), 
	         React.createElement("hr", null), 
			React.createElement("div", null, 
           React.createElement(AMUIReact.Image, {id: "img_head_image", src: G_imgPath+o.img, className: "G_img_header"}), 
           React.createElement("button", {type: "button", onClick: this.btn_class_group_uploadHeadere, className: "am-btn am-btn-secondary "}, "上传头像")
           ), 
		       React.createElement("label", {className: one_classDiv}, "老师姓名:"), 
				 React.createElement(PxInput, {type: "hidden", name: "useruuid", id: "useruuid", value: o.useruuid, onChange: this.handleChange}), 
			     React.createElement("div", {className: two_classDiv}, 
				   React.createElement(PxInput, {type: "text", id: "name", name: "name", value: o.name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"useruuid","name",o.groupuuid,this.w_ch_user_open_callback), placeholder: ""})
			        ), 
			       
			    React.createElement("label", {className: one_classDiv}, "简介:"), 
			     React.createElement("div", {className: two_classDiv}, 
			       React.createElement(PxInput, {type: "text", name: "summary", id: "summary", maxLength: "45", placeholder: "45字以内", value: o.summary, onChange: this.handleChange})
			        ), 
			       
 			      React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "详细介绍:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange}), 
 					G_get_upload_img_Div(), 
	  		  
				      React.createElement("button", {type: "button", onClick: ajax_teacher_save_byRight, className: "am-btn am-btn-primary"}, "提交"), 
						    React.createElement("button", {type: "button", onClick: this.preview_fn.bind(this), className: "am-btn am-btn-primary"}, "预览")


				      )
		          )
     ), 	

		  React.createElement("div", {className: "am-u-lg-6 am-u-sm-12 "}, 
               React.createElement(G_phone_iframe, null)
             )
)

);
}
}); 

   //±±±±±±±±±±±±±±±±±±±±±±±±±±±  









////——————————————————————————<发布对外课程>发布课程<管理模块绘制>——————————————————————————  
///*
//* <发布课程>服务器请求后绘制处理方法；
//* 
//* */
//var px_rect_course_byRight = React.createClass({
//	 handleChange_button: function(groupuuid) {
//		px_course_onClick_byRight({groupuuid:groupuuid,uuid:null});
//	  },
//   handleChange_selectgroup_uuid: function(val) {
//		px_ajax_course_byRight(val);
//	  },
//render: function() {
//	 var o=this.props;
//   return (
//   <div>
//		 <G_px_help_List data={G_px_help_msg.msg_px_help_list3}/>
//		 <AMR_Panel>
//       <AMR_ButtonToolbar>
//			 <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		     <AMUIReact.Selected id="selectgroup_uuid1" name="class_uuid" onChange={this.handleChange_selectgroup_uuid.bind(this)} btnWidth="200" data={o.groupList} btnStyle="primary" value={o.groupuuid} />
//			 </div> 
//		     <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//	         <AMR_Button amSize="xs" amStyle="secondary" onClick={this.handleChange_button.bind(this,o.groupuuid)} >新增课程</AMR_Button>	
//			 </div> 
//		 </AMR_ButtonToolbar>
//		 </AMR_Panel>		 
//
//     <AMR_Table {...this.props}>  
//       <thead> 
//         <tr>
//           <th>标题</th>		     
//		     <th>操作</th>
//		     <th>发布状态</th>
//           <th>课程类型</th>
//           <th>上课地点</th>
//           <th>课程学时</th>
//           <th>收费价格</th>
//           <th>优惠价格</th>
//		     <th>班级数</th>
//		     <th>星级</th>
//		     <th>浏览次数</th>
//           <th>更新时间</th>
//         </tr> 
//       </thead>
//       <tbody>
//         {this.props.events.map(function(event) {
//           return (<Query_course_byRight key={event.id} event={event} groupuuid={o.groupuuid}/>);
//         })}
//       </tbody>
//     </AMR_Table>
//     </div>
//   );
// }
//});
///*  	
//* <发布课程>在表单上绘制详细内容;
//* */
//var Query_course_byRight = React.createClass({ 
//	 handleChange_button: function(m,uuid) {
//		 if(m=="addclass"){
//			  $.AMUI.progress.start();
//			var url = hostUrl + "rest/pxCourse/"+uuid+".json";
//			$.ajax({
//				type : "GET",
//				url : url,
//				dataType : "json",
//				success : function(data) {
//					$.AMUI.progress.done();
//					if (data.ResMsg.status == "success") {
//					data.data.uuid=null;
//					px_course_onClick_byRight(data.data);
//					} else {
//						alert(data.ResMsg.message);
//						G_resMsg_filter(data.ResMsg);
//					}
//				}
//			});		
//		   }else if(m=="eitclass"){
//			   $.AMUI.progress.start();
//			var url = hostUrl + "rest/pxCourse/"+uuid+".json";
//			$.ajax({
//				type : "GET",
//				url : url,
//				dataType : "json",
//				success : function(data) {
//					$.AMUI.progress.done();
//					if (data.ResMsg.status == "success") {
//					px_course_onClick_byRight(data.data);
//					 } else {
//						alert(data.ResMsg.message);
//						G_resMsg_filter(data.ResMsg);
//					}
//				}
//			});	
//		   
//		   }else if(m=="delete"){
//		     react_ajax_class_course_delete(this.props.groupuuid,uuid)
//		     }
//	 	  },
//	  render: function() {
//	    var event = this.props.event;
//	 	var className = event.highlight ? 'am-active' :
//	  	  event.disabled ? 'am-disabled' : '';
//      var txtclasssName;
//		 if(event.status==0){
//         txtclasssName="am-text-success";
//		  }else{
//         txtclasssName="am-text-danger";
//		   }
//	  	return (
//	  	  <tr className={className} >
//	  	    <td><a href="javascript:void(0);" onClick={px_ajax_class_course_look_info.bind(this,event.uuid)}>{event.title}</a></td>
//			  <td>
//			<AMR_ButtonToolbar>
//			<AMR_Button amSize="xs" amStyle="secondary" onClick={this.handleChange_button.bind(this,"eitclass",event.uuid)} >修改</AMR_Button>
//			<AMR_Button amSize="xs" amStyle="secondary" onClick={this.handleChange_button.bind(this,"addclass",event.uuid)} >复制课程</AMR_Button>
//			<AMR_Button amSize="xs" amStyle="danger" onClick={this.handleChange_button.bind(this,"delete",event.uuid)} >删除</AMR_Button>
//			</AMR_ButtonToolbar>
//			 </td>
//			<td className={txtclasssName}>{Vo.get("course_status_"+event.status)}</td>
//		    <td>{Vo.get("course_type_"+event.type)}</td>
//	  	    <td>{event.address}</td>
//	  	    <td>{event.schedule}</td>
//	  	    <td>{event.fees}</td>
//	  	    <td>{event.discountfees}</td>
//			 <td>{event.class_count}</td>
//          <G_rect_stars ct_stars={event.ct_stars}/>
//			<td>{event.count==null?0:event.count}</td>
//
//
//          <td>{event.updatetime}</td>
//	  	  </tr> 
//	    );
//	  }
//	}); 
//
///*发布课程中查看课程详情
//* */
//var Class_course_look_info =React.createClass({
//	 getInitialState: function() {
//		    return this.props.formdata;
//		  },
//	 handleChange: function(event) {
//		    this.setState($('#editClassStudentForm').serializeJson());
//	  },
//	  componentDidMount:function(){
//
//		},
//		render: function() {
//	     var o =this.state;
//	     var imgGuid=o.logo;
//	     var imglist=[imgGuid];
//		 return (
//		 		<div>
//		 		
//			    <AMUIReact.List static border striped>
//			      <Common_mg_big_fn  imgsList={imglist} />				  
//				  <br/>	      
//			      
//			         <AMUIReact.ListItem>标题:{o.title}</AMUIReact.ListItem>
//			        <AMUIReact.ListItem>课程类型:{Vo.get("course_type_"+o.type)}</AMUIReact.ListItem>
//			      <AMUIReact.ListItem>上课地点:{o.address}</AMUIReact.ListItem>
//			     <AMUIReact.ListItem>课程学时:{o.schedule}</AMUIReact.ListItem>
//			    <AMUIReact.ListItem>收费价格:{o.fees}</AMUIReact.ListItem>
//			   <AMUIReact.ListItem>优惠价格:{o.discountfees}</AMUIReact.ListItem>
//			  <AMUIReact.ListItem>更新时间:{o.updatetime}</AMUIReact.ListItem>
//			 <AMUIReact.ListItem>发布状态:{Vo.get("course_status_"+o.status)}</AMUIReact.ListItem> 			      
//			 <AMUIReact.ListItem>课程详细内容:
//	 			
//				</AMUIReact.ListItem>		 			       			      
//			 </AMUIReact.List> 	
//					<div dangerouslySetInnerHTML={{__html:o.context}}></div> 
//		    </div> 
//		     );
//	        }
//		 }); 
//
//
//
////发布课程添加与编辑绘制
//var Px_course_edit = React.createClass({ 
//	 getInitialState: function() {
//
//		 this.props.formdata.logo=this.props.logo;
//		 this.props.formdata.groupList=this.props.groupList;
//		    return this.props.formdata;
//		  },
//	 handleChange: function(event) {
//		    this.setState($('#editCourseForm').serializeJson());
//	  },
//	  componentDidMount:function(){
//		  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
//	        w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
//	              editor.pasteHTML( '<img width="100%"   src="'+imgurl+'"/>')
//	        });
//    },
//	   /*
//	    * (发布课程)内上传LOGO图片
//	    * */
// btn_class_group_uploadHeadere :function(){      
//     w_uploadImg.open(function (guid){
//          $ ("#logo").val(guid);
//          $("#img_head_image").attr("src",G_imgPath+ guid);
//          G_img_down404("#img_head_image");
//	         });   
//	   },
//	 handleChange_Selected: function(event) {
//		   //根据选择学校刷新LOGO 如果有的话
//	$.AMUI.progress.start();
//	var url = hostUrl + "rest/group/getBaseInfo.json";
//	$.ajax({
//		type : "GET",
//		url : url,
//		data : {uuid:event},
//		dataType : "json",
//		async: false,
//		success : function(data) {
//			$.AMUI.progress.done();
//			if (data.ResMsg.status == "success") {
//				var img=data.data.img;
//		  if(img){
//          $ ("#logo").val(img);
//          $("#img_head_image").attr("src",G_imgPath+ img);
//          G_img_down404("#img_head_image");
//				}			
//			} else {
//				alert(data.ResMsg.message);
//				G_resMsg_filter(data.ResMsg);
//			}
//		},
//		error : G_ajax_error_fn
//	});
//		    this.setState($('#editCourseForm').serializeJson());
//	  },
//render: function() {
//	  var o = this.state;
//	  if(!o.logo)o.logo=Store.getMyGroupByUuid(o.groupuuid).img;
//	  var one_classDiv="am-u-lg-4 am-u-md-4 am-u-sm-12 am-form-label";
//	  var two_classDiv="am-u-lg-8 am-u-md-8 am-u-sm-12";
//	   var course_type_list=G_selected_dataModelArray_byArray(Vo.getTypeList("course_type"),"key","val");
//	   var course_status_list=G_selected_dataModelArray_byArray(Vo.getTypeList("course_status"),"key","val");
//	   if(o.type==null&&course_type_list.length>0)o.type=course_type_list[0].value;
//	   if(o.status==null)o.status=1;
//return (
//		 <div>
//
//		  <div className=" am-u-md-6 am-u-sm-12">
//		  <form id="editCourseForm" method="post" className="am-form">
//			<PxInput type="hidden" name="uuid"  value={o.uuid}/>
//		     <PxInput type="hidden" name="groupuuid"  value={o.groupuuid}/>
//			       <PxInput type="hidden" name="logo" id="logo" value={o.logo} onChange={this.handleChange}/>
//			<div>
//		      <AMUIReact.Image  id="img_head_image"   src={G_imgPath+o.logo} className={"G_img_header"}/>
//             <button type="button"   onClick={this.btn_class_group_uploadHeadere}  className="am-btn am-btn-secondary">上传LOGO</button>
//
//
//        </div>
//        <hr/>
//		   <div className="am-form-group">
//           <div className="am-fl am-margin-bottom-sm ">
//	 	  	  <AMUIReact.Selected amSize="xs" id="groupuuid" name="groupuuid" onChange={this.handleChange_Selected}  multiple= {false} data={o.groupList} btnStyle="primary" value={o.groupuuid} />    		     
//	 	       </div>
//		      <div className="am-fl am-margin-bottom-sm am-margin-left-xs"> 
//		     <AMUIReact.Selected  id="type" name="type" onChange={this.handleChange}  data={course_type_list} btnStyle="primary" value={o.type+""} />    		     
//	 	    </div>  
//		     <AMUIReact.Selected  id="status" name="status" onChange={this.handleChange}  data={course_status_list} btnStyle="primary" value={o.status+""} />    		     
//
//	 	  	  <hr/>
//		       <label className={one_classDiv}>标题:</label>
//			     <div className={two_classDiv}>
//			       <PxInput  type="text" name="title" id="title" maxLength="20" value={o.title} onChange={this.handleChange}/>
//			        </div>
//		 	         
//		  		  
//
//			    <label className={one_classDiv}>上课地点:</label>
//			     <div className={two_classDiv}>
//			       <PxInput  type="text" name="address" id="address" maxLength="50" value={o.address} onChange={this.handleChange}/>
//			        </div>
//
//
//			    <label className={one_classDiv}>课程学时:</label>
//			     <div className={two_classDiv}>
//			       <PxInput  type="text" name="schedule" id="schedule" maxLength="20" value={o.schedule} onChange={this.handleChange}/>
//			        </div>
//
//			    <label className={one_classDiv}>收费价格:</label>
//			     <div className={two_classDiv}>
//			       <PxInput  type="text" name="fees" id="fees" maxLength="20" value={o.fees} onChange={this.handleChange}/>
//			        </div>
//
//			    <label className={one_classDiv}>优惠价格:</label>
//			     <div className={two_classDiv}>
//			       <PxInput  type="text" name="discountfees" id="discountfees" maxLength="20" value={o.discountfees} onChange={this.handleChange}/>
//			        </div>
//			       
//			      <AMR_Input id="announce_message" type="textarea" rows="10" label="课程详细内容:" placeholder="填写内容" name="context" value={o.context} onChange={this.handleChange}/>
//					{G_get_upload_img_Div()} 
//	  		  
//				      <button type="button"  onClick={ajax_course_save_byRight}  className="am-btn am-btn-primary">提交</button>
//					   </div>  
//		          </form> 
//		       </div>	
//
//		   <div  className=" am-u-md-6 am-u-sm-12">
//			<AMUIReact.Image  id="img_head_image2"   src={hostUrlCDN+"i/dykecheng.png"} className={"G_img_header2"}/>
//		   </div>
//
//		</div>
//);
//}
//}); 
////±±±±±±±±±±±±±±±±±±±±±±±±±±±  
