import { takeLatest, all } from "redux-saga/effects";

/* Actions */
import { START_PLAYING } from "../../../actions/transactions/rainbowToken";

/* Workers */
import { startPlayingSaga } from "./workers";

function* watchStartPlaying() {
    yield takeLatest(START_PLAYING, startPlayingSaga);
}

export default function*() {
    yield all([watchStartPlaying()]);
}
