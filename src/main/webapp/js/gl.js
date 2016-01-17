/**
 * 
 * G_textToHTML(s);纯文本转成HTML格式显示用
 * G_week.   //日期转换 星期对象
 * 
 *模拟回退操作
 * Queue.doBackFN();
 * Queue.push(fn);
 * 
 * 编辑器公共配置
 * xhEditor_
 * 不能压缩,导致全局变量被压缩
 */
//判断访问终端
/**
 * browser.versions.iPhone
 */
var browser={
    versions:function(){
        var u =navigator.userAgent,app = navigator.appVersion;
        return {
          
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1  //是否为iPhone或者QQHD浏览器
        };
    }()
};
(function($){
$.fn.serializeJson=function(){
var serializeObj={};
$(this.serializeArray()).each(function(){
	if(this.name)
		serializeObj[this.name]=this.value;
});
return serializeObj;
};


$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

})(jQuery);
window.G_group_wjd="group_wjd";
window.hostUrl='/px-rest/';
window.hostUrlCDN='/px-rest/';
window.hostUrlCDN='http://img.wenjienet.com/';
window.G_logo=hostUrlCDN+"i/logo.png";
window.G_share_logo=hostUrlCDN+"i/share_logo.png";



window.G_def_headImgPath=hostUrlCDN+"i/header.png";
window.G_def_noImgPath=hostUrlCDN+"i/KD_header.png";
//取消G_imgPath
window.G_imgPath=hostUrl+"rest/uploadFile/getImgFile?uuid=";
G_imgPath="";

/**
 * 获取头像,没有则取默认
 */
window.G_getHeadImg=function(s){
	if(s)return s;
	return G_def_headImgPath;
}


Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}
/**
 * 判断用户是否有该权限.(任意一个学校有即可)
 * @param m
 */
function G_user_hasRight(s){
	console.log("权限判断参数S",s);

	var list=null;
	if(typeof(PxRight)!= "undefined"&&PxRight.getUserRights){
		list=PxRight.getUserRights();
	}else{
		list=Store.getUserRights();
	}
	if(!list)return false;
	for(var i=0;i<list.length;i++){
		if(list[i][1]==s)return true;
	}
	return false;
}

/**
 * 判断用户在某国幼儿园下是否有该权限.
 * @param m
 */
function G_user_hasRightByGroupuuid(s,groupuuid){
	//list<[groupuuid,rightname]>
	var list=null;
	if(PxRight&&PxRight.getUserRights){
		list=PxRight.getUserRights();
	}else{
		list=Store.getUserRights();
	}
	if(!list)return false;
	for(var i=0;i<list.length;i++){
		if(groupuuid==list[i][0]&&list[i][1]==s)return true;
	}
	return false;
}



/**
 * 判断用户状态是否正常.0:表示正常,其他都是异常情况,异常帐号,只有最少权限.
 * @param m
 */
function G_user_status_normal(){
	
	if(Store.getUserinfo()&&Store.getUserinfo().disable==0){
		return true;
	}
	return false;
}
$.AMUI.progress.start=function(){
	$("#div_loading").show();
}
$.AMUI.progress.done=function(){
	$("#div_loading").hide();
}
/**
 * 成功消息提示,3秒后消失
 * @param m
 */
function G_msg_pop(m){
	$("#div_msg_pop").html("提示:"+m);
	//$("#div_msg_pop").css("top",(100+$(document).scrollTop())+"px");
	
	$("#div_msg_pop").show();
	setTimeout(function(){$("#div_msg_pop").hide()},3000);
}
function G_getDateYMD(s){
	//2015-07-04 00:00:00=>2015-07-04
	if(!s)return "";
	return s.split(" ")[0];
}
/**
 * 加载图片的地方执行一次。
 * 不传参数，则所有img替换。
 */
function G_img_down404(jquery_name){
	if(!jquery_name)jquery_name="img";
	$(jquery_name).error(function(){
		 $(this).attr("alt","图片不存在！");
		});
}

