// process.env.API_URL = 'localhost:8000';
var webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Development'
    // }),
    new webpack.DefinePlugin({
      process:{
        env:{
          NODE_ENV: JSON.stringify('development'),
          API_URL: JSON.stringify('http://127.0.0.1:8000'),
          WWW_URL: JSON.stringify('http://127.0.0.1:8080')
        }
      }
    }),
  ],
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    inline:false,
    compress: true,
    // overlay: true,
    // https: true,
    hot: false,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
    ],
    // proxy: [{
    //   context: ['/users/**', '/team/**', '/admin/**',],
    //   target: 'dev.4ren4.com:8000', //'https://backend:8000',
    //   changeOrigin: true,
    //   secure: false,
    //   // pathRewrite: {'^/api' : ''}
    // }],
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': '*'//X-Requested-With, content-type, Authorization'
    },
  }
})
