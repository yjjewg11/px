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
var Div_kd_group_reg = React.createClass({ 	
	render: function() {
		var one_classDiv= "am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
		var two_classDiv= "am-u-lg-10 am-u-md-10 am-u-sm-8";
	return (			
			   <div>		
				<div className="header">
				  <div className="am-g">
				    <h1>幼儿园注册</h1>
				  </div>
				 <hr/>
				</div>
			     <form id="kd_group_reg_form" method="post" className="am-form">
			      <PxInput type="hidden" name="type"  value="1"/>
			       <div className= "am-form-group">			    
				  <label className={one_classDiv}>品牌名:</label>
				 <div className={two_classDiv}>
				<PxInput type="text" name="brand_name" id="brand_name"  placeholder="必填，不超过45位"/>
			   </div>					
			    <label className={one_classDiv}>机构全称:</label>
				 <div className={two_classDiv}>
			      <PxInput type="text" name="company_name" id="company_name"  placeholder="必填，不超过45位"/>
				   </div>	
			      <label className={one_classDiv}>学校地址:</label>
			     <div className={two_classDiv}>
			    <PxInput type="text" name="address" id="address"  placeholder="必填，不超过64位"/>
			     </div>	
                  <label className={one_classDiv}>地址坐标:</label>
				   <div className={two_classDiv}>
			        <PxInput type="text" name="map_point" id="map_point"  placeholder="拾取坐标后，复制到这里。格式：1.1,1.1" /> 
			         <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">坐标拾取</a>
			          </div>	
					 <label className={one_classDiv}>学校电话:</label>
					<div className={two_classDiv}>
				   <PxInput type="text" name="link_tel" id="link_tel"/>
				  </div>				      
			      <legend><b>管理人员</b></legend>  
                  <label className={one_classDiv}>手机号码:</label>
				   <div className={two_classDiv}>
					<PxInput type="text" name="tel" id="tel"/>
					 <button type="button" onClick={ajax_sms_sendCode.bind(this,"#tel",1)} className="am-btn am-btn-primary">发送验证码</button>
					  </div>	
					   <label className={one_classDiv}>验证码:</label>
					   <div className={two_classDiv}>
					  <PxInput type="text" name="smscode" id="smscode"/>
					 </div>	
					<label className={one_classDiv}>姓名:</label>
				   <div className={two_classDiv}>
				  <PxInput type="text" name="name" id="name"  placeholder="必填，不超过15位" />
				 </div>						
				  <label className={one_classDiv}>Email:</label>
				   <div className={two_classDiv}>
					<PxInput type="email" name="email" id="email"  placeholder="name@xx.com"/>
					 </div>	
                    <label className={one_classDiv}>密码:</label>
				   <div className={two_classDiv}>
				  <PxInput type="password" name="password" id="password"/>
				 </div>	
				  <label className={one_classDiv}>重复密码:</label>
				   <div className={two_classDiv}>
					<PxInput type="password" name="password1" id="password1"/>
					 </div>	
					<br/>
			      <button type="button" onClick={ajax_kd_group_reg} className="am-btn am-btn-primary">注册</button>
			      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>
			     </div>
		        </form>
		       </div>
	);
	}
}); 


/*
 *登录界面账号与密码输入绘制
 * <img src={hostUrl+"i/denglulogo.png"} width="100px" height="100px"/> 绘制图片
 * */
var Div_login = React.createClass({ 
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
 		<div>
 		<div className="header">
 		  <div className="am-g">
 		 <img src={hostUrl+"i/denglulogo.png"} width="100px" height="100px"/>
 		  </div>
 		</div>
 		<div className="am-g">
 		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered am-margin-top-sm">
 		 <form id="login_form" method="post" className="am-form">
 	      <PxInput icon="mobile" type="text" name="loginname" id="loginname" value={o.loginname} onChange={this.handleChange}/>
 	      <PxInput icon="lock" type="password" name="password" id="password" value={o.password} onChange={this.handleChange}/>
 	      <label htmlFor="pw_checked">
 	        <input id="pw_checked" name="pw_checked" type="checkbox"  checked={o.pw_checked=="checked"?"checked":""} onChange={this.handleChange}/>
 	        记住密码
 	      </label>
 	      <div className="am-cf">
 	        <input id="btn_login" onClick={ajax_userinfo_login} type="button" name="" value="登 录" className="am-btn am-btn-primary am-btn-sm am-fl" />
 	        <input type="button" onClick={menu_userinfo_updatePasswordBySms_fn} value="忘记密码 ^_^? " className="am-btn am-btn-default am-btn-sm am-fr" />
 	      </div>
 	     <div className="am-cf am-margin-top-sm">
 	      <a href="javascript:void(0);"  onClick={menu_kd_group_reg_fn} className="am-fl">幼儿园注册</a>
 	     <a href="javascript:void(0);"  onClick={menu_userinfo_reg_fn} className="am-fr">老师注册</a>
 	      </div>
 	     <br/>
 	    </form>
 	    <hr/>
 	   <p>© 2015 成都问界科技有限公司</p>
 	     </div> 
 	   </div>
 	   
 	   </div>
 );
}
}); 





 

/**
* ajax_teachingplan_edit
*/

var Teachingplan_EventRow = React.createClass({ 
render: function() {
var event = this.props.event;
if(G_week.getWeekStr(event.plandate)==G_week.getWeekStr(new Date())){
	event.highlight=true;
}
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  <tr className={className} >
    <td><a href="javascript:void(0);" onClick={btn_click_teachingplan.bind( this, "edit",event.uuid)}>{G_week.getWeekStr(event.plandate)}</a></td>
    <td>{event.morning}</td>
    <td>{event.afternoon}</td>
  </tr> 
);
}
}); 



var CookbookPlan_edit_EventRow = React.createClass({
	
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
	    		  <div id={"div_cookPlan_"+this.props.type}>
	    		  
	    		  {
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
 	     	 	            		<div id={"div_cookPlan_Item_"+t_uuid} title={t_uuid} className="G_cookplan_Img" >
 	    		    	 	       			<img className="G_cookplan_Img_img"  id={"divCookItem_img_"+t_uuid}  src={t_imguuid} alt="图片不存在" title={t_name} />
 	    		    	 	       			<div className="G_cookplan_Img_close"  onClick={that.deleteImg.bind(this,"div_cookPlan_Item_"+t_uuid)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
 	    		    	 	       			<span >{t_name}</span>
 	    		    	 	       		</div>		
 	     	 	            	);
 	     	 	          
 	    				
 	    			 })//end map
	    		  } 
	    		  <button type="button"  onClick={that.btn_addCookplan.bind(this,"div_cookPlan_"+that.props.type)}  className="am-btn am-btn-primary">添加</button> 
 	    		</div>
		
	  )
	  }
	});





//加载封的方法<div id="baidu_dup_1110291"></div>百度广告页面
var Div_body_index = React.createClass({ 
	componentDidMount:function(){
		//(BAIDU_DUP=window.BAIDU_DUP||[]).push(['fillAsync','1110291','baidu_dup_1110291']);
		//<div id="baidu_dup_1110291"></div>
	},
	render: function() {
	return (
		<div>

		<AMUIReact.Gallery  {...this.props} />
		
		</div>
		
	);
	}
}); 

//、、§§§§§§§§§§§§§§§§§§§§§§§§§§§
/*
 * 老师注册（绘制）
 * */
var Div_userinfo_reg = React.createClass({ 
	render: function() {
		var one_classDiv= "am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
		var two_classDiv= "am-u-lg-10 am-u-md-10 am-u-sm-8";
	return (
			   <div>
				<div className="header">
				 <div className="am-g">
				  <h1>老师注册</h1>
				 </div>
				<hr />
			   </div>	  
			   <form id="regform" method="post" className="am-form">
		         <PxInput type="hidden" name="type"  value="1"/>
		          <div className= "am-form-group">				       		     
			    <label className={one_classDiv}>手机号码:</label>
				 <div className={two_classDiv}>
				  <PxInput type="text" name="tel" id="tel"/>
                   <button type="button" onClick={ajax_sms_sendCode.bind(this,"#tel",1)} className="am-btn am-btn-primary">发送验证码</button>	     
				    </div>
			       <label className={one_classDiv}>验证码:</label>
				  <div className={two_classDiv}>
				 <PxInput type="text" name="smscode" id="smscode"/>
				</div>				  
				 <label className={one_classDiv}>姓名:</label>
				  <div className={two_classDiv}>
				   <PxInput type="text" name="name" id="name"  placeholder="必填，不超过15位"/>
				    </div>				   
				     <label className={one_classDiv}>Email:</label>
				    <div className={two_classDiv}>
				   <PxInput type="email" name="email" id="email"  placeholder="输入邮箱"/>
				  </div>									  
				   <label className={one_classDiv}>密码:</label>
				    <div className={two_classDiv}>
				     <PxInput type="password" name="password" id="password"/>
				      </div>				  
				     <label className={one_classDiv}>重复密码:</label>
				    <div className={two_classDiv}>
				   <PxInput type="password" name="password1" id="password1"/>
				  </div>			
				 <br/>
		      <button type="button" onClick={ajax_userinfo_reg} className="am-btn am-btn-primary">注册</button>
		      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>	      
		    </div>
		   </form>	
		  </div>
	);
	}
});

//--——————————————————————————帮助文档<绘制>——————————————————————————
/*
 * 我-帮助文档绘制
 * 
 * */
var Help_txt =React.createClass({	 
	render: function() {
		  return (
		    <div>
		    <article className="am-article">
		    <div className="am-article-hd">
		      <h1 className="am-article-title">帮助文档</h1>
		    </div>

		    <div className="am-article-bd">
		      <p className="am-article-lead">Web登录地址：http://www.wenjienet.com</p>
		      <p className="am-article-lead">遇到问题，请联系问界互动家园技术部，电话：028-85027422</p>
		      <p className="am-article-lead">或者反馈到微信公众号:wenjiehudong</p>
		    </div>
		  </article>
    	        </div> 		 
		      );
		   }})	
//±±±±±±±±±±±±±±±±±±±±±±±±±±±
		   
		   
		   
		   
		   
//——————————————————————————查看即时消息<绘制>——————————————————————————   
/* <查看即时消息>信息详情界面绘制；
 * @send_user：信息者名字；"即时消息"
 * */


var Message_queryMyTimely_myList =React.createClass({	 
	render: function() {
		  return (
		    <div  data-am-widget="list_news" className="am-list-news am-list-news-default">
		      <div className="am-list-news-bd">
		    	<ul className="am-list">
				  {this.props.formdata.data.map(function(event) {
					  return(							  										  
			    <li className="am-g am-list-item-dated">
			  <a href="javascript:void(0);" className="am-list-item-hd" onClick={this.ajax_State_style.bind(this,event.type,event.rel_uuid,event.group_uuid,1)}>
			    {event.title}： {event.message}
			  </a>		
			    <div className="am-list-item-text">
			  	   <time>消息发送于 {event.create_time}</time>
			  		  </div> 
			  		     </li>)})}
    			    </ul> 
    			  </div> 
    	        </div> 		 
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
var Classnews_Div_list = React.createClass({ 
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
		ajax_classs_Mygoodlist(this.classnewsreply_list_div+this.pageNo,this.pageNo,this.type,callback);
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
	handleClick: function(m,num) {
		if(m=="add"){
			 btn_click_classnews(m,{classuuid:this.selectclass_uuid_val});
			 return;
		 }else{
			 this.type=num;
			 this.pageNo=1;
//			 ajax_classnews_list_div(num); 	
			 this.refresh_data();
			 
			 
		 }
	  },
render: function() {
	if(!this.type)this.type=this.props.type;
	this.load_more_btn_id="load_more_"+this.props.uuid;
	var  fn;
	if(this.type==1){
	fn=<AMUIReact.Button amStyle="warning" onClick={this.handleClick.bind(this,"oth",2)} round>其他班级</AMUIReact.Button>
	}else{
	fn=<AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this,"oth",1)} round>我的班级</AMUIReact.Button>
	}
  return (			
		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">
		  <AMUIReact.ButtonToolbar>
		    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this,"add")} round>发布互动</AMUIReact.Button>
		    {fn}
		    <AMUIReact.Button amStyle="primary" onClick={this.refresh_data.bind(this)} round>刷新</AMUIReact.Button>
		    <G_help_popo  msg={G_tip.Classnews}/> 
		    </AMUIReact.ButtonToolbar>
		  <hr/>	  
		    
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
* <班级互动>;
* @Classnews_EventRow:绘制列表详情;
* */
var Classnews_EventsTable = React.createClass({	  
render: function() {
	var that=this;
return (
<div>
  {this.props.events.data.map(function(event) {
    return (<Classnews_show  event={event} />);
  })}
</div>
);
}
});
/*
* <班级互动>MAp详情绘制
* var o = this.props.formdata;
*/
var Classnews_show = React.createClass({ 
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
		  if(!o.create_img)G_def_headImgPath;
		  
	  return (
			  <div>
			  <article className="am-comment am-margin-xs">
			  <a href="javascript:void(0);">
			    <img src={o.create_img}  className="am-comment-avatar" width="48" height="48"/>
			  </a>

			  <div className="am-comment-main">
			    <header className="am-comment-hd">
			      <div className="am-comment-meta">
			        <a href="javascript:void(0);" className="am-comment-author">{Store.getGroupNameByUuid(o.groupuuid)}|{Store.getClassNameByUuid(o.classuuid)}|{o.create_user}</a>
			        发表于 <time>{o.update_time}</time>
			      </div>
			    </header>
			    <div className="am-comment-bd">
			    <div dangerouslySetInnerHTML={{__html:o.content}}></div>
			    	<Common_mg_big_fn  imgsList={o.imgsList} />
			    </div>
			    	<footer className="am-comment-footer">
			    	<div className="am-comment-actions">
			    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
			    	<a href="javascript:void(0);"><i id={"btn_reply_"+o.uuid} className="am-icon-reply px_font_size_click"></i></a>
			    	<a href="javascript:void(0);" onClick={common_check_illegal.bind(this,99,o.uuid)}>举报</a>
			    	</div>
			    	</footer>
			    	<Common_Dianzan_show_noAction dianzan={o.dianzan} uuid={o.uuid} type={0}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
			    	<ul className="am-comments-list">
					  <Classnews_reply_list replyPage={o.replyPage} uuid={o.uuid}  type={0} btn_reply={"btn_reply_"+o.uuid}/>
			    	</ul>
			     </div>
			</article>
			 
			    </div>		   
	  );
	}
	}); 



/*
* 1.1互动里面单独的评论模板
* 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
* 把评论模板插入空Div里面
* 
* */
var Classnews_reply_list = React.createClass({ 
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
		if(!re_data){
			re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow);
		}else{
			this.loadByFirst(this.classnewsreply_list_div+this.pageNo);
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
		<small>
		  <div className="px_reply_comment_bd">
		  <div id={this.div_reply_save_id}>			</div>
		    <div id={this.classnewsreply_list_div}></div>
		    <button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>		
			
			</div>	
			</small>
		   
);
}
}); 


/*
* 1.2互动里面单独的评论模板-item
* 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
* 把评论模板插入空Div里面
* 
* */
var Classnews_reply_list_listshow = React.createClass({ 	
render: function() {
return (
		  <div>
		  {this.props.events.data.map(function(event) {
		      return (
		    		  <li className="am-cf">
		    		  <span className="am-comment-author am-fl">{event.create_user+":"}</span>
				        <span className="am-fl" dangerouslySetInnerHTML={{__html:event.content}}></span>
		    		  </li>
		    		  )
		  })}
		
		    </div>		   
);
}
}); 

/*
* 绘制评论模板
* @componentDidMount:添加表情
* */
var Classnews_reply_save = React.createClass({ 
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
		   <form id={this.form_id} method="post" className="am-form">
			<input type="hidden" name="newsuuid"  value={this.props.uuid}/>
			<input type="hidden" name="uuid" />
			<input type="hidden" name="type"  value={this.props.uuid}/>						
			<AMR_Input id={this.classnews_content} type="textarea" rows="3" label="我要回复" placeholder="填写内容" name="content" />
			<button type="button"  onClick={this.reply_save_btn_click.bind(this)}  className="am-btn am-btn-primary">提交</button>		      
		    </form>	   
);
}
}); 

