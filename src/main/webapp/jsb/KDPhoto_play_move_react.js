var KDPhoto_play_move=function(obj){
	var module={
			queryForPayMove:function(obj){
				React.render(React.createElement(Query_photo_div,{				
					formdata:obj
					}), G_get_div_second());
			}				
		}
//----------------------------------------精品相册绘制界面---1层---------------------------
	
/*
 * 精品相册绘制
 * */
var Query_photo_div =  React.createClass({displayName: "Query_photo_div", 
	load_more_btn_id:"load_playMove_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-playMovePhoto-bd",
 getInitialState: function() {
		return this.props.formdata;
	 },	
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
	var re_data=ajax_playMove_phtotList(this.classnewsreply_list_div+this.pageNo,this,this.pageNo,callback);
	 this.setState(this.state);
	},
 refresh_data:function(){
//classnewsreply_list_div 清除；
//load_more_data	重新绘制DIV；		
 this.pageNo=1;
 $("#"+this.classnewsreply_list_div).html("");
 this.load_more_data();

 },
//制作相册;
 handleClick_PlayMove: function(obj) {
  queryPlayMove(obj)

},	
//查看所有精品相册
  All_group_class: function() {
	this.state.query_My_All_list=2;		
	this.refresh_data();		
  },
//查看我的精品相册	
  My_group_class: function() {
	this.state.query_My_All_list=1;		
	this.refresh_data();
  }, 
  
render: function() {
	this.load_more_btn_id="load_playMove_more_"+this.props.uuid;
//query_My_All_list:1显示查询所有，2显示查询我的;	
//btn_query_My_className:	显示-查询所有按钮；
//btn_query_All_className:	显示-查询我的班级；

	var photoClassName,btn_query_My_className,btn_query_All_className;
	var obj=this.state;

  	if(obj.query_My_All_list== 1){
  		btn_query_All_className="G_Edit_show";
  		btn_query_My_className="G_Edit_hide";
	   }else{
		btn_query_All_className="G_Edit_hide";
		btn_query_My_className="G_Edit_show";
	  }	

	if(obj.list.length==0){
		photoClassName="G_Edit_show";
	  }else{
		photoClassName="G_Edit_hide";
	 }
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
		  React.createElement(AMR_Panel, null, 
		   React.createElement(AMR_ButtonToolbar, null, 		    
    		 React.createElement(AMR_Button, {className: btn_query_All_className, amStyle: "secondary", onClick: this.All_group_class.bind(this)}, "查询所有精品相册"), 
    		 React.createElement(AMR_Button, {className: btn_query_My_className, amStyle: "secondary", onClick: this.My_group_class.bind(this)}, "查询我的精品相册"), 
    		 React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick_PlayMove.bind(this,obj)}, "制作精品相册")
    		)
		  ), 

	    
	    React.createElement("div", {className: photoClassName}, 
	       React.createElement("label", null, "这里空空如也，快去制作自己的精品相册吧")
		  ), 

		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-playMovePhoto-bd"}		   		    
		  ), 
		  
		  React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		  )
		  
		)
		  
			
  );
}
});

