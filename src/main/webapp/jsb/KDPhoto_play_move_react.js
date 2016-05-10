var KDPhoto_play_move=function(obj){
	var module={
			queryForPayMove:function(obj){
				React.render(React.createElement(Query_photo_div,{				
					formdata:obj
					}), G_get_div_body());
			}				
		}
//----------------------------------------精品相册绘制界面---1层---------------------------
	
/* Phathat.refresh_data
 * 精品相册绘制
 * */
var Query_photo_div =  React.createClass({displayName: "Query_photo_div", 
	load_more_btn_id:"load_playMove_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-playMovePhoto-bd",
 getInitialState: function() {
		   
	 this.props.formdata.query_My_All_list=1;
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
     KDPhoto_play_move={
    			status:'0',//发布状态 默认发布
    			status_List:[{value: '0', label: '发布'},{value: '1', label: '不发布'}], //下拉选择
    		    uuid:"",    //区分新建与编辑 相册的UUID
				Mp3Arry:[],
				imgArry:[],
				Mp3Name:null,
				Mp3uuid:null,
				btn_Letgo:false,
				formdata:null,
				photo_uuids:null,
				title:null,
				tenokate:null
		           }
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
//切换到班级相册  
  phtot_class_Click: function() {
	  KDPhotoItem.query();
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
		     React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.phtot_class_Click.bind(this,obj)}, "班级相册")
  		    )
		   ), 
		   
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
					obj:that.state,
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
		     React.createElement(Common_mg_Classnew_big_fn, {imgsList: imgarry, obj: this.props.obj})
		    )
	    );
	  }
	});

