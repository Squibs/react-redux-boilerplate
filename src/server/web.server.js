// https://github.com/manuelbieh/react-ssr-setup
// https://github.com/FortechRomania/react-redux-complete-example/blob/master/src/server/index.js
// https://medium.freecodecamp.org/how-to-build-your-own-react-boilerplate-2f8cbbeb9b3f
// https://webpack.js.org/guides/development/#using-webpack-dev-middleware
// https://medium.com/@johnstew/webpack-hmr-with-express-app-76ef42dbac17

import express from 'express';
import path from 'path';

export default class WebServer {
  constructor() {
    this.app = express();
    this.app.use(express.static(path.resolve(__dirname, '../../dist')));
  }

  start() {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(3000, () => {
          resolve();
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      try {
        this.server.close(() => {
          resolve();
        });
      } catch (e) {
        console.error(e.message);
        reject(e);
      }
    });
  }
}
