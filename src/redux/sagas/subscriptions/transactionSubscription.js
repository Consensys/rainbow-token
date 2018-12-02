import { takeEvery, select, call, put } from 'redux-saga/effects';

import {
  NEW_BLOCK_HEADER,
} from '../../actions/setUp/web3';

import {
  endTransaction
} from '../../actions/transactions/general';


function* transactionHandler() {
  try {
    const { transactions: { txHash }, network: { ethWs: eth } } = yield select(
      state => state.web3
    );
    if (txHash) {
      const receipt = yield call([eth, 'getTransactionReceipt'], txHash);
      if (receipt) yield put(endTransaction());
    }
  } catch(err) {
    console.log(err);
  }
}


export default function* () {
  yield takeEvery(NEW_BLOCK_HEADER, transactionHandler);
}
