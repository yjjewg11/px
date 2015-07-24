/**
 * 公布接口,给手机调用
 * 调用选择头像图片,回调方法.
 * G_jsCallBack.selectHeadPic_callback(base64);
 */
var G_jsCallBack={
	
		/**
		 * 调用选择头像图片,回调方法.
		 * @param base64
		 */
	selectHeadPic_callback:function(base64){
		w_uploadImg.base64.ajax_uploadByphone(base64);
	}
}

/**
 * 调用手机方法
 * 调用选择头像图片
 * G_CallPhoneFN.selectHeadPic();
 * G_CallPhoneFN.jsessionToPhone(JSESSIONID);
 */
var G_CallPhoneFN={
	
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
			  console.log('G_CallPhoneFN：', e.message);
		}
		console.log('G_CallPhoneFN：', "false");
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