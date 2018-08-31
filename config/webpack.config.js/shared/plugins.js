import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import Visualizer from 'webpack-visualizer-plugin';
import e from '../../env';

const env = e();

export const shared = [
  new Visualizer(), // right now emits stats.html file, could try using (https://github.com/danvk/source-map-explorer) instead
];

export const client = [
  // expose variables available in project see config/env.js
  new webpack.DefinePlugin(env.stringified),
  // global variables put into process.env
  new webpack.DefinePlugin({
    __SERVER__: 'false',
    __CLIENT__: 'true',
  }),
  // generate a manifest file which contains a mapping of all asset filenames to their corresponding
  // output file so that tools can pick it up without having to parse 'index.html'.
  new ManifestPlugin({ fileName: 'asset-manifest.json' }),
];

export const server = [
  new webpack.DefinePlugin({
    __SERVER__: 'true',
    __CLIENT__: 'false',
  }),
];
