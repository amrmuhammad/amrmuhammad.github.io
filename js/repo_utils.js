
var this_repo_path = 'https://amrmuhammad.github.io'

//var axios = require(this_repo_path + '/js/axios/v0.18.0/axios.js')
//var $ = require(this_repo_path + '/math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')
var Base64 = require('./js-base64/v2.4.5/base64.js')
Base64 = Base64.Base64

var sha256 = require('./emn178/js-sha256/v0.9.0/build/sha256.min.js')
sha256 = sha256.sha256

var eruda = require('./liriliri/eruda/v1.5.0/dist/eruda.min.js')
  
module.exports = {
  Base64 : Base64,
  sha256 : sha256,
  eruda : eruda
}
