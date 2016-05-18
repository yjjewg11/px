<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>${data.brand_name}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
 	<link rel="stylesheet" href="../../css/share.css?090132"/>
 	 <link rel="stylesheet" href="http://cdn.amazeui.org/amazeui/2.4.2/css/amazeui.min.css">
  <style>
    .header {
      text-align: center;
    }
    .header h1 {
      font-size: 200%;
      color: #333;
      margin-top: 30px;
    }
    .header p {
      font-size: 14px;
    }
  </style> 
</head>
<body>
 
 <h1>${data.brand_name}</h1>
  <h2> ${data.brand_name}|${data.link_tel}|${data.address}</h2>
  <h3>浏览${count}次</h3>
  <div class='am-gallery'>${data.description}</div>
  
  <%@ include file="subpage_footer.jsp"%> 
    <script src="http://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
<script src="http://cdn.amazeui.org/amazeui/2.4.2/js/amazeui.min.js"></script>

<script type="text/javascript">
  $('.am-gallery').pureview();
</script>
</body>


</html>