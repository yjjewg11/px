var Store={
//	/store : $.AMUI.store,
	enabled:function(){
		if (!$.AMUI.store.enabled) {
			  alert('你的浏览器禁用 LocalStorage，部分显示有问题，请启用LocalStorage');
			  return false;
			}
		return true;
	},
	getGroup:function(){
		 var userinfo=$.AMUI.store.get("Group");
		 if(userinfo==null){
			 //从后台重新获取
			 userinfo={};
		 }
		 return userinfo;
	},
	setGroup:function(v){
		if(!Store.enabled())return;
		$.AMUI.store.set("Group", v);
	},
	getUserinfo:function(){
		 var userinfo=$.AMUI.store.get("userinfo");
		 if(userinfo==null){
			 //从后台重新获取
			 userinfo={};
		 }
		 return userinfo;
	},
	setUserinfo:function(v){
		if(!Store.enabled())return;
		$.AMUI.store.set("userinfo", v);
	}
};