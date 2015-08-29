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



//幼儿园注册
var Div_kd_group_reg = React.createClass({displayName: "Div_kd_group_reg", 
	
	render: function() {
	return (
		React.createElement("div", null, 
			React.createElement("div", {className: "header"}, 
			  React.createElement("div", {className: "am-g"}, 
			    React.createElement("h1", null, "幼儿园注册")
			  ), 
			  React.createElement("hr", null)
			), 
			React.createElement("div", {className: "am-g"}, 
			  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
			    React.createElement("form", {id: "kd_group_reg_form", method: "post", className: "am-form"}, 
			    React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
			      React.createElement("label", {htmlFor: "brand_name"}, "品牌名:"), 
			      React.createElement("input", {type: "text", name: "brand_name", id: "brand_name", placeholder: "必填，不超过45位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "company_name"}, "机构全称:"), 
			      React.createElement("input", {type: "text", name: "company_name", id: "company_name", placeholder: "必填，不超过45位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "address"}, "公司地址:"), 
			      React.createElement("input", {type: "text", name: "address", id: "address", placeholder: "必填，不超过64位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "map_point"}, "地址坐标:"), 
			      React.createElement("input", {type: "text", name: "map_point", id: "map_point", placeholder: "拾取坐标后，复制到这里。格式：1.1,1.1"}), 
			      React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取"), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "link_tel"}, "公司电话:"), 
			      React.createElement("input", {type: "text", name: "link_tel", id: "link_tel", placeholder: ""}), 
			      React.createElement("br", null), 
			      
			      React.createElement("legend", null, React.createElement("b", null, "管理人员")), 
			     
			      React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
			      React.createElement("input", {type: "text", name: "tel", id: "tel", placeholder: ""}), 
			      React.createElement("br", null), 
			      React.createElement("label", {htmlFor: "name"}, "姓名:"), 
			      React.createElement("input", {type: "text", name: "name", id: "name", placeholder: "必填，不超过15位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: ""}, "Email:"), 
			      React.createElement("input", {type: "email", name: "email", id: "email", placeholder: "name@xx.com"}), 
			      React.createElement("br", null), 
			      React.createElement("label", {htmlFor: "password"}, "密码:"), 
			      React.createElement("input", {type: "password", name: "password", id: "password"}), 
			      React.createElement("br", null), 
			      
			      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
			      React.createElement("input", {type: "password", name: "password1", id: "password1"}), 
			      
			      React.createElement("br", null), 
			      React.createElement("button", {type: "button", onClick: ajax_kd_group_reg, className: "am-btn am-btn-primary"}, "注册"), 
			      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")
			     ), 
			    React.createElement("hr", null)
			  
			  )
			)
		)
	);
	}
}); 

/*
 *登录界面账号与密码输入绘制
 * <img src={hostUrl+"i/denglulogo.png"} width="100px" height="100px"/> 绘制图片
 * */
var Div_login = React.createClass({displayName: "Div_login", 
	 getInitialState: function() {
		    return this.props;
		  },
	 handleChange: function(event) {
		 var o=$('#login_form').serializeJson();
		 	o.pw_checked=$("#pw_checked").prop("checked")?"checked":"";
		    this.setState(o);
	  },
render: function() {
	  var o = this.state;
 return (
 		React.createElement("div", null, 
 		React.createElement("div", {className: "header"}, 
 		  React.createElement("div", {className: "am-g"}, 
 		 React.createElement("img", {src: hostUrl+"i/denglulogo.png", width: "100px", height: "100px"}), 
 		 React.createElement("h1", null, "问界互动家园")
 		  )
 		), 
 		React.createElement("div", {className: "am-g"}, 
 		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
 		 React.createElement("form", {id: "login_form", method: "post", className: "am-form"}, 
 	      React.createElement(PxInput, {icon: "mobile", type: "text", name: "loginname", id: "loginname", value: o.loginname, onChange: this.handleChange}), 
 	      React.createElement(PxInput, {icon: "lock", type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange}), 
 	      React.createElement("label", {htmlFor: "pw_checked"}, 
 	        React.createElement("input", {id: "pw_checked", name: "pw_checked", type: "checkbox", checked: o.pw_checked=="checked"?"checked":"", onChange: this.handleChange}), 
 	        "记住密码"
 	      ), 
 	      React.createElement("div", {className: "am-cf"}, 
 	        React.createElement("input", {id: "btn_login", onClick: ajax_userinfo_login, type: "button", name: "", value: "登 录", className: "am-btn am-btn-primary am-btn-sm am-fl"}), 
 	        React.createElement("input", {type: "button", onClick: menu_userinfo_updatePasswordBySms_fn, value: "忘记密码 ^_^? ", className: "am-btn am-btn-default am-btn-sm am-fr"})
 	      ), 
 	     React.createElement("div", {className: "am-cf am-margin-top-sm"}, 
 	      React.createElement("a", {href: "javascript:void(0);", onClick: menu_kd_group_reg_fn, className: "am-fl"}, "幼儿园注册"), 
 	     React.createElement("a", {href: "javascript:void(0);", onClick: menu_userinfo_reg_fn, className: "am-fr"}, "老师注册")
 	      ), 
 	     React.createElement("br", null)
 	    ), 
 	    React.createElement("hr", null), 
 	   React.createElement("p", null, "© 2015 成都问界科技有限公司  | 蜀ICP备15021053号-1")
 	     )
 	   )
 	   
 	   )
 );
}
}); 





 

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

//、、§§§§§§§§§§§§§§§§§§§§§§§§§§§
/*
 * 老师注册（绘制）
 * */
var Div_userinfo_reg = React.createClass({displayName: "Div_userinfo_reg", 
	
	render: function() {
	return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		    React.createElement("h1", null, "老师注册")
		  ), 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		    React.createElement("form", {id: "regform", method: "post", className: "am-form"}, 
		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
		        
		      React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
		      React.createElement("input", {type: "text", name: "tel", id: "tel", placeholder: ""}), 
		      React.createElement("br", null), 
		      React.createElement("button", {type: "button", onClick: ajax_sms_sendCode.bind(this,"#tel",1), className: "am-btn am-btn-primary"}, "发送验证码"), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "smscode"}, "验证码:"), 
		      React.createElement("input", {type: "text", name: "smscode", id: "smscode", placeholder: ""}), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "name"}, "姓名:"), 
		      React.createElement("input", {type: "text", name: "name", id: "name", placeholder: "必填，不超过15位"}), 
		      React.createElement("br", null), 
		       React.createElement("label", {htmlFor: ""}, "Email:"), 
		      React.createElement("input", {type: "email", name: "email", id: "email", placeholder: "输入邮箱", placeholder: ""}), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "password"}, "密码:"), 
		      React.createElement("input", {type: "password", name: "password", id: "password"}), 
		      React.createElement("br", null), 		      
		      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
		      React.createElement("input", {type: "password", name: "password1", id: "password1"}), 
		      React.createElement("br", null), 
		      
		      React.createElement("button", {type: "button", onClick: ajax_userinfo_reg, className: "am-btn am-btn-primary"}, "注册"), 
		      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")
		    ), 
		    React.createElement("hr", null)		  
		  )
		)
		)
	);
	}
}); 




























//——————————————————————————查看即时消息<绘制>——————————————————————————   
/* <查看即时消息>信息详情界面绘制；
 * @send_user：信息者名字；"即时消息"
 * */


