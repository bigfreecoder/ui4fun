var apiClient = require('../api_client.js');
var actionType = require('../constants/actionType.js');
var cookie = require('../../lib/cookie/index.js');

var ConfigAction = {
  initialize: function () {
    var self = this;
    return apiClient
      .get('http://host/api/init.json')
      .then(function (res) {
        self.dispatch(actionType.ATTACH_CONFIG, res.data);
      });
  },

  getConfig: function () {
    return apiClient
      .get('http://host/api/init.json')
      .then(function (res) {
        self.dispatch(actionType.ATTACH_CONFIG, res.data);
      });
  },

  performLogin: function(code) {
    apiClient
    .get('https://host/api/login/' + code +'/code')
    .then(function (res) {
      var payload = res.data;
      if(payload && payload.access_token) {
        cookie.set('Authorization', payload.token_type+' '+payload.access_token);
      }
    });
  }
};

module.exports = ConfigAction;
