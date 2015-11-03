var AMR_Table=AMUIReact.Table;
var AMR_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMR_Button=AMUIReact.Button;
var AMR_Sticky=AMUIReact.Sticky;
var AMR_Panel=AMUIReact.Panel;
var AMR_Gallery=AMUIReact.Gallery;
var AMR_Input=AMUIReact.Input;
var Grid=AMUIReact.Grid;
var Col=AMUIReact.Col;
var PxInput=AMUIReact.Input;
var AMR_Span=AMUIReact.span;
//幼儿园注册
var Div_kd_group_reg = React.createClass({displayName: "Div_kd_group_reg", 	
	render: function() {
		var one_classDiv= "am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
		var two_classDiv= "am-u-lg-10 am-u-md-10 am-u-sm-8";
	return (			
			   React.createElement("div", null, 		
				
			     React.createElement("form", {id: "kd_group_reg_form", method: "post", className: "am-form"}, 
			        React.createElement(PxInput, {type: "select", name: "type"}, 
					  React.createElement("option", {value: "1"}, "幼儿园注册"), 
					  React.createElement("option", {value: "2"}, "教育机构注册")
					), 
			       React.createElement("div", {className: "am-form-group"}, 			    
				  React.createElement("label", {className: one_classDiv}, "品牌名:"), 
				 React.createElement("div", {className: two_classDiv}, 
				React.createElement(PxInput, {type: "text", name: "brand_name", id: "brand_name", placeholder: "必填，不超过45位"})
			   ), 					
			    React.createElement("label", {className: one_classDiv}, "机构全称:"), 
				 React.createElement("div", {className: two_classDiv}, 
			      React.createElement(PxInput, {type: "text", name: "company_name", id: "company_name", placeholder: "必填，不超过45位"})
				   ), 	
			      React.createElement("label", {className: one_classDiv}, "学校地址:"), 
			     React.createElement("div", {className: two_classDiv}, 
			    React.createElement(PxInput, {type: "text", name: "address", id: "address", placeholder: "必填，不超过64位"})
			     ), 	
                  React.createElement("label", {className: one_classDiv}, "地址坐标:"), 
				   React.createElement("div", {className: two_classDiv}, 
			        React.createElement(PxInput, {type: "text", name: "map_point", id: "map_point", placeholder: "拾取坐标后，复制到这里。格式：1.1,1.1"}), 
			         React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取")
			          ), 	
					 React.createElement("label", {className: one_classDiv}, "学校电话:"), 
					React.createElement("div", {className: two_classDiv}, 
				   React.createElement(PxInput, {type: "text", name: "link_tel", id: "link_tel"})
				  ), 				      
			      React.createElement("legend", null, React.createElement("b", null, "管理人员")), 
                  React.createElement("label", {className: one_classDiv}, "手机号码:"), 
				   React.createElement("div", {className: two_classDiv}, 
					React.createElement(PxInput, {type: "text", name: "tel", id: "tel"}), 
					 React.createElement("button", {type: "button", onClick: ajax_sms_sendCode.bind(this,"#tel",1), className: "am-btn am-btn-primary"}, "发送验证码")
					  ), 	
					   React.createElement("label", {className: one_classDiv}, "验证码:"), 
					   React.createElement("div", {className: two_classDiv}, 
					  React.createElement(PxInput, {type: "text", name: "smscode", id: "smscode"})
					 ), 	
					React.createElement("label", {className: one_classDiv}, "姓名:"), 
				   React.createElement("div", {className: two_classDiv}, 
				  React.createElement(PxInput, {type: "text", name: "name", id: "name", placeholder: "必填，不超过15位"})
				 ), 						
				  React.createElement("label", {className: one_classDiv}, "Email:"), 
				   React.createElement("div", {className: two_classDiv}, 
					React.createElement(PxInput, {type: "email", name: "email", id: "email", placeholder: "name@xx.com"})
					 ), 	
                    React.createElement("label", {className: one_classDiv}, "密码:"), 
				   React.createElement("div", {className: two_classDiv}, 
				  React.createElement(PxInput, {type: "password", name: "password", id: "password"})
				 ), 	
				  React.createElement("label", {className: one_classDiv}, "重复密码:"), 
				   React.createElement("div", {className: two_classDiv}, 
					React.createElement(PxInput, {type: "password", name: "password1", id: "password1"})
					 ), 	
					React.createElement("br", null), 
			      React.createElement("button", {type: "button", onClick: ajax_kd_group_reg, className: "am-btn am-btn-primary"}, "注册"), 
			      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")
			     )
		        )
		       )
	);
	}
}); 


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
	 handle_onKeyDown: function(e){
		if(G_isKeyDown_enter(e)){
			ajax_userinfo_login();
			return false;
	 }
	},
	handleChange_group_type_data:function(v){
		 window.location.replace(v);
	},
