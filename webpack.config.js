const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
  mode: 'production',

  entry: {
    app: './src/index.jsx',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
          { loader: 'css-loader' }, // interprets '@import' and 'url()' like 'import/require()' and will resolve them.
          {
            loader: 'postcss-loader', // adds vendor prefixes; plugins (https://github.com/postcss/postcss)
            options: {
              importLoaders: 2,
            },
          },
          { loader: 'sass-loader' }, // compiles Sass to CSS; uses node-sass (https://github.com/sass/node-sass)
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
  ],
};
