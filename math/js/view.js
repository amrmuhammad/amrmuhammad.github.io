

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
  
  html_code += '<div id="' + matrix_id + '_error_messages"></div>'
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
//  Should append to DOM before applying css
$("#app").append(html_code)
///////////////////////////
function init_css()
{
  //$("#matrix1").css("width", "100%")

  // $("#matrix1").css("position", "relative")
  // $("#matrix2").css("width", "100%")
  // $("#matrix2").css("position", "relative")


  // $(".matrix_element").css("position", "relative")

  $(".matrix_element").css("width", "100px")
  //$(".matrix_element").css("height", "40px")
  //$(".matrix_element").css("margin", "2px")
  
  $("#multiply_matrices_button").css("width", "80%")
  $("#multiply_matrices_button").css("height", "30px")
  $("#multiply_matrices_button").css("left-margin", "30%")
  $("#multiply_matrices_button").css("right-margin", "30%")
  $("#multiply_matrices_button").css("background-color", "#000076ee")
  $("#multiply_matrices_button").css("color", "#ffffff")
}
init_css()

module.exports = {
  matrices_view : html_code

}


