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
} from './constants';

/**
 * Initiate init process
 *
 * @param  {string} blockNumber The current block number
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
export function initDashboardSuccess(web3) {
  return {
    type: INIT_DASHBOARD_SUCCESS,
    web3,
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