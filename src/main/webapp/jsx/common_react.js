//userinfo reg
var Div_userinfo_reg = React.createClass({ 
	
	render: function() {
	return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>老师注册</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		    <form id="regform" method="post" className="am-form">
		     <input type="hidden" name="type"  value="1"/>
		    <div className="am-form-group">
		    
		    <select id="reg_group_uuid" name="group_uuid" data-am-selected="{btnSize: 'sm'}" >
		      {this.props.group_list.map(function(event) {
		          return (<option value={event.uuid} >{event.company_name}</option>);
		        })}
		      </select>
		        </div>
		      
		      <label htmlFor="tel">手机号码:</label>
		      <input type="text" name="tel" id="tel"  placeholder=""/>
		      <br/>
		      <label htmlFor="name">昵称:</label>
		      <input type="text" name="name" id="name"  placeholder="必填，不超过15位"/>
		      <br/>
		       <label htmlFor="">Email:</label>
		      <input type="email" name="email" id="email"  placeholder="输入邮箱" placeholder=""/>
		      <br/>
		      <label htmlFor="password">密码:</label>
		      <input type="password" name="password" id="password"  />
		      <br/>
		      
		      <label htmlFor="password1">重复密码:</label>
		      <input type="password" name="password1" id="password1" />
		      <br/>
		      <button type="button" onClick={ajax_userinfo_reg} className="am-btn am-btn-primary">注册</button>
		      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>
		    </form>
		    <hr/>
		  
		  </div>
		</div>
		</div>
	);
	}
}); 

//userinfo reg end

//kd group reg
var Div_kd_group_reg = React.createClass({ 
	
	render: function() {
	return (
		<div>
			<div className="header">
			  <div className="am-g">
			    <h1>幼儿园注册</h1>
			  </div>
			  <hr/>
			</div>
			<div className="am-g">
			  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
			    <form id="kd_group_reg_form" method="post" className="am-form">
			    <input type="hidden" name="type"  value="1"/>
			      <label htmlFor="brand_name">品牌名:</label>
			      <input type="text" name="brand_name" id="brand_name"  placeholder="必填，不超过45位"/>
			      <br/>
			       <label htmlFor="company_name">机构全称:</label>
			      <input type="text" name="company_name" id="company_name"  placeholder="必填，不超过45位"/>
			      <br/>
			       <label htmlFor="address">公司地址:</label>
			      <input type="text" name="address" id="address"  placeholder="必填，不超过64位"/>
			      <br/>
			       <label htmlFor="map_point">地址坐标:</label>
			      <input type="text" name="map_point" id="map_point"  placeholder="拾取坐标后，复制到这里。格式：1.1,1.1" /> 
			      <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">坐标拾取</a>
			      <br/>
			       <label htmlFor="link_tel">公司电话:</label>
			      <input type="text" name="link_tel" id="link_tel"  placeholder=""/>
			      <br/>
			      
			      <legend><b>管理人员</b></legend>  
			     
			      <label htmlFor="tel">手机号码:</label>
			      <input type="text" name="tel" id="tel"  placeholder=""/>
			      <br/>
			      <label htmlFor="name">昵称:</label>
			      <input type="text" name="name" id="name"  placeholder="必填，不超过15位" />
			      <br/>
			       <label htmlFor="">Email:</label>
			      <input type="email" name="email" id="email"  placeholder="name@xx.com"/>
			      <br/>
			      <label htmlFor="password">密码:</label>
			      <input type="password" name="password" id="password"  />
			      <br/>
			      
			      <label htmlFor="password1">重复密码:</label>
			      <input type="password" name="password1" id="password1"  />
			      <br/>
			      <button type="button" onClick={ajax_kd_group_reg} className="am-btn am-btn-primary">注册</button>
			      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>
			     </form>
			    <hr/>
			  
			  </div>
			</div>
		</div>
	);
	}
}); 

//kd group reg end

//login
var Div_login = React.createClass({ 
	 getInitialState: function() {
		    return this.props;
		  },
	 handleChange: function(event) {
		 var o=$('#login_form').serializeJson();
		 	o.pw_checked=cbox.prop("checked")?"checked":"";
		    this.setState();
	  },
render: function() {
	  var o = this.state;
 return (
 		<div>
 		<div className="header">
 		  <div className="am-g">
 		 <h1>幼儿园老师登录</h1>
 	    <p>PX Background Management System<br/>快捷管理，大数据分析</p>
 		  </div>
 		  <hr />
 		</div>
 		<div className="am-g">
 		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
 		 <form id="login_form" method="post" className="am-form">
 	      <label htmlFor="loginname">手机号:</label>
 	      <input type="text" name="loginname" id="loginname" value={o.loginname} onChange={this.handleChange}/>
 	      <br/>
 	      <label htmlFor="password">密码:</label>
 	      <input type="password" name="password" id="password" value={o.password} onChange={this.handleChange}/>
 	      <br/>
 	      <label htmlFor="pw_checked">
 	        <input id="pw_checked" name="pw_checked" type="checkbox"  checked={o.pw_checked=="checked"?"checked":""} onChange={this.handleChange}/>
 	        记住密码
 	      </label>
 	      <br />
 	      <div className="am-cf">
 	        <input id="btn_login" onClick={ajax_userinfo_login} type="button" name="" value="登 录" className="am-btn am-btn-primary am-btn-sm am-fl" />
 	        <input type="button" name="" value="忘记密码 ^_^? " className="am-btn am-btn-default am-btn-sm am-fr" />
 	      </div>
 	      <a  href="javascript:menu_kd_group_reg_fn();" >幼儿园注册</a>|
 	     <a  href="javascript:menu_userinfo_reg_fn();" >老师注册</a>
 	      <br/>
 	      
 	     <a  href="http://120.25.248.31/px-rest/kd/" > <img src="ewm_kd.png" /></a>
 	    
 			
 	    </form>
 	    <hr/>
 	    <p>© 2015 PX, Inc. </p>

 	     </div> 
 	   </div>
 	   
 	   </div>
 );
}
}); 

//end login


