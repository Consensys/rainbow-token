import {
    SET_ACCOUNT,
} from '../../actions/web3';

const DEFAULT_STATE = {
  address: undefined
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case SET_ACCOUNT:
          return { ...state, address: payload };
      default:
          return state;
    }
};
