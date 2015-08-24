var AMR_Table=AMUIReact.Table;
var AMR_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMR_Button=AMUIReact.Button;
var AMR_Sticky=AMUIReact.Sticky;
var AMR_Panel=AMUIReact.Panel;
var AMR_Gallery=AMUIReact.Gallery;
var AMR_Input=AMUIReact.Input;
var PxInput=AMUIReact.Input;

var G_upload_img_Div=<AMR_Input type= "file" label="上传图片" id="file_img_upload" help= "选择图片" accept="image/*" capture= "camera" />
if(window.JavaScriptCall){
	G_upload_img_Div=<AMR_Button amStyle="primary"  id="file_img_upload" round>上传图片</AMR_Button>
}
//userinfo
var Userinfo_EventRow = React.createClass({ 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      <tr className={className} >
      <td> 
      <input type="checkbox" value={event.uuid} alt={event.name} name="table_checkbox" />
      </td>
        <td>{event.loginname}</td>
        <td>{event.name}</td>
        <td>{event.tel}</td>
        <td>{event.email}</td>
        <td>{event.sex=="0"?"男":"女"}</td>
        <td  className={"px_disable_"+event.disable}>{Vo.get("disable_"+event.disable)}</td>
        <td>{event.login_time}</td>
        <td>{event.create_time}</td>
      </tr> 
    );
  }
}); 
//——————————————————————————老师管理——————————————————————————
/*
 * 老师管理服务器请求后绘制处理方法；
 * @逻辑：如果点击的不是添加按钮，则先检查是否勾选选框再处理其他判断；
 * @btn_click_userinfo：判断后程序跳转至d_service做各个按钮的处理; 
 * @调用LIS.events.map方法循环绘制老师数组； 
 * @</select>下拉多选框;
 * */
