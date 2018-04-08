const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// add mini-css-extract-plugin to create separate CSS not in JS bundle
// (necessary until mini-css-extract-plugin supports HMR)
common.module.rules[1].use.unshift({ loader: MiniCssExtractPlugin.loader });

// PRODUCTION
module.exports = merge.smart(common, {
  mode: 'production',

  devtool: 'source-map', // (https://webpack.js.org/configuration/devtool/)

  optimization: { // about optimization (https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)
    splitChunks: { // CommonsChunkPlugin is now SplitChunksPlugin (https://webpack.js.org/plugins/split-chunks-plugin/)
      cacheGroups: {
        styles: {
          name: 'bundle',
          test: /\.css$/i,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  }, // blog about upgrading to v4 and optimization (https://bluebottle.idv.tw/?p=12482)

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: '~bundle-report~.html',
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }), // probably unnecessary
  ],
});
