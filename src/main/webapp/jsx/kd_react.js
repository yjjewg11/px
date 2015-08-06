
//
var AMR_Table=AMUIReact.Table;
var AMR_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMR_Button=AMUIReact.Button;
var AMR_Sticky=AMUIReact.Sticky;
var AMR_Panel=AMUIReact.Panel;
var AMR_Gallery=AMUIReact.Gallery;
var AMR_Input=AMUIReact.Input;
var Grid=AMUIReact.Grid;
var Col=AMUIReact.Col;
var PxInput=AMUIReact.Input;
var AMR_Span=AMUIReact.span;


//userinfo reg
var Div_userinfo_reg = React.createClass({ 
	
	render: function() {
	return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>老师注册</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		    <form id="regform" method="post" className="am-form">
		     <input type="hidden" name="type"  value="1"/>
		    <div className="am-form-group">
		    
		    <select id="reg_group_uuid" name="group_uuid" data-am-selected="{btnSize: 'lg'}" >
		      {this.props.group_list.map(function(event) {
		          return (<option value={event.uuid} >{event.brand_name}</option>);
		        })}
		      </select>
		        </div>
		      
		      <label htmlFor="tel">手机号码:</label>
		      <input type="text" name="tel" id="tel"  placeholder=""/>
		      <br/>
		      <label htmlFor="name">姓名:</label>
		      <input type="text" name="name" id="name"  placeholder="必填，不超过15位"/>
		      <br/>
		       <label htmlFor="">Email:</label>
		      <input type="email" name="email" id="email"  placeholder="输入邮箱" placeholder=""/>
		      <br/>
		      <label htmlFor="password">密码:</label>
		      <input type="password" name="password" id="password"  />
		      <br/>
		      
		      <label htmlFor="password1">重复密码:</label>
		      <input type="password" name="password1" id="password1" />
		      <br/>
		      <button type="button" onClick={ajax_userinfo_reg} className="am-btn am-btn-primary">注册</button>
		      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>
		    </form>
		    <hr/>
		  
		  </div>
		</div>
		</div>
	);
	}
}); 
//kd group reg
var Div_kd_group_reg = React.createClass({ 
	
	render: function() {
	return (
		<div>
			<div className="header">
			  <div className="am-g">
			    <h1>幼儿园注册</h1>
			  </div>
			  <hr/>
			</div>
			<div className="am-g">
			  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
			    <form id="kd_group_reg_form" method="post" className="am-form">
			    <input type="hidden" name="type"  value="1"/>
			      <label htmlFor="brand_name">品牌名:</label>
			      <input type="text" name="brand_name" id="brand_name"  placeholder="必填，不超过45位"/>
			      <br/>
			       <label htmlFor="company_name">机构全称:</label>
			      <input type="text" name="company_name" id="company_name"  placeholder="必填，不超过45位"/>
			      <br/>
			       <label htmlFor="address">公司地址:</label>
			      <input type="text" name="address" id="address"  placeholder="必填，不超过64位"/>
			      <br/>
			       <label htmlFor="map_point">地址坐标:</label>
			      <input type="text" name="map_point" id="map_point"  placeholder="拾取坐标后，复制到这里。格式：1.1,1.1" /> 
			      <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">坐标拾取</a>
			      <br/>
			       <label htmlFor="link_tel">公司电话:</label>
			      <input type="text" name="link_tel" id="link_tel"  placeholder=""/>
			      <br/>
			      
			      <legend><b>管理人员</b></legend>  
			     
			      <label htmlFor="tel">手机号码:</label>
			      <input type="text" name="tel" id="tel"  placeholder=""/>
			      <br/>
			      <label htmlFor="name">姓名:</label>
			      <input type="text" name="name" id="name"  placeholder="必填，不超过15位" />
			      <br/>
			       <label htmlFor="">Email:</label>
			      <input type="email" name="email" id="email"  placeholder="name@xx.com"/>
			      <br/>
			      <label htmlFor="password">密码:</label>
			      <input type="password" name="password" id="password"  />
			      <br/>
			      
			      <label htmlFor="password1">重复密码:</label>
			      <input type="password" name="password1" id="password1"  />
			      <br/>
			      <button type="button" onClick={ajax_kd_group_reg} className="am-btn am-btn-primary">注册</button>
			      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>
			     </form>
			    <hr/>
			  
			  </div>
			</div>
		</div>
	);
	}
}); 

//kd group reg end

//login   
var Div_login = React.createClass({ 
	 getInitialState: function() {
		    return this.props;
		  },
	 handleChange: function(event) {
		 var o=$('#login_form').serializeJson();
		 	o.pw_checked=$("#pw_checked").prop("checked")?"checked":"";
		    this.setState(o);
	  },
render: function() {
	  var o = this.state;
 return (
 		<div>
 		<div className="header">
 		  <div className="am-g">
 		 <h1>问界互动家园-幼儿园老师登录</h1>
 	    <p>WenJie Interactive Home <br/>快捷管理，大数据分析</p>
 		  </div>
 		  <hr />
 		</div>
 		<div className="am-g">
 		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
 		 <form id="login_form" method="post" className="am-form">
 	      <label htmlFor="loginname">手机号:</label>
 	      <input type="text" name="loginname" id="loginname" value={o.loginname} onChange={this.handleChange}/>
 	      <br/>
 	      <label htmlFor="password">密码:</label>
 	      <input type="password" name="password" id="password" value={o.password} onChange={this.handleChange}/>
 	      <br/>
 	      <label htmlFor="pw_checked">
 	        <input id="pw_checked" name="pw_checked" type="checkbox"  checked={o.pw_checked=="checked"?"checked":""} onChange={this.handleChange}/>
 	        记住密码
 	      </label>
 	      <br />
 	      <div className="am-cf">
 	        <input id="btn_login" onClick={ajax_userinfo_login} type="button" name="" value="登 录" className="am-btn am-btn-primary am-btn-sm am-fl" />
 	        <input type="button" onClick={menu_userinfo_updatePasswordBySms_fn} value="忘记密码 ^_^? " className="am-btn am-btn-default am-btn-sm am-fr" />
 	      </div>
 	      <a  href="javascript:void(0);"  onClick={menu_kd_group_reg_fn} >幼儿园注册</a>
 	      <br/>
 	    </form>
 	    <hr/>
 	   <p>© 2015 成都问界科技有限公司  | 蜀ICP备15021053号-1</p>
 	     </div> 
 	   </div>
 	   
 	   </div>
 );
}
}); 

//end login


//group
var Group_EventRow = React.createClass({ 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      <tr className={className} >
      <td > 
      <input type="checkbox" value={event.uuid} name="table_checkbox" />
      </td> 
      <td  ><a href="javascript:void(0);" onClick={btn_click_group.bind(this,"edit", event)}>{event.brand_name}</a></td>
        <td  >{event.company_name}</td>
        <td > {event.link_tel}</td>
        <td >{event.address}</td>
        <td >{event.create_time}</td>
      </tr> 
    );
  }
}); 

var Group_show = React.createClass({ 
render: function() {
	  var o = this.props.formdata;
  return (
		  <AMUIReact.Article
		    title={o.brand_name}
		    meta={o.company_name+" | "+o.link_tel+" | "+o.address+" | 阅读0次"}>
			<div dangerouslySetInnerHTML={{__html: o.description}}></div>
		   </AMUIReact.Article>	
		   
		   
  );
}
}); 

//end group





//class

var Class_EventRow = React.createClass({ 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    <tr className={className} >
    <td> 
    <input type="checkbox" value={event.uuid} name="table_checkbox" />
    </td>
      <td><a href="javascript:void(0);" onClick={react_ajax_class_students_manage.bind(this, event.uuid)}>{event.name}</a></td>
      <td>{event.createUser}</td>
      <td>{Store.getGroupNameByUuid(event.groupuuid)}</td>
      <td>{event.create_time}</td>
    </tr> 
  );
}
}); 
var Class_EventsTable = React.createClass({
render: function() {
  return (
  <div>
  <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add_class")} round>添加班级</AMR_Button>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "edit_class")} round>编辑</AMR_Button>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "graduate_class")} round>毕业</AMR_Button>
	  </AMR_ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
    <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'lg'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
    {this.props.group_list.map(function(event) {
        return (<option value={event.uuid} >{event.brand_name}</option>);
      })}
    </select>
  </div>
	  
    <AMR_Table {...this.props}>  
      <thead> 
        <tr>
        	<th>  
          <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
          </th>
          <th>班级</th>
          <th>创建人</th>
          <th>学校</th>
          <th>创建时间</th>
        </tr> 
      </thead>
      <tbody>
        {this.props.events.map(function(event) {
          return (<Class_EventRow key={event.id} event={event} />);
        })}
      </tbody>
    </AMR_Table>
    </div>
  );
},
handleClick: function(m) {
	 if(this.props.handleClick){
		 
		 if(m=="add_class"){
			 this.props.handleClick(m,$('#selectgroup_uuid').val());
			 return;
		 }
		 var uuids=null;
		 $($("input[name='table_checkbox']")).each(function(){
			
			　if(this.checked){
				 if(uuids==null)uuids=this.value;
				 else
				　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
			　}
			});
		  if(!uuids){
			  alert("请勾选复选框！");
			  return;
		  }
		  
		 this.props.handleClick(m,$('#selectgroup_uuid').val(),uuids);
	 }
 },
 handleChange_checkbox_all:function(){
	  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
 },
 //
 handleChange_selectgroup_uuid:function(){
	  ajax_class_listByGroup($('#selectgroup_uuid').val());
 }
});
  
