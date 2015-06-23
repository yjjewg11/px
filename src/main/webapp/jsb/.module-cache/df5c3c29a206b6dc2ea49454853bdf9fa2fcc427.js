
//right
var Right_EventRow = React.createClass({displayName: "Right_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {className: className}, 
      React.createElement("td", null, 
      React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
      ), 
        React.createElement("td", null, React.createElement("a", {href: "##", onClick: ajax_right_edit.bind(this, event)}, event.name)), 
        React.createElement("td", null, event.description), 
        React.createElement("td", null, AdminVo.type(event.type))
      ) 
    );
  }
}); 

var Right_EventsTable = React.createClass({displayName: "Right_EventsTable",
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
    React.createElement("div", null, 
    React.createElement(AMUIReact.ButtonToolbar, null, 
	    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_right"), round: true}, "添加")
	 ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
      React.createElement("select", {id: "select_right_type", name: "group_uuid", value: this.props.type, onChange: this.handleChange_select_right_type}, 
      React.createElement("option", {value: "0"}, AdminVo.type(0)), 
      React.createElement("option", {value: "1"}, AdminVo.type(1))
      )
    ), 
	  
      React.createElement(AMUIReact.Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          	React.createElement("th", null, 
            React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
            ), 
            React.createElement("th", null, "名称"), 
            React.createElement("th", null, "描述"), 
            React.createElement("th", null, "类型")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Right_EventRow, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});
    
var Right_edit = React.createClass({displayName: "Right_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editRightForm').serializeJson());
	  },
  render: function() {
	  var o = this.state;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("div", {className: "am-g"}, 
    		    React.createElement("h1", null, "编辑权限")
    		  ), 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  React.createElement("form", {id: "editRightForm", method: "post", className: "am-form"}, 
    			React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    		    React.createElement("div", {className: "am-form-group"}, 
    		          React.createElement("select", {id: "type", name: "type", value: o.type, onChange: this.handleChange}, 
    		          React.createElement("option", {value: "0"}, AdminVo.type(0)), 
    		          React.createElement("option", {value: "1"}, AdminVo.type(1))
    		          )
    		        ), 
    		      React.createElement("label", {htmlFor: "name"}, "名字:"), 
    		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过15位"}), 
    		      React.createElement("br", null), 
    		       React.createElement("label", {htmlFor: "description"}, "描述:"), 
    		      React.createElement("input", {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange, placeholder: "输入邮箱", placeholder: ""}), 
    		      React.createElement("button", {type: "button", onClick: ajax_right_save, className: "am-btn am-btn-primary"}, "提交")
    		    )

    	     )
    	   )
    	   
    	   )
    );
  }
}); 
//end right





//role
var Role_EventRow = React.createClass({displayName: "Role_EventRow", 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    React.createElement("tr", {className: className}, 
    React.createElement("td", null, 
    React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
    ), 
      React.createElement("td", null, React.createElement("a", {href: "##", onClick: ajax_role_edit.bind(this, event)}, event.name)), 
      React.createElement("td", null, event.description), 
      React.createElement("td", null, AdminVo.type(event.type))
    ) 
  );
}
}); 

var Role_EventsTable = React.createClass({displayName: "Role_EventsTable",
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
  React.createElement("div", null, 
  React.createElement(AMUIReact.ButtonToolbar, null, 
	    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_role"), round: true}, "添加")
	 ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
    React.createElement("select", {id: "select_role_type", name: "group_uuid", value: this.props.type, onChange: this.handleChange_select_role_type}, 
    React.createElement("option", {value: "0"}, AdminVo.type(0)), 
    React.createElement("option", {value: "1"}, AdminVo.type(1))
    )
  ), 
	  
    React.createElement(AMUIReact.Table, React.__spread({},  this.props), 
      React.createElement("thead", null, 
        React.createElement("tr", null, 
        	React.createElement("th", null, 
          React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
          ), 
          React.createElement("th", null, "名称"), 
          React.createElement("th", null, "描述"), 
          React.createElement("th", null, "类型")
        )
      ), 
      React.createElement("tbody", null, 
        this.props.events.map(function(event) {
          return (React.createElement(Role_EventRow, {key: event.id, event: event}));
        })
      )
    )
    )
  );
}
});
  
