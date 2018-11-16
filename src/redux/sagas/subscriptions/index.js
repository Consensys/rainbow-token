import { all } from 'redux-saga/effects';

import listenNewBlockHeader from './blockHeaderSubscription';
import updateAccountReaction from './accountSubscription';

export default function*() {
  yield all([
    listenNewBlockHeader(),
    updateAccountReaction()
  ])
}