var Message_queryMyTimely_myList =React.createClass({displayName: "Message_queryMyTimely_myList",	 
	render: function() {
		  return (
		    React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		      React.createElement("div", {className: "am-list-news-bd"}, 
		    	React.createElement("ul", {className: "am-list"}, 
				  this.props.formdata.data.map(function(event) {
					  return(							  										  
			    React.createElement("li", {className: "am-g am-list-item-dated"}, 
			  React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: this.ajax_State_style.bind(this,event.type,event.rel_uuid,event.group_uuid,1)}, 
			    event.title, "： ", event.message
			  ), 		
			    React.createElement("div", {className: "am-list-item-text"}, 
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
var Announcements_class_Div_list = React.createClass({displayName: "Announcements_class_Div_list", 
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
		var re_data=ajax_classs_Mygoodlist(this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(!re_data)return;
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}
		  
		  this.pageNo++;
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
	selectclass_uuid_val:null,
	handleClick: function(m) {
		if(m=="add"){
			 btn_click_classnews(m,{classuuid:this.selectclass_uuid_val});
			 return;
		 }else{
			 alert("跟着我左手右手一个慢动作，右手左手慢动作重播");
		 }
//		if(m=="edit"){			
//			 var uuids=null;
//			 $($("input[name='table_checkbox']")).each(function(){
//				
//				　if(this.checked){
//					 if(uuids==null)uuids=this.value;
//					 else
//					　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
//				　}
//				});
//			  if(!uuids){
//				  alert("请勾选复选框！");
//				  return;
//			  }
//			  if(!uuids&&uuids.indexOf(",")>-1){
//					alert("只能选择一个进行编辑！");
//					return;
//				}
//			  btn_click_classnews(m,{uuid:uuids});
//		 }
	  },
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		  React.createElement(AMUIReact.ButtonToolbar, null, 
		    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this,"add"), round: true}, "发布互动"), 
		    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this,"oth"), round: true}, "他人互动")
		    ), 
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
		  if(!o.dianzanList)o.dianzanList=[];
		  if(!o.imgsList)o.imgsList=[];
		  if(!o.create_img)G_def_headImgPath;
		  
	  return (
			  React.createElement("div", null, 
			  React.createElement("article", {className: "am-comment am-margin-xs"}, 
			  React.createElement("a", {href: "javascript:void(0);"}, 
			    React.createElement("img", {src: o.create_img, className: "am-comment-avatar", width: "48", height: "48"})
			  ), 

			  React.createElement("div", {className: "am-comment-main"}, 
			    React.createElement("header", {className: "am-comment-hd"}, 
			      React.createElement("div", {className: "am-comment-meta"}, 
			        React.createElement("a", {href: "javascript:void(0);", className: "am-comment-author"}, Store.getClassNameByUuid(o.classuuid), "|", o.create_user), 
			        "发表于 ", React.createElement("time", null, o.update_time)
			      )
			    ), 
			    React.createElement("div", {className: "am-comment-bd"}, 
			    React.createElement("div", {dangerouslySetInnerHTML: {__html:o.content}}), 
			    	React.createElement(Common_mg_big_fn, {imgsList: o.imgsList})
			    ), 
			    	React.createElement("footer", {className: "am-comment-footer"}, 
			    	React.createElement("div", {className: "am-comment-actions"}, 
			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"})), 
			    	React.createElement("a", {href: "javascript:void(0);", onClick: common_illegal.bind(this,99,o.uuid)}, "举报")
			    	)
			    	), 
			    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 0, btn_dianzan: "btn_dianzan_"+o.uuid}), 
			    	React.createElement("ul", {className: "am-comments-list"}, 
					  React.createElement(Classnews_reply_list, {uuid: o.uuid, type: 0, btn_reply: "btn_reply_"+o.uuid})
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
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"classnewsreply_list_div",
	
	
	componentDidMount:function(){
		var that=this;
		$("#"+this.props.btn_reply).bind("click",that.btn_reply_show.bind(that));
		this.load_more_data();
	},
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		var re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow);
		if(!re_data)return;
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
var Classnews_reply_list_listshow = React.createClass({displayName: "Classnews_reply_list_listshow", 	
render: function() {
return (
		  React.createElement("div", null, 
		  this.props.events.data.map(function(event) {
		      return (
		    		  React.createElement("li", {className: "am-comment"}, 
		    		  React.createElement("span", {className: "am-comment-author"}, event.create_user+":"), 
				        React.createElement("span", {dangerouslySetInnerHTML: {__html:event.content}})
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
			React.createElement("input", {type: "hidden", name: "type", value: this.props.uuid}), 						
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
		 var editor=$('#classnews_content').xheditor(xhEditor_upImgOption_emot);
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
		  React.createElement("form", {id: "editClassnewsForm", method: "post", className: "am-form"}, 
		  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "classuuid", onChange: this.handleChange_selectclass_uuid, btnWidth: "300", data: this.props.mycalsslist, btnStyle: "primary", value: o.classuuid}), 	      
			
		  React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
			React.createElement("input", {type: "hidden", name: "imgs", id: "imgs", value: o.imgs}), 			
		      React.createElement(AMR_Input, {id: "classnews_content", type: "textarea", rows: "3", label: "内容:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange}), 
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
		var re_data=ajax_announce_Mylist(this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(!re_data)return;
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}
		  
		  this.pageNo++;
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
  * */
var Announcements_show = React.createClass({displayName: "Announcements_show", 
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
return (
		  React.createElement("div", null, 
            React.createElement("div", {className: "am-margin-left-sm"}, 
		 
            React.createElement(AMUIReact.Article, {
		    title: o.title, 
		    meta: Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}, 
			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.message}})
		      ), 		     
		     React.createElement(AMR_ButtonToolbar, null, 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.groupuuid,o.uuid), round: true}, "编辑"), 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.groupuuid,o.uuid), round: true}, "删除"), 
		     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid), round: true}, "收藏")
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
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————（首页）课程表<绘制>——————————————————————————  
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
	handleClick_class: function(m,uuid,classuuid,ch_day) {
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
		
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		  
		  React.createElement(Grid, null, 
		    React.createElement(Col, {sm: 3}, 
		    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "pre",this.props.ch_class.uuid), round: true}, "上一天")
		    ), 
		    React.createElement(Col, {sm: 6}, 
		    React.createElement("h1", null, "课程安排-", React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid.bind(this), btnWidth: "200", data:  this.props.classList, btnStyle: "primary", value: this.props.ch_class.uuid}), "-", this.props.ch_day), 
		    React.createElement(AMR_ButtonToolbar, null, 
		      React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick_class.bind( this ,"add",null ,this.props.ch_class.uuid,this.props.ch_day), round: true}, "新增课程")
		      )
		    ), 
		    React.createElement(Col, {sm: 3}, 
		    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "next",this.props.ch_class.uuid), round: true}, "下一天")	
		    )
		  )
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
			    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 0, btn_dianzan: "btn_dianzan_"+o.uuid}), 
				     
			    	React.createElement(Common_reply_list, {uuid: o.uuid, type: 0})
				)
			)
		  )
	  }	
	  return (
		React.createElement("div", null, 	
			React.createElement("div", {className: "header"}, 
				  React.createElement("div", {className: "am-g"}, 				  
				  React.createElement(Grid, null, 
				  React.createElement("hr", null), 
				    React.createElement(Col, {sm: 3}, 
				    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "pre",this.props.groupuuid), round: true}, "上一天")
				    ), 
				    React.createElement(Col, {sm: 6}, 
				    React.createElement("div", {id: "div_detail"}, this.props.ch_day), 
				    React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "group_uuid", btnWidth: "200", onChange: this.handleChange_selectgroup_uuid.bind(this), data: this.props.ch_group, btnStyle: "primary", value:  this.props.groupuuid})
				    ), 
				    React.createElement(Col, {sm: 3}, 
				    React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "next",this.props.groupuuid), round: true}, "下一天")	
				    )
				  )
				  ), 
			  React.createElement("hr", null)
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
	  handleChange_selectgroup_uuid:function(){
		  ajax_parentContactByMyStudent($('#sutdent_name').val(),$("input[name='class_uuid']").val());
	  },
	  handleChange_class_uuid:function(val){
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
//	  	     )
//	     }  	    		 
		 return (
		 		React.createElement("div", null, 
			      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
			      React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", size: "1", placeholder: "搜索姓名"}), 	  
				  React.createElement("button", {type: "button", onClick: this.handleChange_selectgroup_uuid, className: "am-btn am-btn-primary"}, "搜索"), 	  	
		    	  React.createElement(AMUIReact.Selected, {name: "class_uuid", placeholder: "班级选择", onChange: this.handleChange_class_uuid, btnWidth: "200", multiple: false, data: this.props.class_list, btnStyle: "primary", value: this.props.group_uuid})
				  ), 
				    React.createElement("br", null), 
	  		        React.createElement(AMR_ButtonToolbar, null, 
	  		        React.createElement(AMR_Button, {amStyle: "success", round: true}, "邀请全部")	
	  		        ), 
	  	  	       React.createElement("ul", {className: "am-list am-list-static am-list-border"}, 
	  	  			this.props.formdata.map(function(event) {
	  	  				if(event.isreg==1){
	  	  				ListItem=(
	  	  					React.createElement(AMR_Button, {amStyle: "revise", round: true}, "已邀请")		
	  	  				);
	  	  				}else if(event.isreg==0){
		  	  				ListItem=(
			  	  					React.createElement(AMR_Button, {amStyle: "success", onClick: ajax_parentContact_tels.bind(this,event.tel), round: true}, "邀请家长")		
			  	  				);
	  	  				}else if(event.isreg==3){
		  	  				ListItem=(
			  	  					React.createElement(AMR_Button, {amStyle: "revise", round: true}, "邀请中")		
			  	  				);
	  	  				}
	  	  		        return (
	  	  		       React.createElement("li", null, 
	  	  		        event.student_name, "的", event.typename, ":", event.tel, 
	  	  		        React.createElement(AMR_ButtonToolbar, null, 
	  	  		         React.createElement("a", {href: "tel:"+event.tel}, React.createElement(AMUIReact.Button, {amStyle: "disable"}, "电话"), " "), 
	  	  		          React.createElement(AMUIReact.Button, {onClick: ajax_parentContactByMyStudent_message_list.bind(this,event.parent_uuid,"家长通讯录"), amStyle: "success"}, "@信息"), 	
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
		var re_data=ajax_message_queryByParent(this.props.parent_uuid,this.props.telitename,this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(!re_data)return;
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}
		  
		  this.pageNo++;
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
		   React.createElement("div", {id: this.classnewsreply_list_div}
		   
		   ), 
			React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多"), 
			React.createElement(Parent_message_save, {parent_React: this, uuid: this.props.parent_uuid})
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
         w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
               editor.pasteHTML( '<img  width="198" height="198" src="'+imgurl+'"/>')
         });

	},
	reply_save_btn_click:function(){
		ajax_parent_message_save(this.props.parent_React);
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
		var re_data=ajax_announce_Mygoodlist(this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(!re_data)return;
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}
		  
		  this.pageNo++;
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
		    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add",this.props.groupuuid), round: true}, "创建精品文章")
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
	    			  		    React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd", onClick: react_ajax_announce_good_show.bind(this,event.uuid,event.title)}, 
	    			  		  event.title
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
return (
		  React.createElement("div", null, 
		  React.createElement(AMUIReact.Article, {
		    title: o.title, 
		    meta: Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}, 
			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.message}})
		     ), 
		     React.createElement(AMR_ButtonToolbar, null, 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.groupuuid,o.uuid), round: true}, "编辑"), 
		     React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.groupuuid,o.uuid), round: true}, "删除"), 
		     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid), round: true}, "收藏")
		     ), 	
		    	React.createElement("footer", {className: "am-comment-footer"}, 
		    	React.createElement("div", {className: "am-comment-actions"}, 
		    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
		    	React.createElement("a", {href: "javascript:void(0);", onClick: common_illegal.bind(this,3,o.uuid)}, "举报")
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
	 handleChange: function(event) {
		    this.setState($('#editAnnouncementsForm').serializeJson());
	  },
	  componentDidMount:function(){
	  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
          w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                editor.pasteHTML( '<img  width="198" height="198" src="'+imgurl+'"/>')
          });
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
  		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
  		  React.createElement("form", {id: "editAnnouncementsForm", method: "post", className: "am-form"}, 
  		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
  		React.createElement("input", {type: "hidden", name: "isimportant", value: o.isimportant}), 		
  		React.createElement("div", {className: "am-form-group"}, 
  	  React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid})		          
        ), 
  		type_div, 
  		  React.createElement("label", {htmlFor: "name"}, "标题:"), 
  		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxlength: "45", placeholder: "不超过45位"}), 
  		  React.createElement("br", null), 
  		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
 		G_get_upload_img_Div(), 
  		  React.createElement("button", {type: "button", onClick: ajax_good_save, className: "am-btn am-btn-primary"}, "提交")
  		  )
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
* @handleClick:增加添加新班级按钮跳转-班级管理-添加班级方法
* @Class_students_show（kd_service中服务器请求时调用）;
* */
var Class_students_show= React.createClass({displayName: "Class_students_show",
	 componentDidMount:function(){
			 G_img_down404();
	  },
	  handleChange_selectgroup_uuid:function(val){
		  react_ajax_class_students_manage(val,"show");
	  },
	  handleClick:function(groupuuid){
			 btn_click_class_list(groupuuid);
	  },
	render: function() {
		var o=this.props.formdata;
	  return (
	  React.createElement("div", null, 	 
		  React.createElement(AMR_Panel, null, 
			  React.createElement(AMR_Grid, {className: "doc-g"}, 
		  	  React.createElement(AMR_ButtonToolbar, null, 
	  		    React.createElement(AMR_Button, {amStyle: "primary", onClick: class_students_manage_onClick.bind(this,o.uuid,o.name), round: true}, "查看课程"), 
	  		    React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "class_uuid", onChange: this.handleChange_selectgroup_uuid.bind(this), btnWidth: "200", data: this.props.classList, btnStyle: "primary", value: o.uuid}), 
	  		    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this,o.groupuuid), round: true}, "添加班级")
	  		    ), 
			    React.createElement(AMR_Col, {sm: 4}, " 班级:", o.name), 
			    React.createElement(AMR_Col, {sm: 4}, "班主任:", o.headTeacher_name), 
			    React.createElement(AMR_Col, {sm: 4}, "其他老师:", o.teacher_name)
			  )
		  ), 
		  React.createElement(AMR_Gallery, {data: this.props.students, sm: 3, md: 4, lg: 6})
	    )
	  );
	}
	});

