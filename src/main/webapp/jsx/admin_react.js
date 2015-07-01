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
 		 <h1>PX 管理云平台</h1>
 	    <p>PX Background Management System<br/>快捷管理，大数据分析</p>
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
 	        <input type="button" name="" value="忘记密码 ^_^? " className="am-btn am-btn-default am-btn-sm am-fr" />
 	      </div>
 	      <br/>
 	      
 	     <a  href="http://120.25.248.31/px-rest/admin/" > <img src="ew_admin.png" /></a>
 	    
 			
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



//right
var Right_EventRow = React.createClass({ 
	tr_onClick:function(trid,cbid,e){
		var cbox=$("#"+cbid);
		var tr=$("#"+trid);
		if(tr.hasClass("am-active")){
				cbox.prop("checked",false); 
			tr.removeClass("am-active");
		}else{
				cbox.prop("checked", true); 
			tr.addClass("am-active");
		}
	},
	componentDidMount:function(){
		$(".am-active input[type='checkbox']").prop("checked",true); 
	},
  render: function() {
    var event = this.props.event;
    var is_Checked=this.props.chooselist&&this.props.chooselist.indexOf(event.uuid)>-1;
    var className = is_Checked ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
		 <tr id={"tr_chright_"+event.uuid} className={className} onClick={this.tr_onClick.bind(this,"tr_chright_"+event.uuid,"tb_cbox__chright"+event.uuid)}>
	      <td> 
	      <input type="checkbox" alt={event.name} value={event.uuid} id={"tb_cbox__chright"+event.uuid} name="table_checkbox_right"  />
	      </td>
        <td><a href="##" onClick={ajax_right_edit.bind(this, JSON.stringify(event))}>{event.name}</a></td>
        <td>{event.description}</td>
        <td>{AdminVo.type(event.type)}</td>
      </tr> 
    );
  }
}); 

var Right_EventsTable = React.createClass({
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox_right"]').prop("checked", $("#id_checkbox_all")[0].checked); 
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
            return (<Right_EventRow chooselist={that.props.chooselist} event={event} />);
          })}
        </tbody>
      </AMUIReact.Table>
      <button type="button"  onClick={ajax_right_button_handleClick.bind(this, "add_right",this.props.type)}  className="am-btn am-btn-primary">添加权限</button>
      </div>
    );
  }
});
    
var Right_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editRightForm').serializeJson());
	  },
  render: function() {
	  var o = this.state;
    return (
    		<div>
    		<div className="header">
    		  <div className="am-g">
    		    <h1>编辑权限-【{AdminVo.type(o.type)}】</h1>
    		  </div>
    		  <hr />
    		</div>
    		<div className="am-g">
    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    		  <form id="editRightForm" method="post" className="am-form">
    			<input type="hidden" name="uuid"  value={o.uuid}/>
    			<input type="hidden" name="type"  value={o.type}/>
    		      <label htmlFor="name">名字:</label>
    		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
    		      <br/>
    		       <label htmlFor="description">描述:</label>
    		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange}/>
    		      <button type="button"  onClick={ajax_right_save}  className="am-btn am-btn-primary">提交</button>
    		    </form>

    	     </div>
    	   </div>
    	   
    	   </div>
    );
  }
}); 
//end right




//role
var Role_EventRow = React.createClass({ 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    <tr className={className} >
    <td> 
    <input type="checkbox" value={event.uuid} name="table_checkbox" />
    </td>
      <td><a href="javascript:void(0);" onClick={ajax_role_edit.bind(this, event)}>{event.name}</a></td>
      <td>{event.description}</td>
      <td>{AdminVo.type(event.type)}</td>
      <td><a href="javascript:void(0);" onClick={ajax_role_bind_right.bind(this, event)}>绑定权限</a>
     </td>
    </tr> 
  );
}
}); 

