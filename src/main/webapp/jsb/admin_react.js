//login

/*
 *登录界面账号与密码输入绘制
 * <img src={hostUrl+"i/denglulogo.png"} width="100px" height="100px"/> 绘制图片
 * */
var Div_login = React.createClass({displayName: "Div_login", 
	 getInitialState: function() {
		    return this.props;
		  },
	 handleChange: function(event) {
		 var o=$('#login_form').serializeJson();
		 	o.pw_checked=$("#pw_checked").prop("checked")?"checked":"";
		    this.setState(o);
	  },
render: function() { 
	  var o = this.state;
 return (
 		React.createElement("div", null, 
 		React.createElement("div", {className: "header"}, 
 		  React.createElement("div", {className: "am-g"}, 
 		 React.createElement("img", {src: hostUrl+"i/denglulogo.png", width: "100px", height: "100px"}), 
 		 React.createElement("h1", null, "问界科技管理云平台")
 		  )
 		), 
 		React.createElement("div", {className: "am-g"}, 
 		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
 		 React.createElement("form", {id: "login_form", method: "post", className: "am-form"}, 
 	      React.createElement(PxInput, {icon: "mobile", type: "text", name: "loginname", id: "loginname", value: o.loginname, onChange: this.handleChange}), 
 	      React.createElement(PxInput, {icon: "lock", type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange}), 
 	      React.createElement("label", {htmlFor: "pw_checked"}, 
 	        React.createElement("input", {id: "pw_checked", name: "pw_checked", type: "checkbox", checked: o.pw_checked=="checked"?"checked":"", onChange: this.handleChange}), 
 	        "记住密码"
 	      ), 
 	      React.createElement("div", {className: "am-cf"}, 
 	        React.createElement("input", {id: "btn_login", onClick: ajax_userinfo_login, type: "button", name: "", value: "登 录", className: "am-btn am-btn-primary am-btn-sm am-fl"}), 
 	        React.createElement("input", {type: "button", onClick: menu_userinfo_updatePasswordBySms_fn, value: "忘记密码 ^_^? ", className: "am-btn am-btn-default am-btn-sm am-fr"})
 	      ), 
 	   
 	     React.createElement("br", null)
 	    ), 
 	    React.createElement("hr", null), 
 	   React.createElement("p", null, "© 2015 成都问界科技有限公司  | 蜀ICP备15021053号-1")
 	     )
 	   )
 	   
 	   )
 );
}
}); 

//end login



//right
var Right_EventRow = React.createClass({displayName: "Right_EventRow", 
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
	ajax_right_edit_onClick:function(s){
		ajax_right_button_handleClick("edit",s);
	},
	componentDidMount:function(){
		$(".am-active input[type='checkbox']").prop("checked",true); 
	},
  render: function() {
    var event = this.props.event;
    var is_Checked=this.props.chooselist&&this.props.chooselist.indexOf(event.uuid)>-1;
    var className = is_Checked ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
		 React.createElement("tr", {name: "table_tr_checkbox_right", id: "tr_chright_"+event.uuid, className: className}, 
	      React.createElement("td", {onClick: this.tr_onClick.bind(this,"tr_chright_"+event.uuid,"tb_cbox__chright"+event.uuid)}, 
	      React.createElement("input", {type: "checkbox", alt: event.name, value: event.uuid, id: "tb_cbox__chright"+event.uuid, name: "table_checkbox"})
	      ), 
        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: this.ajax_right_edit_onClick.bind(this, JSON.stringify(event))}, event.name)), 
        React.createElement("td", null, event.description), 
        React.createElement("td", null, Vo.type(event.type))
      ) 
    );
  }
}); 

var Right_EventsTable = React.createClass({displayName: "Right_EventsTable",
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
		  if( $("#id_checkbox_all")[0].checked){
			  $('tr[name="table_tr_checkbox_right"]').addClass("am-active");
		  }else{
			  $('tr[name="table_tr_checkbox_right"]').removeClass("am-active");
		  }
	  },
  render: function() {
	  var that=this;
    return (
    		React.createElement("div", null, 
      React.createElement(AMUIReact.Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          	React.createElement("th", null, 
            React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
            ), 
            React.createElement("th", null, "名称"), 
            React.createElement("th", null, "描述"), 
            React.createElement("th", null, "类型")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Right_EventRow, {chooselist: that.props.chooselist, event: event}));
          })
        )
      ), 
      React.createElement("button", {type: "button", onClick: ajax_right_button_handleClick.bind(this, "add_right",this.props.type), className: "am-btn am-btn-primary"}, "添加权限")
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
    		    React.createElement("h1", null, "编辑权限-【", Vo.type(o.type), "】")
    		  ), 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  React.createElement("form", {id: "editRightForm", method: "post", className: "am-form"}, 
    			React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    			React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
    		      React.createElement("label", {htmlFor: "name"}, "名字:"), 
    		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过15位"}), 
    		      React.createElement("br", null), 
    		       React.createElement("label", {htmlFor: "description"}, "描述:"), 
    		      React.createElement("input", {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange}), 
    		      React.createElement("button", {type: "button", onClick: ajax_right_save, className: "am-btn am-btn-primary"}, "提交")
    		    )

    	     )
    	   )
    	   
    	   )
    );
  }
}); 
//end right




//role
var Role_EventRow = React.createClass({displayName: "Role_EventRow", 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    React.createElement("tr", {className: className}, 
    React.createElement("td", null, 
    React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
    ), 
      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: ajax_role_edit.bind(this, event)}, event.name)), 
      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: ajax_role_bind_right.bind(this, event)}, "绑定权限"), 
      React.createElement("td", null, event.description), 
      React.createElement("td", null, Vo.type(event.type))
     )
    ) 
  );
}
}); 

var Role_EventsTable = React.createClass({displayName: "Role_EventsTable",
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="add_role"){
				 this.props.handleClick(m,$('#select_role_type').val());
				 return;
			 } 
			 
			 var uuids=null;
			 $("input[name='table_checkbox']").each(function(){
				if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					 uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				 }
				});
			  if(!uuids){
				  G_msg_pop("请勾选复选框！");
				  return;
			  }
			  
			  
			  if(m=="role_bind_right"){
				if(uuids.indexOf(",")>-1){
					G_msg_pop("只能选择一条数据!");
					  return;
				}
			  
			  }
			 this.props.handleClick(m,$('#selectgroup_uuid').val(),uuids);
			 
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_select_role_type:function(){
		  ajax_role_list($('#select_role_type').val());
	  },
render: function() {
  return (
  React.createElement("div", null, 
  React.createElement(AMUIReact.ButtonToolbar, null, 
	    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_role")}, "添加")
	 ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
    React.createElement("select", {id: "select_role_type", name: "group_uuid", value: this.props.type, onChange: this.handleChange_select_role_type}, 
    Vo.getTypeList("group_type").map(function(event) {
          return (  React.createElement("option", {value: event.key}, event.val));
        })
    )
  ), 
  React.createElement("div", {className: "header"}, 
  React.createElement("div", {className: "am-g"}, 
    React.createElement("h1", null, "角色管理")
  ), 
  React.createElement("hr", null)
), 
    React.createElement(AMUIReact.Table, React.__spread({},  this.props), 
      React.createElement("thead", null, 
        React.createElement("tr", null, 
        	React.createElement("th", null, 
          React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
          ), 
          React.createElement("th", null, "名称"), 
          React.createElement("th", null, "操作"), 
          React.createElement("th", null, "描述"), 
          React.createElement("th", null, "类型")
        )
      ), 
      React.createElement("tbody", null, 
        this.props.events.map(function(event) {
          return (React.createElement(Role_EventRow, {key: event.id, event: event}));
        })
      )
    )
    )
  );
}
});
  
var Role_edit = React.createClass({displayName: "Role_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editRoleForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
  return (
  		React.createElement("div", null, 
  		React.createElement("div", {className: "header"}, 
  		  React.createElement("div", {className: "am-g"}, 
  		    React.createElement("h1", null, "编辑角色")
  		  ), 
  		  React.createElement("hr", null)
  		), 
  		React.createElement("div", {className: "am-g"}, 
  		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
  		  React.createElement("form", {id: "editRoleForm", method: "post", className: "am-form"}, 
  			React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
  		    React.createElement("div", {className: "am-form-group"}, 
  		          React.createElement("select", {id: "type", name: "type", value: o.type, onChange: this.handleChange}, 
  		          
  		        Vo.getTypeList("group_type").map(function(event) {
  		          return (  React.createElement("option", {value: event.key}, event.val));
  		        })
  		          
  		          )
  		        ), 
  		      React.createElement("label", {htmlFor: "name"}, "名字:"), 
  		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过15位"}), 
  		      React.createElement("br", null), 
  		       React.createElement("label", {htmlFor: "description"}, "描述:"), 
  		      React.createElement("input", {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange}), 
  		      React.createElement("button", {type: "button", onClick: ajax_role_save, className: "am-btn am-btn-primary"}, "提交")
  		    )

  	     )
  	   )
  	   
  	   )
  );
}
}); 


var Role_bind_right = React.createClass({displayName: "Role_bind_right", 
	
render: function() {
	  var o = this.props.formdata;
  return (
  		React.createElement("div", null, 
	  		React.createElement("div", {className: "header"}, 
		  		  React.createElement("div", {className: "am-g"}, 
		  		    React.createElement("h1", null, "角色绑定权限-【", Vo.type(o.type), "】-【", o.name, "】")
		  		  )
	  		), 
  			React.createElement("button", {type: "button", onClick: btn_ajax_updateRight.bind(this, o.uuid), className: "am-btn am-btn-primary"}, "提交"), 
	  		React.createElement(Right_EventsTable, React.__spread({},  this.props))
	  	   
  	   )
  );
}
}); 
//end role 

//end role bind right

