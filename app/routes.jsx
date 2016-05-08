var React =require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;

var App = require('./views/pages/App.jsx');
var Home = require('./views/pages/Home.jsx');
var Dock = require('./views/pages/Dock.jsx');
var Category = require('./views/pages/Category.jsx');
var Product = require('./views/pages/Product.jsx');
var Login = require('./views/pages/Login.jsx');

var routes = (
  <Route component={App}>
    <Route path="/" components={{dock: Dock, content:Home}}>
      <Route path="category/:categoryId" component={Category}>
        <Route path="product/:productId" component={Product} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  </Route>
);

module.exports = routes;
