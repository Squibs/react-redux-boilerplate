import React from 'react';

import smallImage from './assets/images/img-small.svg';
import largeImage from './assets/images/img-large.jpg';

const BoilerplateInfo = function () {
  return (
    <div>
      <div>
        React-Redux simple starter &nbsp;
        <img src={smallImage} className="small-image" alt="A vector drawing of a crow." />
      </div>
      <img src={largeImage} className="large-image" alt="A photograph of a crow." />
    </div>
  );
};

export default BoilerplateInfo;
