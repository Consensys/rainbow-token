import { call, put, } from "redux-saga/effects";

/* Actions */
import {
    gameInitialized,
    startInitialization,
    endInitialization
} from "../../actions/setUp/game";
import { addError } from "../../actions/errors";

/* Helpers */
import {
  setUpWeb3
} from '../web3/workers';
import {
  setUpRainbow,
  setUserStatus,
} from './utils';

function* initializeGameSaga() {
    try {
        // Start initializing game
        yield put(startInitialization());

        // Set up the web3 instance
        const fullySet = yield call(setUpWeb3);

        if (fullySet) {
            // Set up the rainbow token contract
            yield call(setUpRainbow);

            // Set up the user status
            yield call(setUserStatus);

            // Game is initialized
            yield put(gameInitialized());
        }
    } catch (err) {
        yield put(addError("Unable to initialize the game."));
    } finally {
        // End initializing game
        yield put(endInitialization());
    }
}

export {
  initializeGameSaga
}
