

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

html_code += '<div id="page_column_1">'

html_code += construct_matrix("matrix1", "First matrix")
html_code += '<br />'
html_code += construct_matrix("matrix2", "Second matrix")
html_code += '<br /> <br  />'
html_code += '<button id="multiply_matrices_button">Multiply matrices</button>'  
html_code += '<br /> <br />'
html_code += construct_matrix("matrix3", "Result matrix")

html_code += '</div>'

html_code += '<div id="page_column_2"> aaa'
html_code += '</div>'

html_code += '<div id="page_column_3"> bbb'
html_code += '</div>'
///////////////////////////////////
//  Should append to DOM before applying css
$("#app").append(html_code)
///////////////////////////
function init_css_matrix(matrix_id, is_page_gt600) {

  $("#" + matrix_id).css("width", "80%")
  $("#" + matrix_id).css("padding", "10%")
  $("#" + matrix_id).css("padding-top", "1%")

  $("#" + matrix_id).css("border", "1px solid")
  //$("#" + matrix_id).css("border-radius", "10px")
  //$("#" + matrix_id).css("margin", "5px")

  //if (is_page_gt600 == true) {
    //https://developer.mozilla.org/en-US/docs/Web/CSS/left
    //$("#" + matrix_id).css({"position": "relative", 
    //                       "left": "20%"})
  //}

  //https://www.canva.com/colors/color-wheel/
  $("#" + matrix_id).css("background-color", "#ffffff")
  
  
  $("#" + matrix_id + " div").css("color", "#000000")
  $("#" + matrix_id + " div").css("font-weight", "bold")
  $("#" + matrix_id + " div").css("font-size", "2em")
  
  
  $(".matrix_element").css("border", "1px solid")

  $(".matrix_element").css("width", "25%")
  $(".matrix_element").css("height", "40px")
  $(".matrix_element").css("margin", "2px")
}
function init_css()
{
  $("body").css("margin", "0")
  $("body").css("width", "100%")
  //$("body").css("overflow-x", "hidden")
  
  //$("#page_column_1").css("min-width", "250px")
  
  $("#page_column_1").css("border", "3px solid green")
  $("#page_column_1").css("padding", "10px")
  $("#page_column_1").css("margin", "5px")

  
  $("#page_column_2").css("border", "3px solid green")
  $("#page_column_2").css("padding", "10px")
  $("#page_column_2").css("margin", "5px")
  
  $("#page_column_3").css("border", "3px solid green")
  $("#page_column_3").css("padding", "10px")
  $("#page_column_3").css("margin", "5px")
  
  let query = window.matchMedia("(min-width : 601px)")
  if (query.matches) {
    // if the page is wider than 600px
    
    $("#app").css("display", "flex")
    $("#page_column_1").css("flex", "33.33%")
    $("#page_column_2").css("flex", "33.33%")
    $("#page_column_3").css("flex", "33.33%")
    //$("#page_column_1").css("width", "33%")
    
  } else {
    // if the page is narower than 601px
    

  }
  
  init_css_matrix("matrix1", query.matches)
  init_css_matrix("matrix2", query.matches)
  init_css_matrix("matrix3", query.matches)

  //if (is_page_gt600 == true) {
    //https://developer.mozilla.org/en-US/docs/Web/CSS/left
    //$("#multiply_matrices_button").css({"position": "relative", 
    //                     "left": "20%"})
  //}
  //$("#multiply_matrices_button").css({"position": "relative", 
  //                                  "left": "20%"})
  
  $("#multiply_matrices_button").css("width", "100%")
  $("#multiply_matrices_button").css("height", "50px")
  $("#multiply_matrices_button").css("margin", "5px")
  //$("#multiply_matrices_button").css("right-margin", "30%")
  $("#multiply_matrices_button").css("background-color", "#000076ee")
  $("#multiply_matrices_button").css("color", "#ffffff")
  
  $("#multiply_matrices_button").css("font-weight", "700")
  $("#multiply_matrices_button").css("font-size", "1.3em")
  
  //$("#multiply_matrices_button").css({"font-style" : "normal",
   //                                   "letter-spacing" : "0.097em" 
   //                                  })
  
  //$("#page_column_2").css("margin", "auto")
  //$("#page_column_2").css("width", "50%")
  
  
}


init_css()

module.exports = {
  matrices_view : html_code

}


