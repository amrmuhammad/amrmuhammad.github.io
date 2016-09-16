///////////////////////////////////////////


var HTMLConfiguration = {

  // # of allowed attributes per HTML element
  element_attributes_count : 10,
  css_properties_count : 50

};

///////////////////////////////////////////


var HTML_elements_types_count = 3;
var HTML_attribute_names_count = 1;
var CSS_property_names_count = 3;

var HTML_elements_types = {
1.0/HTML_elements_types_count : "div",
2.0/HTML_elements_types_count : "input"
3.0/HTML_elements_types_count : "textarea"


},

HTML_attribute_names = {

1.0/HTML_attribute_names_count : "id",





},

CSS_property_names = {

1.0/CSS_property_names_count : "background-color",
2.0/CSS_property_names_count : "top",
3.0/CSS_property_names_count : "left",

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

$("user_feedback_submit").onclick(function(e) {

  var dom_tree_array = [];

  var user_feedback = $("user_feedback_text").val();

  var learningRate = 0.3;

  var elem_id = 1;

  var current_index = 0;

  var body_tag_children = $("body").children();

  body_tag_children.each (function () {

    // get the tagname
    var node_name = $(this).prop("nodeName");

    // find html element encoding
    var elem_encoding = _.findKey(HTML_elements_types, nodeName);

    // $dom_tree_array.push(elem_id);
    // dom_tree_array.push(elem_encoding);

    dom_tree_array[current_index++] = elem_id;
    don_tree_array[current_index++] = parent_element_id;
    dom_tree_array[current_index++]  = elem_encoding;

    /////////////
    var attributes = $(this).prop("attributes");

    for (var i=0;
      i < HTMLConfiguration.element_attributes_count;
      i++) {
    
      dom_tree_array[current_index++] = attributes[i].name;
      dom_tree_array [current_index++] = attributes [i].value;
    

    }
    //////////////
    var css_properties = $(this).attr ("style");
    css_properties = css_properties.split (";", 
      HTMLConfiguration.css_properties_count);

    var css_properties_map = _.reduce(css_properties, 
      function (value) { }, css_properties_map);


    for (var j=0; 
      j < HTMLConfiguration.css_properties_count;
      j++) {

      dom_tree_array [current_index++] = css_properties[i].name;
      dom_tree_array [currebt_index++] = css_properties[i].value;
     

    }


    



  });
  
  myPerceptron.activate([0,1]); 
  myPerceptron.propagate(learningRate, [1]); 
  
    
});
 


 
