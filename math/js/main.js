

var Vue = require('./lib/vuejs/v2_2_3/vue.js')
var $ = require('./lib/jquery/v3_2_1/jquery.js')

/////////////////////
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
  data: {
    message: 'hello',
    rows : 3,
    cols : 3
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

$('#app').append("<matrix></matrix>")
