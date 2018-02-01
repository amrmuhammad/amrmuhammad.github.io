var GitHub = require('../github-tools/GitHubJS/Github.js');

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
sourceRepo.getContents('master', '', false, function(contents) {
  $('body').addChild(contents)
})
