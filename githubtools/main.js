
(function() {

'use strict'

//var ClientOAuth2 = require('client-oauth2')


var GitHub = require('../github-tools/GitHubJS/dist/GitHub.bundle.min.js');
var $ = require('../math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')

var jsTree = require('../js/jstree/v3.3.5/dist/jstree.min.js')

var repo_utils = require('../js/repo_utils.js')

var polyfills = require('./polyfills.js')

var model = require('./model.js')
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
//////////////////////////////////
// code copied from 
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep

// see https://github.com/amrmuhammad/amrmuhammad.github.io/blob/master/LICENSE/stackoverflow/LICENSE-what-is-the-javascript-version-of-sleep.md
// for license 

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

////////////////////


var html_code = ""

///////////////////////////////////
html_code += 'Github username : <input id="gh_username" > <br />'
html_code += 'Github API personal access token : <input id="gh_pat" > <br />'
html_code += '<button id="gh_pat_ok">ok</button>'
html_code += '<br /> <br />'
///////
html_code += '<hr>'
///////
html_code += 'Settings file: <br />'
html_code += '<input type="file" id="app_settings_file_input">'
///////
html_code += '<hr />'
////////
html_code += '<div id="gh_operations_div">'
html_code += '<button id="gh_operations_button">Operations</button> <br />'
html_code += '</div>'
///////
html_code += '<div id="gh_current_operation_div">'
html_code += '</div>'
////////
html_code += '<hr>'

////////////////////////////////////
$('#app').append(html_code)
////////////////////////////////////
$('#app').append('<div id="debug_div"></div>')

////////////////////////////////////
function execute_util_code() {
  log('Before require util.js')

  var GitHubToolsUtil = require('./util.js')

  log('After require util.js')
}

//execute_util_code()

///////
require('./event_handlers.js')
////////


$('#gh_pat_ok').click(function() {
   
    var gh = new GitHub({

      //username: 'FOO',
      //password: 'NotFoo'


      //also acceptable:

      // token: 'MY_OAUTH_TOKEN'


      //

      username : $('#gh_username').val(),

      password : undefined,

      token : $("#gh_pat").val()

    })

    log(gh.__auth.username + '<br />')

    log(gh.__auth.token + '<br />')

    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

    destRepo = gh.getRepo("amrmuhammad", "amrmuhammad.github.io")

    log(destRepo.__fullname + '<br />')
/*
    try {
    destRepo.writeFile("", 'testwritefile.js', textRes, "Github.bundle.js", {}, function(error, result, response) {
    }).then( function(response){
      log('wrieFile success')
      log(JSON.stringify(response))
    }, function (error) {
      log('writeFile failure')
      log(JSON.stringify(error))
    }).catch(function (e) {
      log('.catch() called')
      log(JSON.stringify(e))
    })
   
    } catch(e){
       log('catch block')
    }
   */
	
   /*
   
   log('1')
   
   var branch = '',
       path = "testWriteFile.js",
       content = textRes,
       message= "Github.bundle.js",
       options = {},
       cb = function(error, result, response){
       }
   
   log('2')
   
     log(JSON.stringify(GitHub.Repository.Base64))
   
     if (typeof {} === 'function') {
         cb = options;
         options = {};
      }
      let filePath = path ? encodeURI(path) : '';
      let shouldEncode = options.encode !== false;
      let commit = {
         branch,
         message,
         author: options.author,
         committer: options.committer,
         content: shouldEncode ? Base64.encode(content) : content,
      };

      return this.getSha(branch, filePath)
         .then((response) => {
            commit.sha = response.data.sha;
            return this._request('PUT', `/repos/${this.__fullname}/contents/${filePath}`, commit, cb);
         }, () => {
            return this._request('PUT', `/repos/${this.__fullname}/contents/${filePath}`, commit, cb);
         });
     */
   
})

///////////////////////////////////


/*
var model = {
  gh_operations_menu_displayed : false,
   
  current_user : { 
  },
	
  app_settings : {
  }

*/
	
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
  html_code += 'Github destination username : <input id="dest_username" value="amrmuhammad"> <br />'
  html_code += 'Github destination repo. name : <input id="dest_repo_name" value="amrmuhammad.github.io"> <br />'
  html_code += 'Github destination API personal access token : <input id="dest_gh_pat" > <br />'
  html_code += 'Path within dest repo : <input id="path_within_dest_repo" > <br />'
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

    this.__fetched_source_repo_params = repo_params
    
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

   var rate_limit = gh.getRateLimit()
   
   var rate_limit_promise = rate_limit.getRateLimit(null)
   rate_limit_promise.then(function(response) {
     log('ratelimit response:' + JSON.stringify(response))
   })
	  
   var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

   this.__sourceRepo = gh.getRepo(repo_params.username, repo_params.repo_name)

   log(this.__sourceRepo.__fullname + '<br />')

   var request_promise = this.__sourceRepo.getContents
     ('master', repo_params.path_within_repo, false, 
     function(error, result, response) {

       log('getContents error: ' + error + JSON.stringify(error))
	     
       log('getContents CB func called' + '<br />')

       log('getContents response:' + JSON.stringify(response))

       log(JSON.stringify(result) + '<br />')

    }
  )

  return request_promise

  } // end of function fetch_source_repo_contents
  //////////////////////////////////
  
  get_no_of_file_items(fetched_data) {
    log('CopyOpProcessor::get_no_of_file_items')
	  
    try {
	    
    var no_of_file_items = 0
	  
	    
    fetched_data.forEach(function(item, index, arrayObj) {

      if(item.type === 'file') {
        no_of_file_items = no_of_file_items + 1
      }
    })
    } catch(e) {
      log('get_no_of_file_items catch block:'
	  + e
	  )
    }
	  
    return no_of_file_items
  }
  
  //////
  async read_file_from_gh(item) {
	  
    log('read_file_from_gh')
	  
    var file_path = ""
    if (this.__fetched_data.type === "file") {
      file_path = this.__fetched_source_repo_params.path_within_repo
    } else {
      file_path = this.__fetched_source_repo_params.path_within_repo
	    + item.name
    }

    
    var response  = await this.sourceRepo.getContents
      ('master', file_path, true, null)
    
    item.file = response.data
    item.file = Base64.decode(item.file)
    
    
    return item.file
    
  }

  async read_blob_from_gh(item) {
	
    log('read_blob_from_gh')
	  
    var sourceRepo = this.__sourceRepo
    
    try {
	    
      // await throws rejected value if promise is rejected
      var response = await sourceRepo.getBlob(item.sha, null)


     log('read_blob_from_gh response: ' + response)
     item.blob = response.data
     //log('item.blob: ' + JSON.stringify(item.blob))
               

    } catch(err) {

        log('catch block, error: ' + err)

    }
	  
    return item.blob

  }
	
  //////////////////////////////////
  process_fetched_source_repo_data_helper(fetched_data, tree_nodes) {
    log('CopyOpProcessor::process_fetched_source_repo_data_helper')
	
     
    var sourceRepo = this.__sourceRepo
    var fetchedBlobCount = 0
    
    var no_of_file_items = this.get_no_of_file_items(fetched_data)
    
    var fetched_data = fetched_data.gh_fetched_data
    
    var promise = new Promise  (function(resolve, reject) {
    
    fetched_data.forEach( function(item, index, arrayObj) {


      tree_nodes[index] = { "text" : item.name}

      ////

      if(item.type === 'file') {

        log('item.sha' + item.sha)

         try {

	   var read_file = this.read_file_from_gh(item)
		 
         //  var read_blob = this.read_blob_from_gh(item)
	   
           fetchedBlobCount = fetchedBlobCount + 1
                
           if(fetchedBlobCount === no_of_file_items) {
                
             resolve(fetchedBlobCount)
                
           }


         } catch(e) {

           log('catch block:' + e)

         }

      }

      ////

    }) // Array forEach loop
      
    }) // promise constructor
    
    return promise
    
  }// end of function
  //////////////////////////////////
   
  process_fetched_source_repo_data(fetched_data) {

    log('CopyOpProcessor::process_fetched_source_repo_data')
     
    log('*** fetched_data: <br />' + JSON.stringify(fetched_data))
    log(JSON.stringify(this.__sourceRepo))
	
    this.__fetched_data = fetched_data
    //handle the case of one item returned instead of an array
    if(! (this.__fetched_data instanceof(Array)) ) {
      this.__fetched_data = [this.__fetched_data]
    }
    ///////////////////////////
    this.__fetched_data = {
      gh_fetched_data : this.__fetched_data
    }
    ////////
    if (this.__fetched_data.gh_fetched_data.length === 1) {
      // then we fetched a file
      this.__fetched_data.type = "file"
      
    } else {
      this.__fetched_data.type = "directory"
	    
      //fix directory path if it does not end with a slash
      if(! (this.__fetched_source_repo_params.path_within_repo.endsWith('/')) ) {
        this.__fetched_source_repo_params.path_within_repo += '/'
      }
    }
	  
    ///////////////////////////
    
    ///////////////////////////
    var tree_nodes = []
    
    
    
    var fetchedBlobsPromise = this.process_fetched_source_repo_data_helper
      (this.__fetched_data, tree_nodes)

    
    ///////////////////////////////
    log('tree_nodes: <br />' + JSON.stringify(tree_nodes))

    var tree_params = {
       tree_nodes : tree_nodes

    }
    update_js_tree(tree_params)
    
    return fetchedBlobsPromise

  } // end of function process_fetched_source_repo_data

  copy_fetched_data_to_dest_repo(credentials, repo_params) {
    log('CopyOpProcessor::copy_fetched_data_to_dest_repo') 
     
    this.dest_repo_params = repo_params	  

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
    this.write_files_contents(repo_params.path_within_repo)
    /////
  } //copy_fetched_data_to_dest_repo

  write_file_contents_manually() {
    var destRepo = this.__destRepo
    var requestPromise = destRepo.getRef("heads/master", null)
    var refData = undefined
    var fetched_data = this.__fetched_data
    
    requestPromise.then(async function(value) {
	    
      
      refData = value
      var commitSha = refData.data.object.sha
      
      log("getRef .then() called" + JSON.stringify(refData))
	    
      var getCommitPromise = await destRepo.getCommit(commitSha, null)
      
      getCommitPromise.then(async function(value) {
        var commitData = value
        var commitTreeSha = commitData.data.tree.sha
        
	log("getCommit .then() called" + JSON.stringify(commitData))
	
        copy_data_helper(repo_params.path_within_repo, fetched_data, commitTreeSha, commitSha)
      })
      .catch(function(e) {
        log("getCommit .catch() called: " + e)
      })
	    
    })
    .catch(function(e) {
      log("getRef .catch() called" + e)
    })
  
	
    async function copy_data_helper(path_within_repo, fetched_data, commitTreeSha, commitSha) {
    
    log("copy_data_helper")
	    
    var baseTreeSha = commitTreeSha
    var baseCommitSha = commitSha
    
    fetched_data.forEach(async function(item, index, arrayObj) {

      if(item.type === 'file') {
        log('item.sha' + item.sha)
         
        try {
           
          var treeObj = {
	
	          path : path_within_repo + item.name,
	          mode : "100644",
	          type : "blob",
	          sha : undefined
	
	        }
           
	//  log('item.blob: ' + JSON.stringify(item.blob))
		
          var request_promise = await destRepo.createBlob(item.blob, function(error, result, response) {
          })
          .then(async function(value) {
	    var blobData = value
	    var createdBlobSha = blobData.data.sha
	    
	    log("createdBlobSha: " + createdBlobSha)
		  
	    treeObj.sha = createdBlobSha

	    treeObj = [treeObj]
            log('baseTreeSha :' + baseTreeSha)
            log('treeObj: ' + JSON.stringify(treeObj))
		  
	    var req_promise = await destRepo.createTree(treeObj, baseTreeSha, null)
	    req_promise
            .then(async function(value) {
	      var treeData = value
	      
	      log("createdTreeSha :" + treeData.data.sha)
		    
	      baseTreeSha = treeData.data.sha
	      var req_promise = await destRepo.commit(baseCommitSha, treeData.data.sha, "update " + item.name, null)
	      req_promise
              .then(async function(value) {
	        var commitData = value
		
		log("new commit sha: " + commitData.data.sha)
		      
		baseCommitSha = commitData.data.sha
		      
		var req_promise = await destRepo.updateHead("heads/master", commitData.data.sha, true, null)
		req_promise
		.then(async function(value) {
			
                  log("updateHead .then() called")
			
		})
		.catch(function(e) {
		  log("updateHead .catch() called : " + e
		    + ' ' + JSON.stringify(e))
		})
		
	      })
	      .catch(function(e) {
	        log('commit .catch() called ' + e)
	      })
		    
	    })
            .catch(function(e) {
              log('createTree .catch() called' + e + 
	        JSON.stringify(e))
	    })
             
          })
	  .catch(function(e) {
	    log('createBlob .catch() called :' + e)
	  })
	  
          
          
        } catch(e) {
          log('catch block:' + e)
        }

      }

    })
    
    } // copy_data_helper
    /////
                                                    
  } // write_file_contents_manually
  //////////////////////////////////
  
  async write_files_contents(path_within_repo) {
	  
    log('CopyOpProcessor::write_files_contents')
	  
    var fetched_data = this.__fetched_data
    var destRepo = this.__destRepo
   
    //var file_path = ""
   // var path_within_source_repo = this.__fetched_source_repo_params.path_within_repo
    
   if( 
       ( ! (this.dest_repo_params.path_within_repo.endsWith('/')) )
     ) {
     this.dest_repo_params.path_within_repo += '/'
   }
    
    try {
    for (var i=0; i<fetched_data.length; i++) {
    //fetched_data.forEach(async function(item, index, arrayObj) {
      var item = fetched_data[i]
    
      if(item.type === 'file') {
        var file_path = this.dest_repo_params.path_within_repo + 
	    this.__fetched_source_repo_params.path_within_repo 
	
	if (this.__fetched_data.type === "directory") {
          file_path += item.name
	}
	
	try {
	
          var response = await destRepo.writeFile('master', file_path, 
	    item.file, 'update ' + item.name, 
	    {encode : true})
	
	  
	  log('File: ' + item.name + ' successfully written ' 
	    + 'in destination Repo at' + file_path)
		
	  await sleep(5000) // sleep 5 seconds
          //for (var i=0; i<30000; i++) {
          //var j= 0
	  //j = j + 1
	  //}
		
	} catch(e) {
	  log('writeFile failed: \n' + 
	      e +
	      'Error object: ' + JSON.stringify(e)
	     )
	}
	      
      }
	    
    } // for loop
    } catch(e) {
      log(e)
    }
	  
    //}) // forEach
        
  } // write_files_contents
   
} // end of class CopyOpProcessor

