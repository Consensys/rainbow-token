import {
    SET_USER_AS_PLAYER,
    REMOVE_USER_AS_PLAYER
} from "../../actions/user";

const DEFAULT_STATE = {
    isPlayer: false
};

export default (state = DEFAULT_STATE, { type }) => {
    switch (type) {
        case SET_USER_AS_PLAYER:
            return { ...state, isPlayer: true };
        case REMOVE_USER_AS_PLAYER:
            return { ...state, isPlayer: false };
        default:
            return state;
    }
};
