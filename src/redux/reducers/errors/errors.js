import {
    ADD_ERROR,
    REMOVE_ERROR,
} from '../../actions/errors';

const DEFAULT_STATE = {
    message: null,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case ADD_ERROR:
          return { ...state, message: payload };
      case REMOVE_ERROR:
          return { ...state, message: null };
      default:
          return state;
    }
};