var  Common_mg_Classnew_big_fn  = React.createClass({displayName: "Common_mg_Classnew_big_fn",	
	//红框框样式点击方法;
	div_onClick:function(event){

	 var create_useruuid,useruuid,Mp3_uuid,Mp3_Name; 
	 var Mp3Arry=query_Mp3();
	 var imgs=queryMoviePhoto_uuids(event.photo_uuids);	//根据uuid字符串服务器请求取得照片地址 数组 	
	     create_useruuid=event.create_useruuid;
	     useruuid=Store.getUserinfo().uuid;
	
  	
    if(create_useruuid==useruuid){ //创建人士自己可以编辑删除等
		if(!event.mp3){
			if(!Mp3Arry||Mp3Arry.length==0){
				Mp3_uuid=null;
				Mp3_Name="";
			}else{
				Mp3_uuid=Mp3Arry[0].path;
				Mp3_Name=Mp3Arry[0].title;
			}
			
		}else{
			for(var i=0;i<Mp3Arry.length;i++){
			  if(event.mp3==Mp3Arry[i].path){           //编辑模式下 图片
					Mp3_uuid=Mp3Arry[i].path;
					Mp3_Name=Mp3Arry[i].title;
			  }					
			}			
		}
		var tenokate_List=tenokate_fpmove().data;
		for(var i=0;i<tenokate_List.length;i++){
			  if(event.template_key==tenokate_List[i].key){           //编辑模式下模板;					
				  KDPhoto_play_move.tenokate=tenokate_List[i]
			  }					
			}	
	
		 KDPhoto_play_move.status=event.status+'';
		 KDPhoto_play_move.status_List=[{value: '0', label: '发布'},{value: '1', label: '不发布'}];
         KDPhoto_play_move.uuid=event.uuid;
		 KDPhoto_play_move.imgArry=imgs;
		 KDPhoto_play_move.herald=event.herald
		 KDPhoto_play_move.formdata=this.props.obj;
		 KDPhoto_play_move.Mp3Arry=G_selected_dataModelArray_byArray(Mp3Arry,"path","title");
		 KDPhoto_play_move.Mp3uuid=Mp3_uuid;
		 KDPhoto_play_move.Mp3Name=Mp3_Name;
		 KDPhoto_play_move.title=event.title;
		React.render(React.createElement(Img_photo_rect), G_get_div_body());
    	
    }else{ 
    	
    	//他人的只能查看
		if(!event.mp3){
			if(!Mp3Arry||Mp3Arry.length==0){
				Mp3_Name="";
			}else{
				Mp3_Name=Mp3Arry[0].title;
			}
			
		}else{
			for(var i=0;i<Mp3Arry.length;i++){
			  if(event.mp3==Mp3Arry[i].path){           //编辑模式下MP3
					Mp3_Name=Mp3Arry[i].title;
			  }					
			}			
		}
		var tenokate_List=tenokate_fpmove().data;
		for(var i=0;i<tenokate_List.length;i++){
			  if(event.template_key==tenokate_List[i].key){           //编辑模式下模板;					
				  KDPhoto_play_move.tenokate=tenokate_List[i]
			  }					
			}	
		 KDPhoto_play_move.imgArry=imgs;
		 KDPhoto_play_move.herald=event.herald
		 KDPhoto_play_move.formdata=this.props.obj;
		 KDPhoto_play_move.Mp3Name=Mp3_Name;
		 KDPhoto_play_move.title=event.title;
		React.render(React.createElement(Img_lookinfo_rect), G_get_div_body());
    	
    	
    }	

},
//分享按钮方法
fx_Photo_move: function(obj,val) {
	var formdata;
	var uuid=obj.uuid;

  	$.AMUI.progress.start();
      var url = hostUrl + "rest/kdMovie/get.json?uuid="+uuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
		if (data.ResMsg.status == "success") {
			if(val==0){
				formdata={classuuid:"",url:data.share_url,content:obj.title};

				React.render(React.createElement(Classnews_edit,{
					formdata:formdata,
					mycalsslist:G_selected_dataModelArray_byArray(Store.getMyClassList(),"uuid","name")
					}), G_get_div_body());
		}else{
			formdata={groupuuid:Store.getCurGroup().uuid,type:3,url:data.share_url,title:obj.title};
        	React.render(React.createElement(Announcements_goodedit,{
		  			formdata:formdata,
		  			group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
		  			}),G_get_div_body());
			 }

		} else {
			alert(data.ResMsg.message);
		}
	},
		rror :G_ajax_error_fn
	});	

},
//预览精品相册
Look_img_photo: function(obj) {
	var uuid=obj.uuid;
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/kdMovie/get.json?uuid="+uuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				
				var flag=G_CallPhoneFN.openNewWindowUrl(data.data.title,data.data.title,null,data.share_url);
				if(flag)return;
				
				 
				React.render(React.createElement(Photo_move_div,{				
					share_url:data.share_url
				}), G_get_div_second());
				} else {
					alert(data.ResMsg.message);
				}
			},
			rror :G_ajax_error_fn
		});	

},
  render: function() {
	  var that=this
	  var fx_photo_List=[{value:'0', label: '班级互动'},{value:'1', label: '精品文章'}]; //下拉选择
	  var useruuid=Store.getUserinfo().uuid;
			  if (!this.props.imgsList){
				  return;
			  };  
			  
return (
   React.createElement("div", null, 
	React.createElement("ul", {className: "am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered"}, 
	   this.props.imgsList.map(function(event) {
		var  btn_className,status_name;   
    	var  o = event.herald;
    	var time_text = event.create_time;
    	var title= event.title;
	    var create_useruuid=event.create_useruuid;
    	if(!title)title="无";
    	var editDiv=null;
    	if(create_useruuid==useruuid){

			btn_className="G_Edit_show";
		   }else{
		    btn_className="G_Edit_hide";
		  }	

    	if(event.status==0){
    		status_name="";
    	}else{
    		status_name="-【未发布】";
    		

    	}
	return (
			
		 React.createElement("li", {id: "Common_mg_ClassNew_big_fn_item_"+ event.uuid, className: "G_class_phtoto_Img  G_ch_classNews_item "}, 			     						    
		 React.createElement(AMR_ButtonToolbar, null, 
		 React.createElement(AMUIReact.Selected, {amSize: "xs", name: "uuid", placeholder: "分享", onChange: that.fx_Photo_move.bind(this,event), btnWidth: "100", btnStyle: "primary", data: fx_photo_List})
		    ), 
		 React.createElement("div", {className: "am-gallery-item"}, 
		  
		   
	     
	       
		  React.createElement("img", {src: o}), 
		   React.createElement("label", null, "相册名称："+title+"【"+time_text+"】"+status_name), 
		   
			  React.createElement("br", null), 



     	   
       React.createElement(AMR_ButtonToolbar, null, 
	    React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: that.Look_img_photo.bind(this,event)}, "预览"), 
	    React.createElement(AMR_Button, {amSize: "xs", className: btn_className, amStyle: "secondary", onClick: that.div_onClick.bind(this,event)}, "编辑")
	   
	    
	    )	   

     	   
		   )
	      )		      
        	)
      })
    )
  )
			    )
          }
        }); 	
















