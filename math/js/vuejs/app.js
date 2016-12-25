var Vuejs = require ('../lib/vuejs/vue.js')


Vue.component('matrix', {
  props: ['rows'],
  template: '<li>{{ rows }}</li>'
})
var app = new Vue({
  el: '#app',
  data: {
    rows: [
      [1, 2, 3], 
      [4, 5, 6]
    ]
  }
})
