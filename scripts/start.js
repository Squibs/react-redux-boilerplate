const webpack = require('webpack');
const nodemon = require('nodemon');
const rimraf = require('rimraf');
const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV || 'development');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const paths = require('../config/paths');
const { logMessage } = require('./utils');

const app = express();

const WEBPACK_PORT = process.env.WEBPACK_PORT || (!Number.isNaN(Number(process.env.PORT))
  ? Number(process.env.PORT) + 1 : 8501);

console.log(WEBPACK_PORT);

const start = async () => {
  // remove builds from dist/
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const [clientConfig, serverConfig] = webpackConfig;
  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];

  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

  const { publicPath } = clientConfig.output;

  clientConfig.output.publicPath = [`http://localhost:${WEBPACK_PORT}`, publicPath]
    .join('/').replace(/([^:+])\/+/g, '$1/');

  serverConfig.output.publicPath = [`http://localhost:${WEBPACK_PORT}`, publicPath]
    .join('/').replace(/([^:+])\/+/g, '$1/');

  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers[0];
  const serverCompiler = multiCompiler.compilers[1];

  // (https://webpack.js.org/api/plugins/#plugin-types)
  const compilerPromise = compiler => (
    compiler.hooks.done.tapPromise('MyPlugin', (stats) => {
      return new Promise((resolve, reject) => {
        if (!stats.hasErrors()) {
          return resolve();
        }
        return reject(new Error('Compilation failed'));
      });
    })
  );

  const clientPromise = compilerPromise(clientCompiler);
  const serverPromise = compilerPromise(serverCompiler);

  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  app.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: clientConfig.stats,
    watchOptions,
  }));

  app.use(webpackHotMiddleware(clientCompiler));

  app.use('/static', express.static(paths.clientBuild));

  app.listen(WEBPACK_PORT);

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      logMessage(error, 'error');
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      logMessage(errors[0], 'error');
      logMessage(errors[1], 'error');
      logMessage(errors[2], 'error');
    }
  });

  // wait until client and server is compiled
  try {
    await clientPromise;
    await serverPromise;
    console.log('waited!!!!!!!!!!!!!!!!!!!!!!!!!');
  } catch (error) {
    logMessage(error, 'error');
  }

  // might have actually worked??
  serverCompiler.hooks.afterEmit.tap('file-was-emitted', () => {
    const script = nodemon({
      script: `${paths.serverBuild}/server.js`,
      ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
    });

    script.on('restart', () => {
      logMessage('Server side app has been restarted.', 'warning');
    });

    script.on('quit', () => {
      logMessage('Process ended');
      process.exit();
    });

    script.on('error', () => {
      logMessage('An error occurred. Exiting', 'error');
      process.exit(1);
    });
  });
};

start();
