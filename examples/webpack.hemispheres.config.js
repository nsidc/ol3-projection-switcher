/*global __dirname:true process:true module:true*/

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    hemispheres: path.join(__dirname, 'hemispheres/hemispheres.js'),
    styles: [
      path.join(__dirname, '../css/openlayers-projection-switcher.less'),
      path.join(__dirname, 'examples.less')
    ]
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },

  resolve: {
    alias: {
      'ol3-projection-switcher': '../../dist/projectionswitcher'
    },
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.less$/, loaders: ['style', 'css', 'less'] }
    ],
    noParse: [
      /dist\/ol.js/,
      /dist\/proj4.js/
    ]
  },

  devServer: {
    contentBase: 'examples/',
    stats: {colors: true},
    host: process.env.HOST,
    port: process.env.PORT || 3000
  },

  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.ejs',
      appMountId: 'map',
      inject: false
    })
  ]

};
