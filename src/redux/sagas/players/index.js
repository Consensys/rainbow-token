import { call, all, takeLatest } from "redux-saga/effects";

/* Actions */
import { SET_USER_AS_PLAYER } from "../../actions/setUp/rainbowToken";
import { NEW_RAINBOW_SET } from "../../actions/setUp/rainbowToken";

/* Helpers */
import { listenAndReactToEvent } from "../web3/api";

/* Workers */
import {
    getPlayers,
    reactToBlendingPriceSet,
    reactToTokenBlended,
    reactToPlayerCreated
} from "./workers";

function* watchUserAsPlayer() {
    yield takeLatest(SET_USER_AS_PLAYER, getPlayers);
}

function* watchListenBlendingPrice() {
    // yield takeLatest(NEW_RAINBOW_SET, listenBlendingPrice);
    yield takeLatest(NEW_RAINBOW_SET, () =>
        call(listenAndReactToEvent, [
            "RainbowToken",
            "BlendingPriceSet",
            {},
            reactToBlendingPriceSet
        ])
    );
}

function* watchListenTokenBlended() {
    yield takeLatest(NEW_RAINBOW_SET, () =>
        call(listenAndReactToEvent, [
            "RainbowToken",
            "TokenBlended",
            {},
            reactToTokenBlended
        ])
    );
}

function* watchListenPlayerCreated() {
    yield takeLatest(NEW_RAINBOW_SET, () =>
        call(listenAndReactToEvent, [
            "RainbowToken",
            "PlayerCreated",
            {},
            reactToPlayerCreated
        ])
    );
}

export default function*() {
    yield all([
        watchUserAsPlayer(),
        watchListenBlendingPrice(),
        watchListenTokenBlended(),
        watchListenPlayerCreated()
    ]);
}
