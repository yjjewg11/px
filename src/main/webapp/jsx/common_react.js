var AMR_Table=AMUIReact.Table;
var AMR_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMR_Button=AMUIReact.Button;
var AMR_Sticky=AMUIReact.Sticky;
var AMR_Panel=AMUIReact.Panel;
var AMR_Gallery=AMUIReact.Gallery;
var AMR_Input=AMUIReact.Input;
var PxInput=AMUIReact.Input;


/**
 * 全局模版-没有内容时显示
 * <G_check_disable_div_byRight type={o.type} uuid={o.uuid} status={o.status}/>
 */
var G_check_disable_div_byRight = React.createClass({
	rightFlag:false,
	getInitialState: function() {
		var right;
	//	var tmp=window.grouptype;
		//if(this.props.pxadmin)tmp=this.props.pxadmin;
		
			if(window.grouptype==2){
				right="PX_announce_m";//培训机构屏蔽权限;
			}else{
				right="KD_announce_m";//幼儿园屏蔽权限;	
			}
			this.rightFlag=false;
			if(this.props.groupuuid){
				this.rightFlag=G_user_hasRightByGroupuuid(right,this.props.groupuuid);
			}else{
				this.rightFlag=G_user_hasRight(right);
			}

		return {status:this.props.status};
	  },
/*/check/disable.json?type=99&uuid=1
 * 禁止发布公共组件方法
 * */
	ajax_check_disable:function(type,uuid){
		if(this.state.status==2){
			return;
		}
		if(!confirm("屏蔽后管理员和创建者可见,其他人不可见.确定要屏蔽吗?")){
			return;
		}
		var that=this;
		$.AMUI.progress.start();
		var url = hostUrl + "rest/check/disable.json";
		$.ajax({
			type : "POST",
			url : url,
			data:{type:type,uuid:uuid},
			dataType : "json",
			async: true,
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					 G_msg_pop("屏蔽成功");
					 that.setState({status:2});
				} else {
					alert(data.ResMsg.message);
				}
			},
			error : G_ajax_error_fn
		});
	},
	  render: function() {
		  if(this.rightFlag){
			  var bt_name=this.state.status==2?"已屏蔽":"屏蔽";
			  var bt_class=this.state.status==2?" am-text-danger":" am-btn-danger";
			  return (
				<button  className={"am-btn-sm  "+this.props.add_class+" "+bt_class} title="屏蔽后管理员和创建者可见,其他人不可见." onClick={this.ajax_check_disable.bind(this,this.props.type,this.props.uuid)} >{bt_name}</button>
						
		  );
		  }else{
			  return null;
		  }
			 
		  if(this.props.msg)msg=this.props.msg;
	    return (
	    		<div><h1>{msg}</h1></div>
	    );
	  }
	  }); 
var G_get_upload_img_Div=function(){
	var G_upload_img_Div=<AMR_Input type= "file" label="本地上传图片：" id="file_img_upload" accept="image/*" capture= "camera" multiple />
	if(G_CallPhoneFN.isPhoneApp()){
		G_upload_img_Div=<AMR_Button  amStyle="primary"  id="file_img_upload" >上传图片</AMR_Button>
	}
	return G_upload_img_Div;
}
//<G_help_popo title={title} msg={msg} />
var G_help_popo = React.createClass({ 
	  render: function() {
		  var title=G_tip.help;
		  var msg="帮助内容";
		  if(this.props.msg)msg=this.props.msg;
		  if(this.props.title)title=this.props.title;
	    return (
	    		 <AMUIReact.PopoverTrigger
	 		    trigger="click" // 设置触发方式
	 		    amStyle="warning" // 设置 popover 样式
	 		    amSize="sm" // 设置 popover 大小
	 		    placement="right"
	 		    popover={<AMUIReact.Popover>{msg}</AMUIReact.Popover>}>
	 		    <AMUIReact.Button amStyle="warning">{title}</AMUIReact.Button>
	 		  </AMUIReact.PopoverTrigger>
	    );
	  }
	  }); 


/**
 * 全局模版-没有内容时显示
 */
var G_NoData_div = React.createClass({ 
	  render: function() {
		  var msg="没有数据";
		  if(this.props.msg)msg=this.props.msg;
	    return (
	    		<div><h1>{msg}</h1></div>
	    );
	  }
	  }); 
	  
  
/**
 * 角色授权用户
 * 

var opt={
			groupuuid:Store.getCurGroup().uuid,
			group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name"),
			role_list:Store.getRoleList(0)
		};
 */
//幼儿园老师授权
var G_Role_User_EventsTable = React.createClass({
	getInitialState: function() {
		return this.load_role_bind_user(this.props.groupuuid);
	  },
	  componentWillReceiveProps: function(nextProps) {
		  var tmp=this.load_role_bind_user(nextProps.groupuuid);
			tmp.role_list=nextProps.role_list;
		  this.setState(tmp);
		},
	handleChange_selectgroup_uuid:function(groupuuid){
		  this.setState(this.load_role_bind_user(groupuuid));
	},
	  componentDidMount:function(){
		  this.setState(this.load_role_bind_user(this.props.groupuuid));

	  },
	load_role_bind_user:function(groupuuid){
		if(!groupuuid)return;
		var that=this;
		var tmpState={};
		$.AMUI.progress.start();
		var url = hostUrl + "rest/role/getRoleUserBy.json?groupuuid="+groupuuid;
		$.ajax({
			type : "GET",
			url : url,
			async: false,
			dataType : "json",
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					tmpState={
						 groupuuid:groupuuid,
				          list: data.list
				        };
				} else {
					alert(data.ResMsg.message);
				}
			},
			error : G_ajax_error_fn
		});
		tmpState.role_list=this.props.role_list;
		return tmpState;
	},
render: function() {
	if(!this.props.group_list||this.props.group_list.length==0){
		return (<G_NoData_div />)
	}
	var that=this;
  return (
  <div>
  <G_px_help_List data={G_kd_help_msg.msg_help_list7}/>
  <AMR_Panel>
  <AMR_ButtonToolbar>
  <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
  <AMUIReact.Selected  className="am-fl" id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.state.groupuuid} />    
  </div>
  <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
  <G_help_popo   msg={G_tip.role_grant_users} />
  </div>
  </AMR_ButtonToolbar>
  </AMR_Panel>
    <AMUIReact.Table bordered className="am-table-striped am-table-hover am-text-nowrap">  
      <thead> 
        <tr>
          <th>权限名称</th>
          <th>权限操作</th>
          <th>授权用户</th>
          <th>权限描述</th>
        </tr> 
      </thead>
      <tbody>
        {this.state.role_list.map(function(event) {
          return (<G_Role_User_EventsTable_EventRow event={event} groupuuid={that.state.groupuuid} userList={that.state.list} />);
        })}
      </tbody>
    </AMUIReact.Table>
    </div>
  );
}
});
  
