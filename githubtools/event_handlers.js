var model = require('./model.js')

$('#gh_pat_ok').click(function() {
   var gh = new GitHub({ 
   //username: 'FOO', 
   //password: 'NotFoo' 
   //also acceptable: 
   // token: 'MY_OAUTH_TOKEN' 
   // username : $('#gh_username').val(),
   password : undefined,
   token : $("#gh_pat").val() 
   }) 
   
   log(gh.__auth.username + '<br />')
   log(gh.__auth.token + '<br />') 
   
   var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
   destRepo = gh.getRepo("amrmuhammad", "amrmuhammad.github.io") 
   
   log(destRepo.__fullname + '<br />') 
 
 })
 
 ////////
 
 
 $('#app_settings_file_input').change(function() {
  
  var file_list = $('#app_settings_file_input').get(0).files
  var file = file_list[0]
  
  var file_reader = new FileReader()
  file_reader.onload() = function(event) {
   
    model.app_settings = JSON.parse(file_reader.result)
     
  var sett = model.app_settings.copy_op
  $('#dest_gh_pat').val(sett.dest_gh_pat)
  $('#dest_username').val(sett.dest_username)
  $('#dest_repo_name').val(sett.dest_repo_name)
  $('#path_within_dest_repo').val(sett.path_within_dest_repo)
  $('#source_username').val(sett.source_username)
  $('#source_repo_name').val(sett.source_repo_name)
  $('#path_within_source_repo').val(sett.path_within_source_repo)

  }
  
  file_reader.readAsText(file)
  
 })
 
 
 /////////
