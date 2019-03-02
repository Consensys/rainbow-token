// Libs
import { call, put } from 'redux-saga/effects';

// Actions
import {
  startLoadingWeb3,
  endLoadingWeb3,
  successfulSetUp,
} from '../../../actions/web3/setUp';
import {
  subscribe
} from '../../../actions/web3/subscriptions';

// Utils
import {
  handleProvider,
  handleAccount,
  handleContract,
} from './utils';

// Subscriptions
import {
  updateBalances
} from '../accounts';
import {
  clearTransactions
} from '../transactions';

export function* setUpWeb3(provider = undefined) {
  try {
    yield put(startLoadingWeb3());
    // Handle provider
    // Set eth, utils and network id
    // If provider is MetaMask, ask for permission
    yield call(handleProvider, provider);
    // Handle account initialization
    // Set address and balance
    yield call(handleAccount);
    // Look for contracts in the configs
    // Set contracts in the store
    yield call(handleContract);
    // Subscribe to balances
    yield put(subscribe('balances', updateBalances));
    // Subscribe to cleaning of old transactions
    yield put(subscribe('clearTransactions', clearTransactions));
    // Set the set up as successful
    yield put(successfulSetUp());
  } finally {
    yield put(endLoadingWeb3());
  }
}
