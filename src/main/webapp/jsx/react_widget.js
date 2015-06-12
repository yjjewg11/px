//
var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;
var AMUIReact_Modal=AMUIReact.Modal;
var AMUIReact_ModalTrigger=AMUIReact.ModalTrigger;





var ChooseUser_modal = React.createClass({
	  render: function() {
	    return (
	    		  <AMUIReact_Modal type="prompt" title="老师选择"  >
	    		  <ChooseUser_EventsTable {...this.props} />
	    		  </AMUIReact_Modal>
	        );
	  }
	});

var modal = <AMUIReact_Modal title="Amaze UI Modal">这一个 Modal 窗口。</AMUIReact_Modal>;



function onConfirm(data) {
  console.log(data);
}

function onCancel() {
  console.log('Canceled...');
}
/**
 * ajax_chooseUser_edit
 */

var ChooseUser_EventRow = React.createClass({ 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      <tr className={className} >
      <td> 
      <input type="checkbox" value={event.uuid} name="table_checkbox" />
      </td>
        <td>{event.name}</td>
        <td>{event.tel}</td>
        <td>{event.sex=="0"?"男":"女"}</td>
        <td  className={"px_disable_"+event.disable}>{event.disable=="1"?"禁用":"正常"}</td>
      </tr> 
    );
  }
}); 

var ChooseUser_EventsTable = React.createClass({
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="cancel"){
				 this.props.callbackFN(m,$('#selectgroup_uuid').val());
				 return;
			 }
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				　if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					　uuids+=this.value + ',';    //遍历被选中CheckBox元素的集合 得到Value值
				　}
				});
			  
			 this.props.callbackFN(m,$('#selectgroup_uuid').val(),uuids);
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
    <div>
    <AMUIReact_ButtonToolbar>
	    <AMUIReact_Button amStyle="primary" onClick={this.handleClick.bind(this, "ok")} round>确认</AMUIReact_Button>
	    <AMUIReact_Button amStyle="danger" onClick={this.handleClick.bind(this, "cancel")} round>取消</AMUIReact_Button>
	  </AMUIReact_ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
      <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'sm'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
      {this.props.group_list.map(function(event) {
          return (<option value={event.uuid} >{event.company_name}</option>);
        })}
      </select>
    </div>
	  
      <AMUIReact_Table {...this.props}>  
        <thead> 
          <tr>
          	<th>  
            <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
            </th>
            <th>昵称</th>
            <th>电话</th>
            <th>性别</th>
            <th>状态</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<ChooseUser_EventRow  event={event} />);
          })}
        </tbody>
      </AMUIReact_Table>
      </div>
    );
  }
});
//end chooseUser



