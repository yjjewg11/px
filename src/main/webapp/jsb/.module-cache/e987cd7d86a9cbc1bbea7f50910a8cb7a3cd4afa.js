var Group_EventRow = React.createClass({displayName: "Group_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {className: className}, 
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
	handleClick: function(obj) {
	    
	  },
  render: function() {
    return (
    React.createElement("div", null, 
    React.createElement(AMUIReact_ButtonToolbar, null, 
	    React.createElement(AMUIReact_Button, {round: true}, "Default"), 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", round: true}, "添加分校"), 
	    React.createElement(AMUIReact_Button, {amStyle: "secondary", round: true}, "Secondary"), 
	    React.createElement(AMUIReact_Button, {amStyle: "success", round: true}, "Success"), 
	    React.createElement(AMUIReact_Button, {amStyle: "warning", round: true}, "Warning"), 
	    React.createElement(AMUIReact_Button, {amStyle: "danger", round: true}, "Danger")
	  ), 
 
    	
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
