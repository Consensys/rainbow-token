// Actions
import { FILL_NETWORK } from "../../actions/web3/setUp";
import { INITIALIZE } from "../../actions/setUp";

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case FILL_NETWORK:
            return {
              ...state,
              ...payload
            };
        case INITIALIZE:
          return DEFAULT_STATE;
        default:
            return state;
    }
};
