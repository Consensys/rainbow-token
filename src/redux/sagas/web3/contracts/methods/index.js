// Libs
import { select, call, } from 'redux-saga/effects';

export function* contractCall({
  contract,
  method,
  params,
  ...transactionArguments
}) {
  // Get the method from store
  const calledMethod = yield select(
    state => state.web3.contracts[contract].methods[method]
  );
  // Call the method with the appropriate params
  const result = yield call(
    [
      calledMethod(...params),
      'call'
    ],
    transactionArguments
  );
  return result;
}

export function* contractTransaction({
  contract,
  method,
  params,
  ...transactionArguments
}) {
  // Get the method from store
  const calledMethod = yield select(
    state => state.web3.contracts[contract].methods[method]
  );
  // Build the transaction object
  const transactionObject = calledMethod(...params);
  // Get an estimation of the gas if there is not a set value
  if (!transactionArguments.gas) {
    const estimatedGas = yield call(
      [
        transactionObject,
        'estimateGas'
      ],
      transactionArguments
    );
    if (estimatedGas) {
      transactionArguments.gas = estimatedGas;
      transactionArguments.gasLimit = estimatedGas;
    }
  }
  // Return the event emitter
  return transactionObject.send(transactionArguments);
}
