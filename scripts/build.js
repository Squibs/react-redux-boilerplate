const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV || 'production');
const { logMessage, compilerPromise } = require('./utils');

const build = async () => {
  const [clientConfig, serverConfig] = webpackConfig;
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers[0];
  const serverCompiler = multiCompiler.compilers[1];

  const clientPromise = compilerPromise(clientCompiler);
  const serverPromise = compilerPromise(serverCompiler);

  function watchCompiler(compiler) {
    compiler.watch({}, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(clientConfig.stats));
      }
    });
  }

  watchCompiler(clientCompiler);
  watchCompiler(serverCompiler);

  // wait until the client and server are compiled
  try {
    await serverPromise;
    await clientPromise;
    logMessage('Done!', 'info');
    process.exit();
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
