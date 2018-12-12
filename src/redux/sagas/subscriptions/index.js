import {
    take,
    call,
    put,
    all,
    fork,
    cancel,
    takeEvery
} from "redux-saga/effects";

/* Actions */
import { EVENTS_SET, newBlockHeader } from "../../actions/web3";
import { addError } from "../../actions/errors";
import {
    SUBSCRIBE_TO_ACCOUNT,
    UNSUBSCRIBE_TO_ACCOUNT
} from "../../actions/web3";
import { NEW_BLOCK_HEADER } from "../../actions/web3";

/* Workers */
import {
    blockHeaderSubscription,
    accountSubscription,
    transactionSubscription
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

function* subscriptionToAccount() {
    try {
        while (true) {
            yield take(SUBSCRIBE_TO_ACCOUNT);
            const updateFromChannel = yield fork(accountSubscription);
            yield take(UNSUBSCRIBE_TO_ACCOUNT);
            yield cancel(updateFromChannel);
        }
    } catch (err) {
        console.log(err);
    }
}

function* subscriptionToTransaction() {
    yield takeEvery(NEW_BLOCK_HEADER, transactionSubscription);
}

export default function*() {
    yield all([
        subscriptionToBlockHeader(),
        subscriptionToAccount(),
        subscriptionToTransaction()
    ]);
}