var Class_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editClassForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
  return (
  		<div>
  		<div className="header">
  		  <div className="am-g">
  		    <h1>编辑</h1>
  		  </div>
  		  <hr />
  		</div>
  		<div className="am-g">
  		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
  		  <form id="editClassForm" method="post" className="am-form">
  		<input type="hidden" name="uuid"  value={o.uuid}/>
  		     <input type="hidden" name="type"  value="1"/>
  		    <div className="am-form-group">
  		          <select id="groupuuid" name="groupuuid" data-am-selected="{btnSize: 'lg'}" value={o.groupuuid} onChange={this.handleChange}>
  		          {this.props.group_list.map(function(event) {
  		              return (<option value={event.uuid} >{event.brand_name}</option>);
  		            })}
  		          </select>
  		        </div>
  		    
  		      <label htmlFor="name">班级:</label>
  		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过45位！"/>
  		      <br/>
  		   
		      <label htmlFor="name">班主任:</label>
	  		    <input type="hidden" name="headTeacher" id="headTeacher" value={o.headTeacher} onChange={this.handleChange}/>
			      <input type="text"  id="headTeacher_name" value={o.headTeacher_name} onChange={this.handleChange} onClick={w_ch_user.open.bind(this,"headTeacher","headTeacher_name",$('#selectgroup_uuid').val())} placeholder=""/>
			      <br/>
			      <label htmlFor="name">其他老师:</label>
		  		    <input type="hidden" name="teacher" id="teacher" value={o.teacher} onChange={this.handleChange}/>
				      <input type="text"  id="teacher_name" value={o.teacher_name} onChange={this.handleChange}  onClick={w_ch_user.open.bind(this,"teacher","teacher_name",$('#selectgroup_uuid').val())} placeholder=""/>
				      <br/>
  		      <button type="button"  onClick={ajax_class_save}  className="am-btn am-btn-primary">提交</button>
  		    </form>

  	     </div> 
  	   </div>
  	   
  	   </div>
  );
}
}); 


var AMR_Grid=AMUIReact.Grid;
var AMR_Col=AMUIReact.Col;
var Class_students_manage = React.createClass({
	 componentDidMount:function(){
			 G_img_down404();

	  },
	render: function() {
		var o=this.props.formdata;
	  return (
	  <div>
	  <AMR_ButtonToolbar>
		    <AMR_Button amStyle="primary" onClick={class_students_manage_onClick.bind(this, "add",this.props.formdata.uuid)} round>添加学生</AMR_Button>
		  </AMR_ButtonToolbar>
		  <hr/>
		  <AMR_Panel>
			  <AMR_Grid className="doc-g">
			    <AMR_Col sm={4} > 班级:{o.name}</AMR_Col>
			    <AMR_Col sm={4} >班主任:{o.headTeacher_name}</AMR_Col>
			    <AMR_Col sm={4}>其他老师:{o.teacher_name}</AMR_Col>
			  </AMR_Grid>
		  </AMR_Panel>
		  <AMR_Gallery data={this.props.students}  sm={3} md={4} lg={6} />
	    </div>
	  );
	}
	});


//编辑学生信息
var Class_student_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editClassStudentForm').serializeJson());
	  },
	  componentDidMount:function(){
		  var imgGuid=this.state.headimg;
		 if(imgGuid){
			 $("#img_head_image").attr("src",G_imgPath+imgGuid); 
			 G_img_down404("#img_head_image");
		 }

	  },
render: function() {
	  var o = this.state;
 return (
 		<div>
 		<div className="header">
 		  <div className="am-g">
 		    <h1>学生编辑</h1>
 		  </div>
 		  <hr />
 		</div>
 		<div className="am-g">
 		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
 		  <form id="editClassStudentForm" method="post" className="am-form">
 		<input type="hidden" name="uuid"  value={o.uuid}/>
 		     <input type="hidden" name="classuuid"  value={o.classuuid}/>
 		<input type="hidden" name="headimg" id="headimg" value={o.headimg} onChange={this.handleChange}/>
 		      <label htmlFor="name">姓名:</label>
 		       <PxInput icon="user" type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder=""/>
 		       <br/>
 		       <label htmlFor="nickname">昵称:</label>
 		       <PxInput icon="user-secret" type="text" name="nickname" id="nickname" value={o.nickname} onChange={this.handleChange} placeholder=""/>
		       <br/>
		       <label htmlFor="nickname">头像:</label>
	 		   <AMUIReact.Image  id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>
	 		   <br/>
	 		   <button type="button"  onClick={btn_class_student_uploadHeadere}  className="am-btn am-btn-primary">上传头像</button>
			   <br/>
			      
		      <AMUIReact.FormGroup>
		      <label>单选：</label>
		      <AMUIReact.Input type="radio" name="sex" value="0" label="男" inline onChange={this.handleChange} checked={o.sex==0?"checked":""}  />
		      <AMUIReact.Input type="radio" name="sex" value="1" label="女" inline onChange={this.handleChange} checked={o.sex==1?"checked":""}  />
		      </AMUIReact.FormGroup>
		      
		      <label htmlFor="birthday">生日:</label>
			  <AMUIReact.DateTimeInput  icon="calendar" format="YYYY-MM-DD"  name="birthday" id="birthday" dateTime={o.birthday}    onChange={this.handleChange}/>
			  <br/>
			 
			  <label htmlFor="birthday">身份证:</label>
			  <input  type="text" name="idcard" id="idcard" value={o.idcard} onChange={this.handleChange} placeholder=""/>
		      <br/> 		    
		      
		      <fieldset>
		      <legend>爸爸妈妈信息</legend>
		      
		      <label htmlFor="nickname">妈妈姓名:</label>
 		      <PxInput icon="user" type="text"  name="ma_name" id="ma_name" size="10" maxLength="45" value={o.ma_name} onChange={this.handleChange} placeholder=""/>
 		      <br/>
 		      <label htmlFor="nickname">妈妈电话:</label>
		      <PxInput  icon="mobile" type="text" name="ma_tel" id="ma_tel" value={o.ma_tel} onChange={this.handleChange} placeholder=""/>
		      <br/>
		      <label htmlfor="nickname">妈妈的工作:</label>
 		      <input type="text" name="ma_work" id="ma_work" value={o.ma_work} onChange={this.handleChange} placeholder=""/>
 		      <br/>		      		      		     		       		      
 		      <label htmlfor="nickname">爸爸姓名:</label>
 		      <PxInput icon="user" type="text" name="ba_name" id="ba_name" size="10" maxLength="45"  value={o.ba_name} onChange={this.handleChange} placeholder=""/>
 		      <br/>
 		      <label htmlFor="nickname">爸爸电话:</label>
		      <PxInput icon="mobile" type="text" name="ba_tel" id="ba_tel" value={o.ba_tel} onChange={this.handleChange} placeholder=""/>
		      <br/> 		          
 		      <label htmlfor="nickname">爸爸的工作:</label>
 		      <input type="text" name="ba_work" id="ba_work" value={o.ba_work} onChange={this.handleChange} placeholder=""/>
 		      <br/>		     
 		      <label htmlfor="nickname">家庭住址:</label>
		      <PxInput icon="home" type="text" name="address" id="address" value={o.address} onChange={this.handleChange} placeholder=""/>
		      <br/>		
		      </fieldset>
		      <fieldset>
		      <legend>其他信息</legend>
		      <label htmlFor="nickname">奶奶电话:</label>
 		      <PxInput icon="mobile" type="text" name="nai_tel" id="nai_tel" value={o.nai_tel} onChange={this.handleChange} placeholder=""/>
 		      <br/>
 		      <label htmlFor="nickname">爷爷电话:</label>
		      <PxInput icon="mobile" type="text" name="ye_tel" id="ye_tel" value={o.ye_tel} onChange={this.handleChange} placeholder=""/>
		      <br/>
		      <label htmlFor="nickname">外婆电话:</label>
 		      <PxInput icon="mobile" type="text" name="waipo_tel" id="waipo_tel" value={o.waipo_tel} onChange={this.handleChange} placeholder=""/>
 		      <br/>
 		      <label htmlFor="nickname">外公电话:</label>
		      <PxInput icon="mobile" type="text" name="waigong_tel" id="waigong_tel" value={o.waigong_tel} onChange={this.handleChange} placeholder=""/>
		      <br/>
		      <label htmlFor="nickname">其他电话:</label>
		      <PxInput icon="phone" type="text" name="other_tel" id="other_tel" value={o.other_tel} onChange={this.handleChange} placeholder=""/>
		      <br/>
	 		   <AMUIReact.Input type="textarea"
		 	 	      label="说明"
		 	 	    	 name="note"
		 	 	      labelClassName="am-u-sm-2"
		 	 	      placeholder="备注"
		 	 	      wrapperClassName="am-u-sm-10"
		 	 	      amSize="lg" />
	 		  <br/>
	 		 </fieldset>
 		      <button type="button"  onClick={btn_ajax_class_student_save}  className="am-btn am-btn-primary">提交</button>
 		    </form>

 	     </div> 
 	   </div>
 	   
 	   </div>
 );
}
}); 

/*
* 我的班级（主页） show绘制2级界面班级选择绘制；
* @show老师查看状态进入查看学生详情;
* @Class_students_show（kd_service中服务器请求时调用）;
* */
var Class_students_show= React.createClass({
	 componentDidMount:function(){
			 G_img_down404();

	  },
	render: function() {
		var o=this.props.formdata;
	  return (
	  <div>
	 
		  <AMR_Panel>
			  <AMR_Grid className="doc-g">
			    <AMR_Col sm={4} > 班级:{o.name}</AMR_Col>
			    <AMR_Col sm={4} >班主任:{o.headTeacher_name}</AMR_Col>
			    <AMR_Col sm={4}>其他老师:{o.teacher_name}</AMR_Col>
			  </AMR_Grid>
		  </AMR_Panel>
		  <AMR_Gallery data={this.props.students}  sm={3} md={4} lg={6} />
	    </div>
	  );
	}
	});
/*班级管理中查看学生信息
 * Class_student_look_info@:此方法模板为单独查看每个学生详细信息但不能编辑；
 * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
 * 
 * */
