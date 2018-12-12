import { takeLatest, all } from "redux-saga/effects";

/* Actions */
import { SET_BLENDING_PRICE } from "../../../actions/transactions/rainbowToken";

/* Workers */
import { setBlendingPriceSaga } from "./workers";

function* watchSetBlendingPrice() {
    yield takeLatest(SET_BLENDING_PRICE, setBlendingPriceSaga);
}

export default function*() {
    yield all([watchSetBlendingPrice()]);
}
