import {
  START_PLAYING,
  START_LOADING_USER,
  END_LOADING_USER,
  SET_USER,
  UPDATE_USER_COLOR,
  START_TRANSACTION,
  END_TRANSACTION
} from '../actionTypes';

const DEFAULT_STATE = {
  isPlaying: false,
  isLoading: true,
  inProgress: false,
  data: {}
};

export default (state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case START_PLAYING:
      return { ...state, isPlaying: true, data: { ...state.data, color: [ ...state.data.defaultColor ]} };
    case START_LOADING_USER:
      return { ...state, isLoading: true };
    case END_LOADING_USER:
      return { ...state, isLoading: false };
    case SET_USER:
      return { ...state, ...payload };
    case UPDATE_USER_COLOR:
      return { ...state, data: { ...state.data, color: payload.color, score: payload.score }};
    case START_TRANSACTION:
      return { ...state, inProgress: true };
    case END_TRANSACTION:
      return { ...state, inProgress: false };
    default:
      return state;
  }
}
