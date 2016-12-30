var Vue = require ('../lib/vuejs/vue.js')
//var VueApp = require ('./app.vue')



Vue.component ({
  template : matrix_template, 
  data : {
  }
  
})

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
