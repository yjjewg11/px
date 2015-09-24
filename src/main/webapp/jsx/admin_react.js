//login

/*
 *登录界面账号与密码输入绘制
 * <img src={hostUrl+"i/denglulogo.png"} width="100px" height="100px"/> 绘制图片
 * */
var Div_login = React.createClass({ 
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
 		<div>
 		<div className="header">
 		  <div className="am-g">
 		 <img src={hostUrl+"i/denglulogo.png"} width="100px" height="100px"/>
 		 <h1>问界科技管理云平台</h1>
 		  </div>
 		</div>
 		<div className="am-g">
 		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
 		 <form id="login_form" method="post" className="am-form">
 	      <PxInput icon="mobile" type="text" name="loginname" id="loginname" value={o.loginname} onChange={this.handleChange}/>
 	      <PxInput icon="lock" type="password" name="password" id="password" value={o.password} onChange={this.handleChange}/>
 	      <label htmlFor="pw_checked">
 	        <input id="pw_checked" name="pw_checked" type="checkbox"  checked={o.pw_checked=="checked"?"checked":""} onChange={this.handleChange}/>
 	        记住密码
 	      </label>
 	      <div className="am-cf">
 	        <input id="btn_login" onClick={ajax_userinfo_login} type="button" name="" value="登 录" className="am-btn am-btn-primary am-btn-sm am-fl" />
 	        <input type="button" onClick={menu_userinfo_updatePasswordBySms_fn} value="忘记密码 ^_^? " className="am-btn am-btn-default am-btn-sm am-fr" />
 	      </div>
 	   
 	     <br/>
 	    </form>
 	    <hr/>
 	   <p>© 2015 成都问界科技有限公司  | 蜀ICP备15021053号-1</p>
 	     </div> 
 	   </div>
 	   
 	   </div>
 );
}
}); 

//end login



//right
var Right_EventRow = React.createClass({ 
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
		 <tr name="table_tr_checkbox_right" id={"tr_chright_"+event.uuid} className={className} >
	      <td onClick={this.tr_onClick.bind(this,"tr_chright_"+event.uuid,"tb_cbox__chright"+event.uuid)}> 
	      <input type="checkbox" alt={event.name} value={event.uuid} id={"tb_cbox__chright"+event.uuid} name="table_checkbox"  />
	      </td>
        <td><a href="javascript:void(0);" onClick={this.ajax_right_edit_onClick.bind(this, JSON.stringify(event))}>{event.name}</a></td>
        <td>{event.description}</td>
        <td>{Vo.type(event.type)}</td>
      </tr> 
    );
  }
}); 

var Right_EventsTable = React.createClass({
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
            return (<Right_EventRow chooselist={that.props.chooselist} event={event} />);
          })}
        </tbody>
      </AMUIReact.Table>
      <button type="button"  onClick={ajax_right_button_handleClick.bind(this, "add_right",this.props.type)}  className="am-btn am-btn-primary">添加权限</button>
      </div>
    );
  }
});
    
var Right_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editRightForm').serializeJson());
	  },
  render: function() {
	  var o = this.state;
    return (
    		<div>
    		<div className="header">
    		  <div className="am-g">
    		    <h1>编辑权限-【{Vo.type(o.type)}】</h1>
    		  </div>
    		  <hr />
    		</div>
    		<div className="am-g">
    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    		  <form id="editRightForm" method="post" className="am-form">
    			<input type="hidden" name="uuid"  value={o.uuid}/>
    			<input type="hidden" name="type"  value={o.type}/>
    		      <label htmlFor="name">名字:</label>
    		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
    		      <br/>
    		       <label htmlFor="description">描述:</label>
    		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange}/>
    		      <button type="button"  onClick={ajax_right_save}  className="am-btn am-btn-primary">提交</button>
    		    </form>

    	     </div>
    	   </div>
    	   
    	   </div>
    );
  }
}); 
//end right




//role
var Role_EventRow = React.createClass({ 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    <tr className={className} >
    <td> 
    <input type="checkbox" value={event.uuid} name="table_checkbox" />
    </td>
      <td><a href="javascript:void(0);" onClick={ajax_role_edit.bind(this, event)}>{event.name}</a></td>
      <td>{event.description}</td>
      <td>{Vo.type(event.type)}</td>
      <td><a href="javascript:void(0);" onClick={ajax_role_bind_right.bind(this, event)}>绑定权限</a>
     </td>
    </tr> 
  );
}
}); 

