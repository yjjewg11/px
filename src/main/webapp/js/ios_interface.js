/**
 * 第1步,启用ios模式.
 * G_jsCallBack.setIosApp();//设置为ios调用模式,给ios使用.
 * 
 * 
 * 调用手机方法
 * 1.调用选择头像图片.剪切图片为198*198,并可以调整方向
 * G_CallPhoneFN.selectHeadPic();
 * 调用:ios/selectHeadPic
 ** G_jsCallBack.selectHeadPic_callback_imgUrl(imgUrl,uuid); 调用选择头像图片,裁剪和调整方向,回调方法.返回图片地址和uuid。
 * 2.调用上传图片,要求不剪切,只压缩在800k以内,并可以调整方向
 * G_CallPhoneFN.selectImgPic();
 * 调用:ios/selectImgPic
 * G_jsCallBack.selectPic_callback_imgUrl(imgUrl,uuid);选择上图图片,回调方法,只压缩和调整方向.手机上传成功后，返回图片地址和uuid

 * 判断是否是手机app应用内嵌调用.(要求ios 启动是,设置标志)
 * G_CallPhoneFN.isPhoneApp();
 * 隐藏应用的弹出的加载层.
 * G_CallPhoneFN.hideLoadingDialog();
 * 登录后,将sessionid传给手机
 * G_CallPhoneFN.jsessionToPhone(JSESSIONID);
 * 调用:ios/jsessionToPhone/{JSESSIONID}
 * 回调:不回调
 * G_CallPhoneFN.finishProject();
 * 手机回退按键退到最后调用此方法是否是要退出了;
 
 G_CallIosFN.init();
window.JavaScriptCall={
		selectImgPic:function(){alert("ddd");},
		jsessionToPhone:function(){}
};*/
var G_CallIosFN={
	iosIfr:null,
	isIos:false,
	init:function(){
		G_CallIosFN.isIos=true;
		console.log('G_CallIosFN.isIos==true');
		if(!G_CallIosFN.iosIfr){
			var t=document.createElement('iframe');
			t.style.display = 'none';  
			document.documentElement.appendChild(t);
			this.iosIfr=t;
		}
	},
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
				G_CallIosFN.iosIfr.src = "ios/selectImgPic";    
				return true;
			}catch(e){
				  console.log('Exception:ios/selectImgPic', e.message);
			}
			console.log('ios/selectImgPics=false');
			return false;
		},
	/**
	 * 调用选择头像图片
	 * @returns {Boolean}
	 */
	selectHeadPic:function(){
		try{
			G_CallIosFN.iosIfr.src = "ios/selectHeadPic";    
			return true;
		}catch(e){
			  console.log('Exception:ios/selectHeadPic', e.message);
		}
		console.log('ios/selectHeadPic==false');
		return false;
	},
	/**
	 * JSESSIONID=C483CC4E6FECB6F6267591D624704A86
	 * ios/sessionid/C483CC4E6FECB6F6267591D624704A86
	 */
	jsessionToPhone:function(sessionid){
		try{
			G_CallIosFN.iosIfr.src = "ios/sessionid/"+sessionid;    
			return true;
		}catch(e){
			  console.log('Exception:ios/sessionid', e.message);
		}
		console.log("ios/sessionid/"+sessionid+'i==false');
		
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