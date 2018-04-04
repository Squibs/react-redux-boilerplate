const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',

  entry: {
    app: './src/index.jsx',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [

      // (https://github.com/babel/babel)
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // (https://github.com/babel/babel-loader)
          options: {
            babelrc: false,
            presets: [ // presets run rtl
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react',
            ],
          },
        },
      },

      {
        test: /\.s?css$/i,
        use: [
          // use mini-css-extract-plugin over extract-text-webpack-plugin for Webpack 4 (https://github.com/webpack-contrib/mini-css-extract-plugin)
          { loader: 'style-loader' }, // adds CSS to the DOM by injecting a '<style>' tag.
          {
            loader: 'css-loader', // interprets '@import' and 'url()' like 'import/require()' and will resolve them.
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          { loader: 'postcss-loader' }, // adds vendor prefixes; plugins (https://github.com/postcss/postcss)
          { loader: 'sass-loader' }, // compiles Sass to CSS; uses node-sass (https://github.com/sass/node-sass)
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
            loader: 'url-loader', // if the image is small enough: turns image into `base64` encoded URL
            options: {
              name: 'img/[name].[ext]',
              limit: 10000,
              fallback: 'file-loader', // use in development; emit required object as file and return its public URL
            },
          },
          { loader: 'img-loader' }, // minimizes images with imagemin (https://github.com/imagemin/imagemin)
        ],
      },

    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ // list of options (https://github.com/jantimon/html-webpack-plugin#options)
      inject: false,
      template: HtmlWebpackTemplate, // better default template for HtmlWebpackPlugin (https://github.com/jaketrent/html-webpack-template)
      title: 'React Redux Boilerplate',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
      ],
      bodyHtmlSnippet: '<div class="container"></div>',
    }),
    new ProgressBarPlugin(),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ],
};
