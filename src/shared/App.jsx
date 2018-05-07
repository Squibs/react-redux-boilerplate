import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import BoilerplateInfo from './BoilerplateInfo';

/* eslint-disable react/prefer-stateless-function */

class App extends Component {
  render() {
    return (
      <div>
        <BoilerplateInfo />
      </div>
    );
  }
}

export default hot(module)(App);
