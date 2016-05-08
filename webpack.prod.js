var webpack = require('webpack');
var _ = require('lodash');
var config = require('./webpack.config.js')();
var buildConfig = require('./build.config.js');

_.forEach(buildConfig.builds, function (value, key) {
  config.entry[key] = [value.js, value.css];
});

config.output.publicPath = '/dist/';

// plugins for production
config.plugins = config.plugins.concat([
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__SERVERRENDER__': buildConfig.serverRender
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      // maybe we need to compatible with ie8
      screw_ie8: false,
      dead_code: true,
      warnings: false,
      drop_console: true
    }
  })
]);

// loaders for production
config.module.loaders.push({
  test: /\.jsx?$/,
  loaders: ['babel-loader'],
  exclude: /node_modules/
});

module.exports = config;
