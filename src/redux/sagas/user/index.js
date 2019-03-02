// Libs
import { all, takeLatest } from "redux-saga/effects";

/* Actions */
import {
    REQUEST_BLEND,
    REQUEST_SET_BLENDING_PRICE,
    REQUEST_PLAY
} from "../../actions/user";

/* Workers */
import {
  blendSaga,
  setBlendingPriceSaga,
  playSaga
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

export default function*() {
    yield all([
      watchPlay(),
      watchSetBlendingPrice(),
      watchBlend(),
    ]);
}
