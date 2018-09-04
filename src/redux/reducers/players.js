import {
  START_LOADING_PLAYERS,
  END_LOADING_PLAYERS,
  SET_PLAYERS,
  UPDATE_TOKEN,
  ADD_PLAYER,
} from '../actionTypes';

const DEFAULT_STATE = {
  isLoading: true,
  data: []
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
    case UPDATE_TOKEN:
      const updatedData = state.data.map(player => {
        if (player.address === payload.address) {
          return {
            ...player,
            color: payload.color,
            score: payload.score,
          };
        }
        return player;
      })
      return { ...state, data: updatedData };
    case ADD_PLAYER:
      const newData = JSON.parse(JSON.stringify(state.data));
      newData.push(payload);
      return { ...state, data: newData }
    default:
      return state;
  }
}
