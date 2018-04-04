const path = require('path');

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
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react',
            ],
          },
        },
      },

    ],
  },
};
