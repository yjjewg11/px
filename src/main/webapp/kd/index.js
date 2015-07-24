function login_affter_init(){
	Vo.init();
	var div_header_props = {
			  "title": Store.getCurGroup().brand_name+"-"+Store.getUserinfo().name,
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
			        "link": "#right-link",
			        "title": "消息",
			        "customIcon":hostUrl+"i/icon-msg.png"
			      }
			    ]
			  }
			};
	

	
//envelope envelope-o envelope-square
	//menu
	//—————————————————————权限管理—————————————————————
	
	var menu_data=[];
	var t_menu=null;//第一级菜单
	var t_subMenu=null;//第二级子菜单
	
	
	//切换分校
	t_menu={
	    "link": "##",
	    "title": "切换分校"
	  };
	t_subMenu=[];
	var t_group=Store.getGroup();
	for(var i=0;i<t_group.length;i++){
		t_subMenu.push({
			"fn":menu_group_change_fn.bind(this,t_group[i]),
		    "link": "##",
		    "title": t_group[i].brand_name
		  });
	};
	
	t_menu.subMenu=t_subMenu;
	menu_data.push(t_menu);
	//切换分校  end
	
	
	//校务管理
	t_menu={
		    "link": "##",
		    "title": "校务管理",
		    "subMenu": [
		                {
		                	"fn":menu_group_myList_fn,
		                	 "link": "##",
                              "title": "校园列表"
                            },
                            {
                            	 "fn":menu_group_description_fn,
                                "link": "##",
                                "title": "校园介绍"
                              }
                            
                        ]
		  };
	/*
	 * 调用G_user_hasRight（）;
	 * 根据项目常量表对应权限检查是否拥有此权限;
	 * true-信息添加至队列中;
	 * false-没有此权限不予以添加绘制；
	 */
	if(G_user_hasRight("KD_group_m")){
		menu_data.push(t_menu);
	}
	//校务管理 end 

	
	//发布消息权限管理	
	t_menu={
            
                "link": "##",
                "title": "发布消息",
                "subMenu": [
                            {
                              "fn":function(){menu_announce_list_fn(0);},
                              "link": "##",
                              "title": "校园公告"
                            },
                            {
                            	  "fn":function(){menu_announce_list_fn(1);},
                            	  "link": "##",
                                "title": "老师公告"
                              },
                          
                              {
                            	  "fn":function(){menu_announce_list_fn(3);},
                                  "link": "##",
                                  "title": "招生计划(未)"
                                },
                              {
                                  "fn":function(){menu_announce_list_fn(4);},
                                  "link": "##",
                                  "title": "分享文章(未)"
                                }
                            ]                   
		  };
	/*
	 * 调用G_user_hasRight（）;
	 * 根据项目常量表对应权限检查是否拥有此权限;
	 * true-信息添加至队列中;
	 * false-没有此权限不予以添加绘制；
	 */
	if(G_user_hasRight("KD_announce_m")){
		menu_data.push(t_menu);
	}
	//发布消息权限管理end	
	
	//食谱管理
	t_menu={
                "link": "##",
                "title": "食谱管理",
                "fn":menu_cookbookPlan_list_fn,
                "subCols": 2
               // "channelLink": "进入栏目 »", 
		  };
	
	if(G_user_hasRight("KD_cookbookplan_m")){
		menu_data.push(t_menu);
	}
	//食谱管理end
	
	//教学课程管理
	t_menu={
      	   		"link": "##",
      	   		"fn":menu_teachingplan_list_fn,
      	   		"title": "课程安排",
      	   		"subCols": 2
        // "channelLink": "进入栏目 »",
		  };
	/*
	 * 调用G_user_hasRight（）;
	 * 根据项目常量表对应权限检查是否拥有此权限;
	 * true-信息添加至队列中;
	 * false-没有此权限不予以添加绘制；
	 */
	if(G_user_hasRight("KD_teachingplan_m")){
		menu_data.push(t_menu);
	}
	//教学课程管理end
	//——————————————————————————权限管理end—————————————————————————————————	
	
	
	


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
//	                      {
//
//	                         
//	                        },
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
	                                            "fn":menu_classnews_list_fn,
	                                            "title": "班级互动"
	                                          },
	                                          
	  	                                    {
	  	                                        "link": "##",
	  	                                     // "fn":menu_classnews_list_fn,
	  	                                        "title": "邀请家长(未)"
	  	                                      },
	                                          {
	                                            "link": "##",
	                                          //  "fn":menu_classnews_list_fn,
	                                            "title": "家长反馈(未)"
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
	                }
	                
	              ];
	
	menu_data=menu_data.concat(div_menu_data);

	React.render(React.createElement(AMUIReact.Header,div_header_props), document.getElementById('div_header'));
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

