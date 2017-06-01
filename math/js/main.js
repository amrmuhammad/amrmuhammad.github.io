

//var Vue = require('./lib/vuejs/v2_2_3/vue.js')
var $ = require('./lib/jquery/v3_2_1/jquery.js')

/////////////////////
/*
Vue.component('matrix', {
  template: '<div id="matrix1" > ' +
              '<template v-for="1 to rows">' +
              '<tr>' +
                '<template v-for="1 to cols">' +
                '<td>' +
                '<input type="text">' +
                '</td>' +
              '</tr>' +
              '</template' +
            '</div>',
  
  data: function() {
    return {
      message: 'hello',
      rows : 3,
      cols : 3
    }
  }
})


/////////////////////
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
/////////////////////
*/
var html_code = '<div id="matrix1">' 
for (i=0; i< rows; i++) {
   html_code += '<tr>'
   for (j=0; j< cols; j++) {
     html_code += '<td>'
     html_code += '<input type="text">'
     html_code += '</td'
   }
   html_code += '</tr>'
}
            
  
//$('#app').append("<matrix></matrix>")
$("#app").append(html_code)


