


var Debug = {

  
  // This function adds a div tag 
  // to the body tag, and writes
  // all debuging messages
  // inside it
  write: function (message) {
  
    var body_el = document.getElementsByTagName('body');
    body_el = body_el [0];

    // check whether a div tag with
    // id debug_div already exists

    var div_el = document.getElementsById('debug_div');
    
    div_el = body_el.createElement('div');
    div_el.setAttribute('id', 'debug_div');
    div_el.setIdAttribute ('id', true);

    
    
  }
};
