import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import * as path from 'path';
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';
import paths from '../../config/paths';
import { configureStore } from '../shared/store';


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

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(manifestHelpers({ manifestPath: `${manifestPath}/manifest.json` }));

app.use((err, req, res, next) => {
  return res.status(404).json({
    status: 'error',
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
