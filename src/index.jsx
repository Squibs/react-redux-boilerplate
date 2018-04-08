import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import '../assets/stylesheets/index.scss';
import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.querySelector('.container'),
);

// example of dynamic import using Syntax Dynamic Import Babel plugin (see .babelrc)
async function getComponent() {
  const element = document.createElement('div');
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});

// // example of dynamic import
// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   }).catch(error => 'An error occurred while loading the component');
// }

// getComponent().then(component => {
//   document.body.appendChild(component);
// });
