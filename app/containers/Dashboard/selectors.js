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

const makeSelectSimpleStorage = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.get('simpleStorage')
);

const makeSelectSetStorageValue = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.get('setStorageValue')
);

const makeSelectSetStorageLoading = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.get('setStorageLoading')
);

const makeSelectSetStorageError = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.get('setStorageError')
);

const makeSelectStorageValue = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.get('storageValue')
);

const makeSelectGetStorageValueLoading = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.get('getStorageValueLoading')
);

const makeSelectGetStorageValueError = () => createSelector(
  selectDashboardDomain,
  (substate) => substate.get('getStorageValueError')
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
  makeSelectSimpleStorage,

  makeSelectSetStorageValue,
  makeSelectSetStorageLoading,
  makeSelectSetStorageError,
  makeSelectStorageValue,
  makeSelectGetStorageValueLoading,
  makeSelectGetStorageValueError,
};
