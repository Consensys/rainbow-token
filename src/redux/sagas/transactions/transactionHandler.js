import { put, take } from "redux-saga/effects";

import { startTransaction } from "../../actions/transactions/general";

export default function*(chan) {
    while (true) {
        let { type, payload } = yield take(chan);
        switch (type) {
            case "TRANSACTION_HASH":
                console.log("Start Transaction:", payload);
                yield put(startTransaction(payload));
                break;
            case "RECEIPT":
                console.log("Receipt:", payload);
                chan.close();
                break;
            case "ERROR":
                console.log("Error:", payload);
                throw new Error("Transaction has failed.");
            default:
                chan.close();
        }
    }
}
