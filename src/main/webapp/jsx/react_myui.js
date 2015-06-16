
//
var AMR_Table=AMUIReact.Table;
var AMR_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMR_Button=AMUIReact.Button;
var AMR_Sticky=AMUIReact.Sticky;
var AMR_Panel=AMUIReact.Panel;
var AMR_Gallery=AMUIReact.Gallery;
var AMR_Input=AMUIReact.Input;


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
		    
		    <select id="reg_group_uuid" name="group_uuid" data-am-selected="{btnSize: 'sm'}" >
		      {this.props.group_list.map(function(event) {
		          return (<option value={event.uuid} >{event.company_name}</option>);
		        })}
		      </select>
		        </div>
		      
		      <label htmlFor="tel">手机号码:</label>
		      <input type="text" name="tel" id="tel"  placeholder=""/>
		      <br/>
		      <label htmlFor="name">昵称:</label>
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

//userinfo reg end

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
			      <input type="email" name="brand_name" id="brand_name"  placeholder="必填，不超过45位"/>
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
			      <label htmlFor="name">昵称:</label>
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
		 	o.pw_checked=cbox.prop("checked")?"checked":"";
		    this.setState();
	  },
render: function() {
	  var o = this.state;
 return (
 		<div>
 		<div className="header">
 		  <div className="am-g">
 		 <h1>PX_老师登录</h1>
 	    <p>PX Background Management System<br/>快捷管理，大数据分析</p>
 		  </div>
 		  <hr />
 		</div>
 		<div className="am-g">
 		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
 		 <form id="login_form" method="post" className="am-form">
 	      <label htmlFor="loginname">手机号:</label>
 	      <input type="email" name="loginname" id="loginname" value={o.loginname} onChange={this.handleChange}/>
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
 	        <input type="button" name="" value="忘记密码 ^_^? " className="am-btn am-btn-default am-btn-sm am-fr" />
 	      </div>
 	      <a  href="javascript:menu_kd_group_reg_fn();" >幼儿园注册</a>|
 	      <a  href="javascript:void();" >培训机构注册</a>
 	      <br/>
 			<a  href="javascript:menu_userinfo_reg_fn();" >老师注册</a>
 	    </form>
 	    <hr/>
 	    <p>© 2015 PX, Inc. </p>

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
      <td  onClick={ajax_group_edit.bind(this,event )}>{event.brand_name}</td>
        <td  onClick={ajax_group_edit.bind(this,event )}>{event.company_name}</td>
        <td onClick={ajax_group_edit.bind(this,event )}> {event.link_tel}</td>
        <td onClick={ajax_group_edit.bind(this,event )}>{event.address}</td>
        <td onClick={ajax_group_edit.bind(this,event )}>{event.create_time}</td>
      </tr> 
    );
  }
}); 

var Group_EventsTable = React.createClass({
	handleClick: function(m) {
		 if(this.props.handleClick){
			 this.props.handleClick(m);
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
  render: function() {
    return (
    <div>
    <AMR_Sticky>
    <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add_group")} round>添加分校</AMR_Button>
	  </AMR_ButtonToolbar>
	 </AMR_Sticky>
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
    
var Group_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editGroupForm').serializeJson());
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
    	      <input type="email" name="brand_name" id="brand_name" value={o.brand_name} onChange={this.handleChange} placeholder="不超过45位"/>
    	      <br/>
    	       <label htmlFor="company_name">机构全称:</label>
    	      <input type="text" name="company_name" id="company_name" value={o.company_name} onChange={this.handleChange} placeholder="不超过45位"/>
    	      <br/>
    	       <label htmlFor="address">公司地址:</label>
    	      <input type="text" name="address" id="address" value={o.address} onChange={this.handleChange} placeholder="不超过64位"/>
    	      <br/>
    	       <label htmlFor="map_point">地址坐标:</label>
    	      <input type="text" name="map_point" id="map_point" value={o.map_point} onChange={this.handleChange} placeholder="拾取坐标后，复制到这里。格式：1.1,1.1"/> 
    	      <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">坐标拾取</a>
    	      <br/>
    	       <label htmlFor="link_tel">公司电话:</label>
    	      <input type="text" name="link_tel" id="link_tel" value={o.link_tel} onChange={this.handleChange} placeholder=""/>
    	      <br/>
    	      <button type="button"  onClick={ajax_group_save}  className="am-btn am-btn-primary">提交</button>
    	     </form>

    	     </div>
    	   </div>
    	   
    	   </div>
    );
  }
}); 

//userinfo
var Userinfo_EventRow = React.createClass({ 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      <tr className={className} >
      <td> 
      <input type="checkbox" value={event.uuid} name="table_checkbox" />
      </td>
        <td>{event.loginname}</td>
        <td>{event.name}</td>
        <td>{event.tel}</td>
        <td>{event.email}</td>
        <td>{event.sex=="0"?"男":"女"}</td>
        <td  className={"px_disable_"+event.disable}>{event.disable=="1"?"禁用":"正常"}</td>
        <td>{event.login_time}</td>
        <td>{event.create_time}</td>
      </tr> 
    );
  }
}); 

