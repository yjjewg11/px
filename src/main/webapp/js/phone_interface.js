/**
 * 公布接口,给手机调用
 * G_jsCallBack.setIosApp();//设置为ios调用模式,给ios使用.
 * 调用选择头像图片,裁剪和调整方向,回调方法.
 * G_jsCallBack.selectHeadPic_callback(base64);
 * 
 * 选择上图图片,回调方法,只压缩和调整方向.
 * G_jsCallBack.selectPic_callback(base64);
 * G_jsCallBack.queryMyTimely_myList()；即时消息
 * G_jsCallBack.userinfo_logout();注销用户
 * G_jsCallBack.user_info_update()修改资料；
 * G_jsCallBack.user_info_updatepassword()；修改密码
 * G_jsCallBack.QueuedoBackFN();//回退
 * G_jsCallBack.QueueTeacher();老师通讯录
 * G_jsCallBack.selectPic_callback_imgUrl(imgUrl,uuid);选择上图图片,回调方法,只压缩和调整方向.手机上传成功后，返回图片地址和uuid
 * G_jsCallBack.selectHeadPic_callback_imgUrl(imgUrl,uuid); 调用选择头像图片,裁剪和调整方向,回调方法.返回图片地址和uuid。
 * Store.getCurGroup().uuid
 * 
 * 
 *  *调用新开webview访问地址.并右上角添加分享功能.
 *G_CallPhoneFN.openNewWindowUrl(title,title,pathurl,httpurl);	
 *参数说明: titll为标题  content为分享内容，pathurl为分享图片地址，httpurl为链接地址
 */
