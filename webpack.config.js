var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
  return {
    entry: {
      common: ['react', 'react-router', 'fluxxor', 'lodash', 'axios']
    },
    output: {
      path: path.join(__dirname, 'public/dist'),
      filename: '[name]/bundle.js'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin('[name]/bundle.css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'reactkits.js',
        minChunks: Infinity
      })
    ],
    module: {
      loaders: [
        // Extract css files
        // Use the autoprefixer-loader
        {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader")},
        // extract less files using stylus loader
        {test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!stylus-loader")},
        {test: /\.(png|jpg)$/, loader: "url-loader", query: {limit: 1, name: '[path][name].[ext]'}}
      ]
    },
    resolve:{
      extensions: ['', '.js', '.jsx', '.styl']
    }
  }
};
