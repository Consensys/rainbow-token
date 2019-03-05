// Libs
import { call, take, put, takeEvery, select, all } from 'redux-saga/effects';
import { contractCall } from '../contracts';
import { getBalance } from '../accounts';

// Utils
import {
  metamaskAccountSubscription,
  blockHeaderSubscription,
} from './utils';

// Actions
import { newBlockHeader, NEW_BLOCK_HEADER } from '../../../actions/web3/blocks';
import { startInitialization, endInitialization } from '../../../actions/setUp';
import { SUCCESSFUL_SET_UP } from '../../../actions/web3/setUp';
import { removeUserAsPlayer, setUserAsPlayer } from '../../../actions/user';
import { updateAccount, setDefaultAccount } from '../../../actions/web3/accounts';

export function* subscribeToMetamaskAccount() {
  // Create the channel
  const chan = yield call(metamaskAccountSubscription);
  while (true) {
    // Get the address from event
    const { address} = yield take(chan);
    try {
      yield put(startInitialization());
      // Remove user as player
      yield put(removeUserAsPlayer());
      // Fetch the corresponding balance
      const balance = yield call(getBalance, address);
      // Add the account
      yield put(updateAccount(address, balance));
      // Set the account as default account
      yield put(setDefaultAccount(address));
      const isPlayer = yield call(
        contractCall,
        {
          contract: 'RainbowToken',
          method: 'isPlayer',
          params: [address],
        }
      )
      if (isPlayer) {
        yield put(setUserAsPlayer());
      }
    } finally {
      yield put(endInitialization());
    }
  }
}

export function* subscribeToBlockHeader() {
  // Crete the channel
  const chan = yield call(blockHeaderSubscription);
  while (true) {
    const { type, payload } = yield take(chan);
    switch (type) {
      case 'NEW_BLOCK_HEADER':
        yield put(newBlockHeader(payload));
        break;
      case 'ERROR':
        console.error('Error: ', payload);
        chan.close();
        break;
      default:
        chan.close();
    }
  }
}

export function* reactToNewBlock() {
  yield takeEvery(
    NEW_BLOCK_HEADER,
    function*() {
      // Get the list of callbacks
      const callbacks = yield select(
        state => state.web3.subscriptions
      )
      // Launch the callbacks
      yield all(Object.values(callbacks).map(callback => call(callback)));
    }
  )
}


export function* startSubscriptions() {
  // Add the subscriptions
  const subscriptions = [
    subscribeToBlockHeader(),
    reactToNewBlock()
  ];
  // Check if the provider is MetaMask
  const { isMetaMask } = yield select(
    state => state.web3.network
  );
  if (isMetaMask)
    subscriptions.push(subscribeToMetamaskAccount())
  // Start subscriptions
  yield all(subscriptions)
}

export default function*() {
  yield takeEvery(
    SUCCESSFUL_SET_UP,
    startSubscriptions
  );
}
