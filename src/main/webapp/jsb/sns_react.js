
var Tabs=AMUIReact.Tabs;
var replyEditor=null;
var reply_callback_save=null;

//±±±±±±±±±±±±±±±±±±±±±±±±±±±  
 /*
  * <重新登录>添加按钮详情绘制;
  * @ajax_accounts_save：保存按钮调用
  * @ajax_accounts_save：保存继续按钮
  * 都在kd_service；
  * */ 
 var Common_load_pop= React.createClass({displayName: "Common_load_pop", 
	 getInitialState: function() {
		    return this.props;
		  },
	 handleChange: function(event) {
		 var o=$('#login_form').serializeJson();
		 	o.pw_checked=$("#pw_checked").prop("checked")?"checked":"";
		    this.setState(o);
	  },
	 handle_onKeyDown: function(e){
		if(G_isKeyDown_enter(e)){
			//ajax_userinfo_login();
			return false;
	 }
	},
	handleChange_group_type_data:function(v){
		 window.location.replace(v);
	},
  	 
  render: function() {

	  var o = this.state;
   return (
   		React.createElement("div", null, 
 		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		 React.createElement("img", {src: hostUrl+"i/denglulogo.png", width: "100px", height: "100px"})
		  )
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered am-margin-top-sm"}, 
		
		 React.createElement("form", {id: "login_form", method: "post", className: "am-form", onKeyDown: this.handle_onKeyDown}, 
		 React.createElement("input", {type: "hidden", name: "grouptype", value: "3"}), 
	      React.createElement(PxInput, {icon: "mobile", type: "text", name: "loginname", id: "loginname", value: o.loginname, onChange: this.handleChange}), 
	      React.createElement(PxInput, {icon: "lock", type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange}), 
 	      React.createElement("label", {htmlFor: "pw_checked"}, 
	        React.createElement("input", {id: "pw_checked", name: "pw_checked", type: "checkbox", checked: o.pw_checked=="checked"?"checked":"", onChange: this.handleChange}), 
	        "记住密码"
	      )

	      

	    )
	     )
	   )
   	         )
   );
  }
  });
//——————————————————————————话题<绘制>—————————————————————  
/* 
 * <话题>绘制舞台1.0
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * */
var Sns_Div = React.createClass({displayName: "Sns_Div", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps: function(nextProps) {
		  this.refresh_data();
		},
	componentDidMount:function(){
		this.refresh_data();
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
	var re_data=PxSnsService.sns_snsTopic_list(this.classnewsreply_list_div+this.pageNo,this.pageNo,that.props.snsKey,callback);
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
	this.classnewsreply_list_div="snstopicList_"+this.props.snsKey
	this.load_more_btn_id="load_more_"+this.props.snsKey;
		var toolbar=null;
		//家长模式,右上角创建
		if(typeof SnsIndexPage=='undefined'){
			 toolbar=(
			  React.createElement(AMR_ButtonToolbar, null, 
				 React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "add")}, "创建话题")
				)
			);
		}
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
	toolbar, 	
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
 * 1.0
 *<话题>列表舞台建立后根据请求数据绘制列表内容
 * */
