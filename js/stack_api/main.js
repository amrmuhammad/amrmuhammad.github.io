

///////////

var separator = '<br />*******<br />*******<br />'

function log(text, debug_div) {
   var div = debug_div !== undefined ? debug_div : '#debug_div'
   $(div).append(text + separator)
}
///////////

var $ = require('../../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')

try {
  var escapeHtml = require('../component/escape-html/v1.0.3/index.js')
  
  var stack_api = require('./stack_api.js')
} catch(err) {
   
   var escapedString = escapeHtml(JSON.stringify(err))
   log(err + escapedString, '#app')
}

///////////

///////////


////////////////////


var html_code = ""

///////////////////////////////////
html_code += 'Question id : <input id="se_question_id_input" > <br />'
html_code += '<button id="generate_attr_button">Generate</button>'
html_code += '<br /> <br />'
///////

////////
html_code += '<hr>'

////////////////////////////////////
$('#app').append(html_code)
////////////////////////////////////
$('#app').append('<div id="debug_div"></div>')

////////////////////////////////////



$('#generate_attr_button').click(function() {

   var q_id = $('#se_quesion_id_input').val()
   var se = new stack_api({})
   
   var response = undefined
       
   se.getQuestionById(q_id, null, null)
   .then((response) => {
   
     log(response)
   
     log(JSON.stringify(response))
   
   })
   
})



////


