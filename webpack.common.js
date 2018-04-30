const path = require('path');
const HtmlWebpackTemplate = require('html-webpack-template');

// webpack plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// postcss plugins
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.jsx'),
  },

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/chunks/[id]-[name].[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  /* =================================================================
   * !!!!!!!!! REMEMBER package.json -> sideEffects property !!!!!!!!!
   * ================================================================= */
  module: {
    rules: [

      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },

      {
        test: /\.s?css$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer(),
                precss(),
              ],
            },
          },
          { loader: 'sass-loader' },
        ],
      },

      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        include: /webfonts/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'webfonts/[name].[ext]',
              limit: 10000,
              fallback: 'file-loader',
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /webfonts/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[ext]',
              limit: 10 * 1024,
              fallback: 'file-loader',
            },
          },
          { loader: 'img-loader' },
        ],
      },

    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      title: 'React Redux Boilerplate',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
      ],
      bodyHtmlSnippet: '<div class="container"></div>',
      inlineManifestWebpackName: 'webpackManifest',
    }),
    new WebpackInlineManifestPlugin(),
    new FaviconsWebpackPlugin({
      logo: './assets/images/favicon.svg',
      prefix: 'favicons/',
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
  ],
};
