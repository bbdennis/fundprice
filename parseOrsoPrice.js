var fs = require('fs');
var htmlparser = require("htmlparser2");
var select = require('soupselect').select;

var data = fs.readFileSync('FundPrice_20170710.html');


//var html_string = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
var fund_classes =[]
var fund_names =[]

handler = new htmlparser.DomHandler(function(err, dom) {
   if (err) {
     console.log('error found');
   } else {
//     console.log(dom);
     var tables = select(dom, 'table');
     var rows = select(tables[0], 'tr');
     
     // Fund Class
     var i = 0;
     select(rows[0], 'td').forEach(function(td){
        if (td.children.length > 0) {
          console.log(td.children[0].data);
          fund_classes[i++] = td.children[0].data;
        }
     });
     
     // Fund Name
     i = 0
     select(rows[1], 'td').forEach(function(td){
        if (td.children.length > 0) {
          console.log(td.children[0].data);
          fund_names[i++] = td.children[0].data;
        }
     });
     
     for (i = 4; i< rows.length; i++) {
		 select(rows[i], 'td').forEach(function(td){
			if (td.children.length > 0) {
			  var price = td.children[0].data.trim();
			  if (price === "") {
				process.stdout.write(Number(0).toFixed(6) + " ");
			  } else {
				process.stdout.write(price + " ");
			  }
			} else {
				process.stdout.write(Number(0).toFixed(6) + " ");
			}
		 });
		 console.log("")
     }
   }
        console.log(rows.length)

})

var parser = new htmlparser.Parser(handler)
parser.write(data)
parser.end();
