import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { INIT_DASHBOARD } from './constants';
import { initDashboardSuccess, initDashboardError } from './actions';

import Web3 from 'web3';

/**
 * Init Dashboard
 */
function* initDashboardAsync() {
  try {
    console.log('initDashboardAsync');

    let web3js
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3js = new Web3(web3.currentProvider);
    } else {
      console.log('No web3 injected (Mist/Metamask...), Using local fallback');
      web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
    console.log(web3js);

    const netId = yield call(web3js.eth.net.getId);
    console.log(`netid: ${netId}`);
    switch (netId) {
      case 1:
        console.log('This is mainnet')
        break
      case 2:
        console.log('This is the deprecated Morden test network.')
        break
      case 3:
        console.log('This is the ropsten test network.')
        break
      case 4:
        console.log('This is the Rinkeby test network.')
        break
      case 42:
        console.log('This is the Kovan test network.')
        break
      default:
        console.log('This is an unknown network.')
    }



    yield put(initDashboardSuccess(web3js));
  }
  catch (err) {
    yield put(initDashboardError(err.toString()));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(INIT_DASHBOARD, initDashboardAsync);
}
