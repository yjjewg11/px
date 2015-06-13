var userinfo=Store.getUserinfo();
if(userinfo==null)userinfo={};

var cur_group=Store.getCurGroup();

var div_header_props = {
		  "title": cur_group.company_name+"-"+userinfo.name,
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
React.render(React.createElement(AMUIReact.Header,div_header_props), document.getElementById('div_header'));

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

	React.render(React.createElement(AMUIReact.Menu,{cols:4,data:div_menu_data,onSelect:div_menu_handleClick}), document.getElementById('div_menu'));

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
menu_dohome();

