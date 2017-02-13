<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
  <div>
   <% for(var index in this.personnages){%>
   <p>
    Je m'appelle <% this.personnages[index].prenom %> <% this.personnages[index].nom %> , 
    j'ai <% this.personnages[index].age %> ans
   </p>
          
   <% if(this.personnages[index].heroVisible){ %>
     <p>
    et je suis ... <% this.personnages[index].heroName %>
</p>
   <%}%>
<%}%>
  </div>
</body>
</html>