//无分页用户管理废弃代码
////userinfo
///*
// * 老师管理服务器请求后绘制处理方法；
// * @逻辑：如果点击的不是添加按钮，则先检查是否勾选选框再处理其他判断；
// * @btn_click_userinfo：判断后程序跳转至d_service做各个按钮的处理; 
// * @调用LIS.events.map方法循环绘制老师数组； 
// * @</select>下拉多选框;
// * */
//var AD_Userinfo_EventsTable = React.createClass({
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
//		  if(m=="getRole"){
//			  if(!uuids&&uuids.indexOf(",")>-1){
//				  G_msg_pop("只能选择一个！");
//					return;
//				};
//				  var opt={groupuuid:$("input[name='group_uuid']").val(),
//						  userUuid:uuids};
//				  btn_click_userinfo(m,opt,usernames);
//				  return;
//		  }
//		  if(m=="del"){
//			  if(!uuids&&uuids.indexOf(",")>-1){
//				  G_msg_pop("只能选择一个！");
//					return;
//				};
//		  }
//	
//		  btn_click_userinfo(m,uuids,usernames);
//	  },
//	  handleChange_checkbox_all:function(){
//		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
//	  },
//	  handleChange_selectgroup_uuid:function(val){
//		  ajax_uesrinfo_listByAllGroup($("input[name='group_uuid']").val(),$('#sutdent_name').val());
//	  },
//  render: function() {
//    return (
//    <div>
//    <div className="header">
//    <hr />
//    </div>
//    <AMR_ButtonToolbar>
//	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} >添加</AMR_Button>
//	    <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "enable")} >启用</AMR_Button>
//	    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "disable")} >禁用</AMR_Button>
//	    <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "getRole")} >分配权限</AMR_Button>
//	    <AMR_Button amStyle="revise" onClick={this.handleClick.bind(this, "edit")} >修改</AMR_Button>
//	    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "del")} >删除</AMR_Button>
//	    </AMR_ButtonToolbar>
//	      <form id="editGroupForm" method="post" className="am-form">
//	      <input type="text" name="sutdent_name" id="sutdent_name" size="1"    placeholder="教师姓名"/>	  
//		  <button type="button"  onClick={this.handleChange_selectgroup_uuid}  className="am-btn am-btn-primary">搜索</button>	  	
//		  </form>
//	  <hr/>
//	  <div className="am-form-group">
//	  <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.handleChange_selectgroup_uuid} btnWidth="200"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={this.props.group_uuid} />      
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
//            return (<Userinfo_EventRow1 key={event.id} event={event} />);
//          })}
//        </tbody>
//      </AMR_Table>
//      </div>
//    );
//  }
//});
    
    
    
    
//userinfo
/*
 * 老师管理服务器请求后绘制处理方法；
 * @逻辑：如果点击的不是添加按钮，则先检查是否勾选选框再处理其他判断；
 * @btn_click_userinfo：判断后程序跳转至d_service做各个按钮的处理; 
 * @调用LIS.events.map方法循环绘制老师数组； 
 * @</select>下拉多选框;
 * */
var Userinfo_EventsTable_div = React.createClass({displayName: "Userinfo_EventsTable_div",
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps:function(){
		this.load_more_data();
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
		var re_data=ajax_uesrinfo_listByAllGroup_admin(this.classnewsreply_list_div+this.pageNo,$("input[name='group_uuid']").val(),$('#sutdent_name').val(),this.pageNo,callback);
		if(!re_data)return;
		if(re_data.data.length<re_data.pageSize){
			$("#"+this.load_more_btn_id).hide();
		}else{
			$("#"+this.load_more_btn_id).show();
		}		  
		  this.pageNo++;
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},		
	
	handleClick: function(m) {		
		 if(m=="add"){
			 btn_click_userinfo(m,{group_uuid:this.props.groupuuid,office:"老师"});
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
			 };
			});
		  if(!uuids){
			  G_msg_pop("请勾选复选框！");
			  return;
		  }
		  if(m=="getRole"){
			  if(!uuids&&uuids.indexOf(",")>-1){
				  G_msg_pop("只能选择一个！");
					return;
				};
				  var opt={groupuuid:$("input[name='group_uuid']").val(),
						  userUuid:uuids};
				  btn_click_userinfo(m,opt,usernames);
				  return;
		  }
		  if(m=="del"){
			  if(!uuids&&uuids.indexOf(",")>-1){
				  G_msg_pop("只能选择一个！");
					return;
				};
		  }		  
		  btn_click_userinfo(m,uuids,usernames);
		  this.refresh_data();
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
  render: function() {
	  this.load_more_btn_id="load_more_"+this.props.uuid;
    return (
    
	   React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 	
	    React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 		   
	     React.createElement(AMR_ButtonToolbar, {className: "am-cf am-margin-left-xs"}, 	   
	      React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		   React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.refresh_data.bind(this), data: this.props.group_list, btnStyle: "primary", value: this.props.groupuuid})
		    ), 		  
		   React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add")}, "添加")
		 ), 		    
		  React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		   React.createElement(AMR_Button, {amStyle: "success", onClick: this.handleClick.bind(this, "enable")}, "启用")
		    ), 		    
		   React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		  React.createElement(AMR_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "disable")}, "禁用")
		 ), 
		    React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		   React.createElement(AMR_Button, {amStyle: "revise", onClick: this.handleClick.bind(this, "edit")}, "修改")
		  ), 		    
		   React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		    React.createElement(AMR_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "del")}, "删除")
		     ), 
			   
			React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		   React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "教师姓名"})		  
		  ), 			  
		   React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
			React.createElement("button", {type: "button", onClick: this.refresh_data.bind(this), className: "am-btn am-btn-primary"}, "搜索")
		     )				  
			  )
			 ), 
			  React.createElement("div", {id: "div_totalNumber"}, "总人数:0"
			  ), 	
	    React.createElement("div", {id: this.classnewsreply_list_div}
		  ), 		   	   		   
		   React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		   )		  
		  )	
    );
    
  }
});    

    var Userinfo_EventRow_admin = React.createClass({displayName: "Userinfo_EventRow_admin", 
		  render: function() {
			    var event = this.props.events;
			    var className = event.highlight ? 'am-active' :
		  event.disabled ? 'am-disabled' : '';
			    return (
			    		  React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 		   	
				          React.createElement("tr", null, 
				          	React.createElement("th", null, 
				            React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
				            ), 
				            React.createElement("th", null, "帐号"), 
				            React.createElement("th", null, "姓名"), 
				            React.createElement("th", null, "电话"), 
				            React.createElement("th", null, "邮箱"), 
				            React.createElement("th", null, "性别"), 
				            React.createElement("th", null, "状态"), 
				            React.createElement("th", null, "登录时间"), 
				            React.createElement("th", null, "创建时间")
				          ), 			 
			    			  this.props.events.map(function(event) {
			    			      return (
			    					      React.createElement("tr", {className: className}, 
			    				   	      React.createElement("td", null, 
			    				   	      React.createElement("input", {type: "checkbox", value: event.uuid, alt: event.name, name: "table_checkbox"})
			    				   	      ), 
			    				   	        React.createElement("td", null, event.loginname), 
			    				   	        React.createElement("td", null, event.name), 
			    				   	        React.createElement("td", null, event.tel), 
			    				   	        React.createElement("td", null, event.email), 
			    				   	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
			    				   	        React.createElement("td", {className: "px_disable_"+event.disable}, Vo.get("disable_"+event.disable)), 
			    				   	        React.createElement("td", null, event.login_time), 
			    				   	        React.createElement("td", null, event.create_time), "                    ") 
			    			    		  )
			    			         })	
			    			  )		  
			    	  );
		}
  	});   
//userinfo end

//basedatatype
var Basedatatype_EventRow = React.createClass({displayName: "Basedatatype_EventRow", 
	handleClick: function(m,data) {
		ajax_basedatatype_button_handleClick(m,data);
	  },
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  React.createElement("tr", {className: className}, 
  React.createElement("td", null, 
  React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
  ), 
    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: this.handleClick.bind(this,"edit", event)}, event.name)), 
    React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: this.handleClick.bind(this,"detail", event)}, "详细")), 
    React.createElement("td", null, event.description)
   
  ) 
);
}
}); 

var Basedatatype_EventsTable = React.createClass({displayName: "Basedatatype_EventsTable",
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="add_basedatatype"){
				 ajax_basedatatype_button_handleClick(m,{})
				 return;
			 }
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_select_basedatatype_type:function(){
		  ajax_basedatatype_list($('#select_basedatatype_type').val());
	  },
render: function() {
return (
React.createElement("div", null, 
React.createElement("div", {className: "header"}, 
React.createElement("div", {className: "am-g"}, 
  React.createElement("h1", null, "编辑基础数据类型")
), 
React.createElement("hr", null)
), 
React.createElement(AMUIReact.ButtonToolbar, null, 
	    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_basedatatype")}, "添加")
	 ), 
	  React.createElement("hr", null), 
	  
  React.createElement(AMUIReact.Table, React.__spread({},  this.props), 
    React.createElement("thead", null, 
      React.createElement("tr", null, 
      	React.createElement("th", null, 
        React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
        ), 
        React.createElement("th", null, "名称"), 
        React.createElement("th", null, "操作"), 
        React.createElement("th", null, "描述")
      )
    ), 
    React.createElement("tbody", null, 
      this.props.events.map(function(event) {
        return (React.createElement(Basedatatype_EventRow, {key: event.id, event: event}));
      })
    )
  )
  )
);
}
});

var Basedatatype_edit = React.createClass({displayName: "Basedatatype_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editBasedatatypeForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		    React.createElement("h1", null, "编辑基础数据类型")
		  ), 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		  React.createElement("form", {id: "editBasedatatypeForm", method: "post", className: "am-form"}, 
			React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		      React.createElement("label", {htmlFor: "name"}, "名字:"), 
		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过15位"}), 
		      React.createElement("br", null), 
		       React.createElement("label", {htmlFor: "description"}, "描述:"), 
		      React.createElement("input", {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange}), 
		      React.createElement("label", {htmlFor: "name"}, "顺序:"), 
		      React.createElement("input", {type: "text", name: "ind", id: "ind", value: o.ind, onChange: this.handleChange, placeholder: "0、1、2、3、4、5"}), 
		      
		      React.createElement("button", {type: "button", onClick: ajax_basedatatype_save, className: "am-btn am-btn-primary"}, "提交")
		    )

	     )
	   )
	   
	   )
);
}
}); 
//end basedatatype

// basedatatypelist
var Basedatatype_bind_basedatalist = React.createClass({displayName: "Basedatatype_bind_basedatalist", 
	
render: function() {
	  var o = this.props.formdata;
  return (
  		React.createElement("div", null, 
	  		React.createElement("div", {className: "header"}, 
		  		  React.createElement("div", {className: "am-g"}, 
		  		    React.createElement("h1", null, "基础数据【", o.name, "】")
		  		  )
	  		), 
  			React.createElement("button", {type: "button", onClick: Queue.doBackFN.bind(Queue), className: "am-btn am-btn-primary"}, "返回"), 
	  		React.createElement(Basedatalist_EventsTable, React.__spread({},  this.props))
	  	   
  	   )
  );
}
}); 

var Basedatalist_EventRow = React.createClass({displayName: "Basedatalist_EventRow", 
	
  render: function() {
    var event = this.props.event;

    return (
		 React.createElement("tr", null, 
        React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: btn_click_basedatatypelist.bind(this,"edit", JSON.stringify(event))}, event.datakey)), 
        React.createElement("td", null, event.datavalue), 
        React.createElement("td", null, Vo.get("enable_"+event.enable)), 
        React.createElement("td", null, event.description)
      ) 
    );
  }
}); 

var Basedatalist_EventsTable = React.createClass({displayName: "Basedatalist_EventsTable",
  render: function() {
	  var that=this;
    return (
    		React.createElement("div", null, 
      React.createElement(AMUIReact.Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "Key"), 
            React.createElement("th", null, "显示名"), 
            React.createElement("th", null, 
            "状态"
            ), 
            React.createElement("th", null, "描述")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Basedatalist_EventRow, {event: event}));
          })
        )
      ), 
      React.createElement("button", {type: "button", onClick: btn_click_basedatatypelist.bind(this, "add",{typeuuid:this.props.formdata.name}), className: "am-btn am-btn-primary"}, "添加")
      )
    );
  }
});
    

