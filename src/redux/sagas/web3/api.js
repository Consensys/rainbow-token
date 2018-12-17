import { call, select, take } from "redux-saga/effects";

import {
    buildPrimaryTransactionObject,
    sendFromWallet,
    signAndSend
} from "./utils";

import eventToEmitter from "../utils/eventToEmitter";

function* sendTransaction(contractMethodOrTx, txArgs = {}, privateKey = "") {
    try {
        // Form the primary transaction object
        const primaryTxObject = yield call(
            buildPrimaryTransactionObject,
            contractMethodOrTx,
            txArgs
        );
        if (privateKey) {
            yield call(signAndSend, primaryTxObject, privateKey);
        } else {
            yield call(sendFromWallet, primaryTxObject);
        }
    } catch (err) {
        console.log(err);
    }
}

function* callContract([contractName, methodName, ...methodArgs], txArgs) {
    try {
        const { methods } = yield select(
            state => state.web3.contracts[contractName]
        );
        const web3TxObject = methods[methodName].apply(null, methodArgs);
        return yield call([web3TxObject, "call"], txArgs);
    } catch (err) {
        console.log(err);
    }
}

function* listenAndReactToEvent(
    [contractName, eventName, filterArgs, callback],
    optionsArgs = {}
) {
    const { [eventName]: event } = yield select(
        state => state.web3.contracts[contractName].events
    );
    const chan = yield call(
        eventToEmitter,
        event(
            {
                filter: filterArgs
            },
            ...optionsArgs
        )
    );
    while (true) {
        const returnValues = yield take(chan);
        yield call(callback, returnValues);
    }
}

export { sendTransaction, callContract, listenAndReactToEvent };
