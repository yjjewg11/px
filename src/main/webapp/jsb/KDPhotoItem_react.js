var KDPhotoItem=function(classuuid){
			
		var module={
			group_uuid:null,
			query:function(){
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
				console.log("逆天",classArry,classuuid); 
				var url = hostUrl + "rest/kDPhotoItem/queryMy.json";
				$.ajax({
					type : "GET",
					url : url,
					data : {class_uuid:classuuid},
					dataType : "json",
					success : function(data) {
			  			if (data.ResMsg.status == "success") {
							React.render(React.createElement(Query_photo_rect,{
								groupuuid:this.group_uuid,
								classList:G_selected_dataModelArray_byArray(classArry,"uuid","brand_name"),
								classuuid:classuuid
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
	 handleChange_selectgroup_uuid:function(val){
		  ajax_class_listByGroup_byRight(val);
	 },
	 handleClick: function() {
			React.render(React.createElement(Img_photo_rect,{
				groupuuid:this.props.group_uuid,
				classuuid:this.props.class_uuid
				}), G_get_div_body());
 },	
render: function() {	
    return (
    		React.createElement("div", null, 
    		React.createElement(G_px_help_List, {data: G_kd_help_msg.msg_help_list12}), 
    		React.createElement(AMR_Panel, null, 
    		React.createElement(AMR_ButtonToolbar, null, 
  		  React.createElement(AMUIReact.Selected, {id: "selectclassuuid", placeholder: "班级切换", name: "classuuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.classList, btnStyle: "primary", value: this.props.classuuid}), 

    		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.handleClick.bind()}, "上传照片")
    		)
    		)

    	
		  )
    );
  }
});

var Img_photo_rect = React.createClass({displayName: "Img_photo_rect",
ajax_list_Click:function(data){
	var url = hostUrl + "rest/kDPhotoItem/upload.json";
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		success : function(data) {
  			if (data.ResMsg.status == "success") {
  				menu_photo_fn(data.classuuid);
  			} else {
  				alert("加载数据失败："+data.ResMsg.message);
  			}
  		},
		error :G_ajax_error_fn
	});
	
},
buttion_black_Click: function(data) {
		 menu_photo_fn(data.classuuid);
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
render: function() {	
	var data=this.props;
    return (
    		React.createElement("div", null, 
    		React.createElement("hr", null), 
    		React.createElement(AMR_ButtonToolbar, null, 
      		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.ajax_list_Click.bind(this)}, "确定上传"), 
      		React.createElement(AMR_Button, {amSize: "xs", amStyle: "secondary", onClick: this.buttion_black_Click.bind(this,data)}, "返回")
      		), 
            React.createElement("h4", null, 
            "图片预览："
           ), 
		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
		      React.createElement("div", {className: "cls"}), 
    		G_get_upload_img_Div()
		  )
    );
  }
});
	return module;	
}();