/*
* <我的班级>班级添加详情绘制
* @ajax_class_save：提交按钮在Kd_service;
* @class_students_manage_onClick：添加学生按钮事件处理;
* */	
var AMR_Grid=AMUIReact.Grid;
var AMR_Col=AMUIReact.Col;
  var Class_edit = React.createClass({displayName: "Class_edit", 
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
    		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过45位！"}), 
    		      React.createElement("br", null), 		   
  		      React.createElement("label", {htmlFor: "name"}, "班主任:"), 
  	  		    React.createElement("input", {type: "hidden", name: "headTeacher", id: "headTeacher", value: o.headTeacher, onChange: this.handleChange}), 
  			      React.createElement("input", {type: "text", id: "headTeacher_name", value: o.headTeacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"headTeacher","headTeacher_name",o.groupuuid), placeholder: ""}), 
  			      React.createElement("br", null), 
  			      React.createElement("label", {htmlFor: "name"}, "其他老师:"), 
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

/*我的班级中查看学生信息
 * Class_student_look_info@:此方法模板为单独查看每个学生详细信息但不能编辑；
 * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
 * 
 * */
var Class_student_look_info =React.createClass({displayName: "Class_student_look_info",
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
			      React.createElement(AMUIReact.ListItem, null, "生日:", o.birthday), 
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





//——————————————————————————老师通讯录<绘制>——————————————————————————  
/*
 *老师通讯录服务器请求后绘制处理方法；
 * @handleChange_selectgroup_uuid:搜索和换学校后更新页面
 * @调用LIS.events.map方法循环绘制老师数组； 
 * @</select>下拉多选框;
 * */
var Teacher_info_tel = React.createClass({displayName: "Teacher_info_tel",
	  handleChange_selectgroup_uuid:function(val){
		  ajax_Teacher_listByGroup(val,$('#sutdent_name').val());
	  },
  render: function() {
    return (
    React.createElement("div", null, 
	      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
	      React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", size: "1", placeholder: "教师姓名"}), 	  
		  React.createElement("button", {type: "button", onClick: this.handleChange_selectgroup_uuid, className: "am-btn am-btn-primary"}, "搜索")	  	
		  ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid})
      
    ), 
	  
      React.createElement(AMR_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "姓名"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "邮箱"), 
            React.createElement("th", null, "性别"), 
            React.createElement("th", null, "状态")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Teacherinfo_EventRow, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});
/*
 * 老师通讯录表单详情内容绘制;
 * 一键拨号
 * 暂时添加点击事件 后续还未开发； 
 * */
var Teacherinfo_EventRow = React.createClass({displayName: "Teacherinfo_EventRow", 
	  render: function() {
	    var event = this.props.event;
	    var className = event.highlight ? 'am-active' :
	      event.disabled ? 'am-disabled' : '';

	    return (
	      React.createElement("tr", {className: className}, 
	        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: ""}, event.name)), 
	        React.createElement("td", null, event.tel, " ", React.createElement("a", {href: "tel:"+event.tel}, React.createElement(AMUIReact.Button, {amStyle: "success"}, "电话"))), 
	        React.createElement("td", null, event.email), 
	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
	        React.createElement("td", {className: "px_disable_"+event.disable}, Vo.get("disable_"+event.disable))
	        ) 
	    );
	  }
	}); 






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
		var re_data=ajax_favorites_list(this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(!re_data)return;
		if(re_data.totalCount<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}
		  
		  this.pageNo++;
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
		            return (React.createElement(AMUIReact.ListItem, null, "家长", event.send_user, "的信息",     
		            React.createElement(AMR_ButtonToolbar, null, 		            
		            React.createElement(AMUIReact.Button, {onClick: ajax_parentContactByMyStudent_message_list.bind(this,event.send_useruuid,"我的信箱"), amStyle: "success"}, "@信息"), "你们总共发了", event.count, "条信息"
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
    React.createElement(AMR_ButtonToolbar, null, 
	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add"), round: true}, "添加分校")
	  ), 
	  React.createElement("hr", null), 
      React.createElement(AMR_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "品牌名"), 
            React.createElement("th", null, "预览"), 
            React.createElement("th", null, "机构全称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "公司地址"), 
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
    	React.createElement(AMR_Button, {amStyle: "primary", onClick: btn_click_group_byRight.bind(this,"show",event), round: true}, "预览")
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
		console.log("图片地址",o.description)
    return (
  		  React.createElement(AMUIReact.Article, {
  		    title: o.brand_name, 
  		    meta: o.company_name+" | "+o.link_tel+" | "+o.address+" | 阅读0次"}, 
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
                editor.pasteHTML( '<img  width="198" height="198" src="'+imgurl+'"/>')
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
  render: function() {
	  var o = this.state;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 		  
		React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
	    React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
		 React.createElement("input", {type: "hidden", id: "img", name: "img", value: o.img, onChange: this.handleChange}), 
		React.createElement("label", {htmlFor: "nickname"}, "LOGO:"), 
        React.createElement(AMUIReact.Image, {id: "img_head_image", src: G_imgPath+o.img, className: "G_img_header"}), 
        React.createElement("br", null), 
        React.createElement("button", {type: "button", onClick: this.btn_class_group_uploadHeadere, className: "am-btn am-btn-primary"}, "上传LOGO"), 
            React.createElement("br", null), 
  
    		React.createElement("label", {htmlFor: "brand_name"}, "品牌名:"), 
	      React.createElement("input", {type: "text", name: "brand_name", id: "brand_name", value: o.brand_name, onChange: this.handleChange, placeholder: "不超过45位"}), 
	      React.createElement("br", null), 
	       React.createElement("label", {htmlFor: "company_name"}, "机构全称:"), 
	      React.createElement("input", {type: "text", name: "company_name", id: "company_name", value: o.company_name, onChange: this.handleChange, placeholder: "不超过45位"}), 
	      React.createElement("br", null), 
	       React.createElement("label", {htmlFor: "address"}, "公司地址:"), 
	      React.createElement(PxInput, {icon: "university", type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: "不超过64位"}), 
	      React.createElement("br", null), 
	       React.createElement("label", {htmlFor: "map_point"}, "地址坐标:"), 
	      React.createElement("input", {type: "text", name: "map_point", id: "map_point", value: o.map_point, onChange: this.handleChange, placeholder: "拾取坐标后，复制到这里。格式：1.1,1.1"}), 
	      React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取"), 
	      React.createElement("br", null), 
	       React.createElement("label", {htmlFor: "link_tel"}, "公司电话:"), 
	      React.createElement(PxInput, {icon: "phone", type: "text", name: "link_tel", id: "link_tel", value: o.link_tel, onChange: this.handleChange, placeholder: ""}), 
	      React.createElement("br", null), 
	      React.createElement(AMR_Input, {id: "description", type: "textarea", rows: "50", label: "校园介绍:", placeholder: "校园介绍", name: "description", value: o.description, onChange: this.handleChange}), 
		  	G_get_upload_img_Div(), 
	      React.createElement("button", {type: "button", onClick: ajax_group_save_byRight, className: "am-btn am-btn-primary"}, "提交")
    	     )
    	     )
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
		    	list: this.props.list
		    };
			
		obj=this.ajax_list(obj);
	    return obj;
	   
	  },
	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  var obj= {
			    	groupuuid:nextProps.groupuuid,
			    	pageNo:nextProps.pageNo,
			    	type:nextProps.type,
			    	list: nextProps.list
			    };
				
			obj=this.ajax_list(obj);
		  this.setState(obj);
		},
	 ajax_list:function(obj){
		$.AMUI.progress.start();
		var url = hostUrl + "rest/announcements/list.json";
		$.ajax({
			type : "GET",
			url : url,
			data : {type:obj.type,groupuuid:obj.groupuuid,pageNo:obj.pageNo},
			dataType : "json",
			async: false,//必须同步执行
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					obj.list=data.list.data;
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			}
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
			 this.setState(this.ajax_list(obj));
			 return;
		 }else if(m=="next"){
			 if(!obj.list||obj.list.length==0){
				 G_msg_pop("最后一页了");
				 return ;
			 }
			 obj.pageNo=obj.pageNo+1;
			
			 this.setState(this.ajax_list(obj));
			 return;
		 }
	},
	handleClick: function(m,Titlename) {
		btn_click_announce_byRight(m,this.props.groupuuid,null);
},
handleChange_selectgroup_uuid:function(val){
	 var obj=this.state;
	 obj.groupuuid=val;
	 this.setState(this.ajax_list(obj));
},

render: function() {
	var obj=this.state;
  return (
  React.createElement("div", null, 
React.createElement(AMR_ButtonToolbar, null, 
	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "pre"), round: true}, "上一页"), 
	React.createElement("span", null, "第", obj.pageNo, "页"), 
	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "next"), round: true}, "下一页"), 	
	React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this,"add"), round: true}, "创建")

  ), 
