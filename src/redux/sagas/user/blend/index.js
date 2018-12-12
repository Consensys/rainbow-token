import { takeLatest, all } from "redux-saga/effects";

/* Actions */
import { REQUEST_BLEND } from "../../../actions/transactions/rainbowToken";

/* Workers */
import { blendSaga, defaultBlendSaga } from "./workers";

function* watchBlend() {
    yield takeLatest(
        REQUEST_BLEND,
        ({ payload: { blendingAddress, blendingToken } }) => {
            if (blendingAddress && blendingToken) {
                return blendSaga(blendingAddress, blendingToken);
            } else {
                return defaultBlendSaga();
            }
        }
    );
}

/** ******* SAGA *********/

export default function*() {
    yield all([watchBlend()]);
}
