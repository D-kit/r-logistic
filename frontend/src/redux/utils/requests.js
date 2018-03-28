// @flow weak

import {FETCH} from '../constants';
import appConfig from '../../config';

export const actionTypes = (ev) => ({
  request: `${ev}_REQUEST`,
  success: `${ev}_SUCCESS`,
  fail: `${ev}_FAILURE`
});

const _fetch = (ev, rest) => ({
  type: FETCH,
  actionTypes: actionTypes(ev),
  url: appConfig.api.host + rest,
  headers: {},
  options: {}
});

export const stdGetRequest = (event, rest, headers = {}, options = {}) => ({
  fetch: {..._fetch(event, rest), method: 'get', headers, options}
});

export const stdPostRequest = (event, rest, headers = {}, options = {}) => ({
  fetch: {..._fetch(event, rest), method: 'post', headers, options}
});

export const stdPutRequest = (event, rest, headers = {}, options = {}) => ({
  fetch: {..._fetch(event, rest), method: 'put', headers, options}
});

export const stdDeleteRequest = (event, rest, headers = {}, options = {}) => ({
  fetch: {..._fetch(event, rest), method: 'delete', headers, options}
});

export const dataPutRequest = (event, rest, data = {}, headers = {}) => (
  stdPutRequest(event, rest, headers, {data})
);

export const dataPostRequest = (event, rest, data = {}, headers = {}) => (
  stdPostRequest(event, rest, headers, {data})
);
