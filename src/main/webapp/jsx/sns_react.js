//——————————————————————————话题<绘制>—————————————————————  

/* 
 * <话题>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @btn_click_announce:点击按钮事件跳转kd_servise方法;
 * */
var Sns_good_Div_list = React.createClass({ 
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
	//创建话题点击按钮事件跳转sns_servise方法;
  	handleClick: function(m) {
  		PxSnsService.btnclick_sns_announce(m);
},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">

		   <AMR_ButtonToolbar>
		    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "add")} >创建话题</AMR_Button>
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
 *<话题>表格内容绘制
 * 在kd_react；
 * */
var sns_mygoodlist_div = React.createClass({ 
	  render: function() {
	    var events = this.props.events;
	    var className = events.highlight ? 'am-active' :
    events.disabled ? 'am-disabled' : '';
//				//如果相等为True不等为false用于判断编辑与删除是否
//				for(var i=0;i<events.data.length;i++){
//					if(events.data[i].create_useruuid==Store.getUserinfo().uuid){
//						events.data[i].canEdit=true;
//					}else{
//                      events.data[i].canEdit=false;
//					}
//				} 
	    return (
	    	     <div  data-am-widget="list_news" className="am-list-news am-list-news-default">
	    	     <div className="am-list-news-bd">
	    	     <ul className="am-list">
	    			  {this.props.events.data.map(function(event) {
	    			      return (
	    			    		<li className="am-g am-list-item-dated">
	    			  		    <a href="javascript:void(0);" className="am-list-item-hd" onClick={react_ajax_announce_good_show.bind(this,event.uuid,event.title)}>
	    			  		  {event.title} 
	    			  		  </a>		  
	    			  		  <div className="am-list-item-text">
	    			  		  {event.create_user}|{event.create_time}
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
 * (精品文章)创建与编辑界面绘制；
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * */    
var Announcements_snsedit = React.createClass({ 
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
  		<div>
  		<div className="header">
  		  <hr />
  		</div>
  		<div className="am-g">
  		  <div className="am-u-lg-6 am-u-sm-12">
  		  <form id="snsAnnouncementsForm" method="post" className="am-form">
  		<input type="hidden" name="uuid"  value={o.uuid}/>
	    <input type="hidden" name="section_id"  value={o.section_id}/>

  		  <label htmlFor="name">标题:</label>
  		  <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} maxLength="128"   placeholder="不超过128位"/>
  		  <br/>
  		  <AMR_Input id="announce_message" type="textarea" rows="10" label="内容:" placeholder="填写内容" name="content" value={o.content} onChange={this.handleChange}/>
 		{G_get_upload_img_Div()} 
  		  <button type="button"  onClick={PxSnsService.ajax_sns_save}  className="am-btn am-btn-primary">提交</button>
			    <button type="button"  onClick={this.preview_fn.bind(this)}  className="am-btn am-btn-primary">预览</button>
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
*公告点赞、评论、加载更多等详情绘制模板；
* */
var Announcements_goodshow = React.createClass({ 
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
	       iframe=(<iframe id="t_iframe"  onLoad={G_iFrameHeight.bind(this,'t_iframe')}  frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"  width="100%" height="600px" src={o.url}></iframe>)	   
	        }else{
	     iframe=(       
			<AMUIReact.Article
			title={o.title}
			meta={Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}>
			<div dangerouslySetInnerHTML={{__html: o.message}}></div>
			</AMUIReact.Article>)
	     }

return (
		  <div>
            {iframe}
		     <AMR_ButtonToolbar>
		     <AMR_Button className={edit_btn_className} amStyle="primary" onClick={this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)} >编辑</AMR_Button>
		     <AMR_Button className={edit_btn_className} amStyle="danger" onClick={this.handleClick.bind(this, "del",o.groupuuid,o.uuid)} >删除</AMR_Button> 
		     <AMR_Button  amStyle="success" onClick={this.favorites_push.bind(this,o.title,o.type,o.uuid)} >收藏</AMR_Button> 
		     <AMR_Button className={ G_CallPhoneFN.canShareUrl()?"":"am-hide"}  amStyle="primary" onClick={G_CallPhoneFN.setShareContent.bind(this,o.title,o.title,null,this.props.share_url)} >分享</AMR_Button>
		     </AMR_ButtonToolbar>	
		    	<footer className="am-comment-footer">
		    	<div className="am-comment-actions">
		    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
		    	<a href="javascript:void(0);" onClick={common_check_illegal.bind(this,3,o.uuid)}>举报</a>
		    	</div>
		    	</footer>
		    	<Common_Dianzan_show_noAction uuid={o.uuid} type={0}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
			  <Common_reply_list uuid={o.uuid}  type={0}/>			 
		   </div>
);
}
}); 



//±±±±±±±±±±±±±±±±±±±±±±±±±±±