var Role_EventsTable = React.createClass({
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
  <div>
  <AMUIReact.ButtonToolbar>
	    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this, "add_role")} round>添加</AMUIReact.Button>
	 </AMUIReact.ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
    <select id="select_role_type" name="group_uuid"  value={this.props.type} onChange={this.handleChange_select_role_type}>
    {Vo.getTypeList("group_type").map(function(event) {
          return (  <option value={event.key} >{event.val}</option>);
        })}
    </select>
  </div>
  <div className="header">
  <div className="am-g">
    <h1>角色管理</h1>
  </div>
  <hr />
</div>
    <AMUIReact.Table {...this.props}>  
      <thead> 
        <tr>
        	<th>  
          <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
          </th>
          <th>名称</th>
          <th>描述</th>
          <th>类型</th>
          <th>操作</th>
        </tr> 
      </thead>
      <tbody>
        {this.props.events.map(function(event) {
          return (<Role_EventRow key={event.id} event={event} />);
        })}
      </tbody>
    </AMUIReact.Table>
    </div>
  );
}
});
  
var Role_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editRoleForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
  return (
  		<div>
  		<div className="header">
  		  <div className="am-g">
  		    <h1>编辑角色</h1>
  		  </div>
  		  <hr />
  		</div>
  		<div className="am-g">
  		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
  		  <form id="editRoleForm" method="post" className="am-form">
  			<input type="hidden" name="uuid"  value={o.uuid}/>
  		    <div className="am-form-group">
  		          <select id="type" name="type"  value={o.type} onChange={this.handleChange}>
  		          
  		        {Vo.getTypeList("group_type").map(function(event) {
  		          return (  <option value={event.key} >{event.val}</option>);
  		        })}
  		          
  		          </select>
  		        </div>
  		      <label htmlFor="name">名字:</label>
  		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
  		      <br/>
  		       <label htmlFor="description">描述:</label>
  		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange}/>
  		      <button type="button"  onClick={ajax_role_save}  className="am-btn am-btn-primary">提交</button>
  		    </form>

  	     </div>
  	   </div>
  	   
  	   </div>
  );
}
}); 


