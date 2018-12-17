import { call, select } from "redux-saga/effects";

/* Helpers */
import transactionHandler from "../utils/transactionHandler";
import transactionToEmitter from "../utils/transactionToEmitter";

function* buildPrimaryTransactionObjectFromContract(
    [contractName, methodName, ...methodArgs],
    txArgs
) {
    const contract = yield select(
        state => state.web3.contracts[contractName].contractHttp
    );
    const web3TxObject = contract.methods[methodName].apply(null, methodArgs);
    return {
        data: web3TxObject.encodeABI(),
        to: contract.options.address,
        ...txArgs
    };
}

function* buildPrimaryTransactionObject(contractMethodOrTx, txArgs) {
    try {
        if (
            contractMethodOrTx instanceof Array &&
            contractMethodOrTx.length >= 2
        ) {
            return yield call(
                buildPrimaryTransactionObjectFromContract,
                contractMethodOrTx,
                txArgs
            );
        } else if (contractMethodOrTx instanceof Object) {
            return contractMethodOrTx;
        } else {
            throw new Error(
                "Invalid parameter, expected transaction object or array."
            );
        }
    } catch (err) {
        console.log(err);
        throw new Error("Unable to build primary transaction object." + err);
    }
}

function* sendFromWallet(primaryTxObject) {
    try {
        const {
            network: { eth },
            account: { address }
        } = yield select(state => state.web3);
        const chan = yield call(
            transactionToEmitter,
            eth.sendTransaction({ ...primaryTxObject, from: address })
        );
        yield call(transactionHandler, chan);
    } catch (err) {
        throw new Error("Unable to send the transaction." + err);
    }
}

function* signTransaction(primaryTxObject, privateKey) {
    try {
        const { eth } = yield select(state => state.web3.network);
        const { address, signTransaction } = yield call(
            [eth.accounts, "privateKeyToAccount"],
            privateKey
        );
        const txObject = { ...primaryTxObject };
        txObject.from = txObject.from ? txObject.from : address;
        txObject.gas = txObject.gas
            ? txObject.gas
            : yield call([eth, "estimateGas"], txObject);
        const { rawTransaction } = yield call(signTransaction, txObject);
        return rawTransaction;
    } catch (err) {
        throw new Error("Unable to sign the transaction.");
    }
}

function* signAndSend(primaryTxObject, privateKey) {
    try {
        const { eth } = yield select(state => state.web3.network);
        const rawTransaction = yield call(signTransaction, primaryTxObject);
        const chan = yield call(
            transactionToEmitter,
            eth.sendSignedTransaction(rawTransaction)
        );
        yield call(transactionHandler, chan);
    } catch (err) {
        throw new Error("Unable to send the transaction." + err);
    }
}

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
        const contract = yield select(
            state => state.web3.contracts[contractName].contractHttp
        );
        const web3TxObject = contract.methods[methodName].apply(
            null,
            methodArgs
        );
        return yield call([web3TxObject, "call"], txArgs);
    } catch (err) {
        console.log(err);
    }
}

export { sendTransaction, callContract };
