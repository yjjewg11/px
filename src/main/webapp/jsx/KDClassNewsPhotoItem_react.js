var KDClassNewPhotoItem=function(groupuuid,classuuid,pageNo ){
	var module={
			callback:null,
			queryForSelect:function(groupuuid,classuuid,pageNo,callback){
				var group_uuid,class_uuid,label;
				if(!label)label="";
				if(!pageNo)pageNo=1;
				module.callback=callback;
				
			
				var group_List=Store.getGroup();
    			if(!groupuuid){
					group_uuid=group_List[0].uuid;
				}else{
					group_uuid=groupuuid;
				} 

				var classArry=Store.getMyByClassList(group_uuid);
				if(!classuuid){
					if(!classArry||classArry.length==0){
						class_uuid=null;
					}else{
						class_uuid=classArry[0].uuid;
					}
				}else{
					class_uuid=classuuid;
				} 

				
				React.render(React.createElement(Query_photo_div,{
					groupuuid:group_uuid,
					label:label,
					group_List:G_selected_dataModelArray_byArray(group_List,"uuid","brand_name"),
					classList:G_selected_dataModelArray_byArray(classArry,"uuid","name"),
					
					classuuid:class_uuid
					}), G_get_div_second());
			}				
		}

	
		
	
/*
 * 学生列表服务器请求后绘制处理方法；
 * @</select>下拉多选框;
 * @handleChange_stutent_Selected:学校查询；
 * @handleChange_class_Selected::班级查询；
 * @btn_query_click:名字查找；
 * */
var query_All_Type=false;
var G_queryLabel_List=[];
var Query_photo_div =  React.createClass({ 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-newsPhoto-bd",
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
//监听如果是回车键直接ajax_list()查询1;	
handle_onKeyDown: function(e){
  if(G_isKeyDown_enter(e)){
  this.handleClick_query();
  return false;
  }      
 },	 
//监听如果是回车键直接ajax_list()查询2;
handleClick_query: function(m) {
	this.state.pageNo=1;	
	 this.refresh_data();
 },
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
   		var that=this;
   		var re_data;
   		var callback=function(re_data){
    			if(!re_data)return;
    			var number1=that.state.totalCount%that.state.pageSize;
    			var number2=Math.round(that.state.totalCount/that.state.pageSize);

    			if(re_data.data.length<re_data.pageSize){
    				$("#"+that.load_more_btn_id).hide();
    			}else if(that.state.pageNo==number2&&number1==0){
    				$("#"+that.load_more_btn_id).hide();   	
    			 }else{
    				$("#"+that.load_more_btn_id).show();
    			}
    			that.pageNo++;
    		}
  
   		if(query_All_Type==true){
   			re_data=ajax_queryMy(this.classnewsreply_list_div+this.pageNo,this.state.queryForm,this.pageNo,this,callback);	

   		}else{
   			re_data=ajax_list(this.classnewsreply_list_div+this.pageNo,this.state.queryForm,this.pageNo,this,callback);	
   		}

	 this.setState(this.state);
	},
 refresh_data:function(){
//classnewsreply_list_div 清除；
//load_more_data	重新绘制DIV；

var labelArry=this.query_Label(this.state.queryForm.groupuuid,this.state.queryForm.classuuid);
this.state.label_list=labelArry;		
 this.pageNo=1;
 $("#"+this.classnewsreply_list_div).html("");
 this.load_more_data();

 },
//确认照片选择方法;
 handleClick_selectbtn: function(obj) {
  var selectedArr=[];
  var imgs="";
	    $("img[name='KDClassNewsPhotoItem_Img_select']").each(function(){
	    	  var selected_obj={src:null,uuid:null};
	    	selected_obj.src=$(this).attr("src");
	    	selected_obj.uuid=$(this).attr("id");	    	
		    selectedArr.push(selected_obj);
		 });	  

	  G_get_div_body();
	  G_photo_urlsSelectArry=[];
	if(module.callback){
	  module.callback(selectedArr);
	  }

},	
//空班级跳转方法
btn_classPhtotItem:function(){
	G_photo_groupuuid=this.state.queryForm.groupuuid;
	G_photo_classuuid=this.state.queryForm.classuuid;
	KDPhotoItem.query();
  }, 
//查看所有学校与班级		
  All_group_class: function() {
	  query_All_Type=false;
		var group_uuid,class_uuid,groupArry,classArry,groupList,classList;
		 
		//取得学校数据（所有）
		groupList=Store.getGroupNoGroup_wjd();
		if(!group_uuid)group_uuid=groupList[0].uuid;
		groupArry=G_selected_dataModelArray_byArray(groupList,"uuid","brand_name");
		
		//取得班级数据（所有）
		classList=Store.getChooseClass(group_uuid);
		if(!classList||classList.length==0){
			class_uuid=null;
		}else{
			class_uuid=classList[0].uuid;	
		}
	    classArry=G_selected_dataModelArray_byArray(classList,"uuid","name")
	    
	    this.state.pageNo=1;
	    this.state.groupList=groupArry;
	    this.state.classList=classArry;
	    this.state.queryForm.label="";
	    this.state.queryForm.groupuuid=group_uuid;
	    this.state.queryForm.classuuid=class_uuid;
		this.state.query_My_All_list=2;		
		this.refresh_data();
		
  },
//查看已经使用过的照片
  My_Phtot: function() {
	  query_All_Type=true;
	  this.refresh_data();
  },   
//查看我的学校与班级		
  My_group_class: function() {
	  query_All_Type=false;
		var group_uuid,class_uuid,groupArry,classArry,groupList,classList;
		 
		//取得学校数据（所有）
		groupList=Store.getGroup();
		if(!group_uuid)group_uuid=groupList[0].uuid;
		groupArry=G_selected_dataModelArray_byArray(groupList,"uuid","brand_name");
		
		
		//取得班级数据（所有）
		classList=Store.getMyByClassList(group_uuid);
		if(!classList||classList.length==0){
			class_uuid=null;
		}else{
			class_uuid=classList[0].uuid;	
		}
	    classArry=G_selected_dataModelArray_byArray(classList,"uuid","name")
	    
	    this.state.pageNo=1;
	    this.state.groupList=groupArry;
	    this.state.classList=classArry;
	    this.state.queryForm.label="";
	    this.state.queryForm.groupuuid=group_uuid;
	    this.state.queryForm.classuuid=class_uuid;
		this.state.query_My_All_list=1;
		this.refresh_data();
  }, 
//学校切换方法;		
  handleChange_selectgroup: function(val){	
  var   classArry,classuuid;	

	if(this.state.query_My_All_list==1){
		classArry=Store.getMyByClassList(val);
	}else{
		classArry=Store.getChooseClass(val);
	}
        

		if(!classuuid){
			if(!classArry||classArry.length==0){
				classuuid=null;
			}else{
				classuuid=classArry[0].uuid;
			}
		} 

		if(this.state.query_My_All_list==1){
			G_photo_groupuuid=val;
			G_photo_classuuid=classuuid;
		}

		this.state.pageNo=1;
		this.state.queryForm.label="";
		this.state.queryForm.groupuuid=val;
		this.state.queryForm.classuuid=classuuid;
		this.state.classList=G_selected_dataModelArray_byArray(classArry,"uuid","name");
	    this.refresh_data();
  },
//班级切换方法		
  handleChange:function(val){
		if(this.state.query_My_All_list==1){
			 G_photo_classuuid=$("input[name='classuuid']").val();
		}

        this.state.pageNo=1;
        this.state.queryForm.label="";
        this.state.queryForm.classuuid=val;
		this.refresh_data();		
  },  
//标签切换方法		
  handleChange_label:function(val){
		if(this.state.query_My_All_list==1){
			 G_photo_classuuid=$("input[name='classuuid']").val();
		}

    var queryForm=$('#queryForm').serializeJson();
        this.state.pageNo=1;
		this.state.queryForm=queryForm;
		this.refresh_data();		
  },  
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
//query_My_All_list:1显示查询所有，2显示查询我的班级;	
//btn_query_My_className:	显示-查询所有按钮；
//btn_query_All_className:	显示-查询我的班级；
	
	var bgobj,label_obj,photoClassName,btn_query_My_className,btn_query_All_className;
	var Penthat=this;
	var queryForm=this.state.queryForm;
	var obj=this.state;
	var arry_label=[];
    var selected=(<div></div>);
	
  	if(obj.query_My_All_list== 1){
  		btn_query_All_className="G_Edit_show";
  		btn_query_My_className="G_Edit_hide";
	   }else{
		btn_query_All_className="G_Edit_hide";
		btn_query_My_className="G_Edit_show";
	  }	

	//标签数组下拉框在用;
	for(var i=0;i<obj.label_list.length;i++){
         if(obj.label_list[i].label){
        	 label_obj={value:null,label:null}
        	 label_obj.value=obj.label_list[i].label;
        	 label_obj.label=obj.label_list[i].label;
        	 arry_label.push(label_obj);
         }
	    }
	this.state.label_list=arry_label;
	
	if(this.state.list.length==0){
		photoClassName="G_Edit_show";
	  }else{
		photoClassName="G_Edit_hide";
	 }
	if(query_All_Type==false){
		selected=(<div>		  
	   	   <AMR_ButtonToolbar>
  		   <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
    		<AMUIReact.Selected id="groupuuid" name="groupuuid" onChange={this.handleChange_selectgroup} btnWidth="200"  data={obj.groupList} btnStyle="primary" value={queryForm.groupuuid} />    		            
    	   </div> 
    		
    	   <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
    		<AMUIReact.Selected id="classuuid" name="classuuid" placeholder="班级切换"  onChange={this.handleChange} btnWidth="200"  data={obj.classList} btnStyle="primary" value={queryForm.classuuid} />    		            
    	   </div> 
    		
    	   <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
    		<AMUIReact.Selected id="label" name="label" placeholder="标签切换"  onChange={this.handleChange_label} btnWidth="200"  data={arry_label} btnStyle="primary" value={queryForm.label} />    		            
    	   </div> 
            </AMR_ButtonToolbar>
		  </div>);
	}

  return (			
		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">

			<AMR_Panel>
			 <AMR_ButtonToolbar>
	  		   <AMR_Button className={btn_query_All_className} amStyle="secondary" onClick={this.All_group_class.bind(this)} >查询所有班级</AMR_Button>
	  		   <AMR_Button className={btn_query_My_className} amStyle="secondary" onClick={this.My_group_class.bind(this)} >查询我的班级</AMR_Button>
	  		   <AMR_Button amStyle="secondary" onClick={this.My_Phtot.bind(this)} >查询已使用过的照片</AMR_Button>
	  	      </AMR_ButtonToolbar>
			 </AMR_Panel> 
		  <label>{"图片总数："+this.state.totalCount+"张"}</label>
		  <AMUIReact.Form id="queryForm" inline  onKeyDown={this.handle_onKeyDown}>
		  {selected}
	    </AMUIReact.Form>
	    
	    <div className={photoClassName}>
	       <label>{"该班级相册暂未上传照片，请跳转班级相册上传新照片"}</label>
	       <AMR_ButtonToolbar>
		   <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.btn_classPhtotItem.bind(this)} >跳转班级相册</AMR_Button>
		   </AMR_ButtonToolbar>
		  </div>

		  <div  id={this.classnewsreply_list_div} className="am-list-newsPhoto-bd">		   		    
		  </div>
		  
		  <div className="am-list-news-ft">
		    <a className="am-list-news-more am-btn am-btn-default " id={this.load_more_btn_id} onClick={this.load_more_data.bind(this)}>查看更多 &raquo;</a>
		  </div>
		  
		    <div id="abc">				    
			 <AMR_ButtonToolbar>
		  <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.handleClick_selectbtn.bind(this,obj)} >确认照片选择</AMR_Button>
		 </AMR_ButtonToolbar>
		    </div>
		  
		</div>
		  
			
  );
}
});
//*******************************************普通程序查询入口*************************************
/*
 * 请求相册服务器数据
 * 
 * */
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
				  that.state.list=data.list.data;
				  that.state.pageSize=data.list.pageSize;
			  if(pageNo=="1")that.state.totalCount=data.list.totalCount;
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




