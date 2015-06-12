
//
var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;


var Group_EventRow = React.createClass({displayName: "Group_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {className: className}, 
      React.createElement("td", null, 
      React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
      ), 
      React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, event.brand_name), 
        React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, event.company_name), 
        React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, " ", event.link_tel), 
        React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, event.address), 
        React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, event.create_time)
      ) 
    );
  }
}); 

var Group_EventsTable = React.createClass({displayName: "Group_EventsTable",
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
    React.createElement("div", null, 
    React.createElement(AMUIReact_ButtonToolbar, null, 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_group"), round: true}, "添加分校")
	  ), 
	  React.createElement("hr", null), 
      React.createElement(AMUIReact_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          React.createElement("th", null, 
          React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
          ), 
            React.createElement("th", null, "品牌名"), 
            React.createElement("th", null, "机构全称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "公司地址"), 
            React.createElement("th", null, "创建时间")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Group_EventRow, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});
    
var Group_edit = React.createClass({displayName: "Group_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editGroupForm').serializeJson());
	  },
  render: function() {
	  var o = this.state;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("div", {className: "am-g"}, 
    		    React.createElement("h1", null, "编辑")
    		  ), 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  
    		React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
    		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    	    React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
    	      React.createElement("label", {htmlFor: "brand_name"}, "品牌名:"), 
    	      React.createElement("input", {type: "email", name: "brand_name", id: "brand_name", value: o.brand_name, onChange: this.handleChange, placeholder: "机构名不能为空！，且长度不能超过45位！"}), 
    	      React.createElement("br", null), 
    	       React.createElement("label", {htmlFor: "company_name"}, "机构全称:"), 
    	      React.createElement("input", {type: "text", name: "company_name", id: "company_name", value: o.company_name, onChange: this.handleChange, placeholder: "机构名不能为空！，且长度不能超过45位！"}), 
    	      React.createElement("br", null), 
    	       React.createElement("label", {htmlFor: "address"}, "公司地址:"), 
    	      React.createElement("input", {type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: "联系地址不能为空！，且长度不能超过64位！"}), 
    	      React.createElement("br", null), 
    	       React.createElement("label", {htmlFor: "map_point"}, "地址坐标:"), 
    	      React.createElement("input", {type: "text", name: "map_point", id: "map_point", value: o.map_point, onChange: this.handleChange, placeholder: "拾取坐标后，复制到这里。格式：104.074822,30.6623"}), 
    	      React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取"), 
    	      React.createElement("br", null), 
    	       React.createElement("label", {htmlFor: "link_tel"}, "公司电话:"), 
    	      React.createElement("input", {type: "text", name: "link_tel", id: "link_tel", value: o.link_tel, onChange: this.handleChange, placeholder: ""}), 
    	      React.createElement("br", null), 
    	      React.createElement("button", {type: "button", onClick: ajax_group_save, className: "am-btn am-btn-primary"}, "提交")
    	     )

    	     )
    	   )
    	   
    	   )
    );
  }
}); 

//userinfo
/**
 * ajax_userinfo_edit
 */

var Userinfo_EventRow = React.createClass({displayName: "Userinfo_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {className: className}, 
      React.createElement("td", null, 
      React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
      ), 
        React.createElement("td", null, event.loginname), 
        React.createElement("td", null, event.name), 
        React.createElement("td", null, event.tel), 
        React.createElement("td", null, event.email), 
        React.createElement("td", null, event.sex=="0"?"男":"女"), 
        React.createElement("td", {className: "px_disable_"+event.disable}, event.disable=="1"?"禁用":"正常"), 
        React.createElement("td", null, event.login_time), 
        React.createElement("td", null, event.create_time)
      ) 
    );
  }
}); 

