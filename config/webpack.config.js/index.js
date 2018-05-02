const clientDev = require('./development/client');
const clientProd = require('./production/client');
const serverDev = require('./development/server');
const serverProd = require('./production/server');

module.exports = (env = 'production') => {
  if (env === 'development' || env === 'dev') {
    process.env.NODE_ENV = 'development';
    return [clientDev, serverDev];
  }
  process.env.NODE_ENV = 'production';
  return [clientProd, serverProd];
};