/*
 * 请求精品相册服务器数据
 * 
 * */
 var  ajax_playMove_phtotList=function(list_div,that,pageNo,callback) {
	 var Url_data;
	 if(that.state.query_My_All_list==1){
		 Url_data=hostUrl + "rest/kdMovie/queryMy.json";
	  }else{
		 Url_data=hostUrl + "rest/kdMovie/query.json";
	 }
	$.AMUI.progress.start();
	var url = Url_data;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		data:{pageNo:pageNo},
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
			    that.state.list=data.list.data;
				React.render(React.createElement(Query_photo_rect, {
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
};








/*
 * 根据相册请求数据绘制相册图片;
 * */
var Query_photo_rect = React.createClass({displayName: "Query_photo_rect",
 //数据初始化
 getInitialState: function() {
  return this.props.events; 
 },
//数据
 componentWillReceiveProps: function(nextProps) {	
	 this.setState(this.getStateByPropes(nextProps));
  },

	render: function() {	
	var bgobj,label_obj;
	var imgarry=this.state.data;


	    return (    		
		    React.createElement("div", {className: "am-comment-bd"}, 
		     React.createElement(Common_mg_Classnew_big_fn, {imgsList: imgarry})
		    )
	    );
	  }
	});

var  Common_mg_Classnew_big_fn  = React.createClass({displayName: "Common_mg_Classnew_big_fn",
	//红框框样式点击方法;
	div_onClick:function(){
		
		alert("这个逻辑还没写，直接跳到编辑界面")
//		var tr=$("#"+trid);
//		var divid="Common_mg_Class_big_fn_"+event.uuid;
//		
//		if(tr.attr("class").indexOf("G_ch_classNews_item_checked")>=0){ 
//			tr.removeClass("G_ch_classNews_item_checked");		
//			  $('#'+divid).remove();
//		}else{ 
//			tr.addClass("G_ch_classNews_item_checked");
//			 $("#abc").append("<div id='"+divid+"'>加载中...</div>");		 	
//		     React.render(React.createElement(KDClassNewsPhotoItem_Img_canDel, {
//						url: event.path,parentDivId:divid,trid:trid
//						}), document.getElementById(divid));  	
//		} 

	},
  render: function() {
	  var that=this
			  if (!this.props.imgsList){
				  return;
			  };  
			  
return (
   React.createElement("div", null, 
	React.createElement("ul", {className: "am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered"}, 
	   this.props.imgsList.map(function(event) {
    	var  o = event.herald;
    	var time_text = event.create_time;
    	var title= event.title;
    	if(!title)title="无";
	return (
			
		 React.createElement("li", {id: "Common_mg_ClassNew_big_fn_item_"+ event.uuid, className: "G_class_phtoto_Img  G_ch_classNews_item ", onClick: that.div_onClick.bind(this)}, 			     						    
		  React.createElement("div", {className: "am-gallery-item"}, 
		   React.createElement("img", {src: o}), 
	        React.createElement("label", null, "标题："+title+"【"+time_text+"】")
	       )
	      )		      
        	)
      })
    )
  )
			    )
          }
        }); 	













//----------------------------------------精品相册制作-----2层-------------------------

//精品相册新建与编辑入口
var queryPlayMove=function(obj,Mp3uuid){
	var Mp3_uuid,Mp3_Name;
	var Mp3Arry=query_Mp3();
	
	if(!Mp3Arry||Mp3Arry.length==0){
		Mp3_uuid=null;
		Mp3_Name="";
	}else{
		Mp3_uuid=Mp3Arry[0].path;
		Mp3_Name=Mp3Arry[0].title;
	}
	 KDPhoto_play_move.formdata=obj;
	 KDPhoto_play_move.Mp3Arry=G_selected_dataModelArray_byArray(Mp3Arry,"path","title");
	 KDPhoto_play_move.Mp3uuid=Mp3_uuid;
	 KDPhoto_play_move.Mp3Name=Mp3_Name;
	React.render(React.createElement(Img_photo_rect,{
		formdata:obj,
		Mp3Arry: KDPhoto_play_move.Mp3Arry,
		Mp3uuid:Mp3_uuid,
		Mp3Name:Mp3_Name,
		}), G_get_div_body());

}				



/*
 *新建编辑精品相册功能
 * */
var Img_photo_rect = React.createClass({displayName: "Img_photo_rect",
 getInitialState: function() {
			return KDPhoto_play_move;
	  },
	  
buttion_black_Click: function(o) {
	module.queryForPayMove(o)
},	
imgDivNum:0,
getNewImgDiv:function(){
	  this.imgDivNum++;
	return "Classnews_edit_"+this.imgDivNum;  
},	  
addShowImg:function(url,uuid,i){
	console.log("uuid",i);
	  var divid=this.getNewImgDiv();
	  $("#show_imgList").append("<div id='"+divid+"'>加载中...</div>");	
		this.state.div_list.push({parentDivId:divid})
		this.state.imgArry.push(url);
		this.setState(this.state);
	  React.render(React.createElement(KDphoto_Img_canDel, {
			url: url,parentDivId:divid,uuid:uuid
			}), document.getElementById(divid));  
},
upload_files_arr:[],
componentDidMount:function(){
	 var editor=$('#classnews_content').xheditor(xhEditor_classnews_emot);
	 this.editor=editor;
	// w_img_upload_nocut.bind_onchange("#file_img_upload",function(imgurl){
	 var that=this;		 
	 //已经有的图片,显示出来.		 
	  w_img_upload_nocut.bind_onchange("#file_img_upload",function(imgurl,uuid){
		 that.addShowImg(imgurl);
		
	  });		
	//已经有的图片,显示出来.
	 if(!$('#imgs').val())return;
	 var imgArr=$('#imgs').val().split(",");
	 for(var i=0;i<imgArr.length;i++){
		 this.addShowImg(imgArr[i]);
	 }		
},
bg_Class_fn:function(){
	var that=this;
	var callback=function(imgArr){	
		that.state.photo_uuids=stringArry(imgArr);
		 for(var i=0;i<imgArr.length;i++){
			 that.addShowImg(imgArr[i].src,imgArr[i].uuid,i);
		 }		
	}

		var groupuuid=Store.getGroupBymyclassList(this.state.formdata.classuuid);
	    KDClassNewPhotoItem.queryForSelect(groupuuid,this.state.formdata.classuuid,1,callback);

  },
handleChange:function(){
//	this.state.queryForm.label=val;
	this.setState(this.state);
	this.setState($('#KdPhotoForm').serializeJson());

},
buttion_LestGo: function() {
	 for(var i=0;i<this.state.div_list.length;i++){
		 $("#"+this.state.div_list[i].parentDivId).remove();
	 }			
this.state.div_list=[];	
this.state.btn_Letgo=false;
this.setState(this.props.formdata);
},	
//MP3切换方法;		
handleChange_selectMp3: function(val){	
	var List=[];
	var Mp3List=this.state.Mp3Arry;
	for(var i=0;i<Mp3List.length;i++){
        if(Mp3List[i].value==val){
        	this.state.Mp3Name=Mp3List[i].label
        }
       }
	this.state.Mp3uuid=val;
	this.setState(this.state);
},
//选择模板
buttion_fpmove: function(){	
	$.AMUI.progress.start();
	var url = hostUrl + "rest/fPMovieTemplate/query.json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Img_fPMovieTemplate_rect, {
					evens:data.list,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
				}), G_get_div_body());
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error :G_ajax_error_fn
	});
},

