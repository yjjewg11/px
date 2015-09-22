//我选我的班级后的全局记录
var G_myclass_choose=null;
//我选我的学校后的全局记录
var G_mygroup_choose=null;
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
	if(G_user_hasRight("KD_group_m")){
		menu_data.push(t_menu);
	}

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
	                            },
	                          {
	                        	  "fn":function(){menu_announce_list_fn_byRight(4,"招生计划");},
	                              "link": "##",
	                              "title": "招生计划"
	                            }

	                        ]                   
		  };
	if(G_user_hasRight("KD_announce_m")){
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
                		   
                		  },
                      {
                          "fn":menu_userTeacher_list_fn_byRight,
                          "link": "##",
                          "title": "老师资料管理"
                        },
                      ]
        };

	if(G_user_hasRight("KD_teacher_m")){
		menu_data.push(t_menu);
	}
	
	
	
//————————————食谱管理<权限>——————————	
	t_menu={
                "link": "##",
                "title": "食谱管理",
                "fn":menu_cookbookPlan_list_fn_byRight,
                "subCols": 2
		  };
	
	if(G_user_hasRight("KD_cookbookplan_m")){
		menu_data.push(t_menu);
	}
	
	
//————————————课程安排<权限>——————————		
	t_menu={
      	   		"link": "##",
      	   		"fn":menu_teachingplan_list_fn_byRight,
      	   		"title": "课程安排",
      	   		"subCols": 2
		  };
	if(G_user_hasRight("KD_teachingplan_m")){
		menu_data.push(t_menu);
	}
	
//————————————园长信箱<权限>——————————		
	t_menu={
        "link": "##",
        "fn":menu_queryLeaderMsgByParents_message_fn_byRight,
        "title": "园长信箱"
      };
	if(G_user_hasRight("KD_Leader_Msg_m")){
		menu_data.push(t_menu);
	}
	t_menu= {
            "link": "##",
            "fn":menu_class_list_fn_byRight,
            "title": "班级管理"
          };
		if(G_user_hasRight("KD_class_m")){
			menu_data.push(t_menu);
		}
		//————————————签到查询<权限>——————————		
		t_menu={
	      	   		"link": "##",
	      	   		"title": "接送卡",
		      	   	 "subMenu": [
		                         {
		                           "fn":menu_class_sign_today_fn_byRight,
		                           "link": "##",
		                           "title": "今天签到"
		                         },
		                         {
		                   		    "link": "##",
		                   		    "title": "接送卡查询",
		                   		    "fn":menu_studentbind_byRight
		                   		   
		                   		  }
		                         ]
			  };
		if(G_user_hasRight("KD_class_m")){
			menu_data.push(t_menu);
		}
	t_menu= {
            "link": "##",
            "title": "学生列表",
            "fn":menu_query_list_fn_byRight
          };
		if(G_user_hasRight("KD_student_allquery")){
			menu_data.push(t_menu);
		}	
		t_menu= {
                "link": "##",
                "title": "统计",
                "fn":menu_statistics_list_fn_byRight
              };
			if(G_user_hasRight("KD_statistics_m")){
				menu_data.push(t_menu);
			}	
	t_menu= {
	                "link": "##",
	                "title": "老师评价",
	                "fn":menu_teachingjudge_list_fn_byRight
	              };
			
				if(G_user_hasRight("KD_teachingjudge_q")){
					menu_data.push(t_menu);
				}
	

		t_menu= {
                "link": "##",
                "fn":menu_accounts_list_fn_byRight,
                "title": "收支记录"
              };
			if(G_user_hasRight("KD_accounts_m")){
				menu_data.push(t_menu);
			}
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
		t_menu= {
	          	 "fn":menu_userteacher_fn,
	            "link": "##",
	            "title": "修改教师资料"
	          };
					
			div_menu_data.subMenu.push(t_menu);
		t_menu= {
                "link": "##",
                "fn":menu_hellp_fn,
                "title": "帮助"
              };
				
			div_menu_data.subMenu.push(t_menu);
			
	t_menu=  {
            "link": "##",
            "fn":menu_userinfo_logout_fn,
            "title": "注销"
          };
			
	if(!G_CallPhoneFN.isPhoneApp()){//app hide my button
		div_menu_data.subMenu.push(t_menu);
	}		
		
	//if(!G_CallPhoneFN.isPhoneApp()){//app hide my button
		menu_data.push(div_menu_data);
	//}
	
	$("#div_menu").html("");
	
	title_info_init("首页");
	
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
			                   	  { 
			                    	    "img": hostUrlCDN+"i/meirirenwu.png",
			                    	    "link": "javascript:menu_teacherDailyTask_fn()",
			                    	    "title": "每日任务"
			                    	  },
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
			                    	    "img": hostUrlCDN+"i/meirisipu.png",
			                    	    "link": "javascript:menu_cookbookPlan_dayShow_fn();",
			                    	    "title": "今日食谱"
			                    	  },
		                    	 
		                    	
