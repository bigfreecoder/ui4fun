var Fluxxor = require('fluxxor');
var actionType = require('../constants/actionType.js');

var ConfigStore = Fluxxor.createStore({
  initialize: function () {
    this.config = {};

    this.bindActions(
      actionType.ATTACH_CONFIG, this.attachConfig
    );
  },

  attachConfig: function (data) {
    this.config = data.config;
  }
});

module.exports = ConfigStore;