render: function() {	
	var o=this.state;
	var buttion_LestGo_className;
    var tenokate=(React.createElement("div", null))
	KDPhoto_play_move=this.state;
	
  	if(o.btn_Letgo==false){
  		buttion_LestGo_className="G_Edit_hide";
	   }else{
		buttion_LestGo_className="G_Edit_show";
	  }	
  	if(!o.tenokate){
  		tenokate=(React.createElement("div", null, React.createElement("label", null, "背景模板：未选择"), React.createElement("br", null)));
	   }else{
		tenokate=(React.createElement("div", null, 
 		 React.createElement("label", null, "背景模板："+o.tenokate.title), React.createElement("br", null), 
  		 React.createElement("img", {src: o.tenokate.herald})
		));
	  }	
  	console.log("测试1",this.state);
  	console.log("测试222",KDPhoto_play_move);
    return (
    		React.createElement("div", {id: "KdPhotoForm_list_div"}, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
    		
  	   React.createElement("div", {className: "am-g  am-u-md-6 am-u-sm-12"}, 
  		  
		    React.createElement(AMR_ButtonToolbar, null, 
    		 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
    		 React.createElement(AMUIReact.Selected, {id: "mp3uuid", name: "mp3uuid", onChange: this.handleChange_selectMp3, btnWidth: "200", data: o.Mp3Arry, btnStyle: "primary", value: o.Mp3uuid})		            
    		 ), 
      		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_fpmove.bind(this,o)}, "选择模板")
  		    ), 	


	      React.createElement("label", null, "标题："), React.createElement("br", null), 
		  React.createElement("form", {id: "KdPhotoForm", method: "post", className: "am-form"}, 
		  React.createElement("input", {type: "hidden", name: "photo_uuids", value: o.photo_uuids}), 
  		  React.createElement("input", {type: "hidden", name: "mp3", value: o.Mp3uuid}), 
		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxlength: "256"}), 		

		  
  		  React.createElement("label", null, "音乐Mp3："+o.Mp3Name), React.createElement("br", null), 
  		 tenokate
		  ), 
  		 
		
		    
	
		  React.createElement("br", null), 
	       React.createElement("label", null, "班级相册图片："), 
            React.createElement(AMR_ButtonToolbar, null, 
     		 React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.bg_Class_fn.bind(this)}, "浏览...")
     		), 
		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
		      React.createElement("div", {className: "cls"}), 
     		  
     		  
     		  
     	  React.createElement(AMR_ButtonToolbar, null, 	  
     		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_black_Click.bind(this,o)}, "保存并返回"), 
		    React.createElement(AMR_Button, {amSize: "xs", className: buttion_LestGo_className, amStyle: "secondary", onClick: this.buttion_LestGo.bind(this)}, "保存继续上传")
		  )
    		    
		    )
	   )    	

    );
  }
});

