var cookieDough = require('cookie-dough')();
var _ = require('lodash');
var cookie = {
  get:function(cname) {
    return cookieDough.get(cname);
  },

  set:function(cname, cvalue, coptions) {
    var options = _.assign({path:'/'}, coptions)
    cookieDough.set(cname,cvalue,options);
  },

  remove:function(cname, coptions) {
    cookieDough.set(cname,'', _.assign(coptions, {expires:new Date(0)}));
  },

  all: function () {
    return cookieDough.all();
  }
};

module.exports = cookie;