var Basedatatypelist_edit = React.createClass({displayName: "Basedatatypelist_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editBasedatatypelistForm').serializeJson());
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
    		  React.createElement("form", {id: "editBasedatatypelistForm", method: "post", className: "am-form"}, 
    			React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    			React.createElement("input", {type: "hidden", name: "typeuuid", value: o.typeuuid}), 
    		      React.createElement("label", null, "key[数字1-100]:"), 
    		      React.createElement("input", {type: "text", name: "datakey", value: o.datakey, onChange: this.handleChange, placeholder: "不超过15位,一般是数字,[0-100]"}), 
    		      React.createElement("br", null), 
    		       React.createElement("label", null, "显示名:"), 
    		      React.createElement("input", {type: "text", name: "datavalue", 	  value: o.datavalue, onChange: this.handleChange}), 
    		      React.createElement("label", {htmlFor: "description"}, "描述:"), 
    		      React.createElement("input", {type: "text", name: "description", value: o.description, onChange: this.handleChange}), 
    		      React.createElement("label", {htmlFor: "enable"}, "描述:"), 
    		      React.createElement("div", {className: "am-form-group"}, 
    		      
    		      React.createElement("select", {name: "enable", value: this.props.enable, onChange: this.handleChange}, 
    		      React.createElement("option", {value: "1"}, Vo.get("enable_1")), 
    		      React.createElement("option", {value: "0"}, Vo.get("enable_0"))
    		      )
    		    ), 
    			      
    		      
    		      React.createElement("button", {type: "button", onClick: ajax_basedatatypelist_save, className: "am-btn am-btn-primary"}, "提交")
    		    )

    	     )
    	   )
    	   
    	   )
    );
  }
}); 
//end basedatatypelist


//accounts
var Accounts_EventRow = React.createClass({displayName: "Accounts_EventRow", 
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  React.createElement("tr", {className: className}, 
  React.createElement("td", null, " ", Vo.get("AD_Accounts_type_"+event.type)), 
  React.createElement("td", null, event.title), 
  React.createElement("td", null, " ", event.num), 
    React.createElement("td", null, G_getDateYMD(event.accounts_time)), 
    React.createElement("td", null, " ", event.description), 
    React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 
    React.createElement("td", null, event.create_user), 
    React.createElement("td", null, event.create_time)
  ) 
);
}
}); 

var Accounts_EventsTable = React.createClass({displayName: "Accounts_EventsTable",
	handleClick: function(m) {
		if(m=="add"){
			btn_click_accounts(m,{groupuuid:$('#selectgroup_uuid' ).val()});
			 return;
		 }
	  },
	  handleChange_selectgroup_uuid: function(){
		  ajax_accounts_listByGroup($( '#selectgroup_uuid' ).val());
  },
render: function() {
return (
React.createElement("div", null, 
React.createElement("div", {className: "header"}, 
	  React.createElement("div", {className: "am-g"}, 
	    React.createElement("h1", null, "收支记录")
	  ), 
	  React.createElement("hr", null)
	), 
React.createElement(AMR_ButtonToolbar, null, 
	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add")}, "添加")
	  ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
	    React.createElement("select", {id: "selectgroup_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'lg'}", value: this.props.group_uuid, onChange: this.handleChange_selectgroup_uuid}, 
	    this.props.group_list.map(function(event) {
	        return (React.createElement("option", {value: event.uuid}, event.brand_name));
	      })
	    )
	  ), 
  React.createElement(AMR_Table, React.__spread({},  this.props), 
    React.createElement("thead", null, 
      React.createElement("tr", null, 
        React.createElement("th", null, "类型"), 
        React.createElement("th", null, "内容"), 
        React.createElement("th", null, "金额"), 
        React.createElement("th", null, "收费时间"), 
        React.createElement("th", null, "备注"), 
        React.createElement("th", null, "学校"), 
        React.createElement("th", null, "创建人"), 
        React.createElement("th", null, "创建时间")
      )
    ), 
    React.createElement("tbody", null, 
      this.props.events.map(function(event) {
        return (React.createElement(Accounts_EventRow, {key: event.id, event: event}));
      })
    )
  )
  )
);
}
});

var Accounts_edit = React.createClass({displayName: "Accounts_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editAccountsForm').serializeJson());
	  },
	 
render: function() {
	  var o = this.state;
return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		    React.createElement("h1", null, "添加收支记录")
		  ), 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		React.createElement("form", {id: "editAccountsForm", method: "post", className: "am-form"}, 
		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
		 React.createElement("div", {className: "am-form-group"}, 
	          React.createElement("select", {id: "groupuuid", name: "groupuuid", "data-am-selected": "{btnSize: 'lg'}", value: o.groupuuid, onChange: this.handleChange}, 
	          this.props.group_list.map(function(event) {
	              return (React.createElement("option", {value: event.uuid}, event.brand_name));
	            })
	          )
	        ), 
		React.createElement("label", {htmlFor: "type"}, "类型:"), 
		 React.createElement("div", {className: "am-form-group"}, 
		React.createElement("select", {id: "type", name: "type", "data-am-selected": "{btnSize: 'lg'}", value: o.type, onChange: this.handleChange}, 
		 this.props.type_list.map(function(event) {
             return (React.createElement("option", {value: event.key}, event.val));
           })
      )
      ), 
	      React.createElement("br", null), 
	    React.createElement("label", {htmlFor: "accounts_timeStr"}, "收支日期:"), 
	    React.createElement(AMUIReact.DateTimeInput, {format: "YYYY-MM-DD", name: "accounts_timeStr", id: "accounts_timeStr", dateTime: o.accounts_time, showTimePicker: false, onChange: this.handleChange}), 
	       React.createElement("label", {htmlFor: "title"}, "内容:"), 
	      React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, placeholder: "必填,不超过45位"}), 
	      React.createElement("br", null), 
	
	       React.createElement("label", {htmlFor: "num"}, "金额:"), 
	      React.createElement("input", {type: "number", name: "num", id: "num", value: o.num, onChange: this.handleChange, placeholder: "必填"}), 
	    React.createElement("label", {htmlFor: "description"}, "备注:"), 
	      React.createElement("input", {type: "text", name: "description", id: "description", value: o.description, onChange: this.handleChange, placeholder: "不超过100位"}), 
	      React.createElement("br", null), 
	      React.createElement("button", {type: "button", onClick: ajax_accounts_saveAndAdd, className: "am-btn am-btn-primary"}, "保存继续"), 
	      React.createElement("button", {type: "button", onClick: ajax_accounts_save, className: "am-btn am-btn-primary"}, "保存返回")
	     )

	     )
	   )
	   
	   )
);
}
}); 
//end accounts








































//userinfo
/*
 * 家长管理请求后绘制处理方法；
 * @逻辑：如果点击的不是添加按钮，则先检查是否勾选选框再处理其他判断；
 * @btn_click_userinfo：判断后程序跳转至d_service做各个按钮的处理; 
 * @调用LIS.events.map方法循环绘制老师数组； 
 * @</select>下拉多选框;
 * */
var Parent_EventsTable_div = React.createClass({displayName: "Parent_EventsTable_div",
	load_more_btn_id:"load_more_",
	pageNo:1,
	classnewsreply_list_div:"am-list-news-bd",
	componentWillReceiveProps:function(){
		this.load_more_data();
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
		var re_data=ajax_Parent_listByAllGroup_admin(this.classnewsreply_list_div+this.pageNo,$('#sutdent_name').val(),this.pageNo,callback);
		
	},
	refresh_data:function(){
//		classnewsreply_list_div 清除；
//      load_more_data	重新绘制DIV；
		this.forceUpdate();
		this.pageNo=1;
		$("#"+this.classnewsreply_list_div).html("");
		this.load_more_data();
		
	},
  render: function() {
	  this.load_more_btn_id="load_more_"+this.props.uuid;
    return (
    
	   React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 	
	    React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 		   
	     React.createElement(AMR_ButtonToolbar, null, 	   
			React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
		   React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "家长姓名"})		  
		  ), 			  
		   React.createElement("div", {className: "am-fl am-cf am-margin-bottom-sm am-margin-left-xs"}, 
			React.createElement("button", {type: "button", onClick: this.refresh_data.bind(this), className: "am-btn am-btn-primary"}, "搜索")
		     )				  
			  )
			 ), 
			 React.createElement("div", {id: "div_totalNumber"}, "总人数:0"
			  ), 	
	    React.createElement("div", {id: this.classnewsreply_list_div}
		  ), 		   	   		   
		   React.createElement("div", {className: "am-list-news-ft"}, 
		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
		   )		  
		  )	
    );
    
  }
});    

    var Parent_EventRow_admin = React.createClass({displayName: "Parent_EventRow_admin", 
		  render: function() {
			    var event = this.props.events;
			    var className = event.highlight ? 'am-active' :
		  event.disabled ? 'am-disabled' : '';
			    return (
			    		  React.createElement(AMR_Table, {bordered: true, className: "am-table-striped am-table-hover am-text-nowrap"}, 		   	
				          React.createElement("tr", null, 
				            React.createElement("th", null, "帐号"), 
				            React.createElement("th", null, "姓名"), 
				            React.createElement("th", null, "电话"), 
				            React.createElement("th", null, "状态"), 
				            React.createElement("th", null, "登录时间"), 
				            React.createElement("th", null, "创建时间")
				          ), 			 
			    			  this.props.events.map(function(event) {
			    			      return (
			    					      React.createElement("tr", {className: className}, 
			    				   	        React.createElement("td", null, event.loginname), 
			    				   	        React.createElement("td", null, event.name), 
			    				   	        React.createElement("td", null, event.tel), 
			    				   	        React.createElement("td", {className: "px_disable_"+event.disable}, Vo.get("disable_"+event.disable)), 
			    				   	        React.createElement("td", null, event.login_time), 
			    				   	        React.createElement("td", null, event.create_time), "                    ") 
			    			    		  )
			    			         })	
			    			  )		  
			    	  );
		}
  	});   