//培训机构老师授权  
var G_Role_User_EventsTable2 = React.createClass({
	getInitialState: function() {
		return this.load_role_bind_user(this.props.groupuuid);
	  },
	  componentWillReceiveProps: function(nextProps) {
		  var tmp=this.load_role_bind_user(nextProps.groupuuid);
			tmp.role_list=nextProps.role_list;
		  this.setState(tmp);
		},
	handleChange_selectgroup_uuid:function(groupuuid){
		  this.setState(this.load_role_bind_user(groupuuid));
	},
	  componentDidMount:function(){
		  this.setState(this.load_role_bind_user(this.props.groupuuid));

	  },
	load_role_bind_user:function(groupuuid){
		if(!groupuuid)return;
		var that=this;
		var tmpState={};
		$.AMUI.progress.start();
		var url = hostUrl + "rest/role/getRoleUserBy.json?groupuuid="+groupuuid;
		$.ajax({
			type : "GET",
			url : url,
			async: false,
			dataType : "json",
			success : function(data) {
				$.AMUI.progress.done();
				if (data.ResMsg.status == "success") {
					tmpState={
						 groupuuid:groupuuid,
				          list: data.list
				        };
				} else {
					alert(data.ResMsg.message);
				}
			},
			error : G_ajax_error_fn
		});
		tmpState.role_list=this.props.role_list;
		return tmpState;
	},
render: function() {
	if(!this.props.group_list||this.props.group_list.length==0){
		return (<G_NoData_div />)
	}
	var that=this;
  return (
  <div>
  <G_px_help_List data={G_px_help_msg.msg_px_help_list11}/>
  <AMR_Panel>
  <AMR_ButtonToolbar>
  <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
  <AMUIReact.Selected  className="am-fl" id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.state.groupuuid} />    
  </div>
  <div className="am-fl am-margin-left-sm am-margin-bottom-xs">
  </div>
  </AMR_ButtonToolbar>
  </AMR_Panel>
    <AMUIReact.Table bordered className="am-table-striped am-table-hover am-text-nowrap">  
      <thead> 
        <tr>
          <th>权限名称</th>
          <th>权限操作</th>
          <th>授权用户</th>
          <th>权限描述</th>
        </tr> 
      </thead>
      <tbody>
        {this.state.role_list.map(function(event) {
          return (<G_Role_User_EventsTable_EventRow event={event} groupuuid={that.state.groupuuid} userList={that.state.list} />);
        })}
      </tbody>
    </AMUIReact.Table>
    </div>
  );
}
});
//role
  var G_Role_User_EventsTable_EventRow = React.createClass({ 
	  getInitialState: function() {
		    return {
		    	groupuuid:this.props.groupuuid,
		    	users:null,
		    	useruuids:null,
		    	list: this.props.userList
		    };
		  },
		  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
	  componentWillReceiveProps: function(nextProps) {
		  this.setState({
			  groupuuid:nextProps.groupuuid,
		    	users:null,
		    	useruuids:null,
		    	list: nextProps.userList
		  });
		},
	  getUsersStrByRoleUuid:function(roleuuid,list){
		  if(!list||list.length==0)return ["",""];
		  //list<[roleuuid,useruuid]
		  var useruuids="";
		  var usernames=""; 
		  for(var i=0;i<list.length;i++){
			  if(roleuuid==list[i][0]){
				  useruuids+=list[i][1]+",";
				  usernames+=Store.getUser(list[i][1]).name+",";
			  }
		  }
		  return [useruuids,usernames];
	  },
	  handleClick:function(roleuuid,groupuuid,useruuids){
		  var that=this;
		  w_ch_user.openTheGroup(useruuids,groupuuid,function(w_useruuids,w_usernames,w_groupuuid){
			  var flag=that.ajax_userinfo_updateRoleByUsers(w_useruuids,groupuuid,roleuuid);
				  if(flag){
					  that.setState({
				        	groupuuid:groupuuid,
				        	users:w_usernames,
				        	useruuids:w_useruuids,
				        	list:null
				        })
				  	}
		  		});
	  },
	  ajax_userinfo_updateRoleByUsers:function(useruuids,groupuuid,roleuuid){
		  var flag=false;
	   	$.AMUI.progress.start();
	         var url = hostUrl + "rest/userinfo/updateRoleByUsers.json";
	         var opt={
	       			type : "POST",
	       			url : url,
	       			async: false,
	       			processData: true, 
	       			dataType : "json",
	       			data:{useruuids:useruuids,groupuuid:groupuuid,roleuuid:roleuuid},
	       			success : function(data) {
	       				$.AMUI.progress.done();
	       				// 登陆成功直接进入主页
	       				if (data.ResMsg.status == "success") {
	       					G_msg_pop(data.ResMsg.message);
	       					flag=true;
	       				} else {
	       					alert(data.ResMsg.message);
	       				}
	       			},
	       			error :G_ajax_error_fn
	       		};
	   	$.ajax(opt);
	   	return flag;
	   },
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';
    var users=this.state.users;
    var useruuids=this.state.useruuids;
    if(this.state.list){
    	var ar=this.getUsersStrByRoleUuid(event.uuid,this.state.list);
    	  users=ar[1];
    	  useruuids=ar[0];
    }
    return (
      <tr className={className} >
        <td>{event.name}</td>
        <td><AMUIReact.Button amStyle="secondary" onClick={this.handleClick.bind(this, event.uuid,this.state.groupuuid,useruuids)} >授权</AMUIReact.Button></td>
        <td>{users}</td>
        <td>{event.description} </td>
      </tr> 
    );
  }
  }); 
  
//userinfo

//——————————————————————————老师管理——————————————————————————
  
//代码废弃
///*
// * 老师管理服务器请求后绘制处理方法；
// * @逻辑：如果点击的不是添加按钮，则先检查是否勾选选框再处理其他判断；
// * @btn_click_userinfo：判断后程序跳转至d_service做各个按钮的处理; 
// * @调用LIS.events.map方法循环绘制老师数组； 
// * @</select>下拉多选框;
// * */
//var Userinfo_EventsTable = React.createClass({
//	handleClick: function(m) {
//		
//		 if(m=="add"){
//			 btn_click_userinfo(m,{group_uuid:this.props.group_uuid,office:"老师"},this.props.events.sex);
//			 return;
//		 }
//		 var uuids=null;
//		 var usernames=null;
//		 $($("input[name='table_checkbox']")).each(function(){
//			 if(this.checked){
//				 if(uuids==null){
//					 uuids=this.value;
//					 usernames=this.alt;
//				 }
//				 else{
//					 uuids+=','+this.value ;  
//					 usernames+=','+this.alt;
//				 };
//			 };
//			});
//		  if(!uuids){
//			  G_msg_pop("请勾选复选框！");
//			  return;
//		  }
//		  btn_click_userinfo(m,uuids,usernames);
//	  },
//	  handleChange_checkbox_all:function(){
//		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
//	  },
//	  handleChange_selectgroup_uuid:function(val){
//		  ajax_uesrinfo_listByGroup(val,$('#sutdent_name').val());
//	  },
//	  handleChange_selectgroup_sou_uuid:function(){
//		  ajax_uesrinfo_listByGroup(this.props.group_uuid,$('#sutdent_name').val());
//	  },
//  render: function() {
//    return (
//    <div>
//    <div className="header">
//    <hr />
//    </div>  
//    
//<form id="editGroupForm" method="post" className="am-form">
//    
//    <AMR_ButtonToolbar className="am-cf am-margin-left-xs">
// 	 <div className="am-fl">
//	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} >添加</AMR_Button>
//	    </div> 
//	    <div className="am-fl am-margin-left-xs">
//	    <AMR_Button amStyle="revise" onClick={this.handleClick.bind(this, "edit")} >修改</AMR_Button>
//	    </div> 
//		  <div className="am-fl am-margin-left-xs">
//		  <input type="text" name="sutdent_name" id="sutdent_name"   placeholder="教师姓名"/>	  
//		  </div>
//		    <div className="am-fl am-margin-left-xs">
//			  <button type="button"  onClick={this.handleChange_selectgroup_sou_uuid}  className="am-btn am-btn-primary">搜索</button>
//			  </div>
//		  </AMR_ButtonToolbar>
//		  </form>
//	  <hr/>
//	  <div className="am-form-group">
//	  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />      
//  
//	  
//    </div>
//	  
//      <AMR_Table {...this.props}>  
//        <thead> 
//          <tr>
//          	<th>  
//            <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
//            </th>
//            <th>帐号</th>
//            <th>姓名</th>
//            <th>电话</th>
//            <th>邮箱</th>
//            <th>性别</th>
//            <th>状态</th>
//            <th>登录时间</th>
//            <th>创建时间</th>
//          </tr> 
//        </thead>
//        <tbody>
//          {this.props.events.map(function(event) {
//            return (<Userinfo_EventRow key={event.id} event={event} />);
//          })}
//        </tbody>
//      </AMR_Table>
//      </div>
//    );
//  }
//});
//    var Userinfo_EventRow = React.createClass({ 
//    	  render: function() {
//    	    var event = this.props.event;
//    	    var className = event.highlight ? 'am-active' :
//    	      event.disabled ? 'am-disabled' : '';
//
//    	    return (
//    	      <tr className={className} >
//    	      <td> 
//    	      <input type="checkbox" value={event.uuid} alt={event.name} name="table_checkbox" />
//    	      </td>
//    	        <td>{event.loginname}</td>
//    	        <td>{event.name}</td>
//    	        <td>{event.tel}</td>
//    	        <td>{event.email}</td>
//    	        <td>{event.sex=="0"?"男":"女"}</td>
//    	        <td  className={"px_disable_"+event.disable}>{Vo.get("disable_"+event.disable)}</td>
//    	        <td>{event.login_time}</td>
//    	        <td>{event.create_time}</td>
//    	      </tr> 
//    	    );
//    	  }
//    	}); 
 
  /*（幼儿园老师管理）
  * 老师管理服务器请求后绘制处理方法；
  * @逻辑：如果点击的不是添加按钮，则先检查是否勾选选框再处理其他判断；
  * @btn_click_userinfo：判断后程序跳转至d_service做各个按钮的处理; 
  * @调用LIS.events.map方法循环绘制老师数组； 
  * @</select>下拉多选框;
  * */
  var Userinfo_EventsTable_div = React.createClass({
  	load_more_btn_id:"load_more_",
  	pageNo:1,
  	classnewsreply_list_div:"am-list-news-bd",
  	componentWillReceiveProps:function(){
  		this.refresh_data();
  	},
  	componentDidMount:function(){
  		this.load_more_data();
  	},
  	//逻辑：首先创建一个“<div>” 然后把div和 pageNo   list_div,groupuuid,name,pageNo
  	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
  	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
  	load_more_data:function(){
  		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
  		var that=this;
  		var callback=function(re_data){
  			if(!re_data)return;
  			if(re_data.data.length<re_data.pageSize){
  				$("#"+that.load_more_btn_id).hide();
  			}else{
  				$("#"+that.load_more_btn_id).show();
  			}
  			if(that.pageNo==1){
  				$("#div_totalNumber").html("总人数:"+re_data.totalCount);
  			}
  			that.pageNo++;
  		}
  			this.setState({groupuuid:$("input[name='group_uuid']").val()});
  		ajax_uesrinfo_listByGroup(this.classnewsreply_list_div+this.pageNo,$("input[name='group_uuid']").val(),$('#sutdent_name').val(),this.pageNo,callback);
  	},
  	refresh_data:function(){
//  		classnewsreply_list_div 清除；
//        load_more_data	重新绘制DIV；
  		this.pageNo=1;
  		$("#"+this.classnewsreply_list_div).html("");
  		this.load_more_data();
  		
  	},	
  	 getInitialState: function() {
  		return {groupuuid:this.props.groupuuid};
  	  },
  	handleClick: function(m) {		
  		 if(m=="add"){
  			 btn_click_userinfo(m,{group_uuid:$("input[name='group_uuid']").val(),office:"老师"});
  			 return;
  		 }
  		 var uuids=null;
  		 var usernames=null;
  		 $($("input[name='table_checkbox']")).each(function(){
  			 	if(this.checked){
  				 if(uuids==null){
  					 uuids=this.value;
  					 usernames=this.alt;
  				 }
  				 else{
  					 uuids+=','+this.value ;  
  					 usernames+=','+this.alt;
  				 };
  			 	}
  			});
  		  if(!uuids){
  			  G_msg_pop("请勾选复选框！");
  			  return;
  		  }
  		  btn_click_userinfo(m,uuids,usernames);
  	  },
  	  handleChange_checkbox_all:function(){
  		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
  	  },
  	  handleChange_selectgroup_uuid:function(val){
  		  ajax_uesrinfo_listByGroup(val,$('#sutdent_name').val());
  	  },
  	  handleChange_selectgroup_sou_uuid:function(){
  		  ajax_uesrinfo_listByGroup(this.props.group_uuid,$('#sutdent_name').val());
  	  },
  		 handleClick_download: function(xlsname) {
  			 ajax_flowername_download_byRight(group_uuid,uuids,xlsname);
  	 },
  	 
   render: function() {
  	 this.load_more_btn_id="load_more_"+this.props.uuid;
     return (
  		   <div data-am-widget="list_news" className="am-list-news am-list-news-default">		   
  		   <G_px_help_List data={G_kd_help_msg.msg_help_list6}/>
  		   <form id="editGroupForm" method="post" className="am-form" action="javascript:void(0);">		   
  		   <AMR_Panel>
  		   <AMR_ButtonToolbar>

  			  <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
  			    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "add")} >添加</AMR_Button>
  			    </div> 
  			    <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
  			    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "edit")} >修改</AMR_Button>
  			    </div> 
  				  <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
  				  <input type="text" name="sutdent_name" id="sutdent_name"   placeholder="教师姓名"/>	  
  				  </div>
  				    <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
  					  <button type="button"  onClick={this.refresh_data.bind(this)}  className="am-btn am-btn-secondary">搜索</button>
  					  </div>
  					  
  				  </AMR_ButtonToolbar>
  				  </AMR_Panel>
  				  </form>
  				  
  				<AMR_ButtonToolbar>
  		  		   <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
  	  			  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.refresh_data.bind(this)} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.state.groupuuid} />
  	  			  </div> 
  	  			</AMR_ButtonToolbar>
  				  <div id="div_totalNumber" >总人数:0
  				  </div>	
  		    <div id={this.classnewsreply_list_div} >
  			  </div>		   
  		   		   
  			  <div className="am-list-news-ft">
  			    <a className="am-list-news-more am-btn am-btn-default " id={this.load_more_btn_id} onClick={this.load_more_data.bind(this)}>查看更多 &raquo;</a>
  			  </div>		  
  			</div>		   		   
     );
     
   }
  } 
     );  
