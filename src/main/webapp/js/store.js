var Store={
	map:{},
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
		 var o=$.AMUI.store.get("Group");
		 if(o==null){
			 //从后台重新获取
			 o=[];
		 }
		 return o;
	},
	setGroup:function(v){
		this.map["Group"]=v;
		if(!Store.enabled())return;
		$.AMUI.store.set("Group", v);
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