# Hot Loader

React Hot Loader is a plugin for Webpack that allows instantaneous live refresh without losing state while editing React components.

## Configurtaion

It is time to configure webpack itself. In our `webpack.dev.js`, we add the webpack dev server and the hot load server to each entry.
```js
_.forEach(buildConfig.builds, function (value, key) {
  config.entry[key] = [value.js, value.css];
  // Provider special entry point in development phase,
  // it will be able to get live reloads when doing changes to our source code.
  config.entry[key].unshift('webpack/hot/only-dev-server');
  config.entry[key].unshift('webpack-dev-server/client?' + buildConfig.hotServer);
});
```

Next we need to tell Webpack to use React Hot Loader for the components. See this in `webpack.dev.js`
```js
// loaders for development
config.module.loaders.push({
  test: /\.jsx?$/,
  loaders: ['react-hot', 'babel-loader'],
  exclude: /node_modules/
});
```

Finally, the Hot Replacement plugin from Webpack has to be included in the plugins section of the config.

```js
// plugins for development
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
]);

```

## Usage

Start the hot load server, and open our node server url in Browser. To test hot reloading, just edit any component and watch the changes happen live!
