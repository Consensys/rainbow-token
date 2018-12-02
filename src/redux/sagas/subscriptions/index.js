import { all } from 'redux-saga/effects';

import listenNewBlockHeader from './blockHeaderSubscription';
import updateAccountReaction from './accountSubscription';
import listenTransaction from './transactionSubscription';

export default function*() {
  yield all([
    listenNewBlockHeader(),
    updateAccountReaction(),
    listenTransaction()
  ])
}
