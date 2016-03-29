var KDPhotoItem=function(groupuuid,classuuid,pageNo,type ){
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
				if(G_CallPhoneFN.isPhoneApp()){
					$(fileId).bind("click", function(){
						//优先调用手机
		            	G_CallPhoneFN.selectImgPic();
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
		//,{groupuuid:fpPhotoUploadTask.groupuuid,classuuid:null,base64:base64},

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
		var module={
			query:function(groupuuid,classuuid,pageNo,type){
				var class_uuid;
				var group_uuid;
				var group_List=Store.getGroup();
					if(!groupuuid){
						group_uuid=group_List[0].uuid;
					}else{
						group_uuid=groupuuid;
					  }
					

				var classArry=Store.getChooseClass(group_uuid);
				
				if(!pageNo)pageNo=1;
				if(!classuuid){
					if(!classArry||classArry.length==0){
						classuuid=null;
					}else{
						classuuid=classArry[0].uuid;
					}
				}
				var url = hostUrl + "rest/kDPhotoItem/queryMy.json";
				var that=this;
				$.ajax({
					type : "GET",
					url : url,
					data : {class_uuid:classuuid,pageNo:pageNo},
					dataType : "json",
					success : function(data) {
			  			if (data.ResMsg.status == "success") {
							React.render(React.createElement(Query_photo_rect,{
								formdata: data,
								groupuuid:group_uuid,
								pageNo:data.list.pageNo,
								type:type,
								group_List:G_selected_dataModelArray_byArray(group_List,"uuid","brand_name"),
								classList:G_selected_dataModelArray_byArray(classArry,"uuid","name"),
								class_uuid:classuuid
								}), G_get_div_body());
			  			} else {
			  				alert("加载数据失败："+data.ResMsg.message);
			  			}
			  		},
					error :G_ajax_error_fn
				});

			}				
		}
/*
 * 学生列表服务器请求后绘制处理方法；
 * @</select>下拉多选框;
 * @handleChange_stutent_Selected:学校查询；
 * @handleChange_class_Selected::班级查询；
 * @btn_query_click:名字查找；
 * */
var Query_photo_rect = React.createClass({displayName: "Query_photo_rect",
	getInitialState: function() {
		var obj= {
		    	groupuuid:this.props.groupuuid,		    	
		    	class_uuid:this.props.class_uuid,
		    	pageNo:this.props.pageNo
		    };
	    return obj;
	   
	  },
	 handleChange_selectClass:function(val){ 
		  this.state.class_uuid=val;
		  this.setState(this.state);
		  menu_photo_fn(this.state.groupuuid,val,this.state.pageNo);
	 },
	 handleChange_selectGroup:function(val){ 
		  this.state.groupuuid=val;
		  this.state.class_uuid=null;
		  this.setState(this.state);
		 menu_photo_fn(val,this.state.class_uuid,this.state.pageNo);
	 },
	 handleClick: function(obj) {
			React.render(React.createElement(Img_photo_rect,{
				formdata:obj
				}), G_get_div_body());
 },	
	pageClick: function(m,data) {
		 var obj=this.state;
		 var list=data.list.data;
		 var pageSize=data.list.pageSize;

		 if(m=="pre"){
			
			 if(obj.pageNo<2){
				 G_msg_pop("第一页了");
				 return;
			 }
			 obj.pageNo=obj.pageNo-1;
			 menu_photo_fn(obj.groupuuid,obj.class_uuid,obj.pageNo);
			 return;
		 }else if(m=="next"){
			 if(!list||list.length<pageSize){
				 G_msg_pop("最后一页了");
				 return ;
			 }
			 obj.pageNo=obj.pageNo+1;
			
			 menu_photo_fn(obj.groupuuid,obj.class_uuid,obj.pageNo);
			 return;
		 }
	},
	  componentDidMount:function(){
		  $('.am-gallery').pureview();
		},
render: function() {	
	 var obj=this.state
	var o=this.props.formdata;
	var imgarry=o.list.data;
	imgarry.pageNo=o.list.pageNo;

	var imgphotoList=[];
	var bgobj;
	for(var i=0;i<imgarry.length;i++){
		 bgobj={path:null,groupuuid:null,class_uuid:null,uuid:null,pageNo:null};
		 bgobj.path=imgarry[i].path;
		 bgobj.groupuuid=obj.groupuuid;
		 bgobj.class_uuid=obj.class_uuid;
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
    		
    		React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre",o)}, "上一页"), 
    		  React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", obj.pageNo, "页"), 
    		React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next",o)}, "下一页"), 	
    	   
     		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,obj)}, "上传照片")
    		)
    		), 
    		
   		 React.createElement(AMR_ButtonToolbar, null, 
  		    React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
    		React.createElement(AMUIReact.Selected, {id: "groupuuid", name: "groupuuid", onChange: this.handleChange_selectGroup, btnWidth: "200", data: this.props.group_List, btnStyle: "primary", value: obj.groupuuid})		            
    		 ), 
    		
    		React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
    		React.createElement(AMUIReact.Selected, {id: "classuuid", name: "classuuid", placeholder: "班级切换", onChange: this.handleChange_selectClass, btnWidth: "200", data: this.props.classList, btnStyle: "primary", value: obj.class_uuid})		            
    		 )
    		), 
    

			    React.createElement("div", {className: "am-comment-bd"}, 
			    	React.createElement(Common_mg_Class_big_fn, {imgsList: imgphotoList, type: this.props.type})
			  
			   )
		  )
    );
  }
});
var Img_photo_rect = React.createClass({displayName: "Img_photo_rect",
buttion_black_Click: function(o) {
		 menu_photo_fn(o.groupuuid,o.class_uuid,o.pageNo);
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
render: function() {	
	var o=this.props.formdata;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
      
    		  React.createElement("form", {id: "KdPhotoForm", method: "post", className: "am-form"}, 

    		  React.createElement("input", {type: "hidden", name: "group_uuid", value: o.groupuuid}), 
    		  React.createElement("input", {type: "hidden", name: "class_uuid", value: o.class_uuid}), 
    		  React.createElement(AMR_ButtonToolbar, null, 
      		    React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_black_Click.bind(this,o)}, "返回")
      		   )

    		  ), 
		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
		      React.createElement("div", {className: "cls"}), 
    	      React.createElement(AMR_Input, {type: "file", label: "", id: "file_img_upload", help: "选择图片", accept: "image/*", capture: "camera", multiple: true})

    	   )
    	   )    		
    		

    );
  }
});
	return module;	
}();