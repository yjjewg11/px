function login_affter_init(){
	 
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
			        "icon": "bars"
			      }
			    ]
			  }
			};

	//menu
	var menu_data=[];
	var t_menu=null;//第一级菜单
	var t_subMenu=null;//第二级子菜单
	t_menu={
	    "link": "##",
	    "title": "切换分校"
	  }
	t_subMenu=[];
	var t_group=Store.getGroup();
	for(var i=0;i<t_group.length;i++){
		t_subMenu.push({
			"fn":menu_group_change_fn.bind(this,t_group[i]),
		    "link": "##",
		    "title": t_group[i].brand_name
		  });
	}
	
	t_menu.subMenu=t_subMenu;
	menu_data.push(t_menu);
	
	
	var div_menu_data=[
	           		{
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
	                                      },   
	                                      {
		                                        "link": "##",
		                                        "title": "在线收费管理(未)"
		                                      },
                                    {
                                      "link": "##",
                                      "title": "老师考勤(未)"
                                    },
                                    {
                                        "link": "##",
                                        "title": "学生考勤(未)"
                                      }
                                    ],
	        		    "subCols": 2
	        		   
	        		  },
	        		  {
	                      "link": "##",
	                      "title": "老师管理",
	                      "fn":menu_userinfo_list_fn,
	                      "subCols": 2
	                     // "channelLink": "进入栏目 »",
	                    },
	                    {
	                        "link": "##",
	                        "title": "班级管理",
	                        "subMenu": [
	                                    {
	                                      "link": "##",
	                                      "fn":menu_class_list_fn,
	                                      "title": "现有班级"
	                                    },
	                                    
	                                    {
	                                        "link": "##",
	                                        "title": "邀请家长(未)"
	                                      },
	                                      {
	                                          "link": "##",
	                                          "title": "孩子考勤(未)"
	                                        }
	                                    ],
	                        "subCols": 2
	                       // "channelLink": "进入栏目 »",
	                       
	                      },
	                      {
	                    	  "link": "##",
	                    	   "fn":menu_teachingplan_list_fn,
	                          "title": "课程安排",
	                          "subCols": 2
	                         // "channelLink": "进入栏目 »",
	                         
	                        },
	                {
	                  "link": "##",
	                  "title": "食谱管理",
	                  "fn":menu_cookbookPlan_list_fn,
	                  "subCols": 2
	                 // "channelLink": "进入栏目 »",
	                 
	                },
	                  
	                    {
	                        "link": "##",
	                        "title": "发布消息",
	                        "subMenu": [
	                                    {
	                                      "fn":function(){menu_announce_list_fn(0)},
	                                      "title": "校园公告"
	                                    },
	                                    {
	                                    	  "fn":function(){menu_announce_list_fn(1)},
	                                        "title": "老师公告"
	                                      },
	                                    {
	                                    	  "fn":function(){menu_announce_list_fn(2)},
	                                        "title": "班级通知"
	                                      },
	                                      {
	                                          "link": "##",
	                                          "title": "招生计划(未)"
	                                        },
	                                        {
	                                        	
	                                            "link": "##",
	                                            "title": "图片管理(未)"
	                                          }
	                                    ],
	                        "subCols": 2
	                       // "channelLink": "进入栏目 »",
	                       
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
	                                            "title": "家长反馈(未)"
	                                          },
	                                          {
	                                              "link": "##",
	                                              "title": "分享文章(未)"
	                                            }
	                                        ],
	                            "subCols": 2
	                           // "channelLink": "进入栏目 »",
	                           
	                          },
	                          {
		                            "link": "##",
		                            "title": "仓库管理",
		                            "subMenu": [
		                                        {
		                                            "link": "##",
		                                            "title": "入库(未)"
		                                          },
		                                        {
		                                            "link": "##",
		                                            "title": "出库(未)"
		                                          },
		                                          {
			                                            "link": "##",
			                                            "title": "申请物品(未)"
			                                          },
		                                          {
		                                              "link": "##",
		                                              "title": "采购(未)"
		                                            }
		                                        ],
		                            "subCols": 2
		                           // "channelLink": "进入栏目 »",
		                           
		                          },
	                        
	                {
	                  "link": "##",
	                  "title": "我",
	                  "subCols": 3,
	                  "subMenu": [
	                    {
	                      "link": "##",
	                      "title": "修改资料(未)"
	                    },
	                    {
	                        "link": "##",
	                        "title": "修改密码(未)"
	                      },
	                     
	                    {
	                      "link": "##",
	                      "title": "设置(未)"
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

/**
 * 显示bodydiv,隐藏其他所有控件div
 */
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
		  console.log('点击的链接为：', nav);
	  } else {
	    e.preventDefault();
	    if( typeof  nav.fn=="function"){
	    	body_show();
	    	this.closeAll();
			 nav.fn();
			 
		 }
	    console.log('点击的链接为：', nav);
	    // do something
	    // this.closeAll(); //关闭二级菜单
	  }
	};

function menu_dohome(){
	Queue.push(menu_dohome);
	var div_Gallery_data=[
	                      {
	                    	    "img": hostUrl+"i/header.png",
	                    	    "link": "###",
	                    	    "title": "我(未)"
	                    	  },

	                    	  {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "javascript:menu_classnews_list_fn();",
		                    	    "title": "班级互动"
		                    	  },
	                    	  {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "###",
		                    	    "title": "家长互动(未)"
		                    	  },
		                    	  {
			                    	    "img": hostUrl+"i/header.png",
			                    	    "link": "###",
			                    	    "title": "我的班级通知(未)"
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
			                    	    "link": "###",
			                    	    "title": "今日食谱(未)"
			                    	  },
			                    	  {
				                    	    "img": hostUrl+"i/header.png",
				                    	    "link": "###",
				                    	    "title": "教学计划(未)"
				                    	  },
		                      {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "###",
		                    	    "title": "我的班级(未)"
		                    	  }
	                    	  ];
	React.render(React.createElement(AMUIReact.Gallery,{sm:3,md:4,lg:6,themes:'bordered',data:div_Gallery_data}), document.getElementById('div_body'));
}


 
//group
function menu_group_myList_fn() {
	Queue.push(menu_group_myList_fn);
	ajax_group_myList();
}


function menu_kd_group_reg_fn(){
	Queue.push(menu_class_list_fn);
	React.render(React.createElement(Div_kd_group_reg,null)
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
}
//班级管理
function menu_class_list_fn() {
	Queue.push(menu_class_list_fn);
	ajax_class_listByGroup(Store.getCurGroup().uuid);
};

function menu_teachingplan_list_fn(){
	//first 选择班级
	w_ch_class.open(ajax_teachingplan_listByClass);
	Queue.push(ajax_teachingplan_listByClass);
}

function menu_cookbookPlan_list_fn(){
	Queue.push(menu_cookbookPlan_list_fn);
	ajax_cookbookPlan_listByGroup(Store.getCurGroup().uuid);
}

//类型'0:普通通知 1:内部通知 2：班级通知',
var announce_types=1;
function menu_announce_list_fn(types) {
	announce_types=types;
	Queue.push(menu_announce_list_fn);
	ajax_announce_listByGroup(Store.getCurGroup().uuid);
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


function menu_userinfo_logout_fn(){
	ajax_userinfo_logout();
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
index_init();

