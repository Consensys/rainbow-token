// Actions
import { SET_ETH } from "../../actions/web3/setUp";

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case SET_ETH:
            return payload;
        default:
            return state;
    }
};
