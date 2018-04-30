const path = require('path');
const paths = require('../../paths');
const resolvers = require('./resolvers');
const { server: serverLoaders } = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  name: 'server',
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../../../src/server/index.js'),
  },
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: paths.publicPath,
  },
  resolve: { ...resolvers },
  module: {
    rules: serverLoaders,
  },
  plugins: [...plugins.shared, ...plugins.server],
};
