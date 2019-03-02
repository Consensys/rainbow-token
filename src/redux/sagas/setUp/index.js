// Libs
import { all, takeLatest } from "redux-saga/effects";

/* Actions */
import {
  INITIALIZE
} from "../../actions/setUp";

/* Workers */
import {
  initializeSaga
} from './workers'

function* watchInitialize() {
    yield takeLatest(INITIALIZE, initializeSaga)
}

export default function*() {
    yield all([
      watchInitialize(),
    ]);
}
