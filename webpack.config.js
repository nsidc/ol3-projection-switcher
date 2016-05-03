/*global __dirname:true process:true module:true*/

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

var config = {
  paths: {
    dist: path.join(__dirname, 'dist'),
    src: path.join(__dirname, 'src'),
    css: path.join(__dirname, 'css')
  },
  filename: 'projectionswitcher',
  library: 'ol3-projection-switcher'
};

var commonDist = {
  devtool: 'source-map',
  output: {
    path: config.paths.dist,
    libraryTarget: 'umd',
    library: config.library
  },
  entry: [
    config.paths.src + '/projectionswitcher.js',
    config.paths.css + '/openlayers-projection-switcher.less'
  ],
  externals: {
    openlayers: 'openlayers',
    proj4: 'proj4'
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.less$/, include: config.paths.css, loaders: ['style', 'css', 'less'] }
    ]
  }
};

if(TARGET == 'dist') {
  module.exports = merge(commonDist, {
    output: {
      filename: config.filename + '.js'
    }
  });
}

if(TARGET == 'dist-min') {
  module.exports = merge(commonDist, {
    output: {
      filename: config.filename + '.min.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
}
