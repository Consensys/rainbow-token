import {
  START_PLAYING,
  START_LOADING_USER,
  END_LOADING_USER,
  SET_USER,
  UPDATE_USER_RGB,
  START_TRANSACTION,
  END_TRANSACTION
} from '../actionTypes';

const DEFAULT_STATE = {
  isPlaying: false,
  isLoading: true,
  inProgress: false,
  data: {}
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case START_PLAYING:
      return { ...state, isPlaying: true, data: { ...state.data, rgbCurrent: [ ...state.data.rgbDefault ]} };
    case START_LOADING_USER:
      return { ...state, isLoading: true };
    case END_LOADING_USER:
      return { ...state, isLoading: false };
    case SET_USER:
      return { ...action.user, data: { ...action.user.data } };
    case UPDATE_USER_RGB:
      return { ...state, data: { ...state.data, rgbCurrent: [ ...action.updatedRGB ] }};
    case START_TRANSACTION:
      return { ...state, inProgress: true };
    case END_TRANSACTION:
      return { ...state, inProgress: false };
    default:
      return state;
  }
}
