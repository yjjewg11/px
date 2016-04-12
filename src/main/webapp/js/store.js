/**
 * Store.getCurGroup();//获取当前组织
 * 
 * Store.getGroup();//获取当前组织列表
 *  Store.getGroupNoGroup_wjd();
	 * 获取幼儿园列表,排除云代理学校.
 * Store.getAllGroup();//获取当前组织列表
*Store.getGroupNameByUuid(uuid);//
*Store.getMyGroupByUuid(uuid);
 * Store.getUserinfo();//获取当前用户
 * Store.getUserRights();//获取当前班级
 * Store.getMyClassList();//获取我关联的班级(老师)
 * Store.getCurMyClass();//获取我当前班级
 * Store.getClassByUuid(uuid);//
 * Store.getChooseClass(uuid);根据组织id获取班级信息
 * Store.getClassStudentsList(uuid);根据班级id获取班级学生列表
 * Store.getUserRights();//获取当前用户的权限信息
 * Store.getCurGroupByRight(rightname)//获取当前学校当前
 * Store.getGroupByRight(rightname);获取有权限的学校列表;
 * Store.getRoleList(type);获取角色列表;type:1 幼儿园
 * 
 * 
 * Store.clear();
 * 
 */
var Store={
	map:{},
	clear:function(){
		if (!$.AMUI.store.enabled) {
			$.AMUI.store.clear();
		}
		Store.map={};
		Store.setCurGroup(null);
	},
	isDisableAlet:false,
	enabled:function(){
		if (!$.AMUI.store.enabled) {
			  if(!Store.isDisableAlet)alert('你的浏览器禁用 LocalStorage，部分显示有问题，请启用LocalStorage');
			  Store.isDisableAlet=true;
			  return false;
			}
		return true;
	},
	getAllGroup:function(){
		 if(this.map["AllGroup"])return this.map["AllGroup"];
			 //从后台重新获取
		 Store_ajax_group_allList_toStroe();
			 if(this.map["AllGroup"])return this.map["AllGroup"];
		 return [];
	},
	setAllGroup:function(v){
		this.map["AllGroup"]=v;
	},
	setUser:function(uuid,v){
		this.map["User_"+uuid]=v;
	},
	getUser:function(uuid){
		  var key="User_"+uuid;
		 if(this.map[key])return this.map[key];
		 store_ajax_getUserForJsCache(uuid);
			 if(this.map[key])return this.map[key];
		 return {uuid:"",name:"",tel:""};
	},
	setUserRights:function(v){
		this.map["UserRights"]=v;
	},
	getUserRights:function(){
		var o= this.map["UserRights"];
		if(!o)o="";
		return o;
	},
	setRoleList:function(type,v){
		this.map["RoleList_"+type]=v;
	},
	getRoleList:function(type){
		key="RoleList_"+type;
		 if(this.map[key])return this.map[key];
		 store_ajax_role_list_toStroe(type);
		 if(this.map[key])return this.map[key];
		 return [];
	},
	getVo_map:function(){
		if(!Store.enabled())return null;
		$.AMUI.store.get("Vo_map");
	},
	getVo_md5:function(){
		if(!Store.enabled())return null;
		$.AMUI.store.get("Vo_md5");
	},
	setVo_map:function(map){
		if(!Store.enabled())return;
		$.AMUI.store.set("Vo_map", map);
	},
	setVo_md5:function(md5){
		if(!Store.enabled())return;
		$.AMUI.store.set("Vo_md5", md5);
	},
	getCurMyClass:function(){
		 if(this.map["CurMyClass"])return this.map["CurMyClass"];
		 var o=$.AMUI.store.get("CurMyClass");
		 if(o==null){
			 var group=Store.getMyClassList();
			 if(group.length>0){
				 o=group[0];
			 	Store.setCurMyClass(o);
			 }else{
			 	cur_group={};
			 }
		 }
		 return o;
	},
	setClassStudentsList:function(uuid,v){
		this.map["ClassStudentsList"+uuid]=v;
	},
	getClassStudentsList:function(uuid){
		  var key="ClassStudentsList"+uuid;
		 if(this.map[key])return this.map[key];
			 //从后台重新获取
		 store_ajax_student_getStudentByClassuuid_toStroe(uuid);
			 if(this.map[key])return this.map[key];
		 return [];
	},
	
	setCurMyClass:function(v){
		this.map["CurMyClass"]=v;
	},
	getMyClassList:function(){
		  var key="MyClass";
		 if(this.map[key])return this.map[key];
			 //从后台重新获取
			 store_ajax_MyClass_toStroe();
			 if(this.map[key])return this.map[key];
		 return [];
	},
	setMyClassList:function(v){
		this.map["MyClass"]=v;
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
	/**
	 * 设置班级选择控件到内存缓存。
	 * @param v
	 */
	clearChooseClass:function(){
		for(var key in this.map){
			if(key.indexOf("ChooseClass")>-1){
				console.log("clearChooseClass:key",key);
				this.map[key]=null;
			}
		}
	},
	//v:groupuuid
	getChooseClass:function(v){
		if(!v)return [];
		var key="ChooseClass"+v;
		 if(this.map[key])return this.map[key];
		 store_ajax_class_listByGroup(v);
		 if(this.map[key])return this.map[key];
		 return [];
	},
	getClassNameByUuid:function(uuid){
		if(!uuid)return "";
		var arr=this.getGroup();
		for(var i=0;i<arr.length;i++){
			var t_arr=this.getChooseClass(arr[i].uuid);
			
			for(var j=0;j<t_arr.length;j++){
				if(uuid==t_arr[j].uuid)return t_arr[j].name;
			}
		}
		return "";
	},
	getClassByUuid:function(uuid){
		if(!uuid)return {};
		var arr=this.getGroup();
		for(var i=0;i<arr.length;i++){
			var t_arr=this.getChooseClass(arr[i].uuid);
			
			for(var k=0;k<t_arr.length;k++){
				if(uuid==t_arr[k].uuid)return t_arr[k];
			}
		}
		return {name:"",uuid:""};
	},
	/**
	 * 清空班级缓存
	 * @param v
	 */
	setChooseUer:function(groupuuid,v){
		this.map["ChooseUer_"+groupuuid]=v;
	},
	/**
	 * list[{uuid:"",name:"",tel:""}]
	 * @param uuid
	 * @returns
	 */
	getChooseUer:function(uuid){
		  var key="ChooseUer_"+uuid;
//			 if(this.map[key])return this.map[key];
			 store_ajax_chooseUser_listByGroup(uuid);
				 if(this.map[key])return this.map[key];
			 return [];
	},
//	/store : $.AMUI.store,
	/**
	 * 根据uuid获取机构名称
	 */
	getGroupNameByUuid:function(uuid){
		var arr=this.getAllGroup();
		for(var i=0;i<arr.length;i++){
			if(uuid==arr[i].uuid)return arr[i].brand_name;
		}
		return "";
	},
	getCurGroupByRight:function(rightname){
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
	/**
	 * 
	 * @param rightname
	 * @returns
	 */
	getGroupByRight:function(rightname){
		console.log("getGroupByRight:pa",rightname);
		var tmpList=this.getGroup();
		var r=[];
		 for(var i=0;i<tmpList.length;i++){
			if( G_user_hasRightByGroupuuid(rightname,tmpList[i].uuid)){
				r.push(tmpList[i]);
				console.log("getGroupByRight-add:", tmpList[i].brand_name);
			}else{
				 console.log("getGroupByRight-remove:", tmpList[i].brand_name);
			}
		 }
		 return r;
	},
	/**
	 * 
	 * @param rightname
	 * @returns
	 */
	getCurGroupByRight:function(rightname){
	//	console.log("getGroupByRight:pa",rightname);
		var tmpList=this.getGroupByRight(rightname);
		var tmpO=Store.getCurGroup();
	
		if(!tmpList||tmpList.length==0)return {};
		
		if(!tmpO||tmpO.uuid){
			return tmpList[0];
		}
		
		 for(var i=0;i<tmpList.length;i++){
			if( tmpO.uuid==tmpList[i].uuid){
				return tmpO;
			
			}else{
				// console.log("getGroupByRight-remove:", tmpList[i].brand_name);
			}
		 }
		 
		 return tmpList[0];
	},
	/**
	 * Store.getGroupNoGroup_wjd();
	 * 获取幼儿园列表,排除云代理学校.
	 * @returns {Array}
	 */
	getGroupNoGroup_wjd:function(){
			var list =this.getGroup();
			var nlist=[];
			for(var i=0;i<list.length;i++){
				if(list[i].uuid!=G_group_wjd)
					nlist.push(list[i]);
			}
			return nlist;
	},
	getMyGroupByUuid:function(uuid){
		var arr=this.getGroup();
		for(var i=0;i<arr.length;i++){
			if(uuid==arr[i].uuid)return arr[i];
		}
		return {};
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
	/**
	 * 
	 * userinfo={uuid:"",name:""}
	 */
	getUserinfo:function(){
		 if(this.map["userinfo"])return this.map["userinfo"];
		 store_ajax_getUserinfo();
		 if(this.map["userinfo"])return this.map["userinfo"];
		 return {};
	},
	setUserinfo:function(v){
		var tmp=this.map["userinfo"];
		this.map["userinfo"]=v;
		//不相同,表示其他用户登录,则清空.
		if(tmp&&v&&tmp.loginname==v.loginname)return;
		Store.clear();
		this.map["userinfo"]=v;
		
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
		error : G_ajax_error_fn
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
		error : G_ajax_error_fn
	});
};


function store_ajax_getUserinfo() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getUserinfo.json";
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.userinfo)Store.setUserinfo(data.userinfo);
				if(data.list)Store.setGroup(data.list);
				Store.setUserRights(data.S_User_rights);
			} else {
				//alert(data.ResMsg.message);
				//G_resMsg_filter(data.ResMsg);
				Store.setUserinfo({uuid:"",name:"游客"});
			}
			
		},
		error : G_ajax_error_fn
	});
}




