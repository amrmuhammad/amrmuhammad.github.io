


//var ClientOAuth2 = require('client-oauth2')


var GitHub = require('../github-tools/GitHubJS/dist/GitHub.bundle.min.js');
var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')
///////////

var separator = '<br />*******<br />*******<br />'
function log(text) {
   $('#app').append(text + separator)
}

///////////
/*
var githubAuth = new ClientOAuth2({ 
   clientId: 'abc', 
   clientSecret: '123', 
   accessTokenUri: 'https://github.com/login/oauth/access_token', 
   authorizationUri: 'https://github.com/login/oauth/authorize', 
   redirectUri: 'https://amrmuhammad.github.io/githubtools/auth/github/callback.html', 
   scopes: ['notifications', 'gist'] 

})
*/


var html_code = ""

///////////////////////////////////
html_code += 'Github username : <input id="gh_username" >'
html_code += 'Github API personal access token : <input id="gh_pat" >'
html_code += '<button id="gh_pat_ok">ok</button>'
html_code += '<br />'
////////////////////////////////////
$('#app').append(html_code)
////////////////////////////////////
function getTreeCb(error, result, response) {
}

function getTreeRecursiveCb(error, result, response) {
    
}

function getTreeRecursive(repo, treeSha, cb) {
  return repo._request('GET', `/repos/${repo.__fullname}/git/trees/${treeSha}?recursive=1`, null, cb);
}
////////////////////////////////////
var gh = undefined

$('#gh_pat_ok').click(function() {

  // basic auth
  gh = new GitHub({
     //username: 'FOO',
     //password: 'NotFoo'
     /* also acceptable:
        token: 'MY_OAUTH_TOKEN'
      */
     username : $('#gh_username').val() ,
     password : undefined,
     token : $('#gh_pat').val()
     
  })
   
  log(gh.__auth.username + '<br />')
  log(gh.__auth.token + '<br />')
  
  var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

  var sourceRepo = gh.getRepo('dunso', 'pdf-parser')
  
  log(sourceRepo.__fullname + '<br />')
  
  sourceRepo.getContents('master', '', false, function(error, result, response) {
    log('getContents CB func called' + '<br />')
    log(JSON.stringify(result) + '<br />')
  })
   
  //var treeSHA = undefined
  sourceRepo.getContents('master', 'lib', false, function(error, result, response) {
     log('getContents for lib -- CB func called')
     log('typeof result: '+ typeof(result))
     log(JSON.stringify(result) + '<br />')
     
     
     //for(var item in result) {
     
     // assuming result is Array; call
     // Array.prototype.forEach
     result.forEach(function(item, index, arrayObj) {
        log(item)
        log(item.type)
        if(item.type === 'dir') {
           var treeSha = item.sha
           // get tree
           log(item.path + ':' + treeSha)
           getTreeRecursive(sourceRepo, treeSha, 
             getTreeRecursiveCb)
        } else if (item.type === 'file') {
        }
     })
     
     //treeSHA = result.sha
  })
   /*
  .then(() => {       
    sourceRepo.getTree(treeSHA, function(error, result, response) {
      log('getTree CB func called')
      log(JSON.stringify(result) + '<br />')
    })
     
  })
  */
   
})




//var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
//me.listNotifications(function(err, notifications) {
   // do some stuff
//});

/*
var clayreimann = gh.getUser('clayreimann');
clayreimann.listStarredRepos(function(err, repos) {
   // look at all the starred repos!
});
*/

//var sourceRepo = gh.getRepo('dunso', 'pdf-parser')
//sourceRepo.getContents('master', '', false, function(error, result, response) {
//  $('body').append(result)
//})