/*（培训机构老师管理）
* 老师管理服务器请求后绘制处理方法；
* @逻辑：如果点击的不是添加按钮，则先检查是否勾选选框再处理其他判断；
* @btn_click_userinfo：判断后程序跳转至d_service做各个按钮的处理; 
* @调用LIS.events.map方法循环绘制老师数组； 
* @</select>下拉多选框;
* */
var Userinfo_EventsTable_div1 = React.createClass({
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps:function(){
		this.refresh_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	//逻辑：首先创建一个“<div>” 然后把div和 pageNo   list_div,groupuuid,name,pageNo
	//当参数ajax_announce_Mylist（）这个方法内，做服务器请求，后台会根据设置传回部分数组暂时
	//re_data.data.length<re_data.pageSize 表示隐藏加载更多按钮 因为可以全部显示完毕
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		var that=this;
		var callback=function(re_data){
			if(!re_data)return;
			if(re_data.data.length<re_data.pageSize){
				$("#"+that.load_more_btn_id).hide();
			}else{
				$("#"+that.load_more_btn_id).show();
			}
			if(that.pageNo==1){
				$("#div_totalNumber").html("总人数:"+re_data.totalCount);
			}
			that.pageNo++;
		}
			this.setState({groupuuid:$("input[name='group_uuid']").val()});
		ajax_uesrinfo_listByGroup(this.classnewsreply_list_div+this.pageNo,$("input[name='group_uuid']").val(),$('#sutdent_name').val(),this.pageNo,callback);
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},	
	 getInitialState: function() {
		return {groupuuid:this.props.groupuuid};
	  },
	handleClick: function(m) {		
		 if(m=="add"){
			 btn_click_userinfo(m,{group_uuid:$("input[name='group_uuid']").val(),office:"老师"});
			 return;
		 }
		 var uuids=null;
		 var usernames=null;
		 $($("input[name='table_checkbox']")).each(function(){
			 	if(this.checked){
				 if(uuids==null){
					 uuids=this.value;
					 usernames=this.alt;
				 }
				 else{
					 uuids+=','+this.value ;  
					 usernames+=','+this.alt;
				 };
			 	}
			});
		  if(!uuids){
			  G_msg_pop("请勾选复选框！");
			  return;
		  }
		  btn_click_userinfo(m,uuids,usernames);
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  handleChange_selectgroup_uuid:function(val){
		  ajax_uesrinfo_listByGroup(val,$('#sutdent_name').val());
	  },
	  handleChange_selectgroup_sou_uuid:function(){
		  ajax_uesrinfo_listByGroup(this.props.group_uuid,$('#sutdent_name').val());
	  },
		 handleClick_download: function(xlsname) {
			 ajax_flowername_download_byRight(group_uuid,uuids,xlsname);
	 },
	 
 render: function() {
	 this.load_more_btn_id="load_more_"+this.props.uuid;
   return (
		   <div data-am-widget="list_news" className="am-list-news am-list-news-default">		   
		   <G_px_help_List data={G_px_help_msg.msg_px_help_list10}/>
	      <form id="editGroupForm" method="post" className="am-form" action="javascript:void(0);">		   
	      <AMR_Panel>
	      <AMR_ButtonToolbar>
		   
		    <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "add")} >添加</AMR_Button>
		    </div> 
		    
		    <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		    <AMR_Button amStyle="secondary" onClick={this.handleClick.bind(this, "edit")} >修改</AMR_Button>
		    </div> 
			  
		    <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
			<input type="text" name="sutdent_name" id="sutdent_name"   placeholder="教师姓名"/>	  
			</div>
			    
			<div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		    <button type="button"  onClick={this.refresh_data.bind(this)}  className="am-btn am-btn-secondary">搜索</button>
		    </div>					  
		  </AMR_ButtonToolbar>
		  </AMR_Panel>
		  </form>
				  
			<AMR_ButtonToolbar>  
			   <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
			   <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.refresh_data.bind(this)} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.state.groupuuid} />
			   </div> 	
			</AMR_ButtonToolbar>  
			
				  <div id="div_totalNumber" >总人数:0
				  </div>	
		    <div id={this.classnewsreply_list_div} >
			  </div>		   
		   		   
			  <div className="am-list-news-ft">
			    <a className="am-list-news-more am-btn am-btn-default " id={this.load_more_btn_id} onClick={this.load_more_data.bind(this)}>查看更多 &raquo;</a>
			  </div>		  
			</div>		   		   
   );
   
 }
} 
   );


   var Userinfo_EventRow = React.createClass({ 	
		  render: function() {
			    var event = this.props.events;
			    var className = event.highlight ? 'am-active' :
		  event.disabled ? 'am-disabled' : '';
			    return (		  		    
			    		  <AMR_Table   bordered className="am-table-striped am-table-hover am-text-nowrap" >
				          <tr>
				          	<th>  
				            <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
				            </th>
				            <th >姓名</th>
				            <th>电话</th>
				            <th>邮箱</th>
				            <th>性别</th>
				            <th>状态</th>
				            <th>登录时间</th>
				            <th>创建时间</th>
				          </tr> 			 
			    			  {this.props.events.map(function(event) {
			    			      return (
			    					      <tr className={className}>
			    				   	      <td> 
			    				   	      <input type="checkbox" value={event.uuid} alt={event.name} name="table_checkbox" />
			    				   	      </td>
			    				   	        <td >{event.name}</td>
			    				   	        <td > {event.tel}</td>
			    				   	        <td >{event.email}</td>
			    				   	        <td>{event.sex=="0"?"男":"女"}</td>
			    				   	        <td  className={"px_disable_"+event.disable}>{Vo.get("disable_"+event.disable)}</td>
			    				   	        <td>{event.login_time}</td>
			    				   	        <td>{event.create_time}</td>			    					        </tr> 
			    			    		  )
			    			         })}	
			    			  </AMR_Table>		  
			    	  );
		}	     
   	});     

    
