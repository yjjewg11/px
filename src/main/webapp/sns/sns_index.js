//懒加载话题模块
//PxLazyM=(function(){return {}})();
//PxSns.list_init(a);
var PxSns=(function(){
	//懒加载回调
	function list_init(){		
		PxSnsService.sns_list_div();
	}
	

	return {

		list_init:list_init
	};//end return
})();//end PxLazyM=(function(){return {}})();



