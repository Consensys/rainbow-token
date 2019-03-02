// Actions
import { ADD_CONTRACT } from "../../actions/web3/contracts";

const DEFAULT_STATE = {}

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case ADD_CONTRACT:
            return {
              ...state,
              [payload.name]: payload.contract
            }
        default:
            return state;
    }
};
