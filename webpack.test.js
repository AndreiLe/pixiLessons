'use strict';

const webpack = require('webpack');
const path = require('path');

var baseConfig = {
  context: path.join(__dirname, '/__tests__/'),
  entry: 'mocha-loader!./test.setup.webpack.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./__tests__'),
      path.resolve('./node_modules')
    ],
    alias: {
      CLIENT: path.resolve('./src/client')
    }
  },
  //create fast sourcemap
  mode: 'development',
  devtool: 'eval',
  serve: {
    content: path.join(__dirname, '__tests__'),
    dev: {
      stats: false
    },
    hot: true,
    open: true,
    host: process.env.HOST,
    port: 8090
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      }
    ]
  }
};

// export configuration
module.exports = baseConfig;