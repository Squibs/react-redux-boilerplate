const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV || 'production');
const paths = require('../config/paths');
const { logMessage, formatWebpackMessages } = require('./utils');

// (https://webpack.js.org/api/node/) (https://webpack.js.org/api/compiler-hooks/)
const build = async () => {
  // remove client and server builds from dist folder
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  // store
  const [clientConfig, serverConfig] = webpackConfig;
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers[0];
  const serverCompiler = multiCompiler.compilers[1];

  const compilerPromise = (compiler, whichCompiler) => (
    new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(new Error(`${err} - ${whichCompiler}`));
        }
        const messages = formatWebpackMessages(stats.toJson({}, true));

        if (messages.errors.length) {
          // only keep the first error; others are often indicative of the same problem
          if (messages.errors.length > 1) {
            messages.errors.length = 1;
          }
          return reject(new Error(`${messages.errors.join('\n\n')} - ${whichCompiler}`));
        }

        console.log(`
          \n\n-------------------
            ${whichCompiler}
          -------------------\n
          ${stats.toString({ colors: true })}
        `.replace(/ {10}/gm, ''));

        return resolve({
          stats,
          warnings: messages.warnings,
        });
      });
    })
  );

  const clientPromise = compilerPromise(clientCompiler, 'Client Compiler');
  const serverPromise = compilerPromise(serverCompiler, 'Server Compiler');

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
