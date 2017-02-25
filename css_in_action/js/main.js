var $ = require ('./lib/jquery/jquery.js')

function generate_example2_html() {
  var htmlString = 
    '<div id="example2">'
     
  for (var i=0; i<3; i++) {
    htmlString += '<div class="matrix_row" id="row' + i + '">'
    for (var j=0; j<3; j++) {
      htmlString += '<input type="text" class="matrix_element" id="elem_' + i + '_' + j + '">'
    }
    htmlString += '</div>'
  }
  
  htmlString += '<input type="button" >'
  
  htmlString += '</div>'
  
  $('body').append(htmlString)
}

function generate_html() {
  generate_example2_html()
}

generate_html()
