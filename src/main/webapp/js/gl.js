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
 */

(function($){
$.fn.serializeJson=function(){
var serializeObj={};
$(this.serializeArray()).each(function(){
	if(this.name)
		serializeObj[this.name]=this.value;
});
return serializeObj;
};
})(jQuery);
var G_group_wjd="group_wjd";
var hostUrl='/px-rest/';
var hostUrlCDN='/px-rest/';
hostUrlCDN='http://img.wenjienet.com/';
var G_def_headImgPath=hostUrlCDN+"i/header.png";
//取消G_imgPath
var G_imgPath=hostUrl+"rest/uploadFile/getImgFile?uuid=";
G_imgPath="";

/**
 * 获取头像,没有则取默认
 */
var G_getHeadImg=function(s){
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
	//return true;
	//list<[groupuuid,rightname]>
	var list=Store.getUserRights();
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
	var list=Store.getUserRights();
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

function loadJS(url,callback,charset)
{
	var script = document.createElement('script');
	if (script.readyState){ //IE 
		script.onreadystatechange = function(){ 
		if (script.readyState == "loaded" || 
		script.readyState == "complete"){ 
		script.onreadystatechange = null; 
		callback(); 
		} 
		}; 
	} else { //Others: Firefox, Safari, Chrome, and Opera 
		script.onload = function(){ 
			callback(); 
		}; 
	} 
	script.charset=charset || document.charset || document.characterSet;
	script.src = url;
	try {document.getElementsByTagName("head")[0].appendChild(script);} catch (e) {}
}

/**
 * Queue.doBackFN();
 * Queue.push(fn);
 */
var  Queue={
		isBack:false,
		/**
		 * 如果是点击显示原图模式,回退时,操作是关闭原图
		 * @returns {Boolean}
		 */
		galleryDobackFN:function(){
//			var tmp=$('.am-gallery');
//			var aa=tmp.pureview();
//			if(tmp&&tmp.$slides&&tmp.options&&tmp.options.active)
//			 if (tmp.$slides.find('.' + tmp.options.active).size()>0) {
//				 tmp.close();
//				    return true;
//				  }
			return false;
		},
		doBackFN:function(){
			if(Queue.galleryDobackFN())return;
			//If it is not back after the operation, first throw away the current operation. To perform the last operation.
			if(!this.isBack)this.pop();
			this.isBack=true;
			if(this.arr.length==0){
				G_CallPhoneFN.finishProject();
				return;
			}
			var tmp=this.pop();
			if(tmp&&typeof tmp=='function'){
				tmp();
			}
		},
		arr:[],
		clear:function(){
			this.arr=[];
		},
		push:function(o,title){          			
			if(typeof title_info_init=='function')title_info_init(title);// 绘制标头方法
			 this.isBack=false;
			 if(this.arr.length>50){
				 this.arr=this.arr.slice(40);//防止内存异常,最多保留50个.
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

var xhEditor_upImgOption_mfull={
	    upMultiple:false,
		upImgUrl:  hostUrl + "rest/uploadFile/xheditorUpload.json",
		onUpload:xhEditor_insertUpload,
		html5Upload:false,
		height:'500',
		tools:'mfull',
		urlType:'abs'
	};
var xhEditor_upImgOption={
    upMultiple:false,
	upImgUrl:  hostUrl + "rest/uploadFile/xheditorUpload.json",
	onUpload:xhEditor_insertUpload,
	html5Upload:false,
	tools:'simple',
	urlType:'abs'
};
var xhEditor_upImgOption_emot={
	    //upMultiple:false,
		//upImgUrl:  hostUrl + "rest/uploadFile/xheditorUpload.json",
		//onUpload:xhEditor_insertUpload,
		//html5Upload:false,
		//tools:'Emot,Img',
		tools:'Emot',
		urlType:'abs'
	};

//xhEditor编辑器图片上传回调函数
function xhEditor_insertUpload(msg) {
	msg=G_imgPath+msg[0];
	//$("#xh_editor").append(msg);
}

function G_ajax_error_fn( obj, textStatus, errorThrown ){
	$.AMUI.progress.done();
		alert(obj.status+","+textStatus+"="+errorThrown);
	 console.log(',ajax_error：', obj.status+","+textStatus+"="+errorThrown);
}