var Class_student_look_info =React.createClass({
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editClassStudentForm').serializeJson());
	  },
	  componentDidMount:function(){
		  var imgGuid=this.state.headimg;
		 if(imgGuid){
			 $("#img_head_image").attr("src",G_imgPath+imgGuid); 
			 G_img_down404("#img_head_image");
		 }

	  },
		render: function() {
	     var o =this.state;
		 return (
		 		<div>
			    <AMUIReact.List static border striped>
			      <AMUIReact.ListItem>头像:</AMUIReact.ListItem>
				  <AMUIReact.Image  id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>
				  <br/>
			      <AMUIReact.ListItem icon="mobile">姓名:{o.name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>昵称:{o.nickname}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>性别:{Vo.get("sex_"+o.sex)}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>生日:{o.birthday}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>妈妈姓名:{o.ma_name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>妈妈电话:{o.ma_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>妈妈的工作:{o.ma_work}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸姓名:{o.ba_name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸的工作:{o.ba_work}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸电话:{o.ba_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>家庭住址:{o.address}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爷爷电话:{o.ye_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>奶奶电话:{o.nai_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>外公电话:{o.waigong_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>外婆电话:{o.waipo_tel}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>其他电话:{o.other_tel}</AMUIReact.ListItem>			      
			      <AMUIReact.ListItem>
			      <div dangerouslySetInnerHTML={{__html:G_textToHTML("说明:"+o.note)}}></div>
			      </AMUIReact.ListItem>			      
			      
			      </AMUIReact.List>
		 	     </div> 
		     );
	        }
		 });
//end class



//announcements
/**
* ajax_announcements_edit
*/

var Announcements_EventRow = React.createClass({ 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    <tr className={className} >
    <td> 
    <input type="checkbox" value={event.uuid} name="table_checkbox" />
    </td>
      <td><a  href="javascript:void(0);" onClick={react_ajax_announce_show.bind( this, event.uuid)}>{event.title}</a></td>
      <td>{Vo.announce_type(event.type)}</td>
      <td>{Store.getGroupNameByUuid(event.groupuuid)}</td>
      <td>{0}</td>
      <td>{event.create_user}</td>
      <td>{event.create_time}</td>
    </tr> 
  );
}
}); 

var Announcements_EventsTable = React.createClass({
	handleClick: function(m) {
			 if(m=="add"){
				 btn_click_announce(m,$('#selectgroup_uuid').val());
				 return;
			 }
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				　if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				　}
				});
			  if(!uuids){
				  alert("请勾选复选框！");
				  return;
			  }
			  btn_click_announce(m,$('#selectgroup_uuid').val(),uuids);
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_selectgroup_uuid:function(){
		  ajax_announce_listByGroup($('#selectgroup_uuid').val());
	  },
render: function() {
  return (
  <div>
  <div className="header">
	  <div className="am-g">
	    <h1>{Vo.announce_type(announce_types)}</h1>
	  </div>
	  <hr />
	</div>
  <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>创建</AMR_Button>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "edit")} round>编辑</AMR_Button>
	    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "del")} round>删除</AMR_Button>
	    </AMR_ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
    <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'lg'}" value={this.props.groupuuid} onChange={this.handleChange_selectgroup_uuid}>
    {this.props.group_list.map(function(event) {
        return (<option value={event.uuid} >{event.brand_name}</option>);
      })}
    </select>
  </div>
	  
    <AMR_Table {...this.props}>  
      <thead> 
        <tr>
        	<th>  
          <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
          </th>
          <th>标题</th>
          <th>类型</th>
          <th>幼儿园</th>
          <th>浏览次数</th>
          <th>创建人</th>
          <th>创建时间</th>
        </tr> 
      </thead>
      <tbody>
        {this.props.events.map(function(event) {
          return (<Announcements_EventRow key={event.id} event={event} />);
        })}
      </tbody>
    </AMR_Table>
    </div>
  );
}
});
  
  var Announcements_mylist_EventRow = React.createClass({ 
	  render: function() {
	    var event = this.props.event;
	    var className = event.highlight ? 'am-active' :
	      event.disabled ? 'am-disabled' : '';

	    return (
	      <tr className={className} >
	        <td><a  href="javascript:void(0);" onClick={react_ajax_announce_show.bind( this, event.uuid)}>{event.title}</a></td>
	        <td>{Vo.announce_type(event.type)}</td>
	        <td>{Store.getGroupNameByUuid(event.groupuuid)}</td>
	        <td>{0}</td>
	        <td>{event.create_user}</td>
	        <td>{event.create_time}</td>
	      </tr> 
	    );
	  }
	  });
  /*
   * （首页）公告功能绘制
   * 
   * */
  var Announcements_mylist_EventsTable = React.createClass({
  render: function() {
    return (
    <div>
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
            <th>标题</th>
            <th>类型</th>
            <th>幼儿园</th>
            <th>浏览次数</th>
            <th>创建人</th>
            <th>创建时间</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Announcements_mylist_EventRow  event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
  });
/*
 * 公告精品文章 添加等
 * @w_img_upload_nocut:上传图片后发的请求刷新;
 * */    
var Announcements_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editAnnouncementsForm').serializeJson());
	  },
	  componentDidMount:function(){
	  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
          w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                editor.pasteHTML( '<img  width="198" height="198" src="'+imgurl+'"/>')
          });
	  },
render: function() {
	  var o = this.state;
	  
	  var type_div;
	  if (announce_types==2) {
		  type_div= 
			   <div className="am-form-group" id="div_classuuids" >
		  		<input type="hidden" name="type"  value={o.type}/>
		  		<label htmlFor="tel">班级通知:</label>
		  		<input type="text" name="classuuids" id="classuuids" value={o.classuuids} onChange={this.handleChange} placeholder="班级通知，才填写"/>
  		     </div>;
	  } else {
		  type_div =
		  <input type="hidden" name="type"  value={o.type}/>
	  }
  return (
  		<div>
  		<div className="header">
  		  <div className="am-g">
  		    <h1>{Vo.announce_type(o.type)}-编辑</h1>
  		  </div>
  		  <hr />
  		</div>
  		<div className="am-g">
  		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
  		  <form id="editAnnouncementsForm" method="post" className="am-form">
  		<input type="hidden" name="uuid"  value={o.uuid}/>
  		<input type="hidden" name="isimportant"  value={o.isimportant}/>
  		
  		<div className="am-form-group">
  		          <select id="groupuuid" name="groupuuid" data-am-selected="{btnSize: 'lg'}" value={o.groupuuid} onChange={this.handleChange}>
  		          {this.props.group_list.map(function(event) {
  		              return (<option value={event.uuid} >{event.brand_name}</option>);
  		            })}
  		          </select>
  		        </div>
  		        
  		    {type_div}
  		    
  		      <label htmlFor="name">标题:</label>
  		      <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} maxlength="45"   placeholder="不超过45位"/>
  		      <br/>
  		    <AMR_Input id="announce_message" type="textarea" rows="10" label="内容:" placeholder="填写内容" name="message" value={o.message} onChange={this.handleChange}/>
 			{G_upload_img_Div} 
  		      <button type="button"  onClick={ajax_announcements_save}  className="am-btn am-btn-primary">提交</button>
  		    </form>

  	     </div>
  	   </div>
  	   
  	   </div>
  );
}
}); 




//主页公告添加模板
var Announcements_show = React.createClass({ 
render: function() {
	  var o = this.props.data;
  return (
		  <div>
		  <AMUIReact.Article
		    title={o.title}
		    meta={Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}>
			<div dangerouslySetInnerHTML={{__html: o.message}}></div>
		     </AMUIReact.Article>
			  <Common_Dianzan_show uuid={o.uuid} type={0} />
			  <Common_reply_list uuid={o.uuid}  type={0}/>
			  <Common_reply_save uuid={o.uuid}  type={0}/>
		   </div>
  );
}
}); 

//end announcements





//teachingplan
/**
* ajax_teachingplan_edit
*/

var Teachingplan_EventRow = React.createClass({ 
render: function() {
var event = this.props.event;
if(G_week.getWeekStr(event.plandate)==G_week.getWeekStr(new Date())){
	event.highlight=true;
}
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  <tr className={className} >
    <td><a href="javascript:void(0);" onClick={btn_click_teachingplan.bind( this, "edit",event.uuid)}>{G_week.getWeekStr(event.plandate)}</a></td>
    <td>{event.morning}</td>
    <td>{event.afternoon}</td>
  </tr> 
);
}
}); 

var Teachingplan_EventsTable = React.createClass({
	handleClick: function(m,uuid,classuuid) {
			 if(m=="add"){
				 btn_click_teachingplan(m,null,classuuid);
				 return;
			 }else if(m=="pre"){
				 ajax_teachingplan_listByClass(null,null,--g_cookbookPlan_week_point);
				 return;
			 }else if(m=="next"){
				 ajax_teachingplan_listByClass(null,null,++g_cookbookPlan_week_point);
				 return;
			 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  handleChange_selectgroup_uuid:function(){
		  ajax_announce_listByGroup($('#selectgroup_uuid').val());
	  },
render: function() {
return (
<div>
<div className="header">
	  <div className="am-g">
	  <h1>【{this.props.classname}】[{this.props.begDateStr} 到 {this.props.endDateStr}]</h1>
	  </div>
	  <hr />
	</div>
<AMR_ButtonToolbar>
	<AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add",null,this.props.classuuid)} round>添加</AMR_Button>
    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "pre")} round>上周</AMR_Button>
    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "next")} round>下周</AMR_Button>
    </AMR_ButtonToolbar>
	  <hr/>
  <AMR_Table {...this.props}>  
    <thead> 
      <tr>
      	<th>一周</th>
        <th>上午</th>
        <th>下午</th>
      </tr> 
    </thead>
    <tbody>
      {this.props.events.map(function(event) {
        return (<Teachingplan_EventRow  event={event} />);
      })}
    </tbody>
  </AMR_Table>
  </div>
);
}
});



/**
 * 显示每天的教学计划
 */
var Teachingplan_showByOneDay = React.createClass({ 
	handleClick: function(m) {
		if(m=="pre"){
			ajax_teachingplan_dayShow(--g_teachingplan_listToShow_point);
			 return;
		 }else if(m=="next"){
			 ajax_teachingplan_dayShow(++g_teachingplan_listToShow_point);
			 return;
		 }
	},
	componentDidMount: function() {
		  if(!this.props.formdata){
			  $("#div_detail").html("今日没有发布教学计划");
		  }
	    
	  },
	render: function() {
	  var o = this.props.formdata;
	  
	  if(!o){
		  o={};
	  }
	
	  return (
		<div>
		
		<div className="header">
		  <div className="am-g">
		  
		  <Grid>
		    <Col sm={3}>
		    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "pre")}  round>上一天</AMR_Button>
		    </Col>
		    <Col sm={6}>
		    <h1>课程安排-【{this.props.ch_class.name}】-{this.props.ch_day}</h1>
		    </Col>
		    <Col sm={3}>
		    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "next")} round>下一天</AMR_Button>	
		    </Col>
		  </Grid>
		  </div>
		  <hr />
		</div>
		<div className="am-g" id="div_detail">
		 <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		 <label>早上:</label> 
		 <div className="g_teachingplan">
			<div dangerouslySetInnerHTML={{__html:G_textToHTML(o.morning)}}></div>
		 </div>
		 <label>下午:</label> 
		 <div className="g_teachingplan">
			<div dangerouslySetInnerHTML={{__html:G_textToHTML(o.afternoon)}}></div>
		 </div>
		</div> 
		</div>
	   
	   </div>
);
}
}); 

