
var Tabs=AMUIReact.Tabs;
var replyEditor=null;
var reply_callback_save=null;
//——————————————————————————话题<绘制>—————————————————————  
/* 
 * <话题>绘制舞台1.0
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * */
var Sns_Div = React.createClass({ 
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
//创建话题点击按钮事件跳转sns_servise方法;
	wulala: function() {
		Modal_prompt.showLogin();
},
render: function() {
	this.classnewsreply_list_div="snstopicList_"+this.props.snsKey
	this.load_more_btn_id="load_more_"+this.props.snsKey;
		var toolbar=null;
		//家长模式,右上角创建
		if(typeof SnsIndexPage=='undefined'){
			 toolbar=(
			  <AMR_ButtonToolbar>
				 <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "add")} >创建话题</AMR_Button>
				</AMR_ButtonToolbar>
			);
		}
  return (			
		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">
	{toolbar} 	
	  <AMR_ButtonToolbar>
		 <AMR_Button amStyle="secondary" onClick={this.wulala.bind(this,3)} >弹出实验框</AMR_Button>
		</AMR_ButtonToolbar>
		  <div  id={this.classnewsreply_list_div} className="am-list-news-bd">		   		    
		  </div>
		  
		  <div className="am-list-news-ft">
		    <a className="am-list-news-more am-btn am-btn-default " id={this.load_more_btn_id} onClick={this.load_more_data.bind(this)}>查看更多 &raquo;</a>
		  </div>
		  
		</div>			
  );
}
});
 
/*
 * 1.0
 *<话题>列表舞台建立后根据请求数据绘制列表内容
 * */
var sns_list_snsTopic_rect = React.createClass({ 
	  render: function() {
	    var events = this.props.events;
	    var length;
	    var img_fine=hostUrlCDN+"i/fine1.png";
	    var img_hot=hostUrlCDN+"i/hot1.png";
	    var className = events.highlight ? 'am-active' :
    events.disabled ? 'am-disabled' : '';
    return (
     <div  data-am-widget="list_news" className="am-list-news am-list-news-default">
      <div className="am-list-news-bd">
       <ul className="am-list">
		  {this.props.events.data.map(function(event) {
			  if(!event.imgList)event.imgList=[];
			  length=event.imgList.length;
		      return (
       <li className="am-g am-list-item-dated" onClick={PxSnsService.ajax_sns_snsTopic_show.bind(this,event.uuid)}>
		 <a href="javascript:void(0);" className="am-list-item-hd snsTopic_list_title">
		 <AMUIReact.Image width="28" height="28" className={event.level==9?"am-show":"am-hide"}  id="img_head_image" src={img_fine}/>
		 <AMUIReact.Image width="28" height="28" className={event.level==1?"am-show":"am-hide"} id="img_head_image" src={img_hot}/>
         {event.title}
  		 </a>	
            <div className="am-list-item-text">
            <h4 >{event.summary}</h4>
            </div>
            
            {event.imgList.map(function(event) {
            	 return (
            		<AMUIReact.Image  className={length==0?"am-hide":"am-show"}   id="img_head_image" thumbnail width="88" height="88" src={event}/>           	 
            	 )
            })}         
  		   <div className="am-list-item-text">
  		    作者：{event.create_user} |  点赞  {event.yes_count}  |  有{event.reply_count}人回复  |   <time>{GTimeShow.getYMD(event.create_time)}</time>
  		   </div> 
  		   
  	   </li>
		    )
		})}	
	  </ul> 
	 </div> 
    </div>  		  
	 );
}
}); 

