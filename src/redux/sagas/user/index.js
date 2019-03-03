// Libs
import { all, takeLatest } from "redux-saga/effects";

/* Actions */
import {
    REQUEST_BLEND,
    REQUEST_SET_BLENDING_PRICE,
    REQUEST_PLAY,
    REQUEST_CLAIM_VICTORY,
} from "../../actions/user";

/* Workers */
import {
  blendSaga,
  setBlendingPriceSaga,
  playSaga,
  claimVictorySaga,
} from './workers'

function* watchPlay() {
    yield takeLatest(REQUEST_PLAY, playSaga)
}

function* watchSetBlendingPrice() {
    yield takeLatest(REQUEST_SET_BLENDING_PRICE, setBlendingPriceSaga);
}

function* watchBlend() {
    yield takeLatest(REQUEST_BLEND, blendSaga);
}

function* watchClaimVictory() {
    yield takeLatest(REQUEST_CLAIM_VICTORY, claimVictorySaga);
}

export default function*() {
    yield all([
      watchPlay(),
      watchSetBlendingPrice(),
      watchBlend(),
      watchClaimVictory()
    ]);
}
