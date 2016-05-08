var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var _ = require('lodash');
require('node-jsx').install({extension: '.jsx'});

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var RoutingContext = ReactRouter.RoutingContext;
var createLocation = require('history/lib/createLocation');
var routes = require('./routes.jsx');
var serverHelp = require('./utils/serverHelp.jsx');
var config = require('../build.config.js');

//define server render flag.
var __SERVERRENDER__ = process.env.__SERVERRENDER__;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieParser());
// use gzip to compress the content which send to client.
app.use(compress());

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));

app.use(function (req, res) {
  var location = createLocation(req.url);

  //through req hostname to get the relevant source. you also can use your way to do this.
  var host = req.headers.host;
  var d = _.find(config.maps, function (item) {
    return item.enable == true && item.host === host;
  });
  var build = d && d.build || 'default';
  var source = {js: [], css: []};
  if ('production' !== process.env.NODE_ENV) {
    source.js.push(config.publicPath + 'reactkits.js');
    source.js.push(config.publicPath + build + '/bundle.js');
    source.css.push(config.publicPath + build + '/bundle.css');
  } else {
    source.js.push('./dist/reactkits.js');
    source.js.push('./dist/' + build + '/bundle.js');
    source.css.push('./dist/' + build + '/bundle.css');
  }

  // don't do server render.
  if (__SERVERRENDER__ !== 'true') {
    res.render('layout', {source: source});
    return;
  }

  ReactRouter.match({routes: routes, location: location}, function (err, nextLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (renderProps == null) {
      res.status(400).send('Not Found!');
    } else {
      var HTML = React.createFactory(RoutingContext);
      renderProps.createElement = serverHelp.createElement;
      //init flux first, like get config, get user info.
      //serverHelp.flux.actions.initialize().then(function () {
        //fetch data from server.
       // serverHelp.fetchData(renderProps.components, 'needs').then(function () {
          var markup = ReactDOMServer.renderToString(HTML(renderProps));
          res.render('layout', {markup: markup, source: source});
        //});
      //}).catch(function (e) {
     //   res.send(e);
    //  });
    }
  });
});

module.exports = app;
