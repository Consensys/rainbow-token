import Web3 from 'web3';
import { call, put, takeLatest, all } from 'redux-saga/effects';

import {
  SET_UP_WEB3,
  setNetworkId,
  checkNetwork,
  checkUnlockingMetamask,
  setAccount,
  startLoadingWeb3,
  endLoadingWeb3,
  eventsSet,
  addContract
} from '../actions/web3';

import {
  addError
} from '../actions/errors';

import networkConfig from '../../web3/config';

/** ******* WORKERS *********/

function* contractHandler(web3Contracts, networkId) {
  const wsProvider = networkConfig.networks[networkId];
  const web3Ws = new Web3(new Web3.providers.WebsocketProvider(wsProvider));
  for (let key in networkConfig.contracts) {
    const abi = networkConfig.contracts[key].abi;
    const address = networkConfig.contracts[key].address[networkId];
    const formatter = networkConfig.contracts[key].formatter;
    const methods = new web3Contracts(abi, address).methods;
    const events = new web3Ws.eth.Contract(abi, address).events;
    const contract = formatter(methods, events);
    console.log('CONTRACT', contract);
    yield put(addContract({ key, contract }));
  }
}

function* networkHandler(net) {
  const networkId = yield call([net, 'getId']);
  const onAvailableNetwork = networkId in networkConfig.networks;
  yield put(setNetworkId(networkId));
  yield put(checkNetwork(onAvailableNetwork));
  return { networkId, onAvailableNetwork } ;
}

function* accountHandler(eth) {
  const [ address ] = yield call([eth, 'getAccounts']);
  const metamaskUnlocked = !!address;
  yield put(setAccount(address));
  yield put(checkUnlockingMetamask(metamaskUnlocked));
}

function* setUpWeb3() {
  try {
    yield put(startLoadingWeb3());
    const web3 = new Web3(Web3.givenProvider)
    const { networkId, onAvailableNetwork } = yield call(networkHandler, web3.eth.net);
    yield call(accountHandler, web3.eth)
    if (onAvailableNetwork) {
      yield call(contractHandler, web3.eth.Contract, networkId);
      yield put(eventsSet());
    }
  } catch(err) {
    yield put(addError('Unable to set up the web3 instance.'));
  } finally {
    yield put(endLoadingWeb3());
  }
}


/** ******* WATCHERS *********/

function *watchSetUpWeb3 () {
    yield takeLatest(SET_UP_WEB3, setUpWeb3);
}

/** ******* SAGA *********/

function *web3Saga () {
    yield all([
      watchSetUpWeb3()
    ]);
}

export default web3Saga;