//----------------------------------------精品相册预览层层-------------------------

/*
 *精品相册预览层
 * */
var Photo_move_div = React.createClass({displayName: "Photo_move_div",
render: function() {	
    return (
       React.createElement("div", {id: "list_div"}, 
     
       React.createElement("iframe", {id: "t_iframe", onLoad: G_iFrameHeight.bind(this,'t_iframe'), frameborder: "0", scrolling: "auto", marginheight: "0", marginwidth: "0", width: "100%", height: "600px", src: this.props.share_url}), 
       React.createElement("p", null, "分享地址:"), 
       React.createElement("p", null, this.props.share_url)
       )    	

    );
  }
});





//----------------------------------------精品相册制作-----2层-------------------------

//精品相册新建与编辑入口
var queryPlayMove=function(obj){
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
	React.render(React.createElement(Img_photo_rect), G_get_div_body());

}				



/*     	    
 *新建与编辑精品相册功能
 * */
var Img_photo_rect = React.createClass({displayName: "Img_photo_rect",
 getInitialState: function() {

			return KDPhoto_play_move;
	  },
//保存返回	  
buttion_black_Click: function(o) {
	  var imgs="";
	  $(".G_cookplan_Img_img").each(function(){
		  imgs+=$(this).attr("id")+",";
		});	  
	  imgs=imgs.substring(0,imgs.length-1)
	  $('#photo_uuids').val(imgs);

	  var obj = $('#KdPhotoForm').serializeJson();
	  if(!obj.photo_uuids){
		  G_msg_pop("图片至少选择一张.");
		  return;
		  
	  }  
  
	var opt={
			 formName:"KdPhotoForm",
			 url:hostUrl + "rest/kdMovie/save.json",
			 cbFN:null
			 };
	$.AMUI.progress.start();
	  if(!opt.jsonString){
		  formObject = $('#'+opt.formName).serializeJson();
		  opt.jsonString=JSON.stringify(formObject);
	  }		 
	  var async=true;
	  if(opt.async===false){
		  async=opt.async;
	  }
	$.ajax({
		type : "POST",
		url : opt.url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		data:opt.jsonString,
		dataType : "json",
		contentType : false, 
		async:async,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Query_photo_div,{				
					formdata:o.formdata
				}), document.getElementById('div_body'));
				
			}else{
				 G_msg_pop(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});

	
	
//	G_ajax_shouc_save(opt);


},	
	  
addShowImg:function(url,uuid){
	var prx_divid="Img_photo_rect_";
	var that=this;
	var divid=prx_divid+uuid;  
	  $("#show_imgList").append("<div id='"+divid+"'>加载中...</div>");	

		this.setState(this.state);
	  React.render(React.createElement(KDphoto_Img_canDel, {
		  prx_divid:prx_divid,
			url: url,uuid:uuid,paThat:that,
			}), document.getElementById(divid));  
},
componentDidMount:function(){
	

	//已经有的图片,显示出来.
	var imgArry=KDPhoto_play_move.imgArry;
	 if(imgArry.length==0)return;
	 for(var i=0;i<imgArry.length;i++){
		 this.addShowImg(imgArry[i].path,imgArry[i].uuid);
	 }		

},
//选择照片绘制
bg_Class_fn:function(){
	var that=this;
	var callback=function(imgArry){	
		 $("#show_imgList").html("");
		var calback_uuids=[];
		var uuids;
		//根据回调取得选择的图骗数组并且抽出其中的UUID
		 for(var i=0;i<imgArry.length;i++){			 
			 calback_uuids.push(imgArry[i].uuid);//数组 UUID
		 }		
		 uuids=stringArry(calback_uuids);	//将UUID数组转成字符串;	 
		 var imgs=queryMoviePhoto_uuids(uuids);	//根据uuid字符串服务器请求取得照片地址 数组 	 
		 for(var i=0;i<imgs.length;i++){
			 that.addShowImg(imgs[i].path,imgs[i].uuid);
		   }		   
	}
	
	
//记录已选择的
	var img_arry=KDPhoto_play_move.imgArry;
	for(var i=0;i<img_arry.length;i++){
		G_photo_urlsSelectArry.push(img_arry[i].uuid);
	}
		var groupuuid=Store.getGroupBymyclassList(this.state.formdata.classuuid);
		 $("#show_imgList").html("");	
	    KDClassNewPhotoItem.queryForSelect(groupuuid,this.state.formdata.classuuid,1,callback);

  },
handleChange:function(){
//	this.state.queryForm.label=val;
	this.setState(this.state);
	this.setState($('#KdPhotoForm').serializeJson());

},	
//MP3切换方法;		
handleChange_selectMp3: function(val){	
	this.state.Mp3uuid=val;
	this.setState(this.state);
},

//查看根据状态的精品相册
Look_status: function(val) {	
	this.state.status=val;
	this.setState(this.state);		
},  
//删除相册
buttion_delete:function(obj){
	if(!confirm("确定要删除该相册吗?")){
		return;
	}
	var uuid=obj.uuid;
  	$.AMUI.progress.start();
      var url = hostUrl + "rest/kdMovie/delete.json?uuid="+uuid;
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Query_photo_div,{				
					formdata:obj.formdata
				}), document.getElementById('div_body'));
				} else {
					alert(data.ResMsg.message);
				}
			},
			rror :G_ajax_error_fn
		});

},
//返回按钮
buttion_black:function(obj){
	React.render(React.createElement(Query_photo_div,{				
		formdata:obj.formdata
	}), document.getElementById('div_body'));
},
//选择模板
buttion_fpmove: function(){		
	var tenokate_List=tenokate_fpmove();
	
	React.render(React.createElement(Img_fPMovieTemplate_rect, {
		evens:tenokate_List
	}), G_get_div_body());
},

