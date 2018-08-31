import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore } from '../shared/store';
import App from '../shared/App';

const store = configureStore({
  initialState: window.__PRELOADED_STATE__,
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