function store_ajax_MyClass_toStroe() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/class/queryClassByUseruuid.json";
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setMyClassList(data.list);
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
};




function store_ajax_student_getStudentByClassuuid_toStroe(uuid) {
	$.AMUI.progress.start();
	url=hostUrl + "rest/student/getStudentByClassuuid.json?classuuid="+uuid;
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setClassStudentsList(uuid,data.list)
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
};

function store_ajax_role_list_toStroe(type) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/role/list.json?type="+type;
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setRoleList(type,data.list)
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
};


function store_ajax_getUserForJsCache(uuid) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getUserForJsCache.json?uuid="+uuid;
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setUser(uuid,data.data);
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
};
function store_ajax_chooseUser_listByGroup(groupuuid){
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/listJsCache.json?groupuuid="+groupuuid;
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setChooseUer(groupuuid,data.list);
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error : G_ajax_error_fn
	});
}

function Store_ajax_group_allList_toStroe() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/group/list.json";
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setAllGroup(data.list);
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error : G_ajax_error_fn
	});
};


function Store_ajax_groupHabits_getByKey(groupuuid,key) {
	var val=null;
	$.AMUI.progress.start();
	var url = hostUrl + "rest/groupHabits/getByKey.json";
	$.ajax({
		type : "GET",
		url : url,
		data : {groupuuid:groupuuid,key:key},
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				val=data.data.v;
			} else {
				alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
		},
		error : G_ajax_error_fn
	});
	return val;
};
