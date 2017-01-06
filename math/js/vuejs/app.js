var Vue = require ('../lib/vuejs/vue.js')
//var VueApp = require ('./app.vue')

var matrix_data_object = {
    rows_count : 3,
    cols_count : 3
}

var mdo = matrix_data_object

var matrix_style_object = {
    container : {
        width:'100%'
    },
    row : {
        height : 100/mdo.rows_count + '%'
    },
    cols : {
        width : 100/mdo.cols_count + '%'
    }
        
}

var mso = matrix_style_object

var matrix_template = '\
    <div id="matrix" class="container" v-bind=style="mso.container">\
      <template v-for="r in 3">\
        <div id="row" class="row">\
          <div v-for="c in 3" class="col-xs-2">\
            <input type="text" >\
          </div>\
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
    ],
      
    mso : mso // matrix style object
  }
  
})
