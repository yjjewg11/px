/*
 * 将幼儿园列表转换成select要求的数据模型
 * @arrlist  数组
 * @id {Array} 需要转换数组中哪一个属性名
 * @name       需要转换数组中哪一个属性名
 */
function G_selected_dataModelArray_byArray(arrlist,id,name){
	var arr=[];
	if(!arrlist)return arr;
	for(var i=0;i<arrlist.length;i++){
		var tmp=arrlist[i];
		arr.push( {value: tmp[id]+"", label:tmp[name]});
	}
	return arr;
}
/**
 * Vo.getTypeList("s");//根据名字取数组
 */
var Vo={
	md5:null,
		/**
		 * 类型'0:普通通知 1:内部通知 2：班级通知',
		 * Type为2时,必须传班级UUID
		 * @param t
		 * @returns
		 */
	map:{
		ann_type_0:"全校公告",
		ann_type_1:"老师通知",
		ann_type_2:"班级通知",
		ann_type_3:"文章分享",
		ann_type_4:"招生计划",
		ann_type_85:"优惠活动",
		ann_type_91:"幼儿园帮助文档",
		ann_type_92:"培训机构帮助文档",
		type_0:"云平台",
		type_1:"幼儿园",
		type_2:"培训"
	},
	//TypeList[tmp.typeuuid].push({key:tmp.datakey,val:tmp.datavalue,desc:tmp.description});
	
	isInit:false,
	init:function(){
		if(Vo.isInit)return;
		Vo_ajax_MyClass_toVo();
	},
	/**
	 * 用于生成select列表数据
	 * @param s
	 * @returns
	 */
	getTypeList:function(s){
		Vo.init();
		var tmp=Vo.map.TypeList[s];
		if(!tmp)tmp=[];
		return tmp;
	},
	/**
	 * 根据传入值，获取显示名。
	 * @param t。 
	 * @returns
	 * 	Vo.map[tmp.typeuuid+"_"+tmp.datakey]=tmp.datavalue;
	 * Vo.get("group_type_"+1);
	 */
	get:function(t){
		Vo.init();
		return this.map[t];
	},
	type:function(t){
		Vo.init();
		return this.map["group_type_"+t];
	},
	announce_type:function(t){
		Vo.init();
		return Vo.map["KD_ann_type_"+t];
	}
};

function Vo_ajax_MyClass_toVo() {
	if(!Vo.md5){
		Vo.md5=Store.getVo_md5();
	}
	$.AMUI.progress.start();
	var url = hostUrl + "rest/basedatalist/getAllList.json?md5="+Vo.md5;
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.md5==Vo.md5){
					Vo.map=Store.getVo_map();
					return;
				}
				Vo.md5=data.md5;
				Vo.map={};
				
				var TypeList={};
				if(!data.list)return;
				for(var i=0;i<data.list.length;i++){
					var tmp=data.list[i];
					Vo.map[tmp.typeuuid+"_"+tmp.datakey]=tmp.datavalue;
					if(!TypeList[tmp.typeuuid])TypeList[tmp.typeuuid]=[];
					TypeList[tmp.typeuuid].push({key:tmp.datakey,val:tmp.datavalue,desc:tmp.description});
				}
				Vo.map.TypeList=TypeList;
				Store.setVo_map(Vo.map);
				
				Vo.isInit=true;
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : G_ajax_error_fn
	});
};