var Userinfo_EventsTable = React.createClass({displayName: "Userinfo_EventsTable",
	handleClick: function(m) {
		 if(this.props.handleClick){
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				
				　if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					　uuids+=this.value + ',';    //遍历被选中CheckBox元素的集合 得到Value值
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
		  ajax_uesrinfo_listByGroup($('#selectgroup_uuid').value);
	  },
  render: function() {
    return (
    React.createElement("div", null, 
    React.createElement(AMUIReact_ButtonToolbar, null, 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_userinfo"), round: true}, "添加老师"), 
	    React.createElement(AMUIReact_Button, {amStyle: "success", onClick: this.handleClick.bind(this, "add_enable"), round: true}, "启用"), 
	    React.createElement(AMUIReact_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "add_disable"), round: true}, "禁用")
	  ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
      React.createElement("select", {id: "selectgroup_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: this.props.group_uuid, onChange: this.handleChange_selectgroup_uuid}, 
      this.props.group_list.map(function(event) {
          return (React.createElement("option", {value: event.uuid}, event.company_name));
        })
      )
    ), 
	  
      React.createElement(AMUIReact_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          	React.createElement("th", null, 
            React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
            ), 
            React.createElement("th", null, "帐号"), 
            React.createElement("th", null, "昵称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "邮箱"), 
            React.createElement("th", null, "性别"), 
            React.createElement("th", null, "状态"), 
            React.createElement("th", null, "登录时间"), 
            React.createElement("th", null, "创建时间")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Userinfo_EventRow, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});
    
var Userinfo_edit = React.createClass({displayName: "Userinfo_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editUserinfoForm').serializeJson());
	  },
  render: function() {
	  var o = this.state;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("div", {className: "am-g"}, 
    		    React.createElement("h1", null, "编辑")
    		  ), 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  React.createElement("form", {id: "editUserinfoForm", method: "post", className: "am-form"}, 
    		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
    		    React.createElement("div", {className: "am-form-group"}, 
    		          React.createElement("select", {id: "group_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: o.group_uuid, onChange: this.handleChange}, 
    		          this.props.group_uuid_data.map(function(event) {
    		              return (React.createElement("option", {value: event.uuid}, event.company_name));
    		            })
    		          )
    		        ), 
    		      React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
    		      React.createElement("input", {type: "text", name: "tel", id: "tel", value: o.tel, onChange: this.handleChange, placeholder: ""}), 
    		      React.createElement("br", null), 
    		      React.createElement("label", {htmlFor: "name"}, "昵称:"), 
    		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "昵称不能为空，且长度不能超过15位！"}), 
    		      React.createElement("br", null), 
    		       React.createElement("label", {htmlFor: ""}, "Email:"), 
    		      React.createElement("input", {type: "email", name: "email", id: "email", value: o.email, onChange: this.handleChange, placeholder: "输入邮箱", placeholder: ""}), 
    		      React.createElement("br", null), 
    		      React.createElement("label", {htmlFor: "password"}, "密码:"), 
    		      React.createElement("input", {type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange}), 
    		      React.createElement("br", null), 
    		      
    		      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
    		      React.createElement("input", {type: "password", name: "password1", id: "password1", value: o.password1, onChange: this.handleChange}), 
    		      React.createElement("br", null), 
    		      React.createElement("button", {type: "button", onClick: ajax_userinfo_save, className: "am-btn am-btn-primary"}, "提交")
    		    )

    	     )
    	   )
    	   
    	   )
    );
  }
}); 
//end userinfo




//class