/*
 * 1.0
 * <话题>创建与编辑界面绘制；
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * */    
var Sns_snsTopic_add_edit = React.createClass({ 
 getInitialState: function() {
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
	 },
	preview_fn:function(){
     G_html_preview("t_iframe", this.state.url,this.editor.getSource(),this.state.title);
       }, 
render: function() {
var o = this.state;	
if(!o.section_id)o.section_id="1";
var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
var snsTopic_data=G_selected_dataModelArray_byArray(Vo.getTypeList("snstopic_type"),"key","val");
  return (
   <div>
    <div className="header">
     <hr />
    </div>
  	<div className="am-g">
  	 <div className="am-u-lg-6 am-u-sm-12">  
  	  <form id="snsAnnouncementsForm" method="post" className="am-form">
  		<input type="hidden" name="uuid"  value={o.uuid}/>

	       <label className={one_classDiv}>分类:</label>
		     <div className={two_classDiv}>
		     <div className="am-form-group">
			    <AMUIReact.Selected  className="data-am-selected" btnStyle="data-am-selected" name="section_id"  onChange={this.handleChange_Select} btnWidth="200" data={snsTopic_data} value={o.section_id+""} />   
			    </div>
			    </div>


	       <label className={one_classDiv}>标题:</label>
 		     <div className={two_classDiv}>
		       <PxInput type="text" name="title" id="title" value={o.title} onChange={this.handleChange} maxLength="128"   placeholder="不超过128位"/>
		        </div>
		       
		       
	    <AMR_Input id="announce_message" type="textarea" rows="10" label="内容:" placeholder="填写内容" name="content" value={o.content} onChange={this.handleChange}/>
	   
	    <AMR_ButtonToolbar>
	    {G_get_upload_img_Div()} 
	    <button type="button"  onClick={PxSnsService.ajax_sns_snsTopic_save}  className="am-btn am-btn-primary">提交</button>
	    <button type="button"  onClick={this.preview_fn.bind(this)}  className="am-btn am-btn-primary">预览</button>
	    </AMR_ButtonToolbar>
	  </form>
    </div>

	  <div  className="am-u-lg-6 am-u-sm-12 ">
       <G_phone_iframe />
      </div>
   </div>	   
  </div>
  );
}
}); 
/* 
 * 1.0
*<话题>Show详情绘制（内含:点赞、举报、回复等）
* */
var sns_snsTopicshow = React.createClass({
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

  <div className="max_with_lg px_margin_div">

	  <article className="am-article px_margin_div">
  <div className="am-article-hd">
    <h1 className="am-article-title text-align_center ">{o.title}</h1>
    <p className="am-article-meta am-text-default text-align_center ">
	{GTimeShow.getYMD(o.create_time)+" | "+o.create_user+ " |"}
		  <i className='am-icon-thumbs-up am-margin-sm '>{o.yes_count}</i>
			  
		    |
			<i className='am-icon-thumbs-down  am-margin-sm'> {o.no_count}</i>
			 
		  {" | 评论"+o.reply_count+" | 浏览"+this.props.count}
	  </p>
  </div>

  <div className="am-article-bd "  dangerouslySetInnerHTML={{__html: o.content}}>
 
  </div>
</article>

	  
      <AMR_ButtonToolbar>
       <AMR_Button className={edit_btn_className} amStyle="primary" onClick={this.handleClick.bind(this, "edit",o.uuid)} >编辑</AMR_Button>
       <AMR_Button className={edit_btn_className} amStyle="danger" onClick={this.handleClick.bind(this, "del",o.uuid)} >删除</AMR_Button> 
      </AMR_ButtonToolbar>	

         <Sns_comment_actions data={data} url={this.props.share_url}/>
    	 <TabSnsTopicSelect uuid={o.uuid}  type={71} url={this.props.share_url} />		
		<Sns_ajax_reply_save uuid={o.uuid}  type={71}/>
    </div>
  );
 }
}); 
/*
 * 话题同意和不同意抽离方法
 * 功能：实现动态点击和双灰功能
 * removeClass("am-text-danger");
 * */
var Sns_comment_actions = React.createClass({ 
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
		  <footer className="am-comment-footer">
	    	<div className="am-comment-actions am-cf">
	    	 <a href="javascript:void(0);"  onClick={this.yes_click.bind(this,obj)}><i className={"am-icon-thumbs-up px_font_size_click "+yesClick}></i></a>点赞{obj.yes_count}人		    	
	    	 <a href="javascript:void(0);"  onClick={this.no_click.bind(this,obj)}><i className={"am-icon-thumbs-down px_font_size_click "+noClick}></i></a>反对{obj.no_count}人	
             <a href="javascript:void(0);"  onClick={this.favorites_push.bind(this,obj)}><i className={obj.isFavor?"am-icon-heart px_font_size_click":"am-icon-heart px-icon-hasdianzan px_font_size_click"}></i>{obj.isFavor?"收藏":"已收藏"}</a>	    	 	    	 
             <a href="javascript:void(0);"  className={G_CallPhoneFN.canShareUrl()?"":"am-hide"}  onClick={G_CallPhoneFN.setShareContent.bind(this,obj.title,obj.content,null,this.props.url)}><i className={"am-icon-share-alt-square px_font_size_click"}></i>分享</a>	    	 	    	 

             <a href="javascript:void(0);" onClick={this.gogogo.bind()}><i className="am-icon-reply px_font_size_click"></i>评论</a> 

			 <a href="javascript:void(0);" className="am-fr"  onClick={common_check_illegal.bind(this,71,obj.uuid)}><i className={"am-icon-exclamation-circle px_font_size_click"}></i>举报</a>
            
             <legend></legend> 
	    	</div>
	    </footer>
  );
}
}); 

