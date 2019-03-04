// Actions
import { UPDATE_ACCOUNT, SET_DEFAULT_ACCOUNT } from "../../actions/web3/accounts";

const DEFAULT_STATE = {
  list: new Map(),
  defaultAccount: '',
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case UPDATE_ACCOUNT:
            return {
              ...state,
              list: new Map([
                ...state.list
              ]).set(payload.address.toLowerCase(), payload.balance)
            }
        case SET_DEFAULT_ACCOUNT:
          return {
            ...state,
            defaultAccount: payload.toLowerCase()
          }
        default:
            return state;
    }
};
