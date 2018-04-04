import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import smallImage from '../../assets/images/img-small.svg';
import largeImage from '../../assets/images/img-large.jpg';

/* eslint-disable react/prefer-stateless-function */

class App extends Component {
  render() {
    return (
      <div>
        <div>
          React-Redux simple starter &nbsp;
          <img src={smallImage} className="small-image" alt="A vector drawing of a crow." />
        </div>
        <img src={largeImage} className="large-image" alt="A photograph of a crow." />
      </div>
    );
  }
}

export default hot(module)(App);
