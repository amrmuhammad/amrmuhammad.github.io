

var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')

///////////

var separator = '<br />*******<br />*******<br />'

function log(text) {
   $('#debug_div').append(text + separator)
}

///////////


var html_code = ""

///////////////////////////////////
html_code += '<hr>'
html_code += '<a id="sell_your_products_link" href="#">Sell your products in our store</a>'
html_code += '<br /> <br />'
html_code += '<hr>'

////////////////////////////////////
$('#app').append(html_code)
////////////////////////////////////
$('#app').append('<div id="debug_div"></div>')

////////////////////////////////////
