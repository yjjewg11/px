var Store={
//	/store : $.AMUI.store,
	getUserinfo:function(){
		 var userinfo=$.AMUI.store.get("userinfo");
		 if(userinfo==null){
			 //从后台重新获取
			 userinfo={};
		 }
		 return userinfo;
	},
	setUserinfo:function(v){
		if (!$.AMUI.store.enabled) {
			  alert('你的浏览器禁用 LocalStorage，部分显示有问题，请启用LocalStorage');
			  return;
			}
		$.AMUI.store.set("userinfo", v);
	}
};