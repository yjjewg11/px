var KDPhotoItem=function(){
			
		var module={
			group_uuid:null,
			query:function(){
				var group_uuid=Store.getGroup();
				var classArry=Store.getChooseClass(group_uuid);
				var class_uuid;
				if(!classArry||classArry.length==0){
					class_uuid=null;
				}else{
					class_uuid=classList[0].uuid;
				}
				React.render(React.createElement(Query_photo_rect,{
						groupuuid:group_uuid,
						classList:G_selected_dataModelArray_byArray(classArry,"uuid","brand_name"),
						classuuid:class_uuid
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
var Query_photo_rect = React.createClass({
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
    		<div>
    		<G_px_help_List data={G_kd_help_msg.msg_help_list12}/>
    		<AMR_Panel>
    		<AMR_ButtonToolbar>
  		  <AMUIReact.Selected id="selectclassuuid" placeholder="班级切换" name="classuuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.classList} btnStyle="primary" value={this.props.classuuid} />   

    		<AMR_Button amSize="xs"  amStyle="secondary" onClick={this.handleClick.bind()} >上传照片</AMR_Button>
    		</AMR_ButtonToolbar>
    		</AMR_Panel>

    	
		  </div>
    );
  }
});
    
var Img_photo_rect = React.createClass({
	 handleClick: function() {

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
    return (
    		<div>
    		<hr/>
    		<AMR_ButtonToolbar>
      		<AMR_Button amSize="xs"  amStyle="secondary" onClick={this.handleClick.bind()} >确定上传</AMR_Button>
      		<AMR_Button amSize="xs"  amStyle="secondary" onClick={this.handleClick.bind()} >返回</AMR_Button>
      		</AMR_ButtonToolbar>
            <h4>
            图片预览：
           </h4>
		      <div id="show_imgList"></div><br/>
		      <div className="cls"></div>
    		{G_get_upload_img_Div()}
		  </div>
    );
  }
});
	return module;	
}();