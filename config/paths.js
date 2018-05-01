const path = require('path');
const fs = require('fs');

// current working directory (process.cwd())
const appDirectory = fs.realpathSync(process.cwd());
// resolve paths from root
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  clientBuild: resolveApp('dist/client'),
  serverBuild: resolveApp('dist/server'),
  dotenv: resolveApp('.env'),
  src: resolveApp('src'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
  srcShared: resolveApp('src/shared'),
  publicPath: '/static/',
};

// what directories should be searched in when resolving modules (ltr)
paths.resolveModules = [
  paths.srcClient,
  paths.srcServer,
  paths.srcShared,
  paths.src,
  'node_modules',
];

module.exports = paths;
