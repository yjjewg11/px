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
			        "title": "消息",
			        "customIcon":hostUrl+"i/icon-msg.png"
			      }
			    ]
			  }
			};
//envelope envelope-o envelope-square
	//menu
	var menu_data=[];
	var div_menu_data=[
	           		{
	        		    "link": "##",
	        		    "title": "幼儿园介绍"
	        		  },
	                     
	                        {
	                            "link": "##",
	                            "title": "互动",
	                            "subMenu": [
	  	                                    {
	  	                                        "link": "##",
	  	                                        "title": "给老师写信"
	  	                                      },
	                                          {
	                                            "link": "##",
	                                            "title": "给院长写信"
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
	var myhead_img=hostUrl+"i/header.png";
	var myhead_imgUuid=Store.getUserinfo().img;
	if(myhead_imgUuid)myhead_img=G_imgPath+myhead_imgUuid;
	var div_Gallery_data=[
	                      {
	                    	    "img": myhead_img,
	                    	    "link": "javascript:menu_userinfo_update_fn();",
	                    	    "title": "我的宝贝"
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
		                    	    "link": "###",
		                    	    "title": "签到记录"
		                    	  },
			                    {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "javascript:menu_teachingplan_dayShow_fn();",
		                    	    "title": "课程表"
		                    	  },
		                    	  {
			                    	    "img": hostUrl+"i/header.png",
			                    	    "link": "javascript:menu_cookbookPlan_dayShow_fn();",
			                    	    "title": "今日食谱"
			                    	  },
			                    	  {
			                    	    "img": hostUrl+"i/header.png",
			                    	    "link": "javascript:menu_cookbookPlan_dayShow_fn();",
			                    	    "title": "评价老师"
			                    	  },
			                    	  {
				                    	    "img": hostUrl+"i/header.png",
				                    	    "link": "javascript:menu_cookbookPlan_dayShow_fn();",
				                    	    "title": "我的关注"
				                    	  },
			                    	  {
			                    	    "img": hostUrl+"i/header.png",
			                    	    "link": "javascript:menu_cookbookPlan_dayShow_fn();",
			                    	    "title": "精品文章"
			                    	  },{
				                    	    "img": hostUrl+"i/header.png",
				                    	    "link": "javascript:menu_cookbookPlan_dayShow_fn();",
				                    	    "title": "特长课程"
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

function menu_announce_mylist_fn() {
	Queue.push(menu_announce_mylist_fn);
	ajax_announce_Mylist();
};

function menu_userinfo_reg_fn(){
	
	ajax_loaddata_group_list_for_userinfo_reg();
	
}
//登录界面
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

