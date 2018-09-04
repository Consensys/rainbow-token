import {
  START_LOADING_PLAYERS,
  END_LOADING_PLAYERS,
  SET_PLAYERS,
  UPDATE_PLAYER_TOKEN,
  ADD_PLAYER,
} from '../actionTypes';

const DEFAULT_STATE = {
  isLoading: true,
  data: {},
};

export default (state = DEFAULT_STATE, {type, payload}) => {
  switch(type) {
    case START_LOADING_PLAYERS:
      return { ...state, isLoading: true };
    case END_LOADING_PLAYERS:
      return { ...state, isLoading: false };
    case SET_PLAYERS:
      const data = JSON.parse(JSON.stringify(payload));
      return { ...state, data };
    case ADD_PLAYER:
      return {
        ...state, 
        data: {
          ...state.data,
          [payload.address]: payload,
        }
      }
    case UPDATE_PLAYER_TOKEN:
      const player = state.data[payload.address]
      return {
        ...state,
        data: {
          ...state.data,
          [player.address]: {
            ...player,
            token: {
              ...player.token,
              color: payload.token.color || player.token.color,
              score: payload.token.score || player.token.score,
              blendingPrice: payload.token.blendingPrice || player.token.blendingPrice,
            }
          }
        }
      }
    default:
      return state;
  }
}
