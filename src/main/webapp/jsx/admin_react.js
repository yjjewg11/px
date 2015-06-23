
//right
var Right_EventRow = React.createClass({ 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      <tr className={className} >
      <td> 
      <input type="checkbox" value={event.uuid} name="table_checkbox" />
      </td>
        <td><a href="##" onClick={ajax_right_edit.bind(this, event)}>{event.name}</a></td>
        <td>{event.description}</td>
        <td>{AdminVo.type(event.type)}</td>
      </tr> 
    );
  }
}); 

var Right_EventsTable = React.createClass({
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="add_right"){
				 this.props.handleClick(m,$('#select_right_type').val());
				 return;
			 }
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_select_right_type:function(){
		  ajax_right_list($('#select_right_type').val());
	  },
  render: function() {
    return (
    <div>
    <AMUIReact.ButtonToolbar>
	    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this, "add_right")} round>添加</AMUIReact.Button>
	 </AMUIReact.ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
      <select id="select_right_type" name="group_uuid"  value={this.props.type} onChange={this.handleChange_select_right_type}>
      <option value="0" >{AdminVo.type(0)}</option>
      <option value="1" >{AdminVo.type(1)}</option>
      </select>
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
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Right_EventRow key={event.id} event={event} />);
          })}
        </tbody>
      </AMUIReact.Table>
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
    		    <h1>编辑权限</h1>
    		  </div>
    		  <hr />
    		</div>
    		<div className="am-g">
    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    		  <form id="editRightForm" method="post" className="am-form">
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
    		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange} placeholder="输入邮箱" placeholder=""/>
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
      <td><a href="##" onClick={ajax_role_edit.bind(this, event)}>{event.name}</a></td>
      <td>{event.description}</td>
      <td>{AdminVo.type(event.type)}</td>
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
  		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange} placeholder="输入邮箱" placeholder=""/>
  		      <button type="button"  onClick={ajax_role_save}  className="am-btn am-btn-primary">提交</button>
  		    </form>

  	     </div>
  	   </div>
  	   
  	   </div>
  );
}
}); 
//end role




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
<AMUIReact.ButtonToolbar>
	    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this, "add_basedatatype")} round>添加</AMUIReact.Button>
	 </AMUIReact.ButtonToolbar>
	  <hr/>
</div>
	  
  <AMUIReact.Table {...this.props}>  
    <thead> 
      <tr>
      	<th>  
        <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
        </th>
        <th>名称</th>
        <th>描述</th>
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
		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange} placeholder="输入邮箱" placeholder=""/>
		      <button type="button"  onClick={ajax_basedatatype_save}  className="am-btn am-btn-primary">提交</button>
		    </form>

	     </div>
	   </div>
	   
	   </div>
);
}
}); 
//end basedatatype
