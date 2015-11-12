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
var Div_kd_group_reg = React.createClass({ 	
	  componentDidMount:function(){
		  this.setProvCity();
},
setProvCity:function(){  
	   var thit=this;
	   var url="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js";
	 loadJS(url,function(){
		 if(remote_ip_info){
			 $("input[name='prov']").val(remote_ip_info.province);
			 $("input[name='city']").val(remote_ip_info.city);
		 }
	 });
},
	render: function() {
		var o=this.state;
		var one_classDiv= "am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
		var two_classDiv= "am-u-lg-10 am-u-md-10 am-u-sm-8";
	return (			
			   <div>		
				
			     <form id="kd_group_reg_form" method="post" className="am-form">
			        <PxInput type="select" name="type">
					  <option value="1">幼儿园注册</option>
					  <option value="2">教育机构注册</option>
					</PxInput>
			       <div className= "am-form-group">			    
				  <label className={one_classDiv}>品牌名:</label>
				 <div className={two_classDiv}>
				<PxInput type="text" name="brand_name" id="brand_name"  placeholder="必填，不超过45位"/>
			   </div>					
			    <label className={one_classDiv}>机构全称:</label>
				 <div className={two_classDiv}>
			      <PxInput type="text" name="company_name" id="company_name"  placeholder="必填，不超过45位"/>
				   </div>	
			  		    <label className={one_classDiv }>省:</label>
		    		 <div className={two_classDiv }>
		    	      <PxInput  type="text" name="prov" id="prov"  placeholder=""/>
		    	       </div> 		
				    <label className={one_classDiv }>市:</label>
		    		 <div className={two_classDiv }>
		    	      <PxInput  type="text" name="city" id="city"   placeholder=""/>
		    	       </div> 	
			      <label className={one_classDiv}>学校地址:</label>
			     <div className={two_classDiv}>
			    <PxInput type="text" name="address" id="address"  placeholder="必填，不超过64位"/>
			     </div>	
                  <label className={one_classDiv}>地址坐标:</label>
				   <div className={two_classDiv}>
			        <PxInput type="text" name="map_point" id="map_point"  placeholder="拾取坐标后，复制到这里。格式：1.1,1.1" /> 
			         <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">坐标拾取</a>
			          </div>	
					 <label className={one_classDiv}>学校电话:</label>
					<div className={two_classDiv}>
				   <PxInput type="text" name="link_tel" id="link_tel"/>
				  </div>				      
			      <legend><b>管理人员</b></legend>  
                  <label className={one_classDiv}>手机号码:</label>
				   <div className={two_classDiv}>
					<PxInput type="text" name="tel" id="tel"/>
					 <button type="button" onClick={ajax_sms_sendCode.bind(this,"#tel",1)} className="am-btn am-btn-primary">发送验证码</button>
					  </div>	
					   <label className={one_classDiv}>验证码:</label>
					   <div className={two_classDiv}>
					  <PxInput type="text" name="smscode" id="smscode"/>
					 </div>	
					<label className={one_classDiv}>姓名:</label>
				   <div className={two_classDiv}>
				  <PxInput type="text" name="name" id="name"  placeholder="必填，不超过15位" />
				 </div>						
				  <label className={one_classDiv}>Email:</label>
				   <div className={two_classDiv}>
					<PxInput type="email" name="email" id="email"  placeholder="name@xx.com"/>
					 </div>	
                    <label className={one_classDiv}>密码:</label>
				   <div className={two_classDiv}>
				  <PxInput type="password" name="password" id="password"/>
				 </div>	
				  <label className={one_classDiv}>重复密码:</label>
				   <div className={two_classDiv}>
					<PxInput type="password" name="password1" id="password1"/>
					 </div>	
					<br/>
			      <button type="button" onClick={ajax_kd_group_reg} className="am-btn am-btn-primary">注册</button>
			      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>
			     </div>
		        </form>
		       </div>
	);
	}
}); 


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
 		<div>
 		<div className="header">
 		  <div className="am-g">
 		 <img src={hostUrl+"i/denglulogo.png"} width="100px" height="100px"/>
 		  </div>
 		</div>
 		<div className="am-g">
 		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered am-margin-top-sm">
		
 		 <form id="login_form" method="post" className="am-form" onKeyDown={this.handle_onKeyDown}>
			  <PxInput type="select" name="grouptype" value={o.grouptype} onChange={this.handleChange}>
			  <option value="1">幼儿园登录</option>
			  <option value="2">教育机构登录</option>
			</PxInput>
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
 	     <div className="am-cf am-margin-top-sm">
 	      <a href="javascript:void(0);"  onClick={menu_kd_group_reg_fn} className="am-fl">教育机构注册</a>
 	     <a href="javascript:void(0);"  onClick={menu_userinfo_reg_fn} className="am-fr">老师注册</a>
 	      </div>
 	      <br/>
 	     <a href={"index.html?v="+Math.random()}>重新加载</a>
 	     <br/>
 	    </form>
 	    <hr/>
 	   <p>© 2015 成都问界科技有限公司</p>
 	     </div> 
 	   </div>
 	   
 	   </div>
 );
}
}); 


