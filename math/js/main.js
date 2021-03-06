




//var Vue = require('./lib/vuejs/v2_2_3/vue.js')
var $ = require('./lib/jquery/v3_2_1/jquery.min.js')

////
////////////////////
///////////

var separator = '<br />*******<br />*******<br />'

function log(text, debug_div) {
   var div = debug_div !== undefined ? debug_div : '#debug_div'
   $(div).append(text + separator)
}
///////////

///////////////////
var view = require('./view.js')             
var html_code = view.matrices_view
///////////////////////////////
///////////////////////////////////
// Add an input textbox to select 
// background color
html_code += '<br> <br> <br> '

//html_code += "background-color:"
//html_code +=  '<input id="bg_input" type="text">'
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


//html_code = add_css_experimenting_section(html_code)
//////////////////////////
///////////////////////////

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

function create_mat_array(matrix_id, rows, cols) {
  
  var valid_matrix = true
  
  var mat_array = new Array(rows)
  for(var i=0; i<rows; i++) {
    mat_array[i] = new Array(cols)
    
    for(var j=0; j<cols; j++) {
      mat_array[i][j] = $("#" + matrix_id + " > #mat_elem_" +                              
                         (i+1) + "_" + (j+1)).val()
      
      if(mat_array[i][j] === undefined || mat_array[i][j] === ""
       /*|| typeof(mat_array[i][j]) !== "number"*/
        || $.isNumeric(mat_array[i][j]) == false
        || typeof(mat_array[i][j] = Number(mat_array[i][j])) !== "number") {
        valid_matrix = false
        break
      }
      
      //$("#matrix3 > #mat_elem_" + 
      // (i+1) + "_" + (j+1)).val(1)
      
    }
    
    if(valid_matrix == false) {
      break
    }
  }
  
  $("#" + matrix_id + "_error_messages").empty()
  
  if(valid_matrix == false) {
    // display error message
    $("#" + matrix_id + "_error_messages").append("<strong>Invalid matrix: All matrix elements should be numbers</strong>")
    return undefined
                       
  } else {
    
    return mat_array
  }
  
  
}  
  
function multiply_matrices(mat_objs_array) {
  
  
  mat1_obj = mat_objs_array[0]
  mat2_obj = mat_objs_array[1]
  
  var mat_obj_result = {}
  
  if(mat1_obj.cols !== mat2_obj.rows) {
    mat_obj_result.errors_list = [
      "Number of columns of first matrix should be equal to number of rows of second matrix"]
  }
  
  mat_obj_result.rows = mat1_obj.rows
  mat_obj_result.cols = mat2_obj.cols
  
  var mat1_array = mat1_obj.mat_array
  var mat2_array = mat2_obj.mat_array
  
  var mat_array_result = new Array(mat_obj_result.rows)
  for (var i=0; i<mat_obj_result.rows; i++) {
    
    mat_array_result[i] = new Array(mat_obj_result.cols)
    
    for (var j=0; j<mat_obj_result.cols; j++) {
      
      mat_array_result[i][j] = 0
      for (var k=0; k<mat1_obj.cols; k++) {
        mat_array_result[i][j] += 
          mat1_array[i][k] * mat2_array[k][j]
      }
    }
  }
  
  mat_obj_result.mat_array = mat_array_result
  
  //$("#" + "matrix3" + "_error_messages").append("<br /><strong>multiply matrices concluded</strong>")
  
  return mat_obj_result
  
}

function update_result_matrix_with_data(mat_obj) {
  
  var mat_array = mat_obj.mat_array
  for (var i=0; i<mat_obj.rows; i++) {
    for (var j=0; j<mat_obj.cols; j++) {
      
      $("#matrix3 > #mat_elem_" + 
       (i+1) + "_" + (j+1)).val(mat_array[i][j])      
    }
  }
  
}

$("#multiply_matrices_button").click(function() {
  var rows = 3
  var cols = 3
  
  $("#" + "matrix3" + "_error_messages").empty()
  
  var mat1_array = create_mat_array("matrix1", rows, cols)
   
  var mat1_obj = {"mat_array" : mat1_array, 
                  "rows" : rows,
                  "cols" : cols 
                 }
              
  var mat2_array = create_mat_array("matrix2", rows, cols)
  
  var mat2_obj = {"mat_array" : mat2_array,
                  "rows" : rows,
                  "cols" : cols
                 }
  
  
  if(mat1_array === undefined) {
    $("#" + "matrix3" + "_error_messages").append("<br /><strong>Error occurred: First matrix is not valid</strong>")
    
  } 
  if(mat2_array === undefined) {
    $("#" + "matrix3" + "_error_messages").append("<br /><strong>Error occurred: Second matrix is not valid</strong>")
    
  } 
  
  if(mat1_array === undefined ||
     mat2_array === undefined) {
    return
  }
    
  
  var mat_objs_array = [mat1_obj, mat2_obj]
  
  
  
  var result_matrix = multiply_matrices(mat_objs_array)
  
  update_result_matrix_with_data(result_matrix)
  
})
//////////////////////////////
//$("#app").append(html_code)


