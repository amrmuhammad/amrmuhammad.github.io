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
   constructor(auth, apiBase = 'https://api.stackexchange.com/2.2/') {
      this.__apiBase = apiBase;
      this.__auth = auth || {};
   }
   
   

   getQuestionById(id, options, cb) {
      
      return this._request('GET', 
        `/questions/{${id}}?order=desc&sort=activity&site=stackoverflow`, 
        null, cb);
   }
   
  
}

class App {
   
   main() {
      var se = new SE({})
      var se.getQuestionById("", null, null)
      
   }
}


