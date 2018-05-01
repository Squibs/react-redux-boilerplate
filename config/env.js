// all of the following comes from create-react-app (https://github.com/facebook/create-react-app/blob/v1.0.17/packages/react-scripts/config/env.js)
// (https://github.com/motdotla/dotenv/issues/126#issuecomment-342312305)

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const dotenv = require('dotenv');

// make sure that including paths.js after env.js will read .env variables
delete require.cache[require.resolve('./paths')];

// check for environment variable
// if (!process.env.NODE_ENV) {
//   throw new Error('The process.env.NODE_ENV environment variable is required but was not specified.');
// }

// other .env files (https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use) [from a Ruby gem repository]
const dotenvFiles = [
  `${paths.dotenv}.${process.env.NODE_ENV}.local`,
  `${paths.dotenv}.${process.env.NODE_ENV}`,
  // don't include '.env.local' for 'test' environment
  process.env.NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// environment specific env variables (https://github.com/motdotla/dotenv/issues/151)
// load environment variables from .env* files. Suppress warnings using the --silent flag
// if this file is missing. dotenv will not modify any env variables that have already been set.
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({
      path: dotenvFile,
    });
  }
});

// allows for resolving modules according to 'NODE_PATH' which allows for absolute paths in imports
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

module.exports = () => {
  const raw = {
    PORT: process.env.PORT || 8500,
    NODE_ENV: process.env.NODE_ENV || 'development',
  };

  // stringify values so they can be fed into Webpack.DefinePlugin()
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
};
