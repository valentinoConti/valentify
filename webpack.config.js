const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', `${__dirname}/src/index.js`],
  // entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/build`,
    publicPath: '/build/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx?$/, loader: 'babel-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(pdf|jpg|png|gif|svg|ico)$/, loader: 'url-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.ttf$/, loader: 'file-loader' }
    ],
  },

  plugins: process.argv.indexOf('-p') === -1 ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
  ],
};
