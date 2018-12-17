import { call, all, takeLatest } from "redux-saga/effects";

/* Actions */
import {
    REQUEST_BLEND,
    SET_BLENDING_PRICE,
    START_PLAYING
} from "../../actions/transactions/rainbowToken";

/* Helpers */
import { sendTransaction } from "../web3/api";

/* Constants */
import { defaultBlendingPrice } from "../../../constants/rainbowToken";

function* watchBlend() {
    yield takeLatest(
        REQUEST_BLEND,
        ({ payload: { blendingAddress, blendingToken } }) => {
            if (blendingAddress && blendingToken) {
                return call(
                    sendTransaction,
                    [
                        "RainbowToken",
                        "blend",
                        blendingAddress,
                        blendingToken.blendingPrice,
                        blendingToken.color.r,
                        blendingToken.color.g,
                        blendingToken.color.b
                    ],
                    {
                        value: blendingToken.blendingPrice
                    }
                );
            } else {
                return call(sendTransaction, ["RainbowToken", "defaultBlend"], {
                    value: defaultBlendingPrice
                });
            }
        }
    );
}

function* watchSetBlendingPrice() {
    yield takeLatest(SET_BLENDING_PRICE, ({ payload }) =>
        call(sendTransaction, ["RainbowToken", "setBlendingPrice", payload])
    );
}

function* watchStartPlaying() {
    yield takeLatest(START_PLAYING, () =>
        call(sendTransaction, ["RainbowToken", "play"], {
            value: defaultBlendingPrice
        })
    );
}

export default function*() {
    yield all([watchBlend(), watchSetBlendingPrice(), watchStartPlaying()]);
}
