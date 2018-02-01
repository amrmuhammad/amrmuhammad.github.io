var GitHub = require('../github-tools/GitHubJS/Github.js');
var $ = require('/math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')



// basic auth
var gh = new GitHub({
   //username: 'FOO',
   //password: 'NotFoo'
   /* also acceptable:
      token: 'MY_OAUTH_TOKEN'
    */
});

var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
me.listNotifications(function(err, notifications) {
   // do some stuff
});

/*
var clayreimann = gh.getUser('clayreimann');
clayreimann.listStarredRepos(function(err, repos) {
   // look at all the starred repos!
});
*/

var sourceRepo = gh.getRepo('dunso', 'pdf-parser')
sourceRepo.getContents('master', '', false, function(error, result, response) {
  $('body').addChild(contents)
})
