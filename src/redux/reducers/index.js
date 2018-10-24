import { combineReducers } from 'redux';
import user from './user';
import players from './players';
import errors from './errors';

const rootReducer = combineReducers({
  user,
  players,
  errors,
});

export default rootReducer;
