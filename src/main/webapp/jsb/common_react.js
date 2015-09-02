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
 * <G_check_disable_div_byRight />
 */
var G_check_disable_div_byRight = React.createClass({displayName: "G_check_disable_div_byRight", 
	  render: function() {
		  if(G_user_hasRight("KD_announce_m")){
			  return (
					  React.createElement(AMR_Button, {amStyle: "danger", onClick: common_check_disable.bind(this,this.props.type,this.props.uuid), round: true}, "屏蔽")
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

var G_get_upload_img_Div=function(){
	var G_upload_img_Div=React.createElement(AMR_Input, {type: "file", label: "上传图片", id: "file_img_upload", help: "选择图片", accept: "image/*", capture: "camera"})
	if(G_CallPhoneFN.isPhoneApp()){
		G_upload_img_Div=React.createElement(AMR_Button, {amStyle: "primary", id: "file_img_upload", round: true}, "上传图片")
	}
	return G_upload_img_Div;
}
//<G_help_popo title={title} msg={msg} />
var G_help_popo = React.createClass({displayName: "G_help_popo", 
	  render: function() {
		  var title=G_tip.help;
		  var msg="帮助内容";
		  if(this.props.msg)msg=this.props.msg;
		  if(this.props.title)title=this.props.title;
	    return (
	    		 React.createElement(AMUIReact.PopoverTrigger, {
	 		    trigger: "click", // 设置触发方式
	 		    amStyle: "warning", // 设置 popover 样式
	 		    amSize: "sm", // 设置 popover 大小
	 		    placement: "top", 
	 		    popover: React.createElement(AMUIReact.Popover, null, msg)}, 
	 		    React.createElement(AMUIReact.Button, {amStyle: "primary"}, title)
	 		  )
	    );
	  }
	  }); 




/**
 * 全局模版-没有内容时显示
 */
var G_NoData_div = React.createClass({displayName: "G_NoData_div", 
	  render: function() {
		  var msg="没有数据";
		  if(this.props.msg)msg=this.props.msg;
	    return (
	    		React.createElement("div", null, React.createElement("h1", null, msg))
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
var G_Role_User_EventsTable = React.createClass({displayName: "G_Role_User_EventsTable",
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
		return (React.createElement(G_NoData_div, null))
	}
	var that=this;
  return (
  React.createElement("div", null, 
  
  React.createElement("div", {className: "am-cf am-margin-top-sm"}, 
  React.createElement(AMUIReact.Selected, {className: "am-fl", id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.state.groupuuid}), 
  React.createElement(G_help_popo, {msg: G_tip.role_grant_users})
  ), 
    React.createElement(AMUIReact.Table, React.__spread({},  this.props), 
      React.createElement("thead", null, 
        React.createElement("tr", null, 
          React.createElement("th", null, "角色"), 
          React.createElement("th", null, "操作"), 
          React.createElement("th", null, "授权用户"), 
          React.createElement("th", null, "角色描述")
        )
      ), 
      React.createElement("tbody", null, 
        this.state.role_list.map(function(event) {
          return (React.createElement(G_Role_User_EventsTable_EventRow, {event: event, groupuuid: that.state.groupuuid, userList: that.state.list}));
        })
      )
    )
    )
  );
}
});
//role
  var G_Role_User_EventsTable_EventRow = React.createClass({displayName: "G_Role_User_EventsTable_EventRow", 
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
      React.createElement("tr", {className: className}, 
        React.createElement("td", null, event.name), 
        React.createElement("td", null, React.createElement(AMUIReact.Button, {amStyle: "primary", onClick: this.handleClick.bind(this, event.uuid,this.state.groupuuid,useruuids), round: true}, "授权")), 
        React.createElement("td", null, users), 
        React.createElement("td", null, event.description, " ")
      ) 
    );
  }
  }); 
  
//userinfo
var Userinfo_EventRow = React.createClass({displayName: "Userinfo_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

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
        React.createElement("td", null, event.create_time)
      ) 
    );
  }
}); 
//——————————————————————————老师管理——————————————————————————
/*
 * 老师管理服务器请求后绘制处理方法；
 * @逻辑：如果点击的不是添加按钮，则先检查是否勾选选框再处理其他判断；
 * @btn_click_userinfo：判断后程序跳转至d_service做各个按钮的处理; 
 * @调用LIS.events.map方法循环绘制老师数组； 
 * @</select>下拉多选框;
 * */
var Userinfo_EventsTable = React.createClass({displayName: "Userinfo_EventsTable",
	handleClick: function(m) {
		
		 if(m=="add"){
			 btn_click_userinfo(m,{group_uuid:this.props.group_uuid,office:"老师"},this.props.events.sex);
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
			  alert("请勾选复选框！");
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
  render: function() {
    return (
    React.createElement("div", null, 
    React.createElement("div", {className: "header"}, 
    React.createElement("hr", null)
    ), 
    
React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
    
    React.createElement(AMR_ButtonToolbar, {className: "am-cf am-margin-left-xs"}, 
 	 React.createElement("div", {className: "am-fl"}, 
	    React.createElement(AMR_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add"), round: true}, "添加")
	    ), 
	    React.createElement("div", {className: "am-fl am-margin-left-xs"}, 
	    React.createElement(AMR_Button, {amStyle: "revise", onClick: this.handleClick.bind(this, "edit"), round: true}, "修改")
	    ), 
	    React.createElement("div", {className: "am-fl am-margin-left-xs"}, 
		  React.createElement("button", {type: "button", onClick: this.handleChange_selectgroup_uuid, className: "am-btn am-btn-primary"}, "搜索")
		  ), 
		  React.createElement("div", {className: "am-fl am-margin-left-xs"}, 
		  React.createElement("input", {type: "text", name: "sutdent_name", id: "sutdent_name", placeholder: "教师姓名"})	  
		  )
		  )
		  ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
	  React.createElement(AMUIReact.Selected, {id: "selectgroup_uuid", name: "group_uuid", onChange: this.handleChange_selectgroup_uuid, btnWidth: "200", multiple: false, data: this.props.group_list, btnStyle: "primary", value: this.props.group_uuid})
  
	  
    ), 
	  
      React.createElement(AMR_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
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
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Userinfo_EventRow, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});
/*
* 老师管理Button事件(添加和修改按钮绘制与标签事件处理)；
* @formdata:选中的老师对象；
* @m：是启用还是禁用功能；"add"-添加  "edit"-修改；
* */    
var Userinfo_edit = React.createClass({displayName: "Userinfo_edit", 
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
  render: function() {
	  var o = this.state;
	  var passwordDiv=null;
	  var one_classDiv="am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
	  var two_classDiv="am-u-lg-10 am-u-md-10 am-u-sm-8";
	  if(!o.uuid){
		  o.password="123456";
		  o.password1="123456";
		  passwordDiv=(
				  React.createElement("div", null, 
			       React.createElement("div", null, "(默认密码：123456)"), 
				    React.createElement("label", {className: one_classDiv}, "密码:"), 
				   React.createElement("div", {className: two_classDiv}, 
    		      React.createElement(PxInput, {icon: "lock", type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange})
    		     ), 		      
    		      React.createElement("label", {className: one_classDiv}, "重复密码:"), 
    		       React.createElement("div", {className: two_classDiv}, 
    		        React.createElement(PxInput, {icon: "lock", type: "password", name: "password1", id: "password1", value: o.password1, onChange: this.handleChange})
    		         )
				      )
				  );
	  }
    return (
  		  React.createElement("form", {id: "editUserinfoForm", method: "post", className: "am-form"}, 
		   React.createElement(AMUIReact.Selected, {name: "group_uuid", onChange: this.handleChange_Selected, btnWidth: "300", multiple: true, data: this.props.select_group_list, btnStyle: "primary", value: o.group_uuid}), 
		    React.createElement(PxInput, {type: "hidden", name: "uuid", value: o.uuid}), 
		     React.createElement(PxInput, {type: "hidden", name: "type", value: "1"}), 
			   React.createElement("div", {className: "am-form-group"}, 
			    React.createElement("hr", null), 
		       React.createElement("label", {className: one_classDiv}, "手机号码:"), 
		      React.createElement("div", {className: two_classDiv}, 
		     React.createElement(PxInput, {icon: "mobile", type: "text", name: "tel", id: "tel", value: o.tel, onChange: this.handleChange, placeholder: ""})
		    ), 
		     React.createElement("label", {className: one_classDiv}, "姓名:"), 
		      React.createElement("div", {className: two_classDiv}, 
		       React.createElement(PxInput, {icon: "user", type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过15位"})
		        ), 
		       React.createElement(AMUIReact.FormGroup, null, 
		      React.createElement("label", null, "单选："), 
		     React.createElement(AMUIReact.Input, {type: "radio", name: "sex", value: "0", label: "男", inline: true, onChange: this.handleChange, checked: o.sex==0?"checked":""}), 
		    React.createElement(AMUIReact.Input, {type: "radio", name: "sex", value: "1", label: "女", inline: true, onChange: this.handleChange, checked: o.sex==1?"checked":""})
		   ), 
		    React.createElement("label", {className: one_classDiv}, "Email:"), 
		     React.createElement("div", {className: two_classDiv}, 
		      React.createElement(PxInput, {icon: "envelope", type: "email", name: "email", id: "email", value: o.email, onChange: this.handleChange, placeholder: "输入邮箱", placeholder: ""})
		       ), 
		      React.createElement("label", {className: one_classDiv}, "职位:"), 
		     React.createElement("div", {className: two_classDiv}, 
		    React.createElement(PxInput, {type: "text", name: "office", id: "office", value: o.office, onChange: this.handleChange})
		   ), 
		   passwordDiv, 
 	       React.createElement("button", {type: "button", onClick: ajax_userinfo_saveByAdmin, className: "am-btn am-btn-primary"}, "提交")
		  )		
		 )    		
    );
  }
}); 

//分配权限 ;
var Userinfo_getRole = React.createClass({displayName: "Userinfo_getRole", 
	
	render: function() {
		  var o = this.props.formdata;
	  return (
	  		React.createElement("div", null, 
		  		React.createElement("div", {className: "header"}, 
		  		 React.createElement("hr", null)
		  		), 
		  		
	  			React.createElement("button", {type: "button", onClick: btn_ajax_updateRole.bind(this, o.useruuid,o.groupuuid), className: "am-btn am-btn-primary"}, "提交"), 
	  			React.createElement("h3", null, Store.getGroupNameByUuid(o.groupuuid)), 
		  		React.createElement(UserChooseRole_EventsTable, React.__spread({},  this.props))
		  	   
	  	   )
	  );
	}
	}); 




//修改密码
var Div_userinfo_updatepassword = React.createClass({displayName: "Div_userinfo_updatepassword", 	
	render: function() {
	return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		    React.createElement("form", {id: "commonform", method: "post", className: "am-form"}, 

		      React.createElement("label", {htmlFor: "oldpassword"}, "当前密码:"), 
		      React.createElement(PxInput, {icon: "lock", type: "password", name: "oldpassword"}), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "password"}, "密码:"), 
		      React.createElement(PxInput, {icon: "lock", type: "password", name: "password"}), 
		      React.createElement("br", null), 
		      
		      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
		      React.createElement(PxInput, {icon: "lock", type: "password", name: "password1"}), 
		      React.createElement("br", null), 
		      React.createElement("button", {type: "button", onClick: ajax_userinfo_updatepassword, className: "am-btn am-btn-primary"}, "提交")
		    ), 
		    React.createElement("hr", null)
		  
		  )
		)
		)
	);
	}
}); 


////修改资料
var Div_userinfo_update = React.createClass({displayName: "Div_userinfo_update", 
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
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		  
		    React.createElement("form", {id: "commonform", method: "post", className: "am-form"}, 
			React.createElement("input", {type: "hidden", name: "img", id: "img", value: o.img, onChange: this.handleChange}), 
		    React.createElement("label", {htmlFor: "nickname"}, "头像:"), 
 		    React.createElement(AMUIReact.Image, {id: "img_head_image", src: G_def_headImgPath, className: "G_img_header"}), 
 		
 		   React.createElement("button", {type: "button", onClick: this.handle_uploadHeader, className: "am-btn am-btn-primary"}, "上传头像"), 
 		   React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "name"}, "姓名:"), 
		      React.createElement(PxInput, {icon: "user", type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "必填，不超过15位"}), 
		      React.createElement("br", null), 
		       React.createElement("label", {htmlFor: ""}, "Email:"), 
		      React.createElement(PxInput, {icon: "envelope", type: "email", name: "email", id: "email", value: o.email, onChange: this.handleChange, placeholder: "输入邮箱"}), 
		      React.createElement("br", null), 
		      React.createElement("label", null, "性别:"), 
		      React.createElement("div", {className: "am-form-group"}, 
		      React.createElement(AMUIReact.UCheck, {type: "radio", name: "sex", label: "男", value: "0", inline: true, defaultChecked: true, checked: o.sex==0, onChange: this.handleChange}), 
		      React.createElement(AMUIReact.UCheck, {type: "radio", name: "sex", label: "女", value: "1", inline: true, checked: o.sex==1, onChange: this.handleChange})
		      ), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "office"}, "职位:"), 
		      React.createElement("input", {type: "text", name: "office", id: "office", value: o.office, onChange: this.handleChange, placeholder: "必填，不超过15位"}), 
		      React.createElement("br", null), 
		      React.createElement("button", {type: "button", onClick: ajax_userinfo_update, className: "am-btn am-btn-primary"}, "提交")
		    ), 
		    React.createElement("hr", null)
		  
		  )
		)
		)
	);
	}
}); 

