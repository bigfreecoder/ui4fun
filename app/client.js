var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var routes = require('./routes.jsx');
var history = require('history');
var flux = require('./init.js');

if ('production' !== process.env.NODE_ENV) {
  global.flux = flux;
  global.React = React;
}

var createElement = function (Component, props) {
  return <Component {...props} flux={flux} />;
};

flux.actions.initialize().then(function () {
  ReactDOM.render(<Router createElement={createElement} history={history.createHistory()} routes={routes} />, document.getElementById('react-app'));
});

