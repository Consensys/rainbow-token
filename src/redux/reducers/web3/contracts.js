import {
    ADD_CONTRACT
} from '../../actions/web3';

const DEFAULT_STATE = {
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case ADD_CONTRACT:
          return { ...state, [payload.key]: payload.contract };
      default:
          return state;
    }
};
