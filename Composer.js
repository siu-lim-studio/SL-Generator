var fs = require('fs');
var jetpack = require('fs-jetpack');

var config = jetpack.read("config.json","json");

var pathToTemplate = config.pathToTemplate || ".";
var inputTemplate = config.inputTemplateFile || "input.tpl";
var outputTemplate = config.outputTemplateFile || "output.tpl";
var templateExtension = config.templateExtension || ".tpl";

var output = config.outputfile || "test.html";

function engine (template,options) {
     var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
     var add = function(line, js) {  
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
     }
     var _template = template.replace(/\r/g,'\\r')
                             .replace(/\n/g,'\\n')
                             .replace(/\t/g,'\\t');
     while(match = re.exec(_template)) {
        add(_template.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
     }
     add(_template.substr(cursor, _template.length - cursor));
     code += 'return r.join("");';
     return new Function(code).apply(options);
}
function build(input,output,options){
	var data = jetpack.read(input,'utf8'),reg = /<#([^#>]+)?#>/g,tableaucorr=[];
    while(tableaucorr = data.match(reg)){
      var Path =  tableaucorr[0].replace(/<#|#>/g,"").trim() + templateExtension,
          content = jetpack.read(Path,'utf8');
      data = data.replace(reg,content);
    }
    var templateOutput = pathToTemplate + "/" + outputTemplate,template="";
	jetpack.file(templateOutput,{mode:700,content:data});
    template = jetpack.read(templateOutput,'utf8'); 
    var code = engine(template,options);
    jetpack.file(output,{mode:700,content:code});
}

options ={ personnages:[
            {
             nom:"personne",
             prenom:"",
             age:29,
             heroName:"personne",
             heroVisible : false
            },
            {
             nom:"Kent",
             prenom:"Clark",
             age:25,
             heroName:"Superman",
             heroVisible : true
            },
            {
             nom:"Parker",
             prenom:"Peter",
             age:27,
             heroName:"Spiderman",
             heroVisible : true
            }
           ]
         };

build( pathToTemplate + "/" + inputTemplate,output,options);