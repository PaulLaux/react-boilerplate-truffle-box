import { channel } from 'redux-saga';
import { take, call, put, select, takeLatest, fork } from 'redux-saga/effects';

import { INIT_DASHBOARD, SET_STORAGE_VALUE, GET_STORAGE_VALUE, ADD_NEW_EVENT } from './constants';
import {
  initDashboardSuccess,
  initDashboardError,
  setStorageValueSuccess,
  setStorageValueError,
  getStorageValueSuccess,
  getStorageValueError,
  addNewEvent,
} from './actions';
import { makeSelectWeb3, makeSelectSimpleStorage } from './selectors';

import SimpleStorageContract from '../../../truffle/build/contracts/SimpleStorage.json'
import contract from 'truffle-contract';
import Web3 from 'web3';

export const timer = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve('timer end'), ms));


const eventChannel = channel()


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


    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(web3js.currentProvider)

    // dirty hack for web3@1.0.0 support for localhost testrpc, 
    // see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
    if (typeof simpleStorage.currentProvider.sendAsync !== "function") {
      simpleStorage.currentProvider.sendAsync = function () {
        return simpleStorage.currentProvider.send.apply(
          simpleStorage.currentProvider,
          arguments
        );
      };
    }

    const simpleStorageInstance = yield call(simpleStorage.deployed);

    console.log('Events:');


    //web3@1.0 version of events: requires websocket rpc client
    // const simpleStorageInstance = yield call(simpleStorage.deployed);
    // const simpleStorageAddress = simpleStorageInstance.address;
    // const simpleStorageAbi = SimpleStorageContract.abi;
    // console.log(simpleStorageAddress);
    // console.log(simpleStorageAbi);

    // const simpleStorageContract = new web3js.eth.Contract(simpleStorageAbi, simpleStorageAddress);     
    // simpleStorageContract.events.allEvents({
    //   fromBlock: 0
    // }, function (error, event) { console.log(event); })
    //   .on('data', function (event) {
    //     console.log(event); // same results as the optional callback above
    //   })
    //   .on('changed', function (event) {
    //     console.log(event); 
    //     // remove event from local database
    //   })
    //   .on('error', console.error);


    //events using truffle
    yield fork(handleEvents);
    simpleStorageInstance.contract.Set(null, (_, evt) => {
      eventChannel.put({
        type: ADD_NEW_EVENT,
        evt,
      })
    });

    // events.watch(function (error, result) {
    //   if (error) {
    //     console.log("Error");
    //   }
    //   else {
    //     console.log('got event(all events):');
    //     console.log(result);
    //     /*console.log(result.event + ": ");
    //     for(key in result.args) {
    //       if(result.event in displayFunctions && key in displayFunctions[result.event]) {
    //         console.log("- " + key + ": " + displayFunctions[result.event][key].call(this, result.args[key]));
    //       }
    //       else {
    //         console.log("- " + key + ": " + result.args[key]);
    //       }
    //     }*/
    //   }
    // });

    yield put(initDashboardSuccess(web3js, simpleStorage));
  }
  catch (err) {
    console.log(err);

    yield put(initDashboardError(err.toString()));
  }
}

function* handleEvents() {
  while (true) {
    const event = yield take(eventChannel);
    console.log(event);
  }
}


/**
 * setStorageValue
 */
function* setStorageValueAsync(action) {
  try {
    const selectWeb3 = yield select(makeSelectWeb3());
    const accounts = yield call(selectWeb3.eth.getAccounts);

    const simpleStorage = yield select(makeSelectSimpleStorage());

    const simpleStorageInstance = yield call(simpleStorage.deployed);

    // promise will resolve only when transaction is mined
    const setValueResult = yield call(simpleStorageInstance.set, action.value, { from: accounts[0] });
    console.log('setValueResult:');
    //console.log(setValueResult);

    if (setValueResult.receipt.logs.length > 0) { //receipt includes value from logs
      yield put(setStorageValueSuccess());
    } else {
      yield put(setStorageValueError('contract not found on network'));
    }

  }
  catch (err) {
    yield put(setStorageValueError(err.toString()));
  }
}

/**
 * getStorageValue
 */
function* getStorageValueAsync() {
  try {
    const simpleStorage = yield select(makeSelectSimpleStorage());

    const simpleStorageInstance = yield call(simpleStorage.deployed);
    const setValueResult = yield call(simpleStorageInstance.get.call);

    yield put(getStorageValueSuccess(setValueResult.toNumber()));
  }
  catch (err) {
    yield put(getStorageValueError(err.toString()));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(INIT_DASHBOARD, initDashboardAsync);

  yield takeLatest(SET_STORAGE_VALUE, setStorageValueAsync);
  yield takeLatest(GET_STORAGE_VALUE, getStorageValueAsync);
}
