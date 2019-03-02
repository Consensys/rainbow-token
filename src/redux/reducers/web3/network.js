// Actions
import { FILL_NETWORK } from "../../actions/web3/setUp";

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case FILL_NETWORK:
            return {
              ...state,
              ...payload
            };
        default:
            return state;
    }
};
