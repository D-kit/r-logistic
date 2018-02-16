// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { Link }       from 'react-router-dom';
import './home.css';

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
  };

  render() {
    return(
      <div
        className="homeInfo"
      >
        <h1
          className="mainTitle"
        >
          ReactJS 16 + Redux + Bootstrap
        </h1>
        <h2>
          with Hot Reload (<i>react-hot-loader 3.1+</i>)!!!
        </h2>
        <h2>
          and React Router v4
        </h2>
        <h2>
          and webpack 3.x
        </h2>
        <h1>
          Starter
        </h1>
        <p>
          <Link
            className="btn btn-success btn-lg"
            to={'/about'}>
            <i className="fa fa-info" />
            &nbsp;
            go to about
          </Link>
        </p>
      </div>
    );
  }
}

export default Home;
