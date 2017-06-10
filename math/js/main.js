

//var Vue = require('./lib/vuejs/v2_2_3/vue.js')
var $ = require('./lib/jquery/v3_2_1/jquery.js')

/////////////////////
/*
Vue.component('matrix', {
  template: '<div id="matrix1" > ' +
              '<template v-for="1 to rows">' +
              '<tr>' +
                '<template v-for="1 to cols">' +
                '<td>' +
                '<input type="text">' +
                '</td>' +
              '</tr>' +
              '</template' +
            '</div>',
  
  data: function() {
    return {
      message: 'hello',
      rows : 3,
      cols : 3
    }
  }
})


/////////////////////
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
/////////////////////
*/

var rows = 3
var cols = 3
///////////////////////////////////
// Construct the matrix DOM elements
var html_code = '<div id="matrix1">' 
for (i=0; i< rows; i++) {
   html_code += '<tr>'
   for (j=0; j< cols; j++) {
     html_code += '<td>'
     html_code += '<input type="text">'
     html_code += '</td'
   }
   html_code += '</tr>'
}
///////////////////////////////////
// Add an input textbox to select 
// background color
html_code += '<br> <br> <br> '
html_code += "background-color:"
html_code +=  '<input id="bg_input" type="text">'
//$('#app').append("<matrix></matrix>")
//////////////////////////
// Attach elements to DOM
$("#app").append(html_code)
//////////////////////////
// Attach event handlers to
// DOM elements
var bg_value = ""
$("#bg_input").change(function(){
  //alert("background changed")
  var bg_value = $("bg_input").val()
  if(bg_value.length == 6) {
    bg_value = "#" + bg_value
    $("#matrix1").css("background-color",
                 bg_value)
  }
})
//////////////////////////^
//$("#app").append(html_code)


