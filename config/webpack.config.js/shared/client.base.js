import * as path from 'path';
import paths from '../../paths';
import { client as clientLoaders } from './loaders';
import resolvers from './resolvers';
import * as plugins from './plugins';

export default {
  name: 'client',
  target: 'web',
  entry: {
    bundle: [path.resolve(__dirname, '../../../src/client')],
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
  optimization: { // information on options, and which are enabled by default for dev and prod (https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)
    namedModules: true,
    noEmitOnErrors: true,
  },
  stats: { // default stats emitted (https://webpack.js.org/configuration/stats/#stats)
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
};
