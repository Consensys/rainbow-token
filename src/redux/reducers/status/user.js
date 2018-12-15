import {
    START_LOADING_USER,
    END_LOADING_USER,
    SET_USER_AS_PLAYER,
    REMOVE_USER_AS_PLAYER
} from "../../actions/user";

const DEFAULT_STATE = {
    isLoading: false,
    isPlayer: false
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case START_LOADING_USER:
            return { ...state, isLoading: true };
        case END_LOADING_USER:
            return { ...state, isLoading: false };
        case SET_USER_AS_PLAYER:
            return { ...state, isPlayer: true };
        case REMOVE_USER_AS_PLAYER:
            return { ...state, isPlayer: false };
        default:
            return state;
    }
};
