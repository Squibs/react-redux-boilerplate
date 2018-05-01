const baseConfig = require('../shared/client.base');
const webpack = require('webpack');

const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  devtool: 'cheap-module-inline-source-map', // (https://webpack.js.org/configuration/devtool/)
};

module.exports = config;