render: function() {	
	var o=this.state;
	var delete_className;
    var tenokate=(React.createElement("div", null))
	KDPhoto_play_move=this.state;
  	if(!o.uuid){
  		delete_className="G_Edit_hide";
	   }else{
		delete_className="G_Edit_show";
	  }	
  	if(!o.tenokate){
  		tenokate="选择模板";
	   }else{
		tenokate=o.tenokate.title;
	  }	

  	if(!o.herald)o.herald="";
  	if(!o.tenokate)o.tenokate="";
  	if(!o.Mp3uuid)o.Mp3uuid="";
  	if(!o.photo_uuids)o.photo_uuids="";
  	

    return (
    		React.createElement("div", {id: "KdPhotoForm_list_div"}, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
    		
  	   React.createElement("div", {className: "am-g  am-u-md-6 am-u-sm-12"}, 
  		  
		    React.createElement(AMR_ButtonToolbar, null, 
      	     React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_black.bind(this,o)}, "返回相册墙"), 
      		 React.createElement(AMR_Button, {className: delete_className, amSize: "xs", amStyle: "secondary", onClick: this.buttion_delete.bind(this,o)}, "删除该相册")
      		), 	


	      React.createElement("label", null, "相册名称："), React.createElement("br", null), 
		  React.createElement("form", {id: "KdPhotoForm", method: "post", className: "am-form"}, 
		  React.createElement("input", {type: "hidden", name: "photo_count", value: o.imgArry.length}), 
		  React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		  React.createElement("input", {type: "hidden", name: "herald", value: o.herald}), 
		  React.createElement("input", {type: "hidden", name: "template_key", value: o.tenokate.key}), 
		  React.createElement("input", {type: "hidden", name: "photo_uuids", id: "photo_uuids", value: o.photo_uuids}), 
		  React.createElement("input", {type: "hidden", name: "mp3", value: o.Mp3uuid}), 
		  React.createElement("input", {type: "hidden", name: "status", value: o.status}), 
		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxlength: "256"}), 		


		      
		  
		React.createElement("br", null), 		 
        React.createElement(AMR_ButtonToolbar, null, 
        
         React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
		  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.bg_Class_fn.bind(this)}, "选择图片")
		 ), 
		 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
		  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_fpmove.bind(this,o)}, tenokate)
		 ), 
		 React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
		  React.createElement(AMUIReact.Selected, {id: "mp3uuid", name: "mp3uuid", onChange: this.handleChange_selectMp3, btnWidth: "200", data: o.Mp3Arry, btnStyle: "primary", value: o.Mp3uuid})		            
		 ), 
  	     React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
      	 React.createElement(AMUIReact.Selected, {btnStyle: "secondary", id: "status", name: "status", onChange: this.Look_status.bind(this), btnWidth: "200", value: o.status, data: o.status_List})
 	     )
		)
  
	), 
  		 
		  React.createElement("br", null), 
		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
		      React.createElement("div", {className: "cls"}), 
     		  
		  React.createElement("br", null), 
     	  React.createElement(AMR_ButtonToolbar, null, 	
     	   React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_black_Click.bind(this,o)}, "保存并返回")
		  )
    		    
		    )
	   )    	

    );
  }
});





