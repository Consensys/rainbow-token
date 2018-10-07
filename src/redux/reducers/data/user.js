import {
    SET_USER,
    // START_TRANSACTION,
    // END_TRANSACTION,
} from '../../actions/user';

const DEFAULT_STATE = {
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case SET_USER:
          return { ...state, ...payload };
      // case START_TRANSACTION:
      //     return { ...state, inProgress: payload };
      // case END_TRANSACTION:
      //     return { ...state, inProgress: undefined };
      default:
          return state;
    }
};