//userinfo update end

//role
var UserChooseRole_EventRow = React.createClass({displayName: "UserChooseRole_EventRow", 
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
		 React.createElement("tr", {name: "table_tr_checkbox", name: "table_tr_checkbox", id: "tr_chright_"+event.uuid, className: className, onClick: this.tr_onClick.bind(this,"tr_chright_"+event.uuid,"tb_cbox__chright"+event.uuid)}, 
	      React.createElement("td", null, 
	      React.createElement("input", {type: "checkbox", alt: event.name, value: event.uuid, id: "tb_cbox__chright"+event.uuid, name: "table_checkbox", checked: is_Checked?"checked":""})
	      ), 
    React.createElement("td", null, event.name), 
    React.createElement("td", null, event.description), 
    React.createElement("td", null, Vo.type(event.type))
  ) 
);
}
}); 

var UserChooseRole_EventsTable = React.createClass({displayName: "UserChooseRole_EventsTable",
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
        return (React.createElement(UserChooseRole_EventRow, {chooselist: that.props.chooselist, event: event}));
      })
    )
  )
  )
);
}
});
//end Userinfo_getRole



//Div_userinfo_updatePasswordBySms
var Div_userinfo_updatePasswordBySms = React.createClass({displayName: "Div_userinfo_updatePasswordBySms", 
	
	render: function() {
	return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		    React.createElement("h1", null, "重置密码")
		  ), 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		    React.createElement("form", {id: "commonform", method: "post", className: "am-form"}, 

		    React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
		      React.createElement("input", {type: "text", name: "tel", id: "tel", placeholder: ""}), 
		      React.createElement("button", {type: "button", onClick: ajax_sms_sendCode.bind(this,"#tel",2), className: "am-btn am-btn-primary"}, "发送验证码"), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "smscode"}, "验证码:"), 
		      React.createElement("input", {type: "text", name: "smscode", id: "smscode", placeholder: "验证码"}), 
		    
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "password"}, "密码:"), 
		      React.createElement("input", {type: "password", name: "password"}), 
		      React.createElement("br", null), 
		      
		      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
		      React.createElement("input", {type: "password", name: "password1"}), 
		      React.createElement("br", null), 
		      React.createElement("button", {type: "button", onClick: ajax_userinfo_updatePasswordBySms, className: "am-btn am-btn-primary"}, "提交"), 
		      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")
		    ), 
		    React.createElement("hr", null)
		  
		  )
		)
		)
	);
	}
}); 



