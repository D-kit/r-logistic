// @flow weak

import {actionTypes, dataPostRequest, dataPutRequest, stdGetRequest} from '../utils/requests';

// /////////////////////
// constants
// /////////////////////

const ROUTELIST_SAVE = 'ROUTELIST_SAVE';
const rl_save = actionTypes(ROUTELIST_SAVE);

const ROUTELIST_FETCH = 'ROUTELIST_FETCH';
const rl_fetch = actionTypes(ROUTELIST_FETCH);

const ROUTELIST_PAGE_FETCH = 'ROUTELIST_PAGE_FETCH';
const rl_page_fetch = actionTypes(ROUTELIST_PAGE_FETCH);


// /////////////////////
// reducer
// /////////////////////

const initialState = {
  active: {},
  entities: {
    content: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case rl_save.success:
    case rl_fetch.success:
      return {
        ...state,
        active: action.payload.data
      };
    case rl_page_fetch.success:
      return {
        ...state,
        entities: action.payload.data
      };
    default:
      return state;
  }
}

// /////////////////////
// action creators
// /////////////////////

export const saveRL = (data) => (dataPostRequest(ROUTELIST_SAVE, '/routelist', data));
export const updateRL = (data) => (dataPutRequest(ROUTELIST_SAVE, `/routelist/${data.id}`, data));
export const fetchRL = (id) => (stdGetRequest(ROUTELIST_FETCH, `/routelist/${id}`));
export const fetchPageRL = () => (stdGetRequest(ROUTELIST_PAGE_FETCH, '/routelist/page'));
