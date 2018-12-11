import { all, takeLatest } from "redux-saga/effects";

/* Actions */
import { INITIALIZE_GAME } from "../../actions/setUp/game";

/* Workers */
import { initializeGameSaga } from "./workers";

function* watchInitializeGame() {
    yield takeLatest(INITIALIZE_GAME, initializeGameSaga);
}

/** ******* SAGA *********/

export default function*() {
    yield all([watchInitializeGame()]);
}
