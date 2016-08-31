


/////////////////////////////////////////

// Neuron#1: element_id  // if zero, 
//           the element does not exist
          
// Neuron#2: parent_element_id
// Neuron#3: html_element_type
// Neuron#4: html_element_attribute_id
// Neuron#5: html_element_attribute_type
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



var synaptic = undefined;
/////////////////////////////////////////
// if (typeof window !== 'undefined' && 
// window['synaptic'] !== 'undefined') {

  synaptic = window['synaptic'];
   
// }

// require('synaptic');

//////////////////////////////////////////

// Debug 
var Debug = window['Debug'];

Debug.write ('testing debug code');

/******
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


*****/


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
  </div>";

  $("body").append(html_output);
});



 
