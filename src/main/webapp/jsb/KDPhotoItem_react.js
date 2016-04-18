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
				var group_List=Store.getGroupNoGroup_wjd();
				if(!G_photo_groupuuid){
					group_uuid=group_List[0].uuid;
				}else{
					group_uuid=G_photo_groupuuid;//本地记录学校UUID
				}


				var classArry=Store.getMyByClassList(group_uuid);
 
				if(!label)label="";
				if(!pageNo)pageNo=1;
				
				
				if(!G_photo_classuuid){
					if(!classArry||classArry.length==0){
						classuuid=null;
					}else{
						classuuid=classArry[0].uuid;
					}
				}else{
					classuuid=G_photo_classuuid;//本地记录班级UUID
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


			
		
/*
 * 对单张图片的处理方法;
 * */		
var  Common_mg_Class_big_fn  = React.createClass({displayName: "Common_mg_Class_big_fn",
 handleClick: function(Obj,KDitemthis) {

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
					//因隐藏图片会导致翻页数据库错乱所以此处用刷新法
					 KDitemthis.ajax_list();
					//$('#Common_mg_Class_big_fn_item_'+uuid).hide();
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
		        classArry=Store.getMyByClassList(val);

				if(!classuuid){
					if(!classArry||classArry.length==0){
						classuuid=null;
					}else{
						classuuid=classArry[0].uuid;
					}
				} 
				G_photo_groupuuid=val;
				G_photo_classuuid=classuuid;
				this.state.queryForm.groupuuid=val;
				this.state.queryForm.classuuid=classuuid;
				this.state.classList=G_selected_dataModelArray_byArray(classArry,"uuid","name");
				this.ajax_list();
				this.setState(this.state); 
			},
	 handleChange:function(val){
		 G_photo_classuuid=$("input[name='classuuid']").val();
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
	var Penthat=this;
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

	//imgphotoList绘制图片方法在用
	for(var i=0;i<imgarry.length;i++){
		 bgobj={path:null,groupuuid:null,classuuid:null,uuid:null,pageNo:null,label:null};
		 bgobj.path=imgarry[i].path;
		 bgobj.groupuuid=obj.queryForm.groupuuid;
		 bgobj.classuuid=obj.queryForm.classuuid;
		 bgobj.uuid=imgarry[i].uuid;
		 bgobj.pageNo=obj.pageNo;
		 bgobj.label=imgarry[i].label;
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
    	   
     		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,obj)}, "上传照片"), 
     		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind(this,obj)}, "查询所有班级")

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
		     React.createElement(Common_mg_Class_big_fn, {imgsList: imgphotoList, Penthat: Penthat, state: this.state})
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
			var progress_width;
			var file=fpPhotoUploadTask.upload_files_arr.pop();
			progress_width=Math.round(G_img_Photo/G_img_number*100);
			G_that.state.photoNum=G_img_Photo;
			G_that.state.photoAllNum=G_img_number;
			G_that.state.num=progress_width;
			G_that.state.btn_Letgo=true;
			G_that.setState(G_that.state);
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
				console.log("初始上传")
				G_img_Photo=0;
				G_img_number=0;
				progress_width=0;
			var progress_width=Math.round(G_img_Photo/G_img_number*100);
			G_that.state.photoNum=G_img_Photo;
			G_that.state.photoAllNum=G_img_number;
			G_that.state.num=progress_width;
			G_that.setState(G_that.state);
				G_img_number=this.files.length;
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
						G_img_Photo=G_img_Photo+1;
						if(fpPhotoUploadTask.callbackFN){
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
 *上传照片功能
 * */
G_img_number=null;
G_img_Photo=0;
G_that=null;
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
		this.props.formdata.btn_Letgo=false;
		this.props.formdata.div_list=[];
        this.props.formdata.show_list.push({value:"添加新标签",label:"添加新标签"});
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
addShowImg:function(url,uuid){
	  var divid=this.getNewImgDiv();
	  $("#show_imgList").append("<div id='"+divid+"'>加载中...</div>");	
		this.state.div_list.push({parentDivId:divid})
		this.setState(this.state);
	  React.render(React.createElement(KDphoto_Img_canDel, {
			url: url,parentDivId:divid,uuid:uuid
			}), document.getElementById(divid));  
},
upload_files_arr:[],
componentDidMount:function(){
	 var editor=$('#classnews_content').xheditor(xhEditor_classnews_emot);
	 this.editor=editor;
	 var that=this;		
	 //已经有的图片,显示出来.		 
	 fpPhotoUploadTask.bind_onchange("#file_img_upload",function(imgurl,uuid){
		 that.addShowImg(imgurl,uuid);		
	  });	
	 
	 fpPhotoUploadTask.groupuuid=this.props.formdata.groupuuid;
	//已经有的图片,显示出来.
	 if(!$('#imgs').val())return;
	 var imgArr=$('#imgs').val().split(",");
	 for(var i=0;i<imgArr.length;i++){
		 this.addShowImg(imgArr[i]);
	 }		
},

handleChange_label:function(val){
	if(val=="添加新标签"){
		this.disp_prompt()
		return;
	}
	this.state.queryForm.label=val;
	this.setState(this.state);
	this.setState($('#KdPhotoForm').serializeJson());

},
disp_prompt:function(){
var name=prompt("自定义标签(最多45位)","")

if (name!=null && name!="")
  {
	this.state.queryForm.label=name;
	this.state.show_list.push({value:name,label:name});
	this.setState(this.state);
	this.setState($('#KdPhotoForm').serializeJson());
  }
},
buttion_LestGo: function() {
	 for(var i=0;i<this.state.div_list.length;i++){
		 $("#"+this.state.div_list[i].parentDivId).remove();
	 }			
this.state.div_list=[];	
this.state.show_list=[];
this.state.num=0;
this.state.photoNum=0;
this.state.photoAllNum=0;
this.state.queryForm.label="";
this.props.formdata.div_list=[];
this.props.formdata.btn_Letgo=false;
this.setState(this.props.formdata);
},	
render: function() {	
	var o=this.state;
	var buttion_LestGo_className;
	var groupName=Store.getGroupNameByUuid(o.queryForm.groupuuid);
	var className=Store.getClassNameByUuid(o.queryForm.classuuid)

	G_that=this

		var G_upload_img_Div=React.createElement(AMR_Input, {type: "file", label: "上传图片：", id: "file_img_upload", accept: "image/*", capture: "camera", multiple: true})
		if(window.JavaScriptCall&&window.JavaScriptCall.selectImgForCallBack){
			G_upload_img_Div=React.createElement(AMR_Button, {amStyle: "primary", id: "file_img_upload"}, "上传图片")
		}
	if(!o.num)o.num=0;
	if(!o.photoNum)o.photoNum=0;
	if(!o.photoAllNum)o.photoAllNum=0;
	
  	if(o.btn_Letgo==false){
  		buttion_LestGo_className="G_Edit_hide";
	   }else{
		buttion_LestGo_className="G_Edit_show";
	  }	
    return (
    		React.createElement("div", {id: "KdPhotoForm_list_div"}, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
  		    React.createElement("div", {className: "am-g  am-u-md-6 am-u-sm-12"}, 
      
    		  React.createElement("form", {id: "KdPhotoForm", method: "post", className: "am-form"}, 

    		  React.createElement("input", {type: "hidden", name: "group_uuid", value: o.queryForm.groupuuid}), 
    		  React.createElement("input", {type: "hidden", name: "class_uuid", value: o.queryForm.classuuid}), 
    		  React.createElement(AMR_ButtonToolbar, null, 
        		React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
        		React.createElement(AMUIReact.Selected, {id: "label", name: "label", placeholder: "标签切换", onChange: this.handleChange_label, btnWidth: "200", data: o.show_list, btnStyle: "primary", value: o.queryForm.label})		            
        		 )
      		    ), 

  		        
  		      React.createElement("label", null, "标签："+o.queryForm.label), React.createElement("br", null)
    		  ), 

      		  React.createElement("label", null, "学校："+groupName), React.createElement("br", null), 
      		  React.createElement("label", null, "班级："+className), React.createElement("br", null), 
    		  React.createElement("label", null, "图片上传进度:已完成"+o.photoNum+"/"+o.photoAllNum+"张"), 
    		  React.createElement("div", null, 
    		    React.createElement(AMUIReact.Progress, {now: o.num, label: "已传"+o.photoNum+"张"})
    		  ), 
    		    
    	
		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
		      React.createElement("div", {className: "cls"}), 
		      G_upload_img_Div, 
		      React.createElement(AMR_ButtonToolbar, null, 
    		    React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_black_Click.bind(this,o)}, "确定"), 
    		    React.createElement(AMR_Button, {amSize: "xs", className: buttion_LestGo_className, amStyle: "secondary", onClick: this.buttion_LestGo.bind(this)}, "继续上传")
    		  )
    		    
    		    )
    	   )    	

    );
  }
});
//绘制上传照片后预览照片绘制
var KDphoto_Img_canDel = React.createClass({displayName: "KDphoto_Img_canDel",
	deleteImg:function(divid,uuid){
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
					$("#"+divid).remove();
					} else {
						alert(data.ResMsg.message);
					}
				},
				rror :G_ajax_error_fn
			});
	},			
  render: function() {
		var Photo_uuid=this.props.uuid;

	 return (
      		React.createElement("div", {className: "G_cookplan_Img"}, 
 	       			React.createElement("img", {className: "G_cookplan_Img_img", src: this.props.url, alt: "图片不存在"}), 
 	       			React.createElement("div", {className: "G_cookplan_Img_close", onClick: this.deleteImg.bind(this,this.props.parentDivId,Photo_uuid)}, React.createElement("img", {src: hostUrlCDN+"i/close.png", border: "0"}))
 	       		)		
      	)
  }
});
	return module;	
}();