var KDPhotoItem=function( ){
	var module={
			callback:null,
			ajax_uploadByphone(base64,total){
				try{
					if(total){
						G_img_number=parseInt(total);
					}
				}catch(e){
					
				}
				
				fpPhotoUploadTask.ajax_uploadByphone(base64);
			},
			//闭包方法入口
			query:function(groupuuid,classuuid,label){
				
				if(!label)label="";
				
				React.render(React.createElement(Query_photo_div,{
					groupuuid:groupuuid,
					label:label,
					classuuid:classuuid
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
var G_queryLabel_List=[];
var Query_photo_div =  React.createClass({ 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
 //数据初始化
	
	 getInitialState: function() {
		 
		 return this.getPropsState(this.props);
	 },
 getPropsState: function() {
	 
	 var groupuuid=this.props.groupuuid;
	 var classuuid=this.props.classuuid;
	 
		var G_photo_query_My_All_list=$.AMUI.store.get("G_photo_query_My_All_list");
		if(!G_photo_query_My_All_list)G_photo_query_My_All_list=1;
		var group_List=null;
		
		var classArry=null;

		if(!groupuuid){
			groupuuid=$.AMUI.store.get("G_photo_groupuuid");
		}
	
		if(G_photo_query_My_All_list==1){
			group_List=Store.getGroupNoGroup_wjd();
		
		}else{
			 group_List=Store.getGroup();
		
		}
		

		if(!groupuuid){
			groupuuid=group_List[0].uuid;
		}
		
		if(G_photo_query_My_All_list==1){
			
			classArry=Store.getMyByClassList(groupuuid);
		}else{
			
			classArry=Store.getChooseClass(groupuuid);
		}
		
		groupArry=G_selected_dataModelArray_byArray(group_List,"uuid","brand_name");
	
		classArry=G_selected_dataModelArray_byArray(classArry,"uuid","name")
		if(!classuuid){
			classuuid=$.AMUI.store.get("G_photo_classuuid");
		}
		if(!classuuid){
			if(!classArry||classArry.length==0){
				classuuid=null;
			}else{
				classuuid=classArry[0].uuid;
			}
		} 
		
		var label=this.props.label;
		if(!label)label="";
		else label+="";
	var queryForm={
			groupuuid:groupuuid,	
			label:label,
			classuuid:classuuid
	};
	var labelArry=this.query_Label(groupuuid,classuuid);
	

	 var obj= {
		query_My_All_list:G_photo_query_My_All_list,	 
		groupList:groupArry,	 
	    classList:classArry,	 
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
	
	 var labelArry=[];
	 if(!groupuuid){
		 groupuuid=this.props.groupuuid;
	 }
	 if(!classuuid){
		 classuuid=this.props.classuuid;
	 }	
	    //取出标签
		var url = hostUrl + "rest/kDPhotoItem/queryLabel.json";
		$.ajax({
			type : "GET",
			url : url,
			data : {group_uuid:groupuuid,class_uuid:classuuid},
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
componentWillReceiveProps:function(props){
	var obj=this.getPropsState(props);
	this.setState(obj);

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
	var re_data=ajax_list(this.classnewsreply_list_div+this.pageNo,this.state.queryForm,this.pageNo,this,callback);
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
//上传照片方法		
  handleClick: function(obj) {
		React.render(React.createElement(Img_photo_rect,{
			formdata:obj
			}), G_get_div_body());
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
	    
	    var G_photo_query_My_All_list=2;

	 $.AMUI.store.set("G_photo_query_My_All_list", G_photo_query_My_All_list);

	    this.state.pageNo=1;
	    this.state.groupList=groupArry;
	    this.state.classList=classArry;
	    this.state.queryForm.label="";
	    this.state.queryForm.groupuuid=group_uuid;
	    this.state.queryForm.classuuid=class_uuid;
		this.state.query_My_All_list=G_photo_query_My_All_list;		
		this.refresh_data();
		
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
	        var G_photo_query_My_All_list=1;

	 $.AMUI.store.set("G_photo_query_My_All_list", G_photo_query_My_All_list);
	    this.state.pageNo=1;
	    this.state.groupList=groupArry;
	    this.state.classList=classArry;
	    this.state.queryForm.label="";
	    this.state.queryForm.groupuuid=group_uuid;
	    this.state.queryForm.classuuid=class_uuid;
		this.state.query_My_All_list=G_photo_query_My_All_list;
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

		
		G_photo_groupuuid=val;
		 $.AMUI.store.set("G_photo_groupuuid", val);
		this.state.pageNo=1;
		this.state.queryForm.label="";
		this.state.queryForm.groupuuid=val;
		this.state.queryForm.classuuid=classuuid;
		this.state.classList=G_selected_dataModelArray_byArray(classArry,"uuid","name");
	    this.refresh_data();
  },
//班级切换方法		
  handleChange:function(val){
		
			 G_photo_classuuid=$("input[name='classuuid']").val();
	
		 $.AMUI.store.set("G_photo_classuuid", G_photo_classuuid);
        this.state.pageNo=1;
        this.state.queryForm.label="";
        this.state.queryForm.classuuid=val;
		this.refresh_data();		
  },  
//标签切换方法		
  handleChange_label:function(val){
		
		 G_photo_classuuid=$("input[name='classuuid']").val();
			
		 $.AMUI.store.set("G_photo_classuuid", G_photo_classuuid);

    var queryForm=$('#queryForm').serializeJson();
        this.state.pageNo=1;
		this.state.queryForm=queryForm;
		this.refresh_data();		
  },  
//精品相册方法	
  phtot_Click: function(obj) {
	  KDPhoto_play_move.queryForPayMove(obj); 
  },  
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
//query_My_All_list:1显示查询所有，2显示查询我的班级;	
//btn_query_My_className:	显示-查询所有按钮；
//btn_query_All_className:	显示-查询我的班级；
	
	var bgobj,label_obj,btn_query_My_className,btn_query_All_className;
	var Penthat=this;
	var queryForm=this.state.queryForm;
	var obj=this.state;
	var arry_label=[];

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
  return (			
		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">
		   <AMR_Panel>
		    <AMR_ButtonToolbar>
 		     <AMR_Button  amSize="xs"  amStyle="secondary" onClick={this.phtot_Click.bind(this,obj)} >精品相册</AMR_Button>
   		    </AMR_ButtonToolbar>
		   </AMR_Panel> 
		  
		  <AMR_Panel>
		   <AMR_ButtonToolbar>
    		 <AMR_Button  amSize="xs"  amStyle="secondary" onClick={this.handleClick.bind(this,obj)} >上传照片</AMR_Button>
    		 <AMR_Button className={btn_query_All_className} amStyle="secondary" onClick={this.All_group_class.bind(this)} >查询所有班级</AMR_Button>
    		 <AMR_Button className={btn_query_My_className} amStyle="secondary" onClick={this.My_group_class.bind(this)} >查询我的班级</AMR_Button>
    		</AMR_ButtonToolbar>
		  </AMR_Panel> 
		  <label>{"图片总数："+this.state.totalCount+"张"}</label>
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
	    
		  <div  id={this.classnewsreply_list_div} className="am-list-news-bd">		   		    
		  </div>
		  
		  <div className="am-list-news-ft">
		    <a className="am-list-news-more am-btn am-btn-default " id={this.load_more_btn_id} onClick={this.load_more_data.bind(this)}>查看更多 &raquo;</a>
		  </div>
		  
		  
		  
		</div>
		  
			
  );
}
});
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
//数据
 componentDidMount:function(){	  
     $('.am-gallery').pureview();
  },
	render: function() {	
	var bgobj,label_obj;
	var imgarry=this.state.data;
	var imgphotoList=[];
	var arry_label=[];

	//imgphotoList绘制图片方法在用
//	for(var i=0;i<imgarry.length;i++){
//		 bgobj={path:null,uuid:null,label:null};
//		 bgobj.path=imgarry[i].path;
//		 bgobj.uuid=imgarry[i].uuid;
//		 bgobj.label=imgarry[i].label;
//		 imgphotoList.push(bgobj);
//	    }

	    return (    		
		    <div className="am-comment-bd">
		     <Common_mg_Class_big_fn  imgsList={imgarry}  Penthat={this.props.Propsthat} />  
		    </div>
	    );
	  }
	});

/*
 * 对单张图片的处理方法;
 * */		
var  Common_mg_Class_big_fn  = React.createClass({
 handleClick: function(Obj,KDitemthis) {

		if(!confirm("确定要删除吗?")){
			return;
		}
		var uuid=Obj.uuid;
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
					//$('#Common_mg_Class_big_fn_item_'+uuid).hide();
					 KDitemthis.refresh_data();
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
			  if (!this.props.imgsList){
				  return;
			  };  
return (
   <div>
	<ul  className="am-gallery am-avg-sm-4 am-avg-md-6 am-avg-lg-12 am-gallery-imgbordered">
	   {this.props.imgsList.map(function(event) {
    	var  o = event.path;
    	var label_text = event.label;
    	var label_className="";
    	if(!label_text){
    		label_className="G_Edit_hide";
    	}
		var  imgArr=o?o.split("@"):"";
	 	if(o.btn_Letgo==false){
	  		
		   }else{
			buttion_LestGo_className="G_Edit_show";
		  }	
	return (
		 <li id={"Common_mg_Class_big_fn_item_"+ event.uuid} className="G_class_phtoto_Img G_ch_classNews_item">			     			
		  <div className="am-gallery-item">
			   <a href={imgArr[0]} title="">
			    <img src={o} alt=""  data-rel={imgArr[0]}/>
			    </a>
			    

			 
			    <span className={"G_class_phtoto_label "+label_className}>{label_text}</span>
		
				<div className="am-comment-actions">
					{event.create_user}|{GTimeShow.showByTime(event.create_time)}
				</div>
     	  </div>	 
		
      <div className="G_class_phtoto_Img_close"  onClick={that.handleClick.bind(this,event,KDitemthis)}>
       
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
 * 班级相册图片上传方法
 * */
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
			console.log("fpPhotoUploadTask.upload_files_arr",fpPhotoUploadTask.upload_files_arr)
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
				console.log("初始上传")
				G_img_Photo=0;
				G_img_number=0;
				progress_width=0;
			
				G_img_number=this.files.length;
				G_data=$('#KdPhotoForm').serializeJson();
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
						if(!G_img_Photo)G_img_Photo=0;
						G_img_Photo=G_img_Photo+1;
						
						var progress_width=Math.round(G_img_Photo/G_img_number*100);
						G_that.state.photoNum=G_img_Photo;
						G_that.state.photoAllNum=G_img_number;
						G_that.state.num=progress_width;
						G_that.state.btn_Letgo=true;
						G_that.setState(G_that.state);
						
						if(fpPhotoUploadTask.callbackFN){
							fpPhotoUploadTask.callbackFN(data.imgUrl,data.data.uuid);								
						} 							 

						fpPhotoUploadTask.do_lrz();						
					} else {
						if(G_num==3){
							G_num=0
							alert(data.ResMsg.message);
						}else{
							if(!confirm("上传失败确定重新上传吗?")){
								return;
						        	}
								G_num+=1
								fpPhotoUploadTask.ajax_uploadByphone(base64);
						}
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
G_data=[];
G_num=0;
var Img_photo_rect = React.createClass({
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
	module.query(o.queryForm.groupuuid,o.queryForm.classuuid,o.queryForm.label)
},	
imgDivNum:0,
getNewImgDiv:function(){
	  this.imgDivNum++;
	return "Classnews_edit_"+this.imgDivNum;  
},	  
addShowImg:function(url,uuid){
	  var divid=this.getNewImgDiv();
	  if(!document.getElementById(divid))return;
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

	G_that=this;

		var G_upload_img_Div=<AMR_Input type= "file" label="上传图片：" id="file_img_upload" accept="image/*" capture= "camera" multiple />
		if(window.JavaScriptCall&&window.JavaScriptCall.selectImgForCallBack){
			G_upload_img_Div=<AMR_Button    amStyle="primary"  id="file_img_upload" >上传图片</AMR_Button>
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
    		<div id="KdPhotoForm_list_div">
    		<div className="header">
    		  <hr />
    		</div>
  		    <div className="am-g">
      
    		  <form id="KdPhotoForm" method="post" className="am-form">

    		  <input type="hidden" name="group_uuid"  value={o.queryForm.groupuuid}/>
    		  <input type="hidden" name="class_uuid"  value={o.queryForm.classuuid}/> 
    		  <AMR_ButtonToolbar>
        		<div className="am-fl am-margin-left-sm am-margin-bottom-xs">
        		<AMUIReact.Selected id="label" name="label" placeholder="标签切换"  onChange={this.handleChange_label} btnWidth="200"  data={o.show_list} btnStyle="primary" value={o.queryForm.label} />    		            
        		 </div> 
      		    </AMR_ButtonToolbar>

  		        
  		      <label>{"标签："+o.queryForm.label}</label><br/> 
    		  </form>

      		  <label>{"学校："+groupName}</label><br/>
      		  <label>{"班级："+className}</label><br/>
    		  <label>{"图片上传进度:已完成"+o.photoNum+"/"+o.photoAllNum+"张"}</label>
    		  <div>
    		    <AMUIReact.Progress now={o.num} label={"已传"+o.photoNum+"张"} />
    		  </div>
    		    
    	
		      <div id="show_imgList"></div><br/>
		      <div className="cls"></div>
		      {G_upload_img_Div} 
		      <AMR_ButtonToolbar>
    		    <AMR_Button amSize="xs"   disabled={o.photoNum<o.photoAllNum}  amStyle="secondary" onClick={this.buttion_black_Click.bind(this,o)} >确认返回</AMR_Button>
    		    <AMR_Button amSize="xs"  disabled={o.photoNum<o.photoAllNum}   className={buttion_LestGo_className} amStyle="secondary" onClick={this.buttion_LestGo.bind(this)} >继续上传</AMR_Button>
    		  </AMR_ButtonToolbar>
    		    
    		    </div>
    	   </div>    	

    );
  }
});

//绘制上传照片后预览照片绘制
var KDphoto_Img_canDel = React.createClass({
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
      		<div  className="G_cookplan_Img" >
 	       			<img className="G_cookplan_Img_img"  src={this.props.url} alt="图片不存在" />
 	       			<div className="G_cookplan_Img_close"  onClick={this.deleteImg.bind(this,this.props.parentDivId,Photo_uuid)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
 	       		</div>		
      	)
  }
});




	return module;	
}();