var sns_list_snsTopic_rect = React.createClass({displayName: "sns_list_snsTopic_rect", 
	  render: function() {
	    var events = this.props.events;
	    var length;
	    var img_fine=hostUrlCDN+"i/fine1.png";
	    var img_hot=hostUrlCDN+"i/hot1.png";
	    var className = events.highlight ? 'am-active' :
    events.disabled ? 'am-disabled' : '';
    return (
     React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
      React.createElement("div", {className: "am-list-news-bd"}, 
       React.createElement("ul", {className: "am-list"}, 
		  this.props.events.data.map(function(event) {
			  if(!event.imgList)event.imgList=[];
			  length=event.imgList.length;
		      return (
       React.createElement("li", {className: "am-g am-list-item-dated", onClick: PxSnsService.ajax_sns_snsTopic_show.bind(this,event.uuid)}, 
		 React.createElement("a", {href: "javascript:void(0);", className: "am-list-item-hd snsTopic_list_title"}, 
		 React.createElement(AMUIReact.Image, {width: "28", height: "28", className: event.level==9?"am-show":"am-hide", id: "img_head_image", src: img_fine}), 
		 React.createElement(AMUIReact.Image, {width: "28", height: "28", className: event.level==1?"am-show":"am-hide", id: "img_head_image", src: img_hot}), 
         event.title
  		 ), 	
            React.createElement("div", {className: "am-list-item-text"}, 
            React.createElement("h4", null, event.summary)
            ), 
            
            event.imgList.map(function(event) {
            	 return (
            		React.createElement(AMUIReact.Image, {className: length==0?"am-hide":"am-show", id: "img_head_image", thumbnail: true, width: "88", height: "88", src: event})           	 
            	 )
            }), 
  		   React.createElement("div", {className: "am-list-item-text"}, 
  		    "作者：", event.create_user, " |  点赞  ", event.yes_count, "  |  有", event.reply_count, "人回复  |   ", React.createElement("time", null, GTimeShow.getYMD(event.create_time))
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
 * 1.0
 * <话题>创建与编辑界面绘制；
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * */    
var Sns_snsTopic_add_edit = React.createClass({displayName: "Sns_snsTopic_add_edit", 
 getInitialState: function() {
	 this.props.formdata.input_count=0;
	    return this.props.formdata;
	  },
 handleChange: function(event) {
	    this.setState($('#snsAnnouncementsForm').serializeJson());
  },
  handleChange_Select: function(val) {	
		this.state.section_id=val;
		this.setState(this.state);
	  },
  componentDidMount:function(){
     var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
     this.editor=editor;
      w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
            editor.pasteHTML( '<img width="100%" style="margin: 5px;"  src="'+imgurl+'"/>')
       });
      
      this.itemListObj.init(this.state.itemList);
	 },
	preview_fn:function(){
     G_html_preview("t_iframe", this.state.url,this.editor.getSource(),this.state.title);
       }, 
       
       /**
        * this.itemListObj.getData();
        *  itemListObj.init(list);
        */
       itemListObj:{
    	   divId_addButton:"snstopic_itemList_addButton",
    	   ind:0,
    	   getData:function(){
    		   
    		   var itemList=[];
    		   $("input[name='snstopic_itemList_item_title']").each(function(){
    			  
    			   var uuid_ind=this.title.split("_");
    			   var o={"title":this.value,"ind":uuid_ind[1],"uuid":uuid_ind[0]};

    			   itemList.push(o);
    			  });
    		   
    		   return itemList;
    	   },
    	   
    	   addItemDiv:function(o){
    			$("#"+this.divId_addButton).append("<div id="+this.divId_addButton+o.ind+">加载中...</div>");
				React.render(React.createElement(Sns_snsTopic_itemList_item,
				 		{formdata:o,
						delItem:this.delItem
				 		}),  document.getElementById(this.divId_addButton+o.ind));	
    		   
    	   },
    	   delItem:function(){
    		   
    		   
    	   },
    	   add_item:function(){
    		   var o={"title":"","ind":++this.ind,"uuid":""};
    		 this.addItemDiv(o);
    		   
    	   },
    	   init:function(list){
    		   this.dataList=list;
    		   if(!this.dataList){
    			   this.dataList=[];
    			   
    			  this.add_item();
    			  this.add_item();
    			   
    		   }else{
    			   this.ind=this.dataList.length;
    		   }
    		   console.log("this.dataList",this.dataList);
    		   
    		   for(var i=0;i<this.dataList.length;i++){
       			this.addItemDiv(this.dataList[i]);
    		   }
    	   }
    	   
       },
render: function() {
var o = this.state;	
if(!o.section_id)o.section_id="1";
var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
var snsTopic_data=G_selected_dataModelArray_byArray(Vo.getTypeList("snstopic_type"),"key","val");
  return (
   React.createElement("div", null, 
    React.createElement("div", {className: "header"}, 
     React.createElement("hr", null)
    ), 
  	React.createElement("div", {className: "am-g"}, 
  	 React.createElement("div", {className: "am-u-lg-6 am-u-sm-12"}, 
  	  React.createElement("form", {id: "snsAnnouncementsForm", method: "post", className: "am-form"}, 
  		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 

	       React.createElement("label", {className: one_classDiv}, "分类:"), 
		     React.createElement("div", {className: two_classDiv}, 
		     React.createElement("div", {className: "am-form-group"}, 
			    React.createElement(AMUIReact.Selected, {className: "data-am-selected", btnStyle: "data-am-selected", name: "section_id", onChange: this.handleChange_Select, btnWidth: "200", data: snsTopic_data, value: o.section_id+""})
			    )
			    ), 


	       React.createElement("label", {className: one_classDiv}, "标题:"), 
 		     React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxLength: "128", placeholder: "不超过128位"})
		        ), 
		       
		       
	    React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange})
	   
	    
	
	  ), 
	    React.createElement("div", {id: this.itemListObj.divId_addButton}, "   "), 	
	    React.createElement("div", null, 
		    
		    
		    React.createElement("button", {type: "button", onClick: this.itemListObj.add_item.bind(this.itemListObj), className: "am-btn am-btn-primary"}, "添加")
		  
	    
	    ), 
	    
	    React.createElement(AMR_ButtonToolbar, null, 
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
 * 1.0
 * <话题>创建与编辑界面绘制；
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * 
 * {"title":"1","ind":"2","uuid":""}
 * */    
var Sns_snsTopic_itemList_item = React.createClass({displayName: "Sns_snsTopic_itemList_item", 
 getInitialState: function() {
	 var o = this.props.formdata;	
	this.input_id="snstopic_itemList_item_title"+o.ind;
	    return o;
	  },
 handleChange: function(event) {
	 this.state.title=$("#"+this.input_id).val();
	    this.setState(this.state);
  },
 
  componentDidMount:function(){
    
	 },
render: function() {

var o = this.state;	
var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
//{"content":"aaa","itemList":[{"title":"1","ind":"2","uuid":""}
//,{"title":"2","ind":"3","uuid":""}],"section_id":10,"title":"dd","uuid":""}
  return (
		  React.createElement("div", null, 
	    	React.createElement("label", {className: one_classDiv}, "选项", o.ind, "："), 
	    	React.createElement("div", {className: two_classDiv}, 
	    	React.createElement(PxInput, {type: "text", title: o.uuid+"_"+o.ind, name: "snstopic_itemList_item_title", id: this.input_id, value: o.title, onChange: this.handleChange, maxLength: "128", placeholder: "不超过128位"})
	      

		    )
	    	)
  );
}
}); 
//<button type="button"  onClick={ this.props.delItem.bind(this)}  className="am-btn am-btn-primary">删除</button>

/* 
 * 1.0
*<话题>Show详情绘制（内含:点赞、举报、回复等）
* */
var sns_snsTopicshow = React.createClass({displayName: "sns_snsTopicshow",
	//初始进入默认顶部位置浏览;
	componentDidMount:function(){
		$("html,body").animate({scrollTop:0},200);
	},
	//创建精品文章点击按钮事件跳转kd_servise方法;
  handleClick: function(m,uuid) {
   PxSnsService.btnclick_sns_snsTopic(m,uuid);
   }, 
render: function() {
  var o = this.props.data;
  var data={title:o.title,content:o.content,uuid:o.uuid,status:this.props.dianZan,yes_count:o.yes_count,no_count:o.no_count,isFavor:this.props.isFavor};
  var edit_btn_className="G_Edit_hide";
  if(this.props.canEdit)edit_btn_className="G_Edit_show";
 
return (

  React.createElement("div", {className: "max_with_lg px_margin_div"}, 

	  React.createElement("article", {className: "am-article px_margin_div"}, 
  React.createElement("div", {className: "am-article-hd"}, 
    React.createElement("h1", {className: "am-article-title text-align_center "}, o.title), 
    React.createElement("p", {className: "am-article-meta am-text-default text-align_center "}, 
	GTimeShow.getYMD(o.create_time)+" | "+o.create_user+ " |", 
		  React.createElement("i", {className: "am-icon-thumbs-up am-margin-sm "}, o.yes_count), 
			  
		    "|", 
			React.createElement("i", {className: "am-icon-thumbs-down  am-margin-sm"}, " ", o.no_count), 
			 
		  " | 评论"+o.reply_count+" | 浏览"+this.props.count
	  )
  ), 

  React.createElement("div", {className: "am-article-bd ", dangerouslySetInnerHTML: {__html: o.content}}
 
  )
), 

	  
      React.createElement(AMR_ButtonToolbar, null, 
       React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.uuid)}, "编辑"), 
       React.createElement(AMR_Button, {className: edit_btn_className, amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.uuid)}, "删除")
      ), 	

         React.createElement(Sns_comment_actions, {data: data, url: this.props.share_url}), 
    	 React.createElement(TabSnsTopicSelect, {uuid: o.uuid, type: 71, url: this.props.share_url}), 		
		React.createElement(Sns_ajax_reply_save, {uuid: o.uuid, type: 71})
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
	//收藏按钮方法; 
	  favorites_push: function(obj) {
		  if(obj.isFavor==false)return;
		  var url=this.props.url;
		  obj.isFavor=false;
		  this.setState(obj);
		commons_ajax_favorites_push(obj.title,71,obj.uuid,url)
	  },
	  gogogo: function() {
		  $("html,body").animate({scrollTop:$(document.body).height()},200);	
		  if(replyEditor)replyEditor.focus();

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
	    	React.createElement("div", {className: "am-comment-actions am-cf"}, 
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.yes_click.bind(this,obj)}, React.createElement("i", {className: "am-icon-thumbs-up px_font_size_click "+yesClick})), "点赞", obj.yes_count, "人", 		    	
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.no_click.bind(this,obj)}, React.createElement("i", {className: "am-icon-thumbs-down px_font_size_click "+noClick})), "反对", obj.no_count, "人", 	
             React.createElement("a", {href: "javascript:void(0);", onClick: this.favorites_push.bind(this,obj)}, React.createElement("i", {className: obj.isFavor?"am-icon-heart px_font_size_click":"am-icon-heart px-icon-hasdianzan px_font_size_click"}), obj.isFavor?"收藏":"已收藏"), 	    	 	    	 
             React.createElement("a", {href: "javascript:void(0);", className: G_CallPhoneFN.canShareUrl()?"":"am-hide", onClick: G_CallPhoneFN.setShareContent.bind(this,obj.title,obj.content,null,this.props.url)}, React.createElement("i", {className: "am-icon-share-alt-square px_font_size_click"}), "分享"), 	    	 	    	 

             React.createElement("a", {href: "javascript:void(0);", onClick: this.gogogo.bind()}, React.createElement("i", {className: "am-icon-reply px_font_size_click"}), "评论"), 

			 React.createElement("a", {href: "javascript:void(0);", className: "am-fr", onClick: common_check_illegal.bind(this,71,obj.uuid)}, React.createElement("i", {className: "am-icon-exclamation-circle px_font_size_click"}), "举报"), 
            
             React.createElement("legend", null)
	    	)
	    )
  );
}
}); 

//±±±±±±±±±±±±±±±±±±±±±话题回复代码块±±±±±±±±±±±±±±±±±±±±±
//±±±±±±±±±±±±±±±±±±±±±±±±±分页栏方法±±±±±±±±±±±±±±±±±±±±±±

//分页栏方法;
var TabSnsTopicSelect = React.createClass({displayName: "TabSnsTopicSelect",
	  getInitialState: function() {
	    return {
	      key: '1',
	      uuid:this.props.uuid,
	      type:this.props.type,
	      url:this.props.url
	    };
	  },
		componentDidMount:function(){			
		this.loadSnsTopicList(this.state.key);
		},
	  handleSelect: function(key) {  
	  this.loadSnsTopicList(key);

	  },
	  loadSnsTopicList: function(key) {
		  var that=this.props;
		    var divid;
		    if(key=="1"){
		    	divid="topSnsreplylist_div_1";
		    }else if(key=="2"){
		    	divid="topSnsreplylist_div_2";
		    }else{
		    	divid="topSnsreplylist_div_3";
		    }
		    React.render(React.createElement(Sns_reply_list, {uuid:that.uuid,type:that.type,url:that.url,snskey:key}),document.getElementById(divid));  	
		  },

	  render: function() {

	    return (
	      React.createElement(Tabs, {defaultActiveKey: this.state.key, onSelect: this.handleSelect}, 
	        React.createElement(Tabs.Item, {eventKey: "1", title: "最新评论"}, 
	        React.createElement("div", {id: "topSnsreplylist_div_1"})
	        ), 
	        React.createElement(Tabs.Item, {eventKey: "2", title: "热门评论"}, 
	        React.createElement("div", {id: "topSnsreplylist_div_2"})
	        ), 
	        React.createElement(Tabs.Item, {eventKey: "3", title: "最早评论"}, 
	        React.createElement("div", {id: "topSnsreplylist_div_3"})
	        )
	      )
	    );
	  }
	});
/*
 * <话题>回复列表
 * 绘制舞台方法
 * */
var Sns_reply_list = React.createClass({displayName: "Sns_reply_list", 
	load_more_btn_id:"Sns_reply_list_load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps: function(nextProps) {
		  this.refreshReplyList();
			var that=this;
			reply_callback_save=function(){that.refreshReplyList();};
		},
	componentDidMount:function(){
		this.refreshReplyList();
		var that=this;
		reply_callback_save=function(){that.refreshReplyList();};
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
		var re_data=PxSnsService.ajax_sns_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,this.props.type,this.props.snskey,callback);		  
	},
	refreshReplyList:function(){
		$("#"+this.classnewsreply_list_div).html("");
		this.pageNo=1;
		this.load_more_data();
	},

render: function() {
	this.load_more_btn_id="Sns_reply_list_load_more_"+this.props.snskey;
	this.classnewsreply_list_div="topSnsreplylist_"+this.props.snskey;
	var parentThis=this;
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

//<话题>我要评论模块
//that.refreshReplyList();自己写的一个刷新方法 置空一切到初始状态然后绘制;
var Sns_ajax_reply_save = React.createClass({displayName: "Sns_ajax_reply_save", 
	classnewsreply_list_div:"classnewsreply_list_div",
	reply_save_btn_click:function(){
		var that=this.props.parentThis;
		PxSnsService.ajax_sns_reply_save(function(){
			$("#snstopic_replay_content").val("");
			
			if(typeof reply_callback_save=='function')reply_callback_save();
		    
		},'snstopic_replayForm')
	},
	componentDidMount:function(){
		replyEditor=$( '#snstopic_replay_content').xheditor(xhEditor_upImgOption_emot);
	},
render: function() {
	var type=this.props.type;
return (
React.createElement("form", {id: "snstopic_replayForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
     React.createElement("input", {type: "hidden", name: "topic_uuid", value: this.props.uuid}), 
	 React.createElement("input", {type: "hidden", name: "type", value: type}), 			
	 React.createElement(AMR_Input, {id: "snstopic_replay_content", type: "textarea", rows: "4", label: "我要评论", placeholder: "填写内容", name: "content"}), 
	 React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this), className: "am-btn am-btn-primary"}, "提交")		      
)	   
);
}	
});


/*
 *<话题>评论信息列表绘制 
 * */
var Sns_reply_list_show = React.createClass({displayName: "Sns_reply_list_show",
	render: function() {
		var that=this;
	  return (
   React.createElement("div", null, 
     this.props.events.data.map(function(event) {
	   if(!event.create_img)event.create_img=G_def_headImgPath;
        return (
		  React.createElement("article", {className: "am-comment am-comment-success am-margin-xs"}, 
		   React.createElement("a", {href: "javascript:void(0);"}, 
		    React.createElement("img", {src: event.create_img, className: "am-comment-avatar", width: "48", height: "48"})
		   ), 
		 React.createElement("div", {className: "am-comment-main "}, 
		 
		    React.createElement("header", {className: "am-comment-hd"}, 
		      React.createElement("div", {className: "am-comment-meta"}, 
		      React.createElement("a", {href: "#link-to-user", className: "am-comment-author"}, "来自", event.create_user, "的回复")
		      )
		    ), 
		     React.createElement("div", {className: "am-comment-bd  am-inline"}, 
		      React.createElement("div", {dangerouslySetInnerHTML: {__html:event.content}})
  		     ), 	    	
	    	React.createElement(Sns_snsReply_comment_actions, {data: event, snskey: that.props.snskey, topic_uuid: that.props.topic_uuid})
	      )
		 )			    		
 	      )
       })		
  )		   
	  );
	 }
	}); 
/*
 * 评论同意和不同意抽离方法
 * 功能：实现动态点击和双灰功能
 * */
var Sns_snsReply_comment_actions = React.createClass({displayName: "Sns_snsReply_comment_actions", 
	getInitialState: function() {
		if(this.props.data)return this.props.data;
	  },
	 callback_yes:function(o){
		 var obj=this.state;
		 if(obj.dianZan==1){
			 obj.yes_count-=1;
			 obj.dianZan=null;
		 }else{
			 obj.yes_count+=1;
			 obj.dianZan=1;
		 }
		 this.setState(obj);
	 },
	 yes_click:function(o){	
		if(o.dianZan==2)return;
		 var url=hostUrl +"rest/snsReply/yes.json";
		 if(o.dianZan==1){
			 url=hostUrl +"rest/snsReply/cancelDianzan.json";
		 }
		 var that=this;
		 PxSnsService.ajax_sns_dianzan(url,o.uuid,that.callback_yes);
		
	 },
	 callback_no:function(){
		 var obj=this.state;
		 if(obj.dianZan==2){
			 obj.no_count-=1;
			 obj.dianZan=null;
		 }else{
			 obj.no_count+=1;
			 obj.dianZan=2;
		 }
		 this.setState(obj);
	 },
	 no_click:function(o){
		 if(o.dianZan==1)return;
		 var url=hostUrl +"rest/snsReply/no.json";
		 if(o.dianZan==2){
			 url=hostUrl +"rest/snsReply/cancelDianzan.json";
		 }
		 var that=this;
		 PxSnsService.ajax_sns_dianzan(url,o.uuid,that.callback_no);
		
	 },
//对评论的评论按钮	 
	pinlun:function(o,sky){	
		React.render(React.createElement(Sns_reply_reply_list_div,
 		 		{uuid:o.uuid,
 		 			parentThis:this,
					topic_uuid:this.props.topic_uuid,
					snskey:sky,
 		 			type:72
 		 			}), document.getElementById(this.div_reply_save_id));		
	},	
	 
render: function() {	
	var obj=this.state;
	var snskey=this.props.snskey;
	this.div_reply_save_id="btn_reply_save"+obj.uuid+snskey;
	var yesClick="",noClick="";
	if(obj.dianZan==1){
		yesClick="px-icon-hasdianzan";
		noClick="";
	}else if(obj.dianZan==2){
		noClick="px-icon-hasdianzan";
		 yesClick="";
	}	
  return (
		  React.createElement("footer", {className: "am-comment-footer"}, 
	    	React.createElement("div", {className: "am-comment-actions  am-cf"}, 		 
			  React.createElement("time", null, GTimeShow.getYMD(obj.create_time)), 
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.yes_click.bind(this,obj)}, React.createElement("i", {className: "am-icon-thumbs-up px_font_size_click "+yesClick})), obj.yes_count, 	    	
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.no_click.bind(this,obj)}, React.createElement("i", {className: "am-icon-thumbs-down px_font_size_click "+noClick})), obj.no_count, 
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.pinlun.bind(this,obj,snskey)}, React.createElement("i", {id: "btn_reply_"+obj.uuid, className: "am-icon-reply px_font_size_click"}), "回复", obj.reply_count), 
	    	 React.createElement("a", {href: "javascript:void(0);", className: "am-fr", onClick: common_check_illegal.bind(this,72,obj.uuid)}, React.createElement("i", {className: "am-icon-exclamation-circle px_font_size_click"}), "举报"), 

	    	 React.createElement("div", {id: this.div_reply_save_id}, "   ")	

		   )
	    )
  );
}
}); 