//Div_userinfo_updatePasswordBySms
var Div_userinfo_updatePasswordBySms = React.createClass({ 
	
	render: function() {
	return (
		<div>
		<div className="header">
		  <div className="am-g">
		    <h1>重置密码</h1>
		  </div>
		  <hr />
		</div>
		<div className="am-g">
		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
		    <form id="commonform" method="post" className="am-form" action="javascript:void(0);">

		    <label htmlFor="tel">手机号码:</label>
		      <input type="text" name="tel" id="tel"  placeholder=""/>
		      <button type="button" onClick={ajax_sms_sendCode.bind(this,"#tel",2)} className="am-btn am-btn-primary">发送验证码</button>
		      <br/>
		      <label htmlFor="smscode">验证码:</label>
		      <input type="text" name="smscode" id="smscode"  placeholder="验证码"/>
		    
		      <br/>
		      <label htmlFor="password">密码:</label>
		      <input type="password" name="password"   />
		      <br/>
		      
		      <label htmlFor="password1">重复密码:</label>
		      <input type="password" name="password1"  />
		      <br/>
		      <button type="button" onClick={ajax_userinfo_updatePasswordBySms} className="am-btn am-btn-primary">提交</button>
		      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>
		    </form>
		    <hr/>
		  
		  </div>
		</div>
		</div>
	);
	}
}); 



//、、§§§§§§§§§§§§§§§§§§§§§§§§§§§
/*
* 老师注册（绘制）
* */
var Div_userinfo_reg = React.createClass({ 
	render: function() {
		var one_classDiv= "am-u-lg-2 am-u-md-2 am-u-sm-4 am-form-label";
		var two_classDiv= "am-u-lg-10 am-u-md-10 am-u-sm-8";
	return (
			   <div>
				<div className="header">
				 <div className="am-g">
				  <h1>老师注册</h1>
				 </div>
				<hr />
			   </div>	  
			   <form id="regform" method="post" className="am-form">
		         <PxInput type="hidden" name="type"  value="1"/>
		          <div className= "am-form-group">				       		     
			    <label className={one_classDiv}>手机号码:</label>
				 <div className={two_classDiv}>
				  <PxInput type="text" name="tel" id="tel"/>
                 <button type="button" onClick={ajax_sms_sendCode.bind(this,"#tel",1)} className="am-btn am-btn-primary">发送验证码</button>	     
				    </div>
			       <label className={one_classDiv}>验证码:</label>
				  <div className={two_classDiv}>
				 <PxInput type="text" name="smscode" id="smscode"/>
				</div>				  
				 <label className={one_classDiv}>姓名:</label>
				  <div className={two_classDiv}>
				   <PxInput type="text" name="name" id="name"  placeholder="必填，不超过15位"/>
				    </div>				   
				     <label className={one_classDiv}>Email:</label>
				    <div className={two_classDiv}>
				   <PxInput type="email" name="email" id="email"  placeholder="输入邮箱"/>
				  </div>									  
				   <label className={one_classDiv}>密码:</label>
				    <div className={two_classDiv}>
				     <PxInput type="password" name="password" id="password"/>
				      </div>				  
				     <label className={one_classDiv}>重复密码:</label>
				    <div className={two_classDiv}>
				   <PxInput type="password" name="password1" id="password1"/>
				  </div>			
				 <br/>
			  <AMR_ButtonToolbar>	 
		      <button type="button" onClick={ajax_userinfo_reg} className="am-btn am-btn-primary">注册</button>
		      <button type="button" onClick={menu_userinfo_login_fn} className="am-btn am-btn-primary">返回</button>	      
		      </AMR_ButtonToolbar>
		    </div>
		   </form>	
		  </div>
	);
	}
});
