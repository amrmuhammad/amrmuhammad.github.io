var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')

///////////////////////////////////////////////
var separator = '<br />*******<br />*******<br />'


function log(text) {
   $('#debug_div').append(text + separator)
}
////////////////////////////////////////////////

log('Beginning of FileSaver.debug.js')
