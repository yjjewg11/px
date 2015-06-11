var Group_EventRow = React.createClass({displayName: "Group_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {className: className, onClick: ajax_group_edit.bind(this,event)}, 
        React.createElement("td", null, event.brand_name), 
        React.createElement("td", null, event.company_name), 
        React.createElement("td", null, event.address), 
        React.createElement("td", null, event.create_time)
      )
    );
  }
}); 

var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;


var Group_EventsTable = React.createClass({displayName: "Group_EventsTable",
	handleClick: function(m) {
		 if(this.props.handleClick){
			 this.props.handleClick(m);
		 }
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
            React.createElement("th", null, "品牌名"), 
            React.createElement("th", null, "机构全称"), 
            React.createElement("th", null, "公司地址"), 
            React.createElement("th", null, " ")
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
    	  render: function() {
    		  var o = this.props.formdata;
    	    return (
    	    		React.createElement("div", null, 
    	    		React.createElement("div", {className: "header"}, 
    	    		  React.createElement("div", {className: "am-g"}, 
    	    		    React.createElement("h1", null, "添加机构")
    	    		  ), 
    	    		  React.createElement("hr", null)
    	    		), 
    	    		React.createElement("div", {className: "am-g"}, 
    	    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    	    		  
    	    		React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
    	    		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    	    	    React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
    	    	      React.createElement("label", {htmlFor: "brand_name"}, "品牌名:"), 
    	    	      React.createElement("input", {type: "email", name: "brand_name", id: "brand_name", value: o.brand_name, placeholder: "机构名不能为空！，且长度不能超过45位！"}), 
    	    	      React.createElement("br", null), 
    	    	       React.createElement("label", {htmlFor: "company_name"}, "机构全称:"), 
    	    	      React.createElement("input", {type: "text", name: "company_name", id: "company_name", value: o.company_name, placeholder: "机构名不能为空！，且长度不能超过45位！"}), 
    	    	      React.createElement("br", null), 
    	    	       React.createElement("label", {htmlFor: "address"}, "公司地址:"), 
    	    	      React.createElement("input", {type: "text", name: "address", id: "address", value: o.address, placeholder: "联系地址不能为空！，且长度不能超过64位！"}), 
    	    	      React.createElement("br", null), 
    	    	       React.createElement("label", {htmlFor: "map_point"}, "地址坐标:"), 
    	    	      React.createElement("input", {type: "text", name: "map_point", id: "map_point", value: o.map_point, placeholder: "拾取坐标后，复制到这里。格式：104.074822,30.6623"}), 
    	    	      React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取"), 
    	    	      React.createElement("br", null), 
    	    	       React.createElement("label", {htmlFor: "link_tel"}, "公司电话:"), 
    	    	      React.createElement("input", {type: "text", name: "link_tel", id: "link_tel", value: o.link_tel, placeholder: ""}), 
    	    	      React.createElement("br", null), 
    	    	      React.createElement("button", {type: "button", onClick: ajax_group_save, className: "am-btn am-btn-primary"}, "提交")
    	    	     )

    	    	     )
    	    	   )
    	    	   
    	    	   )
    	    );
    	  }
    	}); 