var Userinfo_EventsTable = React.createClass({
	handleClick: function(m) {
		
		 if(m=="add"){
			 btn_click_userinfo(m,{group_uuid:this.props.group_uuid,office:"老师"},this.props.events.sex);
			 return;
		 }
		 var uuids=null;
		 var usernames=null;
		 $($("input[name='table_checkbox']")).each(function(){
			　if(this.checked){
				 if(uuids==null){
					 uuids=this.value;
					 usernames=this.alt;
				 }
				 else{
					 uuids+=','+this.value ;  
					 usernames+=','+this.alt;
				 };
			　};
			});
		  if(!uuids){
			  alert("请勾选复选框！");
			  return;
		  }
		  if(m=="getRole"){
			  if(!uuids&&uuids.indexOf(",")>-1){
					alert("只能选择一个！");
					return;
				};
		  }
		  btn_click_userinfo(m,uuids,usernames);
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  handleChange_selectgroup_uuid:function(val){
		  ajax_uesrinfo_listByGroup(val,$('#sutdent_name').val());
	  },
  render: function() {
    return (
    <div>
    <div className="header">
    <hr />
    </div>
    <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加</AMR_Button>
	    <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "enable")} round>启用</AMR_Button>
	    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "disable")} round>禁用</AMR_Button>
	    <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "getRole")} round>分配权限</AMR_Button>
	    <AMR_Button amStyle="revise" onClick={this.handleClick.bind(this, "edit")} round>修改</AMR_Button>
	    </AMR_ButtonToolbar>
	      <form id="editGroupForm" method="post" className="am-form">
	      <input type="text" name="sutdent_name" id="sutdent_name" size="1"    placeholder="教师姓名"/>	  
		  <button type="button"  onClick={this.handleChange_selectgroup_uuid}  className="am-btn am-btn-primary">搜索</button>	  	
		  </form>
	  <hr/>
	  <div className="am-form-group">
	  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />      

    </div>
	  
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
          	<th>  
            <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
            </th>
            <th>帐号</th>
            <th>姓名</th>
            <th>电话</th>
            <th>邮箱</th>
            <th>性别</th>
            <th>状态</th>
            <th>登录时间</th>
            <th>创建时间</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Userinfo_EventRow key={event.id} event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
});
/*
* 老师管理Button事件(添加和修改按钮绘制与标签事件处理)；
* @formdata:选中的老师对象；
* @m：是启用还是禁用功能；"add"-添加  "edit"-修改；
* */    
var Userinfo_edit = React.createClass({ 
	 getInitialState: function() {
			if(this.props.mygroup_uuids)this.props.formdata.group_uuid=this.props.mygroup_uuids;
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editUserinfoForm').serializeJson());
	  },
	  handleChange_Selected: function(event) {
			 $('#group_uuid').val(event);
			    this.setState($('#editUserinfoForm').serializeJson());
		  },
  render: function() {
	  var o = this.state;
	  var passwordDiv=null;
	  if(!o.uuid){
		  passwordDiv=(
				  <div>
				  <label htmlFor="password">密码:</label>
    		      <PxInput  icon="lock" type="password" name="password" id="password" value={o.password} onChange={this.handleChange} />
    		      <br/>
    		      
    		      <label htmlFor="password1">重复密码:</label>
    		      <PxInput  icon="lock" type="password" name="password1" id="password1" value={o.password1} onChange={this.handleChange}/>
    		      <br/>
				  </div>
				  );
	  }
    return (
    		<div>
    		<div className="header">

    		  <hr />
    		</div>
    		<div className="am-g">
    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    		  <form id="editUserinfoForm" method="post" className="am-form">
    			<input type="hidden" name="uuid"  value={o.uuid}/>
    		     <input type="hidden" name="type"  value="1"/>
    			 <input type="hidden" id="group_uuid" name="group_uuid"  value=""/>
    		    <div className="am-form-group">
    		    <AMUIReact.Selected name="group_uuid" onChange={this.handleChange_Selected} btnWidth="300"  multiple= {true} data={this.props.select_group_list} btnStyle="primary" value={o.group_uuid} />
    		        </div>
    		      <label htmlFor="tel">手机号码:</label>
    		      <PxInput  icon="mobile" type="text" name="tel" id="tel" value={o.tel} onChange={this.handleChange} placeholder=""/>
    		      <br/>
    		      <label htmlFor="name">姓名:</label>
    		      <PxInput icon="user" type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
    		      <br/>
    		      <AMUIReact.FormGroup>
    		      <label>单选：</label>
    		      <AMUIReact.Input type="radio" name="sex" value="0" label="男" inline onChange={this.handleChange} checked={o.sex==0?"checked":""}  />
    		      <AMUIReact.Input type="radio" name="sex" value="1" label="女" inline onChange={this.handleChange} checked={o.sex==1?"checked":""}  />
    		      </AMUIReact.FormGroup>
    		       <label htmlFor="">Email:</label>
    		      <PxInput icon="envelope" type="email" name="email" id="email" value={o.email} onChange={this.handleChange} placeholder="输入邮箱" placeholder=""/>
    		      <br/>
    		      {passwordDiv}
    		      <label htmlFor="office">职位:</label>
    		      <input type="text" name="office" id="office" value={o.office} onChange={this.handleChange}/>
    		      <br/>
    		      <button type="button"  onClick={ajax_userinfo_saveByAdmin}  className="am-btn am-btn-primary">提交</button>
    		    </form>

    	     </div>
    	   </div>
    	   
    	   </div>
    );
  }
}); 

//分配权限 ;
var Userinfo_getRole = React.createClass({ 
	
	render: function() {
		  var o = this.props.formdata;
	  return (
	  		<div>
		  		<div className="header">
		  		 <hr />
		  		</div>
	  			<button type="button"  onClick={btn_ajax_updateRole.bind(this, o.useruuid)}  className="am-btn am-btn-primary">提交</button>
		  		<UserChooseRole_EventsTable {...this.props}/>
		  	   
	  	   </div>
	  );
	}
	}); 




//修改密码
var Div_userinfo_updatepassword = React.createClass({ 	
	render: function() {
	return (
		<div>
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		    <form id="commonform" method="post" className="am-form">

		      <label htmlFor="oldpassword">当前密码:</label>
		      <PxInput  icon="lock" type="password" name="oldpassword"  />
		      <br/>
		      <label htmlFor="password">密码:</label>
		      <PxInput  icon="lock" type="password" name="password"   />
		      <br/>
		      
		      <label htmlFor="password1">重复密码:</label>
		      <PxInput  icon="lock" type="password" name="password1"  />
		      <br/>
		      <button type="button" onClick={ajax_userinfo_updatepassword} className="am-btn am-btn-primary">提交</button>
		    </form>
		    <hr/>
		  
		  </div>
		</div>
		</div>
	);
	}
}); 