var Userinfo_EventsTable = React.createClass({
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="add_userinfo"){
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
		  ajax_uesrinfo_listByGroup($('#selectgroup_uuid').val());
	  },
  render: function() {
    return (
    <div>
    <AMR_Sticky>
    <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add_userinfo")} round>添加老师</AMR_Button>
	    <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "add_enable")} round>启用</AMR_Button>
	    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "add_disable")} round>禁用</AMR_Button>
	    <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "add_enable")} round>分配权限</AMR_Button>
	    </AMR_ButtonToolbar>
	</AMR_Sticky>
	  <hr/>
	  <div className="am-form-group">
      <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'sm'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
      {this.props.group_list.map(function(event) {
          return (<option value={event.uuid} >{event.company_name}</option>);
        })}
      </select>
    </div>
	  
      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
          	<th>  
            <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
            </th>
            <th>帐号</th>
            <th>昵称</th>
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
    
var Userinfo_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editUserinfoForm').serializeJson());
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
    		  <form id="editUserinfoForm" method="post" className="am-form">
    		     <input type="hidden" name="type"  value="1"/>
    		    <div className="am-form-group">
    		          <select id="group_uuid" name="group_uuid" data-am-selected="{btnSize: 'sm'}" value={o.group_uuid} onChange={this.handleChange}>
    		          {this.props.group_uuid_data.map(function(event) {
    		              return (<option value={event.uuid} >{event.company_name}</option>);
    		            })}
    		          </select>
    		        </div>
    		      <label htmlFor="tel">手机号码:</label>
    		      <input type="text" name="tel" id="tel" value={o.tel} onChange={this.handleChange} placeholder=""/>
    		      <br/>
    		      <label htmlFor="name">昵称:</label>
    		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
    		      <br/>
    		       <label htmlFor="">Email:</label>
    		      <input type="email" name="email" id="email" value={o.email} onChange={this.handleChange} placeholder="输入邮箱" placeholder=""/>
    		      <br/>
    		      <label htmlFor="password">密码:</label>
    		      <input type="password" name="password" id="password" value={o.password} onChange={this.handleChange} />
    		      <br/>
    		      
    		      <label htmlFor="password1">重复密码:</label>
    		      <input type="password" name="password1" id="password1" value={o.password1} onChange={this.handleChange}/>
    		      <br/>
    		      <button type="button"  onClick={ajax_userinfo_save}  className="am-btn am-btn-primary">提交</button>
    		    </form>

    	     </div>
    	   </div>
    	   
    	   </div>
    );
  }
}); 
//end userinfo




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
      <td><a href={"javascript:react_ajax_class_students_manage('"+event.uuid+"')"}>{event.name}</a></td>
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
  <AMR_Sticky>
  <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add_class")} round>添加班级</AMR_Button>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "edit_class")} round>编辑</AMR_Button>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "graduate_class")} round>毕业</AMR_Button>
	  </AMR_ButtonToolbar>
	  </AMR_Sticky>
	  <hr/>
	  <div className="am-form-group">
    <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'sm'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
    {this.props.group_list.map(function(event) {
        return (<option value={event.uuid} >{event.company_name}</option>);
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
  		     <input type="hidden" name="type"  value="1"/>
  		    <div className="am-form-group">
  		          <select id="groupuuid" name="groupuuid" data-am-selected="{btnSize: 'sm'}" value={o.groupuuid} onChange={this.handleChange}>
  		          {this.props.group_uuid_data.map(function(event) {
  		              return (<option value={event.uuid} >{event.company_name}</option>);
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
	render: function() {
		var o=this.props.formdata;
	  return (
	  <div>
	  <AMR_Sticky>
	  <AMR_ButtonToolbar>
		    <AMR_Button amStyle="primary" onClick={class_students_manage_onClick.bind(this, "add_class")} round>添加学生</AMR_Button>
		  </AMR_ButtonToolbar>
		  </AMR_Sticky>
		  <hr/>
		  <AMR_Panel>
			  <AMR_Grid className="doc-g">
			    <AMR_Col sm={4} > 班级:{o.name}</AMR_Col>
			    <AMR_Col sm={4} >班主任:{o.headTeacher_name}</AMR_Col>
			    <AMR_Col sm={4}>其他老师:{o.teacher_name}</AMR_Col>
			  </AMR_Grid>
		  </AMR_Panel>
		  <AMR_Gallery data={this.props.students} />
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
      <td><a href={"javascript:react_ajax_announce_show('"+event.uuid+"')"}>{event.title}</a></td>
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
  <AMR_Sticky>
  <AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>创建</AMR_Button>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "edit")} round>编辑</AMR_Button>
	    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "del")} round>删除</AMR_Button>
	    </AMR_ButtonToolbar>
	</AMR_Sticky>
	  <hr/>
	  <div className="am-form-group">
    <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'sm'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
    {this.props.group_list.map(function(event) {
        return (<option value={event.uuid} >{event.company_name}</option>);
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
  
var Announcements_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editAnnouncementsForm').serializeJson());
	  },
	  componentDidMount:function(){
		  $('#announce_message').xheditor();
		  return;
		  if($.fn.xheditor){
			  $('#announce_message').xheditor();
		  }else{
			  loadJS("../js/xheditor/xheditor-1.2.2.min.js",function(){
					loadJS('../js/xheditor/zh-cn.js');
					$('#announce_message').xheditor();
				});
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
  		  <form id="editAnnouncementsForm" method="post" className="am-form">
  		<input type="hidden" name="uuid"  value={o.uuid}/>
  		<input type="hidden" name="isimportant"  value={o.isimportant}/>
  		
  		<div className="am-form-group">
  		          <select id="group_uuid" name="groupuuid" data-am-selected="{btnSize: 'sm'}" value={o.group_uuid} onChange={this.handleChange}>
  		          {this.props.group_uuid_data.map(function(event) {
  		              return (<option value={event.uuid} >{event.company_name}</option>);
  		            })}
  		          </select>
  		        </div>
  		        
  		      <div className="am-form-group">
		          <select id="type" name="type" data-am-selected="{btnSize: 'sm'}" value={o.type} onChange={this.handleChange}>
		          <option value="0" >{Vo.announce_type(0)}</option>
		          <option value="1" >{Vo.announce_type(1)}</option>
		          <option value="2" >{Vo.announce_type(2)}</option>
		          </select>
		        </div>
		        <div className="am-form-group" id="div_classuuids" >
  		      <label htmlFor="tel">班级通知:</label>
  		      <input type="text" name="classuuids" id="classuuids" value={o.classuuids} onChange={this.handleChange} placeholder="班级通知，才填写"/>
  		     </div>
  		      <label htmlFor="name">标题:</label>
  		      <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} maxlength="45"   placeholder="不超过45位"/>
  		      <br/>
  		    <AMR_Input id="announce_message" type="textarea" rows="10" label="内容:" placeholder="填写内容" name="message" value={o.message} onChange={this.handleChange}/>
  		      <button type="button"  onClick={ajax_announcements_save}  className="am-btn am-btn-primary">提交</button>
  		    </form>

  	     </div>
  	   </div>
  	   
  	   </div>
  );
}
}); 





var Announcements_show = React.createClass({ 
render: function() {
	  var o = this.props.data;
  return (
		  <AMUIReact.Article
		    title={o.title}
		    meta={Store.getGroupNameByUuid(o.groupuuid)+"|"+o.create_time}>

		  <p>{o.message}</p>
		   </AMUIReact.Article>	
  );
}
}); 

//end announcements
