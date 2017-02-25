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
  
  htmlString += '<input type="button" value="change colours">'
  
  htmlString += '</div>'
  
  $('body').append(htmlString)
}

function attach_example2_handlers() {
  
  $("example2").on("click", function() {
    var bg_colour = $(this).css("background-color")
    $(this).css("background-color, bg_colour)
  }
  
}

function generate_html() {
  generate_example2_html()
}

function attach_event_handlers() {
}

generate_html()
