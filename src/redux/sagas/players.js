import { all } from 'redux-saga/effects';

import {
  watchGetPlayers,
  watchNewPlayer
} from '../actions/players';

function* playersSaga(){
  yield all([
    watchGetPlayers(),
    watchNewPlayer()
  ])
}

export default playersSaga;