/*
 * <话题>评论的评论的绘制舞台
 * 绘制舞台方法
 * */
var Sns_reply_reply_list_div = React.createClass({displayName: "Sns_reply_reply_list_div", 
	load_more_btn_id:"Sns_reply_reply_load_more_",
	pageNo:1,
	classnewsreply_list_div:"classnewsreply_list_div",
	componentDidMount:function(){
		this.refreshReplyList();
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
	var re_data=PxSnsService.ajax_sns_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,this.props.type,this.props.snskey,callback);		  
},
	refreshReplyList:function(){
		$("#"+this.classnewsreply_list_div).html("");
		this.pageNo=1;
		this.load_more_data();
	},

render: function() {
	this.load_more_btn_id="Sns_reply_reply_load_more_"+this.props.uuid+this.props.snskey;
	this.classnewsreply_list_div="classnewsreply_list_div"+this.props.uuid+this.props.snskey;
	var parentThis=this;
  return (
      React.createElement("div", null, 
       React.createElement("div", {id: this.classnewsreply_list_div}), 
       React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多"), 
	   React.createElement(SnsReply_reply_save, {uuid: this.props.uuid, topic_uuid: this.props.topic_uuid, type: this.props.type, parentThis: parentThis})						 
	  )
  );
}
});

//that.refreshReplyList();自己写的一个刷新方法 置空一切到初始状态然后绘制;
var SnsReply_reply_save = React.createClass({displayName: "SnsReply_reply_save", 
	classnewsreply_list_div:"classnewsreply_list_div",
	formid:"snsreply_replyForm",
	form_content_id:"form_content_id",
	reply_save_btn_click:function(form_content_id){
		var that=this.props.parentThis;
		PxSnsService.ajax_sns_reply_save(function(){
			$("#"+form_content_id).val("");
			that.refreshReplyList();		
		},this.formid)
	},
	componentDidMount:function(){
		$("#"+this.form_content_id).xheditor(xhEditor_upImgOption_emot);
	},
render: function() {
	var type=this.props.type;
	this.formid="snsreply_replyForm"+this.props.uuid+this.props.snskey;
	this.form_content_id="form_content_id"+this.props.uuid+this.props.snskey;

return (
React.createElement("form", {id: this.formid, method: "post", className: "am-form", action: "javascript:void(0);"}, 
React.createElement("input", {type: "hidden", name: "topic_uuid", value: this.props.topic_uuid}), 
React.createElement("input", {type: "hidden", name: "reply_uuid", value: this.props.uuid}), 
	 React.createElement("input", {type: "hidden", name: "type", value: type}), 			
	 React.createElement(AMR_Input, {id: this.form_content_id, type: "textarea", rows: "4", label: "我要评论", placeholder: "填写内容", name: "content"}), 
	 React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this,this.form_content_id), className: "am-btn am-btn-primary"}, "提交")		      
)	   
);
}	
});

