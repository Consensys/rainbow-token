import {
    START_LOADING_PLAYERS,
    END_LOADING_PLAYERS,
} from '../../actions/players';

const DEFAULT_STATE = {
    isLoading: false,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
    case START_LOADING_PLAYERS:
        return { ...state, isLoading: true };
    case END_LOADING_PLAYERS:
        return { ...state, isLoading: false };
    default:
        return state;
    }
};
