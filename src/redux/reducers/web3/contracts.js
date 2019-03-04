// Actions
import { ADD_CONTRACT } from "../../actions/web3/contracts";
import { INITIALIZE } from "../../actions/setUp";

const DEFAULT_STATE = {}

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case ADD_CONTRACT:
            return {
              ...state,
              [payload.name]: payload.contract
            }
        case INITIALIZE:
          return DEFAULT_STATE;
        default:
            return state;
    }
};
