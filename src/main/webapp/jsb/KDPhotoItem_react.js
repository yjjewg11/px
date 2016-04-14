var KDPhotoItem=function(groupuuid,classuuid,pageNo ){
	var module={
			callback:null,
			ajax_uploadByphone(base64){
				fpPhotoUploadTask.ajax_uploadByphone(base64);
			},
			//闭包方法入口
			query:function(groupuuid,classuuid,pageNo){
				var classuuid;
				var group_uuid;
				var label;
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
					}), G_get_div_body());

			}				
		}

	var fpPhotoUploadTask={
			
			cropper:null,
			callbackFN:null,
			type:4,
			base64:null,
			groupuuid:null,//用于添加水印时填值
			
			//客户端压缩图片
			/**
			 * lrz_callback:压缩完成后,回调函数.
			 */
			do_lrz:function(){
				var file=fpPhotoUploadTask.upload_files_arr.pop();
				if(!file)return;
				 lrz(file, {
			            before: function() {
			                console.log('压缩开始');
			            },
			            fail: function(err) {
			                console.error(err);
			            },
			            always: function() {
			                console.log('压缩结束');
			            },
			            done: function (results) {
			            // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
			            console.log(results);
			            /*
			            var data = {
			                    base64: results.base64,
			                    size: results.base64.length // 校验用，防止未完整接收
			                };*/
				            if(results&&results.base64){
				            	
				            	fpPhotoUploadTask.ajax_uploadByphone(results.base64);
				            }
			            }
			            });//end done fn
			},
			upload_files_arr:[],
			/**
			*加水印调用
			1.绑定上传图片.fpPhotoUploadTask.bind_onchange(fileId,callbackFN)
	2.传入学校uuid,后台判断是否加水印.fpPhotoUploadTask.groupuuid=null;
			*/
			
			bind_onchange:function(fileId,callbackFN){
				fpPhotoUploadTask.upload_files_arr=[];
				fpPhotoUploadTask.groupuuid=null;//清空
				fpPhotoUploadTask.callbackFN=callbackFN;
				//if(G_CallPhoneFN.isPhoneApp()){
					
				if(window.JavaScriptCall&&window.JavaScriptCall.selectImgForCallBack){
					$(fileId).bind("click", function(){
						//优先调用手机
						G_CallPhoneFN.selectImgForCallBack( "KDPhotoItem.ajax_uploadByphone", "0", "500");
					});
					return;
				}
				$(fileId).bind("change", function(){
						//支持多 图片上传
						for(var i=0;i<this.files.length;i++){
							fpPhotoUploadTask.upload_files_arr.push(this.files[i]);
						}
						
						fpPhotoUploadTask.do_lrz();
				
					
					
				  });//end change
			},
			ajax_uploadByphone:function(base64){
				$.AMUI.progress.start(); 
				  formObject = $('#KdPhotoForm').serializeJson();
					formObject.base64=base64;
				var url = hostUrl + "rest/kDPhotoItem/uploadBase64.json";
				$.ajax({
					type : "POST",
					url : url,
					timeout : 0, 
					dataType : "json",
					data:formObject,
					 async: true,
					success : function(data) {
						$.AMUI.progress.done();
						// 登陆成功直接进入主页
						if (data.ResMsg.status == "success") {
							if(fpPhotoUploadTask.callbackFN){
								//data.data.uuid,data.imgUrl
								//fpPhotoUploadTask.callbackFN(data);
								fpPhotoUploadTask.callbackFN(data.imgUrl,data.data.uuid);
								fpPhotoUploadTask.do_lrz();
							}
						} else {
							alert(data.ResMsg.message);
						}
					},
					error :G_ajax_error_fn
				});
				
			}
	};
			
		
/*
 * 对单张图片的处理方法;
 * */		
var  Common_mg_Class_big_fn  = React.createClass({displayName: "Common_mg_Class_big_fn",
 handleClick: function(Obj) {

		if(!confirm("确定要删除吗?")){
			return;
		}
		var groupuuid=Obj.groupuuid;
		var classuuid=Obj.classuuid;
		var uuid=Obj.uuid;
		var pageNo=Obj.pageNo;
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
					
					$('#Common_mg_Class_big_fn_item_'+uuid).hide();
				//	menu_photo_fn(groupuuid,class_uuid,pageNo);
					} else {
						alert(data.ResMsg.message);
					}
				},
				rror :G_ajax_error_fn
			});
  },		
  render: function() {
	  var that=this
	  var edit_btn_className;
			  if (!this.props.imgsList){
				  return;
			  };  
return (
   React.createElement("div", null, 
	React.createElement("ul", {className: "am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered"}, 
	   this.props.imgsList.map(function(event) {
    	var  o = event.path;
		var  imgArr=o?o.split("@"):"";
	return (
		 React.createElement("li", {id: "Common_mg_Class_big_fn_item_"+ event.uuid, className: "G_class_phtoto_Img"}, 			     			
		  React.createElement("div", {className: "am-gallery-item"}, 
			   React.createElement("a", {href: imgArr[0], title: ""}, 
			    React.createElement("img", {src: o, alt: "", "data-rel": imgArr[0]})
			    )
   
     	  ), 	
		
      React.createElement("div", {className: "G_class_phtoto_Img_close"}, 
       React.createElement(AMR_Button, {onClick: that.handleClick.bind(this,event)}, "X")
      )
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
	 handleClick: function(obj) {
			React.render(React.createElement(Img_photo_rect,{
				formdata:obj
				}), G_get_div_body());
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
		  $('.am-gallery').pureview();
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
    		React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next",imgphotoList)}, "下一页"), 	
    	   
     		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,obj)}, "上传照片")
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
    		)
    		


		   )
    );
  }
});
/*
 *上传照片功能
 * */
