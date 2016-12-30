var Vue = require ('../lib/vuejs/vue.js')
//var VueApp = require ('./app.vue')


var matrix_template = '\
    <div id="matrix" class="container">\
      <template v-for="r in 3">\
        <div id="row" class="row">\
          <input v-for="c in 3" type="text" class="col-xs-2">\
        </div>\
      </template>\
    </div>\
    '


//var matrix_template = '<div>hello</div>'

Vue.component ('matrix',  {
  template: matrix_template, 
  props: ['rows-count', 'cols-count',
          'elems']
})

var app = new Vue({
  el: '#app',
  
  template: '<matrix rows-count="1" cols-count="3" elems="" ></matrix>',
  
  data: {
    elems: [
      [1, 2, 3], 
      [4, 5, 6]
    ]
  }
  
})
