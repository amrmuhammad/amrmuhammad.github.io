


//var ClientOAuth2 = require('client-oauth2')


var GitHub = require('../github-tools/GitHubJS/dist/GitHub.bundle.min.js');
var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')

var jsTree = require('../js/jstree/v3.3.5/dist/jstree.min.js')
///////////

var separator = '<br />*******<br />*******<br />'

function log(text) {
   $('#debug_div').append(text + separator)
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
html_code += 'Github username : <input id="gh_username" > <br />'
html_code += 'Github API personal access token : <input id="gh_pat" > <br />'
html_code += '<button id="gh_pat_ok">ok</button>'
html_code += '<br /> <br />'
html_code += '<hr>'
html_code += '<div id="gh_operations_div">'
html_code += '<button id="gh_operations_button">Operations</button> <br />'
html_code += '</div>'
html_code += '<div id="gh_current_operation_div">'
html_code += '</div>'
html_code += '<hr>'

////////////////////////////////////
$('#app').append(html_code)
////////////////////////////////////
$('#app').append('<div id="debug_div"></div>')
////////////////////////////////////

var model = {
  gh_operations_menu_displayed : false,
   
  current_user : { 
  }

}
//////////////////////////////////////


$("#gh_operations_button").click(function() {
  if(model.gh_operations_menu_displayed === false) {
    model.gh_operations_menu_displayed = true
    var html_code = '<div id="gh_operations_menu_div">'
    html_code += '<a href="" id="gh_ops_copy_menu_item" class="menu_item">Copy files/folders between repositories</a>'
    html_code += '</div>'
    $("#gh_operations_div").append(html_code)
     
     // we can not add event handlers except after
     // the element was added to DOM
     // as the jquery selector won't find
     // any matching elements
     
     $("#gh_ops_copy_menu_item").click(gh_ops_copy_menu_item_click_handler)     
     
  } else {
     model.gh_operations_menu_displayed = false
     $("#gh_operations_menu_div").remove()
  }
})
/////////////////////////////////
function gh_ops_copy_menu_item_click_handler(event) {
  
  //log('gh_ops_copy_menu_item_click_handler')
  
  event.preventDefault()
  var html_code = '<hr>'
  html_code += '<h2>Copy files between repos.</h2>'
  html_code += 'Github destination username : <input id="dest_username" > <br />'
  html_code += 'Github destination repo. name : <input id="dest_repo_name" > <br />'
  html_code += 'Github destination API personal access token : <input id="dest_gh_pat" > <br />'
  html_code += 'Github source username : <input id="source_username" > <br />'
  html_code += 'Github source repo. name : <input id="source_repo_name" > <br />'
  html_code += 'Path within source repo : <input id="path_within_source_repo" > <br />'
  html_code += '<button id="gh_ops_copy_button">Copy</button>'
  html_code += '<br /> <br />'
  //html_code += '<hr>'

  $("#gh_current_operation_div").append(html_code)
   
  //$("#dest_username").val(model.cuurent_user.gh_username)
  //$("#dest_gh_pat").val(model.current_user.gh_pat)
   
  $("#gh_ops_copy_button").click(gh_ops_copy_button_click_handler)

}

//////////////////////////////////
function update_js_tree(tree_params) {
  $('#gh_copy_repos_trees_div').jstree({ 
    'core' : 
     {      
    'data' : tree_params.tree_nodes

      /*
     [ 
        { 
          "text" : "Root node", 
          "children" : 
          [  
            { "text" : "Child node 1" },    
            { "text" : "Child node 2" }        
          ]        
        }       

     ]     

     */

     }   

   });
   
  /*
  $('gh_copy_repos_trees_div').jstree({
    'core' : 
     {
       'data' : function(obj, callback) {
          callback.call(this, ['root1', 'root2'])
       }
     }
  })
  */
  
}
//////////////////////////////////
function process_fetched_source_repo_data(fetched_data) {
   

    log('fetched_data: <br />' + JSON.stringify(fetched_data))

  ///////////////////////////
    var tree_nodes = []
   
    fetched_data.forEach(function(item, index, arrayObj) {

      tree_nodes[index] = { "text" : item.name}
      
      if(item.type === 'file') {
         
      }

    })
    log('tree_nodes: <br />' + JSON.stringify(tree_nodes))

    var tree_params = {

       tree_nodes : tree_nodes

    }
    update_js_tree(tree_params)
}
//////////////////////////////////
class CopyOpProcessor {
  
   
  ///////////////////////////////////

  fetch_source_repo_contents(credentials, repo_params) {

    //model.current_user.gh_username = credentials.gh_username
    //model.current_user.gh_pat = credentials.gh_pat
    // basic auth

    var gh = new GitHub({
      //username: 'FOO',
      //password: 'NotFoo'
      /* also acceptable:
        token: 'MY_OAUTH_TOKEN'
      */
      username : credentials.gh_username,

      password : undefined,

      token : credentials.gh_pat

    })

   log(gh.__auth.username + '<br />')

   log(gh.__auth.token + '<br />')

   var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

   this.__sourceRepo = gh.getRepo(repo_params.username, repo_params.repo_name)

   log(this.__sourceRepo.__fullname + '<br />')

   var request_promise = this.__sourceRepo.getContents('master', repo_params.path_within_repo, false, function(error, result, response) {

     log('getContents CB func called' + '<br />')

     log(JSON.stringify(result) + '<br />')

  })

  return request_promise

  } // end of function fetch_source_repo_contents
  //////////////////////////////////
   
  //////////////////////////////////

  process_fetched_source_repo_data(fetched_data) {

    log('CopyOpProcessor::process_fetched_source_repo_data')
     
    log('*** fetched_data: <br />' + JSON.stringify(fetched_data))
    log(JSON.stringify(this.__sourceRepo))
    ///////////////////////////
    var tree_nodes = []
    
    fetched_data.forEach(function(item, index, arrayObj) {
       
      tree_nodes[index] = { "text" : item.name}

      ////
      
      if(item.type === 'file') {
        log(item.sha)
        
        item.blob = this.__sourceRepo.getBlob(item.sha, function(error, result, response) {
           
          log('*** getBlob ')
           
        })

      }
      ////
    })

    this.__fetched_data = fetched_data
    ///////////////////////////////
    log('tree_nodes: <br />' + JSON.stringify(tree_nodes))

    var tree_params = {
       tree_nodes : tree_nodes

    }
    update_js_tree(tree_params)

  } // end of function process_fetched_source_repo_data

  copy_fetched_data_to_dest_repo(credentials, repo_params) {
    log('CopyOpProcessor::copy_fetched_data_to_dest_repo') 
     
    var gh = new GitHub({

      //username: 'FOO',
      //password: 'NotFoo'
      /* also acceptable:
        token: 'MY_OAUTH_TOKEN'
      */
      username : credentials.gh_username,
      password : undefined,
      token : credentials.gh_pat
    })

    log(gh.__auth.username + '<br />')
    log(gh.__auth.token + '<br />')

    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

    this.__destRepo = gh.getRepo(repo_params.username, repo_params.repo_name)

    log(this.__destRepo.__fullname + '<br />')

    /////
    this.__fetched_data.forEach(function(item, index, arrayObj) {

      if(item.type === 'file') {
        log('*** created a blob for sha' + item.sha)
        var request_promise = this.__destRepo.createBlob(item.blob, function(error, result, response) {
        })

      }

    })
    /////
                                                     
  } // end of function copy_fetched_data_to_dest_repo
   
  //////////////////////////////////
   
} // end of class CopyOpProcessor

//////////////////////////////////
function gh_ops_copy_button_click_handler() {

  //log('gh_ops_opy_button_click_handler')
   
  var html_code = '<hr>'
  html_code += '<div id="gh_copy_repos_trees_div">'
  html_code += '</div>'
  $("#gh_current_operation_div").append(html_code)
  
  log('jstree: <br />' + JSON.stringify($.jstree))
  
  var credentials = {
     gh_username : $('#source_username').val(),
     gh_pat : $('#dest_gh_pat').val()
  }
  
  var repo_params = {
     username : $('#source_username').val(),
     repo_name : $('#source_repo_name').val(),
     path_within_repo : $('#path_within_source_repo').val()
     
  }
   
  var processor = new CopyOpProcessor()
  
  var request_promise = processor.fetch_source_repo_contents(credentials, repo_params)
  request_promise.then((response) => {
      
    credentials = {
      gh_username : $('#dest_username').val(),
      gh_pat : $('#dest_gh_pat').val()
    }

    repo_params = {
      username : $('#dest_username').val(),
      repo_name : $('#dest_repo_name').val(),
      path_within_repo : $('#path_within_dest_repo').val()

    }
    
    processor.process_fetched_source_repo_data(response.data)
    processor.copy_fetched_data_to_dest_repo(credentials, repo_params)

  })
   
}
///////////////////////////////////
function fetch_source_repo_contents(credentials, repo_params) {
  //model.current_user.gh_username = credentials.gh_username
  //model.current_user.gh_pat = credentials.gh_pat

  // basic auth
  var gh = new GitHub({
     //username: 'FOO',
     //password: 'NotFoo'
     /* also acceptable:
        token: 'MY_OAUTH_TOKEN'
      */
     username : credentials.gh_username,
     password : undefined,
     token : credentials.gh_pat
  })

  log(gh.__auth.username + '<br />')
  log(gh.__auth.token + '<br />')

  var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

  var sourceRepo = gh.getRepo(repo_params.username, repo_params.repo_name)

  log(sourceRepo.__fullname + '<br />')

  var fetched_data = undefined
  
  var request_promise = sourceRepo.getContents('master', repo_params.path_within_repo, false, function(error, result, response) {

    log('getContents CB func called' + '<br />')

    log(JSON.stringify(result) + '<br />')

    //this.fetched_data = result
  })
  /*
  .then((response) => {
    log('fetched_data: <br />' + JSON.stringify(response.data))
  })
  */
   
  return request_promise
}
///////////////////////////////////

function add_gh_ops_copy_event_handler() {
   
  $("#gh_ops_copy_menu_item").click(gh_ops_copy_menu_item_click_handler)
   
  ///////////////////////

  $("#gh_ops_copy_button").click(gh_ops_copy_button_click_handler)
  ////////////////////////
   
}

////////////////////////////////
function getTreeCb(error, result, response) {
}

function getTreeRecursiveCb(error, result, response) {
    log('getTreeRecursiveCb func called')
    log(JSON.stringify(result) + '<br />')
}

 /**
    * Get a description of a git tree recursively
    * @see https://developer.github.com/v3/git/trees/#get-a-tree
    * @param {string} treeSha - the SHA of the tree to fetch
    * @param {Requestable.callback} cb - will receive the callback data
    * @return {Promise} - the promise for the http request
    */
function getTreeRecursive(repo, treeSha, cb) {
  return repo._request('GET', `/repos/${repo.__fullname}/git/trees/${treeSha}?recursive=1`, null, cb);
}
////////////////////////////////////
var gh = undefined

$('#gh_pat_ok').click(function() {

  model.current_user.gh_username = $("#gh_username").val()
  model.current_user.gh_pat = $("#gh_pat").val()
     
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
