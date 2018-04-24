
/* The following code was copied
   from mgcrea/js-xhr-filr/src/index.js and
   modified;
   For licensing, see mgcrea/js-xhr-file/LICENSE.md
   
   
   */

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
/*
-    req.addEventListener('progress', (ev) => {
-      if (onProgress) {
-        onProgress(ev);
-      }
-    });
*/
//req.addEventListener('error', reject);
//req.addEventListener('abort', reject);
req.send();