////修改资料
var Div_userinfo_update = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#commonform').serializeJson());
	  },
	 handle_uploadHeader: function(event) {
			w_uploadImg.open(function(url){
				$("#img").val(url);
				 $("#img_head_image").attr("src",url); 
				 G_img_down404("#img_head_image");
			},1);
	  },
	  componentDidMount:function(){
		  var imgGuid=this.state.img;
		 if(imgGuid){
			 $("#img_head_image").attr("src",imgGuid); 
			 G_img_down404("#img_head_image");
		 }

	  },
	render: function() {
		 var o = this.state;
	return (
		<div>
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		  
		    <form id="commonform" method="post" className="am-form">
			<input type="hidden" name="img" id="img" value={o.img} onChange={this.handleChange}/>
		    <label htmlFor="nickname">头像:</label>
 		    <AMUIReact.Image  id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>
 		
 		   <button type="button"  onClick={this.handle_uploadHeader}  className="am-btn am-btn-primary">上传头像</button>
 		   <br/>
		      <label htmlFor="name">姓名:</label>
		      <PxInput icon="user" type="text" name="name" id="name"  value={o.name} onChange={this.handleChange}  placeholder="必填，不超过15位"/>
		      <br/>
		       <label htmlFor="">Email:</label>
		      <PxInput icon="envelope" type="email" name="email" id="email"  value={o.email} onChange={this.handleChange}  placeholder="输入邮箱" />
		      <br/>
		      <label >性别:</label>
		      <div className="am-form-group">
		      <AMUIReact.UCheck type="radio" name="sex" label="男" value="0" inline defaultChecked checked={o.sex==0}   onChange={this.handleChange} />
		      <AMUIReact.UCheck type="radio" name="sex" label="女" value="1" inline checked={o.sex==1} onChange={this.handleChange}/>
		      </div>
		      <br/>
		      <label htmlFor="office">职位:</label>
		      <input type="text" name="office" id="office" value={o.office} onChange={this.handleChange}  placeholder="必填，不超过15位"/>
		      <br/>
		      <button type="button" onClick={ajax_userinfo_update} className="am-btn am-btn-primary">提交</button>
		    </form>
		    <hr/>
		  
		  </div>
		</div>
		</div>
	);
	}
}); 

//userinfo update end

//role
var UserChooseRole_EventRow = React.createClass({ 
	tr_onClick:function(trid,cbid){
		var cbox=$("#"+cbid);
		var tr=$("#"+trid);
		if(cbox.prop("checked")){
			cbox.prop("checked",false); 
			$(tr).removeClass("am-active");
		}else{
			cbox.prop("checked", true); 
			$(tr).addClass("am-active");
		}
	},
  render: function() {
    var event = this.props.event;
    var is_Checked=this.props.chooselist&&this.props.chooselist.indexOf(event.uuid)>-1;
    var className = is_Checked ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
		 <tr name="table_tr_checkbox" name="table_tr_checkbox"  id={"tr_chright_"+event.uuid} className={className} onClick={this.tr_onClick.bind(this,"tr_chright_"+event.uuid,"tb_cbox__chright"+event.uuid)}>
	      <td> 
	      <input type="checkbox" alt={event.name} value={event.uuid} id={"tb_cbox__chright"+event.uuid} name="table_checkbox" checked={is_Checked?"checked":""} />
	      </td>
    <td>{event.name}</td>
    <td>{event.description}</td>
    <td>{Vo.type(event.type)}</td>
  </tr> 
);
}
}); 

var UserChooseRole_EventsTable = React.createClass({
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
		  if( $("#id_checkbox_all")[0].checked){
			  $('tr[name="table_tr_checkbox"]').addClass("am-active");
		  }else{
			  $('tr[name="table_tr_checkbox"]').removeClass("am-active");
		  }
	  },
render: function() {
	  var that=this;
return (
<div>

  <AMUIReact.Table {...this.props}>  
    <thead> 
      <tr>
      	<th>  
        <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
        </th>
        <th>名称</th>
        <th>描述</th>
        <th>类型</th>
      </tr> 
    </thead>
    <tbody>
      {this.props.events.map(function(event) {
        return (<UserChooseRole_EventRow  chooselist={that.props.chooselist} event={event} />);
      })}
    </tbody>
  </AMUIReact.Table>
  </div>
);
}
});
//end Userinfo_getRole