function menu_dohome(){
	
	
	$("#div_body").show();
	$("#div_widget_chooseUser").html("");
	$("#div_widget_chooseCook").html("");
	Queue.push(menu_dohome);
	var myhead_img=hostUrl+"i/header.png";
	var myhead_imgUuid=Store.getUserinfo().img;
	if(myhead_imgUuid)myhead_img=G_imgPath+myhead_imgUuid;
	var div_Gallery_data=[
	                      {
	                    	    "img": myhead_img,
	                    	    "link": "javascript:menu_userinfo_update_fn();",
	                    	    "title": "我"
	                    	  },

	                    	  {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "javascript:menu_classnewsbyMy_list_fn();",
		                    	    "title": "班级互动"
		                    	  },
		                    	  {
			                    	    "img": hostUrl+"i/header.png",
			                    	    "link": "javascript:menu_announce_mylist_fn();",
			                    	    "title": "公告"
			                    },
			                    {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "javascript:menu_teachingplan_dayShow_fn();",
		                    	    "title": "教学计划"
		                    	  },
		                    	  {
			                    	    "img": hostUrl+"i/header.png",
			                    	    "link": "javascript:menu_cookbookPlan_dayShow_fn();",
			                    	    "title": "今日食谱"
			                    	  },
	                    	  {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "###",
		                    	    "title": "我的信箱(未)"
		                    	  },
		                    	 
		                    	  {
			                    	    "img": hostUrl+"i/header.png",
			                    	    "link": "javascript:parentContactByMyStudent()",
			                    	    "title": "家长通讯录"
			                    	  }, 
		                    	  {
	                    	    "img": hostUrl+"i/header.png",
	                    	    "link": "###",
	                    	    "title": "签到(未)"
	                    	  },
	                    	  {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "###",
		                    	    "title": "花名册(未)"
		                    	  },
		                    	
			                    	
		                      {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "javascript:menu_class_students_fn()",
		                    	    "title": "我的班级"
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

//——————————————————标头——————————————————

// @Queue.push()方法Push
//实现页面缓存然后可以实现回退功能；

/*
 * (标头)老师管理管理功能
 * @跳转kd_service发服务器请求
 * */
function menu_userinfo_list_fn() {
	Queue.push(menu_userinfo_list_fn);
	ajax_uesrinfo_listByGroup(Store.getCurGroup().uuid);
};

/*
 * (标头)班级管理 edit
 * @跳转kd_service发服务器请求
 * @edit老师编辑状态进入可以编辑模式;
 * */
function menu_class_list_fn() {
	Queue.push(menu_class_list_fn);
	ajax_class_listByGroup(Store.getCurGroup().uuid);
};

/*
 * (标头)课程安排功能
 * @跳转kd_service发服务器请求
 * */
function menu_teachingplan_list_fn(){
	//first 选择班级
	 w_ch_class.open(ajax_teachingplan_listByClass);
	Queue.push(ajax_teachingplan_listByClass);
}

/*
 * (标头)食谱管理功能
 * @跳转kd_service发服务器请求
 * */
function menu_cookbookPlan_list_fn(){
	Queue.push(menu_cookbookPlan_list_fn);
	ajax_cookbookPlan_listByGroup(Store.getCurGroup().uuid);
}

/*
 * (标头)发布消息功能
 * @types- 0:校园公告 1:老师公告 2：班级通知,3:"招生计划"4:"分享文章' 
 * @跳转kd_service发服务器请求
 * */
var announce_types=1;
function menu_announce_list_fn(types) {
	announce_types=types;
	Queue.push(menu_announce_list_fn);
	ajax_announce_listByGroup(Store.getCurGroup().uuid);
};

/*
 * (标头)校务管理的校园列表功能
 * @跳转kd_service发服务器请求
 * */
function menu_group_myList_fn() {
	Queue.push(menu_group_myList_fn);
	ajax_group_myList();
}

/*
 * (标头)我功能中的注销用户
 * @ajax_userinfo_logout()：注销；
 * */
function menu_userinfo_logout_fn(){
	ajax_userinfo_logout();
}

//——————————————————首页大图标——————————————————
/*
 * （首页）公告功能方法；
 * @跳转kd_service发服务器请求
 * */
function menu_announce_mylist_fn() {
	Queue.push(menu_announce_mylist_fn);
	ajax_announce_Mylist();
};
/* （首页）学生通讯录功能方法
 * @parentContactByMyStudent:和服务器请求名字保持一致;
 * @跳转kd_service发服务器请求
 * */
function parentContactByMyStudent() {
	Queue.push(parentContactByMyStudent);
	ajax_parentContactByMyStudent();
};
/*
* （首页）我的班级 show
* @跳转kd_service发服务器请求
* @show老师查看状态进入查看学生详情;
* */
function menu_class_students_fn() {
	Queue.push(menu_class_students_fn);
	w_ch_class.open(function(uuid){react_ajax_class_students_manage(uuid,"show");},Store.getCurGroup().uuid);
	
};

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

function index_init(){
	  if ($.AMUI.fullscreen.enabled) {
		    $.AMUI.fullscreen.request();
		}
	  ajax_getUserinfo(true);
}

window.onload=function(){ 
	index_init();
}; 