//±±±±±±±±±±±±±±±±±±±±±话题回复代码块±±±±±±±±±±±±±±±±±±±±±
//±±±±±±±±±±±±±±±±±±±±±±±±±分页栏方法±±±±±±±±±±±±±±±±±±±±±±

//分页栏方法;
var TabSnsTopicSelect = React.createClass({
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
	      <Tabs defaultActiveKey={this.state.key} onSelect={this.handleSelect}>
	        <Tabs.Item eventKey="1" title="最新评论">
	        <div id="topSnsreplylist_div_1"></div>
	        </Tabs.Item>
	        <Tabs.Item eventKey="2" title="热门评论">
	        <div id="topSnsreplylist_div_2"></div>
	        </Tabs.Item>
	        <Tabs.Item eventKey="3" title="最早评论">
	        <div id="topSnsreplylist_div_3"></div>
	        </Tabs.Item>
	      </Tabs>
	    );
	  }
	});
/*
 * <话题>回复列表
 * 绘制舞台方法
 * */
var Sns_reply_list = React.createClass({ 
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

		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">	    
		  <div  id={this.classnewsreply_list_div} className="am-list-news-bd">		   		    
		  </div>
		  
		  <div className="am-list-news-ft">
		    <a className="am-list-news-more am-btn am-btn-default " id={this.load_more_btn_id} onClick={this.load_more_data.bind(this)}>查看更多 &raquo;</a>
		  </div>
		</div>	
  );
}
});

//<话题>我要评论模块
//that.refreshReplyList();自己写的一个刷新方法 置空一切到初始状态然后绘制;
var Sns_ajax_reply_save = React.createClass({ 
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
<form id="snstopic_replayForm" method="post" className="am-form" action="javascript:void(0);">
     <input type="hidden" name="topic_uuid"  value={this.props.uuid}/>
	 <input type="hidden" name="type"  value={type}/>			
	 <AMR_Input id="snstopic_replay_content" type="textarea" rows="4" label="我要评论" placeholder="填写内容" name="content" />
	 <button type="button"  onClick={this.reply_save_btn_click.bind(this)}  className="am-btn am-btn-primary">提交</button>		      
</form>	   
);
}	
});


/*
 *<话题>评论信息列表绘制 
 * */
var Sns_reply_list_show = React.createClass({
	render: function() {
		var that=this;
	  return (
   <div>
     {this.props.events.data.map(function(event) {
	   if(!event.create_img)event.create_img=G_def_headImgPath;
        return (
		  <article className="am-comment am-comment-success am-margin-xs">
		   <a href="javascript:void(0);">
		    <img src={event.create_img} className="am-comment-avatar" width="48" height="48"/>
		   </a>
		 <div className="am-comment-main ">
		 
		    <header className="am-comment-hd">
		      <div className="am-comment-meta">
		      <a href="#link-to-user" className="am-comment-author">来自{event.create_user}的回复</a>
		      </div>
		    </header>
		     <div className="am-comment-bd  am-inline">
		      <div dangerouslySetInnerHTML={{__html:event.content}}></div>
  		     </div>	    	
	    	<Sns_snsReply_comment_actions data={event} snskey={that.props.snskey} topic_uuid={that.props.topic_uuid} />
	      </div>
		 </article>			    		
 	      )
       })}		
  </div>		   
	  );
	 }
	}); 
/*
 * 评论同意和不同意抽离方法
 * 功能：实现动态点击和双灰功能
 * */
