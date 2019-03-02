// Libs
import { select, call, put, all } from 'redux-saga/effects';

// Actions
import { updateAccount } from '../../../actions/web3/accounts';

export function* getBalance(address) {
  // Get the eth object
  const { eth } = yield select(
    state => state.web3
  )
  // Fetch the balance and convert it into ether
  const balance = eth.utils.fromWei(
    yield call([eth, 'getBalance'], address),
    'ether'
  )
  return balance;
}

export function* updateAccountBalance(address) {
  // Fetch the balance
  const balance = yield call(
    getBalance,
    address
  );
  // Update in store
  yield put(updateAccount(address, balance));
}

export function* updateBalances() {
  // Get the list of addresses in accounts
  const addresses = yield select(
    state => Array.from(state.web3.accounts.list.keys())
  )
  // Update balances
  yield all(
    addresses.map(address => call(updateAccountBalance, address))
  )
}