//userinfo end
  //——————————————————————————班级互动<绘制>——————————————————————————
    /* 
     * <班级互动>绘制舞台
     * @逻辑：绘制一个Div 每次点击加载更多按钮事把 新的一个Div添加到舞台上；
     * @我要发信息 加载更多等模板和按钮在此处添加上舞台 和DIV<信息>分离开；
     * @btn_click_announce:点击按钮事件跳转kd_servise方法;
     * */
    var Classnews_Div_list_byRight = React.createClass({displayName: "Classnews_Div_list_byRight", 
    	load_more_btn_id:"load_more_",
    	pageNo:1,
    	classnewsreply_list_div:"am-list-news-bd",
    	type:null,
    	//同一模版,被其他调用是,Props参数有变化,必须实现该方法.
    	  componentWillReceiveProps: function(nextProps) {
    		  this.type=nextProps.type;
    			this.load_more_data();
    		},
    	componentDidMount:function(){
    		this.load_more_data();
    	},
    	//逻辑：首先创建一个“<div>” 然后把div和 pageNo 
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
    			that.pageNo++;
    		}
    	ajax_classs_Mygoodlist_byRight(this.classnewsreply_list_div+this.pageNo,this.pageNo,this.type,callback);
    		

    	},
    	refresh_data:function(){
//    		classnewsreply_list_div 清除；
//          load_more_data	重新绘制DIV；
    		try{G_clear_pureview();}catch(e){};
    		$("#"+this.classnewsreply_list_div).html("");
    		this.forceUpdate();
    		this.pageNo=1;
    		this.load_more_data();
    		
    	},
    	selectclass_uuid_val:null,
    	handleClick: function(m,num) {
    		if(m=="add"){
    			btn_click_classnews_byRight(m,{classuuid:this.selectclass_uuid_val});
    			 return;
    		 }else{
    			 ajax_classnews_list_div_byRight(num); 		
    		 }
    	  },
    render: function() {
    	this.type=this.props.type;
    	this.load_more_btn_id="load_more_"+this.props.uuid;
      return (			
    		  React.createElement("div", {"data-am-widget": "list_news", className: "am-list-news am-list-news-default"}, 
    		  React.createElement(AMUIReact.ButtonToolbar, null, 
    		    React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.refresh_data.bind(this)}, "刷新"), 
    		    React.createElement(G_help_popo, {msg: G_tip.Classnews_admin})
    		    ), 
    		    React.createElement(Div_MyClassnewStatistics_byRight, null), 
    			React.createElement("hr", null), 	 
    		    
    		  React.createElement("div", {id: this.classnewsreply_list_div, className: "am-list-news-bd"}		   		    
    		  ), 
    		  
    		  React.createElement("div", {className: "am-list-news-ft"}, 
    		    React.createElement("a", {className: "am-list-news-more am-btn am-btn-default ", id: this.load_more_btn_id, onClick: this.load_more_data.bind(this)}, "查看更多 »")
    		  )
    		  
    		  
    		  
    		)
    		  
    			
      );
    }
    });
    //显示我的班级互动统计数据
    var Div_MyClassnewStatistics_byRight = React.createClass({displayName: "Div_MyClassnewStatistics_byRight", 
    	
    	getInitialState: function() {
    		var o={
    				disabled:true,
    				title:"加载中..."
    		}
    		return o;
    	  },
    	  
    	componentDidMount:function(){
    		this.ajax_list();
    	},
    	  ajax_callback:function(data){
    		  this.state.title=data.data;
    		  this.state.disabled=false;
    		  this.setState(this.state);
    	  },
    	 ajax_list:function(){
    		 var that=this;
    		  this.state.disabled=true;
    		  this.setState(this.state);
    		var url = hostUrl + "rest/classnews/getMyClassnewStatistics.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			dataType : "json",
    			success : function(data) {
    				if (data.ResMsg.status == "success") {
    					that.ajax_callback(data);
    				} else {
    					that.state.disabled=false;
    					that.setState(that.state);
    					G_resMsg_filter(data.ResMsg);
    				}
    			},
    			error : function(){
    				that.state.disabled=false;
    				that.setState(that.state);
    			}
    		});
    		
    	},
    	render: function() {
    		if(this.state.disabled)this.state.title="加载中...";
    		return (
    		 React.createElement(AMR_Button, {className: "am-margin-top-xs", amStyle: "success", amSize: "sm", block: true, disabled: this.state.disabled, onClick: this.ajax_list.bind(this)}, this.state.title)
    	);
    	}
    }); 
    /*
    * <班级互动>;
    * @Classnews_EventRow:绘制列表详情;
    * */
    var Classnews_EventsTable_byRight = React.createClass({displayName: "Classnews_EventsTable_byRight",	  
    render: function() {
    	var that=this;
    return (
    React.createElement("div", null, 
      this.props.events.data.map(function(event) {
        return (React.createElement(Classnews_show_byRight, {event: event}));
      })
    )
    );
    }
    });
    /*
    * <班级互动>MAp详情绘制
    * var o = this.props.formdata;
    */
    var Classnews_show_byRight = React.createClass({displayName: "Classnews_show_byRight", 
    	handleClick_pinglun:function(val){
    		  this.selectclass_uuid_val=val;
    		  ajax_classnews_list_byRight(this.selectclass_uuid_val);
    	  },	  
    	  componentDidMount:function(){
    		  $('.am-gallery').pureview();
    		},
    	render: function() {		  
    		  var  o = this.props.event;
    		  if(!o.dianzanList)o.dianzanList=[];
    		  if(!o.imgsList)o.imgsList=[];
    		  if(!o.create_img)G_def_headImgPath;
    		  
    	  return (
    			  React.createElement("div", null, 
    			  React.createElement("article", {className: "am-comment-secondary am-margin-xs"}, 
    			  React.createElement("a", {href: "javascript:void(0);"}, 
    			    React.createElement("img", {src: o.create_img, className: "am-comment-avatar", width: "48", height: "48"})
    			  ), 

    			  React.createElement("div", {className: "am-comment-main"}, 
    			    React.createElement("header", {className: "am-comment-hd"}, 
    			      React.createElement("div", {className: "am-comment-meta"}, 
    			        React.createElement("a", {href: "javascript:void(0);", className: "am-comment-author"}, Store.getClassNameByUuid(o.classuuid), "|", o.create_user, "|", Store.getGroupNameByUuid(o.groupuuid))
    			      )
    			    ), 
    			    React.createElement("div", {className: "am-comment-bd"}, 
    			    React.createElement("div", {dangerouslySetInnerHTML: {__html:o.content}}), 
    			    	React.createElement(Common_mg_big_fn, {imgsList: o.imgsList})
    			    ), 
    			    	React.createElement("footer", {className: "am-comment-footer"}, 
    			    	React.createElement("div", {className: "am-comment-actions"}, 
    			    	GTimeShow.showByTime(o.create_time), 
    			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
    			    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_reply_"+o.uuid, className: "am-icon-reply px_font_size_click"})), 
    			    	React.createElement("a", {href: "javascript:void(0);", onClick: common_check_illegal.bind(this,99,o.uuid)}, "举报"), 
    			    	React.createElement(G_check_disable_div_byRight, {type: 99, uuid: o.uuid})
    			    	)
    			    	), 
    			    	
    			    	React.createElement(Common_Dianzan_show_noAction, {dianzan: o.dianzan, uuid: o.uuid, type: 99, btn_dianzan: "btn_dianzan_"+o.uuid}), 
    			    	React.createElement("ul", {className: "am-comments-list"}, 
    					  React.createElement(Classnews_reply_list_byRight, {replyPage: o.replyPage, uuid: o.uuid, type: 99, btn_reply: "btn_reply_"+o.uuid})
    			    	)
    			     )
    			)
    			 
    			    )		   
    	  );
    	}
    	}); 




    /*
    * 1.1互动里面单独的评论模板
    * 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
    * 把评论模板插入空Div里面
    * 
    * */
    var Classnews_reply_list_byRight = React.createClass({displayName: "Classnews_reply_list_byRight", 
    	getInitialState: function() {
    		var o={
    			replyPage:null
    		}
    		if(this.props.replyPage) o.replyPage=this.props.replyPage;
    		return o;
    	  },
       componentWillReceiveProps: function(nextProps) {
    		var o={
    				replyPage:commons_ajax_dianzan_getByNewsuuid(nextProps.uuid)
    			}
    	   this.setState(o);
    	},
    	
    	load_more_btn_id:"load_more_",
    	pageNo:1,
    	classnewsreply_list_div:"classnewsreply_list_div",
    	
    	
    	componentDidMount:function(){
    		var that=this;
    		$("#"+this.props.btn_reply).bind("click",that.btn_reply_show.bind(that));
    		this.load_more_data();
    	},
    	loadByFirst:function(list_div){
    		React.render(React.createElement(Classnews_reply_list_listshow_byRight, {
    			events: this.state.replyPage,
    			newsuuid:this.props.uuid,
    			responsive: true, bordered: true, striped :true,hover:true,striped:true
    			}), document.getElementById(list_div));
    	},
    	load_more_data:function(){
    		$("#"+this.classnewsreply_list_div).append("<div id="+this.classnewsreply_list_div+this.pageNo+">加载中...</div>");
    		var re_data=this.state.replyPage;
    		if(re_data&& this.pageNo==1){
    			this.loadByFirst(this.classnewsreply_list_div+this.pageNo);   			
    		}else{
    			re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow_byRight);	
    		}
    		if(!re_data)return;
    		if(re_data.data.length<re_data.pageSize){
    			$("#"+this.load_more_btn_id).hide();
    		}else{
    			$("#"+this.load_more_btn_id).show();
    		}
    		  
    		  this.pageNo++;
    	},
    	
    	refreshReplyList:function(){
    		this.setState({replyPage:null});
    		$("#"+this.classnewsreply_list_div).html("");
    		this.pageNo=1;
    		this.load_more_data();
    		
    		$("#"+this.div_reply_save_id).html("");
    	},
    	btn_reply_show:function(){
    		React.render(React.createElement(Classnews_reply_save_byRight,
    				{uuid:this.props.uuid,
    			parentThis:this,
    			type:this.props.type
    			}), document.getElementById(this.div_reply_save_id));
    	},
    render: function() {
    	this.load_more_btn_id="load_more_"+this.props.uuid;
    	this.div_reply_save_id="btn_reply_save"+this.props.uuid;
    	this.classnewsreply_list_div="classnewsreply_list_div"+this.props.uuid;
    	var parentThis=this;
    return (
    		  
    		  React.createElement("div", {className: "am-comment-bd am-comment-flip"}, 
    		  React.createElement("div", {id: this.div_reply_save_id}, "   "), 
    		    React.createElement("div", {id: this.classnewsreply_list_div}), 
    		    React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多")		
    			
    			)	
    		   
    );
    }
    }); 
    /*
    * 1.2互动里面单独的评论模板-item
    * 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
    * 把评论模板插入空Div里面
    * 
    * */
    var Classnews_reply_list_listshow_byRight = React.createClass({displayName: "Classnews_reply_list_listshow_byRight", 	
    render: function() {
    return (
    		  React.createElement("div", null, 
    		  this.props.events.data.map(function(event) {
    		      return (
    		    		  React.createElement("li", {className: "am-cf"}, 
    		    		  React.createElement("span", {className: "am-comment-author am-fl"}, event.create_user+":"), 
    				        React.createElement("span", {className: "am-fl", dangerouslySetInnerHTML: {__html:event.content}}), React.createElement(G_check_disable_div_byRight, {type: 98, uuid: event.uuid})
    		    		  )
    		    		  )
    		  })
    		
    		    )		   
    );
    }
    }); 

    /*
    * 绘制评论模板
    * @componentDidMount:添加表情
    * */
    var Classnews_reply_save_byRight = React.createClass({displayName: "Classnews_reply_save_byRight", 
    	classnewsreply_list_div:"classnewsreply_list_div",
    	form_id:"editClassnewsreplyForm",
    	reply_save_btn_click:function(){
    		var that=this.props.parentThis;
    		common_ajax_reply_save(function(){
    			that.refreshReplyList();		
    		},this.form_id);
    	
    	},
    	componentDidMount:function(){
    		 $("#"+this.classnews_content).xheditor(xhEditor_upImgOption_emot);
    	},
    render: function() {
    	this.classnews_content="classnews_content_replay"+this.props.uuid;
    	this.form_id="editClassnewsreplyForm"+this.props.uuid;
    return (
    		   React.createElement("form", {id: this.form_id, method: "post", className: "am-form"}, 
    			React.createElement("input", {type: "hidden", name: "newsuuid", value: this.props.uuid}), 
    			React.createElement("input", {type: "hidden", name: "uuid"}), 
    			React.createElement("input", {type: "hidden", name: "type", value: this.props.type}), 						
    			React.createElement(AMR_Input, {id: this.classnews_content, type: "textarea", rows: "3", label: "我要回复", placeholder: "填写内容", name: "content"}), 
    			React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this), className: "am-btn am-btn-primary"}, "提交")		      
    		    )	   
    );
    }
    }); 

    /*
    * <班级互动>添加与编辑按钮中可删除图片显示.
    */
    var ClassNews_Img_canDel = React.createClass({displayName: "ClassNews_Img_canDel",
    		deleteImg:function(divid){
    			$("#"+divid).remove();
    		},			
    	  render: function() {
    		 return (
              		React.createElement("div", {className: "G_cookplan_Img"}, 
    	 	       			React.createElement("img", {className: "G_cookplan_Img_img", src: this.props.url, alt: "图片不存在"}), 
    	 	       			React.createElement("div", {className: "G_cookplan_Img_close", onClick: this.deleteImg.bind(this,this.props.parentDivId)}, React.createElement("img", {src: hostUrlCDN+"i/close.png", border: "0"}))
    	 	       		)		
              	)
    	  }
    	});


    /*
    * <班级互动>添加与编辑详情绘制;（公用方法和大图标班级互动）
    * @整个班级互动逻辑思维 首先要调用公用模板内的数组转换方法，把我们的数组转换成Selected需要的数据模型
    * 然后Selected的onChange自带value 直接可以传进handleChange_selectclass_uuid方法内 
    * 我们把值添加到 #editClassnewsForm 表单内 这样保存服务器请求就可以传最新的 classuuid了;
    * @ w_img_upload_nocut.bind_onchange 图片截取方法绘制在新的Div里面
    * @ajax_classnews_save_Right:提交按钮在Kd_service;
    * */
    var Classnews_edit_byRight = React.createClass({displayName: "Classnews_edit_byRight", 
    	selectclass_uuid_val:null,
    	 getInitialState: function() {
    		    return this.props.formdata;
    		  },
    	 handleChange: function(event) {
    		    this.setState($('#editClassnewsForm').serializeJson());
    	  },
    	  handleChange_selectclass_uuid:function(val){
//    		  this.selectclass_uuid_val=val;
//    		  this.props.formdata.classuuid=val
    			// $('#classuuid').val(val);
    			    this.setState($('#editClassnewsForm').serializeJson());
    	  },	  
    	  imgDivNum:0,
    	  getNewImgDiv:function(){
    		  this.imgDivNum++;
    		return "Classnews_edit_"+this.imgDivNum;  
    	  },	  
    	  addShowImg:function(url){
    		  var divid=this.getNewImgDiv();
    		  $("#show_imgList").append("<div id='"+divid+"'>加载中...</div>");		 	
    		  React.render(React.createElement(ClassNews_Img_canDel, {
    				url: url,parentDivId:divid
    				}), document.getElementById(divid));  
    	  },
    	  componentDidMount:function(){
    		 var editor=$('#classnews_content').xheditor(xhEditor_upImgOption_emot);
    		// w_img_upload_nocut.bind_onchange("#file_img_upload",function(imgurl){
    		 var that=this;		 
    		 //已经有的图片,显示出来.		 
    		  w_img_upload_nocut.bind_onchange("#file_img_upload",function(imgurl,uuid){
    			  ////data.data.uuid,data.imgUrl
    			 that.addShowImg(imgurl);
    			// $('#show_imgList').append('<img  width="198" height="198" src="'+imgurl+'"/>');			
    		  });		 
    		//已经有的图片,显示出来.
    		 if(!$('#imgs').val())return;
    		 var imgArr=$('#imgs').val().split(",");
    		 for(var i=0;i<imgArr.length;i++){
    			 this.addShowImg(imgArr[i]);
    		 }		
    	},
    render: function() {
    	  var o = this.state;
    	  if(this.props.mycalsslist.length>0){
    		 if(!o.classuuid) o.classuuid=this.props.mycalsslist[0].value;
    	  }
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 	      
    		  React.createElement("form", {id: "editClassnewsForm", method: "post", className: "am-form"}, 
    		  React.createElement(AMUIReact.Selected, {id: "selectclass_uuid", name: "classuuid", onChange: this.handleChange_selectclass_uuid, btnWidth: "300", data: this.props.mycalsslist, btnStyle: "primary", value: o.classuuid}), 	      
    			
    		  React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    			React.createElement("input", {type: "hidden", name: "imgs", id: "imgs", value: o.imgs}), 			
    		      React.createElement(AMR_Input, {id: "classnews_content", type: "textarea", rows: "3", label: "内容:", placeholder: "填写内容", name: "content", value: o.content, onChange: this.handleChange}), 
    		      React.createElement("div", {id: "show_imgList"}), React.createElement("br", null), 
    		      React.createElement("div", {className: "cls"}), 
    			  G_get_upload_img_Div(), 
    		      React.createElement("button", {type: "button", onClick: ajax_classnews_save_Right, className: "am-btn am-btn-primary"}, "提交")
    		    )
    	     )
    	   )
    	   
    	   )
    );
    }
    }); 
    //±±±±±±±±±±±±±±±±±±±±±±±±±±±
    
    
    
  //—————————————————————————帮助管理<绘制>—————————————————————  
    /*
    *(帮助管理)<幼儿园帮助文档><培训机构帮助文档>表单框绘制
    *@btn_click_announce_helpbyRight:点击按钮事件跳转kd_servise方法;
    * */  
    var Announcements_EventsTable_HelpbyRight = React.createClass({displayName: "Announcements_EventsTable_HelpbyRight",
    	getInitialState: function() {
    		var obj= {
    		    	groupuuid:this.props.groupuuid,
    		    	pageNo:this.props.pageNo,
    		    	type:this.props.type,
    		    	list: []
    		    };
    			
    		//obj=this.ajax_list(obj);
    	    return obj;
    	   
    	  },
    		componentDidMount: function() {
    			this.ajax_list(this.state); 
    		  },
    	  ajax_callback:function(list){
    		     if (list== null )list= [];
    		  this.state.list=list;
    		  this.setState(this.state);
    	  },
    	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
    	  componentWillReceiveProps: function(nextProps) {
    		  var obj= {
    			    	groupuuid:nextProps.groupuuid,
    			    	pageNo:nextProps.pageNo,
    			    	type:nextProps.type,
    			    	list: []
    			    };
    				
    			this.ajax_list(obj);
    		  //this.setState(obj);
    		},
    	 ajax_list:function(obj){
    		$.AMUI.progress.start();
    		var that=this;
    		var url = hostUrl + "rest/announcements/list.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data : {type:obj.type,pageNo:obj.pageNo},
    			dataType : "json",
    			//async: false,//必须同步执行
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    					obj.list=data.list.data;
    				    that.ajax_callback( data.list.data );     
    				} else {
    					alert(data.ResMsg.message);
    					G_resMsg_filter(data.ResMsg);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		return obj;
    		
    	},
    	pageClick: function(m) {
    		 var obj=this.state;
    		 if(m=="pre"){
    			
    			 if(obj.pageNo<2){
    				 G_msg_pop("第一页了");
    				 return;
    			 }
    			 obj.pageNo=obj.pageNo-1;
    			 this.ajax_list(obj);
    			 return;
    		 }else if(m=="next"){
    			 if(!obj.list||obj.list.length==0){
    				 G_msg_pop("最后一页了");
    				 return ;
    			 }
    			 obj.pageNo=obj.pageNo+1;
    			
    			 this.ajax_list(obj);
    			 return;
    		 }
    	},
    	handleClick: function(m,Titlename) {
    		btn_click_announce_helpbyRight(m,this.state.groupuuid,null);
    },
   
    render: function() {
    	var obj=this.state;
    	if(!this.state.list)this.state.list=[];
      return (
      React.createElement("div", null, 
    React.createElement(AMR_ButtonToolbar, null, 
    	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "pre")}, "上一页"), 
    	React.createElement(AMR_Button, {amStyle: "secondary", onClick: this.pageClick.bind(this, "next")}, "下一页"), 	
    	React.createElement("span", null, "第", obj.pageNo, "页"), 
    	React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this,"add")}, "创建")

      ), 
    React.createElement("hr", null), 
    React.createElement("div", {className: "am-form-group"}
      ), 	  
        React.createElement(AMR_Table, React.__spread({},  this.props), 
       React.createElement("thead", null, 
        React.createElement("tr", null, 
          React.createElement("th", null, "标题"), 
          React.createElement("th", null, "状态"), 
          React.createElement("th", null, "浏览次数"), 
          React.createElement("th", null, "创建时间"), 
          React.createElement("th", null, "创建人")
        )
      ), 
      React.createElement("tbody", null, 
        this.state.list.map(function(event) {
          return (React.createElement(Announcements_EventRow_byRight, {key: event.uuid, event: event}));
            })
          )
        )
        )
      );
    }
    });
      
    //帮助管理绘制详情内容Map;   
    var Announcements_EventRow_byRight = React.createClass({displayName: "Announcements_EventRow_byRight", 
    	render: function() {
    	  var event = this.props.event;
    	  var className = event.highlight ? 'am-active' :
    	    event.disabled ? 'am-disabled' : '';

    	  return (
    	    React.createElement("tr", {className: className}, 
    	      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: react_ajax_announce_help_byRight.bind(this,event.uuid,Vo.announce_type(event.type))}, event.title)), 
    	      React.createElement("th", null, Vo.get("announce_status_"+event.status)), 
    	      React.createElement("td", null, event.count), 
    	      React.createElement("td", null, event.create_time), 
    	      React.createElement("td", null, event.create_user)
    	    ) 
    	  );
    	}
    	});    
        

    /*
    * (帮助管理)<幼儿园帮助文档><培训机构帮助文档>创建与编辑界面绘制；
    * @w_img_upload_nocut:上传图片后发的请求刷新;
    * */    
    var Announcements_edit_helpbyRight = React.createClass({displayName: "Announcements_edit_helpbyRight", 
    	 getInitialState: function() {
    		    return this.props.formdata;
    		  },
    	 handleChange: function(event) {
    		    this.setState($('#editAnnouncementsForm').serializeJson());
    	  },
    	  componentDidMount:function(){
    	  var editor= $('#announce_message').xheditor(xhEditor_upImgOption_mfull);
            w_img_upload_nocut.bind_onchange("#file_img_upload" ,function(imgurl){
                  editor.pasteHTML( '<img   src="'+imgurl+'"/>')
            });
    	  },
    render: function() {
    	 var o = this.state;
    	  var type_div;
    	  if (announce_Helptypes==2) {
    		  type_div= 
    			   React.createElement("div", {className: "am-form-group", id: "div_classuuids"}, 
    		  		React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
    		  		React.createElement("label", {htmlFor: "tel"}, "班级通知:"), 
    		  		React.createElement("input", {type: "text", name: "classuuids", id: "classuuids", value: o.classuuids, onChange: this.handleChange, placeholder: "班级通知，才填写"})
    		     );
    	  } else {
    		  type_div =
    		  React.createElement("input", {type: "hidden", name: "type", value: o.type})
    	  }
    return (
    		React.createElement("div", null, 		
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  React.createElement("form", {id: "editAnnouncementsForm", method: "post", className: "am-form"}, 
    		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    		React.createElement("input", {type: "hidden", name: "isimportant", value: o.isimportant}), 		 
    		type_div, 
    		  React.createElement("label", {htmlFor: "name"}, "标题:"), 
    		  React.createElement("input", {type: "text", name: "title", id: "title", value: o.title, onChange: this.handleChange, maxlength: "45", placeholder: "不超过45位"}), 
    		  React.createElement("br", null), 
    		  React.createElement(AMR_Input, {id: "announce_message", type: "textarea", rows: "10", label: "内容:", placeholder: "填写内容", name: "message", value: o.message, onChange: this.handleChange}), 
    		G_get_upload_img_Div(), 
    		  React.createElement("button", {type: "button", onClick: ajax_announcements_save_helpbyRight, className: "am-btn am-btn-primary"}, "提交")
    		  )
    	     )
    	   )	   
    	  )
    );
    }
    }); 


    //
    /*
     *<帮助>点赞、添加、删除、禁用、评论、加载更多等详情绘制模板；
     *增加编辑与删除功能
     * */
    var Announcements_helpshow_byRight = React.createClass({displayName: "Announcements_helpshow_byRight", 
    	//创建帮助管理点击按钮事件跳转kd_servise方法;
     	handleClick: function(m,groupuuid,uuid) {
     		btn_click_announce_helpbyRight(m,groupuuid,uuid);
        }, 
    	//收藏按钮方法;
    	favorites_push: function(title,type,reluuid,url) {
    		commons_ajax_favorites_push(title,type,reluuid,url);
    	},
    render: function() {
    	  var o = this.props.data;

    return (
    	  React.createElement("div", null, 
           React.createElement("div", {className: "am-margin-left-sm"}, 
    	 
           React.createElement(AMUIReact.Article, {
    	    title: o.title, 
    	    meta: Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}, 
    		React.createElement("div", {dangerouslySetInnerHTML: {__html: o.message}})
    	      ), 		     
    	     React.createElement(AMR_ButtonToolbar, null, 
    	     React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "primary", onClick: this.handleClick.bind(this, "edit",o.groupuuid,o.uuid)}, "编辑"), 
    	     React.createElement(AMR_Button, {className: "G_Edit_show", amStyle: "danger", onClick: this.handleClick.bind(this, "del",o.groupuuid,o.uuid)}, "删除"), 
    	     React.createElement(AMR_Button, {amStyle: "success", onClick: this.favorites_push.bind(this,o.title,o.type,o.uuid)}, "收藏"), 
    	     React.createElement(G_check_disable_div_byRight, {type: o.type, uuid: o.uuid})
    	     )
    	     
    	     ), 
    	    	React.createElement("footer", {className: "am-comment-footer"}, 
    	    	React.createElement("div", {className: "am-comment-actions"}, 
    	    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
    	    	React.createElement("a", {href: "javascript:void(0);", onClick: common_check_illegal.bind(this,3,o.uuid)}, "举报")
    	    	)
    	    	), 
    	    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 0, btn_dianzan: "btn_dianzan_"+o.uuid}), 
    		  React.createElement(Common_reply_list, {uuid: o.uuid, type: 0})			 
    	   )
    );
    }
    }); 


    //±±±±±±±±±±±±±±±±±±±±±±±±±±±   
    
    
