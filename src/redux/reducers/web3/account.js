import { FILL_ACCOUNT } from "../../actions/web3";

const DEFAULT_STATE = {
    address: undefined
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case FILL_ACCOUNT:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};