React.createElement("hr", null), 
React.createElement("div", {className: "am-form-group"}, 
React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: obj.groupuuid})
  ), 	  
    React.createElement(AMR_Table, React.__spread({},  this.props), 
   React.createElement("thead", null, 
    React.createElement("tr", null, 
      React.createElement("th", null, "标题"), 
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

	  return (
	    React.createElement("tr", {className: className}, 
	      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: react_ajax_announce_show_byRight.bind(this,event.uuid,Vo.announce_type(event.type))}, event.title)), 
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
	  componentDidMount:function(){
	  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
        w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
              editor.pasteHTML( '<img  width="198" height="198" src="'+imgurl+'"/>')
        });
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
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		  React.createElement("form", {id: "editAnnouncementsForm", method: "post", className: "am-form"}, 
		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		React.createElement("input", {type: "hidden", name: "isimportant", value: o.isimportant}), 		
		React.createElement("div", {className: "am-form-group"}, 
	  React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid})		          
      ), 
		type_div, 
		  React.createElement("label", {htmlFor: "name"}, "标题:"), 
		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxlength: "45", placeholder: "不超过45位"}), 
		  React.createElement("br", null), 
		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
		G_get_upload_img_Div(), 
		  React.createElement("button", {type: "button", onClick: ajax_announcements_save_byRight, className: "am-btn am-btn-primary"}, "提交")
		  )
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
		commons_ajax_favorites_push(title,type,reluuid,url)
	}, 
	handleClick_approval: function(uuids) {
	  common_approval(3,uuids);
},
render: function() {
	  var o = this.props.data;

return (
	  React.createElement("div", null, 
       React.createElement("div", {className: "am-margin-left-sm"}, 
	 
       React.createElement(AMUIReact.Article, {
	    title: o.title, 
	    meta: Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}, 
		React.createElement("div", {dangerouslySetInnerHTML: {__html: o.message}})
	      ), 		     
	     React.createElement(AMR_ButtonToolbar, null, 
	     React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.groupuuid,o.uuid), round: true}, "编辑"), 
	     React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.groupuuid,o.uuid), round: true}, "删除"), 
	     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid), round: true}, "收藏"), 
	     React.createElement(AMR_Button, {amStyle: "danger", onClick: this.handleClick_approval.bind(this,o.uuid), round: true}, "禁止")
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

