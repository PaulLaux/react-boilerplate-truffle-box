import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboard state domain
 */
const selectDashboardDomain = (state) => state.get('dashboard');

/**
 * Other specific selectors
 */

const makeSelectWeb3 = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.get('web3')
);

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.toJS()
);

export default makeSelectDashboard;
export {
  selectDashboardDomain,
  makeSelectWeb3,
};
