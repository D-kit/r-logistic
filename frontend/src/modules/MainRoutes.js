// @flow weak

import React from 'react';
import {Route, Switch} from 'react-router';

import {About, Home} from './core/pages';
import {EditorRL} from './routesLists';
import {PageRL} from './routesLists';

const MainRoutes = () => {
  return (
      <Switch>
        <Route exact path="/" component={PageRL}/>
        <Route path="/about" component={About}/>
        <Route path="/rl/:id" component={EditorRL}/>
        <Route path="/rl" component={EditorRL}/>
        <Route path="/rls" component={PageRL}/>
      </Switch>
  );
};

export default MainRoutes;
