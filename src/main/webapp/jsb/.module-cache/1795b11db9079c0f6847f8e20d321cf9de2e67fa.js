//
var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;
var AMUIReact_Sticky=AMUIReact.Sticky;

/**
 * ajax_chooseUser_edit
 */

var ChooseUser_EventRow = React.createClass({displayName: "ChooseUser_EventRow", 
	tr_onClick:function(trid,cbid){
		var cbox=$("#"+cbid);
		var tr=$("#"+trid);
		if(cbox.prop("checked")){
			cbox.prop("checked",false); 
			$(tr).removeClass("am-active");
		}else{
			cbox.prop("checked", true); 
			$(tr).addClass("am-active");
		}
	},
  render: function() {
    var event = this.props.event;
    var is_Checked=this.props.checkedUseruuid.indexOf(event.uuid)>-1;
    var className = is_Checked ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {id: "tr_chuser_"+event.uuid, className: className, onClick: this.tr_onClick.bind(this,"tr_chuser_"+event.uuid,"tb_cbox__chuser"+event.uuid)}, 
      React.createElement("td", null, 
      React.createElement("input", {type: "checkbox", alt: event.name, value: event.uuid, id: "tb_cbox__chuser"+event.uuid, name: "table_checkbox", checked: is_Checked?"checked":""})
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
	  handleChange_selectgroup_uuid_chuser:function(){
		  var v=$('#selectgroup_uuid_chuser').val();
		//  this.setState(v);
		  w_ch_user.reshowBygroup(v);
	  },
  render: function() {
	  var that=this;
    return (
    React.createElement("div", null, 
    React.createElement(AMUIReact_Sticky, null, 
    React.createElement(AMUIReact_ButtonToolbar, null, 
    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "ok"), round: true}, "确认"), 
    React.createElement(AMUIReact_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "cancel"), round: true}, "取消")
  )
  ), 
  React.createElement("div", {className: "header"}, 
  React.createElement("div", {className: "am-g"}, 
    React.createElement("h1", null, "老师选择")
  ), 
  React.createElement("hr", null)
), 
	  React.createElement("div", {className: "am-form-group"}, 
      React.createElement("select", {id: "selectgroup_uuid_chuser", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: this.props.group_uuid?this.props.group_uuid:"", onChange: this.handleChange_selectgroup_uuid_chuser}, 
      this.props.group_list.map(function(event) {
          return (React.createElement("option", {value: event.uuid}, event.company_name));
        })
      )
    ), 
	  
      React.createElement(AMUIReact_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          	React.createElement("th", null, 
            React.createElement("input", {type: "checkbox", id: "id_checkbox_all_chuser", onChange: this.handleChange_checkbox_all})
            ), 
            React.createElement("th", null, "昵称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "性别"), 
            React.createElement("th", null, "状态")
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
//end chooseUser

    

    //upload headImg

var Upload_headImg = React.createClass({displayName: "Upload_headImg",
       	handleClick: function(m) {
       		
       	  },
         render: function() {
       	  var that=this;
           return (
           React.createElement("div", null, 
           React.createElement(AMUIReact_Sticky, null, 
           React.createElement(AMUIReact_ButtonToolbar, null, 
           React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "ok"), round: true}, "确认"), 
           React.createElement(AMUIReact_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "cancel"), round: true}, "取消")
         )
         ), 
         React.createElement("div", {className: "header"}, 
         React.createElement("div", {className: "am-g"}, 
           React.createElement("h1", null, "上传图片")
         ), 
         React.createElement("hr", null)
       ), 
       React.createElement("div", {className: "container"}, 
	   	React.createElement("div", {className: "imageBox"}, 
	   	    React.createElement("div", {className: "thumbBox"}), 
	   	    React.createElement("div", {className: "spinner", style: "display: none"}, "加载中...")
	   	), 
   	React.createElement("div", {className: "action"}, 
   	    React.createElement("input", {type: "file", id: "upload_file", accept: "image/*"}), 
   	    React.createElement("input", {type: "button", id: "btnCrop", value: "剪切"}), 
   	    React.createElement("input", {type: "button", id: "btnZoomIn", value: "放大"}), 
   	    React.createElement("input", {type: "button", id: "btnZoomOut", value: "缩小"})
   	), 
   	React.createElement("div", {className: "cropped"}
   	)
   	)
   	
             )
           );
         }
});
           
           
    //end uploadImg