//upload headImg
var Upload_headImg_options =
{
    thumbBox: '.thumbBox',
    spinner: '.spinner',
    imgSrc: ''
};
var Upload_headImg = React.createClass({displayName: "Upload_headImg",
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
       React.createElement("div", null, 
  	
     React.createElement("div", {className: "header"}, 
     React.createElement("div", {className: "am-g"}, 
       React.createElement("h1", null, "上传图片")
     ), 
     React.createElement("hr", null)
   ), 
   React.createElement("div", {className: "container"}, 

   	React.createElement("div", {className: "imageBox", id: "upload_file_imageBox"}, 
   	    React.createElement("div", {className: "thumbBox"}), 
   	    React.createElement("div", {className: "spinner", style: spinner_divStyle}, "加载中...")
   	), 
	React.createElement("div", {className: "action"}, 
	    React.createElement("input", {type: "file", id: "upload_imgfile", accept: "image/*"}), 
	 React.createElement(AMUIReact_Button, {amStyle: "warning", onClick: this.btnCrop_onClick, round: true}, "剪切"), 
	 React.createElement(AMUIReact_Button, {amStyle: "warning", onClick: this.btnZoomIn_onClick, round: true}, "放大"), 
	 React.createElement(AMUIReact_Button, {amStyle: "warning", onClick: this.btnZoomOut_onClick, round: true}, "缩小")

	), 
		React.createElement("div", {className: "cropped", id: "upload_file_imageBox_cropped"}
	   	)
	), 

React.createElement(AMUIReact_ButtonToolbar, null, 
React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "ok"), round: true}, "确认"), 
React.createElement(AMUIReact_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "cancel"), round: true}, "取消")
)
         )
       );
     }
});
       
       
//点赞模板2,点赞显示与点赞按钮分离,传入点赞按钮id
/*
 * 
 * 
 *@bind（this）方法中This代表对象前一步函数构造成对象传过来; 
 **/