//—————————————————————————统计管理<绘制>—————————————————————      
/*
 * 统计管理图片加载
 * */
    var ECharts_Div_admin = React.createClass({displayName: "ECharts_Div_admin", 
    	 getInitialState: function() {
    		    return this.props;
    		  },
    	componentDidMount:function(){
    		var tmp_fn=function(){
    			 var o=$('#editEchartForm').serializeJson();
  		 PXECharts_ajax.ajax(o);
  	 };
  	 if(typeof(require)=="undefined"){
  		 var js="http://echarts.baidu.com/build/dist/echarts.js";
  		 loadJS(js,tmp_fn)
  	 }else{
  		 tmp_fn();
  	 }
  	
    },
    handleChange: function(event) {
  		 var o=$('#editEchartForm').serializeJson();
  		   this.setState(o);
  		 PXECharts_ajax.ajax(o);
  		//PXECharts.loading();
  	  },
    render: function() {
  	  var o = this.state;
      return (
      		React.createElement("div", null, 
      		 React.createElement("form", {id: "editEchartForm", method: "post", className: "am-form"}, 
      		 React.createElement("div", null, 
  	    		 React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
  	    		 React.createElement(AMUIReact.Selected, {inline: true, name: "type", value: o.type, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.statistics_type_list, btnStyle: "primary"})
  	    		 
  	    		 ), 
  				React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
  							    		 
  						 React.createElement(AMUIReact.Selected, {inline: true, name: "groupuuid", value: o.groupuuid, onChange: this.handleChange, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary"})
  	    		 ), 
  				 React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
  					    		 
  				 React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "begDateStr", id: "begDateStr", dateTime: o.begDateStr, onChange: this.handleChange})
  	    		 ), 
  				React.createElement("div", {className: "am-u-lg-3 am-u-md-6"}, 
  					 React.createElement(AMUIReact.DateTimeInput, {icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "endDateStr", id: "endDateStr", dateTime: o.endDateStr, onChange: this.handleChange})
  	    		 
  	    		 )
      		 
      		 ), 
      		 React.createElement("div", {className: "am-cf"})
      		 ), 
      		 
      		 React.createElement("div", {id: "main_ECharts", className: "ECharts"})
    	    		)

    	    );
    	  }
    	}); 
    //±±±±±±±±±±±±±±±±±±±±±±±±±±±  
    
    
    
    
  //——————————————————————————信息管理<绘制>—————————————————————  
    /*
    *(信息管理)<校园公告><老师公告><精品文章><招生计划>表单框绘制
    *@btn_click_announce_byRight:点击按钮事件跳转kd_servise方法;
    * */  
    var admin_EventsTable_wjkj = React.createClass({displayName: "admin_EventsTable_wjkj",
    	getInitialState: function() {
    		var obj= {
    				typelisg:this.props.typelisg,
    		    	pageNo:this.props.pageNo,
    		    	type:this.props.type,
    		    	list: []
    		    };
    	    return obj;
    	   
    	  },
    		componentDidMount: function() {
    			this.ajax_list(this.state); 
    		  },
    	  ajax_callback:function(list){
    		     if (list== null )list= [];
    		  this.state.list=list;
    		  this.setState(this.state);
    	  },
    	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
    	  componentWillReceiveProps: function(nextProps) {
    		  var obj= {
    			    	pageNo:nextProps.pageNo,
    			    	type:nextProps.type,
    			    	list: []
    			    };
    				
    			this.ajax_list(obj);
    		    this.setState(obj);
    		},
    	 ajax_list:function(obj){
    		 console.log("测试王璟昱啊我爱",$("input[name='enddate']").val());
    		$.AMUI.progress.start();
    		var that=this;
    		g_message_groupuuid=obj.groupuuid;
    		var url = hostUrl + "rest/announcements/listByWjkj.json";
    		$.ajax({
    			type : "GET",
    			url : url,
    			data : {type:obj.type,enddate:$("input[name='enddate']").val(),pageNo:obj.pageNo},
    			dataType : "json",
    			//async: false,//必须同步执行
    			success : function(data) {
    				$.AMUI.progress.done();
    				if (data.ResMsg.status == "success") {
    					obj.list=data.list.data;
    				    that.ajax_callback( data.list.data );     
    				} else {
    					alert(data.ResMsg.message);
    					G_resMsg_filter(data.ResMsg);
    				}
    			},
    			error : G_ajax_error_fn
    		});
    		return obj;
    		
    	},
    	pageClick: function(m) {
    		 var obj=this.state;
    		 if(m=="pre"){
    			
    			 if(obj.pageNo<2){
    				 G_msg_pop("第一页了");
    				 return;
    			 }
    			 obj.pageNo=obj.pageNo-1;
    			 this.ajax_list(obj);
    			 return;
    		 }else if(m=="next"){
    			 if(!obj.list||obj.list.length==0){
    				 G_msg_pop("最后一页了");
    				 return ;
    			 }
    			 obj.pageNo=obj.pageNo+1;
    			
    			 this.ajax_list(obj);
    			 return;
    		 }
    	},
    handleChange_selectgroup_uuid:function(val){
    	admin_announce_listByGroup_wjkj(val);
    },

    render: function() {
    	var obj=this.state;
    	if(!this.state.list)this.state.list=[];
      return (
      React.createElement("div", null, 
 
    	     React.createElement(AMR_Panel, null, 
    	     React.createElement(AMR_ButtonToolbar, null, 
    	        React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
    	  		React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid.bind(this), btnWidth: "200", data: obj.typelisg, btnStyle: "primary", value: obj.type})
				), 
				React.createElement("div", {className: "am-fl am-margin-left-sm am-margin-bottom-xs"}, 
    	  		React.createElement(AMUIReact.DateTimeInput, {showTimePicker: false, icon: "calendar", format: "YYYY-MM-DD", inline: true, name: "enddate", id: "enddate", dateTime: obj.enddate})
    			 )
    	  		)	
    	     ), 

    	  
        React.createElement(AMR_Table, React.__spread({},  this.props), 
       React.createElement("thead", null, 
        React.createElement("tr", null, 
          React.createElement("th", null, "标题"), 
          React.createElement("th", null, "状态"), 
          React.createElement("th", null, "浏览次数"), 
          React.createElement("th", null, "创建时间"), 
          React.createElement("th", null, "创建人")
        )
      ), 
      React.createElement("tbody", null, 
        this.state.list.map(function(event) {
          return (React.createElement(Announcements_EventRow_byRight, {key: event.uuid, event: event}));
            })
          )
        ), 
         React.createElement(AMR_ButtonToolbar, null, 
    	  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上一页"), 	  
           React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", obj.pageNo, "页"), 
    	  React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下一页")	
      )
        )
      );
    }
    });
      
    //信息管理绘制详情内容Map;   
    var Announcements_EventRow_byRight = React.createClass({displayName: "Announcements_EventRow_byRight", 
    	render: function() {
    	  var event = this.props.event;
    	  var className = event.highlight ? 'am-active' :
    	    event.disabled ? 'am-disabled' : '';
            var txtclasssName;
    		 if(event.status==0){
               txtclasssName="am-text-success";
    		  }else{
               txtclasssName="am-text-danger";
    		   }
    	  return (
    	    React.createElement("tr", {className: className}, 
    	      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: react_ajax_announce_show_byRight.bind(this,event.uuid)}, event.title)), 
    	      React.createElement("td", {className: txtclasssName}, Vo.get("announce_status_"+event.status)), 
    	      React.createElement("td", null, event.count), 
    	      React.createElement("td", null, event.create_time), 
    	      React.createElement("td", null, event.create_user)
    	    ) 
    	  );
    	}
    	});    
        
 


    //
    /*
     *<信息管理>公告点赞、添加、删除、禁用、评论、加载更多等详情绘制模板；
     *增加编辑与删除功能
     * */
    var Announcements_show_byRight = React.createClass({displayName: "Announcements_show_byRight", 
    render: function() {
    	  var o = this.props.data;

    	  var iframe=null;
    	     if(o.url){
    	       iframe=(React.createElement("iframe", {id: "t_iframe", onLoad: G_iFrameHeight.bind(this,'t_iframe'), frameborder: "0", scrolling: "auto", marginheight: "0", marginwidth: "0", width: "100%", height: "600px", src: o.url}))	   
    	        }else{
    	     iframe=(       
    			React.createElement(AMUIReact.Article, {
    			title: o.title, 
    			meta: Vo.announce_type(o.type)+" | "+Store.getGroupNameByUuid(o.groupuuid)+" | "+o.create_time+ "|阅读"+ this.props.count+"次"}, 
    			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.message}})
    			))
    	     }
    return (
    	  React.createElement("div", null, 
           React.createElement("div", {className: "am-margin-left-sm"}, 	 

              iframe, 

   
   	     React.createElement(G_check_disable_div_byRight, {type: o.type, uuid: o.uuid})

    	     
    	     ), 
    	    	React.createElement("footer", {className: "am-comment-footer"}, 
    	    	React.createElement("div", {className: "am-comment-actions"}, 
    	    	React.createElement("a", {href: "javascript:void(0);"}, React.createElement("i", {id: "btn_dianzan_"+o.uuid, className: "am-icon-thumbs-up px_font_size_click"})), 
    	    	React.createElement("a", {href: "javascript:void(0);", onClick: common_check_illegal.bind(this,3,o.uuid)}, "举报")
    	    	)
    	    	), 
    	    	React.createElement(Common_Dianzan_show_noAction, {uuid: o.uuid, type: 0, btn_dianzan: "btn_dianzan_"+o.uuid}), 
    		  React.createElement(Common_reply_list, {uuid: o.uuid, type: 0})			 
    	   )
    );
    }
    }); 


    //±±±±±±±±±±±±±±±±±±±±±±±±±±±


    
    
    
    
  //—————————————————————————— 查询校务管理 <绘制>—————————————————————   
    /*
     *查询校务管理 <绘制>;
     * */
    var Group_EventsTable_wjkj_byRight = React.createClass({displayName: "Group_EventsTable_wjkj_byRight",
  		handleClick: function(m) {
  			if(m=="pre"){
  				ajax_group_myList_wjkj(g_group_list_type,--g_group_list_point);
  				return;
  			 }else if(m=="next"){
  				ajax_group_myList_wjkj(g_group_list_type,++g_group_list_point);
  				 return;
  			 }
  		},
  		maxPageNo:0,
  render: function() {
  	var pre_disabled=g_group_list_point<2;  	
  	if(g_group_list_point==1){
  		this.maxPageNo=Math.floor(this.props.data.list.totalCount/this.props.data.list.pageSize)+1;
  	}
  	var next_disabled=g_group_list_point>=this.maxPageNo;
      return (
  		  
        React.createElement("div", null, 
  	      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
          React.createElement(AMR_Panel, null, 
         React.createElement(AMR_ButtonToolbar, null, 
        React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
       React.createElement(AMR_Button, {amStyle: "secondary", disabled: pre_disabled, onClick: this.handleClick.bind(this,"pre")}, "« 上一页"), 
      React.createElement("label", null, g_group_list_point, "\\", this.maxPageNo), 
     React.createElement(AMR_Button, {amStyle: "secondary", disabled: next_disabled, onClick: this.handleClick.bind(this,"next")}, "下一页 »")
    )

  	
  	)
    )
  	 ), 
        React.createElement(AMR_Table, React.__spread({},  this.props), 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
            React.createElement("th", null, "品牌名"), 
            React.createElement("th", null, "预览"), 
            React.createElement("th", null, "机构全称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "学校地址"), 
            React.createElement("th", null, "创建时间")
            )
          ), 
          React.createElement("tbody", null, 
            this.props.events.map(function(event) {
              return (React.createElement(Query_EventRow_wjkj, {key: event.id, event: event}));
            })
          )
        )
        )
      );
    }
  });
      
  /*  	
   * 查询校务管理 <绘制>绘制详细内容;
   * */
  var Query_EventRow_wjkj = React.createClass({displayName: "Query_EventRow_wjkj", 
  	  render: function() {
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';
  	    return (
  	      React.createElement("tr", {className: className}, 
          React.createElement("td", null, event.brand_name), 
          React.createElement("td", null, 
     	React.createElement(AMR_Button, {amStyle: "secondary", onClick: ajax_group_edit_byRight_wjkj.bind(this,event)}, "预览")
         ), 
         React.createElement("td", null, event.company_name), 
         React.createElement("td", null, " ", event.link_tel), 
         React.createElement("td", null, event.address), 
         React.createElement("td", null, event.create_time)
  	      ) 
  	    );
  	  }
  	});     
    
  /*
   *(校务管理)<预览按钮>绘制 ;
   * */
    var Group_show_byRight_wjkj = React.createClass({displayName: "Group_show_byRight_wjkj", 
    render: function() {
    	  var o = this.props.formdata;
      return (
    		  React.createElement(AMUIReact.Article, {
    		    title: o.brand_name, 
    		    meta: o.company_name+" | "+o.link_tel+" | "+o.address+" | 阅读"+this.props.count+"次"}, 
    			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.description}})
    		   )	    		     		   
      );
    }
    });    
    
    //±±±±±±±±±±±±±±±±±±±±±±±±±±±  
    
    
    
    
 
    
    
    
