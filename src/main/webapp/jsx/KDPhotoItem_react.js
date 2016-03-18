var KDPhotoItem=function(groupuuid,classuuid,pageNo){
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
				var url = hostUrl + "rest/kDPhotoItem/uploadBase64.json";
				$.ajax({
					type : "POST",
					url : url,
					timeout : 0, 
					dataType : "json",
					data:{groupuuid:fpPhotoUploadTask.groupuuid,classuuid:null,base64:base64},
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
			query:function(groupuuid,classuuid,pageNo){
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
								pageNo:pageNo,
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
var Query_photo_rect = React.createClass({
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
	pageClick: function(m) {
		 var obj=this.state;
		 if(m=="pre"){
			
			 if(obj.pageNo<2){
				 G_msg_pop("第一页了");
				 return;
			 }
			 obj.pageNo=obj.pageNo-1;
			 menu_photo_fn(obj.groupuuid,obj.class_uuid,obj.pageNo);
			 return;
		 }else if(m=="next"){
			 if(!obj.list||obj.list.length<obj.pageSize){
				 G_msg_pop("最后一页了");
				 return ;
			 }
			 obj.pageNo=obj.pageNo+1;
			
			 menu_photo_fn(obj.groupuuid,obj.class_uuid,obj.pageNo);
			 return;
		 }
	},
render: function() {	
	 var obj=this.state
	var o=this.props.formdata;
	var imglist=o.list.data;
    return (
    		<div>
    		<div className="header">
  		     <hr />
  		    </div>
    		<AMR_Panel>
    		<AMR_ButtonToolbar>
    		
    		<AMR_Button amStyle="default" onClick={this.pageClick.bind(this, "pre")} >上一页</AMR_Button>
    		  <AMR_Button amStyle="default" disabled="false" >第{obj.pageNo}页</AMR_Button>
    		<AMR_Button amStyle="default" onClick={this.pageClick.bind(this, "next")} >下一页</AMR_Button>	
    	   
     		<AMR_Button amSize="xs"  amStyle="secondary" onClick={this.handleClick.bind(this,obj)} >上传照片</AMR_Button>
    		</AMR_ButtonToolbar>
    		</AMR_Panel>
    		
   		 <AMR_ButtonToolbar>
  		 <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
    		<AMUIReact.Selected id="groupuuid" name="groupuuid" onChange={this.handleChange_selectGroup} btnWidth="200"  data={this.props.group_List} btnStyle="primary" value={obj.groupuuid} />    		            
    		 </div> 
    		<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
    		<AMUIReact.Selected id="classuuid" name="classuuid" placeholder="班级切换"  onChange={this.handleChange_selectClass} btnWidth="200"  data={this.props.classList} btnStyle="primary" value={obj.class_uuid} />    		            
    		 </div> 
    		</AMR_ButtonToolbar>
    		
            {imglist.map(function(event) {
           	 return (
           		<AMUIReact.Image  className="am-show"  id="img_image" thumbnail width="120" height="120" src={event.path}/>           	 
           	 )
           })}  
    	
		  </div>
    );
  }
});
var Img_photo_rect = React.createClass({
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
    		<div>
    		<div className="header">
    		  <hr />
    		</div>
    		<div className="am-g">
      
    		  <form id="KdPhotoForm" method="post" className="am-form">

    		  <input type="hidden" name="group_uuid"  value={o.groupuuid}/>
      		   <AMR_ButtonToolbar>
      		    <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.buttion_black_Click.bind(this,o)} >返回</AMR_Button>
      		   </AMR_ButtonToolbar>

    		  </form>
		      <div id="show_imgList"></div><br/>
		      <div className="cls"></div>
    	      <AMR_Input type= "file" label="" id="file_img_upload" help= "选择图片" accept="image/*" capture= "camera" multiple />

    	   </div>
    	   
    	   </div>    		
    		

    );
  }
});
	return module;	
}();