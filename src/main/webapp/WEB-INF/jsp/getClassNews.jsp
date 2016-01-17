<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>  
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>问界互动家园</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >
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
 <c:choose>  
         <c:when test="${empty url}">     
               <div>${data.content}</div>
         </c:when>  
         <c:otherwise>  
              <a href="${url}"><div>${data.content}</div></a>
         </c:otherwise>     
</c:choose> 


  <div>
  
   <ul  class="am-gallery am-avg-sm-3 am-avg-md-4 am-avg-lg-6 am-gallery-imgbordered">
			   
			   
			   <c:forEach items="${data.imgsList}" varStatus="i" var="item" >  
     	  <li>			     			
			     	    <div class="am-gallery-item">
			     		  <a href='${fn:substringBefore(item, "@")}' title="">
			     		    <img src="${item}" alt=""  data-rel='${fn:substringBefore(item, "@")}'/>
                          </a>
			     		</div>	   
	        		 </li>
         
        </c:forEach>  
        
			    </ul>	   
			    
    
  </div>
  
  
  <%@ include file="subpage_footer.jsp"%> 

<script src="http://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
<script src="http://cdn.amazeui.org/amazeui/2.4.2/js/amazeui.min.js"></script>

<script type="text/javascript">
  $('.am-gallery').pureview();
</script>

</body>
</html>