export const START_TRANSACTION = 'START_TRANSACTION';
export const startTransaction = (txHash) => ({
    type: START_TRANSACTION,
    payload: txHash
});

export const END_TRANSACTION = 'END_TRANSACTION';
export const endTransaction = () => ({
    type: END_TRANSACTION,
});
