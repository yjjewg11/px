var G_group_type=2;
//我选我的班级后的全局记录
var G_myclass_choose=null;
//我选我的学校后的全局记录
var G_mygroup_choose=null;
//选择课程
var G_course_choose=null;
	//统一换标头方法
	function title_info_init(type){
		//主页顶部按钮；
		var header_right=null;
		if(!G_CallPhoneFN.isPhoneApp()){//app hide my button
			header_right= [{
			        "link": "javascript:menu_queryMyTimely_fn()",
			        "customIcon":hostUrlCDN+"i/icon-msg-wu.png",
			        "title": "消息"
			      }];
		}
		var div_header_title_info = {
				  "title":type,
				  "link": "#title-link",
				  data: {
				    "left": [
				             {
				 		        "link": "javascript:Queue.doBackFN();",
				 		        "icon": "chevron-left"
				 		      },
				      {
				        "link": "javascript:menu_dohome();",
				        "icon": "home"
				      }
				    ],
				    "right": header_right
				  }
				};
		
		React.render(React.createElement(AMUIReact.Header,div_header_title_info), document.getElementById('div_header'));
	
	}
function login_affter_init(){
	Vo.init();
	

	

//±±±±±±±±±±±±±±±±±±±±±±±权限管理±±±±±±±±±±±±±±±±±±±±±±±±±±
	
	var menu_data=[];
	var t_menu=null;//第一级菜单
	var t_subMenu=null;//第二级子菜单
//	
//	
//	//切换分校
//	t_menu={
//	    "link": "##",
//	    "title": "切换分校"
//	  };
//	t_subMenu=[];
//	var t_group=Store.getGroup();
//	for(var i=0;i<t_group.length;i++){
//		t_subMenu.push({
//			"fn":menu_group_change_fn.bind(this,t_group[i]),
//		    "link": "##",
//		    "title": t_group[i].brand_name
//		  });
//	};
//	
//	t_menu.subMenu=t_subMenu;
//	menu_data.push(t_menu);
	
	
/*
 * 调用G_user_hasRight（）;
 * 根据项目常量表对应权限检查是否拥有此权限;
 * true-信息添加至队列中;
 * false-没有此权限不予以添加绘制；
 */
//————————————校务管理<权限>——————————
	t_menu={
		    "link": "##",
		    "title": "校务管理",
		    "fn":menu_group_myList_fn_byRight
                                            
		  };
	if(G_user_hasRight("PX_group_m")){
		menu_data.push(t_menu);
	}
	
//————————————对外发布<权限>——————————	
	t_menu={
	            "link": "##",
	            "title": "对外发布",
	            "subMenu": [
	                        {
	                         "fn":menu_group_myList_fn_byRight_px,
	                          "link": "##",
	                          "title": "机构介绍"
	                       },
	                        {
	                        	  "fn":menu_course_byRight,
	                        	  "link": "##",
	                            "title": "发布课程"
	                       },
	                          {
	                    	   "fn":px_Preferential_list_fn,
                              "link": "##",                            
                             "title": "优惠活动"
	                       },
	                          {
	                             "fn":menu_teacher_byRight,
	                              "link": "##",
	                              "title": "发布老师信息"
	                            }

	                        ]                   
		  };
	if(G_user_hasRight("PX_course_m")){
		menu_data.push(t_menu);
	};		
//————————————发布消息<权限>——————————	
	t_menu={
	            "link": "##",
	            "title": "信息管理",
	            "subMenu": [
	                        {
	                          "fn":function(){menu_announce_list_fn_byRight(0,"校园公告");},
	                          "link": "##",
	                          "title": "校园公告"
	                        },
	                        {
	                        	  "fn":function(){menu_announce_list_fn_byRight(1,"老师公告");},
	                        	  "link": "##",
	                            "title": "老师公告"
	                          },
	                          {
                              "link": "##",
                             "fn":function(){ajax_classnews_list_div_byRight(1);},
                             "title": "班级互动"
	                        	                               },
	                          {
	                              "fn":function(){menu_announce_list_fn_byRight(3,"精品文章");},
	                              "link": "##",
	                              "title": "精品文章"
	                            }

	                        ]                   
		  };
	if(G_user_hasRight("PX_announce_m")){
		menu_data.push(t_menu);
	};
	
	
	t_menu={
          "link": "##",
          "title": "老师管理",
          "subMenu": [
                      {
                        "fn":menu_userinfo_list_fn_byRight,
                        "link": "##",
                        "title": "老师管理"
                      },
                      {
                		    "link": "##",
                		    "title": "老师授权",
                		    "fn":menu_kd_roleUser_list_fn
                		   
                		  }
                      ]
        };

	if(G_user_hasRight("PX_teacher_m")){
		menu_data.push(t_menu);
	}
	
	
	
//————————————教学计划<权限>——————————		
//	t_menu={
//      	   		"link": "##",
//      	   		"fn":menu_teachingplan_list_fn_byRight,
//      	   		"title": "教学计划",
//      	   		"subCols": 2
//		  };
//	if(G_user_hasRight("PX_teachingplan_m")){
//		menu_data.push(t_menu);
//	}
	
//————————————园长信箱<权限>——————————		
	t_menu={
        "link": "##",
        "fn":menu_queryLeaderMsgByParents_message_fn_byRight,
        "title": "园长信箱"
      };
	if(G_user_hasRight("PX_Leader_Msg_m")){
		menu_data.push(t_menu);
	}
	t_menu= {
            "link": "##",
            "fn":menu_class_list_fn_byRight,
            "title": "班级管理"
          };
		if(G_user_hasRight("PX_class_m")){
			menu_data.push(t_menu);
		}
	t_menu= {
            "link": "##",
            "title": "学生列表",
            "fn":menu_query_list_fn_byRight
          };
		if(G_user_hasRight("PX_student_allquery")){
			menu_data.push(t_menu);
		}	
		t_menu= {
                "link": "##",
                "title": "统计",
                "fn":menu_statistics_list_fn_byRight
              };
			if(G_user_hasRight("PX_statistics_m")){
				menu_data.push(t_menu);
			}	
//	t_menu= {
//	                "link": "##",
//	                "title": "老师评价",
//	                "fn":menu_teachingjudge_list_fn_byRight
//	              };
//			
//				if(G_user_hasRight("PX_teachingjudge_q")){
//					menu_data.push(t_menu);
//				}
//	
//
//		t_menu= {
//                "link": "##",
//                "fn":menu_accounts_list_fn_byRight,
//                "title": "收支记录"
//              };
//			if(G_user_hasRight("PX_accounts_m")){
//				menu_data.push(t_menu);
//			}
			
//±±±±±±±±±±±±±±±±±±±±±±±±±±标头按钮±±±±±±±±±±±±±±±±±±±±±±±±±±
	var div_menu_data= {
	                  "link": "##",
	                  "title": "我",
	                  "subCols": 3,
	                  "subMenu": []
	                };
	
		
		t_menu={
	       	 "fn":menu_userinfo_update_fn,
	         "link": "##",
	         "title": "修改资料"
	       };
		if(!G_CallPhoneFN.isPhoneApp()){//app hide my button
			div_menu_data.subMenu.push(t_menu);
		}
		
		t_menu= {
       	 "fn":menu_userinfo_updatepassword_fn,
         "link": "##",
         "title": "修改密码"
       };
		
		if(!G_CallPhoneFN.isPhoneApp()){//app hide my button
			div_menu_data.subMenu.push(t_menu);
		}

			
	t_menu=  {
            "link": "##",
            "fn":menu_userinfo_logout_fn,
            "title": "注销"
          };
 	
	if(!G_CallPhoneFN.isPhoneApp()){//app hide my button
		div_menu_data.subMenu.push(t_menu);
	}		
	t_menu= {
            "link": "##",
            "title": "帮助列表",
           "fn":px_help_list_fn
          };
//		if(G_user_hasRight("PX_student_allquery")){
			menu_data.push(t_menu);
//		}
	//if(!G_CallPhoneFN.isPhoneApp()){//app hide my button
		menu_data.push(div_menu_data);
	//}

	$("#div_menu").html("");
	
	title_info_init("教育机构-首页");
	
	React.render(React.createElement(AMUIReact.Menu,{cols:4,data:menu_data,onSelect:div_menu_handleClick}), document.getElementById('div_menu'));
	
}


