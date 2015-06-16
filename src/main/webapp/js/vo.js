var Vo={
		/**
		 * 类型'0:普通通知 1:内部通知 2：班级通知',
		 * Type为2时,必须传班级UUID
		 * @param t
		 * @returns
		 */
	map:{
		ann_type_0:"全校公告",
		ann_type_1:"老师通知",
		ann_type_2:"班级通知"
	},
	announce_type:function(t){
		return Vo.map["ann_type_"+t];
	}
}