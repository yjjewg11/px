
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
	var div_menu_data=[
	                   {
	                          "link": "##",
	                          "fn":menu_accounts_list_fn,
	                          "title": "收支记录"
	                        },
	        {
		    "link": "##",
		    "title": "角色权限",
		    "fn":menu_role_list_fn
		   
		  },
		  {
              "link": "##",
              "title": "用户管理",
              "fn":menu_userinfo_list_fn_byRight,
              "subCols": 2
             // "channelLink": "进入栏目 »",
            },
    		  {
                "link": "##",
                "title": "信息管理",
                "fn":function(){admin_announce_list_fn_wjkj();},
              },
  		  {
                "link": "##",
                "title": "班级互动",
                "fn":function(){ajax_classnews_list_div_byRight(1);},
              },
            {
                "link": "##",
                "title": "家长管理",
                "fn":menu_Parent_fn_byRight,
                "subCols": 2
               // "channelLink": "进入栏目 »",
              }, 
            
            {
    		    "link": "##",
    		    "title": "问界平台授权",
    		    "fn":menu_ad_roleUser_list_fn
    		   
    		  },
    		  {
      		    "link": "##",
      		    "title": "幼儿园授权",
      		    "fn":menu_kd_roleUser_list_fn
      		   
      		  },
      		  {
        		    "link": "##",
        		    "title": "培训结构授权",
        		    "fn":menu_px_roleUser_list_fn
        		   
        		  },
		  {
              "link": "##",
              "title": "基础数据",
              "fn":menu_basedatatype_list_fn,
              "subCols": 2
             // "channelLink": "进入栏目 »",
            },
    	       {
                "link": "##",
                "title": "统计",
                "fn":menu_statistics_list_admin_byRight
              },
            {
                "link": "##",
                "title": "数据纠正",
                "subCols": 3,
                "subMenu": [
    	                    {
    	                    	 "fn":menu_wenjieAdmin_dataRefresh_fn,
    	                      "link": "##",
    	                      "title": "数据纠正"
    	                    }
    	                  ]
              },
              {
                  "link": "##",
                  "title": "帮助文档",
                  "subCols": 3,
                  "subMenu": [
      	                    {
      	                    	 "fn":function(){menu_Help_fn(91,"幼儿园帮助文档");},
      	                      "link": "##",
      	                      "title": "幼儿园帮助文档"
      	                    },
      	                    {
      	                    	 "fn":function(){menu_Help_fn(92,"培训机构帮助文档");},
      	                        "link": "##",
      	                        "title": "培训机构帮助文档"
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
	
	

	React.render(React.createElement(AMUIReact.Header,div_header_props), document.getElementById('div_header'));
	React.render(React.createElement(AMUIReact.Menu,{cols:4,data:div_menu_data,onSelect:div_menu_handleClick}), document.getElementById('div_menu'));

}

/**
 * 显示bodydiv,隐藏其他所有控件div
 */
function body_show(){
	$("#div_body").show();
	$("#div_widget_chooseUser").html("");
	$("#div_widget_chooseCook").html("");
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
		                    	    "title": "我的通知公告"
		                    	  },
		                    	  {
			                    	    "img": hostUrl+"i/header.png",
			                    	    "link": "###",
			                    	    "title": "我的班级通知"
			                    	  },
			                    	  {
				                    	    "img": hostUrl+"i/header.png",
				                    	    "link": "###",
				                    	    "title": "我"
				                    	  },
		                    	  {
	                    	    "img": hostUrl+"i/header.png",
	                    	    "link": "###",
	                    	    "title": "点名"
	                    	  },
		                      {
		                    	    "img": hostUrl+"i/header.png",
		                    	    "link": "###",
		                    	    "title": "我的班级"
		                    	  }
	                    	  ];
	React.render(React.createElement(AMUIReact.Gallery,{sm:3,md:4,lg:6,themes:'bordered',data:div_Gallery_data}), document.getElementById('div_body'));
}



//group
function menu_group_myList_fn() {
	Queue.push(menu_group_myList_fn);
	ajax_group_myList();
}

/*
 * (标头)统计
 * */
function menu_statistics_list_admin_byRight() {
	Queue.push(function(){menu_statistics_list_admin_byRight();},"统计");
	React.render(React.createElement(ECharts_Div_admin, {
		statistics_type_list:PXECharts_ajax.getStatisticsTypeList(),
		group_list:G_selected_dataModelArray_byArray(Store.getGroupByRight("PX_statistics_m"),"uuid","brand_name")
		}), document.getElementById('div_body'));
};

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

function menu_wenjieAdmin_dataRefresh_fn(){
	ajax_wenjieAdmin_dataRefresh();
}


function menu_userinfo_logout_fn(){
	ajax_userinfo_logout();
}
//取信息管理数组方法
function G_getMsgProps() {
	 var data = [
	            {value: '0', label: '校园公告'},
	            {value: '1', label: '老师公告'},
	            {value: '2', label: '班级通知'},
	            {value: '3', label: '精品文章'},
	            {value: '4', label: '招生计划'}
	          ];
	    return {
	      msg_list: data
	    };
	  }
  /*
   * (信息管理)<校园公告><老师公告><精品文章><招生计划>
   * @types- 0:校园公告 1:老师公告 2：班级通知,3:"精品文章',4:"招生计划" 
   * @跳转kd_service发服务器请求
   * */
var announce_types="";
function admin_announce_list_fn_wjkj() {
	Queue.push(function(){admin_announce_list_fn_wjkj();});
	announce_types=1; 
	admin_announce_listByGroup_wjkj(0);
};
/*
 * (帮助管理)<幼儿园帮助文档><培训机构帮助文档>
 * @types- 91:幼儿园帮助文档  92:培训机构帮助文档
 * @跳转kd_service发服务器请求
 * */
var announce_Helptypes="";
function menu_Help_fn(types,name) {
	Queue.push(function(){menu_Help_fn(types,name);},name);
	announce_Helptypes=types; 
	ajax_announce_Help_byRight();
};
function menu_body_fn (){
	$("#div_seesion_body").show();
	//$("#div_login").hide();
	$("#div_login").html(null);

	login_affter_init();
	menu_dohome();
}
ajax_getUserinfo(true);
//如果需要在手机或平板等触摸设备上使用 React，需要调用
React.initializeTouchEvents(true);// 启用触摸事件处理。