//Div_userinfo_updatePasswordBySms
var Div_userinfo_updatePasswordBySms = React.createClass({ 
	
	render: function() {
	return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>重置密码</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		    <form id="commonform" method="post" className="am-form">

		    <label htmlFor="tel">手机号码:</label>
		      <input type="text" name="tel" id="tel"  placeholder=""/>
		      <button type="button" onClick={ajax_sms_sendCode_byReset} className="am-btn am-btn-primary">发送验证码</button>
		      <br/>
		      <label htmlFor="smscode">验证码:</label>
		      <input type="text" name="smscode" id="smscode"  placeholder=""/>
		    
		      <br/>
		      <label htmlFor="password">密码:</label>
		      <input type="password" name="password"   />
		      <br/>
		      
		      <label htmlFor="password1">重复密码:</label>
		      <input type="password" name="password1"  />
		      <br/>
		      <button type="button" onClick={ajax_userinfo_updatePasswordBySms} className="am-btn am-btn-primary">提交</button>
		      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>
		    </form>
		    <hr/>
		  
		  </div>
		</div>
		</div>
	);
	}
}); 



//upload headImg
var Upload_headImg_options =
{
    thumbBox: '.thumbBox',
    spinner: '.spinner',
    imgSrc: ''
};
var Upload_headImg = React.createClass({
   	handleClick: function(m) {
   		w_uploadImg.handleClick(m);
   	  },
   	upload_file_onChange:function(){
   	  var reader = new FileReader();
      reader.onload = function(e) {
    	  Upload_headImg_options.imgSrc = e.target.result;
          w_uploadImg.cropper = $('#upload_file_imageBox').cropbox(Upload_headImg_options);
      }
      reader.readAsDataURL(this.files[0]);
      this.files = [];
   	},
   	btnZoomIn_onClick: function(){
   		if(w_uploadImg.cropper)w_uploadImg.cropper.zoomIn();
    },
    btnZoomOut_onClick: function(){
    	 if(w_uploadImg.cropper)w_uploadImg.cropper.zoomOut();
   },
   btnRotate_onClick: function(){
    	 if(w_uploadImg.cropper)w_uploadImg.cropper.chRotate();
   },
   btnCrop_onClick: function(){
	   var img = w_uploadImg.cropper.getDataURL();
	   w_uploadImg.base64=img;
       $('#upload_file_imageBox_cropped').html('<img src="'+img+'">');
   },
   	 componentDidMount:function(){
       $('#upload_imgfile').on('change', function(){
           var reader = new FileReader();
           reader.onload = function(e) {
        	   Upload_headImg_options.imgSrc = e.target.result;
        	   w_uploadImg.cropper = $('.imageBox').cropbox(Upload_headImg_options);
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
	 <AMUIReact_Button amStyle="warning"onClick={this.btnCrop_onClick} round>剪切</AMUIReact_Button>
	 <AMUIReact_Button amStyle="warning"onClick={this.btnZoomIn_onClick} round>放大</AMUIReact_Button>
	 <AMUIReact_Button amStyle="warning"onClick={this.btnZoomOut_onClick} round>缩小</AMUIReact_Button>

	</div>
		<div className="cropped" id="upload_file_imageBox_cropped">
	   	</div>
	</div>

<AMUIReact_ButtonToolbar>
<AMUIReact_Button amStyle="primary" onClick={this.handleClick.bind(this, "ok")} round>确认</AMUIReact_Button>
<AMUIReact_Button amStyle="danger" onClick={this.handleClick.bind(this, "cancel")} round>取消</AMUIReact_Button>
</AMUIReact_ButtonToolbar>
         </div>
       );
     }
});
       
       
//点赞模板2,点赞显示与点赞按钮分离,传入点赞按钮id
/*
 * 
 * 
 *@bind（this）方法中This代表对象前一步函数构造成对象传过来; 
 **/
var Common_Dianzan_show_noAction = React.createClass({ 
	obj:null,
	 componentDidMount:function(){
		 var that=this;
		 //根据绑定的点赞按钮,设置对应状态,和绑定点击事件.
		if(!that.obj.canDianzan)$("#"+this.props.btn_dianzan).addClass("px-icon-hasdianzan");
		$("#"+this.props.btn_dianzan).bind("click",function(){
			var canDianzan=$("#"+that.props.btn_dianzan).hasClass("px-icon-hasdianzan")==false;
			common_ajax_dianzan_save(that.props.uuid,that.props.type,canDianzan,that.dianzansave_callback);
		});
				
			
	 },
	 dianzansave_callback:function(canDianzan){
		 if(canDianzan)$("#"+this.props.btn_dianzan).addClass("px-icon-hasdianzan");
		 else $("#"+this.props.btn_dianzan).removeClass("px-icon-hasdianzan");
		 this.forceUpdate();
	 },
render: function() {	
	 var dianzanObject=commons_ajax_dianzan_getByNewsuuid(this.props.uuid);
	 this.obj=dianzanObject;
	 var showStr="";
	 if(dianzanObject.names){
		 showStr=dianzanObject.names+",等一共"+dianzanObject.count+"人点赞";		   
	 }
  return (
		   <div id="dianzan" className="am-margin-left-sm" >
		   		{showStr} 
		   </div>


  );
}
}); 

/*
 * 图片绘制公共模板（点击可看原图）
 * */
var  Common_mg_big_fn  = React.createClass({

  render: function() {
			  if (!this.props.imgsList){
				  return;
			  };		  		   
			    return (
		      <div>
		      <ul data-am-widget="gallery" className="am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered" data-am-gallery="{pureview:{target: 'a'}}">
			   
			    {this.props.imgsList.map(function(event) {
			    	 var  o = event;
					  var  imgArr=o.split("@");
			        return (
			       	  <li>			     			
			     	    <div className="am-gallery-item">
			     		  <a href={imgArr[0]} title="">
			     		    <img src={o} alt=""  data-rel={imgArr[0]}/>
                          </a>
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
 * 图片绘制公共模板 绘制多张图片
 * */
var common_img_big_show = React.createClass({ 
	render: function() {		  
		  var  o = this.props.event;
		  var  imgArr=o.split("@");
		//  console.log("o-----",o,"   imgArr----",imgArr);
	  return (
	     <ul data-am-widget="gallery" className="am-gallery am-avg-sm-2 am-gallery-imgbordered" data-am-gallery="{pureview: 1}">
		   <li>
			 <div className="am-gallery-item">
		         <img src={o}
	             alt="" data-rel={imgArr[0]}/>
		     </div>
		   </li>
		 </ul>	   
	  );
	}
	}); 


var Common_Classnewsreply_listshow = React.createClass({ 	
render: function() {
  return (
		  <div>
		  {this.props.events.data.map(function(event) {
			  if(!event.create_img)event.create_img=G_def_headImgPath;
		      return (
		    		  <article className="am-comment am-comment-flip am-comment-success am-margin-xs">
		    		  <a href="javascript:void(0);">
		    		  <img src={event.create_img} className="am-comment-avatar" width="48" height="48"/>
		    		  </a>

		    		  <div className="am-comment-main am-comment-flip">
		    		    <header className="am-comment-hd">
		    		      <div className="am-comment-meta">
		    		      	<a href="#link-to-user" className="am-comment-author">{event.create_user}</a>|
		    		      		<time>{event.create_time}</time>
		    		      </div>
		    		    </header>
		    		    <div className="am-comment-bd am-comment-flip am-inline">
					        <div dangerouslySetInnerHTML={{__html:event.content}}></div>
			  		    </div>
		    			 
		    			 </div>
		    		</article>
		    		
		    		  )
		  })}
		
		    </div>		   
  );
}
}); 




//评论模板
var Common_reply_list = React.createClass({ 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"classnewsreply_list_div",
	componentWillReceiveProps:function(){
		this.load_more_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		var re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}		  
		  this.pageNo++;
	},
	refreshReplyList:function(){
		$("#"+this.classnewsreply_list_div).html("");
		this.pageNo=1;
		this.load_more_data();
	},

render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
	this.classnewsreply_list_div="classnewsreply_list_div"+this.props.uuid;
	var parentThis=this;
  return (
		  <div>
		  <div id={this.classnewsreply_list_div}></div>
		    <button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>
			 <Common_reply_save uuid={this.props.uuid}  type={this.props.type} parentThis={parentThis}/>			
			 
			 </div>
  );
}
}); 

//我要评论模块 
//that.refreshReplyList();自己写的一个刷新方法 置空一切到初始状态然后绘制;
var Common_reply_save = React.createClass({ 
	classnewsreply_list_div:"classnewsreply_list_div",
	reply_save_btn_click:function(){
		var that=this.props.parentThis;
		common_ajax_reply_save(function(){
			that.refreshReplyList();
		
		})
	},
	componentDidMount:function(){
		$( '#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);
	},
render: function() {
  return (
		   <form id="editClassnewsreplyForm" method="post" className="am-form">
			<input type="hidden" name="newsuuid"  value={this.props.uuid}/>
			<input type="hidden" name="uuid" />
			<input type="hidden" name="type"  value={this.props.uuid}/>
			
			
			<AMR_Input id="classnews_content_replay" type="textarea" rows="4" label="我要评论" placeholder="填写内容" name="content" />

			<button type="button"  onClick={this.reply_save_btn_click.bind(this)}  className="am-btn am-btn-primary">提交</button>
		      
		    </form>	   
  );
}
}); 


