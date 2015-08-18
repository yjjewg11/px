/**
 * 公布接口,给手机调用
 * 调用选择头像图片,裁剪和调整方向,回调方法.
 * G_jsCallBack.selectHeadPic_callback(base64);
 * 
 * 选择上图图片,回调方法,只压缩和调整方向.
 * G_jsCallBack.selectPic_callback(base64);
 * G_jsCallBack.queryMyTimely_myList()；即时消息
 * G_jsCallBack.userinfo_logout();注销用户
 * G_jsCallBack.user_info_update()修改资料；
 * G_jsCallBack.user_info_updatepassword()；修改密码
 * G_jsCallBack.QueuedoBackFN()；修改密码
 * G_jsCallBack.QueueTeacher()；老师通讯录
 * Store.getCurGroup().uuid
 */
var G_jsCallBack={
		//Queue.doBackFN()
	/**
	 * 老师通讯录
	 * @param base64
	 */
		QueueTeacher:function(base64){
	
		ajax_Teacher_listByGroup(base64);
},	
	/**
	 * 回退方法
	 * @param base64
	 */
		QueuedoBackFN:function(base64){
	
		Queue.doBackFN();
},	
	/**
	 * 修改资料
	 * @param base64
	 */
	user_info_update:function(base64){
	
		menu_userinfo_update_fn();
},
	/**
	 * 修改密码
	 * @param base64
	 */
	user_info_updatepassword:function(base64){
	
		menu_userinfo_updatepassword_fn();
},
		/**
		 * 即时消息
		 * @param base64
		 */
		queryMyTimely_myList:function(base64){
		
			ajax_queryMyTimely_myList();
	},
		/**
		 * 注销用户
		 * @param base64
		 */
		userinfo_logout:function(base64){
		
		menu_userinfo_logout_fn();
	},
		
	/**
	 * 选择上图图片,回调方法,只压缩和调整方向.
	 * @param base64
	 */
	selectPic_callback:function(base64){
		
		w_img_upload_nocut.ajax_uploadByphone(base64);
	},
	
	
	
	/**
	 * 调用选择头像图片,裁剪和调整方向,回调方法.
	 * @param base64
	 */
	selectHeadPic_callback:function(base64){
		//console.log('base64='+ base64);
		w_uploadImg.ajax_uploadByphone(base64);
	}
}

/**
 * 调用手机方法
 * 调用选择头像图片.剪切图片为198*198,并可以调整方向
 * G_CallPhoneFN.selectHeadPic();
 * 调用上传图片,要求不剪切,只压缩在800k以内,并可以调整方向
 * G_CallPhoneFN.selectImgPic();
 * 判断是否是手机app应用内嵌调用
 * G_CallPhoneFN.isPhoneApp();
 * 隐藏应用的弹出的加载层.
 * G_CallPhoneFN.hideLoadingDialog();
 * 登录后,将sessionid传给手机
 * G_CallPhoneFN.jsessionToPhone(JSESSIONID);
 * G_CallPhoneFN.finishProject();
 * 手机回退按键退到最后调用此方法是否是要退出了;
 
window.JavaScriptCall={
		selectImgPic:function(){alert("ddd");},
		jsessionToPhone:function(){}
};*/
var G_CallPhoneFN={
	
		/**
		 * 判断是否是手机app应用内嵌调用
		 * @returns {Boolean}
		 */
		isPhoneApp:function(){
			if(window.JavaScriptCall){
				return true;
			}
			return false;
		},
		/**
		 * 回退方法finishProject()

		 * @returns {Boolean}
		 */
		finishProject:function(){
			try{
				if(window.JavaScriptCall){
					JavaScriptCall.finishProject();					
					return true;
				}
			}catch(e){
				  console.log('Exception:JavaScriptCall.finishProject()=', e.message);
			}
			console.log('window.finishProject==false');
			return false;
		},
		/**
		 * 隐藏应用的弹出的加载层.
		 * @returns {Boolean}
		 */
		hideLoadingDialog:function(){
			try{
				if(window.JavaScriptCall){
					JavaScriptCall.hideLoadingDialog();
					return true;
				}
			}catch(e){
				  console.log('Exception:JavaScriptCall.hideLoadingDialog()=', e.message);
			}
			console.log('window.hideLoadingDialog==false');
			return false;
		},
		/**
		 * 调用选择上传图片的回调
		 * @returns {Boolean}
		 */
		selectImgPic:function(){
			try{
				if(window.JavaScriptCall){
					JavaScriptCall.selectImgPic();
					return true;
				}
			}catch(e){
				  console.log('Exception:JavaScriptCall.selectImgPic()=', e.message);
			}
			console.log('window.selectImgPic==false');
			return false;
		},
	/**
	 * 调用选择头像图片
	 * @returns {Boolean}
	 */
	selectHeadPic:function(){
		try{
			if(window.JavaScriptCall){
				JavaScriptCall.selectHeadPic();
				return true;
			}
		}catch(e){
			  console.log('Exception:JavaScriptCall.selectHeadPic()=', e.message);
		}
		console.log('window.JavaScriptCall==false');
		return false;
	},
	/**
	 * JSESSIONID=C483CC4E6FECB6F6267591D624704A86
	 */
	jsessionToPhone:function(sessionid){
		try{
			if(window.JavaScriptCall){
				JavaScriptCall.jsessionToPhone(sessionid);
				return true;
			}
		}catch(e){
			  console.log('G_CallPhoneFN：', e.message);
		}
		console.log('G_CallPhoneFN：', "false");
		return false;
	}
}