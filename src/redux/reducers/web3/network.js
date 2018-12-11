import { SET_NETWORK } from "../../actions/web3";

const DEFAULT_STATE = {
    id: undefined
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case SET_NETWORK:
            return { ...state, ...payload };
        default:
            return state;
    }
};