/*
* <班级互动>添加与编辑按钮中可删除图片显示.
*/
var ClassNews_Img_canDel = React.createClass({
		deleteImg:function(divid){
			$("#"+divid).remove();
		},			
	  render: function() {
		 return (
          		<div  className="G_cookplan_Img" >
	 	       			<img className="G_cookplan_Img_img"  src={this.props.url} alt="图片不存在" />
	 	       			<div className="G_cookplan_Img_close"  onClick={this.deleteImg.bind(this,this.props.parentDivId)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
	 	       		</div>		
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
var Classnews_edit = React.createClass({ 
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
		<div>
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">	      
		  <form id="editClassnewsForm" method="post" className="am-form">
		  <AMUIReact.Selected id="selectclass_uuid" name="classuuid" onChange={this.handleChange_selectclass_uuid} btnWidth="300"  data={this.props.mycalsslist} btnStyle="primary" value={o.classuuid} />	      
			
		  <input type="hidden" name="uuid"  value={o.uuid}/>
			<input type="hidden" name="imgs" id="imgs"  value={o.imgs}/>			
		      <AMR_Input id="classnews_content" type="textarea" rows="3" label="内容:" placeholder="填写内容" name="content" value={o.content} onChange={this.handleChange}/>
		      <div id="show_imgList"></div><br/>
		      <div className="cls"></div>
			  {G_get_upload_img_Div()}
		      <button type="button"  onClick={ajax_classnews_save}  className="am-btn am-btn-primary">提交</button>
		    </form>
	     </div>
	   </div>
	   
	   </div>
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
var Announcements_Div_list = React.createClass({ 
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
		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">
		  <div className="am-list-news-hd am-cf">
		   
		  </div>
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
 *公告功能表格内容绘制
 * 在kd_react；
 * */
var Announcements_mylist_div = React.createClass({ 
	  render: function() {
	    var event = this.props.events;
	    var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
     <div  data-am-widget="list_news" className="am-list-news am-list-news-default">
     <div className="am-list-news-bd">
     <ul className="am-list">
		  {this.props.events.data.map(function(event) {
		      return (
		    		<li className="am-g am-list-item-dated">
		  		    <a href="javascript:void(0);" className="am-list-item-hd "onClick={react_ajax_announce_show.bind(this,event.uuid,Vo.announce_type(event.type))}>
		  		  {event.title} 
		  		  </a>		
		  		  <div className="am-list-item-text">
		  		  {Vo.announce_type(event.type)}| {Store.getGroupNameByUuid(event.groupuuid)}|{event.create_time}
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
  *公告点赞、评论、加载更多等详情绘制模板；
  *增加编辑与删除功能
  * */
var Announcements_show = React.createClass({ 
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
		  <div>
            <div className="am-margin-left-sm">
		 
            <AMUIReact.Article
		    title={o.title}
		    meta={Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}>
			<div dangerouslySetInnerHTML={{__html: o.message}}></div>
		      </AMUIReact.Article>		     
		     <AMR_ButtonToolbar>
		     <AMR_Button className={edit_btn_className} amStyle="primary" onClick={this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)} round>编辑</AMR_Button>
		     <AMR_Button className={edit_btn_className} amStyle="danger" onClick={this.handleClick.bind(this, "del",o.groupuuid,o.uuid)} round>删除</AMR_Button> 
		     <AMR_Button  amStyle="success" onClick={this.favorites_push.bind(this,o.title,o.type,o.uuid)} round>收藏</AMR_Button> 
		     </AMR_ButtonToolbar>
		     
		     </div>
		    	<footer className="am-comment-footer">
		    	<div className="am-comment-actions">
		    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
		    	</div>
		    	</footer>
		    	<Common_Dianzan_show_noAction uuid={o.uuid} type={0}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
			  <Common_reply_list uuid={o.uuid}  type={0}/>			 
		   </div>
);
}
}); 
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————（首页）课程表<绘制>——————————————————————————  
/*
 * 课程表班级内详情 课程表
 */
var Teachingplan_showByOneDay = React.createClass({ 
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
				  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
					 <label>早上:</label> 
					 <div className="g_teachingplan">
						<div dangerouslySetInnerHTML={{__html:G_textToHTML(o.morning)}}></div>
					 </div>
					 <label>下午:</label> 
					 <div className="g_teachingplan">
						<div dangerouslySetInnerHTML={{__html:G_textToHTML(o.afternoon)}}></div>
					 </div>
				    	<footer className="am-comment-footer">
				    	<div className="am-comment-actions">
				    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
				    	</div>
				    	</footer>
				    	<Common_Dianzan_show_noAction uuid={o.uuid} type={0}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
					  <Common_reply_list uuid={o.uuid}  type={0}/>
					</div> 
		  )
	  }else{
		  edit_btn_className="G_Edit_show";
	  }
	  return (
		<div>
		 <div className="am-g">	
		  <button className="am-btn am-btn-secondary" onClick={this.handleClick.bind(this, "pre",this.props.ch_class.uuid)} >
		  <i className="am-icon-angle-left"></i>
		</button>
		  <button className="am-btn am-btn-secondary" onClick={this.handleClick.bind(this, "next",this.props.ch_class.uuid)} >
		  <i className="am-icon-angle-right"></i>
		</button>
		<AMUIReact.Selected id ="selectgroup_uuid1" name= "group_uuid" onChange={this.handleChange_selectgroup_uuid.bind(this)} btnWidth= "200" data={ this.props.classList} btnStyle="primary" value={this.props.ch_class.uuid} />
		 < AMR_Button className={edit_btn_className} amStyle ="primary" onClick={this.handleClick_class.bind( this ,"add",null ,this.props.ch_class.uuid,this.props.ch_day)} round >新增课程</AMR_Button >
		</div>
		<div className="header">
		  <div className="am-g">
		  课程安排-{this.props.ch_day}
		
		  </div>
		  <hr />
		</div>
		<div className="am-g" id="div_detail">
		
			{div_detail_inhtml}
		
		</div>
	   
	   </div>
);
}
}); 
//——————————————————————————（首页->课程表）<绘制>——————————————————————————  
/*
 * 
 * 课程表1周显示
 * <Teachingplan_showByMy  classuuid={classuuid} classlist={classlist} />
 */
var Teachingplan_show7Day = React.createClass({ 
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
		<div>
		<div className="am-g" >
		<AMR_Button amStyle="secondary" onClick={this.pageClick.bind(this, "pre")}  round>上周</AMR_Button>
		<AMR_Button amStyle="secondary" onClick={this.pageClick.bind(this, "next")} round>下周</AMR_Button>	
		<AMUIReact.Selected id ="selectclass_uuid" name= "group_uuid" onChange={this.handleChange_selectclass_uuid.bind(this)} btnWidth= "200" data={ this.state.classlist} btnStyle="primary" value={this.state.classuuid} />
		</div>
		<hr/>
		<div className="am-g" id="div_detail">
		
		<G_Teachingplan_7day classuuid={this.state.classuuid} startDate={now} list={this.state.list} />
		
		</div>
	   
	   </div>
);
}
}); 


/**
 * 全局模版-没有内容时显示
 * <G_Teachingplan_7day classuuid={this.state.classuuid} startDate={startDate} list={list} />
 */
var G_Teachingplan_7day= React.createClass({ 
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
	    		<div>
	    		 {ar.map(function(event) {
					  return(							  										  
						<G_Teachingplan_1day data={event} />
					  )})}
	    		 </div>
	    );
	  }
	  }); 
var G_Teachingplan_1day= React.createClass({ 
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
			  return (<Teachingplan_edit_inner data={o} callback={this.save_callback.bind(this)} />);
		  }
		  var dianzan=(<div></div>);
		  if(o.uuid){
			  dianzan=(
					  <div>
					  <footer className="am-comment-footer">
				    	<div className="am-comment-actions">
				    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
				    	<a href="javascript:void(0);"><i id={"btn_reply_"+o.uuid} className="am-icon-reply px_font_size_click"></i></a>
				    	</div>
				    	</footer>
				    	<Common_Dianzan_show_noAction uuid={o.uuid} type={7}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
				    	<ul className="am-comments-list">
						  <Classnews_reply_list uuid={o.uuid}  type={7} btn_reply={"btn_reply_"+o.uuid}/>
				    	</ul>
				  </div>);
		  }
		  var divCs1="am-u-sm-4 am-u-md-2 am-u-lg-1";
		  var divCs2="am-u-sm-8 am-u-md-10 am-u-lg-11";
		  var cs="am-panel am-panel-secondary";
		 
		  if(o.plandate.indexOf( G_week.getDateStr(new Date(),0))>-1){
			  cs="am-panel am-panel-warning";
		  }
			return (
					
					<div className={cs}>
					  <div className="am-panel-hd">
					  <h3 className="am-panel-title am-g">
						  <div className={divCs1}>{G_week.getWeekStr(o.plandate)}</div>
			    		  <div className={divCs2}>{o.plandate.split(" ")[0]}
			    		   < AMR_Button className="am-margin-left" amStyle ={o.uuid?"default":"warning"} onClick={ this.edit.bind( this ,o)} round >{o.uuid?"修改":"创建"}</AMR_Button >
			    		  </div>
					  </h3>
					  </div>
					  <div className="am-panel-bd">
							  <div className="am-g">
				    		  <div className={divCs1}>上午</div>
				    		  <div className={divCs2} >  
				    		  	{o.morning}
				    		  </div>
				    		</div>
				    		<div className="am-g">
				    		  <div className={divCs1}>下午</div>
				    		  <div className={divCs2}>
				    		  	{o.afternoon}
				    		  </div>
				    		</div>
				    		<div className="am-g">
				    		{dianzan}
				    		</div>
					  </div>
					 
					</div>
	    		
	    		
	    );
	  }
	  }); 


/*
 *<课程表>班级编辑-内嵌在显示1周页面
 *<Teachingplan_edit_inner data={data} callback={callback} />
 * */
var Teachingplan_edit_inner = React.createClass({ 
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
return (
		
		 <form id={this.formid} method="post" className="am-form">
		 <input type="hidden" name="uuid"  value={o.uuid}/>
			<input type="hidden" name="classuuid"  value={o.classuuid}/>
		<div className="am-container">
		<div className="am-g am-success am-article-title">
		  <div className="am-u-sm-4">{G_week.getWeekStr(o.plandate)}</div>
		  <div className="am-u-sm-8">
		  {o.plandate}
		  <input type="hidden" name="plandateStr"  value={o.plandate}/>
		 
		  </div>
		</div>
		<div className="am-g">
		  <div className="am-u-sm-4">上午</div>
		  <div className="am-u-sm-8" >  
		  <AMR_Input id="morning"  name="morning" type="textarea" rows="2" label="早上:" placeholder="填写内容" value={o.morning} onChange={this.handleChange.bind(this)}/>
			
		  </div>
		</div>
		<div className="am-g">
		  <div className="am-u-sm-4">下午</div>
		  <div className="am-u-sm-8">
		  <AMR_Input id="afternoon"  name="afternoon" type="textarea" rows="2" label="下午:" placeholder="填写内容" value={o.afternoon} onChange={this.handleChange.bind(this)}/>
		  </div>
		</div>
		 < AMR_Button  amStyle ="primary" onClick={ this.ajax_teachingplan_save.bind( this )} round >保存</AMR_Button >
	</div>
	
	 </form>
	
);
}
});
/*
 *<课程表>班级详情添加与编辑内容绘制;
 * @add:添加班级课程；
 * @pre:上周；
 * @next:下一周；
 * */
var Teachingplan_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editTeachingplanForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
return (
		<div>
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		  <form id="editTeachingplanForm" method="post" className="am-form">
		<input type="hidden" name="uuid"  value={o.uuid}/>
		<input type="hidden" name="classuuid"  value={o.classuuid}/>
		 <label htmlFor="name">日期:</label>
		 <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="plandateStr" id="plandateStr" dateTime={o.plandate}  onChange={this.handleChange}/>
		      <br/>
	    <AMR_Input id="morning"  name="morning" type="textarea" rows="2" label="早上:" placeholder="填写内容" value={o.morning} onChange={this.handleChange}/>
		<AMR_Input id="afternoon"  name="afternoon" type="textarea" rows="2" label="下午:" placeholder="填写内容" value={o.afternoon} onChange={this.handleChange}/>
		      <button type="button"  onClick={ajax_teachingplan_save}  className="am-btn am-btn-primary">提交</button>
	 </form>
	     </div>
	   </div>
	   
	   </div>
);
}
});
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————（首页）今日食谱<绘制>——————————————————————————  
/*
 * 今日食谱绘制;
 * 
 */
