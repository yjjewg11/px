var Store={
	map:{},
	clear:function(){
		if (!$.AMUI.store.enabled) {
			$.AMUI.store.clear();
		}
		Store.map={};
		Store.setCurGroup(null);
	},
	enabled:function(){
		if (!$.AMUI.store.enabled) {
			  alert('你的浏览器禁用 LocalStorage，部分显示有问题，请启用LocalStorage');
			  return false;
			}
		return true;
	},
	
	
	/**
	 * 设置班级选择控件到内存缓存。
	 * @param v
	 */
	setChooseCook:function(type,v){
		this.map["ChooseCook"+type]=v;
	},
	getChooseCook:function(type){
		 return this.map["ChooseCook"+type];
	},
	/**
	 * 设置班级选择控件到内存缓存。
	 * @param v
	 */
	setChooseClass:function(groupuuid,v){
		this.map["ChooseClass"+groupuuid]=v;
	},
	//v:groupuuid
	getChooseClass:function(v){
		var key="ChooseClass"+v;
		 if(this.map[key])return this.map[key];
		 store_ajax_class_listByGroup(v);
		 if(this.map[key])return this.map[key];
		 return [];
	},
	getClassNameByUuid:function(uuid){
		var arr=this.getGroup();
		for(var i=0;i<arr.length;i++){
			var t_arr=this.getChooseClass(arr[i].uuid);
			
			for(var i=0;i<t_arr.length;i++){
				if(uuid==t_arr[i].uuid)return t_arr[i].name;
			}
		}
		return "";
	},
	/**
	 * 设置人员选择控件到内存缓存。
	 * @param v
	 */
	setChooseUer:function(groupuuid,v){
		this.map["ChooseUer"+groupuuid]=v;
	},
	getChooseUer:function(groupuuid){
		 return this.map["ChooseUer"+groupuuid];
	},
//	/store : $.AMUI.store,
	/**
	 * 根据uuid获取机构名称
	 */
	getGroupNameByUuid:function(uuid){
		var arr=this.getGroup();
		for(var i=0;i<arr.length;i++){
			if(uuid==arr[i].uuid)return arr[i].company_name;
		}
		return "";
	},
	getCurGroup:function(){
		 if(this.map["CurGroup"])return this.map["CurGroup"];
		 var o=$.AMUI.store.get("CurGroup");
		 if(o==null){
			 var group=Store.getGroup();
			 if(group.length>0){
				 o=group[0];
			 	Store.setCurGroup(o);
			 }else{
			 	cur_group={};
			 }
		 }
		 return o;
	},
	setCurGroup:function(v){
		this.map["CurGroup"]=v;
		if(!Store.enabled())return;
		$.AMUI.store.set("CurGroup", v);
	},
	getGroup:function(){
		 if(this.map["Group"])return this.map["Group"];
			 //从后台重新获取
			 store_ajax_group_myList_toStroe();
			 if(this.map["Group"])return this.map["Group"];
		 return [];
	},
	setGroup:function(v){
		this.map["Group"]=v;
	},
	getUserinfo:function(){
		 if(this.map["userinfo"])return this.map["userinfo"];
		 var o=$.AMUI.store.get("userinfo");
		 if(o==null){
			 //从后台重新获取
			 o={};
		 }
		 return o;
	},
	setUserinfo:function(v){
		this.map["userinfo"]=v;
		if(!Store.enabled())return;
		$.AMUI.store.set("userinfo", v);
	}
};


//获取cookie
function getCookie(cookie_name) {
	
	if($.AMUI.store.enabled){
		return $.AMUI.store.get(cookie_name);
		return;
	}
	var allcookies = document.cookie;
	var cookie_pos = allcookies.indexOf(cookie_name); // 索引的长度
	// 如果找到了索引，就代表cookie存在，
	// 反之，就说明不存在。
	if (cookie_pos != -1) {
		// 把cookie_pos放在值的开始，只要给值加1即可。
		cookie_pos_i = cookie_pos + cookie_name.length;
		//兼容ie9、ie8，
		if(allcookies.substring(cookie_pos_i, cookie_pos_i+1) != "=") {
			return "";
		}
		cookie_pos += cookie_name.length + 1; // 这里我自己试过，容易出问题，所以请大家参考的时候自己好好研究一下。。。
		
		var cookie_end = allcookies.indexOf(";", cookie_pos);
		if (cookie_end == -1) {
			cookie_end = allcookies.length;
		}
		var value = unescape(allcookies.substring(cookie_pos, cookie_end)); // 这里就可以得到你想要的cookie的值了。。。
	}
	return value;
}

//设置cookie
function setCookie(name, value) {
	
	if($.AMUI.store.enabled){
		$.AMUI.store.set(name, value);
		return;
	}
	var timeout = 60*60*24*30; // 设置cookie超时时间为30天。
	var expires = "";
	if (timeout != 0) { // 设置cookie生存时间
		var date = new Date();
		date.setTime(date.getTime() + (timeout * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expires + "; path=/"; // 转码并赋值
}

//时间工具
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


//获取我的
function store_ajax_group_myList_toStroe() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/group/myList.json";
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setGroup(data.list);
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
};



function store_ajax_class_listByGroup(groupuuid){
	$.AMUI.progress.start();
	var url = hostUrl + "rest/class/list.json?groupuuid="+groupuuid;
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setChooseClass(groupuuid,data.list)
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
};