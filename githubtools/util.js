var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')


function log(text) {
   $('#debug_div').append(text + separator)
}

log('Beginning of util.js')
/*********************************************************/
/* The following code was copied
   from mgcrea/js-xhr-file/src/index.js and
   modified;
   For licensing, see mgcrea/js-xhr-file/LICENSE.md
   
   Modifications were inspired and based upon code
   from:
   
<a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest"> Using XMLHttpRequest </a> 
by <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest$history"> Mozilla Contributors</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/2.5/">CC-BY-SA 2.5.</a>

   from the section 'handling binary data'
   ;
   For licensing, see LICENSE/LICENSE-2.md
   */
/*******************************************************/
/*
function applyRequestHeaders(req, headers) {
  if (typeof headers === 'object') {
    Object.keys(headers).forEach((key) => {
      req.setRequestHeader(key, headers[key]);
    });
  }
}

var fileUrl = 'https://unpkg.com/github-api@3.0.0/dist/GitHub.bundle.js'

var url = fileUrl

var textRes;

var req = new XMLHttpRequest();
req.open('GET', url, true);
//req.withCredentials = withCredentials || credentials === 'include';
req.responseType = 'text';
//applyRequestHeaders(req, headers);
req.onload = function (oEvent){
  //const ok = req.status >= 200 && req.status < 300;
  //return {body: req.response, status: req.status};
   
  textRes = req.responseText
  log(JSON.stringify(textRes))
  log(JSON.stringify(req.status))
  
  // The use of FileSaver.js was inspired by
  // this Stackoverflow question https://stackoverflow.com/questions/11620698/how-to-trigger-a-file-download-when-clicking-an-html-button-or-javascript
  // For details see the file LICENSE/LICENSE-1.md 
   
  // Code copied from FileSaver.js README file and modified
  var FileSaver = require('../eligrey/FileSaver.js/src/FileSaver.js'); 
  var blob = new Blob([textRes], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "GitHub.bundle.js");
   
}
*/
/*
-    req.addEventListener('progress', (ev) => {
-      if (onProgress) {
-        onProgress(ev);
-      }
-    });
*/
//req.addEventListener('error', reject);
//req.addEventListener('abort', reject);

//req.send();
/////////////////////////////////////////////////////////

log('End of util.js')