/*
 * 根据相册请求数据绘制相册图片;
 * */
var Query_photo_rect = React.createClass({
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
	var imgphotoList=[];
	var arry_label=[];

	//imgphotoList绘制图片方法在用
	for(var i=0;i<imgarry.length;i++){
		 bgobj={path:null,uuid:null,label:null,note:null};
		 bgobj.path=imgarry[i].path;
		 bgobj.uuid=imgarry[i].uuid;
		 bgobj.label=imgarry[i].label;
		 bgobj.note=imgarry[i].note;
		 imgphotoList.push(bgobj);
	    }

	    return (    		
		    <div className="am-comment-bd">
		     <Common_mg_Classnew_big_fn  imgsList={imgphotoList}  Penthat={this.props.Propsthat} />  
		    </div>
	    );
	  }
	});

var  Common_mg_Classnew_big_fn  = React.createClass({
	//精品相册动态选择
	componentDidMount:function(){
		  if(G_photo_urlsSelectArry.length!=0){
			  var imglist=this.props.imgsList;
			  for(var i=0;i<imglist.length;i++){
				  if(imglist[i].OK==true){
					  var trid="Common_mg_ClassNew_big_fn_item_"+imglist[i].uuid;
					  var divid="Common_mg_Class_big_fn_"+imglist[i].uuid;
					  var tr=$("#"+trid);
						tr.addClass("G_ch_classNews_item_checked");
						 $("#abc").append("<div id='"+divid+"'>加载中...</div>");		 	
					     React.render(React.createElement(KDClassNewsPhotoItem_Img_canDel, {
									url: imglist[i].path,
									parentDivId:divid,trid:trid,
									event:imglist[i]
									}), document.getElementById(divid));  	
					} 
				  }
			  }
		  

	},
	//红框框样式点击方法;
	div_onClick:function(trid,event){
		var tr=$("#"+trid);
		var divid="Common_mg_Class_big_fn_"+event.uuid;
		
		if(tr.attr("class").indexOf("G_ch_classNews_item_checked")>=0){ 
			tr.removeClass("G_ch_classNews_item_checked");		
			  $('#'+divid).remove();
			  
			  if(G_photo_urlsSelectArry.length!=0){
				  var List=[];
				  for(var i=0;i<G_photo_urlsSelectArry.length;i++){  
					  if(G_photo_urlsSelectArry[i]!=event.uuid){
						  List.push(G_photo_urlsSelectArry[i]);
					  }					  
				  }
				  G_photo_urlsSelectArry=List;
				  }
		}else{ 
			tr.addClass("G_ch_classNews_item_checked");
			 $("#abc").append("<div id='"+divid+"'>加载中...</div>");		 	
		     React.render(React.createElement(KDClassNewsPhotoItem_Img_canDel, {
						url: event.path,
						parentDivId:divid,trid:trid,
						event:event
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
  	  var className = is_Checked ? 'G_ch_classNews_item_checked' :'';
			  
return (
   <div>
	<ul  className="am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered">
	   {this.props.imgsList.map(function(event) {
		   
		  if(G_photo_urlsSelectArry.length!=0){
			  for(var i=0;i<G_photo_urlsSelectArry.length;i++){
				  if(event.uuid==G_photo_urlsSelectArry[i]){
					  event.OK=true;
				  }
			  }
		  }	
    	var  o = event.path;
    	var label_text = event.label;
    	var note_text  = event.note;
    	if(!label_text)label_text="无";
    	if(!note_text)  note_text="无";
	return (
			
		 <li id={"Common_mg_ClassNew_big_fn_item_"+ event.uuid} className={"G_class_phtoto_Img  G_ch_classNews_item "+className}  title={event.uuid}  onClick={that.div_onClick.bind(this,"Common_mg_ClassNew_big_fn_item_"+event.uuid,event)}>			     						    
		  <div className="am-gallery-item">
		   <img  src={o}/>
	        <label>{"标签：【"+label_text+"】"}</label>
	        <br/>
	        <label>{"备注：【"+note_text+"】"}</label>
	       </div>
	      </li>		      
        	)
      })}
    </ul>
  </div>
			    )
          }
        }); 	







//********************************************查询所有已使用照片绘制************************************

/*
 * 已使用照片请求相册服务器数据
 * 
 * */
 var  ajax_queryMy=function(list_div,queryForm,pageNo,that,callback) {
	 
		$.AMUI.progress.start();
		var url = hostUrl + "rest/uploadFile/queryMy.json";
		$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			async: false,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					  that.state.list=data.list.data;
					  that.state.pageSize=data.list.pageSize;
				  if(pageNo=="1")that.state.totalCount=data.list.totalCount;
					React.render(React.createElement(Query_Myphoto_rect, {
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




/*
 * 根据已使用照片相册请求数据绘制相册图片;
 * */
var Query_Myphoto_rect = React.createClass({
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
		    <div className="am-comment-bd">
		     <Common_Img_My_fn  imgsList={imgarry}  Penthat={this.props.Propsthat} />  
		    </div>
	    );
	  }
	});

var  Common_Img_My_fn  = React.createClass({
	//精品相册动态选择
	componentDidMount:function(){
		  if(G_photo_urlsSelectArry.length!=0){
			  var imglist=this.props.imgsList;
			  for(var i=0;i<imglist.length;i++){
				  if(imglist[i].OK==true){
					  var trid="Common_Img_My_fn_item"+imglist[i].uuid;
					  var divid="Common_Img_My_fn"+imglist[i].uuid;
					  var tr=$("#"+trid);
						tr.addClass("G_ch_classNews_item_checked");
						 $("#abc").append("<div id='"+divid+"'>加载中...</div>");		 	
					     React.render(React.createElement(KDClassNewsPhotoItem_Img_canDel, {
									url: imglist[i].path,
									parentDivId:divid,trid:trid,
									event:imglist[i]
									}), document.getElementById(divid));  	
					} 
				  }
			  }
		  

	},
	//红框框样式点击方法;
	div_onClick:function(trid,event){
		var tr=$("#"+trid);
		var divid="Common_Img_My_fn"+event.uuid;
		
		if(tr.attr("class").indexOf("G_ch_classNews_item_checked")>=0){ 
			tr.removeClass("G_ch_classNews_item_checked");		
			  $('#'+divid).remove();
			  
			  if(G_photo_urlsSelectArry.length!=0){
				  var List=[];
				  for(var i=0;i<G_photo_urlsSelectArry.length;i++){  
					  if(G_photo_urlsSelectArry[i]!=event.uuid){
						  List.push(G_photo_urlsSelectArry[i]);
					  }					  
				  }
				  G_photo_urlsSelectArry=List;
				  }
		}else{ 
			tr.addClass("G_ch_classNews_item_checked");
			 $("#abc").append("<div id='"+divid+"'>加载中...</div>");		 	
		     React.render(React.createElement(KDClassNewsPhotoItem_Img_canDel, {
						url: event.path,
						parentDivId:divid,trid:trid,
						event:event
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
  	  var className = is_Checked ? 'G_ch_classNews_item_checked' :'';
			  
return (
   <div>
	<ul  className="am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered">
	   {this.props.imgsList.map(function(event) {
		   
		  if(G_photo_urlsSelectArry.length!=0){
			  for(var i=0;i<G_photo_urlsSelectArry.length;i++){
				  if(event.uuid==G_photo_urlsSelectArry[i]){
					  event.OK=true;
				  }
			  }
		  }	
 var  o = event.path;
	return (
			
		 <li id={"Common_Img_My_fn_item"+ event.uuid} className={"G_class_phtoto_Img  G_ch_classNews_item "+className}  title={event.uuid}  onClick={that.div_onClick.bind(this,"Common_Img_My_fn_item"+event.uuid,event)}>			     						    
		  <div className="am-gallery-item">
		   <img  src={o}/>
	        <label>{"创建时间：【"+event.create_time+"】"}</label>
	       </div>
	      </li>		      
        	)
      })}
    </ul>
  </div>
			    )
          }
        }); 





































//预览图片方法	
var KDClassNewsPhotoItem_Img_canDel = React.createClass({
		deleteImg:function(divid,trid){
			var tr=$("#"+trid);
			$("#"+divid).remove();
			tr.removeClass("G_ch_classNews_item_checked");
		},			
	  render: function() {
		 return (
          		<div className="G_cookplan_Img" >
	 	       			<img  name="KDClassNewsPhotoItem_Img_select"  className="G_cookplan_Img_img" id={this.props.event.uuid}  src={this.props.url} alt="图片不存在" />
	 	       			<div className="G_cookplan_Img_close"  onClick={this.deleteImg.bind(this,this.props.parentDivId,this.props.trid)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
	 	       		</div>		
          	)
	  }
	});


	return module;	
}();