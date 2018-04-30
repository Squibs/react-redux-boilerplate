const path = require('path');
const paths = require('../../paths');
const { client: clientLoaders } = require('./loaders');
const resolvers = require('./resolvers');
const plugins = require('./plugins');

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    bundle: path.resolve(__dirname, '../../../src/client/index.jsx'),
  },
  output: {
    filename: 'bundle.js',
    /* It's possible to slice hash and chunkhash using specific syntax: [chunkhash:4].
       Instead of a hash like 8c4cbfdb91ff93f3f3c5 this would yield 8c4c. */
    chunkFilename: '[name].[chunkhash:8].chunk.js', // code splitting (https://webpack.js.org/guides/code-splitting/)
    path: paths.clientBuild,
    publicPath: paths.publicPath,
  },
  module: {
    rules: clientLoaders,
  },
  resolve: { ...resolvers },
  plugins: [...plugins.shared, ...plugins.client],
};