//±±±±±±±±±±±±±±±±±±±±±±±±±±±























































//——————————————————————————班级互动<绘制>——————————————————————————
/* 
 * <班级互动>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @btn_click_announce:点击按钮事件跳转kd_servise方法;
 * */
var Announcements_class_Div_list_byRight = React.createClass({displayName: "Announcements_class_Div_list_byRight", 
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
		var re_data=ajax_classs_Mygoodlist_byRight(this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(!re_data)return;
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}
		  
		  this.pageNo++;
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
	selectclass_uuid_val:null,
	handleClick: function(m) {
		if(m=="add"){
			btn_click_classnews_byRight(m,{classuuid:this.selectclass_uuid_val});
			 return;
		 }else{
			 alert("跟着我左手右手一个慢动作，右手左手慢动作重播");
		 }
//		if(m=="edit"){			
//			 var uuids=null;
//			 $($("input[name='table_checkbox']")).each(function(){
//				
//				　if(this.checked){
//					 if(uuids==null)uuids=this.value;
//					 else
//					　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
//				　}
//				});
//			  if(!uuids){
//				  alert("请勾选复选框！");
//				  return;
//			  }
//			  if(!uuids&&uuids.indexOf(",")>-1){
//					alert("只能选择一个进行编辑！");
//					return;
//				}
//			  btn_click_classnews(m,{uuid:uuids});
//		 }
	  },
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		  React.createElement(AMUIReact.ButtonToolbar, null, 
		    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this,"add"), round: true}, "发布互动"), 
		    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this,"oth"), round: true}, "他人互动")
		    ), 
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
		  if(!o.create_img)G_def_headImgPath;
		  
	  return (
			  React.createElement("div", null, 
			  React.createElement("article", {className: "am-comment am-margin-xs"}, 
			  React.createElement("a", {href: "javascript:void(0);"}, 
			    React.createElement("img", {src: o.create_img, className: "am-comment-avatar", width: "48", height: "48"})
			  ), 

			  React.createElement("div", {className: "am-comment-main"}, 
			    React.createElement("header", {className: "am-comment-hd"}, 
			      React.createElement("div", {className: "am-comment-meta"}, 
			        React.createElement("a", {href: "javascript:void(0);", className: "am-comment-author"}, Store.getClassNameByUuid(o.classuuid), "|", o.create_user), 
			        "发表于 ", React.createElement("time", null, o.update_time)
			      )
			    ), 
			    React.createElement("div", {className: "am-comment-bd"}, 
			    React.createElement("div", {dangerouslySetInnerHTML: {__html:o.content}}), 
			    	React.createElement(Common_mg_big_fn, {imgsList: o.imgsList})
			    ), 
			    	React.createElement("footer", {className: "am-comment-footer"}, 
			    	React.createElement("div", {className: "am-comment-actions"}, 
			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"})), 
			    	React.createElement("a", {href: "javascript:void(0);", onClick: common_illegal.bind(this,99,o.uuid)}, "举报")
			    	)
			    	), 
			    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 0, btn_dianzan: "btn_dianzan_"+o.uuid}), 
			    	React.createElement("ul", {className: "am-comments-list"}, 
					  React.createElement(Classnews_reply_list_byRight, {uuid: o.uuid, type: 0, btn_reply: "btn_reply_"+o.uuid})
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
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"classnewsreply_list_div",
	
	
	componentDidMount:function(){
		var that=this;
		$("#"+this.props.btn_reply).bind("click",that.btn_reply_show.bind(that));
		this.load_more_data();
	},
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		var re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow_byRight);
		if(!re_data)return;
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
		    		  React.createElement("li", {className: "am-comment"}, 
		    		  React.createElement("span", {className: "am-comment-author"}, event.create_user+":"), 
				        React.createElement("span", {dangerouslySetInnerHTML: {__html:event.content}})
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
			React.createElement("input", {type: "hidden", name: "type", value: this.props.uuid}), 						
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
		 var editor=$('#classnews_content').xheditor(xhEditor_upImgOption_emot);
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
		  React.createElement("form", {id: "editClassnewsForm", method: "post", className: "am-form"}, 
		  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "classuuid", onChange: this.handleChange_selectclass_uuid, btnWidth: "300", data: this.props.mycalsslist, btnStyle: "primary", value: o.classuuid}), 	      
			
		  React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
			React.createElement("input", {type: "hidden", name: "imgs", id: "imgs", value: o.imgs}), 			
		      React.createElement(AMR_Input, {id: "classnews_content", type: "textarea", rows: "3", label: "内容:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange}), 
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
			
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				
				　if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				　}
				});
			  if(!uuids){
				  alert("请勾选复选框！");
				  return;
			  }
			  if(!uuids&&uuids.indexOf(",")>-1){
					alert("只能选择一个进行编辑！");
					return;
				}
			  btn_click_cookbookPlan_byRight(m,{uuid:uuids});
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
	React.createElement(AMR_ButtonToolbar, null, 
	React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add",null,this.props.group_uuid), round: true}, "添加"), 
	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "pre"), round: true}, "上周"), 
	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "next"), round: true}, "下周")	
	), 
	React.createElement("div", {className: "header"}, 
	React.createElement("div", {className: "am-g"}, 
	  React.createElement("h1", null, "[", this.props.begDateStr, " 到 ", this.props.endDateStr, "]")
	), 
	React.createElement("hr", null)
	), 
		  React.createElement("div", {className: "am-form-group"}, 
		  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid})
	), 		  
	  React.createElement(AMR_Table, React.__spread({},  this.props), 
	    React.createElement("thead", null, 
	      React.createElement("tr", null, 
	        React.createElement("th", null, "一周"), 
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
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  React.createElement("tr", {className: className}, 
    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: btn_click_cookbookPlan_byRight.bind( this, 'edit',event)}, G_week.getWeekStr(event.plandate))), 
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
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————课程安排<绘制>——————————————————————————        
/*
* <课程安排>班级详情界面按钮列表框等绘制;
* @add:添加班级课程；
* @pre:上周；
* @next:下一周；
* */
var Teachingplan_EventsTable_byRight = React.createClass({displayName: "Teachingplan_EventsTable_byRight",
	handleClick: function(m,uuid,groupuuid,classuuid) {
			 if(m=="add"){
				 btn_click_teachingplan_byRight(m,null,groupuuid,classuuid);
				 return;
			 }else if(m=="pre"){
				 ajax_teachingplan_listByClass_byRight(groupuuid,classuuid,--g_cookbookPlan_week_point);
				 return;
			 }else if(m=="next"){
				 ajax_teachingplan_listByClass_byRight(groupuuid,classuuid,++g_cookbookPlan_week_point);
				 return;
			 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
//	  handleChange_selectgroup_uuid:function(){
//		  ajax_announce_listByGroup($('#selectgroup_uuid').val());
//	  },
		handleChange_selectgroup: function(val) {
			this.props.classuuid="";
			ajax_teachingplan_listByClass_byRight(val,this.props.classuuid,this.props.weeknum);  
	    },
	    handleChange_selectclass: function(val) {
			ajax_teachingplan_listByClass_byRight(this.props.groupuuid,val,this.props.weeknum);  
	    },
render: function() {
return (
React.createElement("div", null, 
React.createElement("div", {className: "header"}, 
	React.createElement("hr", null)
	), 
React.createElement(AMR_ButtonToolbar, null, 
	React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add",null,this.props.groupuuid,this.props.classuuid), round: true}, "添加"), 
  React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "pre",null,this.props.groupuuid,this.props.classuuid), round: true}, "上周"), 
  React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "next",null,this.props.groupuuid,this.props.classuuid), round: true}, "下周"), 
  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup.bind(this), btnWidth: "200", data: this.props.groupList, btnStyle: "primary", value: this.props.groupuuid}), 
  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "class_uuid", onChange: this.handleChange_selectclass.bind(this), btnWidth: "200", data: this.props.classList, btnStyle: "primary", value: this.props.classuuid})
), 
  React.createElement("h1", null, "[", this.props.begDateStr, " 到 ", this.props.endDateStr, "]"), 
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
    this.props.events.map(function(event) {
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
	    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: btn_click_teachingplan_byRight.bind( this, "edit",event.uuid)}, G_week.getWeekStr(event.plandate))), 
	    React.createElement("td", null, event.morning), 
	    React.createElement("td", null, event.afternoon)
	  ) 
	);
	}
	});

