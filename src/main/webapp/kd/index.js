function login_affter_init(){
	Vo.init();
	//主页顶部按钮；
	var div_header_props = {
			  "title":"主页",
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
			    "right": [
			      {
			        "link": "javascript:menu_queryMyTimely_fn()",
			        "customIcon":hostUrl+"i/icon-msg-wu.png",
			        "title": "消息"
			      }
			    ]
			  }
			};
	

	

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
		    "fn":menu_group_myList_fn
                                            
		  };
	if(G_user_hasRight("KD_group_m")){
		menu_data.push(t_menu);
	}

//————————————发布消息<权限>——————————	
	t_menu={
	            "link": "##",
	            "title": "信息管理",
	            "subMenu": [
	                        {
	                          "fn":function(){menu_announce_list_fn(0,"校园公告",null);},
	                          "link": "##",
	                          "title": "校园公告"
	                        },
	                        {
	                        	  "fn":function(){menu_announce_list_fn(1,"老师公告",null);},
	                        	  "link": "##",
	                            "title": "老师公告"
	                          },
	                          {
	                              "fn":function(){menu_announce_list_fn(3,"精品文章",null);},
	                              "link": "##",
	                              "title": "精品文章"
	                            },
	                          {
	                        	  "fn":function(){menu_announce_list_fn(4,"招生计划",null);},
	                              "link": "##",
	                              "title": "招生计划"
	                            }

	                        ]                   
		  };
	if(G_user_hasRight("KD_announce_m")){
		menu_data.push(t_menu);
	}

	
//————————————食谱管理<权限>——————————	
	t_menu={
                "link": "##",
                "title": "食谱管理",
                "fn":menu_cookbookPlan_list_fn,
                "subCols": 2
		  };
	
	if(G_user_hasRight("KD_cookbookplan_m")){
		menu_data.push(t_menu);
	}
	
	
//————————————课程安排<权限>——————————		
	t_menu={
      	   		"link": "##",
      	   		"fn":menu_teachingplan_list_fn,
      	   		"title": "课程安排",
      	   		"subCols": 2
		  };
	if(G_user_hasRight("KD_teachingplan_m")){
		menu_data.push(t_menu);
	}
	
//————————————园长信箱<权限>——————————		
	t_menu={
        "link": "##",
        "fn":menu_queryLeaderMsgByParents_message_fn,
        "title": "园长信箱"
      };
	if(G_user_hasRight("KD_Leader_Msg_m")){
		menu_data.push(t_menu);
	}

	
	
	