var G_jsCallBack={
	/**
	 * ios_app特殊处理.
	 */
	setIosApp:function(){
		G_CallIosFN.init();
		return true;
		
	},
	/**
	 * 
	 *1. G_jsCallBack.setIosApp_canShareURL();
	 * 设置允许javascript调用ios提供的分享接口.
	 * 
	 * 2.js调用接口.
	 */
	setIosApp_canShareURL:function(){
		G_CallIosFN.canShareUrl=true;
		return true;
		
	},
	/**
	 * 获取json字符串.
	 */
	getShareObject:function(){
		return G_CallIosFN.shareobject;
	},
	/**
	 * 老师通讯录
	 * @param base64
	 */
		QueueTeacher:function(){
			menu_Teacher_tel_fn();
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
	 * 选择上图图片,回调方法,只压缩和调整方向.手机上传成功后，返回图片地址和uuid。
	 * selectPic_callback和selectPic_callback_callback_imgUrl只能选择一个来调用
	 * @param imgUrl：格式：图片地址
	 * @param uuid
	 */
	
	selectPic_callback_imgUrl:function(imgUrl,uuid){
		
		w_img_upload_nocut.callbackFN(imgUrl,uuid);
	},
	
	/**
	 * 调用选择头像图片,裁剪和调整方向,回调方法.
	 * @param base64
	 */
	selectHeadPic_callback:function(base64){
		//console.log('base64='+ base64);
		w_uploadImg.ajax_uploadByphone(base64);
	},
	/**
	 * 调用选择头像图片,裁剪和调整方向,回调方法.返回图片地址和uuid。
	 * selectHeadPic_callback和selectHeadPic_callback_imgUrl只能选择一个来调用
	 * @param base64
	 */
	selectHeadPic_callback_imgUrl:function(imgUrl,uuid){
		w_uploadImg.callbackFN(imgUrl,uuid);
	}
};

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
 * 手机回退按键退到最后调用此方法是否是要退出了;
 * G_CallPhoneFN.finishProject();
 * 
 * 

	 * 
	 * G_CallPhoneFN.setDoBackFN();
	 * JavaScriptCall.setDoBackFN("javascript:G_jsCallBack.QueuedoBackFN();");
	 * 设置andorid webview 回退按钮,指定方法.
	 * 判断逻辑.1.加载页面过程,js调用方法通知webview启用js回退方法.并注册js回退方法.JavaScriptCall.setDoBackFN("javascript:G_jsCallBack.QueuedoBackFN();");
	 * 1.1 如果没有注册则按照原逻辑处理.
	 * 2.如果有则优先调用该js回退方法执行.
	 * 3.如果该js回退已经退到最后异步时,会调用webview注册事件,JavaScriptCall.finishProject();收到这个消息后,则走正常逻辑.
	 * 
* 返回jsessionid
 * G_CallPhoneFN.getJsessionid();
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
			if(window.JavaScriptCall||G_CallIosFN.isIos){
				return true;
			}
			return false;
		},
		/**
		 * 判断是否是手机app应用内嵌调用
		 * @returns {Boolean}
		 */
		isAndorid:function(){
			if(window.JavaScriptCall){
				return true;
			}
			return false;
		},
		/**
		 * 判断是否是手机app应用内嵌调用
		 * @returns {Boolean}
		 */
		isIos:function(){
			if(G_CallIosFN.isIos){
				return true;
			}
			return false;
		},
		/**
		 * 
		 * G_CallPhoneFN.canShareUrl();
		 * 判断是否能分享.
		 * @returns {Boolean}
		 */
		canShareUrl:function(){
			//andorid 手机允许分享
			if(G_CallPhoneFN.isAndorid()){
				return true;
			}
			//ios开发接口允许分享
			if(G_CallIosFN.canShareUrl){
				return true;
			}
			return false;
		},
		/**
          *网页内容分享回调接口方法  
          *setShareContent(title,content,pathurl,httpurl) 
          *参数说明: titll为标题  content为分享内容，pathurl为分享图片地址，httpurl为链接地址
          *tml有问题暂时用title代替后续优化 
		 */
		setShareContent:function(title,content,pathurl,httpurl){
			if(!pathurl)pathurl=G_share_logo;
			
			
			
			
			try{
				if(G_CallIosFN.canShareUrl){
					 G_CallIosFN.setShareContent(title,content,pathurl,httpurl)
					return true;
				}
				
				if(window.JavaScriptCall){					
					JavaScriptCall.setShareContent(title,content,pathurl,httpurl) ;					
					return true;
				}
			}catch(e){
				  console.log('Exception:JavaScriptCall.finishProject()=', e.message);
			}
			console.log('window.finishProject==false');
			return false;
		},
		
		/**
         *调用新开webview访问地址.并右上角添加分享功能.
         *G_CallPhoneFN.openNewWindowUrl(title,title,pathurl,httpurl);	
         *参数说明: title为标题,content为分享内容，pathurl为分享图片地址，httpurl为链接地址
         *tml有问题暂时用title代替后续优化 
		 */
		openNewWindowUrl:function(title,content,pathurl,httpurl){
			if(!pathurl)pathurl=G_share_logo;
			try{
				if(G_CallIosFN.canShareUrl){
					 G_CallIosFN.openNewWindowUrl(title,content,pathurl,httpurl)
					return true;
				}
				
				if(window.JavaScriptCall){
					if(!pathurl)pathurl=G_logo;
					JavaScriptCall.openNewWindowUrl(title,content,pathurl,httpurl) ;					
					return true;
				}
			}catch(e){
				  console.log('Exception:JavaScriptCall.finishProject()=', e.message);
			}
			console.log('window.finishProject==false');
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
				
				if(G_CallIosFN.isIos){
					G_CallIosFN.selectImgPic();
					return true;
				}
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
			
			if(G_CallIosFN.isIos){
				G_CallIosFN.selectHeadPic();
				return true;
			}
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
	 * 
	 * 
	 * JavaScriptCall.setDoBackFN("javascript:G_jsCallBack.QueuedoBackFN();");
	 * 设置andorid webview 回退按钮,指定方法.
	 * 判断逻辑.1.加载页面过程,js调用方法通知webview启用js回退方法.并注册js回退方法.JavaScriptCall.setDoBackFN("javascript:G_jsCallBack.QueuedoBackFN();");
	 * 1.1 如果没有注册则按照原逻辑处理.
	 * 2.如果有则优先调用该js回退方法执行.
	 * 3.如果该js回退已经退到最后异步时,会调用webview注册事件,JavaScriptCall.finishProject();收到这个消息后,则走正常逻辑.
	 */
	setDoBackFN:function(){
		try{
			
			//if(G_CallIosFN.isIos){
				//G_CallIosFN.setDoBackFN(sessionid);
				//return true;
			//}
			if(window.JavaScriptCall){
				JavaScriptCall.setDoBackFN("javascript:G_jsCallBack.QueuedoBackFN();");
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
			
			if(G_CallIosFN.isIos){
				G_CallIosFN.jsessionToPhone(sessionid);
				return true;
			}
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
//向手机app注册回退事件.
G_CallPhoneFN.setDoBackFN();