var Fluxxor = require('fluxxor');
var actions = require('./actions/index.js');
var stores = require('./stores/index.js');

var flux = new Fluxxor.Flux(stores(), actions);

module.exports = flux;