/*
 *评论的评论列表绘制
 * */
var Sns_pinglun_list = React.createClass({displayName: "Sns_pinglun_list", 	
	 render: function() {
	 return (
	 		  React.createElement("div", null, 
	 		  this.props.events.data.map(function(event) {
	 		      return (
	 		    		 React.createElement("ul", {className: "am-list"}, 
	 		    		  React.createElement("li", {className: "am-comment am-cf"}, 
	 		    		  React.createElement("span", {className: "am-comment-author am-fl"}, event.create_user+":"), 
	 				        React.createElement("span", {className: "am-fl", dangerouslySetInnerHTML: {__html:event.content}}), 
	 				       React.createElement(Sns_reply_reply_reply_actions, {data: event})
	 				        )
	 				      )
	 		    		  )
	 		  })
	 		
	 		    )		   
	 );
	 }
	 }); 

/*
 * 话题-评论的评论的评论同意和不同意抽离方法
 * 功能：实现动态点击和双灰功能
 * removeClass("am-text-danger");
 * */
var Sns_reply_reply_reply_actions = React.createClass({displayName: "Sns_reply_reply_reply_actions", 
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
		 var url=hostUrl +"rest/snsReply/yes.json";
		 if(o.status==1){
			 url=hostUrl +"rest/snsReply/cancelDianzan.json";
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
		 var url=hostUrl +"rest/snsReply/no.json";
		 if(o.status==2){
			 url=hostUrl +"rest/snsReply/cancelDianzan.json";
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
	    	React.createElement("div", {className: "am-comment-actions am-cf"}, 
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.yes_click.bind(this,obj)}, React.createElement("i", {className: "am-icon-thumbs-up px_font_size_click "+yesClick})), obj.yes_count, 	    	
	    	 React.createElement("a", {href: "javascript:void(0);", onClick: this.no_click.bind(this,obj)}, React.createElement("i", {className: "am-icon-thumbs-down px_font_size_click "+noClick})), obj.no_count, 	
			 React.createElement("a", {href: "javascript:void(0);", className: "am-fr", onClick: common_check_illegal.bind(this,72,obj.uuid)}, React.createElement("i", {className: "am-icon-exclamation-circle px_font_size_click"}), "举报")
	    	)
	    )
  );
}
}); 

