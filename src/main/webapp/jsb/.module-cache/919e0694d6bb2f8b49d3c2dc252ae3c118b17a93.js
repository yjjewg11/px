//
var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;

/**
 * ajax_chooseUser_edit
 */

var ChooseUser_EventRow = React.createClass({displayName: "ChooseUser_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {className: className}, 
      React.createElement("td", null, 
      React.createElement("input", {type: "checkbox", alt: event.name, value: event.uuid, name: "table_checkbox", checkbox: this.props.checkedUseruuid.indexOf(event.uuid)>-1})
      ), 
        React.createElement("td", null, event.name), 
        React.createElement("td", null, event.tel), 
        React.createElement("td", null, event.sex=="0"?"男":"女"), 
        React.createElement("td", {className: "px_disable_"+event.disable}, event.disable=="1"?"禁用":"正常")
      ) 
    );
  }
}); 

var ChooseUser_EventsTable = React.createClass({displayName: "ChooseUser_EventsTable",
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="cancel"){
				 this.props.handleClick(m,$('#selectgroup_uuid').val());
				 return;
			 }
			 var uuids=null;
			 var names=null;
			 $($("input[name='table_checkbox']")).each(function(){
				　if(this.checked){
					 if(uuids==null){
						 uuids=this.value;
						 names=this.alt;
					 }
					 else{
						 uuids+=','+this.value ; 
						 names+=','+this.alt; 
					 }
					　   //遍历被选中CheckBox元素的集合 得到Value值
				　}
				});
			  
			 this.props.handleClick(m,$('#selectgroup_uuid').val(),uuids,names);
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
    React.createElement("div", null, 
    React.createElement(AMUIReact_ButtonToolbar, null, 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "ok"), round: true}, "确认"), 
	    React.createElement(AMUIReact_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "cancel"), round: true}, "取消")
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
            React.createElement("th", null, "昵称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "性别"), 
            React.createElement("th", null, "状态")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(ChooseUser_EventRow, {event: event}));
          })
        )
      )
      )
    );
  }
});
//end chooseUser