var Role_EventsTable = React.createClass({
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="add_role"){
				 this.props.handleClick(m,$('#select_role_type').val());
				 return;
			 } 
			 
			 var uuids=null;
			 $("input[name='table_checkbox']").each(function(){
				
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
			  
			  
			  if(m=="role_bind_right"){
				if(uuids.indexOf(",")>-1){
					 alert("只能选择一条数据!");
					  return;
				}
			  
			  }
			 this.props.handleClick(m,$('#selectgroup_uuid').val(),uuids);
			 
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_select_role_type:function(){
		  ajax_role_list($('#select_role_type').val());
	  },
render: function() {
  return (
  <div>
  <AMUIReact.ButtonToolbar>
	    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this, "add_role")} round>添加</AMUIReact.Button>
	 </AMUIReact.ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
    <select id="select_role_type" name="group_uuid"  value={this.props.type} onChange={this.handleChange_select_role_type}>
    <option value="0" >{AdminVo.type(0)}</option>
    <option value="1" >{AdminVo.type(1)}</option>
    </select>
  </div>
  <div className="header">
  <div className="am-g">
    <h1>角色管理</h1>
  </div>
  <hr />
</div>
    <AMUIReact.Table {...this.props}>  
      <thead> 
        <tr>
        	<th>  
          <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
          </th>
          <th>名称</th>
          <th>描述</th>
          <th>类型</th>
          <th>操作</th>
        </tr> 
      </thead>
      <tbody>
        {this.props.events.map(function(event) {
          return (<Role_EventRow key={event.id} event={event} />);
        })}
      </tbody>
    </AMUIReact.Table>
    </div>
  );
}
});
  
var Role_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editRoleForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
  return (
  		<div>
  		<div className="header">
  		  <div className="am-g">
  		    <h1>编辑角色</h1>
  		  </div>
  		  <hr />
  		</div>
  		<div className="am-g">
  		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
  		  <form id="editRoleForm" method="post" className="am-form">
  			<input type="hidden" name="uuid"  value={o.uuid}/>
  		    <div className="am-form-group">
  		          <select id="type" name="type"  value={o.type} onChange={this.handleChange}>
  		          <option value="0" >{AdminVo.type(0)}</option>
  		          <option value="1" >{AdminVo.type(1)}</option>
  		          </select>
  		        </div>
  		      <label htmlFor="name">名字:</label>
  		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
  		      <br/>
  		       <label htmlFor="description">描述:</label>
  		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange}/>
  		      <button type="button"  onClick={ajax_role_save}  className="am-btn am-btn-primary">提交</button>
  		    </form>

  	     </div>
  	   </div>
  	   
  	   </div>
  );
}
}); 


var Role_bind_right = React.createClass({ 
	
render: function() {
	  var o = this.props.formdata;
  return (
  		<div>
	  		<div className="header">
		  		  <div className="am-g">
		  		    <h1>角色绑定权限-【{AdminVo.type(o.type)}】-【{o.name}】</h1>
		  		  </div>
	  		</div>
  			<button type="button"  onClick={btn_ajax_updateRight.bind(this, o.uuid)}  className="am-btn am-btn-primary">提交</button>
	  		<Right_EventsTable {...this.props}/>
	  	   
  	   </div>
  );
}
}); 
//end role 

//end role bind right




//basedatatype
var Basedatatype_EventRow = React.createClass({ 
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  <tr className={className} >
  <td> 
  <input type="checkbox" value={event.uuid} name="table_checkbox" />
  </td>
    <td><a href="##" onClick={ajax_basedatatype_edit.bind(this, event)}>{event.name}</a></td>
    <td>{event.description}</td>
    <td><a href="javascript:void(0);" onClick={ajax_basedatatype_bind_basedatalist.bind(this, JSON.stringify(event))}>详细</a></td>
  </tr> 
);
}
}); 

var Basedatatype_EventsTable = React.createClass({
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="add_basedatatype"){
				 this.props.handleClick(m);
				 return;
			 }
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_select_basedatatype_type:function(){
		  ajax_basedatatype_list($('#select_basedatatype_type').val());
	  },
render: function() {
return (
<div>
<div className="header">
<div className="am-g">
  <h1>编辑基础数据类型</h1>
</div>
<hr />
</div>
<AMUIReact.ButtonToolbar>
	    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this, "add_basedatatype")} round>添加</AMUIReact.Button>
	 </AMUIReact.ButtonToolbar>
	  <hr/>
	  
  <AMUIReact.Table {...this.props}>  
    <thead> 
      <tr>
      	<th>  
        <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
        </th>
        <th>名称</th>
        <th>描述</th>
        <th>操作</th>
      </tr> 
    </thead>
    <tbody>
      {this.props.events.map(function(event) {
        return (<Basedatatype_EventRow key={event.id} event={event} />);
      })}
    </tbody>
  </AMUIReact.Table>
  </div>
);
}
});

