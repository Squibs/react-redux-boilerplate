const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const env = require('../../env')();


const shared = [];


const client = [
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


const server = [
  new webpack.DefinePlugin({
    __SERVER__: 'true',
    __CLIENT__: 'false',
  }),
];


module.exports = {
  shared,
  client,
  server,
};