var Role_edit = React.createClass({displayName: "Role_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editRoleForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
  return (
  		React.createElement("div", null, 
  		React.createElement("div", {className: "header"}, 
  		  React.createElement("div", {className: "am-g"}, 
  		    React.createElement("h1", null, "编辑角色")
  		  ), 
  		  React.createElement("hr", null)
  		), 
  		React.createElement("div", {className: "am-g"}, 
  		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
  		  React.createElement("form", {id: "editRoleForm", method: "post", className: "am-form"}, 
  			React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
  		    React.createElement("div", {className: "am-form-group"}, 
  		          React.createElement("select", {id: "type", name: "type", value: o.type, onChange: this.handleChange}, 
  		          React.createElement("option", {value: "0"}, AdminVo.type(0)), 
  		          React.createElement("option", {value: "1"}, AdminVo.type(1))
  		          )
  		        ), 
  		      React.createElement("label", {htmlFor: "name"}, "名字:"), 
  		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过15位"}), 
  		      React.createElement("br", null), 
  		       React.createElement("label", {htmlFor: "description"}, "描述:"), 
  		      React.createElement("input", {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange, placeholder: "输入邮箱", placeholder: ""}), 
  		      React.createElement("button", {type: "button", onClick: ajax_role_save, className: "am-btn am-btn-primary"}, "提交")
  		    )

  	     )
  	   )
  	   
  	   )
  );
}
}); 
//end role




//basedatatype
var Basedatatype_EventRow = React.createClass({displayName: "Basedatatype_EventRow", 
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  React.createElement("tr", {className: className}, 
  React.createElement("td", null, 
  React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
  ), 
    React.createElement("td", null, React.createElement("a", {href: "##", onClick: ajax_basedatatype_edit.bind(this, event)}, event.name)), 
    React.createElement("td", null, event.description), 
    React.createElement("td", null, AdminVo.type(event.type))
  ) 
);
}
}); 

var Basedatatype_EventsTable = React.createClass({displayName: "Basedatatype_EventsTable",
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="add_basedatatype"){
				 this.props.handleClick(m,$('#select_basedatatype_type').val());
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
React.createElement("div", null, 
React.createElement(AMUIReact.ButtonToolbar, null, 
	    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_basedatatype"), round: true}, "添加")
	 ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
  React.createElement("select", {id: "select_basedatatype_type", name: "group_uuid", value: this.props.type, onChange: this.handleChange_select_basedatatype_type}, 
  React.createElement("option", {value: "0"}, AdminVo.type(0)), 
  React.createElement("option", {value: "1"}, AdminVo.type(1))
  )
), 
	  
  React.createElement(AMUIReact.Table, React.__spread({},  this.props), 
    React.createElement("thead", null, 
      React.createElement("tr", null, 
      	React.createElement("th", null, 
        React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
        ), 
        React.createElement("th", null, "名称"), 
        React.createElement("th", null, "描述"), 
        React.createElement("th", null, "类型")
      )
    ), 
    React.createElement("tbody", null, 
      this.props.events.map(function(event) {
        return (React.createElement(Basedatatype_EventRow, {key: event.id, event: event}));
      })
    )
  )
  )
);
}
});

var Basedatatype_edit = React.createClass({displayName: "Basedatatype_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editBasedatatypeForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		    React.createElement("h1", null, "编辑基础数据类型")
		  ), 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		  React.createElement("form", {id: "editBasedatatypeForm", method: "post", className: "am-form"}, 
			React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		    React.createElement("div", {className: "am-form-group"}, 
		          React.createElement("select", {id: "type", name: "type", value: o.type, onChange: this.handleChange}, 
		          React.createElement("option", {value: "0"}, AdminVo.type(0)), 
		          React.createElement("option", {value: "1"}, AdminVo.type(1))
		          )
		        ), 
		      React.createElement("label", {htmlFor: "name"}, "名字:"), 
		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过15位"}), 
		      React.createElement("br", null), 
		       React.createElement("label", {htmlFor: "description"}, "描述:"), 
		      React.createElement("input", {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange, placeholder: "输入邮箱", placeholder: ""}), 
		      React.createElement("button", {type: "button", onClick: ajax_basedatatype_save, className: "am-btn am-btn-primary"}, "提交")
		    )

	     )
	   )
	   
	   )
);
}
}); 
//end basedatatype