//—————————————————————————— 查询所有老师<绘制>—————————————————————   
    /*
     *查询所有老师<绘制>;
     * */
    var ajax_uesrinfo_listBy_wjkj = React.createClass({displayName: "ajax_uesrinfo_listBy_wjkj",
  		handleClick: function(m) {
  			if(m=="pre"){
  				ajax_group_myList_wjkj(--g_user_list_point);
  				return;
  			 }else if(m=="next"){
  				ajax_group_myList_wjkj(++g_user_list_point);
  				 return;
  			 }
  		},
  		maxPageNo:0,
  render: function() {
  	var pre_disabled=g_user_list_point<2;  	
  	if(g_user_list_point==1){
  		this.maxPageNo=Math.floor(this.props.data.list.totalCount/this.props.data.list.pageSize)+1;
  	}
  	var next_disabled=g_user_list_point>=this.maxPageNo;
      return (
  		  
        React.createElement("div", null, 
  	      React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form", action: "javascript:void(0);"}, 
          React.createElement(AMR_Panel, null, 
         React.createElement(AMR_ButtonToolbar, null, 
        React.createElement("div", {className: "am-fl am-margin-bottom-sm am-margin-left-xs"}, 
       React.createElement(AMR_Button, {amStyle: "secondary", disabled: pre_disabled, onClick: this.handleClick.bind(this,"pre")}, "« 上一页"), 
      React.createElement("label", null, g_user_list_point, "\\", this.maxPageNo), 
     React.createElement(AMR_Button, {amStyle: "secondary", disabled: next_disabled, onClick: this.handleClick.bind(this,"next")}, "下一页 »")
    )

  	
  	)
    )
  	 ), 
        React.createElement(AMR_Table, React.__spread({},  this.props), 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
            React.createElement("th", null, "姓名"), 
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
              return (React.createElement(Query_User_wjkj, {key: event.id, event: event}));
            })
          )
        )
        )
      );
    }
  });
      
  /*  	
   * 查询所有老师<绘制>;绘制详细内容;
   * */
  var Query_User_wjkj = React.createClass({displayName: "Query_User_wjkj", 
  	  render: function() {
  	    var event = this.props.event;
  	    var className = event.highlight ? 'am-active' :
  	      event.disabled ? 'am-disabled' : '';
  	    return (
  	      React.createElement("tr", {className: className}, 
 	        React.createElement("td", null, event.name), 
   	        React.createElement("td", null, " ", event.tel), 
   	        React.createElement("td", null, event.email), 
   	        React.createElement("td", null, event.sex=="0"?"男":"女"), 
   	        React.createElement("td", {className: "px_disable_"+event.disable}, Vo.get("disable_"+event.disable)), 
   	        React.createElement("td", null, event.login_time), 
   	        React.createElement("td", null, event.create_time)
  	      ) 
  	    );
  	  }
  	});     
    
    