var Teachingplan_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editTeachingplanForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
	
return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>某某班级课程1-编辑</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		  <form id="editTeachingplanForm" method="post" className="am-form">
		<input type="hidden" name="uuid"  value={o.uuid}/>
		<input type="hidden" name="classuuid"  value={o.classuuid}/>
		 <label htmlFor="name">日期:</label>
		 <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="plandateStr" id="plandateStr" dateTime={o.plandate}  onChange={this.handleChange}/>
		      <br/>
	    <AMR_Input id="morning"  name="morning" type="textarea" rows="2" label="早上:" placeholder="填写内容" value={o.morning} onChange={this.handleChange}/>
		<AMR_Input id="afternoon"  name="afternoon" type="textarea" rows="2" label="下午:" placeholder="填写内容" value={o.afternoon} onChange={this.handleChange}/>
		      <button type="button"  onClick={ajax_teachingplan_save}  className="am-btn am-btn-primary">提交</button>
	 </form>

	     </div>
	   </div>
	   
	   </div>
);
}
}); 

//end teachingplan




//cookbookPlan
var CookbookPlan_EventRow = React.createClass({ 
	//list<cookbook>
	parseTimes:function(s){
		var rs=null;
		if(!s)return "";
		
		
		var arr=s;
		for(var i=0;i<arr.length;i++){
			var t_arr=arr[i];
			if(rs==null)rs=t_arr.name;
			else rs+=","+t_arr.name;
		}  
		return rs;
	},
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  <tr className={className} >
    <td><a href="javascript:void(0);" onClick={btn_click_cookbookPlan.bind( this, 'edit',event)}>{G_week.getWeekStr(event.plandate)}</a></td>
    <td>{this.parseTimes(event.list_time_1)}</td>
    <td>{this.parseTimes(event.list_time_2)}</td>
    <td>{this.parseTimes(event.list_time_3)}</td>
    <td>{this.parseTimes(event.list_time_4)}</td>
    <td>{this.parseTimes(event.list_time_5)}</td>
    <td>{event.analysis}</td>
  </tr> 
);
}
}); 
var CookbookPlan_EventsTable = React.createClass({
render: function() {
return (
<div>
<AMR_ButtonToolbar>
<AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add",null,this.props.group_uuid)} round>添加</AMR_Button>
<AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "pre")} round>上周</AMR_Button>
<AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "next")} round>下周</AMR_Button>	
</AMR_ButtonToolbar>
<div className="header">
<div className="am-g">
  <h1>[{this.props.begDateStr} 到 {this.props.endDateStr}]</h1>
</div>
<hr />
</div>
	  <div className="am-form-group">
  <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'lg'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
  {this.props.group_list.map(function(event) {
      return (<option value={event.uuid} >{event.brand_name}</option>);
    })}
  </select>
</div>
	  
  <AMR_Table {...this.props}>  
    <thead> 
      <tr>
        <th>一周</th>
        <th>早餐</th>
        <th>早上加餐</th>
        <th>午餐</th>
        <th>下午加餐</th>
        <th>晚餐</th>
        <th>营养分析</th>
      </tr> 
    </thead>
    <tbody>
      {this.props.events.map(function(event) {
        return (<CookbookPlan_EventRow  event={event} />);
      })}
    </tbody>
  </AMR_Table>
  </div>
);
},


handleClick: function(m) {
	
	
	if(m=="add"){
		btn_click_cookbookPlan(m,{groupuuid:$('#selectgroup_uuid').val()});
		 return;
	 }if(m=="edit"){
		
		 var uuids=null;
		 $($("input[name='table_checkbox']")).each(function(){
			
			　if(this.checked){
				 if(uuids==null)uuids=this.value;
				 else
				　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
			　}
			});
		  if(!uuids){
			  alert("请勾选复选框！");
			  return;
		  }
		  if(!uuids&&uuids.indexOf(",")>-1){
				alert("只能选择一个进行编辑！");
				return;
			}
		  btn_click_cookbookPlan(m,{uuid:uuids});
	 } else if(m=="pre"){
		 ajax_cookbookPlan_listByGroup($('#selectgroup_uuid').val(),--g_cookbookPlan_week_point);
		 return;
	 }else if(m=="next"){
		 ajax_cookbookPlan_listByGroup($('#selectgroup_uuid').val(),++g_cookbookPlan_week_point);
		 return;
	 }
},
//
handleChange_selectgroup_uuid:function(){
	ajax_cookbookPlan_listByGroup($('#selectgroup_uuid').val(),g_cookbookPlan_week_point);
}
});


var CookbookPlan_edit_EventRow = React.createClass({
	
	 getInitialState: function() {
		 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
		    return {
	            items: lists
	        };
		  },
	
	  //uuids=rs += (cb.getUuid() + "$" + cb.getName() + ",");
		//使用list<cookbook>
	  cookbookPlan_timeStr_to_list:function(cooks){
		  if(!cooks) cooks=[];
		  return cooks;
		//  if(cooks==null)return [];
		 // return cooks.split(",");
	  },
	  
		deleteImg:function(divid){
			$("#"+divid).hide();
		},
		 btn_addCookplan: function(divid) {
			 var that=this;
			  var checkeduuids =null;
			  $("#"+divid+" > .G_cookplan_Img").each(function(){
				  		if($(this).is(":hidden")){
				  			return;
				  		}
						 if(checkeduuids==null)checkeduuids=this.title;
						 else
						　checkeduuids+=','+this.title ;    //遍历被选中CheckBox元素的集合 得到Value值
					});
			w_ch_cook.open(function(cooks){
				  that.setState({
			            items: that.cookbookPlan_timeStr_to_list(cooks)
			        });
				  $(".G_cookplan_Img").show();
				  
			  },checkeduuids);
		  },
	  render: function() {
		var that=this;
	    return (
	    		  <div id={"div_cookPlan_"+this.props.type}>
	    		  
	    		  {
	    			  this.state.items.map(function(event) {
	    				  //rs += (cb.getUuid() + "$" + cb.getName() + ",");
	    				//  var arr=event.split("$");
	    				  //if(arr.length!=3)return;
	    				  //使用list<cookbook>
	    				  if(!event)return;
	    				  var t_uuid=event.uuid;
	    				  var t_imguuid=event.img;
	    				  var t_name=event.name;
 	    					 return (
 	     	 	            		<div id={"div_cookPlan_Item_"+t_uuid} title={t_uuid} className="G_cookplan_Img" >
 	    		    	 	       			<img className="G_cookplan_Img_img"  id={"divCookItem_img_"+t_uuid}  src={t_imguuid} alt="图片不存在" title={t_name} />
 	    		    	 	       			<div className="G_cookplan_Img_close"  onClick={that.deleteImg.bind(this,"div_cookPlan_Item_"+t_uuid)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
 	    		    	 	       			<span >{t_name}</span>
 	    		    	 	       		</div>		
 	     	 	            	);
 	     	 	          
 	    				
 	    			 })//end map
	    		  } 
	    		  <button type="button"  onClick={that.btn_addCookplan.bind(this,"div_cookPlan_"+that.props.type)}  className="am-btn am-btn-primary">添加</button> 
 	    		</div>
		
	  )
	  }
	});

var CookbookPlan_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editCookbookPlanForm').serializeJson());
	  },
	 
render: function() {
	  var o = this.state;
	  
	  var plandateStr_div;
	  if (o.uuid) {//只读
		//2015-07-04 00:00:00=>2015-07-04
		  o.plandate=o.plandate.split(" ")[0];
		  plandateStr_div = <PxInput icon="calendar" type="text" name="plandateStr" id="plandateStr" value={o.plandate}  />
	  } else {
		  plandateStr_div = <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="plandateStr" id="plandateStr" dateTime={o.plandate} showTimePicker={false}  onChange={this.handleChange}/>
	  }
	  return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>【{Store.getGroupNameByUuid(o.groupuuid)}】-每日食谱-编辑</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		  <form id="editCookbookPlanForm" method="post" className="am-form">
		<input type="hidden" name="uuid"  value={o.uuid}/>
		<input type="hidden" name="groupuuid"  value={o.groupuuid}/>
		<input type="hidden" name="type"  value="1"/>
		        <label htmlFor="name">日期:</label>
				 {plandateStr_div}  
				 <br/>
		      <label>早餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_1}  type={"time_1"}/>
		      <div className="cls"></div>
		      <br/>
		      <label>早上加餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_2}  type={"time_2"}/>
		      <div className="cls"></div>
		      <br/>
		      <label>午餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_3}  type={"time_3"}/>
		      <div className="cls"></div>
		      <br/>
		      <label>下午加餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_4}  type={"time_4"}/>
		      <div className="cls"></div>
		      <br/>
		      <label>晚餐:</label> 
		      <CookbookPlan_edit_EventRow  uuids={o.list_time_5}  type={"time_5"}/>
		      <div className="cls"></div>
		      <br/>
		      <AMR_Input  name="analysis" type="textarea" rows="2" label="营养分析:" placeholder="填写内容" value={o.analysis} onChange={this.handleChange}/>
				
		      <button type="button"  onClick={ajax_cookbookPlan_save}  className="am-btn am-btn-primary">提交</button>
		    </form>

	     </div> 
	   </div>
	   
	   </div>
);
}
}); 

