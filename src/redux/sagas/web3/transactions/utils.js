// Libs
import { eventChannel, END } from 'redux-saga';
import { call, select, take, put } from 'redux-saga/effects';

// Actions
import {
  startTransaction,
  endTransaction,
  removeTransaction
} from '../../../actions/web3/transactions';

export function* rawTransaction(transactionArguments) {
  // Get the eth object from store
  const { eth } = yield select(
    state => state.web3
  );
  // Get an estimation of the gas if there is not a set value
  if (!transactionArguments.gas) {
    // Get the gas estimation
    const estimatedGas = yield call([eth, 'estimateGas'], transactionArguments);
    if (estimatedGas) {
      transactionArguments.gas = estimatedGas;
    }
  }
  // Return the event emitter
  return eth.sendTransaction(transactionArguments);
}

export function* transactionHandler(chan) {
    while (true) {
        let transactionHash;
        let { type, payload } = yield take(chan);
        switch (type) {
            case "TRANSACTION_HASH":
                transactionHash = payload;
                yield put(startTransaction(transactionHash));
                console.log('New Transaction: ', payload);
                break;
            case "RECEIPT":
                console.log('Receipt: ', payload);
                yield put(endTransaction(payload));
                chan.close();
                return payload;
            case "ERROR":
                console.log('Error during Transaction: ', payload);
                yield put(removeTransaction(transactionHash));
                chan.close();
                return false;
            default:
                chan.close();
        }
    }
}

export function* updateTransaction(txHash) {
  // Get eth object
  const { getTransactionReceipt } = yield select(
    state => state.web3.eth
  );
  // Fetch the receipt
  const receipt = yield call(
    getTransactionReceipt,
    txHash
  );
  // If receipt, end the transaction
  if (receipt && receipt.blockNumber) {
    yield put(endTransaction(receipt));
  }
}

export const transactionToEmitter = transaction => eventChannel(emitter => {
    transaction
        .on("transactionHash", txHash => {
            emitter({ type: "TRANSACTION_HASH", payload: txHash });
        })
        .on("receipt", receipt => {
            emitter({ type: "RECEIPT", payload: receipt });
            emitter(END);
        })
        .on("error", error => {
            emitter({ type: "ERROR", payload: error });
            emitter(END);
        });
    return () => transaction.off();
})
