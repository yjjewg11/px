<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>${group.brand_name}-${data.title}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" href="../../css/share.css?090132"/>
	 <link rel="stylesheet" href="http://cdn.amazeui.org/amazeui/2.4.2/css/amazeui.min.css">
</head>
<body>
 
 <h2  class="art_title">${data.title}</h2>
 <div class="art_meta">
  <p> ${group.brand_name}|${group.link_tel}|${group.address}</p>
  </div>
 <div  class='am-gallery'>${data.message}</div>
  
<%@ include file="subpage_footer.jsp"%> 
  
  <script src="http://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
<script src="http://cdn.amazeui.org/amazeui/2.4.2/js/amazeui.min.js"></script>

<script type="text/javascript">
  $('.am-gallery').pureview();
</script>

  
</body>
</html>