var Role_bind_right = React.createClass({ 
	
render: function() {
	  var o = this.props.formdata;
  return (
  		<div>
	  		<div className="header">
		  		  <div className="am-g">
		  		    <h1>角色绑定权限-【{Vo.type(o.type)}】-【{o.name}】</h1>
		  		  </div>
	  		</div>
  			<button type="button"  onClick={btn_ajax_updateRight.bind(this, o.uuid)}  className="am-btn am-btn-primary">提交</button>
	  		<Right_EventsTable {...this.props}/>
	  	   
  	   </div>
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
//	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加</AMR_Button>
//	    <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "enable")} round>启用</AMR_Button>
//	    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "disable")} round>禁用</AMR_Button>
//	    <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "getRole")} round>分配权限</AMR_Button>
//	    <AMR_Button amStyle="revise" onClick={this.handleClick.bind(this, "edit")} round>修改</AMR_Button>
//	    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "del")} round>删除</AMR_Button>
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
var Userinfo_EventsTable_div = React.createClass({
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
    
	   <div data-am-widget="list_news" className="am-list-news am-list-news-default">	
	    <form id="editGroupForm" method="post" className="am-form">		   
	     <AMR_ButtonToolbar className="am-cf am-margin-left-xs">	   
	      <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		   <AMUIReact.Selected id="selectgroup_uuid" name="group_uuid" onChange={this.refresh_data.bind(this)} data={this.props.group_list} btnStyle="primary" value={this.props.groupuuid} /> 
		    </div> 		  
		   <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		  <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加</AMR_Button>
		 </div> 		    
		  <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		   <AMR_Button amStyle="success" onClick={this.handleClick.bind(this, "enable")} round>启用</AMR_Button>
		    </div> 		    
		   <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		  <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "disable")} round>禁用</AMR_Button>
		 </div> 
		    <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		   <AMR_Button amStyle="revise" onClick={this.handleClick.bind(this, "edit")} round>修改</AMR_Button>
		  </div> 		    
		   <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		    <AMR_Button amStyle="danger" onClick={this.handleClick.bind(this, "del")} round>删除</AMR_Button>
		     </div> 
			   
			<div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		   <input type="text" name="sutdent_name" id="sutdent_name" placeholder="教师姓名"/>		  
		  </div>			  
		   <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
			<button type="button"  onClick={this.refresh_data.bind(this)}  className="am-btn am-btn-primary">搜索</button>
		     </div>				  
			  </AMR_ButtonToolbar>
			 </form>      
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
});    

    var Userinfo_EventRow_admin = React.createClass({ 
		  render: function() {
			    var event = this.props.events;
			    var className = event.highlight ? 'am-active' :
		  event.disabled ? 'am-disabled' : '';
			    return (
			    		  <AMR_Table   bordered className="am-table-striped am-table-hover am-text-nowrap">		   	
				          <tr>
				          	<th>  
				            <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
				            </th>
				            <th>帐号</th>
				            <th>姓名</th>
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
			    				   	        <td>{event.loginname}</td>
			    				   	        <td>{event.name}</td>
			    				   	        <td>{event.tel}</td>
			    				   	        <td>{event.email}</td>
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
//userinfo end

//basedatatype
var Basedatatype_EventRow = React.createClass({ 
	handleClick: function(m,data) {
		ajax_basedatatype_button_handleClick(m,data);
	  },
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  <tr className={className} >
  <td> 
  <input type="checkbox" value={event.uuid} name="table_checkbox" />
  </td>
    <td><a href="javascript:void(0);" onClick={this.handleClick.bind(this,"edit", event)}>{event.name}</a></td>
    <td>{event.description}</td>
    <td><a href="javascript:void(0);" onClick={this.handleClick.bind(this,"detail", event)}>详细</a></td>
  </tr> 
);
}
}); 

var Basedatatype_EventsTable = React.createClass({
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
<div>
<div className="header">
<div className="am-g">
  <h1>编辑基础数据类型</h1>
</div>
<hr />
</div>
<AMUIReact.ButtonToolbar>
	    <AMUIReact.Button amStyle="primary" onClick={this.handleClick.bind(this, "add_basedatatype")} round>添加</AMUIReact.Button>
	 </AMUIReact.ButtonToolbar>
	  <hr/>
	  
  <AMUIReact.Table {...this.props}>  
    <thead> 
      <tr>
      	<th>  
        <input type="checkbox" id="id_checkbox_all" onChange={this.handleChange_checkbox_all} />
        </th>
        <th>名称</th>
        <th>描述</th>
        <th>操作</th>
      </tr> 
    </thead>
    <tbody>
      {this.props.events.map(function(event) {
        return (<Basedatatype_EventRow key={event.id} event={event} />);
      })}
    </tbody>
  </AMUIReact.Table>
  </div>
);
}
});

var Basedatatype_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editBasedatatypeForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>编辑基础数据类型</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		  <form id="editBasedatatypeForm" method="post" className="am-form">
			<input type="hidden" name="uuid"  value={o.uuid}/>
		      <label htmlFor="name">名字:</label>
		      <input type="text" name="name" id="name" value={o.name} onChange={this.handleChange} placeholder="不超过15位"/>
		      <br/>
		       <label htmlFor="description">描述:</label>
		      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange}/>
		      <button type="button"  onClick={ajax_basedatatype_save}  className="am-btn am-btn-primary">提交</button>
		    </form>

	     </div>
	   </div>
	   
	   </div>
);
}
}); 
//end basedatatype

// basedatatypelist
var Basedatatype_bind_basedatalist = React.createClass({ 
	
render: function() {
	  var o = this.props.formdata;
  return (
  		<div>
	  		<div className="header">
		  		  <div className="am-g">
		  		    <h1>基础数据【{o.name}】</h1>
		  		  </div>
	  		</div>
  			<button type="button"  onClick={Queue.doBackFN.bind(Queue)}  className="am-btn am-btn-primary">返回</button>
	  		<Basedatalist_EventsTable {...this.props}/>
	  	   
  	   </div>
  );
}
}); 

