import {
    GAME_INITIALIZED
} from '../../actions/game';

const DEFAULT_STATE = {
  initialized: false
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case GAME_INITIALIZED:
          return { ...state, initialized: true };
      default:
          return state;
    }
};
