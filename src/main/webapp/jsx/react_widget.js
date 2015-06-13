//
var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;
var AMUIReact_Sticky=AMUIReact.Sticky;

/**
 * ajax_chooseUser_edit
 */

var ChooseUser_EventRow = React.createClass({ 
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
      <tr id={"tr_chuser_"+event.uuid} className={className} onClick={this.tr_onClick.bind(this,"tr_chuser_"+event.uuid,"tb_cbox__chuser"+event.uuid)}>
      <td> 
      <input type="checkbox" alt={event.name} value={event.uuid} id={"tb_cbox__chuser"+event.uuid} name="table_checkbox" checked={is_Checked?"checked":""} />
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
    <div>
    <AMUIReact_Sticky>
    <AMUIReact_ButtonToolbar>
    <AMUIReact_Button amStyle="primary" onClick={this.handleClick.bind(this, "ok")} round>确认</AMUIReact_Button>
    <AMUIReact_Button amStyle="danger" onClick={this.handleClick.bind(this, "cancel")} round>取消</AMUIReact_Button>
  </AMUIReact_ButtonToolbar>
  </AMUIReact_Sticky>
  <div className="header">
  <div className="am-g">
    <h1>老师选择</h1>
  </div>
  <hr />
</div>
	  <div className="am-form-group">
      <select id="selectgroup_uuid_chuser" name="group_uuid" data-am-selected="{btnSize: 'sm'}" value={this.props.group_uuid?this.props.group_uuid:""} onChange={this.handleChange_selectgroup_uuid_chuser}>
      {this.props.group_list.map(function(event) {
          return (<option value={event.uuid} >{event.company_name}</option>);
        })}
      </select>
    </div>
	  
      <AMUIReact_Table {...this.props}>  
        <thead> 
          <tr>
          	<th>  
            <input type="checkbox" id="id_checkbox_all_chuser" onChange={this.handleChange_checkbox_all} />
            </th>
            <th>昵称</th>
            <th>电话</th>
            <th>性别</th>
            <th>状态</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<ChooseUser_EventRow  event={event} checkedUseruuid={that.props.checkedUseruuid}  />);
          })}
        </tbody>
      </AMUIReact_Table>
      </div>
    );
  }
});
//end chooseUser



