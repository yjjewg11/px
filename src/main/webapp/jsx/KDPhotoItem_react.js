var KDPhotoItem=function(classuuid){
		var module={
			group_uuid:null,
			query:function(classuuid){
				var group_List=Store.getGroup();
				if(!this.group_uuid){
					this.group_uuid=group_List[0].uuid;
				}
				var classArry=Store.getChooseClass(this.group_uuid);
				var class_uuid;
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
					data : {class_uuid:classuuid},
					dataType : "json",
					success : function(data) {
			  			if (data.ResMsg.status == "success") {
							React.render(React.createElement(Query_photo_rect,{
								groupuuid:that.group_uuid,
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
	 handleChange_selectgrou_uuid:function(val){ 
		 menu_photo_fn(val);
	 },
	 handleClick: function(obj) {
			React.render(React.createElement(Img_photo_rect,{
				formdata:obj
				}), G_get_div_body());
 },	
render: function() {	
	var data={groupuuid:this.props.groupuuid,class_uuid:this.props.class_uuid};
    return (
    		<div>
    		<G_px_help_List data={G_kd_help_msg.msg_help_list12}/>
    		<AMR_Panel>
    		<AMR_ButtonToolbar>
    	   <AMUIReact.Selected id="classuuid" name="classuuid" placeholder="班级切换"  onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.classList} btnStyle="primary" value={this.props.class_uuid} />    		            
    		<AMR_Button amSize="xs"  amStyle="secondary" onClick={this.handleClick.bind(this,data)} >上传照片</AMR_Button>
    		</AMR_ButtonToolbar>
    		</AMR_Panel>

    	
		  </div>
    );
  }
});
var Img_photo_rect = React.createClass({
//ajax_list_Click:function(){
////	var url = hostUrl + "rest/kDPhotoItem/upload.json";
////	$.ajax({
////		type : "POST",
////		url : url,
////		dataType : "json",
////		success : function(data) {
////  			if (data.ResMsg.status == "success") {
////  				menu_photo_fn(data.classuuid);
////  			} else {
////  				alert("加载数据失败："+data.ResMsg.message);
////  			}
////  		},
////		error :G_ajax_error_fn
////	});
//    var opt={
//            formName: "KdPhotoForm",
//        url:hostUrl + "rest/kDPhotoItem/upload.json",
//            cbFN:null
//            };
//G_ajax_abs_save(opt);
//},
buttion_black_Click: function(o) {
		 menu_photo_fn(o.class_uuid);
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
	 var editor=$('#classnews_content').xheditor(xhEditor_classnews_emot);
	 this.editor=editor;
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

ajax_uploadByphone:function(base64){
	$.AMUI.progress.start();
    var url = hostUrl + "rest/fPPhotoItem/uploadBase64.json";
	$.ajax({
		type : "POST",
		url : url,
		timeout : 0, 
		dataType : "json",
		data:{groupuuid:w_img_upload_nocut.groupuuid,type:w_img_upload_nocut.type,base64:base64},
		 async: true,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				if(w_img_upload_nocut.callbackFN){
					//data.data.uuid,data.imgUrl
					//w_img_upload_nocut.callbackFN(data);
					w_img_upload_nocut.callbackFN(data.imgUrl,data.data.uuid);
					w_img_upload_nocut.do_lrz();
				}
			} else {
				alert(data.ResMsg.message);
			}
		},
		error :G_ajax_error_fn
	});
	
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