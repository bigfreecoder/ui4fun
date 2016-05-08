var React = require('react');
var flux = require('../init.js');
var apiClient = require('../api_client.js');

var createElement = function (Component, props) {
  return <Component {...props} flux={flux} />
};

/**
 * go through all components to invoke the specific method
 * @param  {[Array]} components   [all components get from react router]
 * @param  {[String]} method      [the specific method name]
 * @return {[Promise]}            [a promise for all the methods in the passed components]
 */
var fetchData = function (components, method) {
  method = method || 'needs';
  var promises = components.map(function (item) {
    if (typeof item === 'object') {
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          return item[key][method];
        }
      }
    } else {
      return item[method];
    }
  }).filter(function (item) {
    return typeof item === 'function';
  }).map(function (item) {
    return item(flux);
  })

  return apiClient.all(promises);
}

exports.createElement = createElement;
exports.flux = flux;
exports.fetchData = fetchData;
