


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

   var template = " \
   \
 /////////////////////////////////////////// For portions of the code that make use of "
   + $('#mdn_page_title').val() + ': <br />'
   + '&lt;a href="'
   + $('#mdn_page_link').val()
   + '"&gt; '
   + $('#mdn_page_title').val()
   + ' &lt;/a&gt;' 
   + 'by &lt;a href="' 
   + $('#mdn_page_link').val() + '$history"&gt; Mozilla Contributors</a> is licensed under '
   + '&lt;a href="https://creativecommons.org/licenses/by-sa/2.5/"&gt;CC-BY-SA 2.5.</a> Code samples used from the above webpage that were added before August 20, 2010 are available under the MIT license: '
   + 'The MIT License (MIT) Copyright (c) '
   + $('#cpy_rght_date').val() 
   + $('#cpy_rght_user').val()
   + '(&lt;a href="https://developer.mozilla.org/en-US/profiles/'
   + $('#cpy_rght_user').val()
   + '"&gt;MDN profile &lt;/a&gt;) Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. '
   + 'Code samples used from the above webpage that were added on or after August 20, 2010 are available in the public domain (CC0): Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/ /////////////////////////////////////////// '


   
  log(template)
   
})
