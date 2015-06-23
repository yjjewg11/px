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
		        "link": hostUrl + "/kd/index.html",
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
        		    "title": "权限角色",
        		    "subMenu": [
        		                {
        		                  "link": "##",
        		                  "fn":menu_right_list_fn,
        		                  "title": "权限管理"
        		                },
        		                {
        			                  "link": "##",
        			                  "fn":menu_role_list_fn,
        			                  "title": "角色管理"
        			                },
        		                ],
        		    "subCols": 2
        		   
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
                      "title": "设置"
                    }
                  ]
                }
                
              ];

var div_menu_handleClick = function(nav, index, e) {
	  if (nav && nav.subMenu) {
	    // 有二级菜单的链接点击了
		 if( typeof  nav.fn=="function"){
			 nav.fn();
			 this.closeAll();
		 }
		  console.log('点击的链接为：', nav);
	  } else {
	    e.preventDefault();
	    if( typeof  nav.fn=="function"){
			 nav.fn();
			 this.closeAll();
		 }
	    console.log('点击的链接为：', nav);
	    // do something
	    // this.closeAll(); //关闭二级菜单
	  }
	};

	React.render(React.createElement(AMUIReact.Menu,{cols:4,data:div_menu_data,onSelect:div_menu_handleClick}), document.getElementById('div_menu'));

function ajax_dohome(){
	Queue.push(ajax_dohome);
	var div_Gallery_data=[
	                      {
	                    	    "img": hostUrl+"i/header.png",
	                    	    "link": "###",
	                    	    "title": "我"
	                    	  }
	                    	  ];
	React.render(React.createElement(AMUIReact.Gallery,{themes:'bordered',data:div_Gallery_data}), document.getElementById('div_body'));
}
ajax_dohome();

