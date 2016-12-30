var Vue = require ('../lib/vuejs/vue.js')
//var VueApp = require ('./app.vue')

var matrix_template = 
    ' \
    <template v-for="r in rows-count"> \
      <div id="row"> \
        <input v-for="c in cols-count" type="text"> \

      </div> \
    </template> \
    '

Vue.component ('matrix',  {
  template: matrix_template, 
  props: ['rows-count', 'cols-count',
          'elems']
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
