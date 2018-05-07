import express from 'express';
import cors from 'cors';
import path from 'path';
import chalk from 'chalk';
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';
import { configureStore } from '../shared/store';
import paths from '../../config/paths';

require('dotenv').config();

const app = express();

if (process.envNODE_ENV === 'development') {
  app.use(paths.publicPath, express.static(paths.clientBuild));
  app.use('/favicon.ico', (req, res) => {
    res.send('');
  });
}

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.store = configureStore();
  return next();
});

app.use(manifestHelpers({ manifestPath: `${paths.clientBuild}/manifest.json` }));

app.use((err, req, res, next) => {
  return res.status(404).json({
    satus: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' &&
      (err.stack || '')
        .split('\n').map((line) => line.trim())
        .map((line) => line.split(path.sep).join('/'))
        .map((line) => line.replace(process.cwd().split(path.sep).join('/'), '.')),
  });
});

app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toLocaleTimeString()}]`,
    chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`),
  );
});