//登录失败跳转登录界面
function G_resMsg_filter(ResMsg){
	if("sessionTimeout"==ResMsg.status){
		//window.location = hostUrl + "login.html";
		menu_userinfo_login_fn();
	}
}

/**
var week; 
if(new Date().getDay()==0) week="星期日"
if(new Date().getDay()==1) week="星期一"
if(new Date().getDay()==2) week="星期二" 
if(new Date().getDay()==3) week="星期三"
if(new Date().getDay()==4) week="星期四"
if(new Date().getDay()==5) week="星期五"
if(new Date().getDay()==6) week="星期六"
86400000=24小时*60分*60秒+1000毫秒=1天
 */
var G_week={
		x:["星期日", "星期一", "星期二","星期三","星期四", "星期五","星期六"],
		/**
		 * 
		 * @param d Date
		 * @returns
		 */
	getWeekDayByDate:function(d){
		return d.getDay();
	},
	getWeekStr:function(d){
		if(d==null||d=="")return "";
		if(typeof(d)=='string'){
			// '2011-06-07 10:00:00'.replace(/-/ig,'/'); 
			var nd = d.replace(/-/ig,'/'); 
			d= new Date(nd); 
		}
		return G_week.x[d.getDay()];
	},
	
	getDate:function(now,days){
		   //var now=new Date();   
		   return new Date(now.getTime()+86400000*days); 
	},
	getDateStr:function(now,days){
		if(typeof(now)=='string'){
				now= now.replace(/-/ig,'/'); 
				now= new Date(now); 
			}
		   now=new Date(now.getTime()+86400000*days); 
		   var yyyy=now.getFullYear(),mm=(now.getMonth()+1).toString(),dd=now.getDate().toString();   
		   if(mm.length==1){mm='0'+mm;} if(dd.length==1){dd='0'+dd;}
		   return (yyyy+'-'+mm+'-'+dd);        
		  },
		  //获取当前时间前个星期天.星期天是0.修改为星期1
	getWeek0:function(d){
		var t=G_week.getWeekDayByDate(d);
		if(t==0)t=-6;
		else t=1-t;
		return G_week.getDateStr(d,t);
	},
	//获取当前时间后个星期6..修改为星期7
	getWeek6:function(d){
		var t=G_week.getWeekDayByDate(d);
		if(t>0)t=7-t;
		return G_week.getDateStr(d, t);
	}
};
/**
 * 根据当前时间,获取学期开始日期
 * 2015-02-01
 * 2015-09-01
 * 
 */
function G_getSchoolDate() {
	var d=new Date();
	var cY=d.getFullYear();

	var cM=d.getMonth() + 1;
	d.setDate(1);	
	if(cM<=2){//则返回上年9月.
		d.setFullYear(cY-1);	
		d.setMonth(9-1);	
		
	}else if(cM<9){//则返回今年年2月.
		//d.setFullYear(cY);	
		d.setMonth(2-1);	
	}else if(cM>=9){//则返回今年年2月.
		//d.setFullYear(cY);	
		d.setMonth(9-1);	
	}
	
	return d.format("yyyy-MM-dd");
}

/**
 * 加减月份

 */
function G_addMonth(yyyy_MM, num) {
	var yyyy_mmArr= yyyy_MM.split("-");
	if(yyyy_mmArr.length!=2){		
		return yyyy_MM;
	}
	var sYear =parseInt(yyyy_mmArr[0]);
	var sMonth = parseInt(yyyy_mmArr[1]);

	 
	var eYear = sYear;
	var eMonth = sMonth + num;
	
	while (eMonth > 12) {
	eYear++;
	eMonth -= 12;
	}
	while (eMonth <= 0) {
		eYear--;
		eMonth += 12;
		}
	 
	 if(eMonth<10)eMonth="0"+eMonth;
	return eYear+"-"+eMonth;
}

/**
 * 传入年份和月份参数， 根据参数，获取到 该月 哪些天是周六，哪些天是周日。
 * @param y
 * @param m
 */
