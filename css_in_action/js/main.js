var $ = require ('./lib/jquery/jquery.js')

generate_example2_html() {
  htmlString = '<div id=example2>'
  
  htmlString += '</div>'
  $('body').append(htmlString)
}

generate_html() {
  generate_example2_html()
}

generate_html()
