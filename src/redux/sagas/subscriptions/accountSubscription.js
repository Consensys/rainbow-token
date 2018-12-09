import { takeEvery, take, cancel, fork } from "redux-saga/effects";

import {
    NEW_BLOCK_HEADER,
    SUBSCRIBE_TO_ACCOUNT,
    UNSUBSCRIBE_TO_ACCOUNT
} from "../../actions/setUp/web3";

import { accountHandler } from "../setUp/web3";

function* openChannel() {
    yield takeEvery(NEW_BLOCK_HEADER, accountHandler);
}

export default function*() {
    try {
        while (true) {
            yield take(SUBSCRIBE_TO_ACCOUNT);
            const updateFromChannel = yield fork(openChannel);
            yield take(UNSUBSCRIBE_TO_ACCOUNT);
            yield cancel(updateFromChannel);
        }
    } catch (err) {
        console.log(err);
    }
}