//绘制上传照片后预览照片XX等按钮绘制 
//var KDphoto_Img_canDel = React.createClass({
//	deleteImg:function(divid){
//		$("#"+divid).remove();
//	},			
//  render: function() {
//
//	 return (
//      		<div  className="G_cookplan_Img" >
// 	       			<img className="G_cookplan_Img_img"  src={this.props.url} alt="图片不存在" />
// 	       			<div className="G_cookplan_Img_close"  onClick={this.deleteImg.bind(this,this.props.parentDivId)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
// 	       		</div>		
//      	)
//  }
//});


var KDphoto_Img_canDel = React.createClass({displayName: "KDphoto_Img_canDel",
 //删除XX按钮方法
 deleteImg:function(divid){
	$("#"+divid).remove();
 },	
//封面点击选择方案 
 div_onClick:function(trid){
//	this.is_Checked=true;
//	objfPMovieTemplate=event;
var name="封面";
	showDiv(trid,name);
 },	
  render: function() {
var url=this.props.url;
var uuid=this.props.uuid;
	 return (
      		React.createElement("div", {id: "Common_fPMovieTemplate_"+uuid, title: uuid, onClick: this.div_onClick.bind(this,"Common_fPMovieTemplate_"+uuid), className: "G_cookplan_Img"}, 
 	       			React.createElement("img", {className: "G_cookplan_Img_img", src: url, alt: "图片不存在"}), 
 	       			React.createElement("div", {className: "G_cookplan_Img_close", onClick: this.deleteImg.bind(this,this.props.parentDivId)}, React.createElement("img", {src: hostUrlCDN+"i/close.png", border: "0"}))
 	       		)		
      	)
  }
});


//	div_onClick:function(trid,event){
//		this.is_Checked=true;
//		objfPMovieTemplate=event;
//		showDiv(trid);
//	},	
//	//确认模板按钮
//	buttion_black_Click:function(){
//		if(this.is_Checked==false){
//			 G_msg_pop("请选择一个模板");	
//			 return
//		}
//		KDPhoto_play_move.tenokate=objfPMovieTemplate;
//		React.render(React.createElement(Img_photo_rect), G_get_div_body());
//	},		
//		
//	  render: function() {
//		  var that=this
//				  if (!this.props.imgsList){
//					  return;
//				  };  
//		this.is_Checked=false;
//		var objfPMovieTemplate;		  
//	return (
//	   <div>
//		<AMR_Button amSize="xs"  amStyle="secondary" onClick={this.buttion_black_Click.bind(this)} >确认该模板</AMR_Button>
//
//		<ul  className="am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered">
//		   {this.props.imgsList.map(function(event) {
//	    	var  o = event.herald;
//	    	var title_text = event.title;
//	    	if(!title_text)title_text="无";
//	  
//		return (
//				<li id={"Common_fPMovieTemplate_fn_item_"+ event.key} className={"G_class_phtoto_Img  G_ch_classNews_item "}  title={event.key}  onClick={that.div_onClick.bind(this,"Common_fPMovieTemplate_fn_item_"+event.key,event)}>		     			
//
//
//
//
//







//------------------------------模板代码-3层----------------------------------
/*
 * 模板界面选择绘制;
 * */
