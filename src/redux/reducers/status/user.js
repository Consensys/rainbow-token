import {
    SET_USER_AS_PLAYER,
    REMOVE_USER_AS_PLAYER
} from "../../actions/user";
import {
  INITIALIZE
} from '../../actions/setUp';

const DEFAULT_STATE = {
    isPlayer: false
};

export default (state = DEFAULT_STATE, { type }) => {
    switch (type) {
        case SET_USER_AS_PLAYER:
            return { ...state, isPlayer: true };
        case REMOVE_USER_AS_PLAYER:
            return { ...state, isPlayer: false };
        case INITIALIZE:
            return DEFAULT_STATE;
        default:
            return state;
    }
};
