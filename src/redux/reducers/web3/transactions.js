import {
    START_TRANSACTION,
    END_TRANSACTION
} from "../../actions/transactions/general";

const DEFAULT_STATE = {
    txHash: undefined
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case START_TRANSACTION:
            return { ...state, txHash: payload };
        case END_TRANSACTION:
            return { ...state, txHash: undefined };
        default:
            return state;
    }
};
