import { take, call, put, all, select, takeEvery } from "redux-saga/effects";

/* Actions */
import {
    EVENTS_SET,
    newBlockHeader,
    NEW_BLOCK_HEADER
} from "../../actions/web3";
import { initializeGame } from "../../actions/setUp/game";
import { addError } from "../../actions/errors";
import { removeUserAsPlayer } from "../../actions/user";

/* Workers */
import {
    blockHeaderSubscription,
    transactionSubscription,
    metamaskAccountSubscription
} from "./workers";

function* subscriptionToBlockHeader() {
    try {
        // Not optimal
        yield take(EVENTS_SET);
        const chan = yield call(blockHeaderSubscription);
        while (true) {
            let { type, payload } = yield take(chan);
            switch (type) {
                case "NEW_BLOCK_HEADER":
                    yield put(newBlockHeader(payload));
                    break;
                case "ERROR":
                    console.log("Error:", payload);
                    chan.close();
                    break;
                default:
                    chan.close();
            }
        }
    } catch (err) {
        console.log(err);
        yield put(addError("Unable to listen to new blocks."));
    }
}

function* subscriptionToTransaction() {
    yield takeEvery(NEW_BLOCK_HEADER, transactionSubscription);
}

function* subscriptionToMetamaskAccount() {
    const chan = yield call(metamaskAccountSubscription);
    while (true) {
        yield take(chan);
        yield put(removeUserAsPlayer());
        yield put(initializeGame());
    }
}

function* reactToNewBlock() {
    yield takeEvery(NEW_BLOCK_HEADER, function*() {
        const callbacks = yield select(state =>
            Object.values(state.web3.subscription)
        );
        yield all(callbacks.map(callback => call(callback)));
    });
}

export default function*() {
    yield all([
        subscriptionToBlockHeader(),
        subscriptionToTransaction(),
        reactToNewBlock(),
        subscriptionToMetamaskAccount()
    ]);
}