/*
* 老师管理Button事件(添加和修改按钮绘制与标签事件处理)；
* @formdata:选中的老师对象；
* @m：是启用还是禁用功能；"add"-添加  "edit"-修改；
* */    
var Userinfo_edit = React.createClass({ 
	 getInitialState: function() {
			if(this.props.mygroup_uuids)this.props.formdata.group_uuid=this.props.mygroup_uuids;
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editUserinfoForm').serializeJson());
	  },
	  handleChange_Selected: function(event) {
			 $('#group_uuid').val(event);
			    this.setState($('#editUserinfoForm').serializeJson());
		  },
	 handle_getUserBytel: function(tel,group_uuid) {
		 var thit=this;
		 var o=this.state;
		 if(!tel){
			 
			 G_msg_pop("请输入手机号码.");
			 return;
		 }
		 $.AMUI.progress.start();
			var url = hostUrl + "rest/userinfo/getUserBytel.json";
			$.ajax({
				type : "GET",
				url : url,
				data:{tel:tel},
				dataType : "json",
				success : function(data) {
					$.AMUI.progress.done();
	     			if (data.ResMsg.status == "success") {
	     				if(data.data){
	     					o=data.data;
		     				o.group_uuid=data.mygroup_uuids;
		     				thit.setState(o);
	     				}else{
	     					G_msg_pop("该老师未注册,请填写以下内容!");
	     				}
	     				
	     			} else {
	     				alert("加载数据失败："+data.ResMsg.message);
	     			}
				},
				error : G_ajax_error_fn
			});	
	  },	  
  render: function() {
	  var o = this.state;
	 console.log("this.state",this.state);
	  var passwordDiv=null;
	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
	  var show_btn_UserBytel=null;
	  if(!o.uuid){
		  show_btn_UserBytel=(
				  <button type="button"  onClick={this.handle_getUserBytel.bind(this,$('#tel').val(),o.group_uuid)}  className="am-btn am-btn-primary">检查是否注册</button>
				  );
		  o.password="123456";
		  o.password1="123456";
		  passwordDiv=(
				  <div>
			       <div>(默认密码：123456)</div>
				    <label className={one_classDiv}>密码:</label>
				   <div className={two_classDiv}>
    		      <PxInput  icon="lock" type="password" name="password" id="password" value={o.password} onChange={this.handleChange} />
    		     </div>    		      
    		      <label className={one_classDiv}>重复密码:</label>
    		       <div className={two_classDiv}>
    		        <PxInput  icon="lock" type="password" name="password1" id="password1" value={o.password1} onChange={this.handleChange}/>
    		         </div> 
				      </div>
				  );
	  }
    return (
  		  <form id="editUserinfoForm" method="post" className="am-form" action="javascript:void(0);">
		   <AMUIReact.Selected name="group_uuid" onChange={this.handleChange_Selected} btnWidth="300"  multiple= {true} data={this.props.select_group_list} btnStyle="primary" value={o.group_uuid} />
		    <PxInput type="hidden" name="uuid"  value={o.uuid}/>
		     <PxInput type="hidden" name="type"  value="1"/>
			   <div className= "am-form-group">
			    <hr/>
		       <label className={one_classDiv}>手机号码:</label>
		      <div className={two_classDiv}>
		     <PxInput  icon="mobile" type="text" name="tel" id="tel" value={o.tel} onChange={this.handleChange} placeholder=""/>
		     {show_btn_UserBytel}
		     </div>
		     <label className={one_classDiv}>姓名:</label>
		      <div className={two_classDiv}>
		       <PxInput icon="user" type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
		        </div> 
		        
		        <label className={one_classDiv}>单选:</label>
		        <div className={two_classDiv}>
		        <AMUIReact.FormGroup>
			     <PxInput type="radio" name="sex" value="0" label="男" inline onChange={this.handleChange} checked={o.sex==0?"checked":""}  />
				 <PxInput type="radio" name="sex" value="1" label="女" inline onChange={this.handleChange} checked={o.sex==1?"checked":""}  />
		        </AMUIReact.FormGroup>
		        </div> 
		    <label className={one_classDiv}>Email:</label>
		     <div className={two_classDiv}>
		      <PxInput icon="envelope" type="email" name="email" id="email" value={o.email} onChange={this.handleChange} placeholder="输入邮箱" placeholder=""/>
		       </div> 
		      <label className={one_classDiv}>职位:</label>
		     <div className={two_classDiv}>
		    <PxInput type="text" name="office" id="office" value={o.office} onChange={this.handleChange}/>
		   </div> 
		   {passwordDiv}
 	       <button type="button"  onClick={ajax_userinfo_saveByAdmin}  className="am-btn am-btn-primary">提交</button>
		  </div>    		
		 </form>    		
    );
  }
}); 

//分配权限 ;
var Userinfo_getRole = React.createClass({ 
	
	render: function() {
		  var o = this.props.formdata;
	  return (
	  		<div>
		  		<div className="header">
		  		 <hr />
		  		</div>
		  		
	  			<button type="button"  onClick={btn_ajax_updateRole.bind(this, o.useruuid,o.groupuuid)}  className="am-btn am-btn-primary">提交</button>
	  			<h3>{Store.getGroupNameByUuid(o.groupuuid)}</h3>
		  		<UserChooseRole_EventsTable {...this.props}/>
		  	   
	  	   </div>
	  );
	}
	}); 



//修改密码
var Div_userinfo_updatepassword = React.createClass({ 	
	render: function() {
	return (
		<div>
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		    <form id="commonform" method="post" className="am-form" action="javascript:void(0);">

		      <label htmlFor="oldpassword">当前密码:</label>
		      <PxInput  icon="lock" type="password" name="oldpassword"  />
		      <br/>
		      <label htmlFor="password">密码:</label>
		      <PxInput  icon="lock" type="password" name="password"   />
		      <br/>
		      
		      <label htmlFor="password1">重复密码:</label>
		      <PxInput  icon="lock" type="password" name="password1"  />
		      <br/>
		      <button type="button" onClick={ajax_userinfo_updatepassword} className="am-btn am-btn-primary">提交</button>
		    </form>
		    <hr/>
		  
		  </div>
		</div>
		</div>
	);
	}
}); 