//老板有各展示力度的 编辑界面 代码
//var Img_photo_rect = React.createClass({
// getInitialState: function() {
//
//			return KDPhoto_play_move;
//	  },
////保存返回	  
//buttion_black_Click: function(o) {
//	  var imgs="";
//	  $(".G_cookplan_Img_img").each(function(){
//		  imgs+=$(this).attr("id")+",";
//		});	  
//	  imgs=imgs.substring(0,imgs.length-1)
//	  $('#photo_uuids').val(imgs);
//
//	  var obj = $('#KdPhotoForm').serializeJson();
//	  if(!obj.photo_uuids){
//		  G_msg_pop("图片或内容至少填写一项.");
//		  return;
//		  
//	  }  
//  
//	var opt={
//			 formName:"KdPhotoForm",
//			 url:hostUrl + "rest/kdMovie/save.json",
//			 cbFN:null
//			 };
//	G_ajax_shouc_save(opt);
//
//	React.render(React.createElement(Query_photo_div,{				
//		formdata:o.formdata
//	}), document.getElementById('div_body'));
//},	
//	  
//addShowImg:function(url,uuid){
//	var prx_divid="Img_photo_rect_";
//	var that=this;
//	var divid=prx_divid+uuid;  
//	  $("#show_imgList").append("<div id='"+divid+"'>加载中...</div>");	
//
//		this.setState(this.state);
//	  React.render(React.createElement(KDphoto_Img_canDel, {
//		  prx_divid:prx_divid,
//			url: url,uuid:uuid,paThat:that,
//			}), document.getElementById(divid));  
//},
//componentDidMount:function(){	
//	//已经有的图片,显示出来.
//	var imgArry=KDPhoto_play_move.imgArry;
//	 if(imgArry.length==0)return;
//	 for(var i=0;i<imgArry.length;i++){
//		 this.addShowImg(imgArry[i].path,imgArry[i].uuid);
//	 }		
//
//},
////选择照片绘制
//bg_Class_fn:function(){
//	var that=this;
//	var callback=function(imgArry){	
//		 $("#show_imgList").html("");
//		var calback_uuids=[];
//		var uuids;
//		//根据回调取得选择的图骗数组并且抽出其中的UUID
//		 for(var i=0;i<imgArry.length;i++){			 
//			 calback_uuids.push(imgArry[i].uuid);//数组 UUID
//		 }		
//		 uuids=stringArry(calback_uuids);	//将UUID数组转成字符串;	 
//		 var imgs=queryMoviePhoto_uuids(uuids);	//根据uuid字符串服务器请求取得照片地址 数组 	 
//		 for(var i=0;i<imgs.length;i++){
//			 that.addShowImg(imgs[i].path,imgs[i].uuid);
//		   }		   
//	}
//	
//	
////记录已选择的
//	var img_arry=KDPhoto_play_move.imgArry;
//	for(var i=0;i<img_arry.length;i++){
//		G_photo_urlsSelectArry.push(img_arry[i].uuid);
//	}
//		var groupuuid=Store.getGroupBymyclassList(this.state.formdata.classuuid);
//		 $("#show_imgList").html("");	
//	    KDClassNewPhotoItem.queryForSelect(groupuuid,this.state.formdata.classuuid,1,callback);
//
//  },
//handleChange:function(){
////	this.state.queryForm.label=val;
//	this.setState(this.state);
//	this.setState($('#KdPhotoForm').serializeJson());
//
//},
////MP3切换方法;		
//handleChange_selectMp3: function(val){	
//	var List=[];
//	var Mp3List=this.state.Mp3Arry;
//	for(var i=0;i<Mp3List.length;i++){
//        if(Mp3List[i].value==val){
//        	this.state.Mp3Name=Mp3List[i].label
//        }
//       }
//	this.state.Mp3uuid=val;
//	this.setState(this.state);
//},
////删除相册
//buttion_delete:function(obj){
//	if(!confirm("确定要删除该相册吗?")){
//		return;
//	}
//	var uuid=obj.uuid;
//  	$.AMUI.progress.start();
//      var url = hostUrl + "rest/kdMovie/delete.json?uuid="+uuid;
//	$.ajax({
//		type : "POST",
//		url : url,
//		dataType : "json",
//		 async: true,
//		success : function(data) {
//			$.AMUI.progress.done();
//			// 登陆成功直接进入主页
//			if (data.ResMsg.status == "success") {
//				React.render(React.createElement(Query_photo_div,{				
//					formdata:obj.formdata
//				}), document.getElementById('div_body'));
//				} else {
//					alert(data.ResMsg.message);
//				}
//			},
//			rror :G_ajax_error_fn
//		});
//
//},
////返回按钮
//buttion_black:function(obj){
//	React.render(React.createElement(Query_photo_div,{				
//		formdata:obj.formdata
//	}), document.getElementById('div_body'));
//},
////选择模板
//buttion_fpmove: function(){		
//	var tenokate_List=tenokate_fpmove();
//	
//	React.render(React.createElement(Img_fPMovieTemplate_rect, {
//		evens:tenokate_List
//	}), G_get_div_body());
//},
//
//render: function() {	
//	var o=this.state;
//	var delete_className;
//    var tenokate=(<div></div>)
//	KDPhoto_play_move=this.state;
//  	if(!o.uuid){
//  		delete_className="G_Edit_hide";
//	   }else{
//		delete_className="G_Edit_show";
//	  }	
//  	if(!o.tenokate){
//  		tenokate=(<div><label>背景模板：未选择</label><br/></div>);
//	   }else{
//		tenokate=(<div>
// 		 <label>{"背景模板："+o.tenokate.title}</label><br/>
//  		 <img src={o.tenokate.herald} />
//		</div>);
//	  }	
//
//  	if(!o.herald)o.herald="";
//  	if(!o.tenokate)o.tenokate="";
//  	if(!o.Mp3uuid)o.Mp3uuid="";
//  	if(!o.photo_uuids)o.photo_uuids="";
//    return (
//    		<div id="KdPhotoForm_list_div">
//    		<div className="header">
//    		  <hr />
//    		</div>   
//    		
//  	   <div className="am-g  am-u-md-6 am-u-sm-12">
//  		  
//		    <AMR_ButtonToolbar>
//
//      		<AMR_Button className={delete_className} amSize="xs"  amStyle="secondary" onClick={this.buttion_delete.bind(this,o)} >删除该相册</AMR_Button>
//      	    <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.buttion_black.bind(this,o)} >返回相册墙</AMR_Button>
//
//      		</AMR_ButtonToolbar>	
//
//
//	      <label>相册名称：</label><br/> 
//		  <form id="KdPhotoForm" method="post" className="am-form">
//		  <input type="hidden" name="photo_count"  value={o.imgArry.length}/>
//		  <input type="hidden" name="uuid"  value={o.uuid}/>
//		  <input type="hidden" name="herald"  value={o.herald}/>
//		  <input type="hidden" name="template_key"  value={o.tenokate.key}/>
//		  <input type="hidden" name="photo_uuids" id="photo_uuids"  value={o.photo_uuids}/>
//		  <input type="hidden" name="mp3"  value={o.Mp3uuid}/>
//		  <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} maxlength="256" />		
//
//
//		      
//		  
//		 <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
//		 <AMUIReact.Selected id="mp3uuid" name="mp3uuid" onChange={this.handleChange_selectMp3} btnWidth="200"  data={o.Mp3Arry} btnStyle="primary" value={o.Mp3uuid} />    		            
//		 </div>   
//	    		 
//	    	<br/>  		 
//  		  <label>{"音乐Mp3："+o.Mp3Name}</label><br/>
//    		<AMR_Button amSize="xs"  amStyle="secondary" onClick={this.buttion_fpmove.bind(this,o)} >选择模板</AMR_Button>
//  		 {tenokate}
//		  </form>
//  		 
//		  <br/>
//	       <label>班级相册图片：</label>
//         <AMR_ButtonToolbar>
//  		   <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.bg_Class_fn.bind(this)} >浏览...</AMR_Button>
//  	 	  </AMR_ButtonToolbar>
//		      <div id="show_imgList"></div><br/>
//		      <div className="cls"></div>
//     		  
//		  <br/>  
//     	  <AMR_ButtonToolbar>	
//     	   <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.buttion_black_Click.bind(this,o)} >保存并返回</AMR_Button>
//		  </AMR_ButtonToolbar>
//    		    
//		    </div>
//	   </div>    	
//
//    );
//  }
//});


























