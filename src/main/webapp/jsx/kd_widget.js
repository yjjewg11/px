//
var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;


//课程安排绘制
var ChooseClass_EventsTable = React.createClass({
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="cancel"){
				 w_ch_class.handleClick.bind(m);
				 return;
			 }
		 }
	  },
	  handleChange_selectgroup_uuid_chuser:function(val){
		  w_ch_class.reshowBygroup(val);
	  },
  render: function() {
	  var that=this;
    return (
    <div>
  <div className="header">
  <hr />
</div>
	  <div className="am-form-group">
	  <AMUIReact.Selected id="selectgroup_uuid_chuser" name="group_uuid" onChange={this.handleChange_selectgroup_uuid_chuser} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid?this.props.group_uuid:""} />      
    </div>
	  
      <AMUIReact_Table {...this.props}>  
        <thead> 
          <tr>
            <th>班级</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<ChooseClass_EventRow  event={event}   />);
          })}
        </tbody>
      </AMUIReact_Table>
      </div>
    );
  }
});
  //chooseClass 
/**
 * ajax_chooseClass_edit
 */

var ChooseClass_EventRow = React.createClass({ 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      <tr  className={className} onClick={w_ch_class.handleClick.bind(this,"choose",event.uuid)}>
        <td>{event.name}</td>
      </tr> 
    );
  }
}); 
//end chooseClass

    
    
//   chooseCook    
/**
 * ajax_chooseCook_edit
 */

