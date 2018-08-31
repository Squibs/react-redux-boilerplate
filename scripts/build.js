import webpack from 'webpack';
import rimraf from 'rimraf';
import paths from '../config/paths';
import { logMessage, formatWebpackMessages } from './utils';
import wpConfig from '../config/webpack.config.js';

// wpConfig is a function, want to pass additional parameters to it and store result
const webpackConfig = wpConfig(process.env.NODE_ENV || 'production');

// (https://webpack.js.org/api/node/) (https://webpack.js.org/api/compiler-hooks/)
const build = async () => {
  // remove client and server builds from dist folder
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  // create multiCompiler with client and server configuration
  const [clientConfig, serverConfig] = webpackConfig;
  const multiCompiler = webpack([clientConfig, serverConfig]);

  // separate out each compiler into own variables from multiCompiler
  const clientCompiler = multiCompiler.compilers[0];
  const serverCompiler = multiCompiler.compilers[1];

  // write stats and errors to console as webpack compiles
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

        // logs messages like webpack would, with added separation
        console.log(`
          -------------------
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
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
