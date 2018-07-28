// This file is MIT licensed, see amrmuhammad.github.io/LICENSE.md for details


// The code for this file is based on Github.js 
// https://github.com/amrmuhammad/amrmuhammad.github.io/blob/master/github-tools/GitHubJS/lib/GitHub.js

// with the following license:

/**
 * @file
 * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
 * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
 *             Github.js is freely distributable.
 */


/* eslint valid-jsdoc: ["error", {"requireReturnDescription": false}] */

//import Gist from './Gist';
///////////


var $ = require('../../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')

var escapeHtml = require('../component/escape-html/v1.0.3/index.js')

///////////

var separator = '<br />*******<br />*******<br />'

var Log = {
   f_name : undefined
}

function log(text, debug_div) {
   var div = debug_div !== undefined ? debug_div : '#stack_api_debug_div'
   
   var escapedString = escapeHtml(text)
   $(div).append('In function: ' + Log.f_name + '<br />'
                 escapedString + separator)
}
///////////

/////////
var Requestable = require('./lib/Requestable.js')


/**
 * SE encapsulates the functionality to create various API wrapper objects.
 */
class SE extends Requestable {
   /**
    * Create a new SE.
    * @param {Requestable.auth} [auth] - the credentials to authenticate to SE. If auth is
    *                                  not provided requests will be made unauthenticated
    * @param {string} [apiBase=https://api.stackexchange.com/2.2/] - the base Stack Exhange API URL
    */
   constructor(auth, apiBase = 'https://api.stackexchange.com/2.2') {
      super(auth, apiBase)
      this.__apiBase = apiBase;
      this.__auth = auth || {};
   }
   
   

   getQuestionById(id, options, cb) {
      
      Log.f_name = 'getQuestionById'
      
      log('id' + id)
      
      return this._request('GET', 
        `/questions/{${id}}?order=desc&sort=activity&site=stackoverflow`, 
        null, cb);
   }
   
  
}

class App {
   
   main() {
      var se = new SE({})
      se.getQuestionById("", null, null)
      
   }
}


module.exports.SE = SE



