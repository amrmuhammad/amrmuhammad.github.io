

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
var html_code = ""
///////////////////////////////////
// Construct the matrix DOM elements
function construct_matrix(matrix_id, matrix_label)
{
  var html_code = '<div id="' + matrix_id + '">' 
  html_code += '<div>' + matrix_label + '</div>'
  for (i=0; i< rows; i++) {
   html_code += '<tr>'
   for (j=0; j< cols; j++) {
     html_code += '<td>'
     html_code += '<input type="text" class="matrix_element" id="mat_elem_' + (i+1) + '_' + (j+1) + '">'
     html_code += '</td>'
   }
   html_code += '</tr>'
  }
  html_code += '</div>'
  
  return html_code
}

html_code += construct_matrix("matrix1", "First matrix:")
html_code += '<br />'
html_code += construct_matrix("matrix2", "Second matrix:")
html_code += '<br /> <br  />'
html_code += '<button id="multiply_matrices_button">Multiply matrices</button>'  
html_code += '<br /> <br />'
html_code += construct_matrix("matrix3", "Result matrix:")
///////////////////////////////////
// Add an input textbox to select 
// background color
html_code += '<br> <br> <br> '
html_code += "background-color:"
html_code +=  '<input id="bg_input" type="text">'
//$('#app').append("<matrix></matrix>")
/////////////////////////
function add_css_experimenting_section(html_code) {
  html_code += '<div id="css_exp_section">'
  html_code += 'Element id # : <input id="elem_id" type="text">'
  html_code += '<br />'
  html_code += 'CSS property name : <select id="css_prop_name">'
  html_code += '  <option value="1">top</option>'
  html_code += '  <option value="2">left</option>'
  html_code += '  <option value="3">right</option>'
  html_code += '  <option value="4">bottom</option>'
  html_code += '  <option value="5">position</option>'
  html_code += '  <option value="6">float</option>'
  html_code += '  <option value="7">clear</option>'
  html_code += '  <option value="8">z-index</option>'
  html_code += '</select>'
  html_code += '</div>'
  
  return html_code
  
}
html_code = add_css_experimenting_section(html_code)
//////////////////////////
// Attach elements to DOM
$("#app").append(html_code)
///////////////////////////
function init_css()
{
  $(".matrix_element").css("width", "30%")
  $(".matrix_element").css("height", "40px")
  $(".matrix_element").css("margin", "2px")
  
  $("#multiply_matrices_button").css("width", "40%")
  $("#multiply_matrices_button").css("height", "30px")
  $("#multiply_matrices_button").css("left-margin", "30%")
  $("#multiply_matrices_button").css("right-margin", "30%")
  $("#multiply_matrices_button").css("background-color", "#000076ee")
  $("#multiply_matrices_button").css("color", "#ffffff")
}
init_css()
//////////////////////////
// Attach event handlers to
// DOM elements
var bg_value = ""
$("#bg_input").change(function(){
  //alert("background changed")
  var bg_value = $("#bg_input").val()
  if(bg_value.length == 6) {
    bg_value = "#" + bg_value
    $("#matrix1").css("background-color",
                 bg_value)
  }
})

$("#multiply_matrices_button").click(function() {
   
  var rows = 3
  var cols = 3
  var mat_array = new Array(rows)
  for(var i=0; i<rows; i++) {
    mat_array[i] = new Array(cols)
    
    for(var j=0; j<cols; j++) {
      mat_array[i][j] = $("#matrix1 > #mat_elem_" +                              
                         (i+1) + "_" + (j+1))
     
     $("#matrix3 > #mat_elem_" + 
      (i+1) + "_" + (j+1)).val = 1
      
    }
  }
  
  
  
})
//////////////////////////////
//$("#app").append(html_code)