var CookbookPlanShow_EventRow = React.createClass({
	//第而.//使用list<cookbook>
		componentWillReceiveProps: function(nextProps) {
			 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
			  this.setState({
				  items: lists
			  });
			},
	 getInitialState: function() {
		 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
		    return {
	            items: lists
	        };
		  },
	  //uuids=rs += (cb.getUuid() + "$" + cb.getName() + ",");
		  //list
	  cookbookPlan_timeStr_to_list:function(cooks){
		  if(!cooks)cooks=[];
		  return cooks;
		 // if(!cooks)return [];
		 // return cooks.split(",");
		  
	  },
	  
	  render: function() {
	    return (
	    		  <div id={"div_cookPlan_"+this.props.type}>
	    		  {
	    			  this.state.items.map(function(event) {
	    				  //rs += (cb.getUuid() + "$" + cb.getName() + ",");
//	    				  var arr=event.split("$");
//	    				  if(arr.length!=3)return;
	    				  //直接使用list<cookbook>
	    				  var t_uuid=event.uuid;
	    				  var t_imguuid=event.img;
	    				  var t_name=event.name;
	    					 return (
	     	 	            		<div id={"div_cookPlan_Item_"+t_uuid} title={t_uuid} className="G_cookplan_Img" >
	    		    	 	       			<img className="G_cookplan_Img_img"  id={"divCookItem_img_"+t_uuid}  src={G_imgPath+t_imguuid} alt="图片不存在" title={t_name} />
	    		    	 	       			<span >{t_name}</span>
	    		    	 	       		</div>		
	     	 	            	);
	    				
	    			 })//end map
	    		  } 
	    		</div>
		
	  )
	  }
	});

/**
 * 显示每天的食谱
 */
var CookbookPlan_showByOneDay = React.createClass({ 
	handleClick: function(m) {
		if(m=="pre"){
			ajax_cookbookPlan_dayShow(--g_cookbookPlan_listToShow_point);
			 return;
		 }else if(m=="next"){
			 ajax_cookbookPlan_dayShow(++g_cookbookPlan_listToShow_point);
			 return;
		 }
	},
	componentDidMount: function() {
//		  if(!this.props.formdata){
//			  $("#div_detail").html("今日没有发布食谱");
//		  }
	    
	  },
	render: function() {
	  var o = this.props.formdata;
	  
	  var dataShowDiv=null;
	  if(!o){
		  dataShowDiv=(<div className="am-g" id="div_detail">今日没有发布食谱</div>)
	  }else{
		  dataShowDiv=(	<div className="am-g" id="div_detail">
				 <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
				 <label>早餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_1}  type={"time_1"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>早上加餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_2}  type={"time_2"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>午餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_3}  type={"time_3"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>下午加餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_4}  type={"time_4"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>晚餐:</label> 
				 <CookbookPlanShow_EventRow  uuids={o.list_time_5}  type={"time_5"}/>
				 <div className="cls"></div>
				 <br/>
				 <label>营养分析:</label> 
				 <div className="g_analysis">
					<div dangerouslySetInnerHTML={{__html:G_textToHTML(o.analysis)}}></div>
				 </div>
				</div> 
			</div>
		  )
	  }
	
	  return (
		<div>
		
			<div className="header">
				  <div className="am-g">
				  
				  <Grid>
				    <Col sm={3}>
				    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "pre")}  round>上一天</AMR_Button>
				    </Col>
				    <Col sm={6}>
				    <h1>【{this.props.ch_group.brand_name}】-每日食谱-{this.props.ch_day}</h1>
				    </Col>
				    <Col sm={3}>
				    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "next")} round>下一天</AMR_Button>	
				    </Col>
				  </Grid>
				  </div>
			  <hr />
			</div>
		{dataShowDiv}
	   </div>
	  );
}
}); 

//end cookbookPlan



//classnews
var Classnews_EventRow = React.createClass({ 
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
event.disabled ? 'am-disabled' : '';

return (
<tr className={className} >
<td> 
<input type="checkbox" value={event.uuid} name="table_checkbox" />
</td>
  <td><a href="javascript:void(0);" onClick={btn_click_classnews.bind(this,"show",event)}>{event.title}</a></td>
  <td>{event.create_user}</td>
  <td>{event.update_time}</td>
  <td>{event.reply_time}</td>
  
</tr> 
);
}
}); 
/*
 * 班级 互动1
 * @selectclass_uuid_val:设置一变量当下拉框Val改变时赋值于classuuid;
 * */
var Classnews_EventsTable = React.createClass({
	selectclass_uuid_val:null,
	handleClick: function(m) {
		if(m=="add"){
			 btn_click_classnews(m,{classuuid:this.selectclass_uuid_val});
			 return;
		 }if(m=="edit"){
			
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				
				　if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				　}
				});
			  if(!uuids){
				  alert("请勾选复选框！");
				  return;
			  }
			  if(!uuids&&uuids.indexOf(",")>-1){
					alert("只能选择一个进行编辑！");
					return;
				}
			  btn_click_classnews(m,{uuid:uuids});
		 }
		else if(m=="pre"){
			 if(g_classnews_pageNo_point==1)return;
			 ajax_classnews_list(g_classnews_classuuid,--g_classnews_pageNo_point);
			 return;
		 }else if(m=="next"){
			 ajax_classnews_list(g_classnews_classuuid,++g_classnews_pageNo_point);
			 return;
		 }
	  },
	  
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_select_classnews_type:function(){
		  ajax_classnews_list($('#select_classnews_type').val());
	  },
	  handleChange_selectclass_uuid:function(val){
		  this.selectclass_uuid_val=val;
		  ajax_classnews_list(this.selectclass_uuid_val);
	  },
render: function() {
	var totalCount=this.props.events.totalCount;
	var pageSize=this.props.events.pageSize;
	var maxPageNo=Math.floor(totalCount/pageSize)+1;
	var that=this;
	var pre_disabled=g_classnews_pageNo_point<2;
	var next_disabled=g_classnews_pageNo_point>=maxPageNo;
return (
<div>
<AMUIReact.ButtonToolbar>
	    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加</AMUIReact.Button>
	    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this, "edit")} round>编辑</AMUIReact.Button>
	 </AMUIReact.ButtonToolbar>
	  <hr/>
	  
	  <AMR_Button amStyle="secondary" disabled={pre_disabled} onClick={this.handleClick.bind(this, "pre")} round>&laquo; 上一页</AMR_Button>
	  <label>{g_classnews_pageNo_point}\{maxPageNo}</label> 
	    <AMR_Button amStyle="secondary" disabled={next_disabled} onClick={this.handleClick.bind(this, "next")} round>下一页 &raquo;</AMR_Button>

      <AMUIReact.Selected id="selectclass_uuid" name="class_uuid" onChange={this.handleChange_selectclass_uuid} btnWidth="200"  data={this.props.class_list} btnStyle="primary" value={this.props.class_uuid} />	    

	      
	      
	      
<AMUIReact.Table {...this.props}>  
  <thead> 
    <tr>
    	<th>  
      <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
      </th>
      <th>标题</th>
      <th>创建人</th>
      <th>更新时间</th>
      <th>回复时间</th>
    </tr> 
  </thead>
  <tbody>
    {this.props.events.data.map(function(event) {
      return (<Classnews_EventRow  event={event} />);
    })}
  </tbody>
</AMUIReact.Table>
</div>
);
}
});



/**
 * 班级互动可删除图片显示.
 */
var ClassNews_Img_canDel = React.createClass({
		deleteImg:function(divid){
			$("#"+divid).remove();
		},
			
	  render: function() {
		 return (
            		<div  className="G_cookplan_Img" >
  	 	       			<img className="G_cookplan_Img_img"  src={this.props.url} alt="图片不存在" />
  	 	       			<div className="G_cookplan_Img_close"  onClick={this.deleteImg.bind(this,this.props.parentDivId)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
  	 	       		</div>		
            	)
	  }
	});
/*
 * 班级互动2
 * @整个班级互动逻辑思维 首先要调用公用模板内的数组转换方法，把我们的数组转换成Selected需要的数据模型
 * 然后Selected的onChange自带value 直接可以传进handleChange_selectclass_uuid方法内 
 * 我们把值添加到 #editClassnewsForm 表单内 这样保存服务器请求就可以传最新的 classuuid了;
 * @ w_img_upload_nocut.bind_onchange 图片截取方法绘制在新的Div里面
 * */
var Classnews_edit = React.createClass({ 
	selectclass_uuid_val:null,
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editClassnewsForm').serializeJson());
	  },
	  handleChange_selectclass_uuid:function(val){
		  this.selectclass_uuid_val=val;
		  this.props.formdata.classuuid=val
			 $('#classuuid').val(val);
			    this.setState($('#editClassnewsForm').serializeJson());
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
		 var editor=$('#classnews_content').xheditor(xhEditor_upImgOption_emot);
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
	  var o = this.state;
return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>编辑</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
	      
		  <AMUIReact.Selected id="selectclass_uuid" name="class_uuid" onChange={this.handleChange_selectclass_uuid} btnWidth="300"  data={this.props.mycalsslist} btnStyle="primary" value={this.props.formdata.classuuid} />	    
  
		  <form id="editClassnewsForm" method="post" className="am-form">
			<input type="hidden" name="uuid"  value={o.uuid}/>
			<input type="hidden" name="imgs" id="imgs"  value={o.imgs}/>
			
			<input type="hidden" name="classuuid"  value={this.props.formdata.classuuid}/>
			<label htmlFor="title">标题:</label>
		      <input type="text" name="title" id="title" value={o.title}  onChange={this.handleChange} placeholder="不超过128位"/>
		      <br/>
		      <AMR_Input id="classnews_content" type="textarea" rows="3" label="内容:" placeholder="填写内容" name="content" value={o.content} onChange={this.handleChange}/>
  			{G_upload_img_Div}
		      <div id="show_imgList"></div><br/>
		      <button type="button"  onClick={ajax_classnews_save}  className="am-btn am-btn-primary">提交</button>
		    </form>

	     </div>
	   </div>
	   
	   </div>
);
}
}); 



var Classnews_show = React.createClass({ 
render: function() {
	  var o = this.props.formdata;
	 
	  if(!o.dianzanList)o.dianzanList=[];
  return (
		  <div>
		  <AMUIReact.Article
		    title={o.title}
		    meta={o.create_user+" | "+Store.getClassNameByUuid(o.classuuid)+" | "+o.update_time+" | 阅读"+this.props.count+"次"}>
			<div dangerouslySetInnerHTML={{__html: o.content}}></div>
		   </AMUIReact.Article>	
		  <Common_Dianzan_show uuid={o.uuid} type={0} />
		  <Common_reply_list uuid={o.uuid}  type={0}/>
		  <Common_reply_save uuid={o.uuid}  type={0}/>
		    </div>
		   
  );
}
}); 



//end classnews





