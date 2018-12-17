import { call, put, all, take, select, takeLatest } from "redux-saga/effects";
import generator from "mnemonic-generator";

/* Actions */
import {
    startLoadingPlayers,
    endLoadingPlayers,
    setPlayers,
    addPlayer,
    updatePlayerToken
} from "../actions/players";
import { addError } from "../actions/errors";
import {
    setUserAsPlayer,
    SET_USER_AS_PLAYER
} from "../actions/setUp/rainbowToken";
import { NEW_RAINBOW_SET } from "../actions/setUp/rainbowToken";

/* Helpers */
import { computeScore, color, computeToken } from "../../utils";
import { callContract, listenAndReactToEvent } from "./web3/api";

/* Constants */
import { targetColor } from "../../constants/rainbowToken";

/** ******* WORKERS *********/

export function* getPlayers() {
    try {
        yield put(startLoadingPlayers());
        const { players } = yield select(state => state.data);
        const playerAddresses = yield call(callContract, [
            "RainbowToken",
            "getPlayers"
        ]);
        const tokens = (yield all(
            playerAddresses
                .filter(address => !(address in players))
                .map(address =>
                    call(callContract, ["RainbowToken", "getToken", address])
                )
        )).map(computeToken);
        for (let i = 0; i < playerAddresses.length; i++) {
            players[playerAddresses[i].toLowerCase()] = {
                address: playerAddresses[i].toLowerCase(),
                pseudo: generator(playerAddresses[i].toLowerCase()),
                token: tokens[i],
                score: computeScore(tokens[i].color, targetColor)
            };
        }
        yield put(setPlayers(players));
    } catch (err) {
        console.log(err);
        yield put(addError("Unable to retrieve the players."));
    } finally {
        yield put(endLoadingPlayers());
    }
}

/** ******* WATCHERS *********/

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
            function*({ player, price }) {
                yield put(
                    updatePlayerToken(player.toLowerCase(), undefined, price)
                );
            }
        ])
    );
}

function* watchListenTokenBlended() {
    yield takeLatest(NEW_RAINBOW_SET, () =>
        call(listenAndReactToEvent, [
            "RainbowToken",
            "TokenBlended",
            {},
            function*({ player, r, g, b }) {
                yield put(
                    updatePlayerToken(player.toLowerCase(), color([r, g, b]))
                );
            }
        ])
    );
}

function* watchListenPlayerCreated() {
    yield takeLatest(NEW_RAINBOW_SET, () =>
        call(listenAndReactToEvent, [
            "RainbowToken",
            "PlayerCreated",
            {},
            function*({ player, r, g, b, blendingPrice }) {
                const token = {
                    blendingPrice,
                    color: { r, g, b },
                    defaultColor: { r, g, b }
                };
                const newPlayer = {
                    address: player.toLowerCase(),
                    pseudo: generator(player.toLowerCase()),
                    token,
                    score: computeScore(token.color, targetColor)
                };
                yield put(addPlayer(newPlayer));
                const { address: userAddress } = yield select(
                    state => state.web3.account
                );
                if (userAddress === player.toLowerCase())
                    yield put(setUserAsPlayer());
            }
        ])
    );
}

function* playersSaga() {
    yield all([
        watchUserAsPlayer(),
        watchListenBlendingPrice(),
        watchListenTokenBlended(),
        watchListenPlayerCreated()
    ]);
}

export default playersSaga;