////修改资料
var Div_userinfo_update = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#commonform').serializeJson());
	  },
	 handle_uploadHeader: function(event) {
			w_uploadImg.open(function(url){
				$("#img").val(url);
				 $("#img_head_image").attr("src",url); 
				 G_img_down404("#img_head_image");
			},1);
	  },
	  componentDidMount:function(){
		  var imgGuid=this.state.img;
		 if(imgGuid){
			 $("#img_head_image").attr("src",imgGuid); 
			 G_img_down404("#img_head_image");
		 }

	  },
	render: function() {
		 var o = this.state;
	return (
		<div>
		<div className="header">
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		    <form id="commonform" method="post" className="am-form" action="javascript:void(0);">

			<input type="hidden" name="img" id="img" value={o.img} onChange={this.handleChange}/>
		    <label htmlFor="nickname">头像:</label>
 		    <AMUIReact.Image  id="img_head_image"  src={G_def_headImgPath} className={"G_img_header"}/>
 		
 		   <button type="button"  onClick={this.handle_uploadHeader}  className="am-btn am-btn-secondary">上传头像</button>
 		   <br/>
		      <label htmlFor="name">姓名:</label>
		      <PxInput icon="user" type="text" name="name" id="name"  value={o.name} onChange={this.handleChange}  placeholder="必填，不超过15位"/>
		      <br/>
		       <label htmlFor="">Email:</label>
		      <PxInput icon="envelope" type="email" name="email" id="email"  value={o.email} onChange={this.handleChange}  placeholder="输入邮箱" />
		      <br/>
		      <AMUIReact.FormGroup>
		      <label>单选：</label>
		     <AMUIReact.Input type="radio" name="sex" value="0" label="男" inline onChange={this.handleChange} checked={o.sex==0?"checked":""}  />
		    <AMUIReact.Input type="radio" name="sex" value="1" label="女" inline onChange={this.handleChange} checked={o.sex==1?"checked":""}  />
		   </AMUIReact.FormGroup>
		      <br/>
		      <label htmlFor="office">职位:</label>
		      <input type="text" name="office" id="office" value={o.office} onChange={this.handleChange}  placeholder="必填，不超过15位"/>
		      <br/>
		      <button type="button" onClick={ajax_userinfo_update} className="am-btn am-btn-primary">提交</button>
		    </form>
		    <hr/>
		  
		  </div>
		</div>
		</div>
	);
	}
}); 

//userinfo update end

//role
var UserChooseRole_EventRow = React.createClass({ 
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
    var is_Checked=this.props.chooselist&&this.props.chooselist.indexOf(event.uuid)>-1;
    var className = is_Checked ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
		 <tr name="table_tr_checkbox" name="table_tr_checkbox"  id={"tr_chright_"+event.uuid} className={className} onClick={this.tr_onClick.bind(this,"tr_chright_"+event.uuid,"tb_cbox__chright"+event.uuid)}>
	      <td> 
	      <input type="checkbox" alt={event.name} value={event.uuid} id={"tb_cbox__chright"+event.uuid} name="table_checkbox" checked={is_Checked?"checked":""} />
	      </td>
    <td>{event.name}</td>
    <td>{event.description}</td>
    <td>{Vo.type(event.type)}</td>
  </tr> 
);
}
}); 

var UserChooseRole_EventsTable = React.createClass({
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
		  if( $("#id_checkbox_all")[0].checked){
			  $('tr[name="table_tr_checkbox"]').addClass("am-active");
		  }else{
			  $('tr[name="table_tr_checkbox"]').removeClass("am-active");
		  }
	  },
render: function() {
	  var that=this;
return (
<div>

  <AMUIReact.Table {...this.props}>  
    <thead> 
      <tr>
      	<th>  
        <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
        </th>
        <th>名称</th>
        <th>描述</th>
        <th>类型</th>
      </tr> 
    </thead>
    <tbody>
      {this.props.events.map(function(event) {
        return (<UserChooseRole_EventRow  chooselist={that.props.chooselist} event={event} />);
      })}
    </tbody>
  </AMUIReact.Table>
  </div>
);
}
});
//end Userinfo_getRole



//upload headImg
var Upload_headImg_options =
{
    thumbBox: '.thumbBox',
    spinner: '.spinner',
    imgSrc: ''
};
var Upload_headImg = React.createClass({
   	handleClick: function(m) {
   		w_uploadImg.handleClick(m);
   	  },
   	upload_file_onChange:function(){
   	  var reader = new FileReader();
      reader.onload = function(e) {
    	  Upload_headImg_options.imgSrc = e.target.result;
          w_uploadImg.cropper = $('#upload_file_imageBox').cropbox(Upload_headImg_options);
      }
      reader.readAsDataURL(this.files[0]);
      this.files = [];
   	},
   	btnZoomIn_onClick: function(){
   		if(w_uploadImg.cropper)w_uploadImg.cropper.zoomIn();
    },
    btnZoomOut_onClick: function(){
    	 if(w_uploadImg.cropper)w_uploadImg.cropper.zoomOut();
   },
   btnRotate_onClick: function(){
    	 if(w_uploadImg.cropper)w_uploadImg.cropper.chRotate();
   },
   btnCrop_onClick: function(){
	   if(!w_uploadImg.cropper)return;
	   var img = w_uploadImg.cropper.getDataURL();
	   w_uploadImg.base64=img;
       $('#upload_file_imageBox_cropped').html('<img src="'+img+'">');
   },
   	 componentDidMount:function(){
       $('#upload_imgfile').on('change', function(){
           var reader = new FileReader();
           reader.onload = function(e) {
        	   Upload_headImg_options.imgSrc = e.target.result;
        	   w_uploadImg.cropper = $('.imageBox').cropbox(Upload_headImg_options);
           }
           reader.readAsDataURL(this.files[0]);
           this.files = [];
       })

         
	  },
     render: function() {
    	 var spinner_divStyle={
    			 display: "none"
    	 };
       return (
       <div>
  	
     <div className="header">
     <div className="am-g">
       <h1>上传图片</h1>
     </div>
     <hr />
   </div>
   <div className="container">

   	<div className="imageBox" id="upload_file_imageBox">
   	    <div className="thumbBox"></div>
   	    <div className="spinner"  style={spinner_divStyle}>加载中...</div>
   	</div>
	<div className="action">
	    <input type="file" id="upload_imgfile" accept="image/*" />
	 <AMUIReact_Button amStyle="warning"onClick={this.btnCrop_onClick} >剪切</AMUIReact_Button>
	 <AMUIReact_Button amStyle="warning"onClick={this.btnZoomIn_onClick} >放大</AMUIReact_Button>
	 <AMUIReact_Button amStyle="warning"onClick={this.btnZoomOut_onClick} >缩小</AMUIReact_Button>

	</div>
		<div className="cropped" id="upload_file_imageBox_cropped">
	   	</div>
	</div>

<AMUIReact_ButtonToolbar>
<AMUIReact_Button amStyle="primary" onClick={this.handleClick.bind(this, "ok")} >确认</AMUIReact_Button>
<AMUIReact_Button amStyle="danger" onClick={this.handleClick.bind(this, "cancel")} >取消</AMUIReact_Button>
</AMUIReact_ButtonToolbar>
         </div>
       );
     }
});
       
       
//点赞模板2,点赞显示与点赞按钮分离,传入点赞按钮id
/*
 * 
 * 
 *@bind（this）方法中This代表对象前一步函数构造成对象传过来; 
 **/
var Common_Dianzan_show_noAction = React.createClass({ 
	getInitialState: function() {
		if(this.props.dianzan)return this.props.dianzan;
		return commons_ajax_dianzan_getByNewsuuid(this.props.uuid);
	  },
   componentWillReceiveProps: function(nextProps) {
	   this.setState(commons_ajax_dianzan_getByNewsuuid(nextProps.uuid));
	},
	handleChange_selectgroup_uuid:function(groupuuid){
		  this.setState(this.load_role_bind_user(groupuuid));
	},
	obj:null,
	 componentDidMount:function(){
		 var that=this;
		 //根据绑定的点赞按钮,设置对应状态,和绑定点击事件.
		if(!that.obj.canDianzan)$("#"+this.props.btn_dianzan).addClass("px-icon-hasdianzan");
		$("#"+this.props.btn_dianzan).bind("click",function(){
			var canDianzan=$("#"+that.props.btn_dianzan).hasClass("px-icon-hasdianzan")==false;
			common_ajax_dianzan_save(that.props.uuid,that.props.type,canDianzan,that.dianzansave_callback);
		});
	 },
	 dianzansave_callback:function(canDianzan){
		 if(canDianzan)$("#"+this.props.btn_dianzan).addClass("px-icon-hasdianzan");
		 else $("#"+this.props.btn_dianzan).removeClass("px-icon-hasdianzan");
		 this.setState(commons_ajax_dianzan_getByNewsuuid(this.props.uuid));
	 },
render: function() {	
	var dianzanObject=this.state;
	 this.obj=dianzanObject;
	 var showStr=  null;
	 if(!dianzanObject.names){
		 return null;
	 }
  return (
		   <small id="dianzan" className="am-margin-left-sm" >
		   {dianzanObject.names+",等一共"+dianzanObject.count+"人点赞"}
		   		<hr className="px_hr"/>
		   </small>


  );
}
}); 