//		                    	  {
//	                    	    "img": hostUrlCDN+"i/qiandao.png",
//	                    	    "link": "###",
//	                    	    "title": "签到(未)"
//	                    	  },
	                    	
		                    	  {
		                    		  "img": hostUrlCDN+"i/jpwz.png",
	                                  "link": "javascript:menu_article_list_fn()",
	                                  "title": "精品文章"
	                                },

	  		                 
			                      {
		                    	    "img": hostUrlCDN+"i/shoucang.png",
		                    	    "link": "javascript:menu_favorites_push_fn()",
		                    	    "title": "我的收藏"
		                    	  },
		                    	  {
		                    		  "img": hostUrlCDN+"i/qiandao.png",
	                                  "link": "javascript:menu_class_sign_today_fn()",
	                                  "title": "今日签到"
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



//±±±±±±±±±±±±±±±±±±±±首页大图标±±±±±±±±±±±±±±±±±±±±
/*
 * （首页）<班级互动>；
 * @g_classnews_class_list（我的班级列表取成全局变量);
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
function menu_teachingplan_dayShow_fn() {
	Queue.push(menu_teachingplan_dayShow_fn,"课程表");
	var myclasslist=Store.getMyClassList();
	if(!myclasslist||myclasslist.length==0){
		G_msg_pop("请先创建班级!");
		return ;
	}
	if(!G_myCurClassuuid){
		G_myCurClassuuid=myclasslist[0].uuid;
	}
	React.render(React.createElement(Teachingplan_show7Day, {
			classuuid:G_myCurClassuuid,
			classlist:G_selected_dataModelArray_byArray(myclasslist,"uuid","name")
			}), document.getElementById('div_body'));
	return;
	
	var classuuid;
	var classname;
	if(!classList||classList.length==0){
		classuuid=null;
		classname="";
	}else{
		classuuid=classList[0].uuid;
		classname=classList[0].name;
	}
	ajax_teachingplan_dayShow(null,{uuid:classuuid,name:classname});
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
//	   Queue.push(function(){ajax_queryCountMsgByParents_message();},"我的信箱");
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



/*
 * （首页）刷卡记录；
 * @跳转kd_service发服务器请求
 * */

function menu_class_sign_today_fn() {
	Queue.push(function(){menu_class_sign_today_fn();},"今日签到");
	var classList=Store.getMyClassList();
	if(!G_myclass_choose){
	
		var classuuid;
		if(!classList||classList.length==0){
			classuuid=null;
		}else{
			classuuid=classList[0].uuid;
		}
		G_myclass_choose=classuuid;
	}
	React.render(React.createElement(Teacher_class_sign_today,{
	//	events:formdata,
		classList:G_selected_dataModelArray_byArray(classList,"uuid" ,"name"),
		classuuid:G_myclass_choose
		}), document.getElementById('div_body'));
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
	if(!g_uesrinfo_groupuuid)g_uesrinfo_groupuuid=Store.getCurGroupByRight("KD_teacher_m").uuid;
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
 * (标头)食谱管理功能
 * @跳转kd_service发服务器请求
 * */
function menu_cookbookPlan_list_fn_byRight(groupuuid,weeknum){
	var cookbook_Group_uuid="";
	if(!groupuuid)cookbook_Group_uuid=Store.getCurGroupByRight("KD_cookbookplan_m").uuid;
	else cookbook_Group_uuid=groupuuid;
	ajax_cookbookPlan_listByGroup_byRight(cookbook_Group_uuid,weeknum);
}

/*
 * (标头)课程安排功能
 * @跳转widget发服务器请求
 * */
var G_myCurClassuuid=null;
function menu_teachingplan_list_fn_byRight() {
	Queue.push(menu_teachingplan_list_fn_byRight,"课程安排");
//	var myclasslist=Store.getMyClassList();
//	if(!myclasslist||myclasslist.length==0){
//		G_msg_pop("请先创建班级!");
//		return ;
//	}
//	if(!G_myCurClassuuid){
//		G_myCurClassuuid=myclasslist[0].uuid;
//	}
	var groupList=Store.getGroupByRight("KD_teachingplan_m");
	
	if(!groupList||groupList.length==0){
		alert("没有权限。");
		return;
	}	
	var groupuuid=groupList[0].uuid;
	
//	var classList=Store.getChooseClass(this.props.groupuuid);
//	var classuuid =null;
//	if(classList&&classList.length>0){
//		classuuid=classList[0].uuid;
//	}
//	var obj= {
//			groupuuid:this.props.groupuuid,
//			classList:G_selected_dataModelArray_byArray(classList,"uuid","name"),
//			classuuid:classuuid,
//	    	pageNo:0,
//	    	list: []
//	    };
////	this.ajax_list(obj);
//    return obj;	

	React.render(React.createElement(Teachingplan_show7Day_byRight, {
		    groupuuid:groupuuid,
		    groupList:G_selected_dataModelArray_byArray(groupList,"uuid","brand_name"),
			}), document.getElementById('div_body'));
	return;
//---------------------------------------------------------------------------------	
	var groupList=Store.getGroupByRight("KD_teachingplan_m");
	
	if(!groupList||groupList.length==0){
		alert("没有权限。");
		return;
	}
	Queue.push(menu_teachingplan_list_fn_byRight,"课程安排");
	groupuuid=groupList[0].uuid;
	
	React.render(React.createElement(Teachingplan_EventsTable_byRight, {
		groupuuid:groupuuid,
		groupList:G_selected_dataModelArray_byArray(groupList,"uuid","brand_name"),
		responsive: true, bordered: true, striped :true,hover:true,striped:true
		}), document.getElementById('div_body'));
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
	ajax_class_listByGroup_byRight();
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
 * @跳转kd_service发服务器请求
 * */
function menu_statistics_list_fn_byRight() {
	Queue.push(menu_statistics_list_fn_byRight,"统计");
	React.render(React.createElement(ECharts_Div_byRight, {
		statistics_type_list:PXECharts_ajax.getStatisticsTypeList(),
		group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("KD_statistics_m"),"uuid","brand_name")
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
 * （标头）签到查询；
 * @跳转kd_service发服务器请求
 * */

function menu_class_sign_today_fn_byRight() {
	Queue.push(function(){menu_class_sign_today_fn_byRight();},"签到查询");
	var  grouplist=Store.getGroupByRight("KD_class_m");			
		var groupuuid;

		if(!grouplist||grouplist.length==0){
			groupuuid=null;
		}else{
			groupuuid=grouplist[0].uuid;
		}


	var classList=Store.getChooseClass(grouplist[0].uuid);
	if(!G_myclass_choose){
	
		var classuuid;

		if(!classList||classList.length==0){
			classuuid=null;
		}else{
			classuuid=classList[0].uuid;
		}
		G_myclass_choose=classuuid;
	}
	React.render(React.createElement(Teacher_class_sign_today_byRight,{
		grouplist:G_selected_dataModelArray_byArray(grouplist,"uuid" ,"brand_name"),
		groupuuid:groupuuid,
		classList:G_selected_dataModelArray_byArray(classList,"uuid" ,"name"),
		classuuid:G_myclass_choose
		}), document.getElementById('div_body'));
};

/**
 * 
 */
function menu_studentbind_byRight(){
	Queue.push(function(){menu_studentbind_byRight();},"接送卡查询");
	var  grouplist=Store.getGroupByRight("KD_class_m");	
	if(!G_mygroup_choose){
		var groupuuid;
		if(!grouplist||grouplist.length==0){
			groupuuid=null;
		}else{
			groupuuid=grouplist[0].uuid;
		}
		G_mygroup_choose=groupuuid;
	}

	React.render(React.createElement(Studentbind_EventsTable_byRight,{
		grouplist:G_selected_dataModelArray_byArray(grouplist,"uuid" ,"brand_name"),
		groupuuid:G_mygroup_choose,		
		classuuid:G_myclass_choose
		}), document.getElementById('div_body'));
}