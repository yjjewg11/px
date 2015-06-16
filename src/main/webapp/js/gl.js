(function($){
$.fn.serializeJson=function(){
var serializeObj={};
$(this.serializeArray()).each(function(){
serializeObj[this.name]=this.value;
});
return serializeObj;
};
})(jQuery);

var hostUrl='/px-rest/';

function G_resMsg_filter(ResMsg){
	if("sessionTimeout"==ResMsg.status){
		//window.location = hostUrl + "login.html";
		menu_userinfo_login_fn();
	}
}
function loadJS(url,callback,charset)
{
	var script = document.createElement('script');
	script.onload = script.onreadystatechange = function ()
	{
		if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
		script.onload = script.onreadystatechange = null;
		script.src = '';
		script.parentNode.removeChild(script);
		script = null;
		if(callback)callback();
	};
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
		doBackFN:function(){
			//If it is not back after the operation, first throw away the current operation. To perform the last operation.
			if(!this.isBack)this.pop();
			this.isBack=true;
			var tmp=this.pop();
			if(tmp&&typeof tmp=='function'){
				tmp();
			}
		},
		arr:[],
		clear:function(){
			this.arr=[];
		},
		push:function(o){
			 this.isBack=false;
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