//±±±±±±±±±±±±±±±±±±±±±±±±±±标头按钮±±±±±±±±±±±±±±±±±±±±±±±±±±
	var div_menu_data=[
	           		
	        		  
	        		  {
	                      "link": "##",
	                      "title": "老师管理",
	                      "fn":menu_userinfo_list_fn
	                    },
	                    {
	                        "link": "##",
	                        "fn":menu_class_list_fn,
	                        "title": "班级管理"
	                      },
	                        {
	                            "link": "##",
	                            "fn":menu_accounts_list_fn,
	                            "title": "收支记录"
	                          },                     
	                        {
	                            "link": "##",
	                            "title": "互动",
	                            "subMenu": [
	                                        {
	                                            "link": "##",
	                                            "fn":function(){ajax_classnews_list_div(1);},
	                                            "title": "班级互动"
	                                          },
	                                          
	  	                                    {
	  	                                        "link": "##",
	  	                                     // "fn":menu_classnews_list_fn,
	  	                                        "title": "邀请家长(未)"
	  	                                      }
	                                        ]
	                           
	                          },	
	                        
	                {
	                  "link": "##",
	                  "title": "我",
	                  "subCols": 3,
	                  "subMenu": [
	                    {
	                    	 "fn":menu_userinfo_update_fn,
	                      "link": "##",
	                      "title": "修改资料"
	                    },
	                    {
	                    	 "fn":menu_userinfo_updatepassword_fn,
	                        "link": "##",
	                        "title": "修改密码"
	                      },
	                    {
	                        "link": "##",
	                        "fn":menu_userinfo_logout_fn,
	                        "title": "注销"
	                      }
	                  ]
	                },      	
	                {
	                      "link": "##",
	                      "title": "学生列表",
	                      "fn":menu_query_list_fn
	                    },
	                {
	                      "link": "##",
	                      "title": "统计",
	                      "fn":menu_statistics_list_fn
	                    }
	                
	              ];
	
	menu_data=menu_data.concat(div_menu_data);

	React.render(React.createElement(AMUIReact.Header,div_header_props), document.getElementById('div_header'));
	React.render(React.createElement(AMUIReact.Menu,{cols:4,data:menu_data,onSelect:div_menu_handleClick}), document.getElementById('div_menu'));
	MessageTimer.start();
}
//统一换标头方法
function title_info_init(type){
	//主页顶部按钮；
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
			    "right": [
			      {
			        "link": "javascript:menu_queryMyTimely_fn()",
			        "customIcon":hostUrl+"i/icon-msg-wu.png",
			        "title": "消息"
			      }
			    ]
			  }
			};

	React.render(React.createElement(AMUIReact.Header,div_header_title_info), document.getElementById('div_header'));
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
	var myhead_img=hostUrl+"i/header.png";
	var myhead_imgUuid=Store.getUserinfo().img;
	if(myhead_imgUuid)myhead_img=G_imgPath+myhead_imgUuid;
	var div_Gallery_data=[
	                    	  {
		                    	    "img": hostUrl+"i/hudong.png",
		                    	    "link": "javascript:menu_classnewsbyMy_list_fn();",
		                    	    "title": "班级互动"
		                    	  },
		                    	  {
			                    	    "img": hostUrl+"i/gonggao.png",
			                    	    "link": "javascript:menu_announce_mylist_fn();",
			                    	    "title": "公告"
			                    },
			                    {
		                    	    "img": hostUrl+"i/kechengbiao.png",
		                    	    "link": "javascript:menu_teachingplan_dayShow_fn();",
		                    	    "title": "课程表"
		                    	  },
		                    	  {
			                    	    "img": hostUrl+"i/meirisipu.png",
			                    	    "link": "javascript:menu_cookbookPlan_dayShow_fn();",
			                    	    "title": "今日食谱"
			                    	  },
		                    	 
		                    	  {
			                    	    "img": hostUrl+"i/JZtongxunlu.png",
			                    	    "link": "javascript:parentContactByMyStudent()",
			                    	    "title": "家长通讯录"
			                    	  }, 
//		                    	  {
//	                    	    "img": hostUrl+"i/qiandao.png",
//	                    	    "link": "###",
//	                    	    "title": "签到(未)"
//	                    	  },
	                    	  {
		                    	    "img": hostUrl+"i/xinxiang.png",
		                    	    "link": "javascript:menu_queryCountMsgByParents_message_fn()",
		                    	    "title": "我的信箱"
		                    	  },
		                    	  {
		                    		  "img": hostUrl+"i/jpwz.png",
	                                  "link": "javascript:menu_article_list_fn()",
	                                  "title": "精品文章"
	                                },
			                    	
		                      {
		                    	    "img": hostUrl+"i/banji.png",
		                    	    "link": "javascript:menu_class_students_fn()",
		                    	    "title": "我的班级"
		                    	  },

	  		                    {
			                    	    "img": hostUrl+"i/laoshitongxunlu.png",
			                    	    "link": "javascript:menu_Teacher_tel_fn()",
			                    	    "title": "老师通讯录"
			                    },
			                      {
		                    	    "img": hostUrl+"i/shoucang.png",
		                    	    "link": "javascript:menu_favorites_push_fn()",
		                    	    "title": "我的收藏"
		                    	  },
			                   	  { 
			                    	    "img": hostUrl+"i/meirirenwu.png",
			                    	    "link": "javascript:menu_teacherDailyTask_fn()",
			                    	    "title": "每日任务"
			                    	  }
	                    	  ];
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
 * (校务管理)
 * @跳转kd_service发服务器请求
 * */
function menu_group_myList_fn() {
	Queue.push(menu_group_myList_fn,"校务管理");
	ajax_group_myList();
}
/*
 * (信息管理)<校园公告><老师公告><精品文章><招生计划>
 * @types- 0:校园公告 1:老师公告 2：班级通知,3:"精品文章',4:"招生计划" 
 * @跳转kd_service发服务器请求
 * */