var Sns_snsReply_comment_actions = React.createClass({ 
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
		  <footer className="am-comment-footer">
	    	<div className="am-comment-actions  am-cf">		 
			  <time>{GTimeShow.getYMD(obj.create_time)}</time>
	    	 <a href="javascript:void(0);"  onClick={this.yes_click.bind(this,obj)}><i className={"am-icon-thumbs-up px_font_size_click "+yesClick}></i></a>{obj.yes_count}	    	
	    	 <a href="javascript:void(0);"  onClick={this.no_click.bind(this,obj)}><i className={"am-icon-thumbs-down px_font_size_click "+noClick}></i></a>{obj.no_count}
	    	 <a href="javascript:void(0);"  onClick={this.pinlun.bind(this,obj,snskey)}><i id={"btn_reply_"+obj.uuid} className="am-icon-reply px_font_size_click"></i>回复{obj.reply_count}</a>
	    	 <a href="javascript:void(0);"  className="am-fr" onClick={common_check_illegal.bind(this,72,obj.uuid)}><i className={"am-icon-exclamation-circle px_font_size_click"}></i>举报</a>

	    	 <div id={this.div_reply_save_id}>			</div>	

		   </div>
	    </footer>
  );
}
}); 


/*
 * <话题>评论的评论的绘制舞台
 * 绘制舞台方法
 * */
var Sns_reply_reply_list_div = React.createClass({ 
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
      <div>
       <div id={this.classnewsreply_list_div}></div>
       <button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>
	   <SnsReply_reply_save uuid={this.props.uuid}  topic_uuid={this.props.topic_uuid} type={this.props.type} parentThis={parentThis}/>						 
	  </div>
  );
}
});

//that.refreshReplyList();自己写的一个刷新方法 置空一切到初始状态然后绘制;
var SnsReply_reply_save = React.createClass({ 
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
<form id={this.formid} method="post" className="am-form" action="javascript:void(0);">
<input type="hidden" name="topic_uuid"  value={this.props.topic_uuid}/> 
<input type="hidden" name="reply_uuid"  value={this.props.uuid}/> 
	 <input type="hidden" name="type"  value={type}/>			
	 <AMR_Input id={this.form_content_id} type="textarea" rows="4" label="我要评论" placeholder="填写内容" name="content" />
	 <button type="button"  onClick={this.reply_save_btn_click.bind(this,this.form_content_id)}  className="am-btn am-btn-primary">提交</button>		      
</form>	   
);
}	
});

/*
 *评论的评论列表绘制
 * */
var Sns_pinglun_list = React.createClass({ 	
	 render: function() {
	 return (
	 		  <div>
	 		  {this.props.events.data.map(function(event) {
	 		      return (
	 		    		 <ul className="am-list">
	 		    		  <li className="am-comment am-cf">
	 		    		  <span className="am-comment-author am-fl">{event.create_user+":"}</span>
	 				        <span className="am-fl" dangerouslySetInnerHTML={{__html:event.content}}></span>
	 				       <Sns_reply_reply_reply_actions data={event} />
	 				        </li>
	 				      </ul>
	 		    		  )
	 		  })}
	 		
	 		    </div>		   
	 );
	 }
	 }); 

/*
 * 话题-评论的评论的评论同意和不同意抽离方法
 * 功能：实现动态点击和双灰功能
 * removeClass("am-text-danger");
 * */
var Sns_reply_reply_reply_actions = React.createClass({ 
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
		  <footer className="am-comment-footer">
	    	<div className="am-comment-actions am-cf">
	    	 <a href="javascript:void(0);"  onClick={this.yes_click.bind(this,obj)}><i className={"am-icon-thumbs-up px_font_size_click "+yesClick}></i></a>{obj.yes_count}	    	
	    	 <a href="javascript:void(0);"  onClick={this.no_click.bind(this,obj)}><i className={"am-icon-thumbs-down px_font_size_click "+noClick}></i></a>{obj.no_count}	
			 <a href="javascript:void(0);" className="am-fr"  onClick={common_check_illegal.bind(this,72,obj.uuid)}><i className={"am-icon-exclamation-circle px_font_size_click"}></i>举报</a>                      
	    	</div>
	    </footer>
  );
}
}); 

//±±±±±±±±±±±±±±±±±±±±±±±±±分页栏方法±±±±±±±±±±±±±±±±±±±±±±


//分页栏方法;
var TabsSelect = React.createClass({
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
	      <Tabs defaultActiveKey={this.state.key} onSelect={this.handleSelect}>
	        <Tabs.Item eventKey="1" title="最新话题">
	        <div id="topiclist_div_1"></div>
	        </Tabs.Item>
	        <Tabs.Item eventKey="2" title="热门话题">
	        <div id="topiclist_div_2"></div>
	        </Tabs.Item>
	        <Tabs.Item eventKey="3" title="精华话题">
	        <div id="topiclist_div_3"></div>
	        </Tabs.Item>
	      </Tabs>
	    );
	  }
	});










