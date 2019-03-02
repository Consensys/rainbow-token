export const START_TRANSACTION = 'START_TRANSACTION';
export const startTransaction = transactionHash => ({
  type: START_TRANSACTION,
  payload: transactionHash
})

export const END_TRANSACTION = 'END_TRANSACTION';
export const endTransaction = receipt => ({
  type: END_TRANSACTION,
  payload: receipt
});

export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';
export const removeTransaction = transactionHash => ({
  type: REMOVE_TRANSACTION,
  payload: transactionHash
})
