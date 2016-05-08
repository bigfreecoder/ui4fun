# Server Side Render

We call this "Isomorphic". Isomorphic webapps are single page applications that render on both the client and server (using nodejs). They are ambitious client side webapps with SEO and initial page load performance by default.

Benefits

- Better overall user experience
- Search engine indexable

Server rendering is a bit different than in a client because you'll want to:

- Send `500` responses for errors
- Send `404` responses for not found
- Fetch data before rendering (and use the router to help you do it)

It looks like this in Node server:

```js
ReactRouter.match({routes: routes, location: location}, function (err, nextLocation, renderProps) {
  if (err) {
    res.status(500).send(err.message);
  } else if (renderProps == null) {
    res.status(400).send('Not Found!');
  } else {
    var HTML = React.createFactory(RoutingContext);
    renderProps.createElement = serverHelp.createElement;
    //init flux first, like get config, get user info.
    serverHelp.flux.actions.initialize().then(function () {
      //fetch data from server.
      serverHelp.fetchData(renderProps.components, 'needs').then(function () {
        var markup = React.renderToString(HTML(renderProps));
        res.render('layout', {markup: markup, source: source});
      })
    }).catch(function (e) {
      res.send(e);
    })
  }
})
```

For data loading, you need add a static method in your component, the `fetchData` function will go through the components and invoke the static method. You can define the method name by yourself and pass to `fetchData`, or use the default one `needs`.

```js
var React = require('react');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({
  mixins: [FluxMixin],

  statics: {
    needs: function (flux) {
      return flux.actions.getCategories();
    }
  },

  componentWillMount: function () {
    return this.getFlux().actions.getCategories();
  },

  componentDidUpdate: function () {
    this.getFlux().actions.getCategories();
  },

  render: function () {
    return ();
  }
});

module.exports = App;
```
```js
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
```

At last, there is a flag `serverRender` in `build.config.js` to decide whether use server side render.

```js
// ./build.config.js
module.exports = {
  // decide whether use server render
  serverRender: true,
};

// ./app/server.js
// don't do server render.
if (__SERVERRENDER__ !== 'true') {
  res.render('layout', {source: source});
  return;
}
```