//////////////////////////////////
function save_settings() {

  var sett = model.app_settings.copy_op = {}
  sett.dest_gh_pat = $('#dest_gh_pat').val()
  sett.dest_username = $('#dest_username').val()
  sett.dest_repo_name = $('#dest_repo_name').val()
  sett.path_within_dest_repo = $('#path_within_dest_repo').val()
  sett.source_username = $('#source_username').val()
  sett.source_repo_name = $('#source_repo_name').val()
  sett.path_within_source_repo = $('#path_within_source_repo').val()
	
  var FileSaver = require('./FileSaver.debug.js');
  
  var blob = new Blob([JSON.stringify(model.app_settings)], {type: "text/plain;charset=utf-8"})
   
   
  FileSaver.saveAs(blob, "githubtools.copyop.settings.json")

}
//////////////////////////////////

function gh_ops_copy_button_click_handler() {

  //log('gh_ops_opy_button_click_handler')

  try {
  save_settings()
	
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
    
    var fetchedBlobsPromise = processor.process_fetched_source_repo_data(response.data)
    
    fetchedBlobsPromise.then(function(value) {
    
      processor.copy_fetched_data_to_dest_repo(credentials, repo_params)

    })
    .catch(function(e) {
      log('process_fetched_source_repo_data promise .catch called: ' 
	  + e
	  + JSON.stringify(e)
	  + e.lineNumber
	 )
    })
    
  })
	  
  } catch(e) {
    log(JSON.stringify(e))
  }
   
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

})();

