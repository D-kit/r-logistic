// @flow

import React from 'react';

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import configureStore, {history} from './redux/store/configureStore';
import MainRoutes from './core/routes/MainRoutes';

class Root extends React.Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Provider store={configureStore()}>
            <ConnectedRouter history={history}>
              <MainRoutes />
            </ConnectedRouter>
          </Provider>
        </MuiThemeProvider>
    );
  }
}
export default Root;
