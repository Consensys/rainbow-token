import { takeEvery, select, call, put } from "redux-saga/effects";

import { NEW_BLOCK_HEADER } from "../../actions/web3";

import {
    endTransaction,
    addTransactionToBlock
} from "../../actions/transactions/general";

function* transactionHandler() {
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

export default function*() {
    yield takeEvery(NEW_BLOCK_HEADER, transactionHandler);
}