/*
*<课程安排>班级详情添加与编辑内容绘制;
* @add:添加班级课程；
* @pre:上周；
* @next:下一周；
* */
var Teachingplan_edit_byRight = React.createClass({displayName: "Teachingplan_edit_byRight", 
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
		      React.createElement("button", {type: "button", onClick: ajax_teachingplan_save_byRight, className: "am-btn am-btn-primary"}, "提交")
	 )
	     )
	   )
	   
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
	 	  React.createElement("hr", null), 
	 	    React.createElement("ul", {className: "am-list am-list-static am-list-border"}, 
	    	     this.props.formdata.map(function(event) {
	              return (
	              React.createElement("li", {className: "am-comment"}, 	
	      	       React.createElement("a", {href: "javascript:void(0);"}, 
	   	          React.createElement("img", {src: G_getHeadImg(event.send_userimg), alt: "", className: "am-comment-avatar", width: "48", height: "48"})
	      	     ), 
	            "家长", event.send_user, "的信息",     
	           React.createElement(AMR_ButtonToolbar, null, 		            
	         React.createElement(AMUIReact.Button, {onClick: ajax_my_boss_stage_byRight.bind(this,event.send_useruuid,event.revice_useruuid,event.send_user), amStyle: "success"}, "@信息"), "你们总共发了", event.count, "条信息"
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
	var re_data=ajax_boss_message_list_byRight(this.props.send_useruuid,this.props.revice_useruuid,this.classnewsreply_list_div+this.pageNo,this.pageNo);
	if(!re_data)return;
	if(re_data.data.length<re_data.pageSize){
		$("#"+this.load_more_btn_id).hide();
	}
	  
	  this.pageNo++;
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
		React.createElement(Boss_message_save, {parent_React: this, send_useruuid: this.props.send_useruuid, revice_useruuid: this.props.revice_useruuid})
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
 * <班级管理>一层界面绘制;
 * @add_class:添加班级；
 * @edit_class:编辑；
 * @graduate_class:毕业；
 * @flower_name:下载花名册；
 * @handleClick:事件处理在kd_service;
 * @uuids:点击框后班级的ID；编辑按钮需要；
 * */
var Class_EventsTable_byRight = React.createClass({displayName: "Class_EventsTable_byRight",
	handleClick: function(m) {
		 if(this.props.handleClick){		 
			 if(m=="add_class"){
				 this.props.handleClick(m,this.props.group_uuid);
				 return;
			 }else if(m=="flower_name"){
				 var uuids=null;
				 $($("input[name='table_checkbox']")).each(function(){
					
					　if(this.checked){
						 if(uuids==null)uuids=this.value;
						 else
						　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
					　}
					});
				  if(!uuids){
					  alert("请选择你要下载的班级花名册！");
					  return;
				  }
				 ajax_flowername_download_byRight(this.props.group_uuid,uuids);
			 }
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				
				　if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				　}
				});
			  if(!uuids){
				  alert("请勾选复选框！");
				  return;
			  }
			  
			 this.props.handleClick(m,this.props.group_uuid,uuids);
		 }
	 },
 handleChange_checkbox_all:function(){
	  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
 },
 handleChange_selectgroup_uuid:function(val){
	  ajax_class_listByGroup_byRight(val);
 },
render: function() {
  return (
  React.createElement("div", null, 
  React.createElement(AMR_ButtonToolbar, null, 
	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_class"), round: true}, "添加班级"), 
	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "edit_class"), round: true}, "编辑"), 
	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "graduate_class"), round: true}, "毕业"), 
	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "flower_name"), round: true}, "下载花名册")
	  ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid})
  ), 
	  
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
	    return (
	      React.createElement("tr", {className: className}, 
	      React.createElement("td", null, 
	      React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
	      ), 
	        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: react_ajax_class_students_manage_byRight.bind(this, event.uuid)}, event.name)), 
	        React.createElement("td", null, event.headTeacher_name), 
	        React.createElement("td", null, event.teacher_name), 
	        React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 
	        React.createElement("td", null, event.create_time)
	      ) 
	    );
	   }
	  });  
  