///*
// *查看他人精品相册功能
// * */
//var Img_lookinfo_rect = React.createClass({
// getInitialState: function() {
//		return KDPhoto_play_move;
//	  },
//
//	  
//addShowImg:function(url,uuid){
//	var prx_divid="Img_photo_rect_";
//	var that=this;
//	var divid=prx_divid+uuid;  
//	  $("#show_imgList").append("<div id='"+divid+"'>加载中...</div>");	
//
//		this.setState(this.state);
//	  React.render(React.createElement(KDLookinFo_Img_canDel, {
//		  prx_divid:prx_divid,
//			url: url,uuid:uuid,paThat:that,
//			}), document.getElementById(divid));  
//},
//componentDidMount:function(){
//	
//
//	//已经有的图片,显示出来.
//	var imgArry=KDPhoto_play_move.imgArry;
//	 if(imgArry.length==0)return;
//	 for(var i=0;i<imgArry.length;i++){
//		 this.addShowImg(imgArry[i].path,imgArry[i].uuid);
//	 }		
//
//},
////返回按钮
//buttion_black:function(obj){
//	React.render(React.createElement(Query_photo_div,{				
//		formdata:obj.formdata
//	}), document.getElementById('div_body'));
//},
//render: function() {	
//	var o=this.state;
//    var tenokate=(<div></div>)
//	KDPhoto_play_move=this.state;
//  	if(!o.tenokate){
//  		tenokate=(<div><label>背景模板：未选择</label><br/></div>);
//	   }else{
//		tenokate=(<div>
// 		 <label>{"背景模板："+o.tenokate.title}</label><br/>
//  		 <img src={o.tenokate.herald} />
//		</div>);
//	  }	
//
//    return (
//    		<div id="KdPhotoForm_list_div">
//    		<div className="header">
//    		  <hr />
//    		</div>   
//    		
//  	   <div className="am-g  am-u-md-6 am-u-sm-12">
//	      <label>{"相册名称："+o.title}</label><br/> 	  
//  		  <label>{"音乐Mp3："+o.Mp3Name}</label><br/>
//  		 {tenokate}
//
//		  <br/>
//	       <label>班级相册图片：</label>
//		      <div id="show_imgList"></div><br/>
//		      <div className="cls"></div>
//     		  
//     		  
//     		  
//     	  <AMR_ButtonToolbar>	
//     	    <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.buttion_black.bind(this,o)} >返回相册墙</AMR_Button>
//		  </AMR_ButtonToolbar>
//    		    
//		    </div>
//	   </div>    	
//
//    );
//  }
//});
//
//
////查看模式图片绘制
//var KDLookinFo_Img_canDel = React.createClass({
// componentDidMount:function(){
//	 if(KDPhoto_play_move.herald==this.props.url){
//			var name="封面";
//			showDiv("Look_fPMovieTemplate_"+this.props.uuid,name);
//		 }	
//}, 
//  render: function() {
//var url=this.props.url;
//var uuid=this.props.uuid;
//
//	 return (
//      		<div id={"Look_fPMovieTemplate_"+uuid}   className="G_cookplan_Img" >
// 	       			<img  id ={uuid} className="G_cookplan_Img_img"  src={url} alt="图片不存在" />
//	       		</div>		
//      	)
//  }
//});














