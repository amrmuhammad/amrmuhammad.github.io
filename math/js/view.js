

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

html_code += construct_matrix("matrix1", "First matrix")
html_code += '<br />'
html_code += construct_matrix("matrix2", "Second matrix")
html_code += '<br /> <br  />'
html_code += '<button id="multiply_matrices_button">Multiply matrices</button>'  
html_code += '<br /> <br />'
html_code += construct_matrix("matrix3", "Result matrix")
///////////////////////////////////
//  Should append to DOM before applying css
$("#app").append(html_code)
///////////////////////////
function init_css_matrix(matrix_id) {

  $("#" + matrix_id).css("width", "100%")
  $("#" + matrix_id).css("padding", "5%")
  $("#" + matrix_id).css("padding-top", "1%")

  $("#" + matrix_id).css("border", "1px solid")
  $("#" + matrix_id).css("margin", "0")
  $("#" + matrix_id).css("background-color", "#1e81b0")
  $("#" + matrix_id + " div").css("color", "#76b5c5")
  $("#" + matrix_id + " div").css("font-weight", "bold")
  $("#" + matrix_id + " div").css("font-size", "2em")

}
function init_css()
{
   $("body").css("width", "100%")
  $("#app").css("width", "100%")
  $("#app").css("margin", "0")
  
  
  init_css_matrix("matrix1")
  init_css_matrix("matrix2")
  init_css_matrix("matrix3")


  // $(".matrix_element").css("position", "relative")

  $(".matrix_element").css("width", "25%")
  $(".matrix_element").css("height", "40px")
  $(".matrix_element").css("margin", "2px")
  
  $("#multiply_matrices_button").css("width", "90%")
  $("#multiply_matrices_button").css("height", "50px")
  $("#multiply_matrices_button").css("margin", "5px")
  //$("#multiply_matrices_button").css("right-margin", "30%")
  $("#multiply_matrices_button").css("background-color", "#000076ee")
  $("#multiply_matrices_button").css("color", "#ffffff")
}
init_css()

module.exports = {
  matrices_view : html_code

}


