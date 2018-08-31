/* =========================================
    BABEL LOADER
    files: .js, .jsx
   ========================================= */
const babelLoader = { // the repository babel is moving everything to (https://github.com/babel/babel)
  test: /\.jsx?$/i,
  exclude: /node_modules/i,
  use: { loader: 'babel-loader' }, // transpiles .js files (https://github.com/babel/babel-loader)
};


/* =========================================
    FONT LOADER
    files: .woff, .woff2, .ttf, .eot, .svg
    only in webfonts folder
   ========================================= */
const fontLoaderClient = {
  test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
  include: /webfonts/i,
  loader: 'url-loader',
  options: {
    name: 'assets/webfonts/[name].[hash:8].[ext]',
    limit: 10 * 1024,
    fallback: 'file-loader',
  },
};

// don't emit files for server
const fontLoaderServer = fontLoaderClient;
fontLoaderServer.options.emitFile = false;


/* =========================================
    IMAGE LOADER
    files: .png, .jpg, .jpeg, .gif, .svg
    ignores webfonts folder (due to .svg)
   ========================================= */
const imageLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
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

// don't emit files for server
const imageLoaderServer = imageLoaderClient;
imageLoaderServer.use[0].options.emitFile = false;


/* ====================================
    FILE LOADER
    handles all other files
   ==================================== */
const fileLoaderClient = {
  exclude: [/\.(jsx?|css|mjs|html|json)$/i],
  loader: 'file-loader',
  options: {
    name: 'assets/[name].[hash:8].[ext]',
  },
};

// don't emit files for server
const fileLoaderServer = fileLoaderClient;
fileLoaderServer.options.emitFile = false;


// oneOf: first matching Rule is used when the Rule matches.
export const client = [
  {
    oneOf: [
      babelLoader,
      fontLoaderClient,
      imageLoaderClient,
      fileLoaderClient,
    ],
  },
];

export const server = [
  {
    oneOf: [
      babelLoader,
      fontLoaderServer,
      imageLoaderServer,
      fileLoaderServer,
    ],
  },
];


/* eslint-disable max-len */
/* ====================================
   Switched to using styled-components.
   Leaving scss/css loaders for posterity.
   ==================================== */
// const cssLoaderBase = {
//   test: /\.s?css$/i,
//   exclude: /node_modules/i,
//   use: [
//     {
//       loader: 'css-loader', // interprets '@import' and 'url()' like 'import/require()' and will resolve them.
//       options: {
//         minimize: true,
//       },
//     },
//     {
//       loader: 'postcss-loader', // adds vendor prefixes; plugins (https://github.com/postcss/postcss)
//       options: {
//         ident: 'postcss',
//         plugins: () => [
//           autoprefixer(),
//           precss(),
//         ],
//       },
//     },
//     { loader: 'sass-loader' }, // compiles Sass to CSS; uses node-sass (https://github.com/sass/node-sass)
//   ],
// };

// const cssLoaderClient = {
//   ...cssLoaderBase,
//   use: [
//     // use mini-css-extract-plugin over extract-text-webpack-plugin for Webpack 4 (https://github.com/webpack-contrib/mini-css-extract-plugin)
//     // purpose of extracting (https://github.com/webpack-contrib/mini-css-extract-plugin/issues/42)
//     {
//       loader: MiniCssExtractPlugin.loader,
//       options: {
//         publicPath: '../',
//       },
//     },
//     ...cssLoaderBase.use,
//   ],
// };

// use style-loader over mini-css-extract-plugin in development for HMR
// (necessary until mini-css-extract-plugin supports HMR)
// const cssLoaderServer = {
//   ...cssLoaderBase,
//   use: [
//     { loader: 'style-loader' },
//     ...cssLoaderBase.use,
//   ],
// };
