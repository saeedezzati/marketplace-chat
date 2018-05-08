// process.env.API_URL = 'localhost:8000';
var webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		// new HtmlWebpackPlugin({
		//   title: 'Production'
		// }),
		new webpack.DefinePlugin({
			process:{
				env:{
				NODE_ENV: JSON.stringify('production'),
				// API_URL: JSON.stringify('http://api.beomni.com'),
				// WWW_URL: JSON.stringify('http://beomni.com')          
				}
			}
		}),
		new webpack.HashedModuleIdsPlugin(),
	],
	optimization: {
		minimize: true,
	},
	devtool: 'hidden-source-map'
})

