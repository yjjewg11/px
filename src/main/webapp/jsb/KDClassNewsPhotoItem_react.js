var KDClassNewPhotoItem=function(groupuuid,classuuid,pageNo){
	var module={
			callback:null,
			queryForSelect:function(groupuuid,classuuid,pageNo,callback){
				var classuuid;
				var group_uuid;
				var label;
				module.callback=callback;
				var group_List=Store.getGroup();
					if(!groupuuid){
						group_uuid=group_List[0].uuid;
					}else{
						group_uuid=groupuuid;
					  }
					
				var classArry=Store.getChooseClass(group_uuid);
				if(!label)label="";
				if(!pageNo)pageNo=1;
				if(!classuuid){
					if(!classArry||classArry.length==0){
						classuuid=null;
					}else{
						classuuid=classArry[0].uuid;
					}
				}
				React.render(React.createElement(Query_photo_rect,{
					groupuuid:group_uuid,
					label:label,
					group_List:G_selected_dataModelArray_byArray(group_List,"uuid","brand_name"),
					classList:G_selected_dataModelArray_byArray(classArry,"uuid","name"),
					
					classuuid:classuuid
					}), G_get_div_second());
			}				
		};
	//预览图片方法	
 var KDClassNewsPhotoItem_Img_canDel = React.createClass({displayName: "KDClassNewsPhotoItem_Img_canDel",
 		deleteImg:function(divid,trid){
 			var tr=$("#"+trid);
 			$("#"+divid).remove();
 			tr.removeClass("G_ch_cook_item_checked");
 		},			
 	  render: function() {
 		 return (
           		React.createElement("div", {className: "G_cookplan_Img"}, 
 	 	       			React.createElement("img", {name: "KDClassNewsPhotoItem_Img_select", className: "G_cookplan_Img_img", src: this.props.url, alt: "图片不存在"}), 
 	 	       			React.createElement("div", {className: "G_cookplan_Img_close", onClick: this.deleteImg.bind(this,this.props.parentDivId,this.props.trid)}, React.createElement("img", {src: hostUrlCDN+"i/close.png", border: "0"}))
 	 	       		)		
           	)
 	  }
 	});
	
		
var  Common_mg_Class_big_fn  = React.createClass({displayName: "Common_mg_Class_big_fn",
	//红框框样式点击方法;
	div_onClick:function(trid,event){
		var tr=$("#"+trid);
		var divid="Common_mg_Class_big_fn_"+event.uuid;
		
		if(tr.attr("class").indexOf("G_ch_cook_item_checked")>=0){ 
			tr.removeClass("G_ch_cook_item_checked");		
			  $('#'+divid).remove();
		}else{ 
			tr.addClass("G_ch_cook_item_checked");
			 $("#abc").append("<div id='"+divid+"'>加载中...</div>");		 	
		     React.render(React.createElement(KDClassNewsPhotoItem_Img_canDel, {
						url: event.path,parentDivId:divid,trid:trid
						}), document.getElementById(divid));  	
		} 

	},
  render: function() {
	  var that=this
	  var edit_btn_className;
			  if (!this.props.imgsList){
				  return;
			  };  
	  var is_Checked=false;
		//if(that.props.checkeduuids)is_Checked=that.props.checkeduuids.indexOf(event.uuid)>-1;
  	  var className = is_Checked ? 'G_ch_cook_item_checked' :'';
			  
return (
   React.createElement("div", null, 
	React.createElement("ul", {className: "am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered"}, 
	   this.props.imgsList.map(function(event) {
    	var  o = event.path;
	return (
			
		 React.createElement("li", {id: "Common_mg_Class_big_fn_item_"+ event.uuid, title: event.uuid, className: "G_class_phtoto_Img am-gallery-item G_ch_cook_item "+className, onClick: that.div_onClick.bind(this,"Common_mg_Class_big_fn_item_"+event.uuid,event)}, 			     						    
	      React.createElement("img", {src: o})
	     )	
	      
        	)
      })
    )
  )
			    )
          }
        }); 		
	/*
 * 学生列表服务器请求后绘制处理方法；
 * @</select>下拉多选框;
 * @handleChange_stutent_Selected:学校查询；
 * @handleChange_class_Selected::班级查询；
 * @btn_query_click:名字查找；
 * */
var G_queryLabel_List=[];
var Query_photo_rect = React.createClass({displayName: "Query_photo_rect",
	getInitialState: function() {
	       return this.getStateByPropes(this.props); 
	  },
	getStateByPropes:function(nextProps){
		var labelArry=[];
        //取出标签
		var url = hostUrl + "rest/kDPhotoItem/queryLabel.json";
		$.ajax({
			type : "GET",
			url : url,
			data : {group_uuid:this.props.groupuuid,class_uuid:this.props.classuuid},
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
		var queryForm={
				groupuuid:this.props.groupuuid,	
				label:this.props.label,
				classuuid:this.props.classuuid
		};
		 var obj= {
		    classList:this.props.classList,	 
			queryForm:queryForm,
			label_list:labelArry,
			pageNo:1,
			show_list:[],
			list: []
		};
		return obj;
	},
	   componentWillReceiveProps: function(nextProps) {	
		   this.setState(this.getStateByPropes(nextProps));
	},
	  handleChange_selectgroup: function(val){	
		  var   classArry,classuuid;		  
		        classArry=Store.getChooseClass(val);
		        classuuid=$("input[name='class_uuid']").val();

				if(!classuuid){
					if(!classArry||classArry.length==0){
						classuuid=null;
					}else{
						classuuid=classArry[0].uuid;
					}
				} 
				this.state.queryForm.groupuuid=val;
				this.state.queryForm.classuuid=classuuid;
				this.state.classList=G_selected_dataModelArray_byArray(classArry,"uuid","name");
				this.ajax_list();
				this.setState(this.state); 
			},
	 handleChange:function(val){ 
		 
	    var queryForm=$('#queryForm').serializeJson();
			this.state.queryForm=queryForm;
		    this.setState(this.state);
			this.ajax_list();
		
	 },
	  handleClick_selectbtn: function(obj) {
		  var selectedArr=[];
		  
		  
		  var imgs="";
		  $("img[name='KDClassNewsPhotoItem_Img_select']").each(function(){
			  selectedArr.push($(this).attr("src"));
			});	  
			if(module.callback){
				module.callback(selectedArr);
			}
			G_get_div_body();

 },	
 
	pageClick: function(m,data) {
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
			 if(!data||data.length<obj.pageSize){
				 G_msg_pop("最后一页了");
				 return ;
			 }
			 obj.pageNo=obj.pageNo+1;
			
			 this.ajax_list(obj);
			 return;
		 }
	},
	handleClick_query: function(m) {
		//this.handleChange();
		this.state.pageNo=1;
		
		 this.ajax_list();
	  },
	ajax_callback:function(list){
		 if (list== null ) this.state.list=[];
		 else
		  this.state.list=list.data;
		  this.state.pageSize=list.pageSize;
		if(this.state.pageNo=="1")this.state.totalCount=list.totalCount;
		  this.setState(this.state);
	  },
	ajax_list:function(){
		var queryForm=this.state.queryForm;
	     
		if(queryForm.label=="所有"){
			queryForm.label="";
		}
		queryForm.pageNo=this.state.pageNo;
		$.AMUI.progress.start();
		var that=this;
		var url = hostUrl + "rest/kDPhotoItem/queryMy.json";
		$.ajax({
			type : "GET",
			url : url,
			data :queryForm,
			dataType : "json",
			//async: false,//必须同步执行
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
				    that.ajax_callback( data.list );     
				} else {
					alert(data.ResMsg.message);
					G_resMsg_filter(data.ResMsg);
				}
			},
			error : G_ajax_error_fn
		});
		
	},
	
	  componentDidMount:function(){
		  
		  this.ajax_list(); 
		  //$('.am-gallery').pureview();
		},
		handle_onKeyDown: function(e){
	          if(G_isKeyDown_enter(e)){
	               this.handleClick_query();
	               return false;
			 }
	          
		},
render: function() {	
	var edit_btn_className;
	var selectbtn_btn_className;
	var queryForm=this.state.queryForm;
	var obj=this.state;
	var imgarry=this.state.list;
	imgarry.pageNo=this.state.pageNo;
	var imgphotoList=[];
	var bgobj;
	var label_obj;
	var arry_label=[]
	for(var i=0;i<obj.label_list.length;i++){
         if(obj.label_list[i].label){
        	 label_obj={value:null,label:null}
        	 label_obj.value=obj.label_list[i].label;
        	 label_obj.label=obj.label_list[i].label;
        	 arry_label.push(label_obj);
         }
	    }
	this.state.label_list=arry_label;
	for(var i=0;i<imgarry.length;i++){
		 bgobj={path:null,groupuuid:null,classuuid:null,uuid:null,pageNo:null};
		 bgobj.path=imgarry[i].path;
		 bgobj.groupuuid=obj.queryForm.groupuuid;
		 bgobj.classuuid=obj.queryForm.classuuid;
		 bgobj.uuid=imgarry[i].uuid;
		 bgobj.pageNo=obj.pageNo;
		 imgphotoList.push(bgobj);
	    }
    return (


    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
  		     React.createElement("hr", null)
  		    ), 
    		React.createElement(AMR_Panel, null, 
    		
    		React.createElement(AMR_ButtonToolbar, null, 
    		
    		React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre",imgphotoList)}, "上一页"), 
    		  React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", obj.pageNo, "页"), 
    		React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next",imgphotoList)}, "下一页")	
    	   
     		)
    		), 
    		 React.createElement(AMUIReact.Form, {id: "queryForm", inline: true, onKeyDown: this.handle_onKeyDown}, 
   		 React.createElement(AMR_ButtonToolbar, null, 
  		    React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
    		React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange_selectgroup, btnWidth: "200", data: this.props.group_List, btnStyle: "primary", value: queryForm.groupuuid})		            
    		 ), 
    		
    		React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
    		React.createElement(AMUIReact.Selected, {id: "classuuid", name: "classuuid", placeholder: "班级切换", onChange: this.handleChange, btnWidth: "200", data: obj.classList, btnStyle: "primary", value: queryForm.classuuid})		            
    		 ), 
    		
    		React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
    		React.createElement(AMUIReact.Selected, {id: "label", name: "label", placeholder: "标签切换", onChange: this.handleChange, btnWidth: "200", data: arry_label, btnStyle: "primary", value: queryForm.label})		            
    		 )
    		)
    
    	    ), 
    	    

		    React.createElement("div", {className: "am-comment-bd"}, 
		     React.createElement(Common_mg_Class_big_fn, {imgsList: imgphotoList, state: this.state})
		    ), 
			    	
	    	React.createElement("legend", null), 
	    	React.createElement(AMR_ButtonToolbar, null, 
    		 React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre",imgphotoList)}, "上一页"), 
    		  React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", obj.pageNo, "页"), 
    		 React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next",imgphotoList)}, "下一页")	
    		), 
    		
		    React.createElement("div", {id: "abc"}, 				    
  			 React.createElement(AMR_ButtonToolbar, null, 
			  React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick_selectbtn.bind(this,obj)}, "确认照片选择")
			 )
  		    )

		   )
    );
  }
});
	return module;	
}();