/*
 * 图片绘制公共模板（点击可看原图）
 * */
//$('.am-gallery').pureview();  
var  Common_mg_big_fn  = React.createClass({
	  componentDidMount:function(){
		  $('.am-gallery').pureview();
		},
  render: function() {
	  var that=this
			  if (!this.props.imgsList){
				  return;
			  };		
			    return (
		      <div>
		      <ul  className="am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered">
			   
			    {this.props.imgsList.map(function(event) {
			    	 var  o = event;
					  var  imgArr=o?o.split("@"):"";
			        return (
			       	  <li>			     			
			     	    <div className="am-gallery-item">
			     		  <a href={imgArr[0]} title="">
			     		    <img src={o} alt=""  data-rel={imgArr[0]}/>
                          </a>
			     		</div>	   
	        		 </li>
			        	)
			      })}
			    </ul>	   
			  </div>
			    )
          }
        }); 

/*
 * 班级相册特殊图标绘制（点击可看原图）
 * */
//$('.am-gallery').pureview();  

/*
 * 图片绘制公共模板 绘制多张图片
 * */
var common_img_big_show = React.createClass({ 
	  componentDidMount:function(){
		  $('.am-gallery').pureview();
		},
	render: function() {		  
		  var  o = this.props.event;
		  var  imgArr=o.split("@");
		//  console.log("o-----",o,"   imgArr----",imgArr);
	  return (
	     <ul data-am-widget="gallery" className="am-gallery am-avg-sm-2 am-gallery-imgbordered" data-am-gallery="{pureview: 1}">
		   <li>
			 <div className="am-gallery-item">
		         <img src={o}
	             alt="" data-rel={imgArr[0]}/>
		     </div>
		   </li>
		 </ul>	   
	  );
	}
	}); 


var Common_Classnewsreply_listshow = React.createClass({ 	
render: function() {
		 var groupuuid=this.props.groupuuid;
  return (
		  <div>
		  {this.props.events.data.map(function(event) {
			  if(!event.create_img)event.create_img=G_def_headImgPath;
		      return (
		    		  <article className="am-comment am-comment-flip am-comment-success am-margin-xs">
		    		  <a href="javascript:void(0);">
		    		  <img src={event.create_img} className="am-comment-avatar" width="48" height="48"/>
		    		  </a>

		    		  <div className="am-comment-main am-comment-flip">
		    		    <header className="am-comment-hd">
		    		      <div className="am-comment-meta">
		    		      	<a href="#link-to-user" className="am-comment-author">{event.create_user}</a>|
		    		      		<time>{event.create_time}</time>|
		    		      		<G_check_disable_div_byRight type={98} uuid={event.uuid}  status={event.status}   groupuuid={groupuuid}/>
		    		      </div>
		    		    </header>
		    		    <div className="am-comment-bd am-comment-flip am-inline">
					        <div dangerouslySetInnerHTML={{__html:event.content}}></div>
			  		    </div>
		    			 
		    			 </div>
		    		</article>
		    		
		    		  )
		  })}
		
		    </div>		   
  );
}
}); 




//评论模板
var Common_reply_list = React.createClass({ 
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"classnewsreply_list_div",
	componentWillReceiveProps:function(){
		this.load_more_data();
	},
	componentDidMount:function(){
		this.load_more_data();
	},
	load_more_data:function(){
		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
		var re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,null,this.props.groupuuid);
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}		  
		  this.pageNo++;
	},
	refreshReplyList:function(){
		$("#"+this.classnewsreply_list_div).html("");
		this.pageNo=1;
		this.load_more_data();
	},

render: function() {
	this.load_more_btn_id="load_more_"+this.props.uuid;
	this.classnewsreply_list_div="classnewsreply_list_div"+this.props.uuid;
	var parentThis=this;
  return (
		  <div>
		  <div id={this.classnewsreply_list_div}></div>
		    <button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>
			 <Common_reply_save uuid={this.props.uuid}  type={this.props.type} parentThis={parentThis}/>			
			 
			 </div>
  );
}
}); 