//accounts
var Accounts_EventRow = React.createClass({ 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    <tr className={className} >
    <td > {Vo.get("KD_Accounts_type_"+event.type)}</td>
    <td  >{event.title}</td>
    <td > {event.num}</td>
      <td  >{G_getDateYMD(event.accounts_time)}</td>
     
      <td > {event.studentname}</td>
      <td > {Store.getClassByUuid(event.classuuid).name}</td>
      <td >{Store.getGroupNameByUuid(event.groupuuid)}</td>
      <td > {event.description}</td>
      <td >{event.create_user}</td>
      <td >{event.create_time}</td>
    </tr> 
  );
}
}); 

var Accounts_EventsTable = React.createClass({
	handleClick: function(m) {
		if(m=="add"){
			btn_click_accounts(m,{groupuuid:$('#selectgroup_uuid' ).val()});
			 return;
		 }
	  },
	  handleChange_selectgroup_uuid: function(){
		  ajax_accounts_listByGroup($( '#selectgroup_uuid' ).val());
    },
render: function() {
  return (
  <div>
  <div className="header">
	  <div className="am-g">
	    <h1>收支记录</h1>
	  </div>
	  <hr />
	</div>
  <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加</AMR_Button>
	  </AMR_ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
	    <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'lg'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
	    {this.props.group_list.map(function(event) {
	        return (<option value={event.uuid} >{event.brand_name}</option>);
	      })}
	    </select>
	  </div>
    <AMR_Table {...this.props}>  
      <thead> 
        <tr>
          <th>类型</th>
          <th>内容</th>
          <th>金额</th>
          <th>收费时间</th>
          
          <th>学生</th>
          <th>班级</th>
          <th>学校</th>
          <th>备注</th>
          <th>创建人</th>
          <th>创建时间</th>
        </tr> 
      </thead>
      <tbody>
        {this.props.events.map(function(event) {
          return (<Accounts_EventRow key={event.id} event={event} />);
        })}
      </tbody>
    </AMR_Table>
    </div>
  );
}
});
  
var Accounts_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.loadData(this.props.formdata);
		  },
	 handleChange: function(event) {
		 	var formdata=$('#editAccountsForm').serializeJson();
		 	
		    this.setState(this.loadData(formdata));
	  },
	  loadData:function(formdata){
		  
		  formdata.tmp_classList=Store.getChooseClass(formdata.groupuuid);
		  if(formdata.classuuid){
			  formdata.tmp_studentList=Store.getClassStudentsList(formdata.classuuid);
		  }else{
			  formdata.tmp_studentList=[];
		  }
		  return formdata;
	  },
	  
render: function() {
	  var o = this.state;
  return (
  		<div>
  		<div className="header">
  		  <div className="am-g">
  		    <h1>收支记录</h1>
  		  </div>
  		  <hr />
  		</div>
  		<div className="am-g">
  		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
  		<form id="editAccountsForm" method="post" className="am-form">
  		<input type="hidden" name="uuid"  value={o.uuid}/>
  		 <div className="am-form-group">
	          <select id="groupuuid" name="groupuuid" data-am-selected="{btnSize: 'lg'}" value={o.groupuuid} onChange={this.handleChange}>
	          {this.props.group_list.map(function(event) {
	              return (<option value={event.uuid} >{event.brand_name}</option>);
	            })}
	          </select>
	        </div> 
  		<label htmlFor="type">收支类型:</label>
  		 <div className="am-form-group">
  		<select id="type" name="type" data-am-selected="{btnSize: 'lg'}" value={o.type} onChange={this.handleChange}>
  		 {this.props.type_list.map(function(event) {
             return (<option value={event.key} >{event.val}</option>);
           })}
        </select>
        <select id="classuuid" name="classuuid" data-am-selected="{btnSize: 'lg'}" value={o.classuuid} onChange={this.handleChange}>
 		<option value="0" >班级选择</option>
 		{o.tmp_classList.map(function(event) {
            return (<option value={event.uuid} >{event.name}</option>);
          })}
       </select>
       <select id="studentuuid" name="studentuuid" data-am-selected="{btnSize: 'lg'}" value={o.studentuuid} onChange={this.handleChange}>
   	<option value="0" >学生选择</option>
   	{o.tmp_studentList.map(function(event) {
        return (<option value={event.uuid} >{event.name}</option>);
      })}
      </select>
        </div> 
  	      <br/>
 	    
  	    <label htmlFor="accounts_timeStr">收支日期:</label>
  	    <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="accounts_timeStr" id="accounts_timeStr" dateTime={o.accounts_time} showTimePicker={false}  onChange={this.handleChange}/>
  	       <label htmlFor="title">内容:</label>
  	      <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} placeholder="不超过64位"/>
  	      <br/>
  	
  	       <label htmlFor="num">金额:</label>
  	      <input type="number" name="num" id="num" value={o.num} onChange={this.handleChange} placeholder=""/> 
  	    <label htmlFor="description">备注:</label>
	      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange} placeholder="不超过100位"/>
	      <br/>
	      <button type="button"  onClick={ajax_accounts_saveAndAdd}  className="am-btn am-btn-primary">保存继续</button>
  	      <button type="button"  onClick={ajax_accounts_save}  className="am-btn am-btn-primary">保存返回</button>
  	     </form>

  	     </div>
  	   </div>
  	   
  	   </div>
  );
}
}); 
//end accounts

//Div_body_index reg
var Div_body_index = React.createClass({ 
	componentDidMount:function(){
		(BAIDU_DUP=window.BAIDU_DUP||[]).push(['fillAsync','1110291','baidu_dup_1110291']);
	},
	render: function() {
	return (
		<div>
		<div id="baidu_dup_1110291"></div>
		<AMUIReact.Gallery  {...this.props} />
		</div>
		
	);
	}
}); 
/*
 *(校务管理)<校园列表>绘制 ;
 *@handleClick:绑定的事件根据M来区分点击事件并做处理；
 *@add:添加分校;
 *@edit:
 * */
var Group_EventsTable = React.createClass({
	handleClick: function(m) {
		if(m=="add"){
			btn_click_group(m,{type:"1"});
			 return;
		 }if(m=="edit"){
			
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				
				　if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				　}
				});
			  if(!uuids){
				  alert("请勾选复选框！");
				  return;
			  }
			  if(!uuids&&uuids.indexOf(",")>-1){
					alert("只能选择一个进行编辑！");
					return;
				}
			  btn_click_group(m,{uuid:uuids});
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
  render: function() {
    return (
    <div>
    <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加分校</AMR_Button>
	  </AMR_ButtonToolbar>
	  <hr/>
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
          <th>  
          <input type="checkbox" id="id_checkbox_all"   onChange={this.handleChange_checkbox_all}  />
          </th>
            <th>品牌名</th>
            <th>机构全称</th>
            <th>电话</th>
            <th>公司地址</th>
            <th>创建时间</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Group_EventRow key={event.id} event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
});
    
    /*
     * (校务管理)<校园列表>添加分校绘制界面；
     * */    
    var Group_edit = React.createClass({ 
    	 getInitialState: function() {
    		    return this.props.formdata;
    		  },
    	 handleChange: function(event) {
    		    this.setState($('#editGroupForm').serializeJson());
    	  },
    	  componentDidMount:function(){
    			  var editor=$('#description').xheditor(xhEditor_upImgOption_mfull);
              w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                    editor.pasteHTML( '<img  width="198" height="198" src="'+imgurl+'"/>')
              });
    	},
      render: function() {
    	  var o = this.state;
        return (
        		<div>
        		<div className="header">
        		  <div className="am-g">
        		    <h1>编辑</h1>
        		  </div>
        		  <hr />
        		</div>
        		<div className="am-g">
        		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
        		  
        		<form id="editGroupForm" method="post" className="am-form">
        		<input type="hidden" name="uuid"  value={o.uuid}/>
        	    <input type="hidden" name="type"  value={o.type}/>
        	      <label htmlFor="brand_name">品牌名:</label>
        	      <input type="text" name="brand_name" id="brand_name" value={o.brand_name} onChange={this.handleChange} placeholder="不超过45位"/>
        	      <br/>
        	       <label htmlFor="company_name">机构全称:</label>
        	      <input type="text" name="company_name" id="company_name" value={o.company_name} onChange={this.handleChange} placeholder="不超过45位"/>
        	      <br/>
        	       <label htmlFor="address">公司地址:</label>
        	      <PxInput icon="university" type="text" name="address" id="address" value={o.address} onChange={this.handleChange} placeholder="不超过64位"/>
        	      <br/>
        	       <label htmlFor="map_point">地址坐标:</label>
        	      <input type="text" name="map_point" id="map_point" value={o.map_point} onChange={this.handleChange} placeholder="拾取坐标后，复制到这里。格式：1.1,1.1"/> 
        	      <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">坐标拾取</a>
        	      <br/>
        	       <label htmlFor="link_tel">公司电话:</label>
        	      <PxInput icon="phone" type="text" name="link_tel" id="link_tel" value={o.link_tel} onChange={this.handleChange} placeholder=""/>
        	      <br/>
        	      <AMR_Input id="description" type="textarea" rows="50" label="校园介绍:" placeholder="校园介绍" name="description" value={o.description} onChange={this.handleChange}/>
        		  	{G_upload_img_Div}
        	      <button type="button"  onClick={ajax_group_save}  className="am-btn am-btn-primary">提交</button>
        	     </form>

        	     </div>
        	   </div>
        	   
        	   </div>
        );
      }
    }); 

//——————————————————————————家长通讯录<绘制>—————————————————————————— 
/*
 * 通讯录学生家长联系详情绘制；
 * @{this.props.formdata.map(function(event)：
 * 封装好的一个MAP方法只对数组起作用，其内部自己For循环;
 * @event:Map方法用event.XX调用数组内 数据；
 * @amStyle:按钮颜色；
 * @parent_uuid:老师给每个用户的ID发message时需要的参数;
 * web页面一键电话功能<a href={"tel:"+event.tel}></a>;
 * */
