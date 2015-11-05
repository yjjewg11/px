//
var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;

/**
 * ajax_chooseUser_edit
 */


var ChooseUser_EventsTable = React.createClass({displayName: "ChooseUser_EventsTable",
//	 getInitialState: function() {
//		 	alert(this.props.group_uuid);
//		    return this.props.group_uuid;
//		  },
//	
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="cancel"){
				 this.props.handleClick(m,$('#selectgroup_uuid_chuser').val());
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
			  
			 this.props.handleClick(m,$('#selectgroup_uuid_chuser').val(),uuids,names);
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all_chuser")[0].checked); 
	  },
	  //
	  handleChange_selectgroup_uuid_chuser:function(val){
		  w_ch_user.reshowBygroup(val,$('#sutdent_name').val());
	  },
	  handleChange_selectgroup_uuid:function(){
		  w_ch_user.reshowBygroup( $("input[name='ch_group_uuid']").val(),$('#sutdent_name').val());
	  },
  render: function() {
	  var that=this;
    return (
    React.createElement("div", null, 
    React.createElement(AMUIReact_ButtonToolbar, null, 
    React.createElement(AMUIReact_Button, {amStyle: "secondary", onClick: this.handleClick.bind(this, "ok")}, "确认"), 
    React.createElement(AMUIReact_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "cancel")}, "取消")
  ), 
  React.createElement("div", {className: "header"}, 
  React.createElement("div", {className: "am-g"}, 
    React.createElement("h1", null, "老师选择")
  ), 
  React.createElement("hr", null)
), 



	   React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
		React.createElement(AMR_ButtonToolbar, {className: "am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		 React.createElement("div", {className: "am-fl am-margin-bottom-sm"}, 
		  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid_chuser", name: "ch_group_uuid", onChange: this.handleChange_selectgroup_uuid_chuser, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid?this.props.group_uuid:""})
		 ), 
		React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
	   React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "教师姓名"})	 
		), 
		 React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement("button", {type: "button", onClick: this.handleChange_selectgroup_uuid, className: "am-btn am-btn-secondary"}, "搜索")		  		  
		 )
		)
	   ), 	 






      React.createElement(AMUIReact_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          	React.createElement("th", null, 
            React.createElement("input", {type: "checkbox", id: "id_checkbox_all_chuser", onChange: this.handleChange_checkbox_all})
            ), 
            React.createElement("th", null, "姓名"), 
            React.createElement("th", null, "电话")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(ChooseUser_EventRow, {event: event, checkedUseruuid: that.props.checkedUseruuid}));
          })
        )
      )
      )
    );
  }
});

    var ChooseUser_EventRow = React.createClass({displayName: "ChooseUser_EventRow", 
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
        var is_Checked=this.props.checkedUseruuid&&this.props.checkedUseruuid.indexOf(event.uuid)>-1;
        var className = is_Checked ? 'am-active' :
          event.disabled ? 'am-disabled' : '';

        return (
          React.createElement("tr", {id: "tr_chuser_"+event.uuid, className: className, onClick: this.tr_onClick.bind(this,"tr_chuser_"+event.uuid,"tb_cbox__chuser"+event.uuid)}, 
          React.createElement("td", null, 
          React.createElement("input", {type: "checkbox", alt: event.name, value: event.uuid, id: "tb_cbox__chuser"+event.uuid, name: "table_checkbox"})
          ), 
            React.createElement("td", null, event.name), 
            React.createElement("td", null, event.tel)
          ) 
        );
      }
    }); 
//end chooseUser

 