var Common_Dianzan_show_noAction = React.createClass({displayName: "Common_Dianzan_show_noAction", 
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
		   React.createElement("small", {id: "dianzan", className: "am-margin-left-sm"}, 
		   dianzanObject.names+",等一共"+dianzanObject.count+"人点赞", 
		   		React.createElement("hr", {className: "px_hr"})
		   )


  );
}
}); 

/*
 * 图片绘制公共模板（点击可看原图）
 * */
var  Common_mg_big_fn  = React.createClass({displayName: "Common_mg_big_fn",

  render: function() {
			  if (!this.props.imgsList){
				  return;
			  };		  		   
			    return (
		      React.createElement("div", null, 
		      React.createElement("ul", {"data-am-widget": "gallery", className: "am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered", "data-am-gallery": "{pureview:{target: 'a'}}"}, 
			   
			    this.props.imgsList.map(function(event) {
			    	 var  o = event;
					  var  imgArr=o.split("@");
			        return (
			       	  React.createElement("li", null, 			     			
			     	    React.createElement("div", {className: "am-gallery-item"}, 
			     		  React.createElement("a", {href: imgArr[0], title: ""}, 
			     		    React.createElement("img", {src: o, alt: "", "data-rel": imgArr[0]})
                          )
			     		)	   
	        		 )
			        	)
			      })
			    )	   
			  )
			    )
          }
        }); 


