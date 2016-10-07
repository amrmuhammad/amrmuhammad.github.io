


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

    var div_el = document.getElementById('debug_div');

    // construct the element if it does not exist
    if (div_el == null) {  
    
      div_el = document.createElement('div');
      div_el.setAttribute('id', 'debug_div');
      div_el.setIdAttribute ('id', true);
      div_el.textContent = "";
      body_el.appendChild (div_el);

    } 
    
    // refer to DOM 3 specs for more info
    // on the textContent attribute
    // of objects of type Element
    // and other types of DOM nodes
    div_el.textContent += message;

    
    
  }
};


window.Debug = Debug;
