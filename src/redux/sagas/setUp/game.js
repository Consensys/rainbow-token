import { call, put, all, takeLatest } from 'redux-saga/effects';

import setUpWeb3 from './web3';
import { setUpRainbow, setUserStatus } from './rainbowToken';

import {
  INITIALIZE_GAME,
  gameInitialized,
  startInitialization,
  endInitialization
} from '../../actions/setUp/game';

import {
  addError
} from '../../actions/errors';

/** ******* WORKERS *********/

function *initializeGame() {
  try {
    // Start initializing game
    yield put(startInitialization());

    // Set up the web3 instance
    const fullySet = yield call(setUpWeb3);

    if (fullySet) {
      // Set up the rainbow token contract
      yield call(setUpRainbow);

      // Set up the user status
      yield call(setUserStatus)

      // Game is initialized
      yield put(gameInitialized());
    }
  } catch(err) {
    yield put(addError('Unable to initialize the game.'));
  } finally {
    // End initializing game
    yield put(endInitialization());
  }
}

/** ******* WATCHERS *********/

function *watchInitializeGame() {
  yield takeLatest(INITIALIZE_GAME, initializeGame);
}

/** ******* SAGA *********/

export default function* () {
    yield all([
      watchInitializeGame()
    ]);
}
