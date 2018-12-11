import { NEW_BLOCK_HEADER } from "../../actions/web3";

import { ADD_TRANSACTION_TO_BLOCK } from "../../actions/transactions/general";

const DEFAULT_STATE = {
    blockNumber: "3",
    prevBlock0: {
        timestamp: undefined,
        transactions: []
    },
    prevBlock1: {
        timestamp: undefined,
        transactions: []
    },
    prevBlock2: {
        timestamp: undefined,
        transactions: []
    }
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case NEW_BLOCK_HEADER:
            return {
                ...state,
                blockNumber: payload.number,
                prevBlock0: {
                    timestamp: payload.timestamp,
                    transactions: []
                },
                prevBlock1: {
                    ...state.prevBlock0
                },
                prevBlock2: {
                    ...state.prevBlock1
                }
            };
        case ADD_TRANSACTION_TO_BLOCK:
            const targetBlockDiff =
                Number(state.blockNumber) - Number(payload.blockNumber);
            const targetBlock = `prevBlock${targetBlockDiff}`;
            return {
                ...state,
                [targetBlock]: {
                    ...state[targetBlock],
                    transactions: [
                        ...state[targetBlock].transactions,
                        {
                            txHash: payload.transactionHash,
                            status: payload.status
                        }
                    ]
                }
            };
        default:
            return state;
    }
};
