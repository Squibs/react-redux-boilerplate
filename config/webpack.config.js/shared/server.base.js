const path = require('path');
const nodeExternals = require('webpack-node-externals');

const paths = require('../../paths');
const { server: serverLoaders } = require('./loaders');
const resolvers = require('./resolvers');
const plugins = require('./plugins');

module.exports = {
  name: 'server',
  target: 'node', // (https://webpack.js.org/configuration/target/)
  entry: {
    server: ['@babel/polyfill', path.resolve(__dirname, '../../../src/server/index.js')],
  },
  externals: [ // don't bundle node_modules on backend (https://github.com/liady/webpack-node-externals)
    nodeExternals({
      // allow css files from 3rd party packages
      whitelist: /\.css$/,
    }),
  ],
  output: {
    filename: 'server.js',
    path: paths.serverBuild,
    publicPath: paths.publicPath,
  },
  resolve: { ...resolvers },
  module: { rules: serverLoaders },
  plugins: [
    ...plugins.shared,
    ...plugins.server,
  ],
  stats: { colors: true },
};
