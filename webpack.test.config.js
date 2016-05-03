/*global __dirname:true process:true module:true*/

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'mocha!./test/spec/projectionswitcher.js',
    './css/openlayers-projection-switcher.less'
  ],
  output: {
    path: path.join(__dirname, '/test'),
    filename: 'test.bundle.js',
    publicPath: '/test/spec'
  },
  resolve: {
    alias: {
      'openlayers-projection-switcher': '../../src/projectionswitcher'
    }
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.less$/, include: path.join(__dirname, '/css'), loaders: ['style', 'css', 'less'] }
    ],
    noParse: [
      /dist\/ol.js/,
      /dist\/proj4.js/
    ]
  },
  devServer: {
    inline: true,
    host: process.env.HOST,
    port: process.env.PORT || 3001
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
