var KDClassNewPhotoItem=function(groupuuid,classuuid,pageNo){
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

				
				React.render(React.createElement(Query_photo_rect,{
					groupuuid:group_uuid,
					label:label,
					group_List:G_selected_dataModelArray_byArray(group_List,"uuid","brand_name"),
					classList:G_selected_dataModelArray_byArray(classArry,"uuid","name"),
					
					classuuid:class_uuid
					}), G_get_div_second());
			}				
		};
	//预览图片方法	
 var KDClassNewsPhotoItem_Img_canDel = React.createClass({
 		deleteImg:function(divid,trid){
 			var tr=$("#"+trid);
 			$("#"+divid).remove();
 			tr.removeClass("G_ch_cook_item_checked");
 		},			
 	  render: function() {
 		 return (
           		<div className="G_cookplan_Img" >
 	 	       			<img  name="KDClassNewsPhotoItem_Img_select"  className="G_cookplan_Img_img"  src={this.props.url} alt="图片不存在" />
 	 	       			<div className="G_cookplan_Img_close"  onClick={this.deleteImg.bind(this,this.props.parentDivId,this.props.trid)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
 	 	       		</div>		
           	)
 	  }
 	});
	
		
var  Common_mg_Classnew_big_fn  = React.createClass({
	//红框框样式点击方法;
	div_onClick:function(trid,event){
		var tr=$("#"+trid);
		var divid="Common_mg_Class_big_fn_"+event.uuid;
		
		if(tr.attr("class").indexOf("G_ch_classNews_item_checked")>=0){ 
			tr.removeClass("G_ch_classNews_item_checked");		
			  $('#'+divid).remove();
		}else{ 
			tr.addClass("G_ch_classNews_item_checked");
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
  	  var className = is_Checked ? 'G_ch_classNews_item_checked' :'';
			  
return (
   <div>
	<ul  className="am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered">
	   {this.props.imgsList.map(function(event) {
    	var  o = event.path;
    	var label_text = event.label;
    	if(!label_text)label_text="无";
	return (
			
		 <li id={"Common_mg_Class_big_fn_item_"+ event.uuid} className={"G_class_phtoto_Img  G_ch_classNews_item "+className}  title={event.uuid}  onClick={that.div_onClick.bind(this,"Common_mg_Class_big_fn_item_"+event.uuid,event)}>			     						    
		  <div className="am-gallery-item">
		   <img  src={o}/>
	        <label>{"标签：【"+label_text+"】"}</label>
	       </div>
	      </li>		      
        	)
      })}
    </ul>
  </div>
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
var Query_photo_rect = React.createClass({
//数据初始化1	
 getInitialState: function() {
       return this.getStateByPropes(this.props); 
  },
//数据初始化2	
 getStateByPropes:function(nextProps){
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
//数据 
 componentWillReceiveProps: function(nextProps) {	
    this.setState(this.getStateByPropes(nextProps));
 },
//数据  
 componentDidMount:function(){		  
	this.ajax_list(); 
 }, 
//初始化请求服务器数据一次ajax_list()1;
 handle_onKeyDown: function(e){
  if(G_isKeyDown_enter(e)){
    this.handleClick_query();
    return false;
  }       
 },
//初始化请求服务器数据一次ajax_list()2;
 handleClick_query: function(m) {
    this.state.pageNo=1;
	this.ajax_list();
 },
//取标签公用服务请求
 query_Label: function(groupuuid,classuuid) {
	 var group_uuid,class_uuid;
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
		var labelArry=[];
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
//切换学校、班级、标签、等后请求服务器方法	 
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
//请求服务器数据后刷新舞台回调方法;    
 ajax_callback:function(list){
	 var labelArry=this.query_Label(this.state.queryForm.groupuuid,this.state.queryForm.classuuid);
	 this.state.label_list=labelArry;	 
  if (list== null ) this.state.list=[];
   else
	  this.state.list=list.data;
	  this.state.pageSize=list.pageSize;
  if(this.state.pageNo=="1")this.state.totalCount=list.totalCount;
	  this.setState(this.state);
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

		this.state.pageNo=1;
		this.state.queryForm.groupuuid=val;
		this.state.queryForm.classuuid=classuuid;
		this.state.classList=G_selected_dataModelArray_byArray(classArry,"uuid","name");
		this.ajax_list();
  }, 
//标签切换方法		
  handleChange_label:function(val){
		if(this.state.query_My_All_list==1){
			 G_photo_classuuid=$("input[name='classuuid']").val();
		}

    var queryForm=$('#queryForm').serializeJson();
        this.state.pageNo=1;
		this.state.queryForm=queryForm;
		this.ajax_list();		
  },	  
//班级切换方法		
  handleChange:function(val){
		if(this.state.query_My_All_list==1){
			 G_photo_classuuid=$("input[name='classuuid']").val();
		}

        this.state.pageNo=1;
        this.state.queryForm.label="";
        this.state.queryForm.classuuid=val;
		this.ajax_list();		
  },
//确认照片选择方法;
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
//翻页方法	 
 pageClick: function(m,data) {
     var obj=this.state;
	 var number1=obj.totalCount%obj.pageSize;
	 var number2=Math.round(obj.totalCount/obj.pageSize);
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
	  }else if(obj.pageNo==number2&&number1==0){
			 G_msg_pop("最后一页了");
			 return ;
		 }
	 obj.pageNo=obj.pageNo+1;		
	  this.ajax_list(obj);
	  return;
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
	    
	    
	    this.state.groupList=groupArry;
	    this.state.classList=classArry;
	    this.state.queryForm.groupuuid=group_uuid;
	    this.state.queryForm.classuuid=class_uuid;
		this.state.query_My_All_list=2;
		this.state.pageNo=1;
		this.ajax_list();
		
  },
//查看我的学校与班级		
  My_group_class: function() {
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
	    
	    this.state.groupList=groupArry;
	    this.state.classList=classArry;	    
	    this.state.queryForm.groupuuid=group_uuid;
	    this.state.queryForm.classuuid=class_uuid;
		this.state.query_My_All_list=1;
		this.state.pageNo=1;
		this.ajax_list();
  },  
  
render: function() {	
	var edit_btn_className,selectbtn_btn_className,photoClassName,bgobj,label_obj;
	var queryForm=this.state.queryForm;
	var obj=this.state;
	var imgarry=this.state.list;
	imgarry.pageNo=this.state.pageNo;
	var imgphotoList=[];
	var arry_label=[]
	var btn_all_my=(<div></div>);
	
	
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
	
	if(imgphotoList.length==0){
		photoClassName="G_Edit_show";
	  }else{
		photoClassName="G_Edit_hide";
	 }
	
	if(obj.query_My_All_list==1){
		 btn_all_my=(
		  <AMR_ButtonToolbar> 
			<AMR_Button className="am-margin-top" amStyle="secondary" onClick={this.All_group_class.bind(this)} >查询所有班级</AMR_Button>
	      </AMR_ButtonToolbar> );	
		}else{
	     btn_all_my=(
	      <AMR_ButtonToolbar> 
		   <AMR_Button className="am-margin-top" amStyle="secondary" onClick={this.My_group_class.bind(this)} >查询我的班级</AMR_Button>
		  </AMR_ButtonToolbar> );		
		}
	
	
	var number=G_get_pageSize_number(this.state.pageSize,this.state.totalCount);
    return (
    		<div>
    		<div className="header">
  		     <hr />
  		    </div>
  		    
    		<AMR_Panel>    		
    		 <AMR_ButtonToolbar>    		
    		  <AMR_Button amStyle="default" onClick={this.pageClick.bind(this, "pre",imgphotoList)} >上一页</AMR_Button>
    		  <AMR_Button amStyle="default" disabled="false" >{"第"+obj.pageNo+"/"+number+"页"}</AMR_Button>
    		  <AMR_Button amStyle="default" onClick={this.pageClick.bind(this, "next",imgphotoList)} >下一页</AMR_Button>	
    		  {btn_all_my}
     		</AMR_ButtonToolbar>
    	   </AMR_Panel>
    	   <label>{"图片总数："+obj.totalCount+"张"}</label>
    	<AMUIReact.Form id="queryForm" inline  onKeyDown={this.handle_onKeyDown}>
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
    	</AMUIReact.Form>
    	    
    	    
    	    <div className={photoClassName}>
    	       <label>{"该班级相册暂未上传照片，请跳转班级相册上传新照片"}</label>
    	       <AMR_ButtonToolbar>
			   <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.btn_classPhtotItem.bind(this)} >跳转班级相册</AMR_Button>
			   </AMR_ButtonToolbar>
			  </div>
			  
			  
		    <div className="am-comment-bd">
		     <Common_mg_Classnew_big_fn  imgsList={imgphotoList}  state={this.state}/>  
		    </div>
			    	
	    	<legend></legend> 
	    	<AMR_ButtonToolbar>
    		 <AMR_Button amStyle="default" onClick={this.pageClick.bind(this, "pre",imgphotoList)} >上一页</AMR_Button>
    		  <AMR_Button amStyle="default" disabled="false" >{"第"+obj.pageNo+"/"+number+"页"}</AMR_Button>
    		 <AMR_Button amStyle="default" onClick={this.pageClick.bind(this, "next",imgphotoList)} >下一页</AMR_Button>	
    		</AMR_ButtonToolbar>
    		
		    <div id="abc">				    
  			 <AMR_ButtonToolbar>
			  <AMR_Button amSize="xs"  amStyle="secondary" onClick={this.handleClick_selectbtn.bind(this,obj)} >确认照片选择</AMR_Button>
			 </AMR_ButtonToolbar>
  		    </div>

		   </div>
    );
  }
});
	return module;	
}();