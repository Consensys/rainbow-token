import {
    START_LOADING_PLAYERS,
    END_LOADING_PLAYERS
} from "../../actions/players";
import {
  INITIALIZE
} from '../../actions/setUp';

const DEFAULT_STATE = {
    isLoading: false
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case START_LOADING_PLAYERS:
            return { ...state, isLoading: true };
        case END_LOADING_PLAYERS:
            return { ...state, isLoading: false };
        case INITIALIZE:
            return DEFAULT_STATE;
        default:
            return state;
    }
};