render: function() {
	  var o = this.state;
	if(!o.grouptype)o.grouptype=1;
 return (
 		React.createElement("div", null, 
 		React.createElement("div", {className: "header"}, 
 		  React.createElement("div", {className: "am-g"}, 
 		 React.createElement("img", {src: hostUrl+"i/denglulogo.png", width: "100px", height: "100px"})
 		  )
 		), 
 		React.createElement("div", {className: "am-g"}, 
 		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered am-margin-top-sm"}, 
		
 		 React.createElement("form", {id: "login_form", method: "post", className: "am-form", onKeyDown: this.handle_onKeyDown}, 
			  React.createElement(PxInput, {type: "select", name: "grouptype", value: o.grouptype, onChange: this.handleChange}, 
			  React.createElement("option", {value: "1"}, "幼儿园登录"), 
			  React.createElement("option", {value: "2"}, "教育机构登录")
			), 
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
 	     React.createElement("div", {className: "am-cf am-margin-top-sm"}, 
 	      React.createElement("a", {href: "javascript:void(0);", onClick: menu_kd_group_reg_fn, className: "am-fl"}, "教育机构注册"), 
 	     React.createElement("a", {href: "javascript:void(0);", onClick: menu_userinfo_reg_fn, className: "am-fr"}, "老师注册")
 	      ), 
 	      React.createElement("br", null), 
 	     React.createElement("a", {href: "index.html?v="+Math.random()}, "重新加载"), 
 	     React.createElement("br", null)
 	    ), 
 	    React.createElement("hr", null), 
 	   React.createElement("p", null, "© 2015 成都问界科技有限公司")
 	     )
 	   )
 	   
 	   )
 );
}
}); 


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
		    React.createElement("form", {id: "commonform", method: "post", className: "am-form", action: "javascript:void(0);"}, 

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



//、、§§§§§§§§§§§§§§§§§§§§§§§§§§§
/*
* 老师注册（绘制）
* */
var Div_userinfo_reg = React.createClass({displayName: "Div_userinfo_reg", 
	render: function() {
		var one_classDiv= "am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
		var two_classDiv= "am-u-lg-10 am-u-md-10 am-u-sm-8";
	return (
			   React.createElement("div", null, 
				React.createElement("div", {className: "header"}, 
				 React.createElement("div", {className: "am-g"}, 
				  React.createElement("h1", null, "老师注册")
				 ), 
				React.createElement("hr", null)
			   ), 	  
			   React.createElement("form", {id: "regform", method: "post", className: "am-form"}, 
		         React.createElement(PxInput, {type: "hidden", name: "type", value: "1"}), 
		          React.createElement("div", {className: "am-form-group"}, 				       		     
			    React.createElement("label", {className: one_classDiv}, "手机号码:"), 
				 React.createElement("div", {className: two_classDiv}, 
				  React.createElement(PxInput, {type: "text", name: "tel", id: "tel"}), 
                 React.createElement("button", {type: "button", onClick: ajax_sms_sendCode.bind(this,"#tel",1), className: "am-btn am-btn-primary"}, "发送验证码")	     
				    ), 
			       React.createElement("label", {className: one_classDiv}, "验证码:"), 
				  React.createElement("div", {className: two_classDiv}, 
				 React.createElement(PxInput, {type: "text", name: "smscode", id: "smscode"})
				), 				  
				 React.createElement("label", {className: one_classDiv}, "姓名:"), 
				  React.createElement("div", {className: two_classDiv}, 
				   React.createElement(PxInput, {type: "text", name: "name", id: "name", placeholder: "必填，不超过15位"})
				    ), 				   
				     React.createElement("label", {className: one_classDiv}, "Email:"), 
				    React.createElement("div", {className: two_classDiv}, 
				   React.createElement(PxInput, {type: "email", name: "email", id: "email", placeholder: "输入邮箱"})
				  ), 									  
				   React.createElement("label", {className: one_classDiv}, "密码:"), 
				    React.createElement("div", {className: two_classDiv}, 
				     React.createElement(PxInput, {type: "password", name: "password", id: "password"})
				      ), 				  
				     React.createElement("label", {className: one_classDiv}, "重复密码:"), 
				    React.createElement("div", {className: two_classDiv}, 
				   React.createElement(PxInput, {type: "password", name: "password1", id: "password1"})
				  ), 			
				 React.createElement("br", null), 
		      React.createElement("button", {type: "button", onClick: ajax_userinfo_reg, className: "am-btn am-btn-primary"}, "注册"), 
		      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")	      
		    )
		   )	
		  )
	);
	}
});
