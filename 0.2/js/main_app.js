
var $ = require('/math/0.2/js/lib/jquery/v3_2_1/jquery.min.js')

var root_path = "https://amrmuhammad.github.io/" 
    
$("#site_language").change(function(){
  
  var lang = $("#site_language").val()
  
  if(lang === "ar") {
    location.assign(root_path + "0.2/lang/ar/index.html")
  } else if (lang === "en") {
    location.assign(root_path + "0.2/index.html")
  }
  
  $("body").append("<p>" + lang + "</p>")
})
