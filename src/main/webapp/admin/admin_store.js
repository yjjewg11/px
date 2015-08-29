var cur_group_ad_uuid='wjkj';
/**
 * Store.getCurGroup();//获取当前组织
 * 
 * Store.getGroup();//获取当前组织列表
*Store.getGroupNameByUuid(uuid);//
 * Store.getUserinfo();//获取当前用户
 * Store.getUserRights();//获取当前班级
 * Store.getMyClassList();//获取我关联的班级(老师)
 * Store.getCurMyClass();//获取我当前班级
 * Store.getClassByUuid(uuid);//
 * Store.getChooseClass(uuid);根据组织id获取班级信息
 * Store.getClassStudentsList(uuid);根据班级id获取班级学生列表
 * Store.getUserRights();//获取当前用户的权限信息
 * Store.clear();
 * 
 */
var ADStore={
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
		var arr=Store.getAllGroup();
		for(var i=0;i<arr.length;i++){
			if(uuid==arr[i].uuid)return arr[i].brand_name;
		}
		return "";
	},
	getCurGroup:function(){
		 if(this.map["CurGroup"])return this.map["CurGroup"];
		 var arr=Store.getAllGroup();
			for(var i=0;i<arr.length;i++){
				if(cur_group_ad_uuid==arr[i].uuid)return arr[i];
			}
			return {uuid:cur_group_ad_uuid,brand_name:"平台"};
	},
	setCurGroup:function(v){
		this.map["CurGroup"]=v;
		if(!Store.enabled())return;
		$.AMUI.store.set("CurGroup", v);
	},
	getRightList:function(v){
		var key="RightList"+v;
		 if(this.map[key])return this.map[key];
		 
		 ADstore_ajax_right_list(v);
		 if(this.map[key])return this.map[key];
		 
		 return [];
	},
	setRightList:function(v,val){
		var key="RightList"+v;
		this.map[key]=val;
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
function ADstore_ajax_right_list(type) {
	if(!type)type="0";
	$.AMUI.progress.start();
	
	var url = hostUrl + "rest/right/list.json?type="+type;
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				ADStore.setRightList(type,data.list);
				
			} else {
				alert(data.ResMsg.message);
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

//获取我的
function ajax_group_myList_toStroe() {
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