//我要评论模块 
//that.refreshReplyList();自己写的一个刷新方法 置空一切到初始状态然后绘制;
var Common_reply_save = React.createClass({ 
	classnewsreply_list_div:"classnewsreply_list_div",
	reply_save_btn_click:function(){
		var that=this.props.parentThis;
		common_ajax_reply_save(function(){
			$("#classnews_content_replay").val("");
			that.refreshReplyList();
		
		})
	},
	componentDidMount:function(){
		$( '#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);
	},
render: function() {
  return (
		   <form id="editClassnewsreplyForm" method="post" className="am-form" action="javascript:void(0);">
			<input type="hidden" name="newsuuid"  value={this.props.uuid}/>
			<input type="hidden" name="uuid" />
			<input type="hidden" name="type"  value={this.props.uuid}/>
			
			
			<AMR_Input id="classnews_content_replay" type="textarea" rows="4" label="我要评论" placeholder="填写内容" name="content" />

			<button type="button"  onClick={this.reply_save_btn_click.bind(this)}  className="am-btn am-btn-primary">提交</button>
		      
		    </form>	   
  );
}
}); 

//新版帮助公共方法
var G_px_help_List = React.createClass({ 
	  render: function() {
	    return (
	    		  <ol className="am-breadcrumb am-text-warning">
		    		{this.props.data.map(function(event) {
			  			  return(
			  			  	<li>{event}</li>		  	  
			  			  )})}
	    		  </ol>
	    );
	  }
	  }); 




//绘制星星
var G_rect_stars = React.createClass({ 
	  render: function() {
		  var ct_stars=this.props.ct_stars;
		  var stars_list=[];
		   if(!ct_stars){
			   ct_stars=0;
			   stars_list.push({val:ct_stars});
		   }else if(ct_stars){
			   stars_list.push({val:ct_stars/10});
		    }
	    return (
	    		  <div>
		    		{stars_list.map(function(event) {
			  			  return(
			          <td>{event.val}</td>					  
			  		)})}
	    		  </div>
	    );
	  }
	  }); 



//返回预览方法
var G_phone_iframe = React.createClass({ 
	  render: function() {		
	    return (
	    		 <div className="iPhone px_margin_top_120"> <div className="screen">
               <iframe id="t_iframe" width="258px" height="431px"  frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"   ></iframe>
			   </div>  </div>
	    );
	  }
	  }); 




//学生状态数组返回
function G_status(){
    var data = [
                {value:'0',label: '在校'},
                {value:'1',label: '离校'},
	        	{value:'2',label: '毕业'}
              ];
    return {
        data_list: data
      };
}


/*
 *URL绘制公用组件
 * */
 var Common_Classnews_url = React.createClass({ 
 render: function() {
 	  var url = this.props.url;
 return (
<div>
<iframe id="t_iframe"  onLoad={G_iFrameHeight.bind(this,'t_iframe')}  frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"  width="100%" height="600px" src={url}></iframe>
 </div>
 );
 }
 }); 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
//——————————————————————————学生列表操作公共方法<绘制>——————————————————————————  
 var Common_operate_rect = React.createClass({ 
 	load_more_btn_id:"Sns_reply_reply_load_more_",
 	pageNo:1,
 	classnewsreply_list_div:"classnewsreply_list_div",
 	componentDidMount:function(){
 		this.refreshReplyList();
 	},
 	load_more_data:function(){ 
 		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
    		var that=this;
    		var callback=function(re_data){
     			if(!re_data)return;
     			if(re_data.data.length<re_data.pageSize){
     				$("#"+that.load_more_btn_id).hide();
     			}else{
     				$("#"+that.load_more_btn_id).show();
     			}
     			that.pageNo++;
     		}
 	var re_data=common_stutent_operate(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,callback);		  
 },
 	refreshReplyList:function(){
 		$("#"+this.classnewsreply_list_div).html("");
 		this.pageNo=1;
 		this.load_more_data();
 	},

 render: function() {
 	this.load_more_btn_id="Sns_reply_reply_load_more_"+this.props.uuid;
 	this.classnewsreply_list_div="classnewsreply_list_div"+this.props.uuid;
   return (
       <div>
        <div id={this.classnewsreply_list_div}></div>
        <button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>				 
 	  </div>
   );
 }
 }); 

 /*  	
  * 学生列表操作详情表单上绘制详细内容;
  * */
 var Query_stutent_operate = React.createClass({ 
 	  render: function() {
 	    var event = this.props.events;
 	    var className = event.highlight ? 'am-active' :
   event.disabled ? 'am-disabled' : '';
 	    return (
 	    		  <AMR_Table   bordered className="am-table-striped am-table-hover am-text-nowrap">		   	
 		          <tr>
 		            <th>修改人姓名</th>
 		            <th>修改时间</th>
 		            <th>具体操作</th>
 		          </tr> 			 
 	    			  {this.props.events.map(function(event) {
 	    			      return (
 	    					      <tr className={className}>
 	    				 	        <td>{event.create_user}</td>
 	    				 	        <td>{event.create_time}</td>
 	    				 	        <td>{event.message}</td> 	    					        </tr> 
 	    			    		  )
 	    			         })}	
 	    			  </AMR_Table>		  
 	    	  );
 }
 }); 
 
 /*幼儿园学生列表中查看学生信息绘制公用方法
  * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
  * 
  * */
 var Kd_commons_Class_student_look_info =React.createClass({
	 isRight:false,
 	 getInitialState: function() {
			
			this.isRight=G_user_hasRightByGroupuuid("KD_student_m",this.props.formdata.groupuuid);
 		    return this.props.formdata;
 		  },
		//查看操作记录方法
      	stutent_operate:function(uuid,pageNo){	
		React.render(React.createElement(Common_operate_rect,
		 		{uuid:uuid,
			    pageNo:pageNo
		   }),  document.getElementById(this.div_reply_save_id));		
	},	
	  //加载绑定卡信息
	  ajax_loadStudentbind_card:function(studentuuid){
		  var that=this;
		  that.last_apply_userid=null;
		  $.AMUI.progress.start();
		     var url = hostUrl + "rest/studentbind/queryByClassuuid.json?studentuuid="+studentuuid;
		 	$.ajax({
		 		type : "GET",
		 		url : url,
		 		dataType : "json",
		 		 async: true,
		 		success : function(data) {
		 			$.AMUI.progress.done();
		 			// 登陆成功直接进入主页
		 			if (data.ResMsg.status == "success") {
		 				$("#btn_cancelApply").hide();
		 				var list=data.list;
		 				var s="";
		 				if(!list||list.length==0){
		 					s="无";
		 				}else{
							//b2.studentuuid,b2.cardid,b2.userid,s1.name
		 					for(var i=0;i<list.length;i++){
		 						if(s)s+=",";
		 						if(!list[i][1]){
		 							list[i][1]="申请中";
		 							$("#btn_cancelApply").show();//申请中可以取消
		 							that.last_apply_userid=list[i][2];
		 						}
		 						s+=list[i][1]+"("+list[i][2]+")";
		 					}
		 				}
		 				$("#input_studentbind_card").html("接送卡号(申请号):"+s);
		 			} else {
		 				alert("加载数据失败："+data.ResMsg.message);
		 			}
		 		},
		 		error :G_ajax_error_fn
		 	});
	  },
	  btn_studentbind_apply:function(studentuuid){
		  var that=this;
		  ajax_studentbind_apply(studentuuid,function(){
			  that.ajax_loadStudentbind_card(studentuuid);
			  
		  });
	  },
	  btn_studentbind_cancelApply:function(studentuuid){
		  var that=this;
		  if(!that.last_apply_userid){
			  alert("只能取消申请中的接送卡!");
			  return;
		  }
		  ajax_studentbind_cancelApply(studentuuid,that.last_apply_userid,function(){
			  that.ajax_loadStudentbind_card(studentuuid);
			  
		  });
	  },
	  componentDidMount:function(){
		  $('.am-gallery').pureview();
		  	this.ajax_loadStudentbind_card(this.state.uuid);
		},
 		render: function() {
 	     var o =this.state;
		 if(!o.status)o.status=0;
		 this.div_reply_save_id="btn_stutent_operate"+o.uuid;
	     var imgGuid=o.headimg;
	     var imglist=[imgGuid];
	     var rect_info=(<div></div>);
	     if(this.isRight||this.props.type==2){
	    	 rect_info=(		 		 
	    		  <AMR_ButtonToolbar>
				    <AMR_Button amStyle="secondary" onClick={ajax_myclass_students_edit.bind(this,o.uuid)} >修改学生</AMR_Button>
			 	   <AMR_Button amStyle="secondary" onClick={this.btn_studentbind_apply.bind(this,o.uuid)} >申请接送卡</AMR_Button>
			 	   <AMR_Button amStyle="warning" id="btn_cancelApply" onClick={this.btn_studentbind_cancelApply.bind(this,o.uuid)} >取消申请接送卡</AMR_Button>
					 <AMR_Button amStyle="danger" onClick={ajax_student_delete.bind(this,o.uuid)} >删除</AMR_Button>
		 	   	
				 <G_help_popo   msg={G_tip.studentbind_app} />
			 	  </AMR_ButtonToolbar>)
	     }
 		 return (
 		 		<div>
 		 		<hr/>
 		 		{rect_info}
			    <AMUIReact.List static border striped>
			      <Common_mg_big_fn  imgsList={imglist} />				  
				  <br/>
			      <AMUIReact.ListItem icon="mobile">姓名:{o.name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem id="input_studentbind_card">接送卡号:加载中...</AMUIReact.ListItem>
			      <AMUIReact.ListItem>昵称:{o.nickname}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>性别:{Vo.get("sex_"+o.sex)}</AMUIReact.ListItem>
					 <AMUIReact.ListItem>学校:{Store.getGroupNameByUuid(o.groupuuid)}</AMUIReact.ListItem>
					<AMUIReact.ListItem>班级:{Store.getClassNameByUuid(o.classuuid)}</AMUIReact.ListItem>

                  <AMUIReact.ListItem>状态:{Vo.get("student_status_"+o.status)}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>出生日期:{o.birthday}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>妈妈姓名:{o.ma_name}</AMUIReact.ListItem>
			      <Class_student_Tel_ListItem name={"妈妈电话"} tel={o.ma_tel} parentList={this.props.parentList} uuid={o.uuid}/> 
			      <AMUIReact.ListItem>妈妈的工作:{o.ma_work}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸姓名:{o.ba_name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸的工作:{o.ba_work}</AMUIReact.ListItem>
			      <Class_student_Tel_ListItem name={"爸爸电话"} tel={o.ba_tel} parentList={this.props.parentList} uuid={o.uuid}/>
			      <AMUIReact.ListItem>家庭住址:{o.address}</AMUIReact.ListItem>
			      <Class_student_Tel_ListItem name={"爷爷电话"} tel={o.ye_tel}  parentList={this.props.parentList} uuid={o.uuid}/>
			      <Class_student_Tel_ListItem name={"奶奶电话"} tel={o.nai_tel}  parentList={this.props.parentList} uuid={o.uuid}/>
			      <Class_student_Tel_ListItem name={"外公电话"} tel={o.waigong_tel} parentList={this.props.parentList} uuid={o.uuid}/>
			      <Class_student_Tel_ListItem name={"外婆电话"} tel={o.waipo_tel} parentList={this.props.parentList} uuid={o.uuid}/>
			      <Class_student_Tel_ListItem name={"其他电话"} tel={o.other_tel} parentList={this.props.parentList} uuid={o.uuid}/>
			      <AMUIReact.ListItem>
			      <div dangerouslySetInnerHTML={{__html:G_textToHTML("说明:"+o.note)}}></div>
 			      </AMUIReact.ListItem>			        			      
 			      </AMUIReact.List>
 		    	    <AMR_ButtonToolbar>
 			 	    <AMR_Button amStyle="secondary" onClick={this.stutent_operate.bind(this,o.uuid,o.pageNo)} >加载修改记录</AMR_Button>
 			 	    </AMR_ButtonToolbar>
			    <div id={this.div_reply_save_id}>			</div>	
 		 	     </div> 
 		     );
 	        }
 		 });
 
 
 
 /*培训机构学生列表中查看学生信息绘制公用方法
  * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
  * 
  * */
 var Px_Commons_Class_student_look_info =React.createClass({
 	 getInitialState: function() {
 		    return this.props.formdata;
 		  },
		//查看操作记录方法
      	stutent_operate:function(uuid,pageNo){	
		React.render(React.createElement(Common_operate_rect,
		 		{uuid:uuid,
			    pageNo:pageNo
		   }),  document.getElementById(this.div_reply_save_id));		
	},	
	  btn_studentbind_apply:function(studentuuid){
		  var that=this;
		  ajax_studentbind_apply(studentuuid,function(){
			  that.ajax_loadStudentbind_card(studentuuid);
			  
		  });
	  },
 		render: function() {
 	     var o =this.state;
		 if(!o.status)o.status=0;
		 this.div_reply_save_id="btn_stutent_operate"+o.uuid;
	     var imgGuid=o.headimg;
	     var imglist=[imgGuid];
	     var rect_info=(<div></div>);
	     if(this.props.type==2){
	    	 rect_info=(		 		 
	 		 		 <AMR_ButtonToolbar>
	  		 	     <AMR_Button amStyle="secondary" onClick={ajax_myclass_students_edit.bind(this,o.uuid)} >修改学生</AMR_Button>
					  <AMR_Button amStyle="danger" onClick={ajax_pxstudent_delete.bind(this,o.uuid)} >删除</AMR_Button>
		 	   	
	  		 	     </AMR_ButtonToolbar>); 
	     }
 		 return (
 		 		<div>
 		 		{rect_info}
			    <AMUIReact.List static border striped>
			      <Common_mg_big_fn  imgsList={imglist} />				  
				  <br/>
			      <AMUIReact.ListItem icon="mobile">姓名:{o.name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>昵称:{o.nickname}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>性别:{Vo.get("sex_"+o.sex)}</AMUIReact.ListItem>

                  <AMUIReact.ListItem>状态:{Vo.get("student_status_"+o.status)}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>出生日期:{o.birthday}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>妈妈姓名:{o.ma_name}</AMUIReact.ListItem>
			      <Class_student_Tel_ListItem name={"妈妈电话"} tel={o.ma_tel}/>
			      <AMUIReact.ListItem>妈妈的工作:{o.ma_work}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸姓名:{o.ba_name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>爸爸的工作:{o.ba_work}</AMUIReact.ListItem>
			      <Class_student_Tel_ListItem name={"爸爸电话"} tel={o.ba_tel}/>
			      <AMUIReact.ListItem>家庭住址:{o.address}</AMUIReact.ListItem>
			      <Class_student_Tel_ListItem name={"爷爷电话"} tel={o.ye_tel}/>
			      <Class_student_Tel_ListItem name={"奶奶电话"} tel={o.nai_tel}/>
			      <Class_student_Tel_ListItem name={"外公电话"} tel={o.waigong_tel}/>
			      <Class_student_Tel_ListItem name={"外婆电话"} tel={o.waipo_tel}/>
			      <Class_student_Tel_ListItem name={"其他电话"} tel={o.other_tel}/>
			      <AMUIReact.ListItem>
			      <div dangerouslySetInnerHTML={{__html:G_textToHTML("说明:"+o.note)}}></div>
 			      </AMUIReact.ListItem>			        			      
 			      </AMUIReact.List>
 		    	    <AMR_ButtonToolbar>
 			 	    <AMR_Button amStyle="secondary" onClick={this.stutent_operate.bind(this,o.uuid,o.pageNo)} >加载修改记录</AMR_Button>
 			 	    </AMR_ButtonToolbar>
			    <div id={this.div_reply_save_id}>			</div>	
 		 	     </div> 
 		     );
 	        }
 		 });
 

 
 /*老师申请卡中查看信息绘制方法
  * <AMUIReact.ListItem>调用的为AMUIReact中的List 标签；
  * 
  * */
 var Kd_commons_teacher_look_info =React.createClass({
	 isRight:false,
 	 getInitialState: function() {
 		var groupuuid,group_List;
 		group_List=Store.getGroupNoGroup_wjd();
 		groupArry=G_selected_dataModelArray_byArray(group_List,"uuid","brand_name");
		if(!groupuuid){
			groupuuid=group_List[0].uuid;
		}
		this.props.formdata.groupuuid=groupuuid;	
		this.props.formdata.groupArry=groupArry;
		this.props.formdata.ickname=Store.getGroupNameByUuid(groupuuid);
 		this.isRight=G_user_hasRightByGroupuuid("KD_student_m",this.props.formdata.groupuuid);

 		    return this.props.formdata;
 		  },
		//查看操作记录方法
      	stutent_operate:function(uuid,pageNo){	
		React.render(React.createElement(Common_operate_rect,
		 		{uuid:uuid,
			    pageNo:pageNo
		   }),  document.getElementById(this.div_reply_save_id));		
	},	
  //加载绑定卡信息
  ajax_loadStudentbind_card:function(uuid){
	  var that=this;
	  that.last_apply_userid=null;
	  $.AMUI.progress.start();
	     var url = hostUrl + "rest/studentbind/query.json";
	 	$.ajax({
	 		type : "GET",
	 		url : url,
	 		data:{studentuuid:uuid,type:0},
	 		dataType : "json",
	 		 async: true,
	 		success : function(data) {
	 			$.AMUI.progress.done();
	 			// 登陆成功直接进入主页
	 			if (data.ResMsg.status == "success") {
	 				$("#btn_cancelApply").hide();
	 				var list=data.list.data;
	 				var s="";
	 				if(!list||list.length==0){
	 					s="无";
	 				}else{
						//b2.studentuuid,b2.cardid,b2.userid,s1.name
	 					for(var i=0;i<list.length;i++){
	 						if(s)s+=",";
	 						if(!list[i][1]){
	 							list[i][1]="申请中";
	 							$("#btn_cancelApply").show();//申请中可以取消
	 							that.last_apply_userid=list[i][2];
	 						}
	 						s+=list[i][1]+"("+list[i][2]+")";
	 					}
	 				}
	 				$("#input_studentbind_card").html("接送卡号(申请号):"+s);
	 			} else {
	 				alert("加载数据失败："+data.ResMsg.message);
	 			}
	 		},
	 		error :G_ajax_error_fn
	 	});
  },
  btn_studentbind_apply:function(uuid){
	  var that=this;
	  ajax_teacher_apply(uuid,this.state.groupuuid,function(){
		  that.ajax_loadStudentbind_card(uuid);
		  
	  });
  },
  btn_studentbind_cancelApply:function(uuid){
	  var that=this;
	  if(!that.last_apply_userid){
		  alert("只能取消申请中的接送卡!");
		  return;
	  }
	  ajax_teacher_cancelApply(uuid,that.last_apply_userid,function(){
		  that.ajax_loadStudentbind_card(uuid);
		  
	  });
  },
  componentDidMount:function(){
	  $('.am-gallery').pureview();
	  	this.ajax_loadStudentbind_card(this.state.uuid);
	},
	//切换学校
	handleChange_selectclass_uuid:function(val){
		var ickname=Store.getGroupNameByUuid(val);
		var obj=this.state;		
		 obj.ickname=ickname;
		 obj.groupuuid=val;
		 this.setState(obj);
	      },		
  render: function() {
 	     var o =this.state;
		 if(!o.status)o.status=0;
		 this.div_reply_save_id="btn_stutent_operate"+o.uuid;
	     var imgGuid=o.headimg;
	     var imglist=[imgGuid];
 		 return (
 		 		<div>
 		 		<hr/>
	    		  <AMR_ButtonToolbar>
	    			<div className="am-fl am-margin-bottom-xs  am-margin-left-xs">
	    			 <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectclass_uuid} btnWidth="200"  multiple= {false} data={o.groupArry} btnStyle="primary" value={o.groupuuid} />
	    			</div>

			 	   <AMR_Button amStyle="secondary" onClick={this.btn_studentbind_apply.bind(this,o.uuid)} >申请接送卡</AMR_Button>
			 	   <AMR_Button amStyle="warning" id="btn_cancelApply" onClick={this.btn_studentbind_cancelApply.bind(this,o.uuid)} >取消申请接送卡</AMR_Button>
			 	  </AMR_ButtonToolbar>
			    <AMUIReact.List static border striped>
			      <Common_mg_big_fn  imgsList={imglist} />				  
				  <br/>
			      <AMUIReact.ListItem icon="mobile">姓名:{o.name}</AMUIReact.ListItem>
			      <AMUIReact.ListItem id="input_studentbind_card">接送卡号:加载中...</AMUIReact.ListItem>
			      <AMUIReact.ListItem>昵称:{o.nickname}</AMUIReact.ListItem>
			      <AMUIReact.ListItem>性别:{Vo.get("sex_"+o.sex)}</AMUIReact.ListItem>
			      <Class_student_Tel_ListItem name={"电话"} tel={o.tel}/>
				  <AMUIReact.ListItem>学校:{o.ickname}</AMUIReact.ListItem>
                  <AMUIReact.ListItem>状态:{Vo.get("student_status_"+o.status)}</AMUIReact.ListItem>
		        			      
 			      </AMUIReact.List>
 		    	    <AMR_ButtonToolbar>
 			 	    <AMR_Button amStyle="secondary" onClick={this.stutent_operate.bind(this,o.uuid,o.pageNo)} >加载修改记录</AMR_Button>
 			 	    </AMR_ButtonToolbar>
			    <div id={this.div_reply_save_id}>			</div>	
 		 	     </div> 
 		     );
 	        }
 		 }); 
 
 
 
 
 
 