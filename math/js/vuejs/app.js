var Vue = require ('../lib/vuejs/vue.js')
var VueApp = require ('./app.vue')


var app = new Vue({
  el: '#app',
  
  template: '<matrix> </matrix>',
  
  data: {
    elems: [
      [1, 2, 3], 
      [4, 5, 6]
    ]
  }
  
})
