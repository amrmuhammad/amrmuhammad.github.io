var Vue = require ('../lib/vuejs/vue.js')
//var VueApp = require ('./app.vue')


var matrix_template = '\
    <template v-for="r in rows-count">\
      <div id="row">\
        <input v-for="c in cols-count" type="text">\
      </div>\
    </template>\
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
