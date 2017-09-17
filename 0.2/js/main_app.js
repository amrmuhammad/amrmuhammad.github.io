

$("#site_language").change(function(){
  
  var lang = $("#site_language").val()
  
  if(lang == "العربية") {
    location.assign("/0.2/lang/ar/index.html")
  } else if (lang == "English") {
    location.assign("/0.2/index.html")
  }
  
})