//±±±±±±±±±±±±±±±±±±±±±±±±±分页栏方法±±±±±±±±±±±±±±±±±±±±±±


//分页栏方法;
var TabsSelect = React.createClass({displayName: "TabsSelect",
	  getInitialState: function() {
	    return {
	      key: '1'
	    };
	  },
		componentDidMount:function(){			
		this.loadSnsTopicList(this.state.key);
		},
	  handleSelect: function(key) {
	    //console.log('你点击了：', key);
		  
	  this.loadSnsTopicList(key);

	  },
	  loadSnsTopicList: function(key) {
		    //console.log('你点击了：', key);
		    var divid;
		    if(key=="1"){
		    	divid="topiclist_div_1";
		    }else if(key=="2"){
		    	divid="topiclist_div_2";
		    }else{
		    	divid="topiclist_div_3";
		    }
		    React.render(React.createElement(Sns_Div, {snsKey:key}),document.getElementById(divid));  	

		  },

	  render: function() {
	    return (
	      React.createElement(Tabs, {defaultActiveKey: this.state.key, onSelect: this.handleSelect}, 
	        React.createElement(Tabs.Item, {eventKey: "1", title: "最新话题"}, 
	        React.createElement("div", {id: "topiclist_div_1"})
	        ), 
	        React.createElement(Tabs.Item, {eventKey: "2", title: "热门话题"}, 
	        React.createElement("div", {id: "topiclist_div_2"})
	        ), 
	        React.createElement(Tabs.Item, {eventKey: "3", title: "精华话题"}, 
	        React.createElement("div", {id: "topiclist_div_3"})
	        )
	      )
	    );
	  }
	});










