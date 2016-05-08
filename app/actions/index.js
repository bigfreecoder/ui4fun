var _ = require('lodash');
var ConfigAction = require('./ConfigAction.js');
var CategoryAction = require('./CategoryAction.js');

var actions = {};
_.extend(actions, ConfigAction, CategoryAction);

module.exports = actions;
