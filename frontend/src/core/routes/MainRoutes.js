// @flow weak

import React            from 'react';
import {Route, Switch}  from 'react-router';
import {About, Home}    from '../pages';

const MainRoutes = () => {
  return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
  );
};

export default MainRoutes;
