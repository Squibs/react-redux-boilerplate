const webpack = require('webpack');
const path = require('path');

const HtmlWebpackTemplate = require('html-webpack-template');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const shared = [
  new CleanWebpackPlugin(
    ['dist'],
    { root: path.resolve(__dirname, '../../../') },
  ),
  new HtmlWebpackPlugin({ // list of options (https://github.com/jantimon/html-webpack-plugin#options)
    inject: false,
    template: HtmlWebpackTemplate,
    title: 'React Redux Boilerplate', // better default template for HtmlWebpackPlugin (https://github.com/jaketrent/html-webpack-template)
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    ],
    bodyHtmlSnippet: '<div class="container"></div>',
    inlineManifestWebpackName: 'webpackManifest',
  }),
  new WebpackInlineManifestPlugin(), // using a fork of inline-manifest-webpack-plugin for webpack 4 (https://github.com/szrenwei/inline-manifest-webpack-plugin/issues/10)
  new FaviconsWebpackPlugin({ // generates favicons (https://github.com/jantimon/favicons-webpack-plugin)
    logo: './assets/images/favicon.svg',
    prefix: 'assets/favicons/',
    emitStats: false,
    statsFilename: 'iconstats-[hash].json',
    persistentCache: true,
    inject: true,
    background: '#fff',
    title: 'React Redux Boilerplate',
    icons: {
      android: false,
      appleIcon: false,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      opengraph: false,
      twitter: false,
      yandex: false,
      windows: false,
    },
  }),
  new ProgressBarPlugin(),
];

const client = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[id].[hash].css',
  }),
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: 'static',
    reportFilename: '~bundle-report.html',
  }),
  new webpack.HashedModuleIdsPlugin(),
];

const server = [];

module.exports = {
  shared,
  client,
  server,
};
