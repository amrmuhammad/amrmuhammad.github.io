///////////////////////////////////////////


var HTMLConfiguration = {

  html_elements_count : 200,
  // # of allowed attributes per HTML element
  element_attributes_count : 10,
  css_properties_count : 50

};

///////////////////////////////////////////


var HTML_elements_types_count = 3;
var HTML_attribute_names_count = 1;
var CSS_property_names_count = 3;

var HTML_elements_types = {
  "div" : 1.0/HTML_elements_types_count,
  "input" : 2.0/HTML_elements_types_count,
  "textarea" : 3.0/HTML_elements_types_count


};

HTML_attribute_names = {

  "id" : 1.0/HTML_attribute_names_count



};
///////////////////////////
CSS_property_names = {

  "background-color" : 1.0/CSS_property_names_count,
  "top" : 2.0/CSS_property_names_count,
  "left" : 3.0/CSS_property_names_count

};
//////////////////////////////

function base10_num_to_hex_char(num) {

  var af_arr = ['A', 'B', 'C', 'D', 'E', 'F'];

  for (var i=0; i < 16; i++) {

    if(i===num) {

      if (i <=9)
        return "" + i; 
      else {
        return "" + af_arr [i-10];
        
      }
    }

  }
      
  return "undefined";

}

function decode_css_property_value (encoded_val, css_property_name) {


  if (css_property_name === "background-color") {
     decode_backgroundcolor_property_value (encoded_val);
  }
}

function decode_backgroundcolor_property_value (encoded_val) {
  // assume encoded values will take this form:
  // numbers with 12 digits after the decimal point
  // each two digits encode one of the 6 hex characters
  // in the rgb value
  // example
  // 0.151413121110 encodes the rgb value fedcba
  // 0.000102030405 encodes the rgb value 012345
  // 0.000102035506 is not a valid encoding as it has
  // 55 which is not a valid encoding for a hex character
  // only values between 0 and 15 are valid, the NN should
  // be trained NOT to generate such values

  var rgb = encoded_val * 1000000 * 1000000;
  var rgb_base10_enc = rgb; 

  for (var i=0; i <6; ++i) {

    var hex_base10_enc = rgb % 100;
    var hex_character = 
      base10_num_to_hex_char(hex_base10_enc);

    rgb_base10_enc -= hex_base10_enc;
    rgb_base10_enc = rgb_base10_enc / 100;

  }
}
//////////////////////////////

User_action_types_count = 6;

User_actions_types = {
  "add_div_elem", 1.0/User_action_types_count,
  "add_form_elem", 2.0/User_action_types_count,
  "add_button_elem", 3.0/User_action_types_count,
  "add_text_input_elem", 4.0/User_action_types_count,
  "add_text_area_elem", 5.0/User_action_types_count,
  "move_element", 6.0/User_action_types_count
  
}



/////////////////////////////////////////

// Neuron#1: element_id  // if zero, 
//           the element does not exist
          
// Neuron#2: parent_element_id
// Neuron#3: html_element_type
// Neuron#4: html_element_attribute_name
// Neuron#5: html_element_attribute_value
// .
// .
// .
// .
// Neuron#6: html_element_css_property_name
// Neuron#7: html_element_css_property_value
// .
// .
// .
// .
//////////////////////////////////////
// we will assume for now that we can have
// 200 html elements in the page
// each element has an id, a type and a 
// parent id
// so that's 200*3 = 600 input neurons

// we will assume that each element can have
// 10 html attributes and 50 CSS properties

// so that's 200*10*2 + 200*50*2= 
// 4000 + 20,000 = 24, 000 input neurons
//
//
//
// neuron#x: overall feedback on the design
// neuron#x+1: action to perform

// total no. Of nrurons= 24000+600+2=
// 24602
//



var $ = window.$;



//var synaptic = undefined;
//var synaptic = window.synaptic;
/////////////////////////////////////////
// if (typeof window !== 'undefined' && 
// window['synaptic'] !== 'undefined') {

  //synaptic = window.synaptic;
   
// }

// require('synaptic');

//////////////////////////////////////////

// Debug 
//var Debug = window.Debug;

//Debug.write('testing debug code');


