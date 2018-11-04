const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: `${__dirname}/src/index.js`,
	output: {
		path: `${__dirname}/build`,
		publicPath: '/build/',
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.html$/, loader: 'html-loader' },
			{ test: /\.(pdf|jpg|png|gif|svg|ico)$/, loader: 'url-loader' },
		],
	},

	plugins: process.argv.indexOf('-p') === -1 ? [] : [
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
		}),
		new HtmlWebPackPlugin({
			template: "./index.html",
			filename: "./index.html"
		}),
	],
};
