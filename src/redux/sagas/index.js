import { all } from 'redux-saga/effects';

import user from './user';
import players from './players';
import setUp from './setUp';
import web3Subscriptions from './web3/subscriptions';

function* mySaga () {
  yield all([
    user(),
    players(),
    setUp(),
    web3Subscriptions(),
  ]);
}

export default mySaga;
