import {
  START_LOADING_PLAYERS,
  END_LOADING_PLAYERS,
  SET_PLAYERS,
  UPDATE_PLAYER,
  ADD_NEW_PLAYER
} from '../actionTypes';

import { computeScore } from '../../util/computeScore';

const DEFAULT_STATE = {
  isLoading: true,
  data: []
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case START_LOADING_PLAYERS:
      return { ...state, isLoading: true };
    case END_LOADING_PLAYERS:
      return { ...state, isLoading: false };
    case SET_PLAYERS:
      const data = JSON.parse(JSON.stringify(action.data));
      return { ...state, data };
    case UPDATE_PLAYER:
      const updatedData = state.data.map(player => {
        if (player.address === action.blender) {
          return {
            ...player,
            rgbCurrent: [ ...action.updatedRGB ],
            score: computeScore(action.updatedRGB)
          };
        }
        return player;
      })
      return { ...state, data: updatedData };
    case ADD_NEW_PLAYER:
      const newData = JSON.parse(JSON.stringify(state.data));
      newData.push({ ...action.newPlayer });
      return { ...state, data: newData }
    default:
      return state;
  }
}