//——————————————————————————话题审核<绘制>—————————————————————  
  /*
  *(话题审核)表单框绘制
  * */  
  var Admin_SnsTable_byRight = React.createClass({displayName: "Admin_SnsTable_byRight",
  	getInitialState: function() {
  		var obj= {
  		    	pageNo:this.props.pageNo,
  		    	list: []
  		    };
  	    return obj;
  	   
  	  },
  		componentDidMount: function() {
  			this.ajax_list(this.state); 
  		  },
  	  ajax_callback:function(list){
  		     if (list== null )list= [];
  		  this.state.list=list;
  		  this.setState(this.state);
  	  },
  	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
  	  componentWillReceiveProps: function(nextProps) {
  		  var obj= {
  			    	pageNo:nextProps.pageNo,
  			    	list: []
  			    };
  				
  			this.ajax_list(obj);
  		  //this.setState(obj);
  		},
  	 ajax_list:function(obj){
  		$.AMUI.progress.start();
  		var that=this;
  		var url = hostUrl + "rest/snsTopic/listPageForCheck.json";
  		$.ajax({
  			type : "GET",
  			url : url,
  			data :{pageNo:obj.pageNo},
  			dataType : "json",
  			//async: false,//必须同步执行
  			success : function(data) {
  				$.AMUI.progress.done();
  				if (data.ResMsg.status == "success") {
  					obj.list=data.list.data;
  					obj.pageSize=data.list.pageSize;
  				    that.ajax_callback( data.list.data );     
  				} else {
  					alert(data.ResMsg.message);
  					G_resMsg_filter(data.ResMsg);
  				}
  			},
  			error : G_ajax_error_fn
  		});
  		return obj;
  		
  	},
  	pageClick: function(m) {
  		 var obj=this.state;
  		 if(m=="pre"){
  			
  			 if(obj.pageNo<2){
  				 G_msg_pop("第一页了");
  				 return;
  			 }
  			 obj.pageNo=obj.pageNo-1;
  			 this.ajax_list(obj);
  			 return;
  		 }else if(m=="next"){
  			 if(!obj.list||obj.list.length<obj.pageSize){
  				 G_msg_pop("最后一页了");
  				 return ;
  			 }
  			 obj.pageNo=obj.pageNo+1;
  			
  			 this.ajax_list(obj);
  			 return;
  		 }
  	},
  	handleClick: function(m,Titlename) {
  		btn_click_announce_byRight(m,this.state.groupuuid,null);
  },
  handleChange_selectgroup_uuid:function(val){
  	 var obj=this.state;
  	 obj.groupuuid=val;
  	 this.ajax_list(obj);
  },

  render: function() {
  	var obj=this.state;
  	if(!this.state.list)this.state.list=[];
    return (
    React.createElement("div", null, 
       React.createElement(AMR_Panel, null, 
      React.createElement(AMR_ButtonToolbar, null, 
  	React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上一页"), 
  	  React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", obj.pageNo, "页"), 
  	React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下一页")	
    )
     ), 
      React.createElement(AMR_Table, React.__spread({},  this.props), 
     React.createElement("thead", null, 
      React.createElement("tr", null, 
        React.createElement("th", null, "标题"), 
        React.createElement("th", null, "创建人"), 
        React.createElement("th", null, "状态"), 
        React.createElement("th", null, "举报次数"), 
        React.createElement("th", null, "创建时间"), 
        React.createElement("th", null, "最后举报时间")
      )
    ), 
    React.createElement("tbody", null, 
      this.state.list.map(function(event) {
        return (React.createElement(Sns_EventRow_byRight, {key: event.uuid, event: event}));
          })
        )
      )
      )
    );
  }
  });
    
  //话题审核绘制详情内容Map;   
  var Sns_EventRow_byRight = React.createClass({displayName: "Sns_EventRow_byRight", 
  	render: function() {
  	  var event = this.props.event;
  	  var className = event.highlight ? 'am-active' :
  	    event.disabled ? 'am-disabled' : '';
          var txtclasssName;
  		 if(event.status==0){
             txtclasssName="am-text-success";
  		  }else{
             txtclasssName="am-text-danger";
  		   }
  	  return (
  	    React.createElement("tr", {className: className}, 
  	      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: admin_snsTopic_show_byRight.bind(this,event.uuid,true)}, event.title)), 
  	      React.createElement("td", null, event.create_user), 
  	      React.createElement("td", {className: txtclasssName}, Vo.get("announce_status_"+event.status)), 
  	      React.createElement("td", null, event.illegal), 
  	      React.createElement("td", null, event.create_time), 
  	      React.createElement("td", null, event.illegal_time)
  	      
  	    ) 
  	  );
  	}
  	});    
  /*
   *<话题审核>详情绘制模板；
   * */
  var Sns_snsTopic_show_byRight = React.createClass({displayName: "Sns_snsTopic_show_byRight", 
  render: function() {
  	  var o = this.props.data;
        var iframe=(React.createElement("div", null));
        var check=(React.createElement("div", null));
        if(this.props.pingbiType==true){
        	check=(React.createElement("div", null, 	     
        	React.createElement(AMR_ButtonToolbar, null, 
      	     React.createElement(Sns_check_disable_div_byRight, {type: 71, uuid: o.uuid})
      	     )
      	     ));
        }
  	     if(o.url){
  	       iframe=(React.createElement("iframe", {id: "t_iframe", onLoad: G_iFrameHeight.bind(this,'t_iframe'), frameborder: "0", scrolling: "auto", marginheight: "0", marginwidth: "0", width: "100%", height: "600px", src: o.url}))	   
  	        }else{
  	     iframe=(       
  			React.createElement(AMUIReact.Article, {
  			title: o.title, 
  			meta: o.create_user+" | "+o.create_time+" | 浏览次数:"+o.click_count+" | 举报次数:"+o.illegal}, 
  			React.createElement("div", {dangerouslySetInnerHTML: {__html: o.content}})
  			))
  	     }
  return (
  	  React.createElement("div", null, 
         React.createElement("div", {className: "am-margin-left-sm"}, 

           iframe, 
           check

  	     
  	     )	 
  	   )
  );
  }
  }); 

  //±±±±±±±±±±±±±±±±±±±±±±±±±±±  
  
  
  
  
  
  
  
  
  
  
