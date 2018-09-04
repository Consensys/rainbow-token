import { all } from 'redux-saga/effects';

import {
  watchGetUser,
  watchRequestPlaying,
  watchRequestBlendingWithSelf,
  watchRequestBlendingWithOthers
} from '../actions/user';

function* userSaga(){
  yield all([
    watchGetUser(),
    watchRequestPlaying(),
    watchRequestAutoBlend(),
    watchRequestBlend()
  ])
}

export default userSaga;
