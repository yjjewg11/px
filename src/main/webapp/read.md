目录说明：
jsx/--jsx文件夹，不引入html，需要翻译为js文件。
jsb/--jsb文件夹下，翻译后的js文件，引入到html中。
kd/--幼儿园模块

kd/group.js--所有数据请求。方法名以：ajax_模块名_请求方法
ajax_userinfo_login
kd/index.js--菜单方法。menu_xx_fn
menu_kd_group_reg_fn
命名规则：
菜单功能按钮，调用方法：menu_xx_fn
公告组件（wedget）。入口方法：weget_xx_fn


方法说明：
menu_userinfo_login_fn();//跳转登录页面