function G_getMonthXinqi67(y,m){
    var tempTime = new Date(y,m,0);
    var time = new Date();
    var xinqi67 = [];
    for(var i=1;i<=tempTime.getDate();i++){
        time.setFullYear(y,m-1,i);
        var day = time.getDay();
        if(day == 6){
        	xinqi67.push(i);
        }else if(day == 0){
        	xinqi67.push(i);
        }
    }
    return xinqi67;
}
function    G_textToHTML(str)  
{  
      var    s    =    "<p>";  
      if    (!str)    return    "<p></p>";  
      s    =    str.replace(/&/g,    "&gt;");  
      s    =    s.replace(/ </g,        "&lt;");  
      s    =    s.replace(/>/g,        "&gt;");  
      s    =    s.replace(/    /g,        "&nbsp;");  
      s    =    s.replace(/\'/g,      "'");  
      s    =    s.replace(/\"/g,      "&quot;");  
      s    =    s.replace(/\n/g,      " <br>");
      s    =   s+ "</p>"; 
      return    s;  
}  

/**
 * 异步加载js
 * @param url
 * @param callback
 * @param charset
 */
function loadJS(url,callback,charset)
{
	var script = document.createElement('script');
	if (script.readyState){ //IE 
		script.onreadystatechange = function(){ 
		if (script.readyState == "loaded" || 
			script.readyState == "complete"){ 
			
			script.onreadystatechange = null; 
			
			if(typeof callback  =='function')callback(); 
			
		} 
		}; 
	} else { //Others: Firefox, Safari, Chrome, and Opera 
		script.onload = function(){ 
			if(typeof callback  =='function')callback(); 
		}; 
	} 
	script.charset=charset || document.charset || document.characterSet;
	script.src = url;
	try {document.getElementsByTagName("head")[0].appendChild(script);} catch (e) {}
}
/**
 * 同步加载js,不允许跨域
 * @param url
 * @param callback
 * @param charset
 */
function loadJSAsy(url,callback,charset)
{
	$.ajax({
		type : "GET",
		url : url,
		dataType : "text",
		contentType : false, 
		async:false,
		success : function(data) {
			var script = document.createElement('script');
			script.language = "javascript";

			script.type = "text/javascript";

			script.id = url;

			script.defer = true;
			script.charset=charset || document.charset || document.characterSet;
			script.text = data; 
			try {document.getElementsByTagName("head")[0].appendChild(script);} catch (e) {}
		},
		error : G_ajax_error_fn
	});
	
	if(typeof callback  =='function')callback(); 
}

/**
 * Queue.doBackFN();
 * Queue.push(fn);
 */
window.Queue={
		body_scrollTop:0,
		isBack:false,
		homePageFn:null,//设置主页,防止一直退回后,退回不到主页bug
		/**
		 * 如果是点击显示原图模式,回退时,操作是关闭原图
		 * @returns {Boolean}
		 */
		galleryDobackFN:function(){
			//原图显示状态,优先退后.
			if($(".am-pureview:visible").size()>0){
				$(".am-pureview:visible").removeClass("am-active");
				$(".am-pureview-slider >li").removeClass("am-active");
				$("body").removeClass("am-pureview-active");
				$(".am-pureview:visible").hide();
				return true;
			}
			if($("#div_body:visible").size()==0){
				$("html,body").animate({scrollTop:Queue.body_scrollTop},200);
				Queue.body_scrollTop=0;
				body_show();
				
				//如果第1级没内容,返回false,继续执行回退方法.否则不继续执行.
				if($("#div_body").text()==""){
					return false;
				}
			
				return true;
			}
			return false;
		},
		doBackFN:function(){
			if(Queue.galleryDobackFN())return;
			
			//If it is not back after the operation, first throw away the current operation. To perform the last operation.
			if(!this.isBack)this.pop();
			this.isBack=true;
			if(this.arr.length==0){
				G_CallPhoneFN.finishProject();
				if(typeof Queue.homePageFn=='function')Queue.homePageFn();
				return;
			}
			var tmp=this.pop();
			
			body_show();
			if(tmp&&typeof tmp=='function'){
				tmp();
			}
		},
		arr:[],
		clear:function(){
			this.arr=[];
		},
		push:function(o,title){        
			G_clear_pureview();
			if(typeof title_info_init=='function')title_info_init(title);// 绘制标头方法
			 this.isBack=false;
			 if(this.arr.length>50){
				 this.arr=this.arr.slice(40);//防止内存异常,最多保留50个.
			 }else if(this.arr.length==0){//解决0的情况下,点击后,再次回退可以,退到首页.
				 if(typeof menu_dohome=='function')  this.arr.push(menu_dohome);
			 }
			 //same operation ,no add
			 // if(this.arr.length==0||this.arr[this.arr.length-1].name!=o.name)
				  this.arr.push(o);
		},
		pop:function(){
			  if (this.arr.length == 0)  
		            return null;  
		        else  
		            return this.arr.pop();  
		}	
}

//Xheditor增加插入音频文件插件
var pxXheditorPlugin={
		add_Media_forCommons:{c:'xheIcon xheBtnMedia',t:'网络视频',s:null,h:1,e:function(){
			var _this=this;
			
			var jTest=$('<div><textarea id="input_add_Media_forCommons" style="width:100%;height:100px;"></textarea></div><div style="text-align:right;"><input type="button" id="xheSave" value="确定" /></div><div>添加网络视频通用代码:<br/>1、点击分享按钮，展开弹出框<br/>2、点击弹出框下方小箭头，展开通用代码项,复制Html代码.<br/>3.修改高度和宽度为100%.已适应手机屏幕,设置如下:height="100%" width="100%"</div>');
			var jTestInput=$('#input_add_Media_forCommons',jTest),jSave=$('#xheSave',jTest);
			jSave.click(function(){
				var tmp=jTestInput.val();
				if(!tmp)return false;
				_this.loadBookmark();
				_this.pasteHTML(tmp);
				_this.hidePanel();
				return false;	
			});
			_this.saveBookmark();
			_this.showDialog(jTest);
		}},
		add_audio:{c:'xheditor_add_audio',t:'音频文件',s:null,h:1,e:function(){
			var _this=this;

			var jTest=$('<div><label for="xheImgUrl">音频文件: </label><input type="text" id="input_add_audio_src" value="http://" class="xheText" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="确定" /></div>');
			var jTestInput=$('#input_add_audio_src',jTest),jSave=$('#xheSave',jTest);
			jSave.click(function(){
				var tmp=jTestInput.val();
				if(!tmp||tmp=="http://")return false;
				_this.loadBookmark();
				_this.pasteHTML('<audio src="'+tmp+'" controls="controls"  autoplay="autoplay"></audio>');
				_this.hidePanel();
				return false;	
			});
			_this.saveBookmark();
			_this.showDialog(jTest);
		}}
	};


window.xhEditor_upImgOption_mfull={
		plugins:pxXheditorPlugin,
	    upMultiple:false,
		upImgUrl:  hostUrl + "rest/uploadFile/xheditorUpload.json",
		onUpload:xhEditor_insertUpload,
		html5Upload:false,
		height:'500',
		//tools:'mfull',
		tools:'Cut,Copy,Paste,Pastetext,|,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,|,Align,List,Outdent,Indent,|,Link,Unlink,Anchor,Img,Flash,add_Media_forCommons,add_audio,Hr,Emot,Table,|,Source,Preview,Print,Fullscreen',
		urlType:'abs'
	};
window.xhEditor_upImgOption={
    upMultiple:false,
	upImgUrl:  hostUrl + "rest/uploadFile/xheditorUpload.json",
	onUpload:xhEditor_insertUpload,
	html5Upload:false,
	tools:'simple',
	urlType:'abs'
};
window.xhEditor_upImgOption_emot={

		tools:'Emot',
		cleanPaste:3,
		urlType:'abs'
	};
window.xhEditor_classnews_emot={

		tools:'Emot,Fullscreen',
		cleanPaste:3,
		urlType:'abs'
	};
//xhEditor编辑器图片上传回调函数
function xhEditor_insertUpload(msg) {
	msg=G_imgPath+msg[0];
	//$("#xh_editor").append(msg);
}

function G_ajax_error_fn( obj, textStatus, errorThrown ){
	$.AMUI.progress.done();
	if(obj.responseText&&obj.responseText.indexOf("G_key_no_connect_server")){
		alert("没连接上互联网.");
	}else{
		alert(obj.status+","+textStatus+"="+errorThrown);
	}
	 console.log(',ajax_error：', obj.status+","+textStatus+"="+errorThrown);
}

/**
 * 卸载原图显示用的div,防止内存溢出
 */
function G_clear_pureview(){
	$(".am-pureview").remove();
}

window.G_Check={
	formateDate:function(d1){
		if(!d1)return d1;
		d1=d1.replace(/\//ig,'-'); 
		d1=d1.replace(/\./ig,'-'); 
        return d1;
	},
		//验证日期格式
	date1:function(RQ) {
		 var date = RQ;
            var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (result == null)
                return false;
            var d = new Date(result[1], result[3] - 1, result[4]);
            return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);

        }
}

/**
 * JS转换时间戳为“刚刚”、“1分钟前”、“2小时前”“1天前”等格式
 * GTimeShow.showByTime(s);
 */
window.GTimeShow={
	minute:1000 * 60,
	hour :null,
	day :  null,
	month : null,
	init:function(){
		this.hour = this.minute * 60;
		this.day =  this.hour * 24;
		this.month =  this.day * 30;
	},
	/**
	 *  2015-12-16 17:19:27
	 *  转换为2015-12-16
	 *  GTimeShow.getYMD(o);
	 */
	getYMD:function(d1){
		if(!d1)return "";
		return  d1.split(" ")[0];
	},
	showByTime:function(d1){
		if(typeof(d1)=='string'){
			d1= d1.replace(/-/ig,'/'); 
			d1= new Date(d1).getTime();; 
		}
		var now = new Date().getTime();
		var diffValue = now - d1;
		var monthC =diffValue/this.month;
		if(monthC>=1){
		 return parseInt(monthC) + "个月前";
		}
		var weekC =diffValue/(7*this.day);
		if(weekC>=1){
			return parseInt(weekC) + "周前";
		}
		
		var dayC =diffValue/this.day;
		if(dayC>=1){
			return parseInt(dayC) +"天前";
		}
		
		var hourC =diffValue/this.hour;
		if(hourC>=1){
			return parseInt(hourC) +"小时前";
		}
		
		var minC =diffValue/this.minute;
		if(minC>=1){
			return  parseInt(minC) +"分钟前";
		}
		return "刚刚";
	}
};


 function G_isKeyDown_enter(e){
	 var e = e || event,
	 keycode = e.which || e.keyCode;
	 if (keycode==13) {
	  return true;
	 }
	 return false;
	}
 
 function G_iFrameHeight(t_iframe) {   
	 var ifm= document.getElementById(t_iframe);   

	 var subWeb = document.frames ? document.frames[t_iframe].document : ifm.contentDocument;   
	
	 if(ifm != null && subWeb != null) {

	    ifm.height = subWeb.body.scrollHeight+10;
	  //  ifm.width = subWeb.body.scrollWidth;

	 }else{
		 ifm.height="600px";
		 ifm.scrolling="auto";
	 }   

	 } 
 //进入查看时间BODY操作；
 function G_get_div_second(){ 
	 	Queue.body_scrollTop=$("html,body").prop("scrollTop");
		var div_body='div_body';
		var second="div_widget_chooseUser";
		$("#"+div_body).hide();
		$("#"+second).show();

		$("#"+second).html("");
		//2级显示时,回到顶部.
		$("html,body").animate({scrollTop:0},200);
		return  document.getElementById(second);
	} 
 //离开详情时Body操作
 function G_get_div_body(){
		var div_body='div_body';
		var second="div_widget_chooseUser";

		$("#"+div_body).show();
		$("#"+second).hide();
		$("#"+second).html("");

		return  document.getElementById(div_body);
	}

 
 
 
 
GTimeShow.init();