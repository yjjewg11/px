//userinfo reg
var Div_userinfo_reg = React.createClass({displayName: "Div_userinfo_reg", 
	
	render: function() {
	return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		    React.createElement("h1", null, "老师注册")
		  ), 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		    React.createElement("form", {id: "regform", method: "post", className: "am-form"}, 
		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
		    React.createElement("div", {className: "am-form-group"}, 
		    
		    React.createElement("select", {id: "reg_group_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}"}, 
		      this.props.group_list.map(function(event) {
		          return (React.createElement("option", {value: event.uuid}, event.company_name));
		        })
		      )
		        ), 
		      
		      React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
		      React.createElement("input", {type: "text", name: "tel", id: "tel", placeholder: ""}), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "name"}, "昵称:"), 
		      React.createElement("input", {type: "text", name: "name", id: "name", placeholder: "必填，不超过15位"}), 
		      React.createElement("br", null), 
		       React.createElement("label", {htmlFor: ""}, "Email:"), 
		      React.createElement("input", {type: "email", name: "email", id: "email", placeholder: "输入邮箱", placeholder: ""}), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "password"}, "密码:"), 
		      React.createElement("input", {type: "password", name: "password", id: "password"}), 
		      React.createElement("br", null), 
		      
		      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
		      React.createElement("input", {type: "password", name: "password1", id: "password1"}), 
		      React.createElement("br", null), 
		      React.createElement("button", {type: "button", onClick: ajax_userinfo_reg, className: "am-btn am-btn-primary"}, "注册"), 
		      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")
		    ), 
		    React.createElement("hr", null)
		  
		  )
		)
		)
	);
	}
}); 

//userinfo reg end

//kd group reg
var Div_kd_group_reg = React.createClass({displayName: "Div_kd_group_reg", 
	
	render: function() {
	return (
		React.createElement("div", null, 
			React.createElement("div", {className: "header"}, 
			  React.createElement("div", {className: "am-g"}, 
			    React.createElement("h1", null, "幼儿园注册")
			  ), 
			  React.createElement("hr", null)
			), 
			React.createElement("div", {className: "am-g"}, 
			  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
			    React.createElement("form", {id: "kd_group_reg_form", method: "post", className: "am-form"}, 
			    React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
			      React.createElement("label", {htmlFor: "brand_name"}, "品牌名:"), 
			      React.createElement("input", {type: "text", name: "brand_name", id: "brand_name", placeholder: "必填，不超过45位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "company_name"}, "机构全称:"), 
			      React.createElement("input", {type: "text", name: "company_name", id: "company_name", placeholder: "必填，不超过45位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "address"}, "公司地址:"), 
			      React.createElement("input", {type: "text", name: "address", id: "address", placeholder: "必填，不超过64位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "map_point"}, "地址坐标:"), 
			      React.createElement("input", {type: "text", name: "map_point", id: "map_point", placeholder: "拾取坐标后，复制到这里。格式：1.1,1.1"}), 
			      React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取"), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "link_tel"}, "公司电话:"), 
			      React.createElement("input", {type: "text", name: "link_tel", id: "link_tel", placeholder: ""}), 
			      React.createElement("br", null), 
			      
			      React.createElement("legend", null, React.createElement("b", null, "管理人员")), 
			     
			      React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
			      React.createElement("input", {type: "text", name: "tel", id: "tel", placeholder: ""}), 
			      React.createElement("br", null), 
			      React.createElement("label", {htmlFor: "name"}, "昵称:"), 
			      React.createElement("input", {type: "text", name: "name", id: "name", placeholder: "必填，不超过15位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: ""}, "Email:"), 
			      React.createElement("input", {type: "email", name: "email", id: "email", placeholder: "name@xx.com"}), 
			      React.createElement("br", null), 
			      React.createElement("label", {htmlFor: "password"}, "密码:"), 
			      React.createElement("input", {type: "password", name: "password", id: "password"}), 
			      React.createElement("br", null), 
			      
			      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
			      React.createElement("input", {type: "password", name: "password1", id: "password1"}), 
			      React.createElement("br", null), 
			      React.createElement("button", {type: "button", onClick: ajax_kd_group_reg, className: "am-btn am-btn-primary"}, "注册"), 
			      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")
			     ), 
			    React.createElement("hr", null)
			  
			  )
			)
		)
	);
	}
}); 

//kd group reg end

//login
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
 		 React.createElement("h1", null, "幼儿园老师登录"), 
 	    React.createElement("p", null, "PX Background Management System", React.createElement("br", null), "快捷管理，大数据分析")
 		  ), 
 		  React.createElement("hr", null)
 		), 
 		React.createElement("div", {className: "am-g"}, 
 		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
 		 React.createElement("form", {id: "login_form", method: "post", className: "am-form"}, 
 	      React.createElement("label", {htmlFor: "loginname"}, "手机号:"), 
 	      React.createElement("input", {type: "text", name: "loginname", id: "loginname", value: o.loginname, onChange: this.handleChange}), 
 	      React.createElement("br", null), 
 	      React.createElement("label", {htmlFor: "password"}, "密码:"), 
 	      React.createElement("input", {type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange}), 
 	      React.createElement("br", null), 
 	      React.createElement("label", {htmlFor: "pw_checked"}, 
 	        React.createElement("input", {id: "pw_checked", name: "pw_checked", type: "checkbox", checked: o.pw_checked=="checked"?"checked":"", onChange: this.handleChange}), 
 	        "记住密码"
 	      ), 
 	      React.createElement("br", null), 
 	      React.createElement("div", {className: "am-cf"}, 
 	        React.createElement("input", {id: "btn_login", onClick: ajax_userinfo_login, type: "button", name: "", value: "登 录", className: "am-btn am-btn-primary am-btn-sm am-fl"}), 
 	        React.createElement("input", {type: "button", name: "", value: "忘记密码 ^_^? ", className: "am-btn am-btn-default am-btn-sm am-fr"})
 	      ), 
 	      React.createElement("a", {href: "javascript:menu_kd_group_reg_fn();"}, "幼儿园注册"), "|", 
 	     React.createElement("a", {href: "javascript:menu_userinfo_reg_fn();"}, "老师注册"), 
 	      React.createElement("br", null), 
 	      
 	     React.createElement("a", {href: "http://120.25.248.31/px-rest/kd/"}, " ", React.createElement("img", {src: "ewm_kd.png"}))
 	    
 			
 	    ), 
 	    React.createElement("hr", null), 
 	    React.createElement("p", null, "© 2015 PX, Inc. ")

 	     )
 	   )
 	   
 	   )
 );
}
}); 

//end login


