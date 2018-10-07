import { put, take } from 'redux-saga/effects';

import {
  addError
} from '../actions/errors';

import {
  startTransaction,
  endTransaction
} from '../actions/user';

export default function*(chan) {
  try {
    while (true) {
      let { type, payload } = yield take(chan);
      switch (type) {
        case 'TRANSACTION_HASH':
          yield put(startTransaction(payload));
          break;
        case 'RECEIPT':
          chan.close();
          break;
        case 'ERROR':
          yield put(addError('Transaction has failed.'));
          chan.close();
          break;
        default:
          chan.close();
      }
    }
  } finally {
    yield put(endTransaction());
  }
}
