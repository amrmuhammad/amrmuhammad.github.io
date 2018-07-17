


var this_repo_path = 'https://amrmuhammad.github.io/'
var $ = require(this_repo_path + 'math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')


///////////

var separator = '<br />*******<br />*******<br />'

function log(text) {
   $('#debug_div').append(text + separator)
}

///////////

////////////////////


var html_code = ""

///////////////////////////////////
html_code += 'MDN page title : <br /> <input id="mdn_page_title" > <br />'
html_code += 'MDN page link : <br /> <input id="mdn_page_link" > <br />'
html_code += 'Copyright date : <br /> <input id="cpy_rght_date" > <br />'


html_code += 'Copyright user : <br /> <input id="cpy_rght_user" > <br />'


html_code += '<button id="generate">Generatr</button>'
html_code += '<br /> <br />'
///////

///////
////////
html_code += '<hr>'

////////////////////////////////////
$('#app').append(html_code)
////////////////////////////////////
$('#app').append('<div id="debug_div"></div>')

////////////////////////

$('#generate').click(function() {


})
