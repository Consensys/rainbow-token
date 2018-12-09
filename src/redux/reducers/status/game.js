import {
    GAME_INITIALIZED,
    START_INITIALIZATION,
    END_INITIALIZATION
} from "../../actions/setUp/game";

const DEFAULT_STATE = {
    initialized: false,
    isLoading: false
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case GAME_INITIALIZED:
            return { ...state, initialized: true };
        case START_INITIALIZATION:
            return { ...state, isLoading: true };
        case END_INITIALIZATION:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};