//绘制上传照片后预览照片XX等按钮绘制 
var KDphoto_Img_canDel = React.createClass({displayName: "KDphoto_Img_canDel",
 //删除XX按钮方法
 deleteImg:function(){
 var url=this.props.url;
 var uuid=this.props.uuid;
 var new_imgArry=[];

 var prx_divid=this.props.prx_divid;
 $("#"+prx_divid+uuid).remove();
var arr=KDPhoto_play_move.imgArry;

 for(var i=0;i<arr.length;i++){
	if(uuid!= arr[i].uuid){
		new_imgArry.push(arr[i]);		
	}	 
 }
 KDPhoto_play_move.imgArry=new_imgArry;
 },	
//封面点击选择方案 
 div_onClick:function(trid){
var that=this.props.paThat;
var name="封面";
	showDiv(trid,name);
	KDPhoto_play_move.herald=this.props.url;
	that.setState(that.state);
 },	
 componentDidMount:function(){
	 //默认选择第一张为封面
	if(!KDPhoto_play_move.herald){
		if(KDPhoto_play_move.imgArry.length==0)return;
		var name="封面";
		var url=KDPhoto_play_move.imgArry[0].path;
		var uuid=KDPhoto_play_move.imgArry[0].uuid;
		
		KDPhoto_play_move.herald=url;		
		showDiv("Common_fPMovieTemplate_"+uuid,name);		
	}else{
		
		 if(KDPhoto_play_move.herald==this.props.url){
				var name="封面";
				showDiv("Common_fPMovieTemplate_"+this.props.uuid,name);
			 }	
		
	}	

}, 
  render: function() {
var url=this.props.url;
var uuid=this.props.uuid;

	 return (
      		React.createElement("div", {id: "Common_fPMovieTemplate_"+uuid, onClick: this.div_onClick.bind(this,"Common_fPMovieTemplate_"+uuid), className: "G_cookplan_Img"}, 
 	       			React.createElement("img", {id: uuid, className: "G_cookplan_Img_img", src: url, alt: "图片不存在"}), 
 	       			React.createElement("div", {className: "G_cookplan_Img_close", onClick: this.deleteImg.bind(this)}, React.createElement("img", {src: hostUrlCDN+"i/close.png", border: "0"}))
 	       		)		
      	)
  }
});







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
	React.render(React.createElement(Img_photo_rect), G_get_div_body()) 
},		
componentDidMount:function(){
	var imgsList=this.props.imgsList;
 for(var i=0;i<imgsList.length;i++){
	 if(KDPhoto_play_move.tenokate.key==imgsList[i].key){
			this.is_Checked=true;
			objfPMovieTemplate=imgsList[i];
			var name="已选择该模板";
			showDiv("Common_fPMovieTemplate_fn_item_"+objfPMovieTemplate.key,name);
	 }	 
 }
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
		status:'0',//发布状态 默认发布
		status_List:[{value:'0', label: '发布'},{value:'1', label: '不发布'}], //下拉选择
		uuid:"",    //区分新建与编辑 相册的UUID
		Mp3Arry:[],
		imgArry:[],
		Mp3Name:null,
		Mp3uuid:null,
		btn_Letgo:false,
		formdata:null,
		herald:null,
		photo_uuids:null, //照片UUID
		title:null,      //相册名称
		//uuids:null,
		tenokate:null    //模板
           }
//根据uuid取出图标地址服务请求公用方法 
var	queryMoviePhoto_uuids= function(photo_uuids) {

 	    //取出mp3
 		var url = hostUrl + "rest/kDPhotoItem/queryForMoviePhoto_uuids.json";
 		$.ajax({
 			type : "GET",
 			url : url,
 			dataType : "json",
 			data:{photo_uuids:photo_uuids},
 			async: false,
 			success : function(data) {
 				if (data.ResMsg.status == "success") {
 					MoveArry=data.list.data;
 					KDPhoto_play_move.imgArry=MoveArry;

 				} else {
 					alert(data.ResMsg.message);
 					G_resMsg_filter(data.ResMsg);
 				}
 			},
 			error : G_ajax_error_fn
 		});		
 		return KDPhoto_play_move.imgArry
  };

  
  
//取出所有模板公用方法
var tenokate_fpmove= function(){	
	var tenokate_List=[];
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
  				tenokate_List=data.list;
  			} else {
  				alert(data.ResMsg.message);
  				G_resMsg_filter(data.ResMsg);
  			}
  		},
  		error :G_ajax_error_fn
  	});
  	return tenokate_List
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