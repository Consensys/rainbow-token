import {
    SET_NETWORK_ID
} from '../../actions/web3';

const DEFAULT_STATE = {
  id: undefined
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case SET_NETWORK_ID:
        return { ...state, id: payload };
      default:
        return state;
    }
};
