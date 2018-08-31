import * as path from 'path';
import nodeExternals from 'webpack-node-externals';
import paths from '../../paths';
import { server as serverLoaders } from './loaders';
import resolvers from './resolvers';
import * as plugins from './plugins';

export default {
  name: 'server',
  target: 'node', // (https://webpack.js.org/configuration/target/)
  entry: {
    server: [path.resolve(__dirname, '../../../src/server/index.js')],
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
  plugins: [...plugins.shared, ...plugins.server],
  stats: { colors: true },
};