var Basedatalist_EventRow = React.createClass({ 
	
  render: function() {
    var event = this.props.event;

    return (
		 <tr>
        <td><a href="javascript:void(0);" onClick={btn_click_basedatatypelist.bind(this,"edit", JSON.stringify(event))}>{event.datakey}</a></td>
        <td>{event.datavalue}</td>
        <td>{Vo.get("enable_"+event.enable)}</td>
        <td>{event.description}</td>
      </tr> 
    );
  }
}); 

var Basedatalist_EventsTable = React.createClass({
  render: function() {
	  var that=this;
    return (
    		<div>
      <AMUIReact.Table {...this.props}>  
        <thead> 
          <tr>
            <th>Key</th>
            <th>显示名</th>
            <th>
            状态
            </th>
            <th>描述</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Basedatalist_EventRow  event={event} />);
          })}
        </tbody>
      </AMUIReact.Table>
      <button type="button"  onClick={btn_click_basedatatypelist.bind(this, "add",{typeuuid:this.props.formdata.name})}  className="am-btn am-btn-primary">添加</button>
      </div>
    );
  }
});
    

var Basedatatypelist_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editBasedatatypelistForm').serializeJson());
	  },
  render: function() {
	  var o = this.state;
    return (
    		<div>
    		<div className="header">
    		  <div className="am-g">
    		    <h1>编辑</h1>
    		  </div>
    		  <hr />
    		</div>
    		<div className="am-g">
    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    		  <form id="editBasedatatypelistForm" method="post" className="am-form">
    			<input type="hidden" name="uuid"  value={o.uuid}/>
    			<input type="hidden" name="typeuuid"  value={o.typeuuid}/>
    		      <label >key[数字1-100]:</label>
    		      <input type="text" name="datakey"  value={o.datakey} onChange={this.handleChange} placeholder="不超过15位,一般是数字,[0-100]"/>
    		      <br/>
    		       <label >显示名:</label>
    		      <input type="text" name="datavalue"	  value={o.datavalue} onChange={this.handleChange}/>
    		      <label htmlFor="description">描述:</label>
    		      <input type="text" name="description"  value={o.description} onChange={this.handleChange}/>
    		      <label htmlFor="enable">描述:</label>
    		      <div className="am-form-group">
    		      
    		      <select  name="enable" value={this.props.enable} onChange={this.handleChange}>
    		      <option value="1" >{Vo.get("enable_1")}</option>
    		      <option value="0" >{Vo.get("enable_0")}</option>
    		      </select>
    		    </div>
    			      
    		      
    		      <button type="button"  onClick={ajax_basedatatypelist_save}  className="am-btn am-btn-primary">提交</button>
    		    </form>

    	     </div>
    	   </div>
    	   
    	   </div>
    );
  }
}); 
//end basedatatypelist


//accounts
var Accounts_EventRow = React.createClass({ 
render: function() {
var event = this.props.event;
var className = event.highlight ? 'am-active' :
  event.disabled ? 'am-disabled' : '';

return (
  <tr className={className} >
  <td > {Vo.get("AD_Accounts_type_"+event.type)}</td>
  <td  >{event.title}</td>
  <td > {event.num}</td>
    <td  >{G_getDateYMD(event.accounts_time)}</td>
    <td > {event.description}</td>
    <td >{Store.getGroupNameByUuid(event.groupuuid)}</td>
    <td >{event.create_user}</td>
    <td >{event.create_time}</td>
  </tr> 
);
}
}); 

var Accounts_EventsTable = React.createClass({
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
<div>
<div className="header">
	  <div className="am-g">
	    <h1>收支记录</h1>
	  </div>
	  <hr />
	</div>
<AMR_ButtonToolbar>
	    <AMR_Button amStyle="primary" onClick={this.handleClick.bind(this, "add")} round>添加</AMR_Button>
	  </AMR_ButtonToolbar>
	  <hr/>
	  <div className="am-form-group">
	    <select id="selectgroup_uuid" name="group_uuid" data-am-selected="{btnSize: 'lg'}" value={this.props.group_uuid} onChange={this.handleChange_selectgroup_uuid}>
	    {this.props.group_list.map(function(event) {
	        return (<option value={event.uuid} >{event.brand_name}</option>);
	      })}
	    </select>
	  </div>
  <AMR_Table {...this.props}>  
    <thead> 
      <tr>
        <th>类型</th>
        <th>内容</th>
        <th>金额</th>
        <th>收费时间</th>
        <th>备注</th>
        <th>学校</th>
        <th>创建人</th>
        <th>创建时间</th>
      </tr> 
    </thead>
    <tbody>
      {this.props.events.map(function(event) {
        return (<Accounts_EventRow key={event.id} event={event} />);
      })}
    </tbody>
  </AMR_Table>
  </div>
);
}
});