// this line is not needed in the browser 
var Neuron = synaptic.Neuron, 
Layer = synaptic.Layer, 
Network = synaptic.Network, 
Trainer = synaptic.Trainer, 
Architect = synaptic.Architect;
/////////////////////////////////////////

function Perceptron(input, hidden, output) 
{ 
  // create the layers 
  var inputLayer = new Layer(input); 
  var hiddenLayer = new Layer(hidden); 
  var outputLayer = new Layer(output); 

  // connect the layers 
  inputLayer.project(hiddenLayer); 
  hiddenLayer.project(outputLayer); 

  // set the layers 

  this.set({ 
    input: inputLayer, 
    hidden: [hiddenLayer], 
    output: outputLayer 
  }); 

} 

// extend the prototype chain 
Perceptron.prototype = new Network(); 
Perceptron.prototype.constructor = Perceptron;

var no_of_neurons = 24602;
var myPerceptron = new Perceptron(
  no_of_neurons, no_of_neurons, 
  no_of_neurons);

overall_feedback_index = no_of_neurons-2;
user_action_index = no_of_neurons-1;



//////////////////////////////////////////
// var myTrainer = new Trainer(myPerceptron); 
// myTrainer.XOR(); 
// { error: 0.004998819355993572, 
// iterations: 21871, time: 356 } 
// myPerceptron.activate([0,0]); 
// 0.0268581547421616 
// myPerceptron.activate([1,0]); 
// 0.9829673642853368 
// myPerceptron.activate([0,1]); 
// 0.9831714267395621 
// myPerceptron.activate([1,1]); 
// 0.02128894618097928
//////////////////////////////////////////
/*********************
// train the network 
var learningRate = .3; 
for (var i = 0; i < 20000; i++) 
{ 
  // 0,0 => 0 
  myNetwork.activate([0,0]); 
  myNetwork.propagate(learningRate, [0]); 
  // 0,1 => 1 
  myNetwork.activate([0,1]); 
  myNetwork.propagate(learningRate, [1]); 
  // 1,0 => 1 
  myNetwork.activate([1,0]); 
  myNetwork.propagate(learningRate, [1]); 
  // 1,1 => 0 
  myNetwork.activate([1,1]); 
  myNetwork.propagate(learningRate, [0]); 
}
**************************/
////////////////////////////////////
/**
if(typeof $ === 'undefined') {
  window.alert('jquery is undefined');
} else {
  window.alert('jquery is defined');

}
**/
//var jquey_as_string = JSON.stringify($);

 

$(document).ready(function() {

  //window.alert ("document.ready.handler started");

  var html_output = "<div id=\"user_feedback_div\"> \
    <label for=\"user_feedback_text\"> User feedback </label> \
    <input id=\"user_feedback_text\" type=\"text\"></input> \
    <label for=\"user_action_text\"> User action </label> \
    <input id=\"user_action_text\" type=\"text\"></input> \
    <button id=\"user_feedback_submit\" type=\"button\"> </button> \
  </div>";

  $("body").append(html_output);
});

function update_attributes (elem, dom_tree_array, current_index) {

    var attributes = $(elem).prop("attributes");

    for (var i=0;
      i < HTMLConfiguration.element_attributes_count;
      i++) {
    
      attr_name_encoding = HTML_attribute_names [attributes [i].name];
      dom_tree_array[current_index++] = attr_name_encoding;
      dom_tree_array [current_index++] = attributes [i].value;
    

    }

}

function update_css_properties(elem, dom_tree_array, current_index) {

  var css_properties = $(elem).attr ("style");
  css_properties = css_properties.split (";", 
    HTMLConfiguration.css_properties_count);

  var added_properties_count = 0;

  dom_tree_array = _.reduce(css_properties, 
      function (dom_tree_array, property, index, css_properties) {
       

        if (added_properties_count < 
          HTML_configuration.css_properties_count) {

          property_name_value = property.split(":", 2);
        
          property_name_encoding = CSS_property_names[property_name_value [0]];
        
          dom_tree_array [current_index++] = property_name_encoding;
          dom_tree_array [current_index++] = property_name_value[1];

          added_properties_count++;
        }
          
        return dom_tree_array;
        
      }, dom_tree_array);


}

