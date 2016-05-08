var ConfigStore = require('./ConfigStore.js');
var CategoryStore = require('./CategoryStore.js');

module.exports = function () {
  return {
    ConfigStore: new ConfigStore(),
    CategoryStore: new CategoryStore()
  };
};