var Class_student_tel =React.createClass({
	  handleChange_selectgroup_uuid:function(){
	  //ajax_Teacher_listByGroup($('#selectgroup_uuid').val(),$('#sutdent_name').val());
	  },
		render: function() {
	     var o =this.state;	
		 return (
		 		<div>
			      <form id="editGroupForm" method="post" className="am-form">
			      <input type="text" name="sutdent_name" id="sutdent_name" size="1"    placeholder="教师姓名"/>	  
				  <button type="button"  onClick={this.handleChange_selectgroup_uuid}  className="am-btn am-btn-primary">搜索</button>	  	
				  </form>
			    <AMUIReact.List static>
		    	{this.props.formdata.map(function(event) {
		            return (<AMUIReact.ListItem>{event.student_name}的{event.typename}:{event.tel}
		            <AMR_ButtonToolbar>
		            <a href={"tel:"+event.tel}><AMUIReact.Button amStyle="disable">电话</AMUIReact.Button>	</a>
		            
		            <AMUIReact.Button  onClick={ajax_parentContactByMyStudent_message_list.bind(this,event.parent_uuid)} amStyle="success">@信息</AMUIReact.Button>	
		            
		            </AMR_ButtonToolbar>
		            </AMUIReact.ListItem>);
		          })}		      			      
			      </AMUIReact.List>
		 	     </div> 
		     );
	        }
		 });
/* 
 * 家长通讯录中的<信息>绘制舞台
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @Parent_message_save我要保存模板；
 * */
var ParentContactByMyStudent_message_list = React.createClass({ 
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
		var re_data=ajax_message_queryByParent(this.props.parent_uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}
		  
		  this.pageNo++;
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (
		  <div>
		   <div id={this.classnewsreply_list_div}>
		   
		   </div>
			<button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>
			<Parent_message_save parent_React={this} uuid={this.props.parent_uuid} />
			</div>
			
  );
}
}); 

/*
 * 我要发信息模块；(家长通讯录发信息)
 * */
var Parent_message_save = React.createClass({ 
	classnewsreply_list_div:"classnewsreply_list_div",
	componentDidMount:function(){
		 var editor=$( '#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);
         w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
               editor.pasteHTML( '<img  width="198" height="198" src="'+imgurl+'"/>')
         });

	},
	reply_save_btn_click:function(){
		ajax_parent_message_save(this.props.parent_React);
	},
render: function() {
  return (
		   <form id="editForm" method="post" className="am-form">
			<input type="hidden" name="revice_useruuid"  value={this.props.uuid}/>
			
			<AMR_Input id="classnews_content_replay" type="textarea" rows="10" label="信息发送" placeholder="填写内容" name="message" />
   {G_upload_img_Div}
		      <button type="button"  onClick={this.reply_save_btn_click.bind(this)}  className="am-btn am-btn-primary">发送</button>
		      
		    </form>	   
  );
}
}); 
/* 首页家长通讯录功能2级发信息界面功能
 * @ 绘制 信息
 * */
var Message_queryByParent_listpage =React.createClass({	 
	render: function() {
	  return (
			  <div>
			 
			  {this.props.events.data.map(function(event) {
			      return (<AMUIReact.ListItem>{event.send_user}:{event.message}</AMUIReact.ListItem>)
			  })}
			    </div>
			   
	  );
	}
})
   

//——————————————————————————园长信箱<绘制>——————————————————————————        
    /*
     * <园长信箱>一层界面绘制;
     * @send_user:家长名字；
     * @revice_useruuid:收件人ID；
     * @send_useruuid:发送者ID；
     * @ajax_boss_message_list绑定事件然后开始绘制舞台；
     * */
    var Boss_student_tel =React.createClass({
    		render: function() {
    	     var o =this.state;	
    		 return (
    		 		<div>
    			    <AMUIReact.List static>
    		    	{this.props.formdata.map(function(event) {
    		            return (<AMUIReact.ListItem>家长{event.send_user}的信息    
    		            <AMR_ButtonToolbar>		            
    		            <AMUIReact.Button  onClick={ajax_boss_message_list.bind(this,event.send_useruuid,event.revice_useruuid)} amStyle="success">@信息</AMUIReact.Button>你们总共发了{event.count}条信息
    		            </AMR_ButtonToolbar>	
            
    		            </AMUIReact.ListItem>);
    		          })}		      			      
    			      </AMUIReact.List>
    		 	     </div> 
    		     );
    	        }
    		 });

/*
 * <园长信箱>如果没有数据则绘制文字提示用户
 * */
var Boss_student_tel2 =React.createClass({
		render: function() {
		 return (
				 <div className="am-g">
				  <h1>园长信箱暂无信件！</h1>
				  </div>
		     );
	        }
		 });


/* 
 * <园长信箱>绘制舞台
 * @ajax_message_queryByParent：园长信箱2层详情界面服务器请求‘
 * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
 * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
 * @revice_useruuid:收件人ID；
 * @send_useruuid:发送者ID；
 * @Boss_message_save我要保存模板
 * this.forceUpdate()强制刷新页面；
 * this.props.parentReact.forceUpdate();
 * */
var Boss_message_stage = React.createClass({ 
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
		var re_data=ajax_boss_message(this.props.send_useruuid,this.props.revice_useruuid,this.classnewsreply_list_div+this.pageNo,this.pageNo);
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}
		  
		  this.pageNo++;
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
  return (
		  <div>
		   <div id={this.classnewsreply_list_div}>
		   
		   </div>
			<button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>
			<Boss_message_save parent_React={this} send_useruuid={this.props.send_useruuid} revice_useruuid={this.props.revice_useruuid} />
			</div>
			
  );
}
}); 

/*
 *<园长信箱>发送信息模板
 *@ajax_boss_message_save：发送信息服务器请求；
 * @revice_useruuid:收件人ID；
 * @send_useruuid:发送者ID；
 * 此处因园长回信息所以参数ID相反；
 * */
