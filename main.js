/////////////////////////////////////////
var synaptic = require('synaptic'); 

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