/*
 * 显示bodydiv,隐藏其他所有控件div
**/
function body_show(){
	 w_ch_user.hide();
	 w_ch_cook.hide();
}

var div_menu_handleClick = function(nav, index, e) {
	  if (nav && nav.subMenu) {
	    // 有二级菜单的链接点击了
		 if( typeof  nav.fn=="function"){
			 body_show();
			 this.closeAll();
			 nav.fn();			 
		 }
		  console.log('点击的链接为1：', nav);
	  } else {
	    e.preventDefault();
	    if( typeof  nav.fn=="function"){
	    	body_show();
	    	this.closeAll();
			 nav.fn();
			 
		 }
	    console.log('点击的链接为2：', nav);
	    // do something
	    // this.closeAll(); //关闭二级菜单
	  }
	};

	

//±±±±±±±±±±±±±±±±±±±±±±±±±±图标按钮±±±±±±±±±±±±±±±±±±±±±±±±±±
function menu_dohome(){

	$("#div_body").show();
	$("#div_widget_chooseUser").html("");
	$("#div_widget_chooseCook").html("");
	Queue.push(menu_dohome,"主页");
	var myhead_img=hostUrlCDN+"i/header.png";
	var myhead_imgUuid=Store.getUserinfo().img;
	if(myhead_imgUuid)myhead_img=G_imgPath+myhead_imgUuid;
	
	var div_Gallery_data=[
	                      {
	                    	    "img": hostUrlCDN+"i/banji.png",
	                    	    "link": "javascript:menu_class_students_fn()",
	                    	    "title": "我的班级"
	                    	  },
	                    	  {
		                    	    "img": hostUrlCDN+"i/hudong.png",
		                    	    "link": "javascript:menu_classnewsbyMy_list_fn();",
		                    	    "title": "班级互动"
		                    	  },
//			                   	  { 
//			                    	    "img": hostUrlCDN+"i/meirirenwu.png",
//			                    	    "link": "javascript:menu_teacherDailyTask_fn()",
//			                    	    "title": "每日任务"
//			                    	  },
		                    	  {
			                    	    "img": hostUrlCDN+"i/kechengbiao.png",
			                    	    "link": "javascript:menu_teachingplan_dayShow_fn();",
			                    	    "title": "课程表"
			                    	  },  
	                    	  {
		                    	    "img": hostUrlCDN+"i/xinxiang.png",
		                    	    "link": "javascript:menu_queryCountMsgByParents_message_fn()",
		                    	    "title": "我的信箱"
		                    	  },   	  
	                    	  
	                    	  
	                    	  {
		                    	    "img": hostUrlCDN+"i/JZtongxunlu.png",
		                    	    "link": "javascript:parentContactByMyStudent()",
		                    	    "title": "家长通讯录"
		                    	  }, 
	                    	   {
		                    	    "img": hostUrlCDN+"i/laoshitongxunlu.png",
		                    	    "link": "javascript:menu_Teacher_tel_fn()",
		                    	    "title": "老师通讯录"
		                    },
		                    	  {
			                    	    "img": hostUrlCDN+"i/gonggao.png",
			                    	    "link": "javascript:menu_announce_mylist_fn();",
			                    	    "title": "公告"
			                    },
			                 

	                    	
		                    	  {
		                    		  "img": hostUrlCDN+"i/jpwz.png",
	                                  "link": "javascript:menu_article_list_fn()",
	                                  "title": "精品文章"
	                                },

	  		                 
			                      {
		                    	    "img": hostUrlCDN+"i/shoucang.png",
		                    	    "link": "javascript:menu_favorites_push_fn()",
		                    	    "title": "我的收藏"
		                    	  }
	                    	  ];
	/**
	 * 禁用用户
	 */
	if(!G_user_status_normal()){
		div_Gallery_data=[
	                    	  {
	                    		  "img": hostUrlCDN+"i/jpwz.png",
                                  "link": "javascript:menu_article_list_fn()",
                                  "title": "精品文章"
                                },
		                      {
	                    	    "img": hostUrlCDN+"i/shoucang.png",
	                    	    "link": "javascript:menu_favorites_push_fn()",
	                    	    "title": "我的收藏"
	                    	  }
                    	  ];
	}
	React.render(React.createElement(Div_body_index,{sm:3,md:4,lg:6,themes:'bordered',data:div_Gallery_data}), document.getElementById('div_body'));
}


