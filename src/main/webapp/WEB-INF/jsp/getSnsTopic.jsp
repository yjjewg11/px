<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>问界互动家园-${data.title}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" href="../../css/share.css?090132"/>
</head>
<body >
 
 <h2  class="art_title">${data.title}</h2>
 <div class="art_meta">
 <p>${show_time}|${data.create_user}|赞成 ${data.yes_count}|反对${data.no_count}评论${data.reply_count}| 浏览${count}
  </p>
  </div>
  <div>${data.content}</div>
  
<%@ include file="subpage_footer.jsp"%> 
  
</body>
</html>