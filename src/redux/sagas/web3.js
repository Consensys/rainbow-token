import Web3 from 'web3';
import { call, put, takeLatest, all } from 'redux-saga/effects';

import {
  SET_UP_WEB3
} from '../actionTypes';

import {
  setWeb3,
  startLoadingWeb3,
  endLoadingWeb3
} from '../actions/web3';

import networkConfig from '../../web3/config';

/** ******* WORKERS *********/

function setUpContracts(web3Contracts, networkId) {
  const contracts = {};
  for (let key in networkConfig.contracts) {
    const abi = networkConfig.contracts[key].abi;
    const address = networkConfig.contracts[key].address[networkId];
    contracts[key] = new web3Contracts(abi, address);
  }
  return contracts;
}

function setUpContractEvents(web3Contracts, networkId) {
  const contracts = {};
  for (let key in networkConfig.contracts) {
    const abi = networkConfig.contracts[key].abi;
    const address = networkConfig.contracts[key].address[networkId];
    contracts[key] = new web3Contracts(abi, address).events;
  }
  return contracts;
}

function* setUpWeb3() {
  try {
    yield put(startLoadingWeb3());
    const web3 = new Web3(Web3.givenProvider)
    const networkId = yield call([web3.eth.net, 'getId']);
    const wsProvider = networkConfig.networks[networkId];
    const onAvailableNetwork = !!wsProvider;
    const web3Ws = new Web3(new Web3.providers.WebsocketProvider(wsProvider)) || undefined;
    const [account] = yield call([web3.eth, 'getAccounts']);
    const metamaskUnlocked = !!account;
    const contracts = setUpContracts(web3.eth.Contract, networkId) || undefined;
    const contractEvents = setUpContractEvents(web3Ws.eth.Contract, networkId) || undefined;
    yield put(setWeb3({
      onAvailableNetwork,
      metamaskUnlocked,
      account,
      contracts,
      contractEvents
    }));
  } catch(err) {
    yield put(setWeb3({ onAvailableNetwork: false }));
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
