<% for(var index in this.personnages){%>
   <p>
    Je m'appelle <% this.personnages[index].prenom %> <% this.personnages[index].nom %> , 
    j'ai <% this.personnages[index].age %> ans
   </p>
          
   <% if(this.personnages[index].heroVisible){ %>
     <# template-3 #>
   <%}%>
<%}%>