var announce_types="";
var Group_name="";
function menu_announce_list_fn(types,name,groupuuid) {
	var Group_uuid=null;
	Queue.push(function(){menu_announce_list_fn(types,name,groupuuid);},name);
	announce_types=types; 
	Group_name=name;
	if(!groupuuid)Group_uuid=Store.getCurGroup().uuid;
	else Group_uuid=groupuuid;
	ajax_announce_listByGroup(Group_uuid,name);
};
/*
 * (标头)食谱管理功能
 * @跳转kd_service发服务器请求
 * */
function menu_cookbookPlan_list_fn(groupuuid,weeknum){
	var cookbook_Group_uuid="";
	if(!groupuuid)cookbook_Group_uuid=Store.getCurGroup().uuid;
	else cookbook_Group_uuid=groupuuid;
	ajax_cookbookPlan_listByGroup(cookbook_Group_uuid,weeknum);
}
/*
 * (标头)课程安排功能
 * @跳转widget发服务器请求
 * */
function menu_teachingplan_list_fn(){
	var groupList=Store.getGroup();
	var classList=Store.getChooseClass(groupList[0].uuid);
	ajax_teachingplan_listByClass(groupList[0].uuid,classList[0].uuid);
}
/*
 * (标头)<园长信箱>
 * @跳转kd_service发服务器请求
 * */
function menu_queryLeaderMsgByParents_message_fn() {
	ajax_queryLeaderMsgByParents_message();
};
/*
 * (标头)老师管理管理功能
 * @跳转kd_service发服务器请求
 * */
function menu_userinfo_list_fn() {
	ajax_uesrinfo_listByGroup(Store.getCurGroup().uuid);
};
/*
 * (标头)班级管理 edit
 * @跳转kd_service发服务器请求
 * @edit老师编辑状态进入可以编辑模式;
 * */
function menu_class_list_fn() {
	ajax_class_listByGroup(Store.getCurGroup().uuid);
};
/*
 * (标头)收支管理
 * @跳转kd_service发服务器请求
 * */
function menu_accounts_list_fn() {
	ajax_accounts_listByGroup(Store.getCurGroup().uuid);
};
/*
 * (标头)注销用户
 * @ ajax_userinfo_logout：注销；
 * */
function menu_userinfo_logout_fn(){
	ajax_userinfo_logout();
}
/*
 * (标头)学生列表
 * @跳转kd_service发服务器请求
 * */
function menu_query_list_fn() {
	ajax_student_query();
};

/*
 * (标头)统计
 * @跳转kd_service发服务器请求
 * */
function menu_statistics_list_fn() {
	Queue.push(menu_statistics_list_fn,"统计");
	React.render(React.createElement(ECharts_Div, {
		statistics_type_list:PXECharts_ajax.getStatisticsTypeList(),
		group_list:G_selected_dataModelArray_byArray(Store.getGroup(),"uuid","brand_name")
		}), document.getElementById('div_body'));
};

//±±±±±±±±±±±±±±±±±±±±首页大图标±±±±±±±±±±±±±±±±±±±±
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
function menu_teachingplan_dayShow_fn() {
	var classList=Store.getChooseClass(Store.getCurGroup().uuid);
	ajax_teachingplan_dayShow(null,{uuid:classList[0].uuid,name:classList[0].name});
};
/*
 * （首页）每日食谱
 * 调用ajax_cookbookPlan_dayShow：每天食谱计划
 * */
function menu_cookbookPlan_dayShow_fn() {
	ajax_cookbookPlan_dayShow(null);
};
/* （首页）家长通讯录功能方法
 * @跳转kd_service发服务器请求
 * */
function parentContactByMyStudent() {
	ajax_parentContactByMyStudent();
};
/*
 * （首页）精品文章
 * @menu_announce_list_fn:直接调用发布消息中的方法
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
	var classList=Store.getChooseClass(Store.getCurGroup().uuid);
	react_ajax_class_students_manage(classList[0].uuid,"show");
};
/*
 * （首页）老师通讯录；
 * @跳转kd_service发服务器请求
 * */
function menu_Teacher_tel_fn() {
	Queue.push(menu_Teacher_tel_fn,"老师通讯录");
	ajax_Teacher_listByGroup(Store.getCurGroup().uuid);
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
//	   Queue.push(function(){ajax_queryCountMsgByParents_message();},"我的信箱");
	ajax_teacherDailyTask();
};
//老师注册
function menu_userinfo_reg_fn(){	
	ajax_loaddata_group_list_for_userinfo_reg();	
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
}

//登录操作
window.onload=function(){ 
	index_init();
}; 

