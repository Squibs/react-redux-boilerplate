import webpack from 'webpack';
import baseConfig from '../shared/server.base';

const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
};

export default config;