/*
 * 图片绘制公共模板 绘制多张图片
 * */
var common_img_big_show = React.createClass({displayName: "common_img_big_show", 
	render: function() {		  
		  var  o = this.props.event;
		  var  imgArr=o.split("@");
		//  console.log("o-----",o,"   imgArr----",imgArr);
	  return (
	     React.createElement("ul", {"data-am-widget": "gallery", className: "am-gallery am-avg-sm-2 am-gallery-imgbordered", "data-am-gallery": "{pureview: 1}"}, 
		   React.createElement("li", null, 
			 React.createElement("div", {className: "am-gallery-item"}, 
		         React.createElement("img", {src: o, 
	             alt: "", "data-rel": imgArr[0]})
		     )
		   )
		 )	   
	  );
	}
	}); 


var Common_Classnewsreply_listshow = React.createClass({displayName: "Common_Classnewsreply_listshow", 	
render: function() {
  return (
		  React.createElement("div", null, 
		  this.props.events.data.map(function(event) {
			  if(!event.create_img)event.create_img=G_def_headImgPath;
		      return (
		    		  React.createElement("article", {className: "am-comment am-comment-flip am-comment-success am-margin-xs"}, 
		    		  React.createElement("a", {href: "javascript:void(0);"}, 
		    		  React.createElement("img", {src: event.create_img, className: "am-comment-avatar", width: "48", height: "48"})
		    		  ), 

		    		  React.createElement("div", {className: "am-comment-main am-comment-flip"}, 
		    		    React.createElement("header", {className: "am-comment-hd"}, 
		    		      React.createElement("div", {className: "am-comment-meta"}, 
		    		      	React.createElement("a", {href: "#link-to-user", className: "am-comment-author"}, event.create_user), "|", 
		    		      		React.createElement("time", null, event.create_time)
		    		      )
		    		    ), 
		    		    React.createElement("div", {className: "am-comment-bd am-comment-flip am-inline"}, 
					        React.createElement("div", {dangerouslySetInnerHTML: {__html:event.content}})
			  		    )
		    			 
		    			 )
		    		)
		    		
		    		  )
		  })
		
		    )		   
  );
}
}); 




