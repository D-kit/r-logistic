import { routerReducer as router } from 'react-router-redux';
import { combineReducers }         from 'redux';

import routesLists from '../modules/routesLists'

export default combineReducers({ router, routesLists });
