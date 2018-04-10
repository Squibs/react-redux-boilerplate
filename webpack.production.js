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

  // recordsPath: path.join(__dirname, "records.json"),

  optimization: { // options turned on by default per mode (https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)
    nodeEnv: 'production', // (https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size)
    splitChunks: { // CommonsChunkPlugin is now SplitChunksPlugin (https://webpack.js.org/plugins/split-chunks-plugin/)
      cacheGroups: {
        commons: { // splitting node modules as vendor bundle (https://survivejs.com/webpack/building/bundle-splitting/)
          test: /[\\/]node_modules[\\/]/i,
          name: 'vendor',
          chunks: 'initial',
        },
        styles: { // for mini-css-extract-plugin
          test: /\.css$/i,
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    // webpack runtime can be put into any chunk, 'runtimeChunk: name: 'manifest',' is not really needed (https://medium.com/webpack/webpack-4-changes-part-1-week-24-25-fd4d77674e55#dbe8)
    // runtimeChunk: { // (https://survivejs.com/webpack/optimizing/separating-manifest/)
    //   name: 'manifest', // plugin to split manifest into json file: (https://github.com/webdeveric/webpack-assets-manifest)
    // },
  }, // journal entry about upgrading to v4 and optimization (https://bluebottle.idv.tw/?p=12482)

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: '~bundle-report.html',
    }),
  ],
});