var ChooseCook_Widget = React.createClass({
	handleClick: function(m) {
			 if(m=="cancel"){
				 w_ch_cook.handleClick(m);
				 return;
			 }
			 var uuids=null;
			 //list<cookbook>
			 var imgArr=[];
			 $($(".G_ch_cook_item_checked")).each(function(){
//					 if(uuids==null){
//						 uuids=this.title+"$"+this.children[0].name+"$"+this.children[1].title;
//					 }
//					 else{
//						 uuids+=','+this.title+"$"+this.children[0].name+"$"+this.children[1].title;; 
//					 }
					 var tmpO={};
					 tmpO.uuid=this.title;
					 tmpO.img=this.children[0].src;
					 tmpO.name=this.children[1].title;
					 imgArr.push(tmpO);
				});
			 w_ch_cook.handleClick(m,imgArr);
	  },
	  activeTabKey:"1",
	  activeTabSelect: function(key) {
		  this.activeTabKey=key;
		  $.AMUI.store.set("ChooseCook_select_mygroup", key);
		  var that=this;
		    var divid="ChooseCook_EventRow_div_"+key;
		    React.render(React.createElement(ChooseCook_EventRow, {type:key,checkeduuids:that.props.checkeduuids}),document.getElementById(divid));  	
	},
	componentDidMount: function() {
		this.activeTabSelect("1");
		  var sel1=$.AMUI.store.get("ChooseCook_select_mygroup");
		  	if(!sel1)sel1="1";
		this.handleChange_select_mygroup(sel1);
	},
	handleChange_select_mygroup: function(key) {
		  $.AMUI.store.set("ChooseCook_select_mygroup", key);
		  if(key=="1")
    		w_ch_cookAddImg.groupuuid= w_ch_cook.groupuuid;
		  else{
			  w_ch_cookAddImg.groupuuid=null;
		  }
		  
		  
		  this.activeTabSelect(this.activeTabKey);
		  
	  },
		  select_mygroup_data:  [
		   {value: '1', label: '只显示本校上传'},
		   {value: '2', label: '显示所有'}
		 ],
  render: function() {
	  var that=this;
	  if(!this.props.events)this.props.events=[];
	  var sel1=$.AMUI.store.get("ChooseCook_select_mygroup");
  	if(!sel1)sel1="1";
    return (
    	
	 <div>
	    <AMUIReact_ButtonToolbar>
	   
	    <AMUIReact_Button amStyle="primary" onClick={this.handleClick.bind(this, "ok")} >确认</AMUIReact_Button>
	    <AMUIReact_Button amStyle="danger" onClick={this.handleClick.bind(this, "cancel")} >取消</AMUIReact_Button>
	  </AMUIReact_ButtonToolbar>
	  <AMUIReact.Selected className="am-margin-left-xs" id="ChooseCook_Widget_select_mygroup" name="group_uuid" onChange={this.handleChange_select_mygroup} btnWidth="200"  multiple= {false} data={this.select_mygroup_data} btnStyle="primary" value={sel1} />      
	  
	 
	 <AMUIReact.Tabs defaultActiveKey="1" justify  onSelect={this.activeTabSelect}>
	 
	    <AMUIReact.Tabs.Item eventKey="1" title="主食">
	    <div id="ChooseCook_EventRow_div_1"></div>
	    </AMUIReact.Tabs.Item>
	    <AMUIReact.Tabs.Item eventKey="2" title="汤粥">
	    <div id="ChooseCook_EventRow_div_2"></div>
	    </AMUIReact.Tabs.Item>
	    <AMUIReact.Tabs.Item eventKey="3" title="炒菜">
	    <div id="ChooseCook_EventRow_div_3"></div>
	    </AMUIReact.Tabs.Item>
	    <AMUIReact.Tabs.Item eventKey="4" title="水果">
	    <div id="ChooseCook_EventRow_div_4"></div>
	    </AMUIReact.Tabs.Item>
	      <AMUIReact.Tabs.Item eventKey="5" title="其他">
	      <div id="ChooseCook_EventRow_div_5"></div>
	    </AMUIReact.Tabs.Item>
	  </AMUIReact.Tabs>
	</div>
  )}		  
});
    var ChooseCook_EventRow = React.createClass({
    	div_onClick:function(trid){
    		var tr=$("#"+trid);
    		
    		if(tr.attr("class").indexOf("G_ch_cook_item_checked")>=0){ 
    			tr.removeClass("G_ch_cook_item_checked");
    			//tr.addClass("G_ch_cook_item");
			}else{ 
//				tr.removeClass("G_ch_cook_item");
				tr.addClass("G_ch_cook_item_checked");
			} 
    	},
    	callbackFN:function(){
			this.ajax_chooseCook_list(this.props.type);
			var lists=Store.getChooseCook(this.props.type+w_ch_cookAddImg.groupuuid);
			this.setState({
	            items:lists
	        });
    	},
    	 getInitialState: function() {
    		    return {
    	            items:[]
    	        };
    		  },
    		  refresh_data: function(nextProps) {
    				var	tmptype=nextProps.type+w_ch_cookAddImg.groupuuid;
    	    		var lists=Store.getChooseCook(tmptype);
    	    		if(!lists){
    	    			this.ajax_chooseCook_list(nextProps.type);
    	    			lists=Store.getChooseCook(tmptype);
    	    		}
    	    	
    	    	       this.setState({
    	    	            items:lists
    	    	        });
    			},
    		  
    		  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
    		  componentWillReceiveProps: function(nextProps) {
    			  this.refresh_data(nextProps);
    			},
    	componentDidMount: function() {
    		 this.refresh_data(this.props);
    	
    	  },    	  
    	  ajax_chooseCook_list:function(type){
    			$.AMUI.progress.start();
    			
    			
    			var url = hostUrl + "rest/cookbook/list.json";
    			$.ajax({
    				type : "GET",
    				url : url,
    				async: false,
    				data : {type:type,groupuuid:w_ch_cookAddImg.groupuuid},
    				dataType : "json",
    				success : function(data) {
    					$.AMUI.progress.done();
    					if (data.ResMsg.status == "success") {
    						tmptype=type;
    			    		tmptype=type+w_ch_cookAddImg.groupuuid;
    						Store.setChooseCook(tmptype,data.list);
    						
    					} else {
    						alert(data.ResMsg.message);
    						G_resMsg_filter(data.ResMsg);
    					}
    				},
    				error : G_ajax_error_fn
    			});
    		},
    		
    		deleteImg:function(divid,uuid){
    			

    			if(!confirm("确定要删除吗?")){
    				return;
    			}
    		  	$.AMUI.progress.start();
    		      var url = hostUrl + "rest/cookbook/delete.json?uuid="+uuid;
    			$.ajax({
    				type : "POST",
    				url : url,
    				dataType : "json",
    				 async: true,
    				success : function(data) {
    					$.AMUI.progress.done();
    					// 登陆成功直接进入主页
    					if (data.ResMsg.status == "success") {
    						G_msg_pop(data.ResMsg.message);
    						$("#"+divid).hide();
    					
    					} else {
    						alert(data.ResMsg.message);
    					}
    				},
    				error :G_ajax_error_fn
    			});
    			
    			
    		},
    	  render: function() {
    		var that=this;
      	 var event = this.props.event;
      	 var delDiv=null;
      	
    	    return (
    	    		  <div id={"div_cook_"+this.props.type}>
    	    		  {
     	    			 this.state.items.map(function(event) {
     	    				  var is_Checked=false;
     	    		    		if(that.props.checkeduuids)is_Checked=that.props.checkeduuids.indexOf(event.uuid)>-1;
     	    		      	    var className = is_Checked ? 'G_ch_cook_item_checked' :'';
     	    		      	    
     	    		      	 if(w_ch_cookAddImg.groupuuid){
     	    		      		delDiv=
     	    		         		 (
     	    		         				 
     	    		         				 <div className="G_cookplan_Img_close"  onClick={that.deleteImg.bind(that,"divCookItem_"+event.uuid,event.uuid)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
     	    		          		);
     	    		      	 }
     	    		      	 
     	 	            return (
     	 	            		<div id={"divCookItem_"+event.uuid} title={event.uuid} className={"G_ch_cook_item "+className} onClick={that.div_onClick.bind(this,"divCookItem_"+event.uuid)}>
 		    	 	       			<img  src={G_imgPath+event.img} name={event.img} alt="图片不存在" title={event.name} />
 		    	 	       		{delDiv}
 		    	 	       			<span title={event.name}>{event.name}</span>
 		    	 	       		</div>		
     	 	            	);
     	 	          })
     	 	          }

    	    		
    			      <div id={"divCookItem_add"} className="G_ch_cook_item" onClick={w_ch_cook.add_img.bind(this,that.props.type,that.callbackFN)}>
    					<img src={hostUrl+"i/addCook.gif"} alt="本地上传" />
    				</div>
    	      </div>
    	    		
    		
    	  )}
    	});
//end chooseCook    
    

  //add cook img
var Upload_cookImg_options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: ''
    };
