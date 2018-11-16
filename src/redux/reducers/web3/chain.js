import {
    NEW_BLOCK_HEADER
} from '../../actions/setUp/web3';

const DEFAULT_STATE = {
  blockNumber: undefined,
  timestamp: undefined
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case NEW_BLOCK_HEADER:
          return {
            ...state,
            ...payload
          };
      default:
          return state;
    }
};
