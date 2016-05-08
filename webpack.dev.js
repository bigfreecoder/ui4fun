var webpack = require('webpack');
var _ = require('lodash');
var config = require('./webpack.config.js')();
var buildConfig = require('./build.config.js');

// Add source mapping for debuging.
config.devtool = 'inline-source-map';
config.debug = true;

_.forEach(buildConfig.builds, function (value, key) {
  config.entry[key] = [value.js, value.css];
  // Provider special entry point in development phase,
  // it will be able to get live reloads when doing changes to our source code.
  config.entry[key].unshift('webpack/hot/only-dev-server');
  config.entry[key].unshift('webpack-dev-server/client?' + buildConfig.hotServer);
});

config.output.publicPath = buildConfig.publicPath;

// plugins for development
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    '__SERVERRENDER__': buildConfig.serverRender
  })
]);

// loaders for development
config.module.loaders.push({
  test: /\.jsx?$/,
  loaders: ['react-hot', 'babel-loader'],
  exclude: /node_modules/
});

module.exports = config;
