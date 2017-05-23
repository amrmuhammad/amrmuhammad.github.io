

var Vue = require('./lib/vuejs/v2_2_3/vue.js')


/////////////////////
Vue.component('matrix', {
  template: '<div id="" > ' +
            
            '</div>',
  data: {
    message: 'hello'
  }
})


/////////////////////
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
