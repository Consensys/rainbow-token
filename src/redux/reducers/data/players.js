import {
    SET_PLAYERS,
    UPDATE_PLAYER_TOKEN,
    ADD_PLAYER
} from "../../actions/players";
import {
  INITIALIZE
} from '../../actions/setUp';

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case SET_PLAYERS:
            return { ...state, ...payload };
        case ADD_PLAYER:
            return {
                ...state,
                [payload.address]: payload
            };
        case UPDATE_PLAYER_TOKEN:
            const player = state[payload.address];
            if (player) {
                return {
                    ...state,
                    [player.address]: {
                        ...player,
                        score: payload.score || player.score,
                        token: {
                            ...player.token,
                            color: payload.token.color || player.token.color,
                            blendingPrice:
                                payload.token.blendingPrice ||
                                player.token.blendingPrice
                        }
                    }
                };
            } else {
                return state;
            }
        case INITIALIZE:
            return DEFAULT_STATE;
        default:
            return state;
    }
};
