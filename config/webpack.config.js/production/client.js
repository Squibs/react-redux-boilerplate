const baseConfig = require('../shared/client');

const config = {
  ...baseConfig,
  mode: 'production',
  devtool: 'source-map',
  optimization: { // options turned on by default per mode (https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)
    nodeEnv: 'production', // (https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size)
    splitChunks: { // CommonsChunkPlugin is now SplitChunksPlugin (https://webpack.js.org/plugins/split-chunks-plugin/)
      chunks: 'all',
      cacheGroups: { // 'vendors' cache group not really needed, default options for splitChunks takes care of it (https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693)
        // splitting node modules as vendor bundle (https://survivejs.com/webpack/building/bundle-splitting/)
        styles: { // for mini-css-extract-plugin
          test: /\.css$/i,
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    // "webpack runtime can be put into any chunk, in many cases no need for a manifest chunk
    // anymore, you can put the runtime into the app chunk and keep the vendor chunk cached"
    // (https://medium.com/webpack/webpack-4-changes-part-1-week-24-25-fd4d77674e55#dbe8)
    runtimeChunk: { // (https://survivejs.com/webpack/optimizing/separating-manifest/)
      name: 'manifest', // plugin to generate manifest.json file: (https://github.com/danethurber/webpack-manifest-plugin)
    }, // issue with runtimeChunk emission (https://github.com/webpack/webpack/issues/6598)
  }, // journal entry about upgrading to v4 and optimization (https://bluebottle.idv.tw/?p=12482)
};

config.output.filename = 'bundle.[hash:8].js';

module.exports = config;