var Basedatatype_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editBasedatatypeForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>编辑基础数据类型</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		  <form id="editBasedatatypeForm" method="post" className="am-form">
			<input type="hidden" name="uuid"  value={o.uuid}/>
		      <label htmlFor="name">名字:</label>
		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
		      <br/>
		       <label htmlFor="description">描述:</label>
		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange}/>
		      <button type="button"  onClick={ajax_basedatatype_save}  className="am-btn am-btn-primary">提交</button>
		    </form>

	     </div>
	   </div>
	   
	   </div>
);
}
}); 
//end basedatatype

// basedatatypelist
var Basedatatype_bind_basedatalist = React.createClass({ 
	
render: function() {
	  var o = this.props.formdata;
  return (
  		<div>
	  		<div className="header">
		  		  <div className="am-g">
		  		    <h1>基础数据【{o.name}】</h1>
		  		  </div>
	  		</div>
  			<button type="button"  onClick={Queue.doBackFN.bind(Queue)}  className="am-btn am-btn-primary">返回</button>
	  		<Basedatalist_EventsTable {...this.props}/>
	  	   
  	   </div>
  );
}
}); 

var Basedatalist_EventRow = React.createClass({ 
	
  render: function() {
    var event = this.props.event;

    return (
		 <tr>
        <td><a href="##" onClick={btn_click_basedatatypelist.bind(this,"edit", JSON.stringify(event))}>{event.datakey}</a></td>
        <td>{event.datavalue}</td>
        <td>{AdminVo.get("enable_"+event.enable)}</td>
        <td>{event.description}</td>
      </tr> 
    );
  }
}); 

var Basedatalist_EventsTable = React.createClass({
  render: function() {
	  var that=this;
    return (
    		<div>
      <AMUIReact.Table {...this.props}>  
        <thead> 
          <tr>
            <th>Key</th>
            <th>显示名</th>
            <th>
            状态
            </th>
            <th>描述</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Basedatalist_EventRow  event={event} />);
          })}
        </tbody>
      </AMUIReact.Table>
      <button type="button"  onClick={btn_click_basedatatypelist.bind(this, "add",{typeuuid:this.props.formdata.name})}  className="am-btn am-btn-primary">添加</button>
      </div>
    );
  }
});
    

var Basedatatypelist_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editBasedatatypelistForm').serializeJson());
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
    		  <form id="editBasedatatypelistForm" method="post" className="am-form">
    			<input type="hidden" name="uuid"  value={o.uuid}/>
    			<input type="hidden" name="typeuuid"  value={o.typeuuid}/>
    		      <label >key[数字1-100]:</label>
    		      <input type="text" name="datakey"  value={o.datakey} onChange={this.handleChange} placeholder="不超过15位,一般是数字,[0-100]"/>
    		      <br/>
    		       <label >显示名:</label>
    		      <input type="text" name="datavalue"	  value={o.datavalue} onChange={this.handleChange}/>
    		      <label htmlFor="description">描述:</label>
    		      <input type="text" name="description"  value={o.description} onChange={this.handleChange}/>
    		      <label htmlFor="enable">描述:</label>
    		      <div className="am-form-group">
    		      
    		      <select  name="enable" value={this.props.enable} onChange={this.handleChange}>
    		      <option value="1" >{AdminVo.get("enable_1")}</option>
    		      <option value="0" >{AdminVo.get("enable_0")}</option>
    		      </select>
    		    </div>
    			      
    		      
    		      <button type="button"  onClick={ajax_basedatatypelist_save}  className="am-btn am-btn-primary">提交</button>
    		    </form>

    	     </div>
    	   </div>
    	   
    	   </div>
    );
  }
}); 
//end basedatatypelist