var CookbookPlan_showByOneDay = React.createClass({ 
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
		  dataShowDiv=(<div className="am-g" id="div_detail">今日没有发布食谱</div>)
	  }else{
		  dataShowDiv=(	
	<div className="am-g" id="div_detail">
		<div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
				 <label>早餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_1}  type={"time_1"}/>
		         <div className="cls"></div>
				 <br/>
				 <label>早上加餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_2}  type={"time_2"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>午餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_3}  type={"time_3"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>下午加餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_4}  type={"time_4"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>晚餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_5}  type={"time_5"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>营养分析:</label> 
				 <div className="g_analysis">
				 <div dangerouslySetInnerHTML={{__html:G_textToHTML(o.analysis)}}></div>
				 </div>
			    	<footer className="am-comment-footer">
			    	<div className="am-comment-actions">
			    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
			    	</div>
			    	</footer>
			    	<Common_Dianzan_show_noAction uuid={o.uuid} type={0}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
				     
			    	<Common_reply_list uuid={o.uuid}  type={0}/>
				</div> 
			</div>
		  )
	  }	
	  return (
		<div>	
		  
		 <div className="am-g">	
		  <button className="am-btn am-btn-secondary" onClick={this.handleClick.bind(this, "pre",this.props.groupuuid)}>
		  <i className="am-icon-angle-left"></i>
		</button>
		  <button className="am-btn am-btn-secondary" onClick={this.handleClick.bind(this, "next",this.props.groupuuid)}>
		  <i className="am-icon-angle-right"></i>
		</button>
		  <AMUIReact.Selected id ="selectgroup_uuid1" name= "group_uuid"  btnWidth= "200" onChange={this.handleChange_selectgroup_uuid.bind(this)} data={this.props.ch_group} btnStyle="primary" value={ this.props.groupuuid} />
		  </div>
			<div className="header">
				
				  <div id="div_detail">{this.props.ch_day}</div>
			  <hr />
			</div>
		{dataShowDiv}
	   </div>
	  );
}
}); 
/*
 * 今日食谱绘制;
 * 介绍页面查询的那一天食谱绘制
 */
var CookbookPlanShow_EventRow = React.createClass({
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
	    		  <div id={"div_cookPlan_"+this.props.type}>
	    		  {
	    			  this.state.items.map(function(event) {
	    				  var t_uuid=event.uuid;
	    				  var t_imguuid=event.img;
	    				  var t_name=event.name;
	    					 return (
	     	 	            		<div id={"div_cookPlan_Item_"+t_uuid} title={t_uuid} className="G_cookplan_Img" >
	    		    	 	       			<img className="G_cookplan_Img_img"  id={"divCookItem_img_"+t_uuid}  src={G_imgPath+t_imguuid} alt="图片不存在" title={t_name} />
	    		    	 	       			<span >{t_name}</span>
	    		    	 	       		</div>		
	     	 	            	);
	    				
	    			 })
	    		  } 
	    		</div>		
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
var Class_student_tel =React.createClass({
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
//	  	     )  <div className="am-margin-left-sm">
//	     }  	    		 
	   	this.props.class_list.unshift({value:"",label:"所有"});
		 return (
		 		<div>
			      <form id="editGroupForm" method="post" className="am-form">
			     
	  			  	  <AMR_ButtonToolbar  className="am-cf am-margin-left-xs">
	  			  	 <div className="am-fl">
			    	  <AMUIReact.Selected  name="class_uuid" placeholder="班级选择" onChange={this.handleChange_class_uuid} btnWidth="200"  multiple= {false} data={this.props.class_list} btnStyle="primary" value={this.props.class_uuid}/> 
			    	  </div>  
			    	  <div className="am-fl am-margin-left-xs">
			    	  <input type="text" name="sutdent_name" id="sutdent_name" placeholder="输入孩子姓名"/>
			    	  </div>  
			    	  <div className="am-fl am-margin-left-xs">
			    	  <button type="button"  onClick={this.handleChange_selectgroup_uuid}  className="am-btn am-btn-primary">搜索</button>
			    	  </div>			    	  
			    	 		  
				      </AMR_ButtonToolbar>

 
				  </form>  		        
	  	  	       <ul className="am-list am-list-static am-list-border">
	  	  			{this.props.formdata.map(function(event) {
	  	  				var ListItem=null;
	  	  				var showName=event.student_name+"的"+event.typename;
	  	  				if(event.isreg==1){
	  	  				ListItem=(
	  	  				<AMUIReact.Button  onClick={ajax_parentContactByMyStudent_message_list.bind(this,event.parent_uuid,showName)} amStyle="success">发信件</AMUIReact.Button>	
	  	  					);
	  	  				}else if(event.isreg==0){
	  	  					//<AMR_Button amStyle="success" onClick={ajax_parentContact_tels.bind(this,event.tel)} round>邀请家长</AMR_Button>	
		  	  				ListItem=(
		  	  						<AMR_Button amStyle="revise" round>未注册</AMR_Button>	
			  	  				);
	  	  				}else if(event.isreg==3){
		  	  				ListItem=(
			  	  					<AMR_Button amStyle="revise" round>邀请中</AMR_Button>		
			  	  				);
	  	  				}
	  	  				
	  	  				
	  	  		        return (
	  	  		       <li>
	  	  		        {showName}:{event.tel}
	  	  		        <AMR_ButtonToolbar>
	  	  		         <a href={"tel:"+event.tel}><AMUIReact.Button amStyle="disable">电话</AMUIReact.Button>	</a>  
	  	  		           {ListItem}
	  	  		          </AMR_ButtonToolbar>
	  	  		       </li>);})}		      			      
	  	  		     </ul>	
				  
		 	     </div> 
		     );
	        }
		 });
/* 
 * 家长通讯录中的<信息>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @Parent_message_save我要保存模板；
 * */
var ParentContactByMyStudent_message_list = React.createClass({ 
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
		  <div>
		  <Parent_message_save parent_React={this} uuid={this.props.parent_uuid} />
		   <div id={this.classnewsreply_list_div}>		   
		   </div>
			<button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>			
			</div>

			
  );
}
}); 

/*
 * 我要发信息模块；(家长通讯录发信息)
 * */
var Parent_message_save = React.createClass({ 
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
		   <form id="editForm" method="post" className="am-form">
			<input type="hidden" name="revice_useruuid"  value={this.props.uuid}/>			
			  <AMR_Input id="classnews_content_replay" type="textarea" rows="4" label="信息发送" placeholder="填写内容" name="message" />
		      <button type="button"  onClick={this.reply_save_btn_click.bind(this)}  className="am-btn am-btn-primary">发送</button>		      
		    </form>	   
  );
}
}); 
/* 家长通讯录功能2级发信息界面功能
 * @ 绘制 信息 <div dangerouslySetInnerHTML={{ __html: o.message}} ></div >
 * */
