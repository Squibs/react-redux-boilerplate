const chalk = require('chalk');

const logMessage = (message, level = 'info') => {
  const color = dangerLevel => ({
    error: 'red',
    warning: 'yellow',
    info: 'white',
  })[dangerLevel];

  console.log(`[${new Date().toLocaleTimeString()}]`, chalk[color(level)](message));
};

logMessage('hi', 'error');

const compilerPromise = compiler => (
  compiler.hooks.done.tapPromise('done', (stats) => {
    Promise((resolve, reject) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(new Error('Compilation failed'));
    });
  })

  // new Promise((resolve, reject) => {
  //   compiler.plugin('done', (stats) => {
  //     if (!stats.hasErrors()) {
  //       return resolve();
  //     }
  //     return reject(new Error('Compilation failed'));
  //   });
  // })
);

module.exports = {
  logMessage,
  compilerPromise,
};
