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
} from './constants';

const initialState = fromJS({

  web3: null,

});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_DASHBOARD:
      return state
        .set('web3', 'loading');
    case INIT_DASHBOARD_SUCCESS:
      return state
        .set('web3', action.web3);
    case INIT_DASHBOARD_ERROR:
      return state
        .set('web3', action.error);
    default:
      return state;
  }
}

export default dashboardReducer;
