
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
        React.createElement("td", null, event.name), 
        React.createElement("td", null, event.type), 
        React.createElement("td", null, event.description)
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
			  
			 this.props.handleClick(m,$('#select_right_type').val(),uuids);
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_select_right_type:function(){
		  ajax_uesrinfo_listByGroup($('#select_right_type').val());
	  },
  render: function() {
    return (
    React.createElement("div", null, 
    React.createElement(AMR_ButtonToolbar, null, 
	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_right"), round: true}, "添加老师"), 
	    React.createElement(AMR_Button, {amStyle: "success", onClick: this.handleClick.bind(this, "add_enable"), round: true}, "启用"), 
	    React.createElement(AMR_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "add_disable"), round: true}, "禁用"), 
	    React.createElement(AMR_Button, {amStyle: "success", onClick: this.handleClick.bind(this, "add_enable"), round: true}, "分配权限")
	 ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
      React.createElement("select", {id: "select_right_type", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: this.props.group_uuid, onChange: this.handleChange_select_right_type}, 
      this.props.group_list.map(function(event) {
          return (React.createElement("option", {value: event.uuid}, event.company_name));
        })
      )
    ), 
	  
      React.createElement(AMR_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          	React.createElement("th", null, 
            React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
            ), 
            React.createElement("th", null, "名称"), 
            React.createElement("th", null, "类型"), 
            React.createElement("th", null, "描述")
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
    		    React.createElement("h1", null, "编辑")
    		  ), 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  React.createElement("form", {id: "editRightForm", method: "post", className: "am-form"}, 
    			React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
    		    React.createElement("div", {className: "am-form-group"}, 
    		          React.createElement("select", {id: "type", name: "type", "data-am-selected": "{btnSize: 'sm'}", value: o.group_uuid, onChange: this.handleChange}, 
    		          React.createElement("option", {value: "0"}, "管理员"), 
    		          React.createElement("option", {value: "1"}, "幼儿园")
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
