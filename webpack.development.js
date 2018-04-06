const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

// add style-loader for HMR (necessary until mini-css-extract-plugin supports HMR)
common.module.rules[1].use.unshift({ loader: 'style-loader' });

// DEVELOPMENT
module.exports = merge.smart(common, {
  mode: 'development',

  devtool: 'inline-source-map', // (https://webpack.js.org/configuration/devtool/)

  devServer: {
    contentBase: './dist', // (https://stackoverflow.com/questions/49290082/setting-up-react-on-the-front-end-and-express-js-as-a-server-with-webpack-4)
    historyApiFallback: true, // more info (https://github.com/bripkens/connect-history-api-fallback)
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    open: false,
    overlay: true,
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }), // probably unnecessary
  ],
});
