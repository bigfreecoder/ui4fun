var apiClient = require('../api_client.js');
var actionType = require('../constants/actionType.js');

var CategoryAction = {
  getCategories: function () {
    var self = this;
    return apiClient
      .get('https://merlintest.cq.hpwsportal.com/api/homepage.json')
      .then(function (res) {
        self.dispatch(actionType.ATTACH_CATEGORIES, res.data);
      });
  },

  getProductByCategory: function (categoryId) {
    var self = this;
    return apiClient
      .get('https://merlintest.cq.hpwsportal.com/api/categories/' + categoryId + '.json')
      .then(function (res) {
        self.dispatch(actionType.ATTACH_PRODUCTS, res.data.category);
      });
  }
};

module.exports = CategoryAction;
