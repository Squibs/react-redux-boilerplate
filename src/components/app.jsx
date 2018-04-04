import React, { Component } from 'react';
import smallImage from '../../assets/images/img-small.svg';
import largeImage from '../../assets/images/img-large.jpg';

/* eslint-disable react/prefer-stateless-function */

export default class App extends Component {
  render() {
    return (
      <div>
        <div>React-Redux simple starter</div>
        <img src={smallImage} className="small-image" alt="A vector drawing of a crow." />
        <img src={largeImage} className="large-image" alt="A photograph of a crow." />
      </div>
    );
  }
}