function process_child_element (context_obj, 
  elem, index, children_elements) {

    // get the tagname
    var node_name = $(elem).prop("nodeName");

    // find html element encoding
    var elem_encoding = HTML_elements_types[nodeName];

    // $dom_tree_array.push(elem_id);
    // dom_tree_array.push(elem_encoding);

    var dom_tree_array = context_obj.dom_tree_array; 
    var parent_elem_id = context_obj.parent_elem_id;
    var current_index = context_obj.current_index;



    dom_tree_array[current_index++] = elem_id;
    don_tree_array[current_index++] = parent_element_id;
    dom_tree_array[current_index++]  = elem_encoding;

    /////////////

    update_attributes (elem, dom_tree_array, current_index);
    //////////////

    update_css_properties (elem, dom_tree_array, current_index);
    

    context_obj.elem_id++;

 
 
}

function update_dom (dom_tree_array) {

  // remove all children of body tag
  $("body").empty ();

  var current_index = 0;
  
  for (var i=0; i <HTML_configuration.html_elements_count) {

    var elem_id = dom_tree_array [current_index++];
    var parent_elem_id = dom_tree_array [current_index++];
  
    var elem_encoding = dom_tree_array [current_index++];
    var tag_name = _.findKey(HTML_elements_types, elem_encoding);


    var parent_node = "#" + parent_elem_id;

    if (parent_elem_id == 0) {

      parent_node = "body";

    }

    $(parent_node).append (tag_name);
    $(parent_node + " " + tag_name).
      attr("id") = elem_id;

    for(var j=0; 
      j < HTML_configuration.element_attributes_count;
      j++) {

      var attr_name_encoding = dom_tree_array [current_index++];

      // TODO: shortest distance decoding
      var attr_name = _.findKey (HTML_attribute_names, attr_name_encoding ];

      //var attr_name = dom_tree_array [current_index++];

      if (attr_name === "id") {
        // skip attribute aling with its value
        current_index++;
        continue;
      }
      var attr_value = dom_tree_array [current_index++];

      $("body "+ tag_name + "#" + elem_id).attr 
        (attr_name) = attr_value;


    }

    var style_attr ="";

    for (var j=0;
      j < HTML_configuration.css_properties_count;
      j++) {

      var css_property_name_encoding = 
        dom_tree_array [current_index++]:
      var css_property_name = 
        _.findKey (CSS_property_names, css_property_name_encoding);
      style_attr += css_property_name
        + ":" + dom_tree_array [current_index++];   

    }

    $("body "+ tag_name + "#" + elem_id).attr 
        ("style") = style_attr;
    


   // elem_id++;
    
    
  
  }
}

function user_feedback_submit_handler (e) {


  var dom_tree_array = [];

  var user_feedback = $("user_feedback_text").val();

  var learningRate = 0.3;

  var elem_id = 1;
  var parent_elem_id = 0;

  var current_index = 0;

  //var body_tag_children = $("body").children();


  //////////////////////////
  //  Breadth first traversal for DOM tree
  
  var context = {
  
    dom_tree_array : dom_tree_array,
    parent_elem_id : parent_elem_id,
    current_index : current_index


  };

  var queue = buckets.Queue();
  queue.enqueue ($("body"));

  while (queue.length > 0) {

    var elem = queue.dequeue ():
    var elem_children = elem.children ();
    //elem.each (process_child_element);

    context = _.reduce (elem_children, 
      process_child_element, context);

    context.parent_elem_id++;
    
   
  }
  ////////////////////////////
  dom_tree_array [overall_feedback_index] = user_feedback;
  dom_tree_array[user_action] = 1.0/User_action_types_count;

  //body_tag_children.each (process_child_element);
  
  // activate NN
  var updated_dom_tree_array = myPerceptron.activate(dom_tree_array); 
  // propagate desired output
  myPerceptron.propagate(learningRate, updated_dom_tree_array); 


  // update_dom using new array 
  update_dom(updated_dom_tree_array);

  
}


$("user_feedback_submit").onclick(user_feedback_submit_handler);
 


 