//——————————————————————————话题评论审核<绘制>—————————————————————  
  /*
  *(话题评论审核)表单框绘制
  * */  
  var Admin_snsReplyTable_byRight = React.createClass({displayName: "Admin_snsReplyTable_byRight",
  	getInitialState: function() {
  		var obj= {
  		    	pageNo:this.props.pageNo,
  		    	list: []
  		    };
  	    return obj;
  	   
  	  },
  		componentDidMount: function() {
  			this.ajax_list(this.state); 
  		  },
  	  ajax_callback:function(list){
  		     if (list== null )list= [];
  		  this.state.list=list;
  		  this.setState(this.state);
  	  },
  	  //同一模版,被其他调用是,Props参数有变化,必须实现该方法.
  	  componentWillReceiveProps: function(nextProps) {
  		  var obj= {
  			    	pageNo:nextProps.pageNo,
  			    	list: []
  			    };
  				
  			this.ajax_list(obj);
  		  //this.setState(obj);
  		},
  	 ajax_list:function(obj){
  		$.AMUI.progress.start();
  		var that=this;
  		var url = hostUrl + "rest/snsReply/listPageForCheck.json";
  		$.ajax({
  			type : "GET",
  			url : url,
  			data :{pageNo:obj.pageNo},
  			dataType : "json",
  			//async: false,//必须同步执行
  			success : function(data) {
  				$.AMUI.progress.done();
  				if (data.ResMsg.status == "success") {
  					obj.list=data.list.data;
  					obj.pageSize=data.list.pageSize;
  				    that.ajax_callback( data.list.data );     
  				} else {
  					alert(data.ResMsg.message);
  					G_resMsg_filter(data.ResMsg);
  				}
  			},
  			error : G_ajax_error_fn
  		});
  		return obj;
  		
  	},
  	pageClick: function(m) {
  		 var obj=this.state;
  		 if(m=="pre"){
  			
  			 if(obj.pageNo<2){
  				 G_msg_pop("第一页了");
  				 return;
  			 }
  			 obj.pageNo=obj.pageNo-1;
  			 this.ajax_list(obj);
  			 return;
  		 }else if(m=="next"){
  			 if(!obj.list||obj.list.length<obj.pageSize){
  				 G_msg_pop("最后一页了");
  				 return ;
  			 }
  			 obj.pageNo=obj.pageNo+1;
  			
  			 this.ajax_list(obj);
  			 return;
  		 }
  	},
  	handleClick: function(m,Titlename) {
  		btn_click_announce_byRight(m,this.state.groupuuid,null);
  },
  handleChange_selectgroup_uuid:function(val){
  	 var obj=this.state;
  	 obj.groupuuid=val;
  	 this.ajax_list(obj);
  },

  render: function() {
  	var obj=this.state;
  	if(!this.state.list)this.state.list=[];
    return (
    React.createElement("div", null, 
       React.createElement(AMR_Panel, null, 
      React.createElement(AMR_ButtonToolbar, null, 
  	React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "pre")}, "上一页"), 
  	  React.createElement(AMR_Button, {amStyle: "default", disabled: "false"}, "第", obj.pageNo, "页"), 
  	React.createElement(AMR_Button, {amStyle: "default", onClick: this.pageClick.bind(this, "next")}, "下一页")	
    )
     ), 
      React.createElement(AMR_Table, React.__spread({},  this.props), 
     React.createElement("thead", null, 
      React.createElement("tr", null, 
        React.createElement("th", null, "评论内容"), 
        React.createElement("th", null, "查看相关话题"), 
        React.createElement("th", null, "点赞次数"), 
        React.createElement("th", null, "回复次数"), 
        React.createElement("th", null, "创建人"), 
        React.createElement("th", null, "操作"), 
        React.createElement("th", null, "状态"), 
        React.createElement("th", null, "举报次数"), 
        React.createElement("th", null, "创建时间"), 
        React.createElement("th", null, "最后举报时间")
      )
    ), 
    React.createElement("tbody", null, 
      this.state.list.map(function(event) {
        return (React.createElement(SnsReply_EventRow_byRight, {key: event.uuid, event: event}));
          })
        )
      )
      )
    );
  }
  });
    
  //话题评论审核绘制详情内容Map;   
  var SnsReply_EventRow_byRight = React.createClass({displayName: "SnsReply_EventRow_byRight", 
  	render: function() {
  	  var event = this.props.event;
  	  var className = event.highlight ? 'am-active' :
  	    event.disabled ? 'am-disabled' : '';
          var txtclasssName;
  		 if(event.status==0){
             txtclasssName="am-text-success";
  		  }else{
             txtclasssName="am-text-danger";
  		   }
  	  return (
  	    React.createElement("tr", {className: className}, 
  	      React.createElement("td", null, React.createElement("div", {dangerouslySetInnerHTML: {__html: event.content}})), 
  	      React.createElement("td", null, React.createElement("a", {href: "javascript:void(0);", onClick: admin_snsTopic_show_byRight.bind(this,event.topic_uuid,false)}, "查看相关话题")), 

  	      React.createElement("td", null, event.yes_count), 
  	      React.createElement("td", null, event.reply_count), 
  	      React.createElement("td", null, event.create_user), 
  	      React.createElement("td", null, React.createElement(Sns_check_disable_div_byRight, {type: 72, uuid: event.uuid})), 
  	      React.createElement("td", {className: txtclasssName}, Vo.get("announce_status_"+event.status)), 
  	      React.createElement("td", null, event.illegal), 
  	      React.createElement("td", null, event.create_time), 
  	      React.createElement("td", null, event.illegal_time)
  	    ) 
  	  );
  	}
  	});    

  //±±±±±±±±±±±±±±±±±±±±±±±±±±±    
  
  
  /**
   * 全局模版-没有内容时显示
   * <G_check_disable_div_byRight type={o.type} uuid={o.uuid}/>
   */
  var Sns_check_disable_div_byRight = React.createClass({displayName: "Sns_check_disable_div_byRight",
  	  render: function() {
  			var right="AD_checkSns_m";
  			console.log("屏蔽权限:",right);
  		  if(G_user_hasRight(right)){
  			  return (
  					  React.createElement("button", {className: "am-margin-left-lg am-btn-sm am-btn-danger ", onClick: common_sns_check_disable.bind(this,this.props.type,this.props.uuid)}, "屏蔽")
  			    );
  		  }else{
  			  return (
  			    		React.createElement("div", null)
  			    );
  		  }
  			 
  		  if(this.props.msg)msg=this.props.msg;
  	    return (
  	    		React.createElement("div", null, React.createElement("h1", null, msg))
  	    );
  	  }
  	  }); 