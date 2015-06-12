



//userinfo
function widget_chooseUser_fn(groupuuid,callbackFN){
	//React.render(ChooseUser_modalInstance, document.getElementById('div_body'));
	return;
	if(!groupuuid)groupuuid=Store.getCurGroup().uuid;
	if(!groupuuid){
		alert("widget_chooseUser_fn groupuuid is null!");
	}
	callbackFN=function(){alert(111);};
	
	var users=Store.getChooseUer(groupuuid);
	
	if(users!=null){
		
		for(var i=0;i<50;i++){
			users.push(Store.getUserinfo());
		}
		React.render(React.createElement(AMUIReact_ModalTrigger, {
			modal:React.createElement(ChooseUser_modal, {groupuuid:groupuuid,
				group_list:Store.getGroup(),
				events: users,
				callbackFN:callbackFN,
				responsive: true, bordered: true, striped :true,hover:true,striped:true}),
			onCancel: onCancel,
			onConfirm: callbackFN
			},
			React.createElement(AMUIReact_Button, {amStyle: "primary"}, "选择")), document.getElementById('div_body'));
		return;
	}
	ajax_chooseUser_listByGroup(groupuuid,callbackFN)
}
//老师查询，条件groupuuid
//
function ajax_chooseUser_listByGroup(groupuuid,callbackFN) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/list.json?groupuuid="+groupuuid;
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				Store.setChooseUer(groupuuid,data.list)
				widget_chooseUser_fn(groupuuid,callbackFN)
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

//chooseUser end