var Message_queryByParent_listpage =React.createClass({	 
	render: function() {
		var parent_uuid=this.props.parent_uuid;
	  return (		  			  
			  <ul className="am-comments-list ">
			  {this.props.events.data.map(function(event) {
				  var class1="am-comment am-comment-flip am-comment-secondary";
				  if(parent_uuid==event.send_useruuid){
					  class1="am-comment";
				  }
			      return (
			    		  <li className={class1}>
			    		  	<a href="javascript:void(0);" >
			    		  	 <img src={G_getHeadImg(event.send_userimg)} alt="" className="am-comment-avatar" width="48" height="48"/>
			    		  		</a>
			    		  		 <div className="am-comment-main">
			    		  		 <header className="am-comment-hd">
			    		  	      <div className="am-comment-meta">
			    		  	        <a href="#link-to-user" className="am-comment-author">{event.send_user}</a>
			    		  	        发送于 <time>{event.create_time}</time>
			    		  	      </div>
			    		  	    </header>
			    		  	  <div className="am-comment-bd">
			    		  	 <div dangerouslySetInnerHTML={{__html:event.message}}></div>
			    		  	 </div>
			    		  	    </div>
						  </li>
						  )
			  })}			  
			</ul>			 
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
var Announcements_good_Div_list = React.createClass({ 
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
		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">

		   <AMR_ButtonToolbar>
		    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add",this.props.groupuuid)} round>创建精品文章</AMR_Button>
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
 *<精品文章>表格内容绘制
 * 在kd_react；
 * */
var Announcements_mygoodlist_div = React.createClass({ 
	  render: function() {
	    var event = this.props.events;
	    var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';
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
	    			  		  {Store.getGroupNameByUuid(event.groupuuid)}|{event.create_user}|{event.create_time}
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
return (
		  <div>
		  <AMUIReact.Article
		    title={o.title}
		    meta={Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}>
			<div dangerouslySetInnerHTML={{__html: o.message}}></div>
		     </AMUIReact.Article>
		     <AMR_ButtonToolbar>
		     <AMR_Button className={edit_btn_className} amStyle="primary" onClick={this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)} round>编辑</AMR_Button>
		     <AMR_Button className={edit_btn_className} amStyle="danger" onClick={this.handleClick.bind(this, "del",o.groupuuid,o.uuid)} round>删除</AMR_Button> 
		     <AMR_Button  amStyle="success" onClick={this.favorites_push.bind(this,o.title,o.type,o.uuid)} round>收藏</AMR_Button> 
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


 /*
 * (精品文章)创建与编辑界面绘制；
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * */    
var Announcements_goodedit = React.createClass({ 
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
			   <div className="am-form-group" id="div_classuuids" >
		  		<input type="hidden" name="type"  value={o.type}/>
		  		<label htmlFor="tel">班级通知:</label>
		  		<input type="text" name="classuuids" id="classuuids" value={o.classuuids} onChange={this.handleChange} placeholder="班级通知，才填写"/>
  		     </div>;
	  } else {
		  type_div =
		  <input type="hidden" name="type"  value={o.type}/>
	  }
  return (
  		<div>
  		<div className="header">
  		  <hr />
  		</div>
  		<div className="am-g">
  		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
  		  <form id="editAnnouncementsForm" method="post" className="am-form">
  		<input type="hidden" name="uuid"  value={o.uuid}/>
  		<input type="hidden" name="isimportant"  value={o.isimportant}/> 		
  		<div className="am-form-group">
  	  <AMUIReact.Selected id="groupuuid" name="groupuuid" onChange={this.handleChange} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={o.groupuuid} />    		          
        </div>   
  		{type_div}
  		  <label htmlFor="name">标题:</label>
  		  <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} maxlength="45"   placeholder="不超过45位"/>
  		  <br/>
  		  <AMR_Input id="announce_message" type="textarea" rows="10" label="内容:" placeholder="填写内容" name="message" value={o.message} onChange={this.handleChange}/>
 		{G_get_upload_img_Div()} 
  		  <button type="button"  onClick={ajax_good_save}  className="am-btn am-btn-primary">提交</button>
  		  </form>
  	     </div>
  	   </div>	   
  	  </div>
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
var Class_students_show= React.createClass({
	 componentDidMount:function(){
			 G_img_down404();
	  },
	  handleChange_selectgroup_uuid:function(val){
		  react_ajax_class_students_manage(val,"show");
	  },
	  handleClick:function(m,groupuuid,uuid){
		  btn_click_class_list(m,groupuuid,uuid); 			
	  },
	  showTeachingplanClick:function(classuuid){
		  G_myCurClassuuid=classuuid;
		  menu_teachingplan_dayShow_fn();
	  },
	render: function() {
		var o=this.props.formdata;
	  return (
	  <div>	 
		  <AMR_Panel>
			  <AMR_Grid className="doc-g">
		  	  <AMR_ButtonToolbar>
		  	<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
		  	  <AMUIReact.Selected id="selectgroup_uuid1" name="class_uuid" onChange={this.handleChange_selectgroup_uuid.bind(this)} btnWidth="200" data={this.props.classList} btnStyle="primary" value={o.uuid} />
		  	</div>  
		  	<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
		  	  <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.showTeachingplanClick.bind(this,o.uuid,o.name)} round>查看课程</AMR_Button>
		  	</div>
		  	<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
		  	  <AMR_Button amSize="xs"  amStyle="warning" onClick={this.handleClick.bind(this,"addstudent",o.groupuuid,o.uuid)} round>添加学生</AMR_Button>
		  	</div>
		  	  <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
		  	  <AMR_Button amSize="xs"  onClick={this.handleClick.bind(this,"addclass",o.groupuuid,o.uuid)} round>添加班级</AMR_Button>
		  	</div> 
		  	 <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
		  	  <AMR_Button amSize="xs" amStyle="primary" onClick={this.handleClick.bind(this,"edit_class",o.groupuuid,o.uuid)} round>班级编辑</AMR_Button>
		  	</div>  
	  		    
		  	  
		  	  </AMR_ButtonToolbar>
	  		    
	  		   <AMR_Col className="am-hide-sm" sm={6} md={3}> 学校:{Store.getGroupNameByUuid(o.groupuuid)}</AMR_Col>
			    <AMR_Col className="am-hide-sm" sm={6} md={3} > 班级:{o.name}</AMR_Col>
			    <AMR_Col sm={6} md={3} >班主任:{o.headTeacher_name}</AMR_Col>
			    <AMR_Col sm={6} md={3}>其他老师:{o.teacher_name}</AMR_Col>
			  </AMR_Grid>
		  </AMR_Panel>
		  <AMR_Gallery data={this.props.students}  sm={4} md={6} lg={8} />
	    </div>
	  );
	}
	});



/*
* <我的班级>班级添加详情绘制
* @ajax_class_save：提交按钮在Kd_service;
* */	
var AMR_Grid=AMUIReact.Grid;
var AMR_Col=AMUIReact.Col;
  var Class_edit = React.createClass({ 
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
    		<div>
    		<div className="header">
    		  <hr />
    		</div>
    		<div className="am-g">
    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    		  <form id="editClassForm" method="post" className="am-form">
    		<input type="hidden" name="uuid"  value={o.uuid}/>
    		     <input type="hidden" name="type"  value="1"/>
    		    <div className="am-form-group"> 		    
    		  <AMUIReact.Selected id="groupuuid" name="groupuuid" onChange={this.handleChange} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={o.groupuuid} />          
    		  <G_help_popo  msg={G_tip.class_edit}/>  
    		  <br/>
    		  <span id="help1_span">{G_tip.class_edit_groupwjd}</span>
    		  </div> 		    
    		      <label htmlFor="name">班级:</label>
    		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过45位！"/>
    		      <br/>   		   
  		      <label htmlFor="name">班主任:</label>
  	  		    <input type="hidden" name="headTeacher" id="headTeacher" value={o.headTeacher} onChange={this.handleChange}/>
  			      <input type="text"  id="headTeacher_name" value={o.headTeacher_name} onChange={this.handleChange} onClick={w_ch_user.open.bind(this,"headTeacher","headTeacher_name",o.groupuuid)} placeholder=""/>
  			      <br/>
  			      <label htmlFor="name">其他老师:</label>
  		  		    <input type="hidden" name="teacher" id="teacher" value={o.teacher} onChange={this.handleChange}/>
  				      <input type="text"  id="teacher_name" value={o.teacher_name} onChange={this.handleChange}  onClick={w_ch_user.open.bind(this,"teacher","teacher_name",o.groupuuid)} placeholder=""/>
  				      <br/>
    		      <button type="button"  onClick={ajax_class_save}  className="am-btn am-btn-primary">提交</button>
    		    </form>
    	     </div> 
    	   </div>	    	   
    	   </div>
    );
  }
 }); 

/*我的班级中查看学生信息
 * Class_student_look_info@:此方法模板为单独查看每个学生详细信息但不能编辑；
 * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
 * 
 * */
var Class_student_look_info =React.createClass({
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
	     console.log("o",o);
		 return (
		 		<div>
			    <AMUIReact.List static border striped>
  		      <button type="button"  onClick={ajax_myclass_students_edit.bind(this,o.uuid)}  className="am-btn am-btn-primary">修改学生</button>
			      <AMUIReact.ListItem>头像:</AMUIReact.ListItem>
				  <AMUIReact.Image  id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>
				  <br/>
			      <AMUIReact.ListItem icon="mobile">姓名:{o.name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>昵称:{o.nickname}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>性别:{Vo.get("sex_"+o.sex)}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>生日:{o.birthday}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>妈妈姓名:{o.ma_name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>妈妈电话:{o.ma_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>妈妈的工作:{o.ma_work}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸姓名:{o.ba_name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸的工作:{o.ba_work}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸电话:{o.ba_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>家庭住址:{o.address}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爷爷电话:{o.ye_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>奶奶电话:{o.nai_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>外公电话:{o.waigong_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>外婆电话:{o.waipo_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>其他电话:{o.other_tel}</AMUIReact.ListItem>			      
			      <AMUIReact.ListItem>
			      <div dangerouslySetInnerHTML={{__html:G_textToHTML("说明:"+o.note)}}></div>
			      </AMUIReact.ListItem>			      
			      
			      </AMUIReact.List>
		 	     </div> 
		     );
	        }
		 });
/*
 * <我的班级>添加学生详情界面
 * */
  var Mycalss_student_edit = React.createClass({ 
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
		   <form id="editClassStudentForm" method="post" className="am-form">
		   <PxInput type="hidden" name="headimg" id="headimg"  value={o.headimg}  onChange={this.handleChange} />
			<PxInput type="hidden" name="uuid"  value={o.uuid}/>
		     <PxInput type="hidden" name="classuuid"  value={o.classuuid}/>
		   <div className="am-form-group">
			<G_help_popo  msg={G_tip.Stutent_edit} />
		    <hr />
  		     <AMUIReact.Image id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>
  		      <button type="button"  onClick={this.btn_class_student_uploadHeadere}  className="am-btn am-btn-primary">上传头像</button>	      
 	         <AMUIReact.FormGroup>
 	        <label>单选：</label>
 	       <AMUIReact.Input type="radio" name="sex" value="0" label="男" inline onChange={this.handleChange} checked={o.sex==0?"checked":""}  />
 	      <AMUIReact.Input type="radio" name="sex" value="1" label="女" inline onChange={this.handleChange} checked={o.sex==1?"checked":""}  />
 	     </AMUIReact.FormGroup>     		    
 	       <label className={one_classDiv}>姓名</label>
   		     <div className={two_classDiv}>
		       <PxInput icon="user" type="text" name="name" id="name" value={o.name} onChange={this.handleChange}/>
		        </div>
		       <label className={one_classDiv}>昵称</label>
	   		  <div className={two_classDiv}>  
   		     <PxInput icon="user-secret" type="text" name="nickname" id="nickname" value={o.nickname} onChange={this.handleChange}/>
   		    </div>
   		     <label className={one_classDiv}>生日</label>
  		      <div className={two_classDiv}>
  		       <AMUIReact.DateTimeInput  icon="calendar" format="YYYY-MM-DD"  name="birthday" id="birthday" dateTime={o.birthday} onChange={this.handleChange}/>
		        </div>
		       <label className={one_classDiv}>身份证</label>
			  <div className={two_classDiv}>  
			 <PxInput  type="text" name="idcard" id="idcard" value={o.idcard} onChange={this.handleChange} placeholder=""/>
		    </div>  		     
		    <fieldset>
		    <legend>爸爸妈妈信息</legend> 
	        <label className={one_classDiv}>妈妈姓名</label>
	         <div className={two_classDiv}>
	          <PxInput icon="user" type="text"  name="ma_name" id="ma_name" size="10" maxLength="45" value={o.ma_name} onChange={this.handleChange}/>
	           </div>
	          <label className={one_classDiv}>妈妈电话</label>
		     <div className={two_classDiv}>  
		    <PxInput  icon="mobile" type="text" name="ma_tel" id="ma_tel" value={o.ma_tel} onChange={this.handleChange}/>
	       </div>
	        <label className={one_classDiv}>妈妈工作</label>
	         <div className={two_classDiv}>
		      <PxInput type="text" name="ma_work" id="ma_work" value={o.ma_work} onChange={this.handleChange}/>
	           </div>
	          <label className={one_classDiv}>爸爸姓名</label>
		     <div className={two_classDiv}>  
		    <PxInput icon="user" type="text" name="ba_name" id="ba_name" size="10" maxLength="45"  value={o.ba_name} onChange={this.handleChange}/>
	       </div>
	        <label className={one_classDiv}>爸爸电话</label>
	         <div className={two_classDiv}>
		      <PxInput icon="mobile" type="text" name="ba_tel" id="ba_tel" value={o.ba_tel} onChange={this.handleChange} placeholder=""/>
	           </div>
	          <label className={one_classDiv}>爸爸工作</label>
		     <div className={two_classDiv}>  
		    <PxInput type="text" name="ba_work" id="ba_work" value={o.ba_work} onChange={this.handleChange} placeholder=""/>
	       </div>
	        <label className={one_classDiv}>家庭住址</label>
	         <div className={two_classDiv}>
		      <PxInput icon="home" type="text" name="address" id="address" value={o.address} onChange={this.handleChange} placeholder=""/>
	           </div>		    
		      </fieldset>  		    		      
		      <fieldset>
		      <legend>其他信息</legend>
		        <label className={one_classDiv}>奶奶电话</label>
		         <div className={two_classDiv}>
			      <PxInput icon="mobile" type="text" name="nai_tel" id="nai_tel" value={o.nai_tel} onChange={this.handleChange} placeholder=""/>
		           </div>
		          <label className={one_classDiv}>爷爷电话</label>
			     <div className={two_classDiv}>  
			    <PxInput icon="mobile" type="text" name="ye_tel" id="ye_tel" value={o.ye_tel} onChange={this.handleChange} placeholder=""/>
		       </div>
		        <label className={one_classDiv}>外婆电话</label>
		         <div className={two_classDiv}>
			      <PxInput icon="mobile" type="text" name="waipo_tel" id="waipo_tel" value={o.waipo_tel} onChange={this.handleChange} placeholder=""/>
		           </div>
		          <label className={one_classDiv}>外公电话</label>
			     <div className={two_classDiv}>  
			    <PxInput icon="mobile" type="text" name="waigong_tel" id="waigong_tel" value={o.waigong_tel} onChange={this.handleChange} placeholder=""/>
		       </div>
		        <label className={one_classDiv}>其他电话</label>
		         <div className={two_classDiv}>
			      <PxInput icon="phone" type="text" name="other_tel" id="other_tel" value={o.other_tel} onChange={this.handleChange} placeholder=""/>
		           </div>
		 		   <AMUIReact.Input type="textarea"
			 	 	      label="说明"
			 	 	    	 name="note"
			 	 	      labelClassName="am-u-sm-2"
			 	 	      placeholder="备注"
			 	 	      wrapperClassName="am-u-sm-10"
			 	 	      amSize="lg" />
		 		      <br/>
		 		      </fieldset>
				      <button type="button"  onClick={btn_ajax_myclass_student_save}  className="am-btn am-btn-primary">提交</button>		      
   		           </div>  
   		          </form> 	
   		          
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
var Teacher_info_tel = React.createClass({
	  handleChange_selectgroup_uuid:function(val){
		  ajax_Teacher_listByGroup($("input[name='group_uuid']").val(),$('#sutdent_name').val());
	  },
  render: function() {
    return (
    <div>   
	  <div className="am-form-group">
	  <hr/>
	    </div>
	      <form id="editGroupForm" method="post" className="am-form">
	      <AMR_ButtonToolbar className="am-cf am-margin-left-xs">
	      <div className="am-fl">
		  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />
		  </div>
		  <div className="am-fl am-margin-left-xs">
		  <input type="text" name="sutdent_name" id="sutdent_name" placeholder="输入老师姓名"/>
		  </div>
		  <div className="am-fl am-margin-left-xs">
		  <button type="button"  onClick={this.handleChange_selectgroup_uuid}  className="am-btn am-btn-primary">搜索</button>		  		  
		  </div>
		  </AMR_ButtonToolbar>
		  </form>      

	  
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
            <th>姓名</th>
            <th>电话</th>
            <th>职位</th>
            <th>邮箱</th>
            <th>性别</th>
            <th>状态</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Teacherinfo_EventRow key={event.id} event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
});
/*
 * 老师通讯录表单详情内容绘制;
 * 一键拨号
 * 暂时添加点击事件 后续还未开发； 
 * */
var Teacherinfo_EventRow = React.createClass({ 
	  render: function() {
	    var event = this.props.event;
	    var className = event.highlight ? 'am-active' :
	      event.disabled ? 'am-disabled' : '';

	    return (
	      <tr className={className} >
	        <td><a href="javascript:void(0);" onClick={""}>{event.name}</a></td>
	        <td>{event.tel} <a href={"tel:"+event.tel}><AMUIReact.Button amStyle="success">电话</AMUIReact.Button></a></td>
	        <td>{event.office}</td>
	        <td>{event.email}</td>
	        <td>{event.sex=="0"?"男":"女"}</td>
	        <td  className={"px_disable_"+event.disable}>{Vo.get("disable_"+event.disable)}</td>
	        </tr> 
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
var rect_favorites_Div_list = React.createClass({ 
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

/*
 *<我的收藏>表格内容绘制
 * 在kd_react；
 * */
var favorites_list_div = React.createClass({ 
	  render: function() {
	    var event = this.props.events;
	    var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
     <ul className="am-list">
		  {this.props.events.data.map(function(event) {
		      return (
		    		<li className="am-g am-list-item-desced">
		  		      <a  href="javascript:void(0);" className="am-list-item-hd" onClick={react_ajax_favorites_show.bind(this,event.type,event.reluuid)}>{Vo.announce_type(event.type)}</a>		  		        
		  		      <div className="am-list-item-text">{event.title}</div>    
		  		      <div className="am-list-date">{event.createtime}
		  		      <br/>
		  		      {event.show_name}
		  		      </div>
		  		      </li>
		    		  )
		         })}		
    </ul>  		  
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
var My_student_tel =React.createClass({
		render: function() {
	     var o =this.state;	
		 return (
		 		<div>
			    <AMUIReact.List static>
		    	{this.props.formdata.map(function(event) {
		            return (
		            		
		            		<AMUIReact.ListItem>
		            <span className="am-comment-author">{event.send_user} </span>家长来信{event.count}条,最后来信时间:{event.last_time}
		            <AMR_ButtonToolbar>		            
		            <AMUIReact.Button  onClick={ajax_parentContactByMyStudent_message_list.bind(this,event.send_useruuid,"我的信箱")} amStyle="success">@信息</AMUIReact.Button>
		            </AMR_ButtonToolbar>	        
		            </AMUIReact.ListItem>);
		          })}		      			      
			      </AMUIReact.List>
		 	     </div> 
		     );
	        }
		 });

/*
* <我的信箱>如果没有数据则绘制文字提示用户
* */
var My_student_tel2 =React.createClass({
	render: function() {
	 return (
			 <div className="am-g">
			  <h1>您的信箱暂无信件！</h1>
			  </div>
	     );
        }
	 });




//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————每日任务<绘制>——————————————————————————  
/*
 * <每日任务>服务器请求后绘制处理方法；
 * 
 * */
var rect_teacherDailyTask = React.createClass({
render: function() {
    return (
    <div>
	  <hr/>
	  <G_help_popo  msg={G_tip.teacherDailyTask}/> 
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
            <th>每日任务</th>
            <th>任务类型</th>
            <th>任务状态</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Query_teacherDailyTask key={event.id} event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
});
    
/*  	
 * <每日任务>在表单上绘制详细内容;
 * @点击后调用即时消息(舞台跳转)
 * */
var Query_teacherDailyTask = React.createClass({ 
	btn_students_list_click:function(type,group_uuid){
		ajax_State_style(type,null,group_uuid,2);
	},
	  render: function() {
	    var event = this.props.event;
	    return (
	      <tr className={common_teacherDailyTask_status(event.status).className} >
	        <td><a href="javascript:void(0);" onClick={this.btn_students_list_click.bind(this,event.type,event.group_uuid)}>{event.title}</a></td>

	        <td>{common_teacherDailyTask_type(event.type)}</td>
	        <td>{common_teacherDailyTask_status(event.status).status}</td>
	      </tr> 
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
var Group_EventsTable_byRight = React.createClass({
	handleClick: function(m) {
			btn_click_group_byRight(m,{type:"1"});

	  },
  render: function() {
    return (
    <div>
    <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加分校</AMR_Button>
	  </AMR_ButtonToolbar>
	  <hr/>
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
            <th>品牌名</th>
            <th>预览</th>
            <th>机构全称</th>
            <th>电话</th>
            <th>学校地址</th>
            <th>创建时间</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Group_EventRow_byRight key={event.id} event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
});

/*
 *(校务管理)<校园列表>学校内容绘制 ;
 *@handleClick:绑定的事件根据M来区分点击事件并做处理；
 *@btn_click_group ：在kd_service；
 * */
var Group_EventRow_byRight = React.createClass({ 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';
    return (
      <tr className={className} >
      <td  ><a href="javascript:void(0);" onClick={btn_click_group_byRight.bind(this,"edit", event)}>{event.brand_name}</a></td>
         <td>
    	<AMR_Button amStyle="primary" onClick={btn_click_group_byRight.bind(this,"show",event)} round>预览</AMR_Button>
        </td>
          <td  >{event.company_name}</td>
        <td > {event.link_tel}</td>
        <td >{event.address}</td>
        <td >{event.create_time}</td>
      </tr> 
    );
  }
}); 

/*
 *(校务管理)<预览按钮>绘制 ;
 * */
  var Group_show_byRight = React.createClass({ 
  render: function() {
  	  var o = this.props.formdata;
		console.log("图片地址",o.description)
    return (
  		  <AMUIReact.Article
  		    title={o.brand_name}
  		    meta={o.company_name+" | "+o.link_tel+" | "+o.address+" | 阅读0次"}>
  			<div dangerouslySetInnerHTML={{__html: o.description}}></div>
  		   </AMUIReact.Article>	
  		   
  		   
    );
  }
  }); 
  
/*
 *(校务管理)<校园列表>添加分校和编辑详情绘制界面；
 *@componentDidMount：图片处理方法 
 *@ajax_group_save:提交按钮详情在kd_service
 * */    
var Group_edit_byRight = React.createClass({ 
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
	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
    return (
    		<form id="editGroupForm" method="post" className="am-form">
  		     <hr />
    		  <PxInput type="hidden" name="uuid"  value={o.uuid}/>
    	       <PxInput type="hidden" name="type"  value={o.type}/>
    		    <PxInput type="hidden" id="img" name="img"  value={o.img} onChange={this.handleChange}/>    		   
              <AMUIReact.Image  id="img_head_image"   src={G_imgPath+o.img} className={"G_img_header"}/>
             <button type="button"   onClick={this.btn_class_group_uploadHeadere}  className="am-btn am-btn-primary">上传LOGO</button>
            <div className= "am-form-group">
    		 <label className={one_classDiv }>品牌名:</label>
    		  <div className={two_classDiv }>
    	       <PxInput type="text" name="brand_name" id="brand_name" value={o.brand_name} onChange={this.handleChange} placeholder="不超过45位"/>
    	        </div>    		
    	       <label className={one_classDiv }>机构全称:</label>
    		  <div className={two_classDiv }>
    	     <PxInput type="text" name="company_name" id="company_name" value={o.company_name} onChange={this.handleChange} placeholder="不超过45位"/>
    	    </div>    	      
    	     <label className={one_classDiv }>学校地址:</label>
    		  <div className={two_classDiv }>
    	       <PxInput icon="university" type="text" name="address" id="address" value={o.address} onChange={this.handleChange} placeholder="不超过64位"/>
     	        </div>    	      
    	       <label className={one_classDiv }>地址坐标:</label>
    		  <div className={two_classDiv }>
    	     <PxInput type="text" name="map_point" id="map_point" value={o.map_point} onChange={this.handleChange} placeholder="拾取坐标后，复制到这里。格式：1.1,1.1"/> 
    	    <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">坐标拾取</a>
    	   </div>   	      
    	    <label className={one_classDiv }>学校电话:</label>
    		 <div className={two_classDiv }>
    	      <PxInput icon="phone" type="text" name="link_tel" id="link_tel" value={o.link_tel} onChange={this.handleChange} placeholder=""/>
    	       </div> 		
    	      <AMR_Input id="description" type="textarea" rows="50" label="校园介绍:" placeholder="校园介绍" name="description" value={o.description} onChange={this.handleChange}/>
  		  	  {G_get_upload_img_Div()}
  	          <button type="button"  onClick={ajax_group_save_byRight}  className="am-btn am-btn-primary">提交</button>
	    	 </div>
    		</form>   	   
    );
  }
});
//±±±±±±±±±±±±±±±±±±±±±±±±±±±





//——————————————————————————信息管理<绘制>—————————————————————  
/*
*(信息管理)<校园公告><老师公告><精品文章><招生计划>表单框绘制
*@btn_click_announce_byRight:点击按钮事件跳转kd_servise方法;
* */  
var Announcements_EventsTable_byRight = React.createClass({
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
			data : {type:obj.type,groupuuid:obj.groupuuid,pageNo:obj.pageNo},
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
  return (
  <div>
<AMR_ButtonToolbar>
	<AMR_Button amStyle="secondary" onClick={this.pageClick.bind(this, "pre")} round>上一页</AMR_Button>
	<AMR_Button amStyle="secondary" onClick={this.pageClick.bind(this, "next")} round>下一页</AMR_Button>	
	<span>第{obj.pageNo}页</span>
	<AMR_Button amStyle="primary" onClick={this.handleClick.bind(this,"add")} round>创建</AMR_Button>

  </AMR_ButtonToolbar>
<hr/>
<div className="am-form-group">
<AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  data={this.props.group_list} btnStyle="primary" value={obj.groupuuid} />    
  </div> 	  
    <AMR_Table {...this.props}>  
   <thead> 
    <tr>
      <th>标题</th>
      <th>状态</th>
      <th>浏览次数</th>
      <th>创建时间</th>
      <th>创建人</th>
    </tr> 
  </thead>
  <tbody>
    {this.state.list.map(function(event) {
      return (<Announcements_EventRow_byRight key={event.uuid} event={event} />);
        })}
      </tbody>
    </AMR_Table>
    </div>
  );
}
});
  
//信息管理绘制详情内容Map;   
var Announcements_EventRow_byRight = React.createClass({ 
	render: function() {
	  var event = this.props.event;
	  var className = event.highlight ? 'am-active' :
	    event.disabled ? 'am-disabled' : '';

	  return (
	    <tr className={className} >
	      <td><a  href="javascript:void(0);" onClick={react_ajax_announce_show_byRight.bind(this,event.uuid,Vo.announce_type(event.type))}>{event.title}</a></td>
	      <th>{Vo.get("announce_status_"+event.status)}</th>
	      <td>{event.count}</td>
	      <td>{event.create_time}</td>
	      <td>{event.create_user}</td>
	    </tr> 
	  );
	}
	});    
    

/*
* (信息管理)<校园公告><老师公告><精品文章><招生计划>创建与编辑界面绘制；
* @w_img_upload_nocut:上传图片后发的请求刷新;
* */    
var Announcements_edit_byRight = React.createClass({ 
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
			   <div className="am-form-group" id="div_classuuids" >
		  		<input type="hidden" name="type"  value={o.type}/>
		  		<label htmlFor="tel">班级通知:</label>
		  		<input type="text" name="classuuids" id="classuuids" value={o.classuuids} onChange={this.handleChange} placeholder="班级通知，才填写"/>
		     </div>;
	  } else {
		  type_div =
		  <input type="hidden" name="type"  value={o.type}/>
	  }
return (
		<div> 		
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		  <form id="editAnnouncementsForm" method="post" className="am-form">
		<input type="hidden" name="uuid"  value={o.uuid}/>
		<input type="hidden" name="isimportant"  value={o.isimportant}/> 		
		<div className="am-form-group">
	  <AMUIReact.Selected id="groupuuid" name="groupuuid" onChange={this.handleChange} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={o.groupuuid} />    		          
      </div>   
		{type_div}
		  <label htmlFor="name">标题:</label>
		  <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} maxlength="45"   placeholder="不超过45位"/>
		  <br/>
		  <AMR_Input id="announce_message" type="textarea" rows="10" label="内容:" placeholder="填写内容" name="message" value={o.message} onChange={this.handleChange}/>
		{G_get_upload_img_Div()} 
		  <button type="button"  onClick={ajax_announcements_save_byRight}  className="am-btn am-btn-primary">提交</button>
		  </form>
	     </div>
	   </div>	   
	  </div>
);
}
}); 


//
/*
 *<信息管理>公告点赞、添加、删除、禁用、评论、加载更多等详情绘制模板；
 *增加编辑与删除功能
 * */
var Announcements_show_byRight = React.createClass({ 
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

return (
	  <div>
       <div className="am-margin-left-sm">
	 
       <AMUIReact.Article
	    title={o.title}
	    meta={Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}>
		<div dangerouslySetInnerHTML={{__html: o.message}}></div>
	      </AMUIReact.Article>		     
	     <AMR_ButtonToolbar>
	     <AMR_Button className="G_Edit_show" amStyle="primary" onClick={this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)} round>编辑</AMR_Button>
	     <AMR_Button className="G_Edit_show" amStyle="danger" onClick={this.handleClick.bind(this, "del",o.groupuuid,o.uuid)} round>删除</AMR_Button> 
	     <AMR_Button  amStyle="success" onClick={this.favorites_push.bind(this,o.title,o.type,o.uuid)} round>收藏</AMR_Button> 
	     <G_check_disable_div_byRight type={o.type} uuid={o.uuid}/>
	     </AMR_ButtonToolbar>
	     
	     </div>
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










//——————————————————————————班级互动<绘制>——————————————————————————
/* 
 * <班级互动>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @btn_click_announce:点击按钮事件跳转kd_servise方法;
 * */
var Classnews_Div_list_byRight = React.createClass({ 
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
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
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
			 console.log("num",num);
			 ajax_classnews_list_div_byRight(num); 		
		 }
	  },
render: function() {
	this.type=this.props.type;
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (			
		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">
		  <AMUIReact.ButtonToolbar>
		    <AMUIReact.Button amStyle="primary" onClick={this.refresh_data.bind(this)} round>刷新</AMUIReact.Button>
		    <G_help_popo  msg={G_tip.Classnews_admin}/> 
		    </AMUIReact.ButtonToolbar>
		  <hr/>	  
		    
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
* <班级互动>;
* @Classnews_EventRow:绘制列表详情;
* */
var Classnews_EventsTable_byRight = React.createClass({	  
render: function() {
	var that=this;
return (
<div>
  {this.props.events.data.map(function(event) {
    return (<Classnews_show_byRight  event={event} />);
  })}
</div>
);
}
});
/*
* <班级互动>MAp详情绘制
* var o = this.props.formdata;
*/
var Classnews_show_byRight = React.createClass({ 
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
			  <div>
			  <article className="am-comment am-margin-xs">
			  <a href="javascript:void(0);">
			    <img src={o.create_img}  className="am-comment-avatar" width="48" height="48"/>
			  </a>

			  <div className="am-comment-main">
			    <header className="am-comment-hd">
			      <div className="am-comment-meta">
			        <a href="javascript:void(0);" className="am-comment-author">{Store.getGroupNameByUuid(o.groupuuid)}|{Store.getClassNameByUuid(o.classuuid)}|{o.create_user}</a>
			        发表于 <time>{o.update_time}</time>
			      </div>
			    </header>
			    <div className="am-comment-bd">
			    <div dangerouslySetInnerHTML={{__html:o.content}}></div>
			    	<Common_mg_big_fn  imgsList={o.imgsList} />
			    </div>
			    	<footer className="am-comment-footer">
			    	<div className="am-comment-actions">
			    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
			    	<a href="javascript:void(0);"><i id={"btn_reply_"+o.uuid} className="am-icon-reply px_font_size_click"></i></a>
			    	<a href="javascript:void(0);" onClick={common_check_illegal.bind(this,99,o.uuid)}>举报</a>
			    	<G_check_disable_div_byRight type={99} uuid={o.uuid}/>
			    	</div>
			    	</footer>
			    	
			    	<Common_Dianzan_show_noAction dianzan={o.dianzan} uuid={o.uuid} type={0}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
			    	<ul className="am-comments-list">
					  <Classnews_reply_list_byRight replyPage={o.replyPage} uuid={o.uuid}  type={0} btn_reply={"btn_reply_"+o.uuid}/>
			    	</ul>
			     </div>
			</article>
			 
			    </div>		   
	  );
	}
	}); 




/*
* 1.1互动里面单独的评论模板
* 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
* 把评论模板插入空Div里面
* 
* */
var Classnews_reply_list_byRight = React.createClass({ 
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
		if(!re_data){
			re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow_byRight);
		}else{
			this.loadByFirst(this.classnewsreply_list_div+this.pageNo);
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
		  
		  <div className="am-comment-bd am-comment-flip">
		  <div id={this.div_reply_save_id}>			</div>
		    <div id={this.classnewsreply_list_div}></div>
		    <button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>		
			
			</div>	
		   
);
}
}); 
/*
* 1.2互动里面单独的评论模板-item
* 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
* 把评论模板插入空Div里面
* 
* */
var Classnews_reply_list_listshow_byRight = React.createClass({ 	
render: function() {
return (
		  <div>
		  {this.props.events.data.map(function(event) {
		      return (
		    		  <li className="am-cf">
		    		  <span className="am-comment-author am-fl">{event.create_user+":"}</span>
				        <span className="am-fl" dangerouslySetInnerHTML={{__html:event.content}}></span><G_check_disable_div_byRight type={98} uuid={event.uuid}/>
		    		  </li>
		    		  )
		  })}
		
		    </div>		   
);
}
}); 

/*
* 绘制评论模板
* @componentDidMount:添加表情
* */
var Classnews_reply_save_byRight = React.createClass({ 
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
		   <form id={this.form_id} method="post" className="am-form">
			<input type="hidden" name="newsuuid"  value={this.props.uuid}/>
			<input type="hidden" name="uuid" />
			<input type="hidden" name="type"  value={this.props.uuid}/>						
			<AMR_Input id={this.classnews_content} type="textarea" rows="3" label="我要回复" placeholder="填写内容" name="content" />
			<button type="button"  onClick={this.reply_save_btn_click.bind(this)}  className="am-btn am-btn-primary">提交</button>		      
		    </form>	   
);
}
}); 

/*
* <班级互动>添加与编辑按钮中可删除图片显示.
*/
var ClassNews_Img_canDel = React.createClass({
		deleteImg:function(divid){
			$("#"+divid).remove();
		},			
	  render: function() {
		 return (
          		<div  className="G_cookplan_Img" >
	 	       			<img className="G_cookplan_Img_img"  src={this.props.url} alt="图片不存在" />
	 	       			<div className="G_cookplan_Img_close"  onClick={this.deleteImg.bind(this,this.props.parentDivId)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
	 	       		</div>		
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
var Classnews_edit_byRight = React.createClass({ 
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
		<div>
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">	      
		  <form id="editClassnewsForm" method="post" className="am-form">
		  <AMUIReact.Selected id="selectclass_uuid" name="classuuid" onChange={this.handleChange_selectclass_uuid} btnWidth="300"  data={this.props.mycalsslist} btnStyle="primary" value={o.classuuid} />	      
			
		  <input type="hidden" name="uuid"  value={o.uuid}/>
			<input type="hidden" name="imgs" id="imgs"  value={o.imgs}/>			
		      <AMR_Input id="classnews_content" type="textarea" rows="3" label="内容:" placeholder="填写内容" name="content" value={o.content} onChange={this.handleChange}/>
		      <div id="show_imgList"></div><br/>
		      <div className="cls"></div>
			  {G_get_upload_img_Div()}
		      <button type="button"  onClick={ajax_classnews_save_Right}  className="am-btn am-btn-primary">提交</button>
		    </form>
	     </div>
	   </div>
	   
	   </div>
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
var CookbookPlan_EventsTable_byRight = React.createClass({
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
				  G_msg_pop("请勾选复选框！");
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
	<div>
	<AMR_ButtonToolbar>
	<AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "pre")} round>上周</AMR_Button>
	<AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "next")} round>下周</AMR_Button>	
	<AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add",null,this.props.group_uuid)} round>添加</AMR_Button>
	</AMR_ButtonToolbar>
	<div className="header">
	<div className="am-g">
	  <h1>[{this.props.begDateStr} 到 {this.props.endDateStr}]</h1>
	</div>
	<hr />
	</div>
		  <div className="am-form-group">
		  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />      
	</div>		  
	  <AMR_Table {...this.props}>  
	    <thead> 
	      <tr>
	        <th>一周</th>
	        <th>早餐</th>
	        <th>早上加餐</th>
	        <th>午餐</th>
	        <th>下午加餐</th>
	        <th>晚餐</th>
	        <th>营养分析</th>
	      </tr> 
	    </thead>
	    <tbody>
	      {this.props.events.map(function(event) {
	        return (<CookbookPlan_EventRow_byRight  event={event} />);
	      })}
	    </tbody>
	  </AMR_Table>
	  </div>
	);
	}
});


/*
 *(食谱管理)内容绘制
 *@btn_click_cookbookPlan:点击按钮事件跳转kd_servise方法;
 * */ 
var CookbookPlan_EventRow_byRight = React.createClass({ 
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
  <tr className={className} >
    <td><a href="javascript:void(0);" onClick={btn_click_cookbookPlan_byRight.bind( this, 'edit',event)}>{G_week.getWeekStr(event.plandate)}</a></td>
    <td>{this.parseTimes(event.list_time_1)}</td>
    <td>{this.parseTimes(event.list_time_2)}</td>
    <td>{this.parseTimes(event.list_time_3)}</td>
    <td>{this.parseTimes(event.list_time_4)}</td>
    <td>{this.parseTimes(event.list_time_5)}</td>
    <td>{event.analysis}</td>
  </tr> 
);
}
});
/*
 *(食谱管理)添加与编辑详情界面绘制
 *@ajax_cookbookPlan_save:点击按钮事件跳转kd_servise方法;
 * */ 
var CookbookPlan_edit_byRight = React.createClass({ 
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
		  plandateStr_div = <PxInput icon="calendar" type="text" name="plandateStr" id="plandateStr" value={o.plandate}  />
	  } else {
		  plandateStr_div = <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="plandateStr" id="plandateStr" dateTime={o.plandate} showTimePicker={false}  onChange={this.handleChange}/>
	  }
	  return (
		<div>
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		  <form id="editCookbookPlanForm" method="post" className="am-form">
		<input type="hidden" name="uuid"  value={o.uuid}/>
		<input type="hidden" name="groupuuid"  value={o.groupuuid}/>
		<input type="hidden" name="type"  value="1"/>
		        <label htmlFor="name">日期:</label>
				 {plandateStr_div}  
				 <br/>
		      <label>早餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_1}  type={"time_1"}/>
		      <div className="cls"></div>
		      <br/>
		      <label>早上加餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_2}  type={"time_2"}/>
		      <div className="cls"></div>
		      <br/>
		      <label>午餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_3}  type={"time_3"}/>
		      <div className="cls"></div>
		      <br/>
		      <label>下午加餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_4}  type={"time_4"}/>
		      <div className="cls"></div>
		      <br/>
		      <label>晚餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_5}  type={"time_5"}/>
		      <div className="cls"></div>
		      <br/>
		      <AMR_Input  name="analysis" type="textarea" rows="2" label="营养分析:" placeholder="填写内容" value={o.analysis} onChange={this.handleChange}/>				
		      <button type="button"  onClick={ajax_cookbookPlan_save_byRight}  className="am-btn am-btn-primary">提交</button>
		    </form>

	     </div> 
	   </div>
	   
	   </div>
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
var Teachingplan_EventsTable_byRight = React.createClass({
	
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
		  var classList=Store.getChooseClass(nextProps.groupuuid);
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
				},
				error : G_ajax_error_fn
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
<div>
<div className="header">
	<hr />
	</div>
<AMR_ButtonToolbar>
<AMR_Button amStyle="secondary" onClick={this.pageClick.bind(this, "pre")} round>上周</AMR_Button>
<AMR_Button amStyle="secondary" onClick={this.pageClick.bind(this, "next")} round>下周</AMR_Button>
  <AMUIReact.Selected id="selectgroup_uuid" name= "group_uuid" onChange={this.handleChange_selectgroup.bind(this)} btnWidth= "200" data={this.props.groupList} btnStyle="primary" value={this.state.groupuuid}/> 
  <AMUIReact.Selected id="selectclass_uuid" name= "class_uuid" onChange={this.handleChange_selectclass.bind(this)} btnWidth= "200" data={this.state.classList} btnStyle="primary" value={this.state.classuuid}/>    
</AMR_ButtonToolbar>
  <h1>[{begDateStr} 到 {endDateStr}]</h1>
	  <hr/>
<AMR_Table {...this.props}>  
  <thead> 
    <tr>
    	<th>一周</th>
      <th>上午</th>
      <th>下午</th>
    </tr> 
  </thead>
  <tbody>
    {this.state.list.map(function(event) {
      return (<Teachingplan_EventRow_byRight  event={event} />);
    })}
  </tbody>
</AMR_Table>
</div>
);
}
});
/*
*<课程安排>班级详情列表详情内容绘制;
* @add:添加班级课程；
* @pre:上周；
* @next:下一周；
* */
var Teachingplan_EventRow_byRight = React.createClass({ 
	render: function() {
	var event = this.props.event;
	if(G_week.getWeekStr(event.plandate)==G_week.getWeekStr(new Date())){
		event.highlight=true;
	}
	var className = event.highlight ? 'am-active' :
	  event.disabled ? 'am-disabled' : '';

	return (
	  <tr className={className} >
	    <td>{G_week.getWeekStr(event.plandate)}</td>
	    <td>{event.morning}</td>
	    <td>{event.afternoon}</td>
	  </tr> 
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
var Boss_student_tel_byRight =React.createClass({
	render: function() {
     var o =this.state;	
	 return (
	 	<div>
	 	    <ul className="am-list am-list-static am-list-border">
	    	     {this.props.formdata.map(function(event) {
	              return (
	              <li className="am-comment">	
	      	       <a href="javascript:void(0);" >
	   	          <img src={G_getHeadImg(event.send_userimg)} alt="" className="am-comment-avatar" width="48" height="48"/>
	      	     </a>
	      	   <span className="am-comment-author">{event.send_user} </span>家长来信{event.count}条,最后来信时间:{event.last_time}
	           <AMR_ButtonToolbar>		            
	         <AMUIReact.Button  onClick={ajax_my_boss_stage_byRight.bind(this,event.send_useruuid,event.revice_useruuid,event.send_user)} amStyle="success">@信息</AMUIReact.Button>
	        </AMR_ButtonToolbar>
	       </li>);})}		      			      
		 </ul>
	 	</div> 		 
	     );
        }
	 });


/*
* <园长信箱>如果没有数据则绘制文字提示用户
* */
var Boss_student_tel2_byRight =React.createClass({
	render: function() {
	 return (
			 <div className="am-g">
			  <h1>园长信箱暂无信件！</h1>
			  </div>
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
var Boss_message_stage_byRight = React.createClass({ 
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
	  <div>
	   <div id={this.classnewsreply_list_div}>
	   
	   </div>
		<button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>
		<Boss_message_save_byRight parent_React={this} send_useruuid={this.props.send_useruuid} revice_useruuid={this.props.revice_useruuid} />
		</div>
		
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
var Boss_message_save_byRight = React.createClass({ 
classnewsreply_list_div:"classnewsreply_list_div",
componentDidMount:function(){
	$('#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);
},
reply_boss_save_btn_click:function(){
	ajax_boss_message_save_byRight(this.props.parent_React);
},
render: function() {
return (
	   <form id="editForm" method="post" className="am-form">
	   <input type="hidden" name="revice_useruuid"  value={this.props.send_useruuid}/>
		<input type="hidden" name="send_useruuid"  value={this.props.revice_useruuid}/>			
		<AMR_Input id="classnews_content_replay" type="textarea" rows="10" label="信息发送" placeholder="填写内容" name="message" />
	      <button type="button"  onClick={this.reply_boss_save_btn_click.bind(this)}  className="am-btn am-btn-primary">发送</button>		      
	    </form>	   
);
}
}); 


/* <园长信箱>2层发信息详情界面绘制；
* @send_user：信息者名字；
* @message：信息内容；
* @am-comment-flip:默认头像 加了靠右边 不加靠左;
* */
var Message_queryLeaderMsgByParents_listpage_byRight =React.createClass({	 
	render: function() {
			var revice_useruuid=this.props.revice_useruuid;
		  return (				  
				  <ul className="am-comments-list ">
				  {this.props.events.data.map(function(event) {
					  var class1="am-comment am-comment-flip am-comment-secondary";
					  if(revice_useruuid==event.send_useruuid){
						  class1="am-comment";
					  }
				      return (
				    		  <li className={class1}>
				    		  	<a href="javascript:void(0);" >
				    		  	 <img src={G_getHeadImg(event.send_userimg)} alt="" className="am-comment-avatar" width="48" height="48"/>
				    		  		</a>
				    		  		 <div className="am-comment-main">
				    		  		 <header className="am-comment-hd">
				    		  	      <div className="am-comment-meta">
				    		  	        <a href="#link-to-user" className="am-comment-author">{event.send_user}</a>
				    		  	        发送于 <time>{event.create_time}</time>
				    		  	      </div>
				    		  	    </header>
				    		  	  <div className="am-comment-bd">
				    		  	 <div dangerouslySetInnerHTML={{__html:event.message}}></div>
				    		  	 </div>
				    		  	    </div>
							  </li>
							  )
				  })}				  
				</ul>
				 
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
var Class_EventsTable_byRight = React.createClass({
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
  <div>
  <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add_class")} round>添加班级</AMR_Button>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "flower_name")} round>下载花名册</AMR_Button>
	  </AMR_ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
	  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />   
  </div>
	  
    <AMR_Table {...this.props}>  
      <thead> 
        <tr>
        	<th>  
          <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
          </th>
          <th>班级</th>
          <th>班主任</th>
          <th>老师</th>
          <th>学校</th>
          <th>创建时间</th>
        </tr> 
      </thead>
      <tbody>
        {this.props.events.map(function(event) {
          return (<Class_EventRow_byRight key={event.id} event={event} />);
        })}
      </tbody>
    </AMR_Table>
    </div>
  );
}
});
  /*
   * <班级管理>列表详细内容绘制;
   * @react_ajax_class_students_manage:调用在（我的班级）公共方法 编辑与添加
   * */
  var Class_EventRow_byRight = React.createClass({ 
	  render: function() {
	    var event = this.props.event;
	    var className = event.highlight ? 'am-active' :
	      event.disabled ? 'am-disabled' : '';
	    return (
	      <tr className={className} >
	      <td> 
	      <input type="checkbox" value={event.uuid} name="table_checkbox" />
	      </td>
	        <td><a href="javascript:void(0);" onClick={react_ajax_class_students_manage_byRight.bind(this, event.uuid)}>{event.name}</a></td>
	        <td>{event.headTeacher_name}</td>
	        <td>{event.teacher_name}</td>
	        <td>{Store.getGroupNameByUuid(event.groupuuid)}</td>
	        <td>{event.create_time}</td>
	      </tr> 
	    );
	   }
	  });  
  
/*
* <班级管理>班级添加与编辑模式详情绘制
* @ajax_class_save：提交按钮在Kd_service;
* */	    
  var Class_edit_byRight = React.createClass({ 
  	 getInitialState: function() {
  		    return this.props.formdata;
  		  },
  	 handleChange: function(event) {
  		    this.setState($('#editClassForm').serializeJson());
  	  },
  render: function() {
  	  var o = this.state;
    return (
    		<div>
    		<div className="header">
    		  <hr />
    		</div>
    		<div className="am-g">
    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    		  <form id="editClassForm" method="post" className="am-form">
    		<input type="hidden" name="uuid"  value={o.uuid}/>
    		     <input type="hidden" name="type"  value="1"/>
    		    <div className="am-form-group"> 		    
    		  <AMUIReact.Selected id="groupuuid" name="groupuuid" onChange={this.handleChange} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={o.groupuuid} />          
    		    </div> 		    
    		      <label htmlFor="name">班级:</label>
    		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过45位！"/>
    		      <br/>   		   
  		      <label htmlFor="name">班主任:</label>
  	  		    <input type="hidden" name="headTeacher" id="headTeacher" value={o.headTeacher} onChange={this.handleChange}/>
  			      <input type="text"  id="headTeacher_name" value={o.headTeacher_name} onChange={this.handleChange} onClick={w_ch_user.open.bind(this,"headTeacher","headTeacher_name",o.groupuuid)} placeholder=""/>
  			      <br/>
  			      <label htmlFor="name">其他老师:</label>
  		  		    <input type="hidden" name="teacher" id="teacher" value={o.teacher} onChange={this.handleChange}/>
  				      <input type="text"  id="teacher_name" value={o.teacher_name} onChange={this.handleChange}  onClick={w_ch_user.open.bind(this,"teacher","teacher_name",o.groupuuid)} placeholder=""/>
  				      <br/>
    		      <button type="button"  onClick={ajax_class_save_byRight}  className="am-btn am-btn-primary">提交</button>
    		    </form>

    	     </div> 
    	   </div>	    	   
    	   </div>
    );
  }
 }); 
  /*
   *<班级管理>班级学生头像列表界面绘制 
   * @class_students_manage_onClick 添加学生按钮的方法
   * @add：添加学生
   * @class：查看课程;
   *   		    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this,"graduate_class",o.groupuuid,o.uuid)} round>毕业</AMR_Button>
   * */
  var AMR_Grid=AMUIReact.Grid;
  var AMR_Col=AMUIReact.Col;
  var Class_students_manage_byRight = React.createClass({
  	 componentDidMount:function(){
  			 G_img_down404();
  	  },
  	handleClick: function(m,groupuuid,uuid) {		 
  		btn_click_class_list_byRight(m,groupuuid,uuid);
	 },
	 handleChange_selectgroup: function(val) {
		 var class_uuid;
		 if(Store.getChooseClass(val).length>0){
			 class_uuid=Store.getChooseClass(val)[0].uuid; 
		 }else{
			 class_uuid="";
		 }
		
		 //document.getElementById("selectclass_uuid2").removeAttribute("selected"); 
		 //document.getElementById("selectclass_uuid2").selectedIndex = 0;
		 
		 btn_click_class_kuang_byRight(class_uuid);
	 },
	 handleChange_selectclass: function(val) {		 
		 btn_click_class_kuang_byRight(val)
	 },	 
  	render: function() {
  		var o=this.props.formdata;
  		console.log("o-----",o.uuid);
  	  return (
  	  <div>
  	  <AMR_ButtonToolbar>
  		    <AMR_Button amStyle="primary" onClick={class_students_manage_onClick_byRight.bind(this, "add",this.props.formdata.uuid)} round>添加学生</AMR_Button>
  		    <AMR_Button amStyle="primary" onClick={class_students_manage_onClick_byRight.bind(this,"class",o.uuid,o.name)} round>查看课程</AMR_Button>
  		    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this,"edit_class",o.groupuuid,o.uuid)} round>编辑</AMR_Button>
  		  <AMUIReact.Selected id="selectgroup_uuid" name= "group_uuid" onChange={this.handleChange_selectgroup.bind(this)} btnWidth= "200" data={this.props.groupList} btnStyle="primary" value={o.groupuuid}/> 
  		  <AMUIReact.Selected id="selectclass_uuid2" name= "class_uuid" onChange={this.handleChange_selectclass.bind(this)} btnWidth= "200" data={this.props.classList} btnStyle="primary" value={o.uuid}/>    
  		    </AMR_ButtonToolbar>
  		  <hr/>
  		  <AMR_Panel>
  			  <AMR_Grid className="doc-g">
  			  <AMR_Col sm={3} > 学校:{Store.getGroupNameByUuid(o.groupuuid)}</AMR_Col>
  			    <AMR_Col sm={3} > 班级:{o.name}</AMR_Col>
  			    <AMR_Col sm={3} >班主任:{o.headTeacher_name}</AMR_Col>
  			    <AMR_Col sm={3}>其他老师:{o.teacher_name}</AMR_Col>
  			  </AMR_Grid>
  		  </AMR_Panel>
  		  <AMR_Gallery data={this.props.students}  sm={3} md={4} lg={6} />
  	    </div>
  	  );
  	}
  	});
  
 
  
/*
 * <班级管理>详情界面
 * 添加学生与编辑绘制
 * */
  var Class_student_edit_byRight = React.createClass({ 
	  	
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
	  var calss_btn_className="G_Edit_show am-btn am-btn-primary";
	  if(!o.uuid){
		  calss_btn_className="G_Edit_hide";
	  }
  	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
  	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
   return (
		   <form id="editClassStudentForm" method="post" className="am-form">
		   <PxInput type="hidden" name="headimg" id="headimg"  value={o.headimg}  onChange={this.handleChange} />
			<PxInput type="hidden" name="uuid"  value={o.uuid}/>
		     <PxInput type="hidden" name="classuuid"  value={o.classuuid}/>
		   <div className="am-form-group">
		    <hr />
  		     <AMUIReact.Image id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>  		      
  		      <button type="button"  onClick={this.btn_class_student_uploadHeadere}  className="am-btn am-btn-primary">上传头像</button> 		      		      
 	         <AMUIReact.FormGroup>
 	        <label>单选：</label>
 	       <AMUIReact.Input type="radio" name="sex" value="0" label="男" inline onChange={this.handleChange} checked={o.sex==0?"checked":""}  />
 	      <AMUIReact.Input type="radio" name="sex" value="1" label="女" inline onChange={this.handleChange} checked={o.sex==1?"checked":""}  />
 	     </AMUIReact.FormGroup>     		    
 	       <label className={one_classDiv}>姓名</label>
   		     <div className={two_classDiv}>
		       <PxInput icon="user" type="text" name="name" id="name" value={o.name} onChange={this.handleChange}/>
		        </div>
		       <label className={one_classDiv}>昵称</label>
	   		  <div className={two_classDiv}>  
   		     <PxInput icon="user-secret" type="text" name="nickname" id="nickname" value={o.nickname} onChange={this.handleChange}/>
   		    </div>
   		     <label className={one_classDiv}>生日</label>
  		      <div className={two_classDiv}>
  		       <AMUIReact.DateTimeInput  icon="calendar" format="YYYY-MM-DD"  name="birthday" id="birthday" dateTime={o.birthday} onChange={this.handleChange}/>
		        </div>
		       <label className={one_classDiv}>身份证</label>
			  <div className={two_classDiv}>  
			 <PxInput  type="text" name="idcard" id="idcard" value={o.idcard} onChange={this.handleChange} placeholder=""/>
		    </div>  		     
		    <fieldset>
		    <legend>爸爸妈妈信息</legend> 
	        <label className={one_classDiv}>妈妈姓名</label>
	         <div className={two_classDiv}>
	          <PxInput icon="user" type="text"  name="ma_name" id="ma_name" size="10" maxLength="45" value={o.ma_name} onChange={this.handleChange}/>
	           </div>
	          <label className={one_classDiv}>妈妈电话</label>
		     <div className={two_classDiv}>  
		    <PxInput  icon="mobile" type="text" name="ma_tel" id="ma_tel" value={o.ma_tel} onChange={this.handleChange}/>
	       </div>
	        <label className={one_classDiv}>妈妈工作</label>
	         <div className={two_classDiv}>
		      <PxInput type="text" name="ma_work" id="ma_work" value={o.ma_work} onChange={this.handleChange}/>
	           </div>
	          <label className={one_classDiv}>爸爸姓名</label>
		     <div className={two_classDiv}>  
		    <PxInput icon="user" type="text" name="ba_name" id="ba_name" size="10" maxLength="45"  value={o.ba_name} onChange={this.handleChange}/>
	       </div>
	        <label className={one_classDiv}>爸爸电话</label>
	         <div className={two_classDiv}>
		      <PxInput icon="mobile" type="text" name="ba_tel" id="ba_tel" value={o.ba_tel} onChange={this.handleChange} placeholder=""/>
	           </div>
	          <label className={one_classDiv}>爸爸工作</label>
		     <div className={two_classDiv}>  
		    <PxInput type="text" name="ba_work" id="ba_work" value={o.ba_work} onChange={this.handleChange} placeholder=""/>
	       </div>
	        <label className={one_classDiv}>家庭住址</label>
	         <div className={two_classDiv}>
		      <PxInput icon="home" type="text" name="address" id="address" value={o.address} onChange={this.handleChange} placeholder=""/>
	           </div>		    
		      </fieldset>  		    		      
		      <fieldset>
		      <legend>其他信息</legend>
		        <label className={one_classDiv}>奶奶电话</label>
		         <div className={two_classDiv}>
			      <PxInput icon="mobile" type="text" name="nai_tel" id="nai_tel" value={o.nai_tel} onChange={this.handleChange} placeholder=""/>
		           </div>
		          <label className={one_classDiv}>爷爷电话</label>
			     <div className={two_classDiv}>  
			    <PxInput icon="mobile" type="text" name="ye_tel" id="ye_tel" value={o.ye_tel} onChange={this.handleChange} placeholder=""/>
		       </div>
		        <label className={one_classDiv}>外婆电话</label>
		         <div className={two_classDiv}>
			      <PxInput icon="mobile" type="text" name="waipo_tel" id="waipo_tel" value={o.waipo_tel} onChange={this.handleChange} placeholder=""/>
		           </div>
		          <label className={one_classDiv}>外公电话</label>
			     <div className={two_classDiv}>  
			    <PxInput icon="mobile" type="text" name="waigong_tel" id="waigong_tel" value={o.waigong_tel} onChange={this.handleChange} placeholder=""/>
		       </div>
		        <label className={one_classDiv}>其他电话</label>
		         <div className={two_classDiv}>
			      <PxInput icon="phone" type="text" name="other_tel" id="other_tel" value={o.other_tel} onChange={this.handleChange} placeholder=""/>
		           </div>
		           <button type="button" className={calss_btn_className}  onClick={this.btn_ajax_classStudent_admin_byRight.bind(this,o.groupuuid,o.uuid)} >改变班级</button>
		           <AMUIReact.Input type="textarea"
			 	 	      label="说明"
			 	 	    	 name="note"
			 	 	      labelClassName="am-u-sm-2"
			 	 	      placeholder="备注"
			 	 	      wrapperClassName="am-u-sm-10"
			 	 	      amSize="lg" />
		 		      <br/>
		 		      </fieldset>
				      <button type="button"  onClick={btn_ajax_class_student_save_byRight}  className="am-btn am-btn-primary">提交</button>		      
   		           </div>  
   		          </form> 		  
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
    var Accounts_EventsTable_byRight = React.createClass({
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
      <div>
      <div className="header">
    	  <hr />
    	</div>
      <AMR_ButtonToolbar>
    	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加</AMR_Button>
    	  </AMR_ButtonToolbar>
    	  <hr/>
    	  <div className="am-form-group">
    	  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />	  
    	  </div>
        <AMR_Table {...this.props}>  
          <thead> 
              <tr>
              <th>类型</th>
              <th>内容</th>
              <th>金额</th>
              <th>收费时间</th>            
              <th>学生</th>
              <th>班级</th>
              <th>学校</th>
              <th>备注</th>
              <th>创建人</th>
              <th>创建时间</th>
            </tr> 
          </thead>
          <tbody>
            {this.props.events.map(function(event) {
              return (<Accounts_EventRow_byRight key={event.id} event={event} />);
            })}
          </tbody>
        </AMR_Table>
        </div>
      );
    }
    });
  /*
   * <收支记录>列表详细内容绘制;
   * */    
  var Accounts_EventRow_byRight = React.createClass({ 
  	render: function() {
  	  var event = this.props.event;
  	  var className = event.highlight ? 'am-active' :
  	    event.disabled ? 'am-disabled' : '';

  	  return (
  	    <tr className={className} >
  	    <td > {Vo.get("KD_Accounts_type_"+event.type)}</td>
  	    <td  >{event.title}</td>
  	    <td > {event.num}</td>
  	      <td  >{G_getDateYMD(event.accounts_time)}</td>	     
  	      <td > {event.studentname}</td>
  	      <td > {Store.getClassByUuid(event.classuuid).name}</td>
  	      <td >{Store.getGroupNameByUuid(event.groupuuid)}</td>
  	      <td > {event.description}</td>
  	      <td >{event.create_user}</td>
  	      <td >{event.create_time}</td>
  	    </tr> 
  	  );
  	}
  	});
  /*
   * <收支记录>添加按钮详情绘制;
   * @ajax_accounts_save：保存按钮调用
   * @ajax_accounts_save：保存继续按钮
   * 都在kd_service；
   * */ 
  var Accounts_edit_byRight = React.createClass({ 
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
  	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
  	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8s";
   return (
   		<div>
   		<div className="header">
   		  <hr />
   		</div>
   		<div className="am-g">
   		<div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
   		<form id="editAccountsForm" method="post" className="am-form">
   	    <div className="am-form-group">
   		<AMUIReact.Selected name="groupuuid"  onChange={this.handleChange_groupuuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={o.groupuuid+""} />  	 			          
  	    </div> 
   		<div className="am-form-group">
    		<AMUIReact.Selected name="type" onChange={this.handleChange_type} btnWidth="200"  multiple= {false} data={this.props.type_list} btnStyle="primary" value={o.type+""} />  	 
    	    <br/>
    		<AMUIReact.Selected name="classuuid" placeholder="班级选择" onChange={this.handleChange_classuuid} btnWidth="200"  multiple= {false} data={o.tmp_classList} btnStyle="primary" value={o.classuuid+""} />  	 
    	    <br/>
    		<AMUIReact.Selected name="studentuuid"placeholder="学生选择" onChange={this.handleChange_studentuuid} btnWidth="200"  multiple= {false} data={o.tmp_studentList} btnStyle="primary" value={o.studentuuid+""} />  	 
          </div> 
   	    <br/>	    
   	    <label htmlFor="accounts_timeStr"  className={one_classDiv}>收支日期:</label>
   	  <div className={two_classDiv}>
   	    <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="accounts_timeStr" id="accounts_timeStr" dateTime={o.accounts_time} showTimePicker={false}  onChange={this.handleChange}/>
   	  </div>
   	    <label htmlFor="title" className={one_classDiv}>内容:</label>
   	 <div className={two_classDiv}>
   	      <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} placeholder="不超过64位"/>
   	   </div>
   	       <label htmlFor="num" className={one_classDiv}>金额:</label>
   	    <div className={two_classDiv}>
   	      <input type="number" name="num" id="num" value={o.num} onChange={this.handleChange} placeholder=""/> 
   	      </div>
   	    <label htmlFor="description" className={one_classDiv}>备注:</label>
   	 <div className={two_classDiv}>
  	      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange} placeholder="不超过100位"/>
  	    </div>
  	      <button type="button"  onClick={ajax_accounts_saveAndAdd_byRight}  className="am-btn am-btn-primary">保存继续</button>
   	      <button type="button"  onClick={ajax_accounts_save_byRight}  className="am-btn am-btn-primary">保存返回</button>
   	     </form>
   	     </div>
   	   </div> 	   
   	   </div>
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
  var Query_stutent_list_byRight = React.createClass({
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
  	if(this.state.class_uuid){			
  		this.state.class_uuid="1";
  	};
  	var pre_disabled=g_student_query_point<2;
  	
  	if(g_student_query_point==1){
  		this.maxPageNo=Math.floor(this.props.data.list.totalCount/this.props.data.list.pageSize)+1;
  	}
  	var next_disabled=g_student_query_point>=this.maxPageNo;
      return (
  		  
      <div> 
  	  <div className="am-form-group">
  	  <hr/>	 
  	  </div>
  	<form id="editGroupForm" method="post" className="am-form">
  	
<AMR_Button amStyle="secondary" disabled={pre_disabled} onClick={this.handleClick.bind(this,"pre",this.state.group_uuid,this.state.class_uuid)} round>&laquo; 上一页</AMR_Button>
<label>{g_student_query_point}\{this.maxPageNo}</label> 
<AMR_Button amStyle="secondary" disabled={next_disabled} onClick={this.handleClick.bind(this,"next",this.state.group_uuid,this.state.class_uuid)} round>下一页 &raquo;</AMR_Button>
  



<AMR_ButtonToolbar className="am-cf am-margin-left-xs">
   	<div className="am-fl">
  	  <AMUIReact.Selected  className= "am-fl" id="selectgroup_uuid1" name="group_uuid" onChange={this.handleChange_stutent_Selected} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.state.group_uuid} />      
  	 </div>  	 
  	<div className="am-fl am-margin-left-xs">
  	  <AMUIReact.Selected  className= "am-fl" id="selectgroup_uuid2" name="class_uuid" onChange={this.handleChange_stutent_Selected} btnWidth="200"  multiple= {false} data={this.state.class_list} btnStyle="primary" value={this.state.class_uuid} />      
  	</div>  
  	<div className="am-fl am-margin-left-xs">
  	<input type="text"  name="sutdent_name" id="sutdent_name"     placeholder="学生姓名"/>	  
  	</div>  
  	<div className="am-fl am-margin-left-xs">
  	<button type="button"   onClick={this.btn_query_click}  className="am-btn am-btn-primary">搜索</button>
  	</div>  	
  	
  	</AMR_ButtonToolbar>
  	 </form>
        <AMR_Table {...this.props}>  
          <thead> 
            <tr>
              <th>姓名</th>
              <th>昵称</th>
              <th>性别</th>
              <th>生日</th>
              <th>班级</th>
              <th>身份证</th>
            </tr> 
          </thead>
          <tbody>
            {this.props.events.map(function(event) {
              return (<Query_EventRow_byRight key={event.id} event={event} />);
            })}
          </tbody>
        </AMR_Table>
        </div>
      );
    }
  });
      
  /*  	
   * 学生列表在表单上绘制详细内容;
   * @点击后直接调用学生详情方法
   * 调用ajax_class_students_look_info
   * 进入前btn_students_list_click按钮事件内添加Queue.push保证回退正常;
   * */
  var Query_EventRow_byRight = React.createClass({ 
  	btn_students_list_click:function(uuid,nmae){
  		ajax_class_students_look_info_byRight(uuid,nmae)
  	},
  	  render: function() {
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';

  	    return (
  	      <tr className={className} >
  	        <td><a href="javascript:void(0);" onClick={this.btn_students_list_click.bind(this,event.uuid,event.name)}>{event.name}</a></td>
  	        <td>{event.nickname}</td>
  	        <td>{event.sex=="0"?"男":"女"}</td>
  	        <td>{event.birthday}</td>
  	        <td> {Store.getClassByUuid(event.classuuid).name}</td>
  	        <td>{event.idcard}</td>
  	      </tr> 
  	    );
  	  }
  	}); 




  /*学生列表中查看学生信息
   * Class_student_look_info@:此方法模板为单独查看每个学生详细信息但不能编辑；
   * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
   * 
   * */
  var Class_student_look_info_byRight =React.createClass({
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
  		 		<div>
  			    <AMUIReact.List static border striped>
  			      <AMUIReact.ListItem>头像:</AMUIReact.ListItem>
  				  <AMUIReact.Image  id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>
  				  <br/>
  			      <AMUIReact.ListItem icon="mobile">姓名:{o.name}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>昵称:{o.nickname}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>性别:{Vo.get("sex_"+o.sex)}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>生日:{o.birthday}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>妈妈姓名:{o.ma_name}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>妈妈电话:{o.ma_tel}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>妈妈的工作:{o.ma_work}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>爸爸姓名:{o.ba_name}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>爸爸的工作:{o.ba_work}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>爸爸电话:{o.ba_tel}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>家庭住址:{o.address}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>爷爷电话:{o.ye_tel}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>奶奶电话:{o.nai_tel}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>外公电话:{o.waigong_tel}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>外婆电话:{o.waipo_tel}</AMUIReact.ListItem>
  			      <AMUIReact.ListItem>其他电话:{o.other_tel}</AMUIReact.ListItem>			      
  			      <AMUIReact.ListItem>
  			      <div dangerouslySetInnerHTML={{__html:G_textToHTML("说明:"+o.note)}}></div>
  			      </AMUIReact.ListItem>			      
  			      
  			      </AMUIReact.List>
  		 	     </div> 
  		     );
  	        }
  		 });
  //±±±±±±±±±±±±±±±±±±±±±±±±±±±  
  
  
  
  
  /*
  图表加载
   * */
  var ECharts_Div_byRight = React.createClass({ 
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
    		<div>
    		 <form id="editEchartForm" method="post" className="am-form">
    		 <div>
	    		 <div className="am-u-lg-3 am-u-md-6">
	    		 <AMUIReact.Selected inline name="type"  onChange={this.handleChange} btnWidth="200"  multiple= {false} data={this.props.statistics_type_list} btnStyle="primary"  />          
	    		 
	    		 </div>
				<div className="am-u-lg-3 am-u-md-6">
							    		 
						 <AMUIReact.Selected inline name="groupuuid" onChange={this.handleChange} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" />          
	    		 </div>
				 <div className="am-u-lg-3 am-u-md-6">
					    		 
				 <AMUIReact.DateTimeInput  icon="calendar" format="YYYY-MM-DD" inline  name="begDateStr" id="begDateStr" dateTime={o.begDateStr}    onChange={this.handleChange}/>
	    		 </div>
				<div className="am-u-lg-3 am-u-md-6">
					 <AMUIReact.DateTimeInput  icon="calendar" format="YYYY-MM-DD" inline  name="endDateStr" id="endDateStr" dateTime={o.endDateStr}    onChange={this.handleChange}/>
	    		 
	    		 </div>
    		 
    		 </div>
    		 <div className="am-cf"></div>
    		 </form>
    		 
    		 <div id="main_ECharts" className="ECharts"></div>
  	    		</div>

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
  var Query_teachingjudge_list_byRight = React.createClass({
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
      <div>
  	  <hr/>	  
  	  <div className="am-form-group">
  		<form id="editGroupForm" method="post" className="am-form">
          <div className= "am-cf">
  	  <AMUIReact.Selected  id="selectgroup_uuid1" name="group_uuid" onChange={this.handleChange_group_Selected} btnWidth="200" data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />     
  	  <AMUIReact.Selected  id="selectgroup_uuid2" name="type" onChange={this.handleChange_type_Selected} btnWidth="200"  data={this.props.teachingjudge_typelist} btnStyle="primary" value={this.props.type} />
  	  </div>

  	  <div className="am-form-group am-margin-top-xs">
  	  	<div className="am-u-lg-3 am-u-sm-6">
  	  		<input type="text"  name="sutdent_name" id="sutdent_name"     placeholder="学生姓名"/>      
  			  <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD" inline name="begDateStr" id ="begDateStr" dateTime ={this.props.begDateStr}    onChange={this.handleChange}/>
  			  <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD" inline name="endDateStr" id="endDateStr" dateTime={this.props.endDateStr}    onChange={this.handleChange}/>
  			  <button type="button"  className= "am-u-sm-2"  onClick={this.btn_teachingjudge_click}  className="am-btn am-btn-primary">查询</button>	  				
  	  	</div>
     </div>
  	  </form>
  	
  	  
  	  </div>	  
        <AMR_Table {...this.props}>  
          <thead> 
            <tr>
              <th>老师姓名</th>
              <th>满意度</th>
              <th>评价详情</th>
              <th>评价人</th>
              <th>评价时间</th>
            </tr> 
          </thead>
          <tbody>
            {this.props.events.map(function(event) {
              return (<Query_teachingjudge_EventRow_byRight key={event.id} event={event} />);
            })}
          </tbody>
        </AMR_Table>
        </div>
      );
    }
  });
      
  /*  	
   * 评价老师在表单上绘制详细内容;
   * @点击后直接调用学生详情方法
   * 调用ajax_class_students_look_info
   * 进入前btn_students_list_click按钮事件内添加Queue.push保证回退正常;
   * */
  var Query_teachingjudge_EventRow_byRight = React.createClass({
  	  render: function() {
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';

  	    return (
  	      <tr className={className} >
  	        <td>{event.teacher_name}</td>
  	        <td>{Vo.get("KD_Teachingjudge_type_"+event.type)}</td>
  	        <td>{event.content}</td>
  	        <td>{event.create_user}</td>
  	        <td>{event.create_time}</td>
  	      </tr> 
  	    );
  	  }
  	}); 
  //±±±±±±±±±±±±±±±±±±±±±±±±±±±




  
  
  