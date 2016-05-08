var Fluxxor = require('fluxxor');
var actionType = require('../constants/actionType.js');

var CategoryStore = Fluxxor.createStore({

  initialize: function () {
    this.categories = [];
    this.products = [];

    this.bindActions(
      actionType.ATTACH_CATEGORIES, this.attachCategories,
      actionType.ATTACH_PRODUCTS, this.attachProducts
    );
  },

  attachCategories: function (data) {
    this.categories = data.categories;
    this.emit('change');
  },

  attachProducts: function (data) {
    this.products = data.products;
    this.emit('change');
  },

  getState: function () {
    return {
      categories: this.categories,
      products: this.products
    };
  }
});

module.exports = CategoryStore;