var Class_EventRow = React.createClass({displayName: "Class_EventRow", 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    React.createElement("tr", {className: className}, 
    React.createElement("td", null, 
    React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
    ), 
      React.createElement("td", null, event.name), 
      React.createElement("td", null, event.createUser), 
      React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 
      React.createElement("td", null, event.create_time)
    ) 
  );
}
}); 
var Class_EventsTable = React.createClass({displayName: "Class_EventsTable",
render: function() {
  return (
  React.createElement("div", null, 
  React.createElement(AMUIReact_ButtonToolbar, null, 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_class"), round: true}, "添加班级")
	  ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
    React.createElement("select", {id: "selectgroup_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: this.props.group_uuid, onChange: this.handleChange_selectgroup_uuid}, 
    this.props.group_list.map(function(event) {
        return (React.createElement("option", {value: event.uuid}, event.company_name));
      })
    )
  ), 
	  
    React.createElement(AMUIReact_Table, React.__spread({},  this.props), 
      React.createElement("thead", null, 
        React.createElement("tr", null, 
        	React.createElement("th", null, 
          React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
          ), 
          React.createElement("th", null, "班级"), 
          React.createElement("th", null, "创建人"), 
          React.createElement("th", null, "学校"), 
          React.createElement("th", null, "创建时间")
        )
      ), 
      React.createElement("tbody", null, 
        this.props.events.map(function(event) {
          return (React.createElement(Class_EventRow, {key: event.id, event: event}));
        })
      )
    )
    )
  );
},
handleClick: function(m) {
	 if(this.props.handleClick){
		 var uuids=null;
		 $($("input[name='table_checkbox']")).each(function(){
			
			　if(this.checked){
				 if(uuids==null)uuids=this.value;
				 else
				　uuids+=this.value + ',';    //遍历被选中CheckBox元素的集合 得到Value值
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
	  ajax_class_listByGroup($('#selectgroup_uuid').value);
 }
});
  
var Class_edit = React.createClass({displayName: "Class_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editClassForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
  return (
  		React.createElement("div", null, 
  		React.createElement("div", {className: "header"}, 
  		  React.createElement("div", {className: "am-g"}, 
  		    React.createElement("h1", null, "编辑")
  		  ), 
  		  React.createElement("hr", null)
  		), 
  		React.createElement("div", {className: "am-g"}, 
  		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
  		  React.createElement("form", {id: "editClassForm", method: "post", className: "am-form"}, 
  		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
  		    React.createElement("div", {className: "am-form-group"}, 
  		          React.createElement("select", {id: "group_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: o.group_uuid, onChange: this.handleChange}, 
  		          this.props.group_uuid_data.map(function(event) {
  		              return (React.createElement("option", {value: event.uuid}, event.company_name));
  		            })
  		          )
  		        ), 
  		    
  		      React.createElement("label", {htmlFor: "name"}, "班级:"), 
  		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "班级名不能为空！，且长度不能超过45位！"}), 
  		      React.createElement("br", null), 
  		    React.createElement("label", {htmlFor: "name"}, "班主任:"), 
  		    React.createElement("input", {type: "hidden", name: "teacher", id: "teacher", value: o.teacher}), 
		      React.createElement("input", {type: "text", id: "teacher_name", value: o.teacher_name, onChange: this.handleChange, placeholder: ""}), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "name"}, "班主任:"), 
	  		    React.createElement("input", {type: "hidden", name: "headTeacher", id: "headTeacher", value: o.headTeacher}), 
			      React.createElement("input", {type: "text", id: "headTeacher_name", value: o.headTeacher_name, onChange: this.handleChange, placeholder: ""}), 
			      React.createElement("br", null), 
		      
		      
  		       React.createElement("label", {htmlFor: ""}, "Email:"), 
  		      React.createElement("input", {type: "email", name: "teacher", id: "teacher", value: o.email, onChange: this.handleChange, placeholder: "输入邮箱", placeholder: ""}), 
  		      React.createElement("br", null), 
  		      React.createElement("label", {htmlFor: "password"}, "密码:"), 
  		      React.createElement("input", {type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange}), 
  		      React.createElement("br", null), 
  		      
  		      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
  		      React.createElement("input", {type: "password", name: "password1", id: "password1", value: o.password1, onChange: this.handleChange}), 
  		      React.createElement("br", null), 
  		      React.createElement("button", {type: "button", onClick: ajax_class_save, className: "am-btn am-btn-primary"}, "提交")
  		    )

  	     )
  	   )
  	   
  	   )
  );
}
}); 
//end class