/*
* <班级管理>班级添加与编辑模式详情绘制
* @ajax_class_save：提交按钮在Kd_service;
* @class_students_manage_onClick：添加学生按钮事件处理;
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
    		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过45位！"}), 
    		      React.createElement("br", null), 		   
  		      React.createElement("label", {htmlFor: "name"}, "班主任:"), 
  	  		    React.createElement("input", {type: "hidden", name: "headTeacher", id: "headTeacher", value: o.headTeacher, onChange: this.handleChange}), 
  			      React.createElement("input", {type: "text", id: "headTeacher_name", value: o.headTeacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"headTeacher","headTeacher_name",o.groupuuid), placeholder: ""}), 
  			      React.createElement("br", null), 
  			      React.createElement("label", {htmlFor: "name"}, "其他老师:"), 
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
   * */
  var AMR_Grid=AMUIReact.Grid;
  var AMR_Col=AMUIReact.Col;
  var Class_students_manage_byRight = React.createClass({displayName: "Class_students_manage_byRight",
  	 componentDidMount:function(){
  			 G_img_down404();
  	  },
  	render: function() {
  		var o=this.props.formdata;
  	  return (
  	  React.createElement("div", null, 
  	  React.createElement(AMR_ButtonToolbar, null, 
  		    React.createElement(AMR_Button, {amStyle: "primary", onClick: class_students_manage_onClick_byRight.bind(this, "add",this.props.formdata.uuid), round: true}, "添加学生"), 
  		    React.createElement(AMR_Button, {amStyle: "primary", onClick: class_students_manage_onClick_byRight.bind(this,"class",o.uuid,o.name), round: true}, "查看课程")
  		    ), 
  		  React.createElement("hr", null), 
  		  React.createElement(AMR_Panel, null, 
  			  React.createElement(AMR_Grid, {className: "doc-g"}, 
  			    React.createElement(AMR_Col, {sm: 4}, " 班级:", o.name), 
  			    React.createElement(AMR_Col, {sm: 4}, "班主任:", o.headTeacher_name), 
  			    React.createElement(AMR_Col, {sm: 4}, "其他老师:", o.teacher_name)
  			  )
  		  ), 
  		  React.createElement(AMR_Gallery, {data: this.props.students, sm: 3, md: 4, lg: 6})
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
   return (
   		React.createElement("div", null, 
   		React.createElement("div", {className: "header"}, 
   		  React.createElement("hr", null)
   		), 
   		React.createElement("div", {className: "am-g"}, 
   		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
   		  React.createElement("form", {id: "editClassStudentForm", method: "post", className: "am-form"}, 
   		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
   		     React.createElement("input", {type: "hidden", name: "classuuid", value: o.classuuid}), 
   		React.createElement("input", {type: "hidden", name: "headimg", id: "headimg", value: o.headimg, onChange: this.handleChange}), 
   		      React.createElement("label", {htmlFor: "name"}, "姓名:"), 
   		       React.createElement(PxInput, {icon: "user", type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: ""}), 
   		       React.createElement("br", null), 
   		       React.createElement("label", {htmlFor: "nickname"}, "昵称:"), 
   		       React.createElement(PxInput, {icon: "user-secret", type: "text", name: "nickname", id: "nickname", value: o.nickname, onChange: this.handleChange, placeholder: ""}), 
  		       React.createElement("br", null), 
  		       React.createElement("label", {htmlFor: "nickname"}, "头像:"), 
  	 		   React.createElement(AMUIReact.Image, {id: "img_head_image", src: G_def_headImgPath, className: "G_img_header"}), 
  	 		   React.createElement("br", null), 
  	 		   React.createElement("button", {type: "button", onClick: this.btn_class_student_uploadHeadere, className: "am-btn am-btn-primary"}, "上传头像"), 
  			   React.createElement("br", null), 
  			      
  		      React.createElement(AMUIReact.FormGroup, null, 
  		      React.createElement("label", null, "单选："), 
  		      React.createElement(AMUIReact.Input, {type: "radio", name: "sex", value: "0", label: "男", inline: true, onChange: this.handleChange, checked: o.sex==0?"checked":""}), 
  		      React.createElement(AMUIReact.Input, {type: "radio", name: "sex", value: "1", label: "女", inline: true, onChange: this.handleChange, checked: o.sex==1?"checked":""})
  		      ), 		      
  		      React.createElement("label", {htmlFor: "birthday"}, "生日:"), 
  			  React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", name: "birthday", id: "birthday", dateTime: o.birthday, onChange: this.handleChange}), 
  			  React.createElement("br", null), 			 
  			  React.createElement("label", {htmlFor: "birthday"}, "身份证:"), 
  			  React.createElement("input", {type: "text", name: "idcard", id: "idcard", value: o.idcard, onChange: this.handleChange, placeholder: ""}), 
  		      React.createElement("br", null), 		      		      
  		      React.createElement("fieldset", null, 
  		      React.createElement("legend", null, "爸爸妈妈信息"), 		      
  		      React.createElement("label", {htmlFor: "nickname"}, "妈妈姓名:"), 
   		      React.createElement(PxInput, {icon: "user", type: "text", name: "ma_name", id: "ma_name", size: "10", maxLength: "45", value: o.ma_name, onChange: this.handleChange, placeholder: ""}), 
   		      React.createElement("br", null), 
   		      React.createElement("label", {htmlFor: "nickname"}, "妈妈电话:"), 
  		      React.createElement(PxInput, {icon: "mobile", type: "text", name: "ma_tel", id: "ma_tel", value: o.ma_tel, onChange: this.handleChange, placeholder: ""}), 
  		      React.createElement("br", null), 
  		      React.createElement("label", {htmlfor: "nickname"}, "妈妈的工作:"), 
   		      React.createElement("input", {type: "text", name: "ma_work", id: "ma_work", value: o.ma_work, onChange: this.handleChange, placeholder: ""}), 
   		      React.createElement("br", null), 		      		      		     		       		      
   		      React.createElement("label", {htmlfor: "nickname"}, "爸爸姓名:"), 
   		      React.createElement(PxInput, {icon: "user", type: "text", name: "ba_name", id: "ba_name", size: "10", maxLength: "45", value: o.ba_name, onChange: this.handleChange, placeholder: ""}), 
   		      React.createElement("br", null), 
   		      React.createElement("label", {htmlFor: "nickname"}, "爸爸电话:"), 
  		      React.createElement(PxInput, {icon: "mobile", type: "text", name: "ba_tel", id: "ba_tel", value: o.ba_tel, onChange: this.handleChange, placeholder: ""}), 
  		      React.createElement("br", null), 		          
   		      React.createElement("label", {htmlfor: "nickname"}, "爸爸的工作:"), 
   		      React.createElement("input", {type: "text", name: "ba_work", id: "ba_work", value: o.ba_work, onChange: this.handleChange, placeholder: ""}), 
   		      React.createElement("br", null), 		     
   		      React.createElement("label", {htmlfor: "nickname"}, "家庭住址:"), 
  		      React.createElement(PxInput, {icon: "home", type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: ""}), 
  		      React.createElement("br", null)		
  		      ), 
  		      React.createElement("fieldset", null, 
  		      React.createElement("legend", null, "其他信息"), 
  		      React.createElement("label", {htmlFor: "nickname"}, "奶奶电话:"), 
   		      React.createElement(PxInput, {icon: "mobile", type: "text", name: "nai_tel", id: "nai_tel", value: o.nai_tel, onChange: this.handleChange, placeholder: ""}), 
   		      React.createElement("br", null), 
   		      React.createElement("label", {htmlFor: "nickname"}, "爷爷电话:"), 
  		      React.createElement(PxInput, {icon: "mobile", type: "text", name: "ye_tel", id: "ye_tel", value: o.ye_tel, onChange: this.handleChange, placeholder: ""}), 
  		      React.createElement("br", null), 
  		      React.createElement("label", {htmlFor: "nickname"}, "外婆电话:"), 
   		      React.createElement(PxInput, {icon: "mobile", type: "text", name: "waipo_tel", id: "waipo_tel", value: o.waipo_tel, onChange: this.handleChange, placeholder: ""}), 
   		      React.createElement("br", null), 
   		      React.createElement("label", {htmlFor: "nickname"}, "外公电话:"), 
  		      React.createElement(PxInput, {icon: "mobile", type: "text", name: "waigong_tel", id: "waigong_tel", value: o.waigong_tel, onChange: this.handleChange, placeholder: ""}), 
  		      React.createElement("br", null), 
  		      React.createElement("label", {htmlFor: "nickname"}, "其他电话:"), 
  		      React.createElement(PxInput, {icon: "phone", type: "text", name: "other_tel", id: "other_tel", value: o.other_tel, onChange: this.handleChange, placeholder: ""}), 
  		      React.createElement("br", null), 
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
   	   
   	   )
   );
  }
  });
//±±±±±±±±±±±±±±±±±±±±±±±±±±±
  
  
  
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
    	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add"), round: true}, "添加")
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
   return (
   		React.createElement("div", null, 
   		React.createElement("div", {className: "header"}, 
   		  React.createElement("hr", null)
   		), 
   		React.createElement("div", {className: "am-g"}, 
   		React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
   		React.createElement("form", {id: "editAccountsForm", method: "post", className: "am-form"}, 
   	    React.createElement("div", {className: "am-form-group"}, 
   		React.createElement(AMUIReact.Selected, {name: "groupuuid", onChange: this.handleChange_groupuuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: o.groupuuid+""})	 			          
  	    ), 
   		React.createElement("label", {htmlFor: "type"}, "收支类型:"), 
   		React.createElement("div", {className: "am-form-group"}, 
    		React.createElement(AMUIReact.Selected, {name: "type", onChange: this.handleChange_type, btnWidth: "200", multiple: false, data: this.props.type_list, btnStyle: "primary", value: o.type+""}), 	 
    	    React.createElement("br", null), 
    		React.createElement(AMUIReact.Selected, {name: "classuuid", placeholder: "班级选择", onChange: this.handleChange_classuuid, btnWidth: "200", multiple: false, data: o.tmp_classList, btnStyle: "primary", value: o.classuuid+""}), 	 
    	    React.createElement("br", null), 
    		React.createElement(AMUIReact.Selected, {name: "studentuuid", placeholder: "学生选择", onChange: this.handleChange_studentuuid, btnWidth: "200", multiple: false, data: o.tmp_studentList, btnStyle: "primary", value: o.studentuuid+""})	 
          ), 
   	    React.createElement("br", null), 	    
   	    React.createElement("label", {htmlFor: "accounts_timeStr"}, "收支日期:"), 
   	    React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", name: "accounts_timeStr", id: "accounts_timeStr", dateTime: o.accounts_time, showTimePicker: false, onChange: this.handleChange}), 
   	       React.createElement("label", {htmlFor: "title"}, "内容:"), 
   	      React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, placeholder: "不超过64位"}), 
   	      React.createElement("br", null), 	
   	       React.createElement("label", {htmlFor: "num"}, "金额:"), 
   	      React.createElement("input", {type: "number", name: "num", id: "num", value: o.num, onChange: this.handleChange, placeholder: ""}), 
   	    React.createElement("label", {htmlFor: "description"}, "备注:"), 
  	      React.createElement("input", {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange, placeholder: "不超过100位"}), 
  	      React.createElement("br", null), 
  	      React.createElement("button", {type: "button", onClick: ajax_accounts_saveAndAdd_byRight, className: "am-btn am-btn-primary"}, "保存继续"), 
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
  	group_uuid:null,
  	class_uuid:null,
  	handleChange_stutent_Selected: function(val) {
  		  if(val=="0"){
  			  this.group_uuid="";
  		  }else{
  			  this.group_uuid=val;
  		  };
  		  this.class_uuid="";
  		  ajax_student_query_byRight(this.group_uuid,this.class_uuid,$('#sutdent_name').val());
  	  }, 
  	  handleChange_class_Selected: function(val) {
  		  if(val=="1"){
  			  this.class_uuid="";
  		  }else{
  			  this.class_uuid=val;
  		  };
  		  ajax_student_query_byRight(this.group_uuid,this.class_uuid,$('#sutdent_name').val());
  		  }, 
  		btn_query_click:function(){
  			 ajax_student_query_byRight(this.group_uuid,this.class_uuid,$('#sutdent_name').val());
  		},
  render: function() {
  	this.props.group_list.unshift({value:"0",label:"所有"});
  	this.props.class_list.unshift({value:"1",label:"所有"});
  	if(this.props.group_uuid==""){			
  		this.props.group_uuid="0";
  	};
  	if(this.props.class_uuid==""){			
  		this.props.class_uuid="1";
  	};
      return (
      React.createElement("div", null, 
  	  React.createElement("hr", null), 	  
  	  React.createElement("div", {className: "am-form-group"}, 
  		React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
          React.createElement("div", {className: "am-cf"}, 
  	  React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid1", name: "group_uuid", onChange: this.handleChange_stutent_Selected, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid}), 
  	  React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid2", name: "class_uuid", onChange: this.handleChange_class_Selected, btnWidth: "200", multiple: false, data: this.props.class_list, btnStyle: "primary", value: this.props.class_uuid})
  	  ), 
  	  
  	  React.createElement("div", {className: "am-form-group am-margin-top-xs"}, 
  	  	React.createElement("div", {className: "am-u-sm-6"}, 
  	  		React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "学生姓名"})	  
  	  	), 
  	  React.createElement("button", {type: "button", className: "am-u-sm-2", onClick: this.btn_query_click, className: "am-btn am-btn-primary"}, "搜索")	  
  	   )
  	  )
  	  
  	  
  	  ), 	  
        React.createElement(AMR_Table, React.__spread({},  this.props), 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "姓名"), 
              React.createElement("th", null, "昵称"), 
              React.createElement("th", null, "性别"), 
              React.createElement("th", null, "生日"), 
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
  			      React.createElement(AMUIReact.ListItem, null, "生日:", o.birthday), 
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
    		 React.createElement("form", {id: "editEchartForm", method: "post", className: "am-form"}, 
    		 React.createElement("div", null, 
	    		 React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
	    		 React.createElement(AMUIReact.Selected, {inline: true, name: "type", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.statistics_type_list, btnStyle: "primary"})
	    		 
	    		 ), 
				React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
							    		 
						 React.createElement(AMUIReact.Selected, {inline: true, name: "groupuuid", onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary"})
	    		 ), 
				 React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
					    		 
				 React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", id: "begDateStr", dateTime: o.begDateStr, onChange: this.handleChange})
	    		 ), 
				React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
					 React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", id: "endDateStr", dateTime: o.endDateStr, onChange: this.handleChange})
	    		 
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
          React.createElement("div", {className: "am-cf"}, 
  	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid1", name: "group_uuid", onChange: this.handleChange_group_Selected, btnWidth: "200", data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid}), 
  	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid2", name: "type", onChange: this.handleChange_type_Selected, btnWidth: "200", data: this.props.teachingjudge_typelist, btnStyle: "primary", value: this.props.type})
  	  ), 

  	  React.createElement("div", {className: "am-form-group am-margin-top-xs"}, 
  	  	React.createElement("div", {className: "am-u-lg-3 am-u-sm-6"}, 
  	  		React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "学生姓名"}), 
  			  React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", id: "begDateStr", dateTime: this.props.begDateStr, onChange: this.handleChange}), 
  			  React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", id: "endDateStr", dateTime: this.props.endDateStr, onChange: this.handleChange}), 
  			  React.createElement("button", {type: "button", className: "am-u-sm-2", onClick: this.btn_teachingjudge_click, className: "am-btn am-btn-primary"}, "查询")	  				
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




  
  
  