var fPMovieTemplate_callback;
var Img_fPMovieTemplate_rect = React.createClass({displayName: "Img_fPMovieTemplate_rect",
 //数据初始化
 getInitialState: function() {
  return this.props.evens; 
 },
//数据
 componentWillReceiveProps: function(nextProps) {	
	 this.setState(this.getStateByPropes(nextProps));
  },
	render: function() {	
	var imgarry=this.state.data;
	
	
	    return (    		
		    React.createElement("div", {className: "am-comment-bd"}, 
		     React.createElement(Common_fPMovieTemplate_fn, {imgsList: imgarry})
		    )
	    );
	  }
	});

/*
 * 模板详情绘制
 * */		
var  Common_fPMovieTemplate_fn  = React.createClass({displayName: "Common_fPMovieTemplate_fn",
//点击框框样式点击方法;
div_onClick:function(trid,event){
	this.is_Checked=true;
	objfPMovieTemplate=event;
	var name="已选择该模板";
	showDiv(trid,name);
},	
//确认模板按钮
buttion_black_Click:function(){
	if(this.is_Checked==false){
		 G_msg_pop("请选择一个模板");	
		 return
	}
	KDPhoto_play_move.tenokate=objfPMovieTemplate;
	React.render(React.createElement(Img_photo_rect), G_get_div_body());
},		
	
  render: function() {
	  var that=this
			  if (!this.props.imgsList){
				  return;
			  };  
	this.is_Checked=false;
	var objfPMovieTemplate;		  
return (
   React.createElement("div", null, 
	React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_black_Click.bind(this)}, "确认该模板"), 

	React.createElement("ul", {className: "am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered"}, 
	   this.props.imgsList.map(function(event) {
    	var  o = event.herald;
    	var title_text = event.title;
    	if(!title_text)title_text="无";
  
	return (
			React.createElement("li", {id: "Common_fPMovieTemplate_fn_item_"+ event.key, className: "G_class_phtoto_Img  G_ch_classNews_item ", title: event.key, onClick: that.div_onClick.bind(this,"Common_fPMovieTemplate_fn_item_"+event.key,event)}, 		     			
		  React.createElement("div", {className: "am-gallery-item"}, 
			    React.createElement("img", {src: o}), 
			    React.createElement("label", null, "名字：【"+title_text+"】")
     	  )	

	     )	        		 
        	)
      })
    )
  )
			    )
          }
        }); 











//----------------------------------------抽离出来的公用方法------------------------------
//公用数据集合 
var KDPhoto_play_move={
		Mp3Arry:[],
		div_list:[],
		imgArry:[],
		Mp3Name:null,
		Mp3uuid:null,
		btn_Letgo:false,
		formdata:null,
		photo_uuids:null,
		title:null,
		tenokate:null
           }
//取mp3公用服务请求公用方法 
var	query_Mp3= function() {
 	 var Mp3Arry=[];
 	    //取出mp3
 		var url = hostUrl + "rest/mp3/query.json";
 		$.ajax({
 			type : "GET",
 			url : url,
 			dataType : "json",
 			async: false,
 			success : function(data) {
 				if (data.ResMsg.status == "success") {
 					Mp3Arry=data.list.data;
 				} else {
 					alert(data.ResMsg.message);
 					G_resMsg_filter(data.ResMsg);
 				}
 			},
 			error : G_ajax_error_fn
 		});		
 		return Mp3Arry
  };
  
  
//点击图片遮罩公用方法 
function showDiv(orgId,name){  
	var keyId="parent_showDiv";
	$("#"+keyId).remove();
	 var parentDiv=$('<div>'+name+'</div>');        //创建一个父DIV
	    parentDiv.attr('id',keyId);        //给父DIV设置ID
	    parentDiv.addClass('G_img_selected_mask');    //添加CSS样式
	    parentDiv.appendTo("#"+orgId);            //将父DIV添加到BODY中
	 
}  
//根据数组变成字符串公用方法
var	stringArry= function(imgArr) {
	var str;	
	for (var s = 0; s < imgArr.length; s++){
		   if(s ==0){
			   str = imgArr[s];  
		   }else{
			   str += "," + imgArr[s];  
		   }
		}
 		return str;
  };

	return module;	
}();