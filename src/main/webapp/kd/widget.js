 /** w:表示公共组件
 * ch：表示选择
 * 班级单击选择
 * w_ch_class.open(callbackFN,groupuuid)
*/ 
//chooseUser
var w_ch_class={
	div_id:"div_widget_chooseUser",
	div_body:"div_body",
	groupuuid:null,
	callbackFN:null,
	checkedClassuuid:null,
	handleClick:function(m,uuid){
		w_ch_class.hide();
		if(m=="cancel")return;
		
		if(w_ch_class.callbackFN){
			w_ch_class.callbackFN(uuid);
		}
	},
	open:function(callbackFN,groupuuid){
		w_ch_class.callbackFN=callbackFN;
		
		if(!groupuuid)w_ch_class.groupuuid=Store.getCurGroup().uuid;
		else w_ch_class.groupuuid=groupuuid;
		if(!w_ch_class.groupuuid){
			alert("w_ch_class.open groupuuid is null!");
		}
		w_ch_class.show();
		
	},	
	reshowBygroup:function(groupuuid){
		w_ch_class.groupuuid=groupuuid;
		if(!w_ch_class.groupuuid){
			alert("w_ch_class.reshowBygroup groupuuid is null!");
		}
		w_ch_class.show();
	},
	
	show:function(){
		Queue.push(function(){w_ch_class.show();},"课程安排-班级选择");
		var lists=Store.getChooseClass(w_ch_class.groupuuid);
		React.render(React.createElement(ChooseClass_EventsTable, {
			group_uuid:w_ch_class.groupuuid,
			group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name"),
			events: lists,
			handleClick:w_ch_class.handleClick,
			responsive: true, bordered: true, striped :true,hover:true,striped:true
			}), document.getElementById(w_ch_class.div_id));
		$("#"+this.div_body).hide();
		$("#"+this.div_id).show();
		
	},
	
	hide:function(callbackFN){
		$("#"+this.div_body).show();
		$("#"+this.div_id).html("");
		$("#"+this.div_id).hide();
	}
};

//chooseUser