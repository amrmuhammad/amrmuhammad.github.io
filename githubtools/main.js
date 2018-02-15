


//var ClientOAuth2 = require('client-oauth2')


var GitHub = require('../github-tools/GitHubJS/dist/GitHub.bundle.min.js');
var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')
///////////

function log(text) {
   $('#app').append(text)
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
   
  $('#app').append(gh.__auth.username + '<br />')
  $('#app').append(gh.__auth.token + '<br />')
  
  var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

  var sourceRepo = gh.getRepo('dunso', 'pdf-parser')
  
  $('#app').append(sourceRepo.__fullname + '<br />')
  
  sourceRepo.getContents('master', '', false, function(error, result, response) {
    $('#app').append('CB func called' + '<br />')
    log(JSON.stringify(result) + '<br />')
  })
   
  sourceRepo.getSha('master', 'lib/cmaps', function(error, result, response) {
  })
   
  sourceRepo.getTree(treeSHA, function() {
     
  })

   
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
