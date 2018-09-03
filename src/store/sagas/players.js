import { all } from 'redux-saga/effects';

import {
  watchFetchingPlayers,
  watchNewPlayer
} from '../actions/players';

function* playersSaga(){
  yield all([
    watchFetchingPlayers(),
    watchNewPlayer()
  ])
}

export default playersSaga;
