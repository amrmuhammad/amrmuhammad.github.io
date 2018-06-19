

var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')

///////////

var separator = '<br />*******<br />*******<br />'

function log(text) {
   $('#debug_div').append(text + separator)
}

///////////


var html_code = ""

///////////////////////////////////
html_code += '<hr>'
html_code += '<a id="sell_your_products_link" href="#">Sell your products in our store</a>'
html_code += '<br /> <br />'
html_code += '<hr>'

////////////////////////////////////
$('#app').append(html_code)
////////////////////////////////////
$('#app').append('<div id="debug_div"></div>')

////////////////////////////////////

$("#sell_your_products_link").click(sell_your_products_link_click_handler)     
     
/////////////////////////////////
function sell_your_products_link_click_handler(event) {
  
  event.preventDefault()
   
  var html_code = 'Product type: '
  
  html_code += '<select id="product_type_select_box">'
  html_code += '<option>T-shirt</option>'
  html_code += '<option>Jeans</option>'
  html_code += '</select>'

  html_code += '<br /> <br />'
   
  $('#app').append(html_code)  
   
  var product_type = $("#product_type_select_box").val()
  
  if (product_type === "T-shirt") {
     html_code = "Product dimensions: "
     html_code += "T-shirt width: "
     html_code += '<input id="t_shirt_width_input" >'
     html_code += "T-shirt length: "    
     html_code += '<input id="t_shirt_length_input" >'
     
     $('#app').append(html_code)
     
  } else if (product_type === "Jeans") {
    html_code = "Product dimensions: "
    html_code += "Jeans Waist size: "
    html_code += '<input id="jeans_waist_size_input" >'
    html_code += "Jeans length: "    
    html_code += '<input id="jeans_length_input" >'

    $('#app').append(html_code)
     
  }

}

///////////////////////////////////

