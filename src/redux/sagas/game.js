import { call, put, takeLatest, all, select } from 'redux-saga/effects';

import {
  setUpWeb3
} from './web3';

import {
  getUserStatus
} from './user';

import {
  getPlayers
} from './players'

import {
  INITIALIZE_GAME,
  gameInitialized
} from '../actions/game';

import {
  addError
} from '../actions/errors';

/** ******* WORKERS *********/

function *initializeGame() {
  try {
    yield call(setUpWeb3);
    const {
      onAvailableNetwork,
      metamaskUnlocked
    } = yield select(state => state.status.web3)
    if (onAvailableNetwork && metamaskUnlocked) yield call(getUserStatus);
    const { isPlayer } = yield select(state => state.status.user);
    if (isPlayer) yield call(getPlayers);
    yield put(gameInitialized());
  } catch(err) {
    yield put(addError('Unable to initialize the game.'));
  }
}

/** ******* WATCHERS *********/

function *watchInitializeGame () {
    yield takeLatest(INITIALIZE_GAME, initializeGame);
}

/** ******* SAGA *********/

function *gameSaga () {
    yield all([
      watchInitializeGame()
    ]);
}

export default gameSaga;
