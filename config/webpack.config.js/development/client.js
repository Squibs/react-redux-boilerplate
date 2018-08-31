import webpack from 'webpack';
import baseConfig from '../shared/client.base';

const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  devtool: 'cheap-module-inline-source-map', // (https://webpack.js.org/configuration/devtool/)
};

export default config;