var Accounts_edit = React.createClass({ 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editAccountsForm').serializeJson());
	  },
	 
render: function() {
	  var o = this.state;
return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>添加收支记录</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		<form id="editAccountsForm" method="post" className="am-form">
		<input type="hidden" name="uuid"  value={o.uuid}/>
		 <div className="am-form-group">
	          <select id="groupuuid" name="groupuuid" data-am-selected="{btnSize: 'lg'}" value={o.groupuuid} onChange={this.handleChange}>
	          {this.props.group_list.map(function(event) {
	              return (<option value={event.uuid} >{event.brand_name}</option>);
	            })}
	          </select>
	        </div> 
		<label htmlFor="type">类型:</label>
		 <div className="am-form-group">
		<select id="type" name="type" data-am-selected="{btnSize: 'lg'}" value={o.type} onChange={this.handleChange}>
		 {this.props.type_list.map(function(event) {
             return (<option value={event.key} >{event.val}</option>);
           })}
      </select>
      </div> 
	      <br/>
	    <label htmlFor="accounts_timeStr">收支日期:</label>
	    <AMUIReact.DateTimeInput format="YYYY-MM-DD"  name="accounts_timeStr" id="accounts_timeStr" dateTime={o.accounts_time} showTimePicker={false}  onChange={this.handleChange}/>
	       <label htmlFor="title">内容:</label>
	      <input type="text" name="title" id="title" value={o.title} onChange={this.handleChange} placeholder="必填,不超过45位"/>
	      <br/>
	
	       <label htmlFor="num">金额:</label>
	      <input type="number" name="num" id="num" value={o.num} onChange={this.handleChange} placeholder="必填"/> 
	    <label htmlFor="description">备注:</label>
	      <input type="text" name="description" id="description" value={o.description} onChange={this.handleChange} placeholder="不超过100位"/>
	      <br/>
	      <button type="button"  onClick={ajax_accounts_saveAndAdd}  className="am-btn am-btn-primary">保存继续</button>
	      <button type="button"  onClick={ajax_accounts_save}  className="am-btn am-btn-primary">保存返回</button>
	     </form>

	     </div>
	   </div>
	   
	   </div>
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
var Parent_EventsTable_div = React.createClass({
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
    
	   <div data-am-widget="list_news" className="am-list-news am-list-news-default">	
	    <form id="editGroupForm" method="post" className="am-form">		   
	     <AMR_ButtonToolbar>	   
			<div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
		   <input type="text" name="sutdent_name" id="sutdent_name" placeholder="家长姓名"/>		  
		  </div>			  
		   <div className="am-fl am-cf am-margin-bottom-sm am-margin-left-xs">
			<button type="button"  onClick={this.refresh_data.bind(this)}  className="am-btn am-btn-primary">搜索</button>
		     </div>				  
			  </AMR_ButtonToolbar>
			 </form>    
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
});    

    var Parent_EventRow_admin = React.createClass({ 
		  render: function() {
			    var event = this.props.events;
			    var className = event.highlight ? 'am-active' :
		  event.disabled ? 'am-disabled' : '';
			    return (
			    		  <AMR_Table   bordered className="am-table-striped am-table-hover am-text-nowrap">		   	
				          <tr>
				            <th>帐号</th>
				            <th>姓名</th>
				            <th>电话</th>
				            <th>状态</th>
				            <th>登录时间</th>
				            <th>创建时间</th>
				          </tr> 			 
			    			  {this.props.events.map(function(event) {
			    			      return (
			    					      <tr className={className}>
			    				   	        <td>{event.loginname}</td>
			    				   	        <td>{event.name}</td>
			    				   	        <td>{event.tel}</td>
			    				   	        <td  className={"px_disable_"+event.disable}>{Vo.get("disable_"+event.disable)}</td>
			    				   	        <td>{event.login_time}</td>
			    				   	        <td>{event.create_time}</td>			    					        </tr> 
			    			    		  )
			    			         })}	
			    			  </AMR_Table>		  
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
    var Classnews_Div_list_byRight = React.createClass({ 
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
    		  <div data-am-widget="list_news" className="am-list-news am-list-news-default">
    		  <AMUIReact.ButtonToolbar>
    		    <AMUIReact.Button amStyle="primary" onClick={this.refresh_data.bind(this)} round>刷新</AMUIReact.Button>
    		    <G_help_popo  msg={G_tip.Classnews_admin}/> 
    		    </AMUIReact.ButtonToolbar>
    		    <Div_MyClassnewStatistics_byRight />
    			<hr/>	 
    		    
    		  <div  id={this.classnewsreply_list_div} className="am-list-news-bd">		   		    
    		  </div>
    		  
    		  <div className="am-list-news-ft">
    		    <a className="am-list-news-more am-btn am-btn-default " id={this.load_more_btn_id} onClick={this.load_more_data.bind(this)}>查看更多 &raquo;</a>
    		  </div>
    		  
    		  
    		  
    		</div>
    		  
    			
      );
    }
    });
    //显示我的班级互动统计数据
    var Div_MyClassnewStatistics_byRight = React.createClass({ 
    	
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
    		 <AMR_Button className="am-margin-top-xs" amStyle="success" amSize="sm" block disabled={this.state.disabled} onClick={this.ajax_list.bind(this)} >{this.state.title}</AMR_Button>
    	);
    	}
    }); 
    /*
    * <班级互动>;
    * @Classnews_EventRow:绘制列表详情;
    * */
    var Classnews_EventsTable_byRight = React.createClass({	  
    render: function() {
    	var that=this;
    return (
    <div>
      {this.props.events.data.map(function(event) {
        return (<Classnews_show_byRight  event={event} />);
      })}
    </div>
    );
    }
    });
    /*
    * <班级互动>MAp详情绘制
    * var o = this.props.formdata;
    */
    var Classnews_show_byRight = React.createClass({ 
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
    			  <div>
    			  <article className="am-comment am-margin-xs">
    			  <a href="javascript:void(0);">
    			    <img src={o.create_img}  className="am-comment-avatar" width="48" height="48"/>
    			  </a>

    			  <div className="am-comment-main">
    			    <header className="am-comment-hd">
    			      <div className="am-comment-meta">
    			        <a href="javascript:void(0);" className="am-comment-author">{Store.getClassNameByUuid(o.classuuid)}|{o.create_user}|{Store.getGroupNameByUuid(o.groupuuid)}</a>
    			      </div>
    			    </header>
    			    <div className="am-comment-bd">
    			    <div dangerouslySetInnerHTML={{__html:o.content}}></div>
    			    	<Common_mg_big_fn  imgsList={o.imgsList} />
    			    </div>
    			    	<footer className="am-comment-footer">
    			    	<div className="am-comment-actions">
    			    	{GTimeShow.showByTime(o.update_time)}
    			    	<a href="javascript:void(0);"><i id={"btn_dianzan_"+o.uuid} className="am-icon-thumbs-up px_font_size_click"></i></a> 
    			    	<a href="javascript:void(0);"><i id={"btn_reply_"+o.uuid} className="am-icon-reply px_font_size_click"></i></a>
    			    	<a href="javascript:void(0);" onClick={common_check_illegal.bind(this,99,o.uuid)}>举报</a>
    			    	<G_check_disable_div_byRight type={99} uuid={o.uuid}/>
    			    	</div>
    			    	</footer>
    			    	
    			    	<Common_Dianzan_show_noAction dianzan={o.dianzan} uuid={o.uuid} type={0}  btn_dianzan={"btn_dianzan_"+o.uuid}/>
    			    	<ul className="am-comments-list">
    					  <Classnews_reply_list_byRight replyPage={o.replyPage} uuid={o.uuid}  type={0} btn_reply={"btn_reply_"+o.uuid}/>
    			    	</ul>
    			     </div>
    			</article>
    			 
    			    </div>		   
    	  );
    	}
    	}); 




    /*
    * 1.1互动里面单独的评论模板
    * 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
    * 把评论模板插入空Div里面
    * 
    * */
    var Classnews_reply_list_byRight = React.createClass({ 
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
    		if(!re_data){
    			re_data=commons_ajax_reply_list(this.props.uuid,this.classnewsreply_list_div+this.pageNo,this.pageNo,Classnews_reply_list_listshow_byRight);
    		}else{
    			this.loadByFirst(this.classnewsreply_list_div+this.pageNo);
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
    		  
    		  <div className="am-comment-bd am-comment-flip">
    		  <div id={this.div_reply_save_id}>			</div>
    		    <div id={this.classnewsreply_list_div}></div>
    		    <button id={this.load_more_btn_id}  type="button"  onClick={this.load_more_data.bind(this)}  className="am-btn am-btn-primary">加载更多</button>		
    			
    			</div>	
    		   
    );
    }
    }); 
    /*
    * 1.2互动里面单独的评论模板-item
    * 逻辑：建立以个空Div然后点击评论按钮触发事件绘制评论模板
    * 把评论模板插入空Div里面
    * 
    * */
    var Classnews_reply_list_listshow_byRight = React.createClass({ 	
    render: function() {
    return (
    		  <div>
    		  {this.props.events.data.map(function(event) {
    		      return (
    		    		  <li className="am-cf">
    		    		  <span className="am-comment-author am-fl">{event.create_user+":"}</span>
    				        <span className="am-fl" dangerouslySetInnerHTML={{__html:event.content}}></span><G_check_disable_div_byRight type={98} uuid={event.uuid}/>
    		    		  </li>
    		    		  )
    		  })}
    		
    		    </div>		   
    );
    }
    }); 

    /*
    * 绘制评论模板
    * @componentDidMount:添加表情
    * */
    var Classnews_reply_save_byRight = React.createClass({ 
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
    		   <form id={this.form_id} method="post" className="am-form">
    			<input type="hidden" name="newsuuid"  value={this.props.uuid}/>
    			<input type="hidden" name="uuid" />
    			<input type="hidden" name="type"  value={this.props.uuid}/>						
    			<AMR_Input id={this.classnews_content} type="textarea" rows="3" label="我要回复" placeholder="填写内容" name="content" />
    			<button type="button"  onClick={this.reply_save_btn_click.bind(this)}  className="am-btn am-btn-primary">提交</button>		      
    		    </form>	   
    );
    }
    }); 

    /*
    * <班级互动>添加与编辑按钮中可删除图片显示.
    */
    var ClassNews_Img_canDel = React.createClass({
    		deleteImg:function(divid){
    			$("#"+divid).remove();
    		},			
    	  render: function() {
    		 return (
              		<div  className="G_cookplan_Img" >
    	 	       			<img className="G_cookplan_Img_img"  src={this.props.url} alt="图片不存在" />
    	 	       			<div className="G_cookplan_Img_close"  onClick={this.deleteImg.bind(this,this.props.parentDivId)}><img src={hostUrlCDN+"i/close.png"} border="0" /></div>
    	 	       		</div>		
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
    var Classnews_edit_byRight = React.createClass({ 
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
    		<div>
    		<div className="header">
    		  <hr />
    		</div>
    		<div className="am-g">
    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">	      
    		  <form id="editClassnewsForm" method="post" className="am-form">
    		  <AMUIReact.Selected id="selectclass_uuid" name="classuuid" onChange={this.handleChange_selectclass_uuid} btnWidth="300"  data={this.props.mycalsslist} btnStyle="primary" value={o.classuuid} />	      
    			
    		  <input type="hidden" name="uuid"  value={o.uuid}/>
    			<input type="hidden" name="imgs" id="imgs"  value={o.imgs}/>			
    		      <AMR_Input id="classnews_content" type="textarea" rows="3" label="内容:" placeholder="填写内容" name="content" value={o.content} onChange={this.handleChange}/>
    		      <div id="show_imgList"></div><br/>
    		      <div className="cls"></div>
    			  {G_get_upload_img_Div()}
    		      <button type="button"  onClick={ajax_classnews_save_Right}  className="am-btn am-btn-primary">提交</button>
    		    </form>
    	     </div>
    	   </div>
    	   
    	   </div>
    );
    }
    }); 
    //±±±±±±±±±±±±±±±±±±±±±±±±±±±