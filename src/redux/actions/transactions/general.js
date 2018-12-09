export const START_TRANSACTION = "START_TRANSACTION";
export const startTransaction = txHash => ({
    type: START_TRANSACTION,
    payload: txHash
});

export const END_TRANSACTION = "END_TRANSACTION";
export const endTransaction = () => ({
    type: END_TRANSACTION
});

export const ADD_TRANSACTION_TO_BLOCK = "ADD_TRANSACTION_TO_BLOCK";
export const addTransactionToBlock = (
    blockNumber,
    transactionHash,
    status
) => ({
    type: ADD_TRANSACTION_TO_BLOCK,
    payload: { blockNumber, transactionHash, status }
});
