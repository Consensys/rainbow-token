import { eventChannel } from "redux-saga";
import { select, put, call } from "redux-saga/effects";

/* Actions */
import { newBlockHeader } from "../../actions/web3";
import {
    endTransaction,
    addTransactionToBlock
} from "../../actions/transactions/general";

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

function* transactionSubscription() {
    try {
        const {
            transactions: { txHash },
            network: { ethWs: eth }
        } = yield select(state => state.web3);
        if (txHash) {
            const txReceipt = yield call(
                [eth, "getTransactionReceipt"],
                txHash
            );
            if (txReceipt && txReceipt.blockNumber) {
                yield put(endTransaction());
                yield put(
                    addTransactionToBlock(
                        txReceipt.blockNumber,
                        txReceipt.transactionHash,
                        txReceipt.status === "0x1"
                    )
                );
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function metamaskAccountSubscription() {
    return eventChannel(emitter => {
        window.ethereum.on("accountsChanged", ([address]) => {
            emitter({ address });
        });
        return () => false;
    });
}

export {
    blockHeaderSubscription,
    transactionSubscription,
    metamaskAccountSubscription
};
