import { eventChannel } from "redux-saga";
import { select, put, call, takeEvery } from "redux-saga/effects";

/* Actions */
import { NEW_BLOCK_HEADER, newBlockHeader } from "../../actions/web3";
import {
    endTransaction,
    addTransactionToBlock
} from "../../actions/transactions/general";

/* Helpers */
import { accountHandler } from "../web3/utils";

function* blockHeaderSubscription() {
    const { ethWs: eth } = yield select(state => state.web3.network);
    const { number, timestamp } = yield call([eth, "getBlock"], "latest");
    yield put(newBlockHeader({ number, timestamp }));
    // Subscribe to block headers
    return eventChannel(emitter => {
        const subscription = eth
            .subscribe("newBlockHeaders")
            .on("data", ({ number, timestamp }) => {
                emitter({
                    type: "NEW_BLOCK_HEADER",
                    payload: {
                        number,
                        timestamp
                    }
                });
            })
            .on("error", err =>
                emitter({
                    type: "ERROR",
                    err
                })
            );

        return subscription.unsubscribe;
    });
}

function* accountSubscription() {
    yield takeEvery(NEW_BLOCK_HEADER, accountHandler);
}

function* transactionSubscription() {
    try {
        const {
            transactions: { txHash },
            network: { ethWs: eth }
        } = yield select(state => state.web3);
        if (txHash) {
            const { blockNumber, status, transactionHash } = yield call(
                [eth, "getTransactionReceipt"],
                txHash
            );
            if (blockNumber) {
                yield put(endTransaction());
                yield put(
                    addTransactionToBlock(
                        blockNumber,
                        transactionHash,
                        status === "0x1"
                    )
                );
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export {
    blockHeaderSubscription,
    accountSubscription,
    transactionSubscription
};
