
/**
 * 
 * w:表示公共组件
 * ch：表示选择
 * 班级单击选择
 * w_ch_class.open(callbackFN,groupuuid)
 * 人员选择控件
 * w_ch_user.open(bind_inputid_uuid,bind_inputid_name,groupuuid);
 * 指定一个学校选择用户
 * w_ch_user.openTheGroup(useruuids,groupuuid,callback);
 * callback=function(useruuids,usernames,groupuuid){};
 * 
 * 
 * 剪切上传图片方法
 * w_uploadImg.open(callbackFN);
 * 
 * 选择菜谱控件
 * checkeduuids:选择图片uuid
 * type:类型
 * w_ch_cook.callbackFN(uuids,imgArr);
 * w_ch_cook.open(callbackFN,checkeduuids)
 * 选择菜谱控件-子控件,上传新菜谱
 * w_ch_cookAddImg.open(callbackFN,type);
 */

//cook add img


//uploadImg
/**
 * w_ch_cookAddImg.open(callbackFN,type)
 * w_ch_cookAddImg.base64='data:image/png;base64,iVBORw0KG...'
 */
var w_ch_cookAddImg={
		div_id:"div_widget_chooseUser",
		div_body:"div_widget_chooseCook",
		cropper:null,
		callbackFN:null,
		base64:null,
		type:6,
		uuid:null,
		
		ajax_upload:function(){
			var re_data=null;
			if(!$("#cook_name").val()){
				alert("名称必填");
				return;
			}
			w_ch_cookAddImg.uuid=null;
			$.AMUI.progress.start();
		    var url = hostUrl + "rest/uploadFile/uploadBase64.json";
			$.ajax({
				type : "POST",
				url : url,
				timeout : 0, 
				dataType : "json",
				data:{type:2,base64:w_ch_cookAddImg.base64},
				 async: false,
				success : function(data) {
					re_data=data;
				},
				error : G_ajax_error_fn
			});
			
			if(re_data==null){
				return;
			}
			// 登陆成功直接进入主页
			if (re_data.ResMsg.status == "success") {
				w_ch_cookAddImg.uuid=re_data.data.uuid;
			} else {
				$.AMUI.progress.done();
				alert(re_data.ResMsg.message);
				return;
			}
			if(!w_ch_cookAddImg.uuid){
				alert("error:w_ch_cookAddImg.uuid is null!");
				return;
			}
			//上传时,总数传用户点击选择的学校uuid
			var groupuuid=w_ch_cook.groupuuid;
			var objectForm={name:$("#cook_name").val(),img:w_ch_cookAddImg.uuid,type:w_ch_cookAddImg.type,groupuuid:groupuuid};
			 var jsonString=JSON.stringify(objectForm);
		    var url = hostUrl + "rest/cookbook/save.json";
			$.ajax({
				type : "POST",
				url : url,
				dataType : "json",
				contentType : false,  
				processData: false,
				data:jsonString,
				 async: false,
				success : function(data) {
					$.AMUI.progress.done();
					// 登陆成功直接进入主页
					if (data.ResMsg.status == "success") {
						Store.setChooseCook(objectForm.type,null);//
						Store.setChooseCook(objectForm.type+groupuuid,null);//
						if(w_ch_cookAddImg.callbackFN){
							
							w_ch_cookAddImg.callbackFN();
						}
						w_ch_cookAddImg.hide();
						
					} else {
						alert(data.ResMsg.message);
					}
				},
				error : G_ajax_error_fn
			});
		},
		handleClick: function(m) {
			if("cancel"==m){
				w_ch_cookAddImg.hide();
				return;
				
			} if("ok"==m){
				if(w_ch_cookAddImg.base64==null){
					alert("请先剪切图片，在提交。");
					return;
				}
				w_ch_cookAddImg.ajax_upload();
				
			}
			 
       	  },
		open:function(callbackFN,type){
			w_ch_cookAddImg.type=type;
			w_ch_cookAddImg.base64=null;
			w_ch_cookAddImg.callbackFN=callbackFN;
			w_ch_cookAddImg.show();
		},
		show:function(){
			
			React.render(React.createElement(Upload_cookImg, {
				responsive: true, bordered: true, striped :true,hover:true,striped:true
				}), document.getElementById(w_ch_user.div_id));
			$("#"+this.div_body).hide();
			$("#"+this.div_id).show();
			
		},
		
		hide:function(callbackFN){
			$("#"+this.div_body).show();
			$("#"+this.div_id).html("");
		}	
}
//end cook add img
//chooseCook
//w_ch_cook.open();
var w_ch_cook={
	div_id:"div_widget_chooseCook",
	div_body:"div_body",
	groupuuid:null,
	callbackFN:null,
	checkedClassuuid:null,
	checkeduuids:null,
	/**
	 * 
	 * @param m
	 * @param uuids:list<cookbook>
	 * 最多6个.
	 */
	handleClick:function(m,uuids){
		w_ch_cook.hide();
		if(m=="cancel")return;
		if(uuids&&uuids.length>6){
			G_msg_pop("最多选择6个食谱!");
			return;
		}
		if(w_ch_cook.callbackFN){
			w_ch_cook.callbackFN(uuids);
		}
	},
	open:function(callbackFN,checkeduuids){
		w_ch_cook.callbackFN=callbackFN;
		w_ch_cook.checkeduuids=checkeduuids;
		//w_ch_cook.groupuuid=groupuuid;
		w_ch_cook.show();
		
	},	
	
	reshowBygroup:function(){
		
		w_ch_cook.show();
	},
	add_img_callbackFN:function(uuid){
		$("#"+this.div_id).html("");
		w_ch_cook.reshowBygroup();
	},
	add_img:function(type,fn){
		if(fn==null)fn=w_ch_cook.add_img_callbackFN;
		w_ch_cookAddImg.open(fn,type);
	},
	show:function(){
		
		React.render(React.createElement(ChooseCook_Widget, {
			handleClick:w_ch_cook.handleClick,
			checkeduuids:w_ch_cook.checkeduuids,
			groupuuid:w_ch_cook.groupuuid,
			responsive: true, bordered: true, striped :true,hover:true,striped:true
			}), document.getElementById(w_ch_cook.div_id));
		$("#"+this.div_body).hide();
		$("#"+this.div_id).show();
		
	},
	
	hide:function(callbackFN){
		$("#"+this.div_body).show();
		$("#"+this.div_id).html("");
		$("#"+this.div_id).hide();
	}
};
//end cook

