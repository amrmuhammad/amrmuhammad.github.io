

var $ = require('../../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')
var stack_api = require('./stack_api.js')

///////////

var separator = '<br />*******<br />*******<br />'

function log(text) {
   $('#debug_div').append(text + separator)
}

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



$('#generate_attr_button').click(async function() {

   var q_id = $('#se_quesion_id_input').val()
   var se = new stack_api({})
   
   var response = await se.getQuestionById(q_id, null, null)
   
   log(response)
   
   log(JSON.stringify(response))
   
   
   
})



////


