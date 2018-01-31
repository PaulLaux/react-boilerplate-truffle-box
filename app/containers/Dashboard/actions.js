/*
 *
 * Dashboard actions
 *
 */

import {
  // DEFAULT_ACTION,
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

/**
 * Initiate init process
 *
 *
 * @return {object} An action object with a type of INIT_DASHBOARD passing the repos
 */
export function initDashboard() {
  return {
    type: INIT_DASHBOARD,
  };
}

/**
 * Init process compleated successfully
 *
 * @param  {object} web3 
 *
 * @return {object} An action object with a type of INIT_DASHBOARD_SUCCESS and web3
 */
export function initDashboardSuccess(web3,simpleStorage) {  
  return {
    type: INIT_DASHBOARD_SUCCESS,
    web3,
    simpleStorage,
  };
}

/**
 * Init process compleated successfully
 *
 * @param  {string} error 
 *
 * @return {object} An action object with a type of INIT_DASHBOARD_ERROR and error string
 */
export function initDashboardError(error) {
  console.log(error);

  return {
    type: INIT_DASHBOARD_ERROR,
    error,
  };
}


/**
 * Set storage value
 *
 * @param  {number} value 
 *
 * @return {object} An action object with a type of SET_STORAGE_VALUE
 */
export function setStorageValue(value) {
  return {
    type: SET_STORAGE_VALUE,
    value,
  };
}

/**
 * setStorageValue success
 *
 * @return {object} An action object with a type of SET_STORAGE_VALUE_SUCCESS
 */
export function setStorageValueSuccess() {
  return {
    type: SET_STORAGE_VALUE_SUCCESS,
  };
}

/**
 * setStorageValue failed
 *
 * @param  {string} error 
 *
 * @return {object} An action object with a type of SET_STORAGE_VALUE_ERROR and error string
 */
export function setStorageValueError(error) {
  console.log(error);
  return {
    type: SET_STORAGE_VALUE_ERROR,
    error,
  };
}

/**
 * Get storage value
 *
 * @return {object} An action object with a type of GET_STORAGE_VALUE
 */
export function getStorageValue() {
  console.log('getStorageValue()');
  
  return {
    type: GET_STORAGE_VALUE,
  };
}

/**
 * setStorageValue success
 * @param  {number} storageValue 
 * 
 * @return {object} An action object with a type of SET_STORAGE_VALUE_SUCCESS
 */
export function getStorageValueSuccess(storageValue) {
  return {
    type: GET_STORAGE_VALUE_SUCCESS,
    storageValue,
  };
}

/**
 * setStorageValue failed
 *
 * @param  {string} error 
 *
 * @return {object} An action object with a type of GET_STORAGE_VALUE_ERROR and error string
 */
export function getStorageValueError(error) {
  console.log(error);
  return {
    type: GET_STORAGE_VALUE_ERROR,
    error,
  };
}

/**
 * store the new event
 * 
 * @param  {object} event
 * 
 * @return {object} An action object with a type of NEW_EVENT an the new event object
 */
export function addNewEvent(event) {
  //console.log('new called:');
  //console.log(event);
  
  return {
    type: ADD_NEW_EVENT,
    event
  };
}