//chooseUser
/**
 * w_ch_user.openTheGroup(useruuids,groupuuid,callback);
 */
var w_ch_user={
	div_id:"div_widget_chooseUser",
	div_body:"div_body",
	bind_inputid_uuid:null,
	bind_inputid_name:null,
	checkedUseruuid:null,
	callback:null,
	useruuids:null,
	group_list:null,
	groupuuid:null,
	handleClick:function(m,groupuuid,useruuids,usernames){
		
		w_ch_user.hide();
		if(m=="cancel"){
			w_ch_user.callback=null;
			w_ch_user.bind_inputid_uuid=null;
			w_ch_user.bind_inputid_name=null;
			return;
		}
		if(w_ch_user.bind_inputid_uuid){
			$("#"+w_ch_user.bind_inputid_uuid).val(useruuids);
			w_ch_user.bind_inputid_uuid=null;
		}
		if(w_ch_user.bind_inputid_name){
			$("#"+w_ch_user.bind_inputid_name).val(usernames);
			w_ch_user.bind_inputid_name=null;
		}
		if(typeof w_ch_user.callback=='function'){
			w_ch_user.callback(useruuids,usernames,groupuuid);
			w_ch_user.callback=null;
			return;
		}
		
	},
	
	/**
	 * 根据指定幼儿园选取
	 * @param useruuids
	 * @param groupuuid
	 * @param callback
	 */
	openTheGroup:function(useruuids,groupuuid,callback){
		this.callback=callback;
		w_ch_user.checkedUseruuid=useruuids;
		
		if(!groupuuid){
			alert("参数groupuuid不能为null");
			return;
		}
		w_ch_user.bind_inputid_uuid=null;
		w_ch_user.bind_inputid_name=null;
		//指定一个学校
		w_ch_user.groupuuid=groupuuid;
		w_ch_user.useruuids=useruuids;
		w_ch_user.group_list=G_selected_dataModelArray_byArray([{uuid:groupuuid,brand_name:Store.getGroupNameByUuid(groupuuid)}],"uuid","brand_name");
		w_ch_user.show();
		
	},	
	open:function(bind_inputid_uuid,bind_inputid_name,groupuuid,callback){
		w_ch_user.callback=callback;
		w_ch_user.bind_inputid_uuid=bind_inputid_uuid;
		w_ch_user.bind_inputid_name=bind_inputid_name;
		if(w_ch_user.bind_inputid_uuid)
			w_ch_user.checkedUseruuid=$("#"+w_ch_user.bind_inputid_uuid).val();
		if(!w_ch_user.checkedUseruuid)w_ch_user.checkedUseruuid="";
		
		if(!groupuuid)w_ch_user.groupuuid=Store.getCurGroup().uuid;
		else w_ch_user.groupuuid=groupuuid;
		if(!w_ch_user.groupuuid){
			alert("w_ch_user.open groupuuid is null!");
		}
		
		w_ch_user.group_list=G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name");
		
		w_ch_user.show();
		
	},	
	
	username:null,
	reshowBygroup:function(groupuuid,name){
		w_ch_user.groupuuid=groupuuid;
		if(!w_ch_user.groupuuid){
			alert("w_ch_user.reshowBygroup groupuuid is null!");
		}
		w_ch_user.username=name;
		w_ch_user.show();
	},
	show:function(){
		var users=Store.getChooseUer(w_ch_user.groupuuid);
		
		if(w_ch_user.username){
			var users_byName=[];
			for(var i=0;i<users.length;i++){
				if(users[i].name.indexOf(w_ch_user.username)>-1){
					users_byName.push(users[i]);
				}
			}
			users=users_byName;
		}
		React.render(React.createElement(ChooseUser_EventsTable, {
			group_uuid:w_ch_user.groupuuid,
			group_list:this.group_list,
			events: users,
			checkedUseruuid:w_ch_user.checkedUseruuid,
			handleClick:w_ch_user.handleClick,
			responsive: true, bordered: true, striped :true,hover:true,striped:true
			}), document.getElementById(w_ch_user.div_id));
		
		
		$("#"+this.div_body).hide();
		$("#"+this.div_id).show();
		
	},
	
	hide:function(callbackFN){
		$("#"+this.div_body).show();
		$("#"+this.div_id).html("");
		$("#"+this.div_id).hide();
	}
};

//chooseUser end


