/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_DASHBOARD,
  INIT_DASHBOARD_SUCCESS,
  INIT_DASHBOARD_ERROR,

  SET_STORAGE_VALUE,
  SET_STORAGE_VALUE_SUCCESS,
  SET_STORAGE_VALUE_ERROR,

  GET_STORAGE_VALUE,
  GET_STORAGE_VALUE_SUCCESS,
  GET_STORAGE_VALUE_ERROR,

  ADD_NEW_EVENT,

} from './constants';

const initialState = fromJS({

  web3: null,
  simpleStorageInstance: null,

  setStorageValue: null,
  setStorageLoading: false,
  setStorageError: false,

  storageValue: null,
  getStorageValueLoading: false,
  getStorageValueError: false,

  events: [{a:'b'}],

});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_DASHBOARD:
      return state
        .set('web3', 'loading');
    case INIT_DASHBOARD_SUCCESS:
      return state
        .set('web3', action.web3)
        .set('simpleStorage', action.simpleStorage);
    case INIT_DASHBOARD_ERROR:
      return state
        .set('web3', action.error);

    case SET_STORAGE_VALUE:
      return state
        .set('setStorageValue', action.value)
        .set('setStorageLoading', true)
        .set('setStorageError', false);
    case SET_STORAGE_VALUE_SUCCESS:
      return state
        .set('setStorageLoading', false)
        .set('setStorageError', false);
    case SET_STORAGE_VALUE_ERROR:
      return state
        //.set('setStorageValue', null)
        .set('setStorageLoading', false)
        .set('setStorageError', action.error);

    case GET_STORAGE_VALUE:
      return state
        .set('getStorageValueLoading', true)
        .set('getStorageValueError', false);
    case GET_STORAGE_VALUE_SUCCESS:
      return state
        .set('storageValue', action.storageValue)
        .set('getStorageValueLoading', false)
        .set('getStorageValueError', false);
    case GET_STORAGE_VALUE_ERROR:
      return state
        .set('getStorageValue', null)
        .set('getStorageValueLoading', false)
        .set('getStorageValueError', action.error);

    case ADD_NEW_EVENT:
      return state;
        //.set('events', state.get('events').push(action.event));

    default:
      return state;
  }
}

export default dashboardReducer;