//评论模板
var Common_reply_list = React.createClass({displayName: "Common_reply_list", 
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
		var re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo);
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
		  React.createElement("div", null, 
		  React.createElement("div", {id: this.classnewsreply_list_div}), 
		    React.createElement("button", {id: this.load_more_btn_id, type: "button", onClick: this.load_more_data.bind(this), className: "am-btn am-btn-primary"}, "加载更多"), 
			 React.createElement(Common_reply_save, {uuid: this.props.uuid, type: this.props.type, parentThis: parentThis})			
			 
			 )
  );
}
}); 

//我要评论模块 
//that.refreshReplyList();自己写的一个刷新方法 置空一切到初始状态然后绘制;
var Common_reply_save = React.createClass({displayName: "Common_reply_save", 
	classnewsreply_list_div:"classnewsreply_list_div",
	reply_save_btn_click:function(){
		var that=this.props.parentThis;
		common_ajax_reply_save(function(){
			that.refreshReplyList();
		
		})
	},
	componentDidMount:function(){
		$( '#classnews_content_replay').xheditor(xhEditor_upImgOption_emot);
	},
render: function() {
  return (
		   React.createElement("form", {id: "editClassnewsreplyForm", method: "post", className: "am-form"}, 
			React.createElement("input", {type: "hidden", name: "newsuuid", value: this.props.uuid}), 
			React.createElement("input", {type: "hidden", name: "uuid"}), 
			React.createElement("input", {type: "hidden", name: "type", value: this.props.uuid}), 
			
			
			React.createElement(AMR_Input, {id: "classnews_content_replay", type: "textarea", rows: "4", label: "我要评论", placeholder: "填写内容", name: "content"}), 

			React.createElement("button", {type: "button", onClick: this.reply_save_btn_click.bind(this), className: "am-btn am-btn-primary"}, "提交")
		      
		    )	   
  );
}
}); 