var Upload_cookImg = React.createClass({
       	handleClick: function(m) {
       		w_ch_cookAddImg.handleClick(m);
       	  },
       	upload_file_onChange:function(){
       	  var reader = new FileReader();
          reader.onload = function(e) {
        	  Upload_cookImg_options.imgSrc = e.target.result;
              w_ch_cookAddImg.cropper = $('#upload_file_imageBox').cropbox(Upload_cookImg_options);
          }
          reader.readAsDataURL(this.files[0]);
          this.files = [];
       	},
       	btnZoomIn_onClick: function(){
       		if(w_ch_cookAddImg.cropper)w_ch_cookAddImg.cropper.zoomIn();
        },
        btnZoomOut_onClick: function(){
        	 if(w_ch_cookAddImg.cropper)w_ch_cookAddImg.cropper.zoomOut();
       },
       btnRotate_onClick: function(){
      	 if(w_ch_cookAddImg.cropper)w_ch_cookAddImg.cropper.chRotate();
     },
       btnCrop_onClick: function(){
    	   var img = w_ch_cookAddImg.cropper.getDataURL();
    	   w_ch_cookAddImg.base64=img;
           $('#upload_file_imageBox_cropped').html('<img src="'+img+'">');
	   },
	   
       	 componentDidMount:function(){
           $('#upload_imgfile').on('change', function(){
               var reader = new FileReader();
               reader.onload = function(e) {
            	   Upload_cookImg_options.imgSrc = e.target.result;
            	   w_ch_cookAddImg.cropper = $('.imageBox').cropbox(Upload_cookImg_options);
               }
               reader.readAsDataURL(this.files[0]);
               this.files = [];
           })
    
             
   	  },
         render: function() {
        	 var spinner_divStyle={
        			 display: "none"
        	 };
           return (
           <div>
      	
         <div className="header">
         <div className="am-g">
           <h1>上传图片</h1>
         </div>
         <hr />
       </div>
       <div className="container">
   
	   	<div className="imageBox" id="upload_file_imageBox">
	   	    <div className="thumbBox"></div>
	   	    <div className="spinner"  style={spinner_divStyle}>加载中...</div>
	   	</div>
   	<div className="action">
   	    <input type="file" id="upload_imgfile" accept="image/*" />
   	 <AMUIReact_Button amStyle="warning"onClick={this.btnCrop_onClick} >剪切</AMUIReact_Button>
   	 <AMUIReact_Button amStyle="warning"onClick={this.btnZoomIn_onClick} >放大</AMUIReact_Button>
   	 <AMUIReact_Button amStyle="warning"onClick={this.btnZoomOut_onClick} >缩小</AMUIReact_Button>
   	</div>
   		<div className="cropped" id="upload_file_imageBox_cropped">
   	   	</div>
   	</div>
   	
  	
    <label htmlFor="cook_name">名称:</label>
     <input type="text" name="cook_name" id="cook_name" placeholder=""/>
     
     <br/>
    <AMUIReact_ButtonToolbar>
    <AMUIReact_Button amStyle="primary" onClick={this.handleClick.bind(this, "ok")} >确认</AMUIReact_Button>
    <AMUIReact_Button amStyle="danger" onClick={this.handleClick.bind(this, "cancel")} >取消</AMUIReact_Button>
  </AMUIReact_ButtonToolbar>
             </div>
           );
         }
});
           
           
    //end add cook img