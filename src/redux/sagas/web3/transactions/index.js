// Libs
import { call, select, put, all } from 'redux-saga/effects';

// Utils
import {
  contractTransaction
} from '../contracts/methods';

import {
  rawTransaction,
  transactionToEmitter,
  transactionHandler
} from './utils';

// Actions
import { removeTransaction } from '../../../actions/web3/transactions';

export function* sendTransaction({
  contract,
  method,
  params = [],
  ...transactionArguments
}) {
  // Set the from to the default account if no from has been set
  if (transactionArguments && !transactionArguments.from) {
    const { defaultAccount } = yield select(
      state => state.web3.accounts
    );
    transactionArguments.from = defaultAccount ? defaultAccount : undefined;
  }
  // If contract and method has been set, use the send from contract
  // Otherwise use the raw send
  const eventEmitter = (!!contract && !!method)
    ? yield call(
      contractTransaction,
      {
        contract,
        method,
        params,
        ...transactionArguments
      }
    )
    : yield call(
      rawTransaction,
      transactionArguments
    );

  // Build the channel
  const chan = yield call(
    transactionToEmitter,
    eventEmitter
  )

  // Listen to the channel and get the receipt
  const receipt = yield call(
    transactionHandler,
    chan
  );

  return receipt;
}

export function* clearTransactions() {
  // Get the blocks and the transactions
  const { blocks, transactions } = yield select(
    state => state.web3
  );
  if (blocks.length > 0) {
    // Get the earliest block number in store
    const { number } = blocks[blocks.length - 1];
    // Get old transactions index
    const oldTransactionsIndex = [];
    Object.values(transactions).forEach(
      ({ blockNumber }, index) => {
        if (blockNumber && blockNumber < number)
          oldTransactionsIndex.push(index);
      }
    );
    // Remove old transactions
    const txHashes = Object.keys(transactions);
    yield all(
      oldTransactionsIndex.map(index => put(removeTransaction(txHashes[index])))
    )
  }
}
