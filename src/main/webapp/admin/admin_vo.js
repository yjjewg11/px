var AdminVo={
		/**
		 * 类型'0:普通通知 1:内部通知 2：班级通知',
		 * Type为2时,必须传班级UUID
		 * @param t
		 * @returns
		 */
	map:{
		type_0:"云平台",
		type_1:"幼儿园",
		type_2:"培训"
	},
	type:function(t){
		return this.map["type_"+t];
	}
}