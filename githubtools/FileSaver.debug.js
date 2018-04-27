

////////////////////////////////////////////////

/*
  Author : Amr Muhammad
  This file is a copy of FileSaver.js
  with some modifications;
  mainly adding debugging code
*/

 
var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js') 


/////////////////////////////////////////////// 
var separator = '<br />*******<br />*******<br />' 

function log(text) { 
  $('#debug_div').append(text + separator)
} 

//////////////////////////////////////////////// 

log('Beginning of FileSaver.debug.js') 

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.8
 * 2018-03-22 14:03:47
 *
 * By Eli Grey, https://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */
/////////////////////////////////

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */


/////////////////////////////////

log('End of FileSaver.debug.js')
