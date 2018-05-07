const baseConfig = require('../shared/server.base');
const webpack = require('webpack');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    // new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
};

module.exports = config;
