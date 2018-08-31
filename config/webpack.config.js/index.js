import clientDev from './development/client';
import clientProd from './production/client';
import serverDev from './development/server';
import serverProd from './production/server';

export default (env = 'production') => {
  if (env === 'development' || env === 'dev') {
    process.env.NODE_ENV = 'development';
    return [clientDev, serverDev];
  }
  process.env.NODE_ENV = 'production';
  return [clientProd, serverProd];
};
