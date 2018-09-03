import { all } from 'redux-saga/effects';

import {
  watchFetchingUser,
  watchRequestPlaying,
  watchRequestBlendingWithSelf,
  watchRequestBlendingWithOthers
} from '../actions/user';

function* userSaga(){
  yield all([
    watchFetchingUser(),
    watchRequestPlaying(),
    watchRequestBlendingWithSelf(),
    watchRequestBlendingWithOthers()
  ])
}

export default userSaga;