var Img_photo_rect = React.createClass({displayName: "Img_photo_rect",
 getInitialState: function() {
	 var label_obj;
		for(var i=0;i<G_queryLabel_List.length;i++){
	         if(G_queryLabel_List[i].label){
	        	 label_obj={value:null,label:null}
	        	 label_obj.value=G_queryLabel_List[i].label;
	        	 label_obj.label=G_queryLabel_List[i].label;
	        	 this.props.formdata.show_list.push(label_obj);
	         }
	        }
	    return this.props.formdata;
	  },
buttion_black_Click: function(o) {
	module.query(o.queryForm.groupuuid,o.queryForm.classuuid,o.pageNo)
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
upload_files_arr:[],
componentDidMount:function(){
	 var editor=$('#classnews_content').xheditor(xhEditor_classnews_emot);
	 this.editor=editor;
	// fpPhotoUploadTask.bind_onchange("#file_img_upload",function(imgurl){
	 var that=this;		 
	 //已经有的图片,显示出来.		 
	 fpPhotoUploadTask.bind_onchange("#file_img_upload",function(imgurl,uuid){
		  ////data.data.uuid,data.imgUrl
		 that.addShowImg(imgurl);
		// $('#show_imgList').append('<img  width="198" height="198" src="'+imgurl+'"/>');			
	  });	
	 
	 fpPhotoUploadTask.groupuuid=this.props.formdata.groupuuid;
	//已经有的图片,显示出来.
	 if(!$('#imgs').val())return;
	 var imgArr=$('#imgs').val().split(",");
	 for(var i=0;i<imgArr.length;i++){
		 this.addShowImg(imgArr[i]);
	 }		
},
handleChange: function() {
	var label_txt=$("input[name='label']").val();
	this.state.queryForm.label=label_txt;
	this.setState(this.state);
    this.setState($('#KdPhotoForm').serializeJson());
},
handleChange_label:function(val){ 
	this.state.queryForm.label=val;
	this.setState(this.state);
	this.setState($('#KdPhotoForm').serializeJson());

},
render: function() {	
	var o=this.state;
	var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
	var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
	
		var G_upload_img_Div=React.createElement(AMR_Input, {type: "file", label: "上传图片", id: "file_img_upload", help: "选择图片", accept: "image/*", capture: "camera", multiple: true})
		if(window.JavaScriptCall&&window.JavaScriptCall.selectImgForCallBack){
			G_upload_img_Div=React.createElement(AMR_Button, {amStyle: "primary", id: "file_img_upload"}, "上传图片")
		}
	
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
      
    		  React.createElement("form", {id: "KdPhotoForm", method: "post", className: "am-form"}, 

    		  React.createElement("input", {type: "hidden", name: "group_uuid", value: o.queryForm.groupuuid}), 
    		  React.createElement("input", {type: "hidden", name: "class_uuid", value: o.queryForm.classuuid}), 
    		  React.createElement(AMR_ButtonToolbar, null, 
      		    React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_black_Click.bind(this,o)}, "返回"), 
        		React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
        		React.createElement(AMUIReact.Selected, {id: "label_Selected", name: "label_Selected", placeholder: "标签切换", onChange: this.handleChange_label, btnWidth: "200", data: o.show_list, btnStyle: "primary", value: o.queryForm.label})		            
        		 )
      		    ), 
    	       React.createElement("label", {className: one_classDiv}, "标签:"), 
   		     React.createElement("div", {className: two_classDiv}, 
  		       React.createElement(PxInput, {type: "text", name: "label", id: "label", value: o.queryForm.label, onChange: this.handleChange, maxLength: "45", placeholder: "不超过45位"})
  		        )
    		  ), 
		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
		      React.createElement("div", {className: "cls"}), 
		      G_upload_img_Div		  
    	   )
    	   )    		
    		

    );
  }
});
	return module;	
}();