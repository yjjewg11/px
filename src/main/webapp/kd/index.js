
var div_header_props = {
		  "title": Store.getCurGroup().company_name+"-"+Store.getUserinfo().name,
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
        		    "fn":menu_group_myList_fn,
        		    "title": "校园管理",
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
                                        "title": "邀请家长"
                                      },
                                      {
                                          "link": "##",
                                          "title": "孩子考勤"
                                        }
                                    ],
                        "subCols": 2
                       // "channelLink": "进入栏目 »",
                       
                      },
                      {
                          "link": "##",
                          "title": "课程安排",
                          "subCols": 2
                         // "channelLink": "进入栏目 »",
                         
                        },
                {
                  "link": "##",
                  "title": "每日食谱",
                  "subCols": 2
                 // "channelLink": "进入栏目 »",
                 
                },
                  
                    {
                        "link": "##",
                        "title": "发布消息",
                        "subMenu": [
                                    {
                                      "link": "##",
                                      "title": "发布公告"
                                    },
                                    {
                                        "link": "##",
                                        "title": "发布通知"
                                      },
                                      {
                                          "link": "##",
                                          "title": "招生计划"
                                        },
                                        {
                                            "link": "##",
                                            "title": "图片管理"
                                          }
                                    ],
                        "subCols": 2
                       // "channelLink": "进入栏目 »",
                       
                      },
                      
                        {
                            "link": "##",
                            "title": "家长互动",
                            "subMenu": [
                                        {
                                          "link": "##",
                                          "title": "班级圈"
                                        },
                                        {
                                            "link": "##",
                                            "title": "家长反馈"
                                          },
                                          {
                                              "link": "##",
                                              "title": "分享文章"
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
                      "title": "修改资料"
                    },
                    {
                        "link": "##",
                        "title": "修改密码"
                      },
                      {
                          "link": "##",
                          "title": "重置密码"
                        },
                    {
                      "link": "##",
                      "title": "设置"
                    },
                    {
                        "link": "##",
                        "fn":menu_userinfo_logout_fn,
                        "title": "注销"
                      }
                  ]
                }
                
              ];

var div_menu_handleClick = function(nav, index, e) {
	  if (nav && nav.subMenu) {
	    // 有二级菜单的链接点击了
		 if( typeof  nav.fn=="function"){
			 nav.fn();
			 w_ch_user.hide();
			 this.closeAll();
		 }
		  console.log('点击的链接为：', nav);
	  } else {
	    e.preventDefault();
	    if( typeof  nav.fn=="function"){
			 nav.fn();
			 w_ch_user.hide();
			 this.closeAll();
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
	React.render(React.createElement(AMUIReact.Gallery,{themes:'bordered',data:div_Gallery_data}), document.getElementById('div_body'));
}



//用户登陆
function login() {
	
	 var $btn = $("#btn_login");
	  $btn.button('loading');
	$.AMUI.progress.start();

	var loginname = $("#loginname").val();
	var password = $("#password").val();
	if(password.length!=32){
		 password=$.md5(password); 
	}
	
	var url = hostUrl + "rest/userinfo/login.json?loginname=" + loginname + "&password="
			+ password;
	$.ajax({
		type : "POST",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			 $btn.button('reset');
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
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
				menu_body_fn();
				
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			 $btn.button('reset');
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}

function menu_kd_group_reg_fn(){
	Queue.push(menu_class_list_fn);
	React.render(React.createElement(Div_kd_group_reg,null)
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
}

function menu_userinfo_reg_fn(){
	
	$.AMUI.progress.start();
    var url = hostUrl + "rest/group/list.json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		 async: false,
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Div_userinfo_reg,{group_list:data.list})
						, document.getElementById('div_login'));
				$("#div_seesion_body").hide();
				
			} else {
				alert("加载公司数据失败："+data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
		}
	});
	
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

//用户登陆
function ajax_getUserinfo(isInit) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getUserinfo.json";
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
				menu_body_fn();
			} else {
				if(!isInit)alert(data.ResMsg.message);
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
}


function menu_body_fn (){
	$("#div_seesion_body").show();
	//$("#div_login").hide();
	$("#div_login").html(null);
	menu_dohome();
	React.render(React.createElement(AMUIReact.Header,div_header_props), document.getElementById('div_header'));
	React.render(React.createElement(AMUIReact.Menu,{cols:4,data:div_menu_data,onSelect:div_menu_handleClick}), document.getElementById('div_menu'));
}
ajax_getUserinfo(true);

