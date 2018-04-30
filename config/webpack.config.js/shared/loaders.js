const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// postcss plugins
const autoprefixer = require('autoprefixer');
const precss = require('precss');


const babelLoader = { // repository babel is moving everything to (https://github.com/babel/babel)
  test: /\.jsx?$/i,
  exclude: /node_modules/i,
  use: { loader: 'babel-loader' }, // transpiles .js files (https://github.com/babel/babel-loader)
}; // setting NODE_ENV=development: use '&' (probably not needed in Webpack 4) (https://stackoverflow.com/a/33755445)

// probably not going to be used. Using styled components instead.
const cssLoaderBase = {
  test: /\.s?css$/i,
  exclude: /node_modules/i,
  use: [
    {
      loader: 'css-loader', // interprets '@import' and 'url()' like 'import/require()' and will resolve them.
      options: {
        minimize: true,
      },
    },
    {
      loader: 'postcss-loader', // adds vendor prefixes; plugins (https://github.com/postcss/postcss)
      options: {
        ident: 'postcss',
        plugins: () => [
          autoprefixer(),
          precss(),
        ],
      },
    },
    { loader: 'sass-loader' }, // compiles Sass to CSS; uses node-sass (https://github.com/sass/node-sass)
  ],
};

// probably not going to be used. Using styled components instead.
const cssLoaderClient = {
  ...cssLoaderBase,
  use: [
    // use mini-css-extract-plugin over extract-text-webpack-plugin for Webpack 4 (https://github.com/webpack-contrib/mini-css-extract-plugin)
    // purpose of extracting (https://github.com/webpack-contrib/mini-css-extract-plugin/issues/42)
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
      },
    },
    ...cssLoaderBase.use,
  ],
};

// probably not going to be used. Using styled components instead.
const cssLoaderServer = {
  ...cssLoaderBase,
  use: [
    { loader: 'style-loader' },
    ...cssLoaderBase.use,
  ],
};

const fontLoader = {
  test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
  include: /webfonts/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: 'assets/webfonts/[name].[hash:8].[ext]',
        limit: 10 * 1024,
        fallback: 'file-loader',
      },
    },
  ],
};

const imageLoader = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  exclude: /webfonts/i,
  use: [
    {
      loader: 'url-loader', // if the image is small enough: turns image into `base64` encoded URL
      options: {
        name: 'assets/img/[name].[hash:8].[ext]',
        limit: 10 * 1024,
        fallback: 'file-loader', // use in development; emit required object as file and return its public URL
      },
    },
    { loader: 'img-loader' }, // minimizes images with imagemin (https://github.com/imagemin/imagemin)
  ],
};


const client = [
  {
    oneOf: [
      babelLoader,
      cssLoaderClient,
      fontLoader,
      imageLoader,
    ],
  },
];

const server = [
  {
    oneOf: [
      babelLoader,
      cssLoaderServer,
      fontLoader,
      imageLoader,
    ],
  },
];

module.exports = {
  client,
  server,
};