var Boss_message_save = React.createClass({ 
	classnewsreply_list_div:"classnewsreply_list_div",
	componentDidMount:function(){
		$('#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);
	},
	reply_boss_save_btn_click:function(){
		ajax_boss_message_save(this.props.parent_React);
	},
render: function() {
  return (
		   <form id="editForm" method="post" className="am-form">
		   <input type="hidden" name="revice_useruuid"  value={this.props.send_useruuid}/>
			<input type="hidden" name="send_useruuid"  value={this.props.revice_useruuid}/>			
			<AMR_Input id="classnews_content_replay" type="textarea" rows="10" label="信息发送" placeholder="填写内容" name="message" />
		      <button type="button"  onClick={this.reply_boss_save_btn_click.bind(this)}  className="am-btn am-btn-primary">发送</button>		      
		    </form>	   
  );
}
}); 


/* <园长信箱>2层发信息详情界面绘制；
 * @send_user：信息者名字；
 * @message：信息内容；
 * */
var Message_queryLeaderMsgByParents_listpage =React.createClass({	 
	render: function() {
	  return (
			  <div>			 
			  {this.props.events.data.map(function(event) {
			      return (<AMUIReact.ListItem>{event.send_user}:{event.message}</AMUIReact.ListItem>)
			  })}
			    </div>
			   
	  );
	}
})



//——————————————————————————查看即时消息<绘制>——————————————————————————   
/* <查看即时消息>信息详情界面绘制；
 * @send_user：信息者名字；
 * @
 * @
 * @
 * */

var Message_queryMyTimely_myList =React.createClass({	 
	render: function() {
		  return (
			 <div>			 
				  {this.props.formdata.data.map(function(event) {
					  return(
							  
					<article className="am-comment-highlight">
					  <div className="am-comment-main">
						  <header className="am-comment-hd">
						  <div className="am-comment-meta">
						  <a href="#link-to-user" className="am-comment-author">{event.title}：</a>消息发送于 
						  <time>{event.create_time}</time></div>
						  </header>
						  <div className="am-comment-bd" onClick={this.ajax_State_style.bind(this,event.type,event.rel_uuid)}>{event.message}</div>
					  </div>
					</article>)						
				  })}
				  
			 </div>				   
		 
		  );
		}
	})


	
	
	
	
	
	
//——————————————————————————学生列表<绘制>——————————————————————————  
/*
 * 学生列表服务器请求后绘制处理方法；
 * @</select>下拉多选框;
 * @handleChange_stutent_Selected:学校查询；
 * @handleChange_class_Selected::班级查询；
 * @btn_query_click:名字查找；
 * */
var Query_stutent_list = React.createClass({
	group_uuid:null,
	classuuid:null,
	handleChange_stutent_Selected: function(val) {
		  this.group_uuid=val;
		  ajax_student_query(this.group_uuid,this.classuuid,$('#sutdent_name').val());
	  }, 
	  handleChange_class_Selected: function(val) {
		  this.classuuid=val;
		  ajax_student_query(this.group_uuid,this.classuuid,$('#sutdent_name').val());
		  }, 
		btn_query_click:function(){
			 ajax_student_query(this.group_uuid,this.classuuid,$('#sutdent_name').val());
		},
render: function() {
    return (
    <div>
    <div className="header">
    <div className="am-g">
      <h1>学生列表</h1>
    </div>
    <hr />
    </div>
	  <hr/>	  
	  <div className="am-form-group">
		<form id="editGroupForm" method="post" className="am-form">
	  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_stutent_Selected} btnWidth="300"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />      
	  <AMUIReact.Selected id="selectgroup_uuid" name="class_uuid" onChange={this.handleChange_class_Selected} btnWidth="200"  multiple= {false} data={this.props.class_list} btnStyle="primary" value={this.props.class_uuid} />      
      <input type="text" name="sutdent_name" id="sutdent_name" size="1"    placeholder="学生姓名"/>	  
	  <button type="button"  onClick={this.btn_query_click}  className="am-btn am-btn-primary">搜索</button>	  
	
	  </form>
	  </div>	  
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
            <th>姓名</th>
            <th>昵称</th>
            <th>性别</th>
            <th>生日</th>
            <th>身份证</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Query_EventRow key={event.id} event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
});
    
/*ajax_class_students_look_info  	
 * 学生列表在表单上绘制详细内容;
 * 点击后直接调用学生详情方法
 * 进入前btn_students_list_click按钮事件内添加Queue.push保证回退正常;
 * */

var Query_EventRow = React.createClass({ 
	btn_students_list_click:function(uuid){
		Queue.push(function(){btn_students_list_click(uuid);});
		ajax_class_students_look_info(uuid)
	},
	  render: function() {
	    var event = this.props.event;
	    var className = event.highlight ? 'am-active' :
	      event.disabled ? 'am-disabled' : '';

	    return (
	      <tr className={className} >
	        <td><a href="javascript:void(0);" onClick={this.btn_students_list_click.bind(this,event.uuid)}>{event.name}</a></td>
	        <td>{event.nickname}</td>
	        <td>{event.sex=="0"?"男":"女"}</td>
	        <td>{event.birthday}</td>
	        <td>{event.idcard}</td>
	      </tr> 
	    );
	  }
	}); 





//——————————————————————————老师通讯录<绘制>——————————————————————————  
/*
 *老师通讯录服务器请求后绘制处理方法；
 * @handleChange_selectgroup_uuid:搜索和换学校后更新页面
 * @调用LIS.events.map方法循环绘制老师数组； 
 * @</select>下拉多选框;
 * */
var Teacher_info_tel = React.createClass({
	  handleChange_selectgroup_uuid:function(){
		  ajax_Teacher_listByGroup($('#selectgroup_uuid').val(),$('#sutdent_name').val());
	  },
  render: function() {
    return (
    <div>
    <div className="header">
    <div className="am-g">
      <h1>老师通讯录</h1>
    </div>
    <hr />
    </div>

	      <form id="editGroupForm" method="post" className="am-form">
	      <input type="text" name="sutdent_name" id="sutdent_name" size="1"    placeholder="教师姓名"/>	  
		  <button type="button"  onClick={this.handleChange_selectgroup_uuid}  className="am-btn am-btn-primary">搜索</button>	  	
		  </form>
	  <hr/>
	  <div className="am-form-group">
      <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'lg'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
      
      {this.props.group_list.map(function(event) {
          return (<option value={event.uuid} >{event.company_name}</option>);
        })}
      </select>
    </div>
	  
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
            <th>姓名</th>
            <th>电话</th>
            <th>邮箱</th>
            <th>性别</th>
            <th>状态</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Teacherinfo_EventRow key={event.id} event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
});
/*
 * 老师通讯录表单详情内容绘制;
 * 一键拨号
 * 暂时添加点击事件 后续还未开发； 
 * */
var Teacherinfo_EventRow = React.createClass({ 
	  render: function() {
	    var event = this.props.event;
	    var className = event.highlight ? 'am-active' :
	      event.disabled ? 'am-disabled' : '';

	    return (
	      <tr className={className} >
	        <td><a href="javascript:void(0);" onClick={""}>{event.name}</a></td>
	        <td>{event.tel} <a href={"tel:"+event.tel}><AMUIReact.Button amStyle="success">电话</AMUIReact.Button></a></td>
	        <td>{event.email}</td>
	        <td>{event.sex=="0"?"男":"女"}</td>
	        <td  className={"px_disable_"+event.disable}>{Vo.get("disable_"+event.disable)}</td>
	      </tr> 
	    );
	  }
	}); 


















































//var CookbookPlan_edit = React.createClass({ 
//	 getInitialState: function() {
//		    return this.props.formdata;
//		  },
//	 handleChange: function(event) {
//		    this.setState($('#editCookbookPlanForm').serializeJson());
//	  },
//	 
//render: function() {
//	  var o = this.state;
//	  
//	  var plandateStr_div;
//	  if (o.uuid) {//只读
//		//2015-07-04 00:00:00=>2015-07-04
//		  o.plandate=o.plandate.split(" ")[0];
//		  plandateStr_div = <PxInput icon="calendar" type="text" name="plandateStr" id="plandateStr" value={o.plandate}  />
//	  } else {
//		  plandateStr_div = <AMUIReact.DateTimeInput icon="calendar" format="YYYY-MM-DD"  name="plandateStr" id="plandateStr" dateTime={o.plandate} showTimePicker={false}  onChange={this.handleChange}/>
//	  }
//	  return (
//		<div>
//		<div className="header">
//		  <div className="am-g">
//		    <h1>【{Store.getGroupNameByUuid(o.groupuuid)}】-每日食谱-编辑</h1>
//		  </div>
//		  <hr />
//		</div>
//		<div className="am-g">
//		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
//		  <form id="editCookbookPlanForm" method="post" className="am-form">
//		<input type="hidden" name="uuid"  value={o.uuid}/>
//		<input type="hidden" name="groupuuid"  value={o.groupuuid}/>
//		<input type="hidden" name="type"  value="1"/>
//		        <label htmlFor="name">日期:</label>
//				 {plandateStr_div}  
//				 <br/>
//		      <label>早餐:</label> 
//		      <CookbookPlan_edit_EventRow  uuids={o.list_time_1}  type={"time_1"}/>
//		      <div className="cls"></div>
//		      <br/>
//		      <label>早上加餐:</label> 
//		      <CookbookPlan_edit_EventRow  uuids={o.list_time_2}  type={"time_2"}/>
//		      <div className="cls"></div>
//		      <br/>
//		      <label>午餐:</label> 
//		      <CookbookPlan_edit_EventRow  uuids={o.list_time_3}  type={"time_3"}/>
//		      <div className="cls"></div>
//		      <br/>
//		      <label>下午加餐:</label> 
//		      <CookbookPlan_edit_EventRow  uuids={o.list_time_4}  type={"time_4"}/>
//		      <div className="cls"></div>
//		      <br/>
//		      <label>晚餐:</label> 
//		      <CookbookPlan_edit_EventRow  uuids={o.list_time_5}  type={"time_5"}/>
//		      <div className="cls"></div>
//		      <br/>
//		      <AMR_Input  name="analysis" type="textarea" rows="2" label="营养分析:" placeholder="填写内容" value={o.analysis} onChange={this.handleChange}/>
//				
//		      <button type="button"  onClick={ajax_cookbookPlan_save}  className="am-btn am-btn-primary">提交</button>
//		    </form>
//
//	     </div> 
//	   </div>
//	   
//	   </div>
//);
//}
//}); 

//var CookbookPlanShow_EventRow = React.createClass({
//	//第而.//使用list<cookbook>
//		componentWillReceiveProps: function(nextProps) {
//			 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
//			  this.setState({
//				  items: lists
//			  });
//			},
//	 getInitialState: function() {
//		 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
//		    return {
//	            items: lists
//	        };
//		  },
//	  //uuids=rs += (cb.getUuid() + "$" + cb.getName() + ",");
//		  //list
//	  cookbookPlan_timeStr_to_list:function(cooks){
//		  if(!cooks)cooks=[];
//		  return cooks;
//		 // if(!cooks)return [];
//		 // return cooks.split(",");
//		  
//	  },
//	  
//	  render: function() {
//	    return (
//	    		  <div id={"div_cookPlan_"+this.props.type}>
//	    		  {
//	    			  this.state.items.map(function(event) {
//	    				  //rs += (cb.getUuid() + "$" + cb.getName() + ",");
////	    				  var arr=event.split("$");
////	    				  if(arr.length!=3)return;
//	    				  //直接使用list<cookbook>
//	    				  var t_uuid=event.uuid;
//	    				  var t_imguuid=event.img;
//	    				  var t_name=event.name;
//	    					 return (
//	     	 	            		<div id={"div_cookPlan_Item_"+t_uuid} title={t_uuid} className="G_cookplan_Img" >
//	    		    	 	       			<img className="G_cookplan_Img_img"  id={"divCookItem_img_"+t_uuid}  src={G_imgPath+t_imguuid} alt="图片不存在" title={t_name} />
//	    		    	 	       			<span >{t_name}</span>
//	    		    	 	       		</div>		
//	     	 	            	);
//	    				
//	    			 })//end map
//	    		  } 
//	    		</div>
//		
//	  )
//	  }
//	});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//var CookbookPlan_edit_EventRow = React.createClass({
//	
//	 getInitialState: function() {
//		 var lists=this.cookbookPlan_timeStr_to_list(this.props.uuids);
//		    return {
//	            items: lists
//	        };
//		  },
//	  cookbookPlan_timeStr_to_list:function(cooks){
//		  if(!cooks) cooks=[];
//		  return cooks;
//	  },
//	  
//		deleteImg:function(divid){
//			$("#"+divid).hide();
//		},
//		 btn_addCookplan: function(divid) {
//			 var that=this;
//			  var checkeduuids =null;
//			  $("#"+divid+" > .G_cookplan_Img").each(function(){
//				  		if($(this).is(":hidden")){
//				  			return;
//				  		}
//						 if(checkeduuids==null)checkeduuids=this.title;
//						 else
//						　checkeduuids+=','+this.title ;    //遍历被选中CheckBox元素的集合 得到Value值
//					});
//			w_ch_cook.open(function(cooks){
//				  that.setState({
//			            items: that.cookbookPlan_timeStr_to_list(cooks)
//			        });
//				  $(".G_cookplan_Img").show();
//				  
//			  },checkeduuids);
//		  },
//	  render: function() {
//		var that=this;
//	    return (
//	    		  <div id={"div_cookPlan_"+this.props.type}>
//	    		  
//	    		  {
//	    			  this.state.items.map(function(event) {
//	    				  //rs += (cb.getUuid() + "$" + cb.getName() + ",");
//	    				//  var arr=event.split("$");
//	    				  //if(arr.length!=3)return;
//	    				  //使用list<cookbook>
//	    				  if(!event)return;
//	    				  var t_uuid=event.uuid;
//	    				  var t_imguuid=event.img;
//	    				  var t_name=event.name;
// 	    					 return (
// 	     	 	            		<div id={"div_cookPlan_Item_"+t_uuid} title={t_uuid} className="G_cookplan_Img" >
// 	    		    	 	       			<img className="G_cookplan_Img_img"  id={"divCookItem_img_"+t_uuid}  src={t_imguuid} alt="图片不存在" title={t_name} />
// 	    		    	 	       			<div className="G_cookplan_Img_close"  onClick={that.deleteImg.bind(this,"div_cookPlan_Item_"+t_uuid)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
// 	    		    	 	       			<span >{t_name}</span>
// 	    		    	 	       		</div>		
// 	     	 	            	);
// 	     	 	          
// 	    				
// 	    			 })//end map
//	    		  } 
//	    		  <button type="button"  onClick={that.btn_addCookplan.bind(this,"div_cookPlan_"+that.props.type)}  className="am-btn am-btn-primary">添加</button> 
// 	    		</div>
//		
//	  )
//	  }
//	});