function menu_kd_group_reg_fn(){
	Queue.push(menu_kd_group_reg_fn);
	React.render(React.createElement(Div_kd_group_reg,null)
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
};

//±±±±±±±±±±±±±±±±±±±±标头±±±±±±±±±±±±±±±±±±±±
//@Queue.push()方法Push  
//实现页面缓存然后可以实现回退功能；
/*
 *<查看即时消息>
 * @跳转kd_service发服务器请求
 * */
function menu_queryMyTimely_fn() {
	Queue.push(menu_queryMyTimely_fn,"即时消息");
	ajax_queryMyTimely_myList();
};




/*
 * (标头)注销用户
 * @ ajax_userinfo_logout：注销；
 * */
function menu_userinfo_logout_fn(){
	ajax_userinfo_logout();
}

/*
 * (标头)我-帮助
 * 
 */ 
function menu_hellp_fn(){
	Queue.push(menu_hellp_fn,"帮助文档");
	React.render(React.createElement(Help_txt), document.getElementById('div_body'));
}
/*
 * （标头）帮助信息列表
 */
function px_help_list_fn(){
  	Queue.push(px_help_list_fn,"帮助列表");
  	ajax_px_help_div();
}

/*
 * （标头）对外发布-优惠活动
 */
function px_Preferential_list_fn(){
  	Queue.push(px_Preferential_list_fn,"优惠活动");
  	ajax_px_Preferential_div();
}
//±±±±±±±±±±±±±±±±±±±±首页大图标±±±±±±±±±±±±±±±±±±±±
/*
 * （首页）<班级互动>；
 * @ajax_classnews_list:我的班级服务请求
 * 在kd_service;
 * */
function menu_classnewsbyMy_list_fn() {
	ajax_classnews_list_div(1);
	
};
/*
 * （首页）公告功能方法；
 * @跳转kd_service发服务器请求
 * */
function menu_announce_mylist_fn() {
	Queue.push(menu_announce_mylist_fn,"公告");
	ajax_announce_div();
};
/*
 * （首页）<课程表>Store.getCurGroup().uuid
 * 调用ajax_teachingplan_dayShow：在kd_service
 * */
var G_myCurClassuuid=null;
function menu_teachingplan_dayShow_fn(classuuid) {
	
//培训机构课程表模块，列表代码	
	var classList=Store.getMyClassList();
    var class_uuid =null;
 		G_myClassList=classList;
	if(!classuuid){
 		if(classList&&classList.length>0){
 			classuuid=classList[0].uuid;
 		}
	} 
	px_ajax_teachingplan_fn(classuuid);
	return;
//---------------------------------------------------------------------------------	
////培训机构课程表	
//	Queue.push(menu_teachingplan_dayShow_fn,"课程表");
//	var myclasslist=Store.getMyClassList();
//	if(!myclasslist||myclasslist.length==0){
//		G_msg_pop("请先创建班级!");
//		return ;
//	}
//	if(!G_myCurClassuuid){
//		G_myCurClassuuid=myclasslist[0].uuid;
//	}
//	React.render(React.createElement(Px_Teachingplan_show7Day, {
//			classuuid:G_myCurClassuuid,
//			classlist:G_selected_dataModelArray_byArray(myclasslist,"uuid","name")
//			}), document.getElementById('div_body'));
//	return;
//---------------------------------------------------------------------------------	
////幼儿园新版课程表	
//	Queue.push(menu_teachingplan_dayShow_fn,"课程表");
//	var myclasslist=Store.getMyClassList();
//	if(!myclasslist||myclasslist.length==0){
//		G_msg_pop("请先创建班级!");
//		return ;
//	}
//	if(!G_myCurClassuuid){
//		G_myCurClassuuid=myclasslist[0].uuid;
//	}
//	React.render(React.createElement(Teachingplan_show7Day, {
//			classuuid:G_myCurClassuuid,
//			classlist:G_selected_dataModelArray_byArray(myclasslist,"uuid","name")
//			}), document.getElementById('div_body'));
//	return;
//---------------------------------------------------------------------------------	
////幼儿园老版课程表	
//	var classList=Store.getMyClassList();
//	var classuuid;
//	var classname;
//	if(!classList||classList.length==0){
//		classuuid=null;
//		classname="";
//	}else{
//		classuuid=classList[0].uuid;
//		classname=classList[0].name;
//	}
//	ajax_teachingplan_dayShow(null,{uuid:classuuid,name:classname});
};

/* （首页）家长通讯录功能方法
 * @跳转kd_service发服务器请求
 * */
function parentContactByMyStudent() {
	ajax_parentContactByMyStudent();
};
/*
 * （首页）精品文章
 */
function menu_article_list_fn(){
  	Queue.push(menu_article_list_fn,"精品文章");
  	ajax_good_announce_div();
}
/*
* （首页）我的班级 show
* @跳转kd_service发服务器请求
* @show老师查看状态进入查看学生详情;
* */
function menu_class_students_fn() {
	//var classList=Store.getChooseClass(Store.getCurGroup().uuid);
	var classList=Store.getMyClassList();
	
	
	var classuuid;
	if(!classList||classList.length==0){
		classuuid=null;
	}else{
		classuuid=classList[0].uuid;
	}
	react_ajax_class_students_manage(classuuid);
};
/*
 * （首页）老师通讯录；
 * @跳转kd_service发服务器请求
 * */
function menu_Teacher_tel_fn() {
	Queue.push(menu_Teacher_tel_fn,"老师通讯录");
	var list=Store.getGroupNoGroup_wjd();
	if(!list||list.length==0){
		G_msg_pop("没有加入学校,没有数据.");
		return;
	}
	ajax_Teacher_tel_div(list[0].uuid);
};

/*
 * （首页）我的收藏；
 * @跳转kd_service发服务器请求
 * */
function menu_favorites_push_fn() {
	Queue.push(menu_favorites_push_fn,"我的收藏");
	ajax_favorites_div();
};

/*
 * (首页)我的信箱
 * @跳转kd_service发服务器请求
 * */
function menu_queryCountMsgByParents_message_fn() {
	ajax_queryCountMsgByParents_message();
};
/*
 * (首页)每日任务
 * @ menu_teacherDailyTask_fn
 * */
function menu_teacherDailyTask_fn() {
	Queue.push(menu_teacherDailyTask_fn,"每日任务");
	ajax_teacherDailyTask();
};
//老师注册
function menu_userinfo_reg_fn(){	
	React.render(React.createElement(Div_userinfo_reg,null)
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
}

function menu_userinfo_login_fn(){
	Queue.push(menu_userinfo_login_fn);
	var loginname = getCookie("bs_loginname");
	var password = getCookie("bs_password");
	var pw_checked = getCookie("pw_checked");
	
	React.render(React.createElement(Div_login,{loginname:loginname,password:password,pw_checked:pw_checked})
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
}

function menu_body_fn (){	
	$("#div_seesion_body").show();
	//$("#div_login").hide();
	$("#div_login").html(null);
	login_affter_init();
	menu_dohome();
}
//登录操作
function index_init(){
	G_CallPhoneFN.hideLoadingDialog();
	  if ($.AMUI.fullscreen.enabled) {
		    $.AMUI.fullscreen.request();
		}
	  ajax_getUserinfo(true);
	  
		MessageTimer.start();
}

//登录操作
window.onload=function(){ 
	index_init();
}; 









//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$管理区域$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

/*
 * (校务管理)
 * @跳转kd_service发服务器请求
 * */
function menu_group_myList_fn_byRight() {
	Queue.push(menu_group_myList_fn_byRight,"校务管理");
	ajax_group_myList_byRight();
}


/*
 * (信息管理)<校园公告><老师公告><精品文章><招生计划>
 * @types- 0:校园公告 1:老师公告 2：班级通知,3:"精品文章',4:"招生计划" 
 * @跳转kd_service发服务器请求
 * */
var announce_types="";
function menu_announce_list_fn_byRight(types,name) {
	Queue.push(function(){menu_announce_list_fn_byRight(types,name);},name);
	announce_types=types; 
	ajax_announce_listByGroup_byRight();
};

/*
 * (标头)老师管理管理功能
 * @跳转kd_service发服务器请求
 * */
var g_uesrinfo_groupuuid="";
function menu_userinfo_list_fn_byRight() {
	Queue.push(function(){menu_userinfo_list_fn_byRight();},"老师管理");
	if(!g_uesrinfo_groupuuid)g_uesrinfo_groupuuid=Store.getCurGroupByRight("PX_teacher_m").uuid;
	ajax_uesrinfo_listByGroup_div(g_uesrinfo_groupuuid);
};
/*
 * (标头)老师资料管理功能
 * @跳转kd_service发服务器请求
 * */
function menu_userTeacher_list_fn_byRight() {
	Queue.push(menu_userTeacher_list_fn_byRight,"老师资料管理");
	var list=Store.getGroup();
	if(!list||list.length==0){
		G_msg_pop("没有加入学校,没有数据.");
		return;
	}
	userTeacher_div_byRight(list[0].uuid);
};

/*
 * (标头)教学计划功能
 * @跳转widget发服务器请求
 * */
var G_myCurClassuuid=null;
var G_myClassList=null;
function menu_teachingplan_list_fn_byRight() {
//培训机构教学计划管理模块，列表代码	
	var groupList=Store.getGroupByRight("PX_teachingplan_m");	
	if(!groupList||groupList.length==0){
		alert("没有权限。");
		return;
	}
		var classList=Store.getChooseClass(groupList[0].uuid);
 		var class_uuid =null;
 		if(classList&&classList.length>0){
 			classuuid=classList[0].uuid;
 		}
 		G_myClassList=classList;
	px_ajax_teachingplan_byRight(classuuid);	
	return;
//---------------------------------------------------------------------------------
//幼儿园教学计划管理模块，新版代码		
//	Queue.push(menu_teachingplan_list_fn_byRight,"教学计划");
//	var groupList=Store.getGroupByRight("PX_teachingplan_m");
//	
//	if(!groupList||groupList.length==0){
//		alert("没有权限。");
//		return;
//	}	
//	var groupuuid=groupList[0].uuid;	
//
//	React.render(React.createElement(Teachingplan_show7Day_byRight, {
//		    groupuuid:groupuuid,
//		    groupList:G_selected_dataModelArray_byArray(groupList,"uuid","brand_name"),
//			}), document.getElementById('div_body'));
//	return;
//---------------------------------------------------------------------------------	
//幼儿园教学计划管理模块，老版代码	
//	var groupList=Store.getGroupByRight("PX_teachingplan_m");
//	
//	if(!groupList||groupList.length==0){
//		alert("没有权限。");
//		return;
//	}
//	Queue.push(menu_teachingplan_list_fn_byRight,"教学计划");
//	var groupuuid=groupList[0].uuid;
//	
//	React.render(React.createElement(Teachingplan_EventsTable_byRight, {
//		groupuuid:groupuuid,
//		groupList:G_selected_dataModelArray_byArray(groupList,"uuid","brand_name"),
//		responsive: true, bordered: true, striped :true,hover:true,striped:true
//		}), document.getElementById('div_body'));
};
/*
 * (标头)<园长信箱>
 * @跳转kd_service发服务器请求
 * */
function menu_queryLeaderMsgByParents_message_fn_byRight() {
	ajax_queryLeaderMsgByParents_message_byRight();
};



/*
 * (标头)班级管理 edit
 * @跳转kd_service发服务器请求
 * @edit老师编辑状态进入可以编辑模式;
 * */
function menu_class_list_fn_byRight() {
var  grouplist=Store.getGroupByRight("PX_class_m");
if(!grouplist||grouplist.length==0){
	alert("没有班级管理权限不能访问.");
	return;
}
	groupuuid=grouplist[0].uuid;
	ajax_Class_div_byRight(groupuuid);
};



/*
 * (标头)收支管理
 * @跳转kd_service发服务器请求
 * */
function menu_accounts_list_fn_byRight() {
	ajax_accounts_listByGroup_byRight();
};
/*
 * (标头)学生列表
 * @跳转kd_service发服务器请求
 * */
function menu_query_list_fn_byRight() {
	ajax_student_query_byRight();
};

/*
 * (标头)统计
 * */
function menu_statistics_list_fn_byRight() {
	Queue.push(menu_statistics_list_fn_byRight,"统计");
	
	var  grouplist=Store.getGroupByRight("PX_statistics_m");			
	var groupuuid;
	var now=new Date();	
	var begDateStr=G_week.getDateStr(now,-7);
	
	if(!grouplist||grouplist.length==0){
		groupuuid=null;
	}else{
		groupuuid=grouplist[0].uuid;
	}

	
	React.render(React.createElement(ECharts_Div_byRight, {
		begDateStr:begDateStr,
		groupuuid:groupuuid,
		statistics_type_list:PXECharts_ajax.getStatisticsTypeList(),
		group_list:G_selected_dataModelArray_byArray(grouplist,"uuid","brand_name")
		}), document.getElementById('div_body'));
};

/*
 * (标头)评价老师
 * @跳转kd_service发服务器请求
 * */
function menu_teachingjudge_list_fn_byRight () {
	ajax_teachingjudge_query_byRight();
};



/*
 * (标头)发布对外课程功能
 * */
//var G_myCurClassuuid=null;
//var G_myClassList=null;
function menu_course_byRight() {
   px_ajax_course_byRight();	
};

/*
 * (标头)对外发布老师资料
 * */
function menu_teacher_byRight() {
	   	 var group_list=Store.getGroup();
         var groupuuid=group_list[0].uuid;
         G_mygroup_choose=groupuuid;
	   ajax_teacher_div_byRight();	
};

/*
 * (对外校务管理)
 * @跳转kd_service发服务器请求
 * */
function menu_group_myList_fn_byRight_px() {
	Queue.push(menu_group_myList_fn_byRight_px,"对外校务管理");
	ajax_group_myList_byRight_px();
}

//用户登陆
function ajax_userinfo_login() {
	
	 var $btn = $("#btn_login");
	  $btn.button('loading');
	$.AMUI.progress.start();

	var loginname = $("#loginname").val();
	var password = $("#password").val();
	if(password.length!=32){
		 password=$.md5(password); 
	}
	
	
	var url = hostUrl + "rest/userinfo/login.json";
	$.ajax({
		type : "POST",
		url : url,
		data :{loginname:loginname,password:password,grouptype:2},
		dataType : "json",
		success : function(data) {
			 $btn.button('reset');
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				Store.clear();
				//判断是否保存密码，如果保存则放入cookie，否则清除cookie
				setCookie("bs_loginname", loginname);
				if($("#pw_checked")[0].checked){
					setCookie("bs_password", password);
					setCookie("pw_checked", "checked");
				} else {
					setCookie("bs_password", ""); 
					setCookie("pw_checked", "");
				}
				Store.setUserinfo(data.userinfo);
				Store.setGroup(data.list);
				PxRight.setUserRights(data.S_User_rights);
				
				G_CallPhoneFN.jsessionToPhone(data.JSESSIONID);
				
				menu_body_fn();
				
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			 $btn.button('reset');
			$.AMUI.progress.done();
			if(obj.responseText&&obj.responseText.indexOf("G_key_no_connect_server")){
				alert("没连接上互联网.");
			}else{
				alert(obj.status+","+textStatus+"="+errorThrown);
			}
		}
	});
}

function ajax_getUserinfo(isInit) {
	$.AMUI.progress.start();

	var url = hostUrl + "rest/userinfo/getUserinfo.json?grouptype=2";
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.userinfo)Store.setUserinfo(data.userinfo);
				if(data.list)Store.setGroup(data.list);
				PxRight.setUserRights(data.S_User_rights);
				G_CallPhoneFN.jsessionToPhone(data.JSESSIONID);			
				
				//PxLazyM.loadJS_for( getCookie("bs_grouptype"));
				menu_body_fn();
			} else {
				if(!isInit)alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
			
		},
		error : G_ajax_error_fn
	});
}
