import baseConfig from '../shared/client.base';

const config = {
  ...baseConfig,
  mode: 'production',
  devtool: 'source-map', // (https://webpack.js.org/configuration/devtool/)
};

// overwrite default filename
config.output.filename = 'bundle.[hash:8].js';

export default config;
