// @flow weak

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class About extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
        <h1>
          About
        </h1>
    );
  }
}

export default About;
