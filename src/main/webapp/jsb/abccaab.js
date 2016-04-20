var KDPhotoItem=function(groupuuid,classuuid,pageNo ){
	var module={
			callback:null,
			ajax_uploadByphone(base64){
				fpPhotoUploadTask.ajax_uploadByphone(base64);
			},
			//闭包方法入口
			query:function(groupuuid,classuuid,pageNo){
				var classuuid,group_uuid,label;
				if(!label)label="";
				if(!pageNo)pageNo=1;
				
				
				var group_List=Store.getGroup();
				if(!G_photo_groupuuid){
					group_uuid=group_List[0].uuid;
				}else{
					group_uuid=G_photo_groupuuid;//本地记录学校UUID
				}


				var classArry=Store.getMyByClassList(group_uuid);				
				if(!G_photo_classuuid){
					if(!classArry||classArry.length==0){
						classuuid=null;
					}else{
						classuuid=classArry[0].uuid;
					}
				}else{
					classuuid=G_photo_classuuid;//本地记录班级UUID
				} 

				React.render(React.createElement(Query_photo_div,{
					groupuuid:group_uuid,
					label:label,
					group_List:G_selected_dataModelArray_byArray(group_List,"uuid","brand_name"),
					classList:G_selected_dataModelArray_byArray(classArry,"uuid","name"),
					classuuid:classuuid
					}), G_get_div_body());

			}				
		}


	
	
	
	
			
/*
 * 学生列表服务器请求后绘制处理方法；
 * @</select>下拉多选框;
 * @handleChange_stutent_Selected:学校查询；
 * @handleChange_class_Selected::班级查询；
 * @btn_query_click:名字查找；
 * */
var G_queryLabel_List=[];
var Query_photo_div =  React.createClass({displayName: "Query_photo_div", 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
 //数据初始化
 getInitialState: function() {
	var labelArry=this.query_Label();
	var queryForm={
			groupuuid:this.props.groupuuid,	
			label:this.props.label,
			classuuid:this.props.classuuid
	};
	 var obj= {
		query_My_All_list:1,	 
		groupList:this.props.group_List,	 
	    classList:this.props.classList,	 
		queryForm:queryForm,
		label_list:labelArry,
		pageNo:1,
		show_list:[],
		list: []
	};
	return obj;
 },
//取标签公用服务请求
 query_Label: function(groupuuid,classuuid) {
	 var group_uuid,class_uuid;
	 var labelArry=[];
	 if(!groupuuid){
		 group_uuid=this.props.groupuuid;
	 }else{
		 group_uuid=this.state.queryForm.groupuuid;
	 }
	 if(!classuuid){
		 class_uuid=this.props.classuuid;
	 }else{
		 class_uuid=this.state.queryForm.classuuid;
	 }	
	    //取出标签
		var url = hostUrl + "rest/kDPhotoItem/queryLabel.json";
		$.ajax({
			type : "GET",
			url : url,
			data : {group_uuid:group_uuid,class_uuid:class_uuid},
			dataType : "json",
			async: false,
			success : function(data) {
				if (data.ResMsg.status == "success") {
					labelArry=data.list;
					labelArry.push({value:"",label:'所有'});
					G_queryLabel_List = labelArry.slice(0, -1)
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			},
			error : G_ajax_error_fn
		});		
		return labelArry
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
	var re_data=ajax_list(this.classnewsreply_list_div+this.pageNo,this.state.queryForm,this.pageNo,this,callback);
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
//上传照片方法		
  handleClick: function(obj) {
		React.render(React.createElement(Img_photo_rect,{
			formdata:obj
			}), G_get_div_body());
  },
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
	var obj=this.state;
  return (			
		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 

		   React.createElement(AMR_ButtonToolbar, null, 
    		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,obj)}, "上传照片")
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

 var  ajax_list=function(list_div,queryForm,pageNo,that,callback) {
	 queryForm.pageNo=pageNo;
	if(queryForm.label=="所有"){
		queryForm.label="";
	}
	$.AMUI.progress.start();
	var url = hostUrl + "rest/kDPhotoItem/queryMy.json";
	$.ajax({
		type : "GET",
		url : url,
  		data : queryForm,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Query_photo_rect, {
					events: data.list,
					Propsthat:that,
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





var Query_photo_rect = React.createClass({displayName: "Query_photo_rect",
	 //数据初始化
	 getInitialState: function() {
	  return this.props.events; 
	 },
	//数据
	 componentWillReceiveProps: function(nextProps) {	
		 this.setState(this.getStateByPropes(nextProps));
	  },
	//数据
	 componentDidMount:function(){	  
	     $('.am-gallery').pureview();
	  },
	  
//	//请求服务器数据后刷新舞台回调方法;  
//	 ajax_callback:function(list){
//		 var labelArry=this.query_Label(this.state.queryForm.groupuuid,this.state.queryForm.classuuid);
//		 this.state.label_list=labelArry;
//	  if (list== null ) this.state.list=[];
//	   else
//		  this.state.list=list.data;
//		  this.state.pageSize=list.pageSize;
//	  if(this.state.pageNo=="1")this.state.totalCount=list.totalCount;
//		  this.setState(this.state);
//	  },  
	render: function() {	
		console.log("测试一下舞台",this.state);
	//query_My_All_list:1显示查询所有，2显示查询我的班级;	
		var edit_btn_className,selectbtn_btn_className,bgobj,label_obj;
		var Penthat=this;
		var queryForm=this.state.queryForm;
		var obj=this.state;
		var imgarry=this.state.data;
		var imgphotoList=[];
		var arry_label=[];

		


		//imgphotoList绘制图片方法在用
		for(var i=0;i<imgarry.length;i++){
			 bgobj={path:null,uuid:null,label:null};
			 bgobj.path=imgarry[i].path;
			 bgobj.uuid=imgarry[i].uuid;
			 bgobj.label=imgarry[i].label;
			 imgphotoList.push(bgobj);
		    }
		var number=G_get_pageSize_number(this.state.pageSize,this.state.totalCount);

	    return (    		

			    React.createElement("div", {className: "am-comment-bd"}, 
			     React.createElement(Common_mg_Class_big_fn, {imgsList: imgphotoList, Penthat: this.props.Propsthat, state: this.state})
			    )
	    );
	  }
	});

/*
 * 对单张图片的处理方法;
 * */		
var  Common_mg_Class_big_fn  = React.createClass({displayName: "Common_mg_Class_big_fn",
 handleClick: function(Obj,KDitemthis) {

		if(!confirm("确定要删除吗?")){
			return;
		}
		var uuid=Obj.uuid;
	  	$.AMUI.progress.start();
	      var url = hostUrl + "rest/kDPhotoItem/delete.json?uuid="+uuid;
		$.ajax({
			type : "POST",
			url : url,
			dataType : "json",
			 async: true,
			success : function(data) {
				$.AMUI.progress.done();
				// 登陆成功直接进入主页
				if (data.ResMsg.status == "success") {
					//因隐藏图片会导致翻页数据库错乱所以此处用刷新法
					 KDitemthis.refresh_data();
					} else {
						alert(data.ResMsg.message);
					}
				},
				rror :G_ajax_error_fn
			});
  },		
  render: function() {
	  var that=this
	  var KDitemthis=this.props.Penthat;
	  var edit_btn_className;
			  if (!this.props.imgsList){
				  return;
			  };  
return (
   React.createElement("div", null, 
	React.createElement("ul", {className: "am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered"}, 
	   this.props.imgsList.map(function(event) {
    	var  o = event.path;
    	var label_text = event.label;
    	if(!label_text)label_text="无";
		var  imgArr=o?o.split("@"):"";
	return (
		 React.createElement("li", {id: "Common_mg_Class_big_fn_item_"+ event.uuid, className: "G_class_phtoto_Img"}, 			     			
		  React.createElement("div", {className: "am-gallery-item"}, 
			   React.createElement("a", {href: imgArr[0], title: ""}, 
			    React.createElement("img", {src: o, alt: "", "data-rel": imgArr[0]})
			    ), 
			    React.createElement("label", null, "标签：【"+label_text+"】")
     	  ), 	
		
      React.createElement("div", {className: "G_class_phtoto_Img_close"}, 
       React.createElement(AMR_Button, {onClick: that.handleClick.bind(this,event,KDitemthis)}, "X")
      )
	     )	        		 
        	)
      })
    )
  )
			    )
          }
        }); 



























	return module;	
}();